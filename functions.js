// functions.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;

function generateToken(payload) {
  return jwt.sign(payload, JWT_KEY, { expiresIn: '5h' }); 
}

function attachUser(req, res, next) {
    const token = req.cookies.token || null;
    if (token) {
      jwt.verify(token, JWT_KEY, (err, user) => {
        if (!err) {
          req.user = user;
        }
      });
    }
    next();
  }

// functions.js
function validateToken(req, res, next) {
    const token = req.cookies.token || null;
  
    if (token) {
      jwt.verify(token, JWT_KEY, (err, user) => {
        if (err) {
          // Token is invalid or expired
          return res.redirect('/auth/login');
        }
        req.user = user;
        next();
      });
    } else {
      // No token provided
      res.redirect('/auth/login');
    }
  }
  

module.exports = {
  generateToken,
  validateToken,
    attachUser,
};
