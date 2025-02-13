
# 🧪 **API & Web Services Testing – Full Interview Guide with Jest & Cypress Examples**  

## 🧐 **Introduction:**  
> *"Ever typed `curl` in a terminal and felt like you were hacking the Pentagon? Well, here you’ll learn how to do it properly."*  

This is your complete API Testing guide for QA interviews, packed with key concepts, strategies, and real JavaScript examples using **Jest** and **Cypress**.  

---

# 🧩 **Key Concepts in API Testing Explained:**  

## 💡 **1. How Does an API Work?**  
- **Client:** Sends a request (like asking for a pizza).  
- **Server:** Processes the request (cooks the pizza).  
- **Response:** Returns the result (delivers the pizza).  

### 📞 **Request Anatomy:**  
- **Method:** What you want to do (e.g., `GET`, `POST`, `PUT`, `DELETE`).  
- **URL:** Where to send the request (e.g., `https://api.example.com/users`).  
- **Headers:** Extra information (e.g., `Authorization`, `Content-Type`).  
- **Body:** Data sent with the request (e.g., user info for registration).  

### 📤 **Response Anatomy:**  
- **Status Code:** Indicates success or error (`200`, `404`, `500`).  
- **Headers:** Metadata about the response (e.g., `Content-Type`).  
- **Body:** The requested data (e.g., user profile in JSON).  

---

## 🗺️ **2. Strategies for Test Data in API Testing:**  
- **Static Data:** Hardcoded values for predictable results.  
- **Dynamic Data:** Generated at runtime (e.g., using UUIDs).  
- **Parameterized Tests:** Running the same test with different inputs.  
- **Data Mocks:** Simulating responses from third-party services.  
- **Database Seeding:** Preloading the database with test data.  

**Example (Jest):** Generate dynamic user data:  
```javascript
const { v4: uuidv4 } = require('uuid');
const testUser = {
  id: uuidv4(),
  name: 'John Doe',
  email: \`user\${uuidv4()}@example.com\`
};
console.log(testUser);
```

---

## 🕒 **3. Understanding Latency in API Testing:**  
- **What is Latency?** The time taken between sending a request and receiving a response.  
- **Why Test It?** Slow APIs degrade user experience.  
- **How to Measure:** Use tools like `Postman`, `JMeter`, or `Cypress` with timers.  

**Example (Jest):** Measure response time for a `/status` endpoint:  
```javascript
test('API should respond within 300ms', async () => {
  const start = Date.now();
  const response = await fetch('https://api.example.com/status');
  const duration = Date.now() - start;

  expect(response.status).toBe(200);
  expect(duration).toBeLessThan(300);
});
```

---

## 📑 **4. API Specification Review:**  
- **What is API Specification?** A document defining how the API behaves. (e.g., using OpenAPI or Swagger)  
- **Why Review It?** To ensure endpoints, methods, and responses match business requirements.  
- **How to Review:**  
  - Verify URL structures and methods.  
  - Validate request and response schemas.  
  - Ensure proper status codes and error handling.  

---

## 📊 **5. What is the Approach Followed in API Testing?**  

### ✅ **Step 1: Define Test Scenarios**  
- Positive Tests (valid inputs)  
- Negative Tests (invalid inputs)  
- Boundary Tests (extreme values)  
- Security Tests (e.g., unauthorized access)  
- Performance Tests (high load scenarios)  

### ✅ **Step 2: Prepare Test Data**  
- Create datasets for valid, invalid, and edge cases.  
- Mock third-party services where necessary.  

### ✅ **Step 3: Execute Tests**  
- Use tools like **Postman** for manual tests.  
- Use **Jest**, **Cypress**, or **RestAssured** for automated tests.  

### ✅ **Step 4: Validate Responses**  
- Check status codes and headers.  
- Verify response body matches expected schema.  
- Ensure proper error handling.  

### ✅ **Step 5: Analyze and Report Results**  
- Track success/failure rates.  
- Monitor response times and errors.  
- Log defects for failed scenarios.  

---

# 💻 **Examples of API Tests Using JavaScript:**

### 🧪 **Example 1: API Test with Jest**  
**Scenario:** Test a `GET /users` endpoint to ensure it returns a list of users with status 200.  
```javascript
const fetch = require('node-fetch');

test('GET /users should return status 200 and a list of users', async () => {
  const response = await fetch('https://api.example.com/users');
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
});
```

### 🧪 **Example 2: API Test with Cypress**  
**Scenario:** Test a `POST /login` endpoint for successful login and token validation.  
```javascript
describe('API Test: User Login', () => {
  it('should login and receive a valid token', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.example.com/login',
      body: {
        username: 'testuser',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.match(/^eyJ/); // Basic JWT check
    });
  });
});
```

---

# 🧠 **Answers to Key API Testing Interview Questions:**

### **1. What is REST?**  
REST (Representational State Transfer) is an architectural style for designing APIs using standard HTTP methods.  

### **2. What is a RESTful Web Service?**  
A web service that follows REST principles, using URLs to access resources and HTTP methods for actions.  

### **3. What is a “Resource” in REST?**  
Any entity that can be accessed or manipulated via an API (e.g., Users, Orders).  

### **4. Key Characteristics of REST:**  
- Statelessness  
- Client-Server Architecture  
- Cacheability  
- Uniform Interface  
- Layered System  

### **5. Commonly Used HTTP Methods in REST:**  
- `GET`: Retrieve data  
- `POST`: Create data  
- `PUT`: Update data  
- `DELETE`: Remove data  

### **6. Difference Between PUT and POST:**  
- **PUT**: Replaces a resource (idempotent).  
- **POST**: Creates a new resource (non-idempotent).  

### **7. Major Challenges in API Testing:**  
- Managing authentication and authorization.  
- Handling different input-output combinations.  
- Ensuring backward compatibility.  
- Validating error handling and response consistency.  

### **8. Best Approach for API Testing:**  
- Develop clear test cases for each endpoint.  
- Use automated testing for regression.  
- Perform load testing for performance checks.  
- Validate security with authorization tests.  

### **9. What to Check When Performing API Testing:**  
- Status Codes  
- Response Body and Schema  
- Headers  
- Error Messages  
- Security and Rate Limits  

### **10. Common Protocols in API Testing:**  
- HTTP/HTTPS  
- SOAP  
- GraphQL  
- gRPC  

### **11. Principles of API Test Design:**  
- Positive and Negative Testing  
- Boundary Value Analysis  
- Data-Driven Testing  
- Security and Performance Testing  

### **12. How Does an API Work?**  
- Client sends a request with URL, headers, and body.  
- Server processes the request and interacts with databases or services.  
- Server sends back a response with status, headers, and body.  

### **13. What Do URIs and Headers Do in an API?**  
- **URIs:** Identify resources (e.g., `/users/123`).  
- **Headers:** Provide metadata (e.g., `Content-Type`, `Authorization`).  

### **14. Limits of API Usage:**  
- Rate Limits (`429 Too Many Requests`)  
- Quotas (e.g., 10,000 requests per month)  
- Timeouts (maximum response time)  

### **15. Main Differences Between API and Web Service:**  
| Aspect            | API                       | Web Service              |
|-------------------|--------------------------|-------------------------|
| **Communication** | Application-to-Application | Web-based Communication |
| **Protocols**     | Any (HTTP, WebSockets)   | Mainly HTTP, SOAP, REST |
| **Use Case**      | Broader (e.g., SDKs)    | Focused on web-based apps |

### **16. What is Contract Testing?**  
Contract testing ensures that an API’s request and response structures meet expectations.  

### **17. Tools Used for API Testing:**  
- **Postman:** Manual and automated testing  
- **RestAssured:** Java-based automation  
- **Cypress:** E2E with API support  
- **Karate:** BDD framework  
- **SoapUI:** SOAP and web service testing  

### **18. Handling Authentication in API Tests:**  
- **API Keys:** Simple header tokens  
- **OAuth 2.0:** Industry standard for secure authorization  
- **JWT:** Secure token-based authentication  
- **Basic Auth:** Username and password in headers  

### **19. Validating API Stability with Automated Testing:**  
- Use **CI/CD pipelines** to run tests on every code change.  
- Implement **stress testing** for performance.  
- Conduct **chaos testing** to simulate unexpected failures.  

### **20. Types of Validations in Automated API Testing:**  
- Schema Validation (Verify response structures)  
- Status Code Validation (Check correct responses)  
- Header Validation (Check required headers)  
- Response Time Validation (Ensure fast performance)  

### **21. Handling Dependencies with Dynamic Data:**  
- Use **Pre-request Scripts** to generate tokens or IDs.  
- **Mock APIs** to simulate third-party services.  
- Chain requests to pass data between endpoints.  

### **22. What is REST Assured?**  
A Java library for automated API testing using a **Given-When-Then** syntax.  

### **23. Handling Error Responses or Exceptions in API Testing:**  
- Validate proper error status codes (`400`, `401`, `404`, `500`).  
- Check error message formats.  
- Log errors for debugging.  
- Ensure rate-limit behavior (`429 Too Many Requests`).  

---
