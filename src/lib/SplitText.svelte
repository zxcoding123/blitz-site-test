<!-- React Bits "SplitText" style: staggered word reveal -->
<script>
  let { text = '', delay = 0, step = 70, class: cls = '' } = $props();
  const words = $derived(text.split(' '));
</script>

<span class={cls} aria-label={text}>
  {#each words as word, i}
    <span class="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden="true">
      <span class="word inline-block" style="animation-delay:{delay + i * step}ms">{word}</span>
    </span>{' '}
  {/each}
</span>

<style>
  .word {
    transform: translateY(110%);
    animation: up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  @keyframes up {
    to { transform: translateY(0); }
  }
</style>
