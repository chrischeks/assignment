import 'jest';
import express from 'express';
import request from 'supertest';
import App from '../src/app';
import TransferRoute from '../src/transfer/transfer.route';
import { invalidAccountNumber, recipients } from './data/test-data';
import { transactions } from '../src/database';
import { TransferStatusTypes } from '../src/transfer/transfer.types';

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
      const { body, status } = await request(app).post('/transfers').send(recipients(11));

      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('Validation Error');
      expect(body.data[0].field).toBe('transferDetails');
      expect(body.data[0].validations[0]).toBe('transferDetails must contain not more than 10 elements');
    });

    it('should not allow transferDetails to be an empty array', async () => {
      const { body, status } = await request(app).post('/transfers').send({ transferDetails: [] });

      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('Validation Error');
      expect(body.data[0].field).toBe('transferDetails');
      expect(body.data[0].validations[0]).toBe('transferDetails must contain at least 1 elements');
    });

    it('should return a validation error message if amount is missing', async () => {
      const userData = {
        transferDetails: [{ phoneNumber: '+2348263748927', accountNumber: '0000000293' }],
      };

      const { body, status } = await request(app).post('/transfers').send(userData);

      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('Validation Error');
      expect(body.data[0].field).toContain('amount');
      expect(body.data[0].validations).toContain('amount must not be less than 100');
      expect(body.data[0].validations).toContain('amount should not be empty');
    });

    it('should return a validation error message if phoneNumber is missing', async () => {
      const userData = { transferDetails: [{ amount: 100, accountNumber: '0000000293' }] };

      const { body, status } = await request(app).post('/transfers').send(userData);

      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('Validation Error');
      expect(body.data[0].field).toContain('phoneNumber');
      expect(body.data[0].validations).toContain('phoneNumber must be a valid phone number');
      expect(body.data[0].validations).toContain('phoneNumber should not be empty');
    });

    it('should return a validation error message if accountNumber is missing', async () => {
      const userData = { transferDetails: [{ amount: 100, phoneNumber: '+2348080000293' }] };

      const { body, status } = await request(app).post('/transfers').send(userData);

      expect(status).toBe(400);
      expect(body.status).toBe(false);
      expect(body.message).toBe('Validation Error');
      expect(body.data[0].field).toContain('accountNumber');
      expect(body.data[0].validations).toContain('accountNumber must be a string');
      expect(body.data[0].validations).toContain('accountNumber should not be empty');
    });

    it('should make bulk transfer to wallet accounts', async () => {
      const userData = recipients(1);
      const { body, status } = await request(app).post('/transfers').send(userData);

      expect(status).toBe(200);
      expect(body.status).toBe(true);
      expect(body.message).toBe('Transfer(s) queued successfully');
      expect(body.data).toBe(null);

      const transfer = userData.transferDetails[0];
      const foundTransfer = transactions.find(txn => transfer.accountNumber === txn.accountNumber && transfer.phoneNumber === txn.phoneNumber);
      expect(foundTransfer?.status).toBe(TransferStatusTypes.Success);
    });
  });

  describe('[POST] /transfer/not-found', () => {
    it('should return an error message for invalid path', async () => {
      const { body, status } = await request(app).post('/transfers/not-found');

      expect(status).toBe(404);
      expect(body.status).toBe(false);
      expect(body.message).toBe('Route not found');
    });
  });
});
