'use client'
const Input = ({
	handleChange,
	name,
	data,
	placeholder,
	required,
}: {
	name: string
	placeholder: string
	required?: boolean
	handleChange?: () => void
	data?: Record<string, any>
}) => {
	const inputName = name.slice(0, 1).toUpperCase() + name.slice(1)
	return (
		<div className='grid'>
			<label htmlFor={name}>{inputName}:</label>
			<input
				type={name === 'password' ? 'password' : 'text'}
				id={name}
				name={name}
				value={data![name]}
				onChange={handleChange}
				className='text-black rounded bg-slate-100 p-2'
				placeholder={placeholder}
				required={required}
			/>
		</div>
	)
}
export default Input
