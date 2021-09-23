import {
  showLoadingButton,
  displayError,
  displaySuccess
} from "./utils.js";

const contactForm = document.querySelector('form');
const formMessage = contactForm.querySelector('p')

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendContact(e);
});


async function sendContact(e) {

  const classes = ["green", "red", ];
  classes.forEach(c => {
    if (formMessage.classList.contains(c)) {
      formMessage.classList.remove(c);
    }
  })
  formMessage.innerHTML = '';
  showLoadingButton(e.submitter);

  let emailBody = [];
  // Loop over form to get values
  [...contactForm.elements].forEach((el) => {
    let name = String(el.name);
    let value = el.value.trim();
    emailBody = [...emailBody, {
      name: name,
      data: value
    }];
  });
  // Send email
  await Email.send({
    SecureToken: "dd05546f-ea67-4f1a-8825-4d3c9ba272e9",
    To: "edwardpaul.doyle@gmail.com",
    From: "edwardpaul.doyle@gmail.com",
    Subject: "New KCC Message",
    Body: emailBody,
  }).then(
    message => message = "OK" ? displaySuccess("Message Recieved, Thank You", formMessage, contactForm, e.submitter, "SUBMIT") : displayError(error, formMessage, e.submitter, "SUBMIT")
  )
};