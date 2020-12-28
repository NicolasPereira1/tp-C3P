"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONFieldException = void 0;
class JSONFieldException extends Error {
    constructor() {
        super("JSON non valide, un champ est peut être manquant ou mal formé.");
    }
}
exports.JSONFieldException = JSONFieldException;
