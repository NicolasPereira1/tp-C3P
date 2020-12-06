import { Salle } from "./Salle";

abstract class Entite {
    public static entites:Entite[] = [];
    constructor(public nom:string, public totalVie:number, public guid:number, public salle:Salle){}
    
    static ajouterEntite(entite:Entite){
        this.entites.push(entite);
        entite.salle.entites.push(entite.guid);
    }

    remove (entites:number[], id:number):number[]{
        let nouvelleListe:number[] = [];
        for(let i=0; i<entites.length; i++){
            if(entites[i] != id)
                nouvelleListe.push(entites[i]);
        }
        return nouvelleListe;
    }
}

export {Entite}