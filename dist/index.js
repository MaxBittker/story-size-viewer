const RATIO = 2 / 3;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let url = urlParams.get("url");
if (url.startsWith("https://") || url.startsWith("http://")) {
} else {
  url = "https://" + url;
}
console.log(url);

const defaultURL =
  "https://stories.tappable.dev/brusselsbeerproject?story=true";

let urlInput = document.getElementById("storyurl");
urlInput.value = url || defaultURL;

let phones = document.querySelectorAll(".phone");

function setIframes() {
  console.log("test");
  console.log(urlInput.value);

  for (let phone of phones) {
    const ratio = phone.dataset.ratio
      .split("/")
      .map((ratio) => parseInt(ratio));
    phone.style.setProperty("--aspect-ratio", phone.dataset.ratio);

    let screen = document.createElement("div");
    screen.className = "screen";

    let iframe = document.createElement("iframe");
    iframe.src = urlInput.value;

    let chromeTop = document.createElement("div");
    chromeTop.className = "chrome";

    chromeTop.style.height =
      (parseInt(phone.dataset.chromeTop) / ratio[1]) * 100 + "%";

    screen.appendChild(chromeTop);

    // let content = document.createElement("div");
    // content.className = "content";
    // screen.appendChild(content);
    screen.appendChild(iframe);

    // let safeZone = document.createElement("div");
    // safeZone.className = "safe-zone";
    // content.appendChild(safeZone);

    // let textBox = document.createElement("div");
    // textBox.className = "text-box";
    // textBox.innerHTML =
    //   "I'm a text box positioned at the bottom, with a solid background color.";
    // safeZone.appendChild(textBox);

    let chromeBottom = document.createElement("div");
    chromeBottom.className = "chrome";
    chromeBottom.style.height =
      (parseInt(phone.dataset.chromeBottom) / ratio[1]) * 100 + "%";

    screen.appendChild(chromeBottom);
    phone.innerHTML = "";
    phone.appendChild(screen);
    // phone.appendChild(iframe);
  }
}

// function recalculateSafeZones() {
//   let safeZones = document.querySelectorAll(".safe-zone");
//   for (let safeZone of safeZones) {
//     let width = safeZone.parentElement.offsetHeight * RATIO;
//     let height = safeZone.parentElement.offsetHeight;
//     if (width > safeZone.parentElement.offsetWidth) {
//       width = safeZone.parentElement.offsetWidth;
//       height = safeZone.parentElement.offsetWidth / RATIO;
//     }
//     safeZone.style.width = width + "px";
//     safeZone.style.height = height + "px";
//   }
// }

// recalculateSafeZones();
setIframes();

// window.onresize = recalculateSafeZones;

urlInput.addEventListener("change", setIframes);
urlInput.addEventListener("paste", setIframes);
urlInput.addEventListener("keyup", setIframes);
