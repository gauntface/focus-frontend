
<script lang="ts">
  export let rows: number;

  const rowWidths = [
    100,
    60,
    80,
    70,
    75,
    60,
    45,
    40,
    50,
    90,
    80,
    90,
  ];

  const skeletonRowWidths: Array<number> = [];
  for (let i = 0; i < rows; i++) {
    skeletonRowWidths.push(rowWidths[i % rowWidths.length]);
  }
</script>

<div class="c-ta-skeleton">
  {#each skeletonRowWidths as rowWidth}
    <div class="c-ta-skeleton__row" style="width: {rowWidth}%;"></div>
  {/each}
</div>

<style>
.c-ta-skeleton {
  display: flex;
  flex-direction: column;
}

.c-ta-skeleton__row {
  display: inline-block;
  width: 100%;
	height: calc(var(--lh) - 8px);
	margin: 4px 0;
	position: relative;
	overflow: hidden;
	background-color: var(--mid-pink);
	border-radius: 1rem;
}

.c-ta-skeleton__row::after {
	content: "";
	position: absolute;
	inset: 0;
	transform: translateX(-100%);
	background-image: linear-gradient(
		90deg,
		rgba(255 214 207 / 0%) 0,
		rgba(255 214 207 / 40%) 20%,
		rgba(255 214 207 / 80%) 60%,
		rgba(255 214 207 / 0%)
	);
	animation: shimmer 2s infinite;
}

@keyframes shimmer {
	100% {
		transform: translateX(100%);
	}
}
</style>
