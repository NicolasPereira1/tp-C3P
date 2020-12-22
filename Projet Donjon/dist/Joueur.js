"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joueur = void 0;
const Entite_1 = require("./Entite");
const Hostile_1 = require("./Hostile");
class Joueur extends Hostile_1.Hostile {
    constructor(nom, totalVie, guid, salle) {
        super(nom, totalVie, 5, guid, salle);
        this.nom = nom;
        this.totalVie = totalVie;
        this.guid = guid;
        this.salle = salle;
        this.or = 0;
        salle.entites.push(guid);
    }
    deplacer(direction) {
        let next = undefined;
        this.salle.entites = this.remove(this.salle.entites, this.guid);
        switch (direction) {
            case "N":
                next = this.salle.passages.get(direction);
                break;
            case "E":
                next = this.salle.passages.get(direction);
                break;
            case "S":
                next = this.salle.passages.get(direction);
                break;
            case "O":
                next = this.salle.passages.get(direction);
                break;
            case "H":
                next = this.salle.passages.get(direction);
                break;
            case "B":
                next = this.salle.passages.get(direction);
                break;
        }
        if (next == undefined) {
            console.log("Salle inaccéssible depuis la votre.");
        }
        else {
            this.salle = next;
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
    vue() {
        return { "nom": this.nom, "guid": this.guid, "totalvie": this.totalVie, "arme": this.arme, "salle": this.salle.vue() };
    }
}
exports.Joueur = Joueur;
