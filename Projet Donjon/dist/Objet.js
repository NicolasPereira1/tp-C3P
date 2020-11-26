"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objet = void 0;
class Objet {
    constructor(nom, prix) {
        this.nom = nom;
        this.prix = prix;
    }
    vendre(joueur) {
        joueur.or = joueur.or + this.prix;
    }
}
exports.Objet = Objet;
