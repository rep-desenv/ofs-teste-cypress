const { defineConfig } = require("cypress");
const dotenvPlugin = require('cypress-dotenv');
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
      // //Aqui faço alguma ação após execução dos CT's
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
              
        if (process.env.SAVE_RESULTS.toLocaleLowerCase() == 'true'){

            //Detail
            var dadosDetail = {}
            dadosDetail.file_name = results.spec.fileName
            dadosDetail.absolute_path = results.spec.absolute

            fetch('http://localhost:3000/detail', {
                method: "POST",
                body: JSON.stringify({
                  "file_name": dadosDetail.file_name,
                  "absolute_path": dadosDetail.absolute_path
                }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(response => response.json())              
              .then((json)=>{
                    
                    console.log('executado em detail',json)  

                    //Reporter
                    var reporterDados = {}
                    reporterDados.suites = results.reporterStats.suites
                    reporterDados.tests = results.reporterStats.tests
                    reporterDados.passes = results.reporterStats.passes
                    reporterDados.pending = results.reporterStats.pending
                    reporterDados.failures = results.reporterStats.failures
                    reporterDados.start = results.reporterStats.start
                    reporterDados.end = results.reporterStats.end
                    reporterDados.duration = results.reporterStats.duration
                    reporterDados.id_detail = parseInt(json)

                    fetch('http://localhost:3000/reporter', {
                          method: "POST",
                          body: JSON.stringify({
                            "suites": reporterDados.suites,
                            "tests": reporterDados.tests,
                            "passes": reporterDados.passes,
                            "pending": reporterDados.pending,
                            "failures": reporterDados.failures,
                            "start": reporterDados.start,
                            "end": reporterDados.end,
                            "duration": reporterDados.duration,
                            "id_detail": reporterDados.id_detail
                          }),
                          headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    .then(response => response.json())
                    .then(json => console.log('executado em reporter',json))
                    .catch(err => console.log('erro', err))


                    //Stats
                    var dadosStats = {}
                    dadosStats.duration = results.stats.duration
                    dadosStats.started_at = results.stats.startedAt
                    dadosStats.ended_at = results.stats.endedAt
                    dadosStats.qtd_tests = parseInt(results.stats.tests)
                    dadosStats.id_datail = parseInt(json)

                    fetch('http://localhost:3000/stats', {
                        method: "POST",
                        body: JSON.stringify({
                          "duration": dadosStats.duration,
                          "started_at": dadosStats.started_at,
                          "ended_at": dadosStats.ended_at,
                          "qtd_tests": dadosStats.qtd_tests,
                          "id_datail": dadosStats.id_datail
                        }),
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                      })
                      .then(response => response.json())
                      .then((json)=>{

                        console.log('executado em stats',json)
                        
                        //Tests
                        var dados = {}            
                        for (let index = 0; index < results.tests.length; index++) {
                            dados.state = results.tests[index].attempts[0].state 
                            dados.display_error = results.tests[index].displayError
                            dados.duration = results.tests[index].duration

                            for (let j = 0; j < results.tests[index].title.length; j++) {
                              dados.test_name = results.tests[index].title[j]          
                            }                
                            dados.id_stats = parseInt(json)
                            
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
                            .then(json => console.log('executado em tests',json))
                            .catch(err => console.log('erro', err))            
                        }
                      })
                      .catch(err => console.log('erro', err))
              })
              .catch(err => console.log('erro', err))             
           }
          
      })
  
      // on('before:spec', (spec, results) => {
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
