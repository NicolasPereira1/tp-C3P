import { Salle } from './Salle';
import { Objet } from './Objet';
import { Entite } from './Entite';
import { Hostile } from './Hostile';
import { JSONFieldException } from './JSONFieldException';
import { EntiteNotFindException } from './EntiteNotFindException';

class Joueur extends Hostile {
    public or:number = 0;

    constructor(public nom:string, public totalVie:number, public guid:number, public salle:Salle){
        super(nom, totalVie, 5, guid, salle);
        salle.entites.push(guid);
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
        }
        if(next == undefined){
            throw new JSONFieldException();
        }else{
            this.salle.entites = this.remove(this.salle.entites, this.guid);
            this.salle = next;
            this.salle.entites.push(this.guid);
        }
    }

    observerEntite(idx:number):object{
        if (this.salle.entites.includes(idx))
            return Entite.entites[idx].vue();
        throw new EntiteNotFindException();
    }
    
    observerObjet(idx:number):object {
        if (this.salle.objets.length>idx)
            return this.salle.objets[idx].vue();
        return { "type": "MORT", "message": "Cet objet n'existe pas."};
    }

    prendre(idx:number):void {
        let objet = this.salle.objets.splice(idx,idx+1);
        if( objet != null){
            this.sac.push(objet[0]);
        }else{
            console.log("Cet objet n'existe pas");
        }
    }
    
    vue():object{
        return  Object.assign(super.vue(), {"or":this.or, "salle":this.salle});;
    }
}
export {Joueur};