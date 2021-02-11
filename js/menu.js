'use strict';

const allMenuItems = document.querySelectorAll('.menu__link ');
const menuList = document.querySelector('.menu__list ');
const openMenuBtn = document.querySelectorAll('.wrapper-menu');
const menu = document.querySelector('.menu-wrapper');
const menuLeft = document.querySelectorAll('.menu-left');
const menuRight = document.querySelectorAll('.menu-right');
const iframe = document.querySelector('.js-iframe');
const menuCursor = document.querySelector('.cursor');
const allSections = document.querySelectorAll('.main-section');
const menuTitle = document.querySelector('.js-menu-title')
const menuText = document.querySelector('.js-menu-text')
const titleContentByDefault = menuTitle.textContent;
const textContentByDefault = menuText.textContent;
let tm;
let tm2;
const titles = [{
    section: 'whois',
    title: 'About Me'
  },
  {
    section: 'www',
    title: 'Recent Experiences'
  },
  {
    section: 'why',
    title: 'Some Reasons'
  },
  {
    section: 'how',
    title: 'Recent Works'
  },
  {
    section: 'hello',
    title: 'Contact Me'
  }
]
openMenuBtn.forEach(btn => {
  btn.addEventListener('click', openMenu);
})
allMenuItems.forEach(link => {
  link.addEventListener('mouseover', toggleMenu);
  link.addEventListener('mouseleave', toggleMenuOff);
  link.addEventListener('click', setCurrentClass);
  link.addEventListener('click', openMenu)
})
menuLeft.forEach(menu => {
  menu.addEventListener('mouseover', lightCursorChange);
  menu.addEventListener('mouseleave', deleteCursorChanges);
})
menuRight.forEach(menu => {
  menu.addEventListener('mouseover', darkCursorChange);
  menu.addEventListener('mouseleave', deleteCursorChanges);
})
let toggleMenuSwitch = false;

function darkCursorChange() {
  menuCursor.classList.add('cursor-dark');
}

function lightCursorChange() {
  menuCursor.classList.add('cursor-light');
}

function deleteCursorChanges() {
  if (menuCursor.classList.contains('cursor-dark')) {
    menuCursor.classList.remove('cursor-dark');
  }
  if (menuCursor.classList.contains('cursor-light')) {
    menuCursor.classList.remove('cursor-light');
  }
}

function toggleMenu(e) {
  allMenuItems.forEach(link => {
    if (e.target.textContent !== link.textContent) {
      link.classList.add('menu__link-unhover');
    }
  })
  const path = e.target.textContent;
  console.log('path', path);
  allSections.forEach(section => {
    if (section.getAttribute('id') === path || `${section.getAttribute('id')}.` === path) {

      section.querySelectorAll('*').forEach(el => {
        if (el.classList.contains('js-text')) {
          menuText.textContent = el.textContent;
        }
      });
      titles.forEach(title => {
        if (section.getAttribute('id') === title.section) {
          menuTitle.textContent = title.title;
        }
      })
    }
  })
  // if (e.target.textContent.includes('.')) {
  //   iframe.setAttribute('src', `./index.html#${e.target.textContent}`);
  //   iframe.classList.add('iframe-visible');
  // } else {
  //   allSections.forEach(section => {
  //     if (section.getAttribute('id') === path) {
  //       section.style.zIndex = 9;
  //       iframe.setAttribute('src', `./index.html#${path}`);
  //       iframe.classList.add('iframe-visible');
  //     }
  //   })
  // }
}

function toggleMenuOff(e) {
  allMenuItems.forEach(link => {
    link.classList.remove('menu__link-unhover')
  })
  menuTitle.textContent = titleContentByDefault
  menuText.textContent = textContentByDefault
  // iframe.setAttribute('src', ' ');
  // iframe.classList.remove('iframe-visible');
}

function openMenu(e) {
  if (toggleMenuSwitch) {
    e.currentTarget.classList.remove('open');
    toggleMenuSwitch = false;
    menuLeft.forEach(menu => {
      menu.classList.remove('menu-left-visible');
    })
    menuRight.forEach(menu => {
      menu.classList.remove('menu-right-visible');
    })
    tm2 = setTimeout(() => {
      document.body.classList.remove('menu-is-open');
    }, 100)
    return;
  }
  e.currentTarget.classList.add('open');

  document.body.classList.add('menu-is-open');
  tm = setTimeout(() => {
    menuLeft.forEach(menu => {
      menu.classList.add('menu-left-visible');
    })
    menuRight.forEach(menu => {
      menu.classList.add('menu-right-visible');
    })
  }, 1000)
  toggleMenuSwitch = true;
}

function setCurrentClass(e) {
  e.target.classList.add('menu__link-current')
}

clearTimeout(tm);
clearTimeout(tm2);