"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Arme_1 = require("./Arme");
const Salle_1 = require("./Salle");
const Joueur_1 = require("./Joueur");
const Hostile_1 = require("./Hostile");
const PotionDeVie_1 = require("./PotionDeVie");
const PotionDeForce_1 = require("./PotionDeForce");
const Entite_1 = require("./Entite");
let app = express_1.default();
let joueur;
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.post('/connect', function (req, res) {
    Salle_1.Salle.donjon[0] = new Salle_1.Salle("Entrée", ["E", "O", "H", "B"], [-1, 1, -1, 3, 2, 4], "Une entrée de maison assez classique");
    Salle_1.Salle.donjon[1] = new Salle_1.Salle("Cuisine", ["O"], [-1, -1, -1, 0, -1, -1], "Il semblerait que la vaisselle n'ai pas été faite");
    Salle_1.Salle.donjon[2] = new Salle_1.Salle("Chambre", ["B"], [-1, -1, -1, -1, -1, 0], "Un lit confortable trône au beau milieu de la pièce");
    Salle_1.Salle.donjon[3] = new Salle_1.Salle("Salle de bain", ["E"], [-1, 0, -1, -1, -1, -1], "Salle de bain assez rudimentaire mais fonctionnelle");
    Salle_1.Salle.donjon[4] = new Salle_1.Salle("Cave", ["H"], [-1, -1, -1, -1, 0, -1], "Cave sombre et humide, on aurait bien besion d'une torche pour y voir plus clair...");
    Salle_1.Salle.donjon[1].objets.push(new PotionDeVie_1.PotionDeVie("Potion de vie I", 20, 10));
    Salle_1.Salle.donjon[2].objets.push(new PotionDeForce_1.PotionDeForce("Potion de force I", 25, 5));
    Salle_1.Salle.donjon[2].objets.push(new Arme_1.Arme("Épée en bois", 10, 5));
    Entite_1.Entite.ajouterEntite(new Hostile_1.Hostile("Gros rat méchant", 20, 5, 0, 4));
    joueur = new Joueur_1.Joueur("Link", 50, 1, 0);
    Entite_1.Entite.ajouterEntite(joueur);
    res.send(Entite_1.Entite.entites[1]);
});
app.get('/salleCourante', function (req, res) {
    res.send(Salle_1.Salle.donjon[joueur.salleId]);
});
app.get('/joueur', function (req, res) {
    res.send(joueur);
});
app.post('/deplacement', function (req, res) {
    joueur.deplacer(req.body["direction"]);
    res.send(Salle_1.Salle.donjon[joueur.salleId]);
});
app.get('/observerEntitee/:uid', function (req, res) {
    res.send(joueur.observerEntitee(+req.params.uid));
});
app.get('/observerObjet/:uid', function (req, res) {
    res.send(joueur.observerObjet(+req.params.uid));
});
app.get('/prendre/:uid', function (req, res) {
    joueur.prendre(+req.params.uid);
    res.send(joueur);
});
app.get('/utiliser/:uid', function (req, res) {
    joueur.utiliser(+req.params.uid);
    res.send(joueur);
});
app.get('/deEquipe', function (req, res) {
    joueur.deEquiper();
    res.send(joueur);
});
app.get('/:attaquant/tape/:attaque', function (req, res) {
    Entite_1.Entite.entites[+req.params.attaquant].attaquer(+req.params.attaque);
    res.send(Salle_1.Salle.donjon[joueur.salleId]);
});
app.listen(8080);
