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