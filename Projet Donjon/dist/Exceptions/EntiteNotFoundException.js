"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntiteNotFoundException = void 0;
class EntiteNotFoundException extends Error {
    constructor() {
        super("L'entité n'existe pas.");
    }
}
exports.EntiteNotFoundException = EntiteNotFoundException;
