﻿var restApp = angular.module('restApp', ['ngRoute', 'ui.bootstrap', 'ngQuill']);

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
        when('/angular/notes/show/:noteId', {
            templateUrl: '/Scripts/app/ShowNote.html',
            controller: 'noteShowController'
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

restApp.run(['$rootScope', '$timeout', function ($rootScope, $timeout) {
    $rootScope.$on('$routeChangeError', function () {
        //детектор ошибок при загрузке templateURL
        //$rootScope можно передать в любой контроллер со всем содержимым
        $rootScope.reportRootScopeMessageError = true; // показать сообщение

        $timeout(function () {
            $rootScope.reportRootScopeMessageError = false;
        }, 3000); // скрыть через время
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