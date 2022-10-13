const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const CompanyController = require('./controllers/CompanyController')
const ItemController = require('./controllers/ItemController')
const CategoryController = require('./controllers/CategoryController')
const UnitController = require('./controllers/UnitController')
const OrderController = require('./controllers/OrderController')
const PoController = require('./controllers/PoController')
const DnController = require('./controllers/DnController')

const _routes = [
    ['/login', AuthController],
    ['/users', UserController],
    ['/companies', CompanyController],
    ['/items', ItemController],
    ['/categories', CategoryController],
    ['/units', UnitController],
    ['/orders', OrderController],
    ['/po', PoController],
    ['/dn', DnController],
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route
        app.use(`${url}`, controller)
    })
}

module.exports = routes