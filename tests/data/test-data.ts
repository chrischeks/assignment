import { TransferDto } from '../../src/transfer/transfer.dto';

export const invalidAccountNumber = {
  transferDetails: [
    {
      accountNumber: '0000000001j',
      amount: 5000,
      phoneNumber: '+2348081111115',
    },
  ],
};

export const recipients = (num: number) => {
  const moreThan10Recipients: TransferDto[] = [];
  const data = {
    accountNumber: '0000000004',
    amount: 5000,
    phoneNumber: '+2348081111115',
  };

  for (let i = 1; i <= num; i++) {
    moreThan10Recipients.push(data);
  }

  return { transferDetails: moreThan10Recipients };
};
