# **Second Brain \- A Full-Stack Application**

This is a full-stack "Second Brain" application built with a **React** frontend and a **Node.js**, **Express**, and **TypeScript** backend. It provides user authentication and a comprehensive structure for managing and storing different types of content. This project uses **MongoDB** as its database.

---

## **Features**

* **Full-Stack Application**: A complete solution with a modern frontend and a robust backend.  
* **User Authentication**: Secure user authentication using JWT (JSON Web Tokens).  
* **Password Hashing**: Passwords are hashed using **bcrypt** before being stored in the database for enhanced security.  
* **Content Management**: Functionality to add, view, and delete content.  
* **Content Sharing**: Ability to generate shareable links for your content.  
* **Validation**: Input validation for request bodies using **zod** for robust data integrity.  
* **Database Modeling**: Clear and structured data models for users, content, tags, and links using **Mongoose**.  
* **TypeScript**: The entire codebase is written in TypeScript for better code quality, type safety, and maintainability.

---

## **Project Structure**

The project is a monorepo, with the code organized into client and server directories.

second-brain\_clone/  
├── client/  
│   ├── src/  
│   ├── package.json  
│   └── vite.config.ts  
└── server/  
    ├── src/  
    │   ├── controller/  
    │   ├── middleware/  
    │   ├── models/  
    │   └── validator/  
    ├── .example.env  
    ├── package.json  
    └── tsconfig.json

* **client/**: This directory contains the frontend of the application, built with React and Vite.  
* **server/**: This directory contains the backend of the application, built with Node.js and Express.  
  * **src/controller/**: This directory contains the controllers, which are responsible for handling the business logic for incoming requests and sending back responses.  
  * **src/middleware/**: This directory contains the middleware functions, such as the authentication middleware.  
  * **src/models/**: This directory contains the Mongoose schemas and models for the different collections in the MongoDB database.  
  * **src/validator/**: This directory contains the zod schemas for validating the incoming request bodies to ensure data consistency.

---

## **Getting Started**

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**

* Node.js (v18 or higher)  
* npm (or your preferred package manager)  
* MongoDB

### **Installation**

1. **Clone the repository:**  
   Bash  
   git clone https://github.com/lakshya5025/second-brain\_clone.git

2. **Navigate to the project directory:**  
   Bash  
   cd second-brain\_clone

### **Server Setup**

1. **Navigate to the server directory:**  
   Bash  
   cd server

2. **Install the dependencies:**  
   Bash  
   npm install

3. **Create a .env file** in the server directory and add the necessary environment variables. You can use the .example.env file as a template.  
4. **Build the project:**  
   Bash  
   npm run build

5. **Start the server:**  
   Bash  
   npm start

The server will start on the port specified in your .env file.

### **Client Setup**

1. **Navigate to the client directory:**  
   Bash  
   cd ../client

2. **Install the dependencies:**  
   Bash  
   npm install

3. **Start the client:**  
   Bash  
   npm run dev

The client will be available at http://localhost:5173 (or another port if 5173 is in use).

---

## **API Endpoints**

The following are the API endpoints available in this project:

* **POST /api/v1/signup**: Creates a new user.  
* **POST /api/v1/signin**: Logs in a user and returns a JWT token in the cookies.  
* **POST /api/v1/content**: Adds new content.  
* **GET /api/v1/content**: Fetches content for the logged-in user.  
* **DELETE /api/v1/content/:id**: Deletes a specific piece of content.  
* **POST /api/v1/brain/share/:id**: Generates a shareable link for a piece of content.  
* **GET /api/v1/brain/:shareLink**: Accesses shared content.

---

## **Environment Variables**

To run the server, you will need to create a .env file in the server directory and add the following environment variables:

* **MONGO\_URL**: Your MongoDB connection string.  
* **PORT**: The port you want the server to run on.  
* **JWT\_SECRET**: A secret key for signing JWTs.  
* **SALT**: A salt for hashing passwords.  
* **SERVER\_URL**: The base URL of your server (e.g., http://localhost:).

---

## **Dependencies**

### **Server Dependencies**

* **bcrypt**: For hashing passwords.  
* **cookie-parser**: For parsing cookies.  
* **dotenv**: For loading environment variables.  
* **express**: The web framework used.  
* **jsonwebtoken**: For creating and verifying JSON Web Tokens.  
* **mongoose**: For MongoDB object modeling.  
* **nanoid**: For generating unique IDs.  
* **zod**: For data validation.

### **Client Dependencies**

* **react**: A JavaScript library for building user interfaces.  
* **react-dom**: For rendering React components in the browser.  
* **vite**: A fast build tool for modern web development.

---

## **Future Scope**

The project has a solid foundation, and future work could include:

* Adding more robust error handling across the application.  
* Implementing unit and integration tests to ensure code quality.  
* Implementing the tagging functionality for content as defined in the contentSchema.  
* Enhancing the frontend with a more feature-rich user interface.