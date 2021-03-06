'use strict'

/*
 * adonis-bodyparser
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const path = require('path')

module.exports = async function (cli) {
  try {
    await cli.copy(
      path.join(__dirname, './src/ApolloEngine/config.js'),
      path.join(cli.helpers.configPath(), 'apolloEngine.js')
    )
    cli.command.completed('create', 'config/apolloEngine.js')
  } catch (error) {
    // ignore error
  }
}
