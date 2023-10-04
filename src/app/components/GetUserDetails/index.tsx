'use client'

import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'

const GetUserDetails = () => {
	const [user, setUser] = useState<null | {
		username: string
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
				<Link className='p-2 bg-green-600 rounded' href={`/profile/${user._id}`}>
					Go to your profile
				</Link>
			)}
			<button onClick={getUserInfo}> UserDetais: {user && user.username}</button>
		</div>
	)
}
export default GetUserDetails
