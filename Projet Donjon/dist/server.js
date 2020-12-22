"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Joueur_1 = require("./Joueur");
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
    var _a;
    let joueur = new Joueur_1.Joueur("Joueur " + idJoueur, 50, idJoueur, Salle_1.Salle.donjon[0]);
    listeUtilisateur.set(idJoueur, joueur);
    idJoueur++;
    res.send((_a = listeUtilisateur.get(idJoueur - 1)) === null || _a === void 0 ? void 0 : _a.vue());
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
        res.send(j.salle.vue());
    }
});
app.post('/:attaquant/taper/:attaque', function (req, res) {
    let j = listeUtilisateur.get(+req.params.attaquant);
    if (j != undefined) {
        res.send(j.attaquer(+req.params.attaque));
    }
});
app.get('/:uid/examiner/:entite', function (req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if (j != undefined)
        res.send(j.observerEntite(+req.params.entite));
});
app.get('/:uid/observerObjet/:objet', function (req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if (j != undefined)
        res.send(j.observerObjet(+req.params.objet));
});
app.get('/:uid/prendre/:obj', function (req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if (j != undefined) {
        j.prendre(+req.params.obj);
        res.send(j.vue());
    }
});
app.get('/:uid/utiliser/:obj', function (req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if (j != undefined) {
        j.utiliser(+req.params.obj);
        res.send(j.vue());
    }
});
app.get('/:uid/deEquipe', function (req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if (j != undefined) {
        j.deEquiper();
        res.send(j.vue());
    }
});
app.listen(8080);
