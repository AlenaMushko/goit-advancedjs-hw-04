export function renderGallery(images, galleryEl, append = false) {
  const galleryHTML = images
    .map(
      image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
          loading="lazy"
          class="gallery-image"
        />
        <div class="gallery-info">
          <p class="info-item">
            <b>Likes</b> <span class="info-item-value">${image.likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b> <span class="info-item-value">${image.views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b> <span class="info-item-value">${image.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b> <span class="info-item-value">${image.downloads}</span>
          </p>
        </div>
      </a>
    </li>
  `
    )
    .join('');

  if (append) {
    galleryEl.insertAdjacentHTML('beforeend', galleryHTML);
  } else {
    galleryEl.innerHTML = galleryHTML;
  }
}

export function clearGallery(galleryEl) {
  galleryEl.innerHTML = '';
}

export function showLoader(loaderEl) {
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader(loaderEl) {
  loaderEl.classList.add('is-hidden');
}
