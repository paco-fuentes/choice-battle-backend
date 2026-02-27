import { validateCreateUser, validateUpdateUser } from '../../validators/user.validator.js';

export const createUserController = (userService) => async (req, res) => {
  const { id } = req.params;
  const method = req.method;

  if (method === 'GET' && id) {
    const result = await userService.getUserById(id);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'GET') {
    const result = await userService.getAllUsers();
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'POST') {
    const validation = validateCreateUser(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }
    const result = await userService.createUser(validation.data);
    if (result.ok) {
      return res.status(201).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'PUT' && id) {
    const validation = validateUpdateUser(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }
    const result = await userService.updateUser(id, validation.data);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'DELETE' && id) {
    const result = await userService.deleteUser(id);
    if (result.ok) {
      return res.status(204).send();
    }
    return res.status(404).json({ error: result.error });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
