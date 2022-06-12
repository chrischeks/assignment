import IResponse from '@/@universal/interfaces/response.interface';
import { Request, Response } from 'express';
import { logger } from '../logger/logger';

class UniversalController {
  protected controllerErrorHandler = async (req: Request, res: Response, error) => {
    const { originalUrl, method, ip, body } = req;

    logger.log('error', `URL:${originalUrl} - METHOD:${method} - IP:${ip} - ERROR:${error}`);
    return res.status(500).json({ status: false, message: 'Someting went wrong', data: null });
  };

  public controllerResponseHandler = async (response: IResponse<any, string>, req: Request, res: Response) => {
    const { statusCode, status, message, data } = response;
    const { originalUrl, method, ip, body } = req;
    return res.status(statusCode).json({ status, message, data });
  };
}

export default UniversalController;
