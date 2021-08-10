const siteRouter = require('./site')
const authRouter = require('./auth')

function route(app){

    app.use('/',siteRouter)

    app.use('/auth',authRouter)
}

module.exports = route