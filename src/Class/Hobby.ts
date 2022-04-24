import { v4 as uuidv4} from 'uuid'

export class Hobby {

    id: string
    nome: string;

    constructor(){
        this.id = uuidv4();
    }

    public setHobby(hobby: string){
       this.nome = hobby;
    }

    public getID(){
       return this.id;
    }
}