import {getSiblings, toggleCard, handleFiles, filesToUpload} from "./utils.js";

// IMAGE POP PREVIEW
document.querySelector('main').classList.add('reportsPage')
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
            changeButtonText(btn.parentNode.nextElementSibling.firstChild, "CANCEL")
        } else if (btn.textContent == "UPDATE") {
            const postObj = {
                _id: btn.dataset.target,
                report_desc: targetReport.textContent
            }
            crudReport(postObj, "UPDATE")
            removeEditable(targetReport)
            changeButtonText(btn, "EDIT")
            changeButtonText(btn.parentNode.nextElementSibling.firstChild, "DELETE")
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
            changeButtonText(btn.parentNode.previousElementSibling.firstChild, "EDIT")
        }
    })
})

function setEditable(targ) {
    targ.contentEditable = true;
    targ.classList.add('liveEdit')
    targ.focus();
}

function removeEditable(targ) {
    targ.contentEditable = false;
    targ.classList.remove('liveEdit')
}

function changeButtonText(el, text) {
    el.textContent = text;
}

// CRUD FUNCTIONS
async function crudReport(myObject,action) {
    try {
        let url;
        action === "UPDATE" ? url = "/update-report" : url = "/delete-report";        
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(myObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            window.location.reload()
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log(error)
    }
}

// CREATE REPORT
let showCreateForm = document.querySelector(".reportsFunctions");
const appHolder = document.querySelector(".reports")
const reportObject = new Object();


showCreateForm.addEventListener("click", function () {
    appHolder.replaceChildren();
    displayReportForm()

           // Add Values To Report Object
           reportObject.id = Date.now();
           reportObject.reportDate = new Date().toLocaleDateString("en-GB");
           reportObject.images = [];

    })

function displayReportForm() {
    let reportFormHTML = `<form id="reportForm" class="feedbackForm" autocomplete="off" >
          <ol>
            <li><h3>New Report</h3></li>
            <li><label for="desc">Description</label>
                <input type="text" name="desc" id="desc" />
            </li>
            <li class="flexEnd">
                <input type="file" id="fileElem" name="images" accept="image/*" multiple/>
                <label class="button" for="fileElem"><i class="icon-camera"></i></label>
            </li>
          </ol>
        <div class="swiperContainer">            
          <div class="swiper-container">
            <div class="swiper-wrapper"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
        <div id="currentLocation"></div>
           <ol>
            <li class="flexEnd">
              <button type="submit" id="submitReport">Submit</button>
            </li>
          </ol>        
   
  </form>`;
  appHolder.insertAdjacentHTML("afterbegin", reportFormHTML);
  document.querySelector('#desc').focus();
  let form = document.getElementById("reportForm")

    // Validate Files on input change
    let fileInput = form.querySelector('input[type="file"]');
    fileInput.onchange = () => {
      if (fileInput.files.length > 0) {
        handleFiles(fileInput.files);
      }
      filesToUpload.forEach((file, i) => {
        reportObject.images.push(file);
      });
    };

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
      reportObject.map = map;
    }
  
    function geoError(err) {
      locationContainer.textContent = `ERROR(${err.code}): ${err.message}`;
      reportObject.map = "assets/images/nomap.svg";
    }


        // after submit Loop over form to get values
        [...form.elements].forEach((el) => {
            if (el.type === "text") {
              let name = String(el.name);
              let value = el.value.trim();
            //   emailBody = [...emailBody, { name: name, data: value }];
              reportObject[`${name}`] = `${value}`;
            }
          });


  


}