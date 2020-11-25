"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PotionDeVie = void 0;
const Objet_1 = require("./Objet");
class PotionDeVie extends Objet_1.Objet {
    constructor(prix, effect) {
        super("Potion de vie", prix);
        this.prix = prix;
        this.effect = effect;
    }
    consommer(joueur) {
        joueur.vie = joueur.vie + this.effect;
    }
}
exports.PotionDeVie = PotionDeVie;
