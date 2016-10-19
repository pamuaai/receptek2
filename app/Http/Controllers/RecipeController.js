'use strict'

const Category = use('App/Model/Category')

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
}

module.exports = RecipeController
