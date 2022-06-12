import IResponse from '@/@universal/interfaces/response.interface';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import errorMiddleware from '../middlewares/error.middleware';

class UniversalController {
  protected controllerErrorHandler = async (req: Request, res: Response, error: HttpException, next: NextFunction) => {
    return errorMiddleware(error, req, res, next);
  };

  public controllerResponseHandler = async (response: IResponse<any, string>, res: Response) => {
    const { statusCode, status, message, data } = response;
    return res.status(statusCode).json({ status, message, data });
  };
}

export default UniversalController;
