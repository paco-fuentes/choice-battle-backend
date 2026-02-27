import express from 'express';
import { createChoiceController } from '../controllers/choice.controller.js';

export const createChoiceRoutes = (choiceService) => {
  const router = express.Router();

  router.get('/room/:roomId', createChoiceController(choiceService));
  router.get('/:id', createChoiceController(choiceService));
  router.post('/', createChoiceController(choiceService));
  router.put('/:id', createChoiceController(choiceService));
  router.patch('/:id/vote', createChoiceController(choiceService));
  router.delete('/:id', createChoiceController(choiceService));

  return router;
};
