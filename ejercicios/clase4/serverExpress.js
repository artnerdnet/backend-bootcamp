const express = require('express')
const Contenedor = require('../clase2/entregable.js')
const fs = require("fs");
const formidable = require('formidable');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use('/views/', express.static('views'));

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
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    console.log(fields);
    if (err) {
      next(err);
      return;
    }

    nuevoContenedor.updateById(fields).then(data => {
      res.send(data)
    })
  });
})

router.delete('/api/productos/:id', (req, res, next) => {
  nuevoContenedor.getAll().then(data => {
    res.send(data)
  })
  .catch(error => {
    throw new Error(error)
  })
})

app.get('/', function(req, res) {
  const show_modal = !!req.body.modal; // Cast to boolean

  nuevoContenedor.getAll().then(data => {
    res.render('pages/index', {
      products: data,
      show_modal,
      selectedProduct: null,
      appState: [{selectedProduct: null}]
    });
  })
});

// app.use(express.static(__dirname + '/public'));


app.use('/', router)

server.on('error', (error) => console.log(error));