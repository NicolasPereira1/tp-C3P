import { Joueur } from './Joueur';
import { Objet } from './Objet';

class PotionCritique extends Objet {
    
    constructor(public nom:string, public prix:number, public effect:number){
        super(nom, prix);
    }

    public utilise (joueur:Joueur):void {
        joueur.force = joueur.force + this.effect;
    }
}
export {PotionCritique};
