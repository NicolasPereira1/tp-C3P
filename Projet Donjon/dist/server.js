"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Joueur_1 = require("./Joueur");
let app = express_1.default();
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.get('/salle', function (req, res) {
    res.render('index.ejs');
});
app.get('/joueur', function (req, res) {
    let j1 = new Joueur_1.Joueur("Link", 50, 10);
    res.send(j1);
});
app.get('/monstre', function (req, res) {
    res.render('index.ejs');
});
app.post('/attaque', function (req, res) {
    console.log(req.body);
});
app.listen(8080);
