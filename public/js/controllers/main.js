var priz_app = new PrizmiqViewManager('#priz_main_view');
priz_app.setPreventSamelocation(true);
priz_app.controller(function($scope) { // global controller
    $(document).ready(function() {
        $('a').on('click', function(event) {
            if($(this).attr('data') === 'html5') {
                event.preventDefault();
                $scope.location(this.href);
            }
        });
        $('#priz_main_logout_button').on('click', function(event){
            //log user out, then...
            $scope.location('/login');
        });
        var cardTimeout;
        $('#priz_main_searchbar').on('keydown', function(event) {
            if(event.which === 27) {
                clearTimeout(cardTimeout);
                $pc.clear();
            }
            else {
                var self = $(this);
                clearTimeout(cardTimeout);
                cardTimeout = setTimeout(function(){
                    if(self.val()) $pc.query(self.val());
                    else $pc.clear();
                }, (event.which === 13)?0:500);
            }
        });
        $('#priz_main_searchbar').on('focusout', function(event) {
            $pc.clear();
        });
        $('#main_view_fs:not(.fullscreen)').on('click', function() {
            var offset = $('#priz_main_view.base_container').offset();
            var dim = {
                width: $('#priz_main_view.base_container').width(),
                height: $('#priz_main_view.base_container').height()
            };
            $('#priz_main_view.base_container').css({
                transition: 'top 200ms, left 200ms, width 200ms, height 200ms',
                left: offset.left + 'px',
                top: offset.top + 'px',
                width: dim.width + 'px',
                height: dim.height + 'px',
                position: 'fixed'
            });
            setTimeout(function(){
                $('#priz_main_view.base_container').css({
                    left: '0px',
                    top: '0px',
                    width: $(document).width() + 'px',
                    height: $(document).height() + 'px'
                });
            },10);
        });
        $('#main_view_fs.fullscreen').on('click', function() {
            var offset = $('#priz_main_view').offset();
            var dim = {
                width: $('#priz_main_view').width(),
                height: $('#priz_main_view').height()
            };
            $('#priz_main_view.base_container').css({
                transition: 'top 200ms, left 200ms, width 200ms, height 200ms',
                left: offset.left + 'px',
                top: offset.top + 'px',
                width: dim.width + 'px',
                height: dim.height + 'px',
                position: 'fixed'
            });
            setTimeout(function(){
                $('#priz_main_view.base_container').css({
                    left: '0px',
                    top: '0px',
                    width: $('#priz_main_view').width() + 'px',
                    height: $('#priz_main_view').height() + 'px',
                    position: 'absolute'
                });
            },200);
        });
    });
});
