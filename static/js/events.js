import {toggleCard} from "./utils.js";

const cards = document.querySelectorAll('.eventCard');

if(cards){
   cards.forEach(card => {
    card.addEventListener("click", toggleCard);
}) 
}

