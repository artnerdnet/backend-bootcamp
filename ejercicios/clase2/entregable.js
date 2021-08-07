const fs = require("fs");

module.exports = class Contenedor {
  constructor(filename) {
    this.filename = filename;
  }

  readFile = (path, opts = "utf8") =>
    new Promise((resolve, reject) => {
      fs.readFile(path, opts, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

  writeFile = (path, data, opts = "utf8") => {
    fs.writeFile(path, data, (opts = "utf8"), function (err) {
      if (err) {
        return console.log(err);
      }
      return data;
    });
  };

  async getAll() {
    const items = await fs.promises
      .readFile(this.filename)
      .then((data) => JSON.parse(data))
      .catch((error) => {
        throw new Error(error);
      });
    return items;
  }

  save = async (item) => {
    let file = await this.getAll()
      .then((data) => data)
      .catch((error) => {
        if (error.message.includes("ENOENT")) {
          fs.writeFile(this.filename, "[]", function (error, data) {
            if (error) {
              throw new Error(error);
            }
            return data;
          });
        }
      });

    file = await this.getAll();

    const newItem = {
      ...item,
      id: !file.length ? 0 : Number(file.length),
    };

    const updatedItems = [...file, newItem];

    fs.writeFile(
      this.filename,
      JSON.stringify(updatedItems),
      function (err, data) {
        if (err) {
          throw new Error(err);
        }
        return data;
      }
    );

    return newItem.id
  };

  async getById(id) {
    const items = await this.getAll();
    return JSON.parse(items).find((item) => item.id === id);
  }

  async deleteById(id) {
    const file = await this.readFile(this.filename).catch(async (error) => {
      if (error.code == "ENOENT") {
        console.log("file not found");
      }
      throw error;
    });

    const updatedItems = JSON.parse(file).filter((item) => item.id !== id);

    await this.writeFile(this.filename, JSON.stringify(updatedItems)).catch(
      (err) => console.log(err)
    );
    await this.readFile(this.filename).catch((err) => console.log(err));
  }

  deleteAll() {
    try {
      fs.unlinkSync(this.filename);
      return null;
    } catch (error) {
      if (error?.code === "ENOENT") {
        console.log("file not found");
        return null;
      }
      return error;
    }
  }
};
