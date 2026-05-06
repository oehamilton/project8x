'use strict'

const awsLambdaFastify = require('@fastify/aws-lambda')
const { buildApp } = require('./app')

let cachedHandler

async function getHandler() {
  const app = await buildApp()
  await app.ready()
  return awsLambdaFastify(app)
}

exports.handler = async (event, context) => {
  if (!cachedHandler) {
    cachedHandler = getHandler()
  }
  const handler = await cachedHandler
  return handler(event, context)
}
