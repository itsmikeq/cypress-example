/// <reference types="cypress" />

context('Actions', () => {
    before(() => {
        cy.visit('https://app.practicepanther.com/')
        // https://on.cypress.io/type
        cy.get('#loginForm > div:nth-child(5) > div > input')
            .type('shayriley2022+1@gmail.com')

        cy.get('#loginForm > div:nth-child(6) > div > input')
            .type('AWD1995')
        cy.get('#loginForm > div.form-actions > button').click()
    })

    // https://on.cypress.io/interacting-with-elements
    // it('Adds funds to a matter', () => {
    //     cy.get('#divTrust').click()
    //     cy.get('#page-content-column > div.row.page-title-row > div > ul > li.btn-group.open > button')
    //     cy.get('#page-content-column > div.row.page-title-row > div > ul > li.btn-group.open > ul > li:nth-child(1) > a').click()
    //     cy.get('#tab1payment > div.form-section-bordered > div:nth-child(5) > div > span.k-widget.k-dropdown.k-header.accountComboBox.kendo-dropdown-list').click()
    //     cy.get('#CreateWizardViewModel_AccountGuid_listbox > li:nth-child(1)').click()
    //     cy.get('#next-button').click()
    //     cy.get('#btnDepositFunds').click()
    //     cy.get('#add-payment-button').click()
    //     cy.location('pathname').should('eq', '/Payment/DepositFunds')
    //
    // })

    // Does not work because the top buttons can't seem to be clicked
    it('runs things', () => {
        cy.intercept('/Dashboard').as('dashboard')
        cy.visit('/')
        cy.wait('@dashboard')
        cy.get('h3.page-title').contains('Dashboard')
        cy.get('div#divTrust').contains('Trust').should('exist').click();
        // cy.location('pathname').should('eq', '/Payment')
        // cy.get('button').contains('Actions').click();
        // cy.get('a').contains('Payment').click();
        // // get the first modal box for contact
        // cy.get('.modal-dialog [role="listbox"]').first().click();
        // cy.get('.k-animation-container li.k-state-focused').click()
        // // Select the matter
        // cy.get('.modal-dialog [role="listbox"]')[1].click();
        // cy.get('.k-animation-container li.k-state-focused').contains('Divorce').click()
        // // Next
        // cy.get('.modal-dialog a').contains('Next').click()




        // cy.get('#tab1payment span.k-input').click();
        // cy.get('[role="listbox"]').first().click();
        // cy.get('#Amount').type('100');
        // cy.get('#f9c22b3a-0444-4397-ac05-02ce5ba34bcc').click();
        // cy.get('#btnSubmit').click();
        // cy.url().should('contains', 'https://app.practicepanther.com/Payment');

    })
})
