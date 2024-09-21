<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Hero from './Hero.svelte';
	import Highlights from './Highlights.svelte';
	let visible;

	onMount(() => {
		visible = true;
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Portfolio App for Lucas" />
</svelte:head>

<Hero />
<Highlights />
{#if visible}
	<div class="fill-vw flex justify-center pt-8 pb-4" transition:fly={{ y: 100, duration: 2000 }}>
		<h2 class="text-5xl font-bold">Work Experience</h2>
	</div>
	<div class="fill-vw flex justify-start bg-slate-500" transition:fly={{ y: 100, duration: 2000 }}>
		<div class="p-16">
			<p class="text-sm">
				Lorem ipsum odor amet, consectetuer adipiscing elit. Cursus feugiat vel erat suspendisse
				tempus facilisi nam. Venenatis porta ultrices bibendum aliquam diam lacinia. Rutrum netus
				dapibus tortor curae tincidunt nibh proin per efficitur. Auctor vestibulum euismod
				scelerisque fringilla sit tincidunt vulputate litora nulla. Ante dis lectus purus feugiat
				integer hac.Vulputate tortor rhoncus vitae mollis aliquam. Lacus euismod porta diam suscipit
				vitae nascetur ultricies eu. Nostra praesent duis maecenas primis orci tincidunt. Metus
				penatibus etiam molestie efficitur nibh tincidunt eleifend blandit. Vitae magnis vivamus
				turpis vitae faucibus faucibus. Vivamus conubia cras tortor tempor amet montes. Mattis
				interdum maecenas gravida fames magnis sociosqu placerat ultricies. Porttitor ipsum lacus
				hendrerit torquent non imperdiet nec augue himenaeos. Gravida vitae aptent curabitur
				senectus nostra porttitor suspendisse dolor himenaeos. Inceptos ut lorem diam a venenatis
				magnis a. Penatibus cursus lacinia nibh leo condimentum finibus mauris. Venenatis
				consectetur maximus ultrices fermentum pretium senectus semper. Semper iaculis risus finibus
				ligula ante hendrerit commodo! Semper vivamus ac quisque interdum vehicula. Mauris sed vitae
				ultricies conubia magnis nostra in. Odio aptent laoreet elementum nec eget mus varius.
				Bibendum per aliquet in odio ante mauris ultrices cursus praesent. Netus sollicitudin
				sollicitudin ultricies donec; feugiat pharetra. Tellus volutpat mattis interdum; ex vel
				pretium. Ac ac dapibus dolor mauris ornare risus a ac erat. Ultricies habitant lectus
				aliquam penatibus diam dignissim imperdiet. Nisl aenean dui mauris penatibus maximus. In
				dignissim odio, cras commodo lectus fermentum mauris. Mus lorem dolor purus finibus sociosqu
				velit lacus malesuada magnis. Ad nascetur convallis aptent, class orci senectus. Amet dis
				lobortis natoque euismod mollis rhoncus risus? Ornare finibus parturient gravida ornare
				scelerisque varius. Ultrices dolor luctus vestibulum sociosqu leo varius parturient placerat
				taciti. Elit magna adipiscing fames dictum fusce. Nostra ligula tempus morbi habitasse
				lacinia mauris sociosqu interdum morbi. Blandit maximus risus fames tellus, nam convallis
				dolor. Nascetur primis laoreet magnis tempor senectus. Facilisi convallis ad augue sodales
				imperdiet. Euismod habitasse etiam gravida metus ullamcorper ullamcorper nulla malesuada.
				Aliquam blandit ultricies aliquet litora varius. Arcu egestas montes vitae nulla curabitur
				porttitor; a faucibus morbi. Viverra tempus porta tristique nostra neque mollis.
			</p>
		</div>
	</div>
{/if}

<style>
	.fill-vw {
		min-width: 100vw;
		max-width: 100vw;
	}
</style>
