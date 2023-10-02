'use client'

import {
	ChangeEvent,
	Children,
	FormEvent,
	ReactElement,
	cloneElement,
	useEffect,
	useState,
} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Form = ({
	children,
	state,
	button,
	route,
	redirectWhere,
}: {
	children: ReactElement[]
	state: Record<string, any>
	button: string
	route: string
	redirectWhere: string
}) => {
	const [data, setData] = useState(state)
	const [buttonDisable, setButtonDisable] = useState(true)
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const property = e.target.name
		setData({ ...data, [property]: e.target.value })
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		setLoading(true)
		setButtonDisable(true)
		toast
			.promise(axios.post(`/api/${route}`, data), {
				loading: 'Loading',
				success: ({ data }) => {
					return `${data.message}`
				},
				error: ({ response: { data } }) => {
					return `${data.message}`
				},
			})
			.then(() => {
				router.push(redirectWhere)
			})
			.catch((error) => console.log(error))
			.finally(() => {
				setLoading(false)
				setButtonDisable(false)
			})
	}
	const handleReset = () => {
		setData(state)
	}

	useEffect(() => {
		const buttonDisabler = new Map<string, boolean>()
		let count = 0
		const props = children.filter((child: { props: { name: string; required: boolean } }) => {
			const name = child.props.name
			const required = child.props.required
			if (required) {
				buttonDisabler.set(name, data[name].length > 0)
				return child.props.name
			}
		})

		buttonDisabler.forEach((state) => {
			if (state) {
				count += 1
			} else {
				count -= 1
			}
		})

		if (count === props.length) {
			setButtonDisable(false)
		} else {
			setButtonDisable(true)
		}
	}, [data, children])

	return (
		<form onSubmit={handleSubmit} className='flex items-center justify-center my-4 flex-col gap-4'>
			<Toaster position='top-right' />
			{Children.map(children, (child: ReactElement) => cloneElement(child, { handleChange, data }))}
			<div className='flex gap-2 self-end'>
				<button
					className={`py-2 px-3 rounded ${
						loading
							? 'bg-slate-800 text-black'
							: !buttonDisable
							? 'bg-sky-300  text-gray-700 '
							: 'bg-slate-800 text-black'
					}`}
					type='submit'
					disabled={buttonDisable}
				>
					{loading ? `Sending...` : button}
				</button>
				<button
					className='bg-red-500 py-2 px-3 text-white rounded'
					type='reset'
					onClick={handleReset}
				>
					Cancel
				</button>
			</div>
		</form>
	)
}
export default Form
