// Declare app level module which depends services
// configure the $routeProvider to put us on the correct partial page when we arrive at the matching route.
angular.module('myApp', ['myApp.services', 'myApp.controllers', 'ngRoute']).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/task-list', { templateUrl: 'partials/task-list.html', controller: 'TaskListCtrl' });
      $routeProvider.when('/task-detail/:id', { templateUrl: 'partials/task-detail.html', controller: 'TaskDetailCtrl' })
      $routeProvider.when('/task-creation', { templateUrl: 'partials/task-creation.html', controller: 'TaskCreationCtrl' })
      $routeProvider.otherwise({ redirectTo: '/task-list' });
  }]);