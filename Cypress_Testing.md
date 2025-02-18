# Cypress Interview Preparation Guide

## 🟡 Introduction to Cypress
Cypress is a modern, JavaScript-based end-to-end testing framework designed for web applications. It operates in the same run-loop as your application, providing fast, reliable, and debuggable tests.

---

## 🟠 Key Features of Cypress
- **Automatic Waiting**: No need for manual waits or sleeps.
- **Time Travel**: Captures snapshots during tests.
- **Real-Time Reloads**: Automatically reloads when changes are made.
- **Network Traffic Control**: Intercepts and modifies requests/responses.
- **Cross-Browser Testing**: Supports major browsers like Chrome, Firefox, and Edge.

---

## 🟡 Cypress Architecture
- **Node.js Backend**: Manages file operations and network requests.
- **Browser Runner**: Runs tests directly in the browser.
- **Command Log**: Displays all Cypress commands and assertions.
- **Cypress Test Runner**: Interactive GUI to run and debug tests.

---

## 🟠 Cypress Commands Table

| Command             | Description                                           | Example                                       |
|---------------------|-------------------------------------------------------|-----------------------------------------------|
| `cy.visit()`        | Visit a URL                                          | `cy.visit('https://example.com')`            |
| `cy.get()`          | Get a DOM element                                    | `cy.get('.btn-submit')`                       |
| `cy.contains()`     | Get an element with specific text                    | `cy.contains('Submit')`                       |
| `cy.find()`         | Find a child element                                 | `cy.get('.form').find('input')`              |
| `cy.click()`        | Click on an element                                  | `cy.get('.btn').click()`                      |
| `cy.type()`         | Type into an input field                             | `cy.get('#name').type('John Doe')`           |
| `cy.clear()`        | Clear an input field                                 | `cy.get('#name').clear()`                     |
| `cy.check()`        | Check a checkbox                                     | `cy.get('#agree').check()`                    |
| `cy.select()`       | Select an option from a dropdown                     | `cy.get('#country').select('USA')`            |
| `cy.scrollTo()`     | Scroll to an element                                 | `cy.get('#footer').scrollTo('bottom')`       |
| `cy.should()`       | Add an assertion                                     | `cy.get('.title').should('have.text', 'Hello')` |
| `cy.expect()`       | Use BDD-style assertions                             | `expect(true).to.be.true`                    |
| `cy.intercept()`    | Intercept network requests                           | `cy.intercept('GET', '/api/users', {users: []})` |
| `cy.wait()`         | Wait for an amount of time or request                | `cy.wait(500)` or `cy.wait('@getUsers')`    |
| `cy.reload()`       | Reload the page                                      | `cy.reload()`                                |
| `cy.screenshot()`   | Take a screenshot                                    | `cy.screenshot('homepage')`                  |
| `cy.viewport()`     | Set the browser viewport size                        | `cy.viewport(1280, 720)`                     |

---

## 🟡 Best Practices for Cypress Testing

### 1️⃣ **Organize Tests Effectively**
- Use **Page Object Model (POM)** for reusable components.
- Group tests by **feature** or **user journey**.

### 2️⃣ **Avoid Flaky Tests**
- **Never use hard waits (`cy.wait(5000)`)**, use **`cy.intercept()`** with aliases.
- Use **`cy.should()`** for automatic retries.

### 3️⃣ **Use Custom Commands**
Create custom commands for repetitive actions:
```javascript
Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});
```

### 4️⃣ **Handle Network Requests Properly**
- Use `cy.intercept()` to stub API responses.
- Validate responses using `cy.wait()` with aliases.

### 5️⃣ **Manage Test Data**
- Use **fixtures** for test data.
- Use **before/beforeEach hooks** for test setup.

---

## 🟠 Example Cypress Tests

### ✅ 1. Basic Test: Visit a Page and Check Title
```javascript
describe('Homepage Test', () => {
  it('should visit homepage and check title', () => {
    cy.visit('https://example.com');
    cy.title().should('include', 'Example Domain');
  });
});
```

### ✅ 2. Form Submission Test
```javascript
describe('Form Submission Test', () => {
  it('should fill out and submit the form', () => {
    cy.visit('/contact');
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#message').type('Hello, this is a test.');
    cy.get('.submit-button').click();
    cy.get('.success-message').should('contain', 'Thank you');
  });
});
```

### ✅ 3. API Testing with `cy.intercept()`
```javascript
describe('API Test', () => {
  it('should intercept the users API', () => {
    cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');
    cy.visit('/users');
    cy.wait('@getUsers').its('response.statusCode').should('eq', 200);
    cy.get('.user-list').should('have.length', 5);
  });
});
```

### ✅ 4. Custom Command for Login
```javascript
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});

// Test
describe('Login Test', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.login('user@example.com', 'password123');
    cy.get('.welcome-message').should('contain', 'Welcome');
  });
});
```

---

## 🟡 Key Interview Questions for Cypress

### 📌 **Basic Level**
1. What is Cypress, and how is it different from Selenium?
2. How does `cy.get()` differ from `cy.find()`?
3. Explain the Cypress command chain mechanism.
4. How does Cypress handle asynchronous operations?

### 📌 **Intermediate Level**
1. How can you stub network responses using `cy.intercept()`?
2. Explain how to use fixtures in Cypress.
3. What are Cypress aliases, and how are they used?
4. Describe the difference between `before`, `beforeEach`, `after`, and `afterEach`.

### 📌 **Advanced Level**
1. How do you handle flaky tests in Cypress?
2. How would you implement Page Object Model (POM) in Cypress?
3. Explain how you would integrate Cypress with a CI/CD pipeline.
4. How can you test file uploads using Cypress?

---

## 🟠 Cypress Configuration Overview
### `cypress.config.js`
```javascript
module.exports = {
  e2e: {
    baseUrl: 'https://example.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: 2,
    setupNodeEvents(on, config) {
      // Implement event listeners
    },
  },
};
```

---

## 🟡 Cypress CI/CD Integration Example
Example of running Cypress tests in GitHub Actions:
```yaml
name: Cypress Tests

on: [push]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: cypress-io/github-action@v2
        with:
          browser: chrome
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:3000'
```

---

## 🟠 Common Cypress Errors and Fixes

| Error                             | Cause                       | Solution                          |
|----------------------------------|----------------------------|----------------------------------|
| `CypressError: Timed out retrying` | Slow page load            | Increase `defaultCommandTimeout` |
| `cy.click()` failed because element is detached | DOM re-rendered           | Use `{force: true}` or `cy.wait()` |
| Network request not intercepted  | Incorrect `cy.intercept()`| Add `cy.wait('@alias')`         |
| Cannot read properties of null   | Element not found         | Add assertion `cy.get().should()`|

---

## 🟡 Key Cypress Plugins and Extensions
- **cypress-axe**: Accessibility testing.
- **cypress-real-events**: Simulate real user events.
- **cypress-file-upload**: File upload testing.
- **cypress-mochawesome-reporter**: Advanced reporting.

---

## 🟠 Conclusion
To ace a Cypress interview:
- **Master Cypress commands and assertions.**
- **Understand the best practices for writing robust tests.**
- **Be ready to demonstrate API testing and custom commands.**
- **Know how to handle flakiness and optimize for performance.**

---
### **How would you test a database for data integrity and related aspects?**

**Answer:**
Testing a database involves validating data integrity, performance, and ensuring the accuracy of operations like CRUD (Create, Read, Update, Delete). Key areas to cover include:

1. **Data Integrity Checks**:

   - Verify constraints (Primary Key, Foreign Key, Unique, Not Null).
   - Ensure data consistency across tables and relationships.
   - Tools: SQL queries (manual checks), tools like DbFit or SQL Server Management Studio (SSMS).

2. **Data Validation**:

   - Validate data after operations (inserts, updates) to ensure correctness.
   - Use SQL queries to cross-check results.

3. **Performance Testing**:

   - Measure query performance, indexing efficiency, and response times.
   - Tools: Apache JMeter (Database testing plugins), DBeaver, and Query Profiler.

4. **Backup and Recovery Testing**:

   - Verify backup procedures and ensure data can be recovered without loss.
   - Tools: Native DB tools like pgAdmin (PostgreSQL), MySQL Workbench, Oracle RMAN.

5. **Migration Testing**:

   - Validate data after migration between databases.
   - Tools: Flyway, Liquibase for version control and migration testing.

6. **ETL Testing**:

   - Ensure correct extraction, transformation, and loading of data.
   - Tools: Talend, Informatica, QuerySurge.

7. **Automation**:
   - Automate repetitive DB testing tasks.
   - Tools: dbUnit (for Java), Pytest with database fixtures, and Katalon.

**Key Checks**:

- Null handling, default values.
- Data truncation checks.
- Referential integrity and foreign key checks.
- Rollback and transaction testing.
- Security checks (roles, permissions).

---

### **How would you automate database testing?**

**Answer:**

Automating database testing ensures efficiency, consistency, and scalability. Here’s how to approach it:

---

### **1. Choose the Right Tools**

- **dbUnit (Java)**: A JUnit extension for managing database state between tests.
- **Pytest + SQLAlchemy (Python)**: Automate tests using database fixtures.

---

### **5 Hard Cypress Questions for a QA Interview**

---

### **How do you handle API requests and responses dynamically in Cypress during UI testing?**

**Answer:**

- Use `cy.intercept()` to stub, spy, or wait for network calls.
- Example:
  ```js
  cy.intercept("GET", "/api/users/*", (req) => {
    req.reply((res) => {
      res.send({ fixture: "user.json" }); // Mock response
    });
  }).as("getUser");
  cy.visit("/profile");
  cy.wait("@getUser").its("response.statusCode").should("eq", 200);
  ```

---

### How can you implement custom Cypress commands for complex actions like login or form submission?

**Answer:**

- Create reusable commands in `cypress/support/commands.js`

```js
Cypress.Commands.add("login", (username, password) => {
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("button[type=submit]").click();
});
```

- Call in tests

```js
cy.login("testuser", "password123");
cy.url().should("include", "/dashboard");
```

---

### How would you handle database state before and after each Cypress test?

**Answer:**

- Use Cypress tasks (`cy.task`) to run backend operations `before/after` tests.
  Example (`plugins/index.js`):

```js
on("task", {
  resetDatabase() {
    // Run DB scripts or APIs to reset data
    return null;
  },
});
```

- Call in tests

```js
beforeEach(() => {
  cy.task("resetDatabase");
});
```

---

### How do you handle flaky tests caused by asynchronous elements in Cypress?

**Answer:**

- Use Cypress's built-in retry mechanism with should or custom waits.
- Example:

```js
cy.get(".notification").should("be.visible");
cy.get(".notification").should("have.text", "Success");
```

- Alternatively, create a utility:

```js
const waitForElement = (selector) => {
  cy.get("body").then(($body) => {
    if ($body.find(selector).length === 0) {
      cy.wait(500);
      waitForElement(selector);
    } else {
      cy.get(selector).should("be.visible");
    }
  });
};
```

---

### How can you run Cypress tests in parallel and what challenges can arise?

**Answer:**

- Use Cypress Dashboard for parallelization

```bash
npx cypress run --record --key <dashboard-key> --parallel
```

- **Challenges:**
  - **Shared State:** Ensure no shared resources are accessed simultaneously.
  - **Flaky Tests:** Parallel runs expose tests dependent on execution order.
  - **Test Splitting:** Cypress splits test files, not individual tests.
- **Solution:**
  - Seed independent data for each test.
  - Tag slow tests for separate pipelines.
  - Use Docker containers for consistent environments.

---

### How do you handle and validate multiple browser tabs or windows in Cypress?

**Answer:**

- Cypress does not support multiple tabs directly, but you can simulate opening links in the same tab:

```js
cy.get('a[target="_blank"]').invoke("removeAttr", "target").click();
```

- For actual multi-tab validation, you need to stub window operations:

```js
cy.window().then((win) => {
  cy.stub(win, "open").as("windowOpen");
});
cy.get("@windowOpen").should("be.calledWith", "/new-page");
```

---

### How would you test file uploads in Cypress, especially for large files?

**Answer:**

- Use `cypress-file-upload` plugin:

```js
cy.get('input[type="file"]').attachFile("large-file.zip");
```

- For large files, ensure backend response handling:

```js
cy.intercept("POST", "/upload", (req) => {
  req.reply((res) => {
    expect(res.statusCode).to.eq(201);
  });
});
```

---

### How do you mock browser geolocation services in Cypress?

**Answer:**

- Mock geolocation using `cy.stub()`:

```js
cy.window().then((win) => {
  cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((cb) => {
    return cb({ coords: { latitude: 37.7749, longitude: -122.4194 } });
  });
});
```

---

### How would you dynamically create test data during a Cypress test run?

**Answer:**

- Use `cy.task` with `Faker.js` or `Chance.js`:

```js
cy.task("generateUser").then((user) => {
  cy.get("#name").type(user.name);
  cy.get("#email").type(user.email);
});
```

- `plugins/index.js`:

```js
const faker = require("faker");
on("task", {
  generateUser() {
    return { name: faker.name.findName(), email: faker.internet.email() };
  },
});
```

---

### How can you test WebSocket connections in Cypress?

**Answer:**

- Cypress doesn’t support WebSockets natively, but you can use cy.request and cy.intercept for REST APIs and stub WebSocket functions.

```js
cy.window().then((win) => {
  cy.stub(win, "WebSocket").callsFake((url) => {
    return new WebSocketMock(url);
  });
});
```

---

### How do you perform visual regression testing with Cypress?

**Answer:**

- Use `cypress-image-snapshot` plugin:

```js
cy.get(".app-container").toMatchImageSnapshot();
```

- **Challenges:**
  - Dynamic content (handle with `cy.wait()` or `cy.clock()`).
  - Responsive designs (test at multiple viewports).

---

### How can you measure page load performance using Cypress?

**Answer:**

- Capture performance metrics with `cy.window()`:

```js
cy.window().then((win) => {
  const perf = win.performance.timing;
  const loadTime = perf.loadEventEnd - perf.navigationStart;
  expect(loadTime).to.be.lessThan(3000);
});
```

### How would you handle OAuth authentication flows in Cypress?

**Answer:**

- Use programmatic login to bypass UI:

```js
cy.request({
  method: "POST",
  url: "/api/auth",
  body: { username: "user", password: "pass" },
}).then((resp) => {
  window.localStorage.setItem("authToken", resp.body.token);
});
```

---

### How do you test iframes in Cypress?

**Answer:**

- Use `cy.iframe()` from` cypress-iframe` plugin:

```js
cy.frameLoaded("#iframeId");
cy.iframe().find("#button").click();
```

---

### How to Handle CAPTCHAs in Cypress?3

**1. Disable CAPTCHAs in Test Environments**

- **Best Practice**: In your testing environment, ask developers to disable CAPTCHAs. This avoids the need to handle them entirely during automated testing.

**2. Use Pre-Authenticated Sessions**

- Automate the flow by bypassing the login with a CAPTCHA by using a pre-authenticated session.

```js
cy.request({
  method: "POST",
  url: "/api/auth",
  body: { username: "testuser", password: "testpassword" },
}).then((response) => {
  window.localStorage.setItem("authToken", response.body.token);
});
cy.visit("/dashboard");
```

**3. Mock CAPTCHA API Calls**

- Mock the CAPTCHA verification API using cy.intercept():

```js
cy.intercept("POST", "/captcha/verify", { success: true }).as("captcha");
cy.get("form").submit();
cy.wait("@captcha").its("response.statusCode").should("eq", 200);
```

**4. Use Test CAPTCHA Keys (Google reCAPTCHA v2/v3)**

- Google provides test keys that always return a successful verification.
- Add the following to your environment:

  - Site Key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
  - Secret Key: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

- Replace your CAPTCHA keys with these keys in the test environment to bypass CAPTCHA checks

---

### **Page Object Model in Cypress**

### **What is POM?**

- **Page Object Model (POM)** is a design pattern in test automation that creates an object repository for web UI elements.
- It helps:
  - Separate test logic from the UI structure.
  - Increase code reusability and maintainability.
  - Make test scripts more readable and maintainable.

```bash
cypress/
   │
   ├── e2e/
   │   ├── loginPage.spec.js
   │   ├── dashboardPage.spec.js
   ├── support/
   │    ├── pageObjects/
   │    │     ├── loginPage.js
   │    │     ├── dashboardPage.js
```

#### **1. Create Page Object for Login Page**

```js
// cypress/support/pageObjects/loginPage.js

class LoginPage {
  elements = {
    usernameInput: () => cy.get("#username"),
    passwordInput: () => cy.get("#password"),
    loginButton: () => cy.get("button[type=submit]"),
  };

  typeUsername(username) {
    this.elements.usernameInput().type(username);
  }

  typePassword(password) {
    this.elements.passwordInput().type(password);
  }

  clickLogin() {
    this.elements.loginButton().click();
  }
}

export default LoginPage;
```

#### **1. Create Page Object for Dashboard Page**

```js
// cypress/support/pageObjects/dashboardPage.js

class DashboardPage {
  elements = {
    welcomeMessage: () => cy.get(".welcome-banner"),
    logoutButton: () => cy.get("#logout"),
  };

  verifyWelcomeMessage(message) {
    this.elements.welcomeMessage().should("contain.text", message);
  }

  clickLogout() {
    this.elements.logoutButton().click();
  }
}

export default DashboardPage;
```

#### Login Test with POM:

```js
// cypress/e2e/loginPage.spec.js
import LoginPage from "../support/pageObjects/loginPage";

describe("Login Test using POM", () => {
  const loginPage = new LoginPage();

  it("should login successfully", () => {
    cy.visit("/login");
    loginPage.typeUsername("testuser");
    loginPage.typePassword("password123");
    loginPage.clickLogin();
    cy.url().should("include", "/dashboard");
  });
});
```

#### Best Practices for POM in Cypress

- Create a separate class for each page.
- Expose all elements as functions to avoid stale element references.
- Implement reusable methods for actions like `login()`, `logout()`, `navigateToPage()`.
- Keep page objects clean and focused only on the UI, not on assertions or test logic.
- Import page objects into Cypress tests as needed.

---

### **CSS Selectors in Cypress**

| Selector Type           | Syntax                   | Example           | Description                                     |
| ----------------------- | ------------------------ | ----------------- | ----------------------------------------------- |
| **ID Selector**         | `#id`                    | `#login-button`   | Selects an element by its unique ID.            |
| **Class Selector**      | `.class`                 | `.btn-primary`    | Selects elements with a specific class.         |
| **Tag Selector**        | `tagname`                | `button`          | Selects all elements of a given type.           |
| **Attribute Selector**  | `[attribute=value]`      | `[type="submit"]` | Selects elements with specific attribute value. |
| **Child Selector**      | `parent > child`         | `div > p`         | Selects direct children of an element.          |
| **Descendant Selector** | `ancestor descendant`    | `form input`      | Selects all descendants of an element.          |
| **Nth-Child Selector**  | `:nth-child(n)`          | `tr:nth-child(2)` | Selects the nth child of a parent element.      |
| **Pseudo-Class**        | `:hover`, `:first-child` | `button:hover`    | Selects elements based on their state.          |

---

### **XPath Selectors in Cypress**

| Selector Type       | Syntax                           | Example                               | Description                                            |
| ------------------- | -------------------------------- | ------------------------------------- | ------------------------------------------------------ |
| **Basic XPath**     | `//tagname`                      | `//button`                            | Selects all elements with that tag.                    |
| **Attribute XPath** | `//tag[@attr='value']`           | `//input[@type='text']`               | Selects elements with a specific attribute.            |
| **Text XPath**      | `//tag[text()='text']`           | `//h1[text()='Login']`                | Selects elements containing specific text.             |
| **Contains XPath**  | `//*[contains(@attr,'val')]`     | `//button[contains(text(),'Submit')]` | Selects elements containing partial text or attribute. |
| **Sibling XPath**   | `//tag1/following-sibling::tag2` | `//h1/following-sibling::p`           | Selects siblings that follow a specific element.       |
| **Parent XPath**    | `//tag/..`                       | `//span/..`                           | Selects the parent of a specific element.              |
| **Index XPath**     | `(//tag)[n]`                     | `(//button)[2]`                       | Selects the nth element in a list.                     |

---

### **CSS vs XPath: Comparison**

| Feature             | CSS Selectors                    | XPath Selectors                  |
| ------------------- | -------------------------------- | -------------------------------- |
| **Syntax**          | Simpler and cleaner              | More complex, verbose            |
| **Browser Support** | Supported in all modern browsers | Supported but slower             |
| **Performance**     | Faster for most operations       | Slower due to complex parsing    |
| **Axes Support**    | No                               | Yes (parent, sibling, etc.)      |
| **Readability**     | Easier to read and maintain      | Harder to read for complex paths |
| **Best for**        | Most web elements and attributes | Complex DOM and dynamic elements |

---

### **Best Practices for Selectors in Cypress**

1. **Prefer CSS over XPath**: Cypress recommends using CSS selectors for simplicity and performance.
2. **Use `data-*` attributes**: Add `data-cy` or `data-test` attributes in the app for stable selectors.

```html
<button data-cy="submit-btn">Submit</button>
```

3. **Avoid relying on fragile selectors:**

- Avoid selectors like nth-child, :eq(), or div > p that can break with minor DOM changes.

4. **Use Cypress commands:**

- `cy.contains()` for elements with text.
- `cy.get()` for selecting elements by CSS.

5. **Handling Dynamic Elements:**

- Use `cy.wait()` or `cy.intercept()` for elements that load asynchronously.

6. **Create Custom Commands:**

- Encapsulate complex selectors in `Cypress.Commands.add()` for reusability.

---

### **Hooks in Cypress**

Hooks in Cypress are similar to those in other testing frameworks like Mocha or Jest. They help you set up preconditions and clean up after tests, making your test suites efficient and maintainable.

### **Types of Cypress Hooks**

| Hook         | Description                                             | Usage Example                                      |
| ------------ | ------------------------------------------------------- | -------------------------------------------------- |
| `before`     | Runs **once** before all tests in the `describe` block. | Set up data, initialize state, or log in once.     |
| `beforeEach` | Runs **before each** test in the `describe` block.      | Reset app state, seed data, or clear cookies.      |
| `after`      | Runs **once** after all tests in the `describe` block.  | Clean up resources, log out, or close connections. |
| `afterEach`  | Runs **after each** test in the `describe` block.       | Clear local storage, cookies, or reset mocks.      |

---

### **Cypress Hook Examples**

```js
describe("Cypress Hooks Example", () => {
  before(() => {
    // Runs once before all tests
    cy.log("Before all tests – Setting up...");
    cy.visit("/login");
    cy.get("#username").type("testuser");
    cy.get("#password").type("password");
    cy.get("button[type=submit]").click();
  });

  beforeEach(() => {
    // Runs before each test
    cy.log("Before each test – Resetting state...");
    cy.reload();
  });

  it("should display dashboard after login", () => {
    cy.url().should("include", "/dashboard");
    cy.get(".welcome-banner").should("contain.text", "Welcome");
  });

  it("should allow user to log out", () => {
    cy.get("#logout").click();
    cy.url().should("include", "/login");
  });

  afterEach(() => {
    // Runs after each test
    cy.log("After each test – Clearing cookies...");
    cy.clearCookies();
  });

  after(() => {
    // Runs once after all tests
    cy.log("After all tests – Cleaning up...");
  });
});
```

**Why Use Hooks in Cypress?**

- **Setup once, run many times:** Avoid repetitive setup code in each test.
- **Isolate tests:** Reset state before each test to avoid cross-test pollution.
- **Cleanup after tests:** Ensure no side effects remain after tests run.
  Reusable across multiple test suites.

**Common Use Cases for Hooks in Cypress**
| Hook |Common Use Cases |
|-------------|-------------------------------------------------------|
|`before` |Seed database, log in a user, set environment configs.|
|`beforeEach`| Clear cookies, reset app state, stub network requests.|
|`afterEach`| Clear local storage, remove test data, log results.|
|`after` |Close database connections, log out, clean up files.|

### **How to Deal with Flaky Tests in Cypress**

---

### **What Are Flaky Tests?**
- Flaky tests are tests that pass and fail intermittently without any changes to the codebase.
- Common causes include:
  - Asynchronous operations (API responses, animations).
  - Dynamic elements (lazy loading, SPAs).
  - Network delays or timeouts.
  - Shared state between tests.
  - Poorly written test logic.


### **Common Causes of Flaky Tests and Solutions**

| **Cause**                        | **Solution**                                               |
|----------------------------------|------------------------------------------------------------|
| **Asynchronous operations**       | Use `cy.wait()`, `cy.intercept()`, or `cy.clock()` to control timeouts and waits. |
| **Dynamic elements (lazy load)** | Use `cy.get()` with `{ timeout: 10000 }` to wait for elements. |
| **Network delays**               | Mock API responses with `cy.intercept()` for faster, stable tests. |
| **Animation delays**             | Disable animations during tests by adding global CSS or using `cy.visit(url, { disableCSSAnimations: true })`. |
| **Stale elements**               | Use `.should()` for retries, e.g., `cy.get('.btn').should('be.visible').click();` |
| **Shared state**                 | Reset the state with `beforeEach()` and `afterEach()` hooks. |


**Best Practices to Avoid Flaky Tests**
- **Avoid hardcoded waits** `(cy.wait(5000))` – use dynamic waits with `cy.intercept()` and `cy.wait('@alias')`.
- **Use test IDs** – Add `data-cy` attributes for stable selectors.
- **Clear state between tests** – Use `cy.clearCookies()` and `cy.clearLocalStorage()` in `afterEach`.
- **Run tests in isolation** – Avoid shared state across tests.
- **Use `.should()` for assertions** – It retries until the condition is met.
- **Disable animations during tests** – Speed up tests and avoid timing issues.
---

Good luck with your interview! 🚀
