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


app.get('/', (req, res) => {
  res.send('Hello World file Welcome to hello programme!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
