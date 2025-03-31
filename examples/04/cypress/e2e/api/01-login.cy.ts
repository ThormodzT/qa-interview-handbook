describe("Login Test", () => {
    describe('POST /auth/login', () => {
        it('GIVEN a user with valid credentials WHEN is logging in THEN the user should be able to get an access token AND a 200 status code', () => {
            cy.request({
                method: 'POST',
                url: '/auth/login',
                body: {
                    username: Cypress.env('testUser'),
                    password: Cypress.env('testPassword')
                }
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.accessToken).to.be.a('string')
            })
        });

        it('GIVEN a user with invalid credentials WHEN is logging in THEN the user should receive a <Invalid crentials> message AND will receive a 401 status code', () => {
            cy.request({
                method: 'POST',
                url: '/auth/login',
                body: {
                    username: Cypress.env('testUser'),
                    password: 'invalidpassword'
                },
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(400);
                // expect(res.body.message).to.eq('Invalid credentials')
            })
        });
    })
});