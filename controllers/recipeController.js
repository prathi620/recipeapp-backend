const Recipe = require('../models/Recipe');

/**
 * @desc    Create a new recipe
 * @route   POST /api/recipes
 * @access  Public
 */
const createRecipe = async (req, res, next) => {
    try {
        const { name, ingredients, instructions, prepTime, cookTime, servings, category, difficulty, imageUrl } = req.body;

        // Create new recipe
        const recipe = await Recipe.create({
            name,
            ingredients,
            instructions,
            prepTime,
            cookTime,
            servings,
            category,
            difficulty,
            imageUrl
        });

        res.status(201).json({
            success: true,
            message: 'Recipe created successfully',
            data: recipe
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all recipes
 * @route   GET /api/recipes
 * @access  Public
 */
const getAllRecipes = async (req, res, next) => {
    try {
        // Optional query parameters for filtering
        const { category, difficulty, search } = req.query;

        let query = {};

        // Filter by category
        if (category) {
            query.category = category.toLowerCase();
        }

        // Filter by difficulty
        if (difficulty) {
            query.difficulty = difficulty.toLowerCase();
        }

        // Search by name (case-insensitive)
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const recipes = await Recipe.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get a single recipe by ID
 * @route   GET /api/recipes/:id
 * @access  Public
 */
const getRecipeById = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: `Recipe not found with id: ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a recipe by ID
 * @route   PUT /api/recipes/:id
 * @access  Public
 */
const updateRecipe = async (req, res, next) => {
    try {
        const { name, ingredients, instructions, prepTime, cookTime, servings, category, difficulty, imageUrl } = req.body;

        let recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: `Recipe not found with id: ${req.params.id}`
            });
        }

        // Update recipe with new values
        recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                name,
                ingredients,
                instructions,
                prepTime,
                cookTime,
                servings,
                category,
                difficulty,
                imageUrl
            },
            {
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        );

        res.status(200).json({
            success: true,
            message: 'Recipe updated successfully',
            data: recipe
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a recipe by ID
 * @route   DELETE /api/recipes/:id
 * @access  Public
 */
const deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: `Recipe not found with id: ${req.params.id}`
            });
        }

        await Recipe.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Recipe deleted successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
};
