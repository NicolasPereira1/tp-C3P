import {Joueur} from './Joueur';

class Objet{
    constructor(public nom:string, public prix:number){}
    
    vendre(joueur: Joueur): void {
        joueur.or = joueur.or + this.prix;
    }
}
export {Objet};