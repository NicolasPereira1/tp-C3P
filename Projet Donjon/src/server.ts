import express from 'express';
import bodyParser from 'body-parser';
import { Joueur } from './Joueur';
import { Entite } from './Entite';
import { Hostile } from './Hostile';
import { Salle } from './Salle';

let app = express();
let donjon = Salle.inisialiserDonjon();
let idJoueur = 1;
let listeUtilisateur:Joueur[] = [];

app.use( express.static( "public" ) );
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.post('/connect', function(req, res) {
    let joueur = new Joueur("Joueur "+idJoueur, 50, idJoueur, donjon[0]);
    listeUtilisateur[idJoueur] = joueur;
    idJoueur++;
    res.send(listeUtilisateur[idJoueur-1]);
});

app.get('/:uid/regarder', function(req, res) {
    res.send(listeUtilisateur[+req.params.uid].salle);
});

app.post('/:uid/deplacement', function(req, res) {
    let j = listeUtilisateur[+req.params.uid];
    j.deplacer(req.body["direction"]);
    res.send(j.salle);
});

app.post('/:attaquant/taper/:attaque', function(req, res){
    let h = listeUtilisateur[+req.params.attaquant];
    let c = Entite.entites[+req.params.attaque] as Hostile;
    h.attaquer(+req.params.attaque);
    res.send({  "attaquant":{"guid":h.guid, "degat":h.force, "vie":h.totalVie},
                "attaque":  {"guid":c.guid, "degat":c.force, "vie":c.totalVie}});
});

app.get('/:uid/examiner/:entite', function(req, res) {
    let j = listeUtilisateur[+req.params.uid];
    res.send(j.observerEntite(+req.params.entite));
});

app.get('/observerObjet/:uid', function(req, res) {
    let j = listeUtilisateur[+req.params.uid];
    res.send(j.observerObjet(+req.params.uid));
});

app.get('/:uid/prendre/:obj', function(req, res) {
    let j = listeUtilisateur[+req.params.uid];
    j.prendre(+req.params.obj);
    res.send(j);
});

app.get('/:uid/utiliser/:obj', function(req, res) {
    let h = listeUtilisateur[+req.params.uid];
    h.utiliser(+req.params.obj);
    res.send(h);
});

app.get('/:uid/deEquipe', function(req, res) {
    let j = listeUtilisateur[+req.params.uid];
    j.deEquiper();
    res.send(j);
});

app.listen(8080);