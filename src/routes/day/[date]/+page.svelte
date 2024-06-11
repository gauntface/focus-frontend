<script lang="ts">
	import LayoutFullHeight from '$lib/layouts/LayoutFullHeight.svelte';
	import TaskHeader from './components/TaskHeader.svelte';
	import QuarterTracker from './components/QuarterTracker.svelte';
	import DayTasks from './components/DayTasks.svelte';
	import { userStore } from '$lib/logic/auth/auth';
	import {
		getDailyPriorities,
		setDailyPriorities,
		type DailyPriority
	} from '$lib/logic/models/priorities';
	import { getDailyNotes } from '$lib/logic/models/notes';
	import type { User } from 'firebase/auth';
	import { debounce } from 'lodash-es';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';

	const DEBOUNCE_DURATION = 2000;

	// TODO: Get date from url parameter
	let date = new Date();
	let priorities: Array<DailyPriority> = getEmptyPriorities();
	let note: string = '';
	let loading = true;

	function onNoteChange(n: string) {
		note = n;
	}

	let toastID: number | undefined;
	const setPriorities = debounce(async () => {
		console.log(`Doing API call`);
		try {
			await setDailyPriorities($userStore, date, priorities);

			toast.push('✅ Save successful', {
				duration: 1500
			});
		} catch (err) {
			console.error(`Failed to save priorities: ${err}`);
		} finally {
			toast.pop(toastID);
			toastID = undefined;
		}
	}, DEBOUNCE_DURATION);

	function onPriorityChange(idx: number, s: string) {
		priorities[idx].note = s;
		console.log(`onPriorityChange: ${idx} ${s}`);
		if (toastID === undefined) {
			toastID = toast.push('<div class="loader"></div> Saving tasks...', {
				// Toast can only be dismissed programatically
				dismissable: false,
				initial: 0
			});
		}
		setPriorities();
	}

	function getEmptyPriorities() {
		return [
			{
				note: '',
				order: 0
			},
			{
				note: '',
				order: 0
			},
			{
				note: '',
				order: 0
			}
		];
	}

	async function initialize(user: User | null) {
		if (!user) {
			return;
		}

		const [ps, ns] = await Promise.all([getDailyPriorities(user, date), getDailyNotes(user, date)]);
		priorities = ps;
		note = ns;
		loading = false;
	}

	$: initialize($userStore);
</script>

<LayoutFullHeight>
	<TaskHeader displayName={$userStore?.displayName || ''} {date} selectedView="day" />
	<QuarterTracker {date} />
	<main>
		<DayTasks {priorities} {note} {loading} {onNoteChange} {onPriorityChange} />
	</main>
</LayoutFullHeight>

<SvelteToast />

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: var(--m-padding);
		--toastContainerBottom: var(--s-padding);
		--toastContainerLeft: auto;

		/* The following vars are to alter toastify */
		--toastBackground: var(--pink);
		--toastBarBackground: var(--navy);
		--toastColor: var(--navy);
	}

	:global(._toastMsg .loader) {
		vertical-align: middle;
		margin: 0 var(--xxs-padding);
	}
</style>
