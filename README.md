# Adonis Apollo Engine
Apollo Engine middleware and provider for AdonisJs

## Registering provider

Make sure you register the provider inside `start/app.js` file before making use of the body parser.

```js
const providers = [
  'adonis-apollo-engine/providers/ApolloEngineProvider'
]
```

## Registering middleware

Next step is to register a global middleware which will route the proxy requests. The middleware will be registered inside `start/kernel.js` file.
Make sure it is the `FIRST` middleware!

```js
const globalMiddleware = [
  'Adonis/Apollo/Middleware',
]
```

That's all you need to do 😎

## Config

The config file `config/apolloEngine.js`  contains all the configuration options you need to configure.
