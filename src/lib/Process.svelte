<script>
  import { onMount } from 'svelte';
  import { reveal } from './reveal.js';

  const steps = [
    {
      n: '01',
      title: 'You call',
      text: 'Ring or message us. Describe the problem and we give an honest price upfront.',
      tag: 'Free written quote',
      icon: 'M6.600 10.800a15 15 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25 11.400 11.400 0 0 0 3.600.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.250.2 2.450.57 3.600a1 1 0 0 1-.25 1z',
    },
    {
      n: '02',
      title: 'We arrive',
      text: 'A uniformed Santos plumber shows up on time with the right tools.',
      tag: 'Within the hour',
      icon: 'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.500A2.500 2.500 0 1 1 12 6.500a2.500 2.500 0 0 1 0 5z',
    },
    {
      n: '03',
      title: 'Fixed right',
      text: 'We repair, clean up after ourselves and stand behind the work.',
      tag: '30-day warranty',
      icon: 'M9 16.200 4.800 12l-1.400 1.400L9 19 21 7l-1.400-1.400z',
    },
  ];

  let track;
  let progress = $state(0);
  let active = $state(-1);
  const stepEls = [];

  onMount(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const trigger = window.innerHeight * 0.65;
      progress = Math.min(1, Math.max(0, (trigger - r.top) / r.height));
      let a = -1;
      stepEls.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < trigger) a = i;
      });
      active = a;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  });
</script>

<section id="process" class="mx-auto max-w-6xl scroll-mt-24 px-5 pb-28">
  <div class="mb-14 max-w-xl" use:reveal>
    <p class="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-terra">
      <span class="h-px w-8 bg-terra"></span> Our process
    </p>
    <h2 class="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Straightforward, from call to completion</h2>
  </div>

  <div class="relative" bind:this={track}>
    <!-- progress line: vertical on mobile, horizontal on md+ -->
    <div class="absolute bottom-6 left-[1.4rem] top-6 w-px bg-bark/15 md:hidden" aria-hidden="true">
      <div class="h-full w-full origin-top bg-terra" style="transform: scaleY({progress})"></div>
    </div>
    <div class="absolute left-0 right-0 top-[1.4rem] hidden h-px bg-bark/15 md:block" aria-hidden="true">
      <div class="h-full w-full origin-left bg-terra" style="transform: scaleX({progress})"></div>
    </div>

    <ol class="grid gap-12 md:grid-cols-3 md:gap-8">
      {#each steps as s, i}
        <li bind:this={stepEls[i]} class="step group relative pl-16 md:pl-0 md:pt-20" class:on={active >= i}>
          <!-- node -->
          <span
            class="node absolute left-0 top-0 grid size-11 place-items-center rounded-full border-2 border-bark/20 bg-cream text-bark/40 transition-all duration-700 md:left-0"
            class:!border-terra={active >= i}
            class:!bg-terra={active >= i}
            class:!text-cream={active >= i}
          >
            <svg viewBox="0 0 24 24" class="size-5" fill="currentColor"><path d={s.icon} /></svg>
            {#if active === i}
              <span class="pulse absolute inset-0 rounded-full border-2 border-terra"></span>
            {/if}
          </span>

          <!-- card -->
          <div
            class="card relative overflow-hidden rounded-md border border-bark/10 bg-white/50 p-6 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:border-terra/40 hover:bg-white/80 hover:shadow-xl hover:shadow-bark/10"
            style="opacity: {active >= i ? 1 : 0.45}; transform: translate3d(0, {active >= i ? 0 : 14}px, 0)"
          >
            <span class="ghost pointer-events-none absolute -right-2 -top-5 select-none font-serif text-8xl font-bold leading-none text-terra/[0.07] transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-110">{s.n}</span>
            <div class="relative text-sm font-semibold tracking-widest text-terra">{s.n}</div>
            <h3 class="relative mt-3 font-serif text-2xl font-semibold">{s.title}</h3>
            <p class="relative mt-2 leading-relaxed text-bark/70">{s.text}</p>
            <span class="relative mt-5 inline-flex items-center gap-2 rounded-full border border-moss/40 bg-moss/10 px-3 py-1 text-xs font-medium text-forest">
              <span class="size-1.5 rounded-full bg-moss"></span>{s.tag}
            </span>
            <!-- underline sweep -->
            <span class="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-terra transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] {active >= i ? 'scale-x-100' : ''}"></span>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .pulse { animation: node-pulse 2s ease-out infinite; }
  @keyframes node-pulse {
    0% { transform: scale(1); opacity: 0.7; }
    100% { transform: scale(1.8); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pulse { animation: none; }
  }
</style>
