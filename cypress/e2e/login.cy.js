describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    localStorage.clear()
  })

  it('should display login form on initial visit', () => {
    cy.contains('RemWaste Login').should('be.visible')
    cy.get('input[placeholder="Username"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button[type="submit"]').should('contain', 'Login')
  })

  it('should login successfully with valid credentials', () => {
    cy.get('input[placeholder="Username"]').type('remwaste')
    cy.get('input[placeholder="Password"]').type('12345')
    cy.get('button[type="submit"]').click()

    // Should redirect to dashboard
    cy.url().should('include', '/dashboard')
    cy.contains('RemWaste Dashboard').should('be.visible')
    cy.contains('Sign Out').should('be.visible')
    
    // Check that token is stored
    cy.window().then((window) => {
      expect(window.localStorage.getItem('token')).to.not.be.null
    })
  })

  it('should show error message with invalid credentials', () => {
    cy.get('input[placeholder="Username"]').type('invaliduser')
    cy.get('input[placeholder="Password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    // Should stay on login page and show error
    cy.url().should('not.include', '/dashboard')
    cy.get('p').should('contain.text', 'Server error or invalid credentials').and('have.css', 'color', 'rgb(255, 0, 0)')
  })

  it('should show error message with empty credentials', () => {
    cy.get('button[type="submit"]').click()

    // Form validation should prevent submission
    cy.get('input[placeholder="Username"]').should('have.attr', 'required')
    cy.get('input[placeholder="Password"]').should('have.attr', 'required')
  })

  it('should logout successfully', () => {
    // First login
    cy.get('input[placeholder="Username"]').type('remwaste')
    cy.get('input[placeholder="Password"]').type('12345')
    cy.get('button[type="submit"]').click()
    
    // Verify we're on dashboard
    cy.url().should('include', '/dashboard')
    
    // Logout
    cy.contains('Sign Out').click()
    
    // Should redirect to login and clear token
    cy.url().should('not.include', '/dashboard')
    cy.contains('RemWaste Login').should('be.visible')
    
    cy.window().then((window) => {
      expect(window.localStorage.getItem('token')).to.be.null
    })
  })
})