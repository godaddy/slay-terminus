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
```

## Tests

All tests are written with [mocha] and should be run with `npm`:

``` bash
$ npm test
```

[Conventional Commits Specification]: https://www.npmjs.com/package/@commitlint/config-conventional
[mocha]: http://mochajs.org/
[terminus]: https://github.com/godaddy/terminus
[Slay]: https://github.com/godaddy/slay
