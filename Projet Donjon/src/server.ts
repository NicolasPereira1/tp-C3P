import express from 'express';
import bodyParser from 'body-parser';  
import {Joueur} from './Joueur';
import { Salle } from './Salle';

let app = express();
let joueur:Joueur;

app.use( express.static( "public" ) );
app.use(bodyParser.json());

app.get('/', function(req, res) {
    joueur = new Joueur("Link", 50, new Salle("Entrée",null,null,null,null));
    res.render('index.ejs');
});

app.get('/currentSalle', function(req, res) {
    res.send(joueur.currentSalle);
});

app.get('/joueur', function(req, res) {
    res.send(joueur);
});

app.get('/monstre', function(req, res) {
    res.render('index.ejs');
});

app.post('/attaque', function(req, res){
    console.log(req.body);
})

app.listen(8080);