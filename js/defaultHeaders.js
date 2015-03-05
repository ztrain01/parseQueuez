var app = angular.module('parseQ');

app.factory('httpRequestInterceptor', function () {
    return {
        request: function (config) {
            config.headers = {'X-Parse-Application-Id': 'INSERT-YOUR-APPLICATION-ID', 'X-Parse-REST-API-Key': 'INSERT-YOUR-REST-API-KEY'};
            return config;
        }
    };
});