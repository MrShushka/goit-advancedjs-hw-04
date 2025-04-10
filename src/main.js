import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const perPage = 15;

let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', event => {
  event.preventDefault();
  currentQuery = event.target.elements.query.value.trim();
  if (!currentQuery) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }

  loader.style.display = 'block';
  currentPage = 1;
  loadMoreBtn.style.display = 'none';

  gallery.innerHTML = '';
  currentPage = 1;
  loadMoreBtn.style.display = 'none';
  fetchAndRenderImages();
});

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  fetchAndRenderImages();
});

async function fetchAndRenderImages() {
  loader.style.display = 'block';
  try {
    let data = await fetchImages(currentQuery, currentPage, perPage);
    totalHits = data.totalHits;
    renderGallery(data.hits);
    smoothScroll();

    lightbox.refresh();

    if (currentPage * perPage < totalHits) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End',
        message: 'Ви дійшли до кінця результатів пошуку.',
      });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  }

  loader.style.display = 'none';
}

function smoothScroll() {
  const gallery = document.querySelector('.gallery');
  const cardHeight =
    gallery.firstElementChild?.getBoundingClientRect().height || 0;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
