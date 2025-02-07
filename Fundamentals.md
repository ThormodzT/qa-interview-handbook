# Software Testing Fundamentals

## What is the software testing life cycle? Explain each step in the cycle.

The **Software Testing Life Cycle (STLC)** is a structured process for testing a software application, including the following stages:

1. **Requirement Analysis** - Understanding test requirements.
2. **Test Planning** - Defining scope, resources, schedule, and strategy.
3. **Test Case Development** - Writing and reviewing test cases.
4. **Test Environment Setup** - Preparing test infrastructure.
5. **Test Execution** - Running test cases and reporting defects.
6. **Test Closure** - Evaluating test results and creating summary reports.

## What is a bug?

An error, flaw, or fault in a software application that causes it to behave unexpectedly or incorrectly.

## What is testware?

Testware refers to all materials created for testing, including test cases, scripts, data, reports, and tools.

## Can you explain the general stages of a defect/bug life cycle?

1. **New** - A defect is reported.
2. **Assigned** - The defect is assigned to a developer.
3. **Open** - Developer starts investigation.
4. **Fixed** - Developer resolves the issue.
5. **Pending Re-test** - Sent to QA for verification.
6. **Re-test** - QA verifies the fix.
7. **Reopen** - If the defect persists, it's reopened.
8. **Verified** - If the defect is fixed, it's verified.
9. **Closed** - The defect is marked as resolved.

## What is the difference between verification and validation?

- **Verification** - Checks if the product meets requirements before testing.
- **Validation** - Ensures the product works as expected after development through testing.

## What is the difference between severity and priority?

- **Severity** - Defines the impact of the defect on the system's functionality.
- **Priority** - Determines the urgency of fixing the defect based on business needs.

## When should QA start?

QA should start as early as possible in the software development life cycle (SDLC). Engaging QA in the **requirement analysis** and **design phases** helps identify defects early, reducing costs and improving quality.

## What is a use case?

A **use case** is a detailed description of how a user interacts with a system to achieve a specific goal. It includes:
- Actors (users or systems interacting with the application)
- Preconditions
- Main flow (normal process)
- Alternate flows (variations of the main flow)
- Postconditions

## When you find a bug in production, how do you ensure the bug gets resolved?

1. **Log the issue** with clear steps to reproduce.
2. **Assign priority and severity** to the defect.
3. **Investigate root cause** with developers.
4. **Fix and test** in a controlled environment.
5. **Deploy hotfix** with minimal disruption.
6. **Perform post-mortem analysis** to prevent recurrence.

## What are some of the most common technical problems in software testing?

- **Flaky tests** - Inconsistent test results.
- **Slow tests** - Inefficient automation scripts.
- **Poor test data management** - Outdated or missing data.
- **Inadequate test coverage** - Missing test cases for critical features.
- **Unstable environments** - Flaky tests due to infrastructure issues.

## What are defect triage meetings?

These are discussions where teams prioritize, assign, and decide the severity and resolution of reported defects.

## How do you ensure that test cases are comprehensive and cover all possible scenarios?

- Cover positive, negative, edge cases, and exception scenarios.
- Align tests with business requirements and user stories.
- Use **Boundary Value Analysis** (testing min/max values, valid/invalid inputs).
- Use **Equivalent Partitioning** (dividing input domains into equivalent classes to catch potential errors).

## What are the key components of a good test case?

- Unique identifier
- Description
- Preconditions
- Steps
- Expected result
- Actual result
- Pass/Fail status

## How do you prioritize test cases for execution?

- **Risk-based approach** - Focus on critical functionalities.
- **Business impact** - Prioritize high-visibility features.
- **Defect-prone areas** - Test modules with a history of failures.
- **Regulatory requirements** - Compliance-related test cases.

## Compare black-box testing vs. white-box testing.

- **Black-box testing** - Focuses on functionality without knowing internal code.
- **White-box testing** - Involves testing internal structures, logic, and code paths.

## What is the difference between boundary testing and branch testing?

- **Boundary testing** - Verifies input limits (min/max values).
- **Branch testing** - Ensures all decision paths in the code execute at least once.

## What is the difference between TDD and BDD?

- **TDD (Test-Driven Development)** - Write tests first, then code. Focuses on unit tests.
- **BDD (Behavior-Driven Development)** - Write scenarios in plain language (Gherkin). Focuses on business behavior.

## What is the difference between manual testing and automated testing?

- **Manual testing** - Test cases are executed manually. Best for exploratory and usability testing.
- **Automated testing** - Uses scripts/tools to run tests repeatedly.

## Should teams move from manual testing to automated testing?

Yes, but selectively. Automation is ideal for repetitive, stable tests, while manual testing is essential for exploratory and usability tests. A hybrid approach ensures efficiency.

---

This document provides a foundational understanding of software testing concepts, critical for interview preparation and real-world testing challenges.
