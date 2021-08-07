const express = require('express')
const Contenedor = require('../clase2/entregable.js')

const app = express()
const productList = [
  {
    "title": "hat",
    "price": "$19.99",
    "thumbnail": "https://www.shop.com/hat.jpg"
  },
  {
    "title": "scarf",
    "price": "$9.50",
    "thumbnail": "https://www.shop.com/scarf.jpg"
  },
  {
    "title": "socks",
    "price": "$3.50",
    "thumbnail": "https://www.shop.com/socks.jpg"
  }
];

const nuevoContenedor = new Contenedor('productos.txt');
(async () => {
  await nuevoContenedor.save(productList[0])
  await nuevoContenedor.save(productList[1])
  await nuevoContenedor.save(productList[2])
})();

const PORT = 3001

const server = app.listen(PORT, () => {
	console.log(`Servidor express corriendo en port ${PORT}`)
})

app.get('/productos', (req, res, next) => {
  nuevoContenedor.getAll().then(data => {
    res.send(data)
  })
  .catch(error => {
    throw new Error(error)
  })
})

app.get('/productoRandom', (req, res, next) => {
  nuevoContenedor.getAll().then(data => {
    const randomNumber = Math.floor(Math.random() * data.length) + 1
    const randomProduct = data[randomNumber];
    res.send(randomProduct)
  })
  .catch(error => {
    throw new Error(error)
  })
})

server.on('error', (error) => console.log(error));