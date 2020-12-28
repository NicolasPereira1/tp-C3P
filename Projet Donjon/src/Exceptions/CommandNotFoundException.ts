class CommandNotFoundException extends Error {
    
    constructor(){
        super("Cette commande n'existe pas.");
    }
}

export {CommandNotFoundException}