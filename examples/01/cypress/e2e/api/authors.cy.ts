describe('API Test - Authors Endpoint', () => {
    interface Author {
        id: number;
        idBook: number;
        firstName: string;
        lastName: string;
    }


    const baseEndpoint = '/api/v1/Authors';
    const testAuthor: Author = {
        id: 1,
        idBook: 1,
        firstName: "First Name 1",
        lastName: "Last Name 1"
    }

    it('GET /Authors - should return a list of authors', () => {
        // Given: the API is available and returns authors
        const endpoint = '/api/v1/Authors';

        // When: we send a GET request to fetch all authors
        cy.request<Author[]>({
            method: 'GET',
            url: endpoint,
        }).then((response) => {
            // Then: the response should be 200 and contain valid author data
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0);

            const author = response.body[0];
            expect(author).to.have.all.keys('id', 'idBook', 'firstName', 'lastName');
            expect(author.id).to.be.a('number');
            expect(author.idBook).to.be.a('number');
            expect(author.firstName).to.be.a('string');
            expect(author.lastName).to.be.a('string');
        });
    });

    it('POST /Authors - should create a new author', () => {
        // Given: a valid author object
        // When: we send a POST request to create it
        cy.request<Author>({
            method: 'POST',
            url: baseEndpoint,
            body: testAuthor,
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            // Then: it returns 200 and the same data
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(testAuthor);
        });
    });

    it('GET /Authors/{id} - should return the created author', () => {
        // Given: an existing author ID
        // When: we fetch the author by ID
        cy.request<Author>({
            method: 'GET',
            url: `${baseEndpoint}/1`
        }).then((response) => {
            // Then: it returns the author data
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(testAuthor);
        });
    });

    it('PUT /Authors/{id} - should update the author', () => {
        // Given: an updated author object
        const updatedAuthor = { ...testAuthor, lastName: 'Lightbringer' };

        // When: we send a PUT request
        cy.request<Author>({
            method: 'PUT',
            url: `${baseEndpoint}/${testAuthor.id}`,
            body: updatedAuthor,
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            // Then: it returns the updated author
            expect(response.status).to.eq(200);
            expect(response.body.lastName).to.eq('Lightbringer');
        });
    });

    it('DELETE /Authors/{id} - should delete the author', () => {
        // Given: an existing author
        // When: we delete the author
        cy.request({
            method: 'DELETE',
            url: `${baseEndpoint}/${testAuthor.id}`
        }).then((response) => {
            // Then: response should be 200
            expect(response.status).to.eq(200);
        });
    });

    it('GET /Authors/{id} - should return 404 for deleted author', () => {
        // Given: the author was deleted
        // When: we try to fetch the deleted author
        cy.request<Author>({
            method: 'GET',
            url: `${baseEndpoint}/12346`,
            failOnStatusCode: false
        }).then((response) => {
            // Then: response should be 404
            expect(response.status).to.eq(404);
        });
    });
});
