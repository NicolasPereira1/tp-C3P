class ObjectNotFoundException extends Error {
    
    constructor(){
        super("L'objet n'existe pas.");
    }
}

export {ObjectNotFoundException}