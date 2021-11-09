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

// getting-started.js, setup mongoose
const mongoose = require('mongoose');

// Creating a variable to assign to the cluster link
const strConnection = 'mongodb+srv://admin:admin@cluster0.rs9rk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(strConnection);
}

// Create our movie schema
const movieSchema = new mongoose.Schema({
    Title:String,
    Year:String,
    Poster:String
});

// compiling the schema into a Model
const movieModel = mongoose.model('ben', movieSchema);

// posting data to server
app.post('/api/movies', (req, res)=>{
    console.log(req.body)
    console.log(req.body.Title)
    console.log(req.body.Year)
    console.log(req.body.Poster)

    movieModel.create({
        Title:req.body.Title,
        Year:req.body.Year,
        Poster:req.body.Poster
    });
    res.send('Data sent to server!')
})

// Logging id to console
app.get('/api/movies/:id',(req, res) => {
    console.log(req.params.id);

    // Pulling record from database and sending it back to the user if its a match
    movieModel.findById(req.params.id,(error, data) =>{
        res.json(data);
    })
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
    // Retrieve record from database
    movieModel.find((err, data)=>{
        res.json(data);
    })

        //"Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"     

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