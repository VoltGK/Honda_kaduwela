import '@fontsource-variable/archivo/index.css';
import '@fontsource/archivo-black/400.css';
import '@fontsource/noto-sans-sinhala/400.css';
import '@fontsource/noto-sans-sinhala/700.css';
import '@fontsource/noto-sans-sinhala/900.css';
import './style.css';
import { colorAssets, copy, intentLabels } from './content.js';
import { reduceMotion, clamp, ease, initReveal, initSectionNav, initLanguage } from './shared.js';

const root = document.documentElement;
const hero = document.querySelector('[data-hero]');
const heroIgnition = document.querySelector('.hero-image--ignition');
const heroReveal = document.querySelector('.hero-image--reveal');
const heroOpening = document.querySelector('.hero-copy--opening');
const heroResolved = document.querySelector('.hero-copy--resolved');
const heroFlare = document.querySelector('.hero-flare');
const heroProgressTrack = document.querySelector('.hero-progress');
const heroProgressLine = heroProgressTrack.querySelector('span');
const heroProgressDot = heroProgressTrack.querySelector('i');
const productImage = document.querySelector('[data-product-image]');
const colourName = document.querySelector('[data-colour-name]');
const summary = document.querySelector('[data-summary]');
const swatches = [...document.querySelectorAll('[data-colour]')];
const intentButtons = [...document.querySelectorAll('[data-intent]')];
const colourStudio = document.querySelector('.colour-studio');

let colour = 'red';
let intent = 'new';
let heroProgress = 0;
let framePending = false;

const { setLanguage, getLanguage } = initLanguage(copy, { onChange: updateSummary });

function updateSummary() {
  if (!summary) return;
  summary.textContent = `${intentLabels[getLanguage()][intent]} · Dio 125 H-Smart · ${colorAssets[colour].name}`;
}

async function setColour(next, immediate = false) {
  if (!colorAssets[next]) return;
  const asset = colorAssets[next];
  const preload = new Image();
  preload.src = asset.src;
  try { await preload.decode(); } catch { /* Native image loading still handles the source. */ }
  productImage.classList.add('is-changing');
  const swap = () => {
    colour = next;
    colourStudio.dataset.finish = next;
    productImage.src = asset.src;
    productImage.alt = `Dio 125 H-Smart in ${asset.name}`;
    colourName.textContent = asset.name;
    swatches.forEach((button) => {
      const active = button.dataset.colour === next;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    updateSummary();
    requestAnimationFrame(() => productImage.classList.remove('is-changing'));
  };
  if (immediate || reduceMotion.matches) swap();
  else window.setTimeout(swap, 150);
}

function setIntent(next) {
  if (!intentLabels.en[next]) return;
  intent = next;
  intentButtons.forEach((button) => {
    const active = button.dataset.intent === next;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  updateSummary();
}

function paintScroll() {
  framePending = false;
  const rect = hero.getBoundingClientRect();
  const range = Math.max(1, hero.offsetHeight - window.innerHeight);
  heroProgress = clamp(-rect.top / range);
  const reveal = ease((heroProgress - 0.16) / 0.68);
  const resolved = ease((heroProgress - 0.62) / 0.25);
  const dotDistance = heroProgressTrack.clientWidth * heroProgress;
  heroIgnition.style.setProperty('--hero-progress', heroProgress.toFixed(4));
  heroReveal.style.setProperty('--hero-reveal', reveal.toFixed(4));
  heroOpening.style.setProperty('--hero-progress', heroProgress.toFixed(4));
  heroOpening.style.setProperty('--hero-resolved', resolved.toFixed(4));
  heroResolved.style.setProperty('--hero-resolved', resolved.toFixed(4));
  heroFlare.style.setProperty('--hero-reveal', reveal.toFixed(4));
  heroFlare.style.setProperty('--hero-resolved', resolved.toFixed(4));
  heroProgressLine.style.setProperty('--hero-progress', heroProgress.toFixed(4));
  heroProgressDot.style.setProperty('--hero-dot-x', `${dotDistance.toFixed(2)}px`);
  root.dataset.heroState = heroProgress < 0.2 ? 'waiting' : heroProgress < 0.78 ? 'igniting' : 'ready';

  if (!reduceMotion.matches) {
    document.querySelectorAll('[data-parallax]').forEach((image) => {
      const box = image.parentElement.getBoundingClientRect();
      if (box.bottom < -100 || box.top > innerHeight + 100) return;
      const position = (box.top + box.height / 2 - innerHeight / 2) / innerHeight;
      image.style.transform = `scale(1.08) translate3d(0, ${(-position * 3.5).toFixed(2)}%, 0)`;
    });
  }
}

function schedulePaint() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(paintScroll);
}

initReveal();
initSectionNav();

swatches.forEach((button) => button.addEventListener('click', () => setColour(button.dataset.colour)));
intentButtons.forEach((button) => button.addEventListener('click', () => setIntent(button.dataset.intent)));

if (matchMedia('(pointer: fine)').matches) {
  colourStudio.addEventListener('pointermove', (event) => {
    const rect = colourStudio.getBoundingClientRect();
    colourStudio.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    colourStudio.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  });
}

window.addEventListener('scroll', schedulePaint, { passive: true });
window.addEventListener('resize', schedulePaint, { passive: true });
reduceMotion.addEventListener('change', () => { root.dataset.reduceMotion = String(reduceMotion.matches); schedulePaint(); });

root.dataset.reduceMotion = String(reduceMotion.matches);
setLanguage('en');
setIntent('new');
setColour('red', true);
schedulePaint();

window.__HONDA_QA__ = {
  getState: () => ({ language: getLanguage(), colour, intent, heroProgress, heroState: root.dataset.heroState, reducedMotion: reduceMotion.matches }),
  setLanguage, setColour, setIntent,
};
window.__STUDIO_QA__ = { snapshot: window.__HONDA_QA__.getState };
