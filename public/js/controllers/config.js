priz_app.config(function(router) {
    router
        .when('/', {
            title : 'Home Page',
            actual_url : '/partials/home',
            controller : 'home_controller'
        })
        .when('/login', {
            title : 'Login Page',
            actual_url : '/partials/login',
            controller : 'login_controller'
        })
        .when('/admin', {
            title : 'Admin Page',
            actual_url : '/partials/admin',
            controller : 'admin_controller'
        })
        .when('/docs', {
            title : 'Documentation Page',
            actual_url : '/partials/docs',
            controller : 'docs_controller'
        })
        .when('/shaders', {
            title : 'Test Shaders Page',
            actual_url : '/partials/shaders',
            controller : 'shaders_controller'
        })
        .when('/editdocs', {
            title : 'Markdown Page',
            actual_url : '/partials/editdocs',
            controller : 'editdocs_controller'
        })
        .when('/scans/view/:client_id/:model_id', {
            title : 'View Model Page',
            actual_url : function(urlattr){return '/partials/scans/view/'+(urlattr.model_id?(urlattr.client_id+'/'+urlattr.model_id):'');},
            controller : 'view_scans_controller'
        })
        .when('/scans/edit/:client_id/:model_id', {
            title : 'Edit Model Page',
            actual_url : function(urlattr){
                return '/partials/scans/edit'+(urlattr.client_id?('/'+urlattr.client_id+(urlattr.model_id?'/'+urlattr.model_id:'')):'');
            },
            controller : 'edit_scans_controller'
        })
        .when('/scans/add/', {
            title : 'Add Model Page',
            actual_url : '/partials/scans/add',
            controller : 'add_scans_controller'
        })
        .otherwise({
            title : '404',
            actual_url : '/partials/404',
            controller : 'error_controller'
        });
});
