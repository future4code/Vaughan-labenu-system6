import { Usuario } from "./Usuario";
import { v4 as uuidv4 } from 'uuid'


export class Estudante extends Usuario{
    id: string;
    nome: string;
    email: string;
    data_nasc: string;
    turma_id: string;
    hobby: []

    constructor(nome: string, email: string, data_nasc: string, turma_id: string){
        super();
        this.id = uuidv4();
        this.nome = nome;
        this.email = email;
        this.data_nasc = data_nasc;
        this.turma_id = turma_id;
    }
}