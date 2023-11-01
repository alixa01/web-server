
const pesanJudul = document.querySelector('#pesan-judul')
const pesanGambar = document.querySelector('#gambar-berita')
const pesanDeskripsi = document.querySelector('#pesan-deskripsi')
document.addEventListener('DOMContentLoaded', function() {
    pesanJudul.textContent = ''
    pesanGambar.src = ''
    pesanDeskripsi.textContent = 'Sedang memuat berita ..'
    fetch('http://localhost:4000/infoberita')
        .then((response) =>{response.json()
            .then((data) => {
                if (data.error) {
                    pesanJudul.textContent = data.error
                } else {
                    pesanJudul.textContent = data.judulberita
                    pesanGambar.src = data.gambarberita
                    pesanDeskripsi.textContent = data.deskripsiberita
                }
            })
        })
})