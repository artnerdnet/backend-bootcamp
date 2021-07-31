const fs = require('fs');

module.exports = class Contenedor {
  constructor(filename) {
    this.filename = filename;
  }

  readFile = (path, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })

  writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

  async getAll() {
    const items = await this.getAll()
    .then((data) => JSON.parse(data))
    .catch(error => error)
    return items
  }

  save = async (item) => {
    const file = await this.getAll()
    .catch(async (error) => {
      if (error.code == 'ENOENT') {
        await this.writeFile(this.filename, '[]');
        const data = await this.getAll();
        return data;
      }
      return error
    })
    
    const newItem = {
      ...item,
      id: !JSON.parse(file).length ? 0 : Number(JSON.parse(file).length)+1,
    }

    const updatedItems = [...JSON.parse(file), newItem];
    
    await this.writeFile(this.filename, JSON.stringify(updatedItems)).catch(err => console.log(err));
    await this.getAll();
    
    return newItem.id;
  }
  
  async getById(id) {
    const items = await this.getAll();
    return JSON.parse(items).find(item => item.id === id);
  }



  async deleteById(id) {
    const file = await this.readFile(this.filename)
    .catch(async (error) => {
      if (error.code == 'ENOENT') {
        console.log('file not found')
      }
      throw error
    })
    
    const updatedItems = JSON.parse(file).filter(item => item.id !== id)

    await this.writeFile(this.filename, JSON.stringify(updatedItems)).catch(err => console.log(err));
    await this.readFile(this.filename).catch(err=>console.log(err));    
  }

  deleteAll() {
      try {
        fs.unlinkSync(this.filename)
        return null
      } catch(error) {
        if (error?.code === 'ENOENT') {
          console.log('file not found');
          return null
        }
        return error
      }
  };
};
