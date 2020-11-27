"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arme = void 0;
const Objet_1 = require("./Objet");
class Arme extends Objet_1.Objet {
    constructor(nom, prix, degat) {
        super(nom, prix);
        this.nom = nom;
        this.prix = prix;
        this.degat = degat;
        this.dejaUtilise = false;
    }
    utilise(hostile) {
        if (this.dejaUtilise)
            this.deEquipe(hostile);
        else
            this.equipe(hostile);
    }
    equipe(hostile) {
        if (hostile.arme != null)
            hostile.sac.push(hostile.arme);
        hostile.arme = this;
        hostile.force = hostile.force + this.degat;
    }
    deEquipe(hostile) {
        hostile.arme = null;
        hostile.sac.push(this);
        hostile.force = hostile.force - this.degat;
    }
}
exports.Arme = Arme;
