import { Joueur } from '../Donjon/Joueur';
import { Objet } from './Objet';

class PotionDeVie extends Objet {
     
    constructor(public nom:string, public prix:number, public effect:number, public description:string){
        super(nom, prix, description);
    }

    public utilise (joueur:Joueur):void {
        joueur.totalVie = joueur.totalVie + this.effect;
    }

    vue():object{
        return {"nom":this.nom, "description":this.description, "effet":this.effect, "prix":this.prix};
    }

}
export {PotionDeVie};
