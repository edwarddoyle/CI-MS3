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
