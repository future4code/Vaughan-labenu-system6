import { v4 as uuidv4 } from "uuid";


export class Turma {
    id: string;
    nome: string;
    docentes: [];
    estudantes: [];
    modulo: string

    constructor(nome: string, modulo: string){
        this.id = uuidv4();
        this.nome = nome;
        this.modulo = modulo;
    } 

}