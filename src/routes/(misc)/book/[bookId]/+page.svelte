<script>
	import DateSelector from './../../../../lib/components/DateSelector.svelte';
	import {
		calculatePrice,
		calculateTime,
		currentCarSize,
		deleteOverlappingSlotsForWashers2,
		formatDate2,
		getDistance,
		splitTimeSlots,
		textDateToUTC
	} from './../../../../lib/utils.js';
	import Rain from '$lib/components/Rain.svelte';
	import { servicesList } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { PUBLIC_DB_URL } from '$env/static/public';
	import PocketBase from 'pocketbase';

	//initialising the washers in your area everytime the page first loads or is mounted
	onMount(async () => {
		filteredWashers = await getWashers();
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			if ($currentCarSize === 'compact') {
				const oldCarSize = localStorage?.getItem('carSize');
				if (oldCarSize) {
					currentCarSize.set(oldCarSize);
				}
			}
		}
	});

	const pb = new PocketBase(PUBLIC_DB_URL);
	pb.autoCancellation(false);

	export let data;
	let availableSlots = {};
	let displaySlots = [];
	let filteredWashers = []; //filtered list off washers in the users area
	let filledSlotsForSelectedDate = []; //realtime dynamic raray that chnages based on the selectedDate and
	// conatines filled slost for the date for every washer in the
	// filteredWahsers array

	//get price an services based on the url parameters
	const id = $page.params.bookId;
	const selectedService = servicesList.find((service) => service.id === parseInt(id));

	let name = '';
	let link = '';
	let services = [];
	let selectedSlot = {};
	let selectedWasherId = '';
	let selectedWasherContact = '';

	if (selectedService) {
		name = selectedService.name;
		link = selectedService.link;
		services = selectedService.services;
	}

	let triggerRain = false;

	function rain() {
		triggerRain = !triggerRain;
	}

	let price = 0;
	$: price = calculatePrice($currentCarSize, name);
	let selectedDate = '';
	let day = '';
	$: day = selectedDate.toLocaleString('default', { weekday: 'long' });
	const time = calculateTime($currentCarSize, name);

	///realtime subscribed to the array
	pb.collection('filledSlots').subscribe('*', async (e) => {
		filterFilledSlotsByWashers();
		init(selectedDate);
	});

	//reacting to the changes made in the date by the user
	$: init(selectedDate);

	async function init(selectedDate) {
		await filterFilledSlotsByWashers();
		availableSlots = deleteOverlappingSlotsForWashers2(
			filteredWashers,
			filledSlotsForSelectedDate,
			day,
			time.slotTaken
		);
		displaySlots = splitTimeSlots(availableSlots, day, time.slotTaken);
	}

	async function filterFilledSlotsByWashers() {
		const slotsForWasher = await getFilledSlotsForDate(selectedDate);
		filledSlotsForSelectedDate = filteredWashers.flatMap((washer) =>
			slotsForWasher.filter((slot) => slot.washerId === washer.id)
		);
	}

	//getting the washers in users vicinity
	async function getWashers() {
		let initialWashers = await pb.collection('washers').getFullList();
		const userLoc = JSON.parse(localStorage?.getItem('coords'));

		let filteredWashers2 = initialWashers.filter((washer) => {
			const washerLoc = washer.anchor;
			const distance = getDistance(userLoc.lat, userLoc.lng, washerLoc.lat, washerLoc.lng);
			const radiusKm = 5;
			return distance <= radiusKm;
		});

		return filteredWashers2;
	}

	// Function to fetch filled slots for a specific date (ignoring time)
	async function getFilledSlotsForDate(date) {
		const formattedDate = formatDate2(date); // Extracting date part
		const slots = await pb.collection('filledSlots').getFullList({
			filter: `date >= '${formattedDate} 00:00:00' && date <= '${formattedDate} 23:59:59'`
		});
		return slots;
	}

	let showPopup = false;

	function togglePopup() {
		showPopup = !showPopup;
	}

	async function placeOrder() {
		const order = {
			slot: selectedSlot,
			userId: data?.user?.id,
			service: name,
			date: textDateToUTC(selectedDate),
			washerId: selectedWasherId,
			location: localStorage?.getItem('coords'),
			userContact: data?.user?.contact,
			washerContact: selectedWasherContact,
			car: localStorage?.getItem('car'),
			carSize: localStorage?.getItem('carSize'),
			address: localStorage?.getItem('address')
		};

		try {
			const record = await pb.collection('filledSlots').create(order);
			if (record) {
				window.location.href = '/';
			}
		} catch (error) {
			return error;
		}
	}

	onDestroy(() => {
		pb.collection('filledSlots').unsubscribe('*');
	});
</script>

<div class="w-full h-screen flex flex-col">
	<div class="w-full flex items-center justify-between">
		<a href="/services/{id}"><i class="fi fi-rr-arrow-left" /></a>
		<h1 class="text-2xl">{name}</h1>
		<div />
	</div>
	<div>
		<DateSelector bind:selectedDate />
	</div>
	<br />

	<div class="alert flex">
		<span>💸</span>
		<span class="text-sm">You pay after the wash is done </span>
	</div>
	<br /><br />
	<div>
		<h1>Price: {price} for {$currentCarSize}</h1>
		<br />
		<h1>Time: {time.slotTaken} minutes</h1>
	</div>
	<br /><br />
	<div />
	<div>
		{#if availableSlots.length === 0}
			<p>please select a date first</p>
		{/if}
		{#if availableSlots.length !== 0}
			{#if displaySlots.length === 0}
				<p>no slots available for this date</p>
			{:else}
				{#each displaySlots as ds}
					<button
						class="btn {selectedSlot === ds.slot ? 'btn-secondary btn-outline' : 'btn-ghost'}"
						on:click={() => {
							selectedSlot = ds.slot;
							selectedWasherId = ds.id;
							selectedWasherContact = ds.contact;
						}}>{ds.slot.start}</button
					>
				{/each}
			{/if}
		{/if}
	</div>
	{#if showPopup}
		<div
			on:click={togglePopup}
			class="w-full h-full backdrop-blur-sm absolute flex flex-col justify-center"
		>
			<div class="card w-96 bg-primary text-primary-content">
				<div class="card-body">
					<h2 class="card-title">{name}</h2>
					<p>Confirm your order 🚗:</p>
					<ul>
						<li>Service: {name} 🧼</li>
						<li>Date and Time: {selectedDate} {selectedSlot} 🕒</li>
						<li>Cancel anytime if the reason is valid ❌</li>
						<li>No additional services outside order 🚫</li>
						<li>Remove valuables before service 💍</li>
						<li>Park car in shade if possible ☂️</li>
					</ul>
					<button class="btn" on:click={placeOrder}>Confirm</button>
				</div>
			</div>
		</div>
	{/if}

	<div>
		<button class="btn btn-secondary w-full mt-96" on:click={togglePopup}>BOOK</button>
	</div>
	<!-- {#if triggerRain}
		<Rain />
		<a href="/"><button on:click={rain} class="btn btn-secondary w-11/12">Go to bookings</button></a
		>
	{:else}
		<button on:click={rain} class="btn btn-secondary w-11/12">Book</button>
	{/if} -->
</div>
