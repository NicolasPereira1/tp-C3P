import { Hostile } from '../Donjon/Hostile';
import {Joueur} from '../Donjon/Joueur';

abstract class Objet{
    constructor(public nom:string, public prix:number, public description:string){}
    
    vendre(joueur: Joueur): void {
        joueur.or = joueur.or + this.prix;
    }

    abstract utilise (hostile: Hostile):void;
   
    abstract vue():object;
}
export {Objet};