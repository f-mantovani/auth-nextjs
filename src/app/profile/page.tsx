import LogoutButton from '@/app/components/LogoutButton'
import axios from 'axios'
import GetUserDetails from '@/app/components/GetUserDetails'

const UserProfile = () => {
	return (
		<div>
			<p>UserProfile</p>
			<br />
			<GetUserDetails />
			<LogoutButton />
		</div>
	)
}
export default UserProfile
