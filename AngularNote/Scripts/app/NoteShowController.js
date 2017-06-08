restApp.controller("noteShowController", ['$scope', '$http', '$window', '$routeParams', '$location', '$timeout', function ($scope, $http, $window, $routeParams, $location, $timeout) {
    $http.get('http://localhost:64331/api/note/' + $routeParams.noteId).success(
            function (data) {
                $scope.note = data;

                $scope.reportMessageSucces = true; // показать сообщение
                $scope.messageShow = "Запись успешно загружена";
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

    $scope.closeNote = function () {
        $location.path('/');
    };
}]);