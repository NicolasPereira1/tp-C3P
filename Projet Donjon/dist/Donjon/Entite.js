"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entite = void 0;
const EntiteNotFoundException_1 = require("../Exceptions/EntiteNotFoundException");
class Entite {
    constructor(nom, totalVie, salle) {
        this.nom = nom;
        this.totalVie = totalVie;
        this.salle = salle;
        this.guid = Entite.idNextEntite;
    }
    static ajouterEntite(entite) {
        Entite.entites.set(Entite.idNextEntite, entite);
        return Entite.idNextEntite++;
    }
    static getEntite(idx) {
        let entite = Entite.entites.get(idx);
        if (entite == undefined)
            throw new EntiteNotFoundException_1.EntiteNotFoundException();
        return entite;
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
Entite.idNextEntite = 0;
