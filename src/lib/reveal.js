// Fade/slide-in on scroll. Usage: <div use:reveal={{ delay: 100 }}>
export function reveal(node, { delay = 0, y = 28 } = {}) {
  node.style.opacity = '0';
  node.style.transform = `translate3d(0, ${y}px, 0)`;
  node.style.transition = `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`;
  node.style.willChange = 'opacity, transform';

  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      node.style.opacity = '1';
      node.style.transform = 'translate3d(0, 0, 0)';
      io.disconnect();
    },
    { threshold: 0.15 }
  );
  io.observe(node);
  return { destroy: () => io.disconnect() };
}
