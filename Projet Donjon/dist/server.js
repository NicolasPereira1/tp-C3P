"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Joueur_1 = require("./Joueur");
const Salle_1 = require("./Salle");
const PotionDeVie_1 = require("./PotionDeVie");
const Arme_1 = require("./Arme");
const PotionDeForce_1 = require("./PotionDeForce");
const Hostile_1 = require("./Hostile");
let app = express_1.default();
let joueur;
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    Salle_1.Salle.donjon[0] = new Salle_1.Salle("Entrée", null, 1, null, 3, 2, 4);
    Salle_1.Salle.donjon[1] = new Salle_1.Salle("Cuisine", null, null, null, 0, null, null);
    Salle_1.Salle.donjon[2] = new Salle_1.Salle("Chambre", null, null, null, null, null, 0);
    Salle_1.Salle.donjon[3] = new Salle_1.Salle("Salle de bain", null, 0, null, null, null, null);
    Salle_1.Salle.donjon[4] = new Salle_1.Salle("Cave", null, null, null, null, 0, null);
    Salle_1.Salle.donjon[1].listeObjet.push(new PotionDeVie_1.PotionDeVie("Potion de vie I", 20, 10));
    Salle_1.Salle.donjon[2].listeObjet.push(new PotionDeForce_1.PotionDeForce("Potion de force I", 25, 5));
    Salle_1.Salle.donjon[2].listeObjet.push(new Arme_1.Arme("Épée en bois", 10, 5));
    Salle_1.Salle.donjon[4].listeEntitee.push(new Hostile_1.Hostile("Gros rat méchant", 10, 5));
    joueur = new Joueur_1.Joueur("Link", 50, 0);
    Salle_1.Salle.donjon[0].listeEntitee.push(joueur);
    res.render('index.ejs');
});
app.get('/salleCourante', function (req, res) {
    res.send(Salle_1.Salle.donjon[joueur.salleId]);
});
app.get('/joueur', function (req, res) {
    res.send(joueur);
});
app.get('/deplacement/:uid', function (req, res) {
    joueur.deplacer(+req.params.uid);
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
app.post('/attaque', function (req, res) {
    console.log(req.body);
});
app.listen(8080);
