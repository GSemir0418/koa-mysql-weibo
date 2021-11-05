const koa = require('koa')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')

const homeRoute = require('./routes/home')

const app = new koa()
app.keys = ['asdfJhfakdjHfe1']

render(app, {
    root: './views',
    layout: 'layout',
    viewExt: 'ejs'
})
app.use(bodyParser())
app.use(homeRoute.routes()).use(homeRoute.allowedMethods())
app.listen(8080, () => {
    console.log('正在监听8080')
})