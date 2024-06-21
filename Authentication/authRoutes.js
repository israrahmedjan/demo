// authRoutes.js

const express = require('express');
const router = express.Router();
const passport = require("../Authentication/Passport")
const jwt = require('jsonwebtoken');

const myfunc = (req,res,next)=>
{
  console.log("Middle is running")
  next();
}

router.post('/login',passport.authenticate('jwt', { session: false }),(req, res) => {
    // Example login logic

    try
    {
      const { username, password } = req.body;
      console.log("User Name:",username)
  //res.send("username")
  // Check if username and password are valid
  const token = jwt.sign({ sub: 1, username }, 'israr123', { expiresIn: '1h' });
  res.json({ token });

    }
   catch(err)
   {
    console.error('Login error:', error);
   }
    
});



module.exports = router;
