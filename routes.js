const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const CompanyController = require('./controllers/CompanyController')
const ItemController = require('./controllers/ItemController')
const CategoryController = require('./controllers/CategoryController')
const UnitController = require('./controllers/UnitController')

const _routes = [
    ['/login', AuthController],
    ['/users', UserController],
    ['/companies', CompanyController],
    ['/items', ItemController],
    ['/category', CategoryController],
    ['/unit', UnitController],

]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route
        app.use(`${url}`, controller)
    });
}

module.exports = routes