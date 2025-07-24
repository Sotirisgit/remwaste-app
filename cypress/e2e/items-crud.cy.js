describe('Items CRUD Operations', () => {
  beforeEach(() => {
    cy.visit('/')
    localStorage.clear()
    
    // Login before each test
    cy.get('input[placeholder="Username"]').type('remwaste')
    cy.get('input[placeholder="Password"]').type('12345')
    cy.get('button[type="submit"]').click()
    
    // Wait for dashboard to load
    cy.url().should('include', '/dashboard')
    cy.contains('RemWaste Dashboard').should('be.visible')
  })

  it('should display empty state when no items exist', () => {
    // Check for empty state message
    cy.contains('No items yet. Add your first item above!').should('be.visible')
  })

  it('should create a new item successfully', () => {
    const newItemName = 'Test Item ' + Date.now()
    
    // Add new item
    cy.get('input[placeholder="New item"]').type(newItemName)
    cy.contains('Add').click()
    
    // Verify item appears in the list
    cy.contains(newItemName).should('be.visible')
    
    // Verify empty state message is gone
    cy.contains('No items yet. Add your first item above!').should('not.exist')
    
    // Verify item has Edit and Delete buttons
    cy.contains(newItemName).parent().within(() => {
      cy.contains('Edit').should('be.visible')
      cy.contains('Delete').should('be.visible')
    })
  })

  it('should create item by pressing Enter key', () => {
    const newItemName = 'Enter Key Item ' + Date.now()
    
    // Add new item using Enter key
    cy.get('input[placeholder="New item"]').type(newItemName + '{enter}')
    
    // Verify item appears in the list
    cy.contains(newItemName).should('be.visible')
  })

  it('should not create item with empty input', () => {
    // Try to add empty item
    cy.contains('Add').click()
    
    // Should still show empty state
    cy.contains('No items yet. Add your first item above!').should('be.visible')
  })

  it('should edit an existing item successfully', () => {
    const originalName = 'Original Item ' + Date.now()
    const editedName = 'Edited Item ' + Date.now()
    
    // Create an item first
    cy.get('input[placeholder="New item"]').type(originalName)
    cy.contains('Add').click()
    cy.contains(originalName).should('be.visible')
    
    // Edit the item
    cy.contains(originalName).parent().within(() => {
      cy.contains('Edit').click()
    })
    
    // Clear input and type new name
    cy.get('input').filter('[value*="Original Item"]').clear().type(editedName)
    cy.contains('Save').click()
    
    // Verify item name changed
    cy.contains(editedName).should('be.visible')
    cy.contains(originalName).should('not.exist')
  })

  it('should cancel editing without saving changes', () => {
    const itemName = 'Cancel Edit Item ' + Date.now()
    
    // Create an item first
    cy.get('input[placeholder="New item"]').type(itemName)
    cy.contains('Add').click()
    cy.contains(itemName).should('be.visible')
    
    // Start editing
    cy.contains(itemName).parent().within(() => {
      cy.contains('Edit').click()
    })
    
    // Change text but cancel
    cy.get('input').filter(`[value*="Cancel Edit Item"]`).clear().type('Changed Text')
    cy.contains('Cancel').click()
    
    // Verify original name is still there
    cy.contains(itemName).should('be.visible')
    cy.contains('Changed Text').should('not.exist')
  })

  it('should save edit by pressing Enter key', () => {
    const originalName = 'Enter Edit Item ' + Date.now()
    const editedName = 'Enter Edited Item ' + Date.now()
    
    // Create an item first
    cy.get('input[placeholder="New item"]').type(originalName)
    cy.contains('Add').click()
    cy.contains(originalName).should('be.visible')
    
    // Edit using Enter key
    cy.contains(originalName).parent().within(() => {
      cy.contains('Edit').click()
    })
    
    cy.get('input').filter('[value*="Enter Edit Item"]').clear().type(editedName + '{enter}')
    
    // Verify item name changed
    cy.contains(editedName).should('be.visible')
    cy.contains(originalName).should('not.exist')
  })

  it('should delete an item successfully', () => {
    const itemName = 'Delete Item ' + Date.now()
    
    // Create an item first
    cy.get('input[placeholder="New item"]').type(itemName)
    cy.contains('Add').click()
    cy.contains(itemName).should('be.visible')
    
    // Delete the item
    cy.contains(itemName).parent().within(() => {
      cy.contains('Delete').click()
    })
    
    // Verify item is removed
    cy.contains(itemName).should('not.exist')
    
    // Should show empty state again
    cy.contains('No items yet. Add your first item above!').should('be.visible')
  })

  it('should handle multiple items correctly', () => {
    const item1 = 'First Item ' + Date.now()
    const item2 = 'Second Item ' + Date.now()
    const item3 = 'Third Item ' + Date.now()
    
    // Create multiple items
    cy.get('input[placeholder="New item"]').type(item1)
    cy.contains('Add').click()
    cy.get('input[placeholder="New item"]').type(item2)
    cy.contains('Add').click()
    cy.get('input[placeholder="New item"]').type(item3)
    cy.contains('Add').click()
    
    // Verify all items exist
    cy.contains(item1).should('be.visible')
    cy.contains(item2).should('be.visible')
    cy.contains(item3).should('be.visible')
    
    // Delete middle item
    cy.contains(item2).parent().within(() => {
      cy.contains('Delete').click()
    })
    
    // Verify only middle item is gone
    cy.contains(item1).should('be.visible')
    cy.contains(item2).should('not.exist')
    cy.contains(item3).should('be.visible')
  })

  it('should persist items after page refresh', () => {
    const itemName = 'Persist Item ' + Date.now()
    
    // Create an item
    cy.get('input[placeholder="New item"]').type(itemName)
    cy.contains('Add').click()
    cy.contains(itemName).should('be.visible')
    
    // Refresh page
    cy.reload()
    
    // Should still be logged in and see the item
    cy.url().should('include', '/dashboard')
    cy.contains(itemName).should('be.visible')
  })
})