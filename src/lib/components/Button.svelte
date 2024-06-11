<script lang="ts">
  export let modifier: Modifier | undefined = undefined;
</script>

<button on:click class:button--highlight={modifier === Modifier.Highlight} class:button--subtle={modifier === Modifier.Subtle}>
  <slot />
</button>

<script lang="ts" context="module">
  export enum Modifier {
    Highlight = 'highlight',
    Subtle = 'subtle',
  }
</script>

<style>
button {
	font-family: var(--title-family);
	font-weight: 600;
	font-size: 1rem;
	background-color: var(--navy);
	color: var(--light-pink);
	border: none;
	border-radius: 6px;
	padding: var(--xs-padding) var(--m-padding);
	cursor: pointer;
}

button:hover {
	background: var(--navy-lighten);
}

button:active {
	background: var(--navy-darken);
}

.button--highlight {
	background-color: var(--orange);
	color: var(--navy);
}

.button--highlight:hover {
	background-color: var(--orange-lighten);
}

.button--highlight:active {
	background-color: var(--orange-darken);
}

.button--subtle {
	background-color: transparent;
	color: var(--navy);
}

.button--subtle:hover {
	background-color: var(--pink-lighten);
}

.button--subtle:active {
	background-color: var(--pink-darken);
}
</style>
