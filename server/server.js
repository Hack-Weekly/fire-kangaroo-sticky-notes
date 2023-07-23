const express = require("express");
const session = require("express-session");
require("dotenv").config({ path: './config/.env' });
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");

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


// // Express config
// let whitelist = [process.env.FRONTEND_URL, process.env.BASE_URL]
// console.log("whitelist:", whitelist)
// let corsOptions = {
//     credentials: true,
//     methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
//     origin: function(origin, callback) {
//         console.log("ORIGIN:", origin)
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
// }

// // app.use(cors(corsOptions))
// app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // Two weeks in milliseconds
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
    }),
    cookie: { secure: false }
}));

// OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline', prompt: 'consent' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login` }), (req, res) => {
    res.redirect(req.session.returnTo || `${process.env.FRONTEND_URL}`);
});

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: `${process.env.FRONTEND_URL}/login` }), (req, res) => {
    res.redirect(req.session.returnTo || `${process.env.FRONTEND_URL}`);
});

// Passport init
app.use(passport.initialize())
app.use(passport.session())

// Router(s) config
app.use('/api', require("./routes/api"))

const users = [
    { username: 'testuser', password: 'testpassword' },
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(401).json({ error: 'Username does not match' });
    }

    if (password !== user.password) {
        return res.status(401).json({ error: 'Password does not match' });
    }

    req.session.username = username;
    return res.json({ message: 'Login successful' });
});

app.use((err, req, res, next) => {
    if (err && err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Username and password do not match' });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT} in ${MODE} mode`);
})