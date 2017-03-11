let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let session = require('express-session')
let FileStore = require('session-file-store')(session)
let history = require('connect-history-api-fallback')  //
let controller = require('./controller')

let app = express()

app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
    name: 'timelline-x',
    secret: 'zhouming',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10 * 1000  // 有效期，单位是毫秒
    }
}));
app.use(history({
    verbose: true   //记录详细信息
}))
app.use('/static', express.static(path.join(__dirname, './static')))
app.use('/', controller)

module.exports = app