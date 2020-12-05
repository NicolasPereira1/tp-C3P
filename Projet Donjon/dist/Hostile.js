"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hostile = void 0;
const Entite_1 = require("./Entite");
const Salle_1 = require("./Salle");
class Hostile extends Entite_1.Entite {
    constructor(nom, vie, force, guid, salleId) {
        super(nom, vie, guid, salleId);
        this.nom = nom;
        this.vie = vie;
        this.force = force;
        this.guid = guid;
        this.salleId = salleId;
        this.critique = 0.05;
        this.arme = null;
        this.sac = [];
    }
    combattre(attaque) {
        this.attaquer(attaque);
        if (Entite_1.Entite.entites[attaque] instanceof Hostile && Entite_1.Entite.entites[attaque].vie > 0)
            Entite_1.Entite.entites[attaque].combattre(this.guid);
    }
    attaquer(attaque) {
        console.log(this.nom + " attaque : " + Entite_1.Entite.entites[attaque].nom);
        Entite_1.Entite.entites[attaque].vie = Entite_1.Entite.entites[attaque].vie - this.force;
        if (Math.random() < this.critique) {
            console.log(this.nom + " donne un coup critique !");
            Entite_1.Entite.entites[attaque].vie = Entite_1.Entite.entites[attaque].vie - this.force * 0.3;
        }
        if (Entite_1.Entite.entites[attaque].vie <= 0) {
            Salle_1.Salle.donjon[this.salleId].entites = this.remove(Salle_1.Salle.donjon[this.salleId].entites, attaque);
            console.log(Entite_1.Entite.entites[attaque].nom + " a succombé !");
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
