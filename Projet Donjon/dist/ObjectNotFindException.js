"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectNotFindException = void 0;
class ObjectNotFindException extends Error {
    constructor() {
        super("L'objet n'existe pas.");
    }
}
exports.ObjectNotFindException = ObjectNotFindException;
