import 'jest';
import express from 'express';
import request from 'supertest';
import App from '../src/app';
import TransferRoute from '../src/transfer/transfer.route';
import { invalidAccountNumber, moreThan10Recipients, validTransferData } from './data/test-data';
import { transactions } from '../database';
import { TransferStatusTypes } from '../src/transfer/transfer.types';
// import transferService from '../src/transfer/transfer.service';

// jest.mock('../src/transfer/transfer.service');

describe('TransferController (e2e)', () => {
  let app: express.Application;

  beforeAll(async () => {
    app = new App([new TransferRoute()]).getServer();
  });

  describe('[POST] /transfer', () => {
    it('should reveal invalid account numbers and phone numbers', async () => {
      const { body, status } = await request(app).post('/transfers').send(invalidAccountNumber);
      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('Invalid entry. Crosscheck the following account number(s) and phone number(s)');
    });

    it('should not allow more than 10 bulk transfers', async () => {
      const { body, status } = await request(app).post('/transfers').send(moreThan10Recipients);
      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('transferDetails must contain not more than 10 elements');
    });

    it('should allow atleast one transfer', async () => {
      const { body, status } = await request(app).post('/transfers').send({ transferDetails: [] });
      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('transferDetails must contain at least 1 elements');
    });

    it('should return a validation error message if amount is missing', async () => {
      const userData = {
        transferDetails: [{ phoneNumber: '+2348263748927', accountNumber: '0000000293' }],
      };

      const { body, status } = await request(app).post('/transfers').send(userData);
      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('amount must not be less than 100,amount should not be empty');
    });

    it('should return a validation error message if phoneNumber is missing', async () => {
      const userData = { transferDetails: [{ amount: 100, accountNumber: '0000000293' }] };

      const { body, status } = await request(app).post('/transfers').send(userData);
      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('phoneNumber must be a valid phone number,phoneNumber should not be empty');
    });

    it('should return a validation error message if accountNumber is missing', async () => {
      const userData = { transferDetails: [{ amount: 100, phoneNumber: '+2348080000293' }] };

      const { body, status } = await request(app).post('/transfers').send(userData);
      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('accountNumber must be a string,accountNumber should not be empty');
    });

    it('should make bulk transfer to wallet accounts', async () => {
      // console.log(mock.promise, 'fastq.promise');
      // const mockServiceInstance = transferService.queueWorker();

      const { body, status } = await request(app).post('/transfers').send(validTransferData);
      expect(status).toBe(200);
      expect(body.status).toBe(true);
      expect(body.message).toBe('Transfer(s) queued successfully');
      expect(body.data).toBe(null);

      for (const txn of validTransferData.transferDetails) {
        const foundTransfer = transactions.find(x => txn.accountNumber === x.accountNumber && txn.phoneNumber === x.phoneNumber);
        expect(foundTransfer?.status).toBe(TransferStatusTypes.Success);
      }
    });
  });
});