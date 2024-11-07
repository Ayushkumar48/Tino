import User from '$lib/models/User.js';
import bcrypt from 'bcrypt';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const dbResult = await User.findOne({ username });

		if (!dbResult) {
			return fail(400, {
				username,
				message: "User doesn't exist"
			});
		}

		const isMatch = await bcrypt.compare(password, dbResult.password);

		if (isMatch) {
			cookies.set('username', username, { path: '/' });
			return {
				status: 200,
				body: {
					username: username
				}
			};
		} else {
			return fail(400, {
				username,
				message: 'Password is incorrect!'
			});
		}
	}
};

export function load({ cookies }) {
	if (cookies.get('username')) {
		throw redirect(307, '/chats');
	}
}
