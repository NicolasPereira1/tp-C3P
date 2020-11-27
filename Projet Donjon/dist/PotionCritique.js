"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PotionCritique = void 0;
const Objet_1 = require("./Objet");
class PotionCritique extends Objet_1.Objet {
    constructor(nom, prix, effect) {
        super(nom, prix);
        this.nom = nom;
        this.prix = prix;
        this.effect = effect;
    }
    utilise(joueur) {
        joueur.force = joueur.force + this.effect;
    }
}
exports.PotionCritique = PotionCritique;
