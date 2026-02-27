import express from 'express';
import { createRoomController } from '../controllers/room.controller.js';

export const createRoomRoutes = (roomService) => {
  const router = express.Router();

  router.get('/code/:code', createRoomController(roomService));
  router.get('/:id', createRoomController(roomService));
  router.get('/', createRoomController(roomService));
  router.post('/', createRoomController(roomService));
  router.put('/:id', createRoomController(roomService));
  router.delete('/:id', createRoomController(roomService));

  return router;
};
