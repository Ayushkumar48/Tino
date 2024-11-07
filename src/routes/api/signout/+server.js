// src/routes/api/signout/+server.js
import { json } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	// Clear the "username" cookie
	cookies.set('username', '', {
		path: '/',
		expires: new Date(0) // Expire the cookie immediately
	});

	return json({ message: 'Signed out successfully' });
};
