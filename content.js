(() => {
  'use strict';

  function isWatchLink(a) {
    try {
      const url = new URL(a.href);
      return url.pathname === '/watch' && url.searchParams.has('v');
    } catch {
      return false;
    }
  }

  function cleanWatchUrl(a) {
    const url = new URL(a.href);
    url.searchParams.delete('list');
    url.searchParams.delete('start_radio');
    url.searchParams.delete('index');
    return url.toString();
  }

  // CAPTURE clicks before YouTube
  document.addEventListener(
    'click',
    (e) => {
      const a = e.target.closest('a');
      if (!a || !isWatchLink(a)) return;

      const url = new URL(a.href);

      // Only block RD mixes
      if (url.searchParams.get('list')?.startsWith('RD')) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const clean = cleanWatchUrl(a);
        window.location.assign(clean);
      }
    },
    true // <-- capture phase (critical)
  );
})();
