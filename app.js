const validator = require('validator');
const notes = require("./notes.js");
const chalk = require('chalk');
const yargs = require('yargs');



// add, remove, read, list

yargs.version('1.1.0')

yargs.command({
    command:"add",
    describe:"Add a new note",
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string',
        },
        body:{
            describe:'Body of Note',
            demandOption:true,
            type:'string',
        }

    },
    handler(argv){
        notes.addNote(argv.title,argv.body);
        }
});

yargs.command({
    command:"remove",
    describe:"Remove a note",
    builder:{
        title:{
            describe:'Note title to be removed',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
        }
});

yargs.command({
    command:"read",
    describe:"Read a note",
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        note = notes.readNote(argv.title);
        if(note.length < 1){
            console.log(chalk.red.inverse("No Note Found!"))
        }
        else{
        console.log(note[0]);
        }

        }
});

yargs.command({
    command:"list",
    describe:"Lists all notes",
    handler(){
        notes.listNotes().forEach(note => {
            console.log("Title: " + note.t);
            console.log("Body: " + note.b);
            console.log("\n");
        });;
        }
});

yargs.parse();

