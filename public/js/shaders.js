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
