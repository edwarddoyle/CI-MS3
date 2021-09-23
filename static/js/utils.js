import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

// show loading button
export function showLoadingButton(el) {
  let spinner = `<div class="spinner"></div>`;
  el.textContent = "";
  el.insertAdjacentHTML("afterbegin", spinner);
}

// hide loading button
export function hideLoadingButton(el, elText) {
  el.textContent = elText;
  el.querySelectorAll("*").forEach((n) => n.remove());
}

// display error message
export function displayError(message, el, input, submitter, elText) {
  if (message) {
    el.classList.add('red');
    el.innerHTML = `<i class="icon-info"></i> ${message}`;
    hideLoadingButton(submitter, elText)
  }
  if (input) {
    input.focus();
  }
}

// display success message
export function displaySuccess(message, el, form, submitter, elText) {
  setTimeout(function () {
    el.innerHTML = ""
    el.classList.remove('green');
  }, 5000);
  hideLoadingButton(submitter, elText)
  if (message) {
    el.classList.add('green');
    el.innerHTML = `<i class="icon-check"></i> ${message}`;
  }
  form.reset()
}

export let getSiblings = function (e) {
  let siblings = [];
  if (!e.parentNode) {
    return siblings;
  }
  let sibling = e.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

// toggle event card state
export function toggleCard(e) {
  const el = e.currentTarget;
  el.classList.toggle('is-collapsed')
  let notClicked = getSiblings(el);
  notClicked.forEach(card => {
    if (!card.classList.contains('is-collapsed')) {
      card.classList.add('is-collapsed')
    }
  })
}

// set div editable
export function setEditable(targ) {
  targ.contentEditable = true;
  targ.classList.add('liveEdit')
  targ.focus();
}

// remove div editable
export function removeEditable(targ) {
  targ.contentEditable = false;
  targ.classList.remove('liveEdit')
}

export function changeButtonText(el, text) {
  el.textContent = text;
}


export function addToFilestoSwiper(file) {
  const swiperContainer = document.querySelector('.swiper-container')
  const swiperOptions = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

  const swiper = new Swiper(swiperContainer, swiperOptions);
  let fileSrc = URL.createObjectURL(file);

  let uploadImageSwiper = `<div class="swiper-slide">
       <img src="${fileSrc}" width="50px" loading="lazy"/>
       </div>`;
  swiper.appendSlide([uploadImageSwiper]);
}

export function enableButton() {
  submitReport.disabled = false;
  console.log('btn enable')
  hideLoadingButton(submitReport, "Submit");
}