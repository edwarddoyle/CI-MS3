import {
  showLoadingButton,
  removeEditable,
  setEditable,
  changeButtonText,
  addToFilestoSwiper,
  enableButton
} from "./utils.js";

const filesToUpload = [];


// IMAGE POP PREVIEW
// document.querySelector('main').classList.add('reportsPage')

let popImages = document.querySelectorAll('.popImage');
const modal = document.querySelector('.show');
const poppedImage = document.querySelector('.img-show') ?? 0;


[...popImages].forEach(img => {
  img.addEventListener("click", function () {
    let source = img.getAttribute("src");
    modal.querySelector("img").setAttribute("src", source)
    modal.classList.remove('out');
    modal.classList.add('in');
  })
})

if (poppedImage) {
  poppedImage.addEventListener("click", () => {
    modal.classList.add('out');
    modal.classList.remove('in');
    modal.querySelector("img").setAttribute("src", "")
  })
}

// EDIT REPORT
let editButton = document.querySelectorAll(".button.edit");
[...editButton].forEach(btn => {
  btn.addEventListener("click", function () {
    let targetReport = document.getElementById(btn.dataset.target).querySelector('[data-form="report_desc"]');
    if (btn.textContent == "EDIT") {
      setEditable(targetReport)
      changeButtonText(btn, "UPDATE")
      changeButtonText(btn.nextElementSibling.firstChild, "CANCEL")
    } else if (btn.textContent == "UPDATE") {
      const postObj = {
        _id: btn.dataset.target,
        report_desc: targetReport.textContent
      }
      crudReport(postObj, "UPDATE")
      removeEditable(targetReport)
      changeButtonText(btn, "EDIT")
      changeButtonText(btn.nextElementSibling.firstChild, "DELETE")
    }
  })
})

// DELETE REPORT
let deleteButton = document.querySelectorAll(".button.delete");
[...deleteButton].forEach(btn => {
  btn.addEventListener("click", function () {
    let targetReport = document.getElementById(btn.dataset.target).querySelector('[data-form="report_desc"]');
    if (btn.textContent == "DELETE") {
      const postObj = {
        _id: btn.dataset.target
      }
      crudReport(postObj, "DELETE")
    } else if (btn.textContent == "CANCEL") {
      removeEditable(targetReport)
      changeButtonText(btn, "DELETE")
      changeButtonText(btn.previousElementSibling.firstChild, "EDIT")
    }
  })
})

// CRUD FUNCTIONS
async function crudReport(myObject, action) {
  try {
    let url;
    action === "UPDATE" ? url = "/update-report" :
      action === "CREATE" ? url = "/create-report" :
      url = "/delete-report";
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(myObject),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

// CREATE REPORT
let showCreateForm = document.querySelectorAll(".createReport, .floating-action-button");
const appHolder = document.querySelector("main")
const reportObject = new Object();

[...showCreateForm].forEach(btn =>{
  btn.addEventListener("click", function () {
    appHolder.replaceChildren();
    displayReportForm()
    reportObject.report_id = Date.now();
    reportObject.report_date = new Date().toLocaleDateString("en-GB");
    reportObject.report_images = [];
  })
})

function displayReportForm() {
  let reportFormHTML = `
  <section class="reports">
  <article>
  <button class="button delete closebutton">X</button>
  <form id="reportForm"  class="reportform" autocomplete="off" >          
          <ol>
            <li><h3>New Report</h3></li>
            <li><label for="desc">Description</label>
                <textarea
                form="reportForm" type="text" name="report_desc" id="desc" placeholder="&#xe90c;" rows="8"
                 wrap="soft" required/></textarea>
            </li>
            <li class="flexEnd">
                <input type="file" id="fileElem" name="images" accept="image/png, image/jpeg" multiple/>
                <label class="button" for="fileElem"><i class="icon-email"></i>Add Photos</label>
            </li>
          </ol>
        <div class="swiperContainer">            
          <div class="swiper-container">
            <div class="swiper-wrapper"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
        <div id="currentLocation">        
        </div>
          <ol>
            <li class="flexEnd">
              <button class="button" id="submitReport">Submit</button>
            </li>
          </ol>          
  </form>
  </article>
  </section>
  `;
  appHolder.insertAdjacentHTML("afterbegin", reportFormHTML);
  document.querySelector('#desc').focus();

  const form = document.getElementById("reportForm")
  const submitReport = document.querySelector('#submitReport')
  const textArea = form.querySelector('textarea')
  const closeButton = document.querySelector('button.closebutton')
  const fd = new FormData();

  let fileInput = form.querySelector('label.button');
  fileInput.addEventListener("click", () => {
    sessionStorage.setItem("fileclick", true)
    showLoadingButton(submitReport);
    submitReport.disabled = true;
    setTimeout(function(){enableButton(), sessionStorage.removeItem("fileclick")}, 5000);
  })

  textArea.onblur = () =>{
    reportObject.report_desc = textArea.value;
  }

  closeButton.addEventListener("click", () => {
    window.location.reload();    
  })

  let inputFile = form.querySelector('input[type="file"]');
  inputFile.onchange = () => {
    if (inputFile.files.length > 0) {
      [...inputFile.files].forEach((file) => {
        addToFilestoSwiper(file);
        fd.append("file", file)
        postToCloudinary(fd)
        enableButton();
      })
    }
    else if(inputFile.files.length = 0){
      enableButton();
    }
  };

  function postToCloudinary(e) {
    const url = '/upload-image';
    fetch(url, {
      method: 'POST',
      body: e,
      headers: {
        'enctype': 'multipart/form-data',
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(showToast("false", response.status));
      }
    }).then(data => {
      filesToUpload.push(data.secure_url);
    }).catch(function (error) {
      console.log(error)
    })
  }

  const locationContainer = document.querySelector("#currentLocation");
  (function getLocation() {
    if (navigator.geolocation) {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(getPosition, geoError, options);
    } else {
      locationContainer.textContent =
        "Geolocation is not supported by this browser.";
    }
  })();

  function getPosition(pos) {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    let map = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=200x200&scale=2&maptype=roadmap&markers=color:red%7C${latitude},${longitude}%7Csize:tiny&key=AIzaSyCX2dNlnn4pLHJf5KTZSup4zqihJxb0c5I`;
    let currentLocation = `<img loading="lazy" width="150" src="${map}"/>`;
    locationContainer.insertAdjacentHTML("afterbegin", currentLocation);
    reportObject.report_map = map;
    reportObject.report_lat = latitude;
    reportObject.report_long = longitude;
  }

  function geoError(err) {
    locationContainer.textContent = `ERROR(${err.code}): ${err.message}`;
    reportObject.map = "assets/images/nomap.svg";
  }

  submitReport.addEventListener("click", (e) => {
    e.preventDefault();
    reportObject.report_images = filesToUpload;
    crudReport(reportObject, "CREATE")
  });
}