"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salle = void 0;
class Salle {
    constructor(nomSalle, idNord, idEst, idSud, idOuest, idHaut, idBas) {
        this.nomSalle = nomSalle;
        this.idNord = idNord;
        this.idEst = idEst;
        this.idSud = idSud;
        this.idOuest = idOuest;
        this.idHaut = idHaut;
        this.idBas = idBas;
        this.listeEntitee = [];
        this.listeObjet = [];
    }
}
exports.Salle = Salle;
Salle.donjon = [];
