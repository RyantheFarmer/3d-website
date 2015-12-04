var app = new ViewManager('#main_view');
app.setPreventSamelocation(true);
app.controller(function($scope) { // global controller
    $(document).ready(function() {
        $('a').on('click', function(event) {
            if($(this).attr('data') === 'html5') {
                event.preventDefault();
                $scope.location(this.href);
            }
        });
        new Background3D('main_background',0);

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
});
