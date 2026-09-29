// Apple campaign attribution only. No cookies, storage, or web event collection.
(() => {
  const source = new URLSearchParams(location.search).get('source') === 'reddit' ? 'reddit' : 'web';
  const campaign = `digicam_slider_${source}`;
  document.querySelectorAll('a[data-store-campaign]').forEach(link => {
    const url = new URL(link.href);
    url.searchParams.set('ct', campaign);
    link.href = url.href;
  });
})();
