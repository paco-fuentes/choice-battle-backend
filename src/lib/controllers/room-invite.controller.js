import { validateCreateRoomInvite, validateUpdateRoomInvite } from '../../validators/room-invite.validator.js';

export const createRoomInviteController = (roomInviteService) => async (req, res) => {
  const { id, code } = req.params;
  const method = req.method;

  if (method === 'GET' && id) {
    const result = await roomInviteService.getInviteById(id);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'GET' && code) {
    const result = await roomInviteService.getInviteByCode(code);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'GET' && req.params.roomId) {
    const result = await roomInviteService.getInvitesByRoomId(req.params.roomId);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'POST') {
    const validation = validateCreateRoomInvite(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }
    const result = await roomInviteService.createInvite(validation.data);
    if (result.ok) {
      return res.status(201).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'PUT' && id) {
    const validation = validateUpdateRoomInvite(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }
    const result = await roomInviteService.updateInvite(id, validation.data);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'DELETE' && id) {
    const result = await roomInviteService.deleteInvite(id);
    if (result.ok) {
      return res.status(204).send();
    }
    return res.status(404).json({ error: result.error });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
