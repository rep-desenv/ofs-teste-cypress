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
      //   if (process.env.SAVE_RESULTS.toLocaleLowerCase() == 'true'){
      //     console.log('Screenshot =>>>>', details)
      //   }
      // })

        
      on('after:spec', (spec, results) => {
        /* ... */
        
        if (process.env.SAVE_RESULTS.toLocaleLowerCase() == 'true'){

            var dados = {}
              
            console.log('#######################################################################################################################')
            console.log( results.stats.duration )
            console.log( results.stats.startedAt )
            console.log( results.stats.endedAt )
            console.log( results.stats.tests )
            
            for (let index = 0; index < results.tests.length; index++) {
              console.log(results.tests[index].attempts[0].state,'===>>', index)
              dados.state = results.tests[index].attempts[0].state

              console.log(results.tests[index].displayError,'===>>', index)  
              dados.display_error = results.tests[index].displayError

              console.log(results.tests[index].duration,'===>>', index) 
              dados.duration = results.tests[index].duration

              for (let j = 0; j < results.tests[index].title.length; j++) {
                console.log(results.tests[index].title[j],'===>>', index)  
                dados.test_name = results.tests[index].title[j]          
              }
              
              dados.id_stats = 23
              
              console.log(dados)

              fetch('http://localhost:3000/tests', {
                method: "POST",
                body: JSON.stringify({
                  "state": dados.state,
                  "display_error": dados.display_error,
                  "duration": dados.duration,
                  "test_name": dados.test_name,
                  "id_stats": dados.id_stats
                }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(response => response.json())
              .then(json => console.log('executado',json))
              .catch(err => console.log('erro', err))            
            }                     
            console.log('#######################################################################################################################')
          }
          
      })
  
      // on('before:spec', (spec) => {
      //   /* ... */
      //   if (process.env.SAVE_RESULTS.toLocaleLowerCase() == 'true'){
      //     console.log('$$$$$$$',spec)
      //   }
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
