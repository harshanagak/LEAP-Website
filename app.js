// Import required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose=require('mongoose');
const session =require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
// mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});




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

// ***authentication *** //

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/Contents/login.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/Contents/register.html');
});

// app.get("/user", function(req, res){
//   User.find({"secret": {$ne: null}}, function(err, foundUsers){
//     if (err){
//       console.log(err);
//     } else {
//       if (foundUsers) {
//         // res.render("secrets", {usersWithSecrets: foundUsers});
//         res.sendFile(__dirname + '/Contents/user.html');
//       }
//     }
//   });
// });
app.get("/users",function(req,res){
  if(req.isAuthenticated()){
    res.sendFile(__dirname + "register.html");
  }else{
    res.sendFile(__dirname + "/Contents/users.html");
  }
})

app.post("/register", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.sendFile(__dirname + "/Contents/register.html");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.sendFile(__dirname + "/Contents/users.html");
      });
    }
  });

});

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.sendFile(__dirname + "/Contents/users.html");
      });
    }
  });

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
