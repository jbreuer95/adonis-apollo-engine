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

When Apollo Engine encounters a SIGUSR2 event (The one that nodemon uses to restart) it dumps a stack trace in the console and doesn't shut down.  
To get around this issue you have to tell nodemon to use the SIGUSR1 event. You can do this by adding a nodemon.json like this to the root of your project

```
{
  "signal": "SIGUSR1"
}
```
Be careful because SIGUSR1 is used for node debugging and could introduce some weird behaviour
