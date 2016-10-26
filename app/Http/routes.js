'use strict'

const Route = use('Route')

Route.get('/', 'RecipeController.main')
Route.get('/recipe/create', 'RecipeController.create')
Route.post('/recipe/create', 'RecipeController.doCreate')

Route.get('/recipe/:id', 'RecipeController.show')
Route.get('/recipe/:id/edit', 'RecipeController.edit')
Route.post('/recipe/:id/edit', 'RecipeController.doEdit')
Route.post('/recipe/:id/delete', 'RecipeController.doDelete')