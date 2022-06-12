import { TransferDto } from '../../src/transfer/transfer.dto';

export const invalidAccountNumber = {
  transferDetails: [
    {
      accountNumber: '0000000001j',
      amount: 50000000000,
      phoneNumber: '+2348123456780',
    },
  ],
};

export const moreThan11Recipients = {
  transferDetails: [
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
  ],
};

export const recipients = (num: number) => {
  const moreThan10Recipients: TransferDto[] = [];
  const data = {
    accountNumber: '0000000001',
    amount: 50000000000,
    phoneNumber: '+2348123456780',
  };

  for (let i = 1; i <= num; i++) {
    moreThan10Recipients.push(data);
  }

  return { transferDetails: moreThan10Recipients };
};
