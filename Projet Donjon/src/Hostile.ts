import { Arme } from "./Arme";
import { Entitee } from "./Entitee";
import { Objet } from "./Objet";

class Hostile extends Entitee {
    public critique = 0.05;
    public arme:Arme|null = null;
    public sac:Objet[] = [];

    constructor(public nom:string, public vie:number, public force:number){
        super(nom,vie);
    }
    
    combattre(hostile:Hostile):void {
        this.attaquer(hostile);
        if(hostile.vie>0)
            hostile.combattre(this);
    }

    attaquer(entitee:Entitee):void{
        console.log(this.nom + " attaque : " + entitee.nom);
        entitee.vie = entitee.vie-this.force;
        if(Math.random()<this.critique){
            console.log(this.nom + " donne un coup critique !");
            entitee.vie = entitee.vie-this.force*0.3;
        }
        if(entitee.vie<=0)
            console.log(entitee.nom + " a succombé !");
    }
    
    utiliser(idx:number):void {
        let objet = this.sac.splice(idx,idx+1);
        if(objet != null)
            objet[0].utilise(this);
    }

    deEquiper():void{
        if(this.arme != null)
            this.arme.deEquipe(this);
    }
}
export {Hostile};