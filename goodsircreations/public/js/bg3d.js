var Background3D = function(container, type) {
    var W,H,scene,renderer,camera,delta,clock,direction;
    var particleSystem,particleCount,particles,pMaterial;
    var gameInit, shipLeft, shipRight, shipUp, shipDown, spaceShip, asteroids, lazer_type;
    gameInit = shipLeft = shipRight = shipUp = shipDown = false;
    asteroids = [];

    function init_renderer() {
        clock = new THREE.Clock();
        direction = 10;
        W = window.innerWidth;
        H = window.innerHeight;
        renderer = new THREE.WebGLRenderer({
            antialias:true,
            alpha:false,
            stencil:false,
            preserveDrawingBuffer:true,
            canvas:document.getElementById(container)
        });
        renderer.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1);
        renderer.setClearColor( 0xffffff, 1);
        renderer.setSize(W,H);
    }

    function init_camera() {
        camera = new THREE.PerspectiveCamera( 45, W/H, 1,1000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 5;
        camera.lookAt(new THREE.Vector3(0,0,0));
    }

    function init_scene() {
        scene = new THREE.Scene();
        scene.add(camera);
    }

    function start_render(render_type, callback) {
        requestAnimationFrame(render_type);
        renderer.render(scene, camera);
        callback();
    }

    render0 = function() {
        delta = clock.getDelta();
        if(W !== window.innerWidth || H !== window.innerHeight) {
            W = window.innerWidth;
            H = window.innerHeight;
            camera.aspect = W / H;
            camera.updateProjectionMatrix();
            renderer.setSize(W,H);
        }
        scene.children.forEach(function(e) {
            if(/rotate_cube/.test(e.name)) {
                e.rotation.x += ((delta * direction) * (Math.PI / 180));
                e.rotation.y += ((delta * direction) * (Math.PI / 180));
                e.rotation.z += ((delta * direction) * (Math.PI / 180));
            }
        });
        if(gameInit) {
            updateGame(delta);
        }
        requestAnimationFrame(render0);
        renderer.render(scene, camera);
    };
    render1 = function() {
        requestAnimationFrame(render1);
        renderer.render(scene, camera);
    };

    init_renderer();
    init_camera();
    init_scene();

    if(typeof type !== 'undefined') {
        if(type === 0) start_render(render0, cube_bars);
        else if(type === 1) start_render(render1, generate_points);
    }
    else start_render(render0, cube_bars);

    function generate_pixels() {
        var superarray = [{"x":-3,"y":0.5289198660757393,"scale":0.61999767315574,"rotation":{"x":7.6274453738471495,"y":1.472764215944335,"z":1.9609339573187756}},{"x":103,"y":0.1917498749680817,"scale":0.5476884848671034,"rotation":{"x":9.364198301476426,"y":0.8980701576219872,"z":6.9815005859360095}},{"x":-3,"y":10.654931972036138,"scale":0.6330921512097121,"rotation":{"x":9.027897569723427,"y":4.809352215356193,"z":7.161112382030114}},{"x":103,"y":10.87649692199193,"scale":0.6222744190599769,"rotation":{"x":8.651000724849292,"y":0.6091242962516844,"z":3.8466029890580105}},{"x":-3,"y":20.165252624778077,"scale":0.6004754417110234,"rotation":{"x":5.70159520925954,"y":6.7063750684494154,"z":5.318528457614593}},{"x":103,"y":20.064666552003473,"scale":0.7434129337780178,"rotation":{"x":0.4385778067167848,"y":7.6053020561812446,"z":6.000255132932216}},{"x":-3,"y":30.68799232575111,"scale":0.6778013574657962,"rotation":{"x":9.688605154119433,"y":8.75188287103083,"z":9.833971699723042}},{"x":103,"y":30.612866853363812,"scale":0.5084557793103158,"rotation":{"x":3.1472241912037138,"y":6.505634480761364,"z":1.111062622210011}},{"x":-3,"y":40.529179541161284,"scale":0.5149484905647114,"rotation":{"x":4.052251994935796,"y":8.74021230028011,"z":6.462313433550298}},{"x":103,"y":40.29928388888948,"scale":0.5078783689299599,"rotation":{"x":5.613469286006875,"y":1.9788363984785975,"z":7.727967867231928}},{"x":-3,"y":50.03295537550002,"scale":0.5562076949281618,"rotation":{"x":8.840843231184408,"y":8.13495380030945,"z":3.921875825384632}},{"x":103,"y":50.65724374423735,"scale":0.5528760332847014,"rotation":{"x":7.725392768881283,"y":3.5872829868691043,"z":2.713551767054014}},{"x":-3,"y":60.87825802946463,"scale":0.776695902319625,"rotation":{"x":6.299675050470978,"y":0.228923801984638,"z":8.477564782486297}},{"x":103,"y":60.10974907618947,"scale":0.7600526998285204,"rotation":{"x":1.022229556972161,"y":5.508819357841276,"z":5.572895817435346}},{"x":-3,"y":70.32667187321931,"scale":0.7504111016634851,"rotation":{"x":7.610198020329699,"y":6.237278012465685,"z":3.5163538495311517}},{"x":103,"y":70.91813789587468,"scale":0.5293289778288454,"rotation":{"x":9.213954091304913,"y":3.301615055440925,"z":0.7045994499931112}},{"x":-3,"y":80.1030878550373,"scale":0.6275510594947263,"rotation":{"x":5.8869272758252915,"y":2.668308685324155,"z":4.1330329980934035}},{"x":103,"y":80.84233492263593,"scale":0.6016350073972717,"rotation":{"x":3.628805675590411,"y":5.318003972596489,"z":1.6224395302124324}},{"x":-3,"y":90.7637214330025,"scale":0.7614667544839904,"rotation":{"x":2.9105132527882236,"y":7.746229230496101,"z":3.5440363342873753}},{"x":103,"y":90.30629163561389,"scale":0.6495552669046447,"rotation":{"x":1.3166572502814236,"y":9.21936807257589,"z":2.4213899993104864}}];
        var w = window.innerWidth;
        var h = window.innerHeight;
        var plane = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshBasicMaterial( {opacity: 0} ) );
        plane.name = 'base_plane';
        scene.add(plane);
        superarray.forEach(function(e,i) {
            create_cube(get_position(e.x/100*w, e.y/100*h),e.rotation,e.scale);
        });
        scene.remove(scene.getObjectByName('base_plane'));
    }

    function create_cube(p,r,s) {
        var cube = new THREE.Mesh( new THREE.CubeGeometry( 1, 1, 1 ), new THREE.testShader_cool_question_mark());//new THREE.PriznelShader({color1:0xffffff, color2:0x000000}));
        cube.name = 'rotate_cube';
        cube.position.set(p.x,p.y,p.z);
        cube.rotation.set(r.x,r.y,r.z);
        cube.scale.set(s,s,s);
        scene.add(cube);
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function get_position(x,y) {
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({x:x/window.innerWidth*2-1,y:-(y)/window.innerHeight*2+1},camera);
        var intersects = raycaster.intersectObjects(scene.children,true);
        if (intersects.length > 0) {
            var element;
            intersects.forEach(function(e) {
                if(e.object.name === 'base_plane'){
                    element = e;
                }
            });
            return element.point;
        }
    }

    function cube_bars() {
        var lastScrollTop = 0;
        var hitBottom = 0;
        $(window).on('mousewheel', function(event){
            if(hitBottom !== 2) {
                if($(this).scrollTop()%10) {
                    scene.children.forEach(function(e) {
                        if(/rotate_cube/.test(e.name)) {
                            e.rotation.x += direction * 0.003;
                            e.rotation.y += direction * 0.003;
                            e.rotation.z += direction * 0.003;
                        }
                    });
                }
                var st = $(this).scrollTop();
                if (st > lastScrollTop) direction = 10;
                else direction = -10;
                lastScrollTop = st;
                console.log($(window).scrollTop() + window.innerHeight, $(document).height());
                if(gameInit && ($(window).scrollTop() + window.innerHeight === $(document).height()) && (hitBottom === 1)) {
                    console.log('start game');
                    setTimeout(startGame,0);
                    hitBottom++;
                }
                else if(($(window).scrollTop() + window.innerHeight === $(document).height()) && (hitBottom === 0)) {
                    hitBottom++;
                    setTimeout(function(){
                        gameInit = true;
                    },1500);
                }
            }
            else {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        });
        generate_pixels();
    }

    function startGame() {
        spaceShip = new THREE.Mesh(new THREE.CubeGeometry(1,0.5,1), new THREE.PriznelShader());
        scene.add(spaceShip);
        lazer_type = 1;
        for(var i = 0; i < 100; i++) {
            asteroids.push(new THREE.Mesh(new THREE.OctahedronGeometry(0.3,2), new THREE.PriznelShader()));
            asteroids[asteroids.length-1].name = 'asteroid';
            asteroids[asteroids.length-1].position.x = getRandomArbitrary(-3, 3);
            asteroids[asteroids.length-1].position.y = getRandomArbitrary(-2, 2);
            asteroids[asteroids.length-1].position.z = getRandomArbitrary(-10, -100);
            scene.add(asteroids[asteroids.length-1]);
        }

        $(window).on('keydown', function(event) {
            console.log(event.keyCode);
            if(event.keyCode === 38) {shipUp = true;event.preventDefault();}
            else if(event.keyCode === 40) {shipDown = true;event.preventDefault();}
            else if(event.keyCode === 37) {shipLeft = true;event.preventDefault();}
            else if(event.keyCode === 39) {shipRight = true;event.preventDefault();}
            else if(event.keyCode === 32) {fire_lazer();event.preventDefault();}
        }).on('keyup', function(event) {
            if(event.keyCode === 38) {shipUp = false;event.preventDefault();}
            else if(event.keyCode === 40) {shipDown = false;event.preventDefault();}
            else if(event.keyCode === 37) {shipLeft = false;event.preventDefault();}
            else if(event.keyCode === 39) {shipRight = false;event.preventDefault();}
        });
    }

    function updateGame(delta) {
        if(spaceShip) {
            if(shipUp) spaceShip.position.y -= 1*delta;
            if(shipDown) spaceShip.position.y += 1*delta;
            if(shipLeft) spaceShip.position.x -= 1*delta;
            if(shipRight) spaceShip.position.x += 1*delta;
        }
        scene.children.forEach(function(e) {
            if(/asteroid/.test(e.name)) {
                e.position.z += (delta * 3);
            }
            else if(/lazer/.test(e.name)) {
                e.position.z -= (delta * 7.5);
                if(e.position.z < -40) {
                    scene.remove(e);
                    console.log('removed');
                }
            }
        });
    }
    function fire_lazer() {
        var lazer;
        if(lazer_type===0) {
            lazer = new THREE.Mesh(new THREE.CubeGeometry(0.15,1,0.005), new THREE.testShader_cool_question_mark());
            lazer.position.x = spaceShip.position.x;
            lazer.position.y = spaceShip.position.y;
            lazer.position.z -= 0.5;
            lazer.rotation.x = Math.PI * 0.5;
            lazer.name = 'lazer';
            scene.add(lazer);
        }
        else if(lazer_type===1) {
            lazer = new THREE.Mesh(new THREE.CubeGeometry(0.1,1,0.005), new THREE.testShader_cool_question_mark());
            lazer.position.x = spaceShip.position.x-0.075;
            lazer.position.y = spaceShip.position.y;
            lazer.position.z -= 0.5;
            lazer.rotation.x = Math.PI * 0.5;
            lazer.name = 'lazer';
            scene.add(lazer);
            lazer = new THREE.Mesh(new THREE.CubeGeometry(0.1,1,0.005), new THREE.testShader_cool_question_mark());
            lazer.position.x = spaceShip.position.x+0.075;
            lazer.position.y = spaceShip.position.y;
            lazer.position.z -= 0.5;
            lazer.rotation.x = Math.PI * 0.5;
            lazer.name = 'lazer';
            scene.add(lazer);
        }
    }

    function generate_points() {

    }

};
