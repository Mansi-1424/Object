# User Management Application.

## Problem Title
User Management App Using Constructor Function, Prototype, and Call/Apply/Bind

---

## Problem Description
The User Management Application is a front-end project designed to demonstrate object creation using JavaScript constructor functions. It allows users to create multiple user objects dynamically by providing a name and age. Each user object shares common behaviors through prototype methods, ensuring efficient memory usage.

The application also demonstrates advanced JavaScript concepts such as prototype chaining and the usage of `call`, `apply`, and `bind` methods to control function context. User details are displayed dynamically on the web page after creation.

---

## Input
- User Name (text input)
- User Age (number input)
- Button click to create a user

---

### Application Structure
1. **Input Section**
   - Fields to enter name and age
   - Button to trigger user creation

2. **Object Creation Layer**
   - A constructor function defines user properties
   - Objects are created dynamically using the constructor

3. **Prototype Methods**
   - Shared methods for greeting and displaying user details
   - Methods are accessed via prototype chain

4. **User Display**
   - Created users are shown in a list format
   - Each user entry displays name and age

5. **Function Context Demonstration**
   - `call`, `apply`, and `bind` are used to invoke a function with different contexts
   - Output is logged to the console for understanding execution flow

---

## Explanation
- Constructor functions are used to create multiple user objects efficiently
- Prototype methods ensure shared behavior without duplication
- DOM manipulation dynamically updates the user interface
- Input validation ensures required fields are filled
- Function context methods (`call`, `apply`, `bind`) demonstrate advanced JavaScript usage
- Prototype chain behavior is inspected using console logging

---

## Constraints
- Name and age fields cannot be empty
- Age must be a valid numeric value
- No backend or database integration
- Data is not persistent after page refresh
- Designed for learning and demonstration purposes only
- Console access is required to view call/apply/bind output

---
