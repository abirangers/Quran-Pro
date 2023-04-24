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
// console.log(nomorsurat);

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
