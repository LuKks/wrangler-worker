const fs = require('fs')
const path = require('path')
const tmp = require('like-tmp')
let wrangler = null

module.exports = async function createWorker (opts = {}) {
  if (wrangler === null) {
    wrangler = await import('wrangler')
  }

  // Avoids the cwd of .dev.vars
  const dir = opts.cwd || await tmp(opts.t || null)

  let config = path.join(dir, 'wrangler.toml')

  try {
    await fs.promises.copyFile(opts.config || './wrangler.toml', config)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }

    config = null
  }

  let filename = null

  if (opts.filename) {
    filename = opts.filename
  } else if (opts.file) {
    filename = path.join(dir, 'worker.mjs')

    await fs.promises.writeFile(filename, opts.file.trim())
  } else {
    filename = './worker.mjs'
  }

  const worker = await wrangler.unstable_dev(filename, {
    config,
    env: opts.env,
    vars: opts.vars,
    logLevel: opts.logLevel,
    compatibilityDate: '2025-01-29',
    experimental: { disableExperimentalWarning: true }
  })

  if (opts.t) {
    opts.t.teardown(() => worker.stop())
  }

  worker.$url = 'http://' + worker.address + ':' + worker.port

  return worker
}
