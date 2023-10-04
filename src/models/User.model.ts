import { Schema, models, model } from 'mongoose'

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Please provide a email'],
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Please provide an email'],
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		forgotPasswordToken: String,
		forgotPasswordTokenExpiry: Date,
		verifyToken: String,
		verifyTokenExpiry: Date,
	},
	{ timestamps: true }
)

const User = models.User || model('User', userSchema)
export default User
