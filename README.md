# Event Management System

## Frontend

### Project Setup
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.14.

### Installation
1. Navigate to the frontend directory:
   ```sh
   cd FRONTEND/eventManagementSystem
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Development Server
Run the development server:
```sh
ng serve
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build
To build the project:
```sh
ng build
```
The build artifacts will be stored in the `dist/` directory.

### Running Tests
#### Unit Tests
```sh
ng test
```
Runs unit tests via [Karma](https://karma-runner.github.io).

#### End-to-End Tests
```sh
ng e2e
```
Requires an additional package for E2E testing.

---

## Backend

### Project Setup
Backend is built using **Node.js** with **Express.js** and **MongoDB**.

### Installation
1. Navigate to the backend directory:
   ```sh
   cd BACKEND
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Environment Variables
Create a `.env` file in the root of the backend directory and add:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
API_URL=/api/v1
```

### Running the Server
To start the server:
```sh
npm start
```
The API will be available at `http://localhost:3000/api/v1`.

### API Routes

#### User Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/users/` | Create a new user |
| GET    | `/users/` | Get all users (Requires Token) |
| GET    | `/users/:id` | Get user by ID (Requires Token) |
| PUT    | `/users/:id` | Update user by ID (Requires Token) |
| DELETE | `/users/:id` | Delete user by ID (Requires Token) |
| POST   | `/users/login` | User login |

#### Event Management Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/event-management/events` | Create an event (Requires Token) |
| GET    | `/event-management/events` | Get all events (Requires Token) |
| GET    | `/event-management/events/:id` | Get event by ID (Requires Token) |
| PUT    | `/event-management/events/:id` | Update event by ID (Requires Token) |
| DELETE | `/event-management/events/:id` | Delete event by ID (Requires Token) |

### Middleware & API Prefix
```js
const API_PREFIX = process.env.API_URL || '/api/v1';
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/event-management`, eventRoutes);
```

### Running Tests
To run backend tests:
```sh
npm test
```

---





## Contributors
- **Your Name** - Sohrab Ali Ansari

---

## License
This project is licensed under the [MIT License](LICENSE).

