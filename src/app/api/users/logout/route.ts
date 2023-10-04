import { NextResponse, NextRequest } from 'next/server'
import { returnError } from '@/helpers'

export const GET = async () => {
	try {
		const response = NextResponse.json({ message: 'logout successful' }, { status: 200 })
		response.cookies.delete('token')
		return response
	} catch (error: any) {
		error = {
			message: 'Logout failed',
			status: 400,
			path: 'logout',
		}
		return returnError(error)
	}
}
