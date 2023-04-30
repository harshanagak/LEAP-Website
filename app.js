// Import required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/blogs', (req, res) => {
  // res.send('Here are our current initiatives...');
  res.sendFile(__dirname + '/Contents/blogs.html')
});

app.get('/events', (req, res) => {
  // res.send('Here are the upcoming events...');
  res.sendFile(__dirname + '/Contents/events.html')
});

app.get('/subteams', (req, res) => {
  // res.send('Here are the upcoming events...');
  res.sendFile(__dirname + '/Contents/subteams.html')
});

app.get('/about', (req, res) => {
  // res.send('Here are the upcoming events...');
  res.sendFile(__dirname + '/Contents/about.html')
});

app.get('/contact', (req, res) => {
  // res.send('Here are the upcoming events...');
  res.sendFile(__dirname + '/Contents/contact.html')

});

app.post('/contact', (req, res) => {
  // Handle form submission
  console.log(req.body);
  res.redirect('/');
});


// Start the server
app.listen(3000, function() {
  console.log('LEAP website backend server listening on port 3000!');
});
