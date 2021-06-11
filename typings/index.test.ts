import { TerminusOptions } from '@godaddy/terminus';
import _createSlayTerminus = require('slay-terminus');
import createSlayTerminus from 'slay-terminus';

const terminusOptions: TerminusOptions = {
  healthChecks: {
    '/healthcheck': () => Promise.resolve()
  },
  logger: console.log
};

const fakeApp = {};
const fakeOpts = {};
const fakeDone = () => {};

const _slayTerminus = _createSlayTerminus({ ...terminusOptions, signal: 'test' });

_slayTerminus(fakeApp, fakeOpts, fakeDone);

const slayTerminus = createSlayTerminus({ ...terminusOptions, signal: 'test' });

slayTerminus(fakeApp, fakeOpts, fakeDone);
