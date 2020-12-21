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
let idJoueur = 1;
let listeUtilisateur = new Map();
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
Salle_1.Salle.inisialiserDonjon();
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.post('/connect', function (req, res) {
    let joueur = new Joueur_1.Joueur("Joueur " + idJoueur, 50, idJoueur, Salle_1.Salle.donjon[0]);
    listeUtilisateur.set(idJoueur, joueur);
    idJoueur++;
    res.send(listeUtilisateur.get(idJoueur - 1));
});
app.get('/:uid/regarder', function (req, res) {
    let joueur = listeUtilisateur.get(+req.params.uid);
    if (joueur != undefined)
        res.send(joueur.salle.vue());
});
app.post('/:uid/deplacement', function (req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if (j != undefined) {
        j.deplacer(req.body["direction"]);
        res.send(j.salle);
    }
});
app.post('/:attaquant/taper/:attaque', function (req, res) {
    let h = listeUtilisateur.get(+req.params.attaquant);
    let c = Entite_1.Entite.entites[+req.params.attaque];
    if (h != undefined) {
        h.attaquer(+req.params.attaque);
        res.send({ "attaquant": { "guid": h.guid, "degat": h.force, "vie": h.totalVie },
            "attaque": { "guid": c.guid, "degat": c.force, "vie": c.totalVie } });
    }
});
app.get('/:uid/examiner/:entite', function (req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if (j != undefined)
        res.send(j.observerEntite(+req.params.entite));
});
app.get('/observerObjet/:uid', function (req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if (j != undefined)
        res.send(j.observerObjet(+req.params.uid));
});
app.get('/:uid/prendre/:obj', function (req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if (j != undefined) {
        j.prendre(+req.params.obj);
        res.send(j);
    }
});
app.get('/:uid/utiliser/:obj', function (req, res) {
    let h = listeUtilisateur.get(+req.params.uid);
    if (h != undefined) {
        h.utiliser(+req.params.obj);
        res.send(h);
    }
});
app.get('/:uid/deEquipe', function (req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if (j != undefined) {
        j.deEquiper();
        res.send(j);
    }
});
app.listen(8080);
