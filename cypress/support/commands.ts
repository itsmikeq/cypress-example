// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email = 'shayriley2022+1@gmail.com', password = 'AWD1995') => {
    cy.visit('https://app.practicepanther.com/')
    // https://on.cypress.io/type
    cy.get('#loginForm > div:nth-child(5) > div > input')
        .type(email)

    cy.get('#loginForm > div:nth-child(6) > div > input')
        .type(password)
    cy.get('#loginForm > div.form-actions > button').click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })