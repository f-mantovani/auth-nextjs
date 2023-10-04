import { NextResponse, NextRequest } from 'next/server'
import User from '@/models/User.model'
import { connect } from '@/dbConfig'
import { returnError } from '@/helpers'

connect()

export const POST = async (request: NextRequest) => {
	try {
		const requestBody = await request.json()
		let { token } = requestBody
		console.log(requestBody)

		const userFromDB = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		})

		if (!userFromDB) throw { message: 'Invalid token', status: 400 }

		userFromDB.isVerified = true
		userFromDB.verifyToken = undefined
		userFromDB.verifyTokenExpiry = undefined
		await userFromDB.save()

		return NextResponse.json({
			message: 'Email verified successfully',
		})
	} catch (error: any) {
		error.path = 'verify email'
		return returnError(error)
	}
}
