const dBody = document.querySelector('.daftar-body');
function daftarSurat() {
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
                        <a href="" class="datang">${surat.nama_latin}</a>
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
    daftarSurat();
    

    
