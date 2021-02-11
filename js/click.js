'use strict';

const btns = document.querySelectorAll('.btn-click');
const div = document.createElement('div');

btns.forEach(btn => {
  btn.addEventListener('click', addElement)
});

function addElement(e) {
  console.log(e.target.getAttribute('href'));
  console.log(e.currentTarget);
  e.preventDefault()
  div.classList.add('pulse');
  this.appendChild(div);
  const maxValue = Math.max(this.clientWidth, this.clientHeight);
  const position = this.getBoundingClientRect();
  const left = `${e.clientX - position.left - (maxValue / 2)}px`;
  const top = `${e.clientY - position.top - (maxValue / 2)}px`;
  div.style.width = `${maxValue}px`;
  div.style.height = `${maxValue}px`;
  div.style.left = left;
  div.style.top = top;
  const href = e.target.getAttribute('href');

  // const tm = setTimeout(() => {
  //   console.log('timeout');
  //   window.location.href = href;
  //   clearTimeout(tm);
  // }, 300);

  if (e.currentTarget.hasAttribute('download')) {
    console.log(1111);
    const tm = setTimeout(() => {
      animateAndDownload(e)
      clearTimeout(tm)
    }, 3000)

  }
}




// const downloadBtns = document.querySelectorAll('.top-section .download-btn');
const youtubeAnimationBlock = document.querySelector('.top-section .youtube-animation');
const counterAnimationBlock = document.querySelector('.top-section .counter-animation');
let firstTm;
let secondTm;
// downloadBtns.forEach(btn => {
//   btn.addEventListener('click', animateAndDownload);
// })

function animateAndDownload(e) {
  console.log('start');
  // e.preventDefault();
  // e.currentTarget.classList.add('download-btn-hidden');
  firstTm = setTimeout(() => {
    youtubeAnimationBlock.classList.add('youtube-animation-animate');

    counterAnimationBlock.classList.add('counter-animation-animate');
    secondTm = setTimeout(() => {
      counterAnimationBlock.classList.remove('counter-animation-animate');
      youtubeAnimationBlock.classList.remove('youtube-animation-animate');
      e.currentTarget.classList.remove('download-btn-hidden');
      clearTimeout(secondTm)
    }, 6000)
    clearTimeout(firstTm)
  }, 500);
}