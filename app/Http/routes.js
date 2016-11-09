'use strict'

const Route = use('Route')

Route.get('/', 'RecipeController.main')
Route.get('/recipe/create', 'RecipeController.create').middleware('auth')
Route.post('/recipe/create', 'RecipeController.doCreate').middleware('auth')

Route.get('/recipe/:id', 'RecipeController.show')
Route.get('/recipe/:id/edit', 'RecipeController.edit').middleware('auth')
Route.post('/recipe/:id/edit', 'RecipeController.doEdit').middleware('auth')
Route.post('/recipe/:id/delete', 'RecipeController.doDelete').middleware('auth')

Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')

Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')

Route.get('/logout', 'UserController.doLogout')