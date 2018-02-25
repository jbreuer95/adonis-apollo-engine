'use strict'

const { Engine } = require('apollo-engine')

class ApolloEngine {
  constructor (Config) {
    this.Config = Config
  }
  createEngine () {
    return new Engine(this.Config.get('apolloEngine'))
  }
}

module.exports = ApolloEngine
