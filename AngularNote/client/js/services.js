var services = angular.module('myApp.services', ['ngResource']);

// Resource: AngularTasks
// Author: Greg Dudding
// Purpose: This factory equips the resource object with query and create functions, to return the full list of tasks, or to create a new one, things we don't need an id for.
services.factory('AngularTasks', function ($resource) {
    return $resource('http://localhost:64331/api/Notes/', { Id: '@Id' }, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST', isArray: true }
    })
});

// Resource: AngularTask
// Author: Greg Dudding
// Purpose: This factory equips the resource object with show, update, and delete functions, things we need an id for.
services.factory('AngularTask', function ($resource) {
    return $resource('http://localhost:64331/api/Notes/:id', { Id: '@Id', EncryptedText: "@EncryptedText" }, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: { Id: '@Id', EncryptedText: '@EncryptedText' }, isArray: true },
        delete: { method: 'DELETE', params: { Id: '@Id' }, isArray: false }
    })
});


