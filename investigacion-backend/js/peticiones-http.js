// ============================================================
//  📘 INVESTIGACIÓN #8 — CÓDIGOS DE ESTADO HTTP
//  ¿Qué son, para qué sirven y cuáles son?
// ============================================================
//
//  Recursos oficiales de estudio:
//  ─────────────────────────────────────────────────────────
//  📖 MDN Web Docs (más completo, en español):
//     https://developer.mozilla.org/es/docs/Web/HTTP/Status
//
//  📖 httpstatuses.io (visual e interactivo):
//     https://httpstatuses.io
//
//  😸 HTTP Cats (aprende con humor, cada código tiene un gato):
//     https://http.cat
//
//  🐶 HTTP Dogs (igual pero con perros):
//     https://httpstatusdogs.com
//
//  📜 RFC 9110 (el estándar oficial del protocolo, muy técnico):
//     https://www.rfc-editor.org/rfc/rfc9110
//
//  🧪 Postman Learning Center:
//     https://learning.postman.com/docs/sending-requests/response-data/
//
// ============================================================
//
//  ¿QUÉ SON LOS CÓDIGOS DE ESTADO HTTP?
//  ======================================
//  Cuando un cliente (navegador, app, Postman, fetch()) hace una
//  petición a un servidor, el servidor SIEMPRE responde con:
//
//    1. Un CÓDIGO DE ESTADO  →  número de 3 dígitos
//    2. Un MENSAJE           →  texto corto que lo describe
//    3. Un CUERPO (body)     →  los datos reales (JSON, HTML, etc.)
//
//  El código de estado le dice al cliente SI la petición funcionó,
//  y si no funcionó, POR QUÉ falló.
//
//  ANALOGÍA:
//  ─────────
//  Es como cuando llamas a un restaurante a pedir comida:
//  - 200 → "Sí señor, en 30 minutos llega su pedido."
//  - 400 → "Disculpe, ¿me repite? No entendí qué pidió."
//  - 401 → "¿Me da su nombre? No lo tengo registrado."
//  - 403 → "Lo conozco, pero esa sección del menú es solo para VIP."
//  - 404 → "Ese plato no existe en nuestra carta."
//  - 500 → "Perdone, se nos cayó la cocina. Error nuestro."
//
//  Ejemplo real con fetch():
//
//    fetch('https://api.ejemplo.com/usuarios/99')
//      .then(res => {
//        console.log(res.status); // 404 → el usuario no existe
//      });
//
//  ─────────────────────────────────────────────────────────
//  LAS 5 FAMILIAS DE CÓDIGOS
//  ─────────────────────────────────────────────────────────
//
//    1xx → Informativos   (el servidor está procesando)
//    2xx → Éxito          (todo salió bien ✅)
//    3xx → Redirecciones  (el recurso está en otro lugar 🔄)
//    4xx → Error cliente  (TÚ hiciste algo mal ❌)
//    5xx → Error servidor (EL SERVIDOR falló 💥)
//
// ============================================================


// ============================================================
//  FAMILIA 1xx — INFORMATIVOS
//  El servidor recibió la petición y la está procesando.
//  Raramente los ves en el día a día como desarrollador web.
// ============================================================

/*
  100 — Continue
  ───────────────
  El servidor recibió los encabezados de la petición y el cliente
  puede continuar enviando el cuerpo (body).
  Se usa en peticiones grandes donde primero consultas si el
  servidor puede recibirlas antes de mandarlas completas.

  Ejemplo de uso:
  Subir un archivo enorme: primero preguntas si el servidor acepta
  el tipo y tamaño, y solo si responde 100 mandas el archivo.

  ─────────────────────────────────────────────────────────

  101 — Switching Protocols
  ──────────────────────────
  El servidor acepta cambiar de protocolo según lo que pidió el cliente.
  El caso más común es la actualización de HTTP a WebSocket.

  Ejemplo de uso:
*/

//  // Cuando abres una conexión WebSocket, el navegador manda:
//  // Upgrade: websocket
//  // Y el servidor responde 101 → "Ok, cambiamos a WebSocket"
//  const socket = new WebSocket('ws://servidor.com/chat');
//  socket.onopen = () => console.log('Conexión WebSocket establecida');


// ============================================================
//  FAMILIA 2xx — ÉXITO ✅
//  La petición se recibió, entendió y procesó correctamente.
//  Estos son los que QUIERES ver siempre.
// ============================================================

/*
  200 — OK
  ─────────
  La petición funcionó perfectamente. Es el código más común.
  El cuerpo de la respuesta contiene los datos solicitados.
  Se usa en GET, PUT, PATCH cuando todo sale bien.
*/

//  // GET /usuarios → 200 OK
//  fetch('/api/usuarios')
//    .then(res => res.json())  // res.status === 200
//    .then(data => console.log(data));

// ─────────────────────────────────────────────────────────

/*
  201 — Created
  ──────────────
  Se creó un nuevo recurso exitosamente.
  Se usa SIEMPRE que haces un POST que crea algo nuevo:
  un usuario, un producto, un artículo, etc.
  La respuesta normalmente incluye el recurso recién creado
  con su ID asignado por la base de datos.
*/

//  // POST /usuarios con body { nombre: "Oscar", email: "oscar@mail.com" }
//  // Servidor responde → 201 Created
//  // Body: { id: 7, nombre: "Oscar", email: "oscar@mail.com" }
//
//  fetch('/api/usuarios', {
//    method: 'POST',
//    headers: { 'Content-Type': 'application/json' },
//    body: JSON.stringify({ nombre: 'Oscar', email: 'oscar@mail.com' })
//  }).then(res => {
//    console.log(res.status); // 201
//  });

// ─────────────────────────────────────────────────────────

/*
  204 — No Content
  ─────────────────
  La petición fue exitosa pero NO hay nada que devolver.
  Se usa típicamente en DELETE, o en PUT/PATCH cuando el servidor
  no necesita devolver el recurso actualizado.
  IMPORTANTE: con 204 el body de la respuesta está completamente vacío.
  Si intentas leer res.json() con un 204 obtendrás un error.
*/

//  // DELETE /usuarios/5 → 204 No Content
//  fetch('/api/usuarios/5', { method: 'DELETE' })
//    .then(res => {
//      if (res.status === 204) {
//        console.log('Usuario eliminado correctamente — sin body');
//      }
//    });

// ─────────────────────────────────────────────────────────

/*
  206 — Partial Content
  ──────────────────────
  El servidor devuelve solo UNA PARTE del recurso.
  Se usa en descargas que se pueden pausar y reanudar,
  o en streaming de video (YouTube y Netflix lo usan constantemente).
  El cliente pide un rango de bytes específico con el header Range.

  Ejemplo: cuando pausas y reanudas una descarga, el navegador
  pide solo los bytes que faltan y recibe 206.
*/


// ============================================================
//  FAMILIA 3xx — REDIRECCIONES 🔄
//  El cliente necesita hacer otra acción para completar la petición.
//  Normalmente significa "el recurso está en otro lugar".
// ============================================================

/*
  301 — Moved Permanently
  ────────────────────────
  El recurso se movió PARA SIEMPRE a una nueva URL.
  Los buscadores como Google actualizan su índice con la nueva URL.
  El navegador guarda esto en caché y la próxima vez va directo
  a la nueva URL sin pasar por la antigua.
  Úsalo cuando cambias una URL de forma definitiva.
*/

//  // http://citysolechoes.com  →  301  →  https://citysolechoes.com
//  // Redirige de HTTP a HTTPS de forma permanente.
//
//  // En Express:
//  app.get('/vieja-ruta', (req, res) => {
//    res.redirect(301, '/nueva-ruta');
//  });

// ─────────────────────────────────────────────────────────

/*
  302 — Found (Moved Temporarily)
  ────────────────────────────────
  El recurso está TEMPORALMENTE en otra URL.
  A diferencia del 301, el navegador NO guarda esto en caché
  y la próxima vez vuelve a consultar la URL original.
  Muy usado en flujos de login: después de autenticarte,
  el servidor te redirige al dashboard.
*/

//  // Login exitoso → 302 → /dashboard
//  app.post('/login', (req, res) => {
//    // validar usuario...
//    res.redirect(302, '/dashboard');
//  });

// ─────────────────────────────────────────────────────────

/*
  304 — Not Modified
  ───────────────────
  El recurso NO cambió desde la última vez que el cliente lo pidió.
  El navegador puede usar su versión guardada en caché.
  Ahorra ancho de banda: el servidor no manda el contenido,
  solo confirma que sigue siendo igual.

  Ejemplo: el navegador pide un archivo CSS que ya descargó antes.
  El servidor responde 304 → el navegador usa el que tiene en caché.
*/


// ============================================================
//  FAMILIA 4xx — ERRORES DEL CLIENTE ❌
//  El cliente envió algo mal: URL incorrecta, sin permisos,
//  datos inválidos, recurso inexistente, etc.
//  La responsabilidad del error ES DEL CLIENTE.
// ============================================================

/*
  400 — Bad Request
  ──────────────────
  La petición está mal formada. El servidor no la puede procesar
  porque los datos enviados son inválidos o están incompletos.
  Es el error genérico de "mandaste algo que no puedo entender".
  Causas comunes:
    - JSON mal formado (falta una llave, una coma extra)
    - Campos obligatorios ausentes
    - Tipos de datos incorrectos (string donde esperaba número)
*/

//  // POST /usuarios sin el campo obligatorio 'email'
//  // Servidor responde → 400 Bad Request
//  // Body: { error: "El campo email es obligatorio" }
//
//  // En Express:
//  app.post('/usuarios', (req, res) => {
//    if (!req.body.email) {
//      return res.status(400).json({ error: 'El campo email es obligatorio' });
//    }
//    // continuar creando el usuario...
//  });

// ─────────────────────────────────────────────────────────

/*
  401 — Unauthorized
  ───────────────────
  El cliente NO está autenticado. El servidor no sabe quién eres.
  Necesitas enviar credenciales válidas (token JWT, cookie de sesión)
  para acceder a este recurso.

  ⚠️ OJO con el nombre: "Unauthorized" es confuso. En realidad
  significa "no autenticado" (unauthenticated). El verdadero
  "no autorizado" (no tienes permisos) es el 403.

  401 = "No sé quién eres"
  403 = "Sé quién eres pero no puedes"
*/

//  // GET /perfil sin enviar el token JWT → 401
//
//  // Petición INCORRECTA (sin token):
//  fetch('/api/perfil');  // → 401
//
//  // Petición CORRECTA (con token):
//  fetch('/api/perfil', {
//    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR...' }
//  });  // → 200
//
//  // Middleware de autenticación en Express:
//  function verificarToken(req, res, next) {
//    const token = req.headers['authorization'];
//    if (!token) {
//      return res.status(401).json({ error: 'Token requerido. Inicia sesión.' });
//    }
//    // verificar token con JWT...
//    next();
//  }

// ─────────────────────────────────────────────────────────

/*
  403 — Forbidden
  ────────────────
  El servidor SABE quién eres (estás autenticado con token válido)
  pero NO tienes permiso para hacer esta acción concreta.
  Eres conocido pero estás prohibido de hacer eso.

  Ejemplo clásico:
  Estás logueado como usuario normal e intentas acceder al panel
  de administración. El servidor te conoce pero te dice NO.
*/

//  // Usuario normal intenta borrar a otro usuario → 403
//  app.delete('/usuarios/:id', verificarToken, (req, res) => {
//    if (req.usuario.rol !== 'admin') {
//      return res.status(403).json({
//        error: 'No tienes permisos de administrador para esta acción'
//      });
//    }
//    // continuar con el borrado...
//  });

// ─────────────────────────────────────────────────────────

/*
  404 — Not Found
  ────────────────
  El recurso solicitado NO existe en el servidor.
  Es el error más famoso de internet.

  Causas comunes:
    - La URL está mal escrita
    - El recurso fue eliminado
    - El ID no corresponde a ningún registro en la base de datos
    - La ruta simplemente no está definida en Express
*/

//  // GET /usuarios/9999  (el usuario con ID 9999 no existe)
//  // Servidor responde → 404 Not Found
//
//  app.get('/usuarios/:id', async (req, res) => {
//    const usuario = await Usuario.findById(req.params.id);
//    if (!usuario) {
//      return res.status(404).json({ error: `Usuario con id=${req.params.id} no encontrado` });
//    }
//    res.status(200).json(usuario);
//  });

// ─────────────────────────────────────────────────────────

/*
  405 — Method Not Allowed
  ─────────────────────────
  El método HTTP usado no está permitido para esa ruta.
  Por ejemplo, intentas hacer DELETE en una ruta que solo acepta GET.
  El servidor responde con un header Allow indicando qué métodos sí acepta.
*/

//  // DELETE /usuarios  (solo existe GET /usuarios)
//  // Servidor responde → 405 Method Not Allowed
//  // Header: Allow: GET, POST
//
//  // Express automáticamente maneja esto:
//  app.get('/usuarios', obtenerTodos);
//  app.post('/usuarios', crear);
//  // Si alguien hace DELETE /usuarios → Express devuelve 405

// ─────────────────────────────────────────────────────────

/*
  409 — Conflict
  ───────────────
  Hay un conflicto con el estado actual del recurso en el servidor.
  El caso más común: intentas crear algo que ya existe.
  Ejemplos:
    - Registrar un email que ya está en uso
    - Crear un nombre de usuario ya tomado
    - Intentar publicar dos veces el mismo contenido
*/

//  // POST /usuarios con email que ya existe → 409 Conflict
//  app.post('/usuarios', async (req, res) => {
//    const existe = await Usuario.findOne({ email: req.body.email });
//    if (existe) {
//      return res.status(409).json({
//        error: `El email '${req.body.email}' ya está registrado`
//      });
//    }
//    // crear usuario...
//  });

// ─────────────────────────────────────────────────────────

/*
  410 — Gone
  ───────────
  El recurso EXISTIÓ pero fue eliminado PERMANENTEMENTE.
  A diferencia del 404 (nunca existió o no sé dónde está),
  el 410 dice explícitamente "existió aquí y ya no existe".
  Los buscadores eliminan de su índice las páginas con 410,
  a diferencia del 404 que siguen intentando visitar.

  Ejemplo: un artículo de blog eliminado permanentemente
  devuelve 410 en lugar de 404 para que Google lo desindexe.
*/

// ─────────────────────────────────────────────────────────

/*
  422 — Unprocessable Entity
  ───────────────────────────
  La petición está bien formada (el JSON llegó correcto, no es 400)
  pero los datos NO pasan la validación de negocio.
  El servidor entiende lo que mandaste pero semánticamente es inválido.

  Diferencia clave:
  400 = "No entiendo lo que me mandaste" (formato roto)
  422 = "Entiendo lo que mandaste pero tiene sentido incorrecto"
*/

//  // POST /usuarios con { edad: -5, email: "no-es-un-email" }
//  // El JSON llegó bien formado, pero los valores son inválidos
//  // Servidor responde → 422 Unprocessable Entity
//
//  app.post('/usuarios', (req, res) => {
//    const errores = [];
//    if (req.body.edad < 0)           errores.push('La edad no puede ser negativa');
//    if (!req.body.email.includes('@')) errores.push('El formato del email es inválido');
//
//    if (errores.length > 0) {
//      return res.status(422).json({ errores });
//    }
//    // crear usuario...
//  });

// ─────────────────────────────────────────────────────────

/*
  429 — Too Many Requests
  ────────────────────────
  El cliente hizo demasiadas peticiones en poco tiempo.
  Las APIs lo usan para protegerse de abusos — se llama rate limiting.
  La respuesta normalmente incluye el header Retry-After con
  cuántos segundos debe esperar el cliente antes de reintentar.

  Ejemplo: una API permite 60 peticiones por minuto.
  Si mandas la 61, recibes 429.
*/

//  // Con el paquete express-rate-limit:
//  // npm install express-rate-limit
//
//  const rateLimit = require('express-rate-limit');
//
//  const limitador = rateLimit({
//    windowMs: 60 * 1000,     // ventana de 1 minuto
//    max: 60,                  // máximo 60 peticiones por ventana
//    standardHeaders: true,    // devuelve info en headers RateLimit-*
//    legacyHeaders: false,
//    message: {
//      error: 'Demasiadas peticiones. Espera un momento antes de continuar.'
//    }
//  });
//
//  app.use('/api/', limitador); // aplica a todas las rutas /api/


// ============================================================
//  FAMILIA 5xx — ERRORES DEL SERVIDOR 💥
//  El cliente hizo todo bien pero el servidor falló internamente.
//  Como desarrollador backend, estos son los que DEBES evitar.
// ============================================================

/*
  500 — Internal Server Error
  ─────────────────────────────
  El servidor encontró una condición inesperada que le impidió
  completar la petición. Es el error genérico del servidor.
  En desarrollo lo verás cuando tu código lanza una excepción
  no controlada: acceder a .nombre de undefined, error de base
  de datos, división por cero, etc.
  SIEMPRE envuelve tu lógica en try/catch para evitar 500s.
*/

//  // Mal (puede dar 500 si req.body.usuario es undefined):
//  app.get('/perfil', (req, res) => {
//    const nombre = req.body.usuario.nombre; // 💥 crash si usuario es undefined
//    res.json({ nombre });
//  });
//
//  // Bien (con try/catch → nunca da 500 sin respuesta):
//  app.get('/perfil', (req, res) => {
//    try {
//      const nombre = req.body.usuario.nombre;
//      res.json({ nombre });
//    } catch (error) {
//      console.error('Error en /perfil:', error.message);
//      res.status(500).json({ error: 'Error interno del servidor' });
//    }
//  });

// ─────────────────────────────────────────────────────────

/*
  502 — Bad Gateway
  ──────────────────
  El servidor actuaba como intermediario (gateway o proxy) y recibió
  una respuesta inválida del servidor al que intentaba contactar.
  Común cuando tienes microservicios y uno le habla a otro que falló.

  Ejemplo: tu servidor Node.js llama a otro servicio externo y ese
  servicio devuelve basura o una respuesta corrupta.
  Tu servidor responde 502 al cliente porque el problema está
  "aguas arriba" en la cadena.
*/

// ─────────────────────────────────────────────────────────

/*
  503 — Service Unavailable
  ──────────────────────────
  El servidor no puede procesar la petición ahora mismo.
  A diferencia del 500 (error inesperado), el 503 es intencional:
  el servidor SABE que no está disponible y lo comunica.

  Causas comunes:
    - El servidor está sobrecargado con demasiadas conexiones
    - Está en mantenimiento programado
    - La base de datos no responde / está caída
  Normalmente incluye el header Retry-After.
*/

//  app.get('/usuarios', async (req, res) => {
//    try {
//      const usuarios = await db.query('SELECT * FROM usuarios');
//      res.json(usuarios);
//    } catch (error) {
//      if (error.code === 'ECONNREFUSED') {
//        // La base de datos no está disponible
//        return res.status(503).json({
//          error: 'Servicio temporalmente no disponible. Intenta en unos minutos.'
//        });
//      }
//      res.status(500).json({ error: 'Error interno del servidor' });
//    }
//  });

// ─────────────────────────────────────────────────────────

/*
  504 — Gateway Timeout
  ──────────────────────
  El servidor intermediario esperó demasiado tiempo la respuesta
  del servidor final y se rindió. Similar al 502 pero por tiempo.
  Común en operaciones lentas: consultas pesadas, APIs externas lentas,
  procesos que tardan más que el timeout configurado.

  Ejemplo: tu servidor llama a una API de pagos que tarda más de
  30 segundos en responder. El gateway se cansa y devuelve 504.
*/


// ============================================================
//  RESUMEN — TABLA DE REFERENCIA PARA UN CRUD COMPLETO
// ============================================================
//
//  Operación              Código exitoso      Errores comunes
//  ──────────────────────────────────────────────────────────
//  GET  /recursos         200 OK              —
//  GET  /recursos/:id     200 OK              404 no existe
//  POST /recursos         201 Created         400 datos inválidos
//                                             409 ya existe
//                                             422 validación fallida
//  PUT  /recursos/:id     200 OK              400 datos inválidos
//                                             404 no existe
//  PATCH /recursos/:id    200 OK              400 datos inválidos
//                                             404 no existe
//  DELETE /recursos/:id   204 No Content      404 no existe
//
//  Sin autenticación      —                   401 no autenticado
//  Sin permisos           —                   403 no autorizado
//  Límite de peticiones   —                   429 rate limit
//  Error del servidor     —                   500 error interno
//  Servicio caído         —                   503 no disponible
//
// ============================================================


// ============================================================
//  EJEMPLO PRÁCTICO COMPLETO
//  Servidor Express que demuestra todos los códigos en acción
// ============================================================
//
//  INSTRUCCIONES PARA CORRERLO:
//  ────────────────────────────
//  1. Crea una carpeta nueva, entra en ella
//  2. npm init -y
//  3. npm install express
//  4. Guarda este archivo como 08_codigos-http.js
//  5. node 08_codigos-http.js
//  6. Abre: http://localhost:3000 en el navegador
//  7. Usa Postman para probar POST, PUT, PATCH, DELETE
//
//  Rutas disponibles para probar:
//  ──────────────────────────────
//  GET    http://localhost:3000/                          → Info de todas las rutas
//  GET    http://localhost:3000/api/usuarios              → 200 — Lista todos
//  GET    http://localhost:3000/api/usuarios/1            → 200 — Obtiene uno
//  GET    http://localhost:3000/api/usuarios/999          → 404 — No existe
//  GET    http://localhost:3000/api/usuarios?ciudad=Cali  → 200 — Filtro
//  POST   http://localhost:3000/api/usuarios              → 201 — Crea
//  POST   http://localhost:3000/api/usuarios  (sin body)  → 400 — Error datos
//  PUT    http://localhost:3000/api/usuarios/1            → 200 — Actualiza todo
//  PATCH  http://localhost:3000/api/usuarios/1            → 200 — Actualiza parte
//  DELETE http://localhost:3000/api/usuarios/1            → 200 — Elimina
//  GET    http://localhost:3000/api/demo/headers          → Tus headers
//  GET    http://localhost:3000/api/demo/codigos/404      → Qué significa 404
//  GET    http://localhost:3000/ruta-inexistente          → 404 — Ruta no existe
//
// ============================================================

"use strict";

const express = require("express");
const app     = express();
const PUERTO  = 3000;

app.use(express.json());


// ─────────────────────────────────────────────────────────
//  Middleware global: muestra info COMPLETA de cada petición
//  Así podemos ver exactamente qué contiene una petición HTTP
// ─────────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log("\n══════════════════════════════════════════");
  console.log("  📨 NUEVA PETICIÓN HTTP RECIBIDA");
  console.log("══════════════════════════════════════════");
  console.log(`  Método:    ${req.method}`);
  console.log(`  URL:       ${req.url}`);
  console.log(`  Ruta base: ${req.path}`);

  // Query params: lo que viene después del ?
  // Ejemplo: /usuarios?ciudad=Cali → { ciudad: 'Cali' }
  if (Object.keys(req.query).length > 0) {
    console.log("  Query Params:", req.query);
  }

  // Route params: variables en la URL como :id
  // Ejemplo: /usuarios/5 → { id: '5' }
  if (Object.keys(req.params).length > 0) {
    console.log("  Route Params:", req.params);
  }

  // Headers relevantes de la petición
  console.log("  Headers:");
  if (req.headers["content-type"]) {
    console.log(`    Content-Type:  ${req.headers["content-type"]}`);
  }
  if (req.headers["authorization"]) {
    console.log(`    Authorization: ${req.headers["authorization"]}`);
  }
  if (req.headers["user-agent"]) {
    console.log(`    User-Agent:    ${req.headers["user-agent"].slice(0, 60)}...`);
  }

  // Body (solo en POST, PUT, PATCH)
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("  Body:", JSON.stringify(req.body, null, 2));
  }

  console.log("──────────────────────────────────────────");
  next();
});


// ─────────────────────────────────────────────────────────
//  "Base de datos" en memoria para los ejemplos
//  En un proyecto real esto vendría de MongoDB, PostgreSQL, etc.
// ─────────────────────────────────────────────────────────
let usuarios = [
  { id: 1, nombre: "Juan Pérez",   email: "juan@email.com",  ciudad: "Cali",     activo: true  },
  { id: 2, nombre: "Ana García",   email: "ana@email.com",   ciudad: "Bogotá",   activo: true  },
  { id: 3, nombre: "Luis Torres",  email: "luis@email.com",  ciudad: "Medellín", activo: false },
];
let contadorId = usuarios.length;


// ════════════════════════════════════════════════════════
//  GET / → Página de bienvenida con info de todas las rutas
//  Código: 200 OK
// ════════════════════════════════════════════════════════
app.get("/", (req, res) => {

  // Así se agregan headers personalizados a la RESPUESTA
  res.setHeader("X-Servidor",   "Express-Codigos-HTTP");
  res.setHeader("X-Version",    "1.0.0");
  res.setHeader("X-Estudiante", "Oscar Fernando");

  res.status(200).json({
    codigo:      200,
    mensaje:     "Servidor de demostración de códigos HTTP",
    descripcion: "Cada ruta devuelve un código de estado diferente",
    metodosHTTP: {
      GET:    "Obtener/leer datos del servidor",
      POST:   "Crear nuevos recursos",
      PUT:    "Actualizar un recurso COMPLETO (reemplaza todo)",
      PATCH:  "Actualizar un recurso PARCIALMENTE (solo lo que mandas)",
      DELETE: "Eliminar un recurso",
    },
    rutasDisponibles: [
      "GET    /api/usuarios              → 200 Lista todos",
      "GET    /api/usuarios/:id          → 200 o 404",
      "GET    /api/usuarios?ciudad=Cali  → 200 con filtro",
      "POST   /api/usuarios              → 201 o 400 o 409",
      "PUT    /api/usuarios/:id          → 200 o 404",
      "PATCH  /api/usuarios/:id          → 200 o 404",
      "DELETE /api/usuarios/:id          → 200 o 404",
      "GET    /api/demo/headers          → Tus headers",
      "GET    /api/demo/codigos/:codigo  → Qué significa ese código",
      "GET    /ruta-que-no-existe        → 404",
    ],
  });
});


// ════════════════════════════════════════════════════════
//  DEMO: muestra los headers que envió el cliente
//  Muy útil para entender qué viaja en una petición HTTP
// ════════════════════════════════════════════════════════
app.get("/api/demo/headers", (req, res) => {
  res.status(200).json({
    codigo:  200,
    mensaje: "Estos son los headers que enviaste en tu petición",
    tusHeaders: req.headers,
    aclaracion: {
      "content-type":  "Tipo de dato que estás enviando (JSON, form, etc.)",
      "authorization": "Token de autenticación (JWT)",
      "accept":        "Qué tipo de respuesta aceptas",
      "user-agent":    "Qué cliente está haciendo la petición",
      "origin":        "De qué dominio viene la petición (CORS)",
    },
  });
});


// ════════════════════════════════════════════════════════
//  DEMO: explica qué significa un código de estado
//  Prueba: GET /api/demo/codigos/404
//          GET /api/demo/codigos/201
// ════════════════════════════════════════════════════════
app.get("/api/demo/codigos/:codigo", (req, res) => {
  const codigo = parseInt(req.params.codigo);

  const diccionario = {
    100: { nombre: "Continue",              familia: "1xx Informativo",   cuando: "Antes de subir archivos grandes" },
    101: { nombre: "Switching Protocols",   familia: "1xx Informativo",   cuando: "Al establecer conexión WebSocket" },
    200: { nombre: "OK",                    familia: "2xx Éxito",         cuando: "GET, PUT, PATCH exitosos" },
    201: { nombre: "Created",               familia: "2xx Éxito",         cuando: "POST que crea un recurso nuevo" },
    204: { nombre: "No Content",            familia: "2xx Éxito",         cuando: "DELETE exitoso, sin body que devolver" },
    206: { nombre: "Partial Content",       familia: "2xx Éxito",         cuando: "Streaming de video, descargas pausadas" },
    301: { nombre: "Moved Permanently",     familia: "3xx Redirección",   cuando: "URL cambió para siempre" },
    302: { nombre: "Found",                 familia: "3xx Redirección",   cuando: "Redirección temporal después del login" },
    304: { nombre: "Not Modified",          familia: "3xx Redirección",   cuando: "El recurso no cambió, usa caché" },
    400: { nombre: "Bad Request",           familia: "4xx Error cliente", cuando: "Datos mal formados o incompletos" },
    401: { nombre: "Unauthorized",          familia: "4xx Error cliente", cuando: "No autenticado, falta token" },
    403: { nombre: "Forbidden",             familia: "4xx Error cliente", cuando: "Autenticado pero sin permisos" },
    404: { nombre: "Not Found",             familia: "4xx Error cliente", cuando: "El recurso no existe" },
    405: { nombre: "Method Not Allowed",    familia: "4xx Error cliente", cuando: "Método no permitido en esa ruta" },
    409: { nombre: "Conflict",              familia: "4xx Error cliente", cuando: "El recurso ya existe (email duplicado)" },
    410: { nombre: "Gone",                  familia: "4xx Error cliente", cuando: "El recurso existió y fue eliminado" },
    422: { nombre: "Unprocessable Entity",  familia: "4xx Error cliente", cuando: "Datos con formato correcto pero inválidos" },
    429: { nombre: "Too Many Requests",     familia: "4xx Error cliente", cuando: "Rate limiting, demasiadas peticiones" },
    500: { nombre: "Internal Server Error", familia: "5xx Error servidor",cuando: "Error inesperado en el código del servidor" },
    502: { nombre: "Bad Gateway",           familia: "5xx Error servidor",cuando: "Respuesta inválida de servicio externo" },
    503: { nombre: "Service Unavailable",   familia: "5xx Error servidor",cuando: "Servidor sobrecargado o en mantenimiento" },
    504: { nombre: "Gateway Timeout",       familia: "5xx Error servidor",cuando: "Servicio externo tardó demasiado" },
  };

  const info = diccionario[codigo];

  if (!info) {
    return res.status(404).json({
      mensaje:            `El código ${codigo} no está en el diccionario`,
      codigosDisponibles: Object.keys(diccionario).map(Number),
    });
  }

  // Respondemos con ese mismo código para que lo veas en Postman
  // (excepto 404 que ya lo usa el bloque anterior)
  const codigoRespuesta = (codigo === 404 || codigo < 200) ? 200 : codigo;

  res.status(codigoRespuesta).json({
    codigo,
    ...info,
    nota: `Este servidor respondió con ${codigoRespuesta} para que puedas ver el JSON`
  });
});


// ════════════════════════════════════════════════════════
//  GET /api/usuarios → Lista todos (con filtros opcionales)
//  Código exitoso: 200 OK
// ════════════════════════════════════════════════════════
app.get("/api/usuarios", (req, res) => {

  // Los query params llegan en req.query
  // Ejemplo: /api/usuarios?ciudad=Cali&activo=true
  const { ciudad, activo } = req.query;
  let resultado = [...usuarios];

  // Filtro por ciudad
  if (ciudad) {
    resultado = resultado.filter(
      (u) => u.ciudad.toLowerCase() === ciudad.toLowerCase()
    );
  }

  // Filtro por estado activo
  if (activo !== undefined) {
    resultado = resultado.filter((u) => u.activo === (activo === "true"));
  }

  console.log(`  ✅ 200 — Devolviendo ${resultado.length} usuario(s)`);

  res.status(200).json({
    codigo:      200,
    descripcion: "GET → Obtener lista de recursos",
    total:       resultado.length,
    filtrosUsados: { ciudad: ciudad || null, activo: activo || null },
    datos:       resultado,
  });
});


// ════════════════════════════════════════════════════════
//  GET /api/usuarios/:id → Obtiene uno por ID
//  Código exitoso: 200 OK
//  Errores: 400 (id no es número), 404 (no existe)
// ════════════════════════════════════════════════════════
app.get("/api/usuarios/:id", (req, res) => {

  // req.params.id siempre llega como STRING, hay que convertirlo
  const id = parseInt(req.params.id);

  // Validación: ¿es un número válido?
  if (isNaN(id)) {
    console.log(`  ❌ 400 — ID inválido: '${req.params.id}'`);
    return res.status(400).json({
      codigo:  400,
      mensaje: `El parámetro :id debe ser un número. Recibimos: '${req.params.id}'`,
    });
  }

  const usuario = usuarios.find((u) => u.id === id);

  // ¿Existe el usuario con ese ID?
  if (!usuario) {
    console.log(`  ❌ 404 — Usuario id=${id} no encontrado`);
    return res.status(404).json({
      codigo:  404,
      mensaje: `No existe ningún usuario con id = ${id}`,
    });
  }

  console.log(`  ✅ 200 — Usuario encontrado: ${usuario.nombre}`);

  res.status(200).json({
    codigo:      200,
    descripcion: "GET /:id → Obtener un recurso específico",
    dato:        usuario,
  });
});


// ════════════════════════════════════════════════════════
//  POST /api/usuarios → Crea un nuevo usuario
//  Los datos llegan en el BODY de la petición (JSON)
//  Código exitoso: 201 Created
//  Errores: 400 (datos inválidos), 409 (email ya existe)
// ════════════════════════════════════════════════════════
app.post("/api/usuarios", (req, res) => {

  // req.body contiene los datos enviados en el body JSON
  const { nombre, email, ciudad } = req.body;

  // --- Validación ---
  const errores = [];
  if (!nombre || nombre.trim() === "") errores.push("El campo 'nombre' es obligatorio");
  if (!email  || email.trim()  === "") errores.push("El campo 'email' es obligatorio");
  if (!ciudad || ciudad.trim() === "") errores.push("El campo 'ciudad' es obligatorio");

  if (errores.length > 0) {
    console.log(`  ❌ 400 — Datos inválidos:`, errores);
    return res.status(400).json({
      codigo:  400,
      mensaje: "Los datos enviados son inválidos o están incompletos",
      errores,
    });
  }

  // --- Verificar conflicto (409) ---
  const emailExiste = usuarios.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (emailExiste) {
    console.log(`  ❌ 409 — Email ya registrado: ${email}`);
    return res.status(409).json({
      codigo:  409,
      mensaje: `El email '${email}' ya está registrado. Usa otro email.`,
    });
  }

  // --- Crear usuario ---
  contadorId++;
  const nuevoUsuario = {
    id:     contadorId,
    nombre: nombre.trim(),
    email:  email.trim().toLowerCase(),
    ciudad: ciudad.trim(),
    activo: true,
  };

  usuarios.push(nuevoUsuario);
  console.log(`  ✅ 201 — Usuario creado: ${nuevoUsuario.nombre} (id: ${nuevoUsuario.id})`);

  // 201 = Created (recurso nuevo creado exitosamente)
  res.status(201).json({
    codigo:      201,
    descripcion: "POST → Crear un nuevo recurso",
    mensaje:     "Usuario creado exitosamente",
    dato:        nuevoUsuario,
  });
});


// ════════════════════════════════════════════════════════
//  PUT /api/usuarios/:id → Actualiza COMPLETO
//  Reemplaza TODOS los campos del usuario con los nuevos
//  Si no envías un campo, el comportamiento depende de tu lógica
//  Código exitoso: 200 OK
//  Errores: 404 (no existe)
// ════════════════════════════════════════════════════════
app.put("/api/usuarios/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex((u) => u.id === id);

  if (idx === -1) {
    console.log(`  ❌ 404 — Usuario id=${id} no existe para PUT`);
    return res.status(404).json({
      codigo:  404,
      mensaje: `Usuario con id=${id} no encontrado`,
    });
  }

  const { nombre, email, ciudad, activo } = req.body;
  const usuarioAnterior = { ...usuarios[idx] }; // copia para mostrar el antes

  // PUT: reemplaza el recurso completo
  // Si no mandan un campo, usamos el valor actual como fallback
  usuarios[idx] = {
    id,
    nombre: nombre ?? usuarios[idx].nombre,
    email:  email  ?? usuarios[idx].email,
    ciudad: ciudad ?? usuarios[idx].ciudad,
    activo: activo !== undefined ? activo : usuarios[idx].activo,
  };

  console.log(`  ✅ 200 — PUT exitoso: ${usuarios[idx].nombre}`);

  res.status(200).json({
    codigo:      200,
    descripcion: "PUT → Actualización COMPLETA (reemplaza todos los campos)",
    antes:       usuarioAnterior,
    despues:     usuarios[idx],
  });
});


// ════════════════════════════════════════════════════════
//  PATCH /api/usuarios/:id → Actualiza PARCIALMENTE
//  Solo actualiza los campos que se envíen en el body
//  Diferencia con PUT: PUT reemplaza todo, PATCH solo lo indicado
//  Código exitoso: 200 OK
//  Errores: 404 (no existe)
// ════════════════════════════════════════════════════════
app.patch("/api/usuarios/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex((u) => u.id === id);

  if (idx === -1) {
    console.log(`  ❌ 404 — Usuario id=${id} no existe para PATCH`);
    return res.status(404).json({
      codigo:  404,
      mensaje: `Usuario con id=${id} no encontrado`,
    });
  }

  const usuarioAnterior     = { ...usuarios[idx] };
  const camposModificados   = Object.keys(req.body);

  // PATCH: spread del objeto actual + spread del body
  // El body sobreescribe solo lo que trae, el resto queda igual
  usuarios[idx] = {
    ...usuarios[idx], // Mantiene TODOS los campos actuales
    ...req.body,      // Sobreescribe solo los que llegaron en el body
    id,               // El id NUNCA puede cambiar
  };

  console.log(`  ✅ 200 — PATCH exitoso. Campos modificados:`, camposModificados);

  res.status(200).json({
    codigo:           200,
    descripcion:      "PATCH → Actualización PARCIAL (solo los campos enviados)",
    camposModificados,
    antes:            usuarioAnterior,
    despues:          usuarios[idx],
  });
});


// ════════════════════════════════════════════════════════
//  DELETE /api/usuarios/:id → Elimina un usuario
//  Código exitoso: 200 con body (o 204 sin body)
//  Errores: 404 (no existe)
// ════════════════════════════════════════════════════════
app.delete("/api/usuarios/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex((u) => u.id === id);

  if (idx === -1) {
    console.log(`  ❌ 404 — Usuario id=${id} no existe para DELETE`);
    return res.status(404).json({
      codigo:  404,
      mensaje: `Usuario con id=${id} no encontrado`,
    });
  }

  // splice(idx, 1) elimina 1 elemento en la posición idx
  // y devuelve un array con el elemento eliminado
  const eliminado = usuarios.splice(idx, 1)[0];

  console.log(`  ✅ 200 — Usuario eliminado: ${eliminado.nombre}`);

  // Opción A: 200 con el recurso eliminado (más informativo)
  res.status(200).json({
    codigo:         200,
    descripcion:    "DELETE → Eliminar un recurso",
    mensaje:        `Usuario '${eliminado.nombre}' eliminado exitosamente`,
    eliminado,
    totalRestante:  usuarios.length,
  });

  // Opción B: 204 sin body (más estricto según REST)
  // res.status(204).send();
});


// ════════════════════════════════════════════════════════
//  404 global — Ruta no encontrada
//  Este middleware captura CUALQUIER ruta no definida arriba
// ════════════════════════════════════════════════════════
app.use((req, res) => {
  console.log(`  ❌ 404 — Ruta no existe: ${req.method} ${req.url}`);
  res.status(404).json({
    codigo:  404,
    mensaje: `La ruta '${req.method} ${req.url}' no existe en este servidor`,
    sugerencia: "Revisa la URL o consulta GET / para ver las rutas disponibles",
  });
});


// ════════════════════════════════════════════════════════
//  Iniciar servidor
// ════════════════════════════════════════════════════════
app.listen(PUERTO, () => {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║  📘 SERVIDOR — CÓDIGOS DE ESTADO HTTP   ║");
  console.log("╚══════════════════════════════════════════╝");
  console.log(`\n  ✅ Corriendo en: http://localhost:${PUERTO}`);
  console.log("\n  Rutas de prueba en el navegador:");
  console.log(`  → http://localhost:${PUERTO}/`);
  console.log(`  → http://localhost:${PUERTO}/api/usuarios`);
  console.log(`  → http://localhost:${PUERTO}/api/usuarios/1`);
  console.log(`  → http://localhost:${PUERTO}/api/usuarios/999`);
  console.log(`  → http://localhost:${PUERTO}/api/usuarios?ciudad=Cali`);
  console.log(`  → http://localhost:${PUERTO}/api/demo/headers`);
  console.log(`  → http://localhost:${PUERTO}/api/demo/codigos/201`);
  console.log(`  → http://localhost:${PUERTO}/api/demo/codigos/404`);
  console.log(`  → http://localhost:${PUERTO}/api/demo/codigos/500`);
  console.log("\n  Para POST/PUT/PATCH/DELETE usa Postman.");
  console.log("  Ctrl + C para detener el servidor.\n");
});