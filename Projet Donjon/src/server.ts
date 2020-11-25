import express from 'express';
import bodyParser from 'body-parser';  
import {Joueur} from './Joueur';

let app = express();

app.use( express.static( "public" ) );
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/salle', function(req, res) {
    res.render('index.ejs');
});

app.get('/joueur', function(req, res) {
    let j1 = new Joueur("Link", 50, 10);
    res.send(j1);
});

app.get('/monstre', function(req, res) {
    res.render('index.ejs');
});

app.post('/attaque', function(req, res){
    console.log(req.body);
})

app.listen(8080);