"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PotionDeForce = void 0;
const Consomable_1 = require("./Consomable");
class PotionDeForce extends Consomable_1.Consomable {
    constructor(prix, effect) {
        super("Potion de vie", prix);
        this.prix = prix;
        this.effect = effect;
    }
    consommer(joueur) {
        joueur.vie = joueur.vie + this.effect;
    }
}
exports.PotionDeForce = PotionDeForce;
