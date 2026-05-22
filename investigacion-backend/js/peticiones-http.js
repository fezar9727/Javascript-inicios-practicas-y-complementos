// ============================================================
//  📘 INVESTIGACIÓN #7 — ¿QUÉ SON LAS PETICIONES HTTP?
// ============================================================
//
//  HTTP = HyperText Transfer Protocol
//  Es el PROTOCOLO (conjunto de reglas) que define cómo se
//  comunican el cliente (navegador, app) y el servidor (Node.js).
//
//  ANALOGÍA:
//  ─────────
//  Imagina que HTTP es el idioma que hablan dos personas:
//  - El CLIENTE es quien hace preguntas (el navegador o app)
//  - El SERVIDOR es quien responde (tu código Node.js/Express)
//  - La PETICIÓN (request) es la pregunta
//  - La RESPUESTA (response) es la contestación
//
//  ¿CÓMO FUNCIONA UNA PETICIÓN HTTP?
//  ───────────────────────────────────
//  1. El cliente envía una PETICIÓN al servidor con:
//     - Un MÉTODO (GET, POST, PUT, DELETE...)
//     - Una URL (la dirección del recurso)
//     - HEADERS (cabeceras con info extra)
//     - BODY (cuerpo con datos, solo en POST/PUT/PATCH)
//
//  2. El servidor procesa la petición y envía una RESPUESTA con:
//     - Un CÓDIGO DE ESTADO (200, 201, 404, 500...)
//     - HEADERS de respuesta
//     - BODY con los datos solicitados (HTML, JSON, etc.)
//
//  ─────────────────────────────────────────────────────────
//  MÉTODOS HTTP — Los verbos del protocolo
//  ─────────────────────────────────────────────────────────
//
//  GET
//  ────
//  → Para OBTENER / LEER información del servidor.
//  → NO envía datos en el body.
//  → Los parámetros van en la URL: /productos?categoria=tech
//  → Es SEGURO e IDEMPOTENTE (múltiples peticiones = mismo resultado)
//  → Ejemplos reales:
//     - Abrir una página web
//     - Listar productos de una tienda
//     - Ver el perfil de un usuario
//
//  POST
//  ─────
//  → Para CREAR / ENVIAR datos al servidor.
//  → Envía datos en el BODY de la petición (JSON, formulario).
//  → NO es idempotente (múltiples peticiones = múltiples recursos)
//  → Ejemplos reales:
//     - Registrar un usuario
//     - Publicar un comentario
//     - Hacer un pedido en una tienda
//
//  PUT
//  ────
//  → Para ACTUALIZAR un recurso COMPLETO (lo reemplaza todo).
//  → Envía los datos nuevos en el body.
//  → Es IDEMPOTENTE (hacer 5 veces el mismo PUT = mismo resultado)
//  → Ejemplos reales:
//     - Editar completamente el perfil de un usuario
//     - Reemplazar todos los datos de un producto
//
//  PATCH
//  ──────
//  → Para ACTUALIZAR PARCIALMENTE un recurso (solo algunos campos).
//  → Diferencia con PUT: PUT reemplaza TODO, PATCH solo lo indicado.
//  → Ejemplos reales:
//     - Cambiar solo el precio de un producto
//     - Cambiar solo la foto de perfil de un usuario
//
//  DELETE
//  ───────
//  → Para ELIMINAR un recurso del servidor.
//  → Generalmente no lleva body.
//  → Ejemplos reales:
//     - Eliminar una cuenta
//     - Borrar un comentario
//     - Desactivar un producto
//
//  HEAD
//  ─────
//  → Igual que GET pero el servidor solo devuelve los HEADERS,
//    sin el body. Útil para verificar si un recurso existe.
//
//  OPTIONS
//  ────────
//  → El cliente pregunta al servidor qué métodos acepta.
//  → Lo usan los navegadores antes de peticiones CORS.
//
//  ─────────────────────────────────────────────────────────
//  ESTRUCTURA DE UNA PETICIÓN HTTP
//  ─────────────────────────────────────────────────────────
//
//  POST /api/usuarios HTTP/1.1
//  Host: localhost:3000
//  Content-Type: application/json       ← Header: tipo de contenido
//  Authorization: Bearer eyJhbGci...    ← Header: token de autenticación
//  Accept: application/json             ← Header: qué acepta el cliente
//
//  {                                    ← BODY (solo en POST/PUT/PATCH)
//    "nombre": "Juan Pérez",
//    "email": "juan@email.com",
//    "password": "12345678"
//  }
//
//  ─────────────────────────────────────────────────────────
//  ESTRUCTURA DE UNA RESPUESTA HTTP
//  ─────────────────────────────────────────────────────────
//
//  HTTP/1.1 201 Created                 ← Código de estado
//  Content-Type: application/json       ← Header de respuesta
//  Date: Fri, 22 May 2026 10:00:00 GMT
//
//  {                                    ← BODY de la respuesta
//    "exito": true,
//    "mensaje": "Usuario creado",
//    "dato": { "id": 1, "nombre": "Juan Pérez" }
//  }
//
//  ─────────────────────────────────────────────────────────
//  CÓDIGOS DE ESTADO HTTP — La respuesta del servidor
//  ─────────────────────────────────────────────────────────
//
//  Los códigos se agrupan en 5 familias:
//
//  1xx — INFORMATIVOS (raramente usados directamente)
//  ────
//  100 Continue → El servidor recibió la solicitud inicial
//
//  2xx — ÉXITO ✅
//  ────
//  200 OK             → Todo salió bien (GET exitoso)
//  201 Created        → Recurso creado exitosamente (POST exitoso)
//  204 No Content     → Éxito pero sin datos que devolver (DELETE)
//
//  3xx — REDIRECCIONES 🔄
//  ────
//  301 Moved Permanently → El recurso se movió de URL para siempre
//  302 Found             → Redirección temporal
//  304 Not Modified      → El recurso no cambió (usa caché)
//
//  4xx — ERRORES DEL CLIENTE ❌ (el cliente hizo algo mal)
//  ────
//  400 Bad Request        → Datos mal enviados o formato incorrecto
//  401 Unauthorized       → No autenticado (no inició sesión)
//  403 Forbidden          → Autenticado pero sin permisos suficientes
//  404 Not Found          → El recurso no existe en esa URL
//  409 Conflict           → Conflicto (ej: email ya registrado)
//  422 Unprocessable      → Datos válidos en formato pero semánticamente incorrectos
//  429 Too Many Requests  → Demasiadas peticiones (rate limiting)
//
//  5xx — ERRORES DEL SERVIDOR 💥 (el servidor tuvo un problema)
//  ────
//  500 Internal Server Error → Error genérico del servidor
//  502 Bad Gateway           → El servidor recibió respuesta inválida
//  503 Service Unavailable   → Servidor caído o sobrecargado
//
//  ─────────────────────────────────────────────────────────
//  HEADERS (Cabeceras HTTP) — Metadata de la petición
//  ─────────────────────────────────────────────────────────
//
//  Los headers son pares clave:valor que van en la petición
//  o respuesta y proporcionan información adicional.
//
//  HEADERS DE PETICIÓN más comunes:
//  Content-Type: application/json    → Tipo de dato que envío
//  Authorization: Bearer <token>     → Token de autenticación
//  Accept: application/json          → Qué tipo acepto como respuesta
//  Origin: https://miweb.com         → De dónde viene la petición (CORS)
//  User-Agent: Mozilla/5.0 ...       → Qué cliente hace la petición
//
//  HEADERS DE RESPUESTA más comunes:
//  Content-Type: application/json    → Tipo de dato que devuelvo
//  Access-Control-Allow-Origin: *    → Permite CORS desde cualquier origen
//  Set-Cookie: session=abc; HttpOnly → Establece una cookie
//  Cache-Control: no-cache           → No guardar en caché
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES CORS?
//  ─────────────────────────────────────────────────────────
//  CORS = Cross-Origin Resource Sharing
//
//  Por seguridad, los navegadores bloquean peticiones que van
//  de un dominio a otro distinto. Por ejemplo:
//  - Tu frontend está en: http://localhost:5173 (React/Vue)
//  - Tu backend está en:  http://localhost:3000 (Express)
//  Son ORÍGENES DIFERENTES → el navegador bloquea la petición.
//
//  Para permitirlo, el servidor debe enviar el header:
//  Access-Control-Allow-Origin: http://localhost:5173
//  (o * para permitir todos los orígenes — solo en desarrollo)
//
//  En Express se soluciona instalando el paquete 'cors':
//  npm install cors
//  app.use(cors());  // Permite todos los orígenes
//
//  ─────────────────────────────────────────────────────────
//  HTTP vs HTTPS
//  ─────────────────────────────────────────────────────────
//  HTTP  → Los datos viajan en texto plano (inseguro)
//  HTTPS → Los datos viajan ENCRIPTADOS con TLS/SSL (seguro)
//
//  En producción SIEMPRE se usa HTTPS.
//  En desarrollo local se usa HTTP (localhost).
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — Servidor que demuestra peticiones HTTP
// ============================================================
//
//  INSTRUCCIONES:
//  1. npm install express
//  2. node 07_peticiones_http.js
//  3. Abre: http://localhost:3000
//  4. Usa el navegador para las peticiones GET
//  5. Usa Postman para POST, PUT, PATCH, DELETE
//
// ============================================================

"use strict";

const express = require("express");
const app     = express();
const PUERTO  = 3000;

app.use(express.json());

// ────────────────────────────────────────────────────────
//  Middleware: muestra info COMPLETA de cada petición que llega
//  Así podemos ver exactamente qué contiene una petición HTTP
// ────────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log("\n══════════════════════════════════════════");
  console.log("  📨 NUEVA PETICIÓN HTTP RECIBIDA");
  console.log("══════════════════════════════════════════");
  console.log(`  Método:      ${req.method}`);
  console.log(`  URL:         ${req.url}`);
  console.log(`  Ruta base:   ${req.path}`);

  // Query params: lo que viene después del ?
  if (Object.keys(req.query).length > 0) {
    console.log(`  Query Params:`, req.query);
  }

  // Route params: lo que viene en la URL como :id
  if (Object.keys(req.params).length > 0) {
    console.log(`  Route Params:`, req.params);
  }

  // Headers relevantes de la petición
  console.log("  Headers relevantes:");
  if (req.headers["content-type"]) {
    console.log(`    Content-Type:  ${req.headers["content-type"]}`);
  }
  if (req.headers["authorization"]) {
    console.log(`    Authorization: ${req.headers["authorization"]}`);
  }
  console.log(`    User-Agent:    ${req.headers["user-agent"]?.slice(0, 50)}...`);

  // Body (solo en POST, PUT, PATCH)
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("  Body:", JSON.stringify(req.body, null, 2));
  }

  console.log("──────────────────────────────────────────");
  next();
});

// ────────────────────────────────────────────────────────
//  "Base de datos" en memoria para los ejemplos
// ────────────────────────────────────────────────────────
let usuarios = [
  { id: 1, nombre: "Juan Pérez",  email: "juan@email.com",  ciudad: "Cali",    activo: true  },
  { id: 2, nombre: "Ana García",  email: "ana@email.com",   ciudad: "Bogotá",  activo: true  },
  { id: 3, nombre: "Luis Torres", email: "luis@email.com",  ciudad: "Medellín",activo: false },
];
let contadorId = usuarios.length;

// ════════════════════════════════════════════════════════
//  GET / → Página de bienvenida con info de todas las rutas
// ════════════════════════════════════════════════════════
app.get("/", (req, res) => {
  // Agregamos headers personalizados a la RESPUESTA
  res.setHeader("X-Servidor", "Express-Investigacion");
  res.setHeader("X-Version",  "1.0.0");

  res.status(200).json({
    mensaje: "🌐 Investigación de Peticiones HTTP",
    descripcion: "Este servidor demuestra todos los métodos HTTP",
    metodosHTTP: {
      GET:    "Obtener/leer datos",
      POST:   "Crear nuevos datos",
      PUT:    "Actualizar datos COMPLETOS",
      PATCH:  "Actualizar datos PARCIALES",
      DELETE: "Eliminar datos",
    },
    rutasDePrueba: [
      "GET    /api/usuarios            → Listar todos",
      "GET    /api/usuarios/:id        → Obtener uno",
      "GET    /api/usuarios?ciudad=Cali→ Filtrar",
      "POST   /api/usuarios            → Crear",
      "PUT    /api/usuarios/:id        → Actualizar completo",
      "PATCH  /api/usuarios/:id        → Actualizar parcial",
      "DELETE /api/usuarios/:id        → Eliminar",
      "GET    /api/demo/headers        → Ver headers de tu petición",
      "GET    /api/demo/codigos/:codigo→ Ver qué significa un código",
    ],
  });
});

// ════════════════════════════════════════════════════════
//  DEMO: Ver los headers que envía el cliente
// ════════════════════════════════════════════════════════
app.get("/api/demo/headers", (req, res) => {
  res.status(200).json({
    mensaje: "Estos son los headers que enviaste en tu petición",
    tusHeaders: req.headers,
    headersDeLaRespuesta: {
      "Content-Type":  "application/json",
      "X-Servidor":    "Express-Investigacion",
    },
  });
});

// ════════════════════════════════════════════════════════
//  DEMO: Explicar qué significa un código de estado
// ════════════════════════════════════════════════════════
app.get("/api/demo/codigos/:codigo", (req, res) => {
  const codigo = parseInt(req.params.codigo);

  const codigos = {
    200: { nombre: "OK",                    familia: "2xx Éxito",         descripcion: "La petición se procesó correctamente" },
    201: { nombre: "Created",               familia: "2xx Éxito",         descripcion: "El recurso fue creado exitosamente" },
    204: { nombre: "No Content",            familia: "2xx Éxito",         descripcion: "Éxito pero sin contenido que devolver" },
    301: { nombre: "Moved Permanently",     familia: "3xx Redirección",   descripcion: "El recurso se movió de URL para siempre" },
    400: { nombre: "Bad Request",           familia: "4xx Error cliente", descripcion: "Datos mal enviados o formato incorrecto" },
    401: { nombre: "Unauthorized",          familia: "4xx Error cliente", descripcion: "No autenticado, debes iniciar sesión" },
    403: { nombre: "Forbidden",             familia: "4xx Error cliente", descripcion: "Autenticado pero sin permisos suficientes" },
    404: { nombre: "Not Found",             familia: "4xx Error cliente", descripcion: "El recurso no existe en esa URL" },
    409: { nombre: "Conflict",              familia: "4xx Error cliente", descripcion: "Conflicto, ej: el email ya está registrado" },
    500: { nombre: "Internal Server Error", familia: "5xx Error servidor",descripcion: "Error genérico del servidor" },
    503: { nombre: "Service Unavailable",   familia: "5xx Error servidor",descripcion: "Servidor caído o sobrecargado" },
  };

  const info = codigos[codigo];

  if (!info) {
    return res.status(404).json({
      mensaje: `Código ${codigo} no está en el diccionario de ejemplos`,
      codigosDisponibles: Object.keys(codigos).map(Number),
    });
  }

  // Respondemos CON ESE mismo código para que lo veas en Postman
  res.status(codigo === 404 ? 200 : codigo).json({
    codigo,
    ...info,
  });
});

// ════════════════════════════════════════════════════════
//  GET /api/usuarios → Lista todos (con filtro opcional)
// ════════════════════════════════════════════════════════
app.get("/api/usuarios", (req, res) => {
  const { ciudad, activo } = req.query;
  let resultado = [...usuarios];

  // Filtro por ciudad: GET /api/usuarios?ciudad=Cali
  if (ciudad) {
    resultado = resultado.filter(
      (u) => u.ciudad.toLowerCase() === ciudad.toLowerCase()
    );
  }

  // Filtro por activo: GET /api/usuarios?activo=true
  if (activo !== undefined) {
    const activoBool = activo === "true";
    resultado = resultado.filter((u) => u.activo === activoBool);
  }

  console.log(`  ✅ Respondiendo con ${resultado.length} usuario(s)`);

  res.status(200).json({
    metodo:      "GET",
    descripcion: "Obtener lista de usuarios",
    total:       resultado.length,
    filtros:     { ciudad, activo },
    datos:       resultado,
  });
});

// ════════════════════════════════════════════════════════
//  GET /api/usuarios/:id → Obtiene uno por ID
// ════════════════════════════════════════════════════════
app.get("/api/usuarios/:id", (req, res) => {
  // req.params.id viene como STRING, lo convertimos a número
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      metodo:  "GET",
      codigo:  400,
      mensaje: "El parámetro :id debe ser un número válido",
    });
  }

  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      metodo:  "GET",
      codigo:  404,
      mensaje: `No existe ningún usuario con id = ${id}`,
    });
  }

  console.log(`  ✅ Usuario encontrado: ${usuario.nombre}`);

  res.status(200).json({
    metodo:      "GET",
    descripcion: "Obtener un usuario específico por su ID",
    dato:        usuario,
  });
});

// ════════════════════════════════════════════════════════
//  POST /api/usuarios → Crea un nuevo usuario
//  Los datos llegan en el BODY de la petición
// ════════════════════════════════════════════════════════
app.post("/api/usuarios", (req, res) => {
  // req.body tiene los datos enviados en el body JSON
  const { nombre, email, ciudad } = req.body;

  // Validación
  const errores = [];
  if (!nombre || nombre.trim() === "") errores.push("El nombre es obligatorio");
  if (!email  || email.trim()  === "") errores.push("El email es obligatorio");
  if (!ciudad || ciudad.trim() === "") errores.push("La ciudad es obligatoria");
  if (email && usuarios.find((u) => u.email === email)) {
    errores.push(`El email '${email}' ya está registrado`);
  }

  if (errores.length > 0) {
    return res.status(400).json({
      metodo:  "POST",
      codigo:  400,
      mensaje: "Datos inválidos",
      errores,
    });
  }

  contadorId++;
  const nuevoUsuario = {
    id:     contadorId,
    nombre: nombre.trim(),
    email:  email.trim().toLowerCase(),
    ciudad: ciudad.trim(),
    activo: true,
  };

  usuarios.push(nuevoUsuario);

  console.log(`  ✅ Usuario creado: ${nuevoUsuario.nombre} (id: ${nuevoUsuario.id})`);

  // 201 = Created (recurso creado exitosamente)
  res.status(201).json({
    metodo:      "POST",
    descripcion: "Crear un nuevo usuario",
    mensaje:     "Usuario creado exitosamente",
    dato:        nuevoUsuario,
  });
});

// ════════════════════════════════════════════════════════
//  PUT /api/usuarios/:id → Actualiza COMPLETO
//  Reemplaza TODOS los campos del usuario
// ════════════════════════════════════════════════════════
app.put("/api/usuarios/:id", (req, res) => {
  const id    = parseInt(req.params.id);
  const idx   = usuarios.findIndex((u) => u.id === id);

  if (idx === -1) {
    return res.status(404).json({ mensaje: `Usuario con id=${id} no encontrado` });
  }

  const { nombre, email, ciudad, activo } = req.body;

  // PUT reemplaza todo — si no envían un campo, queda undefined
  const usuarioAnterior = { ...usuarios[idx] }; // Copia para mostrar diferencia
  usuarios[idx] = {
    id,
    nombre: nombre ?? usuarios[idx].nombre,
    email:  email  ?? usuarios[idx].email,
    ciudad: ciudad ?? usuarios[idx].ciudad,
    activo: activo !== undefined ? activo : usuarios[idx].activo,
  };

  console.log(`  ✅ Usuario actualizado (PUT): ${usuarios[idx].nombre}`);

  res.status(200).json({
    metodo:      "PUT",
    descripcion: "Actualización COMPLETA del usuario (reemplaza todos los campos)",
    antes:       usuarioAnterior,
    despues:     usuarios[idx],
  });
});

// ════════════════════════════════════════════════════════
//  PATCH /api/usuarios/:id → Actualiza PARCIALMENTE
//  Solo actualiza los campos que se envíen en el body
// ════════════════════════════════════════════════════════
app.patch("/api/usuarios/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex((u) => u.id === id);

  if (idx === -1) {
    return res.status(404).json({ mensaje: `Usuario con id=${id} no encontrado` });
  }

  const usuarioAnterior = { ...usuarios[idx] };

  // PATCH: solo actualiza lo que llega en el body, conserva lo demás
  // El operador spread (...) y la lógica ?? hacen esto posible
  usuarios[idx] = {
    ...usuarios[idx],  // Mantiene todos los campos originales
    ...req.body,       // Sobreescribe solo los que llegaron en el body
    id,                // El id NUNCA cambia
  };

  console.log(`  ✅ Usuario actualizado (PATCH): campos modificados =`, Object.keys(req.body));

  res.status(200).json({
    metodo:           "PATCH",
    descripcion:      "Actualización PARCIAL (solo los campos enviados)",
    camposModificados: Object.keys(req.body),
    antes:            usuarioAnterior,
    despues:          usuarios[idx],
  });
});

// ════════════════════════════════════════════════════════
//  DELETE /api/usuarios/:id → Elimina un usuario
// ════════════════════════════════════════════════════════
app.delete("/api/usuarios/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex((u) => u.id === id);

  if (idx === -1) {
    return res.status(404).json({ mensaje: `Usuario con id=${id} no encontrado` });
  }

  const eliminado = usuarios.splice(idx, 1)[0];

  console.log(`  ✅ Usuario eliminado: ${eliminado.nombre}`);

  // 200 con el recurso eliminado, o 204 sin body
  res.status(200).json({
    metodo:      "DELETE",
    descripcion: "Eliminar un usuario",
    mensaje:     `Usuario '${eliminado.nombre}' eliminado exitosamente`,
    dato:        eliminado,
    totalRestante: usuarios.length,
  });
});

// ════════════════════════════════════════════════════════
//  404 — Ruta no encontrada
// ════════════════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({
    codigo:  404,
    mensaje: `La ruta '${req.method} ${req.url}' no existe`,
  });
});

// ════════════════════════════════════════════════════════
//  Iniciar servidor
// ════════════════════════════════════════════════════════
app.listen(PUERTO, () => {
  console.log("\n========================================");
  console.log("  🌐 SERVIDOR DE PETICIONES HTTP");
  console.log("========================================");
  console.log(`  ✅ URL: http://localhost:${PUERTO}`);
  console.log("\n  Prueba en el navegador:");
  console.log(`  → http://localhost:${PUERTO}/api/usuarios`);
  console.log(`  → http://localhost:${PUERTO}/api/usuarios/1`);
  console.log(`  → http://localhost:${PUERTO}/api/usuarios?ciudad=Cali`);
  console.log(`  → http://localhost:${PUERTO}/api/demo/codigos/404`);
  console.log("\n  Ctrl + C para detener\n");
});