"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joueur = void 0;
const Hostile_1 = require("./Hostile");
const Salle_1 = require("./Salle");
class Joueur extends Hostile_1.Hostile {
    constructor(nom, vie, salleId) {
        super(nom, vie, 5, salleId);
        this.nom = nom;
        this.vie = vie;
        this.salleId = salleId;
        this.arme = null;
        this.or = 0;
        this.sac = [];
    }
    deplacer(direction) {
        let last = this.salleId;
        Salle_1.Salle.donjon[this.salleId].listeEntitee = this.remove(Salle_1.Salle.donjon[this.salleId].listeEntitee, this);
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
        // console.log(this.salleId)
        if (this.salleId == -1) {
            this.salleId = last;
            console.log("Salle inaccéssible depuis la votre.");
        }
        Salle_1.Salle.donjon[this.salleId].listeEntitee.push(this);
    }
    observerEntitee(idx) {
        return Salle_1.Salle.donjon[this.salleId].listeEntitee[idx];
    }
    observerObjet(idx) {
        return Salle_1.Salle.donjon[this.salleId].listeObjet[idx];
    }
    prendre(idx) {
        let objet = Salle_1.Salle.donjon[this.salleId].listeObjet.splice(idx, idx + 1);
        if (objet != null) {
            this.sac.push(objet[0]);
        }
        else {
            console.log("Cet objet n'existe pas");
        }
    }
}
exports.Joueur = Joueur;
