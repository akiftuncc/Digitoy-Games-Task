// 000 0= -
// 001 1= Hızlı
// 010 2= Teke Tek
// 100 4= Rövanş

const bahisInput = document.getElementById("bet-value");

// Butonlar tanımlandı
const hizliEvetBtn = document.querySelector(".attribute1");
const teketekEvetBtn = document.querySelector(".attribute3");
const rovansEvetBtn = document.querySelector(".attribute5");

const hizliHayirBtn = document.querySelector(".attribute2");
const teketekHayirBtn = document.querySelector(".attribute4");
const rovansHayirBtn = document.querySelector(".attribute6");

const masaEkleBtn = document.querySelector("#tamam-btn");
const masaGorBtn = document.querySelector("#masa-btn");

const forerror = document.querySelector(".for-error");

let bahis = 0;
let hizli = 0;
let teketek = 0;
let rovans = 0;

// Butonlarda Evet Tıklandığında
hizliEvetBtn.addEventListener("click", function () {
  hizli = 1;
  hizliEvetBtn.style.backgroundColor = "#87fc02e5";
  hizliHayirBtn.style.backgroundColor = "#e416165b";
});

teketekEvetBtn.addEventListener("click", function () {
  teketek = 2;
  teketekEvetBtn.style.backgroundColor = "#87fc02e5";
  teketekHayirBtn.style.backgroundColor = "#e416165b";
});

rovansEvetBtn.addEventListener("click", function () {
  rovans = 4;
  rovansEvetBtn.style.backgroundColor = "#87fc02e5";
  rovansHayirBtn.style.backgroundColor = "#e416165b";
});

// Butonlarda Hayır Tıklandığında
hizliHayirBtn.addEventListener("click", function () {
  hizli = 0;
  hizliEvetBtn.style.backgroundColor = "#87fc026b";
  hizliHayirBtn.style.backgroundColor = "#e41616b9";
});

teketekHayirBtn.addEventListener("click", function () {
  teketek = 0;
  teketekEvetBtn.style.backgroundColor = "#87fc026b";
  teketekHayirBtn.style.backgroundColor = "#e41616b9";
});

rovansHayirBtn.addEventListener("click", function () {
  rovans = 0;
  rovansEvetBtn.style.backgroundColor = "#87fc026b";
  rovansHayirBtn.style.backgroundColor = "#e41616b9";
});

let bitflagAndBetAmoutList = [];
let checkError = false;
// Masa Ekle Butonuna tıklandığında
masaEkleBtn.addEventListener("click", function () {
  bahis = bahisInput.value;
  bahis = parseInt(bahis);
  if (bahis >= 200 && bahis <= 5000) {
    let bitflag = hizli + teketek + rovans;
    bitflagAndBetAmoutList.push([bitflag, bahis]);
    checkError = false;
  } else {
    checkError = true;
    forerror.classList.remove("display-none");
  }
});

document.body.addEventListener("click", function (e) {
  if (!document.querySelector(".main").contains(e.target)) {
    forerror.classList.add("display-none");
  }
});

//Masaları Gör Butonuna tıklandığında

const masaDiv = document.querySelector(".for-masa");
let masaClassList = [];
masaGorBtn.addEventListener("click", function () {
  bitflagAndBetAmoutList.forEach((element) => {
    element[0];
    masaClass = masaBitflagCalculator(element[0], element[1]);
    masaClassList.push(masaClass);
  });
  console.log(masaClassList);
  let count = 0;
  masaClassList.forEach((element) => {
    count++;
    element.masaOzellikleriChange();
    const div = document.createElement("div");
    div.innerHTML =
      "<h3>MASA</h3>" +
      "<h3>" +
      count +
      "</h3>" +
      "<h3>:</h3>" +
      " <h5> Bahis Miktarı:</h5>" +
      "<h5>" +
      element.bahis +
      "</h5>" +
      "<h5> Oyun Hızı:</h5>" +
      "<h5>" +
      element.hiz +
      "</h5>" +
      "<h5> Oyun tipi:</h5>" +
      "<h5>" +
      element.teketek +
      "</h5>" +
      "<h5> Rövanşlı mı:</h5>" +
      "<h5>" +
      element.rovans +
      "</h5>";
    masaDiv.appendChild(div);
    element.hiz;
  });
  masaDiv.classList.remove("display-none");
});

// //////////////////////////////////////////////////////
function masaBitflagCalculator(e, bahis) {
  let hiz_bool = false;
  let teketek_bool = false;
  let rovans_bool = false;

  if (e - 4 >= 0) {
    e -= 4;
    rovans_bool = true;
  }
  if (e - 2 >= 0) {
    e -= 2;
    teketek_bool = true;
  }
  if (e - 1 >= 0) {
    e -= 1;
    hiz_bool = true;
  }
  const masa1 = new Masa(bahis, hiz_bool, teketek_bool, rovans_bool);
  return masa1;
}

class Masa {
  constructor(bahis, hiz, teketek, rovans) {
    this.bahis = bahis;
    this.hiz = hiz;
    this.teketek = teketek;
    this.rovans = rovans;
  }

  masaOzellikleriChange() {
    if (this.hiz) {
      this.hiz = "Hızlı";
    } else {
      this.hiz = "Yavaş";
    }

    if (this.teketek) {
      this.teketek = "Teke tek";
    } else {
      this.teketek = "Çoklu";
    }

    if (this.rovans) {
      this.rovans = "Rövanşlı";
    } else {
      this.rovans = "Rövanşsız";
    }
  }
}
