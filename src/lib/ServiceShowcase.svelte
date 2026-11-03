<script>
  import { reveal } from './reveal.js';

  const services = [
    {
      title: 'Leak repair',
      tag: '01',
      text: 'Dripping taps, burst pipes, hidden wall leaks. We find the source fast and fix it for good.',
      points: ['Hidden leak detection', 'Same-day fixes', 'Walls left clean'],
    },
    {
      title: 'Drain cleaning',
      tag: '02',
      text: 'Clogged sink, shower or toilet? Powerful clearing that gets water flowing again, no mess left behind.',
      points: ['Sinks, showers, toilets', 'Powerful clearing', 'No mess left behind'],
    },
    {
      title: 'Water heater',
      tag: '03',
      text: 'Installation, repair and replacement for electric and instant heaters. Hot showers, all year.',
      points: ['Electric and instant', 'Install and replace', 'Hot showers, all year'],
    },
  ];

  let active = $state(0);

  // marks an item as active while it crosses the middle band of the viewport
  function watch(node, i) {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) active = i;
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }
</script>

{#snippet scene(i)}
  <img src="/services/{i + 1}.jpg" alt={services[i].title} width="1000" height="800" loading="lazy" class="size-full rounded-[inherit] object-cover" />
{/snippet}

<section id="services" class="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
  <div class="mb-12 text-center" use:reveal>
    <p class="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-terra">Services</p>
    <h2 class="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Plumbing services, done properly</h2>
    <p class="mt-3 text-bark/60">Leak repair, drain cleaning and water heater service.</p>
  </div>

  <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
    <!-- Sticky visual (desktop) -->
    <div class="relative hidden lg:block">
      <div class="sticky top-24 aspect-[5/4] overflow-hidden rounded-md border border-bark/10 bg-sand/40">
        {#each services as s, i}
          <div
            class="absolute inset-0 transition duration-700 ease-out"
            style="opacity:{active === i ? 1 : 0}; transform:scale({active === i ? 1 : 0.94}) translateY({active === i ? 0 : 16}px)"
            aria-hidden={active !== i}
          >
            {@render scene(i)}
          </div>
        {/each}
        <div class="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-cream/80 px-3 py-2 backdrop-blur">
          {#each services as _, i}
            <span class="h-1.5 rounded-full bg-terra transition-all duration-500 {active === i ? 'w-8' : 'w-1.5 opacity-30'}"></span>
          {/each}
        </div>
      </div>
    </div>

    <!-- Scrolling copy -->
    <div>
      {#each services as s, i}
        <article use:watch={i} class="flex flex-col justify-center gap-6 py-6 transition-opacity duration-500 lg:min-h-[75vh] lg:py-0 {active === i ? 'lg:opacity-100' : 'lg:opacity-30'}">
          <div class="aspect-[5/4] overflow-hidden rounded-md border border-bark/10 bg-sand/40 lg:hidden" use:reveal>
            {@render scene(i)}
          </div>
          <div use:reveal>
            <div class="font-serif text-3xl font-semibold text-terra">{s.tag}</div>
            <h3 class="mt-2 font-serif text-3xl font-bold sm:text-4xl">{s.title}</h3>
            <p class="mt-3 max-w-md text-lg leading-relaxed text-bark/65">{s.text}</p>
            <ul class="mt-6 space-y-2.5">
              {#each s.points as p, j}
                <li
                  class="flex items-center gap-3 text-bark/80 transition duration-700"
                  style="transition-delay:{j * 90}ms; transform:translateX({active === i ? 0 : -10}px)"
                >
                  <span class="grid size-5 place-items-center rounded-full bg-terra/15 text-terra">
                    <svg viewBox="0 0 24 24" class="size-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                  </span>
                  {p}
                </li>
              {/each}
            </ul>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
