'use strict';

const formBtn = document.querySelector('.hello-hero__btn');
const formNameInput = document.querySelector('#name');
const formSubjectInput = document.querySelector('#subject');

formBtn.addEventListener('mouseover', formValidate);
formBtn.addEventListener('mouseleave', formValidateCancel);

function formValidate() {
  if (formNameInput.value === '' || formSubjectInput.value === '') {
    if (formNameInput.value === '' && formSubjectInput.value === '') {
      formNameInput.classList.add('input-error');
      formSubjectInput.classList.add('input-error');
    } else if (formSubjectInput.value === '') {
      formSubjectInput.classList.add('input-error');
    } else if (formNameInput.value === '') {
      formNameInput.classList.add('input-error');
    }
  }
}

function formValidateCancel() {
  formNameInput.classList.remove('input-error');
  formSubjectInput.classList.remove('input-error');
}