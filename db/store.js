const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

const uuidv1 = require('uuid').v1;

class Store {}
Store.prototype.read = function() {
    return readFileAsync('db/db.json', 'utf8')
}

Store.prototype.write = function(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note))
}

Store.prototype.getNotes = function() {
    return this.read().then(data => {
        let parsedNotes;

        try {
            parsedNotes = [].concat(JSON.parse(data))
        } catch (err) {
            parsedNotes = []
        }

        return parsedNotes;
    })
}

Store.prototype.addNote = function(note) {
    const {title, text} = note;

    if(!title || !text) {
        throw new Error("Note 'title' and 'text' cannot be blank.")
    }

    const newNote = {
        title,
        text,
        id: uuidv1()
    }

    return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => newNote)
}

Store.prototype.removeNote = function(id) {
    return this.getNotes()
        .then(notes => notes.filter(note => note.id != id))
        .then(filteredNotes => this.write(filteredNotes))
}

module.exports = new Store()