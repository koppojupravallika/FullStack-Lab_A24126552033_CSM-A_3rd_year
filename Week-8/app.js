const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;

const usersFile = path.join(__dirname, "users.json");
const busesFile = path.join(__dirname, "buses.json");
const bookingsFile = path.join(__dirname, "bookings.json");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


/* ================================
   USERS
================================ */

function getUsers() {

    const data = fs.readFileSync(usersFile, "utf8");

    return JSON.parse(data);
}


function saveUsers(users) {

    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 2)
    );
}


/* ================================
   BUSES
================================ */

function getBuses() {

    const data = fs.readFileSync(busesFile, "utf8");

    return JSON.parse(data);
}


/* ================================
   BOOKINGS
================================ */

function getBookings() {

    const data = fs.readFileSync(bookingsFile, "utf8");

    return JSON.parse(data);
}


function saveBookings(bookings) {

    fs.writeFileSync(
        bookingsFile,
        JSON.stringify(bookings, null, 2)
    );
}


/* ================================
   HOME
================================ */

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});


/* ================================
   REGISTER
================================ */

app.get("/register", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "register.html")
    );

});


app.post("/register", (req, res) => {

    const {
        name,
        age,
        gender,
        email,
        mobile,
        username,
        password,
        address
    } = req.body;


    const users = getUsers();


    const existingUser = users.find(user =>
        user.username === username ||
        user.email === email
    );


    if (existingUser) {

        return res.send(`
            <h2>Username or Email already exists!</h2>
            <a href="/register">Go Back</a>
        `);

    }


    const newUser = {

        name: name,
        age: age,
        gender: gender,
        email: email,
        mobile: mobile,
        username: username,
        password: password,
        address: address

    };


    users.push(newUser);

    saveUsers(users);


    res.send(`
        <h2>Registration Successful!</h2>

        <p>Your details have been saved.</p>

        <a href="/login">Go to Login</a>
    `);

});


/* ================================
   LOGIN
================================ */

app.get("/login", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "login.html")
    );

});


app.post("/login", (req, res) => {

    const {
        username,
        password
    } = req.body;


    const users = getUsers();


    const user = users.find(user =>
        (user.username === username ||
         user.email === username) &&
        user.password === password
    );


    if (user) {

        res.redirect("/booking.html");

    } else {

        res.send(`
            <h2>Invalid Username/Email or Password!</h2>

            <a href="/login">Try Again</a>
        `);

    }

});


/* ================================
   SEARCH BUSES
================================ */

app.get("/buses", (req, res) => {

    const buses = getBuses();

    const from = req.query.from;
    const to = req.query.to;

    const filteredBuses = buses.filter(bus =>
        bus.from === from &&
        bus.to === to
    );

    res.json(filteredBuses);

});

/* ================================
   BOOK TICKET
================================ */

app.post("/book", (req, res) => {

    const bookings = getBookings();


    const newBooking = {

        id: bookings.length + 1,

        busId: req.body.busId,

        busName: req.body.busName,

        passengerName: req.body.passengerName,

        from: req.body.from,

        to: req.body.to,

        journeyDate: req.body.journeyDate,

        fare: req.body.fare

    };


    bookings.push(newBooking);

    saveBookings(bookings);


    res.json({

        message: "Ticket booked successfully!"

    });

});


/* ================================
   START SERVER
================================ */

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});