import {Joueur} from './Joueur';

abstract class Objet{
    constructor(public nom:string, public prix:number){}
    
    vendre(joueur: Joueur): void {
        joueur.or = joueur.or + this.prix;
    }

    abstract utilise (joueur: Joueur):void;
}
export {Objet};