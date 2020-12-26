class ObjectNotFindException extends Error {
    
    constructor(){
        super("L'objet n'existe pas.");
    }
}

export {ObjectNotFindException}