"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joueur = void 0;
const Salle_1 = require("./Salle");
const Entite_1 = require("./Entite");
const Hostile_1 = require("./Hostile");
class Joueur extends Hostile_1.Hostile {
    constructor(nom, totalVie, guid, salle) {
        super(nom, totalVie, 5, guid, salle);
        this.nom = nom;
        this.totalVie = totalVie;
        this.guid = guid;
        this.salle = salle;
        this.arme = null;
        this.or = 0;
        this.sac = [];
    }
    deplacer(direction) {
        let last = this.salle;
        this.salle.entites = this.remove(this.salle.entites, this.guid);
        switch (direction) {
            case "N":
                this.salle = Salle_1.Salle.donjon[this.salle.passagesId[0]];
                break;
            case "E":
                this.salle = Salle_1.Salle.donjon[this.salle.passagesId[1]];
                break;
            case "S":
                this.salle = Salle_1.Salle.donjon[this.salle.passagesId[2]];
                break;
            case "O":
                this.salle = Salle_1.Salle.donjon[this.salle.passagesId[3]];
                break;
            case "H":
                this.salle = Salle_1.Salle.donjon[this.salle.passagesId[4]];
                break;
            case "B":
                this.salle = Salle_1.Salle.donjon[this.salle.passagesId[5]];
                break;
            default:
                console.log("Direction inconnue.");
        }
        if (this.salle == undefined) {
            this.salle = last;
            console.log("Salle inaccéssible depuis la votre.");
        }
        this.salle.entites.push(this.guid);
    }
    observerEntite(idx) {
        if (this.salle.entites.includes(idx))
            return Entite_1.Entite.entites[idx];
    }
    observerObjet(idx) {
        if (this.salle.objets.length > idx)
            return this.salle.objets[idx];
    }
    prendre(idx) {
        let objet = this.salle.objets.splice(idx, idx + 1);
        if (objet != null) {
            this.sac.push(objet[0]);
        }
        else {
            console.log("Cet objet n'existe pas");
        }
    }
}
exports.Joueur = Joueur;
