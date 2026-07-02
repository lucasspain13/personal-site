<script lang="ts">
	export let number: string;
	export let title: string;
	export let note = '';
</script>

<div class="mb-12 border-t-2 border-base-content pt-4 md:mb-16">
	<div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
		<h2 class="font-display text-4xl font-medium leading-none tracking-tight md:text-6xl">
			{title}
		</h2>
		<span class="meta text-primary" aria-hidden="true">{number}</span>
	</div>
	{#if note}
		<p class="meta mt-3 opacity-60">{note}</p>
	{/if}
</div>
