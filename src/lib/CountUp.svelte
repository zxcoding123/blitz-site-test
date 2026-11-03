<!-- React Bits "CountUp" style -->
<script>
  let { to = 0, suffix = '', duration = 1600 } = $props();
  let val = $state(0);
  let el;

  $effect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        val = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  });
</script>

<span bind:this={el}>{val.toLocaleString()}{suffix}</span>
