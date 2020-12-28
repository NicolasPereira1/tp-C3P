"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandNotFoundException = void 0;
class CommandNotFoundException extends Error {
    constructor() {
        super("Cette commande n'existe pas.");
    }
}
exports.CommandNotFoundException = CommandNotFoundException;
