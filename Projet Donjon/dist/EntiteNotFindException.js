"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntiteNotFindException = void 0;
class EntiteNotFindException extends Error {
    constructor() {
        super("L'entité n'existe pas.");
    }
}
exports.EntiteNotFindException = EntiteNotFindException;
