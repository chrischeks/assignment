import UniversalController from '@/@universal/controller/universal.controller';
import { NextFunction, Request, Response } from 'express';
import { TransferDetailsDto } from './transfer.dto';
import TransferService from './transfer.service';

class TransferController extends UniversalController {
  private transferService = new TransferService();

  public bulkTransfer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body: TransferDetailsDto = req.body;

    try {
      const response = await this.transferService.bulkTransfer(body);
      await this.controllerResponseHandler(response, res);
    } catch (error) {
      await this.controllerErrorHandler(req, res, error, next);
    }
  };
}

export default TransferController;
