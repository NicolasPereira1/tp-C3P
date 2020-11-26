import {Entitee} from './Entitee';
import {Objet} from './Objet';

class Salle {
    public listeEntitee:Entitee[] = [];
    public listeObjet:Objet[] = [];
    
    constructor(public nomSalle:string, public salleNord:Salle|null, public salleEst:Salle|null, public salleSud:Salle|null, public salleOuest:Salle|null){}
}
export {Salle};