import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/models/User.model'
import { connect } from '@/dbConfig'
import { returnError } from '@/helpers'
import jwt from 'jsonwebtoken'

connect()

export const POST = async (request: NextRequest) => {
	try {
		const requestBody = await request.json()
		const { username, password } = requestBody

		const userFromDB = await User.findOne({ username })

		if (!userFromDB) {
			throw {
				message: `Username and/or password incorrect`,
				status: 400,
			}
		}

		const passwordMatcher = await bcryptjs.compare(password, userFromDB.password)

		if (!passwordMatcher) {
			throw {
				message: `Username and/or password incorrect`,
				status: 400,
			}
		}

		const payload = {
			username: userFromDB.username,
			_id: userFromDB._id,
		}

		const token = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: '1h' })

		const response = NextResponse.json({ message: 'Login successfully' }, { status: 200 })
		response.cookies.set('token', token, { httpOnly: true })

		return response
	} catch (error: any) {
		error.path = 'Login user'
		return returnError(error)
	}
}
