import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Client from '../app/models/Client';

const models = [Client];

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
