import { validateCreateChoice, validateUpdateChoice } from '../../validators/choice.validator.js';

export const createChoiceController = (choiceService) => async (req, res) => {
  const { id, roomId } = req.params;
  const method = req.method;

  if (method === 'GET' && id) {
    const result = await choiceService.getChoiceById(id);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'GET' && roomId) {
    const result = await choiceService.getChoicesByRoomId(roomId);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'POST') {
    const validation = validateCreateChoice(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }
    const result = await choiceService.createChoice(validation.data);
    if (result.ok) {
      return res.status(201).json(result.data);
    }
    return res.status(500).json({ error: result.error });
  }

  if (method === 'PUT' && id) {
    const validation = validateUpdateChoice(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }
    const result = await choiceService.updateChoice(id, validation.data);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'PATCH' && id) {
    const result = await choiceService.voteForChoice(id);
    if (result.ok) {
      return res.status(200).json(result.data);
    }
    return res.status(404).json({ error: result.error });
  }

  if (method === 'DELETE' && id) {
    const result = await choiceService.deleteChoice(id);
    if (result.ok) {
      return res.status(204).send();
    }
    return res.status(404).json({ error: result.error });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
