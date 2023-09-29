/// <reference types="cypress" />

context('Actions', () => {
    before(() => {
        // @ts-ignore
        cy.loginWithSession()
    })


    // Does not work because the top buttons can't seem to be clicked
    it('runs things', () => {
        cy.intercept('/TimeEntry/GetTimeEntriesStats*').as('timeEntries')
        cy.intercept('/Feed/GetFeeds*').as('getFeeds')
        cy.intercept('/Feed/Feeds_Read*').as('readFeeds')
        cy.wait(['@timeEntries', '@getFeeds', '@readFeeds'], {timeout: 10000}).then((_) => {
            cy.wait(1000).then(() => {
                cy.get('h3.page-title').contains('Dashboard')
                cy.get('div#divTrust').contains('Trust').should('exist').click();
            })
        })
        cy.wait(1000)
        cy.location('pathname').should('eq', '/Payment')
        cy.intercept('/Payment/GetPayments*').as('getPayments')
        cy.intercept('/Payment/ReadPayments*').as('readPayments')
        cy.intercept('/Payment/Create*').as('createPayment')
        cy.intercept('/Account/GetAccountsForDropDown_Virtualization*').as('a1')
        cy.intercept('/Project/GetProjectsForDropDown_Virtualization*').as('a2')
        // TODO: wait/then is an antipattern but it only seems to work this way
        cy.wait(['@getPayments', '@readPayments'])
        cy.get('li button').contains('Actions').click();
        cy.get('#page-content-column > div.row.page-title-row > div > ul > li.btn-group.open > ul > li:nth-child(1) > a').contains('Payment').click();
        // get the first modal box for contact
        cy.wait(['@createPayment'])
        // cy.wait(5000)
        cy.wait(['@a1', '@a2'])
        cy.contains('Select Contact...').should('exist').first().click({force: true})
        cy.contains('Pete Shalaski').first().should('exist').click({force: true})
        // Click the last item in the menu
        // cy.contains('Select Contact...').closest('.k-animation-container li').last().click()
        // Select the matter
        cy.contains('Select Matter...').should('exist').first().click({force: true})
        // Click the last item in the menu
        // cy.contains('Select Matter...').closest('.k-animation-container li').last().click()
        cy.get('.k-animation-container li').contains('Divorce').click({force: true})
        // Next
        cy.get('.modal-dialog').contains('Next').click()
        // })


        // cy.get('#tab1payment span.k-input').click();
        // cy.get('[role="listbox"]').first().click();
        // cy.get('#Amount').type('100');
        // cy.get('#f9c22b3a-0444-4397-ac05-02ce5ba34bcc').click();
        // cy.get('#btnSubmit').click();
        // cy.url().should('contains', 'https://app.practicepanther.com/Payment');

    })
})
