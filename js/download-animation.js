'use strict';

// function downloadBtnAnimation() {
const downloadBtn = document.querySelector('.top-section .download-btn');
const youtubeAnimationBlock = document.querySelector('.top-section .youtube-animation');
const counterAnimationBlock = document.querySelector('.top-section .counter-animation');
let firstTm;
let secondTm;
downloadBtn.addEventListener('click', animateAndDownload);

function animateAndDownload(e) {
  e.preventDefault();
  downloadBtn.classList.add('download-btn-hidden');
  firstTm = setTimeout(() => {
    youtubeAnimationBlock.classList.add('youtube-animation-animate');

    counterAnimationBlock.classList.add('counter-animation-animate');
    secondTm = setTimeout(() => {
      counterAnimationBlock.classList.remove('counter-animation-animate');
      youtubeAnimationBlock.classList.remove('youtube-animation-animate');
      downloadBtn.classList.remove('download-btn-hidden');
    }, 6000)
  }, 500);
}
clearTimeout(firstTm)
clearTimeout(secondTm)
// }
// downloadBtnAnimation()