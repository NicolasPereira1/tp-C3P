import {Entite} from './Entite';
import {Objet} from './Objet';

class Salle {
    public static donjon:Salle[] = [];
    public entites:number[] = [];
    public objets:Objet[] = [];

    constructor(public nomSalle:string, public passages:string[], public passagesId:number[], public description:string){}
}
export {Salle};