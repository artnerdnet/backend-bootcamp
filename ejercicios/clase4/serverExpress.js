const express = require('express')
const Contenedor = require('../clase2/entregable.js')
const fs = require("fs");

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const { Router } = express; 
const router = new Router();

let nuevoContenedor;

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

(async () => {
  nuevoContenedor = new Contenedor('productos.txt');
  // await nuevoContenedor.save(productList[0])
  // await nuevoContenedor.save(productList[1])
  // await nuevoContenedor.save(productList[2])
  
})();

const PORT = 8080

const server = app.listen(PORT, () => {
	console.log(`Servidor express corriendo en port ${PORT}`)
})

router.get('/api/productos', (req, res, next) => {
  nuevoContenedor.getAll().then(data => {
    res.send(data)
  })
  .catch(error => {
    throw new Error(error)
  })
})

router.get('/api/productos/:id', (req, res, next) => {
  const { id } = req.params
  nuevoContenedor.getById(id).then(data => {
    res.send(data)
  })
  .catch(error => {
    throw new Error(error)
  })
})

router.post('/api/productos', (req, res, next) => {
  nuevoContenedor.getAll().then(data => {
    res.send(data)
  })
  .catch(error => {
    throw new Error(error)
  })
})

router.put('/api/productos/:id', (req, res, next) => {
  const { id } = req.params;
  fs.promises
      .readFile('product.txt')
      .then(data => {
        const items = JSON.parse(data);
        nuevoContenedor.updateById(id, items).then(data => {
          res.send(data)
        })
        .catch(error => {
          throw new Error(error)
        })
        
      })
    .catch((error) => {console.log(error, 'error')})
})

router.delete('/api/productos/:id', (req, res, next) => {
  nuevoContenedor.getAll().then(data => {
    res.send(data)
  })
  .catch(error => {
    throw new Error(error)
  })
})

app.use('/', router)

server.on('error', (error) => console.log(error));