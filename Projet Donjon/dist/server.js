"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Joueur_1 = require("./Joueur");
const Salle_1 = require("./Salle");
const JSONFieldException_1 = require("./JSONFieldException");
const EntiteNotFindException_1 = require("./EntiteNotFindException");
const ObjectNotFindException_1 = require("./ObjectNotFindException");
const NoAccessException_1 = require("./NoAccessException");
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
    try {
        let joueur = listeUtilisateur.get(+req.params.uid);
        if (joueur == undefined)
            throw new EntiteNotFindException_1.EntiteNotFindException();
        res.send(joueur.salle.vue());
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.post('/:uid/deplacement', function (req, res) {
    try {
        let j = listeUtilisateur.get(+req.params.uid);
        if (j == undefined)
            throw new EntiteNotFindException_1.EntiteNotFindException();
        j.deplacer(req.body["direction"]);
        res.send(j.salle.vue());
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.post('/:attaquant/taper/:attaque', function (req, res) {
    try {
        let j = listeUtilisateur.get(+req.params.attaquant);
        if (j == undefined)
            throw new EntiteNotFindException_1.EntiteNotFindException();
        res.send(j.attaquer(+req.params.attaque));
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/:uid/examiner/:entite', function (req, res) {
    try {
        let j = listeUtilisateur.get(+req.params.uid);
        if (j == undefined)
            throw new EntiteNotFindException_1.EntiteNotFindException();
        res.send(j.observerEntite(+req.params.entite));
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/:uid/observerObjet/:objet', function (req, res) {
    try {
        let j = listeUtilisateur.get(+req.params.uid);
        if (j == undefined)
            throw new EntiteNotFindException_1.EntiteNotFindException();
        res.send(j.observerObjet(+req.params.objet));
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/:uid/prendre/:obj', function (req, res) {
    try {
        let j = listeUtilisateur.get(+req.params.uid);
        if (j == undefined)
            throw new EntiteNotFindException_1.EntiteNotFindException();
        j.prendre(+req.params.obj);
        res.send(j.vue());
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/:uid/utiliser/:obj', function (req, res) {
    try {
        let j = listeUtilisateur.get(+req.params.uid);
        if (j == undefined)
            throw new EntiteNotFindException_1.EntiteNotFindException();
        j.utiliser(+req.params.obj);
        res.send(j.vue());
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/:uid/deEquiper', function (req, res) {
    try {
        let j = listeUtilisateur.get(+req.params.uid);
        if (j == undefined)
            throw new EntiteNotFindException_1.EntiteNotFindException();
        j.deEquiper();
        res.send(j.vue());
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.listen(8080);
function gestionErreur(erreur, res) {
    /*
        Attention aux champs manquants
        Commandes inconnues
    */
    res.status(400);
    if (erreur instanceof JSONFieldException_1.JSONFieldException) {
        res.send({ "type": "ERREUR_JSON", "message": erreur.message });
        return;
    }
    res.status(404);
    if (erreur instanceof EntiteNotFindException_1.EntiteNotFindException) {
        res.send({ "type": "NON_TROUVE", "message": erreur.message });
        return;
    }
    res.status(409);
    if (erreur instanceof NoAccessException_1.NoAccessException) {
        res.send({ "type": "MUR", "message": erreur.message });
        return;
    }
    else if (erreur instanceof EntiteNotFindException_1.EntiteNotFindException) {
        res.send({ "type": "MORT", "message": erreur.message });
        return;
    }
    else if (erreur instanceof ObjectNotFindException_1.ObjectNotFindException) {
        res.send({ "type": "DISPARU", "message": erreur.message });
        return;
    }
}
