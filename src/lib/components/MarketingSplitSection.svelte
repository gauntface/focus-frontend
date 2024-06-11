<section class="c-mkt-split__wrapper">
  <div class="c-mkt-split">
    <slot />
  </div>
</section>

<style>
.c-mkt-split__wrapper {
	container-name: mktSplit;
	container-type: inline-size;
	margin: var(--xl-padding) 0;
}

.c-mkt-split {
	display: grid;
	gap: var(--m-padding);
	width: var(--width);
	margin: 0 auto;
}

.c-mkt-split :global(h3) {
	max-width: 60vw;
	text-align: center;
	margin: 0 auto;
}

.c-mkt-split :global(img) {
	width: 100%;
	height: auto;
}

@container mktSplit (min-width: 800px) {
	.c-mkt-split {
		display: grid;
		grid-template: ". ." 1fr / 1fr 1fr;
		gap: 0 0;
		align-items: center;
	}

	.c-mkt-split :global(h3) {
		text-align: right;
		padding-left: 20%;
	}

	.c-mkt-split :global(h3:first-child) {
		text-align: left;
		padding-right: 20%;
	}
}
</style>
