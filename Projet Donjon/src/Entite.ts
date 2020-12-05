import { Salle } from "./Salle";

abstract class Entite {
    public static entites:Entite[] = [];
    constructor(public nom:string, public vie:number, public guid:number, public salleId:number){}
    
    static ajouterEntite(entite:Entite){
        this.entites.push(entite);
        Salle.donjon[entite.salleId].entites.push(entite.guid);
    }

    remove (entites:number[], idx:number):number[]{
        let nouvelleListe:number[] = [];
        for(let i=0; i<entites.length; i++){
            if(i != idx)
                nouvelleListe.push(entites[i]);
        }
        return nouvelleListe;
    }
}

export {Entite}