'use strict';

const terminus = require('@godaddy/terminus');

function createSlayTerminus(terminusOptions) {
  return (app, opts, done) => {
    app.after('start', () => {
      const { http, https } = app.servers;
      terminus.createTerminus(https || http, terminusOptions);
    });
    done();
  };
}

module.exports = createSlayTerminus;
