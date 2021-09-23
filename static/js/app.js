const navToggler = document.querySelector("nav button");
const navMenu = document.querySelector("nav ol");

navToggler.addEventListener("click", togglerClick);

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle("toggler-open");
  navMenu.classList.toggle("open");
}