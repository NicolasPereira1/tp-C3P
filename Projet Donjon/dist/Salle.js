"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salle = void 0;
class Salle {
    constructor(nomSalle, passages, passagesId, description) {
        this.nomSalle = nomSalle;
        this.passages = passages;
        this.passagesId = passagesId;
        this.description = description;
        this.entites = [];
        this.objets = [];
    }
}
exports.Salle = Salle;
Salle.donjon = [];
