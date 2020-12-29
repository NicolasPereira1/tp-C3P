"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Joueur_1 = require("./Donjon/Joueur");
const Salle_1 = require("./Donjon/Salle");
const JSONFieldException_1 = require("./Exceptions/JSONFieldException");
const EntiteNotFoundException_1 = require("./Exceptions/EntiteNotFoundException");
const ObjectNotFoundException_1 = require("./Exceptions/ObjectNotFoundException");
const CommandNotFoundException_1 = require("./Exceptions/CommandNotFoundException");
const NoAccessException_1 = require("./Exceptions/NoAccessException");
let app = express_1.default();
let idJoueur = 101;
let listeUtilisateur = new Map();
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
Salle_1.Salle.inisialiserDonjon();
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.post('/connect', function (req, res) {
    var _a;
    let joueur = new Joueur_1.Joueur("Joueur " + (idJoueur - 100), 50, idJoueur, Salle_1.Salle.donjon[0]);
    listeUtilisateur.set(idJoueur, joueur);
    idJoueur++;
    res.send((_a = listeUtilisateur.get(idJoueur - 1)) === null || _a === void 0 ? void 0 : _a.vue());
});
app.get('/:uid/regarder', function (req, res) {
    try {
        let joueur = listeUtilisateur.get(+req.params.uid);
        if (joueur == undefined)
            throw new EntiteNotFoundException_1.EntiteNotFoundException();
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
            throw new EntiteNotFoundException_1.EntiteNotFoundException();
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
            throw new EntiteNotFoundException_1.EntiteNotFoundException();
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
            throw new EntiteNotFoundException_1.EntiteNotFoundException();
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
            throw new EntiteNotFoundException_1.EntiteNotFoundException();
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
            throw new EntiteNotFoundException_1.EntiteNotFoundException();
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
            throw new EntiteNotFoundException_1.EntiteNotFoundException();
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
            throw new EntiteNotFoundException_1.EntiteNotFoundException();
        j.deEquiper();
        res.send(j.vue());
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/*', function (req, res) {
    gestionErreur(new CommandNotFoundException_1.CommandNotFoundException(), res);
});
app.post('/*', function (req, res) {
    gestionErreur(new CommandNotFoundException_1.CommandNotFoundException(), res);
});
app.listen(8080);
function gestionErreur(erreur, res) {
    /*
        fight entre joueurs
    */
    res.status(400);
    if (erreur instanceof JSONFieldException_1.JSONFieldException) {
        res.send({ "type": "ERREUR_JSON", "message": erreur.message });
        return;
    }
    res.status(404);
    if (erreur instanceof EntiteNotFoundException_1.EntiteNotFoundException) {
        res.send({ "type": "NON_TROUVE", "message": erreur.message });
        return;
    }
    if (erreur instanceof CommandNotFoundException_1.CommandNotFoundException) {
        res.send({ "type": "COMMANDE_ERRONEE", "message": erreur.message });
        return;
    }
    res.status(409);
    if (erreur instanceof NoAccessException_1.NoAccessException) {
        res.send({ "type": "MUR", "message": erreur.message });
        return;
    }
    else if (erreur instanceof EntiteNotFoundException_1.EntiteNotFoundException) {
        res.send({ "type": "MORT", "message": erreur.message });
        return;
    }
    else if (erreur instanceof ObjectNotFoundException_1.ObjectNotFoundException) {
        res.send({ "type": "DISPARU", "message": erreur.message });
        return;
    }
}
