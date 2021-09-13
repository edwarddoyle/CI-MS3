import {getSiblings} from "./utils.js";

const cards = document.querySelectorAll('.eventCard');

if(cards){
   cards.forEach(card => {
    card.addEventListener("click", toggleCard);
}) 
}

function toggleCard(e) {
    const el = e.currentTarget;
    el.classList.toggle('is-collapsed')
    let notClicked = getSiblings(el);
    notClicked.forEach(card => {
        if (!card.classList.contains('is-collapsed')) {
            card.classList.add('is-collapsed')
        }
    })
}