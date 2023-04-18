// const http = require('http')
// //import http from 'http'
// const PORT = 3000

// const requestListener= (req,res) => {
//     console.log(req);
// }
// const server = http.createServer(requestListener)


// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })

const express = require('express');
const app = express()
const fs = require('fs');
const fsPromise= require('fs/promises')
const path = require('path');

const PORT = 3000

// app.use(express.static(__dirname + '/public'))

const jsonFile = path.resolve(__dirname, '../data/users.json')

console.log(jsonFile);

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/index.html')
    fs.readFile('./data/users.json', (err, data)=> {
        if (err) throw err;

        const jsonData = JSON.parse(data)

        res.send(jsonData);
    })
})

app.get('/', async (req, res) => {
    try{
        const data = await fsPromise.readFile(jsonFile)

        const jsonData = await JSON.parse(data)

        res.send(jsonData)
    } catch (err) {

        res.status(500).send('Error al leer el archivo')
    }
})

app.get('/write', (req, res) => {

    fs.readFile('./data/users.json', (err, data)=> {
        if (err) throw err;

        const jsonData = JSON.parse(data)

        const newInfo = {...jsonData, number: 34}

        fs.writeFile(jsonFile, JSON.stringify(newInfo), err => {
            if(err) return res.status(500).send('Error al guardar el archivo')
    
            res.end()
        })

        res.send(jsonData);
    })

    

   
})

// app.get('/about', (req, res) => {
//     res.sendFile(__dirname + '/public/about.html')
// })

// app.get('/contact', (req, res) => {
//     res.sendFile(__dirname + '/public/contact.html')
// })

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});