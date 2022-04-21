"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClass = void 0;
const Turma_1 = require("../Class/Turma");
const connection_1 = __importDefault(require("../connection"));
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, modulo } = req.body;
    try {
        let novaTurma = new Turma_1.Turma(nome, modulo);
        yield (0, connection_1.default)('TURMA').insert(novaTurma);
        res.status(201).send('Turma Criada com sucesso !');
    }
    catch (err) {
        res.status(500).send(err.sqlMessage || err.message);
    }
});
exports.createClass = createClass;
//# sourceMappingURL=Functions.js.map