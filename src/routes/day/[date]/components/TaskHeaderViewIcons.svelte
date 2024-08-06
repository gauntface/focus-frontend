<script lang="ts">
	import { getWeek, getYear } from 'date-fns';
	import type { ViewSelection } from '../../../../lib/components/TaskHeader.svelte';

	export let date: Date;
	export let selectedView: ViewSelection;

	const views = [
		{
			text: 'Daily',
			img: {
				src: '/icons/day-view.svg',
				alt: 'Day view icon'
			},
			view: 'day' as ViewSelection,
			link: '/home'
		},
		{
			text: 'Weekly',
			img: {
				src: '/icons/week-view.svg',
				alt: 'Week view icon'
			},
			view: 'week' as ViewSelection,
			link: `/week/${getYear(date)}/${getWeek(date)}`
		}
		/* {
    text: 'Quarter',
    img: (<Image width="28" height="28" src="/icons/quarter-view.svg" alt="Quarter view icon" />),
    view: 'quarter',
  },*/
	];
</script>

{#each views as view}
	<div>
		<a
			href={view.link}
			class="c-task-header__task"
			class:c-task-header__task--selected={selectedView === view.view}
		>
			<img width="28" height="28" src={view.img.src} alt={view.img.alt} />
			{view.text}
		</a>
	</div>
{/each}

<style>
	.c-task-header__task {
		width: 80px;
		height: 80px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		text-align: center;
		justify-content: center;
		align-items: center;
		opacity: 0.5;
		border-style: solid;
		border-width: 3px;
		border-radius: 6px;
		font-size: 0.6em;
		font-weight: bold;
		text-transform: uppercase;
		cursor: pointer;
	}

	.c-task-header__task--selected {
		border-style: none;
		background-color: var(--orange);
		opacity: 1;
	}
</style>
