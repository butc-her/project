require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const userRoutes = require('./server/routes/users'); // adjust path as necessary

const connectDB = require('./server/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // Use cookie-parser middleware

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use('/', userRoutes); // Mounts your routes at root path

app.get('/env', (req, res) => {
    const envVariables = {
        DATABASE_URL: process.env.DATABASE_URL,
        PORT: process.env.PORT,
        SECRET_KEY: process.env.JWT_SECRET,
    };
    res.json(envVariables);
});

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./server/routes/main'));

// 404 Page Middleware
app.use((req, res, next) => {
    res.status(404).render('404'); // Adjust if using another templating engine like Pug or plain HTML
});  

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});