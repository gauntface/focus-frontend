<script lang="ts">
import TextAreaSkeleton from './TextAreaSkeleton.svelte';

export let loading: boolean;
export let rows: number;
export let onChange: (s: string) => void;
export let value: string;

const handleChange = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
	onChange(target.value);
};
</script>

<div class="c-ta">
{#if loading}
  <TextAreaSkeleton {rows} />
{:else}
  <textarea class="c-ta__textarea" {rows} bind:value on:input={handleChange}></textarea>
{/if}
</div>

<style>
  .c-ta {
    --lh: 2rem;

    display: flex;
    flex-direction: column;
    font-size: calc(var(--lh) * 0.6);
    text-align: start;
  }

  .c-ta__textarea {
    field-sizing: content;

    width: 100%;
    background: none;
    padding: 0;
    color: inherit;
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 1.2rem;
    font-family: var(--default-family);
    font-weight: 500;
    line-height: var(--lh);
    background-size: 100% var(--lh);
    background-attachment: local;

    /* Ensure long lines are wrapped */
    word-break: break-word;
    word-wrap: break-word;

    /* You could leave this, but after a user resizes, then it ruins the auto sizing */
    resize: none;

    /* Firefox shows scrollbar on growth, you can hide like this. */
    overflow: hidden;
  }
</style>
