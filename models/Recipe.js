const mongoose = require('mongoose');

/**
 * Recipe Schema
 * Defines the structure of recipe documents in MongoDB
 */
const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Recipe name is required'],
            trim: true,
            maxlength: [100, 'Recipe name cannot exceed 100 characters']
        },
        ingredients: {
            type: [String],
            required: [true, 'At least one ingredient is required'],
            validate: {
                validator: function (arr) {
                    return arr.length > 0;
                },
                message: 'Recipe must have at least one ingredient'
            }
        },
        instructions: {
            type: String,
            required: [true, 'Cooking instructions are required'],
            minlength: [10, 'Instructions must be at least 10 characters long']
        },
        prepTime: {
            type: Number,
            min: [0, 'Preparation time cannot be negative'],
            default: 0
        },
        cookTime: {
            type: Number,
            min: [0, 'Cooking time cannot be negative'],
            default: 0
        },
        servings: {
            type: Number,
            min: [1, 'Servings must be at least 1'],
            default: 1
        },
        category: {
            type: String,
            trim: true,
            lowercase: true,
            enum: {
                values: ['appetizer', 'main course', 'dessert', 'beverage', 'salad', 'soup', 'snack', 'breakfast', 'other'],
                message: '{VALUE} is not a valid category'
            },
            default: 'other'
        },
        difficulty: {
            type: String,
            enum: {
                values: ['easy', 'medium', 'hard'],
                message: '{VALUE} is not a valid difficulty level'
            },
            default: 'medium'
        },
        imageUrl: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Add index for faster queries
recipeSchema.index({ name: 1 });
recipeSchema.index({ category: 1 });

// Virtual for total time
recipeSchema.virtual('totalTime').get(function () {
    return this.prepTime + this.cookTime;
});

// Ensure virtuals are included in JSON output
recipeSchema.set('toJSON', { virtuals: true });
recipeSchema.set('toObject', { virtuals: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
