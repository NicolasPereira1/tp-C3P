import { Joueur } from './Joueur';
import { Objet } from './Objet';

class PotionDeVie extends Objet {
    
    constructor(public nom:string, public prix:number, public effect:number){
        super(nom, prix);
    }
    public utilise (joueur:Joueur):void {
        joueur.totalVie = joueur.totalVie + this.effect;
    }

}
export {PotionDeVie};
