import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface Token extends JwtPayload {
	_id: string
	username: string
}

export const getTokenData = async (request: NextRequest) => {
	try {
		const token = request.cookies.get('token')?.value || ''

		const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as Token
		return decoded
	} catch (error: any) {
		error = {
			path: 'JWT Validation',
			status: 401,
			message: 'Token Validation Failed',
		}
		throw error
	}
}
