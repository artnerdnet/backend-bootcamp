module.exports = class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`
  };

  addMascota(mascota) {
    this.mascotas = [mascota, ...this.mascotas]
  };

  countMascotas() {
    return this.mascotas.length
  };

  addBook(nombre, autor) {
    const libro = {
      nombre,
      autor
    };
    this.libros = [libro, ...this.libros];
  };

  getBookNames() {
    return this.libros;
  };
}