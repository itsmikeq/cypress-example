/// <reference types="cypress" />

context('Actions', () => {
    before(() => {
        cy.visit('https://app.practicepanther.com/')
    })

    // https://on.cypress.io/interacting-with-elements

    it('Logs into the dashboard', () => {
        // https://on.cypress.io/type
        cy.get('#loginForm > div:nth-child(5) > div > input')
            .type('shayriley2022+1@gmail.com')

        cy.get('#loginForm > div:nth-child(6) > div > input')
            .type('AWD1995')
        cy.get('#loginForm > div.form-actions > button').click()
        cy.location('pathname').should('eq', '/Dashboard')
    })
})
