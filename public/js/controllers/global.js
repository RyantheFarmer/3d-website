priz_app.controller('home_controller', function() {
    var drag_drop_listener;
    return {
        init : function($scope) {
            $('#editDocsButton').on('click', function() {
                $scope.location('/editdocs');
            });
            $('#shaderButton').on('click', function(){
                $scope.location('/shaders');
            });



            /*drag_drop_listener = new priz_drop('#home_container', 'priz_drop_window');
            drag_drop_listener.on_drop(function(files) {
                console.log(files);
            });
            setTimeout(function(){$priz_modal.bool_window(
                'Title',
                'Message thing stuff banana test out how this works I could put tons of text in here potentially like a lot like woah.',
                function(res) {
                    console.log(res);
                });
            }, 1500);*/
            $('#test_slider').noUiSlider({
                start: [50],
                range: {
                    'min': 0,
                    'max': 100
                },
                behaviour: 'snap'
            });
            $('#test_slider').Link('lower').to(function(value, handleElement, slider) {
                $('#test_slider .noUi-handle').attr('value',value.split('.')[0]);
            });
            $('#test_dropdown').selectBox();
        },
        exit : function($scope) {
            //drag_drop_listener.remove();
            //drag_drop_listener = undefined;
            $('#tempButton').off('click');
            $('#test_slider').remove();
            $('#editDocsButton').off('click');
            $('#shaderButton').off('click');
        }
    };
});
