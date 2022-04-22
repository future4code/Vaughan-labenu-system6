import express from 'express'
import cors from 'cors'
import {AddressInfo} from 'net'
import { changeModule, changeStudentOfClass, changeTeacherOfClass, createClass, createStudent, createTeacher, searchAllTeacher, searchClassActive, searchStudent } from '../Functions/Functions';


const app = express();
app.use(express.json());
app.use(cors());

//criar Turma
app.post('/createClass', createClass);

//criar Docente
app.post('/createTeacher', createTeacher);

//Criar  Estudante
app.post('/createStudent', createStudent);

//Buscar turmas ativas
app.get('/searchClassActive', searchClassActive);

//mudar turma de modulo
app.put('/changeModule', changeModule);

//buscar estudante pelo nome
app.get('/searchStudent', searchStudent);

//mudar estudante de turma
app.put('/changeStudentOfClass', changeStudentOfClass);

//Buscar todas as pessoas docentes
app.get('/searchAllTeacher', searchAllTeacher);

//mudar docente de turma
app.put('/changeTeacherOfClass', changeTeacherOfClass);


const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});

