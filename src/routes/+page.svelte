<script>
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
</script>

<div class="h-full w-full flex justify-center items-center flex-col gap-4">
	<div class="text-lg flex flex-row gap-1 justify-center items-center text-pink-100">
		Welcome to <h1 class="text-2xl text-yellow-400">Tino</h1>
		, an end-to-end and easy to use chat app.
	</div>
	<div class="flex flex-row gap-6">
		<Button on:click={() => goto('/')} class="h-9">Home</Button>
		<Button on:click={() => goto('/chats')} class="h-9">Chats</Button>
		<Button on:click={() => goto('/')} class="h-9">Settings</Button>
	</div>
</div>
