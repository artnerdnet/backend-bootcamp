/* eslint-env jest */
const Contenedor = require('../entregable')

let nuevoContenedor;

const firstObject = {
  title: 'hat',
  price: '$19.99',
  thumbnail: 'https://www.shop.com/hat.jpg'
}
const secondObject = {
  title: 'scarf',
  price: '$9.50',
  thumbnail: 'https://www.shop.com/scarf.jpg'
}

beforeAll(() => {
  nuevoContenedor = new Contenedor('productos.txt');
});

describe.only('clase container', () => {
  test('save object to file', () => {
    const resultado = nuevoContenedor.save(firstObject);
    const resultado2 = nuevoContenedor.save(secondObject);

    expect(resultado).resolves.toBe(0);
    expect(resultado2).resolves.toBe(1);

  });
  test('get object by id', () => {
    const resultado = nuevoContenedor.getById(0);
    
    expect(resultado).resolves.toBe(firstObject);
  });
  test('get all objects', () => {
    const resultado = nuevoContenedor.getAll();
    const resultadoEsperado = [firstObject, secondObject];
    
    expect(resultado).resolves.toBe(resultadoEsperado);
  });
  test('delete object by id', () => {
    const resultado = nuevoContenedor.deleteById(1);
    const resultadoEsperado = [firstObject];
    
    expect(resultado).resolves.toBe(resultadoEsperado);
  });
  test('delete all objects', () => {
    const resultado = nuevoContenedor.deleteAll()
    const resultadoEsperado = null;

    expect(resultado).toBe(resultadoEsperado);
  });
})