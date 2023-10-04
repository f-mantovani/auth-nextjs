import nodemailer from 'nodemailer'
import User from '@/models/User.model'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'

export const sendMail = async ({
	email,
	emailType,
	userId,
}: {
	email: string
	emailType: 'VERIFY' | 'RESET'
	userId: string | Types.ObjectId
}) => {
	try {
		const hashedToken = encodeURIComponent(await bcrypt.hash(userId.toString(), 12))
		const userFromDB = await User.findById(userId)

		if (!userFromDB) throw { message: `Couldn't find the user` }

		if (emailType === 'VERIFY') {
			userFromDB.verifyToken = hashedToken
			userFromDB.verifyTokenExpiry = new Date(Date.now() + 3600000)
			await userFromDB.save()
		} else if (emailType === 'RESET') {
			userFromDB.forgotPasswordToken = hashedToken
			userFromDB.forgotPasswordTokenExpiry = new Date(Date.now() + 3600000)
			await userFromDB.save()
		}

		const transporter = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASS,
			},
		})

		const mailOptions = {
			from: 'auth@no-reply.com',
			to: email,
			subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
			html: `<p>Click <a href="${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}">here </a> to  ${
				emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
			}`,
		}

		const mailRes = await transporter.sendMail(mailOptions)
		return mailRes
	} catch (error: any) {
		throw new Error(error.message)
	}
}
