import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

export function showLoadingButton(el) {
    let spinner = `<div class="spinner"></div>`;
    el.textContent = "";
    el.insertAdjacentHTML("afterbegin", spinner);
  }
  
  export function hideLoadingButton(el, elText) {
    el.textContent = elText;
    el.querySelectorAll("*").forEach((n) => n.remove());
  }

  export function displayError(message, el, input){
    if(message){
    el.classList.add('red');   
    el.innerHTML = `<i class="icon-info"></i> ${message}`;       
    }
    if (input) {
      input.focus();
    }
}

export function displaySuccess(message, el, form, submitter, elText){
    setTimeout(function() {
     el.innerHTML = ""
     el.classList.remove('green');
    }, 5000);
    hideLoadingButton(submitter, elText)
    if(message){
    el.classList.add('green');   
    el.innerHTML = `<i class="icon-check"></i> ${message}`;    
    }
    form.reset()
}

export let getSiblings = function (e) {
  // for collecting siblings
  let siblings = []; 
  // if no parent, return no sibling
  if(!e.parentNode) {
      return siblings;
  }
  // first child of the parent node
  let sibling  = e.parentNode.firstChild;
  // collecting siblings
  while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
          siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
  }
  return siblings;
};

export const RETURNING_VISITOR = localStorage.getItem("returningVisitor") ? true : false;
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

export const filesToUpload = [];
export function handleFiles(files) {
  const set = new Set([...files]);
  const array = [...set];
  array.forEach((file) => {
    validateFile(file)
    addToFilestoSwiper(file);
    getBase64(file).then(
      data => filesToUpload.push(data)
    );
  })
}

export function validateFile(file) {
  const allowedMimeTypes = ['jpg', 'png'];
  let fileMime = file.name.split(".").pop().toLowerCase();
  if (!allowedMimeTypes.includes(fileMime)) {
    return;
  }
}

export let swiperOptions = {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}

export function addToFilestoSwiper(file, i) {
  let fileSrc = URL.createObjectURL(file);
  let uploadImageSwiper = `<div class="swiper-slide">
   <img src="${fileSrc}" width="50px" loading="lazy"/>
   </div>`;
  let swiperContainer = document.querySelector('.swiper-container')
  let swiper = new Swiper(swiperContainer, swiperOptions);
  swiper.appendSlide([uploadImageSwiper]);
}

// Acknowledgement joshua.paling - October 2019 https://stackoverflow.com/a/46639837/10741662
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// export function addImagesToReport(img, container){
//   let slideImg = `<div class="swiper-slide"><img src="${img}" width="150px"></div>`; 
//   let reportSwiper = new Swiper(container, swiperOptions);
//   reportSwiper.appendSlide([slideImg]); 
// }