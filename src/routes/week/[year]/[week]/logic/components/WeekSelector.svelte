<script lang="ts">
	import { add, sub, format, getWeek, getWeekYear } from 'date-fns';

	export let date: Date;

	const prevWeek = sub(date, { weeks: 1 });
	const nextWeek = add(date, { weeks: 1 });
</script>

<div class="c-ws">
	<a
		class="c-ws__left"
		href={`/week/${getWeekYear(prevWeek)}/${getWeek(prevWeek)}`}
		aria-label="Previous week"
	>
		<img width="8" height="14" src="/icons/arrow.svg" alt="Left arrow" />
	</a>
	{format(nextWeek, 'MMMM yyyy')} - Week {getWeek(date)}
	<a
		class="c-ws__right"
		href={`/week/${getWeekYear(nextWeek)}/${getWeek(nextWeek)}`}
		aria-label="Next week"
	>
		<img width="8" height="14" src="/icons/arrow.svg" alt="Right arrow" />
	</a>
</div>

<style>
	.c-ws {
		display: flex;
		flex-direction: row;
		gap: var(--s-padding);
		align-items: center;
		justify-content: center;
		margin: min(var(--l-padding), calc((100vw - var(--width)) / 4)) auto;
	}

	.c-ws__left,
	.c-ws__right {
		display: inline-flex;
		width: 28px;
		height: 28px;
		border-radius: 100%;
		background-color: var(--pink);
		justify-content: center;
		align-items: center;
	}

	.c-ws__right {
		transform: rotate(180deg);
	}
</style>
