const path = require('path')
const test = require('brittle')
const createWorker = require('../index.js')

test('basic', async function (t) {
  const worker = await createWorker({
    t,
    filename: path.join(__dirname, 'worker.mjs')
  })

  const response = await worker.fetch('/')

  t.alike(await response.json(), 'Hello World!')
})
