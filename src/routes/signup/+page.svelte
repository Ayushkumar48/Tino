<script>
	import { enhance } from '$app/forms';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import toast, { Toaster } from 'svelte-french-toast';
	import { Spinner } from 'flowbite-svelte';
	let closeEye = true;
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
			<p class="text-xl text-left">Create an account</p>
		</div>
		<form class="flex flex-col gap-4 w-full justify-center items-center" method="post" use:enhance>
			<div class="w-[25%] flex flex-col gap-1">
				<label for="name">Name:</label>
				<input
					type="text"
					placeholder="name"
					class="w-full rounded-md text-black"
					name="name"
					required
				/>
			</div>
			<div class="w-[25%] flex flex-col gap-1">
				<label for="email">Email:</label>
				<input
					type="email"
					placeholder="email"
					class="w-full rounded-md text-black"
					name="email"
					required
				/>
			</div>
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
				<div class="w-full relative flex justify-end items-center">
					<input
						type={`${closeEye ? 'password' : 'text'}`}
						placeholder="password"
						class="w-full rounded-md text-black"
						name="password"
						required
					/>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="absolute px-2 text-black hover:cursor-pointer border-l-2 border-black opacity-70"
					>
						{#if closeEye}
							<div on:click={() => (closeEye = false)}>
								<EyeSlashOutline />
							</div>
						{:else}
							<div on:click={() => (closeEye = true)}>
								<EyeOutline />
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-2 justify-center items-center">
				<button
					type="submit"
					class="hover:bg-[#DBAFA0] rounded-md py-1 px-2 border-zinc-900 border-[2.2px] hover:text-black hover:shadow-sm hover:shadow-[#DBAFA0] duration-[250ms] ease-in-out"
					on:submit={() => (checking = true)}
				>
					Create Account
				</button>
				<div>
					Already have an account?
					<a href="/login" class="text-blue-600"> click here </a>
					to login
				</div>
			</div>
		</form>
	</div>
{/if}
