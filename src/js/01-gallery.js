import SimpleLightbox from 'simplelightbox';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

import 'simplelightbox/dist/simple-lightbox.min.css';

const myGallery = document.querySelector(".gallery");
myGallery.computedStyleMap.listStyleType = "none";

const galleryList = galleryItems.map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
  <a href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a></li>`
  )
  .join('');

myGallery.insertAdjacentHTML("afterbegin", galleryList);



    const lightbox = new SimpleLightbox(".gallery a", {
        captionsData: "alt",
        captionDelay: 250,
        captionPosition: "bottom",
        close: true,
        enableKeyboard: true,
    });
