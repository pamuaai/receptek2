'use strict'

const Route = use('Route')

Route.get('/', 'RecipeController.main')
Route.get('/recipe/create', 'RecipeController.create')