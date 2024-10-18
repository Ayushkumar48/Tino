<script>
	import { Input } from 'flowbite-svelte';
	import { PaperPlaneOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import io from 'socket.io-client';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	// Store to manage chat messages
	export let messages = writable([]);

	let newMessage = ''; // The message input field value
	let socket; // Socket.IO instance

	// When the component mounts, connect to the Socket.IO server
	onMount(() => {
		// Connect to the backend (localhost:3000)
		socket = io('http://localhost:3000');

		// Log connection status
		socket.on('connect', () => {
			console.log('Connected to Socket.IO server');
		});

		// Listen for incoming messages from the server
		socket.on('chatMessage', (message) => {
			console.log('Message received:', message); // Log the received message
			messages.update((m) => [...m, { ...message, send: false }]); // Update the message store with received message
		});

		// Disconnect the socket when the component unmounts
		return () => {
			socket.disconnect();
		};
	});

	// Send a message to the server
	function sendMessage() {
		if (newMessage.trim() !== '') {
			const messageData = {
				message: newMessage,
				send: true, // Indicates that this message is sent by the current user
				'd&t': new Date().toLocaleString() // Example timestamp
			};

			socket.emit('chatMessage', messageData); // Send message to server
			messages.update((m) => [...m, messageData]); // Update local store with the new message
			newMessage = ''; // Clear the input field
			console.log('Sent message:', messageData); // Log the sent message
		}
	}
</script>

<div class="h-full w-full flex justify-between flex-col">
	<!-- Header Section with the chat participant's name and time -->
	<div class="h-[7%] border-b-2 border-black flex flex-col px-2 justify-center select-none">
		<p class="text-lg">Person1</p>
		<p class="text-sm text-zinc-400">Time: 8:30pm</p>
	</div>

	<!-- Chat Messages Section -->
	<div class="h-[87%] flex justify-end flex-col px-2 py-1 gap-[0.4rem] pb-2">
		{#each $messages as message}
			<div class={`flex ${message.send ? 'justify-end' : 'justify-start'}`}>
				<div class="flex flex-row items-center gap-2">
					<p
						class={`bg-[#2a3546] inline-block px-2 py-1 rounded-lg ${message.send ? 'text-white' : 'text-black'}`}
					>
						{message.message}
					</p>
					<!-- Display date and time on hover -->
					<p transition:fade={{ duration: 200 }}>{message['d&t']}</p>
				</div>
			</div>
		{/each}
	</div>

	<!-- Input Section for sending messages -->
	<form class="h-[7.2%] flex flex-row justify-end" on:submit|preventDefault={sendMessage}>
		<div class="w-[95%] flex justify-center items-center p-1">
			<Input
				type="text"
				bind:value={newMessage}
				placeholder="Type a message"
				class="rounded-md bg-slate-800 text-white"
				color="blue"
			/>
		</div>
		<button class="w-[5%] p-1" type="submit">
			<div
				class="border-2 h-full w-auto border-black flex justify-center items-center transition-colors rounded-md hover:bg-[#208d77] text-black hover:text-white"
			>
				<PaperPlaneOutline />
			</div>
		</button>
	</form>
</div>
