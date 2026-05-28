// ============================================================
//  📘 INVESTIGACIÓN #7 — PETICIONES HTTP COMPLETAS
//  Métodos HTTP + Códigos de Estado
// ============================================================
//
//  Recursos oficiales de estudio:
//  ─────────────────────────────────────────────────────────
//  📖 MDN — Métodos HTTP (en español):
//     https://developer.mozilla.org/es/docs/Web/HTTP/Methods
//
//  📖 MDN — Códigos de estado (en español):
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
//  ¿QUÉ ES HTTP?
//  ==============
//  HTTP = HyperText Transfer Protocol
//  Es el PROTOCOLO (conjunto de reglas) que define cómo se
//  comunican el cliente (navegador, Postman, app móvil) y el
//  servidor (Node.js, Express, etc.).
//
//  ANALOGÍA COMPLETA:
//  ──────────────────
//  Imagina que HTTP es el sistema de pedidos de un restaurante:
//
//  - El CLIENTE    = el comensal (navegador, Postman, app)
//  - El SERVIDOR   = la cocina (Node.js + Express)
//  - La PETICIÓN   = la comanda (lo que el cliente pide)
//  - La RESPUESTA  = el plato servido (lo que el servidor devuelve)
//  - El MÉTODO     = el tipo de acción (pedir, devolver, cancelar)
//  - El CÓDIGO     = la confirmación del mesero (200=listo, 404=no hay)
//
//  ¿CÓMO FUNCIONA UNA PETICIÓN HTTP?
//  ───────────────────────────────────
//  Toda comunicación HTTP tiene este flujo:
//
//  1. El cliente envía una PETICIÓN con:
//     - MÉTODO    → qué quiere hacer (GET, POST, PUT, DELETE...)
//     - URL       → a qué recurso (https://api.com/usuarios/5)
//     - HEADERS   → información extra (tipo de dato, token de auth...)
//     - BODY      → datos enviados (solo en POST, PUT, PATCH)
//
//  2. El servidor procesa y responde con:
//     - CÓDIGO    → número que indica resultado (200, 404, 500...)
//     - HEADERS   → información extra de la respuesta
//     - BODY      → los datos solicitados (JSON, HTML, archivo...)
//
//  ESTRUCTURA VISUAL DE UNA PETICIÓN:
//  ────────────────────────────────────
//  POST /api/usuarios HTTP/1.1
//  Host: localhost:3000
//  Content-Type: application/json       ← qué tipo de dato envío
//  Authorization: Bearer eyJhbGci...    ← token de autenticación
//
//  {                                    ← BODY (solo POST/PUT/PATCH)
//    "nombre": "Juan Pérez",
//    "email": "juan@email.com"
//  }
//
//  ESTRUCTURA VISUAL DE UNA RESPUESTA:
//  ─────────────────────────────────────
//  HTTP/1.1 201 Created                 ← código de estado
//  Content-Type: application/json       ← tipo de dato que devuelvo
//
//  {                                    ← BODY de la respuesta
//    "msg": "Usuario creado",
//    "id": "64abc123..."
//  }
//
// ============================================================


// ============================================================
//  PARTE 1 — MÉTODOS HTTP
//  ¿Qué son, para qué sirve cada uno y cuándo usarlos?
// ============================================================
//
//  Los métodos HTTP son los VERBOS del protocolo.
//  Le dicen al servidor QUÉ acción quiere realizar el cliente
//  sobre un recurso determinado.
//
//  Un RECURSO es cualquier cosa que el servidor maneja:
//  usuarios, productos, pedidos, artículos, archivos, etc.
//
//  RELACIÓN ENTRE MÉTODOS, CRUD Y BASE DE DATOS:
//  ───────────────────────────────────────────────
//  ┌─────────┬──────────┬───────────────────────┬─────────────────────┐
//  │ Método  │   CRUD   │  SQL                  │  MongoDB/Mongoose   │
//  ├─────────┼──────────┼───────────────────────┼─────────────────────┤
//  │ GET     │ READ     │ SELECT                │ .find() .findById() │
//  │ POST    │ CREATE   │ INSERT INTO           │ .save() insertOne() │
//  │ PUT     │ UPDATE   │ UPDATE SET (completo) │ .findByIdAndUpdate()│
//  │ PATCH   │ UPDATE   │ UPDATE SET (parcial)  │ .findByIdAndUpdate()│
//  │ DELETE  │ DELETE   │ DELETE FROM           │ .findByIdAndDelete()│
//  └─────────┴──────────┴───────────────────────┴─────────────────────┘
//
// ============================================================


// ============================================================
//  MÉTODO GET — Obtener / Leer información
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  GET es el método más usado de todos. Sirve para PEDIR información
//  al servidor. Es de solo lectura: no modifica nada.
//  Cuando abres cualquier página web, tu navegador hace un GET.
//
//  CARACTERÍSTICAS:
//  ─────────────────
//  ✅ No tiene BODY — los datos van en la URL (query params)
//  ✅ Es SEGURO     — no modifica ningún dato en el servidor
//  ✅ Es IDEMPOTENTE — hacer 1 o 100 GETs da exactamente el mismo resultado
//  ✅ Se puede guardar en caché (el navegador puede recordar la respuesta)
//  ✅ Se puede usar directamente en el navegador escribiendo la URL
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Listar todos los recursos: GET /api/usuarios
//  - Obtener un recurso específico: GET /api/usuarios/5
//  - Buscar o filtrar: GET /api/usuarios?ciudad=Cali&activo=true
//  - Obtener el perfil del usuario logueado: GET /api/perfil
//  - Ver un producto: GET /api/productos/laptop-hp
//
//  CÓDIGO DE RESPUESTA EXITOSO: 200 OK
//
//  EJEMPLOS:

//  // Obtener todos los usuarios
//  GET /api/usuarios
//  → Respuesta 200: [ {id:1, nombre:"Juan"}, {id:2, nombre:"Ana"} ]
//
//  // Obtener un usuario específico
//  GET /api/usuarios/1
//  → Respuesta 200: { id:1, nombre:"Juan", email:"juan@mail.com" }
//
//  // Filtrar con query params (parámetros después del ?)
//  GET /api/usuarios?ciudad=Cali&activo=true
//  → Respuesta 200: [ {id:1, nombre:"Juan", ciudad:"Cali"} ]
//
//  // En Express:
//  app.get('/api/usuarios', (req, res) => {
//    const { ciudad } = req.query; // query params
//    res.status(200).json(usuarios);
//  });
//
//  app.get('/api/usuarios/:id', (req, res) => {
//    const id = req.params.id; // route param
//    res.status(200).json(usuario);
//  });
//
//  // Con fetch() en el frontend:
//  const respuesta = await fetch('/api/usuarios');
//  const datos = await respuesta.json();


// ============================================================
//  MÉTODO POST — Crear / Enviar datos nuevos
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  POST sirve para CREAR un nuevo recurso en el servidor,
//  o para enviar datos que el servidor debe procesar.
//  Los datos viajan en el BODY de la petición (no en la URL).
//
//  CARACTERÍSTICAS:
//  ─────────────────
//  ✅ Tiene BODY   — los datos van en el cuerpo de la petición
//  ❌ NO es seguro — sí modifica datos (crea nuevos recursos)
//  ❌ NO es idempotente — si haces POST 3 veces, crea 3 recursos distintos
//  ❌ No se guarda en caché
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Registrar un usuario: POST /api/auth/registro
//  - Iniciar sesión: POST /api/auth/login
//  - Crear un producto: POST /api/productos
//  - Publicar un comentario: POST /api/comentarios
//  - Hacer un pedido: POST /api/pedidos
//  - Subir un archivo: POST /api/archivos
//
//  CÓDIGO DE RESPUESTA EXITOSO: 201 Created
//
//  EJEMPLOS:

//  // Crear un nuevo usuario
//  POST /api/usuarios
//  Body: { "nombre": "Carlos", "email": "carlos@mail.com", "password": "1234" }
//  → Respuesta 201: { "msg": "Usuario creado", "id": "64abc..." }
//
//  // En Express:
//  app.post('/api/usuarios', async (req, res) => {
//    const { nombre, email, password } = req.body; // body de la petición
//    const nuevoUsuario = new Usuario({ nombre, email, password });
//    await nuevoUsuario.save();
//    res.status(201).json({ msg: "Usuario creado", dato: nuevoUsuario });
//  });
//
//  // Con fetch() en el frontend:
//  const respuesta = await fetch('/api/usuarios', {
//    method: 'POST',
//    headers: { 'Content-Type': 'application/json' },
//    body: JSON.stringify({ nombre: 'Carlos', email: 'carlos@mail.com' })
//  });
//  const datos = await respuesta.json(); // { msg: "Usuario creado" }


// ============================================================
//  MÉTODO PUT — Actualizar un recurso COMPLETO
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  PUT sirve para REEMPLAZAR COMPLETAMENTE un recurso existente.
//  Envías TODOS los campos del recurso con sus nuevos valores.
//  Si no envías un campo, ese campo puede quedar en blanco o perderse
//  (dependiendo de cómo esté programado el servidor).
//
//  CARACTERÍSTICAS:
//  ─────────────────
//  ✅ Tiene BODY    — los nuevos datos van en el cuerpo
//  ❌ NO es seguro  — modifica datos
//  ✅ Es IDEMPOTENTE — hacer PUT 5 veces con los mismos datos
//                     siempre deja el recurso en el mismo estado final
//
//  DIFERENCIA CLAVE CON PATCH:
//  ────────────────────────────
//  PUT   → Reemplaza el recurso COMPLETO (como borrar y volver a crear)
//  PATCH → Solo modifica los campos que envías (el resto queda igual)
//
//  Ejemplo concreto:
//  Usuario actual: { nombre: "Juan", email: "juan@mail.com", ciudad: "Cali" }
//
//  Con PUT { nombre: "Juan Actualizado", email: "nuevo@mail.com" }
//  → Resultado: { nombre: "Juan Actualizado", email: "nuevo@mail.com", ciudad: undefined }
//  (ciudad desaparece porque no la enviaste)
//
//  Con PATCH { nombre: "Juan Actualizado" }
//  → Resultado: { nombre: "Juan Actualizado", email: "juan@mail.com", ciudad: "Cali" }
//  (email y ciudad se conservan)
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Editar completamente el perfil de un usuario
//  - Reemplazar toda la información de un producto
//  - Actualizar un artículo entero en un blog
//
//  CÓDIGO DE RESPUESTA EXITOSO: 200 OK
//
//  EJEMPLOS:

//  // Actualizar completamente el usuario con ID 5
//  PUT /api/usuarios/5
//  Body: {
//    "nombre": "Juan Pérez Actualizado",
//    "email": "juannuevo@mail.com",
//    "ciudad": "Bogotá",
//    "activo": true
//  }
//  → Respuesta 200: { dato: { id:5, nombre:"Juan Pérez Actualizado", ... } }
//
//  // En Express:
//  app.put('/api/usuarios/:id', async (req, res) => {
//    const actualizado = await Usuario.findByIdAndUpdate(
//      req.params.id,
//      req.body,         // reemplaza con todo lo que llegó
//      { new: true }     // devuelve el documento actualizado
//    );
//    res.status(200).json({ dato: actualizado });
//  });


// ============================================================
//  MÉTODO PATCH — Actualizar un recurso PARCIALMENTE
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  PATCH sirve para MODIFICAR SOLO ALGUNOS CAMPOS de un recurso.
//  Solo envías los campos que quieres cambiar.
//  El resto de campos del recurso se conservan exactamente igual.
//
//  CARACTERÍSTICAS:
//  ─────────────────
//  ✅ Tiene BODY    — solo los campos a modificar
//  ❌ NO es seguro  — modifica datos
//  ⚠️  NO siempre es idempotente (depende de la implementación)
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Cambiar solo la contraseña: PATCH /api/usuarios/5
//  - Activar/desactivar un usuario: PATCH /api/usuarios/5
//  - Cambiar solo el precio de un producto
//  - Marcar una tarea como completada
//  - Cambiar solo la foto de perfil
//
//  CÓDIGO DE RESPUESTA EXITOSO: 200 OK
//
//  EJEMPLOS:

//  // Cambiar SOLO el email del usuario con ID 5
//  PATCH /api/usuarios/5
//  Body: { "email": "nuevoemail@mail.com" }
//  → nombre, ciudad, activo se conservan igual
//  → Respuesta 200: { dato: { id:5, nombre:"Juan", email:"nuevoemail@mail.com", ciudad:"Cali" } }
//
//  // Desactivar un usuario
//  PATCH /api/usuarios/5
//  Body: { "activo": false }
//  → Solo cambia activo, todo lo demás igual
//
//  // En Express con Mongoose:
//  app.patch('/api/usuarios/:id', async (req, res) => {
//    const actualizado = await Usuario.findByIdAndUpdate(
//      req.params.id,
//      { $set: req.body }, // $set solo actualiza los campos enviados
//      { new: true, runValidators: true }
//    );
//    res.status(200).json({ dato: actualizado });
//  });


// ============================================================
//  MÉTODO DELETE — Eliminar un recurso
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  DELETE sirve para ELIMINAR un recurso del servidor.
//  Generalmente se identifica el recurso por su ID en la URL.
//  Normalmente NO lleva body.
//
//  CARACTERÍSTICAS:
//  ─────────────────
//  ❌ NO es seguro  — elimina datos
//  ✅ Es IDEMPOTENTE — eliminar algo 5 veces tiene el mismo resultado
//                     (después de la primera, ya no existe)
//  ⚠️  Generalmente sin BODY
//
//  BORRADO FÍSICO vs BORRADO LÓGICO:
//  ───────────────────────────────────
//  Físico: elimina el registro de la base de datos para siempre
//          → usa .findByIdAndDelete()
//          → simple pero irreversible
//
//  Lógico: no elimina el registro, solo cambia un campo "activo: false"
//          → usa .findByIdAndUpdate({ activo: false })
//          → conserva historial, se puede reactivar
//          → recomendado en producción
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Eliminar una cuenta: DELETE /api/usuarios/5
//  - Borrar un producto: DELETE /api/productos/laptop-hp
//  - Eliminar un comentario: DELETE /api/comentarios/99
//  - Cancelar un pedido: DELETE /api/pedidos/12
//
//  CÓDIGO DE RESPUESTA EXITOSO:
//  200 OK       → cuando devuelves el recurso eliminado en el body
//  204 No Content → cuando no devuelves nada (más estricto según REST)
//
//  EJEMPLOS:

//  // Eliminar el usuario con ID 5
//  DELETE /api/usuarios/5
//  (sin body)
//  → Respuesta 200: { msg: "Usuario eliminado", eliminado: { id:5, nombre:"Juan" } }
//  o
//  → Respuesta 204: (sin cuerpo)
//
//  // En Express — Borrado FÍSICO:
//  app.delete('/api/usuarios/:id', async (req, res) => {
//    const eliminado = await Usuario.findByIdAndDelete(req.params.id);
//    if (!eliminado) return res.status(404).json({ msg: "No encontrado" });
//    res.status(200).json({ msg: "Eliminado", dato: eliminado });
//  });
//
//  // En Express — Borrado LÓGICO (recomendado):
//  app.delete('/api/usuarios/:id', async (req, res) => {
//    const desactivado = await Usuario.findByIdAndUpdate(
//      req.params.id,
//      { activo: false },
//      { new: true }
//    );
//    res.status(200).json({ msg: "Usuario desactivado", dato: desactivado });
//  });


// ============================================================
//  MÉTODO HEAD — Solo verificar sin descargar el body
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  HEAD es exactamente igual a GET pero el servidor solo devuelve
//  los HEADERS de la respuesta, SIN el body.
//  Es útil para verificar si un recurso existe o ha cambiado
//  sin tener que descargar todo el contenido.
//
//  CARACTERÍSTICAS:
//  ─────────────────
//  ✅ Sin BODY en la respuesta (aunque sí hay headers)
//  ✅ Es SEGURO — no modifica datos
//  ✅ Es IDEMPOTENTE
//  ✅ Muy eficiente — no descarga datos pesados
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Verificar si un archivo existe antes de descargarlo
//  - Comprobar cuándo fue la última modificación (caché)
//  - Verificar el tamaño de un archivo (Content-Length)
//  - Confirmar que una URL existe sin cargar su contenido
//
//  EJEMPLO:

//  // Verificar si un usuario existe sin traer sus datos
//  HEAD /api/usuarios/5
//  → Respuesta: headers solamente, sin body
//  → Si el usuario existe: 200 OK (sin body)
//  → Si no existe: 404 Not Found (sin body)
//
//  // En Express (Express lo maneja automáticamente
//  // junto con la ruta GET equivalente)
//  app.get('/api/usuarios/:id', (req, res) => {
//    // Express responde a HEAD automáticamente
//    // usando esta misma ruta pero sin enviar el body
//    res.status(200).json(usuario);
//  });


// ============================================================
//  MÉTODO OPTIONS — Consultar qué métodos acepta el servidor
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  OPTIONS le pregunta al servidor qué métodos HTTP acepta
//  para una URL específica. El servidor responde en el header
//  "Allow" con los métodos permitidos.
//
//  CARACTERÍSTICAS:
//  ─────────────────
//  ✅ Sin BODY
//  ✅ Es SEGURO — no modifica datos
//  ✅ Es IDEMPOTENTE
//
//  ¿CUÁNDO SE USA EN LA PRÁCTICA?
//  ────────────────────────────────
//  Se usa principalmente en dos casos:
//
//  1. CORS (Cross-Origin Resource Sharing):
//     Cuando un frontend en http://localhost:5173 hace una petición
//     a un backend en http://localhost:3000, el navegador primero
//     envía automáticamente un OPTIONS (llamado "preflight request")
//     para preguntar si está permitido. Si el servidor responde
//     correctamente, el navegador hace la petición real.
//
//  2. Descubrimiento de API:
//     Para saber qué operaciones están disponibles en un endpoint.
//
//  EJEMPLO:

//  OPTIONS /api/usuarios
//  → Respuesta headers:
//    Allow: GET, POST, OPTIONS
//    Access-Control-Allow-Origin: http://localhost:5173
//    Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE
//
//  // En Express, el paquete 'cors' maneja OPTIONS automáticamente:
//  const cors = require('cors');
//  app.use(cors()); // Responde correctamente a todas las peticiones OPTIONS


// ============================================================
//  RESUMEN VISUAL COMPLETO DE MÉTODOS HTTP
// ============================================================
//
//  ┌─────────┬──────────────────────────┬───────┬──────────────┬───────────────┐
//  │ Método  │ Acción                   │ Body  │ Idempotente  │ Código éxito  │
//  ├─────────┼──────────────────────────┼───────┼──────────────┼───────────────┤
//  │ GET     │ Leer / Obtener           │  No   │ Sí           │ 200 OK        │
//  │ POST    │ Crear / Enviar           │  Sí   │ No           │ 201 Created   │
//  │ PUT     │ Actualizar COMPLETO      │  Sí   │ Sí           │ 200 OK        │
//  │ PATCH   │ Actualizar PARCIAL       │  Sí   │ No siempre   │ 200 OK        │
//  │ DELETE  │ Eliminar                 │  No   │ Sí           │ 200 / 204     │
//  │ HEAD    │ Verificar sin descargar  │  No   │ Sí           │ 200 OK        │
//  │ OPTIONS │ Consultar métodos        │  No   │ Sí           │ 200 OK        │
//  └─────────┴──────────────────────────┴───────┴──────────────┴───────────────┘
//
//  ¿QUÉ SIGNIFICA IDEMPOTENTE?
//  ────────────────────────────
//  Una operación es idempotente cuando ejecutarla 1 vez o 100 veces
//  produce el mismo resultado en el servidor.
//
//  GET  /usuarios/5    → siempre devuelve el mismo usuario ✅
//  DELETE /usuarios/5  → la primera vez elimina, las siguientes dan 404 ✅
//  POST /usuarios      → cada vez crea un usuario nuevo, diferente ❌
//
// ============================================================


// ============================================================
//  PARTE 2 — CÓDIGOS DE ESTADO HTTP
//  ¿Qué son, para qué sirven y cuáles son?
// ============================================================
//
//  ¿QUÉ SON LOS CÓDIGOS DE ESTADO HTTP?
//  ======================================
//  Cuando un cliente hace una petición a un servidor, el servidor
//  SIEMPRE responde con:
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
//  LAS 5 FAMILIAS DE CÓDIGOS:
//  ───────────────────────────
//    1xx → Informativos   (el servidor está procesando)
//    2xx → Éxito          (todo salió bien ✅)
//    3xx → Redirecciones  (el recurso está en otro lugar 🔄)
//    4xx → Error cliente  (TÚ hiciste algo mal ❌)
//    5xx → Error servidor (EL SERVIDOR falló 💥)
//
// ============================================================


// ============================================================
//  FAMILIA 1xx — INFORMATIVOS
// ============================================================

/*
  100 — Continue
  ───────────────
  El servidor recibió los headers y el cliente puede continuar
  enviando el body. Se usa en peticiones con archivos grandes:
  primero preguntas si el servidor puede recibirlos.
*/

/*
  101 — Switching Protocols
  ──────────────────────────
  El servidor acepta cambiar de protocolo.
  El caso más común: pasar de HTTP a WebSocket.
*/

//  const socket = new WebSocket('ws://servidor.com/chat');
//  socket.onopen = () => console.log('Conexión WebSocket: 101 recibido');


// ============================================================
//  FAMILIA 2xx — ÉXITO ✅
// ============================================================

/*
  200 — OK
  ─────────
  La petición funcionó perfectamente.
  Se usa en GET, PUT, PATCH, DELETE cuando todo sale bien.
*/

//  fetch('/api/usuarios')
//    .then(res => res.json())  // res.status === 200
//    .then(data => console.log(data));

/*
  201 — Created
  ──────────────
  Se creó un nuevo recurso exitosamente.
  Úsalo SIEMPRE en POST que crean algo nuevo.
  La respuesta incluye el recurso creado con su ID.
*/

//  fetch('/api/usuarios', {
//    method: 'POST',
//    headers: { 'Content-Type': 'application/json' },
//    body: JSON.stringify({ nombre: 'Oscar', email: 'oscar@mail.com' })
//  }).then(res => console.log(res.status)); // 201

/*
  204 — No Content
  ─────────────────
  Exitoso pero SIN body en la respuesta.
  Se usa en DELETE cuando no necesitas devolver nada.
  ⚠️  Si intentas leer res.json() con un 204 obtendrás error.
*/

//  fetch('/api/usuarios/5', { method: 'DELETE' })
//    .then(res => {
//      if (res.status === 204) console.log('Eliminado — sin body');
//    });

/*
  206 — Partial Content
  ──────────────────────
  El servidor devuelve solo UNA PARTE del recurso.
  YouTube y Netflix lo usan constantemente para el streaming.
  El cliente pide un rango de bytes con el header Range.
*/


// ============================================================
//  FAMILIA 3xx — REDIRECCIONES 🔄
// ============================================================

/*
  301 — Moved Permanently
  ────────────────────────
  El recurso se movió PARA SIEMPRE a una nueva URL.
  Google actualiza su índice. El navegador guarda en caché.
  Úsalo cuando cambias una URL de forma definitiva.
*/

//  app.get('/vieja-ruta', (req, res) => {
//    res.redirect(301, '/nueva-ruta');
//  });

/*
  302 — Found (Moved Temporarily)
  ────────────────────────────────
  El recurso está TEMPORALMENTE en otra URL.
  El navegador NO guarda en caché.
  Muy usado en flujos de login: después de autenticarte
  el servidor te redirige al dashboard.
*/

//  app.post('/login', (req, res) => {
//    res.redirect(302, '/dashboard');
//  });

/*
  304 — Not Modified
  ───────────────────
  El recurso NO cambió desde la última vez.
  El navegador puede usar su versión en caché.
  Ahorra ancho de banda sin mandar el contenido otra vez.
*/


// ============================================================
//  FAMILIA 4xx — ERRORES DEL CLIENTE ❌
// ============================================================

/*
  400 — Bad Request
  ──────────────────
  La petición está mal formada o los datos son inválidos.
  Causas comunes:
  - JSON mal formado
  - Campos obligatorios ausentes
  - Tipos de datos incorrectos
*/

//  app.post('/usuarios', (req, res) => {
//    if (!req.body.email) {
//      return res.status(400).json({ error: 'El email es obligatorio' });
//    }
//  });

/*
  401 — Unauthorized
  ───────────────────
  El cliente NO está autenticado. El servidor no sabe quién eres.
  Necesitas enviar un token JWT o credenciales válidas.

  ⚠️ OJO: el nombre es confuso.
  401 = "No sé quién eres" (no autenticado)
  403 = "Sé quién eres pero no puedes" (no autorizado)
*/

//  function verificarToken(req, res, next) {
//    const token = req.headers['authorization'];
//    if (!token) {
//      return res.status(401).json({ error: 'Token requerido. Inicia sesión.' });
//    }
//    next();
//  }

/*
  403 — Forbidden
  ────────────────
  El servidor SABE quién eres (token válido) pero NO tienes
  permiso para esta acción concreta.
  Eres conocido pero estás prohibido de hacer eso.
*/

//  app.delete('/usuarios/:id', verificarToken, (req, res) => {
//    if (req.usuario.rol !== 'admin') {
//      return res.status(403).json({
//        error: 'No tienes permisos de administrador'
//      });
//    }
//  });

/*
  404 — Not Found
  ────────────────
  El recurso solicitado NO existe. El más famoso de internet.
  Causas: URL mal escrita, recurso eliminado, ID inexistente.
*/

//  app.get('/usuarios/:id', async (req, res) => {
//    const usuario = await Usuario.findById(req.params.id);
//    if (!usuario) {
//      return res.status(404).json({ error: 'Usuario no encontrado' });
//    }
//    res.status(200).json(usuario);
//  });

/*
  405 — Method Not Allowed
  ─────────────────────────
  El método HTTP usado no está permitido para esa ruta.
  Ejemplo: hacer DELETE en una ruta que solo acepta GET.
*/

/*
  409 — Conflict
  ───────────────
  Conflicto con el estado actual del recurso.
  Caso más común: intentar crear algo que ya existe.
  Ejemplo: registrar un email que ya está en uso.
*/

//  app.post('/usuarios', async (req, res) => {
//    const existe = await Usuario.findOne({ email: req.body.email });
//    if (existe) {
//      return res.status(409).json({
//        error: `El email '${req.body.email}' ya está registrado`
//      });
//    }
//  });

/*
  410 — Gone
  ───────────
  El recurso EXISTIÓ pero fue eliminado PERMANENTEMENTE.
  A diferencia del 404, aquí el servidor confirma que existió.
  Google desindexará páginas con 410 más rápido que con 404.
*/

/*
  422 — Unprocessable Entity
  ───────────────────────────
  El JSON llegó bien formado pero los valores son inválidos.

  Diferencia clave:
  400 = "No entiendo lo que me mandaste" (formato roto)
  422 = "Entiendo lo que mandaste pero no tiene sentido"
*/

//  app.post('/usuarios', (req, res) => {
//    const errores = [];
//    if (req.body.edad < 0) errores.push('Edad no puede ser negativa');
//    if (!req.body.email.includes('@')) errores.push('Email inválido');
//    if (errores.length > 0) {
//      return res.status(422).json({ errores });
//    }
//  });

/*
  429 — Too Many Requests
  ────────────────────────
  El cliente hizo demasiadas peticiones en poco tiempo.
  Se llama rate limiting. Protege el servidor de abusos.
*/

//  const rateLimit = require('express-rate-limit');
//  const limitador = rateLimit({
//    windowMs: 60 * 1000, // 1 minuto
//    max: 60,             // máximo 60 peticiones por minuto
//    message: { error: 'Demasiadas peticiones. Espera un momento.' }
//  });
//  app.use('/api/', limitador);


// ============================================================
//  FAMILIA 5xx — ERRORES DEL SERVIDOR 💥
// ============================================================

/*
  500 — Internal Server Error
  ─────────────────────────────
  Error inesperado en el servidor. El cliente hizo todo bien
  pero el código del servidor falló.
  SIEMPRE usa try/catch para evitar 500s sin respuesta.
*/

//  // Mal — puede crashear sin responder:
//  app.get('/perfil', (req, res) => {
//    const nombre = req.body.usuario.nombre; // 💥 crash si usuario es undefined
//    res.json({ nombre });
//  });
//
//  // Bien — siempre responde:
//  app.get('/perfil', (req, res) => {
//    try {
//      const nombre = req.body.usuario.nombre;
//      res.json({ nombre });
//    } catch (error) {
//      res.status(500).json({ error: 'Error interno del servidor' });
//    }
//  });

/*
  502 — Bad Gateway
  ──────────────────
  Tu servidor llamó a otro servicio externo y recibió
  una respuesta inválida de ese servicio.
  Común en microservicios cuando uno le habla a otro que falló.
*/

/*
  503 — Service Unavailable
  ──────────────────────────
  El servidor no puede atender ahora mismo.
  Causas: sobrecarga, mantenimiento, base de datos caída.
  A diferencia del 500, el 503 es intencional y esperado.
*/

//  app.get('/usuarios', async (req, res) => {
//    try {
//      const usuarios = await Usuario.find();
//      res.json(usuarios);
//    } catch (error) {
//      if (error.code === 'ECONNREFUSED') {
//        return res.status(503).json({
//          error: 'Base de datos no disponible. Intenta más tarde.'
//        });
//      }
//      res.status(500).json({ error: 'Error interno' });
//    }
//  });

/*
  504 — Gateway Timeout
  ──────────────────────
  El servidor esperó demasiado por la respuesta de un servicio
  externo y se rindió. Similar al 502 pero por timeout.
  Ejemplo: una API de pagos que tarda más de 30 segundos.
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
//  Servidor Express que demuestra todos los métodos y códigos
// ============================================================
//
//  INSTRUCCIONES PARA CORRERLO:
//  ─────────────────────────────
//  1. Crea una carpeta nueva y entra en ella
//  2. npm init -y
//  3. npm install express
//  4. Guarda este archivo como 07_peticiones_http.js
//  5. node 07_peticiones_http.js
//  6. Abre: http://localhost:3000 en el navegador
//  7. Usa Postman para probar POST, PUT, PATCH, DELETE
//
//  RUTAS DISPONIBLES:
//  ──────────────────
//  GET    http://localhost:3000/                          → Info de rutas
//  GET    http://localhost:3000/api/usuarios              → 200 Lista todos
//  GET    http://localhost:3000/api/usuarios/1            → 200 Obtiene uno
//  GET    http://localhost:3000/api/usuarios/999          → 404 No existe
//  GET    http://localhost:3000/api/usuarios?ciudad=Cali  → 200 Filtrado
//  POST   http://localhost:3000/api/usuarios              → 201 Crea
//  POST   http://localhost:3000/api/usuarios  (sin body)  → 400 Error
//  PUT    http://localhost:3000/api/usuarios/1            → 200 Actualiza todo
//  PATCH  http://localhost:3000/api/usuarios/1            → 200 Actualiza parte
//  DELETE http://localhost:3000/api/usuarios/1            → 200 Elimina
//  GET    http://localhost:3000/api/demo/headers          → Tus headers
//  GET    http://localhost:3000/api/demo/codigos/201      → Qué es 201
//  GET    http://localhost:3000/ruta-inexistente          → 404
//
// ============================================================

"use strict";

const express = require("express");
const app     = express();
const PUERTO  = 3000;

app.use(express.json());

// ─────────────────────────────────────────────────────────
//  Middleware global: muestra info de cada petición recibida
// ─────────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log("\n══════════════════════════════════════════");
  console.log("  📨 NUEVA PETICIÓN HTTP");
  console.log("══════════════════════════════════════════");
  console.log(`  Método:  ${req.method}`);
  console.log(`  URL:     ${req.url}`);
  if (Object.keys(req.query).length > 0)
    console.log("  Query:  ", req.query);
  if (req.headers["content-type"])
    console.log(`  Content-Type: ${req.headers["content-type"]}`);
  if (req.headers["authorization"])
    console.log(`  Auth: ${req.headers["authorization"]}`);
  if (req.body && Object.keys(req.body).length > 0)
    console.log("  Body:   ", JSON.stringify(req.body, null, 2));
  console.log("──────────────────────────────────────────");
  next();
});

// ─────────────────────────────────────────────────────────
//  Base de datos en memoria
// ─────────────────────────────────────────────────────────
let usuarios = [
  { id: 1, nombre: "Juan Pérez",  email: "juan@email.com",  ciudad: "Cali",     activo: true  },
  { id: 2, nombre: "Ana García",  email: "ana@email.com",   ciudad: "Bogotá",   activo: true  },
  { id: 3, nombre: "Luis Torres", email: "luis@email.com",  ciudad: "Medellín", activo: false },
];
let contadorId = usuarios.length;

// ════════════════════════════════════════════════════════
//  GET / → Información general
// ════════════════════════════════════════════════════════
app.get("/", (req, res) => {
  res.setHeader("X-Servidor", "Express-HTTP-Demo");
  res.status(200).json({
    mensaje: "Servidor de demostración — Métodos y Códigos HTTP",
    metodosHTTP: {
      GET:     "Leer/Obtener datos — sin body — 200",
      POST:    "Crear recursos    — con body — 201",
      PUT:     "Actualizar completo — con body — 200",
      PATCH:   "Actualizar parcial  — con body — 200",
      DELETE:  "Eliminar recursos  — sin body — 200/204",
      HEAD:    "Verificar sin descargar — sin body",
      OPTIONS: "Consultar métodos permitidos — usado en CORS",
    },
    rutasDisponibles: [
      "GET    /api/usuarios",
      "GET    /api/usuarios/:id",
      "GET    /api/usuarios?ciudad=Cali",
      "POST   /api/usuarios",
      "PUT    /api/usuarios/:id",
      "PATCH  /api/usuarios/:id",
      "DELETE /api/usuarios/:id",
      "GET    /api/demo/headers",
      "GET    /api/demo/codigos/:codigo",
    ],
  });
});

// ════════════════════════════════════════════════════════
//  GET /api/demo/headers → Muestra los headers del cliente
// ════════════════════════════════════════════════════════
app.get("/api/demo/headers", (req, res) => {
  res.status(200).json({
    mensaje: "Estos son los headers que enviaste",
    tusHeaders: req.headers,
  });
});

// ════════════════════════════════════════════════════════
//  GET /api/demo/codigos/:codigo → Explica un código
// ════════════════════════════════════════════════════════
app.get("/api/demo/codigos/:codigo", (req, res) => {
  const codigo = parseInt(req.params.codigo);
  const diccionario = {
    200: { nombre: "OK",                    familia: "2xx Éxito",         cuando: "GET, PUT, PATCH exitosos" },
    201: { nombre: "Created",               familia: "2xx Éxito",         cuando: "POST que crea un recurso" },
    204: { nombre: "No Content",            familia: "2xx Éxito",         cuando: "DELETE sin body de respuesta" },
    301: { nombre: "Moved Permanently",     familia: "3xx Redirección",   cuando: "URL cambió para siempre" },
    302: { nombre: "Found",                 familia: "3xx Redirección",   cuando: "Redirección temporal" },
    400: { nombre: "Bad Request",           familia: "4xx Error cliente", cuando: "Datos inválidos o incompletos" },
    401: { nombre: "Unauthorized",          familia: "4xx Error cliente", cuando: "No autenticado, falta token" },
    403: { nombre: "Forbidden",             familia: "4xx Error cliente", cuando: "Autenticado pero sin permisos" },
    404: { nombre: "Not Found",             familia: "4xx Error cliente", cuando: "El recurso no existe" },
    409: { nombre: "Conflict",              familia: "4xx Error cliente", cuando: "Email/recurso ya existe" },
    422: { nombre: "Unprocessable Entity",  familia: "4xx Error cliente", cuando: "Formato ok pero valores inválidos" },
    429: { nombre: "Too Many Requests",     familia: "4xx Error cliente", cuando: "Rate limiting activado" },
    500: { nombre: "Internal Server Error", familia: "5xx Error servidor",cuando: "Error inesperado del servidor" },
    503: { nombre: "Service Unavailable",   familia: "5xx Error servidor",cuando: "Servidor sobrecargado/caído" },
  };
  const info = diccionario[codigo];
  if (!info) {
    return res.status(404).json({
      mensaje: `Código ${codigo} no está en el diccionario`,
      disponibles: Object.keys(diccionario).map(Number),
    });
  }
  res.status(200).json({ codigo, ...info });
});

// ════════════════════════════════════════════════════════
//  GET /api/usuarios → Lista todos (código 200)
// ════════════════════════════════════════════════════════
app.get("/api/usuarios", (req, res) => {
  const { ciudad, activo } = req.query;
  let resultado = [...usuarios];
  if (ciudad) resultado = resultado.filter(
    u => u.ciudad.toLowerCase() === ciudad.toLowerCase()
  );
  if (activo !== undefined) resultado = resultado.filter(
    u => u.activo === (activo === "true")
  );
  res.status(200).json({
    metodo: "GET", codigo: 200,
    total: resultado.length,
    datos: resultado,
  });
});

// ════════════════════════════════════════════════════════
//  GET /api/usuarios/:id → Uno por ID (200 o 404)
// ════════════════════════════════════════════════════════
app.get("/api/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ codigo: 400, mensaje: "ID inválido" });
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ codigo: 404, mensaje: `Usuario id=${id} no encontrado` });
  res.status(200).json({ metodo: "GET", codigo: 200, dato: usuario });
});

// ════════════════════════════════════════════════════════
//  POST /api/usuarios → Crear (201, 400 o 409)
// ════════════════════════════════════════════════════════
app.post("/api/usuarios", (req, res) => {
  const { nombre, email, ciudad } = req.body;
  const errores = [];
  if (!nombre || nombre.trim() === "") errores.push("El nombre es obligatorio");
  if (!email  || email.trim()  === "") errores.push("El email es obligatorio");
  if (!ciudad || ciudad.trim() === "") errores.push("La ciudad es obligatoria");
  if (errores.length > 0) return res.status(400).json({ codigo: 400, errores });
  if (usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ codigo: 409, mensaje: `El email '${email}' ya existe` });
  }
  contadorId++;
  const nuevo = { id: contadorId, nombre: nombre.trim(), email: email.trim().toLowerCase(), ciudad: ciudad.trim(), activo: true };
  usuarios.push(nuevo);
  res.status(201).json({ metodo: "POST", codigo: 201, mensaje: "Usuario creado", dato: nuevo });
});

// ════════════════════════════════════════════════════════
//  PUT /api/usuarios/:id → Actualizar COMPLETO (200 o 404)
// ════════════════════════════════════════════════════════
app.put("/api/usuarios/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ codigo: 404, mensaje: `Usuario id=${id} no encontrado` });
  const antes = { ...usuarios[idx] };
  const { nombre, email, ciudad, activo } = req.body;
  usuarios[idx] = {
    id,
    nombre: nombre ?? usuarios[idx].nombre,
    email:  email  ?? usuarios[idx].email,
    ciudad: ciudad ?? usuarios[idx].ciudad,
    activo: activo !== undefined ? activo : usuarios[idx].activo,
  };
  res.status(200).json({ metodo: "PUT", codigo: 200, antes, despues: usuarios[idx] });
});

// ════════════════════════════════════════════════════════
//  PATCH /api/usuarios/:id → Actualizar PARCIAL (200 o 404)
// ════════════════════════════════════════════════════════
app.patch("/api/usuarios/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ codigo: 404, mensaje: `Usuario id=${id} no encontrado` });
  const antes = { ...usuarios[idx] };
  usuarios[idx] = { ...usuarios[idx], ...req.body, id };
  res.status(200).json({
    metodo: "PATCH", codigo: 200,
    camposModificados: Object.keys(req.body),
    antes, despues: usuarios[idx],
  });
});

// ════════════════════════════════════════════════════════
//  DELETE /api/usuarios/:id → Eliminar (200 o 404)
// ════════════════════════════════════════════════════════
app.delete("/api/usuarios/:id", (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ codigo: 404, mensaje: `Usuario id=${id} no encontrado` });
  const eliminado = usuarios.splice(idx, 1)[0];
  res.status(200).json({
    metodo: "DELETE", codigo: 200,
    mensaje: `'${eliminado.nombre}' eliminado exitosamente`,
    eliminado,
    totalRestante: usuarios.length,
  });
});

// ════════════════════════════════════════════════════════
//  404 global — Ruta no encontrada
// ════════════════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({
    codigo: 404,
    mensaje: `La ruta '${req.method} ${req.url}' no existe`,
    sugerencia: "Haz GET / para ver las rutas disponibles",
  });
});

// ════════════════════════════════════════════════════════
//  Iniciar servidor
// ════════════════════════════════════════════════════════
app.listen(PUERTO, () => {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║   📘 MÉTODOS Y CÓDIGOS HTTP — EXPRESS   ║");
  console.log("╚══════════════════════════════════════════╝");
  console.log(`\n  ✅ Corriendo en: http://localhost:${PUERTO}`);
  console.log(`\n  Prueba en el navegador:`);
  console.log(`  → http://localhost:${PUERTO}/`);
  console.log(`  → http://localhost:${PUERTO}/api/usuarios`);
  console.log(`  → http://localhost:${PUERTO}/api/usuarios/1`);
  console.log(`  → http://localhost:${PUERTO}/api/usuarios/999`);
  console.log(`  → http://localhost:${PUERTO}/api/usuarios?ciudad=Cali`);
  console.log(`  → http://localhost:${PUERTO}/api/demo/headers`);
  console.log(`  → http://localhost:${PUERTO}/api/demo/codigos/201`);
  console.log(`  → http://localhost:${PUERTO}/api/demo/codigos/404`);
  console.log("\n  Para POST/PUT/PATCH/DELETE usa Postman.");
  console.log("  Ctrl + C para detener.\n");
});