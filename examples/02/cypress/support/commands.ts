// cypress/support/commands.ts


Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: '/auth/login',
    body: {
      username: Cypress.env('dummyUser'),
      password: Cypress.env('dummyPassword'),
    },
  }).then((res) => {
    expect(res.status).to.eq(200);
    Cypress.env('token', res.body.token);
  });
});
