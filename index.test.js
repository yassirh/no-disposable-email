const request = require('supertest');
const express = require('express');

jest.mock('./utility');
const { isDisposable } = require('./utility');

let app, server;
beforeAll(() => {
  const index = require('./index');
  app = index.app;
  server = index.server;
});
afterAll((done) => {
  server.close(done);
});

describe('GET /check', () => {
  beforeEach(() => {
    isDisposable.mockReset();
  });

  it('returns 400 if email is missing', async () => {
    const res = await request(app).get('/check');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Missing email/);
  });

  it('returns 400 for invalid email format', async () => {
    const res = await request(app).get('/check?email=notanemail');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid email format/);
  });

  it('returns disposable true for disposable email', async () => {
    isDisposable.mockReturnValue(true);
    const res = await request(app).get('/check?email=test@mailinator.com');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ email: 'test@mailinator.com', disposable: true });
  });

  it('returns disposable false for non-disposable email', async () => {
    isDisposable.mockReturnValue(false);
    const res = await request(app).get('/check?email=test@gmail.com');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ email: 'test@gmail.com', disposable: false });
  });
});
