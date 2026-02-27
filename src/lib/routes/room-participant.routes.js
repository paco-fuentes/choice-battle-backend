import express from 'express';
import { createRoomParticipantController } from '../controllers/room-participant.controller.js';

export const createRoomParticipantRoutes = (roomParticipantService) => {
  const router = express.Router();

  router.get('/user/:userId', createRoomParticipantController(roomParticipantService));
  router.get('/room/:roomId', createRoomParticipantController(roomParticipantService));
  router.get('/:id', createRoomParticipantController(roomParticipantService));
  router.post('/', createRoomParticipantController(roomParticipantService));
  router.delete('/:id', createRoomParticipantController(roomParticipantService));

  return router;
};
