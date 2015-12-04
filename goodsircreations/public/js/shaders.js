THREE.PriznelShader = function(params) {
    'use strict';
    var vertShader = [
        'uniform float fresnelBias;',
        'uniform float fresnelScale;',
        'uniform float fresnelPower;',
        '',
        'varying float vReflectionFactor;',
        '',
        'varying vec2 vUv;',
        '',
        'void main() {',
        '	vUv = uv;',
        '	',
        '	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
        '	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );',
        '	',
        '	vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );',
        '	',
        '	vec3 I = worldPosition.xyz - cameraPosition;',
        '	',
        '	vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );',
        '	',
        '	gl_Position = projectionMatrix * mvPosition;',
        '}'
    ].join('\n');
    var fragShader = [
        'uniform vec3 color1;',
        'uniform vec3 color2;',
        '',
        'uniform sampler2D map;',
        'uniform sampler2D spec;', // TODO: This. lol.
        '',
        'varying vec2 vUv;',
        '',
        'varying float vReflectionFactor;',
        '',
        'void main() {',
        '	vec4 diff_color = texture2D( map, vUv );',
        '	#ifdef USE_DIFF',
        '		#ifdef USE_SPEC',
        '			gl_FragColor = vec4(mix(diff_color.rgb, color1, vec3(clamp( vReflectionFactor, 0.0, 1.0 ))), 1.0);',
        '		#endif',
        '		gl_FragColor = vec4(mix(diff_color.rgb, color1, vec3(clamp( vReflectionFactor, 0.0, 1.0 ))), 1.0);',
        '	#else',
        '		#ifdef USE_SPEC',
        '			gl_FragColor = vec4(mix(color2, color1, vec3(clamp( vReflectionFactor, 0.0, 1.0 ))), 1.0);',
        '		#endif',
        '		gl_FragColor = vec4(mix(color2, color1, vec3(clamp( vReflectionFactor, 0.0, 1.0 ))), 1.0);',
        '	#endif',
        '}'
    ].join('\n');

    if(typeof params === 'undefined') params = {};

    var color1 = params.color1 || "rgb(255,255,255)";
    var color2 = params.color2 || 0x000000;
    var fresnelBias = params.fresnelBias || 0.0;
    var fresnelScale = params.fresnelScale || 1.0;
    var fresnelPower = params.fresnelPower || 2.0;

    var uniforms = {
        color1: {
            type: 'c',
            value: new THREE.Color(color1),
        },
        color2: {
            type: 'c',
            value: new THREE.Color(color2),
        },
        fresnelBias: {
            type: 'f',
            value: fresnelBias
        },
        fresnelScale: {
            type: 'f',
            value: fresnelScale
        },
        fresnelPower: {
            type: 'f',
            value: fresnelPower
        },
        map: {
            type: 't',
            value: (typeof params.map === 'undefined')?undefined:params.map
        },
        spec: {
            type: 't',
            value: (typeof params.spec === 'undefined')?undefined:params.spec
        },
        norm: {
            type: 't',
            value: (typeof params.norm === 'undefined')?undefined:params.norm
        }
    };
    var defines = {
        USE_DIFF: (typeof params.map !== 'undefined'),
        USE_SPEC: (typeof params.spec !== 'undefined'),
        USE_NORM: (typeof params.norm !== 'undefined')
    };
    var material;
    material = new THREE.ShaderMaterial({
        defines: defines,
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader : fragShader
    });
    return material;
};


THREE.testShader_cool_question_mark = function() {
    'use strict';
    var vertShader = [
        'varying vec2 vUv;',
        '',
        'void main() {',
        '   vUv = uv;',
        '   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
    ].join('\n');
    var fragShader = [
        'varying vec2 vUv;',
        'void main() {',
        '   gl_FragColor = vec4( vec3( vUv, 1.0 ), 1.0 );',
        '}'
    ].join('\n');
    var uniforms = {
        myColor: { type: "c", value: new THREE.Color( 0xffffff ) },
    };

    var material;
    material = new THREE.ShaderMaterial({
//        defines: defines,
//        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader : fragShader
    });
    return material;
};

THREE.testShader = function() {
    'use strict';
    var vertShader = [
        '// Include the Ashima code here!',
        '',
        'varying vec2 vUv;',
        'varying float noise;',
        'uniform float time;',
        '',
        'float turbulence( vec3 p ) {',
        '    float w = 100.0;',
        '    float t = -.5;',
        '    for (float f = 1.0 ; f <= 10.0 ; f++ ){',
        '        float power = pow( 2.0, f );',
        '        t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );',
        '    }',
        '    return t;',
        '}',
        '',
        'void main() {',
        '',
        '    vUv = uv;',
        '',
        '    // add time to the noise parameters so it\'s animated',
        '    noise = 10.0 *  -.10 * turbulence( .5 * normal + time );',
        '    float b = 5.0 * pnoise( 0.05 * position + vec3( 2.0 * time ), vec3( 100.0 ) );',
        '    float displacement = - 10. * noise + b;',
        '    ',
        '    vec3 newPosition = position + normal * displacement;',
        '    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );',
        '',
        '}'
    ].join('\n');
    var fragShader = [
        'varying vec2 vUv;',
        'varying float noise;',
        'uniform sampler2D tExplosion;',
        '',
        'float random( vec3 scale, float seed ){',
        '    return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;',
        '}',
        '',
        'void main() {',
        '',
        '    // get a random offset',
        '    float r = .01 * random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );',
        '    // lookup vertically in the texture, using noise and offset',
        '    // to get the right RGB colour',
        '    vec2 tPos = vec2( 0, 1.3 * noise + r);',
        '    vec4 color = texture2D( tExplosion, tPos );',
        '',
        '    gl_FragColor = vec4( color.rgb, 1.0 );',
        '',
        '}'
    ].join('\n');
    var uniforms = {
        myColor: { type: "c", value: new THREE.Color( 0xffffff ) },
    };


    var material;
    material = new THREE.ShaderMaterial({
        //defines: defines,
        //uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader : fragShader
    });
    material = new THREE.ShaderMaterial( {
        uniforms: {
            tExplosion: {
                type: "t",
                value: THREE.ImageUtils.loadTexture( '/images/explosion.png' )
            },
            time: { // float initialized to 0
                type: "f",
                value: 0.0
            }
        },
        vertexShader: vertShader,
        fragmentShader : fragShader
    });

    var start = Date.now();
    setInterval(function(){
        material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
    }, 10);
    return material;
};
