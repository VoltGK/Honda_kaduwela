import '@fontsource-variable/archivo/index.css';
import '@fontsource/archivo-black/400.css';
import '@fontsource/noto-sans-sinhala/400.css';
import '@fontsource/noto-sans-sinhala/700.css';
import '@fontsource/noto-sans-sinhala/900.css';
import './style.css';
import {
  copy, colorAssets, modelVariants, modelFeatures, modelSpecCategories,
  dio110Variants, dio110Features, dio110SpecCategories, dio110Colors,
} from './content.js';
import { reduceMotion, initReveal, initSectionNav, initLanguage } from './shared.js';

const root = document.documentElement;
const model = document.body.dataset.model === 'dio110' ? 'dio110' : 'dio125';
const featuredVariantIds = new Set(['hsmart', 'dlx']);

const variantsData = model === 'dio110' ? dio110Variants : modelVariants;
const featuresData = model === 'dio110' ? dio110Features : modelFeatures;
const specsData = model === 'dio110' ? dio110SpecCategories : modelSpecCategories;

const variantContainer = document.querySelector('[data-variant-cards]');
const featureContainer = document.querySelector('[data-feature-grid]');
const specContainer = document.querySelector('[data-spec-tables]');
const colourContainer = document.querySelector('[data-colour-gallery]');

function renderVariants(language) {
  if (!variantContainer) return;
  const ctaLabel = copy[language].variantCta;
  const priceLabel = copy[language].variantPriceLabel;
  variantContainer.innerHTML = variantsData[language].map((variant) => `
    <article class="variant-card${featuredVariantIds.has(variant.id) ? ' variant-card--featured' : ''}">
      <h3>${variant.name}</h3>
      <p class="variant-price"><span>${priceLabel}</span><strong>${variant.price}</strong></p>
      <ul class="variant-bullets">${variant.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}</ul>
      <a class="text-link" href="tel:+94777066777"><span>${ctaLabel}</span><i aria-hidden="true">↗</i></a>
    </article>
  `).join('');
}

function renderFeatures(language) {
  if (!featureContainer) return;
  featureContainer.innerHTML = featuresData[language].map((feature, index) => `
    <article class="feature-tile">
      <span class="feature-tile-number">${String(index + 1).padStart(2, '0')}</span>
      <h3>${feature.title}</h3>
      <p>${feature.body}</p>
    </article>
  `).join('');
}

function renderSpecs(language) {
  if (!specContainer) return;
  specContainer.innerHTML = specsData[language].map((category) => `
    <div class="spec-table">
      <h3>${category.title}</h3>
      <table>
        <tbody>
          ${category.rows.map(([label, value]) => `<tr><th scope="row">${label}</th><td>${value}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `).join('');
}

function renderColours(language) {
  if (!colourContainer || colourContainer.childElementCount) return;
  if (model === 'dio110') {
    colourContainer.innerHTML = dio110Colors.map((asset) => {
      const variantName = dio110Variants[language].find((v) => v.id === asset.variantId)?.name ?? asset.variantId;
      return `
        <figure class="colour-gallery-item colour-gallery-item--chip">
          <span class="colour-chip" style="background:${asset.hex}" aria-hidden="true"></span>
          <figcaption>${asset.name}<small>${variantName}</small></figcaption>
        </figure>
      `;
    }).join('');
    return;
  }
  colourContainer.innerHTML = Object.values(colorAssets).map((asset) => `
    <figure class="colour-gallery-item">
      <img src="${asset.src}" width="1000" height="650" alt="Dio 125 H-Smart in ${asset.name}" loading="lazy" decoding="async" />
      <figcaption>${asset.name}</figcaption>
    </figure>
  `).join('');
}

function renderDynamic(language) {
  renderVariants(language);
  renderFeatures(language);
  renderSpecs(language);
  renderColours(language);
}

const { setLanguage } = initLanguage(copy, { onChange: renderDynamic });

initReveal();
initSectionNav();

root.dataset.reduceMotion = String(reduceMotion.matches);
reduceMotion.addEventListener('change', () => { root.dataset.reduceMotion = String(reduceMotion.matches); });

setLanguage('en');
