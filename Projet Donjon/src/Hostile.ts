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
    
    attaquer(degat:number):void {
        this.vie = this.vie-degat;
        if(Math.random()<this.critique){
            console.log("Coup critique !");
            this.vie = this.vie-degat*0.3;
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