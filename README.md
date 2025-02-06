# wrangler-worker

Start a HTTP Worker for E2E testing

```
npm i wrangler-worker
```

## Usage

```js
const wranglerWorker = require('wrangler-worker')

const worker = await wranglerWorker({
  filename: './worker.mjs'
})

const response = await worker.fetch('/')

console.log(await response.json())
// => 'Hello World!'

await worker.stop()
```

## API

#### `worker = await wranglerWorker([options])`

Create a HTTP server to test a Worker.

Options:

```js
{
  cwd, // Tmp dir by default
  filename: './worker.mjs', // Path to filename
  file, // If no path provided, then pass the file content
  config: './wrangler.toml',
  env, // E.g. 'test' section in wrangler.toml
  vars, // Environment variables
  logLevel // E.g. 'log', 'info', etc
}
```

#### `await worker.stop()`

Close the Worker.

#### `worker.address`

Indicates the bound address.

#### `worker.port`

Indicates the bound port.

## Notes

https://developers.cloudflare.com/workers/wrangler/api/#unstable_dev

## License

MIT
