var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const JWT = require('./utils/jwt')
const UserRoter = require('./routes/admin/UserRouter')
const PublicRoter = require('./routes/public')
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use((req, res, next) => {
  if (req.url == '/admin/user/login') {
    next()
    return
  }
  const tokenInfo = JWT.getToken(req)
  if (tokenInfo.userName) {
    next()
  } else {
    res.status(401).json({ status: 401, message: 'token过期' })
  }
})
//admin
// console.log(UserRoter)
app.use(UserRoter)
app.use(PublicRoter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
