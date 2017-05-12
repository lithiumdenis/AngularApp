restApp.controller("notesListController", ['$scope', '$http', '$window', '$routeParams', '$location', function ($scope, $http, $window, $routeParams, $location, $filter) {
    $http.get('http://localhost:64331/api/note').success(
        function (data) {
            $scope.notes = data;
            //Pagination
            $scope.totalItems = $scope.notes.length;
            $scope.currentPage = 0;
            $scope.numPerPage = 10;
        });

    $scope.deleteNote = function (id) {
        $http.delete('http://localhost:64331/api/note/' + id).success(
            function (data) {
                $scope.notes = data;
            }).error(function () {
                $window.alert('error');
            })
    };

    $scope.showNote = function (id) {
        $location.path('/angular/notes/show/' + id);
    }

    $scope.editNote = function (id) {
        $location.path('/angular/notes/edit/' + id);
    }

    $scope.addNote = function () {
        $location.path('/angular/notes/add')
    }

    //Page sort
    $scope.reverseOrder = true;
    $scope.sortField = 'created';

    $scope.sortBy = function (sortField) {
        $scope.reverseOrder = ($scope.sortField === sortField) ? !$scope.reverseOrder : false;
        $scope.sortField = sortField;
    };

    //Pagination
    $scope.numberOfPages = function () {
        if (undefined == $scope.filteredNotes)
            return 1;
        else
            return Math.ceil($scope.filteredNotes.length / $scope.numPerPage);
    }

    //Convert server time (UTC+0) to client time (for example, UTC+3 for Moscow time)
    $scope.convertUTCDateToLocalDate = function (dateCurr) {
        var date = new Date(dateCurr);
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;
    }
}]);