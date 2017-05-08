restApp.controller("notesListController", ['$scope', '$http', '$window', '$routeParams', '$location', function ($scope, $http, $window, $routeParams, $location) {    
    $http.get('http://localhost:64331/api/note').success(
        function (data) {
            $scope.notes = data;
        });

    $scope.deleteNote = function (id) {        
        $http.delete('http://localhost:64331/api/note/' + id).success(
            function (data) {
                $scope.notes = data;
            }).error(function () {
                $window.alert('error');})
    };

    $scope.editNote = function (id) {
        $location.path('/angular/notes/edit/' + id);
    }

    $scope.addNote = function () {
        $location.path('/angular/notes/add')
    }
}]);