# RemWaste Application - Test Plan & Strategy

## Overview
This document outlines the testing strategy for the RemWaste application, a React frontend with Node.js backend API for item management functionality.

**Application URLs:**
- Frontend: https://remwaste-frontend.onrender.com
- Backend API: https://remwastebackend.onrender.com

## What Is Being Tested

### Frontend (React Application)
- **Authentication Flow**: Login with valid/invalid credentials, logout functionality
- **Item Management**: Create, read, update, delete operations through the UI
- **Navigation**: Route protection and redirection logic
- **User Experience**: Form validations, error handling, data persistence

### Backend (Node.js API)
- **Authentication Endpoint**: POST /login with various credential scenarios
- **Item CRUD Operations**: 
  - GET /items (retrieve all items)
  - POST /items (create new item)
  - PUT /items/:id (update existing item)
  - DELETE /items/:id (remove item)
- **Authorization**: Token-based access control for protected endpoints
- **Error Handling**: Proper HTTP status codes and error responses

## Test Coverage Areas

### 1. Functional Testing
- **Authentication**: Valid login, invalid credentials, missing fields, logout
- **Authorization**: Access control with/without valid tokens
- **CRUD Operations**: Complete item lifecycle management
- **Data Validation**: Input validation for required fields, empty values
- **Error Scenarios**: Network failures, invalid IDs, non-existent resources

### 2. UI Automation Testing
- **User Workflows**: End-to-end user journeys from login to item management
- **Cross-browser Compatibility**: Testing across different browser environments
- **Form Interactions**: Input field behavior, button clicks, keyboard navigation
- **Visual Validation**: Presence of expected UI elements and messages

### 3. API Integration Testing
- **HTTP Methods**: Testing all CRUD operations with proper HTTP verbs
- **Request/Response Validation**: Payload structure and data integrity
- **Status Code Verification**: Correct HTTP responses for success/error cases
- **Authentication Flow**: Token generation, validation, and expiration handling

## Tools Used and Rationale

### UI Automation: Cypress
**Why Cypress:**
- Modern, developer-friendly testing framework
- Real browser testing with automatic waiting
- Excellent debugging capabilities with time-travel
- Built-in screenshots and video recording
- Strong community support and documentation

**Configuration:**
- Base URL: Configured for both local development and production deployment
- Custom commands for reusable test logic (login, item creation)
- Page Object Model approach for maintainable test structure

### API Testing: Jest + Supertest
**Why Jest + Supertest:**
- Jest: Mature testing framework with excellent assertion library
- Supertest: HTTP assertion library specifically designed for API testing
- Great integration for Node.js applications
- Comprehensive test reporting and coverage options
- Easy setup and configuration

**Test Structure:**
- Separate test files for authentication and item operations
- Setup/teardown hooks for test data management
- Integration tests covering complete CRUD workflows

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

### Test Data Management
- **API Tests**: Use dynamic test data with timestamps to avoid conflicts
- **UI Tests**: Clean localStorage before each test to ensure isolation
- **Authentication**: Shared test credentials (username: remwaste, password: 12345)

## Test Results Summary

### API Tests (20 total)
✅ **Authentication Tests (7)**: Login scenarios, validation, error handling  
✅ **Items CRUD Tests (12)**: All HTTP methods with positive/negative cases  
✅ **Integration Test (1)**: Complete workflow validation  

### UI Tests (Multiple scenarios)
✅ **Login Tests**: Valid/invalid credentials, form validation, logout  
✅ **Item Management**: Create, edit, delete operations with assertions  
✅ **Navigation**: Route protection and dashboard access  
✅ **Error Handling**: Network errors and user feedback  

## Assumptions and Limitations

### Assumptions
- Backend API is deployed and accessible at https://remwastebackend.onrender.com
- Test environment has stable network connectivity
- Authentication token has sufficient validity for test execution
- Test data can be created/modified without affecting production users

### Limitations
- **Test Data Isolation**: Tests create real data in the backend system
- **Concurrent Execution**: Multiple test runs may interfere with each other
- **External Dependencies**: Tests depend on live backend service availability
- **Browser Coverage**: Cypress tests run on Chromium-based browsers by default
- **Mobile Testing**: Current tests focus on desktop web interface

### Known Issues
- API returns 403 instead of 401 for missing authentication (tests adjusted accordingly)
- Backend allows whitespace-only item names (documented in tests)
- No cleanup mechanism for test data created during API testing

## Future Enhancements

### Short Term
- Add test data cleanup procedures
- Implement parallel test execution
- Add visual regression testing
- Extend browser coverage for UI tests

### Long Term
- Performance testing for API endpoints
- Security testing for authentication vulnerabilities
- Accessibility testing for UI compliance
- Load testing for concurrent user scenarios

## Maintenance

### Test Maintenance Schedule
- **Weekly**: Review test results and update failing tests
- **Monthly**: Update test data and validate test environment
- **Release Cycle**: Full regression testing before deployments
- **Quarterly**: Review and update test strategy documentation

### Contact Information
For questions regarding test execution or maintenance, please refer to the README.md file for setup instructions or contact the development team.

---

**Document Version**: 1.0  
**Last Updated**: July 2025  
**Next Review**: August 2025