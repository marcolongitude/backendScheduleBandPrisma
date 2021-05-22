import { Request, Response, Router } from 'express';
import userController from './controllers/UserController';
import sessionController from './controllers/SessionController';

import AuthMiddleware from './middlewares/auth';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({message: 'Hello World!'});
});

routes.post('/users', userController.create);
routes.post("/sessions", sessionController.store);

routes.use(AuthMiddleware);
routes.get('/users', userController.getAll);
routes.get('/users/:id', userController.getById);
routes.put('/users', userController.update);

export default routes;