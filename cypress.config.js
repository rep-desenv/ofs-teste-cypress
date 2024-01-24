const { defineConfig } = require("cypress");
const dotenvPlugin = require('cypress-dotenv');
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config = dotenvPlugin(config)
      
      config.env.USUARIO = process.env.USUARIO
      config.env.SENHA = process.env.SENHA

      return config
    },
    chromeWebSecurity: false
  },
});
