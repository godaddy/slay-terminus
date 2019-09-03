'use strict';

const terminus = require('@godaddy/terminus');

function createSlayTerminus(terminusOptions) {
  return (app, opts, done) => {
    app.after('start', (_, __, next) => {
      const { http, https } = app.servers;
      terminus.createTerminus(https || http, terminusOptions);
      next();
    });
    done();
  };
}

module.exports = createSlayTerminus;
