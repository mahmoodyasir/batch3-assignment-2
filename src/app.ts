import cors from 'cors';
import express, {Application, Request, Response} from 'express';

const app: Application = express();

app.use(express.json());
app.use(cors());


export default app;