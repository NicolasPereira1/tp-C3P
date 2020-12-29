import { Arme } from "../Items/Arme";
import { Entite } from "./Entite";
import { EntiteNotFoundException } from "../Exceptions/EntiteNotFoundException";
import { ObjectNotFoundException } from "../Exceptions/ObjectNotFoundException";
import { Objet } from "../Items/Objet";
import { Salle } from "./Salle";

class Hostile extends Entite {
    public critique = 0.05;
    public arme:Arme|null = null;
    public sac:Objet[] = [];

    constructor(public nom:string, public totalVie:number, public force:number, public guid:number, public salle:Salle){
        super(nom,totalVie, guid, salle);
    }

    attaquer(attaque:number):object{
        let cible = Entite.entites.get(attaque);
        if(cible == undefined)
            throw new EntiteNotFoundException();

        if (cible.salle == this.salle){
            console.log(this.nom + " attaque : " + cible.nom);
            cible.totalVie = cible.totalVie-this.force;
            if(Math.random()<this.critique){
                console.log(this.nom + " donne un coup critique !");
                cible.totalVie = cible.totalVie-this.force*0.3;
            }
            if(cible.totalVie<=0){
                cible.salle = Salle.donjon[-2];
                console.log(cible.nom + " a succombé !");
            }else if(cible instanceof Hostile){
                this.totalVie = this.totalVie - (cible as Hostile).force;
                if(this.totalVie<=0){
                    this.salle = Salle.donjon[-2];
                    console.log(this.nom + " a succombé !");
                }
            }
        } else {
            throw new EntiteNotFoundException();
        }
        
        let force = 0;
        if(cible instanceof Hostile)
            force = cible.force;

        return {  "attaquant":{"guid":this.guid, "degat":this.force, "vie":this.totalVie},
                  "attaque":  {"guid":cible.guid, "degat":force, "vie":cible.totalVie}};
    }
    
    utiliser(idx:number):void {
        let objet = this.sac.splice(idx,idx+1);
        if(objet.length == 0)
            throw new ObjectNotFoundException();
        objet[0].utilise(this);
    }

    deEquiper():void{
        if(this.arme == undefined)
            throw new ObjectNotFoundException();
        this.arme.deEquipe(this);
    }

    vue():object{
        return {"nom":this.nom,"guid":this.guid, "totalvie":this.totalVie, "arme":this.arme, "force":this.force, "critique":this.critique, "sac":this.sac};
    }
}
export {Hostile};