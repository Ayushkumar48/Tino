<script>
	import { Input } from 'flowbite-svelte';
	import { PaperPlaneOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import io from 'socket.io-client';
	import { writable } from 'svelte/store';

	// Importing user's data from cookies or session
	export let data;
	const { username } = data;
	console.log(username);

	export let receiver = 'Jatin'; // Get this from the current chat (passed as a parameter)

	// Storing messages
	export let messages = writable([
		{ message: 'Hello there!', sender: 'Ayushkumar48', 'd&t': '10/02/2024,8:00 pm' },
		{ message: 'Hi, how are you?', sender: 'jatinsharma4224', 'd&t': '10/02/2024,8:02 pm' }
	]);

	let newMessage = '';
	let socket;
	let chatId = `${username}/*/${receiver}`; // Unique ID for the chat

	// To track who is typing
	let typingUser = '';
	let typingTimeout;

	// Socket connection and handling
	onMount(() => {
		socket = io('http://localhost:3000');

		// Join the room based on chatId
		socket.on('connect', () => {
			console.log('Connected to Socket.IO server');
			socket.emit('joinRoom', chatId); // Join a unique room
		});

		// Receive message from server
		socket.on('chatMessage', (message) => {
			console.log('Message received:', message);
			messages.update((m) => [...m, { ...message, send: message.sender !== username }]);
		});

		// Receive typing indicator
		socket.on('typing', (data) => {
			if (data.sender !== username) {
				typingUser = `${data.sender} is typing...`;
			}
		});

		// Stop typing indicator
		socket.on('stopTyping', (data) => {
			if (data.sender !== username) {
				typingUser = '';
			}
		});

		// Handle reconnection
		socket.on('reconnect', () => {
			console.log('Reconnected to the server');
			socket.emit('joinRoom', chatId); // Rejoin the room after reconnecting
		});

		return () => {
			socket.disconnect();
		};
	});

	// Handle typing indicator
	function handleTyping() {
		socket.emit('typing', { chatId, sender: username });
		clearTimeout(typingTimeout);
		typingTimeout = setTimeout(() => {
			socket.emit('stopTyping', { chatId, sender: username });
		}, 2000); // Stop typing after 2 seconds of no input
	}

	// Send a message
	function sendMessage() {
		if (newMessage.trim() !== '') {
			const date = new Date();
			const hours = date.getHours();
			const minutes = date.getMinutes();
			const day = date.getDate();
			const month = date.getMonth() + 1; // Month is 0-indexed
			const year = date.getFullYear();
			const newformat = hours >= 12 ? 'pm' : 'am';
			const formattedHours = hours % 12 || 12;
			const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

			const dateData = `${day}/${month}/${year},${formattedHours}:${formattedMinutes} ${newformat}`;

			const messageData = {
				message: newMessage,
				sender: username, // Current user (from cookies)
				receiver, // The person being chatted with
				'd&t': dateData,
				chatId // Unique chat room ID
			};

			// Emit message to server
			socket.emit('chatMessage', messageData);

			// Clear typing indicator when message is sent
			clearTimeout(typingTimeout);
			socket.emit('stopTyping', { chatId, sender: username });

			// Update UI
			// messages.update((m) => [...m, { ...messageData, send: true }]);
			newMessage = '';
		}
	}

	// Chat window reference to handle auto-scroll
	let chatWindow;

	// Scroll to bottom when a new message is added
	$: chatWindow && (chatWindow.scrollTop = chatWindow.scrollHeight);
</script>

<!-- Chat Header -->
<div class="h-full w-full flex justify-between flex-col">
	<div class="h-[7%] border-b-2 border-black flex flex-col px-2 justify-center select-none">
		<p class="text-lg">{receiver}</p>
		<p class="text-sm text-zinc-400">Last seen: 8:02pm</p>
	</div>

	<!-- Messages -->
	<div class="h-[87%] overflow-y-auto px-2 py-1 gap-[0.4rem] pb-2" bind:this={chatWindow}>
		{#each $messages as message}
			<div class={`flex ${message.sender === username ? 'justify-end' : 'justify-start'}`}>
				<div class="flex flex-row items-center gap-2">
					<div
						class={`flex flex-col w-full px-2 shadow-xl py-1 rounded-lg text-white 
                        ${message.sender === username ? 'bg-[#3e4753]' : 'bg-sky-700'}`}
					>
						{message.message}
						<div class="text-xs flex pl-8 justify-end w-full opacity-60">
							{message['d&t'].split(',')[1]}
						</div>
					</div>
				</div>
			</div>
		{/each}
		{#if typingUser}
			<p class="text-sm text-gray-400">{typingUser}</p>
			<!-- Display typing indicator -->
		{/if}
	</div>

	<!-- Input -->
	<form class="h-[7.2%] flex flex-row justify-end" on:submit|preventDefault={sendMessage}>
		<div class="w-[95%] flex justify-center items-center p-1">
			<Input
				type="text"
				bind:value={newMessage}
				on:input={handleTyping}
				placeholder="Type a message"
				class="rounded-md bg-slate-800 text-white"
				color="blue"
			/>
		</div>
		<button class="w-[5%] p-1" type="submit">
			<div
				class="border-2 h-full w-auto border-black flex justify-center items-center
                transition-colors rounded-md hover:bg-[#208d77] text-black hover:text-white"
			>
				<PaperPlaneOutline />
			</div>
		</button>
	</form>
</div>
