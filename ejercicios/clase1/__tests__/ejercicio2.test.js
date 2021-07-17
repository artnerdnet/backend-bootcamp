/* eslint-env jest */
const Usuario = require('../ejercicio2')
let nuevoUsuario;

beforeAll(() => {
  nuevoUsuario = new Usuario('Alex', 'Diaz', [], []);
});

describe('clase usuario', () => {
  test('getFullName devuelve el nombre y apellido del usuario', () => {
    const resultado = nuevoUsuario.getFullName();
    const resultadoEsperado = 'Alex Diaz';
    expect(resultado).toEqual(resultadoEsperado)
  });
  test('countMascotas devuelve la cantidad de mascotas en el array', () => {
    const resultado = nuevoUsuario.countMascotas();
    const resultadoEsperado = 0;
    expect(resultado).toEqual(resultadoEsperado)
  });
  test('addMascota agrega una mascota al array de mascotas', () => {
    nuevoUsuario.addMascota('Iguana');
    const resultado = nuevoUsuario.countMascotas();
    const resultadoEsperado = 1;
    expect(resultado).toEqual(resultadoEsperado)
  });
  test('addBook agrega un libro con autor y nombre al array de libros', () => {
    const nombre = 'Rayuela';
    const autor = 'Cortazar';

    nuevoUsuario.addBook(nombre, autor);

    const resultado = nuevoUsuario.getBookNames();

    const resultadoEsperado = [{
      nombre,
      autor
    }];

    expect(resultado).toEqual(resultadoEsperado)
  });
})