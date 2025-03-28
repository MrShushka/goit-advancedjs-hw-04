export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');

  if (images.length === 0) {
    iziToast.warning({
      title: 'Warning',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  const markup = images
    .map(image => {
      return `
      <li class="gallery-item">
        <a href="${image.largeImageURL}" >
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          <div class="info">
            <p><strong>Likes:</strong> ${image.likes}</p>
            <p><strong>Views:</strong> ${image.views}</p>
            <p><strong>Comments:</strong> ${image.comments}</p>
            <p><strong>Downloads:</strong> ${image.downloads}</p>
          </div>
        </a>
      </li>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
