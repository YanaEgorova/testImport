'use strict';
let swiper = null;
let howSwiper = null;
const mediaLists = {};

const TypeMedia = {

  mob: '(max-width: 1280px)',
  // desk: '(min-width: 900px)',
};

const keysTypeMedia = Object.keys(TypeMedia);

keysTypeMedia.forEach(media => {
  mediaLists[media] = window.matchMedia(TypeMedia[media]);
});
const handleQueryListener = e => {
  const updateMatches = keysTypeMedia.reduce((acc, media) => {
    acc[media] = mediaLists[media].matches;
    return acc;
  }, {});
  if (updateMatches.mob) {
    console.log('BEFORE 900px');
    howSwiper = new Swiper('.swiper-container.swiper-container-how', {
      slidesPerView: 'auto',
      spaceBetween: 16,
    });
    swiper = new Swiper('.swiper-container.swiper-container-www', {
      slidesPerView: 'auto',
      spaceBetween: 31,
    });
  }
  // if (updateMatches.desk) {
  //   console.log('AFTER 900px');
  //   howSwiper = null;
  //   swiper = null;
  // }

};

keysTypeMedia.forEach(media => {
  mediaLists[media].addEventListener('change', handleQueryListener);
});
handleQueryListener();


// const prevBtns = document.querySelectorAll('.js-prev');

// prevBtns.forEach(btn => {
//   console.log(btn);
// })

const firstProjectSlider = new Swiper('.swiper-container.swiper-container-first-project', {
  slidesPerView: 1,
  noSwiping: true,
  speed: 1000,
  autoHeight: true,
  noSwipingClass: 'swiper-slide__no-swipe',
  navigation: {
    nextEl: '.js-next',
    prevEl: '.js-prev',
  },
});