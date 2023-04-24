
const dBody = document.querySelector('.daftar-body');
// console.log(dBody);
// console.log(tBody);
fetch('https://equran.id/api/surat')
.then(response => response.json())
.then(response => {
    // console.log(response)
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

        // const dKonten = document.querySelector('.daftar-content');
        // dKonten.addEventListener('click', () => {
        //     window.location.href = 'surat.html';
        // });


        const searchInput = document.querySelector('.searchInput');
        console.log(searchInput);
        const rows = document.querySelectorAll(".daftar-content");
        // console.log(rows);
        
        searchInput.addEventListener("keyup", function (event) {
            const q = event.target.value.toLowerCase();
            rows.forEach(row => {
                row.querySelector(".datang").textContent.toLowerCase().startsWith(q)
                ? (row.style.display = "")
                : (row.style.display = "none");
            });
        });
    });
    
    //     cardSurat += `<tr>
    //     <td>${surat.nomor}</td>
    //     <td class="datang" onclick="location.href='surat.html?nomorsurat=${surat.nomor}' " >${surat.nama_latin} (<span>${surat.nama}</span>)</td>
    //     <td class="arti">${surat.arti}</td>
    //     <td class="ayat">${surat.jumlah_ayat}</td>
    //     <td class="temtur">${surat.tempat_turun}</td>
    // </tr>`

    
    
    
    
    