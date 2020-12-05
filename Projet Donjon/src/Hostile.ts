import { Arme } from "./Arme";
import { Entite } from "./Entite";
import { Objet } from "./Objet";
import { Salle } from "./Salle";

class Hostile extends Entite {
    public critique = 0.05;
    public arme:Arme|null = null;
    public sac:Objet[] = [];

    constructor(public nom:string, public vie:number, public force:number, public salleId:number){
        super(nom,vie, salleId);
    }
    
    combattre(entitee:Entite):void {
        this.attaquer(entitee);
        if(entitee instanceof Hostile && entitee.vie>0)
            entitee.combattre(this);
    }

    private attaquer(entitee:Entite):void{
        console.log(this.nom + " attaque : " + entitee.nom);
        entitee.vie = entitee.vie-this.force;
        if(Math.random()<this.critique){
            console.log(this.nom + " donne un coup critique !");
            entitee.vie = entitee.vie-this.force*0.3;
        }
        if(entitee.vie<=0){
            Salle.donjon[this.salleId].entites = entitee.remove(Salle.donjon[this.salleId].entites, entitee);
            console.log(entitee.nom + " a succombé !");
        }
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