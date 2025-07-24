# RemWaste - Item Management Application

[![Tests](https://github.com/Sotirisgit/remwaste-app/actions/workflows/test.yml/badge.svg)](https://github.com/Sotirisgit/remwaste-app/actions/workflows/test.yml)
[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://remwaste-frontend.onrender.com)

A full-stack web application for managing items with automated testing suite. Built with React frontend and Node.js backend, featuring comprehensive UI and API test automation with CI/CD pipeline.

## 🚀 Live Application

- **Frontend**: https://remwaste-frontend.onrender.com
- **Backend API**: https://remwastebackend.onrender.com

## 📋 Application Features

- **User Authentication**: Secure login/logout functionality
- **Item Management**: Create, read, update, and delete items
- **Real-time Updates**: Dynamic UI updates without page refresh
- **Responsive Design**: Works on desktop and mobile devices
- **JWT Authentication**: Token-based API security

### Demo Credentials
- **Username**: `remwaste`
- **Password**: `12345`

## 🧪 Testing Suite

This project includes comprehensive automated testing:

### UI Automation (Cypress)
- ✅ Login/logout scenarios with valid/invalid credentials
- ✅ Item CRUD operations through the user interface
- ✅ Form validation and error handling
- ✅ Navigation and route protection

### API Automation (Jest + Supertest)
- ✅ Authentication endpoint testing
- ✅ All CRUD API endpoints with positive/negative cases
- ✅ Authorization and token validation
- ✅ Integration workflows

**Test Coverage**: 20+ API tests, Multiple UI scenarios

## ⚡ Quick Start (< 2 minutes)

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### 1. Clone and Install
```bash
git clone https://github.com/Sotirisgit/remwaste-app.git
cd remwaste-app
npm install
```

### 2. Run Tests

#### API Tests (No additional setup required)
```bash
npm run test:api
```

#### UI Tests
```bash
# Terminal 1: Start the React app
npm start

# Terminal 2: Run Cypress tests
npm run cypress:open
# OR headless mode
npm run test:e2e
```

#### All Tests
```bash
npm start  # Keep this running
npm run test:all  # In another terminal
```

## 📁 Project Structure

```
remwaste-app/
├── src/
│   ├── pages/
│   │   ├── Login.js          # Login component
│   │   └── Dashboard.js      # Main dashboard with CRUD
│   ├── App.js               # Main app with routing
│   └── index.js             # App entry point
├── tests/
│   └── api/                 # API test files
│       ├── auth.test.js     # Authentication tests
│       └── items.test.js    # Items CRUD tests
├── cypress/
│   ├── e2e/                 # UI test files
│   │   ├── login.cy.js      # Login scenarios
│   │   └── items-crud.cy.js # Item management tests
│   └── support/
│       └── commands.js      # Custom Cypress commands
├── TEST_PLAN.md             # Comprehensive test strategy
└── README.md               # This file
```

## 🛠 Available Scripts

### Development
```bash
npm start                    # Run React app locally (localhost:3000)
npm run build               # Build for production
```

### Testing
```bash
npm run test:api            # Run API tests with Jest
npm run test:api:watch      # API tests in watch mode
npm run test:api:coverage   # API tests with coverage report
npm run cypress:open        # Open Cypress UI for interactive testing
npm run test:e2e           # Run UI tests headlessly
npm run test:all           # Run both API and UI tests
npm run test:all:coverage  # Run all tests with coverage
```

## 🔧 Configuration

### Cypress Configuration
- **Base URL**: Configurable for local/production testing
- **Custom Commands**: Reusable test utilities
- **Environment Variables**: Backend URL configuration

### API Testing
- **Test Environment**: Node.js with Jest
- **HTTP Client**: Supertest for API requests
- **Timeout**: 30 seconds for API calls
- **Target**: Live backend at remwastebackend.onrender.com

## 📊 Test Execution Results

### Recent Test Results
```
API Tests: 20 passed, 0 failed
- Authentication: 7 tests
- Items CRUD: 12 tests  
- Integration: 1 test

UI Tests: All scenarios passing
- Login flows
- Item management
- Error handling
- Navigation
```

## 🏗 Architecture

### Frontend (React)
- **Framework**: Create React App
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect)
- **Authentication**: JWT tokens in localStorage

### Backend (Node.js)
- **Framework**: Express.js
- **Authentication**: JWT-based
- **Database**: SQLite/PostgreSQL (deployed)
- **CORS**: Enabled for frontend communication

### Testing Stack
- **UI Testing**: Cypress (E2E automation)
- **API Testing**: Jest + Supertest
- **Test Reports**: Built-in Jest/Cypress reporting
- **Code Coverage**: Jest coverage reports with HTML/LCOV output
- **CI/CD**: GitHub Actions pipeline with automated testing

## 🚨 Troubleshooting

### Common Issues

**1. Cypress tests fail to load**
```bash
# Ensure React app is running first
npm start
# Then run Cypress in another terminal
npm run cypress:open
```

**2. API tests timeout**
```bash
# Check if backend is accessible
curl https://remwastebackend.onrender.com/items
# Should return: {"error":"No token provided"}
```

**3. Port already in use**
```bash
# Kill process on port 3000
npx kill-port 3000
npm start
```

### Environment Variables
The application uses these configurations:
- **Frontend URL**: https://remwaste-frontend.onrender.com
- **Backend URL**: https://remwastebackend.onrender.com
- **Test Timeout**: 30 seconds

## 🚀 CI/CD Pipeline

This project includes a comprehensive GitHub Actions pipeline that runs on every push and pull request:

### Pipeline Jobs
- **API Tests**: Jest/Supertest tests with coverage reporting
- **UI Tests**: Cypress E2E tests with video/screenshot capture
- **Code Quality**: Coverage analysis and reporting
- **Deployment Check**: Health checks for live frontend/backend
- **Test Summary**: Consolidated results and artifacts

### Viewing Results
- Check the **Actions** tab in GitHub for detailed test results
- Coverage reports are uploaded as artifacts
- Cypress videos/screenshots available for failed UI tests
- Status badges show current build status

### Local Coverage Reports
```bash
npm run test:api:coverage    # Generate coverage report
open coverage/lcov-report/index.html    # View in browser
```

## 📝 Test Documentation

For detailed testing strategy, coverage areas, and maintenance procedures, see [TEST_PLAN.md](./TEST_PLAN.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass: `npm run test:all`
5. Submit a pull request

## 📄 License

This project is created for demonstration purposes as part of a technical assessment.

## 🔗 Links

- **Live Application**: https://remwaste-frontend.onrender.com
- **GitHub Repository**: https://github.com/Sotirisgit/remwaste-app
- **Backend API**: https://remwastebackend.onrender.com

---

**Time to Get Running**: < 2 minutes  
**Last Updated**: July 2025  
**Maintainer**: Sotiris