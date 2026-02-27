# AGENTS.md - Guía para Agentes de IA

Este documento establece las reglas, convenciones y principios 
fundamentales que deben seguirse al desarrollar en este proyecto. Está 
diseñado para mantener la consistencia, calidad y alineación con la 
arquitectura funcional del sistema.

## 📋 Stack Tecnológico Principal

- **Backend**: Node.js + Express
- **Base de Datos**: Supabase (PostgreSQL)
- **Lenguaje**: JavaScript (estándar moderno ES6+)
- **Package Manager**: npm
- **Control de Versiones**: Git + GitHub
- **Paradigma**: Programación Funcional (inmutabilidad, funciones puras)
- **Testing**: [Framework a elegir: Jest/Vitest/Node test runner]

## 🎯 Principios Fundamentales

### 1. Inmutabilidad Estricta
- ❌ **NUNCA** mutar objetos o arrays existentes
- ✅ Siempre crear nuevas copias con los cambios necesarios
- ✅ Usar operadores spread (`...`), `Object.assign({}, ...)`, `map`, 
`filter`, `reduce`
- ✅ Para estructuras anidadas, usar técnicas de inmutable update (spread 
anidado)

```javascript
// ✅ CORRECTO
const updatedUser = { ...user, name: "Nuevo nombre" };
const newArray = [...oldArray, newItem];
const filtered = items.filter(item => item.active);
const updatedNested = { 
  ...obj, 
  address: { ...obj.address, city: "Madrid" } 
};

// ❌ INCORRECTO
user.name = "Nuevo nombre";           // Mutación directa
oldArray.push(newItem);                // Mutación de array
obj.address.city = "Madrid";           // Mutación anidada
2. Funciones Puras
Mismo input → mismo output (sin efectos secundarios)

No modificar variables externas

No realizar operaciones de I/O dentro de funciones de lógica de negocio

Las funciones con efectos secundarios deben estar claramente identificadas

3. Composición sobre Herencia
Usar composición de funciones pequeñas y reutilizables

Evitar clases y patrones OOP complejos

Preferir funciones de orden superior

📁 Estructura de Archivos
text
proyecto/
├── src/
│   ├── config/           # Configuración de la aplicación
│   ├── utils/            # Utilidades genéricas y funciones helper
│   ├── lib/
│   │   ├── database/     # Clientes y conexiones de Supabase
│   │   ├── repositories/ # Capa de acceso a datos (funciones)
│   │   ├── services/     # Lógica de negocio (funciones puras)
│   │   ├── controllers/  # Manejadores de rutas Express
│   │   ├── middleware/   # Middleware Express
│   │   └── routes/       # Definición de rutas
│   ├── validators/       # Validación de datos
│   ├── errors/           # Manejo de errores personalizados
│   └── index.js          # Punto de entrada
├── tests/
│   ├── unit/             # Tests unitarios
│   ├── integration/      # Tests de integración
│   └── fixtures/         # Datos de prueba
├── scripts/              # Scripts de utilidad
└── package.json
📝 Convenciones de Código
Nomenclatura
Elemento	Convención	Ejemplo
Archivos	kebab-case	user-service.js
Carpetas	kebab-case	database/
Variables	camelCase	userName
Funciones	camelCase	getUserById
Constantes	UPPER_SNAKE_CASE	MAX_RETRY_COUNT
Archivos de test	.test.js o .spec.js	user-service.test.js
Estructura de Funciones
javascript
/**
 * Obtiene un usuario por su ID
 * @param {Object} params - Parámetros de la función
 * @param {string} params.userId - ID del usuario
 * @param {boolean} params.includeInactive - Incluir usuarios inactivos
 * @param {Object} deps - Dependencias inyectadas
 * @returns {Promise<Object>} Resultado con el usuario o error
 */
export const getUserById = async (params, deps) => {
  const { userId, includeInactive = false } = params;
  const { db } = deps;
  
  // Lógica funcional...
  try {
    const { data, error } = await db
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      return { ok: false, error };
    }
    
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error };
  }
};
🔄 Flujo de Datos Funcional
Patrón de Composición
Validación (Validator puro)

Transformación (Mapper puro)

Lógica de Negocio (Service puro)

Persistencia (Repository con efectos)

Respuesta (Controller maneja efectos)

javascript
// Ejemplo de composición funcional
export const createUserHandler = (deps) => async (req, res) => {
  // 1. Validar
  const validationResult = validateCreateUser(req.body);
  if (!validationResult.valid) {
    return res.status(400).json({ error: validationResult.errors });
  }
  
  // 2. Transformar
  const userData = mapToUserModel(validationResult.data);
  
  // 3. Ejecutar lógica de negocio + persistencia
  const result = await createUser(userData, deps);
  
  // 4. Responder (manejo funcional)
  if (result.ok) {
    return res.status(201).json(result.data);
  } else {
    return handleError(result.error, res);
  }
};
🗄️ Supabase - Mejores Prácticas
Consultas Funcionales
javascript
// repositories/user.repository.js
export const createUserRepository = (db) => ({
  findById: async (id) => {
    const { data, error } = await db
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      return { ok: false, error, exists: false };
    }
    
    return { ok: true, data, exists: true };
  },
  
  create: async (userData) => {
    const { data, error } = await db
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) {
      return { ok: false, error };
    }
    
    return { ok: true, data };
  }
});
Patrón Result para Manejo de Errores
javascript
// utils/result.js
export const success = (data) => ({
  ok: true,
  data,
  error: null
});

export const failure = (error) => ({
  ok: false,
  data: null,
  error
});

// Uso
const result = await findUserById('123');
if (result.ok) {
  // Trabajar con result.data
} else {
  // Manejar result.error
}
🧪 Testing
Estructura de Tests
javascript
// tests/unit/user-service.test.js
import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { createUserService } from 
'../../src/lib/services/user-service.js';

describe('User Service', () => {
  let userService;
  let mockRepository;
  
  beforeEach(() => {
    // Crear mocks para las dependencias
    mockRepository = {
      findById: async (id) => {
        if (id === '123') {
          return { ok: true, data: { id: '123', name: 'Test User' } };
        }
        return { ok: false, error: 'User not found' };
      },
      create: async (data) => ({ ok: true, data: { ...data, id: '456' } })
    };
    
    userService = createUserService({ userRepository: mockRepository });
  });
  
  describe('getUserById', () => {
    it('debe retornar usuario cuando existe', async () => {
      const result = await userService.getUserById({ userId: '123' });
      
      assert.strictEqual(result.ok, true);
      assert.strictEqual(result.data.id, '123');
      assert.strictEqual(result.data.name, 'Test User');
    });
    
    it('debe retornar error cuando usuario no existe', async () => {
      const result = await userService.getUserById({ userId: '999' });
      
      assert.strictEqual(result.ok, false);
      assert.strictEqual(result.error, 'User not found');
    });
  });
  
  describe('validateEmail', () => {
    it('debe validar emails correctos (función pura)', () => {
      const result = validateEmail('test@example.com');
      assert.strictEqual(result.valid, true);
    });
    
    it('debe rechazar emails inválidos', () => {
      const result = validateEmail('invalid-email');
      assert.strictEqual(result.valid, false);
      assert.ok(result.errors.length > 0);
    });
  });
});

// tests/integration/api/users.test.js
import { describe, it, before } from 'node:test';
import request from 'supertest';
import { createApp } from '../../../src/index.js';

describe('POST /api/users', () => {
  let app;
  
  before(async () => {
    app = await createApp();
  });
  
  it('debe crear un usuario con datos válidos', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        name: 'Test User'
      })
      .expect(201);
    
    assert.strictEqual(response.body.email, 'test@example.com');
    assert.strictEqual(response.body.name, 'Test User');
    assert.ok(response.body.id);
  });
  
  it('debe rechazar datos inválidos', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'invalid-email',
        name: 'A'
      })
      .expect(400);
    
    assert.ok(response.body.error);
  });
});
Cobertura de Tests
Unitaria: Funciones puras, validadores, mappers

Integración: Repositorios con Supabase, endpoints completos

E2E: Flujos completos de usuario (opcional)

🔧 Git & GitHub
Commits (Conventional Commits)
text
feat: añadir función de validación de email
fix: corregir error en consulta de usuarios
refactor: convertir userService a funciones puras
docs: actualizar documentación de API
test: añadir tests para createUser
chore: actualizar dependencias
style: formatear código según guía
perf: optimizar consulta a Supabase
Branches
main - Producción

develop - Desarrollo

feature/* - Nuevas características (ej: feature/user-validation)

fix/* - Correcciones (ej: fix/login-error)

refactor/* - Refactorizaciones (ej: refactor/user-service)

test/* - Mejoras de testing (ej: test/add-user-tests)

Pull Requests
Template con checklist de inmutabilidad

Descripción clara de los cambios

Enlace a issues relacionadas

Tests pasando

Sin conflictos con main

🚫 Cosas que NO se permiten
❌ Mutaciones directas de objetos/arrays

❌ Clases con estado mutable

❌ Variables globales mutables

❌ Funciones con efectos secundarios ocultos

❌ var (usar const por defecto, let solo cuando es necesario)

❌ Try/catch sin manejo adecuado de errores

❌ console.log en producción (usar logger)

❌ Dependencias circulares

❌ Código sin tests (para funcionalidades críticas)

❌ Comentarios de código muerto

✅ Cosas que SI se permiten/fomentan
✅ Funciones pequeñas y enfocadas (máx 20-30 líneas)

✅ Composición de funciones

✅ Inyección de dependencias explícita

✅ Patrón Result para manejo de errores

✅ Pipeline de datos con pipe/compose

✅ JSDoc para funciones públicas

✅ Tests para todas las funcionalidades

✅ Constantes para valores mágicos

✅ Destructuring para objetos y arrays

✅ Early returns para evitar anidamiento

🛠️ Scripts de npm Recomendados
json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "node --test tests/**/*.test.js",
    "test:watch": "node --test --watch tests/**/*.test.js",
    "test:coverage": "node --test --experimental-test-coverage 
tests/**/*.test.js",
    "lint": "eslint src/",
    "format": "prettier --write \"src/**/*.js\"",
    "prepare": "husky install"
  }
}
📚 Ejemplo de Código Completo
javascript
// validators/user.validator.js
export const validateCreateUser = (input) => {
  const errors = [];
  
  if (!input.email?.includes('@')) {
    errors.push('Email debe ser válido');
  }
  
  if (!input.name || input.name.length < 2) {
    errors.push('Nombre debe tener al menos 2 caracteres');
  }
  
  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? { ...input } : null,
    errors
  };
};

// utils/helpers.js
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// services/user.service.js
export const createUserService = (dependencies) => {
  const { userRepository } = dependencies;
  
  return {
    createUser: async (userData) => {
      // Enriquecer datos (función pura)
      const userToCreate = {
        ...userData,
        id: generateUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Persistir (efecto)
      return userRepository.create(userToCreate);
    },
    
    getUserById: async (userId) => {
      return userRepository.findById(userId);
    }
  };
};

// controllers/user.controller.js
export const createUserController = (userService) => async (req, res) => {
  // Validar
  const validation = validateCreateUser(req.body);
  if (!validation.valid) {
    return res.status(400).json({ 
      error: 'Datos inválidos', 
      details: validation.errors 
    });
  }
  
  // Ejecutar servicio
  const result = await userService.createUser(validation.data);
  
  // Responder
  if (result.ok) {
    return res.status(201).json(result.data);
  } else {
    console.error('Error creating user:', result.error);
    return res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
};

// routes/user.routes.js
export const createUserRoutes = (userService) => {
  const router = express.Router();
  
  router.post('/', createUserController(userService));
  router.get('/:id', async (req, res) => {
    const result = await userService.getUserById(req.params.id);
    
    if (result.ok) {
      res.json(result.data);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  });
  
  return router;
};

// index.js - Punto de entrada
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { createUserRepository } from 
'./lib/repositories/user.repository.js';
import { createUserService } from './lib/services/user.service.js';
import { createUserRoutes } from './lib/routes/user.routes.js';

export const createApp = async () => {
  const app = express();
  
  // Middleware global
  app.use(express.json());
  
  // Inicializar dependencias
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  
  const userRepository = createUserRepository(supabase);
  const userService = createUserService({ userRepository });
  
  // Montar rutas
  app.use('/api/users', createUserRoutes(userService));
  
  // Middleware de errores
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
  
  return app;
};

// Solo si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = await createApp();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}
🤖 Instrucciones para el Agente
Cuando trabajes en este código base:

Piensa en términos de transformaciones de datos, no mutaciones

Siempre verifica que estás creando nuevas copias (spread, map, filter, 
reduce)

Mantén las funciones puras separadas de los efectos secundarios

Usa const por defecto, solo let cuando necesites reasignar

Sigue la estructura de carpetas establecida

Usa el patrón Result ({ ok, data, error }) en lugar de try/catch dispersos

Documenta las funciones públicas con JSDoc

Añade tests para toda nueva funcionalidad

Haz commits pequeños y descriptivos siguiendo conventional commits

Revisa que no haya mutaciones antes de hacer commit

Checklist antes de commit
¿Hay alguna mutación directa?

¿Las funciones son lo más puras posible?

¿Los efectos secundarios están claramente identificados?

¿Los tests pasan?

¿El código sigue las convenciones de nomenclatura?

¿Se han añadido tests para nuevas funcionalidades?

¿El mensaje de commit sigue conventional commits?

Nota: Este documento es vivo. Si encuentras una mejor manera funcional de 
hacer algo o necesitas añadir nuevas convenciones, actualiza este archivo 
y comunícalo al equipo.
