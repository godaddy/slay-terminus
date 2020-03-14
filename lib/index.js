'use strict';

const { promisify } = require('util');
const terminus = require('@godaddy/terminus');

function createSlayTerminus(terminusOptions) {
  return (app, opts, done) => {
    const perform = promisify(app.perform.bind(app));
    const makeInterceptable = (interceptor, optionalHandler) => {
      return () => perform(interceptor, async closingHookDone => {
        try {
          optionalHandler && await optionalHandler();
        } catch (err) {
          return void closingHookDone(err);
        }
        closingHookDone();
      });
    };

    app.after('start', (_, __, next) => {
      const { http, https } = app.servers;
      const { beforeShutdown, onShutdown, ...otherOpts } = terminusOptions || {};

      terminus.createTerminus(https || http, {
        ...otherOpts,
        beforeShutdown: makeInterceptable('closing', beforeShutdown),
        onShutdown: makeInterceptable('shutdown', onShutdown)
      });

      next();
    });
    done();
  };
}

module.exports = createSlayTerminus;
