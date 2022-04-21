import express from 'express'
import cors from 'cors'
import {AddressInfo} from 'net'
import { createClass, createStudent, createTeacher } from '../Functions/Functions';


const app = express();
app.use(express.json());
app.use(cors());


app.post('/createClass', createClass);

app.post('/createTeacher', createTeacher);

app.post('/createStudent', createStudent);


const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});

