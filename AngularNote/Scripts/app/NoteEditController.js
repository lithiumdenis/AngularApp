restApp.controller("noteEditController", ['$scope', '$http', '$window', '$routeParams', '$location', function ($scope, $http, $window, $routeParams, $location) {

    $http.get('http://localhost:64331/api/note/' + $routeParams.noteId).success(
            function (data) {
                $scope.note = data;
            }).error(
            function (error) {
                $window.alert('Error: ' + error);
            });

    $scope.updateNote = function () {
        if ($scope.editNoteForm.$valid) {
            $http.put('http://localhost:64331/api/note', $scope.note, {}).success(
                function () {

                }).error(
                function (error) {
                    $window.alert('Error: ' + error);
                });

            $location.path('/');
        }
        else {
            $scope.editNoteForm.submitted = true;
        }
    };
}]);