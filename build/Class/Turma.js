"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turma = void 0;
const uuid_1 = require("uuid");
class Turma {
    constructor(nome, modulo) {
        this.id = (0, uuid_1.v4)();
        this.nome = nome;
        this.modulo = modulo;
    }
}
exports.Turma = Turma;
//# sourceMappingURL=Turma.js.map