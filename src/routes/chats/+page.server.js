import { redirect } from '@sveltejs/kit';
export function load({ cookies }) {
	if (!cookies.get('username') || cookies.get('username') === '') {
		throw redirect(307, '/login');
	} else {
		return {
			username: cookies.get('username')
		};
	}
}
