# Special Academy Project API

This is a RESTful API for an special application. It provides endpoints for managing users, categories, subcategories, and items. It also includes authentication and authorization features.

## Features

*   User registration and login with JWT-based authentication
*   CRUD operations for categories, subcategories, and items
*   Image upload for item pictures
*   Protected routes using middleware
*   Password encryption using bcryptjs

## Technologies Used

*   Node.js
*   Express.js
*   MongoDB (with Mongoose)
*   JSON Web Token (JWT) for authentication
*   Multer for file uploads
*   Bcryptjs for password hashing
*   dotenv for environment variables
*   CORS

## Project Structure

```
.
├── config
│   ├── auth.js
│   └── db.js
├── controllers
│   ├── authController.js
│   ├── categoryController.js
│   ├── itemController.js
│   ├── subcategoryController.js
│   └── userController.js
├── middleware
│   └── authMiddleware.js
├── models
│   ├── Category.js
│   ├── Item.js
│   ├── Subcategory.js
│   └── User.js
├── routes
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── itemRoutes.js
│   ├── subcategoryRoutes.js
│   └── userRoutes.js
├── utils
│   └── upload.js
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── vercel.json
```

## API Endpoints

### Authentication

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Login a user and get a JWT token.

### Users

*   `GET /api/users`: Get all users.
*   `GET /api/users/:id`: Get a user by ID.
*   `PUT /api/users/:id`: Update a user by ID.
*   `DELETE /api/users/:id`: Delete a user by ID.

### Categories

*   `GET /api/categories`: Get all categories.
*   `POST /api/categories`: Create a new category.
*   `GET /api/categories/:id`: Get a category by ID.
*   `PUT /api/categories/:id`: Update a category by ID.
*   `DELETE /api/categories/:id`: Delete a category by ID.

### Subcategories

*   `GET /api/subcategories`: Get all subcategories.
*   `POST /api/subcategories`: Create a new subcategory.
*   `GET /api/subcategories/:id`: Get a subcategory by ID.
*   `PUT /api/subcategories/:id`: Update a subcategory by ID.
*   `DELETE /api/subcategories/:id`: Delete a subcategory by ID.

### Items

*   `GET /api/items`: Get all items.
*   `POST /api/items`: Create a new item.
*   `GET /api/items/:id`: Get an item by ID.
*   `PUT /api/items/:id`: Update an item by ID.
*   `DELETE /api/items/:id`: Delete an item by ID.

## Getting Started

### Prerequisites

*   Node.js
*   npm
*   MongoDB

### Installation

1.  Clone the repository:
    ```
    git clone <repository-url>
    ```
2.  Install the dependencies:
    ```
    npm install
    ```
3.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    MONGO_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    ```

### Running the Application

```
npm start
```

The server will start on port 5000 by default.

## Authentication

This API uses JWT for authentication. To access protected routes, you need to include the JWT in the `Authorization` header of your request as a Bearer token.

**Example:**

```
Authorization: Bearer <your-jwt-token>
```
