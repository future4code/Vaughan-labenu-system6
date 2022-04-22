import { Request, Response } from "express";
import { Docente } from "../Class/Docente";
import { Estudante } from "../Class/Estudante";
import { Turma } from "../Class/Turma";
import connection from "../connection";


export const createClass = async(req: Request, res: Response) => {
       
    const {nome, modulo} = req.body;

     try { 
     
        let newClass = new Turma(nome, modulo);

        await connection('TURMA').insert(newClass);

        res.status(201).send('Turma Criada com sucesso !');

     }catch(err){

        res.status(500).send(err.sqlMessage || err.message);

     }
}

export const createTeacher = async(req: Request, res: Response) => {
       
    const {nome, email, data_nasc, turma_id} = req.body;

     try { 

        let formattedDate = data_nasc.split('/').reverse().join('-');
     
        let newTeacher = new Docente(nome, email, formattedDate, turma_id);

        await connection('DOCENTE').insert(newTeacher);

        res.status(201).send('Docente Criado com sucesso !');

     }catch(err){

        res.status(500).send(err.sqlMessage || err.message);
        
     }
}

export const createStudent = async(req: Request, res: Response) => {
       
   const {nome, email, data_nasc, turma_id} = req.body;

    try { 

       let formattedDate = data_nasc.split('/').reverse().join('-');
    
       let newStudent = new Estudante(nome, email, formattedDate, turma_id);

       await connection('ESTUDANTE').insert(newStudent);

       res.status(201).send('Estudante Criado com sucesso !');

    }catch(err){

       res.status(500).send(err.sqlMessage || err.message);
       
    }
}

export const searchClassActive = async(req: Request, res: Response) => {

    try { 

      let result = await connection('TURMA')
       .select("*")
       .where('modulo', '!=', '0');

       res.status(200).send(result);

    }catch(err){

       res.status(500).send(err.sqlMessage || err.message);
       
    }
}

export const changeModule = async(req: Request, res: Response) => {

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

export const searchStudent = async(req: Request, res: Response) => {

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

export const changeStudentOfClass = async(req: Request, res: Response) => {

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

export const searchAllTeacher = async(req: Request, res: Response) => {

   try { 

     let result = await connection('DOCENTE');

      res.status(200).send(result);

   }catch(err){

      res.status(500).send(err.sqlMessage || err.message);
      
   }
}

export const changeTeacherOfClass = async(req: Request, res: Response) => {

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