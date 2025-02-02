const express = require('express');
const app = express();
const port = process.env.PORT ||  5000;
const mainroute = require('./router/mainRoute');
const fs = require('fs');
const path = require ('path');
const multer = require ('multer');

//Listening to port
app.listen(port,(req, res) => {
    console.log(`App is Listening to port ${port}`)
});

//Middleware for static files
app.use(express.static("public"))

//Middleware for templating engine
app.set("view engine", "ejs");

//Middleware for reading/parsing from the form inputs
app.use(express.urlencoded({ extended : true }));

//Middleware to routes
app.use(mainroute);

//Middleware if no routes found in mainroute
app.use((req, res) => {
    res.render("404", { title : "404 | Page not Found"})
})