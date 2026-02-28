import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { supabase } from './lib/database/supabase.js';

import { createUserRepository } from './lib/repositories/user.repository.js';
import { createRoomRepository } from './lib/repositories/room.repository.js';
import { createRoomParticipantRepository } from './lib/repositories/room-participant.repository.js';
import { createRoomInviteRepository } from './lib/repositories/room-invite.repository.js';
import { createChoiceRepository } from './lib/repositories/choice.repository.js';

import { createUserService } from './lib/services/user.service.js';
import { createRoomService } from './lib/services/room.service.js';
import { createRoomParticipantService } from './lib/services/room-participant.service.js';
import { createRoomInviteService } from './lib/services/room-invite.service.js';
import { createChoiceService } from './lib/services/choice.service.js';

import { createUserRoutes } from './lib/routes/user.routes.js';
import { createRoomRoutes } from './lib/routes/room.routes.js';
import { createRoomParticipantRoutes } from './lib/routes/room-participant.routes.js';
import { createRoomInviteRoutes } from './lib/routes/room-invite.routes.js';
import { createChoiceRoutes } from './lib/routes/choice.routes.js';

export const createApp = () => {
  const app = express();

  app.use(express.json());

  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Choice Battle API',
        version: '1.0.0',
        description: 'API para la aplicación Choice Battle',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor local',
        },
      ],
    },
    apis: ['./src/lib/routes/*.js'],
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      urls: [
        {
          url: '/api-docs.json',
          name: 'Choice Battle API'
        }
      ]
    }
  }));
  app.get('/api-docs.json', (req, res) => {
    res.json(swaggerSpec);
  });

  const userRepository = createUserRepository(supabase);
  const roomRepository = createRoomRepository(supabase);
  const roomParticipantRepository = createRoomParticipantRepository(supabase);
  const roomInviteRepository = createRoomInviteRepository(supabase);
  const choiceRepository = createChoiceRepository(supabase);

  const userService = createUserService({ userRepository });
  const roomService = createRoomService({ roomRepository });
  const roomParticipantService = createRoomParticipantService({ roomParticipantRepository });
  const roomInviteService = createRoomInviteService({ roomInviteRepository });
  const choiceService = createChoiceService({ choiceRepository });

  app.use('/api/users', createUserRoutes(userService));
  app.use('/api/rooms', createRoomRoutes(roomService));
  app.use('/api/room-participants', createRoomParticipantRoutes(roomParticipantService));
  app.use('/api/room-invites', createRoomInviteRoutes(roomInviteService));
  app.use('/api/choices', createChoiceRoutes(choiceService));

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createApp();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
