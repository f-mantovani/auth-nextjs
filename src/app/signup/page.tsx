import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Form from '../components/Form'
import Input from '../components/Input/Input'

const SignUpPage = () => {
	const state = { username: '', password: '' }
	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-white text-2xl'>Sign Up</h1>
			<Form state={state} button='Sign Up' route='users/signup' redirectWhere='/login'>
				<Input placeholder='hermano' name='username' required />
				<Input placeholder='*********' name='password' required />
			</Form>
			<div className='w-auto flex flex-col items-center'>
				<p>Already have an account?</p>
				<span className='text-center flex gap-1'>
					Click
					{
						<Link href='/login' className='underline text-sky-400'>
							here
						</Link>
					}
					to login
				</span>
			</div>
		</div>
	)
}
export default SignUpPage
