import { NextFunction, Response, Request } from 'express';
import UniversalController from '../controller/universal.controller';

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  await new UniversalController().controllerResponseHandler({ message: 'Route not found', status: false, statusCode: 404 }, res);
  next();
};

export default notFound;
