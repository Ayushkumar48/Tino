<script>
	import { persons } from '$lib/store.js';
	import { SearchOutline, AdjustmentsHorizontalOutline } from 'flowbite-svelte-icons';
	import { goto } from '$app/navigation';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	async function handleSignout() {
		await fetch('/api/signout', {
			method: 'POST'
		});
		goto('/login');
	}
</script>

<div class="gap-4 flex flex-col border-r-2 border-black w-72">
	<div class="flex justify-center items-center border-b-2 border-black py-2 flex-col gap-3">
		<div class="flex w-full pl-4 pr-3 flex-row justify-between select-none">
			<div class="text-2xl flex justify-center items-center">Chats</div>
			<div class="flex flex-row gap-2 justify-between items-center">
				<button
					class="hover:bg-[#DBAFA0] rounded-md py-1 px-2 border-zinc-900 border-[2.2px] hover:text-black hover:shadow-sm hover:shadow-[#DBAFA0] duration-[250ms] ease-in-out"
				>
					New
				</button>
				<button
					class="rounded-full hover:bg-gray-700 p-[0.35rem] duration-150 focus-visible:outline-none focus-visible:border-none"
				>
					<AdjustmentsHorizontalOutline />
					<Dropdown>
						<DropdownItem class="rounded-t">Dashboard</DropdownItem>
						<DropdownItem>Settings</DropdownItem>
						<DropdownItem>Earnings</DropdownItem>
						<DropdownItem class="rounded-b" on:click={handleSignout}>Sign out</DropdownItem>
					</Dropdown>
				</button>
			</div>
		</div>
		<div class="relative px-4">
			<input
				type="text"
				name="person"
				id="person"
				placeholder="search..."
				class="rounded-md bg-slate-800 shadow-sm shadow-slate-300 border-solid w-full pl-9"
			/>
			<SearchOutline class="absolute top-1/2 left-6 transform -translate-y-1/2 text-gray-400" />
		</div>
	</div>
	<div class="flex flex-col px-2 gap-1">
		{#each $persons as person}
			<button
				class={`flex items-center px-2 h-12 rounded-md cursor-default select-none ${person?.active ? 'bg-[#1b17179c]' : 'hover:bg-[#1212125b]'}`}
			>
				<h1>{person.person}</h1>
			</button>
		{/each}
	</div>
</div>
