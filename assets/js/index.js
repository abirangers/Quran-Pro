export function navButton() {
  const btn = document.querySelector("button");
  btn.addEventListener("click", function () {
    const navigasiBar = document.querySelector("nav");
    navigasiBar.classList.toggle("aktif");
  });
}

export function arrowBtn() {
  var arrow = document.querySelector("#arrow");
  window.addEventListener("scroll", function () {
    arrow.classList.toggle("scrolled", window.scrollY > 500);
  });
}

const dBody = document.querySelector(".daftar-body");
export function daftarSurat() {
  fetch("https://equran.id/api/surat")
  .then((response) => response.json())
  .then((response) => {
      let cardSurat = "";
      response.forEach((surat) => {
        cardSurat += surahs(surat);
      });
      dBody.innerHTML = cardSurat;

      const searchInput = document.querySelector(".searchInput");
      const rows = document.querySelectorAll(".daftar-content");

      searchInput.addEventListener("keyup", function (event) {
        const q = event.target.value.toLowerCase();
        rows.forEach((row) => {
          row.querySelector(".datang").textContent.toLowerCase().startsWith(q)
            ? (row.style.display = "")
            : (row.style.display = "none");
        });
      });
    });
  return;
}

export function isiSurat() {
  function getURL(e) {
    const pageURL = window.location.search.substring(1);
    const urlVariable = pageURL.split("&");

    for (let i = 0; i < urlVariable.length; i++) {
      const parameterName = urlVariable[i].split("=");
      if (parameterName[0] == e) {
        return parameterName[1];
      }
    }
  }

  const nomorSurat = getURL("nomorsurat");

  function getSurat() {
    fetch(`https://equran.id/api/surat/${nomorSurat}`)
      .then((response) => response.json())
      .then((response) => {
        componentSurat(response);
        // isi surat
        const surat = response.ayat;
        let isiSurat = "";
        const containerSurat = document.querySelector(
          ".container-surat .content-surat"
        );
        surat.forEach((s) => {
          isiSurat += ayat(s);
        });
        containerSurat.innerHTML = isiSurat;
        
        let mediaShare = document.querySelectorAll(".media-share");
        shareButton(mediaShare, response);
      });
    }
    getSurat();
  function componentSurat(response) {
    // judul surat
    const contSurat = document.querySelector(".header-surah");
    const suratApa = headerSurah(response);
    contSurat.innerHTML = suratApa;

    // audio surat
    const audSurat = document.querySelector(".audio-surah");
    const audioApa = audioSurah(response);
    audSurat.innerHTML = audioApa;

    // deskripsi surat
    const deskSurah = document.querySelector(".desk-surah");
    const deskApa = deskOfSurah(response);
    deskSurah.innerHTML = deskApa;

    // munculkan deskripsi surat
    const info = document.querySelector(".info");
    const navbarHeader = document.querySelector(".navbar");
    info.addEventListener("click", function () {
      deskSurah.classList.add("flex");
      document.body.style.overflow = "hidden";
      navbarHeader.classList.add("not-fixed");
    });
    window.addEventListener("click", function (e) {
      if (e.target === deskSurah) {
        deskSurah.classList.remove("flex");
        document.body.style.overflow = "visible";
        navbarHeader.classList.remove("not-fixed");
      }
    });
  }

  function shareButton(mediaShare, response) {
    mediaShare.forEach((m) => {
      m.addEventListener("click", function () {
        if (navigator.share) {
          const surat = this.parentElement.parentElement;
          const idSurat = surat.getAttribute('id');
  
          navigator
            .share({
              title: `${response.nama_latin}`,
              text: `${response.arti}`,
              url: `#${idSurat}`,
            })
            .then(function () {
              console.log("Berbagi berhasil.");
              const targetElement = document.getElementById(idSurat);
              if (targetElement) {
                targetElement.scrollIntoView();
              }
            })
            .catch(function (error) {
              console.log("Gagal berbagi:", error);
            });
        } else {
          console.log("Web Share API tidak didukung di browser ini.");
        }
      });
    });
  }
  
  

  document.addEventListener("click", async function (e) {
    try {
      if (e.target.classList.contains("tafsiran")) {
        const navbarHeader = document.querySelector(".navbar");
        const tafsirSurah = document.querySelector(".tafsir-surah");
        const dataVerse = e.target.getAttribute("data-verse");
        const tafsirDetail = await getTafsirDetail();
        updateUIDetail(tafsirDetail, dataVerse, tafsirSurah, navbarHeader);
        navbarHeader.classList.add("not-fixed");
        tafsirSurah.classList.add("taft");
        document.body.style.overflow = "hidden";
      }
    } catch (error) {
      console.log(`ada error bro. errornya disini => ${error}`);
    }
  });

  function getTafsirDetail() {
    return fetch(`https://equran.id/api/v2/tafsir/${nomorSurat}`)
      .then((response) => response.json())
      .then((response) => response);
  }

  function updateUIDetail(response, dataVerse, tafsirSurah, navbarHeader) {
    let dataTaf = response.data.tafsir;
    let data = response.data;
    let isiTafsir = "";
    dataTaf.forEach((taf, index) => {
      if (dataVerse == taf.ayat) {
        isiTafsir += tafsirOfAyat(taf, data);
      }
    });
    tafsirSurah.innerHTML = isiTafsir;
    removeTafsir(tafsirSurah, navbarHeader);
  }

  function removeTafsir(tafsirSurah, navbarHeader) {
    window.addEventListener("click", function (e) {
      if (e.target === tafsirSurah) {
        tafsirSurah.classList.remove("taft");
        document.body.style.overflow = "visible";
        navbarHeader.classList.remove("not-fixed");
      }
    });
  }
}

function surahs(surat) {
  return `
  <div class="daftar-content" onclick="location.href='surat.html?nomorsurat=${surat.nomor}' " >
      <div class="daftar-kiri">
          <span><b>${surat.nomor}</b></span>
          <div class="bawah">
          <a class="datang">${surat.nama_latin}</a>
              <p>(${surat.arti})</p>
          </div>
      </div>
      <div class="daftar-kanan">
          <p>${surat.nama}<br>${surat.jumlah_ayat} Ayat</p>
      </div>
  </div>`;  
}

function headerSurah(response) {
  return `
    <svg class="info" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="opacity-70 hover:opacity-100" height="23" width="23" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>    
<div class="header-content">
    <h3>${response.nama_latin}</h3>
    <p>${response.arti}</p>
    <div class="garis"></div>
    <div class="turun">${response.tempat_turun} • ${response.jumlah_ayat} AYAT</div>
    <h2 class="header-arabic">ِبِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم</h2>
</div>`;
}

function deskOfSurah(response) {
  return `
    <div class="content-desk-surah">
        <h3>Deskripsi Surah</h3>
        <p>${response.deskripsi}</p>
    </div>`;
}
function audioSurah(response) {
  return `
<audio controls>
    <source src="${response.audio}">
</audio>`;
}

function ayat(s) {
  return `
    <div id="${s.nomor}" class="number-surah" data-verse="${s.nomor}">
        <div class="number">${s.nomor}</div>
        <div class="share">
            <svg class="media-share" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="fill-primary-700 dark:fill-primary-400" height="22" width="22" xmlns="http://www.w3.org/2000/svg"><title>Bagikan</title><path d="M752 664c-28.5 0-54.8 10-75.4 26.7L469.4 540.8a160.68 160.68 0 0 0 0-57.6l207.2-149.9C697.2 350 723.5 360 752 360c66.2 0 120-53.8 120-120s-53.8-120-120-120-120 53.8-120 120c0 11.6 1.6 22.7 4.7 33.3L439.9 415.8C410.7 377.1 364.3 352 312 352c-88.4 0-160 71.6-160 160s71.6 160 160 160c52.3 0 98.7-25.1 127.9-63.8l196.8 142.5c-3.1 10.6-4.7 21.8-4.7 33.3 0 66.2 53.8 120 120 120s120-53.8 120-120-53.8-120-120-120zm0-476c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52zM312 600c-48.5 0-88-39.5-88-88s39.5-88 88-88 88 39.5 88 88-39.5 88-88 88zm440 236c-28.7 0-52-23.3-52-52s23.3-52 52-52 52 23.3 52 52-23.3 52-52 52z"></path></svg>
            <svg class="tafsiran" data-verse="${s.nomor}" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="fill-primary-700 dark:fill-primary-400" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><title>Lihat Tafsir</title><path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path></svg>
        </div>
    </div>
    <p class="arabic">${s.ar}</p>
    <p class="teks">${s.tr}</p>
    <p class="translate">${s.idn}</p>`;
}

function tafsirOfAyat(taf, data) {
  return `
    <div class="content-tafsir-surah">
            <h3>tafsir ayat ${taf.ayat} surah ${data.namaLatin}</h3>
            <div class="body-tafsir">
                <p>${taf.teks}</p>
            </div>
        </div>`;
}
