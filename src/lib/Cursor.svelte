<!-- Custom cursor: precise dot + trailing ring that blooms over interactive elements -->
<script>
  let enabled = $state(false);
  let visible = $state(false);
  let active = $state(false);
  let pressed = $state(false);
  let dot, ring;

  $effect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    enabled = true;
    document.documentElement.classList.add('has-cursor');

    let tx = 0, ty = 0, rx = 0, ry = 0, raf;
    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const move = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!visible) { rx = tx; ry = ty; visible = true; }
      if (dot) dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      active = !!e.target.closest?.('a, button, [data-cursor]');
    };
    const leave = () => (visible = false);
    const down = () => (pressed = true);
    const up = () => (pressed = false);

    addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    addEventListener('pointerdown', down);
    addEventListener('pointerup', up);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      removeEventListener('pointerdown', down);
      removeEventListener('pointerup', up);
    };
  });
</script>

{#if enabled}
  <!-- White cursor (faint shadow keeps it visible on cream); on hoverable elements the ring drops away, leaving the dot -->
  <div
    class="pointer-events-none fixed left-0 top-0 z-[100] transition-opacity duration-300"
    style:opacity={visible ? 1 : 0}
    style:filter="drop-shadow(0 1px 3px rgba(43,33,24,.55))"
    aria-hidden="true"
  >
    <div bind:this={ring} class="fixed left-0 top-0">
      <div
        class="-ml-3.5 -mt-3.5 size-7 rounded-full border-[1.5px] border-white transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        style:transform="scale({active ? 0.3 : 1})"
        style:opacity={visible && !active ? 1 : 0}
      ></div>
    </div>
    <div bind:this={dot} class="fixed left-0 top-0">
      <div
        class="-ml-[3px] -mt-[3px] size-1.5 rounded-full bg-white transition-transform duration-300"
        style:transform="scale({pressed ? 0.5 : active ? 0.75 : 1})"
      ></div>
    </div>
  </div>
{/if}
