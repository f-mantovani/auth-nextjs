import { connect } from '@/dbConfig'
import User from '@/models/User.model'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { returnError, sendMail } from '@/helpers'

connect()

export const POST = async (request: NextRequest) => {
	try {
		const requestBody = await request.json()
		const { email, password } = requestBody

		const userFromDB = await User.findOne({ email })
		if (userFromDB) {
			throw {
				message: `User already exists`,
				status: 400,
			}
		}

		const hashedPassword = await bcryptjs.hash(password, 12)

		const newUser = await User.create({
			email,
			password: hashedPassword,
		})

		await sendMail({ email, emailType: 'VERIFY', userId: newUser._id })

		return NextResponse.json(
			{
				message: `User created successfully`,
				email: newUser.email,
			},
			{ status: 201 }
		)
	} catch (error: any) {
		error.path = 'Create user'
		return returnError(error)
	}
}
