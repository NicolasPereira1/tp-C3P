import { EntiteNotFoundException } from "../Exceptions/EntiteNotFoundException";
import { Salle } from "./Salle";

abstract class Entite {
    static entites:Map<number,Entite> = new Map<number,Entite>();
    private static idNextEntite = 0;
    public guid:number;
    
    constructor(public nom:string, public totalVie:number, public salle:Salle){
        this.guid = Entite.idNextEntite;
    }
    
    static ajouterEntite(entite:Entite):number{
        Entite.entites.set(Entite.idNextEntite, entite);
        return Entite.idNextEntite++;
    }

    static getEntite(idx:number):Entite{
        let entite = Entite.entites.get(idx);
        if(entite == undefined)
            throw new EntiteNotFoundException();
        return entite;
    }

    abstract vue():object;
}

export {Entite}