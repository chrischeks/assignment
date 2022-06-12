import UniversalService from '@/@universal/service/universal.service';
import { TransferDetailsDto, TransferDto } from './transfer.dto';
import { Concurrency, QueueTask, Transaction, TransferStatusTypes, Wallet, WalletBalanceCheck } from './transfer.types';
import { transactions, wallets } from '../database';
import fastq from 'fastq';
import type { queueAsPromised } from 'fastq';
import IResponse from '@/@universal/interfaces/response.interface';

class TransferService extends UniversalService {
  constructor() {
    super();
  }

  public bulkTransfer = async (body: TransferDetailsDto): Promise<IResponse<any, string>> => {
    const transferDetails = body.transferDetails;

    const invalidAccounts: Partial<TransferDto>[] = await this.accountLookup(transferDetails);
    if (invalidAccounts.length > 0) {
      return this.failureResponse('Invalid entry. Crosscheck the following account number(s) and phone number(s)', invalidAccounts);
    }

    const checkWalletBalance = await this.checkWalletBalance(transferDetails);
    if (!checkWalletBalance.canTransfer) {
      return this.failureResponse('Your wallet balance is not sufficient for this bulk transfer', checkWalletBalance);
    }

    await this.createTransfer(transferDetails);
    return this.successResponse('Transfer(s) queued successfully');
  };

  /**
   * Account owner's wallet is static (no debit) to allow uninterrupted calls to the /transfers endpoint.
   */
  private checkWalletBalance = async (transfers: TransferDto[]): Promise<WalletBalanceCheck> => {
    const initialvalue = 0;
    const totalTransferAmount = transfers.reduce((previousValue, currentValue) => previousValue + currentValue.amount, initialvalue);

    const accountOwnerWallet: Wallet = {
      id: 100,
      userId: 100,
      accountNumber: '0000000100',
      balance: 100000000000,
      currency: 'NGN',
      phoneNumber: '+2348123456180',
    };

    return { canTransfer: accountOwnerWallet.balance > totalTransferAmount, totalTransferAmount, walletBalance: accountOwnerWallet.balance };
  };

  private accountLookup = async (transfers: TransferDto[]): Promise<Partial<TransferDto>[]> => {
    //Check for invalid account number and phone number combination
    const invalidAccountNumbers: Partial<TransferDto>[] = [];
    for (const transfer of transfers) {
      const walletFound = wallets.find(
        (wallet: Wallet) => wallet.accountNumber === transfer.accountNumber && wallet.phoneNumber === transfer.phoneNumber,
      );
      if (!walletFound) {
        invalidAccountNumbers.push({ accountNumber: transfer.accountNumber, phoneNumber: transfer.phoneNumber });
      }
    }

    return invalidAccountNumbers;
  };

  private createTransfer = async (transfers: TransferDto[]): Promise<void> => {
    transfers.map(transfer => {
      const record: Transaction = {
        id: this.generateRandom(24),
        amount: transfer.amount,
        status: TransferStatusTypes.Pending,
        accountNumber: transfer.accountNumber,
        phoneNumber: transfer.phoneNumber,
      };
      return transactions.push(record);
    });

    const queue: queueAsPromised<QueueTask> = fastq.promise(this.queueWorker, Concurrency);

    transactions.map((txn: Transaction) => {
      queue.push({ transferId: txn.id });
    });
  };

  /**
   *This method can be enhanced by
   * 1. Adding database transaction, such that every update runs or they all fail.
   * 2. Reverse fund for failed transfers
   */
  private queueWorker = async (arg: QueueTask): Promise<void> => {
    const { transferId } = arg;

    let transfer: Transaction;
    try {
      transfer = transactions.find(txn => txn.id === transferId);

      //Ensures the transfer exists and has not been processed (status:pending)
      if (!transfer || transfer.status !== TransferStatusTypes.Pending) {
        return;
      }

      for (const wallet of wallets) {
        if (wallet.phoneNumber === transfer.phoneNumber) {
          wallet.balance = wallet.balance + transfer.amount;
          break;
        }
      }

      for (const txn of transactions) {
        if (txn.id === transfer.id) {
          txn.status = TransferStatusTypes.Success;
          break;
        }
      }
    } catch (error) {
      for (const txn of transactions) {
        if (txn.id === transfer.id) {
          txn.status = TransferStatusTypes.Failed;
          break;
        }
      }
    }
  };
}

export default TransferService;
