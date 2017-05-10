restApp.controller("notesListController", ['$scope', '$http', '$window', '$routeParams', '$location', function ($scope, $http, $window, $routeParams, $location, $filter) {
    $http.get('http://localhost:64331/api/note').success(
        function (data) {
            $scope.notes = data;

            //Pagination
            $scope.totalItems = $scope.notes.length;
            $scope.currentPage = 0;
            $scope.numPerPage = 3;
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

    //Page sort
    $scope.reverseOrder = false;
    $scope.sortField = 'created';

    $scope.sortBy = function (sortField) {
        $scope.reverseOrder = ($scope.sortField === sortField) ? !$scope.reverseOrder : false;
        $scope.sortField = sortField;
    };

    //Pagination

    $scope.numberOfPages = function () {
        $scope.totalPages = Math.ceil($scope.totalItems / $scope.numPerPage);
        //return Math.ceil($scope.totalItems / $scope.numPerPage);
    }
}]);