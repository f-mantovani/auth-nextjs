import { NextResponse, NextRequest } from 'next/server'
import { connect } from '@/dbConfig'
import User from '@/models/User.model'
import { getTokenData, returnError } from '@/helpers'

connect()

export const GET = async (request: NextRequest) => {
	try {
		const { _id } = await getTokenData(request)
		const userFromDB = await User.findById(_id).select('-password')
		return NextResponse.json({ user: userFromDB })
	} catch (error: any) {
		return returnError(error)
	}
}
