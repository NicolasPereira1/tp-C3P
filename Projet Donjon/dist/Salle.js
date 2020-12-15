"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salle = void 0;
const Arme_1 = require("./Arme");
const Entite_1 = require("./Entite");
const Hostile_1 = require("./Hostile");
const PotionDeForce_1 = require("./PotionDeForce");
const PotionDeVie_1 = require("./PotionDeVie");
const PotionCritique_1 = require("./PotionCritique");
class Salle {
    constructor(nomSalle, passages, description) {
        this.nomSalle = nomSalle;
        this.passages = passages;
        this.description = description;
        this.entites = [];
        this.objets = [];
    }
    static inisialiserDonjon() {
        Salle.donjon[-2] = new Salle("Cimetière", new Map(), "Personne ne sort jamais d'ici... :(");
        Salle.donjon[0] = new Salle("Entrée", new Map(), "Une entrée de maison assez classique.");
        Salle.donjon[0].passages.set("E", Salle.donjon[1]);
        Salle.donjon[0].passages.set("O", Salle.donjon[3]);
        Salle.donjon[0].passages.set("H", Salle.donjon[2]);
        Salle.donjon[0].passages.set("B", Salle.donjon[4]);
        Salle.donjon[1] = new Salle("Cuisine", new Map(), "Il semblerait que la vaisselle n'ai pas été faite depuis un moment...");
        Salle.donjon[1].passages.set("O", Salle.donjon[0]);
        let chambre = new Salle("Chambre", new Map(), "Un lit confortable trône au beau milieu de la pièce. Il semble vous appeller à venir faire un petit somme.");
        chambre.passages.set("B", Salle.donjon[0]);
        Salle.donjon[2] = chambre;
        let bain = new Salle("Salle de bain", new Map(), "Salle de bain assez rudimentaire mais fonctionnelle.");
        bain.passages.set("E", Salle.donjon[0]);
        Salle.donjon[3] = bain;
        let cave = new Salle("Cave", new Map(), "Cave sombre et humide, on aurait bien besion d'une torche pour y voir plus clair...");
        cave.passages.set("H", Salle.donjon[0]);
        Salle.donjon[4] = cave;
        Salle.donjon[1].objets.push(new PotionDeVie_1.PotionDeVie("Potion de vie I", 20, 10));
        chambre.objets.push(new PotionDeForce_1.PotionDeForce("Potion de force I", 25, 5));
        chambre.objets.push(new Arme_1.Arme("Épée en bois", 10, 5));
        bain.objets.push(new PotionCritique_1.PotionCritique("Potion coup crique I", 50, 0.05));
        Entite_1.Entite.ajouterEntite(new Hostile_1.Hostile("Gros rat méchant", 20, 5, 0, cave));
        return Salle.donjon;
    }
}
exports.Salle = Salle;
Salle.donjon = [];
