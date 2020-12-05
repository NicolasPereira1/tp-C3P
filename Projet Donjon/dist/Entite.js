"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entite = void 0;
const Salle_1 = require("./Salle");
class Entite {
    constructor(nom, vie, guid, salleId) {
        this.nom = nom;
        this.vie = vie;
        this.guid = guid;
        this.salleId = salleId;
    }
    static ajouterEntite(entite) {
        this.entites.push(entite);
        Salle_1.Salle.donjon[entite.salleId].entites.push(entite.guid);
    }
    remove(entites, idx) {
        let nouvelleListe = [];
        for (let i = 0; i < entites.length; i++) {
            if (i != idx)
                nouvelleListe.push(entites[i]);
        }
        return nouvelleListe;
    }
}
exports.Entite = Entite;
Entite.entites = [];
