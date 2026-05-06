'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const { buildApp } = require('./app')

describe('buildApp', () => {
  it('GET /health returns 200', async () => {
    const app = await buildApp()
    await app.ready()
    const res = await app.inject({ method: 'GET', url: '/health' })
    assert.equal(res.statusCode, 200)
    const body = JSON.parse(res.body)
    assert.equal(body.ok, true)
    assert.equal(body.service, 'project8x-api')
    await app.close()
  })
})
