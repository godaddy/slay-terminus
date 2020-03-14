'use strict';

const terminus = require('@godaddy/terminus');

const { promisify } = require('util');
const chai = require('chai');
const sinon = require('sinon');

chai.use(require('sinon-chai'));
const { expect } = chai;

const createSlayTerminus = require('.');

describe('slay-terminus', () => {
  let app;
  let createTerminusStub;
  let doneStub;

  beforeEach(() => {
    app = sinon.mock();
    app.servers = sinon.mock();
    app.servers.http = sinon.mock();
    app.after = sinon.stub().callsArgWith(1, null, null, sinon.spy());
    app.perform = sinon.spy((interceptor, handler, callback) => {
      handler(callback);
    });
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
    expect(app.after).to.be.calledWith('start');
    expect(createTerminusStub).to.be.calledWithMatch(
      sinon.match.same(app.servers.http),
      sinon.match({ foo: 'bar' })
    );
    expect(doneStub.called).equals(true);
  });

  it('invokes interceptors during shutdown cycle', async () => {
    const slayTerminus = promisify(createSlayTerminus());
    await slayTerminus(app, null);
    const terminusOpts = createTerminusStub.lastCall.args[1];

    await terminusOpts.beforeShutdown();
    expect(app.perform).to.be.calledWith('closing');

    await terminusOpts.onShutdown();
    expect(app.perform).to.be.calledWith('shutdown');
  });

  afterEach(() => {
    sinon.restore();
  });
});
