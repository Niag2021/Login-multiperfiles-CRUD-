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
        res.flash('success_msg', 'Note Added Successfully');
        res.redirect('/notes');
    }
});

router.get('/notes', async (req, res) => {
    //res.send('Notes from database');
    //Note.find({title: 'asdasdasd'});
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note});    
});

router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, description  } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_mgs', 'Note Updated Successfull');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id); 
    //console.log(req.params);
    //res.send('ok');
    req.flash('success_mgs', 'Note Deleted Successfull');
    res.redirect('/notes');
});

module.exports = router;