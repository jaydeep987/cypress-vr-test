/// <reference types="Cypress" />

context('ui-button', function() {
  it('Should be primary button with blue color and text', function() {
    cy.visit('http://localhost:9001/iframe.html?id=ui-button--primary-button');

    cy.matchImageSnapshot();
  });
});
