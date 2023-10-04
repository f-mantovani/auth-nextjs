'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
	const router = useRouter()
	const logout = async () => {
		try {
			await axios.get('/api/users/logout')
			router.push('/login')
		} catch (error: any) {
			console.log(error)
		}
	}
	return (
		<button className='bg-sky-400 border-b-black rounded p-2 text-slate-950' onClick={logout}>
			Logout
		</button>
	)
}
export default LogoutButton
