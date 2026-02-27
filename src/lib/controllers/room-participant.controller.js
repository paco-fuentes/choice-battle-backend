import { validateCreateRoomParticipant } from '../../validators/room-participant.validator.js';

export const createRoomParticipantController = (roomParticipantService) => async (req, res) => {
  const { id, roomId, userId } = req.params;
  const method = req.method;

  if (method === 'GET' && id) {
    const result = await roomParticipantService.getParticipantById(id);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'GET' && roomId) {
    const result = await roomParticipantService.getParticipantsByRoomId(roomId);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'GET' && userId) {
    const result = await roomParticipantService.getParticipantsByUserId(userId);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'POST') {
    const validation = validateCreateRoomParticipant(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }
    const result = await roomParticipantService.addParticipant(validation.data);
    if (result.ok) {
      return res.status(201).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'DELETE' && id) {
    const result = await roomParticipantService.removeParticipant(id);
    if (result.ok) {
      return res.status(204).send();
    }
    return res.status(404).json({ error: result.error });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
