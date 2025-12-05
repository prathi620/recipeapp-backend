# Recipe CRUD Application

A complete **CRUD (Create, Read, Update, Delete)** application for managing recipes, built with **Node.js**, **Express.js**, and **Mongoose** following the **MVC (Model-View-Controller)** architectural pattern.

## 📋 Features

- ✅ Create new recipes with detailed information
- ✅ Retrieve all recipes with optional filtering
- ✅ Get individual recipe details by ID
- ✅ Update existing recipes
- ✅ Delete recipes
- ✅ Input validation and error handling
- ✅ RESTful API design
- ✅ MongoDB integration with Mongoose ODM

## 🛠️ Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling
- **MongoDB** - NoSQL database
- **Postman** - API testing and documentation

## 📁 Project Structure (MVC Pattern)

```
recipe-app/
├── models/
│   └── Recipe.js              # Recipe schema and model
├── controllers/
│   └── recipeController.js    # Business logic for CRUD operations
├── routes/
│   └── recipeRoutes.js        # API route definitions
├── config/
│   └── db.js                  # Database connection configuration
├── middleware/
│   └── errorHandler.js        # Global error handling
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore file
├── server.js                  # Application entry point
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/recipe-app
   NODE_ENV=development
   ```

   For **MongoDB Atlas** (cloud database):
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/recipe-app?retryWrites=true&w=majority
   ```

4. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

5. **Run the application**
   
   Development mode (with auto-restart):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

6. **Server should be running on** `http://localhost:5000`

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api/recipes`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recipes` | Create a new recipe |
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/:id` | Get recipe by ID |
| PUT | `/api/recipes/:id` | Update recipe by ID |
| DELETE | `/api/recipes/:id` | Delete recipe by ID |

### Recipe Schema

```json
{
  "name": "String (required)",
  "ingredients": ["Array of strings (required)"],
  "instructions": "String (required)",
  "prepTime": "Number (minutes)",
  "cookTime": "Number (minutes)",
  "servings": "Number",
  "category": "String (appetizer, main course, dessert, etc.)",
  "difficulty": "String (easy, medium, hard)",
  "imageUrl": "String (optional)"
}
```

## 📝 API Usage Examples

### 1. Create Recipe (POST)

**Request:**
```http
POST http://localhost:5000/api/recipes
Content-Type: application/json

{
  "name": "Chocolate Chip Cookies",
  "ingredients": [
    "2 cups all-purpose flour",
    "1 cup butter",
    "1 cup sugar",
    "2 eggs",
    "2 cups chocolate chips"
  ],
  "instructions": "Mix ingredients, form dough balls, bake at 350°F for 12 minutes.",
  "prepTime": 15,
  "cookTime": 12,
  "servings": 24,
  "category": "dessert",
  "difficulty": "easy"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": {
    "_id": "6571234567890abcdef12345",
    "name": "Chocolate Chip Cookies",
    "ingredients": [...],
    "instructions": "...",
    "prepTime": 15,
    "cookTime": 12,
    "servings": 24,
    "category": "dessert",
    "difficulty": "easy",
    "createdAt": "2024-12-05T06:30:00.000Z",
    "updatedAt": "2024-12-05T06:30:00.000Z"
  }
}
```

### 2. Get All Recipes (GET)

**Request:**
```http
GET http://localhost:5000/api/recipes
```

**With filters:**
```http
GET http://localhost:5000/api/recipes?category=dessert&difficulty=easy
GET http://localhost:5000/api/recipes?search=chocolate
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

### 3. Get Recipe by ID (GET)

**Request:**
```http
GET http://localhost:5000/api/recipes/6571234567890abcdef12345
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6571234567890abcdef12345",
    "name": "Chocolate Chip Cookies",
    ...
  }
}
```

### 4. Update Recipe (PUT)

**Request:**
```http
PUT http://localhost:5000/api/recipes/6571234567890abcdef12345
Content-Type: application/json

{
  "servings": 30,
  "difficulty": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe updated successfully",
  "data": {...}
}
```

### 5. Delete Recipe (DELETE)

**Request:**
```http
DELETE http://localhost:5000/api/recipes/6571234567890abcdef12345
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe deleted successfully",
  "data": {}
}
```

## 🧪 Testing with Postman

1. Import the provided **Postman collection** (`Recipe_API.postman_collection.json`)
2. Set up environment variables in Postman:
   - `base_url`: `http://localhost:5000`
3. Test each endpoint with the sample requests provided
4. View detailed documentation in Postman

## ⚠️ Error Handling

The API includes comprehensive error handling for:

- **Validation errors** - Missing required fields, invalid data types
- **Not found errors** - Recipe ID doesn't exist
- **Database errors** - Connection issues, duplicate entries
- **Invalid ObjectId** - Malformed MongoDB IDs

Example error response:
```json
{
  "success": false,
  "error": "Recipe name is required"
}
```

## 🔧 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Code Quality

- Clean, well-documented code
- Consistent naming conventions
- Proper error handling
- Input validation
- RESTful API design principles

## 📚 Additional Information

### Recipe Categories
- appetizer
- main course
- dessert
- beverage
- salad
- soup
- snack
- breakfast
- other

### Difficulty Levels
- easy
- medium
- hard

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements.

## 📄 License

ISC

## 👨‍💻 Author

Created as a demonstration of CRUD operations with Node.js, Express.js, and Mongoose.

---

**Happy Cooking! 🍳**
