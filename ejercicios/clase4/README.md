# Clase 3

Para correr este ejercicio, hacer en la raiz: 
`yarn express`

## Endpoints: 

[GET]`http://localhost:3001/productos`

Devuelve un array de objetos:

```
[
    {
        "title": "hat",
        "price": "$19.99",
        "thumbnail": "https://www.shop.com/hat.jpg",
        "id": 0
    },
    {
        "title": "scarf",
        "price": "$9.50",
        "thumbnail": "https://www.shop.com/scarf.jpg",
        "id": 1
    },
    {
        "title": "socks",
        "price": "$3.50",
        "thumbnail": "https://www.shop.com/socks.jpg",
        "id": 2
    }
]
```

[GET]`http://localhost:3001/productoRandom`

Devuelve un producto random de la lista:

```
{
  "title": "socks",
  "price": "$3.50",
  "thumbnail": "https://www.shop.com/socks.jpg",
  "id": 2
}
```