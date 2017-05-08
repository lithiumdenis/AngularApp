var restApp = angular.module('restApp', ['ngRoute']);

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