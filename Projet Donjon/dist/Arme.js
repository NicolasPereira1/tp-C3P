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
    utilise(joueur) {
        if (this.dejaUtilise)
            this.deEquipe(joueur);
        else
            this.equipe(joueur);
    }
    equipe(joueur) {
        if (joueur.arme != null)
            joueur.sac.push(joueur.arme);
        joueur.arme = this;
        joueur.force = joueur.force + this.degat;
    }
    deEquipe(joueur) {
        joueur.arme = null;
        joueur.sac.push(this);
        joueur.force = joueur.force - this.degat;
    }
}
exports.Arme = Arme;
