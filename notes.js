const fs = require('fs');
const chalk = require('chalk');


const addNote = (title,body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.t === title)

    if(duplicateNotes.length === 0){
        notes.push({
            t:title,
            b:body
        });   
    saveNotes(notes);
    console.log(chalk.green.inverse("Note saved!"));
    }
    else{
        console.log(chalk.red.inverse("Title already taken"));
    }
}

const saveNotes = (notes) => {
    const jsonNotes = JSON.stringify(notes);
    fs.writeFileSync('notes.json',jsonNotes);
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        const notes = JSON.parse(dataJson);
        return notes;
    } catch (error) {
        return [];
    }
 
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newList  = notes.filter((note) => note.t !== title);
    if(newList.length < notes.length){
        saveNotes(newList);
        console.log(chalk.green.inverse("Note deleted!"));
    }
    else{
        console.log(chalk.red.inverse("No Note Found!"));

    }

    }

const listNotes = () => {
    return loadNotes();
}

const readNote = (title) => {
    const notes = loadNotes();
    return notes.filter((note) => note.t === title)
}

module.exports = {
    listNotes:listNotes,
    addNote:addNote,
    removeNote:removeNote,
    readNote:readNote,
}