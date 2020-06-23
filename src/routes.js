import { Router } from 'express';
import ClientController from './app/controllers/ClientController';

const routes = new Router();


routes.get('/clients', ClientController.index);

routes.post('/clients', ClientController.store);

routes.put('/clients/:id', ClientController.update);

routes.delete('/clients/:id', ClientController.delete);


export default routes;