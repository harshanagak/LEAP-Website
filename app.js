const express = require('express');
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/initiatives', (req, res) => {
  res.send('Here are our current initiatives...');
});

app.get('/events', (req, res) => {
  res.send('Here are the upcoming events...');
});

app.post('/contact', (req, res) => {
  // Handle form submission
  console.log(req.body);
  res.redirect('/');
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
