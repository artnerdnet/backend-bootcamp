module.exports = class Contador {
  constructor (nombre) {
    this.nombre = nombre
    this.cuentaIndividual = 0
  }
  static cuentaGlobal = 0

  obtenerResponsable() {
    return this.nombre;
  }

  obtenerCuentaIndividual() {
    return this.cuentaIndividual
  }

  obtenerCuentaGlobal() {
    return Contador.cuentaGlobal
  }

  contar() {
    this.cuentaIndividual++;
    Contador.cuentaGlobal++;
  }
}
