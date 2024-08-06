<script lang="ts" context="module">
	export type ViewSelection = 'day' | 'week'; // | 'quarter';

	export function getFirstName(displayName: string) {
		if (!displayName) {
			return '';
		}

		let name = displayName;
		const parts = name.split(' ');
		if (parts) {
			name = parts[0];
		}
		return name;
	}
</script>

<script lang="ts">
	import { dateHeading } from '../../routes/day/[date]/utils/date-heading';
	import TaskHeaderViewIcons from '../../routes/day/[date]/components/TaskHeaderViewIcons.svelte';

	export let displayName: string;
	export let date: Date;
	export let selectedView: ViewSelection;

	$: firstName = getFirstName(displayName);
	$: displayDate = dateHeading(selectedView, date);
</script>

<div class="c-task-header">
	<div class="c-task-header__wrapper">
		<div class="c-task-header__content">
			<div>
				{#if firstName}<a href="/home"><h2><span>Hey,</span> {firstName}</h2></a>{/if}
				{displayDate}
			</div>

			<div class="c-task-header__view-section">
				How do you like to view your tasks?
				<div class="c-task-header__tasks">
					<TaskHeaderViewIcons {date} {selectedView} />
				</div>
			</div>
		</div>
		<div class="c-task-header__bg"></div>
	</div>
</div>

<style>
	.c-task-header {
		container-name: taskHeader;
		container-type: inline-size;
	}

	.c-task-header__wrapper {
		position: relative;
		width: var(--large-width);
		margin: min(var(--l-padding), calc((100vw - var(--width)) / 4)) auto
			min(var(--m-padding), calc((100vw - var(--width)) / 4)) auto;
	}

	.c-task-header__content {
		display: flex;
		flex-direction: column;
		gap: var(--m-padding);
		width: var(--width);
		margin: 0 auto;
		position: relative;
		z-index: 2;
		padding-top: clamp(1.5rem, 4vh, 4rem);
		padding-bottom: clamp(1.5rem, 4vh, 4rem);
		font-size: clamp(0.75rem, 2vw, 1.3rem);
		text-align: center;
	}

	.c-task-header__content h2 {
		margin: 0;
	}

	.c-task-header__content h2 span {
		font-weight: normal;
	}

	.c-task-header__bg {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 100%;
		background-image: url('/header-blob.svg'), url('/header-blob-2.svg');
		background-repeat: no-repeat, no-repeat;
		background-position:
			-50px 20px,
			right -100px top -100px;
		background-size: 40%, 45%;
		border-radius: 1rem;
		background-color: var(--pink);
		z-index: 1;
	}

	.c-task-header__tasks {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		gap: var(--xs-padding);
	}

	.c-task-header__view-section {
		display: flex;
		flex-direction: column;
		gap: var(--xs-padding);
	}

	@container taskHeader (min-width: 700px) {
		.c-task-header__content {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			text-align: left;
		}
	}

	@container taskHeader (min-width: 800px) {
		.c-task-header__bg {
			background-image: url('/header-blob.svg'), url('/header-blob.svg'), url('/header-blob-2.svg');
			background-repeat: no-repeat, no-repeat, no-repeat;
			background-position:
				-80px 40px,
				center -50px,
				right -100px top -160px;
			background-size: 30%, 30%, 35%;
		}
	}
</style>
