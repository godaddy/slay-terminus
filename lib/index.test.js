'use strict';

const terminus = require('@godaddy/terminus');
const { describe, it, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert');

const createSlayTerminus = require('./');

describe('slay-terminus', () => {
  let app;
  let createTerminusMock;
  let doneMock;

  beforeEach(() => {
    app = {
      servers: {
        http: {
          on: mock.fn(),
        }
      },
      after: mock.fn(async (event, callback) => {
        try {
          await callback({}, {}, () => {});
        } catch (err) {
          console.error('Error in app.after callback:', err);
        }
      })
    };
    createTerminusMock = mock.method(terminus, 'createTerminus');
    doneMock = mock.fn();
  });

  it('creates a terminus preboot', () => {
    const slayTerminus = createSlayTerminus({ foo: 'bar' });
    assert.strictEqual(typeof slayTerminus, 'function');
  });

  it('plugs terminus', () => {
    const slayTerminus = createSlayTerminus({ foo: 'bar' });
    slayTerminus(app, null, doneMock);
    assert.strictEqual(app.after.mock.calls[0].arguments[0], 'start');
    assert.strictEqual(createTerminusMock.mock.calls[0].arguments[0], app.servers.http);
    assert.deepEqual(createTerminusMock.mock.calls[0].arguments[1], { foo: 'bar' });
    assert.strictEqual(doneMock.mock.calls.length, 1);
  });

  it('handles errors in app.after callback', async () => {
    const testError = new Error('Test error');
    app.after = mock.fn((event, callback) => {
      callback({}, {}, () => {
        throw testError;
      });
    });
    
    const slayTerminus = createSlayTerminus({ foo: 'bar' });
    await assert.rejects(
      () => new Promise((resolve, reject) => {
        slayTerminus(app, null, (err) => {
          if (err) reject(err);
          else resolve();
        });
      }),
      testError
    );
  });

  afterEach(() => {
    mock.reset();
  });
});
