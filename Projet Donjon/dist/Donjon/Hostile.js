"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hostile = void 0;
const Entite_1 = require("./Entite");
const ObjectNotFoundException_1 = require("../Exceptions/ObjectNotFoundException");
class Hostile extends Entite_1.Entite {
    constructor(nom, totalVie, force, guid, salle) {
        super(nom, totalVie, guid, salle);
        this.nom = nom;
        this.totalVie = totalVie;
        this.force = force;
        this.guid = guid;
        this.salle = salle;
        this.critique = 0.05;
        this.arme = null;
        this.sac = [];
    }
    combattre(attaque) {
        this.attaquer(attaque);
        // if(Entite.entites[attaque] instanceof Hostile && Entite.entites[attaque].totalVie>0)
        // (Entite.entites[attaque] as Hostile).combattre(this.guid);
    }
    attaquer(attaque) {
        // let cible = Entite.entites[attaque];
        // if(cible == undefined)
        //     throw new EntiteNotFoundException();
        // if (cible.salle == this.salle){
        //     console.log(this.nom + " attaque : " + cible.nom);
        //     cible.totalVie = cible.totalVie-this.force;
        //     if(Math.random()<this.critique){
        //         console.log(this.nom + " donne un coup critique !");
        //         cible.totalVie = cible.totalVie-this.force*0.3;
        //     }
        //     if(cible.totalVie<=0){
        //         this.salle.entites = this.remove(this.salle.entites, attaque);
        //         cible.salle = Salle.donjon[-2];
        //         console.log(cible.nom + " a succombé !");
        //     }else if(cible instanceof Hostile){
        //         this.totalVie = this.totalVie - (cible as Hostile).force;
        //         if(this.totalVie<=0){
        //             this.salle.entites = this.remove(this.salle.entites, attaque);
        //             this.salle = Salle.donjon[-2];
        //             console.log(cible.nom + " a succombé !");
        //         }
        //     }
        // } else {
        //     throw new EntiteNotFoundException();
        // }
        // let force = 0;
        // if(cible instanceof Hostile)
        //     force = cible.force;
        // return {  "attaquant":{"guid":this.guid, "degat":this.force, "vie":this.totalVie},
        //           "attaque":  {"guid":cible.guid, "degat":force, "vie":cible.totalVie}};
        return {};
    }
    utiliser(idx) {
        let objet = this.sac.splice(idx, idx + 1);
        if (objet.length == 0)
            throw new ObjectNotFoundException_1.ObjectNotFoundException();
        objet[0].utilise(this);
    }
    deEquiper() {
        if (this.arme == undefined)
            throw new ObjectNotFoundException_1.ObjectNotFoundException();
        this.arme.deEquipe(this);
    }
    vue() {
        return { "nom": this.nom, "guid": this.guid, "totalvie": this.totalVie, "arme": this.arme, "force": this.force, "critique": this.critique, "sac": this.sac };
    }
}
exports.Hostile = Hostile;
