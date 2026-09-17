import { htmlCopyKeys } from './content.js';

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function ease(value) {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
}

export function initReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((node) => revealObserver.observe(node));
  return revealObserver;
}

export function initSectionNav() {
  const sections = [...document.querySelectorAll('[data-section]')];
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  if (!sections.length || !navLinks.length) return;
  const sectionObserver = new IntersectionObserver((entries) => {
    const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    navLinks.forEach((link) => link.toggleAttribute('aria-current', link.dataset.nav === current.target.dataset.section));
  }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-18% 0px -52% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

/**
 * Wires the language toggle and applies copy to every [data-copy] node.
 * @param {object} copy - the bilingual copy dictionary (content.js `copy`)
 * @param {{onChange?: (lang: string) => void}} [options]
 */
export function initLanguage(copy, { onChange } = {}) {
  const root = document.documentElement;
  const languageButton = document.querySelector('[data-language]');
  let language = 'en';

  function setLanguage(next) {
    if (!copy[next]) return;
    language = next;
    root.lang = next === 'si' ? 'si' : 'en';
    root.dataset.language = next;
    document.querySelectorAll('[data-copy]').forEach((node) => {
      const key = node.dataset.copy;
      if (!copy[next][key]) return;
      if (htmlCopyKeys.has(key)) node.innerHTML = copy[next][key];
      else node.textContent = copy[next][key];
    });
    if (languageButton) {
      languageButton.textContent = next === 'en' ? 'EN / සිං' : 'සිං / EN';
      languageButton.setAttribute('aria-label', next === 'en' ? 'Switch to Sinhala' : 'Switch to English');
    }
    if (onChange) onChange(next);
  }

  if (languageButton) {
    languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'si' : 'en'));
  }

  return { setLanguage, getLanguage: () => language };
}
