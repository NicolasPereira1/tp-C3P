import { Arme } from './Arme';
import { Objet } from './Objet';
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

    public static inisialiserDonjon():void{
        Salle.donjon[-2] = new Salle("Cimetière" , new Map<String,Salle>(), "Personne ne sort jamais d'ici... :(");

        
        Salle.donjon[0] = new Salle("Entrée",new Map<String,Salle>(),"Une entrée de maison assez classique.");        
        Salle.donjon[1] = new Salle("Cuisine", new Map<String,Salle>(), "Il semblerait que la vaisselle n'ai pas été faite depuis un moment...");
        Salle.donjon[2] = new Salle("Chambre", new Map<String,Salle>(), "Un lit confortable trône au beau milieu de la pièce. Il semble vous appeller à venir faire un petit somme.");
        Salle.donjon[3] = new Salle("Salle de bain", new Map<String,Salle>(), "Salle de bain assez rudimentaire mais fonctionnelle.");
        Salle.donjon[4] = new Salle("Cave", new Map<String,Salle>(), "Cave sombre et humide, on aurait bien besion d'une torche pour y voir plus clair...");
        
        Salle.donjon[0].passages.set("E", this.donjon[1]);
        Salle.donjon[0].passages.set("O", this.donjon[3]);
        Salle.donjon[0].passages.set("H", this.donjon[2]);
        Salle.donjon[0].passages.set("B", this.donjon[4]);

        
        Salle.donjon[1].passages.set("O", this.donjon[0]);
        
        Salle.donjon[2].passages.set("B", this.donjon[0]);
        
        Salle.donjon[3].passages.set("E", this.donjon[0]);
        
        Salle.donjon[4].passages.set("H", this.donjon[0]);

        Salle.donjon[1].objets.push(new PotionDeVie("Potion de vie I", 20, 10, "Potion qui permet de récuperer quelque points de vie."));
        Salle.donjon[2].objets.push(new PotionDeForce("Potion de force I", 25, 5, "Potion qui permet d'augementer vos points d'attaque."));
        Salle.donjon[2].objets.push(new Arme("Épée en bois", 10, 5, "Cette petite épée en bois n'est pas très tranchante mais c'est toujours mieux que rien."));
        Salle.donjon[3].objets.push(new PotionCritique("Potion coup crique I", 50, 0.05, "Potion qui permet d'augementer vos chance de réaliser un coup crique."));

        Entite.ajouterEntite( new Hostile("Gros rat méchant", 20, 5, 0, Salle.donjon[4]));
    }

    vue():object{
        let passages = Array.from(this.passages.keys());
        return {"nom":this.nomSalle,"description":this.description, "passages":passages, "entites":this.entites, "objets":this.objets};
    }
}
export {Salle};