import express from "express";
import cors from "cors";
import {connectDB} from './config/db.js';
import UserRouter from './Router/UserRouter.js';
import ItemsRouter from "./Router/ItemsRouter.js";
import regrouter from "./Router/RegistrationRouter.js";
import path from 'path'; 

const app = express();
const port = 4000;

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


connectDB();

app.get('/', (req, res) => {
    res.send('Server is running...')
})

app.listen(port, ()=>{
    console.log(`listening on port : ${port}`)
});

app.use('/api/users', UserRouter);
app.use('/item', ItemsRouter);
app.use('/api', regrouter);