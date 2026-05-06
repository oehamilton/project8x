'use strict'

/**
 * Run Fastify locally (not Lambda). Useful for quick route checks without SAM CLI.
 * Stripe webhook verification still needs a valid signing secret + stripe listen, or mock headers.
 */
const { buildApp } = require('./app')

const port = Number(process.env.PORT || 3001)

buildApp()
  .then(async (app) => {
    await app.listen({ port, host: '0.0.0.0' })
    app.log.info(`listening on http://localhost:${port} (GET /health)`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
