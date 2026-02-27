import express from 'express';
import { createUserController } from '../controllers/user.controller.js';

export const createUserRoutes = (userService) => {
  const router = express.Router();

  router.get('/:id', createUserController(userService));
  router.get('/', createUserController(userService));
  router.post('/', createUserController(userService));
  router.put('/:id', createUserController(userService));
  router.delete('/:id', createUserController(userService));

  return router;
};
