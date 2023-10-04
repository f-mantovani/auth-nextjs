'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const VerifyEmail = () => {
	const [token, setToken] = useState('')
	const [verified, setVerified] = useState(false)
	const [error, setError] = useState(false)

	const verifyUserEmail = async () => {
		try {
			const { data } = await axios.post('/api/users/verify-email', { token })
			setVerified(true)
		} catch (error: any) {
			console.log(error.response)
			setError(true)
		}
	}

	useEffect(() => {
		const urlToken = window.location.search.split('=')[1]
		setToken(urlToken)
	}, [])

	useEffect(() => {
		if (token !== '') {
			console.log('inside the use effect')
			console.log(token)
			verifyUserEmail()
		}
	}, [token])
	return (
		<div>
			<h1>VerifyEmail</h1>
			<p className='bg-sky-700 py-2 rounded text-center'>{token ? `${token}` : 'no token'} </p>
		</div>
	)
}
export default VerifyEmail
