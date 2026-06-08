// ============================================================
//  📘 INVESTIGACIÓN #4 — ¿QUÉ ES EXPRESS.JS?
// ============================================================
//
//  Express.js (o simplemente "Express") es el FRAMEWORK WEB
//  más popular para Node.js. Fue creado por TJ Holowaychuk
//  en 2010 y actualmente es mantenido por la comunidad open source.
//  Es el paquete más descargado en toda la historia de npm.
//
//  ¿QUÉ ES UN FRAMEWORK?
//  ─────────────────────
//  Un framework es una "estructura pre-construida" de código que
//  establece cómo debes organizar y escribir tu aplicación.
//  Te da herramientas, convenciones y funcionalidades listas para
//  usar, para que no tengas que reinventar la rueda cada vez.
//
//  Diferencia entre librería y framework:
//  - LIBRERÍA: Tú llamas al código de la librería cuando lo necesitas.
//    Tú controlas el flujo del programa.
//    Ejemplo: lodash, moment.js
//
//  - FRAMEWORK: El framework llama a TU código cuando lo necesita.
//    El framework controla el flujo. Tú "rellenas los huecos".
//    Ejemplo: Express, Django, Rails
//    A esto se le llama "Inversión de Control" (IoC).
//
//  Express es técnicamente una librería muy delgada que actúa
//  como framework. Te da la estructura pero no te fuerza nada.
//  Por eso se llama "unopinionated" (sin opinión fuerte) — no
//  te dicta cómo organizar tu código más allá de lo básico.
//
//  ANALOGÍA:
//  ─────────
//  Construir un servidor web con Node.js puro (módulo http) es
//  como construir una casa desde los cimientos:
//  debes fabricar cada ladrillo, cada ventana, instalar la plomería.
//
//  Express es como comprar una casa prefabricada moderna:
//  ya tiene estructura, paredes, puerta, electricidad básica.
//  Tú solo eliges los muebles, el color de las paredes y agregas
//  las habitaciones específicas que necesitas.
//
//  ¿POR QUÉ NO USAR SOLO EL MÓDULO HTTP DE NODE.JS?
//  ──────────────────────────────────────────────────
//  Node.js incluye un módulo http para crear servidores, pero
//  es extremadamente primitivo. Mira la diferencia:
//
//  CON http PURO (sin Express):
//  ┌────────────────────────────────────────────────────┐
//  │  const http = require('http');                      │
//  │                                                    │
//  │  const server = http.createServer((req, res) => { │
//  │    if (req.method === 'GET' && req.url === '/') {  │
//  │      res.writeHead(200, {                          │
//  │        'Content-Type': 'application/json'          │
//  │      });                                           │
//  │      res.end(JSON.stringify({ ok: true }));        │
//  │    } else if (req.method === 'GET' &&              │
//  │               req.url === '/usuarios') {           │
//  │      // ... más código manual                      │
//  │    } else if (req.method === 'POST' &&             │
//  │               req.url === '/usuarios') {           │
//  │      // parsear el body manualmente...             │
//  │      let body = '';                                │
//  │      req.on('data', chunk => { body += chunk; });  │
//  │      req.on('end', () => {                         │
//  │        const data = JSON.parse(body);              │
//  │        // ... procesar datos                       │
//  │      });                                           │
//  │    }                                               │
//  │  });                                               │
//  │  server.listen(3000);                              │
//  └────────────────────────────────────────────────────┘
//
//  CON EXPRESS (mismo resultado, mucho menos código):
//  ┌────────────────────────────────────────────────────┐
//  │  const express = require('express');               │
//  │  const app = express();                            │
//  │  app.use(express.json());                          │
//  │                                                    │
//  │  app.get('/', (req, res) => {                      │
//  │    res.json({ ok: true });                         │
//  │  });                                               │
//  │                                                    │
//  │  app.get('/usuarios', (req, res) => { ... });      │
//  │                                                    │
//  │  app.post('/usuarios', (req, res) => {             │
//  │    const data = req.body; // automático            │
//  │    // ... procesar datos                           │
//  │  });                                               │
//  │                                                    │
//  │  app.listen(3000);                                 │
//  └────────────────────────────────────────────────────┘
//
//  Express hace por ti:
//  - Parsea el body automáticamente (con middleware)
//  - Maneja el routing de forma limpia
//  - Extrae parámetros de URL (:id)
//  - Extrae query params (?page=2)
//  - Gestiona el header Content-Type
//  - Provee métodos utilitarios en req y res
//
//  ¿QUÉ PROBLEMAS RESUELVE EXPRESS?
//  ──────────────────────────────────
//
//  1. 🛣️  ROUTING (Sistema de rutas):
//     Maneja diferentes URLs y métodos HTTP de forma limpia.
//     app.get('/ruta', handler)
//     app.post('/ruta', handler)
//     app.put('/ruta/:id', handler)
//     app.delete('/ruta/:id', handler)
//
//  2. 🔌 MIDDLEWARE:
//     Funciones intermedias que procesan peticiones en cadena.
//     Cada middleware puede leer/modificar req y res, luego
//     pasarle el control al siguiente con next().
//
//  3. 📝 PARÁMETROS Y QUERY STRINGS:
//     req.params  → /productos/:id → req.params.id
//     req.query   → /productos?categoria=tech → req.query.categoria
//     req.body    → JSON en el body → req.body.nombre
//
//  4. 🗂️  ARCHIVOS ESTÁTICOS:
//     app.use(express.static('public'))
//     Sirve imágenes, CSS, JS del frontend con una línea.
//
//  5. 🔒 INTEGRACIÓN SENCILLA:
//     Se integra fácilmente con mongoose, passport, jwt, etc.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES HTTP? — El protocolo de la web
//  ─────────────────────────────────────────────────────────
//
//  HTTP (HyperText Transfer Protocol) es el protocolo de
//  comunicación sobre el cual funciona la web. Define cómo
//  los clientes (navegadores, apps móviles, Postman) se
//  comunican con los servidores.
//
//  Cada comunicación HTTP tiene dos partes:
//
//  1. PETICIÓN (Request) — el cliente le pregunta algo al servidor:
//     - Método: GET, POST, PUT, DELETE, etc.
//     - URL: /api/productos/5
//     - Headers: información extra (Content-Type, Authorization, etc.)
//     - Body: datos enviados (solo en POST, PUT, PATCH)
//
//  2. RESPUESTA (Response) — el servidor le responde al cliente:
//     - Status Code: 200, 201, 400, 404, 500, etc.
//     - Headers: información extra (Content-Type, etc.)
//     - Body: los datos de la respuesta (HTML, JSON, imagen, etc.)
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES UNA API REST?
//  ─────────────────────────────────────────────────────────
//
//  REST = Representational State Transfer
//  No es un protocolo ni un estándar, es un ESTILO ARQUITECTÓNICO
//  para diseñar APIs. Fue definido por Roy Fielding en el año 2000
//  en su tesis doctoral.
//
//  Una API REST sigue estos principios:
//
//  1. CLIENTE-SERVIDOR: El frontend (cliente) y el backend (servidor)
//     están separados y se comunican solo por HTTP.
//     El servidor no sabe si el cliente es un navegador, una app
//     móvil o Postman. Solo recibe peticiones y envía respuestas.
//
//  2. SIN ESTADO (Stateless): Cada petición es INDEPENDIENTE.
//     El servidor no recuerda peticiones anteriores.
//     Si el usuario necesita estar autenticado, debe enviar su
//     token JWT en CADA petición. El servidor no guarda sesiones.
//
//  3. RECURSOS: Todo se modela como un "recurso" identificable por URL.
//     /api/productos        → el recurso "productos" (colección)
//     /api/productos/5      → el recurso "producto con id 5" (item)
//     /api/usuarios/3/tareas → tareas del usuario 3 (recurso anidado)
//
//  4. MÉTODOS HTTP SEMÁNTICOS: Cada acción usa el método correcto.
//     GET    → solo LEER datos (nunca modifica nada)
//     POST   → CREAR un nuevo recurso
//     PUT    → REEMPLAZAR un recurso completo
//     PATCH  → MODIFICAR campos específicos de un recurso
//     DELETE → ELIMINAR un recurso
//
//  5. RESPUESTAS CON STATUS CODES: El código HTTP indica el resultado.
//     No respondas 200 OK cuando hubo un error. Usa el código correcto.
//
//  ─────────────────────────────────────────────────────────
//  MÉTODOS HTTP — La semántica de las acciones
//  ─────────────────────────────────────────────────────────
//
//  GET    → LEER. Obtener datos. NUNCA modifica nada en el servidor.
//           Idempotente: llamarlo 1 vez o 100 veces da el mismo resultado.
//           El navegador puede cachear respuestas GET.
//           Ejemplo: "dame todos los productos", "dame el producto 5"
//
//  POST   → CREAR. Envía datos para crear un nuevo recurso.
//           NO es idempotente: llamarlo 2 veces crea 2 recursos.
//           El body contiene los datos del nuevo recurso (JSON).
//           Ejemplo: "crea este nuevo producto con estos datos"
//
//  PUT    → REEMPLAZAR COMPLETAMENTE. Envía el recurso entero.
//           Si omites un campo, ese campo se borra o queda en null.
//           Idempotente: llamarlo múltiples veces tiene el mismo resultado.
//           Ejemplo: "reemplaza el producto 5 con exactamente estos datos"
//
//  PATCH  → ACTUALIZAR PARCIALMENTE. Solo envías los campos a cambiar.
//           Los campos que no envías se mantienen como estaban.
//           Ejemplo: "al producto 5 solo cámbiale el precio"
//
//  DELETE → ELIMINAR. Borra el recurso especificado.
//           Idempotente: eliminar algo ya eliminado sigue siendo "ok".
//           Ejemplo: "elimina el producto 5"
//
//  ─────────────────────────────────────────────────────────
//  CÓDIGOS DE ESTADO HTTP — El lenguaje de las respuestas
//  ─────────────────────────────────────────────────────────
//
//  Los códigos se agrupan por rango. El primer dígito indica la categoría:
//
//  1xx — INFORMATIVOS (raramente usados en APIs)
//    100 Continue     → El servidor recibió los headers, continúa enviando.
//
//  2xx — ÉXITO
//    200 OK           → La petición fue exitosa. Respuesta estándar.
//    201 Created      → Recurso creado exitosamente (tras POST).
//    204 No Content   → Éxito pero no hay nada que devolver (tras DELETE).
//
//  3xx — REDIRECCIONES
//    301 Moved Permanently → La URL cambió permanentemente.
//    304 Not Modified      → Usa la versión en caché del navegador.
//
//  4xx — ERRORES DEL CLIENTE (el cliente envió algo mal)
//    400 Bad Request      → Datos mal formados, faltan campos, validación falló.
//    401 Unauthorized     → No está autenticado. Necesita iniciar sesión.
//    403 Forbidden        → Autenticado pero sin permisos para esto.
//    404 Not Found        → El recurso no existe en el servidor.
//    409 Conflict         → Conflicto: email ya registrado, nombre duplicado.
//    422 Unprocessable    → Datos bien formados pero con errores de lógica.
//    429 Too Many Requests → Rate limit excedido.
//
//  5xx — ERRORES DEL SERVIDOR (el cliente no tiene culpa)
//    500 Internal Server Error → Error inesperado en el servidor (bug).
//    502 Bad Gateway           → El servidor detrás no responde.
//    503 Service Unavailable   → Servidor caído o sobrecargado.
//
//  REGLA IMPORTANTE:
//  Siempre usa el código correcto. Un 200 con { error: true } en el body
//  es una mala práctica. Los clientes leen el status code primero. 
//  para este caso usamos 422,
//  que indica que el formato del body es correcto pero hay errores de validación.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES MIDDLEWARE EN EXPRESS? — El corazón del framework
//  ─────────────────────────────────────────────────────────
//
//  Un middleware es simplemente una FUNCIÓN que Express ejecuta
//  durante el ciclo de vida de una petición HTTP, antes de que
//  llegue al manejador final de la ruta.
//
//  La firma de un middleware es siempre la misma:
//  function nombreMiddleware(req, res, next) { ... }
//
//  Los tres parámetros:
//  - req  → El objeto Request: toda la información de la petición
//           (URL, método, headers, body, params, query, etc.)
//  - res  → El objeto Response: los métodos para enviar la respuesta
//           (res.json, res.send, res.status, res.redirect, etc.)
//  - next → Una función que llama al SIGUIENTE middleware en la cadena.
//           Si no llamas next(), la petición se queda atascada.
//           Si llamas next(error), salta al middleware de errores.
//
//  El flujo completo de una petición en Express:
//
//  Petición HTTP entrante
//       ↓
//  Middleware 1 (express.json)  → parsea el body
//       ↓  next()
//  Middleware 2 (logger)        → registra la petición
//       ↓  next()
//  Middleware 3 (auth)          → verifica el token JWT
//       ↓  next()
//  Ruta específica              → procesa la lógica del negocio
//       ↓
//  Respuesta HTTP al cliente
//
//  Si algún middleware NO llama next(), la cadena se DETIENE AHÍ.
//  Por ejemplo, el middleware de autenticación puede llamar
//  res.status(401).json({error: 'no autorizado'}) y NO llamar
//  next() — así la petición nunca llega a la ruta protegida.
//
//  TIPOS DE MIDDLEWARE:
//  1. Global: app.use(fn) → se ejecuta en TODAS las peticiones
//  2. De ruta: app.use('/api', fn) → solo en rutas que empiecen con /api
//  3. De ruta específica: app.get('/ruta', fn1, fn2, handler) → múltiples
//  4. De manejo de errores: (err, req, res, next) → 4 parámetros
//
// ============================================================
//  🧪 EJEMPLOS PRÁCTICOS — Servidor Express completo
// ============================================================
//
//  INSTRUCCIONES PARA EJECUTAR:
//  ──────────────────────────────
//  1. Abre la terminal en VS Code (Ctrl + ñ)
//  2. Navega a la carpeta del proyecto:
//       cd investigacion_nodejs
//  3. Inicializa npm (si no lo has hecho):
//       npm init -y
//  4. Instala Express:
//       npm install express
//  5. Ejecuta este archivo:
//       node 04_express.js
//  6. Abre tu navegador en:
//       http://localhost:3000
//  7. Prueba las rutas en el navegador (GET) o con Postman (POST/PUT/DELETE)
//  8. Para detener el servidor: Ctrl + C
//
//  ¿QUÉ ES POSTMAN?
//  ─────────────────
//  Postman es una aplicación gratuita para probar APIs.
//  Con el navegador solo puedes hacer peticiones GET (escribiendo la URL).
//  Para hacer POST, PUT o DELETE necesitas una herramienta como Postman
//  que te permite elegir el método y enviar un body JSON.
//  Descárgalo gratis en: https://www.postman.com/downloads/
//
//  RUTAS DISPONIBLES:
//  ──────────────────
//  GET    http://localhost:3000/               → Página de bienvenida
//  GET    http://localhost:3000/api/info       → Info del servidor
//  GET    http://localhost:3000/api/productos  → Lista todos los productos
//  GET    http://localhost:3000/api/productos?categoria=electronica → filtro
//  GET    http://localhost:3000/api/productos/1 → Producto con ID 1
//  POST   http://localhost:3000/api/productos  → Crear producto (Postman)
//  PATCH  http://localhost:3000/api/productos/1 → Actualizar campos (Postman)
//  PUT    http://localhost:3000/api/productos/1 → Reemplazar completo (Postman)
//  DELETE http://localhost:3000/api/productos/1 → Eliminar producto (Postman)
//
// ============================================================

"use strict";

// ─────────────────────────────────────────────────────────
//  IMPORTACIONES
// ─────────────────────────────────────────────────────────
const express = require("express");
// Importamos el framework Express. require() lo busca en node_modules/.
// Si no está instalado, da error: "Cannot find module 'express'".
// Solución: npm install express

// ─────────────────────────────────────────────────────────
//  CREACIÓN DE LA APLICACIÓN EXPRESS
// ─────────────────────────────────────────────────────────
const app = express();
// express() es una función fábrica que devuelve una instancia de
// la aplicación Express. Por convención siempre se llama 'app'.
// Este objeto 'app' es el corazón de tu servidor — en él defines
// middlewares, rutas, configuración, y lo usas para iniciar el servidor.
//
// ¿Qué es 'app' internamente?
// Es un objeto que internamente es también una función de Node.js
// compatible con el módulo http. Por eso app.listen() funciona —
// Express usa http.createServer(app) internamente.

const PUERTO = process.env.PORT || 3000;
// El puerto es el número que identifica qué programa recibe las conexiones.
// Tu computadora tiene 65535 puertos disponibles.
// Puerto 80  → HTTP estándar (navegadores van aquí por defecto)
// Puerto 443 → HTTPS estándar
// Puerto 3000, 4000, 5000 → puertos de desarrollo (convención)
//
// process.env.PORT || 3000:
// En producción (Heroku, Railway, AWS) la plataforma asigna el puerto
// automáticamente via variable de entorno PORT.
// En desarrollo local, PORT no está definido, así que usamos 3000.
// El operador || (OR) devuelve el lado derecho si el izquierdo es falsy.

// ─────────────────────────────────────────────────────────
//  BASE DE DATOS EN MEMORIA (simulada)
//  En un proyecto real, esto vendría de MongoDB con Mongoose.
//  Usamos un array en memoria para no necesitar MongoDB aquí.
// ─────────────────────────────────────────────────────────
let productos = [
  {
    id: 1,
    nombre: "Laptop HP",
    precio: 2500000,
    categoria: "electronica",
    stock: 15,
    creadoEn: new Date("2024-01-15").toISOString(),
  },
  {
    id: 2,
    nombre: "Mouse Inalámbrico",
    precio: 85000,
    categoria: "accesorios",
    stock: 50,
    creadoEn: new Date("2024-01-20").toISOString(),
  },
  {
    id: 3,
    nombre: "Teclado Mecánico",
    precio: 320000,
    categoria: "accesorios",
    stock: 30,
    creadoEn: new Date("2024-02-01").toISOString(),
  },
  {
    id: 4,
    nombre: 'Monitor 27"',
    precio: 1200000,
    categoria: "electronica",
    stock: 8,
    creadoEn: new Date("2024-02-10").toISOString(),
  },
  {
    id: 5,
    nombre: "Silla Ergonómica",
    precio: 890000,
    categoria: "mobiliario",
    stock: 12,
    creadoEn: new Date("2024-03-05").toISOString(),
  },
];

let contadorIds = productos.length;
// contadorIds rastrea el último ID asignado para auto-incrementar.
// En MongoDB, los IDs son ObjectId generados automáticamente.
// Aquí lo hacemos manual para no depender de MongoDB.
// Problema: si eliminas el producto con id=4, el siguiente producto
// creado tendrá id=6 (el contador sigue avanzando). Es un gap normal.


// ════════════════════════════════════════════════════════════
//  MIDDLEWARES GLOBALES
//  Se ejecutan en TODAS las peticiones, antes de cualquier ruta.
//  El ORDEN importa: se ejecutan de arriba hacia abajo.
// ════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────
//  MIDDLEWARE 1: express.json() — parsear el body JSON
// ─────────────────────────────────────────────────────────
app.use(express.json());
// Este middleware intercepta peticiones donde el Content-Type
// del header sea 'application/json' y parsea el body automáticamente.
//
// SIN este middleware:
//   req.body → undefined  (no puedes acceder a los datos enviados)
//
// CON este middleware:
//   req.body → { nombre: "Laptop", precio: 2500000, ... }
//
// ¿Cómo funciona por dentro?
// Cuando llega una petición POST con body JSON, los datos vienen
// como un stream de bytes. express.json() lee ese stream, lo
// convierte a string, lo parsea con JSON.parse() y lo asigna
// a req.body. Todo esto antes de que llegue a tu ruta.
//
// app.use() sin ruta específica → aplica el middleware a TODAS las rutas.
// app.use('/api', express.json()) → solo aplica a rutas que empiecen con /api.

// ─────────────────────────────────────────────────────────
//  MIDDLEWARE 2: express.urlencoded() — formularios HTML
// ─────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
// Parsea datos de formularios HTML (Content-Type: application/x-www-form-urlencoded).
// Este es el formato que usan los formularios HTML normales (<form method="POST">).
//
// { extended: true } → usa la librería 'qs' para parsear, que soporta
// objetos y arrays anidados en el body.
// { extended: false } → usa el módulo 'querystring' nativo, más simple.
//
// En APIs modernas que usan JSON, este middleware es menos crítico.
// Pero si tu API acepta datos de formularios HTML, lo necesitas.

// ─────────────────────────────────────────────────────────
//  MIDDLEWARE 3: Logger personalizado
// ─────────────────────────────────────────────────────────
app.use((req, res, next) => {
  // Esta función es un middleware propio (personalizado).
  // Express la reconoce como middleware porque tiene la firma
  // (req, res, next) — tres parámetros en ese orden.
  //
  // Este middleware REGISTRA cada petición que llega al servidor.
  // En producción usarías el paquete 'morgan' para esto, que es
  // más completo. Aquí lo hacemos manual para entender cómo funciona.

  const ahora = new Date().toLocaleTimeString("es-CO");
  // toLocaleTimeString("es-CO") formatea la hora en español colombiano.
  // Resultado: "10:35:22 a. m."

  const metodo = req.method.padEnd(7);
  // req.method → el método HTTP de la petición: "GET", "POST", etc.
  // .padEnd(7) → rellena con espacios hasta 7 caracteres para alinear.
  // "GET    " (7 chars), "POST   " (7 chars), "DELETE " (7 chars)

  const url = req.url;
  // req.url → la URL de la petición, incluyendo query params.
  // Ejemplo: "/api/productos?categoria=electronica"

  console.log(`[${ahora}] ${metodo} ${url}`);
  // Imprime algo como: [10:35:22 a. m.] GET     /api/productos

  next();
  // FUNDAMENTAL: llama al siguiente middleware o ruta.
  // Si no llamas next(), la petición se queda aquí para siempre.
  // El cliente nunca recibiría respuesta → timeout.
  // Regla: en middlewares que no son el final de la cadena,
  // SIEMPRE llama next() al terminar.
});

// ─────────────────────────────────────────────────────────
//  MIDDLEWARE 4: Temporizador de peticiones
// ─────────────────────────────────────────────────────────
app.use((req, res, next) => {
  // Este middleware mide cuánto tiempo tarda cada petición.
  // Es muy útil para identificar rutas lentas (performance).
  //
  // Técnica: guardamos el tiempo de inicio en req para que
  // esté disponible en los middlewares siguientes.
  // req es el mismo objeto a lo largo de toda la cadena —
  // puedes agregarle propiedades personalizadas.

  req.tiempoInicio = Date.now();
  // Date.now() → milisegundos desde el 1 enero 1970 (Unix timestamp).
  // Lo guardamos en req para poder accederlo después.

  res.on("finish", () => {
    // El evento "finish" del objeto response se dispara cuando
    // Express termina de enviar la respuesta al cliente.
    // Usamos este evento para calcular el tiempo total DESPUÉS
    // de que la ruta terminó de procesar.

    const duracion = Date.now() - req.tiempoInicio;
    // Diferencia entre el tiempo actual y el tiempo de inicio.
    // Da los milisegundos que tardó procesar la petición.

    const estado = res.statusCode;
    // res.statusCode → el código HTTP que se envió en la respuesta.

    const emoji = estado >= 400 ? "❌" : "✅";
    console.log(`   ${emoji} ${estado} | ${duracion}ms`);
  });

  next();
  // next() se llama INMEDIATAMENTE (no dentro del evento finish).
  // El middleware registra el listener del evento y CONTINÚA la cadena.
  // El listener se ejecutará más tarde cuando la respuesta termine.
});


// ════════════════════════════════════════════════════════════
//  FUNCIONES AUXILIARES (helpers)
//  Funciones reutilizables para mantener las rutas más limpias.
// ════════════════════════════════════════════════════════════

function validarProducto(datos, esActualizacion = false) {
  // Esta función centraliza la validación de datos de producto.
  // Recibe los datos y un flag para saber si es creación o actualización.
  // Devuelve un array de mensajes de error (vacío si todo está bien).
  //
  // Separar la validación en funciones auxiliares es una buena práctica:
  // - Las rutas quedan más cortas y legibles
  // - La lógica de validación se puede reutilizar
  // - Es más fácil de testear unitariamente

  const errores = [];
  const { nombre, precio, categoria, stock } = datos;

  if (!esActualizacion || nombre !== undefined) {
    // En CREACIÓN: nombre es obligatorio siempre.
    // En ACTUALIZACIÓN PARCIAL (PATCH): solo validamos si se envió.
    if (!nombre || nombre.trim() === "") {
      errores.push("El nombre del producto es obligatorio");
    } else if (nombre.trim().length < 3) {
      errores.push("El nombre debe tener al menos 3 caracteres");
    } else if (nombre.trim().length > 100) {
      errores.push("El nombre no puede superar los 100 caracteres");
    }
  }

  if (!esActualizacion || precio !== undefined) {
    if (precio === undefined || precio === null || precio === "") {
      if (!esActualizacion) errores.push("El precio es obligatorio");
    } else if (isNaN(Number(precio))) {
      errores.push("El precio debe ser un número válido");
    } else if (Number(precio) <= 0) {
      errores.push("El precio debe ser mayor a 0");
    } else if (Number(precio) > 1000000000) {
      errores.push("El precio no puede superar 1.000.000.000");
    }
  }

  if (!esActualizacion || categoria !== undefined) {
    const categoriasValidas = ["electronica", "accesorios", "mobiliario", "software", "otros"];
    if (!categoria || categoria.trim() === "") {
      if (!esActualizacion) errores.push("La categoría es obligatoria");
    } else if (!categoriasValidas.includes(categoria.trim().toLowerCase())) {
      errores.push(`Categoría inválida. Válidas: ${categoriasValidas.join(", ")}`);
    }
  }

  if (!esActualizacion || stock !== undefined) {
    if (stock === undefined || stock === null || stock === "") {
      if (!esActualizacion) errores.push("El stock es obligatorio");
    } else if (isNaN(Number(stock))) {
      errores.push("El stock debe ser un número válido");
    } else if (Number(stock) < 0) {
      errores.push("El stock no puede ser negativo");
    } else if (!Number.isInteger(Number(stock))) {
      errores.push("El stock debe ser un número entero (sin decimales)");
    }
  }

  return errores;
}

function formatearPrecio(numero) {
  // Formatea un número como precio colombiano.
  // 2500000 → "$2.500.000"
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(numero);
  // Intl.NumberFormat es la API estándar de JavaScript para formatear
  // números según una localización y estilo específicos.
}


// ════════════════════════════════════════════════════════════
//  RUTAS — PÁGINA DE INICIO
// ════════════════════════════════════════════════════════════

app.get("/", (req, res) => {
  // app.get(ruta, callback) registra un manejador para peticiones GET.
  // Cuando llegue una petición GET a "/", Express ejecuta esta función.
  //
  // El callback recibe (req, res):
  // req (Request)  → toda la info de la petición que llegó
  // res (Response) → métodos para construir y enviar la respuesta
  //
  // res.send() → envía cualquier tipo de respuesta.
  // Si le pasas un string HTML, establece Content-Type: text/html.
  // Si le pasas un objeto, lo serializa a JSON (como res.json()).

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Tienda Virtual</title>
        <style>       //  Los estilos en html es mala práctica, pero lo hacemos aquí para no depender de archivos externos
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Segoe UI', system-ui, sans-serif;
          background: #0f172a;
          color: #e2e8f0;
          min-height: 100vh;
          padding: 40px 20px;
        }
        .contenedor { max-width: 800px; margin: 0 auto; }
        header {
          text-align: center;
          margin-bottom: 40px;
          padding: 30px;
          background: linear-gradient(135deg, #1e293b, #334155);
          border-radius: 16px;
          border: 1px solid #475569;
        }
        header h1 { font-size: 2em; color: #38bdf8; margin-bottom: 8px; }
        header p { color: #94a3b8; font-size: 0.95em; }
        .badge {
          display: inline-block;
          background: #22c55e;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8em;
          margin-top: 12px;
        }
        section {
          background: #1e293b;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 20px;
          border: 1px solid #334155;
        }
        section h2 { color: #7dd3fc; margin-bottom: 16px; font-size: 1.1em; }
        .ruta {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          margin: 6px 0;
          background: #0f172a;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-size: 0.88em;
        }
        .metodo {
          min-width: 65px;
          text-align: center;
          padding: 3px 8px;
          border-radius: 5px;
          font-weight: 700;
          font-size: 0.8em;
        }
        .GET    { background: #166534; color: #86efac; }
        .POST   { background: #1e3a5f; color: #93c5fd; }
        .PUT    { background: #78350f; color: #fcd34d; }
        .PATCH  { background: #4a1d96; color: #c4b5fd; }
        .DELETE { background: #7f1d1d; color: #fca5a5; }
        .url { color: #94a3b8; }
        .desc { color: #64748b; margin-left: auto; font-size: 0.85em; font-family: sans-serif; }
        a { color: #38bdf8; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .links a {
          display: inline-block;
          margin: 4px 8px 4px 0;
          background: #1e40af;
          color: #bfdbfe;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.88em;
          font-family: monospace;
        }
        .links a:hover { background: #1d4ed8; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="contenedor">
        <header>
          <h1>🚀 API Tienda Virtual</h1>
          <p>Servidor Express funcionando sobre Node.js ${process.version}</p>
          <div class="badge">● EN LÍNEA</div>
        </header>

        <section>
          <h2>📋 Endpoints Disponibles</h2>

          <div class="ruta"><span class="metodo GET">GET</span><span class="url">/api/info</span><span class="desc">Info del servidor</span></div>
          <div class="ruta"><span class="metodo GET">GET</span><span class="url">/api/productos</span><span class="desc">Listar todos</span></div>
          <div class="ruta"><span class="metodo GET">GET</span><span class="url">/api/productos?categoria=electronica</span><span class="desc">Filtrar por categoría</span></div>
          <div class="ruta"><span class="metodo GET">GET</span><span class="url">/api/productos?orden=precio_asc</span><span class="desc">Ordenar resultados</span></div>
          <div class="ruta"><span class="metodo GET">GET</span><span class="url">/api/productos/:id</span><span class="desc">Obtener uno por ID</span></div>
          <div class="ruta"><span class="metodo POST">POST</span><span class="url">/api/productos</span><span class="desc">Crear producto</span></div>
          <div class="ruta"><span class="metodo PUT">PUT</span><span class="url">/api/productos/:id</span><span class="desc">Reemplazar completo</span></div>
          <div class="ruta"><span class="metodo PATCH">PATCH</span><span class="url">/api/productos/:id</span><span class="desc">Actualizar campos</span></div>
          <div class="ruta"><span class="metodo DELETE">DELETE</span><span class="url">/api/productos/:id</span><span class="desc">Eliminar</span></div>
        </section>

        <section>
          <h2>🔗 Prueba en el navegador (solo GET)</h2>
          <div class="links">
            <a href="/api/info">/api/info</a>
            <a href="/api/productos">/api/productos</a>
            <a href="/api/productos/1">/api/productos/1</a>
            <a href="/api/productos?categoria=electronica">?categoria=electronica</a>
            <a href="/api/productos?orden=precio_asc">?orden=precio_asc</a>
            <a href="/api/productos?pagina=1&limite=2">?pagina=1&limite=2</a>
          </div>
        </section>

        <section>
          <h2>📦 Ejemplo para Postman — Crear producto (POST)</h2>
          <pre style="background:#0f172a;padding:16px;border-radius:8px;font-size:0.85em;color:#a5f3fc;overflow-x:auto">
URL: POST http://localhost:${PUERTO}/api/productos
Header: Content-Type: application/json

Body (JSON):
{
  "nombre": "Auriculares Sony",
  "precio": 450000,
  "categoria": "electronica",
  "stock": 25
}
          </pre>
        </section>
      </div>
    </body>
    </html>
  `);
});


// ════════════════════════════════════════════════════════════
//  RUTA: GET /api/info — Información del servidor
// ════════════════════════════════════════════════════════════

app.get("/api/info", (req, res) => {
  // res.json() serializa el objeto JavaScript a JSON y lo envía.
  // Automáticamente establece el header: Content-Type: application/json
  // Es equivalente a:
  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(JSON.stringify({ ... }));
  // Pero mucho más limpio.
  //
  // res.status(200) establece el código HTTP de la respuesta.
  // .json() es el método que realmente envía.
  // Se pueden encadenar: res.status(200).json({ ... })
  // Si no llamas res.status(), Express usa 200 por defecto.

  const uptimeSegundos = Math.floor(process.uptime());
  // process.uptime() → segundos desde que arrancó el proceso Node.js.
  // Math.floor() → redondea hacia abajo al entero más cercano.
  // Si el servidor lleva 95.7 segundos arriba → 95 segundos.

  const uptimeFormateado = `${Math.floor(uptimeSegundos / 60)}min ${uptimeSegundos % 60}seg`;
  // Convertimos segundos a formato "Xmin Yseg".
  // Math.floor(95 / 60) = 1 minuto
  // 95 % 60 = 35 segundos
  // Resultado: "1min 35seg"

  res.status(200).json({
    mensaje: "API de Tienda Virtual funcionando",
    version: "1.0.0",
    entorno: process.env.NODE_ENV || "development",
    nodejsVersion: process.version,
    uptimeServidor: uptimeFormateado,
    fechaHora: new Date().toLocaleString("es-CO"),
    totalProductos: productos.length,
    categorias: [...new Set(productos.map((p) => p.categoria))],
    // [...new Set(...)] elimina duplicados:
    // productos.map(p => p.categoria) → ['electronica', 'accesorios', 'accesorios', ...]
    // new Set([...]) → Set {'electronica', 'accesorios', 'mobiliario'} (sin duplicados)
    // [...Set] → convierte el Set a array nuevamente
    // Resultado: ['electronica', 'accesorios', 'mobiliario']
    endpoints: {
      listar:    "GET /api/productos",
      filtrar:   "GET /api/productos?categoria=electronica",
      paginar:   "GET /api/productos?pagina=1&limite=10",
      obtener:   "GET /api/productos/:id",
      crear:     "POST /api/productos",
      reemplazar:"PUT /api/productos/:id",
      actualizar:"PATCH /api/productos/:id",
      eliminar:  "DELETE /api/productos/:id",
    },
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: GET /api/productos — Listar con filtros, orden y paginación
// ════════════════════════════════════════════════════════════

app.get("/api/productos", (req, res) => {
  // req.query contiene todos los parámetros que vienen después del '?'
  // en la URL. Express los parsea automáticamente como objeto.
  //
  // URL: /api/productos?categoria=electronica&orden=precio_asc&pagina=1&limite=2
  // req.query → { categoria: 'electronica', orden: 'precio_asc', pagina: '1', limite: '2' }
  //
  // IMPORTANTE: todos los valores de req.query son STRINGS.
  // Si necesitas números, debes convertirlos: Number(req.query.pagina)

  const { categoria, orden, pagina, limite, buscar } = req.query;

  let resultado = [...productos];
  // Hacemos una COPIA del array con spread [...] para no modificar el original.
  // Si hiciéramos: let resultado = productos;
  // resultado y productos apuntarían al MISMO array en memoria.
  // Al filtrar/ordenar resultado, también cambiaríamos productos.
  // Con [...productos] creamos una copia independiente.

  // ── FILTRO por categoría ──
  if (categoria) {
    resultado = resultado.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );
    // .filter() devuelve un nuevo array con solo los elementos que pasan la condición.
    // La comparación en lowercase hace el filtro case-insensitive:
    // "Electronica" y "electronica" y "ELECTRONICA" dan el mismo resultado "electronica".
  }

  // ── BÚSQUEDA por nombre ──
  if (buscar) {
    resultado = resultado.filter((p) =>
      p.nombre.toLowerCase().includes(buscar.toLowerCase())
    );
    // .includes() verifica si un string contiene otro string.
    // Búsqueda: "lap" encontraría "Laptop HP" y "Laptop Lenovo".
    // En MongoDB usarías una búsqueda de texto o regex.
  }

  // ── ORDENAMIENTO ──
  if (orden) {
    const ordenesValidos = {
      precio_asc:  (a, b) => a.precio - b.precio,
      precio_desc: (a, b) => b.precio - a.precio,
      nombre_asc:  (a, b) => a.nombre.localeCompare(b.nombre),
      nombre_desc: (a, b) => b.nombre.localeCompare(a.nombre),
      stock_asc:   (a, b) => a.stock - b.stock,
      stock_desc:  (a, b) => b.stock - a.stock,
    };
    // Definimos las funciones comparadoras para cada tipo de orden.
    // Array.sort() necesita una función que devuelva:
    //   negativo → a va antes que b
    //   positivo → b va antes que a
    //   0        → mismo orden
    //
    // Para números: a.precio - b.precio
    //   Si a=100 y b=200 → 100-200 = -100 (negativo) → a va primero (ascendente)
    //
    // Para strings: localeCompare() hace comparación correcta de strings
    //   incluyendo caracteres especiales como tildes y ñ.

    if (ordenesValidos[orden]) {
      resultado.sort(ordenesValidos[orden]);
    }
    // Si el orden solicitado no existe en el objeto, simplemente no ordenamos.
    // No es un error — el cliente recibe los datos sin orden específico.
  }

  // ── PAGINACIÓN ──
  const limitePorPagina = Math.min(Number(limite) || 10, 50);
  // Number(limite) → convierte el string "5" al número 5.
  // Si limite no se envió, Number(undefined) = NaN, y NaN || 10 = 10.
  // Math.min(..., 50) → limita el máximo a 50 items por página.
  // Esto previene que alguien pida limite=10000 y sobrecargue el servidor.

  const paginaActual = Math.max(Number(pagina) || 1, 1);
  // Si no se envía pagina, usamos 1.
  // Math.max(..., 1) → la página mínima es 1 (no puede ser 0 o negativa).

  const totalItems = resultado.length;
  const totalPaginas = Math.ceil(totalItems / limitePorPagina);
  // Math.ceil() redondea HACIA ARRIBA.
  // Si hay 25 items y 10 por página → Math.ceil(25/10) = 3 páginas.
  // (La tercera página solo tiene 5 items.)

  const inicio = (paginaActual - 1) * limitePorPagina;
  const fin = inicio + limitePorPagina;
  // Para página 1: inicio=0, fin=10 → items 0 a 9
  // Para página 2: inicio=10, fin=20 → items 10 a 19
  // Para página 3: inicio=20, fin=30 → items 20 a 29 (o hasta el final)

  const resultadoPaginado = resultado.slice(inicio, fin);
  // Array.slice(inicio, fin) → extrae una porción del array.
  // No modifica el array original. Devuelve un nuevo array.

  res.status(200).json({
    exito: true,
    paginacion: {
      paginaActual,
      totalPaginas,
      totalItems,
      itemsPorPagina: limitePorPagina,
      hayPaginaSiguiente: paginaActual < totalPaginas,
      hayPaginaAnterior:  paginaActual > 1,
    },
    filtros: { categoria: categoria || null, buscar: buscar || null, orden: orden || null },
    datos: resultadoPaginado,
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: GET /api/productos/:id — Obtener UN producto
// ════════════════════════════════════════════════════════════

app.get("/api/productos/:id", (req, res) => {
  // :id en la definición de la ruta es un PARÁMETRO de ruta (route parameter).
  // El ":" le dice a Express que esa parte de la URL es variable.
  //
  // Cuando la URL es: /api/productos/3
  // req.params → { id: '3' }
  //
  // Cuando la URL es: /api/categorias/:categoria/productos/:id
  // y la URL real es: /api/categorias/electronica/productos/5
  // req.params → { categoria: 'electronica', id: '5' }
  //
  // NOTA: los valores de req.params son siempre STRINGS, no números.
  // Por eso usamos parseInt() o Number() para convertir.

  const id = parseInt(req.params.id);
  // parseInt() convierte un string a número entero.
  // parseInt("5") → 5
  // parseInt("5.7") → 5 (ignora decimales)
  // parseInt("abc") → NaN (Not a Number, si no es un número)

  if (isNaN(id)) {
    // isNaN() devuelve true si el valor NO es un número válido.
    // Si alguien pide /api/productos/abc, id sería NaN.
    // Respondemos con 400 Bad Request — el cliente envió algo inválido.
    return res.status(400).json({
      exito: false,
      mensaje: "El ID debe ser un número entero válido",
      ejemplo: "GET /api/productos/1",
    });
    // return es fundamental aquí para DETENER la ejecución de la función.
    // Sin return, la función continuaría ejecutando el código siguiente
    // incluso después de enviar una respuesta, lo que causaría:
    // "Error: Cannot set headers after they are sent to the client"
  }

  const producto = productos.find((p) => p.id === id);
  // Array.find() recorre el array y devuelve el PRIMER elemento
  // que cumple la condición. Si ninguno cumple, devuelve undefined.
  //
  // La condición es: el id del producto (número) sea igual al id buscado.
  // Usamos === (estricto) para verificar tanto valor como tipo.

  if (!producto) {
    return res.status(404).json({
      exito: false,
      mensaje: `No existe ningún producto con ID ${id}`,
      sugerencia: "Consulta GET /api/productos para ver los IDs disponibles",
    });
  }

  res.status(200).json({
    exito: true,
    dato: {
      ...producto,
      // El spread operator ... copia todas las propiedades de producto.
      precioFormateado: formatearPrecio(producto.precio),
      // Agregamos el precio formateado como campo extra sin modificar el original.
      estadoStock:
        producto.stock === 0
          ? "agotado"
          : producto.stock <= 5
          ? "últimas unidades"
          : "disponible",
      // Calculamos el estado del stock dinámicamente.
      // Operador ternario anidado:
      // si stock es 0 → "agotado"
      // si no, si stock <= 5 → "últimas unidades"
      // si no → "disponible"
    },
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: POST /api/productos — Crear un nuevo producto
// ════════════════════════════════════════════════════════════

app.post("/api/productos", (req, res) => {
  // req.body contiene los datos que el cliente envió en el body.
  // Solo está disponible porque pusimos el middleware express.json() arriba.
  //
  // El cliente debe enviar un JSON como este:
  // {
  //   "nombre": "Auriculares Sony",
  //   "precio": 450000,
  //   "categoria": "electronica",
  //   "stock": 25
  // }
  //
  // Y el header: Content-Type: application/json
  // Sin ese header, express.json() no parsea el body.

  const errores = validarProducto(req.body, false);
  // Llamamos a nuestra función de validación auxiliar.
  // false indica que es una CREACIÓN (todos los campos son obligatorios).
  // Devuelve un array de strings con los errores encontrados.

  if (errores.length > 0) {
    return res.status(400).json({
      exito: false,
      mensaje: "Los datos enviados no son válidos",
      errores,
      // 'errores' es shorthand de 'errores: errores' (ES6+).
      // Si la clave y el valor tienen el mismo nombre, puedes omitir el valor.
    });
  }

  const { nombre, precio, categoria, stock } = req.body;

  contadorIds++;
  const nuevoProducto = {
    id: contadorIds,
    nombre: nombre.trim(),
    // .trim() elimina espacios al inicio y al final.
    // " Laptop HP  " → "Laptop HP"
    // Siempre aplica trim() a strings que vienen del cliente.
    precio: Number(precio),
    categoria: categoria.trim().toLowerCase(),
    // .toLowerCase() normaliza la categoría a minúsculas.
    // "Electrónica" → "electronica"
    stock: Number(stock),
    creadoEn: new Date().toISOString(),
    // .toISOString() → "2024-03-15T10:30:00.000Z"
    // Es el formato estándar para fechas en APIs REST.
    // ISO 8601 es el estándar internacional para representar fechas.
  };

  productos.push(nuevoProducto);
  // Array.push() agrega el elemento al FINAL del array.
  // En MongoDB sería: await nuevoProd.save()

  console.log(`  📦 Nuevo producto creado: [ID: ${nuevoProducto.id}] ${nuevoProducto.nombre}`);

  res.status(201).json({
    exito: true,
    mensaje: "Producto creado exitosamente",
    dato: nuevoProducto,
  });
  // 201 Created es el código correcto para recursos creados exitosamente.
  // Algunos equipos usan 200, pero 201 es la convención REST correcta.
});


// ════════════════════════════════════════════════════════════
//  RUTA: PATCH /api/productos/:id — Actualizar campos específicos
// ════════════════════════════════════════════════════════════

app.patch("/api/productos/:id", (req, res) => {
  // PATCH = actualización PARCIAL.
  // El cliente solo envía los campos que quiere cambiar.
  // Los campos que no envía se mantienen como estaban.
  //
  // Ejemplo: solo cambiar el precio
  // PATCH /api/productos/3
  // Body: { "precio": 299000 }
  //
  // El nombre, categoría y stock del producto 3 no cambian.

  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ exito: false, mensaje: "ID inválido" });
  }

  const indice = productos.findIndex((p) => p.id === id);
  // Array.findIndex() es igual a find() pero devuelve el ÍNDICE
  // en vez del elemento. Devuelve -1 si no lo encuentra.
  // Necesitamos el índice para poder modificar el elemento en el array.

  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      mensaje: `No existe ningún producto con ID ${id}`,
    });
  }

  // Verificamos que se enviaron datos en el body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      exito: false,
      mensaje: "Debes enviar al menos un campo para actualizar",
      camposValidos: ["nombre", "precio", "categoria", "stock"],
    });
  }

  // Validamos solo los campos que se enviaron
  const errores = validarProducto(req.body, true);
  // true indica que es una actualización PARCIAL.
  // La función solo valida los campos presentes en req.body.

  if (errores.length > 0) {
    return res.status(400).json({ exito: false, errores });
  }

  const productoActual = productos[indice];
  const { nombre, precio, categoria, stock } = req.body;

  // Actualizamos solo los campos que se enviaron
  const productoActualizado = {
    ...productoActual,
    // Primero copiamos TODOS los campos del producto actual.
    // Luego sobreescribimos solo los que se enviaron.

    ...(nombre    !== undefined && { nombre:    nombre.trim() }),
    ...(precio    !== undefined && { precio:    Number(precio) }),
    ...(categoria !== undefined && { categoria: categoria.trim().toLowerCase() }),
    ...(stock     !== undefined && { stock:     Number(stock) }),
    // Esta es la técnica de "conditional spread":
    // condicion && { clave: valor }
    //   Si condicion es true → devuelve el objeto { clave: valor }
    //   Si condicion es false → devuelve false (spread de false no hace nada)
    // ...{ clave: valor } → agrega la propiedad al objeto
    //
    // Si nombre no se envió (undefined): ...(undefined && ...) → ...false → nada
    // Si nombre se envió: ...('Laptop' !== undefined && { nombre: 'Laptop' })
    //                   → ...{ nombre: 'Laptop' } → agrega nombre al objeto

    actualizadoEn: new Date().toISOString(),
  };

  productos[indice] = productoActualizado;

  console.log(`  ✏️  Producto actualizado (PATCH): [ID: ${id}] campos: ${Object.keys(req.body).join(", ")}`);

  res.status(200).json({
    exito: true,
    mensaje: "Producto actualizado exitosamente",
    camposActualizados: Object.keys(req.body),
    dato: productoActualizado,
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: PUT /api/productos/:id — Reemplazar producto completo
// ════════════════════════════════════════════════════════════

app.put("/api/productos/:id", (req, res) => {
  // PUT = reemplazo COMPLETO del recurso.
  // El cliente envía TODOS los campos del producto.
  // Los campos que no envíe quedarán como undefined/null.
  //
  // Diferencia práctica con PATCH:
  // PATCH: { "precio": 299000 } → solo cambia el precio
  // PUT:   { "nombre": "Laptop", "precio": 299000, "categoria": "electronica", "stock": 10 }
  //        → reemplaza todos los campos

  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ exito: false, mensaje: "ID inválido" });
  }

  const indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      mensaje: `No existe ningún producto con ID ${id}`,
    });
  }

  const errores = validarProducto(req.body, false);
  // false = todos los campos son obligatorios en un reemplazo completo.

  if (errores.length > 0) {
    return res.status(400).json({
      exito: false,
      mensaje: "Datos inválidos. En PUT debes enviar todos los campos.",
      errores,
    });
  }

  const { nombre, precio, categoria, stock } = req.body;

  const productoReemplazado = {
    id,
    // Conservamos el ID original — el ID nunca cambia.
    nombre: nombre.trim(),
    precio: Number(precio),
    categoria: categoria.trim().toLowerCase(),
    stock: Number(stock),
    creadoEn: productos[indice].creadoEn,
    // Conservamos la fecha de creación original — la creación no cambia.
    actualizadoEn: new Date().toISOString(),
  };

  productos[indice] = productoReemplazado;

  console.log(`  🔄 Producto reemplazado (PUT): [ID: ${id}]`);

  res.status(200).json({
    exito: true,
    mensaje: "Producto reemplazado completamente",
    dato: productoReemplazado,
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: DELETE /api/productos/:id — Eliminar un producto
// ════════════════════════════════════════════════════════════

app.delete("/api/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ exito: false, mensaje: "ID inválido" });
  }

  const indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      mensaje: `No existe ningún producto con ID ${id}`,
    });
  }

  const productoEliminado = productos[indice];

  productos.splice(indice, 1);
  // Array.splice(inicio, cantidad) elimina 'cantidad' elementos
  // empezando en 'inicio'. Modifica el array ORIGINAL (in-place).
  //
  // productos.splice(2, 1) → elimina 1 elemento en el índice 2
  // El array queda sin ese elemento. Los índices se reajustan.
  //
  // Alternativa moderna con filter (sin modificar el original):
  // productos = productos.filter(p => p.id !== id)
  // Esta crea un nuevo array sin el elemento eliminado.

  console.log(`  🗑️  Producto eliminado: [ID: ${id}] ${productoEliminado.nombre}`);

  res.status(200).json({
    exito: true,
    mensaje: `Producto "${productoEliminado.nombre}" eliminado exitosamente`,
    dato: productoEliminado,
    totalProductosRestantes: productos.length,
  });
  // Nota sobre códigos para DELETE:
  // 200 → éxito, devuelvo info del elemento eliminado (lo que hacemos aquí)
  // 204 → éxito, sin body (más purista REST, pero menos útil para el cliente)
  // Ambos son correctos. 200 es más práctico.
});


// ════════════════════════════════════════════════════════════
//  RUTA EXTRA: GET /api/estadisticas — Resumen de la tienda
//  Muestra cómo agregar y calcular datos desde múltiples recursos
// ════════════════════════════════════════════════════════════

app.get("/api/estadisticas", (req, res) => {
  // Calculamos estadísticas agregadas de los productos.
  // En MongoDB harías esto con el pipeline de Aggregation de Mongoose.
  // Aquí lo hacemos con métodos de arrays de JavaScript.

  if (productos.length === 0) {
    return res.json({ mensaje: "No hay productos para calcular estadísticas" });
  }

  const precios = productos.map((p) => p.precio);
  // .map() transforma cada elemento del array según la función dada.
  // [{ id:1, precio:2500000 }, { id:2, precio:85000 }, ...]
  // → [2500000, 85000, 320000, 1200000, 890000]

  const precioPromedio = precios.reduce((acc, p) => acc + p, 0) / precios.length;
  // .reduce() reduce el array a un solo valor acumulando.
  // (acc, p) => acc + p → suma todos los precios
  // 0 es el valor inicial del acumulador
  // resultado / precios.length → promedio

  const porCategoria = productos.reduce((acc, producto) => {
    const cat = producto.categoria;
    if (!acc[cat]) {
      acc[cat] = { cantidad: 0, valorTotal: 0, stockTotal: 0 };
    }
    acc[cat].cantidad++;
    acc[cat].valorTotal += producto.precio * producto.stock;
    acc[cat].stockTotal += producto.stock;
    return acc;
  }, {});
  // Usamos reduce para agrupar productos por categoría.
  // El acumulador empieza como {} (objeto vacío).
  // Por cada producto, verificamos si ya existe la clave de su categoría.
  // Si no existe, la creamos con valores en 0.
  // Luego sumamos los valores de ese producto a su categoría.

  res.status(200).json({
    exito: true,
    resumen: {
      totalProductos: productos.length,
      precioPromedio: Math.round(precioPromedio),
      precioMinimo: Math.min(...precios),
      precioMaximo: Math.max(...precios),
      // Math.min y Math.max necesitan argumentos separados, no un array.
      // El spread ...precios convierte el array en argumentos separados:
      // Math.min(2500000, 85000, 320000, 1200000, 890000)
      stockTotal: productos.reduce((acc, p) => acc + p.stock, 0),
      productosMasCaros: productos
        .sort((a, b) => b.precio - a.precio)
        .slice(0, 3)
        .map((p) => ({ id: p.id, nombre: p.nombre, precio: formatearPrecio(p.precio) })),
    },
    porCategoria,
  });
});


// ════════════════════════════════════════════════════════════
//  MIDDLEWARE: RUTA NO ENCONTRADA (404)
//  Debe ir DESPUÉS de todas las rutas.
//  Se ejecuta cuando ninguna ruta anterior coincidió con la URL.
// ════════════════════════════════════════════════════════════

app.use((req, res) => {
  // Este middleware NO tiene ruta → se ejecuta para CUALQUIER método y URL
  // que no haya coincidido con ninguna ruta definida arriba.
  //
  // Colocarlo al final es CRÍTICO. Si lo pusieras al principio,
  // capturaría TODAS las peticiones antes de que lleguen a las rutas.
  //
  // Nota: este middleware no tiene next() porque es el último de la cadena.
  // Aquí siempre termina la petición con una respuesta 404.

  res.status(404).json({
    exito: false,
    mensaje: `La ruta '${req.method} ${req.url}' no existe en esta API`,
    sugerencia: "Revisa las rutas disponibles en GET /",
    rutasDisponibles: [
      "GET  /",
      "GET  /api/info",
      "GET  /api/estadisticas",
      "GET  /api/productos",
      "GET  /api/productos/:id",
      "POST /api/productos",
      "PUT  /api/productos/:id",
      "PATCH /api/productos/:id",
      "DELETE /api/productos/:id",
    ],
  });
});


// ════════════════════════════════════════════════════════════
//  MIDDLEWARE: MANEJO DE ERRORES GLOBALES
//  Tiene 4 parámetros: (err, req, res, next)
//  Express lo reconoce como middleware de errores por el número de params.
//  Se ejecuta cuando en cualquier lugar se llama next(error).
// ════════════════════════════════════════════════════════════

app.use((err, req, res, next) => {
  // Para que Express lo reconozca como middleware de ERRORES,
  // DEBE tener exactamente 4 parámetros: err, req, res, next.
  // Incluso si no usas 'next' dentro, debes declararlo.
  // Express lo identifica por el número de parámetros, no por el nombre.
  //
  // Este middleware se activa cuando en una ruta haces:
  //   next(new Error("algo salió mal"))
  // O cuando Express mismo detecta un error interno.
  //
  // También se activa si usas middleware async y ocurre un error:
  // En Express 5 (próxima versión), los errores async se pasan
  // automáticamente a este middleware. En Express 4, hay que
  // envolverlos en try-catch y llamar next(error) manualmente.

  console.error("❌ Error no manejado:", err.stack);
  // err.stack → el stack trace completo del error.
  // Muy útil para depurar. Solo lo mostramos en la consola del servidor,
  // NUNCA al cliente en producción (podría revelar detalles internos).

  const codigoError = err.status || err.statusCode || 500;
  // Algunos errores tienen un código HTTP asignado (ej: 400, 401, 403).
  // Si no tiene código específico, usamos 500 (Internal Server Error).

  res.status(codigoError).json({
    exito: false,
    mensaje:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Error interno del servidor. Por favor intenta de nuevo.",
    // En DESARROLLO: mostramos el mensaje real del error (útil para depurar).
    // En PRODUCCIÓN: mostramos un mensaje genérico (no revelamos detalles).
    // process.env.NODE_ENV es una variable de entorno que estableces tú.
    // Convención: "development" en local, "production" en el servidor.
  });
});


// ════════════════════════════════════════════════════════════
//  INICIAR EL SERVIDOR
// ════════════════════════════════════════════════════════════

const servidor = app.listen(PUERTO, () => {
  // app.listen(puerto, callback) hace que Express empiece a aceptar conexiones.
  // Internamente llama a http.createServer(app).listen(puerto, callback).
  //
  // El callback se ejecuta UNA SOLA VEZ cuando el servidor está listo.
  // A partir de ese momento, cualquier petición HTTP al puerto 3000
  // llega a Express y sigue el flujo de middlewares y rutas.
  //
  // Guardamos la referencia en 'servidor' para poder cerrarlo limpiamente.

  console.log("\n════════════════════════════════════════");
  console.log("  🚀 SERVIDOR EXPRESS INICIADO");
  console.log("════════════════════════════════════════");
  console.log(`  ✅  URL base:     http://localhost:${PUERTO}`);
  console.log(`  ✅  API Info:     http://localhost:${PUERTO}/api/info`);
  console.log(`  ✅  Productos:    http://localhost:${PUERTO}/api/productos`);
  console.log(`  ✅  Estadísticas: http://localhost:${PUERTO}/api/estadisticas`);
  console.log("");
  console.log("  📋 CRUD completo disponible:");
  console.log(`  GET    /api/productos             → listar (con filtros y paginación)`);
  console.log(`  GET    /api/productos/:id          → obtener uno`);
  console.log(`  POST   /api/productos              → crear`);
  console.log(`  PUT    /api/productos/:id          → reemplazar completo`);
  console.log(`  PATCH  /api/productos/:id          → actualizar campos`);
  console.log(`  DELETE /api/productos/:id          → eliminar`);
  console.log("");
  console.log("  💡 Abre http://localhost:3000 en tu navegador");
  console.log("  💡 Usa Postman para POST, PUT, PATCH y DELETE");
  console.log("  🛑 Para detener: Ctrl + C");
  console.log("════════════════════════════════════════\n");
});

// ─────────────────────────────────────────────────────────
//  MANEJO LIMPIO DE CIERRE DEL SERVIDOR
// ─────────────────────────────────────────────────────────
process.on("SIGINT", () => {
  // SIGINT es la señal que envía el sistema operativo cuando
  // presionas Ctrl + C en la terminal.
  // 'process.on' registra un listener para esa señal.
  //
  // Sin este código, Ctrl + C mata el proceso abruptamente.
  // Con este código, podemos hacer un cierre limpio:
  // terminar peticiones en curso, cerrar conexiones a BD, etc.

  console.log("\n\n  ⏹️  Cerrando el servidor limpiamente...");

  servidor.close(() => {
    // servidor.close() deja de aceptar nuevas conexiones y espera
    // a que las conexiones actuales terminen. Luego llama al callback.
    console.log("  ✅  Servidor cerrado correctamente.");
    console.log("  👋  ¡Hasta la próxima!\n");
    process.exit(0);
    // process.exit(0) termina el proceso de Node.js.
    // 0 indica éxito (sin errores). 1 indicaría error.
  });
});

// ─────────────────────────────────────────────────────────
//  MANEJO DE ERRORES NO CAPTURADOS
// ─────────────────────────────────────────────────────────
process.on("uncaughtException", (err) => {
  // Se dispara cuando ocurre un error que nadie capturó con try-catch.
  // En producción, esto podría indicar un bug grave.
  // Lo registramos y cerramos el servidor para evitar un estado corrupto.
  console.error("  💥 Error no capturado:", err.message);
  console.error("  Stack:", err.stack);
  process.exit(1);
  // 1 indica que el proceso terminó con error.
});

process.on("unhandledRejection", (razon, promesa) => {
  // Se dispara cuando una Promesa es rechazada y nadie manejó el rechazo.
  // Ejemplo: await algo() sin try-catch y algo() lanza un error.
  // En versiones modernas de Node.js, esto termina el proceso automáticamente.
  console.error("  💥 Promesa rechazada sin manejar:", razon);
  console.error("  Promesa:", promesa);
  process.exit(1);
});


// ════════════════════════════════════════════════════════════
//  CONEXIÓN CON TU PROYECTO DE BACKEND
// ════════════════════════════════════════════════════════════
//
//  Todo lo que ves aquí es exactamente lo que usa tu proyecto
//  real con Express y MongoDB, con algunas diferencias:
//
//  1. ORGANIZACIÓN EN ARCHIVOS:
//     En proyectos reales, no pones todo en un solo archivo.
//     La estructura típica de un backend Express profesional es:
//
//     src/
//     ├── index.js          ← punto de entrada, arranca el servidor
//     ├── app.js            ← configura Express, middlewares globales
//     ├── config/
//     │   └── db.js         ← conexión a MongoDB con Mongoose
//     ├── models/
//     │   └── Producto.js   ← el Schema y Model de Mongoose
//     ├── controllers/
//     │   └── producto.controller.js  ← la lógica de cada ruta
//     ├── routes/
//     │   └── producto.routes.js      ← define las rutas con express.Router()
//     └── middlewares/
//         ├── auth.middleware.js      ← verifica el token JWT
//         └── error.middleware.js     ← manejo de errores global
//
//  2. EN VEZ DE ARRAYS, USAS MONGODB:
//     productos.push(nuevo) → await new Producto(datos).save()
//     productos.find(...)   → await Producto.find({})
//     productos.findIndex() → await Producto.findById(id)
//     productos.splice()    → await Producto.findByIdAndDelete(id)
//
//  3. EN VEZ DE VALIDACIÓN MANUAL, PUEDES USAR express-validator:
//     Los schemas de Mongoose también validan con el campo 'required',
//     'min', 'max', 'enum', etc.
//
//  4. LOS MIDDLEWARES QUE YA CONOCES:
//     express.json()        → igual que aquí
//     cors()                → permite peticiones del frontend
//     helmet()              → headers de seguridad
//     morgan('dev')         → logger HTTP (como nuestro middleware 3)
//
//  5. LAS RUTAS QUE YA ESCRIBISTE:
//     app.get('/api/tasks', authMiddleware, getTasks)
//     Son exactamente el mismo patrón que ves aquí.
//     authMiddleware es un middleware que verifica el JWT.
//     getTasks es el handler final (el controlador).