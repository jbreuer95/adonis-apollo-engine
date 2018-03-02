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

## Config

The config file `config/apolloEngine.js`  contains all the configuration options you need to configure.

## Important!
When Apollo Engine encounters a SIGUSR2 event (The one that nodemon uses to restart) it dumps a stack trace in the console and shuts down.  
Because of this you need 2 nodemon restarts before the proxy works again. For now you can use this package in production, but having it on during development is a pain.

I have an idea how to fix this, please check back at a new version.