class JSONFieldException extends Error {
    
    constructor(){
        super("JSON non valide, un champ est peut être manquant ou mal formé.");
    }
}

export {JSONFieldException}