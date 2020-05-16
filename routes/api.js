var notes = require("../db/db");
var fs = require("fs");
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        return res.json(notes);
    });

    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        if (notes === []) {
            newNote.id = 1;
        } else {
            newNote.id = notes.length - 1;
        }
        notes.push(newNote);
        var strNotes = JSON.stringify(notes);
        fs.writeFile("db/db.json", strNotes, function (err) {
            if (err) throw err;
            console.log("Note was sent");
            return newNote;
        });
        res.send("Updating notepage")
    });

    app.delete("/api/notes/:id", function (req, res) {
        var noteId = req.params.id;
        // splice(notes);
        for (i = 0; i < notes.length; i++) {
            console.log(notes[i]);
            notes.splice(noteId);
            var strNotes = JSON.stringify(notes);
            fs.writeFile("db/db.json", strNotes, function (err) {
                if (err) throw err;
                console.log("Note was removed");
                res.send("Updating page with note removed");
            });
        }
    });
}
