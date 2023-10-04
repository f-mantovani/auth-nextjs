const ProfileId = ({ params }: { params: { id: string } }) => {
	return (
		<div className='text-3xl text-center'>
			<h1>Profile page</h1>
			<div className='m-4'>
				<span className='bg-orange-400 p-2 px-4  rounded'>{params.id}</span>
			</div>
		</div>
	)
}
export default ProfileId
