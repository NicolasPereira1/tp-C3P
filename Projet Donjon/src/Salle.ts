import {Entitee} from './Entitee';
import {Objet} from './Objet';

class Salle {
    public static donjon:Salle[] = [];
    public listeEntitee:Entitee[] = [];
    public listeObjet:Objet[] = [];

    constructor(public nomSalle:string, public idNord:number|null, public idEst:number|null, public idSud:number|null, public idOuest:number|null,public idHaut:number|null,public idBas:number|null){}
}
export {Salle};