import { Arme } from './Arme';
import { Salle } from './Salle';
import { Objet } from './Objet';
import { Entite } from './Entite';
import { Hostile } from './Hostile';

class Joueur extends Hostile {
    public arme:Arme|null = null;
    public or:number = 0;
    public sac:Objet[] = [];

    constructor(public nom:string, public vie:number, public guid:number, public salleId:number){
        super(nom, vie, 5, guid, salleId);
    }

    deplacer(direction:string) {
        let last = this.salleId;
        Salle.donjon[this.salleId].entites = this.remove(Salle.donjon[this.salleId].entites, this.guid);
        switch (direction){
            case "N":
                this.salleId = Salle.donjon[this.salleId].passagesId[0];
            break;
            case "E":
                this.salleId = Salle.donjon[this.salleId].passagesId[1];
            break;
            case "S":
                this.salleId = Salle.donjon[this.salleId].passagesId[2];
            break;
            case "O":
                this.salleId = Salle.donjon[this.salleId].passagesId[3];
            break;
            case "H":
                this.salleId = Salle.donjon[this.salleId].passagesId[4];
            break;
            case "B":
                this.salleId = Salle.donjon[this.salleId].passagesId[5];
            break;
            default:
                console.log("Direction inconnue.");
        }
        if(this.salleId == -1){
            this.salleId = last;
            console.log("Salle inaccéssible depuis la votre.");
        }
        Salle.donjon[this.salleId].entites.push(this.guid);      
    }

    observerEntite(idx:number):Entite|undefined {
        if (Salle.donjon[this.salleId].entites.includes(idx))
            return Entite.entites[idx];
    }
    
    observerObjet(idx:number):Objet|undefined {
        if (Salle.donjon[this.salleId].objets.length>idx)
            return Salle.donjon[this.salleId].objets[idx];
    }

    prendre(idx:number):void {
        let objet = Salle.donjon[this.salleId].objets.splice(idx,idx+1);
        if( objet != null){
            this.sac.push(objet[0]);
        }else{
            console.log("Cet objet n'existe pas");
        }
    }
}
export {Joueur};