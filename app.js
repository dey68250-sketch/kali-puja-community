require("dotenv").config();

const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRouter")
const galleryRoutes = require("./routes/galleryRoutes");


const app = express();

console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log("API Key exists:", !!process.env.CLOUD_API_KEY);
console.log("API Secret exists:", !!process.env.CLOUD_API_SECRET);
// ======================
// DATABASE
// ======================

const dbUrl = process.env.MONGO_URI;

mongoose.connect(dbUrl)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });


// ======================
// MONGO SESSION STORE
// ======================

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});


// ======================
// SESSION
// ======================

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));


// ======================
// PASSPORT
// ======================

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ======================
// EJS CONFIGURATION
// ======================

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);


// ======================
// MIDDLEWARE
// ======================

app.use(methodOverride("_method"));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.use((req,res,next) => {
    res.locals.currentUser = req.user
    next()
})


// ======================
// ROUTES
// ======================

app.use("/events", eventRoutes);
app.use("/", authRoutes);
app.use("/gallery",galleryRoutes)


// ======================
// HOME
// ======================

app.get("/", (req, res) => {

    res.render("pages/home", {
        title: "Kali Puja Community"
    });

});


// ======================
// ABOUT
// ======================

app.get("/about", (req, res) => {

    res.render("pages/about", {
        title: "About Us | Kali Puja Community"
    });

});


// ======================
// PUJA
// ======================

app.get("/puja", (req, res) => {

    res.render("pages/puja", {
        title: "Kali Puja | Kali Puja Community"
    });

});


// ======================
// DONATE
// ======================

app.get("/donate", (req, res) => {

    res.render("pages/donate", {
        title: "Donate | Kali Puja Community"
    });

});


// ======================
// SERVER
// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});