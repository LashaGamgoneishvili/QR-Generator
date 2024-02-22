const body = document.querySelector("body");
const imgBox = document.getElementById("imgBox");
const qrImage = document.getElementById("qrImage");
const qrText = document.getElementById("URL");
const qrSize = document.getElementById("size");
const spiner = document.querySelector(".spiner");
const button = document.querySelector("button");
const size = document.getElementById("size");
const qrcode = document.getElementById("qrcode");
const downloadBtn = document.querySelector(".download");
const svg = document.querySelector(".svg");
let setQrSize;

const sizeChanger = function () {
  setQrSize = size.value;
  imgBox.style.width = setQrSize + "px";
  imgBox.style.height = setQrSize + "px";
  qrImage.style.width = setQrSize + "px";
  qrImage.style.height = setQrSize + "px";
};

const generateQR = function () {
  size.addEventListener("change", sizeChanger);
  if (qrText.value.length > 0) {
    spiner.classList.add("show-spiner");
    setTimeout(() => {
      qrText.classList.remove("color");
      qrText.style.outline = "none";
      qrText.style.boxShadow = "inset 0 0 0 var(--border-width, 1px)";
      spiner.classList.remove("show-spiner");
      qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
        qrText.value;
      sizeChanger();
    }, 1000);
  } else {
    qrText.classList.add("error");
    qrText.style.outline = "2px solid red";
    qrText.style.boxShadow = "none";
    qrText.classList.add("color");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);
  }
};

downloadBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
        qrText.value
    );
    console.log(response);
    const file = await response.blob();
    console.log(file);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    console.log(link.href);
    link.download = new Date().getTime();
    link.click();
  } catch (error) {
    alert("Failed to download the file!");
  }
});

// window.addEventListener("load", function () {
//   url.focus();
// });

//////////////////              explenation              /////////////////
/*

In our fetch request example (run fetch request live), we create a new request using the Request() constructor, then use it to fetch a JPG. When the fetch is successful, we read a Blob out of the response using blob(), put it into an object URL using URL.createObjectURL(), and then set that URL as the source of an <img> element to display the image.

*/
