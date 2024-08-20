import { messages } from '$lib/store';

export async function load({ fetch }) {
	const participatingNumbers = '8302109332+9001699332';
	const response = await fetch(`/api/getMessages?participatingMessages=${participatingNumbers}`);
	const result = await response.json();
	// eslint-disable-next-line no-unused-vars
	messages.update((value) => (value = result.messages.Items));
	return messages;
}
