import {faker} from '@faker-js/faker';

describe('NewContact.cy.ts', () => {
    // This page throws errors, ignore them
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    before(() => {

        cy.visit('https://app.practicepanther.com/')
        // https://on.cypress.io/type
        cy.get('#loginForm > div:nth-child(5) > div > input')
            .type('shayriley2022+1@gmail.com')

        cy.get('#loginForm > div:nth-child(6) > div > input')
            .type('AWD1995')
        cy.get('#loginForm > div.form-actions > button').click()
    })

    it('visit jetbrains.com', () => {
        cy.intercept('/Account/Create*').as('accountCreate')
        // wait for dropdowns to load, or test fails
        cy.intercept('/CustomFieldSet/GetCustomFieldsAndSetsForDropDown*').as('accountCreateDropdowns')
        cy.location('pathname').should('eq', '/Dashboard')
        cy.get('#quick-create-newcontact').should('exist').click()

        cy.wait('@accountCreate').then((_) => {
            cy.wait('@accountCreateDropdowns').then((_) => {
                cy.location('pathname').should('include', '/Account/Create')
                cy.get('#Account_PrimaryContact_FirstName').should('exist').type(faker.person.firstName())
                cy.get('#Account_PrimaryContact_LastName').should('exist').type(faker.person.lastName())
                cy.get('#Account_PrimaryContact_Home').should('exist').type(faker.phone.number('501-###-####'))
                cy.get('#Account_PrimaryContact_Mobile').should('exist').type(faker.phone.number('501-###-####'))
                cy.contains('Add address....').should('exist').click()
                cy.get('#Account_BillingAddress_Address1').should('exist').type(faker.location.streetAddress())
                cy.get('#Account_BillingAddress_City').should('exist').type(faker.location.city())
                cy.get('#Account_BillingAddress_State').should('exist').type(faker.location.state())
                cy.get('#conflict-save-button-check > div > div > div > div > button:nth-child(1)').click()
                // make sure we can delete it
                cy.get('#delete-icon-anchor').should('exist').click()
                cy.get('body > div.k-widget.k-window.k-state-focused > div.k-window-content.k-content > button.delete-confirm.btn.green').should('exist').click()
            })
        })

    })
})