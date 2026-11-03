<script>
  import { reveal } from './lib/reveal.js';
  import SplitText from './lib/SplitText.svelte';
  import ServiceShowcase from './lib/ServiceShowcase.svelte';
  import CountUp from './lib/CountUp.svelte';
  import Cursor from './lib/Cursor.svelte';
  import Process from './lib/Process.svelte';

  const quotes = [
    { q: 'A pipe burst at 10 PM. They were at our door in under an hour and the kitchen was dry by midnight.', who: 'Maricel R.', where: 'Lahug' },
    { q: 'Fair price, no surprises, and they actually cleaned up. Our go-to plumber now.', who: 'Jun D.', where: 'Banilad' },
    { q: 'New water heater installed neatly in one visit. Highly recommended.', who: 'Teresa L.', where: 'Mandaue' },
    { q: 'Our shower drain had been slow for months. Fixed in twenty minutes, and it has not come back.', who: 'Ramon C.', where: 'Mabolo' },
    { q: 'Polite, punctual and explained everything before touching a thing. Rare these days.', who: 'Alma S.', where: 'IT Park' },
    { q: 'They found a hidden leak three other plumbers missed. Saved our ceiling.', who: 'Efren B.', where: 'Talamban' },
    { q: 'Called in the morning, heater working by lunch. Great price too.', who: 'Grace T.', where: 'Guadalupe' },
    { q: 'Honest advice: they told us a repair was enough and skipped the pricey replacement.', who: 'Noel V.', where: 'Lapu-Lapu' },
    { q: 'Booked them for our whole apartment building. Same quality every visit.', who: 'Liza M.', where: 'Capitol Site' },
  ].map((q, i) => ({ ...q, img: `/reviews/${i + 1}.jpg` }));
  // three columns of three, each looping in alternating directions
  const columns = [0, 1, 2].map((c) => quotes.slice(c * 3, c * 3 + 3));
  const areas = ['Lahug', 'Banilad', 'IT Park', 'Mabolo', 'Guadalupe', 'Talamban', 'Capitol Site', 'Mandaue', 'Lapu-Lapu', 'Talisay', 'Cebu South', 'Pardo', 'Labangon', 'Apas'];
  const faqs = [
    { q: 'Do you offer same-day service?', a: 'Yes. Most calls inside Cebu City are visited the same day, often within the hour.' },
    { q: 'Will I know the price first?', a: 'Always. We quote before we start and never add surprise charges.' },
    { q: 'Do you handle emergencies?', a: 'Burst pipes and overflowing drains are priority. Call us anytime.' },
  ];

  let scrollY = $state(0);
  let menuOpen = $state(false);
  const scrolled = $derived(scrollY > 24);

  const PHONE = '+639000000000';
  const PHONE_LABEL = '+63 900 000 0000';
  const WHATSAPP = 'https://wa.me/639000000000?text=Hi%20Santos%20Plumbing%2C%20I%20need%20a%20plumber.';
  const BUILDER = 'AHMAD PANDAOG AQUINO (zxcoding123)'; // TODO: replace with your full name

  const stats = [
    { to: 15, suffix: '+', label: 'Years in business' },
    { to: 3200, suffix: '+', label: 'Jobs completed' },
    { to: 60, suffix: ' min', label: 'Typical response' },
    { to: 30, suffix: '-day', label: 'Workmanship warranty' },
  ];
  const glance = [
    ['Response', 'Within the hour, Metro Cebu'],
    ['Estimates', 'Free, written, no obligation'],
    ['Hours', 'Daily 7:00 AM – 9:00 PM'],
    ['Emergencies', 'Burst pipes, 24/7 line'],
  ];
  const nav = [['Services', '#services'], ['Process', '#process'], ['Reviews', '#reviews'], ['FAQ', '#faq']];
</script>

<svelte:window bind:scrollY={scrollY} onkeydown={(e) => e.key === 'Escape' && (menuOpen = false)} onresize={() => innerWidth >= 768 && (menuOpen = false)} />
<Cursor />

<!-- Floating sticky navbar -->
<header class="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
  <div
    class="navbar mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-lg border px-4 py-2.5 text-cream backdrop-blur-xl transition-all duration-500 sm:px-5
      {scrolled ? 'border-cream/15 bg-forest/95 shadow-xl shadow-black/20' : 'border-cream/10 bg-forest/60'}"
  >
    <a href="#top" class="flex items-center gap-3">
      <span class="grid size-8 place-items-center rounded-sm border border-cream/40 font-serif font-bold">S</span>
      <span class="text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.22em]">Santos Plumbing</span>
    </a>
    <nav class="hidden items-center gap-7 text-sm text-cream/70 md:flex">
      {#each nav as [label, href]}
        <a {href} class="transition hover:text-cream">{label}</a>
      {/each}
    </nav>
    <a
      href="tel:{PHONE}"
      aria-label="Call {PHONE_LABEL}"
      class="ml-auto grid size-9 shrink-0 place-items-center rounded-md bg-terra text-sm font-semibold transition hover:bg-[#c95f38] active:scale-[0.97] sm:ml-0 sm:flex sm:size-auto sm:items-center sm:gap-2 sm:px-4 sm:py-2"
    >
      <svg viewBox="0 0 24 24" class="size-4" fill="currentColor"><path d="M6.600 10.800a15 15 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25 11.400 11.400 0 0 0 3.600.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.250.2 2.450.57 3.600a1 1 0 0 1-.25 1z" /></svg>
      <span class="hidden sm:inline">{PHONE_LABEL}</span>
    </a>
    <button
      type="button"
      class="-mr-1 grid size-9 shrink-0 place-items-center rounded-md transition hover:bg-cream/10 md:hidden"
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpen}
      aria-controls="mobile-menu"
      onclick={() => (menuOpen = !menuOpen)}
    >
      <span class="relative block h-3.5 w-5" aria-hidden="true">
        <span class="absolute left-0 h-0.5 w-5 rounded bg-cream transition-all duration-300 {menuOpen ? 'top-1.5 rotate-45' : 'top-0'}"></span>
        <span class="absolute left-0 top-1.5 h-0.5 w-5 rounded bg-cream transition-opacity duration-200 {menuOpen ? 'opacity-0' : ''}"></span>
        <span class="absolute left-0 h-0.5 w-5 rounded bg-cream transition-all duration-300 {menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}"></span>
      </span>
    </button>
  </div>

  <!-- Mobile menu -->
  <div
    id="mobile-menu"
    class="mx-auto mt-2 max-w-5xl origin-top overflow-hidden rounded-lg border border-cream/15 bg-forest/95 text-cream shadow-xl shadow-black/25 backdrop-blur-xl transition-all duration-400 md:hidden
      {menuOpen ? 'visible max-h-96 scale-100 opacity-100' : 'invisible max-h-0 scale-95 opacity-0'}"
  >
    <nav class="flex flex-col p-2">
      {#each nav as [label, href], i}
        <a
          {href}
          onclick={() => (menuOpen = false)}
          class="flex items-center justify-between rounded-md px-4 py-3.5 font-serif text-xl transition hover:bg-cream/10"
          style="transition-delay:{menuOpen ? i * 40 : 0}ms"
        >
          {label}
          <span class="text-sand">→</span>
        </a>
      {/each}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        class="mt-1 rounded-md border border-cream/25 px-4 py-3.5 text-center text-sm font-medium transition hover:bg-cream hover:text-forest"
      >
        Message us on WhatsApp
      </a>
    </nav>
  </div>
</header>

<main class="relative">
  <!-- Hero: header, headline and credentials on deep forest -->
  <div class="bg-forest text-cream">
    <section id="top" class="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-32 sm:pt-40 lg:grid-cols-[1.25fr_.75fr] lg:gap-16 lg:pb-24">
      <div>
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-sand" use:reveal>
          <span class="h-px w-8 bg-sand"></span> Master plumbers · Cebu City
        </p>

        <h1 class="mt-6 font-serif text-[2.5rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          <SplitText text="Dependable plumbing," delay={150} />
          <br />
          <SplitText text="done right the first time." delay={450} class="text-sand" />
        </h1>

        <p class="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg" use:reveal={{ delay: 700 }}>
          Leak repair, drain cleaning and water heater service for Cebu homes and businesses. Written estimates, tidy workmanship, and a plumber who arrives when promised.
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row" use:reveal={{ delay: 900 }}>
          <a
            href="tel:{PHONE}"
            class="inline-flex items-center justify-center gap-3 rounded-md bg-terra px-9 py-5 text-xl font-semibold text-cream transition duration-300 hover:bg-[#c95f38] active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" class="size-5" fill="currentColor"><path d="M6.600 10.800a15 15 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25 11.400 11.400 0 0 0 3.600.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.250.2 2.450.57 3.600a1 1 0 0 1-.25 1z" /></svg>
            Call now
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2.5 rounded-md border border-cream/35 px-7 py-5 text-lg font-medium text-cream transition duration-300 hover:border-cream hover:bg-cream hover:text-forest active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" class="size-5" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm5.200 14.100c-.2.600-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7a11.600 11.600 0 0 1-4.800-4.200c-.4-.5-1.200-1.600-1.200-3s.7-2.100 1-2.400c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.200.1.400 0 .5l-.4.600-.3.300c-.1.200-.3.300-.1.600a7.500 7.500 0 0 0 3.300 2.900c.3.100.5.100.6-.1l.9-1.100c.2-.2.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.200.1.800-.1 1.400z" /></svg>
            WhatsApp
          </a>
        </div>
      </div>

      <!-- At a glance -->
      <aside class="rounded-md border border-cream/15 bg-cream/[0.04] p-7" use:reveal={{ delay: 500, y: 30 }}>
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-sand">At a glance</p>
        <dl class="mt-5 divide-y divide-cream/10">
          {#each glance as [k, v]}
            <div class="py-4">
              <dt class="text-xs uppercase tracking-widest text-cream/50">{k}</dt>
              <dd class="mt-1 font-serif text-lg text-cream">{v}</dd>
            </div>
          {/each}
        </dl>
      </aside>
    </section>

    <!-- Credentials -->
    <section class="border-t border-cream/10">
      <div class="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 py-9 lg:grid-cols-4 lg:divide-x lg:divide-cream/10" use:reveal>
        {#each stats as s}
          <div class="lg:px-8 lg:first:pl-0">
            <div class="font-serif text-3xl font-semibold text-cream sm:text-4xl"><CountUp to={s.to} suffix={s.suffix} /></div>
            <div class="mt-1 text-xs uppercase tracking-widest text-cream/55">{s.label}</div>
          </div>
        {/each}
      </div>
    </section>
  </div>

  <!-- Services -->
  <ServiceShowcase />

  <!-- Process -->
  <Process />

  <!-- Reviews -->
  <section id="reviews" class="scroll-mt-24 border-y border-bark/10 bg-sand/25 py-24">
    <div class="mx-auto max-w-6xl px-5">
      <div class="mb-12 max-w-xl" use:reveal>
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-terra">Client reviews</p>
        <h2 class="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Trusted by homes and businesses across Cebu</h2>
      </div>
      <div
        class="grid h-[34rem] grid-cols-1 gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] md:grid-cols-2 lg:grid-cols-3"
        use:reveal
      >
        {#each columns as col, c}
          <div class="group/col {c === 1 ? 'hidden md:block' : ''} {c === 2 ? 'hidden lg:block' : ''}">
            <div class="vmarquee flex flex-col gap-5 group-hover/col:[animation-play-state:paused]" style="--dur:{34 + c * 6}s; --dir:{c % 2 ? 'reverse' : 'normal'}">
              {#each [...col, ...col, ...col, ...col] as t}
                <figure class="rounded-md border border-bark/10 bg-cream p-6">
                  <blockquote class="leading-relaxed text-bark/85">“{t.q}”</blockquote>
                  <figcaption class="mt-5 flex items-center gap-3 border-t border-bark/10 pt-4 text-sm text-bark/55">
                    <img src={t.img} alt="" width="40" height="40" loading="lazy" class="size-10 rounded-full object-cover" />
                    <span><span class="block font-semibold text-bark/85">{t.who}</span>{t.where}</span>
                  </figcaption>
                </figure>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Service areas -->
  <section class="overflow-hidden py-14" aria-label="Areas we serve">
    <p class="mb-5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-bark/50" use:reveal>Service areas</p>
    <div class="flex w-max animate-marquee gap-10 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] hover:[animation-play-state:paused]">
      {#each [...areas, ...areas] as a}
        <span class="flex items-center gap-10 whitespace-nowrap font-serif text-xl text-bark/70">{a}<span class="size-1 rounded-full bg-terra/60"></span></span>
      {/each}
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="mx-auto max-w-2xl scroll-mt-24 px-5 pb-24">
    <h2 class="mb-8 font-serif text-4xl font-semibold tracking-tight" use:reveal>Frequently asked questions</h2>
    <div class="divide-y divide-bark/15 border-y border-bark/15" use:reveal>
      {#each faqs as f}
        <details class="group py-5" data-cursor>
          <summary class="flex list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
            {f.q}
            <span class="text-xl text-terra transition duration-300 group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 leading-relaxed text-bark/65">{f.a}</p>
        </details>
      {/each}
    </div>
  </section>

  <!-- CTA -->
  <section class="relative overflow-hidden bg-forest text-cream">
    <!-- ambient glows -->
    <div class="pointer-events-none absolute -left-24 -top-24 size-80 animate-float rounded-full bg-moss/25 blur-3xl" aria-hidden="true"></div>
    <div class="pointer-events-none absolute -bottom-32 right-0 size-96 animate-float rounded-full bg-terra/20 blur-3xl [animation-delay:-4s]" aria-hidden="true"></div>

    <div class="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[1.3fr_1fr] md:gap-14 md:py-24" use:reveal>
      <div>
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-sand">
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-terra opacity-70"></span>
            <span class="relative inline-flex size-2 rounded-full bg-terra"></span>
          </span>
          Plumbers available now
        </p>
        <h2 class="mt-5 font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          Need a plumber <span class="text-sand">today?</span>
        </h2>
        <p class="mt-4 max-w-md text-lg leading-relaxed text-cream/70">Call now for a free estimate. Same-day visits across Cebu City.</p>
        <ul class="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/80">
          {#each ['Free written estimate', 'Arrives within the hour', '30-day warranty'] as t}
            <li class="flex items-center gap-2">
              <svg viewBox="0 0 24 24" class="size-4 text-sand" fill="currentColor"><path d="M9 16.200 4.800 12l-1.400 1.400L9 19 21 7l-1.400-1.400z" /></svg>{t}
            </li>
          {/each}
        </ul>
      </div>

      <div class="rounded-md border border-cream/15 bg-cream/[0.05] p-7 backdrop-blur-sm sm:p-8">
        <p class="text-xs uppercase tracking-widest text-cream/50">Call or text anytime</p>
        <a href="tel:{PHONE}" class="mt-2 block font-serif text-3xl font-semibold text-cream transition hover:text-sand sm:text-4xl">{PHONE_LABEL}</a>

        <a
          href="tel:{PHONE}"
          class="group relative mt-6 flex items-center justify-center gap-3 overflow-hidden rounded-md bg-terra px-8 py-5 text-lg font-semibold text-cream transition duration-300 hover:bg-[#c95f38] active:scale-[0.98]"
        >
          <span class="relative grid size-8 place-items-center">
            <span class="absolute inset-0 animate-ring rounded-full bg-cream/40"></span>
            <svg viewBox="0 0 24 24" class="relative size-5 transition-transform duration-300 group-hover:-rotate-12" fill="currentColor"><path d="M6.600 10.800a15 15 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25 11.400 11.400 0 0 0 3.600.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.250.2 2.450.57 3.600a1 1 0 0 1-.25 1z" /></svg>
          </span>
          Call now
          <span class="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-cream/25 opacity-0 blur-sm transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" aria-hidden="true"></span>
        </a>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-3 flex items-center justify-center gap-2 rounded-md border border-cream/25 px-8 py-4 font-medium text-cream transition duration-300 hover:border-cream hover:bg-cream hover:text-forest active:scale-[0.98]"
        >
          Prefer WhatsApp? Message us <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>

  <footer class="relative overflow-hidden bg-[#233a29] text-sm text-cream/60">
    <div class="mx-auto max-w-6xl px-5 pt-16">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]" use:reveal>
        <div>
          <a href="#top" class="inline-flex items-center gap-3 text-cream">
            <span class="grid size-9 place-items-center rounded-sm border border-cream/40 font-serif font-bold">S</span>
            <span class="text-sm font-semibold uppercase tracking-[0.22em]">Santos Plumbing</span>
          </a>
          <p class="mt-5 max-w-xs leading-relaxed">Master plumbers serving homes and businesses across Metro Cebu. Honest prices, tidy work, on time.</p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex items-center gap-2 rounded-md border border-cream/25 px-4 py-2 font-medium text-cream transition duration-300 hover:border-cream hover:bg-cream hover:text-forest"
          >
            Message on WhatsApp <span aria-hidden="true">→</span>
          </a>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.28em] text-sand">Explore</h3>
          <ul class="mt-5 space-y-3">
            {#each nav as [label, href]}
              <li>
                <a {href} class="group inline-flex items-center gap-2 transition hover:text-cream">
                  <span class="h-px w-0 bg-terra transition-all duration-300 group-hover:w-4"></span>{label}
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.28em] text-sand">Hours</h3>
          <ul class="mt-5 space-y-3">
            <li>Daily 7:00 AM – 9:00 PM</li>
            <li class="flex items-center gap-2 text-cream">
              <span class="relative flex size-2">
                <span class="absolute inline-flex size-full animate-ping rounded-full bg-terra opacity-70"></span>
                <span class="relative inline-flex size-2 rounded-full bg-terra"></span>
              </span>
              24/7 emergency line
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.28em] text-sand">Contact</h3>
          <ul class="mt-5 space-y-3">
            <li><a href="tel:{PHONE}" class="font-serif text-xl text-cream transition hover:text-sand">{PHONE_LABEL}</a></li>
            <li>Cebu City, Philippines</li>
            <li>Free, written estimates</li>
          </ul>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-4 border-t border-cream/10 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Santos Plumbing · Cebu City</p>
        <p>Built by <span class="text-cream/85">{BUILDER}</span></p>
        <a href="#top" class="group inline-flex items-center gap-2 text-cream/80 transition hover:text-cream">
          Back to top
          <span class="grid size-8 place-items-center rounded-full border border-cream/25 transition duration-300 group-hover:-translate-y-1 group-hover:border-cream" aria-hidden="true">↑</span>
        </a>
      </div>
    </div>

    <!-- oversized wordmark -->
    <div class="pointer-events-none select-none whitespace-nowrap text-center font-serif text-[22vw] font-bold leading-[0.8] tracking-tight text-cream/[0.04] sm:text-[15vw]" aria-hidden="true">
      Santos
    </div>
    <div class="h-16 sm:h-0"></div>
  </footer>
</main>

<!-- Floating WhatsApp button -->
<a
  href={WHATSAPP}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat on WhatsApp"
  class="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition duration-300 hover:scale-105 active:scale-95"
>
  <svg viewBox="0 0 24 24" class="size-7" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm5.200 14.100c-.2.600-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7a11.600 11.600 0 0 1-4.800-4.200c-.4-.5-1.200-1.600-1.200-3s.7-2.100 1-2.400c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.200.1.400 0 .5l-.4.600-.3.300c-.1.200-.3.300-.1.600a7.500 7.500 0 0 0 3.300 2.900c.3.100.5.100.6-.1l.9-1.100c.2-.2.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.200.1.800-.1 1.400z" /></svg>
</a>
