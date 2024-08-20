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

export const messages = writable([]);
