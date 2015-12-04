rms.controller('loginController', function() {
    return {
        init : function($scope) {
            var loggingIn = false;
            $('#header').css({'z-index': 1 });
            setTimeout(function(){
                $('#loginWindow').css({
                    'transform': 'translateY(-50%) rotateX(0deg)',
                    '-webkit-transform': 'translateY(-50%) rotateX(0deg) rotateY(0deg)',
                    '-moz-transform': 'translateY(-50%) rotateX(0deg) rotateY(0deg)',
                    '-o-transform': 'translateY(-50%) rotateX(0deg) rotateY(0deg)',
                    'opacity': '1'
                });
            },250);
            $('#loginInput3').click(function() {
                loggingIn = true;
                $('#loginContent').children('input').prop('disabled', loggingIn);
                $.post('/api/v1/account/login', { username: $('#loginInput1').val(), password: $('#loginInput2').val() }, function(data, textStatus, xhr) {
                    data = JSON.parse(data);
                    if(data.err) {
                        console.log(data.err);
                    }
                    if(data.success) {
                        $scope.location('/rms');
                        $('#header').css({'z-index': '' });
                        $('#loginWindow').css({
                            'transform': 'translateY(-60%) rotateX(-10deg) rotateY(0deg)',
                            '-webkit-transform': 'translateY(-60%) rotateX(-10deg) rotateY(0deg)',
                            '-moz-transform': 'translateY(-60%) rotateX(-10deg) rotateY(0deg)',
                            '-o-transform': 'translateY(-60%) rotateX(-10deg) rotateY(0deg)',
                            'opacity': ''
                        });
                    }
                    else {
                        $('#loginWindow').addClass('shake');
                        setTimeout(function () {
                            $('#loginWindow').removeClass('shake');
                            loggingIn = false;
                            $('#loginContent').children('input').prop('disabled', loggingIn);
                            $('#loginInput1').focus();
                        }, 1500);
                    }
                });
            });
            $('#loginContent input').keydown(function(event) {
                if (event.which === 13) {
                    $('#loginInput3').click();
                    event.preventDefault();
                }
            });
        },
        exit : function($scope) {
        }
    };
});
