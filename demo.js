(() => {
  const root = document.querySelector('#comparison');
  const slider = document.querySelector('#demo-slider');
  const scene = document.querySelector('#demo-scene');
  const original = document.querySelector('#demo-original');
  const result = document.querySelector('#demo-result');
  const status = document.querySelector('#demo-status');
  const credits = {laughter:['Gary Barnes','6231770'], picnic:['Polina Tankilevitch','7711676'], evening:['cottonbro studio','10071281']};
  let revision = 0;
  slider.addEventListener('input', () => {
    root.style.setProperty('--split', `${slider.value}%`);
    slider.setAttribute('aria-valuetext', `${slider.value} percent camera look`);
  });
  async function update() {
    const current = ++revision;
    const era = document.querySelector('input[name="era"]:checked').value;
    const subject = scene.value;
    status.textContent = 'Loading camera look…';
    const urls = ['original', era].map(x => `https://lowgame.github.io/three-eras/photos-v2/${subject}-${x}.jpg`);
    try {
      await Promise.all(urls.map(src => new Promise((resolve,reject) => {const i=new Image();i.onload=resolve;i.onerror=reject;i.src=src;})));
      if (current !== revision) return;
      original.src=urls[0]; result.src=urls[1];
      original.alt=`${scene.selectedOptions[0].text}, original photograph`;
      result.alt=`The same photograph processed with the ${era} camera look`;
      document.querySelector('#era-label').textContent=era;
      const credit=document.querySelector('#demo-credit');
      credit.textContent=`${credits[subject][0]} / Pexels`;
      credit.href=`https://www.pexels.com/photo/${credits[subject][1]}/`;
      status.textContent=`${era} ready. Drag to compare, or use the arrow keys.`;
    } catch {if(current===revision) status.textContent='Could not load this look. Choose another era or moment to retry.';}
  }
  scene.addEventListener('change',update);
  document.querySelectorAll('input[name="era"]').forEach(input=>input.addEventListener('change',update));
})();
