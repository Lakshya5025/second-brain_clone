# **Brainly \- Your Second Brain in the Cloud**

Brainly is a powerful, full-stack application designed to be your personal digital brain. It allows you to effortlessly save, categorize, and access various types of content from around the web. Whether it's an inspiring image, a must-read document, a captivating video, a thought-provoking tweet, or an informative audio clip, Brainly provides a centralized hub for all your digital discoveries.

## **Features ✨**

- **Seamless Content Management**: Easily add, view, update, and delete your saved content with a user-friendly interface.
- **Versatile Content Support**: Save a wide range of content types, including images, documents, videos, audio files, and even tweets.
- **Secure User Authentication**: Your digital brain is for your eyes only. Brainly uses secure user authentication with JWT (JSON Web Tokens) to protect your data.
- **Robust Security**: Passwords are securely hashed using **bcrypt**, ensuring that your account is always protected.
- **Effortless Sharing**: Share your saved content with others by generating unique, shareable links.
- **Powerful Search and Filtering**: Quickly find what you're looking for with a comprehensive search and filtering system. You can search by title or description, and sort your content by date or title.
- **Organize with Tags**: Use tags to categorize your content and keep your digital brain neatly organized.
- **User Profile Management**: Update your username, email, and password in a dedicated profile section.
- **Built with TypeScript**: The entire application is built with TypeScript, providing type safety and improved code quality for a more reliable and maintainable application.

## **Tech Stack 💻**

### **Frontend**

- **React**: A declarative, efficient, and flexible JavaScript library for building user interfaces.
- **Vite**: A next-generation frontend tooling that provides a faster and leaner development experience.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **React Router**: A standard library for routing in React.

### **Backend**

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A cross-platform document-oriented database program.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **Bcrypt**: A library for hashing passwords.
- **Zod**: A TypeScript-first schema declaration and validation library.

---

## **Project Structure**

The project is a monorepo, with the code organized into client and server directories.

brainly/  
├── client/  
│ ├── src/  
│ ├── package.json  
│ └── vite.config.ts  
└── server/  
 ├── src/  
 │ ├── controller/  
 │ ├── middleware/  
 │ ├── models/  
 │ └── validator/  
 ├── .example.env  
 ├── package.json  
 └── tsconfig.json

- **client/**: This directory contains the frontend of the application, built with React and Vite.
- **server/**: This directory contains the backend of the application, built with Node.js and Express.
  - **src/controller/**: This directory contains the controllers, which handle the business logic for incoming requests and send back responses.
  - **src/middleware/**: This directory contains the middleware functions, such as the authentication middleware.
  - **src/models/**: This directory contains the Mongoose schemas and models for the different collections in the MongoDB database.
  - **src/validator/**: This directory contains the Zod schemas for validating incoming request bodies to ensure data consistency.

---

## **Getting Started 🚀**

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**

- Node.js (v18 or higher)
- npm (or your preferred package manager)
- MongoDB

### **Installation**

1. **Clone the repository:**  
   Bash  
   git clone https://github.com/lakshya5025/brainly.git

2. **Navigate to the project directory:**  
   Bash  
   cd brainly

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

## **API Endpoints 🌐**

The following are the API endpoints available in this project:

- **POST /api/v1/signup**: Creates a new user.
- **POST /api/v1/signin**: Logs in a user and returns a JWT token in the cookies.
- **POST /api/v1/content**: Adds new content.
- **GET /api/v1/content**: Fetches content for the logged-in user.
- **DELETE /api/v1/content/:id**: Deletes a specific piece of content.
- **PUT /api/v1/content/:id**: Updates a specific piece of content.
- **POST /api/v1/brain/share**: Generates a shareable link for a piece of content.
- **GET /api/v1/brain/:shareLink**: Accesses shared content.
- **POST /api/v1/logout**: Logs out the current user.
- **PUT /api/v1/user**: Updates user information (username and email).
- **POST /api/v1/user/password**: Changes the user's password.

---

## **Environment Variables**

To run the server, you will need to create a .env file in the server directory and add the following environment variables:

- **MONGO_URL**: Your MongoDB connection string.
- **PORT**: The port you want the server to run on.
- **JWT_SECRET**: A secret key for signing JWTs.
- **SALT**: A salt for hashing passwords.
- **SERVER_URL**: The base URL of your server (e.g., http://localhost:PORT).

---

## **Future Scope 🔮**

The project has a solid foundation, and future work could include:

- Adding more robust error handling and feedback mechanisms across the application.
- Implementing comprehensive unit and integration tests to ensure code quality and reliability.
- Expanding the tagging functionality to allow for more advanced organization and filtering.
- Enhancing the user interface with more features, such as a more interactive dashboard, content previews, and advanced sharing options.
- Implementing a system for user notifications and alerts.
- Adding support for more content types and integrations with other platforms.
