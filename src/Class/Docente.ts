import { Usuario } from "./Usuario";
import { v4 as uuidv4 } from 'uuid'


export enum Especialidades {
   JS = 'JS',
   CSS = 'CSS',
   REACT = 'REACT',
   TYPESCRIPT = 'TYPESCRIPT',
   POO = 'Programação Orientada a Objetos',
}

export const arrEspec = [{
    name: "JS",
    desc: "Javascript"
},
{
    name: "CSS",
    desc: "CSS"
},
{
    name: "REACT",
    desc: "REACT"
},
{
    name: "TYPESCRIPT",
    desc: "TYPESCRIPT"
},
{
    name: "POO",
    desc: "Programação Orientada a Objetos"
}]


export class Docente extends Usuario{
    id: string;
    nome: string;
    email: string;
    data_nasc: string;
    turma_id: string;
    especialidades: string

    constructor(nome: string, email: string, data_nasc: string, turma_id: string){
        super();
        this.id = uuidv4();
        this.nome = nome;
        this.email = email;
        this.data_nasc = data_nasc;
        this.turma_id = turma_id;
    }

    public setSpecialty(spec: string){
        this.especialidades = spec;
    }

    public getID(){
        return this.id;
    }
}