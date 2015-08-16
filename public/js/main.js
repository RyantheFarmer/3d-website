(function() {
	$(document).ready(function() {
		new Background3D('main_background');

		var lastScrollTop = 0;
		$(window).scroll(function(event){
			var st = $(this).scrollTop();
			if (st > lastScrollTop){
				$('#header').css({
					'height' : '30px',
					'top' : '15px',
					'background-color': 'rgba(255,255,255,0.75)'
				});
				$('#navigation a').css({
					'line-height' : '30px'
				});
				$('#header_logo').css({
					'top':'-14px',
					'border': '1px solid rgba(204,204,204,1)'
				});
			}
			else {
				$('#header').css({'height' :'','top':'','background-color':''});
				$('#navigation a').css({'line-height':''});
				$('#header_logo').css({'top':'','border':''});
			}
			lastScrollTop = st;
		});
	});
}());
