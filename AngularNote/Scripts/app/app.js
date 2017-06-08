var restApp = angular.module('restApp', ['ngRoute', 'ui.bootstrap', 'ngQuill']);

restApp.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', { //и так всё детектируется
            templateUrl: '/Scripts/app/NotesList.html',
            controller: 'notesListController'
        }).
        when('/angular/notes/edit/:noteId', {
            templateUrl: '/Scripts/app/EditNote.html',
            controller: 'noteEditController',
            resolve: {
                message: function ($http) {
                    $http.get('/').
                    success(function (data, status, headers, config) {
                        //console.log("no error occured!!");
                        //swal("no error occured!");
                    }).
                    error(function (data, status, headers, config) {
                        swal("Ошибка", "Сервер не запущен", "error");
                    });
                }
            }
        }).
        when('/angular/notes/show/:noteId', {
            templateUrl: '/Scripts/app/ShowNote.html',
            controller: 'noteShowController',
            resolve: {
                message: function ($http) {
                    $http.get('/').
                    success(function (data, status, headers, config) {
                        //console.log("no error occured!!");
                        //swal("no error occured!");
                    }).
                    error(function (data, status, headers, config) {
                        swal("Ошибка", "Сервер не запущен", "error");
                    });
                }
            }
        }).
        when('/angular/notes/add', {
            templateUrl: '/Scripts/app/AddNote.html',
            controller: 'noteAddController',
            resolve: {
                message: function ($http) {
                    $http.get('/').
                    success(function (data, status, headers, config) {
                        //console.log("no error occured!!");
                        //swal("no error occured!");
                    }).
                    error(function (data, status, headers, config) {
                        swal("Ошибка", "Сервер не запущен", "error");
                    });
                }
            }
        }).
        otherwise({
            redirectTo: function () {

                if (window.location.pathname == baseSiteUrlPath || window.location.pathname == baseSiteUrlPath + "angular") {
                    window.location = baseSiteUrlPath + "angular/notes";
                } else {
                    window.location = baseSiteUrl + "angular/page-not-found";
                }
            }
        });
  }]);

/*Пользовательский фильтр, сортирующий все записи по параметру, а потом убирающий все согласно поисковому запросу*/
restApp.filter('orderObjectBy', function () {
    return function (items, field, reverse, query) {
        //Sorting
        var filtered = [];
        angular.forEach(items, function (item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if (reverse)
            filtered.reverse();

        //Filtering
        var filtered2 = [];
        var letterMatch = new RegExp(query, 'i'); //where i - register independence
        for (var i = 0; i < filtered.length; i++) {
            var item = filtered[i];
            if (letterMatch.test(item.title.substring()) ||
                letterMatch.test(item.changed.substring()) ||
                letterMatch.test(item.created.substring())) {
                filtered2.push(item);
            }
        }
        return filtered2;
    };
});

/*Пользовательский фильтр для пагинации*/
restApp.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});