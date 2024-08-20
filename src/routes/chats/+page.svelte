<script>
	import { Input } from 'flowbite-svelte';
	import { PaperPlaneOutline } from 'flowbite-svelte-icons';
	import { messages } from '$lib/store';
	import { fade } from 'svelte/transition';
	let showTime = false;

	// export let data;
</script>

<div class="h-full w-full flex justify-between flex-col">
	<div class="h-[7%] border-b-2 border-black flex flex-col px-2 justify-center select-none">
		<p class="text-lg">Person1</p>
		<p class="text-sm text-zinc-400">Time:8:30pm</p>
	</div>
	<div class="h-[87%] flex justify-end flex-col px-2 py-1 gap-[0.4rem] pb-2">
		{#each $messages as message}
			<div class={`flex ${message?.send ? 'justify-end' : 'justify-start'} `}>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<div
					class="flex flex-row items-center gap-2"
					on:mouseover={() => (showTime = true)}
					on:mouseleave={() => (showTime = false)}
				>
					<p class="bg-[#2a3546] inline-block px-2 py-1 rounded-lg">{message.message}</p>
					{#if showTime}
						<p transition:fade={{ duration: 200 }}>{message['d&t'].split('/')[1]}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
	<form class="h-[7.2%] flex flex-row justify-end">
		<div class="w-[95%] flex justify-center items-center p-1">
			<Input
				type="text"
				placeholder="type a message"
				class="rounded-md  bg-slate-800 text-white "
				color="blue"
			/>
		</div>
		<button class=" w-[5%] p-1">
			<div
				class="border-2 h-full w-auto border-black flex justify-center items-center transition-colors rounded-md hover:bg-[#208d77] text-black hover:text-white"
			>
				<PaperPlaneOutline />
			</div>
		</button>
	</form>
</div>
