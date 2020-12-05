"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entitee = void 0;
class Entitee {
    constructor(nom, vie, salleId) {
        this.nom = nom;
        this.vie = vie;
        this.salleId = salleId;
    }
    remove(listeEntitee, entitee) {
        let nouvelleListe = [];
        for (let i = 0; i < listeEntitee.length; i++) {
            if (listeEntitee[i] != entitee)
                nouvelleListe.push(listeEntitee[i]);
        }
        return nouvelleListe;
    }
}
exports.Entitee = Entitee;
