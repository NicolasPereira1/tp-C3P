import express from 'express';
import bodyParser from 'body-parser';  
import {Joueur} from './Joueur';
import { Salle } from './Salle';
import { PotionDeVie } from './PotionDeVie';
import { Arme } from './Arme';
import { PotionDeForce } from './PotionDeForce';

let app = express();
let joueur:Joueur;

app.use( express.static( "public" ) );
app.use(bodyParser.json());

app.get('/', function(req, res) {
    Salle.donjon[0] = new Salle("Entrée",null,1,2,3);
    Salle.donjon[1] = new Salle("Cuisine",null,null,null,0);
    Salle.donjon[2] = new Salle("Chambre",0,null,null,null);
    Salle.donjon[3] = new Salle("Salle de bain",null,0,null,null);

    Salle.donjon[1].listeObjet.push(new PotionDeVie("Potion de vie I", 20, 10));
    Salle.donjon[2].listeObjet.push(new PotionDeForce("Potion de force I", 25, 5));
    Salle.donjon[2].listeObjet.push(new Arme("Épée en bois", 10, 5));

    joueur = new Joueur("Link", 50, Salle.donjon[0]);
    res.render('index.ejs');
});

app.get('/salleCourante', function(req, res) {
    res.send(joueur.salleCourante);
});

app.get('/joueur', function(req, res) {
    res.send(joueur);
});

app.get('/deplacement/:uid', function(req, res) {
    joueur.deplacer(+req.params.uid);
    res.send(joueur.salleCourante);
});

app.get('/observerEntitee/:uid', function(req, res) {
    res.send(joueur.observerEntitee(+req.params.uid));
});

app.get('/observerObjet/:uid', function(req, res) {
    res.send(joueur.observerObjet(+req.params.uid));
});

app.get('/prendre/:uid', function(req, res) {
    joueur.prendre(+req.params.uid)
    res.send(joueur);
});

app.get('/utiliser/:uid', function(req, res) {
    joueur.utiliser(+req.params.uid);
    res.send(joueur);
});

app.get('/deEquipe', function(req, res) {
    res.send(joueur.deEquiper());
});

app.post('/attaque', function(req, res){
    console.log(req.body);
})

app.listen(8080);