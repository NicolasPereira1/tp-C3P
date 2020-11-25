import { Interface } from 'readline';
import {Consomable} from './Consomable';
import {Entitee} from './Entitee';
import {Objet} from './Objet';
import { PotionDeVie } from './PotionDeVie';

class Joueur extends Entitee {
    public sac:Objet[] = [];
    constructor(public nom:string, public vie:number, public or:number){
        super(nom, vie);
    }

    attaque(degat:number):void {
        this.vie = this.vie-degat;
    }

    prendre(objet:Objet):void {
        this.sac.push(objet);
    }
    
    consommer(indice:number):void {
        
    }
}
export {Joueur};


let p = new PotionDeVie(10, 20);
console.log(p instanceof PotionDeVie);
