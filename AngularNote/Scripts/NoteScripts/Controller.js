var app = angular.module('myApp.controllers', []);

// Controller: TaskListCtrl
// Author: Greg Dudding
// Params: $scope - The scope object, for persisting values for angular
//         'AngularTasks' - A resource for dealing with multiple tasks or creating new tasks, actions we need no id for.
//         'AngularTask'  - A resource for dealing with single tasks for updating and deleting, actions we need an id for.
//         '$location' - For routing
// Purpose: To enable the interfaces available on the task-list partial template (edit button, delete button, and create button) to use the angular resource object
//          that represents our REST Service.

app.controller('TaskListCtrl', ['$scope', 'AngularTasks', 'AngularTask', '$location', function ($scope, AngularTasks, AngularTask, $location) {
    $scope.editTask = function (TaskId) {
        // Push the user to the details page for this task.
        $location.path('/task-detail/' + TaskId);
    };

    $scope.deleteTask = function (taskId) {
        // Confirm the deletion of the task.
        var result = confirm("Are you sure you want to discard or complete this task?");
        if (result) {
            AngularTask.delete({ id: taskId });  // Call the controller's delete function.
            $scope.tasks = AngularTasks.query(); // Refresh $scope.tasks with a new list of tasks now that we've removed one.
        }
        $scope.tasks = AngularTasks.query();

    };

    $scope.createNewTask = function () {
        // Push the user to the task creation page.
        $location.path('/task-creation');
        $scope.tasks = AngularTasks.query();
    }

    $scope.tasks = AngularTasks.query();
}]);

// Controller: TaskDetailCtrl
// Author: Greg Dudding
// Params: $scope - The scope object, for persisting values for angular
//         'AngularTask'  - A resource for dealing with single tasks for updating and deleting, actions we need an id for.
//         '$location' - For routing
//         '$routeParams' - To carry values from the route path.
// Purpose: To enable the interfaces available on the task-detail partial template (update button) to use the angular resource object that represents
//          our REST Service.
app.controller('TaskDetailCtrl', ['$scope', '$routeParams', 'AngularTask', '$location',
    function ($scope, $routeParams, AngularTask, $location) {
        $scope.updateTask = function () {
            AngularTask.update($scope.task.TaskId, $scope.task.TaskDescription);
            $location.path('/task-list/');
        };
        $scope.cancel = function () {
            $location.path('task-list');
        };
        $scope.task = AngularTask.show({ id: $routeParams.id })
    }
]);

app.controller('TaskCreationCtrl', ['$scope', 'AngularTasks', '$location', function ($scope, AngularTasks, $location) {
    $scope.createNewTask = function () {
        AngularTasks.create($scope.task);
        $scope.tasks = AngularTasks.query();
        $location.path('task-list');
    }
}]);