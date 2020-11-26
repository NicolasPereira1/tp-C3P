"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PotionDeVie = void 0;
const Consomable_1 = require("./Consomable");
class PotionDeVie extends Consomable_1.Consomable {
    constructor(nom, prix, effect) {
        super(nom, prix);
        this.nom = nom;
        this.prix = prix;
        this.effect = effect;
    }
    consommer(joueur) {
        joueur.vie = joueur.vie + this.effect;
    }
}
exports.PotionDeVie = PotionDeVie;
