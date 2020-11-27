"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joueur = void 0;
const Hostile_1 = require("./Hostile");
const Salle_1 = require("./Salle");
class Joueur extends Hostile_1.Hostile {
    constructor(nom, vie, salleId) {
        super(nom, vie, 5);
        this.nom = nom;
        this.vie = vie;
        this.salleId = salleId;
        this.arme = null;
        this.or = 0;
        this.sac = [];
    }
    deplacer(direction) {
        Salle_1.Salle.donjon[this.salleId].listeEntitee = this.remove(Salle_1.Salle.donjon[this.salleId].listeEntitee, this);
        if (Salle_1.Salle.donjon[direction] != null)
            switch (direction) {
                case Salle_1.Salle.donjon[this.salleId].idNord:
                    this.salleId = direction;
                    break;
                case Salle_1.Salle.donjon[this.salleId].idEst:
                    this.salleId = direction;
                    break;
                case Salle_1.Salle.donjon[this.salleId].idSud:
                    this.salleId = direction;
                    break;
                case Salle_1.Salle.donjon[this.salleId].idOuest:
                    this.salleId = direction;
                    break;
                case Salle_1.Salle.donjon[this.salleId].idHaut:
                    this.salleId = direction;
                    break;
                case Salle_1.Salle.donjon[this.salleId].idBas:
                    this.salleId = direction;
                    break;
                default:
                    console.log("Salle inaccéssible");
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
