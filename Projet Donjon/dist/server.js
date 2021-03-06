"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Entite_1 = require("./Donjon/Entite");
const Hostile_1 = require("./Donjon/Hostile");
const Joueur_1 = require("./Donjon/Joueur");
const Salle_1 = require("./Donjon/Salle");
const JSONFieldException_1 = require("./Exceptions/JSONFieldException");
const EntiteNotFoundException_1 = require("./Exceptions/EntiteNotFoundException");
const ObjectNotFoundException_1 = require("./Exceptions/ObjectNotFoundException");
const CommandNotFoundException_1 = require("./Exceptions/CommandNotFoundException");
const NoAccessException_1 = require("./Exceptions/NoAccessException");
let app = express_1.default();
let nbrJoueur = 1;
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
Salle_1.Salle.inisialiserDonjon();
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.post('/connect', function (req, res) {
    let id = Entite_1.Entite.ajouterEntite(new Joueur_1.Joueur("Joueur" + nbrJoueur++, 50, Salle_1.Salle.donjon[0]));
    res.send(Entite_1.Entite.getEntite(id).vue());
});
app.get('/:uid/regarder', function (req, res) {
    try {
        let joueur = Entite_1.Entite.getEntite(+req.params.uid);
        res.send(joueur.salle.vue());
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.post('/:uid/deplacement', function (req, res) {
    try {
        let j = Entite_1.Entite.getEntite(+req.params.uid);
        if (!(j instanceof Joueur_1.Joueur))
            throw new CommandNotFoundException_1.CommandNotFoundException();
        j.deplacer(req.body["direction"]);
        res.send(j.salle.vue());
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.post('/:attaquant/taper/:attaque', function (req, res) {
    try {
        let j = Entite_1.Entite.getEntite(+req.params.attaquant);
        if (!(j instanceof Hostile_1.Hostile))
            throw new CommandNotFoundException_1.CommandNotFoundException();
        res.send(j.attaquer(+req.params.attaque));
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/:uid/examiner/:entite', function (req, res) {
    try {
        let j = Entite_1.Entite.getEntite(+req.params.uid);
        if (!(j instanceof Joueur_1.Joueur))
            throw new CommandNotFoundException_1.CommandNotFoundException();
        res.send(j.observerEntite(+req.params.entite));
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/:uid/observerObjet/:objet', function (req, res) {
    try {
        let j = Entite_1.Entite.getEntite(+req.params.uid);
        if (!(j instanceof Joueur_1.Joueur))
            throw new CommandNotFoundException_1.CommandNotFoundException();
        res.send(j.observerObjet(+req.params.objet));
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/:uid/prendre/:obj', function (req, res) {
    try {
        let j = Entite_1.Entite.getEntite(+req.params.uid);
        if (!(j instanceof Joueur_1.Joueur))
            throw new CommandNotFoundException_1.CommandNotFoundException();
        j.prendre(+req.params.obj);
        res.send(j.vue());
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/:uid/utiliser/:obj', function (req, res) {
    try {
        let j = Entite_1.Entite.getEntite(+req.params.uid);
        if (!(j instanceof Hostile_1.Hostile))
            throw new CommandNotFoundException_1.CommandNotFoundException();
        j.utiliser(+req.params.obj);
        res.send(j.vue());
    }
    catch (err) {
        gestionErreur(err, res);
    }
});
app.get('/:uid/deEquiper', function (req, res) {
    try {
        let j = Entite_1.Entite.getEntite(+req.params.uid);
        if (!(j instanceof Hostile_1.Hostile))
            throw new CommandNotFoundException_1.CommandNotFoundException();
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
