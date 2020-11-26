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
let joueur;
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    joueur = new Joueur_1.Joueur("Link", 50, new Salle_1.Salle("Entrée", null, null, null, null));
    res.render('index.ejs');
});
app.get('/currentSalle', function (req, res) {
    res.send(joueur.currentSalle);
});
app.get('/joueur', function (req, res) {
    res.send(joueur);
});
app.get('/monstre', function (req, res) {
    res.render('index.ejs');
});
app.post('/attaque', function (req, res) {
    console.log(req.body);
});
app.listen(8080);
