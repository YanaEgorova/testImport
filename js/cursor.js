'use strict';


const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px; opacity: 1`)
})
document.addEventListener('mouseover', (e) => {
  if (e.target.nodeName !== "BUTTON" && e.target.nodeName !== "A" && e.target.className !== 'begin-btn__icon' && e.target.className !== 'menu-btn__icon') {
    cursor.classList.remove('cursor-hover');
  }
  if (e.target.nodeName !== "BUTTON" && e.target.nodeName !== "A" && e.target.className !== 'begin-btn__icon' && e.target.className !== 'menu-btn__icon') return;
  cursor.classList.add('cursor-hover');
})