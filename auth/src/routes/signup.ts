import express, {Request, Response} from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/requestValidationError'
import { DatabaseConnectionError } from '../errors/databaseConnectionError'

const router = express.Router()

router.post('/api/users/signup', [body('email').isEmail().withMessage("Email must be valid"), body('password').trim().isLength({min : 4, max : 20}).withMessage('Password must be between 4 and 20 characters')], (req : Request, res : Response)=> {
	const errors = validationResult(req)

	if(!errors.isEmpty()) {
		throw new RequestValidationError(errors.array())
	}

	const {email, password} = req.body

	console.log("creating a user")
	throw new DatabaseConnectionError()

	res.send("User created")


})

export {router as signUpRouter}