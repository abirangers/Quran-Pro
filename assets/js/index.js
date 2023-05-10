export function navButton() {
    const btn = document.querySelector('button');
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

const dBody = document.querySelector('.daftar-body');
export function daftarSurat() {
    fetch('https://equran.id/api/surat')
    .then(response => response.json())
    .then(response => {
        let cardSurat = '';
            response.forEach(surat => {
                cardSurat += `
            <div class="daftar-content" onclick="location.href='surat.html?nomorsurat=${surat.nomor}' " >
                <div class="daftar-kiri">
                    <span><b>${surat.nomor}</b></span>
                    <div class="bawah">
                        <a href="#" class="datang">${surat.nama_latin}</a>
                        <p>(${surat.arti})</p>
                    </div>
                </div>
                <div class="daftar-kanan">
                    <p>${surat.nama}<br>${surat.jumlah_ayat} Ayat</p>
                </div>
            </div>`
            });
            dBody.innerHTML = cardSurat;
    
            const searchInput = document.querySelector('.searchInput');
            console.log(searchInput);
            const rows = document.querySelectorAll(".daftar-content");

            
            searchInput.addEventListener("keyup", function (event) {
                const q = event.target.value.toLowerCase();
                rows.forEach(row => {
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
        const urlVariable = pageURL.split('&');
    
        for(let i = 0; i < urlVariable.length; i++) {
            const parameterName = urlVariable[i].split('=');
            if(parameterName[0] == e) {
                return parameterName[1];
            }
        }
    }
    
    const nomorSurat = getURL('nomorsurat');
    
    
    function getSurat() {
        fetch(`https://equran.id/api/surat/${nomorSurat}`)
          .then((response) => response.json())
          .then(response => {
    
            // judul surat
            const contSurat = document.querySelector('.judul-surat');
            const suratApa = `<h3>Surah ${response.nama_latin}</h3>`;
            contSurat.innerHTML = suratApa;
    
    
            // isi surat
            const surat = response.ayat;
            let isiSurat = '';
            const containerSurat = document.querySelector('.container-surat .content-surat');
            surat.forEach(s => {
                isiSurat += `
                <p class="arabic">${s.ar}</p>
                <p class="teks">[${s.nomor}]${s.idn}</p>
                <hr>`
            });
            containerSurat.innerHTML = isiSurat;
        });
      }
      
    getSurat();
    
}



