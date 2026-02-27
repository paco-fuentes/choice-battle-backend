import express from 'express';
import { createRoomInviteController } from '../controllers/room-invite.controller.js';

export const createRoomInviteRoutes = (roomInviteService) => {
  const router = express.Router();

  router.get('/code/:code', createRoomInviteController(roomInviteService));
  router.get('/room/:roomId', createRoomInviteController(roomInviteService));
  router.get('/:id', createRoomInviteController(roomInviteService));
  router.post('/', createRoomInviteController(roomInviteService));
  router.put('/:id', createRoomInviteController(roomInviteService));
  router.delete('/:id', createRoomInviteController(roomInviteService));

  return router;
};
