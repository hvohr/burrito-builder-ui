describe('Form should look and function as it should', () => {
  it('Should have proper error handling and components', () => {
    cy.visit('http://localhost:3000/')
    cy.intercept("GET", 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: "burritoOrders.json"
    })
      .get('input, p').should('be.visible')
      .get("[name ='beans']").should('be.visible')
      .get(':nth-child(15)').click()
      .get('.user-form-warning').should('be.visible')
  })
  it('Should be able to add a new order', () => {
    cy.intercept("GET", 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: "burritoOrders.json"
    })
    cy.intercept("POST", 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: {
        name: 'Hollis', ingredients: [[
          "beans",
          "sour cream"
        ]]
      }
    })
    cy.get('form').get('input').type('Hollis')
      .get('[name="beans"]').click().get('[name="sour cream"]').click()
      .get('p').should('contain', 'Order: beans, sour cream')
      .get(':nth-child(15)').click()
      .get('.user-form-warning').should('not.exist')
      .get('section').invoke('text').should('contain', "Hollis")
      .get('section').invoke('text').should('contain', "beans")
  })

})