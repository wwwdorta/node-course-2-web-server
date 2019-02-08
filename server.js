const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;

   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) => {
     if (err){
       console.log('Unable to append serve.log file.'+ '\n');
     }
   });

   next();
});


//app.use((req, res, next) => {
//  res.render('maintenance.hbs')
//})


//static pages
app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})



app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!!</h1>');
  //res.send({
  //  name: 'Mario',
  //  likes: [
  //    'Bikes',
  //    'Cities'
  //  ]
  //});


  res.render('home.hbs', {
    pageTitle: 'Home',
    theData: 'Welcome to demo service'
  });

});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About',
    theData: 'Some text here...'
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errCode: 123,
    errMessage: 'Unable to get the page.'
  });
});


app.listen(5566, () => {
  console.log('Server is running in port 5566...')
});
