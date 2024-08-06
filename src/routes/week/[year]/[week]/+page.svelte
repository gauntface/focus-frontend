<script lang="ts">
	import '$lib/styles/reset.css';
	import LayoutFullHeight from '$lib/layouts/LayoutFullHeight.svelte';
	import TaskHeader from '$lib/components/TaskHeader.svelte';
	import { userStore } from '$lib/logic/auth/auth';
	import { parse, getYear, getWeek } from 'date-fns';
	import QuarterTracker from '$lib/components/QuarterTracker.svelte';
	import { getEmptyWeekDetails } from './logic/week';
	import WeekSelector from './logic/components/WeekSelector.svelte';
	import WeekTasks from './logic/components/WeekTasks.svelte';

	// TODO: Get year and week from url parameter
	const yearNum = getYear(new Date());
	const weekNum = getWeek(new Date());

	const weekStr = weekNum.toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false
	});
	const date = parse(`${yearNum} ${weekStr}`, 'YYYY ww', new Date(), {
		useAdditionalWeekYearTokens: true
	});

	const datePriorities = getEmptyWeekDetails(date);
</script>

<LayoutFullHeight>
	<TaskHeader displayName={$userStore?.displayName || ''} {date} selectedView="week" />
	<QuarterTracker {date} />
	<WeekSelector {date} />
	<main>
		<WeekTasks {datePriorities} />
	</main>
</LayoutFullHeight>

<style>
</style>
