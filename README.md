# slay-terminus

[Slay] preboot providing shutdown and Kubernetes readiness / liveness checks with [terminus].

## Usage

```js
const terminusOptions = {
  healthChecks: {
    '/healthcheck': () => Promise.resolve()
  },
  logger: console.log
};

app.preboot(require('slay-terminus')(terminusOptions));

app.before('shutdown', done => {
  // Do some cleanup
  done();
});
```

## API

The `slay-terminus` module exports a function that returns a Slay preboot. The options for this function are identical with the options you would pass directly to [terminus]. 

Additionally, new interceptors are introduced:

| Interceptor | Purpose |
|-------------|---------|
| `closing`   | Precedes server listeners closing |
| `shutdown`  | Preceeds termination of the node process |

## Tests

All tests are written with [mocha] and should be run with `npm`:

``` bash
$ npm test
```

[Conventional Commits Specification]: https://www.npmjs.com/package/@commitlint/config-conventional
[mocha]: http://mochajs.org/
[terminus]: https://github.com/godaddy/terminus
[Slay]: https://github.com/godaddy/slay
