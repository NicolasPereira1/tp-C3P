"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entite = void 0;
class Entite {
    constructor(nom, totalVie, guid, salle) {
        this.nom = nom;
        this.totalVie = totalVie;
        this.guid = guid;
        this.salle = salle;
    }
    remove(entites, id) {
        let nouvelleListe = [];
        for (let i = 0; i < entites.length; i++) {
            if (entites[i] != id)
                nouvelleListe.push(entites[i]);
        }
        return nouvelleListe;
    }
}
exports.Entite = Entite;
Entite.entites = new Map();
