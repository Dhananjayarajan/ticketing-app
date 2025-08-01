import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
	email: string;
	password: string;
}

interface UserModel extends mongoose.Model<UserDoc>{
	build(attrs: UserAttrs): UserDoc;
} 

interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required : true
	},
	password: {
		type: String,
		required : true
	}
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
});


userSchema.statics.build = (attrs : UserAttrs) => {
	return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export {User}
