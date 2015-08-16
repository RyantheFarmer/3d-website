function priz_drop(drop_target, target_theme, acceptable_types) {
	'use strict';
	var drop_scene;
	var drop_callback;
	function init() {
		drop_scene = create_drop_scene(target_theme);
		$(drop_target).on('dragenter', function(event) {
			pdsp(event);
			$('body').append(drop_scene);
			setTimeout(function() {
				drop_scene.style.transform = 'scale3d(1,1,1)';
				drop_scene.style.opacity = '1';
			}, 50);
			$(drop_scene).one('drop', function(event) {
				pdsp(event);
				$(drop_scene).off('dragover');
				drop_scene.style.transform = 'scale3d(1,0.8,0.8)';
				drop_scene.style.opacity = '0.00001';
				setTimeout(function() {
					$(drop_scene).remove();
				}, 450);
				var files = [];
				var rejects = [];
				for(var i = 0; i < event.originalEvent.dataTransfer.files.length; i++) {
					var type = event.originalEvent.dataTransfer.files[i].type;
					if(acceptable_types)
						acceptable_types.forEach(function(e) {
							if(type==e) files.push(event.originalEvent.dataTransfer.files[i]);
							else rejects.push(event.originalEvent.dataTransfer.files[i]);
						});
					else files.push(event.originalEvent.dataTransfer.files[i]);
				}
				drop_callback(files, rejects);
			}).on('dragover',pdsp);
		}).on('drop',pdsp).on('dragover',pdsp);
	}
	function pdsp(e){e.stopPropagation();e.preventDefault();}
	function create_drop_scene() {
		var d_s = document.createElement('div');
		var styles = {
			height : 'calc(100% - 28px)',
			width : 'calc(100% - 28px)',
			position : 'fixed',
			margin : '10px',
			padding : 0,
			opacity : 0.00001,
			backgroundColor : 'rgba(50,50,50,0.4)',
			borderRadius : '9px',
			border : 'dotted 4px rgba(30,30,30,.6)',
			zIndex : '999999',
			transition : 'transform 200ms, opacity 200ms',
			transform : 'scale3d(0.8,0.8,1)'
		};
		Object.keys(styles).forEach(function(e) {
			d_s.style[e] = styles[e];
		});
		d_s.class = 'priz_drop_target';
		return d_s;
	}
	this.on_drop = function(callback) {drop_callback = callback;};
	this.remove = function() {
		$(drop_target).off('dragenter');
		$(drop_target).off('dragleave');
		$(drop_target).off('drop');
		drop_target = null;
		drop_scene = null;
	};
	init();
};