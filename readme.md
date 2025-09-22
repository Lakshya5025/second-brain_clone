# **Second Brain \- Backend Service**

This is a backend service for a "Second Brain" application, built with **Node.js**, **Express**, and **TypeScript**. It provides user authentication and the basic structure for managing and storing different types of content. This project uses **MongoDB** as its database.

---

## **Features**

- **User Authentication**: Secure user authentication using JWT (JSON Web Tokens).
- **Password Hashing**: Passwords are hashed using bcrypt before being stored in the database for security.
- **Validation**: Input validation for request bodies using zod for robust data integrity.
- **Database Modeling**: Clear and structured data models for users, content, tags, and links using Mongoose.
- **TypeScript**: The entire codebase is written in TypeScript for better code quality, type safety, and maintainability.

---

## **Project Structure**

The project follows a standard feature-based structure, which helps in organizing the code in a modular and scalable way. The main source code is located in the src directory.

second-brain_clone/  
├── .example.env  
├── .gitignore  
├── package.json  
├── tsconfig.json  
└── src/  
 ├── controller/  
 │ ├── addContent.ts  
 │ ├── signin.ts  
 │ └── signup.ts  
 ├── middleware/  
 │ └── auth.ts  
 ├── models/  
 │ └── models.ts  
 ├── validator/  
 │ ├── signin.ts  
 │ └── signup.ts  
 └── index.ts

- **src/**: This is the main directory that contains all the source code for the application.
- **src/controller/**: This directory contains the controllers, which are responsible for handling the business logic for incoming requests and sending back responses.
- **src/middleware/**: This directory contains the middleware functions. Middleware functions have access to the request and response objects and can be used to perform tasks like authentication, logging, etc..
- **src/models/**: This directory contains the Mongoose schemas and models for the different collections in the MongoDB database.
- **src/validator/**: This directory contains the zod schemas for validating the incoming request bodies to ensure data consistency.
- **src/index.ts**: This is the entry point of the application. It sets up the Express server, connects to the database, and registers the routes.

---

## **Middleware**

### **auth.ts**

The auth.ts file contains the authentication middleware for the application. This middleware is responsible for protecting routes that require a user to be logged in.

Here's how it works:

1. It checks for a JWT token in the request cookies.
2. If the token is not present, it sends a 401 Unauthorized response.
3. If the token is present, it verifies the token using the JWT_SECRET.
4. If the token is valid, it fetches the user details from the database and attaches them to the request object for use in subsequent controllers.

---

## **Controllers**

### **signup.ts**

The signup.ts controller handles the user registration process. It receives the user's details (username, email, and password) in the request body, validates them using the zod schema, hashes the password with bcrypt, and creates a new user in the database.

### **signin.ts**

The signin.ts controller handles the user login process. It receives the user's credentials (username and password) in the request body, validates them, and checks if a user with the given username exists. If the user exists and the password is correct, it creates a JWT token and sends it back in a secure, httpOnly cookie.

### **addContent.ts**

The addContent.ts controller is currently a placeholder and returns a "Not Implemented" status. It is intended to handle the creation of new content for a logged-in user.

---

## **Getting Started**

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**

- Node.js (v18 or higher)
- npm
- MongoDB

### **Installation**

1. **Clone the repository:**  
   Bash  
   git clone https://github.com/lakshya5025/second-brain\_clone.git

2. **Navigate to the project directory:**  
   Bash  
   cd second-brain_clone

3. **Install the dependencies:**  
   Bash  
   npm install

4. **Create a .env file** in the root directory and add the necessary environment variables. You can use the .example.env file as a template.
5. **Build the project:**  
   Bash  
   npm run build

6. **Start the server:**  
   Bash  
   npm start

The server will start on the port specified in your .env file.

---

## **API Endpoints**

The following are the API endpoints available in this project:

- POST /api/v1/signup: Creates a new user.
- POST /api/v1/signin: Logs in a user and returns a JWT token in the cookies.
- POST /api/v1/content: Adds new content (Not yet implemented).
- GET /api/v1/content: Fetches content (Not yet implemented).
- DELETE /api/v1/content: Deletes content (Not yet implemented).
- POST /api/v1/brain/share: Shares a user's "brain" (Not yet implemented).
- GET /api/v1/brain/:shareLink: Accesses a shared "brain" (Not yet implemented).

---

## **Environment Variables**

To run this project, you will need to create a .env file in the root of your project and add the following environment variables:

- MONGO_URL: Your MongoDB connection string.
- PORT: The port you want the server to run on.
- JWT_SECRET: A secret key for signing JWTs.
- SALT: A salt for hashing passwords.

---

## **Dependencies**

### **Main Dependencies**

- **bcrypt**: For hashing passwords.
- **cookie-parser**: For parsing cookies.
- **dotenv**: For loading environment variables.
- **express**: The web framework used.
- **jsonwebtoken**: For creating and verifying JSON Web Tokens.
- **mongoose**: For MongoDB object modeling.
- **zod**: For data validation.

### **Development Dependencies**

- **@types/bcrypt**: TypeScript definitions for bcrypt.
- **@types/cookie-parser**: TypeScript definitions for cookie-parser.
- **@types/express**: TypeScript definitions for Express.
- **@types/jsonwebtoken**: TypeScript definitions for jsonwebtoken.

---

## **Future Scope**

The project has several endpoints that are not yet implemented. Future work could include:

- Implementing the addContent, getContent, and deleteContent endpoints.
- Implementing the "brain" sharing functionality.
- Adding more robust error handling across the application.
- Adding unit and integration tests to ensure code quality.
- Implementing the tagging functionality for content as defined in the contentSchema.
