"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PotionDeVie = void 0;
const Objet_1 = require("./Objet");
class PotionDeVie extends Objet_1.Objet {
    constructor(nom, prix, effect) {
        super(nom, prix);
        this.nom = nom;
        this.prix = prix;
        this.effect = effect;
    }
    utilise(joueur) {
        joueur.totalVie = joueur.totalVie + this.effect;
    }
}
exports.PotionDeVie = PotionDeVie;
