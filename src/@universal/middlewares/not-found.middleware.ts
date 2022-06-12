import { NextFunction, Response, Request } from 'express';
import UniversalController from '../controller/universal.controller';

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  return await new UniversalController().controllerResponseHandler({ message: 'Rota não encontrada.', status: false, statusCode: 404 }, req, res);
};

export default notFound;
