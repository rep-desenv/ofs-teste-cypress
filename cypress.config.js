const { defineConfig } = require("cypress");
const dotenvPlugin = require('cypress-dotenv');
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
      //Aqui faço alguma ação após execução dos CT's
      // on('before:run', (details) => {
      //   /* ... */
      //   console.log('====>>>',details.specs)  
        
      //   console.log(
      //     'Running',
      //     details.specs.length,
      //     'specs in',
      //     details.browser.name
      //   )
      // })

      // on('after:run', (results) => {
      //   console.log('Fim da execução realizada')
      // })

      // on('after:screenshot', (details) => {
      //   /* ... */
      // })

        
      on('after:spec', (spec, results) => {
        /* ... */
        
        if (process.env.SAVE_RESULTS.toLocaleLowerCase() == 'true'){
            console.log('#######################################################################################################################')
            console.log( results.stats.duration )
            console.log( results.stats.startedAt )
            console.log( results.stats.endedAt )
            console.log( results.stats.tests )
            for (let index = 0; index < results.tests.length; index++) {
              console.log(results.tests[index].attempts[0].state,'===>>', index)
              console.log(results.tests[index].displayError,'===>>', index)                  
              console.log(results.tests[index].duration,'===>>', index)  
              for (let j = 0; j < results.tests[index].title.length; j++) {
                console.log(results.tests[index].title[j],'===>>', index)             
              }
            } 
            console.log('#######################################################################################################################')
          }
          
      })
  
      on('before:spec', (spec) => {
        /* ... */
        console.log('$$$$$$$',spec)
      })

      // implement node event listeners here
      config = dotenvPlugin(config)
      
      config.env.USUARIO = process.env.USUARIO
      config.env.SENHA = process.env.SENHA

      return config
    },
    chromeWebSecurity: false
  },
});
