var notes = require("../db/db");
var fs = require("fs");
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        return res.json(notes);
    });

    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        if (notes === "") {
            newNote.id = 0;
        } else {
            newNote.id = notes.length - 1;
        }
        notes.push(newNote);
        var strNotes = JSON.stringify(notes);
        fs.writeFile("db/db.json", strNotes, function (err) {
            if (err) throw err;
            console.log("note was sent");
            return newNote;
        });
    });

    app.delete("/api/notes/:id", function (req, res) {
        var noteId = req.params.id;
        // splice(notes);
        for (i = 0; i < notes.length; i++) {
            notes.splice(noteId[i]);
            var strNotes = JSON.stringify(notes);
            fs.writeFile("db/db.json", strNotes, function (err) {
                if (err) throw err;
                console.log("Note was removed");
            });
        }
    });
}
