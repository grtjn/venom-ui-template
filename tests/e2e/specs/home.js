// https://docs.cypress.io/api/introduction/api.html

'use strict';

describe('Home', () => {
  it('app root shows Home', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
  });
});
