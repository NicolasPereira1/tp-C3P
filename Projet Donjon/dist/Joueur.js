"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joueur = void 0;
const Hostile_1 = require("./Hostile");
const Salle_1 = require("./Salle");
class Joueur extends Hostile_1.Hostile {
    constructor(nom, vie, salleCourante) {
        super(nom, vie, 5);
        this.nom = nom;
        this.vie = vie;
        this.salleCourante = salleCourante;
        this.arme = null;
        this.or = 0;
        this.sac = [];
    }
    deplacer(direction) {
        if (Salle_1.Salle.donjon[direction] != null)
            switch (direction) {
                case this.salleCourante.idNord:
                    this.salleCourante = Salle_1.Salle.donjon[direction];
                    break;
                case this.salleCourante.idEst:
                    this.salleCourante = Salle_1.Salle.donjon[direction];
                    break;
                case this.salleCourante.idSud:
                    this.salleCourante = Salle_1.Salle.donjon[direction];
                    break;
                case this.salleCourante.idOuest:
                    this.salleCourante = Salle_1.Salle.donjon[direction];
                    break;
                case this.salleCourante.idHaut:
                    this.salleCourante = Salle_1.Salle.donjon[direction];
                    break;
                case this.salleCourante.idBas:
                    this.salleCourante = Salle_1.Salle.donjon[direction];
                    break;
                default:
                    console.log("Salle inaccéssible");
            }
    }
    observerEntitee(idx) {
        return this.salleCourante.listeEntitee[idx - 1];
    }
    observerObjet(idx) {
        return this.salleCourante.listeObjet[idx - 1];
    }
    prendre(idx) {
        let objet = this.salleCourante.listeObjet.splice(idx, idx + 1);
        if (objet != null) {
            this.sac.push(objet[0]);
        }
    }
}
exports.Joueur = Joueur;
