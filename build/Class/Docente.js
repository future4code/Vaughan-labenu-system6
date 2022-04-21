"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docente = exports.Especialidades = void 0;
const Usuario_1 = require("./Usuario");
const uuid_1 = require("uuid");
var Especialidades;
(function (Especialidades) {
    Especialidades["JS"] = "JS";
    Especialidades["CSS"] = "CSS";
    Especialidades["REACT"] = "REACT";
    Especialidades["TYPESCRIPT"] = "TYPESCRIPT";
    Especialidades["POO"] = "Programa\u00E7\u00E3o Orientada a Objetos";
})(Especialidades = exports.Especialidades || (exports.Especialidades = {}));
class Docente extends Usuario_1.Usuario {
    constructor(nome, email, data_nasc, turma_id) {
        super();
        this.id = (0, uuid_1.v4)();
        this.nome = nome;
        this.email = email;
        this.data_nasc = data_nasc;
        this.turma_id = turma_id;
    }
}
exports.Docente = Docente;
//# sourceMappingURL=Docente.js.map