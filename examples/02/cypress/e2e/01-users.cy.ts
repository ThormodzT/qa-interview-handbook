describe('DummyJSON - User flow without deep promise chains', () => {
    let token: string;
    let createdUserId: number;

    before(() => {
        cy.login().then(() => {
            token = Cypress.env('token');
        });
    });

    it('should create a user from fixture, validate and delete it cleanly', function () {
        cy.fixture('newUser').as('userPayload');

        cy.get('@userPayload').then((user: any) => {
            const timestamp = Date.now();
            const uniqueUser = {
                ...user,
                username: `${user.username}_${timestamp}`,
                email: `${timestamp}_${user.email}`,
            };

            // ➕ Create user
            cy.request({
                method: 'POST',
                url: '/users/add',
                headers: { Authorization: `Bearer ${token}` },
                body: uniqueUser,
            }).as('createUser');

            // ✅ Validate user
            cy.get('@createUser').then((res: any) => {
                expect(res.status).to.eq(201);
                expect(res.body).to.include({
                    firstName: uniqueUser.firstName,
                    email: uniqueUser.email,
                });

                createdUserId = res.body.id;

                cy.request({
                    method: 'GET',
                    url: `/users/${createdUserId}`,
                }).as('getUser');
            });

            cy.get('@getUser').then((res: any) => {
                expect(res.status).to.eq(200);
                expect(res.body.username).to.eq(uniqueUser.username);
            });

            // 🗑️ Delete user
            cy.then(() => {
                cy.request({
                    method: 'DELETE',
                    url: `/users/${createdUserId}`,
                    headers: { Authorization: `Bearer ${token}` },
                }).as('deleteUser');
            });

            cy.get('@deleteUser').then((res: any) => {
                expect(res.status).to.eq(200);
                expect(res.body.id).to.eq(createdUserId);
            });
        });
    });
});
