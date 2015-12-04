rms.config(function(router) {
    router
        .when('/rms', {
            title : 'Home Page',
            actualURL : '/partials/home',
            controller : 'homeController'
        })
        .when('/rms/login', {
            title : 'Login Page',
            actualURL : '/partials/login',
            controller : 'loginController'
        })
        .otherwise({
            title : '/rms/404',
            actualURL : '/partials/404',
            controller : 'errorController'
        });
});
