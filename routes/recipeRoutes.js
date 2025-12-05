const express = require('express');
const router = express.Router();
const {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');

/**
 * Recipe Routes
 * Base URL: /api/recipes
 */

// @route   POST /api/recipes
// @desc    Create a new recipe
router.post('/', createRecipe);

// @route   GET /api/recipes
// @desc    Get all recipes (with optional filtering)
router.get('/', getAllRecipes);

// @route   GET /api/recipes/:id
// @desc    Get a single recipe by ID
router.get('/:id', getRecipeById);

// @route   PUT /api/recipes/:id
// @desc    Update a recipe by ID
router.put('/:id', updateRecipe);

// @route   DELETE /api/recipes/:id
// @desc    Delete a recipe by ID
router.delete('/:id', deleteRecipe);

module.exports = router;
