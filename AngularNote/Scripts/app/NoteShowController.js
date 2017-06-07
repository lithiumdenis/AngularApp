﻿restApp.controller("noteShowController", ['$scope', '$http', '$window', '$routeParams', '$location', function ($scope, $http, $window, $routeParams, $location) {
    $http.get('http://localhost:64331/api/note/' + $routeParams.noteId).success(
            function (data) {
                $scope.note = data;
            }).error(
            function (error) {
                alert("Ошибка при получении записи. Проверьте, запущен ли сервер");
                $window.alert('Error: ' + error);
            });

    $scope.closeNote = function () {
        $location.path('/');
    };
}]);