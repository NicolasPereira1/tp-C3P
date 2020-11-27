import { Arme } from './Arme';
import {Entitee} from './Entitee';
import { Hostile } from './Hostile';
import {Objet} from './Objet';
import { Salle } from './Salle';

class Joueur extends Hostile {
    public arme:Arme|null = null;
    public or:number = 0;
    public sac:Objet[] = [];

    constructor(public nom:string, public vie:number,  public salleId:number){
        super(nom, vie, 5);
    }

    deplacer(direction:number) {
        Salle.donjon[this.salleId].listeEntitee = this.remove(Salle.donjon[this.salleId].listeEntitee, this);
        if(Salle.donjon[direction]!= null)
            switch (direction){
                case Salle.donjon[this.salleId].idNord:
                    this.salleId = direction;
                break;
                case Salle.donjon[this.salleId].idEst:
                    this.salleId = direction;
                break;
                case Salle.donjon[this.salleId].idSud:
                    this.salleId = direction;
                break;
                case Salle.donjon[this.salleId].idOuest:
                    this.salleId = direction;
                break;
                case Salle.donjon[this.salleId].idHaut:
                    this.salleId = direction;
                break;
                case Salle.donjon[this.salleId].idBas:
                    this.salleId = direction;
                break;
                default:
                    console.log("Salle inaccéssible");
            }
        Salle.donjon[this.salleId].listeEntitee.push(this);      
    }

    observerEntitee(idx:number):Entitee {
        return Salle.donjon[this.salleId].listeEntitee[idx];
    }
    
    observerObjet(idx:number):Objet {
        return Salle.donjon[this.salleId].listeObjet[idx];
    }

    prendre(idx:number):void {
        let objet = Salle.donjon[this.salleId].listeObjet.splice(idx,idx+1);
        if( objet != null){
            this.sac.push(objet[0]);
        }else{
            console.log("Cet objet n'existe pas");
        }
    }
}
export {Joueur};