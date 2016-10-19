'use strict'

const Category = use('App/Model/Category')
const Recipe = use('App/Model/Recipe')
const Validator = use('Validator')

class RecipeController {
    * main (req, res) {
        const categories = yield Category.all()

        for (const category of categories) {
            const topRecipes = yield category.recipes().limit(3).fetch()
            category.topRecipes = topRecipes.toJSON()
        }

        yield res.sendView('main', {
            categories: categories.toJSON()
        })
    }

    * create (req, res) {
        const categories = yield Category.all()

        yield res.sendView('recipeCreate', {
            categories: categories.toJSON()
        })
    }

    * doCreate (req, res) {
        // 1. input
        const recipeData = req.all()

        // 2. validáció
        const rules = {
            'name': 'required|min:3',
            'ingredients': 'required',
            'instructions': 'required',
        }

        const validation = yield Validator.validateAll(recipeData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/recipe/create')
            return
        }

        // TODO: check category

        const recipe = new Recipe()
        recipe.name = recipeData.name
        recipe.user_id = 1
        recipe.category_id = recipeData.category
        recipe.ingredients = recipeData.ingredients
        recipe.instructions = recipeData.instructions

        yield recipe.save()

        res.redirect(`/recipe/${recipe.id}`)
    } 

    * show (req, res) {
        const recipe = yield Recipe.find(req.param('id'))

        yield res.sendView('recipe', {
            recipe: recipe.toJSON()
        })
    }
}

module.exports = RecipeController
