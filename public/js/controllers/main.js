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
    });
});
