import { Arme } from "./Arme";
import { Entite } from "./Entite";
import { Objet } from "./Objet";
import { Salle } from "./Salle";

class Hostile extends Entite {
    public critique = 0.05;
    public arme:Arme|null = null;
    public sac:Objet[] = [];

    constructor(public nom:string, public totalVie:number, public force:number, public guid:number, public salle:Salle){
        super(nom,totalVie, guid, salle);
    }
    
    combattre(attaque:number):void {
        this.attaquer(attaque);
        if(Entite.entites[attaque] instanceof Hostile && Entite.entites[attaque].totalVie>0)
            (Entite.entites[attaque] as Hostile).combattre(this.guid);
    }

    attaquer(attaque:number):void{
        let cible = Entite.entites[attaque];
        if (cible.salle == this.salle){
            console.log(this.nom + " attaque : " + cible.nom);
            cible.totalVie = cible.totalVie-this.force;
            if(Math.random()<this.critique){
                console.log(this.nom + " donne un coup critique !");
                cible.totalVie = cible.totalVie-this.force*0.3;
            }
            if(cible.totalVie<=0){
                this.salle.entites = this.remove(this.salle.entites, attaque);
                console.log(cible.nom + " a succombé !");
            }
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