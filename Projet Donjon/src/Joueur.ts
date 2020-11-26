import { Interface } from 'readline';
import {Consomable} from './Consomable';
import {Entitee} from './Entitee';
import {Objet} from './Objet';
import { Salle } from './Salle';
import { PotionDeVie } from './PotionDeVie';

class Joueur extends Entitee {
    public force:number = 5;
    public or:number = 0;
    public sac:Objet[] = [];

    constructor(public nom:string, public vie:number,  public currentSalle:Salle|null){
        super(nom, vie);
    }

    attaque(degat:number):void {
        this.vie = this.vie-degat;
    }

    prendre(objet:Objet):void {
        this.sac.push(objet);
    }
    
    consomme(indice:number):void {
        
    }
}
export {Joueur};


let p:Objet = new PotionDeVie(10, 20);
console.log(p instanceof PotionDeVie);
