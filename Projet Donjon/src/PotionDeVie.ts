import {Objet} from './Objet';
import {Consomable} from './Consomable';
import { Joueur } from './Joueur';

class PotionDeVie extends Objet implements Consomable {
    
    constructor(public prix:number, public effect:number){
        super("Potion de vie", prix);
    }

    consommer(joueur: Joueur): void {
        joueur.vie = joueur.vie + this.effect;   
    }
}
export {PotionDeVie};
