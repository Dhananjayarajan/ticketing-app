import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all('*', async () => {
	throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')		
			console.log("Connected to mongo db")
	}

	catch (e) {
		console.error(e)
	}
	app.listen(3000, ()=>{
	console.log("Port is 3000!!!!")
})
}

start()

