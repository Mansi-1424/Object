## Authority Lock System using JavaScript Function Binding

## Problem Description
The Authority Lock System is a secure interface simulation that demonstrates
how actions can be permanently bound to a specific authority or identity.
It verifies and locks system control to a predefined administrator profile,
ensuring that sensitive actions execute only in the correct context.

This project highlights the concept of function binding in JavaScript,
along with object context control, event handling, and DOM manipulation.

---

## Input
- User interaction through a verification button
- No manual data input is required
- Authority information is predefined within the system

---


## Explanation
1. The system defines an administrator profile object.
2. A function is created that depends on the object’s context.
3. JavaScript `bind()` is used to permanently lock the function
   to the administrator profile.
4. When the user clicks the verification button, the bound function executes.
5. The system confirms identity verification.
6. The UI updates to show locked authority status.
7. This ensures that the action always executes in the correct context.

---

## JavaScript Logic 

-An authority object is created to store identity information.

-A function is defined that uses this to access the authority’s name.

-The function is permanently bound to the authority object using JavaScript’s bind() method.

-This binding ensures the function always executes in the correct context, even when called from an event.

**When the user clicks the verification button:**

-The bound function executes

-Authority identity is confirmed

-The UI is updated dynamically using DOM manipulation

-System status messages are displayed

## Constraints
- Authority identity is predefined and cannot be changed at runtime
- Verification requires explicit user action
- Function execution is permanently bound using `bind()`
- Only one authority context is allowed
- System is intended for demonstration purposes only

---
