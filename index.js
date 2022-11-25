const express = require('express');
const app = express();
const port = 5000
const fs = require('fs')


const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const obj = []

obj[0] = {
    name: "A história",
    span: "Lorem Ipsium larium das rerum novarum et das enciclicasr epsium larium et ipsis litteris",
    date: Date.now(),
    thumbnail: "maxresdefault.jpg",
    URL: 'COMANDOTORRENTS.COM.mp4'
}

obj.push({
    name: "Chvrched",
    span: "Lorem Ipsium larium das rerum novarum et das enciclicasr epsium larium et ipsis litteris",
    date: Date.now(),
    thumbnail: "star-trek-beyond-blu-ray-deleted-scene.jpg",
    URL: '01. Introdução ao ASPNET Core.mp4'
})

app.use('/static', express.static('assets'))

app.use('/video/:id', async (req, res ) => {

    const video =  obj.filter(item => {
        console.log(item.name)
        console.log(req.params.id)
        if(item.name == req.params.id) return item
    })

    res.send({video})
})

app.get('/feed', (req, res ) => {

    res.send(obj)
})
//app.use('/teste', express.static('index.html'))
app.use('/', express.static('build') )
app.use('/login', (req, res ) =>{
    console.log(req.body)
    const erro = []
    const user = {
        name: "João das Couves",
        token: "xxxx"
    }

    if(req.body.email !== 'teste') {
        erro.push('user')
    }

    if(req.body.password !== '12345'){
        erro.push('senha')
    }

    if(erro.length > 0){
        return  res.send({erros: erro})
    }

    res.send(user)
})



app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`)
})




/**
 * 
 * 
app.use('/video/:id', (req, res ) => {

    const range = req.headers.range || 0;

    const videoPath = `${__dirname}/assets/${req.params.id}`;
    const videoSize = fs.statSync(`${__dirname}/assets/${req.params.id}`).size;
    const CHUNK_SIZE = 10 ** 6; // 1mb
    const start =  0 // Number(range.replace(/\D/g,""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contendLenghth = end - start + 1;

    const headers = {
        "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges" : "bytes",
        "Content-Length": contendLenghth,
        "Content-Type": "video/mp4",

    }

    res.header = {...headers}
    res.status(206);
    const videoStream = fs.createReadStream(videoPath, {start :  start, end : end });

    videoStream.pipe(res)

})
 * 
 * 
 * 
 */