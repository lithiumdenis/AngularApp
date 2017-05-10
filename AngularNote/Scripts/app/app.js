var restApp = angular.module('restApp', ['ngRoute', 'ui.bootstrap', 'ngResource']);

restApp.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
            templateUrl: '/Scripts/app/NotesList.html',
            controller: 'notesListController'
        }).
        when('/angular/notes/edit/:noteId', {
            templateUrl: '/Scripts/app/EditNote.html',
            controller: 'noteEditController'
        }).
        when('/angular/notes/add', {
            templateUrl: '/Scripts/app/AddNote.html',
            controller: 'noteAddController'
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

//restApp.filter('startFrom', function () {
//    return function (input, start) {
//        if (!angular.isArray(input)) {
//            return [];
//        }
//        start = +start; //parse to int
//        return input.slice(start);
//    };
//});

restApp.filter('orderObjectBy', function () {
    return function (items, field, reverse, query, start) {
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
            if (letterMatch.test(item.description.substring()) ||
                letterMatch.test(item.changed.substring()) ||
                letterMatch.test(item.created.substring())) {
                filtered2.push(item);
            }
        }
        
        //Pagination
        start = +start; //parse to int
        return filtered2.slice(start);
    };
});