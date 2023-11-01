const express = require('express')
const app = express()

const geocode = require('./utlis/geocode')
const forecast = require('./utlis/prediksiCuaca')
const mediastack = require('./utlis/berita')

//ini halaman/page utama
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Alixa Arivya Tofer'
    })
})

//ini halaman bantuan/FAQ (Frequently Asked Questions)
app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        teksBantuan : 'ini adalah teks bantuan',
        nama: 'Alixa Arivya Tofer'
    })
})

//ini halaman infoCuaca
app.get('/infoCuaca', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Kamu harus memasukan lokasi yang ingin dicari'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error){
                return res.send({error})
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            })
        })
    })
})

app.get('/berita', (req, res) => {
    res.render('berita', {
        judul: 'Berita',
        nama: 'Alixa Arivya Tofer'
    })
})
//ini halaman berita
app.get('/infoBerita', (req, res) => {
    mediastack((error, {title, image, description}) => {
        if (error){
            return res.send({error})
        }else {
            res.send({
                judulberita: title,
                gambarberita: image,
                deskripsiberita: description
            })
        }
    })
})

//ini halaman tentang
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Alixa Arivya Tofer'
    })
})



const path = require('path')
const  hbs = require('hbs')
const port = process.env.PORT || 3000
// app.use(express.static(dirPublic))

// Mendefinisikan jalur/path untuk konfigurasi Express
const dirPublic = path.join(__dirname, '../public')
const dirViews = path.join(__dirname, '../templates/views')
const dirPartials = path.join(__dirname, '../templates/partials')

// Setup handlebears engine dan lokasi folder views
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)

// Setup direktori statis
app.use(express.static(dirPublic))


app.get('/bantuan/*', (req, res) => {
    res.render('404', {
        judul : '404',
        nama : 'Alixa Arivya Tofer',
        pesanKesalahan : 'Artikel yang dicari tidak ditemukan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        judul : '404',
        nama : 'Alixa Arivya Tofer',
        pesanKesalahan : 'Halaman yang dicari tidak ditemukan'
    })
})


app.listen(port, () => {
    console.log('Server berjalan pada port ' + port)
})
