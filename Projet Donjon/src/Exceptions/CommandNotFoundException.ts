class CommandNotFoundException extends Error {
    
    constructor(){
        super("Cette commande n'existe pas pour cette entité.");
    }
}

export {CommandNotFoundException}