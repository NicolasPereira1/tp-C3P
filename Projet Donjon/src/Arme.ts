import {Objet} from './Objet';
import { Hostile } from './Hostile';

class Arme extends Objet {

    constructor(public nom:string, public prix:number, public degat:number){
        super(nom, prix);
    }

    public utilise (hostile: Hostile):void{
        if (hostile.arme != null)
            hostile.deEquiper();
        this.equipe(hostile);
    }

    public equipe (hostile: Hostile):void{
        if(hostile.arme != null)
            hostile.sac.push(hostile.arme);
        hostile.arme = this;
        hostile.force = hostile.force + this.degat;
    }
    
    public deEquipe (hostile: Hostile):void{
        hostile.arme = null;
        hostile.sac.push(this);
        hostile.force = hostile.force - this.degat;
    }
}

export {Arme};