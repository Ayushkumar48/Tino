import { writable } from 'svelte/store';

export const persons = writable([
	{
		person: 'Person1',
		active: 'true'
	},
	{
		person: 'Person2'
	},
	{
		person: 'Person3'
	},
	{
		person: 'Person2'
	},
	{
		person: 'Person3'
	},
	{
		person: 'Person2'
	},
	{
		person: 'Person3'
	}
]);

export const messages = writable([
	{ message: 'Hello there!', send: true, 'd&t': '10/8:00pm' },
	{ message: 'Hi, how are you?', send: false, 'd&t': '10/8:02pm' }
]);
