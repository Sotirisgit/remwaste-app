# RemWaste Application - Test Plan with Cypress

## Overview
This document outlines the testing strategy for the RemWaste application, using a React frontend with Node.js backend API.

- Frontend: https://remwaste-frontend.onrender.com
- Backend API: https://remwastebackend.onrender.com

## 1. What Is Being Tested

### Frontend React App
- **Authentication**: Login with valid/invalid credentials, logout functionality
- **Item Management**: Create, read, update, delete operations through the UI
- **Navigation**: Route protection and redirection logic

### Backend Node.js API
- **Authentication Endpoint**: POST /login with various credential scenarios
- **Item CRUD Operations**: 
  - GET /items (retrieve all items)
  - POST /items (create new item)
  - PUT /items/:id (update existing item)
  - DELETE /items/:id (remove item)
- **Authorization**: Token-based access control for protected endpoints
- **Error Handling**: Proper HTTP status codes and error responses

## 2. Test Coverage Areas

### a. Functional Testing
- Checked login, logout, and handling of wrong or missing inputs  
- Ensured users can only access data with valid tokens  
- Validated required fields and empty input handling  
- Simulated issues like network errors, invalid IDs, or missing data  

### b. UI Automation Testing
- Covered full user flows, from login to item management  
- Tested on different browsers for compatibility  
- Verified form behavior, button clicks, and keyboard navigation  
- Confirmed that all expected UI elements and messages are visible  

### c. API Integration Testing
- Tested all CRUD operations using proper HTTP methods  
- Checked request and response structure and data accuracy  
- Verified correct status codes for both success and error cases  
- Tested login tokens, including generation, validation, and expiration handling  

## 3. Tools Used and Why

### UI Automation: Cypress
For UI automation, I chose Cypress because it is a modern, developer-friendly testing framework that allows real browser testing with automatic waiting. It offers excellent debugging capabilities, including time-travel features, and comes with built-in support for screenshots and video recording. Additionally, Cypress has strong community support and thorough documentation, making it a reliable and efficient choice for end-to-end testing.

### Configuration
- The app was deployed on **Render**, so tests are configured to run against the live URL instead of just local development  
- Reusable test logic was organized using **custom commands** (e.g., login, create item) 
- Used a **Page Object Model** structure to keep the tests organized and easy to maintain

### API Testing: Jest + Supertest
- **Jest** was used for running the tests and assertions  
- **Supertest** was used to test API endpoints with real HTTP requests  
- Easy to set up and works great with **Node.js** apps
- Tests include clear reporting and support for checking code coverage

## Test Execution

### Running Tests Locally

#### Prerequisites
```bash
# Install dependencies
npm install

# For UI tests - start the React application
npm start
```

#### UI Tests (Cypress)
```bash
# Interactive mode (recommended for development)
npm run cypress:open

# Headless mode (for CI/CD)
npm run test:e2e
```

#### API Tests (Jest)
```bash
# Run all API tests
npm run test:api

# Run specific test file
npx jest tests/api/auth.test.js

# Watch mode for development
npm run test:api:watch
```

#### All Tests
```bash
# Run both UI and API tests
npm run test:all
```

Test Data Management

  - API Tests: I use timestamps in test data so tests don't conflict with each other
  - UI Tests: Clear browser storage before each test to start fresh
  - Login Info: All tests use username: remwaste, password: 12345

  Test Results Summary

  API Tests (20 total)
  Login Tests (7): Testing login with good/bad passwords, missing fields, etc
  Item Tests (12): Testing create, read, update, delete for items
  Full Workflow (1): Testing the complete user journey

  UI Tests
  = Login: Testing login forms, error messages, logout button
  - Item Management: Testing add/edit/delete buttons through the website
  - Page Navigation: Making sure users can't access pages without logging in
  - Error Messages: Checking that error messages show up correctly

  Problems/Limitations

  - Data Cleanup: The tests create data but don't delete it afterward
  - Running Tests Together: If someone else runs tests at the same time, they might interfere
  - Only Works Online: Tests fail if the backend server is down
  - Browser Support: Only tested on Chrome-like browsers
  - Tested on pc chrome browser only

  Future work

  - Add cleanup so tests don't leave junk data behind
  - Test on Firefox and Safari too
  - Add some performance tests to see how fast the API is
  - Test what happens with lots of users at once
  - Make sure the app works with screen readers
  - Test security stuff like SQL injection

**Date**: July 2025
