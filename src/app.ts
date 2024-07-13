import cors from 'cors';
import express, {Application, Request, Response} from 'express';
import { ProductRoutes } from './app/modules/product/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);


export default app;