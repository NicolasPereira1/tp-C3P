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
let app = express_1.default();
let joueur;
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    Salle_1.Salle.donjon[0] = new Salle_1.Salle("Entrée", null, 1, 2, 3);
    Salle_1.Salle.donjon[1] = new Salle_1.Salle("Cuisine", null, null, null, 0);
    Salle_1.Salle.donjon[2] = new Salle_1.Salle("Chambre", 0, null, null, null);
    Salle_1.Salle.donjon[3] = new Salle_1.Salle("Salle de bain", null, 0, null, null);
    Salle_1.Salle.donjon[0].listeObjet[0] = new PotionDeVie_1.PotionDeVie("Potion de vie I", 20, 10);
    joueur = new Joueur_1.Joueur("Link", 50, Salle_1.Salle.donjon[0]);
    res.render('index.ejs');
});
app.get('/salleCourante', function (req, res) {
    res.send(joueur.salleCourante);
});
app.get('/joueur', function (req, res) {
    res.send(joueur);
});
app.get('/deplacement/:uid', function (req, res) {
    joueur.deplacer(+req.params.uid);
    res.send(joueur.salleCourante);
});
app.get('/observerEntitee/:uid', function (req, res) {
    res.send(joueur.observerEntitee(+req.params.uid));
});
app.get('/observerObjet/:uid', function (req, res) {
    res.send(joueur.observerObjet(+req.params.uid));
});
app.get('/prendre/:uid', function (req, res) {
    res.send(joueur.prendre(+req.params.uid));
});
app.post('/attaque', function (req, res) {
    console.log(req.body);
});
app.listen(8080);
