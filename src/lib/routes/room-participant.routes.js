import express from 'express';
import { createRoomParticipantController } from '../controllers/room-participant.controller.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     RoomParticipant:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único del participante
 *         room_id:
 *           type: string
 *           format: uuid
 *           description: ID de la sala
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID del usuario
 *         joined_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de unión a la sala
 *     CreateRoomParticipantRequest:
 *       type: object
 *       required:
 *         - room_id
 *         - user_id
 *       properties:
 *         room_id:
 *           type: string
 *           format: uuid
 *           description: ID de la sala
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID del usuario
 */

/**
 * @swagger
 * /api/room-participants:
 *   post:
 *     summary: Añade un participante a una sala
 *     tags: [RoomParticipants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoomParticipantRequest'
 *     responses:
 *       201:
 *         description: Participante añadido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomParticipant'
 *       400:
 *         description: Error de validación
 *
 * /api/room-participants/room/{roomId}:
 *   get:
 *     summary: Obtiene los participantes de una sala
 *     tags: [RoomParticipants]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala
 *     responses:
 *       200:
 *         description: Lista de participantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomParticipant'
 *
 * /api/room-participants/user/{userId}:
 *   get:
 *     summary: Obtiene las salas de un usuario
 *     tags: [RoomParticipants]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de salas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomParticipant'
 *
 * /api/room-participants/{id}:
 *   get:
 *     summary: Obtiene un participante por ID
 *     tags: [RoomParticipants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del participante
 *     responses:
 *       200:
 *         description: Participante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomParticipant'
 *       404:
 *         description: Participante no encontrado
 *   delete:
 *     summary: Elimina un participante de una sala
 *     tags: [RoomParticipants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del participante
 *     responses:
 *       204:
 *         description: Participante eliminado
 *       404:
 *         description: Participante no encontrado
 */

export const createRoomParticipantRoutes = (roomParticipantService) => {
  const router = express.Router();

  router.get('/user/:userId', createRoomParticipantController(roomParticipantService));
  router.get('/room/:roomId', createRoomParticipantController(roomParticipantService));
  router.get('/:id', createRoomParticipantController(roomParticipantService));
  router.post('/', createRoomParticipantController(roomParticipantService));
  router.delete('/:id', createRoomParticipantController(roomParticipantService));

  return router;
};
