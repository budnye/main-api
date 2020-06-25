import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
  // Retorna a lista de produtos
  async index(req, res) {
    const products = await Product.findAll();

    return res.status(200).json(products);
  }

  async store(req, res) {
    // Valida os dados do body request
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      infor: Yup.string()
        .email(),
      price: Yup.number()
        .required(),
      qnt: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    // Salva o registro do produto
    const { name, info, price, qnt } = await Product.create(req.body);

    return res.status(201).json({
      name,
      info,
      price,
      qnt,
    });
  }

  async update(req, res) {
    // Busca o produto através do id
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Invalid product id.' });
    }

    // Valida os dados do body request
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      infor: Yup.string()
        .email(),
      price: Yup.number()
        .required(),
      qnt: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    // Salva as alterações no produto
    const { name, info, price, qnt } = await product.update(req.body);

    return res.status(200).json({
      name,
      info,
      price,
      qnt
    });
  }

  async delete(req, res) {
    // Busca o produto através do id
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Invalid product id.' });
    }

    await product.destroy().then(product => {
      if (product === 1) {
        return res.status(401).json({ error: 'Product wasnt deleted' });
      } else {
        return res.status(200).json({ message: 'The product was deleted.' });
      }
    });
  }
}


export default new ProductController();
