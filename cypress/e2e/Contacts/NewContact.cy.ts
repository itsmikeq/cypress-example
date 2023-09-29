import {faker} from '@faker-js/faker';

describe('NewContact.cy.ts', () => {
    // This page throws errors, ignore them
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    before(() => {
        // @ts-ignore
        cy.loginWithSession()
    })

    it('Create new account', () => {
        cy.intercept('/Account/Create*').as('accountCreate')
        // wait for dropdowns to load, or test fails
        cy.intercept('/CustomFieldSet/GetCustomFieldsAndSetsForDropDown*').as('accountCreateDropdowns')
        cy.location('pathname').should('eq', '/Dashboard')
        cy.get('#quick-create-newcontact').should('exist').click()

        cy.wait('@accountCreate')
        cy.wait('@accountCreateDropdowns')
        cy.location('pathname').should('include', '/Account/Create')
        cy.get('#Account_PrimaryContact_FirstName').should('exist').type(faker.person.firstName())
        cy.get('#Account_PrimaryContact_LastName').should('exist').type(faker.person.lastName())
        cy.get('#Account_PrimaryContact_Home').should('exist').type(faker.phone.number('1-501-###-####'))
        cy.get('#Account_PrimaryContact_Mobile').should('exist').type(faker.phone.number('1-501-###-####'))
        cy.contains('Add address....').should('exist').click()
        cy.get('#Account_BillingAddress_Address1').should('exist').type(faker.location.streetAddress())
        cy.get('#Account_BillingAddress_City').should('exist').type(faker.location.city())
        cy.get('#Account_BillingAddress_State').should('exist').type(faker.location.state())
        cy.get('#conflict-save-button-check > div > div > div > div > button:nth-child(1)').click()
        // make sure we can delete it
        cy.get('#delete-icon-anchor').should('exist').click()
        cy.get('body > div.k-widget.k-window.k-state-focused > div.k-window-content.k-content > button.delete-confirm.btn.green').should('exist').click()

    })

    it('Errors creating a new account', () => {
        cy.intercept('/Account/Create*').as('accountCreate')
        // wait for dropdowns to load, or test fails
        cy.intercept('/CustomFieldSet/GetCustomFieldsAndSetsForDropDown*').as('accountCreateDropdowns')
        cy.visit('https://app.practicepanther.com/Account')
        cy.get('a').contains('New').should('exist').click()

        cy.wait('@accountCreate')
        cy.wait('@accountCreateDropdowns')
        cy.location('pathname').should('include', '/Account/Create')
        cy.get('#Account_PrimaryContact_FirstName').should('exist').type(faker.person.firstName())
        cy.get('#Account_PrimaryContact_LastName').should('exist').type(faker.person.lastName())
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