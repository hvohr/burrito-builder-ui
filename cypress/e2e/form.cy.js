describe('Form should look and function as it should', () => {
  it('Should have proper error handling and components', () => {
    cy.visit('http://localhost:3000/')
    cy.intercept("GET", 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: "burritoOrders.json"
    })
      .get('input, section').should('be.visible')
      .get('h1').should('contain', "Burrito Builder")
      .get('section').children().should('have.lengthOf', 3)
      .get('p').invoke('text').should('contain', "Nothing Selected")
      .get("[name ='beans']").should('be.visible')
      .get("[name ='jalapenos']").should('be.visible')
      .get(':nth-child(15)').click()
      .get('.user-form-warning').should('be.visible')
  })
  it('Should be able to add a new order', () => {
    cy.intercept("GET", 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: "burritoOrdersPost.json"
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
      .get('p').invoke('text').should('contain', "Order: beans, sour cream")
      .get(':nth-child(15)').click()
      .get('section').children().should('have.lengthOf', 4)
      .get('section').invoke('text').should('contain', "Hollis")
      .get('.user-form-warning').should('not.exist')
  })
})