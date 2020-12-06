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
const Entite_1 = require("./Entite");
const Hostile_1 = require("./Hostile");
const PotionDeVie_1 = require("./PotionDeVie");
const PotionDeForce_1 = require("./PotionDeForce");
let app = express_1.default();
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.post('/connect', function (req, res) {
    Salle_1.Salle.donjon[0] = new Salle_1.Salle("Entrée", ["E", "O", "H", "B"], [-1, 1, -1, 3, 2, 4], "Une entrée de maison assez classique.");
    Salle_1.Salle.donjon[1] = new Salle_1.Salle("Cuisine", ["O"], [-1, -1, -1, 0, -1, -1], "Il semblerait que la vaisselle n'ai pas été faite depuis un moment...");
    Salle_1.Salle.donjon[2] = new Salle_1.Salle("Chambre", ["B"], [-1, -1, -1, -1, -1, 0], "Un lit confortable trône au beau milieu de la pièce. Il semble vous appeller à venir faire un petit somme.");
    Salle_1.Salle.donjon[3] = new Salle_1.Salle("Salle de bain", ["E"], [-1, 0, -1, -1, -1, -1], "Salle de bain assez rudimentaire mais fonctionnelle.");
    Salle_1.Salle.donjon[4] = new Salle_1.Salle("Cave", ["H"], [-1, -1, -1, -1, 0, -1], "Cave sombre et humide, on aurait bien besion d'une torche pour y voir plus clair...");
    Salle_1.Salle.donjon[1].objets.push(new PotionDeVie_1.PotionDeVie("Potion de vie I", 20, 10));
    Salle_1.Salle.donjon[2].objets.push(new PotionDeForce_1.PotionDeForce("Potion de force I", 25, 5));
    Salle_1.Salle.donjon[2].objets.push(new Arme_1.Arme("Épée en bois", 10, 5));
    Entite_1.Entite.ajouterEntite(new Hostile_1.Hostile("Gros rat méchant", 20, 5, 0, 4));
    Entite_1.Entite.ajouterEntite(new Joueur_1.Joueur("Link", 50, 1, 0));
    res.send(Entite_1.Entite.entites[1]);
});
app.get('/:uid/regarder', function (req, res) {
    res.send(Salle_1.Salle.donjon[Entite_1.Entite.entites[+req.params.uid].salleId]);
});
app.post('/:uid/deplacement', function (req, res) {
    let j = Entite_1.Entite.entites[+req.params.uid];
    j.deplacer(req.body["direction"]);
    res.send(Salle_1.Salle.donjon[j.salleId]);
});
app.get('/:attaquant/tape/:attaque', function (req, res) {
    let h = Entite_1.Entite.entites[+req.params.attaquant];
    h.attaquer(+req.params.attaque);
    res.send(Salle_1.Salle.donjon[h.salleId]);
});
app.get('/:uid/observerEntitee/:entite', function (req, res) {
    let j = Entite_1.Entite.entites[+req.params.uid];
    res.send(j.observerEntite(+req.params.entite));
});
app.get('/observerObjet/:uid', function (req, res) {
    let j = Entite_1.Entite.entites[+req.params.uid];
    res.send(j.observerObjet(+req.params.uid));
});
app.get('/:uid/prendre/:obj', function (req, res) {
    let j = Entite_1.Entite.entites[+req.params.uid];
    j.prendre(+req.params.obj);
    res.send(j);
});
app.get('/:uid/utiliser/:obj', function (req, res) {
    let h = Entite_1.Entite.entites[+req.params.uid];
    h.utiliser(+req.params.obj);
    res.send(h);
});
app.get('/:uid/deEquipe', function (req, res) {
    let j = Entite_1.Entite.entites[+req.params.uid];
    j.deEquiper();
    res.send(j);
});
app.listen(8080);
