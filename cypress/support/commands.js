// Custom commands for RemWaste app testing

// Login command
Cypress.Commands.add('login', (username = 'remwaste', password = '12345') => {
  cy.visit('/')
  cy.get('input[placeholder="Username"]').type(username)
  cy.get('input[placeholder="Password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/dashboard')
})

// Create item command
Cypress.Commands.add('createItem', (itemName) => {
  cy.get('input[placeholder="New item"]').type(itemName)
  cy.contains('Add').click()
  cy.contains(itemName).should('be.visible')
})

// Delete all items command (for test cleanup)
Cypress.Commands.add('deleteAllItems', () => {
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Delete")').length > 0) {
      cy.get('button:contains("Delete")').each(($btn) => {
        cy.wrap($btn).click()
      })
    }
  })
})

// Check API health
Cypress.Commands.add('checkApiHealth', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('backendUrl')}/health`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 404]) // 404 is ok if no health endpoint
  })
})