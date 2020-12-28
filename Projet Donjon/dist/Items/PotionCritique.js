"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PotionCritique = void 0;
const Objet_1 = require("./Objet");
class PotionCritique extends Objet_1.Objet {
    constructor(nom, prix, effect, description) {
        super(nom, prix, description);
        this.nom = nom;
        this.prix = prix;
        this.effect = effect;
        this.description = description;
    }
    utilise(joueur) {
        joueur.critique = joueur.critique + this.effect;
    }
    vue() {
        return { "nom": this.nom, "description": this.description, "effet": this.effect, "prix": this.prix };
    }
}
exports.PotionCritique = PotionCritique;
