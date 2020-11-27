abstract class Entitee {
    constructor(public nom:string, public vie:number){}
    
    remove (listeEntitee:Entitee[], entitee:Entitee):Entitee[]{
        let nouvelleListe:Entitee[] = [];
        for(let i=0; i<listeEntitee.length; i++){
            if(listeEntitee[i] != entitee)
                nouvelleListe.push(listeEntitee[i]);
        }
        return nouvelleListe;
    }
}

export {Entitee}