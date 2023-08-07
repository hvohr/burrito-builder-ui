describe('Form should look and function as it should', () => {
  it('Should add a posted new order', () => {
    cy.visit('http://localhost:3000/')
    cy.intercept("GET", 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: "burritoOrdersPost.json"
    }).as('orders')
    cy.intercept("POST", 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: {
        name: 'Hollis', ingredients: [[
          "beans",
          "sour cream",
          "jalapeno",
          "steak"
        ]]
      }
    })
  })
})