restApp.controller("noteAddController", ['$scope', '$http', '$window', '$routeParams', '$location', '$timeout', function ($scope, $http, $window, $routeParams, $location, $timeout) {
    $scope.newNote = {};
    $scope.addNote = function () {
        if ($scope.addNoteForm.$valid) {
            $http.post('http://localhost:64331/api/note', $scope.newNote, {}).success(
                function () {

                    $scope.reportMessageSucces = true; // показать сообщение
                    $scope.messageShow = "Запись успешно сохранена";
                    $timeout(function () {
                        $scope.reportMessageSucces = false;
                    }, 3000);

                }).error(
                function (response) {

                    $scope.reportMessageError = true; // показать сообщение
                    if (response == null) {
                        $scope.messageShow = "Сервер недоступен";
                    }
                    else {
                        $scope.messageShow = "Ошибка " + response.status + ". " + response.statusText;
                    }
                    $timeout(function () {
                        $scope.reportMessageError = false;
                    }, 3000); // скрыть через время

                });
            //Переход обратно спустя время
            $timeout(function () {
                $location.path('/');
            }, 3000)
        }
        else {
            $scope.addNoteForm.submitted = true;
        }
    };
}]);