import express from 'express'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'

const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signOutRouter)
app.use(signUpRouter)


app.listen(3000, ()=>{
	console.log("Port is 3000!!!!")
})