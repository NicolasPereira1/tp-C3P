import { Joueur } from '../Donjon/Joueur';
import { Objet } from './Objet';

class PotionCritique extends Objet {
    
    constructor(public nom:string, public prix:number, public effect:number, public description:string){
        super(nom, prix, description);
    }

    public utilise (joueur:Joueur):void {
        joueur.critique = joueur.critique + this.effect;
    }

    vue():object{
        return {"nom":this.nom, "description":this.description, "effet":this.effect, "prix":this.prix};
    }
}
export {PotionCritique};
