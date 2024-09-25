const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    // const router = express.Router()
    const protectedApi = express.Router()

    server.use('/api', protectedApi)
    protectedApi.use(auth)

    // rotas com autenticação
    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(protectedApi, '/billingCycles')

    //User Routes
    const userService = require('../api/users/usersService')
    userService.register(protectedApi, '/users')
    const seederService = require('../api/seeders/seederService')
    seederService.register(protectedApi, '/seeders')

    //rotas abertas
    const openApi = express.Router()
    server.use('/oapi', openApi)
    const AuthService = require('../api/users/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    server.get('/', function(req, res) {
        res.send('Service Template API está no ar!!! 😎') 
    })


}