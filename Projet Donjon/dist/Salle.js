"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salle = void 0;
const Arme_1 = require("./Arme");
const Entite_1 = require("./Entite");
const Hostile_1 = require("./Hostile");
const PotionDeForce_1 = require("./PotionDeForce");
const PotionDeVie_1 = require("./PotionDeVie");
class Salle {
    constructor(nomSalle, passages, passagesId, description) {
        this.nomSalle = nomSalle;
        this.passages = passages;
        this.passagesId = passagesId;
        this.description = description;
        this.entites = [];
        this.objets = [];
    }
    static inisialiserDonjon() {
        Salle.donjon[-2] = new Salle("Cimetière", [], [], "Personne ne sort jamais d'ici... :(");
        Salle.donjon[0] = new Salle("Entrée", ["E", "O", "H", "B"], [-1, 1, -1, 3, 2, 4], "Une entrée de maison assez classique.");
        Salle.donjon[1] = new Salle("Cuisine", ["O"], [-1, -1, -1, 0, -1, -1], "Il semblerait que la vaisselle n'ai pas été faite depuis un moment...");
        Salle.donjon[2] = new Salle("Chambre", ["B"], [-1, -1, -1, -1, -1, 0], "Un lit confortable trône au beau milieu de la pièce. Il semble vous appeller à venir faire un petit somme.");
        Salle.donjon[3] = new Salle("Salle de bain", ["E"], [-1, 0, -1, -1, -1, -1], "Salle de bain assez rudimentaire mais fonctionnelle.");
        Salle.donjon[4] = new Salle("Cave", ["H"], [-1, -1, -1, -1, 0, -1], "Cave sombre et humide, on aurait bien besion d'une torche pour y voir plus clair...");
        Salle.donjon[1].objets.push(new PotionDeVie_1.PotionDeVie("Potion de vie I", 20, 10));
        Salle.donjon[2].objets.push(new PotionDeForce_1.PotionDeForce("Potion de force I", 25, 5));
        Salle.donjon[2].objets.push(new Arme_1.Arme("Épée en bois", 10, 5));
        Entite_1.Entite.ajouterEntite(new Hostile_1.Hostile("Gros rat méchant", 20, 5, 0, Salle.donjon[4]));
        return Salle.donjon;
    }
}
exports.Salle = Salle;
Salle.donjon = [];
