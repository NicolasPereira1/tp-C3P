class NoAccessException extends Error {
    
    constructor(){
        super("Vous n'avez pas accès à cette salle depuis votre position.");
    }
}

export {NoAccessException}