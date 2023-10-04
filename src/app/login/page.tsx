import Form from '../components/Form'
import Input from '../components/Input/Input'
import Link from 'next/link'

const LoginPage = () => {
	const state = { username: '', password: '' }
	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-white text-2xl'>Login</h1>
			<Form state={state} button='Login' route='users/login' redirectWhere='/profile'>
				<Input placeholder='hermano' name='username' required />
				<Input placeholder='*********' name='password' required />
			</Form>
			<div className='w-auto flex flex-col items-center'>
				<p>Don&apos;t have an account?</p>
				<span className='text-center flex gap-1'>
					Click
					{
						<Link href='/signup' className='underline text-sky-400'>
							here
						</Link>
					}
					to signup
				</span>
			</div>
		</div>
	)
}
export default LoginPage
