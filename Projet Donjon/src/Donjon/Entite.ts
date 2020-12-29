import { Salle } from "./Salle";

abstract class Entite {
    public static entites:Map<number,Entite> = new Map<number,Entite>();
    constructor(public nom:string, public totalVie:number, public guid:number, public salle:Salle){}

    remove (entites:number[], id:number):number[]{
        let nouvelleListe:number[] = [];
        for(let i=0; i<entites.length; i++){
            if(entites[i] != id)
                nouvelleListe.push(entites[i]);
        }
        return nouvelleListe;
    }

    abstract vue():object;
}

export {Entite}