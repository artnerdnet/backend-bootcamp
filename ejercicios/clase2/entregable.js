module.exports = class Contenedor {
  static totalItems = 0;
  static itemContainer = [];

  save(item) {
    Contenedor.itemContainer = [...Contenedor.itemContainer, item]
    this.id = !Contenedor.totalItems.length ? 0 : Contenedor.totalItems.length++;

    return this.id;
  }

  getById(id) {
    return Contenedor.itemContainer[id] ? Contenedor.itemContainer[id] : null
  }

  getAll() {
    return Contenedor.itemContainer
  }

  deleteById(id) {
    return Contenedor.itemContainer = Contenedor.itemContainer.filter(item => item !== Contenedor.itemContainer[id])
  }

  deleteAll() {
    Contenedor.itemContainer.length = 0;
  }
}
