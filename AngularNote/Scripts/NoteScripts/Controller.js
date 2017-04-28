app.controller("mvcCRUDCtrl", function ($scope, crudAJService) {
    $scope.divNote = false;
    GetAllNotes();

    //To get all note records
    function GetAllNotes()
    {
        debugger;
        var getNoteData = crudAJService.getAllNotes();
        getNoteData.then(function (note) {
            $scope.notes = note.data;
        }, function () {
            alert('Error in getting note records');
        });
    }

    $scope.editNote = function (note)
    {
        var getNoteData = crudAJService.getNote(note.Id);
        getNoteData.then(function (_note) {
            $scope.note = _note.data;
            $scope.noteId = note.Id;
            $scope.noteDate = note.Date;
            $scope.noteEncryptedText = note.EncryptedText;
            $scope.Action = "Update";
            $scope.divNote = true;
        }, function () {
            alert('Error in getting note records');
        });
    }

    $scope.AddUpdateNote = function () {
        var Note = {
            Date: $scope.noteDate,
            EncryptedText: $scope.noteEncryptedText
        };
        var getNoteAction = $scope.Action;

        if (getNoteAction == "Update") {
            Note.Id = $scope.noteId;
            var getNoteData = crudAJService.updateNote(Note);
            getNoteData.then(function (msg) {
                GetAllNotes();
                alert(msg.data);
                $scope.divNote = false;
            }, function () {
                alert('Error in updating note record');
            });
        } else {
            var getNoteData = crudAJService.AddNote(Note);
            getNoteData.then(function (msg) {
                GetAllNotes();
                alert(msg.data);
                $scope.divNote = false;
            }, function () {
                alert('Error in adding note record');
            });
        }
    }

    $scope.AddNoteDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divNote = true;
    }

    $scope.deleteNote = function (note) {
        var getNoteData = crudAJService.DeleteNote(note.Id);
        getNoteData.then(function (msg) {
            alert(msg.data);
            GetAllNotes();
        }, function () {
            alert('Error in deleting note record');
        });
    }

    function ClearFields() {
        $scope.noteId = "";
        $scope.noteDate = "";
        $scope.noteEncryptedText = "";
    }

    $scope.Cancel = function () {
        $scope.divNote = false;
    };
});