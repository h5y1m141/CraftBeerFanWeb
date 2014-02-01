express = require('express')
routes = require('./routes')
user = require('./routes/user')
http = require('http')
path = require('path')
conf = require('config')
app = express()

console.log conf.apiKey.development
console.log conf.user.id

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))


if app.get('env') is 'development'
  app.use(express.errorHandler())


app.get('/', routes.index)
app.get('/users', user.list)

http.createServer(app).listen(app.get('port'), ->
  console.log "Express server listening on port #{app.get('port')}"
)

