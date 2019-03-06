const express = require('express')
const router = express.Router()
const User = require('./user')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
  }
))

passport.serializeUser(function(user, done) {
	done(null, user.id)
})

passport.deserializeUser(function(id, done) {
	User.findById(id, function(error, user) {
		if (error) { return done(err) }
			done(null, user)
	})
})


router.get('/', (request, response) => {
        User
            .find()
            .then(users => {
                console.log("Success!\n", users)
                response.send(users)
            })
            .catch(error => {
                console.log("Error:\n", error.name, error)
                response.send(error)
            })
    })

router.post('/', (request, response) => {
	let newUser = new User({
		user: "test_user4",
		password: "tww0000rd"
	})

	newUser.save()
	.then(user => {
		console.log("New User Successfully created!\n", user)
		response.send(user)
	})
	.catch(error => {
		console.log("Error in creating new user.\n", error.name, error)
		response.send(error)
	})

})

router.post('/login', passport.authenticate('local'), (request, response) => {
	let {username, password} = request.body
	response.redirect('/')
})

module.exports = router