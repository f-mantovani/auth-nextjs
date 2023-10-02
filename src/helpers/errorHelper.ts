import { NextResponse } from 'next/server'

type Error = {
	message: string
	path: string
	status: number
}

export const returnError = (error: Error) =>
	NextResponse.json({ message: error.message, path: error.path }, { status: error.status })
