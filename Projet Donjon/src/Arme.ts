import {Objet} from './Objet';
import {Joueur} from './Joueur';

class Arme extends Objet {
    private dejaUtilise:boolean = false;

    constructor(public nom:string, public prix:number, public degat:number){
        super(nom, prix);
    }

    public utilise (joueur:Joueur):void{
        if (this.dejaUtilise)
            this.deEquipe(joueur);
        else
            this.equipe(joueur);
    }

    public equipe (joueur:Joueur):void{
        if(joueur.arme != null)
            joueur.sac.push(joueur.arme);
        joueur.arme = this;
        joueur.force = joueur.force + this.degat;
    }
    
    public deEquipe (joueur:Joueur):void{
        joueur.arme = null;
        joueur.sac.push(this);
        joueur.force = joueur.force - this.degat;
    }
}

export {Arme};