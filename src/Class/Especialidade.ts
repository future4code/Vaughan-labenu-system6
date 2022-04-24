import { v4 as uuidv4} from 'uuid'

export class Especialidade {

    id: string
    nome: string;

    constructor(){
        this.id = uuidv4();
    }

    public setEspecialidade(spec: string){
       this.nome = spec;
    }

    public getID(){
       return this.id;
    }
}