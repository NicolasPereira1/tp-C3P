import express from 'express';
import bodyParser from 'body-parser';
import { Arme } from './Arme';  
import { Salle } from './Salle';
import { Joueur } from './Joueur';
import { Hostile } from './Hostile';
import { PotionDeVie } from './PotionDeVie';
import { PotionDeForce } from './PotionDeForce';
import { Entite } from './Entite';

let app = express();
let joueur:Joueur;

app.use( express.static( "public" ) );
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.post('/connect', function(req, res) {
    Salle.donjon[0] = new Salle("Entrée",["E","O","H","B"],[-1,1,-1,3,2,4],"Une entrée de maison assez classique");
    Salle.donjon[1] = new Salle("Cuisine",["O"],[-1,-1,-1,0,-1,-1], "Il semblerait que la vaisselle n'ai pas été faite");
    Salle.donjon[2] = new Salle("Chambre",["B"],[-1,-1,-1,-1,-1,0], "Un lit confortable trône au beau milieu de la pièce");
    Salle.donjon[3] = new Salle("Salle de bain",["E"],[-1,0,-1,-1,-1,-1], "Salle de bain assez rudimentaire mais fonctionnelle");
    Salle.donjon[4] = new Salle("Cave",["H"],[-1,-1,-1,-1,0,-1], "Cave sombre et humide, on aurait bien besion d'une torche pour y voir plus clair...");

    Salle.donjon[1].objets.push(new PotionDeVie("Potion de vie I", 20, 10));
    Salle.donjon[2].objets.push(new PotionDeForce("Potion de force I", 25, 5));
    Salle.donjon[2].objets.push(new Arme("Épée en bois", 10, 5));
    Entite.entites[0] = new Hostile("Gros rat méchant", 20, 5, 0, 4);
    // rat.sac.push( new Objet("Grosse dent", 5));
    Salle.donjon[4].entites.push(0);

    Entite.entites[0] = new Joueur("Link", 50, 0, 0);
    Salle.donjon[0].entites.push(0);
});

app.get('/salleCourante', function(req, res) {
    res.send(Salle.donjon[joueur.salleId]);
});

app.get('/joueur', function(req, res) {
    res.send(joueur);
});

app.post('/deplacement', function(req, res) {
    joueur.deplacer(req.body["direction"]);
    res.send(Salle.donjon[joueur.salleId]);
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
    joueur.deEquiper();
    res.send(joueur);
});

app.get('/:attaquant/tape/:attaque', function(req, res){
    (Entite.entites[+req.params.attaque] as Hostile).attaquer(+req.params.attaque);
    res.send(Salle.donjon[joueur.salleId]);
})

app.listen(8080);