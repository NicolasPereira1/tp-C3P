"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consomable = void 0;
const Objet_1 = require("./Objet");
class Consomable extends Objet_1.Objet {
    constructor(nom, prix) {
        super(nom, prix);
        this.nom = nom;
        this.prix = prix;
    }
}
exports.Consomable = Consomable;
