import { Arme } from './Arme';
import {Entitee} from './Entitee';
import { Hostile } from './Hostile';
import {Objet} from './Objet';
import { Salle } from './Salle';

class Joueur extends Hostile {
    public arme:Arme|null = null;
    public or:number = 0;
    public sac:Objet[] = [];

    constructor(public nom:string, public vie:number,  public salleCourante:Salle){
        super(nom, vie, 5);
    }

    deplacer(direction:number) {
        if(Salle.donjon[direction]!= null)
            switch (direction){
                case this.salleCourante.idNord:
                    this.salleCourante = Salle.donjon[direction];
                break;
                case this.salleCourante.idEst:
                    this.salleCourante = Salle.donjon[direction];
                break;
                case this.salleCourante.idSud:
                    this.salleCourante = Salle.donjon[direction];
                break;
                case this.salleCourante.idOuest:
                    this.salleCourante = Salle.donjon[direction];
                break;
                case this.salleCourante.idHaut:
                    this.salleCourante = Salle.donjon[direction];
                break;
                case this.salleCourante.idBas:
                    this.salleCourante = Salle.donjon[direction];
                break;
                default:
                    console.log("Salle inaccéssible");
            }        
    }

    observerEntitee(idx:number):Entitee {
        return this.salleCourante.listeEntitee[idx];
    }
    
    observerObjet(idx:number):Objet {
        return this.salleCourante.listeObjet[idx];
    }

    prendre(idx:number):void {
        let objet = this.salleCourante.listeObjet.splice(idx,idx+1);
        if( objet != null){
            this.sac.push(objet[0]);
        }else{
            console.log("Cet objet n'existe pas");
        }
    }
}
export {Joueur};