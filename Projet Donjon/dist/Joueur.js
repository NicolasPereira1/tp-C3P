"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joueur = void 0;
const Entitee_1 = require("./Entitee");
const Salle_1 = require("./Salle");
class Joueur extends Entitee_1.Entitee {
    constructor(nom, vie, salleCourante) {
        super(nom, vie);
        this.nom = nom;
        this.vie = vie;
        this.salleCourante = salleCourante;
        this.arme = null;
        this.force = 5;
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
    attaquer(degat) {
        this.vie = this.vie - degat;
    }
    prendre(idx) {
        let objet = this.salleCourante.listeObjet.splice(idx, idx + 1);
        if (objet != null) {
            this.sac.push(objet[0]);
        }
    }
    utiliser(idx) {
        let objet = this.sac.splice(idx, idx + 1);
        if (objet != null)
            objet[0].utilise(this);
    }
    deEquiper() {
        if (this.arme != null)
            this.arme.deEquipe(this);
    }
}
exports.Joueur = Joueur;
