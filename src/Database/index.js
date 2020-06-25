import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Client from '../app/models/Client';
import Product from '../app/models/Product';

//Carrega os models
const models = [Client, Product];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
