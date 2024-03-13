/// <reference types="cypress" />

context('Login',() => {

    Cypress.config('experimentalSessionSupport', true)
    Cypress.session.clearAllSavedSessions()

    const usuario = Cypress.env('USUARIO')
    const senha = Cypress.env('SENHA')

    beforeEach(() => {              
        // cy.visit('https://equatorialenergia2.test.etadirect.com/')  
        // cy.wait(2000)
        // cy.get('#welcome-message').should('contain.text','Bem-vindo a equatorialenergia2.test')
    })

    const visitUrl = () => {
        cy.visit('https://equatorialenergia2.test.etadirect.com/')  
        cy.wait(2000)
        cy.get('#welcome-message').should('contain.text','Bem-vindo a equatorialenergia2.test')
    }

    const logOff = () => {
        cy.wait(5000)
        cy.get('button.user-menu')
        .should('exist')
        .then((logoff) => {
            if(logoff) {
                cy.get('button.user-menu').click()        
                cy.get('[pos="2"] > .item-link').click()        
                cy.get('#welcome-message').should('contain.text','Bem-vindo a equatorialenergia2.test')
            }
        })
    }

    it('Verificar o acesso ao sistema pelo perfil de Controlador.', () => {

        visitUrl()

        cy.fixture('user_controlador').then(user => {
            //Digite o {idUsuario} no camo Nome de Usuário 
            cy.get('#username').type(user.username)

            //Digite a {senha} no campo Senha
            cy.get('#password').type(user.passw)
        })

        // //Digite o {idUsuario} no camo Nome de Usuário 
        // cy.get('#username').type(`${usuario}`)

        // //Digite a {senha} no campo Senha
        // cy.get('#password').type(`${senha}`)

        //Clicar no botão conectar
        cy.get('#sign-in').click()

        //Realizar o acesso ao sistema, sendo permitido realizar a gestão dos recursos de campo.
        cy.get('.page-header-back-button > .app-button > .app-button-icon').should('exist')
        cy.get('.page-header-back-button > .app-button > .app-button-icon').click()
        cy.get('.global-navigation-item--manage').should('exist')
        cy.wait(2000)
        cy.get('.global-navigation-item--manage').click()
        cy.wait(2000)
        cy.get("h1[title='Gerenciar']").should('contain.text','Gerenciar')    
        
        logOff()
    });

    it('Verificar o acesso ao sistema pelo perfil de Encarregado.', () => {
        visitUrl()

        cy.fixture('user_encarregado').then(user => {
            //Digite o {idUsuario} no camo Nome de Usuário
            cy.get('#username').type(user.username)

            //Digite a {senha} no campo Senha
            cy.get('#password').type(user.passw)
        })

        // //Digite o {idUsuario} no camo Nome de Usuário 
        // cy.get('#username').type(`${usuario}`)

        // //Digite a {senha} no campo Senha
        // cy.get('#password').type(`${senha}`)

        //Clicar no botão conectar
        cy.get('#sign-in').click()

        //Realizar o acesso ao sistema, sendo permitido realizar a gestão dos recursos de campo.
        cy.get('.page-header-back-button > .app-button > .app-button-icon').should('exist')
        cy.get('.page-header-back-button > .app-button > .app-button-icon').click()
        cy.get('.global-navigation-item--resources').should('exist')
        cy.wait(2000)
        cy.get('.global-navigation-item--resources').click()
        cy.wait(2000)
        cy.get("h1[title='Recursos']").should('contain.text','Recursos')

       logOff()
    });
          
     it('Verificar o acesso ao sistema por um usuário não cadastrado.', () => {
         visitUrl()
         
         //Digite o {idUsuario} no camo Nome de Usuário 
         cy.get('#username').type('teste@teste.com')
     
         //Digite a {senha} no campo Senha
         cy.get('#password').type('123')
         
         //Clicar no botão conectar
         cy.get('#sign-in').click()
     
         //Mensagem: "Ambiente, Nome de Usuário ou Senha Incorretos", exibida.
         cy.get('#notification-message-block').should('contain','Ambiente, Nome de Usuário ou Senha Incorretos')
     });

    // Cypress._.times(5, () => {        
    //     it('Verificar o acesso ao sistema por um usuário não cadastrado.', () => {
    //         visitUrl()

    //         //Digite o {idUsuario} no camo Nome de Usuário 
    //         cy.get('#username').type('teste@teste.com')
        
    //         //Digite a {senha} no campo Senha
    //         cy.get('#password').type('123')
            
    //         //Clicar no botão conectar
    //         cy.get('#sign-in').click()
        
    //         //Mensagem: "Ambiente, Nome de Usuário ou Senha Incorretos", exibida.
    //         cy.get('#notification-message-block').should('contain','Ambiente, Nome de Usuário ou Senha Incorretos')
    //     })
    // });
    
    it('Verificar o envio do email para a recuperação de senha.', () => {
        visitUrl()

        //Clique em "Esqueceu a Senha?"
        cy.get('#forgot-password').click()
        
        //Digite o {idUsuario} no campo Nome do Usuário 
        cy.get('#username').type('mail@mail.com')       
        
        //Clique no botão Enviar
        cy.get('#submit').click()

        //Clique no botão Reenviar E-mail
        cy.get('#submit').click()

        //Clique no botão Conectar
        cy.get('#sign-in').click()

        //Exibido Tela de login do OFS disponível para login
        cy.get('#welcome-message').should('contain','Bem-vindo a equatorialenergia2.test')
    });


    it.only('Verificar se ocorre o bloqueio do acesso.', () => {

        visitUrl()

        cy.fixture('user_controlador').then(user => {
            //Digite o {idUsuario} no camo Nome de Usuário 
            cy.get('#username').type(user.username)
        })    

        for (let i = 0; i < 4; i++) {  
            //Digite a {senha} no campo Senha
            cy.get('#password').type('123') 
            cy.get('#sign-in').click()          
        }
        

        // //Digite o {idUsuario} no camo Nome de Usuário 
        // cy.get('#username').type(`${usuario}`)

        // //Digite a {senha} no campo Senha
        // cy.get('#password').type(`${senha}`)

        //Clicar no botão conectar
        //cy.get('#sign-in').click()
        
    });

    afterEach(() => {
        // cy.wait(5000)
        // cy.get('button.user-menu').should('exist')
        // cy.get('button.user-menu').click()        
        // cy.get('[pos="2"] > .item-link').click()        
        // cy.get('#welcome-message').should('contain.text','Bem-vindo a equatorialenergia2.test')
        // cy.wait(5000)
        // cy.get('button.user-menu')
        // .should('exist')
        // .then((logoff) => {
        //     if(logoff) {
        //         cy.get('button.user-menu').click()        
        //         cy.get('[pos="2"] > .item-link').click()        
        //         cy.get('#welcome-message').should('contain.text','Bem-vindo a equatorialenergia2.test')
        //     }
        // })
    })
})

