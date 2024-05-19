<div class="c-mkt-purpose">
	<div class="c-mkt-purpose--container">
		<div class="c-mkt-purpose--title">
			<div class="c-mkt-purpose--icon">
				<img width="48" height="48" src="/marketing/goal.svg" alt="Goal" />
			</div>
			Clear Goals
		</div>
		<p>Set daily goals to focus and prioritize your day, moving you closer to your goals.</p>


		<div class="c-mkt-purpose--title">
			<div class="c-mkt-purpose--icon">
				<img width="48" height="48" src="/marketing/checklist.svg" alt="Check list" />
			</div>
			Don't Be Overwhelmed
		</div>
		<p>It's easy to become overwhelmed with an ever growing to-do list.
			Focusing one day at a time can help remove this risk.
		</p>


		<div class="c-mkt-purpose--title">
			<div class="c-mkt-purpose--icon">
				<img width="48" height="48" src="/marketing/checkmark.svg" alt="Check mark" />
			</div>
			Track Progress
		</div>
		<p>We all get asked what we've been up, with Focus it's easy
			to share progress when you can get an overwiew of your week and months.
		</p>
	</div>
</div>

<style>
.c-mkt-purpose {
	list-style: none;
	padding: 0;
	container-name: mktPurpose;
	container-type: inline-size;
}

.c-mkt-purpose--title {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: var(--s-padding);
	border-radius: 1rem;
	font-weight: bold;
	font-size: 1.1rem;
}

.c-mkt-purpose--container > p {
	padding-left: calc(68px + var(--s-padding));
	margin-top: 0;
	margin-bottom: var(--l-padding);
}

.c-mkt-purpose--container > p:last-child {
	margin-bottom: 0;
}

.c-mkt-purpose--icon {
	width: 68px;
	height: 68px;
	padding: var(--s-padding);
	border-radius: 100%;
	background: var(--dark-pink);
}

.c-mkt-purpose--icon img {
	width: 100%;
	height: 100%;
}

@container mktPurpose (min-width: 360px) {
	.c-mkt-purpose--container {
		display: grid;
		grid-template-columns: min-content 1fr;
		grid-template-rows: repeat(3 auto);
		gap: var(--s-padding);
	}

	.c-mkt-purpose--container > p {
		padding-left: 0;
		margin-bottom: 0;
	}

	.c-mkt-purpose--title {
		flex-direction: column;
		background: var(--pink);
		padding: var(--s-padding);
		text-align: center;
	}
}

@container mktPurpose (min-width: 480px) {
	.c-mkt-purpose--container {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-template-rows: min-content 1fr;
	}

	.c-mkt-purpose--title {
		padding: var(--m-padding);
	}

	/* stylelint-disable declaration-block-no-redundant-longhand-properties */
	.c-mkt-purpose--title:nth-of-type(1) {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.c-mkt-purpose--container > p:nth-of-type(1) {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}

	.c-mkt-purpose--title:nth-of-type(2) {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.c-mkt-purpose--container > p:nth-of-type(2) {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
	}

	.c-mkt-purpose--title:nth-of-type(3) {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.c-mkt-purpose--container > p:nth-of-type(3) {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 2;
		grid-row-end: 3;
	}
}
</style>
