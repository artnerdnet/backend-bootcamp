/* eslint-env jest */
const Contador = require('../clases')
let carlosContador;
let vivianaContador;

beforeAll(() => {
  carlosContador = new Contador('Carlos');
  vivianaContador = new Contador('Viviana');
});

describe('clase Contador', () => {
  test('cada instancia se identifica con el nombre de la persona', () => {
    const resultado = carlosContador.obtenerResponsable();
    const resultadoEsperado = 'Carlos';

    expect(resultado).toEqual(resultadoEsperado)
  })
  test('cada instancia inicia su cuenta individual en cero', () => {
    const resultado = carlosContador.obtenerCuentaIndividual();
    const resultadoEsperado = 0;

    expect(resultado).toEqual(resultadoEsperado)
  })
  test('cuentaGlobal inicia en cero', () => {
    const resultado = carlosContador.obtenerCuentaGlobal();
    const resultadoEsperado = 0;

    expect(resultado).toEqual(resultadoEsperado)
  })
  test('obtenerCuentaIndividual devuelve cantidad contada en la instancia', () => {
    carlosContador.contar();

    const resultado = carlosContador.obtenerCuentaIndividual();
    const resultadoEsperado = 1;
    const resultadoSegundaInstancia = vivianaContador.obtenerCuentaIndividual();
    const resultadoEsperadoSegundaInstancia = 0;

    expect(resultado).toEqual(resultadoEsperado);
    expect(resultadoSegundaInstancia).toEqual(resultadoEsperadoSegundaInstancia);
  })
  test('obtenerCuentaGlobal devuelve cantidad contada en todas las instancias', () => {
    const valorInicial = vivianaContador.obtenerCuentaIndividual();
    vivianaContador.contar();
    const valorFinal = valorInicial + 1;
    const resultado = 1;

    expect(valorFinal).toEqual(resultado)
  })
  test('obtenerCuentaGlobal devuelve cantidad contada en todas las instancias', () => {
    vivianaContador.contar();
    const totalCarlosContador = carlosContador.obtenerCuentaIndividual();
    const totalVivianaContador = vivianaContador.obtenerCuentaIndividual();
    const resultado = carlosContador.obtenerCuentaGlobal();
    const resultadoEsperado = totalCarlosContador + totalVivianaContador;

    expect(resultado).toEqual(resultadoEsperado)
  })

})