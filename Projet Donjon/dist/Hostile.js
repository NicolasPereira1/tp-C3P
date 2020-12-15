"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hostile = void 0;
const Entite_1 = require("./Entite");
const Salle_1 = require("./Salle");
class Hostile extends Entite_1.Entite {
    constructor(nom, totalVie, force, guid, salle) {
        super(nom, totalVie, guid, salle);
        this.nom = nom;
        this.totalVie = totalVie;
        this.force = force;
        this.guid = guid;
        this.salle = salle;
        this.critique = 0.05;
        this.arme = null;
        this.sac = [];
    }
    combattre(attaque) {
        this.attaquer(attaque);
        if (Entite_1.Entite.entites[attaque] instanceof Hostile && Entite_1.Entite.entites[attaque].totalVie > 0)
            Entite_1.Entite.entites[attaque].combattre(this.guid);
    }
    attaquer(attaque) {
        let cible = Entite_1.Entite.entites[attaque];
        if (cible.salle == this.salle) {
            console.log(this.nom + " attaque : " + cible.nom);
            cible.totalVie = cible.totalVie - this.force;
            if (Math.random() < this.critique) {
                console.log(this.nom + " donne un coup critique !");
                cible.totalVie = cible.totalVie - this.force * 0.3;
            }
            if (cible.totalVie <= 0) {
                this.salle.entites = this.remove(this.salle.entites, attaque);
                cible.salle = Salle_1.Salle.donjon[-2]; //Peut être créer une salle cimtière.
                console.log(cible.nom + " a succombé !");
            }
            else if (cible instanceof Hostile) {
                this.totalVie = this.totalVie - cible.force;
            }
        }
    }
    utiliser(idx) {
        let objet = this.sac.splice(idx, idx + 1);
        if (objet != null)
            objet[0].utilise(this);
    }
    deEquiper() {
        if (this.arme != null)
            this.arme.deEquipe(this);
    }
}
exports.Hostile = Hostile;
