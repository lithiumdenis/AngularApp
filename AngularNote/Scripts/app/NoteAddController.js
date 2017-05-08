restApp.controller("noteAddController", ['$scope', '$http', '$window', '$routeParams', '$location', function ($scope, $http, $window, $routeParams, $location) {

    $scope.newNote = {};

    $scope.addNote = function () {
        if ($scope.addNoteForm.$valid) {
            $http.post('http://localhost:64331/api/note', $scope.newNote, {}).success(
                function () {
                });

            $location.path('/');
        }
        else {
            $scope.addNoteForm.submitted = true;
        }
    };
}]);