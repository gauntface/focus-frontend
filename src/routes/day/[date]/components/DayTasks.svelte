<script lang="ts">
	import type { DailyPriority } from '$lib/logic/models/priorities';
	import TextArea from './TextArea.svelte';

	export let priorities: Array<DailyPriority>;
	export let note: string;
	export let loading: boolean;
	export let onNoteChange: (s: string) => void;
	export let onPriorityChange: (idx: number, s: string) => void;
</script>

<div class="c-dt__wrapper">
	<div id="c-dt" class="c-dt">
		<section class="c-dt__tasks-section">
			<h3>Tasks</h3>
			<ol class="c-dt__tasks-list">
				{#each priorities as priority, idx}
					<li class="c-dt__task">
						<TextArea
							value={priority.note}
							onChange={(s) => onPriorityChange(idx, s)}
							rows={1}
							{loading}
						/>
					</li>
				{/each}
			</ol>
		</section>

		<section class="c-dt__notes-section">
			<h3>Notes</h3>
			<div class="c-dt__notes">
				<TextArea value={note} onChange={onNoteChange} rows={3} {loading} />
			</div>
		</section>
	</div>
</div>

<style>
	.c-dt__wrapper {
		container-name: dayTasks;
		container-type: inline-size;
	}

	.c-dt {
		display: grid;
		width: var(--width);
		grid-template:
			'priorities' min-content
			'notes' min-content / 1fr;
		gap: var(--m-padding);
		margin: var(--m-padding) auto;
		text-align: center;
	}

	.c-dt__tasks-section {
		grid-area: priorities;
	}

	.c-dt__notes {
		grid-area: notes;
	}

	.c-dt__tasks-section,
	.c-dt__notes {
		width: 100%;
	}

	.c-dt__tasks-list {
		display: flex;
		flex-direction: column;
		gap: var(--m-padding);
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.c-dt__task,
	.c-dt__notes {
		border-radius: 1rem;
		border-color: var(--pink);
		border-style: solid;
		border-width: var(--border-width-m);
		padding: clamp(1rem, 2vw, 2rem);
	}

	@container dayTasks (width >=700px) {
		.c-dt {
			display: grid;
			grid-template: 'priorities notes' 1fr / 1fr 1fr;
			gap: var(--s-padding) var(--m-padding);
			justify-content: center;
		}
	}
</style>
