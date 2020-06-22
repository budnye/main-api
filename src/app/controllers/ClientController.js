import * as Yup from 'yup';
import Client from '../models/Client';

class ClientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      birth: Yup.date()
        .required(),
    });
    const { id, name, email, birth } = await Client.create(req.body);

    return res.json({
      id,
      name,
      email,
      birth,
    });
  }

  index(req, res) {
    res.status(200).json({ message: 'Controller Works!' });
  }

}

export default new ClientController();