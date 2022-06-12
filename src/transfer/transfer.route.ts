import { Router } from 'express';
import Route from '@/@universal/interfaces/route.interface';
import validationMiddleware from '@/@universal/middlewares/validation.middleware';
import TransferController from './transfer.controller';
import { TransferDetailsDto } from './transfer.dto';

class TransferRoute implements Route {
  public transferPath = '/transfers';

  public router = Router();
  public transferController = new TransferController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.transferPath}`, validationMiddleware(TransferDetailsDto, 'body'), this.transferController.bulkTransfer);
  }
}

export default TransferRoute;
