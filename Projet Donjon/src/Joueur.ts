import { Arme } from './Arme';
import { Salle } from './Salle';
import { Objet } from './Objet';
import { Entite } from './Entite';
import { Hostile } from './Hostile';

class Joueur extends Hostile {
    public arme:Arme|null = null;
    public or:number = 0;
    public sac:Objet[] = [];

    constructor(public nom:string, public totalVie:number, public guid:number, public salle:Salle){
        super(nom, totalVie, 5, guid, salle);
    }

    deplacer(direction:string) {
        let last = this.salle;
        this.salle.entites = this.remove(this.salle.entites, this.guid);
        switch (direction){
            case "N":
                this.salle = Salle.donjon[this.salle.passagesId[0]];
            break;
            case "E":
                this.salle = Salle.donjon[this.salle.passagesId[1]];
            break;
            case "S":
                this.salle = Salle.donjon[this.salle.passagesId[2]];
            break;
            case "O":
                this.salle = Salle.donjon[this.salle.passagesId[3]];
            break;
            case "H":
                this.salle = Salle.donjon[this.salle.passagesId[4]];
            break;
            case "B":
                this.salle = Salle.donjon[this.salle.passagesId[5]];
            break;
            default:
                console.log("Direction inconnue.");
        }
        if(this.salle == undefined){
            this.salle = last;
            console.log("Salle inaccéssible depuis la votre.");
        }
        this.salle.entites.push(this.guid);      
    }

    observerEntite(idx:number):Entite|undefined {
        if (this.salle.entites.includes(idx))
            return Entite.entites[idx];
    }
    
    observerObjet(idx:number):Objet|undefined {
        if (this.salle.objets.length>idx)
            return this.salle.objets[idx];
    }

    prendre(idx:number):void {
        let objet = this.salle.objets.splice(idx,idx+1);
        if( objet != null){
            this.sac.push(objet[0]);
        }else{
            console.log("Cet objet n'existe pas");
        }
    }
}
export {Joueur};