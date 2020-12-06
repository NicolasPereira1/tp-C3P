import { Arme } from "./Arme";
import { Entite } from "./Entite";
import { Objet } from "./Objet";
import { Salle } from "./Salle";

class Hostile extends Entite {
    public critique = 0.05;
    public arme:Arme|null = null;
    public sac:Objet[] = [];

    constructor(public nom:string, public vie:number, public force:number, public guid:number, public salleId:number){
        super(nom,vie, guid, salleId);
    }
    
    combattre(attaque:number):void {
        this.attaquer(attaque);
        if(Entite.entites[attaque] instanceof Hostile && Entite.entites[attaque].vie>0)
            (Entite.entites[attaque] as Hostile).combattre(this.guid);
    }

    attaquer(attaque:number):void{
        let cible = Entite.entites[attaque];
        if (cible.salleId = this.salleId)
            console.log(this.nom + " attaque : " + cible.nom);
            cible.vie = cible.vie-this.force;
            if(Math.random()<this.critique){
                console.log(this.nom + " donne un coup critique !");
                cible.vie = cible.vie-this.force*0.3;
            }
            if(cible.vie<=0){
                Salle.donjon[this.salleId].entites = this.remove(Salle.donjon[this.salleId].entites, attaque);
                console.log(cible.nom + " a succombé !");
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