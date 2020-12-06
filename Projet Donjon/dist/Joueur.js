"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joueur = void 0;
const Salle_1 = require("./Salle");
const Entite_1 = require("./Entite");
const Hostile_1 = require("./Hostile");
class Joueur extends Hostile_1.Hostile {
    constructor(nom, vie, guid, salleId) {
        super(nom, vie, 5, guid, salleId);
        this.nom = nom;
        this.vie = vie;
        this.guid = guid;
        this.salleId = salleId;
        this.arme = null;
        this.or = 0;
        this.sac = [];
    }
    deplacer(direction) {
        let last = this.salleId;
        Salle_1.Salle.donjon[this.salleId].entites = this.remove(Salle_1.Salle.donjon[this.salleId].entites, this.guid);
        switch (direction) {
            case "N":
                this.salleId = Salle_1.Salle.donjon[this.salleId].passagesId[0];
                break;
            case "E":
                this.salleId = Salle_1.Salle.donjon[this.salleId].passagesId[1];
                break;
            case "S":
                this.salleId = Salle_1.Salle.donjon[this.salleId].passagesId[2];
                break;
            case "O":
                this.salleId = Salle_1.Salle.donjon[this.salleId].passagesId[3];
                break;
            case "H":
                this.salleId = Salle_1.Salle.donjon[this.salleId].passagesId[4];
                break;
            case "B":
                this.salleId = Salle_1.Salle.donjon[this.salleId].passagesId[5];
                break;
            default:
                console.log("Direction inconnue.");
        }
        if (this.salleId == -1) {
            this.salleId = last;
            console.log("Salle inaccéssible depuis la votre.");
        }
        Salle_1.Salle.donjon[this.salleId].entites.push(this.guid);
    }
    observerEntite(idx) {
        if (Salle_1.Salle.donjon[this.salleId].entites.includes(idx))
            return Entite_1.Entite.entites[idx];
    }
    observerObjet(idx) {
        if (Salle_1.Salle.donjon[this.salleId].objets.length > idx)
            return Salle_1.Salle.donjon[this.salleId].objets[idx];
    }
    prendre(idx) {
        let objet = Salle_1.Salle.donjon[this.salleId].objets.splice(idx, idx + 1);
        if (objet != null) {
            this.sac.push(objet[0]);
        }
        else {
            console.log("Cet objet n'existe pas");
        }
    }
}
exports.Joueur = Joueur;
