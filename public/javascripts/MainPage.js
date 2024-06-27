
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

window.onscroll = function () { scrollFunction() };
function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById("navbar").style.top = "0";
    document.getElementById("scroll-up").style.display = "block";
  } else {
    document.getElementById("navbar").style.top = "-60px";
    document.getElementById("scroll-up").style.display = "none";
  }
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//SCROLL ANIMATE
var scroll = window.requestAnimationFrame ||
  function (callback) { window.setTimeout(callback, 1000 / 60) };
var elementsToShow = document.querySelectorAll('.show-on-scroll');
function loop() {

  Array.prototype.forEach.call(elementsToShow, function (element) {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible');
    } else {
      element.classList.remove('is-visible');
    }
  });

  scroll(loop);
}
loop();

function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}




var myVar;
function myLoader() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

const uploadButton = document.getElementById('uploadButton');
const uploadResult = document.getElementById('upload-result');

uploadButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const projectTitle = document.getElementById('projectTitle').value;
  const developerName = document.getElementById('developerName').value;
  const description = document.getElementById('description').value;
  const hostedUrl = document.getElementById('hostedUrl').value;

  // Replace with your actual MongoDB connection and insertion logic
  const response = await fetch('/upload', { // Assuming a backend endpoint at /upload
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      projectTitle,
      developerName,
      description,
      hostedUrl
    })
  });

  const data = await response.json(); // Parse the response as JSON

  if (data.success) {
    uploadResult.innerHTML = `
                <p>Project uploaded successfully!</p>
                <ul>
                    <li>Project Title: ${projectTitle}</li>
                    <li>Developer Name: ${developerName}</li>
                    <li>Description: ${description}</li>
                    <li>Hosted URL: ${hostedUrl}</li>
                </ul>
            `;
  } else {
    uploadResult.innerHTML = `<p>Error uploading project: ${data.message}</p>`;
  }
});
