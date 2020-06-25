import { Router } from 'express';
import ClientController from './app/controllers/ClientController';
import ProductController from './app/controllers/ProductController';

const routes = new Router();


routes.get('/clients', ClientController.index);

routes.get('/clients/:id', ClientController.get);

routes.post('/clients', ClientController.store);

routes.put('/clients/:id', ClientController.update);

routes.delete('/clients/:id', ClientController.delete);

routes.get('/products', ProductController.index);

routes.get('/products/:id', ProductController.get);

routes.post('/products', ProductController.store);

routes.put('/products/:id', ProductController.update);

routes.delete('/products/:id', ProductController.delete);

export default routes;