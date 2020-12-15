import { Arme } from './Arme';
import {Objet} from './Objet';
import { Entite } from './Entite';
import { Hostile } from './Hostile';
import { PotionDeForce } from './PotionDeForce';
import { PotionDeVie } from './PotionDeVie';

class Salle {
    public static donjon:Salle[] = [];
    public entites:number[] = [];
    public objets:Objet[] = [];

    constructor(public nomSalle:string, public passages:string[], public passagesId:number[], public description:string){}

    public static inisialiserDonjon():Salle[]{
        Salle.donjon[-2] = new Salle("Cimetière" , [], [], "Personne ne sort jamais d'ici... :(");
        Salle.donjon[0] = new Salle("Entrée",["E","O","H","B"],[-1,1,-1,3,2,4],"Une entrée de maison assez classique.");
        Salle.donjon[1] = new Salle("Cuisine",["O"],[-1,-1,-1,0,-1,-1], "Il semblerait que la vaisselle n'ai pas été faite depuis un moment...");
        Salle.donjon[2] = new Salle("Chambre",["B"],[-1,-1,-1,-1,-1,0], "Un lit confortable trône au beau milieu de la pièce. Il semble vous appeller à venir faire un petit somme.");
        Salle.donjon[3] = new Salle("Salle de bain",["E"],[-1,0,-1,-1,-1,-1], "Salle de bain assez rudimentaire mais fonctionnelle.");
        Salle.donjon[4] = new Salle("Cave",["H"],[-1,-1,-1,-1,0,-1], "Cave sombre et humide, on aurait bien besion d'une torche pour y voir plus clair...");
    
        Salle.donjon[1].objets.push(new PotionDeVie("Potion de vie I", 20, 10));
        Salle.donjon[2].objets.push(new PotionDeForce("Potion de force I", 25, 5));
        Salle.donjon[2].objets.push(new Arme("Épée en bois", 10, 5));
        
        Entite.ajouterEntite( new Hostile("Gros rat méchant", 20, 5, 0, Salle.donjon[4]));

        return Salle.donjon;
    }
}
export {Salle};