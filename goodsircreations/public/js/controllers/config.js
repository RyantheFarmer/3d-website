app.config(function(router) {
    router
        .when('/', {
            title : 'Home Page',
            actual_url : '/partials/home',
            controller : 'home_controller'
        })
        .when('/projects', {
            title : 'Projects Page',
            actual_url : '/partials/projects',
            controller : 'projects_controller'
        })
        .when('/contact', {
            title : 'Contact Page',
            actual_url : '/partials/contact',
            controller : 'contact_controller'
        })
        /*.when('/dynamic/page/:example/:stuff', {
            title : 'dont forget',
            actual_url : function(urlattr){return '/dynamic/page/teset/'+(urlattr.example?(urlattr.stuff+'/'+urlattr.example):'');},
            controller : 'view_scans_controller'
        })*/
        .otherwise({
            title : '404',
            actual_url : '/partials/404',
            controller : 'error_controller'
        });
});
