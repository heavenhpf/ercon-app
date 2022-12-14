const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const CompanyController = require('./controllers/CompanyController')
const ItemController = require('./controllers/ItemController')
const CategoryController = require('./controllers/CategoryController')
const OrderController = require('./controllers/OrderController')
const PoController = require('./controllers/PoController')
const DnController = require('./controllers/DnController')
const DocController = require('./controllers/DocController')
const DashboardController = require('./controllers/DashboardController')
const NotificationController = require('./controllers/NotificationController')

const _routes = [
    ['/login', AuthController],
    ['/users', UserController],
    ['/companies', CompanyController],
    ['/items', ItemController],
    ['/categories', CategoryController],
    ['/orders', OrderController],
    ['/po', PoController],
    ['/dn', DnController],
    ['/doc', DocController],
    ['/dashboard', DashboardController],
    ['/notification', NotificationController],
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route
        app.use(`${url}`, controller)
    })
}

module.exports = routes