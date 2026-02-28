import express from 'express';
import { createRoomController } from '../controllers/room.controller.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único de la sala
 *         code:
 *           type: string
 *           description: Código único de la sala
 *         created_by:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID del usuario que creó la sala
 *         status:
 *           type: string
 *           enum: [lobby, playing, finished]
 *           description: Estado de la sala
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *     CreateRoomRequest:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         code:
 *           type: string
 *           minLength: 3
 *           description: Código único de la sala
 *         created_by:
 *           type: string
 *           format: uuid
 *           description: ID del usuario que crea la sala (opcional)
 *         status:
 *           type: string
 *           enum: [lobby, playing, finished]
 *           description: Estado de la sala (opcional, por defecto 'lobby')
 *     UpdateRoomRequest:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           minLength: 3
 *           description: Código de la sala
 *         status:
 *           type: string
 *           enum: [lobby, playing, finished]
 *           description: Estado de la sala
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Obtiene todas las salas
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Lista de salas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *   post:
 *     summary: Crea una nueva sala
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoomRequest'
 *     responses:
 *       201:
 *         description: Sala creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Error de validación
 *
 * /api/rooms/code/{code}:
 *   get:
 *     summary: Obtiene una sala por código
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código de la sala
 *     responses:
 *       200:
 *         description: Sala encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Sala no encontrada
 *
 * /api/rooms/{id}:
 *   get:
 *     summary: Obtiene una sala por ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala
 *     responses:
 *       200:
 *         description: Sala encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Sala no encontrada
 *   put:
 *     summary: Actualiza una sala
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoomRequest'
 *     responses:
 *       200:
 *         description: Sala actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Sala no encontrada
 *   delete:
 *     summary: Elimina una sala
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala
 *     responses:
 *       204:
 *         description: Sala eliminada
 *       404:
 *         description: Sala no encontrada
 */

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
