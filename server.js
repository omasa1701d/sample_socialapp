var express = require('express')
var bodyParser = require('body-parser')
var app = express()


app.use(bodyParser.json())

app.use('/api/sessions',require('./controllers/api/sessions'))
app.use('/api/users',require('./controllers/api/users'))


app.use('/api/posts',require('./controllers/api/posts'))

app.use(require('./controllers/static'))
//上記は
//app.use('/',require('./controllers/static'))
//と同じ

// app.get('/', function(req,res){
//     res.sendfile('client/index.html')
// })



app.listen( process.env.PORT || 3000, process.env.IP || "0.0.0.0")
console.log("Server listening at", process.env.IP+":"+process.env.PORT)
