<script>
	import { calculatePrice, calculateTime, currentCarSize } from './../../../../lib/utils.js';
	import { servicesList } from '$lib/utils.js';
	import YTplayer from '$lib/components/YTplayer.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			if ($currentCarSize === 'compact') {
				const oldCarSize = localStorage?.getItem('carSize');
				if (oldCarSize) {
					currentCarSize.set(oldCarSize);
				}
			}
		}
	});

	export let data;

	const id = $page.params.serviceId;

	const selectedService = servicesList.find((service) => service.id === parseInt(id));

	let name = '';
	let link = '';
	let services = [];
	let price = 0;
	$: price = calculatePrice($currentCarSize, name);
	if (selectedService) {
		name = selectedService.name;
		link = selectedService.link;
		services = selectedService.services;
	}
	const time = calculateTime($currentCarSize, name);
</script>

<div class="w-full h-screen flex flex-col">
	<div class="w-full flex items-center justify-between">
		<a href="/"><i class="fi fi-rr-arrow-left" /></a>
		<h1 class="text-2xl">{name}</h1>
		<div />
	</div>
	<div class="w-full">
		<YTplayer {link} />
	</div>
	{$currentCarSize}
	<div class="flex flex-col">
		<h1 class="text-xl">{name}</h1>
		<ul class="">
			<li>🕐 {time.timeTaken} minutes</li>
			<li>💧 No mess</li>
			<li>🏠 Doorstep</li>
			<li>💸 {price}</li>
		</ul>
	</div>
	<div class="flex flex-col">
		<h1 class="text-xl">Services</h1>
		<ul class="list-disc ml-4">
			{#each services as service}
				<li>{service}</li>
			{/each}
		</ul>
	</div>

	{#if data?.user}
		<a href="/book/{id}"><button class="btn btn-secondary w-11/12">Book</button></a>
	{:else}
		<a href="/login"><button class="btn btn-secondary w-11/12">Login to book</button></a>
	{/if}
</div>
