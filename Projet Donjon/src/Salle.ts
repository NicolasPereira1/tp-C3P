import { Arme } from './Arme';
import {Objet} from './Objet';
import { Entite } from './Entite';
import { Hostile } from './Hostile';
import { PotionDeForce } from './PotionDeForce';
import { PotionDeVie } from './PotionDeVie';
import { PotionCritique } from './PotionCritique';

class Salle {
    public static donjon:Salle[] = [];
    public entites:number[] = [];
    public objets:Objet[] = [];

    constructor(public nomSalle:string, public passages:Map<String,Salle>, public description:string){}

    public static inisialiserDonjon():Salle[]{
        Salle.donjon[-2] = new Salle("Cimetière" , new Map<String,Salle>(), "Personne ne sort jamais d'ici... :(");

        let entree = new Salle("Entrée",new Map<String,Salle>(),"Une entrée de maison assez classique.");
        entree.passages.set("E", this.donjon[1]);
        entree.passages.set("O", this.donjon[3]);
        entree.passages.set("H", this.donjon[2]);
        entree.passages.set("B", this.donjon[4]);
        this.donjon[0] = entree;

        let cuisine = new Salle("Cuisine", new Map<String,Salle>(), "Il semblerait que la vaisselle n'ai pas été faite depuis un moment...");
        cuisine.passages.set("O", this.donjon[0]);
        Salle.donjon[1] = cuisine;

        let chambre = new Salle("Chambre", new Map<String,Salle>(), "Un lit confortable trône au beau milieu de la pièce. Il semble vous appeller à venir faire un petit somme.");
        chambre.passages.set("B", this.donjon[0]);
        Salle.donjon[2] = chambre;

        let bain = new Salle("Salle de bain", new Map<String,Salle>(), "Salle de bain assez rudimentaire mais fonctionnelle.");
        bain.passages.set("E", this.donjon[0]);
        Salle.donjon[3] = bain;

        let cave = new Salle("Cave", new Map<String,Salle>(), "Cave sombre et humide, on aurait bien besion d'une torche pour y voir plus clair...");
        cave.passages.set("H", this.donjon[0]);
        Salle.donjon[4] = cave;

        cuisine.objets.push(new PotionDeVie("Potion de vie I", 20, 10));
        chambre.objets.push(new PotionDeForce("Potion de force I", 25, 5));
        chambre.objets.push(new Arme("Épée en bois", 10, 5));
        bain.objets.push(new PotionCritique("Potion coup crique I", 50, 0.05))

        Entite.ajouterEntite( new Hostile("Gros rat méchant", 20, 5, 0, cave));

        return Salle.donjon;
    }
}
export {Salle};