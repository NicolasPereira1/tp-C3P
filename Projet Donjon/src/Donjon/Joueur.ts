import { Salle } from './Salle';
import { Entite } from './Entite';
import { Hostile } from './Hostile';
import { NoAccessException } from '../Exceptions/NoAccessException';
import { JSONFieldException } from '../Exceptions/JSONFieldException';
import { EntiteNotFoundException } from '../Exceptions/EntiteNotFoundException';
import { ObjectNotFoundException } from '../Exceptions/ObjectNotFoundException';


class Joueur extends Hostile {
    public or:number = 0;

    constructor(public nom:string, public totalVie:number, public guid:number, public salle:Salle){
        super(nom, totalVie, 5, guid, salle);
        Entite.entites.set(guid, this);
    }

    deplacer(direction:string) {
        let next = undefined;
        switch (direction){
            case "N":
                next = this.salle.passages.get(direction);
            break;
            case "E":
                next = this.salle.passages.get(direction);
            break;
            case "S":
                next = this.salle.passages.get(direction);
            break;
            case "O":
                next = this.salle.passages.get(direction);
            break;
            case "H":
                next = this.salle.passages.get(direction);
            break;
            case "B":
                next = this.salle.passages.get(direction);
            break;
            default:
                throw new JSONFieldException();
        }
        if(next == undefined){
            throw new NoAccessException();
        }else{
            this.salle = next;
        }
    }

    observerEntite(idx:number):object{
        // if (this.salle.entites.includes(idx))
        //     return Entite.entites[idx].vue();
        throw new EntiteNotFoundException();
    }
    
    observerObjet(idx:number):object {
        if (this.salle.objets.length>idx)
            return this.salle.objets[idx].vue();
        throw new ObjectNotFoundException();
    }

    prendre(idx:number):void {
        let objet = this.salle.objets.splice(idx,idx+1);
        if( objet.length == 0)
            throw new ObjectNotFoundException();
        this.sac.push(objet[0]);
    }
    
    vue():object{
        return  Object.assign(super.vue(), {"or":this.or, "salle":this.salle});;
    }
}
export {Joueur};