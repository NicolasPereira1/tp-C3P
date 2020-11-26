"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salle = void 0;
class Salle {
    constructor(nomSalle, salleNord, salleEst, salleSud, salleOuest) {
        this.nomSalle = nomSalle;
        this.salleNord = salleNord;
        this.salleEst = salleEst;
        this.salleSud = salleSud;
        this.salleOuest = salleOuest;
        this.listeEntitee = [];
    }
}
exports.Salle = Salle;
