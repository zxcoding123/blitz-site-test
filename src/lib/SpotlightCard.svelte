<!-- React Bits "SpotlightCard" style: cursor-following glow -->
<script>
  let { children, class: cls = '' } = $props();
  let x = $state(50);
  let y = $state(50);

  function move(e) {
    const r = e.currentTarget.getBoundingClientRect();
    x = e.clientX - r.left;
    y = e.clientY - r.top;
  }
</script>

<div
  role="presentation"
  onpointermove={move}
  class="group relative overflow-hidden rounded-3xl border border-bark/10 bg-bark/[0.04] p-7 backdrop-blur transition duration-500 hover:-translate-y-1.5 hover:border-terra/40 {cls}"
>
  <div
    class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    style="background: radial-gradient(360px circle at {x}px {y}px, rgba(181,83,47,.18), transparent 60%)"
  ></div>
  <div class="relative">{@render children()}</div>
</div>
