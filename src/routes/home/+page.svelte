<script lang="ts">
	import Day from '../day/[date]/+page.svelte';

	$: date = new Date();

	function runAtNextDay(callback: () => void) {
		const now = new Date();
		const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
		const timeToNextDay = nextDay.getTime() - now.getTime();

		setTimeout(callback, timeToNextDay);
	}

	runAtNextDay(() => {
		console.log(`🗓️ It's a new day.`);
		date = new Date();
	});
</script>

<Day {date} />
