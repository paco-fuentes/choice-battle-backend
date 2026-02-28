import express from 'express';
import { createRoomInviteController } from '../controllers/room-invite.controller.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     RoomInvite:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único de la invitación
 *         room_id:
 *           type: string
 *           format: uuid
 *           description: ID de la sala
 *         code:
 *           type: string
 *           description: Código de invitación único
 *         max_uses:
 *           type: integer
 *           description: Número máximo de usos
 *         uses:
 *           type: integer
 *           description: Número de usos actuales
 *         assigned_user_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID del usuario asignado (opcional)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *     CreateRoomInviteRequest:
 *       type: object
 *       required:
 *         - room_id
 *         - code
 *       properties:
 *         room_id:
 *           type: string
 *           format: uuid
 *           description: ID de la sala
 *         code:
 *           type: string
 *           description: Código de invitación único
 *         max_uses:
 *           type: integer
 *           description: Número máximo de usos (opcional, por defecto 3)
 *         assigned_user_id:
 *           type: string
 *           format: uuid
 *           description: ID del usuario asignado (opcional)
 *     UpdateRoomInviteRequest:
 *       type: object
 *       properties:
 *         max_uses:
 *           type: number
 *           description: Número máximo de usos
 *         uses:
 *           type: number
 *           description: Número de usos actuales
 */

/**
 * @swagger
 * /api/room-invites:
 *   post:
 *     summary: Crea una invitación a una sala
 *     tags: [RoomInvites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoomInviteRequest'
 *     responses:
 *       201:
 *         description: Invitación creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomInvite'
 *       400:
 *         description: Error de validación
 *
 * /api/room-invites/room/{roomId}:
 *   get:
 *     summary: Obtiene las invitaciones de una sala
 *     tags: [RoomInvites]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala
 *     responses:
 *       200:
 *         description: Lista de invitaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomInvite'
 *
 * /api/room-invites/code/{code}:
 *   get:
 *     summary: Obtiene una invitación por código
 *     tags: [RoomInvites]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código de invitación
 *     responses:
 *       200:
 *         description: Invitación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomInvite'
 *       404:
 *         description: Invitación no encontrada
 *
 * /api/room-invites/{id}:
 *   get:
 *     summary: Obtiene una invitación por ID
 *     tags: [RoomInvites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la invitación
 *     responses:
 *       200:
 *         description: Invitación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomInvite'
 *       404:
 *         description: Invitación no encontrada
 *   put:
 *     summary: Actualiza una invitación
 *     tags: [RoomInvites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la invitación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoomInviteRequest'
 *     responses:
 *       200:
 *         description: Invitación actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomInvite'
 *       404:
 *         description: Invitación no encontrada
 *   delete:
 *     summary: Elimina una invitación
 *     tags: [RoomInvites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la invitación
 *     responses:
 *       204:
 *         description: Invitación eliminada
 *       404:
 *         description: Invitación no encontrada
 */

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
