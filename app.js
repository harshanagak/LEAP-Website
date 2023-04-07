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


// Define a route for the contact form submission
app.post('/contact', function(req, res) {
  // Get the form data from the request body
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Create a nodemailer transporter object
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-gmail-username',
      pass: 'your-gmail-password'
    }
  });

  // Define the email message options
  const mailOptions = {
    from: 'your-gmail-username',
    to: 'your-email-address',
    subject: 'New LEAP Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

// Start the server
app.listen(3000, function() {
  console.log('LEAP website backend server listening on port 3000!');
});
