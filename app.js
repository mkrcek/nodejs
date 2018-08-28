var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');



var app = express();

var port = process.env.port || 3000;
//pokud není nastaven v environment variables, tak bude nastaven na 3000

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json()




app.use('/assets', express.static(__dirname + '/public'));
//a nejdříve se načte tento midleware

app.get('/', function(rew, res) {
    res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet></head><body><h1>Zdarec</h1></body></html>');
});

app.get('/person/:id', function(req, res) {
    res.send(`<html><head></head><body><h1>člověk se jménem: ${req.params.id} a ${req.query.qstr} </h1></body></html>`);
});
//parametry + queryString
//http://localhost:3000/person/ahoj?qstr=123
//vypíše: http://localhost:3000/person/ahoj?qstr=123

app.get('/api', function(req, res) {
    res.json( { firstname: 'Franta', lastename: 'Kopečkovic'});    
});

app.post('/person', urlencodedParser, function(req, res) {
    res.send('Thank you ' + req.body.firstname );
    console.log(req.body)
});

app.post('/api/person', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    res.send('Thank you ' + req.body.firstname + " " + req.body.lastename);
    console.log(req.body);
    
});


app.get('/api/dm', function(req, res) {

let daticka;

    axios.get('http://10.66.103.20')
    .then(response => {
        // res.send('hmm ');
        daticka = response.data;
        console.log(response.data);
        console.log(response.data.deviceTemperature);

        let textik = JSON.stringify(daticka); 
        
        res.send('actmillis: ' + response.data.actmillis + " cely JSON" + textik);
        // res.json(daticka); // vrátí JSON do odpovědi
    })
    .catch(error => {
        console.log(error);
    });
    
   

});




app.listen(port);


