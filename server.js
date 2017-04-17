const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//express middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// logger app.use take in account the order
app.use((req,res,next) => {
  var now = new Date().toString(); // human timestamp
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// maintenance handler next are not being executed
// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

// order here is important
app.use(express.static(__dirname +  '/public')); // how to register express middleware


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

// HTTP route handlers

// register a handler

app.get('/', (req, res) =>{ // all methods from express
  //res.send('<h1>Hello express</h1>');
  // res.send({
  //   name: 'Andrew',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  //res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
    //currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : 'Unable to handle request'
  });
});

// listening

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
