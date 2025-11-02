import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { searchImages } from "./js/pixabay-api.js";
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions.js";

const searchForm = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".spinner");
const loadMoreContainer = document.querySelector("#load-more-container");
const loadMoreButton = document.querySelector("#load-more-button");

let lightbox = null;
let currentQuery = "";
let currentPage = 1;
let totalHits = 0;
let totalPages = 0;

export const PER_PAGE = 15;

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchQuery = searchForm.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter at least 1 character",
      position: "topRight",
    });
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;
  totalHits = 0;
  totalPages = 0;

  clearGallery(gallery);
  hideLoadMoreButton();

  showLoader(loader);

  try {
    const data = await searchImages(searchQuery, PER_PAGE, currentPage);

    hideLoader(loader);

    if (data.hits && data.hits.length > 0) {
      totalHits = data.totalHits;
      totalPages = Math.ceil(totalHits / PER_PAGE);

      renderGallery(data.hits, gallery);

      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox(".gallery a", {
          captionsData: "alt",
          captionDelay: 250,
        });
      }

      if (currentPage < totalPages) {
        showLoadMoreButton();
      }
    } else {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
    }
  } catch (error) {
    hideLoader(loader);
    iziToast.error({
      message: `An error occurred: ${error.message}`,
      position: "topRight",
    });
  }
});

function showLoadMoreButton() {
  loadMoreContainer.classList.remove("is-hidden");
}

function hideLoadMoreButton() {
  loadMoreContainer.classList.add("is-hidden");
}

loadMoreButton.addEventListener("click", async () => {
  if (!currentQuery) return;

  currentPage += 1;
  showLoader(loader);

  try {
    const data = await searchImages(currentQuery, PER_PAGE, currentPage);
    hideLoader(loader);

    renderGallery(data.hits, gallery, true);

    if (lightbox) {
      lightbox.refresh();
    }

    setTimeout(() => {
      const galleryItems = gallery.querySelectorAll(".gallery-item");
      if (galleryItems.length > 0) {
        const firstNewItem = galleryItems[galleryItems.length - PER_PAGE];
        if (firstNewItem) {
          const cardHeight = firstNewItem.getBoundingClientRect().height;
          window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
          });
        }
      }
    }, 100);

    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    hideLoader(loader);
    iziToast.error({
      message: `An error occurred: ${error.message}`,
      position: "topRight",
    });
  }
});
