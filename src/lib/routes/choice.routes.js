import express from 'express';
import { createChoiceController } from '../controllers/choice.controller.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Choice:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único de la elección
 *         room_id:
 *           type: string
 *           format: uuid
 *           description: ID de la sala
 *         label:
 *           type: string
 *           description: Texto de la elección
 *         hits:
 *           type: integer
 *           description: Número de votos
 *         created_by:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID del usuario que creó la elección
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *     CreateChoiceRequest:
 *       type: object
 *       required:
 *         - room_id
 *         - label
 *       properties:
 *         room_id:
 *           type: string
 *           format: uuid
 *           description: ID de la sala
 *         label:
 *           type: string
 *           minLength: 1
 *           description: Texto de la elección
 *         created_by:
 *           type: string
 *           format: uuid
 *           description: ID del usuario que crea la elección (opcional)
 *     UpdateChoiceRequest:
 *       type: object
 *       properties:
 *         label:
 *           type: string
 *           minLength: 1
 *           description: Texto de la elección
 *         hits:
 *           type: number
 *           minimum: 0
 *           description: Número de votos
 */

/**
 * @swagger
 * /api/choices:
 *   post:
 *     summary: Crea una nueva elección
 *     tags: [Choices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateChoiceRequest'
 *     responses:
 *       201:
 *         description: Elección creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Choice'
 *       400:
 *         description: Error de validación
 *
 * /api/choices/room/{roomId}:
 *   get:
 *     summary: Obtiene las elecciones de una sala
 *     tags: [Choices]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala
 *     responses:
 *       200:
 *         description: Lista de elecciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Choice'
 *
 * /api/choices/{id}:
 *   get:
 *     summary: Obtiene una elección por ID
 *     tags: [Choices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la elección
 *     responses:
 *       200:
 *         description: Elección encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Choice'
 *       404:
 *         description: Elección no encontrada
 *   put:
 *     summary: Actualiza una elección
 *     tags: [Choices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la elección
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateChoiceRequest'
 *     responses:
 *       200:
 *         description: Elección actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Choice'
 *       404:
 *         description: Elección no encontrada
 *   patch:
 *     summary: Vota por una elección
 *     tags: [Choices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la elección
 *     responses:
 *       200:
 *         description: Voto registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Choice'
 *       404:
 *         description: Elección no encontrada
 *   delete:
 *     summary: Elimina una elección
 *     tags: [Choices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la elección
 *     responses:
 *       204:
 *         description: Elección eliminada
 *       404:
 *         description: Elección no encontrada
 */

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
