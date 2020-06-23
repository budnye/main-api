import * as Yup from 'yup';
import Client from '../models/Client';

class ClientController {
  // Retorna a lista de clientes
  async index(req, res) {
    const clients = await Client.findAll();

    return res.status(200).json(clients);
  }

  async store(req, res) {
    // Valida os dados do body request
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      birth: Yup.date()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    // Confere se já existe um cliente com o mesmo email
    const clientExist = await Client.findOne({ where: { email: req.body.email } });

    if (clientExist) {
      return res.status(400).json({ error: 'Client already exist.' });
    }

    // Salva o registro do cliente
    const { id, name, email, birth } = await Client.create(req.body);

    return res.json({
      id,
      name,
      email,
      birth,
    });
  }

  async update(req, res) {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Invalid client id.' })
    }
    // Valida os dados do body request
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      birth: Yup.date()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    // Se o e-mail foi alterado verifica se já existe um cliente usando
    const { email } = req.body;

    if (email !== client.email) {
      const clientExist = await Client.findOne({ where: { email } });

      if (clientExist) {
        return res.status(400).json({ error: 'These email is already being used.' });
      }
    }

    // Salva as alterações no cliente
    const { id, name } = await client.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(404).json({ error: 'Client not found.' })
    }

    await client.destroy().then(client => {
      if (client === 1) {
        return res.status(401).json({ error: 'Client wasnt deleted' })
      } else {
        return res.status(200).json({ message: 'The client was deleted.' });
      }
    });
  }
}

export default new ClientController();