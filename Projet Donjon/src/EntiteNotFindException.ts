class EntiteNotFindException extends Error {
    
    constructor(){
        super("L'entité n'existe pas.");
    }
}

export {EntiteNotFindException}