// Apple campaign attribution only. No cookies, storage, or web event collection.
(() => {
  const campaigns = Object.freeze({
    reddit: 'digicam_slider_reddit',
    blog1895: 'digicam_blog_1895',
    digicamguide: 'digicam_guide',
    producthunt: 'digicam_producthunt',
    alternativeto: 'digicam_alternativeto',
    uneed: 'digicam_uneed',
    launchingnext: 'digicam_launchingnext',
  });
  const source = new URLSearchParams(location.search).get('source');
  const campaign = Object.prototype.hasOwnProperty.call(campaigns, source) ? campaigns[source] : 'digicam_slider_web';
  document.querySelectorAll('a[data-store-campaign]').forEach(link => {
    const url = new URL(link.href);
    url.searchParams.set('ct', campaign);
    link.href = url.href;
  });
})();
