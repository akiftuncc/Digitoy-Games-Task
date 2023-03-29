// 000 0= hepsi hayır
// 001 1= Hızlı
// 010 2= Teke Tek
// 011 1+2=3 -> Hızlı+Teke tek
// 100 4= Rövanş
// 101 1+4=5 -> Hızlı+Rövanş
// 110 2+4=6 -> Teke tek+Rövanş
// 111 1+2+4=7 -> Hızlı+Teke tek+Rövanş

const bahisInput = document.getElementById("bet-value");

// Butonları ayrı ayrı tanımlama sebebim bir butona tıkladığımda başka bir butondaki bacground'un da değişmesi
const hizliEvetBtn = document.querySelector(".attribute1");
const teketekEvetBtn = document.querySelector(".attribute3");
const rovansEvetBtn = document.querySelector(".attribute5");

const hizliHayirBtn = document.querySelector(".attribute2");
const teketekHayirBtn = document.querySelector(".attribute4");
const rovansHayirBtn = document.querySelector(".attribute6");

const masaEkleBtn = document.querySelector("#tamam-btn");
const masaGorBtn = document.querySelector("#masa-btn");

let bahis = 0;
let hizli = 0;
let teketek = 0;
let rovans = 0;

// EVET BUTONLARI TIKLANDIĞINDA
hizliEvetBtn.addEventListener("click", function () {
  // hızlı- evet butonuna tıklandığında hızlı değişkeni 1 olur ve buton backgroundColor'ları değişir. (alttaki durumlarda da işlem benzerdir))
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

// HAYIR BUTONLARI TIKLANDIĞINDA
hizliHayirBtn.addEventListener("click", function () {
  // hızlı- hayır butonuna tıklandığında hızlı değişkeni 0 olur ve buton backgroundColor'ları değişir (alttaki durumlarda da işlem benzerdir)
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

let bitflagAndBetAmoutList = []; //içerisine bitflag değerini ve bahis değerinin olduğu iki elemanlı bir array alır.
const forerror = document.querySelector(".for-error"); // bahis aralığından dolayı error verdiğinde açılacak olan ekran

masaEkleBtn.addEventListener("click", function () {
  // Masa Ekle Butonuna tıklandığında
  bahis = bahisInput.value;
  bahis = parseInt(bahis);
  if (bahis >= 200 && bahis <= 5000) {
    // Bahis aralığı kontrol
    let bitflag = hizli + teketek + rovans; // bitflag toplama
    bitflagAndBetAmoutList.push([bitflag, bahis]);
  } else {
    forerror.classList.remove("display-none"); // Bahis aralığı hatasını gösterir
  }
});

document.body.addEventListener("click", function (e) {
  if (!document.querySelector(".main").contains(e.target)) {
    forerror.classList.add("display-none"); // Bahis aralığı hatasını kaldırır
  }
});

const masaDiv = document.querySelector(".for-masa");
let masaClassList = [];
masaGorBtn.addEventListener("click", function () {
  //Masaları Gör Butonuna tıklandığında
  bitflagAndBetAmoutList.forEach((element) => {
    element[0];
    masaClass = masaCreator(element[0], element[1]);
    masaClassList.push(masaClass); // classList'e class'ı ekler
  });

  console.log(masaClassList); // class listesini konsola yazdırır
  let count = 0;
  masaClassList.forEach((element) => {
    //listedeki elemanları döndürür
    count++;
    element.masaOzellikleriChange(); // class'ın içindeki fonksiyonu çağırır
    const div = document.createElement("div");
    div.innerHTML = //masaları div içine ekler
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
  masaDiv.classList.remove("display-none"); // masaların içinde olduğu divi görünür yapar
});

// //////////////////////////////////////////////////////
function masaCreator(e, bahis) {
  //e=bitflag toplamlar -- bahis=bahis miktarı
  // Bitflag kullanımı:
  // ihtimaller 000-001 000-010 000-100 (0 ve 2'nin üsleri) olduğundan dolayı bu değerlerin toplamı asla aynı sayıda kesişemez.
  // Bu sebeple daha önce topladığım hiz teketek ve rovans değerlerini fonksiyona giriyorum

  let hiz_bool = false;
  let teketek_bool = false;
  let rovans_bool = false;

  // Kontrolleri büyükten küçüğe yaparak ilerledim. if (true) halinde bool değerleri true oluyor.
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
  //Yeni masa classını oluşturur
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
    // (hız - teke tek - rovans)'ın true false değerlerine göre text ataması yapar.
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
