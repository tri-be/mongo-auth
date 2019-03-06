const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
const userRoutes = require('./auth/routes')
const app = express()
const PORT = 9000

app.use(morgan('combined'))

let sess = {
	secret: 'txR6$*S@h^sqhmaU6BAqw!tJK2bxS*UR4ju$LfAj4v5UJAuobXZymGH8$*vP&tYDU7x#%eUmCmiZLP@gnmA35A5PWeNF5JhP$3@a9^r3&@!kxaw56rN4TZKW6',
	cookie: {
		maxAge: 60000
	},
	saveUninitialized: true,
	resave: true
}

app.use(session(sess))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(`mongodb://localhost:27017/auth-app`, { useNewUrlParser: true })
    .then(() => {
        // console.log success message if the .connect promise returns successful (resolve)
        console.log('Database connection successful')
    })
    // console.logs error message if the .connect promise returns an error (reject)
    .catch(err => {
        console.error(`Database connection error: ${err.message}`)
    })

// Open your mongoose connection
let db = mongoose.connection // <this one took me a while to figure out!!
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.use('/', userRoutes)
})

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})