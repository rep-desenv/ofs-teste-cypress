/// <reference types="cypress"/>

context('Oracle Field Service',()=>{
    beforeEach(() => {        
        cy.visit('https://equatorialenergia2.test.etadirect.com/mobility/')  
        cy.get('#welcome-message').should('contain.text','Bem-vindo a equatorialenergia2.test')
    })

    describe('Login', () => {
        
        const usuario = Cypress.env('USUARIO')
        const senha = Cypress.env('SENHA')
        
        it('Login de Usuário Inválido.', () => {
            //Digite o {idUsuario} no camo Nome de Usuário 
            cy.get('#username').type('teste@teste.com')

            //Digite a {senha} no campo Senha
            cy.get('#password').type('123')

            //Clicar no botão conectar
            cy.get('#sign-in').click()

            //Mensagem: "Ambiente, Nome de Usuário ou Senha Incorretos", exibida.
            cy.get('#notification-message-block').should('contain','Ambiente, Nome de Usuário ou Senha Incorretos')      
        });

        it('Esqueceu a Senha.', () => {
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

        it('Botão Conectar Habilitado', () => {
            cy.get('#username').type('aaa')
            cy.get('#password').type('123')
            cy.get('input').should('be.enabled')
        });
    
        it('Botão Conectar Desabilitado', () => {        
            cy.get('#username').type('aaa')
            cy.get('#password').type('123')  
            cy.wait(2000)
            cy.get('#username').clear()
            cy.get('#password').clear()
            cy.get('#sign-in').should('be.disabled')        
        });
    
        it('Login de Usuário Válido.', () => {
            cy.get('#username').type(`${usuario}`)
            cy.get('#password').type(`${senha}`)
            cy.get('#sign-in').click()            
            cy.get('button.user-menu').should('exist')
        });
    
        it('Número de Sessões Excedidas.', () => {    
            cy.get('#username').type(`${usuario}`)
            cy.get('#password').type(`${senha}`)
            cy.get('#sign-in').click()
            cy.get('#notification-message-block').should('contain','Número máximo de sessões excedido')  
        });
    
        it('Excluir Sessões Excedidas.', () => {
            cy.get('#username').type(`${usuario}`)
            cy.get('#password').type(`${senha}`)
            cy.get('#sign-in').click()
            cy.get('#notification-message-block').should('contain','Número máximo de sessões excedido')
            cy.get('#delsession').check()
            cy.get('#password').type(`${senha}`)
            cy.get('#sign-in').click()            
            cy.get('button.user-menu').should('exist')
            cy.get('button.user-menu').click()
            cy.get('[pos="2"] > .item-link').click()
            cy.get('#welcome-message').should('contain.text','Bem-vindo a equatorialenergia2.test')       
        });
    
    
        it('Logoff', () => {            
            cy.get('#username').type(`${usuario}`)
            cy.get('#password').type(`${senha}`)
            cy.get('#sign-in').click()

            var vCondition = false
            do {
                vCondition = cy.get('button.user-menu').should('exist')
            } while (vCondition == false);

            cy.get('button.user-menu').click()
            cy.get('[pos="2"] > .item-link').click()
            cy.get('#welcome-message').should('contain.text','Bem-vindo a equatorialenergia2.test')
        });
    
        
    });

    

})