require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var Note = require('./models/note');
var bodyParser = require('body-parser');

var app = express();

// Middleware
app.use(function(req, res, next) {
  // Allow CORS
  res.header('Access-Control-Allow-Origin', '*');

  // Allow Content-Type header (for JSON payloads)
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Body parsing for JSON POST payloads
app.use(bodyParser.json());

// READ all notes
app.get('/', function(req, res) {
  Note
    .find()
    .then(function(notes) {
      res.json(notes);
    });
});

// READ one note
app.get('/:id', function(req, res) {
  Note
    .findOne({
      _id: req.params.id
    })
    .then(function(note) {
      res.json(note);
    });
});

// CREATE a note
app.post('/', function(req, res) {
  var note = new Note({
    title: req.body.note.title,
    body_html: req.body.note.body_html
  });

  note
    .save()
    .then(function(noteData) {
      res.json({
        message: 'Successfully updated note',
        note: noteData
      })
    });
});

app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
