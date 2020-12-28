"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectNotFoundException = void 0;
class ObjectNotFoundException extends Error {
    constructor() {
        super("L'objet n'existe pas.");
    }
}
exports.ObjectNotFoundException = ObjectNotFoundException;
