export const invalidAccountNumber = {
  transferDetails: [
    {
      accountNumber: '0000000001j',
      amount: 50000000000,
      phoneNumber: '+2348123456780',
    },
  ],
};

export const validTransferData = {
  transferDetails: [
    {
      accountNumber: '0000000001',
      amount: 50000000000,
      phoneNumber: '+2348123456780',
    },
    {
      accountNumber: '0000000009',
      amount: 5000,
      phoneNumber: '+2348123456700',
    },
  ],
};

export const moreThan10Recipients = {
  transferDetails: [
    {
      _id: 1,
      userId: 1,
      accountNumber: '0000000001',
      balance: 100,
      currency: 'NGN',
      phoneNumber: '+2348123456780',
    },
    {
      _id: 2,
      userId: 2,
      accountNumber: '0000000002',
      balance: 200,
      currency: 'NGN',
      phoneNumber: '+2348123456790',
    },
    {
      _id: 3,
      userId: 3,
      accountNumber: '0000000003',
      balance: 300,
      currency: 'NGN',
      phoneNumber: '+2348123456770',
    },
    {
      _id: 4,
      userId: 4,
      accountNumber: '0000000004',
      balance: 400,
      currency: 'NGN',
      phoneNumber: '+2348123456750',
    },
    {
      _id: 5,
      userId: 5,
      accountNumber: '0000000005',
      balance: 500,
      currency: 'NGN',
      phoneNumber: '+2348123451740',
    },
    {
      _id: 6,
      userId: 6,
      accountNumber: '0000000006',
      balance: 600,
      currency: 'NGN',
      phoneNumber: '+2348125456730',
    },
    {
      _id: 7,
      userId: 7,
      accountNumber: '0000000007',
      balance: 700,
      currency: 'NGN',
      phoneNumber: '+2348123856720',
    },
    {
      _id: 8,
      userId: 8,
      accountNumber: '0000000008',
      balance: 800,
      currency: 'NGN',
      phoneNumber: '+2348123156710',
    },
    {
      _id: 9,
      userId: 9,
      accountNumber: '0000000009',
      balance: 900,
      currency: 'NGN',
      phoneNumber: '+2348123456700',
    },
    {
      _id: 10,
      userId: 10,
      accountNumber: '0000000010',
      balance: 1000,
      currency: 'NGN',
      phoneNumber: '+2348123456760',
    },
    {
      _id: 11,
      userId: 11,
      accountNumber: '0000000011',
      balance: 1000,
      currency: 'NGN',
      phoneNumber: '+2348123451760',
    },
  ],
};
