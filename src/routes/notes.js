const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
    console.log(req.body);
    const { title, description } = req.body;
    const errors = [];
    if (!title){
        errors.push({text: 'Please write a title.'});
    }
    if (!description){
        errors.push({text: 'Please write a description.'});        
    }
    if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        //res.send('ok')
        //creando un nuevo dato
        const newNote = new Note({title, description});
        //console.log(newNote);
        await newNote.save();
        res.redirect('/notes');
    }
});

router.get('/notes', async (req, res) => {
    //res.send('Notes from database');
    //Note.find({title: 'asdasdasd'});
    const notes = await Note.find();
    res.render('notes/all-notes', { notes });
});

module.exports = router;