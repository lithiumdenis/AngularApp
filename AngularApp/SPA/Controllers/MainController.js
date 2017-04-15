var MainController = function ($scope) {
    $scope.models = {
        locations: [
            { id: "1", Location: "Воронеж" },
            { id: "2", Location: "Москва" },
            { id: "3", Location: "Санкт-Петербург" },
        ]
    };
    $scope.selectedLocation = $scope.models.locations[0];

    $scope.changeLocation = function (loc) {
        $scope.selectedLocation = loc;
    }
}

MainController.$inject = ['$scope'];