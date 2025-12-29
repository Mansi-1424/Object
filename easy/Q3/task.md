# Dynamic Bank Account Login System

## Problem Title
Dynamic Bank Account Login and Account Details Viewer

## Problem Description
The objective of this project is to design a simple web-based bank interface where a user must first log in before accessing sensitive bank account details. The system ensures that account information is displayed only after successful authentication.

The application demonstrates the use of:
- JavaScript objects
- DOM manipulation
- Event handling
- Conditional rendering of UI components

This project does not use a backend or database and is intended for learning front-end logic and dynamic UI behavior.

---

## Input
The system takes the following user inputs:
- Username
- Password
- Button click actions (Login and Show Account Details)

---

## Demo Flow (Without Code)
1. User opens the application
2. Login screen is displayed
3. User enters credentials
4. System validates the credentials
5. On successful login:
   - Login UI is hidden
   - Bank account UI is displayed
6. User clicks “Show Account Details”
7. Account holder name and balance are displayed dynamically

---

## Application Structure (Explanation)
- **Login Module**
  - Accepts user credentials
  - Performs validation
  - Controls UI visibility

- **Bank Account Module**
  - Stores account information using an object
  - Provides a method to fetch account details

- **UI Rendering Logic**
  - Uses conditional display techniques
  - Dynamically updates text content based on user actions

---

## Constraints
- No backend authentication
- Credentials are hardcoded for demonstration
- Single user supported
- No data persistence after page reload
- Front-end only (HTML, CSS, JavaScript)

---

## Learning Outcomes
- Understanding object methods and `this` keyword
- Working with DOM elements dynamically
- Implementing basic authentication logic
- UI state management using JavaScript
