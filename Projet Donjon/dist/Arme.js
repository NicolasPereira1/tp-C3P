"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arme = void 0;
const Objet_1 = require("./Objet");
class Arme extends Objet_1.Objet {
    constructor(nom, prix, degat, description) {
        super(nom, prix, description);
        this.nom = nom;
        this.prix = prix;
        this.degat = degat;
        this.description = description;
    }
    utilise(hostile) {
        if (hostile.arme != null)
            hostile.deEquiper();
        this.equipe(hostile);
    }
    equipe(hostile) {
        if (hostile.arme != null)
            hostile.sac.push(hostile.arme);
        hostile.arme = this;
        hostile.force = hostile.force + this.degat;
    }
    deEquipe(hostile) {
        hostile.arme = null;
        hostile.sac.push(this);
        hostile.force = hostile.force - this.degat;
    }
    vue() {
        return { "nom": this.nom, "description": this.description, "degat": this.degat, "prix": this.prix };
    }
}
exports.Arme = Arme;
