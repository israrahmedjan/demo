require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

const path = require('path');
const ConnectionStr = require("./Database/connection");



const ProductsController = require("./Controller/Products/ProductsController")


const ProductRouter = require("./Router/ProductRouter")
const CategoryRouter = require('./Router/CategoryRouter');
const UserRouter = require("./Router/UserRouter");
const BrandRouter = require('./Router/BrandRouter');


// authentication process
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');




// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Enable CORS for all routes
app.use(cors());
// For messaging to show on


app.use(require('express-flash')())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.urlencoded({ extended: true })); // Middleware to parse request body
//app.use(ProductRouter)
app.use(cookieParser());

// Initialize connect-flash middleware



// passport authentication


// Middleware
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.send(`<h1>Profile</h1><p>Hello, ${req.user.username}!</p><a href="/logout">Logout</a>`);
});


app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      // handle error
    } else {
      // logout successful
      res.redirect('/');
    }
  })

});




// Upload Operation End



app.get("/myuploadfile", (req, res) => {
  res.render('uploadFile');
})




app.get("/", (req, res) => {

  res.send("Hello Home page 11111!");
  // if (!req.isAuthenticated()) {
  //   return res.redirect('/user/login');
  // }

  // res.render('HomeView');


})

app.use('/Products', ProductRouter);
app.use('/Category', CategoryRouter);
app.use('/User', UserRouter);
app.use('/Brand', BrandRouter)

try {

}
catch (err) {
  console.log("Router test Error")
}





// app.get('/', (req, res) => {
//   res.send('Hello World file Welcome to hello programme!');
// });

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
