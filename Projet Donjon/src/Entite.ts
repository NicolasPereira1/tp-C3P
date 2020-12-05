abstract class Entite {
    constructor(public nom:string, public vie:number, public salleId:number){}
    
    remove (listeEntitee:Entite[], entitee:Entite):Entite[]{
        let nouvelleListe:Entite[] = [];
        for(let i=0; i<listeEntitee.length; i++){
            if(listeEntitee[i] != entitee)
                nouvelleListe.push(listeEntitee[i]);
        }
        return nouvelleListe;
    }
}

export {Entite}