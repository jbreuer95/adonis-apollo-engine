'use strict'

const request = require('request')

class ApolloEngine {
  constructor (engine) {
    this.engine = engine
  }
  async handle ({ request, response }, next) {
    const { request: req, response: res } = request
    const params = this.engine.middlewareParams
    const endpointRegex = this.getEndpointRegex(params.endpoint)

    if (!params.uri || !endpointRegex.test(request.originalUrl())) await next()
    else if (req.method !== 'GET' && req.method !== 'POST') await next()
    else if (req.headers['x-engine-from'] === params.psk) {
      response.header('Content-type', 'application/json')
      await next()
    } else {
      req.url = this.removeExtraSlash(params.endpoint, request.originalUrl())
      response.implicitEnd = false
      this.proxyRequest(params, req, res, response)
    }
  }
  proxyRequest (params, req, res) {
    if (params.dumpTraffic) {
      req.pipe(process.stdout)
    }
    const proxyRes = req.pipe(request({
      uri: params.uri + req.url,
      forever: true,
      headers: { 'host': req.headers['host'] }
    }))
      .on('error', (err) => {
        console.error(err)
        res.writeHead(503)
        res.end()
      })

    if (params.dumpTraffic) {
      proxyRes.pipe(process.stdout)
    }

    proxyRes.pipe(res)
  }
  getEndpointRegex (endpoint) {
    return new RegExp(`^${endpoint}(/?|\\\\)($|\\?.*)`)
  }
  removeExtraSlash (expectedEndpoint, actualUrl) {
    const indexAfterEndpoint = expectedEndpoint.length
    const characterAfterEndpoint = actualUrl.charAt(indexAfterEndpoint)
    if (characterAfterEndpoint === '/' || characterAfterEndpoint === '\\') {
      return actualUrl.slice(0, indexAfterEndpoint) + actualUrl.slice(indexAfterEndpoint + 1, actualUrl.length)
    }
    return actualUrl
  }
}

module.exports = ApolloEngine
