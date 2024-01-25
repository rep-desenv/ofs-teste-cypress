const { defineConfig } = require("cypress");
const dotenvPlugin = require('cypress-dotenv');
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
      ////Aqui faço alguma ação após execução dos CT's
      // on('before:run', (details) => {
      //   /* ... */
      // })

      // on('after:run', (results) => {
      //   console.log('Fim da execução realizada')
      // })

      // on('after:screenshot', (details) => {
      //   /* ... */
      // })

      // on('after:spec', (spec, results) => {
      //   /* ... */
      // })

      // on('before:spec', (spec) => {
      //   /* ... */
      // })

      // implement node event listeners here
      config = dotenvPlugin(config)
      
      config.env.USUARIO = process.env.USUARIO
      config.env.SENHA = process.env.SENHA

      return config
    },
    chromeWebSecurity: false
  },
});
