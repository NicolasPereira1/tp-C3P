"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAccessException = void 0;
class NoAccessException extends Error {
    constructor() {
        super("Vous n'avez pas accès à cette salle depuis votre position.");
    }
}
exports.NoAccessException = NoAccessException;
