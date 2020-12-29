"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joueur = void 0;
const Entite_1 = require("./Entite");
const Hostile_1 = require("./Hostile");
const NoAccessException_1 = require("../Exceptions/NoAccessException");
const JSONFieldException_1 = require("../Exceptions/JSONFieldException");
const EntiteNotFoundException_1 = require("../Exceptions/EntiteNotFoundException");
const ObjectNotFoundException_1 = require("../Exceptions/ObjectNotFoundException");
class Joueur extends Hostile_1.Hostile {
    constructor(nom, totalVie, guid, salle) {
        super(nom, totalVie, 5, guid, salle);
        this.nom = nom;
        this.totalVie = totalVie;
        this.guid = guid;
        this.salle = salle;
        this.or = 0;
        Entite_1.Entite.entites.set(guid, this);
    }
    deplacer(direction) {
        let next = undefined;
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
            default:
                throw new JSONFieldException_1.JSONFieldException();
        }
        if (next == undefined) {
            throw new NoAccessException_1.NoAccessException();
        }
        else {
            this.salle = next;
        }
    }
    observerEntite(idx) {
        // if (this.salle.entites.includes(idx))
        //     return Entite.entites[idx].vue();
        throw new EntiteNotFoundException_1.EntiteNotFoundException();
    }
    observerObjet(idx) {
        if (this.salle.objets.length > idx)
            return this.salle.objets[idx].vue();
        throw new ObjectNotFoundException_1.ObjectNotFoundException();
    }
    prendre(idx) {
        let objet = this.salle.objets.splice(idx, idx + 1);
        if (objet.length == 0)
            throw new ObjectNotFoundException_1.ObjectNotFoundException();
        this.sac.push(objet[0]);
    }
    vue() {
        return Object.assign(super.vue(), { "or": this.or, "salle": this.salle });
        ;
    }
}
exports.Joueur = Joueur;
