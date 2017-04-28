app.service("crudAJService", function ($http) {
    //get all notes
    //Имя для this - произвольное, а путь из MVC контроллера
    this.getAllNotes = function () {
        return $http.get("Home/GetAllNotes");
    };

    //get Note by noteId
    this.getNote = function (noteId) {
        var response = $http({
            method: "post",
            url: "Home/GetNoteById",
            params: {
                id: JSON.stringify(noteId)
            }
        });
        return response;
    };

    // Update Note 
    this.updateNote = function (note) {
        var response = $http({
            method: "post",
            url: "Home/UpdateNote",
            data: JSON.stringify(note),
            dataType: "json"
        });
        return response;
    }

    // Add Note
    this.AddNote = function (note) {
        var response = $http({
            method: "post",
            url: "Home/AddNote",
            data: JSON.stringify(note),
            dataType: "json"
        });
        return response;
    }

    //Delete Note
    this.DeleteNote = function (noteId) {
        var response = $http({
            method: "post",
            url: "Home/DeleteNote",
            params: {
                noteId: JSON.stringify(noteId)
            }
        });
        return response;
    }
});