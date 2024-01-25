/// <reference types="Cypress"/>

describe('Teste funcional de Login', () => {
    
    const usuario = Cypress.env('USUARIO')
    const senha = Cypress.env('SENHA')

    it('Login de Usuário Inválido.', () => {
        cy.visit('https://equatorialenergia2.test.etadirect.com/mobility/')
        cy.get('#username').type('teste@teste.com')
        cy.get('#password').type('123')
        cy.get('#sign-in').click()
        cy.get('#notification-message-block').should('contain','Ambiente, Nome de Usuário ou Senha Incorretos')      
    });

    it('Esqueceu a Senha.', () => {
        cy.visit('https://equatorialenergia2.test.etadirect.com/mobility/')
        cy.get('#forgot-password').click() 
        cy.get('#username').type('mail@mail.com')        
        cy.get('#submit').click()
        cy.get('#submit').click()
        cy.get('#sign-in').click()
        cy.get('#welcome-message').should('contain','Bem-vindo a equatorialenergia2.test')
    });

    it('Botão Conectar Habilitado', () => {
        cy.visit('https://equatorialenergia2.test.etadirect.com/mobility/')
        cy.get('#username').type('aaa')
        cy.get('#password').type('123')
        cy.get('input').should('be.enabled')
    });

    it('Botão Conectar Desabilitado', () => {        
       
        cy.visit('https://equatorialenergia2.test.etadirect.com/mobility/')
        cy.get('#username').type('aaa')
        cy.get('#password').type('123')  
        cy.wait(1000)
        cy.get('#username').clear()
        cy.get('#password').clear()
        cy.get('#sign-in').should('be.disabled')        
    });

    it('Login de Usuário Válido.', () => {
        cy.visit('https://equatorialenergia2.test.etadirect.com/mobility/')
        cy.get('#username').type(`${usuario}`)
        cy.get('#password').type(`${senha}`)
        cy.get('#sign-in').click()
        // cy.get('.icon-container').should('exist')    
        // cy.wait(2000)
        // cy.get('.icon-container').should('not.exist')  
        cy.get('button.user-menu').should('exist')
    });

    it('Número de Sessões Excedidas.', () => {

        cy.visit('https://equatorialenergia2.test.etadirect.com/mobility/')
        cy.get('#username').type(`${usuario}`)
        cy.get('#password').type(`${senha}`)
        cy.get('#sign-in').click()
        cy.get('#notification-message-block').should('contain','Número máximo de sessões excedido')  
    });

    it('Excluir Sessões Excedidas.', () => {

        cy.visit('https://equatorialenergia2.test.etadirect.com/mobility/')
        cy.get('#username').type(`${usuario}`)
        cy.get('#password').type(`${senha}`)
        cy.get('#sign-in').click()
        cy.get('#notification-message-block').should('contain','Número máximo de sessões excedido')
        cy.get('#delsession').check()
        cy.get('#password').type('Lancevak@2024')
        cy.get('#sign-in').click()
        // cy.get('.icon-container').should('exist')    
        // cy.wait(3000)
        // cy.get('.icon-container').should('not.exist')
        cy.get('button.user-menu').should('exist')
        cy.get('button.user-menu').click()
        //cy.get('[pos="2"] > .item-link')
        cy.get('[pos="2"] > .item-link').click()
        //cy.get('[tabindex="0"] > .item-link').click()
        cy.get('#welcome-message').should('contain.text','Bem-vindo a equatorialenergia2.test')       
    });


    it('Logoff', () => {
        cy.visit('https://equatorialenergia2.test.etadirect.com/mobility/')
        cy.get('#username').type(`${usuario}`)
        cy.get('#password').type(`${senha}`)
        cy.get('#sign-in').click()
        // cy.get('.icon-container').should('exist')    
        // cy.wait(2000)
        // cy.get('.icon-container').should('not.exist')  
        cy.get('button.user-menu').should('exist')
        cy.get('button.user-menu').click()
        //cy.get('[pos="2"] > .item-link')
        cy.get('[pos="2"] > .item-link').click()
        //cy.get('[tabindex="0"] > .item-link').click()
        cy.get('#welcome-message').should('contain.text','Bem-vindo a equatorialenergia2.test')
    });

});