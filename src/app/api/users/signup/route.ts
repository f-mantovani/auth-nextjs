import { connect } from '@/dbConfig'
import User from '@/models/User.model'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { returnError } from '@/helpers'

connect()

export const POST = async (request: NextRequest) => {
	try {
		const requestBody = await request.json()
		const { username, password } = requestBody

		const userFromDB = await User.findOne({ username })
		if (userFromDB) {
			throw {
				message: `User already exists`,
				status: 400,
			}
		}

		const hashedPassword = await bcryptjs.hash(password, 12)

		const newUser = await User.create({
			username,
			password: hashedPassword,
		})

		return NextResponse.json(
			{
				message: `User created successfully`,
				username: newUser.username,
			},
			{ status: 201 }
		)
	} catch (error: any) {
		error.path = 'Create user'
		return returnError(error)
	}
}
