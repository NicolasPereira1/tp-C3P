"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Joueur_1 = require("./Joueur");
const Entite_1 = require("./Entite");
const Salle_1 = require("./Salle");
let app = express_1.default();
let donjon = Salle_1.Salle.inisialiserDonjon();
let idJoueur = 1;
let listeUtilisateur = [];
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.post('/connect', function (req, res) {
    let joueur = new Joueur_1.Joueur("Joueur " + idJoueur, 50, idJoueur, donjon[0]);
    listeUtilisateur[idJoueur] = joueur;
    idJoueur++;
    res.send(listeUtilisateur[idJoueur - 1]);
});
app.get('/:uid/regarder', function (req, res) {
    res.send(listeUtilisateur[+req.params.uid].salle);
});
app.post('/:uid/deplacement', function (req, res) {
    let j = listeUtilisateur[+req.params.uid];
    j.deplacer(req.body["direction"]);
    res.send(j.salle);
});
app.post('/:attaquant/taper/:attaque', function (req, res) {
    let h = listeUtilisateur[+req.params.attaquant];
    let c = Entite_1.Entite.entites[+req.params.attaque];
    h.attaquer(+req.params.attaque);
    res.send({ "attaquant": { "guid": h.guid, "degat": h.force, "vie": h.totalVie },
        "attaque": { "guid": c.guid, "degat": c.force, "vie": c.totalVie } });
});
app.get('/:uid/examiner/:entite', function (req, res) {
    let j = listeUtilisateur[+req.params.uid];
    res.send(j.observerEntite(+req.params.entite));
});
app.get('/observerObjet/:uid', function (req, res) {
    let j = listeUtilisateur[+req.params.uid];
    res.send(j.observerObjet(+req.params.uid));
});
app.get('/:uid/prendre/:obj', function (req, res) {
    let j = listeUtilisateur[+req.params.uid];
    j.prendre(+req.params.obj);
    res.send(j);
});
app.get('/:uid/utiliser/:obj', function (req, res) {
    let h = listeUtilisateur[+req.params.uid];
    h.utiliser(+req.params.obj);
    res.send(h);
});
app.get('/:uid/deEquipe', function (req, res) {
    let j = listeUtilisateur[+req.params.uid];
    j.deEquiper();
    res.send(j);
});
app.listen(8080);
