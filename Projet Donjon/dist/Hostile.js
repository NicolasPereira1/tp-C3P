"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hostile = void 0;
const Entitee_1 = require("./Entitee");
class Hostile extends Entitee_1.Entitee {
    constructor(nom, vie, force) {
        super(nom, vie);
        this.nom = nom;
        this.vie = vie;
        this.force = force;
        this.critique = 0.05;
        this.arme = null;
        this.sac = [];
    }
    combattre(hostile) {
        this.attaquer(hostile);
        if (hostile.vie > 0)
            hostile.combattre(this);
    }
    attaquer(entitee) {
        console.log(this.nom + " attaque : " + entitee.nom);
        entitee.vie = entitee.vie - this.force;
        if (Math.random() < this.critique) {
            console.log(this.nom + " donne un coup critique !");
            entitee.vie = entitee.vie - this.force * 0.3;
        }
        if (entitee.vie <= 0)
            console.log(entitee.nom + " a succombé !");
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
