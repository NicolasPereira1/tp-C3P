import express from 'express';
import bodyParser from 'body-parser';
import { Arme } from './Arme';  
import { Salle } from './Salle';
import { Joueur } from './Joueur';
import { Entite } from './Entite';
import { Hostile } from './Hostile';
import { PotionDeVie } from './PotionDeVie';
import { PotionDeForce } from './PotionDeForce';

let app = express();
let donjon;
let listUser; //Hashmap

app.use( express.static( "public" ) );
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.post('/connect', function(req, res) {
    Salle.donjon[-2] = new Salle("Cimetière" , [], [], "Personne ne sort jamais d'ici... :(");
    Salle.donjon[0] = new Salle("Entrée",["E","O","H","B"],[-1,1,-1,3,2,4],"Une entrée de maison assez classique.");
    Salle.donjon[1] = new Salle("Cuisine",["O"],[-1,-1,-1,0,-1,-1], "Il semblerait que la vaisselle n'ai pas été faite depuis un moment...");
    Salle.donjon[2] = new Salle("Chambre",["B"],[-1,-1,-1,-1,-1,0], "Un lit confortable trône au beau milieu de la pièce. Il semble vous appeller à venir faire un petit somme.");
    Salle.donjon[3] = new Salle("Salle de bain",["E"],[-1,0,-1,-1,-1,-1], "Salle de bain assez rudimentaire mais fonctionnelle.");
    Salle.donjon[4] = new Salle("Cave",["H"],[-1,-1,-1,-1,0,-1], "Cave sombre et humide, on aurait bien besion d'une torche pour y voir plus clair...");

    Salle.donjon[1].objets.push(new PotionDeVie("Potion de vie I", 20, 10));
    Salle.donjon[2].objets.push(new PotionDeForce("Potion de force I", 25, 5));
    Salle.donjon[2].objets.push(new Arme("Épée en bois", 10, 5));
    
    Entite.ajouterEntite( new Hostile("Gros rat méchant", 20, 5, 0, Salle.donjon[4]));
    Entite.ajouterEntite( new Joueur("Joueur 1", 50, 1, Salle.donjon[0]));

    res.send(Entite.entites[1]);
});

app.get('/:uid/regarder', function(req, res) {
    res.send(Entite.entites[+req.params.uid].salle);
});

app.post('/:uid/deplacement', function(req, res) {
    let j = Entite.entites[+req.params.uid] as Joueur;
    j.deplacer(req.body["direction"]);
    res.send(j.salle);
});

app.post('/:attaquant/taper/:attaque', function(req, res){
    let h = Entite.entites[+req.params.attaquant] as Hostile;
    let c = Entite.entites[+req.params.attaque] as Hostile;
    h.attaquer(+req.params.attaque);
    res.send({  "attaquant":{"guid":h.guid, "degat":h.force, "vie":h.totalVie},
                "attaque":  {"guid":c.guid, "degat":c.force, "vie":c.totalVie}});
});

app.get('/:uid/examiner/:entite', function(req, res) {
    let j = Entite.entites[+req.params.uid] as Joueur;
    res.send(j.observerEntite(+req.params.entite));
});

app.get('/observerObjet/:uid', function(req, res) {
    let j = Entite.entites[+req.params.uid] as Joueur;
    res.send(j.observerObjet(+req.params.uid));
});

app.get('/:uid/prendre/:obj', function(req, res) {
    let j = Entite.entites[+req.params.uid] as Joueur;
    j.prendre(+req.params.obj);
    res.send(j);
});

app.get('/:uid/utiliser/:obj', function(req, res) {
    let h = Entite.entites[+req.params.uid] as Hostile;
    h.utiliser(+req.params.obj);
    res.send(h);
});

app.get('/:uid/deEquipe', function(req, res) {
    let j = Entite.entites[+req.params.uid] as Joueur;
    j.deEquiper();
    res.send(j);
});

app.listen(8080);