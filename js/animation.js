const animationUpBtn = document.querySelectorAll('.js-page-transition-up');
const animationDownBtn = document.querySelector('.js-page-transition-down');
const sections = document.querySelectorAll('.main-section');
const sectionsWrap = document.querySelector('.main-wrap');
const mainSection = document.querySelector('.main-section');
const startButton = document.querySelector('.begin-btn');
const svg = document.querySelector('.shape');
constDownloadBtns = document.querySelectorAll('.download-btn');
const body = document.body;
sectionsWrap.children[0].classList.add('top-section');
let isActive;
let enterTimeout;
constDownloadBtns.forEach(btn => {
  btn.addEventListener('click', downloadBtnAnimation)
})
animationUpBtn.forEach(btn => {
  btn.addEventListener('click', animateUp)
})
if (animationDownBtn) {
  animationDownBtn.addEventListener('click', animateDown)
}

window.addEventListener('resize', onResize)


function setHeight() {
  sectionsWrap.style.height = `${document.querySelector('.top-section .section-content').offsetHeight}px`;
  mainSection.style.height = `${findCurrentPage().offsetHeight}px`;
}


function downloadBtnAnimation(e) {
  const btn = e.currentTarget;
  e.preventDefault();

  const btnWrap = btn.parentNode;
  let youtubeAnimationBlock;
  let counterAnimationBlock;
  [...btnWrap.children].forEach(el => {
    if (el.classList.contains('counter-animation')) {
      counterAnimationBlock = el;
    }
    if (el.classList.contains('youtube-animation')) {
      youtubeAnimationBlock = el;
    }
  })
  const div = document.createElement('div');
  let firstTm;
  let secondTm;

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

  const mainTm = setTimeout(() => {
    // console.log('HERE: ', btn);
    btn.classList.add('download-btn-hidden');
    firstTm = setTimeout(() => {
      youtubeAnimationBlock.classList.add('youtube-animation-animate');

      counterAnimationBlock.classList.add('counter-animation-animate');
      secondTm = setTimeout(() => {
        counterAnimationBlock.classList.remove('counter-animation-animate');
        youtubeAnimationBlock.classList.remove('youtube-animation-animate');
        btn.classList.remove('download-btn-hidden');
        clearTimeout(secondTm);
        const a = document.createElement('a');
        a.download = 'CV.txt';
        a.href = '../img/big-bg-dark.png';
        a.click();
      }, 6000)
      clearTimeout(firstTm)
    }, 500);
    clearTimeout(mainTm)
  }, 500)

}

function findCurrentPage() {
  const currentPage = document.querySelector('.top-section');
  return currentPage;
}

function setActiveNavLink() {
  if (findCurrentPage().getAttribute('data-id')) {
    const nav = document.querySelector('.top-section .menu__list');
    const id = findCurrentPage().getAttribute('data-id')
    const currentActiveLink = nav.querySelector('.menu__link-current');
    if (currentActiveLink) {
      currentActiveLink.classList.remove('menu__link-current');
    }
    const nextActiveLink = document.querySelector(`.top-section .menu__list a[data-identifier="${id}"]`);
    nextActiveLink.classList.add('menu__link-current');
  }
}
setHeight();
setActiveNavLink()

function animateUp() {
  console.log(Date.now(), 'секция уезжает вверх');
  let currentSection = findCurrentPage();
  anime({
    targets: currentSection,
    translateY: {
      value: `-${findCurrentPage().offsetHeight * 2}px`,
      delay: 100,
      duration: 2000,
      easing: 'easeInOutQuad'
    }
  });
  anime({
    targets: document.querySelector('.shape path'),
    duration: 1200,
    easing: 'linear',
    d: 'M -30.45,-57.86 -30.45,442.6 53.8,443.8 53.8,396.3 179.5,396.3 179.5,654.7 193.3,654.7 193.3,589.1 253.1,589.1 253.1,561.6 276.1,561.6 276.1,531.2 320.6,531.2 320.6,238.6 406.5,238.6 406.5,213.9 435.6,213.9 435.6,246.2 477,246.2 477,289.9 527.6,289.9 527.6,263.3 553.7,263.3 553.7,280.4 592,280.4 592,189.2 742.3,189.2 742.3,259.5 762.2,259.5 762.2,103.7 776,103.7 776,77.11 791.3,77.11 791.3,18.21 852.7,18.21 852.7,86.61 871.1,86.61 871.1,231 878.7,240.5 878.7,320.3 891,320.3 891,434.3 923.2,434.3 923.2,145.5 940.1,145.5 940.1,117 976.9,117 976.9,139.8 1031,139.8 1031,284.2 1041,284.2 1041,242.4 1176,242.4 1176,282.3 1192,282.3 1192,641.4 1210,641.4 1210,692.7 1225,692.7 1225,599.6 1236,599.6 1236,527.4 1248,527.4 1248,500.8 1273,500.8 1273,523.6 1291,523.6 1291,652.8 1316,652.8 1316,533.1 1337,533.1 1337,502.7 1356,502.7 1356,523.6 1414,523.6 1414,491.3 1432,491.3 1432,523.6 1486,523.6 1486,-57.86 Z'
  });

  setTimeout(() => {
    currentSection.classList.remove('top-section');
    if (!currentSection.nextElementSibling) {
      document.querySelector('.main-wrap').children[0].classList.add('top-section');
      findCurrentPage()
      setHeight()

      setActiveNavLink();

      return
    }
    currentSection.nextElementSibling.classList.add('top-section');
    findCurrentPage()
    setHeight()

    setActiveNavLink();


  }, 1000)
  // setHeight()
  currentSection = findCurrentPage();

}


function animateDown() {
  let height;
  if (document.querySelector('.top-section').previousElementSibling) {
    [...document.querySelector('.top-section').previousElementSibling.children].forEach(child => {
      if (child.classList.contains('shape')) {
        height = window.getComputedStyle(child).getPropertyValue("height");
        console.log('height', height);
      }
    })
  }

  anime({
    targets: document.querySelector('.top-section').previousElementSibling,
    translateY: {
      value: '0px',
      delay: 100,
      duration: 2000,
      easing: 'easeInOutQuad'
    }
  });
  anime({
    targets: document.querySelector('.shape path'),
    duration: 1200,
    easing: 'linear',
    d: 'M -30.45,-57.86 -30.45,442.6 53.8,443.8 53.8,396.3 179.5,396.3 179.5,654.7 193.3,654.7 193.3,589.1 253.1,589.1 253.1,561.6 276.1,561.6 276.1,531.2 320.6,531.2 320.6,238.6 406.5,238.6 406.5,213.9 435.6,213.9 435.6,246.2 477,246.2 477,289.9 527.6,289.9 527.6,263.3 553.7,263.3 553.7,280.4 592,280.4 592,189.2 742.3,189.2 742.3,259.5 762.2,259.5 762.2,103.7 776,103.7 776,77.11 791.3,77.11 791.3,18.21 852.7,18.21 852.7,86.61 871.1,86.61 871.1,231 878.7,240.5 878.7,320.3 891,320.3 891,434.3 923.2,434.3 923.2,145.5 940.1,145.5 940.1,117 976.9,117 976.9,139.8 1031,139.8 1031,284.2 1041,284.2 1041,242.4 1176,242.4 1176,282.3 1192,282.3 1192,641.4 1210,641.4 1210,692.7 1225,692.7 1225,599.6 1236,599.6 1236,527.4 1248,527.4 1248,500.8 1273,500.8 1273,523.6 1291,523.6 1291,652.8 1316,652.8 1316,533.1 1337,533.1 1337,502.7 1356,502.7 1356,523.6 1414,523.6 1414,491.3 1432,491.3 1432,523.6 1486,523.6 1486,-57.86 Z'
  });
  setTimeout(() => {
    currentSection.classList.remove('top-section');
    if (!currentSection.previousElementSibling) {
      document.querySelector('.main-wrap').children[0].classList.add('top-section');
      findCurrentPage()
      setHeight()

      setActiveNavLink();

      return
    }
    currentSection.previousElementSibling.classList.add('top-section');
    findCurrentPage()
    setHeight()

    setActiveNavLink();

  }, 1000)
  currentSection = findCurrentPage();
}


function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }

    }, ms);

  }

  return wrapper;

}

function onResize() {
  setHeight()
}
onResize = throttle(onResize, 150);



// ========================================================


function hello(e, IsIntersecting) {
  if (e.direction === 'up' && IsIntersecting) {
    // console.log('HERE: ', e.direction);
    // console.log(Date.now(), 'секция уезжает вниз при intersecting');
    animateDown()
    // return
  }
}

let IsIntersecting;
var indicator = new WheelIndicator({
  elem: document.body,
  callback: function (e) {
    // console.log(1111111);
    const onEntry = (entry) => {
      if (entry[0].isIntersecting) {
        IsIntersecting = true;
        hello(e, IsIntersecting)
      }
    }
    const animationObserver = new IntersectionObserver(onEntry, {});
    const currentTopBlock = document.querySelector('.top-section .top-block');
    if (currentTopBlock) {
      animationObserver.observe(currentTopBlock);
    }

  }
});
indicator.getOption('preventMouse');

function hello2(e, IsIntersecting2) {
  if (e && e.direction === 'down' && IsIntersecting2) {
    // console.log(e.direction === 'down');
    // console.log(Date.now(), 'секция уезжает вверх при intersecting');
    animateUp()
    // return
  }
}
let IsIntersecting2;
var indicator2 = new WheelIndicator({
  elem: document.body,
  callback: function (e) {
    // console.log(1111111);
    let event = e;
    const onEntry2 = (entry) => {

      if (entry[0].isIntersecting) {
        IsIntersecting2 = true;
        hello2(event, IsIntersecting2)
        event = null;
        // IsIntersecting2 = false;
      }
    }
    const animationObserverBottom = new IntersectionObserver(onEntry2, {});

    const currentBottomBlock = document.querySelector('.top-section .bottom-block');
    if (currentBottomBlock) {
      animationObserverBottom.observe(currentBottomBlock);
    }

  }
});
indicator2.getOption('preventMouse');