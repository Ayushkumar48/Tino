import User from '$lib/models/User.js';
import bcrypt from 'bcrypt';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const name = data.get('name');
		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const returnData = { name, username, email };

		// Validation checks
		if (name.length === 0) {
			return fail(400, {
				data: returnData,
				message: "Name can't be empty!"
			});
		}
		if (username.length < 4) {
			return fail(400, {
				data: returnData,
				message: 'Username should be a minimum of 4 characters!'
			});
		}
		if (!emailRegex.test(email)) {
			return fail(400, {
				data: returnData,
				message: 'Please enter a valid email!'
			});
		}
		if (password.length < 4) {
			return fail(400, {
				data: returnData,
				message: 'Password should be a minimum of 4 characters!'
			});
		}
		try {
			const userExists = await User.findOne({ username });
			if (userExists) {
				return fail(400, {
					data: returnData,
					message: 'Username already exists!'
				});
			}

			const emailExists = await User.findOne({ email });
			if (emailExists) {
				return fail(400, {
					data: returnData,
					message: 'Email already exists!'
				});
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = new User({
				name,
				username,
				email,
				password: hashedPassword
			});
			await newUser.save();

			// Set cookie for user
			await cookies.set('username', username, { path: '/', maxAge: 60 * 60 * 24 }); // Cookie expires in 1 day

			// Success response
			// return {
			// 	status: 200,
			// 	body: {
			// 		message: 'User registered successfully!',
			// 		username
			// 	}
			// };
			throw redirect(200, '/chats');
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, {
				data: returnData,
				message: 'Database error. Please try again later.'
			});
		}
	}
};

export function load({ cookies }) {
	if (cookies.get('username')) {
		throw redirect(307, '/chats');
	}
}
