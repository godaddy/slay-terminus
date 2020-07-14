'use strict';

const terminus = require('@godaddy/terminus');

const { expect } = require('chai');
const sinon = require('sinon');

const createSlayTerminus = require('./');

describe('slay-terminus', () => {
  let app;
  let createTerminusStub;
  let doneStub;

  beforeEach(() => {
    app = sinon.mock();
    app.servers = sinon.mock();
    app.servers.http = sinon.mock();
    app.after = sinon.stub().callsArgWith(1, {}, {}, sinon.spy());
    createTerminusStub = sinon.stub(terminus, 'createTerminus');
    doneStub = sinon.stub();
  });

  it('creates a terminus preboot', () => {
    const slayTerminus = createSlayTerminus({ foo: 'bar' });
    expect(typeof slayTerminus).equals('function');
  });

  it('plugs terminus', () => {
    const slayTerminus = createSlayTerminus({ foo: 'bar' });
    slayTerminus(app, null, doneStub);
    expect(app.after.calledWith('start')).equals(true);
    expect(createTerminusStub.calledWith(app.servers.http, { foo: 'bar' }))
      .equals(true);
    expect(doneStub.called).equals(true);
  });

  afterEach(() => {
    sinon.restore();
  });
});
