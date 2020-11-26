import {Objet} from './Objet';
import {Joueur} from './Joueur';

abstract class Consomable extends Objet {
    constructor(public nom:string, public prix:number){
        super(nom, prix);
    }
    abstract consommer (joueur:Joueur):void;
}

export {Consomable};