// Using express
const express = require('express');
const app = express()
const port = 4000
const path = require('path');
const bodyParser = require("body-parser");

// Allow requests from outside localhost 4000
const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// posting data to server
app.post('/api/movies', (req, res)=>{
    console.log(req.body)
    console.log(req.body.Title)
    console.log(req.body.Year)
    console.log(req.body.Poster)
    res.send('Data sent to server!')
})

// Creating roots
app.get('/', (req, res) => {
  res.send('Welcome to Data Representation & Querying')
})

// Requesting and logging users name 
app.get('/hello/:name', (req, res)=>{
    console.log(req.params.name);
    res.send('Hello ' + req.params.name)
})

// Creating an api holding information on movies
app.get('/api/movies', (req, res)=>{
    const mymovies =[
        {
        "Title": "Avengers: Infinity War",
        "Year": "2018",
        "imdbID": "tt4154756",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
        "Title": "Captain America: Civil War",
        "Year": "2016",
        "imdbID": "tt3498820",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
        "Title":"World War Z",
        "Year":"2013",
        "imdbID":"tt0816711",
        "Type":"movie",
        "Poster":"https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        },
        {
        "Title":"War of the Worlds",
        "Year":"2005",
        "imdbID":"tt0407304",
        "Type":"movie",
        "Poster":"https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
        }
            
    ];  
    res.json({movies:mymovies, "Message": "Hello from the server"});
});

// Another route that returns a test html page
app.get('/test', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

// Listen for a get request at /name
app.get('/name', (req, res)=>{
    res.send('Hello ' + req.query.fname +' '+ req.query.lname);
})

// Listen for a post request at /name
app.post('/name', (req, res)=>{
    res.send('Hello'+ req.body.fname + ' ' + req.body.lname);
})

// Setting up web server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})