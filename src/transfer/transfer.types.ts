export class Wallet {
  id: number;
  userId: number;
  accountNumber: string;
  balance: number;
  currency: string;
  phoneNumber: string;
}

export enum TransferStatusTypes {
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
}

export class Transaction {
  status: TransferStatusTypes;
  amount: number;
  accountNumber: string;
  phoneNumber: string;
  id: string;
}

export class QueueTask {
  transferId: string;
}

export const Concurrency = 1;

export class WalletBalanceCheck {
  canTransfer: boolean;
  totalTransferAmount: number;
  walletBalance: number;
}
