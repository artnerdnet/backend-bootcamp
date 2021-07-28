/* eslint-env jest */
const Contenedor = require('../entregable')
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
let nuevoContenedor;

beforeAll(() => {
  nuevoContenedor = new Contenedor();
});

describe('clase container', () => {
  test('save object', () => {
    
    const resultado = nuevoContenedor.save(firstObject);
    const resultadoEsperado = { objectId: 0 }

    expect(resultado).toEqual(resultadoEsperado.objectId)
  });
  test('get object by id', () => {
    const objectId = 0;
    const resultado = nuevoContenedor.getById(objectId);
    const resultadoEsperado = {
      title: 'hat',
      price: '$19.99',
      thumbnail: 'https://www.shop.com/hat.jpg'
    }
    expect(resultado).toEqual(resultadoEsperado)
  });
  test('get all objects', () => {
    nuevoContenedor.save(secondObject);
    const resultado = nuevoContenedor.getAll()
    const resultadoEsperado = [firstObject, secondObject]

    expect(resultado).toEqual(resultadoEsperado)
  });
  test('delete object by id', () => {
    nuevoContenedor.deleteById(1);
    const resultado = nuevoContenedor.getAll();
    const resultadoEsperado = [firstObject];

    expect(resultado).toEqual(resultadoEsperado);
  });
  test('delete all objects', () => {
    nuevoContenedor.deleteAll();
    const resultado = nuevoContenedor.getAll();
    const resultadoEsperado = [];

    expect(resultado).toEqual(resultadoEsperado)
  });
})