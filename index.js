// index.js
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { attachUser } = require('./functions');
require("dotenv").config();


const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

// Middleware
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

// Frontend routes


app.get('/', (req, res) => {
    res.render('index', { path: 'pages/home', req: req });
  });
  

// Error handling middleware for unhandled errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
