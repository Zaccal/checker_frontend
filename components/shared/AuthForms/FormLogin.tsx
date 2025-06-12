import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const FormLogin = () => {
	return (
		<form>
			<h1 className="text-center font-bold text-2xl">Welcome back! ✌️</h1>
			<p className="text-center text-muted-foreground mt-2">
				Enter your email and password to log in to your account.
			</p>

			<div className="mt-6">
				<Label className="pb-3" htmlFor="email">
					Email address / Username
				</Label>
				<Input placeholder="name@example.com" />
				<Label className="pb-3 mt-5" htmlFor="email">
					Password
				</Label>
				<Input type="password" placeholder="***********" />
			</div>
		</form>
	)
}

export default FormLogin
