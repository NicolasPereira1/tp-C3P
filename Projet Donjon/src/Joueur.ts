import { on } from 'process';
import { Arme } from './Arme';
import {Entitee} from './Entitee';
import {Objet} from './Objet';
import { Salle } from './Salle';

class Joueur extends Entitee {
    public arme:Arme|null = null;
    public force:number = 5;
    public or:number = 0;
    public sac:Objet[] = [];

    constructor(public nom:string, public vie:number,  public salleCourante:Salle){
        super(nom, vie);
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
                default:
                    console.log("Salle inaccéssible");
            }        
    }

    observerEntitee(idx:number):Entitee {
        return this.salleCourante.listeEntitee[idx-1];
    }
    
    observerObjet(idx:number):Objet {
        return this.salleCourante.listeObjet[idx-1];
    }

    attaquer(degat:number):void {
        this.vie = this.vie-degat;
    }

    prendre(idx:number):void {
        let objet = this.salleCourante.listeObjet.splice(idx,idx+1);
        if( objet != null){
            this.sac.push(objet[0]);
        }
    }
    
    utiliser(idx:number):void {
        let objet = this.sac.splice(idx,idx+1);
        if(objet != null)
            objet[0].utilise(this);
    }

    deEquiper():void{
        if(this.arme != null)
            this.arme.deEquipe();
    }
}
export {Joueur};