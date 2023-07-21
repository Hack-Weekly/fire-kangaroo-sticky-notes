const express = require("express");
const session = require("express-session");
require("dotenv").config({ path: './config/.env' });
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const passport = require("passport");

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');


const app = express()

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

const PORT = process.env.PORT || 8000;
const MODE = process.env.NODE_ENV || "development"

// Express config
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // Two weeks in milliseconds
    // store: new MongoStore({ mongoUrl: process.env.MONGODB_URI })
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
    }),
    cookie: { secure: false }
}));

// OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline', prompt: 'consent' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect(req.session.returnTo || '/');
});

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect(req.session.returnTo || '/');
});

// Passport init
app.use(passport.initialize())
app.use(passport.session())

// Router(s) config
app.use('/api', require("./routes/api"))
app.use('/', (req, res) => {
    return res.send("WE MADE IT")
})

app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT} in ${MODE} mode`);
})