const express = require('express')
const Contenedor = require('../clase2/entregable.js')
const fs = require("fs");
const formidable = require('formidable');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

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
  const { body, params } = req;
  // console.log(  body.id, '>>>>>req')


  var form = new formidable.IncomingForm();

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
  // 
  // console.log(  res.json(body)  , '>>>>>req')
  // res.json(req.body);
  // fs.promises
      // .readFile('product.txt')
      // .then(data => {
        // res.send(body)
        // const item = JSON.parse(data);
        // nuevoContenedor.updateById(body).then(data => {
        //   res.send(data)
        // })
      //   .catch(error => {
      //     throw new Error(error)
      //   })
        
      // })
    // .catch((error) => {console.log(error, 'error')})
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
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

app.use('/', router)

server.on('error', (error) => console.log(error));