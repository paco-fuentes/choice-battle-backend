import { validateCreateRoom, validateUpdateRoom } from '../../validators/room.validator.js';

export const createRoomController = (roomService) => async (req, res) => {
  const { id, code } = req.params;
  const method = req.method;

  if (method === 'GET' && id) {
    const result = await roomService.getRoomById(id);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'GET' && code) {
    const result = await roomService.getRoomByCode(code);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'GET') {
    const result = await roomService.getAllRooms();
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'POST') {
    const validation = validateCreateRoom(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }
    const result = await roomService.createRoom(validation.data);
    if (result.ok) {
      return res.status(201).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'PUT' && id) {
    const validation = validateUpdateRoom(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }
    const result = await roomService.updateRoom(id, validation.data);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'DELETE' && id) {
    const result = await roomService.deleteRoom(id);
    if (result.ok) {
      return res.status(204).send();
    }
    return res.status(404).json({ error: result.error });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
