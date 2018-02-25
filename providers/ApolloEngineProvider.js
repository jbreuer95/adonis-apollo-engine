'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ApolloEngineProvider extends ServiceProvider {
  register () {
    this.app.singleton('Adonis/Apollo/Engine', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('../src/ApolloEngine'))(Config).createEngine()
    })
    this.app.singleton('Adonis/Apollo/Middleware', () => {
      const engine = this.app.use('Adonis/Apollo/Engine')
      return new (require('../src/ApolloEngine/middleware'))(engine)
    })
  }
  boot () {
    const engine = this.app.use('Adonis/Apollo/Engine')
    engine.start()
  }
}

module.exports = ApolloEngineProvider
