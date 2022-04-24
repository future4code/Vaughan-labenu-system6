import { Request, Response } from "express";
import { arrEspec, Docente } from "../Class/Docente";
import { Estudante } from "../Class/Estudante";
import { Hobby } from "../Class/Hobby";
import { Turma } from "../Class/Turma";
import connection from "../connection";
import { v4 as uuidv4} from 'uuid'
import { Especialidade } from "../Class/Especialidade";


export const createClass = async(req: Request, res: Response): Promise<void> => {
       
    const {nome, modulo} = req.body;

     try { 

        if(Number(modulo) > 6){
          throw new Error('o Modulo deve ser de 1 a 6');
        }
     
        let newClass: Turma = new Turma(nome, modulo);

        await connection('TURMA').insert(newClass);

        res.status(201).send('Turma Criada com sucesso !');

     }catch(err){

        res.status(500).send(err.sqlMessage || err.message);

     }
}

export const createTeacher = async(req: Request, res: Response): Promise<void> => {
       
    const {nome, email, data_nasc, turma_id, specialty} = req.body;

     try { 

      let confirm = [];
      
      //verifica se a especialidade contempla o padrão
      for(let a in specialty){

        confirm.push(arrEspec.filter((e)=>{
            return e.name == specialty[a]
         })
         [0]
        )
      }

      if(!nome || !email || !data_nasc || !turma_id || !specialty){
         throw new Error('Preencha todos os campos obrigatórios !')
      }


      if(typeof specialty != 'object'){
         throw new Error('a Especialidade deve ser um array de strings [""]');
      }

      if(!confirm.length){
        throw new Error('a Especialidade deve ser do Tipo JS , CSS, REACT, POO ou TYPESCRIPT');
      }


        let formattedDate: string = data_nasc.split('/').reverse().join('-');
     
        let newTeacher: Docente = new Docente(nome, email, formattedDate, turma_id);

        await connection('DOCENTE').insert(newTeacher);

        for(let i=0; i < specialty.length; i++){
         //cria uma nova especialidade
         let newSpecialty = new Especialidade();
         //adiciona o a especialidade a classe
         newSpecialty.setEspecialidade(confirm[i].desc);
         //insere a especialidade na tabela ESPECIALIDADE
         await connection('ESPECIALIDADE').insert(newSpecialty);
         //adiciona a especialidade e o devido docente em outra tabela
         await connection('DOCENTE_ESPECIALIDADE').insert({
            id: uuidv4(),
            docente_id: newTeacher.getID(),
            especialidade_id: newSpecialty.getID()
           });
      }    

        res.status(201).send('Docente Criado com sucesso !');

     }catch(err){

        res.status(500).send(err.sqlMessage || err.message);
        
     }
}

const validateDate = (date: any): boolean => {
   let regex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;

   return regex.test(date);
}

export const createStudent = async(req: Request, res: Response): Promise<void> => {
       
   const {nome, email, data_nasc, turma_id, hobby} = req.body;

    try {
       
       if(!nome || !email || !data_nasc || !turma_id || !hobby){
          throw new Error('Verifique se os campos estão sendo passados corretamente !')
       }
       
       //valida a data
       if(!validateDate(data_nasc)){
          throw new Error('a Data deve ser no formato DD/MM/AAAA')
       }
        
       //formata a data para entrar no banco
       let formattedDate: string = data_nasc.split('/').reverse().join('-');
    
       //cria uma instancia de estudante
       let newStudent = new Estudante(nome, email, formattedDate, turma_id);      


       //insere o estudante no banco 
       await connection('ESTUDANTE').insert(newStudent);

       for(let i=0; i < hobby.length; i++){
          //cria um novo hobby
          let newHobby = new Hobby();
          //adiciona o hobby a classe
          newHobby.setHobby(hobby[i]);
          //insere o hobby na tabela hobby
          await connection('HOBBY').insert(newHobby);
          //adiciona o hobby e o devido estudante em outra tabela
          await connection('ESTUDANTE_HOBBY').insert({
             id: uuidv4(),
             estudante_id: newStudent.getID(),
             hobby_id: newHobby.getID()
            });
       }    

       res.status(201).send('Estudante Criado Com sucesso !');

    }catch(err){

       res.status(500).send(err.sqlMessage || err.message);
       
    }
}

export const searchClassActive = async(req: Request, res: Response): Promise<void> => {

    try { 

      let result: {}[] = await connection('TURMA')
       .select("*")
       .where('modulo', '!=', '0');

       res.status(200).send(result);

    }catch(err){

       res.status(500).send(err.sqlMessage || err.message);
       
    }
}

export const changeModule = async(req: Request, res: Response): Promise<void> => {

   const { id, newModule } = req.body;

   try { 

     await connection('TURMA')
     .where({ id: id })
     .update({ modulo: newModule });

      res.status(200).send('Modulo alterado com sucesso !');

   }catch(err){

      res.status(500).send(err.sqlMessage || err.message);
      
   }
}

export const searchStudent = async(req: Request, res: Response): Promise<void> => {

   const name = req.query.name;

   try { 

     let result = await connection('ESTUDANTE')
     .select("*")
     .whereILike('nome', `%${name}%`);

      res.status(200).send(result);

   }catch(err){

      res.status(500).send(err.sqlMessage || err.message);
      
   }
}

export const changeStudentOfClass = async(req: Request, res: Response): Promise<void> => {

   const { id, newClass } = req.body;

   try { 

     await connection('ESTUDANTE')
     .where({ id: id})
     .update({turma_id: newClass})

      res.status(200).send('Turma alterada com sucesso !');

   }catch(err){

      res.status(500).send(err.sqlMessage || err.message);
      
   }
}

export const searchAllTeacher = async(req: Request, res: Response): Promise<void> => {

   try { 

     let result = await connection('DOCENTE');

      res.status(200).send(result);

   }catch(err){

      res.status(500).send(err.sqlMessage || err.message);
      
   }
}

export const changeTeacherOfClass = async(req: Request, res: Response): Promise<void> => {

   const { id, newClass } = req.body;

   try { 

     await connection('DOCENTE')
     .where({ id: id})
     .update({turma_id: newClass})

      res.status(200).send('Turma alterada com sucesso !');

   }catch(err){

      res.status(500).send(err.sqlMessage || err.message);
      
   }
}

export const getYearOfId = async(req: Request, res: Response): Promise<void> => {

   const { id } = req.params;

   try { 

     let result = await connection('ESTUDANTE')
     .where({ id: id});

     if(!result.length){
        throw new Error('Estudante não encontrado !')
     }


     let yearStudent = new Date(result[0].data_nasc).getFullYear();
     let monthStudent = new Date(result[0].data_nasc).getMonth()+1;
     let yearActually = new Date(Date.now()).getFullYear();
     let monthActually = new Date(Date.now()).getMonth()+1;
     let age = yearActually - yearStudent

     if(monthActually < monthStudent){
        age -= 1;
     }
     
      res.status(200).send(`o Estudante ${result[0].nome}, Tem ${age} Anos !`);

   }catch(err){

      res.status(500).send(err.sqlMessage || err.message);
      
   }
}