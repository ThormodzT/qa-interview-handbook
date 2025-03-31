describe("Authors tests", () => {
    let token: string;
    const testUser = {
        "firstName": "Kalethar",
        "lastName": "Stormblade",
        "email": "kalethar@example.com",
        "username": "kalethar_user",
        "password": "Secret123!"
    }

    before(() => {
        cy.login().then(() => {
            token = Cypress.env('token');
        })
    })

    it('should be able to create a new user', () => {
        // cy.request({
        //     method: 'POST',
        //     url: '/users/add',
        //     headers: { Authorization: `Bearer ${token}` },
        //     body: testUser
        // }).then((res) => {
        //     expect(res.status).to.eq(201)
        //     expect(res.body.email).to.eq(testUser.email)
        //     expect(res.body.id).to.be.a('number')
        // })

        cy.request({
            method: 'POST',
            url: '/users/add',
            headers: { Authorization: `Bearer ${token}` },
            body: testUser
        }).as("createUser");

        cy.get("@createUser").then((res: any) => {
            expect(res.status).to.eq(201)
            expect(res.body.email).to.eq(testUser.email)
            expect(res.body.id).to.be.a('number')
        })
    })
})