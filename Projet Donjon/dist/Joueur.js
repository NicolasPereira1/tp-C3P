"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joueur = void 0;
const Entitee_1 = require("./Entitee");
const PotionDeVie_1 = require("./PotionDeVie");
class Joueur extends Entitee_1.Entitee {
    constructor(nom, vie, currentSalle) {
        super(nom, vie);
        this.nom = nom;
        this.vie = vie;
        this.currentSalle = currentSalle;
        this.force = 5;
        this.or = 0;
        this.sac = [];
    }
    attaque(degat) {
        this.vie = this.vie - degat;
    }
    prendre(objet) {
        this.sac.push(objet);
    }
    consomme(indice) {
    }
}
exports.Joueur = Joueur;
let p = new PotionDeVie_1.PotionDeVie(10, 20);
console.log(p instanceof PotionDeVie_1.PotionDeVie);
