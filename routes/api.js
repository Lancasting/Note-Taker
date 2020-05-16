const Store = require('../db/store')
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        Store.getNotes().then(notes => res.json(notes))
    });

    app.post("/api/notes", function (req, res) {
        Store.addNote(req.body)
            .then(note => res.json(note))
    });

    // app.delete("/api/notes/:id", function (req, res) {
    //     var noteId = req.params.id;
    //     // splice(notes);
    //     for (i = 0; i < notes.length; i++) {
    //         console.log(notes[i]);
    //         notes.splice(noteId);
    //         var strNotes = JSON.stringify(notes);
    //         fs.writeFile("db/db.json", strNotes, function (err) {
    //             if (err) throw err;
    //             console.log("Note was removed");
    //             res.send("Updating page with note removed");
    //         });
    //     }
    // });

    app.delete("/api/notes/:id", function (req, res) {
        var noteId = req.params.id;
        Store.removeNote(noteId)
            .then(() => res.json({ ok: true }))
            .catch(err => res.status(500).json(err));
    });
}
