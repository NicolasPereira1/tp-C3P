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
        this.arme = null;
        this.sac = [];
    }
    attaquer(degat) {
        this.vie = this.vie - degat;
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
