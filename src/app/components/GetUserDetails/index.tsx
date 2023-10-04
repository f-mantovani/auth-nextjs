'use client'

import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'

const GetUserDetails = () => {
	const [user, setUser] = useState<null | {
		email: string
		_id: string
	}>(null)

	const getUserInfo = async () => {
		try {
			const { data } = await axios.get('/api/users/verify')
			setUser(data.user)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='flex flex-col gap-2 my-2'>
			{user && (
				<>
					<Link className='py-2 bg-green-600 rounded text-center' href={`/profile/${user._id}`}>
						Go to your profile
					</Link>
					<button className='bg-violet-600 py-2 rounded text-center'>
						Resend mail confirmation
					</button>
				</>
			)}
			<button onClick={getUserInfo}> UserDetais: {user && user.email}</button>
		</div>
	)
}
export default GetUserDetails
