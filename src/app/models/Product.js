import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        info: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        qnt: Sequelize.INTEGER,
      },
      {
        sequelize
      }
    );

    return this
  }
}

export default Product;