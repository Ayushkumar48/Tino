<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';
	import { Spinner } from 'flowbite-svelte';

	let checking = false;
	export let form;
	$: if (!form?.message) {
		checking = false;
	} else {
		if (form.status === 200) {
			checking = false;
			toast.success('Logged in successfully!!');
			setTimeout(() => goto('/chats'), 500);
		} else {
			toast.error(form?.message);
			checking = false;
		}
	}
</script>

<Toaster />

{#if checking}
	<div class="h-full w-full flex justify-center items-center">
		<Spinner color="gray" />
	</div>
{:else}
	<div class="w-full h-full flex justify-center flex-col gap-4">
		<div class="flex select-none justify-center">
			<p class="text-xl text-left">Login to Tino</p>
		</div>
		<form class="flex flex-col gap-4 w-full justify-center items-center" method="post" use:enhance>
			<div class="w-[25%] flex flex-col gap-1">
				<label for="username">Username:</label>
				<input
					type="text"
					placeholder="username"
					class="w-full rounded-md text-black"
					name="username"
					required
				/>
			</div>
			<div class="w-[25%] flex flex-col gap-1">
				<label for="password">Password:</label>
				<input
					type="password"
					placeholder="password"
					class="w-full rounded-md text-black"
					name="password"
					required
				/>
			</div>

			<div class="flex flex-col gap-2 justify-center items-center">
				<button
					type="submit"
					class="hover:bg-[#DBAFA0] rounded-md py-1 px-2 border-zinc-900 border-[2.2px] hover:text-black hover:shadow-sm hover:shadow-[#DBAFA0] duration-[250ms] ease-in-out"
					on:submit={() => (checking = true)}
				>
					Login
				</button>
				<div>
					Don't have an account yet?
					<a class="text-blue-600" href="/signup"> create one </a>
				</div>
			</div>
		</form>
	</div>
{/if}
