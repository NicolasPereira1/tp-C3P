class EntiteNotFoundException extends Error {
    
    constructor(){
        super("L'entité n'existe pas.");
    }
}

export {EntiteNotFoundException}