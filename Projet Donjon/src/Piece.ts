import {Entitee} from './Entitee';
import {Objet} from './Objet';

class Salle {
    
    constructor(public salleNord:Salle, public salleEst:Salle, public salleSud:Salle, public salleOuest:Salle){}
}
export {Salle};