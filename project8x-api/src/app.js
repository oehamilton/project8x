'use strict'

const fastify = require('fastify')

/** Normalize path for routing (API Gateway may include stage-less paths). */
function pathOnly(url) {
  return (url || '').split('?')[0]
}

function isStripeWebhookPath(url) {
  const p = pathOnly(url)
  return p === '/v1/webhooks/stripe' || p.endsWith('/v1/webhooks/stripe')
}

async function buildApp() {
  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
  })

  /**
   * Stripe signature verification requires the exact raw JSON payload bytes.
   * Other JSON routes get normal parsed bodies.
   */
  app.addContentTypeParser(
    'application/json',
    { parseAs: 'string', bodyLimit: 1_048_576 },
    (req, body, done) => {
      try {
        if (isStripeWebhookPath(req.url)) {
          req.rawBody = Buffer.from(body, 'utf8')
          done(null, {})
          return
        }
        const json = JSON.parse(body)
        done(null, json)
      } catch (err) {
        done(err)
      }
    }
  )

  app.get('/health', async () => ({
    ok: true,
    service: 'project8x-api',
    ts: new Date().toISOString(),
  }))

  app.post('/v1/webhooks/stripe', async (request, reply) => {
    const sig = request.headers['stripe-signature']
    if (!sig) {
      reply.code(400)
      return { error: 'missing_stripe_signature' }
    }

    const secret = process.env.STRIPE_WEBHOOK_SECRET
    if (!secret) {
      request.log.warn('STRIPE_WEBHOOK_SECRET not set — configure SAM parameter or env')
      reply.code(503)
      return { error: 'webhook_not_configured' }
    }

    const raw = request.rawBody
    if (!raw || !Buffer.isBuffer(raw)) {
      reply.code(400)
      return { error: 'missing_raw_body' }
    }

    try {
      const Stripe = require('stripe')
      // constructEvent does not call Stripe APIs; any well-formed sk_test_* works for instantiation only.
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder00000000000000')
      const event = stripe.webhooks.constructEvent(raw, sig, secret)
      request.log.info({ stripeEventId: event.id, stripeType: event.type }, 'stripe_webhook_verified')
      // TODO MVP-B: enqueue idempotent entitlement processing (evt id → PaymentRecord / Entitlement)
      return { received: true, id: event.id, type: event.type }
    } catch (err) {
      request.log.warn({ err }, 'stripe_webhook_verify_failed')
      reply.code(400)
      return { error: 'invalid_signature' }
    }
  })

  app.setNotFoundHandler((request, reply) => {
    reply.code(404)
    return { error: 'not_found', path: pathOnly(request.url) }
  })

  return app
}

module.exports = { buildApp }
