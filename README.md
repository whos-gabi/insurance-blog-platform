# Insurance Blog Platform

## What is this?

The **Insurance Blog Platform** is a web-based application designed for insurance agents to showcase their expertise, market their services, and engage with potential clients through informative blog posts. The platform features an administrative dashboard where **admin** can create, edit, update, and manage blog posts. 

### Key Features:
- **User Authentication**: Secure login using bcrypt for password hashing and JWT for session management.
- **Blog Management**: Full CRUD (Create, Read, Update, Delete) operations for blog posts.
- **Dynamic Content**: Supports embedded YouTube links or images in posts.
- **Responsive UI**: Uses EJS templates for server-side rendering and user-friendly interfaces.

## Architecture

The application is built using the following technologies:

- **Node.js**
- **Express.js**
- **MongoDB**
- **EJS (Embedded JavaScript Templates)**
- **JWT (JSON Web Tokens)**
- **bcrypt**

## Install and Run

### Prerequisites:
Ensure you have **Node.js** and **MongoDB** installed on your system.

### Installation Steps:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/insurance-blog-platform.git
   cd insurance-blog-platform
2. **Install dependencies**:
    ```bash
    npm install
3. **Configure environment variables**:
    - Copy `sample.env` to `.env`:
    ```bash
    cp sample.env .env
    ```
    - Update the `.env` file with your MongoDB URI, JWT secret, and other necessary configurations.
4. **Run**:
    ```bash
    npm start
    ```
    or use **Nodemon** for development:
    ```bash
    nodemon index.js
    ```
