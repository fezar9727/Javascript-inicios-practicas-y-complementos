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
//  HTTP fue creado por Tim Berners-Lee en 1989 junto con la
//  World Wide Web. La versión que usamos hoy es HTTP/1.1
//  (definida en 1997), aunque HTTP/2 y HTTP/3 son cada vez
//  más comunes y aportan mejoras de rendimiento importantes.
//
//  HTTP es un protocolo de la capa de APLICACIÓN que corre
//  sobre TCP/IP. Cuando haces una petición:
//  1. Tu computadora establece una conexión TCP con el servidor
//  2. Envía la petición HTTP por esa conexión
//  3. El servidor envía la respuesta HTTP
//  4. (En HTTP/1.1) La conexión puede mantenerse para más peticiones
//
//  HTTPS = HTTP + TLS/SSL (cifrado)
//  Todo lo que viaja está cifrado. Nadie en el camino puede
//  leer tu token JWT, tu contraseña, tus datos personales.
//  En producción SIEMPRE debes usar HTTPS. Nunca HTTP puro.
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
//  - Los HEADERS   = las instrucciones especiales ("sin sal", "alergia a nueces")
//  - El BODY       = los ingredientes del pedido (datos enviados)
//  - La URL        = la dirección del restaurante + qué mesa + qué plato
//
//  ¿CÓMO FUNCIONA UNA PETICIÓN HTTP? — El ciclo completo
//  ───────────────────────────────────────────────────────
//
//  1. El cliente construye una PETICIÓN con:
//     - MÉTODO    → qué quiere hacer (GET, POST, PUT, DELETE...)
//     - URL       → a qué recurso (https://api.com/usuarios/5)
//     - HEADERS   → información extra (tipo de dato, token de auth...)
//     - BODY      → datos enviados (solo en POST, PUT, PATCH)
//
//  2. La petición viaja por internet usando TCP/IP
//
//  3. El servidor (Express) RECIBE la petición
//     - Express la parsea y la convierte en el objeto 'req'
//     - Busca la ruta que coincide (método + URL)
//     - Ejecuta los middlewares en orden
//     - Llega al handler de la ruta
//
//  4. El handler construye una RESPUESTA con:
//     - STATUS CODE → número que indica el resultado
//     - HEADERS     → información de la respuesta
//     - BODY        → los datos (JSON, HTML, archivo...)
//
//  5. La respuesta viaja de vuelta al cliente
//
//  6. El cliente (navegador, Postman, app) procesa la respuesta
//
//  ESTRUCTURA VISUAL DE UNA PETICIÓN HTTP REAL:
//  ─────────────────────────────────────────────
//
//  POST /api/usuarios HTTP/1.1
//  Host: api.mitienda.com
//  Content-Type: application/json         ← qué tipo de dato envío
//  Content-Length: 67                     ← tamaño del body en bytes
//  Authorization: Bearer eyJhbGci...      ← token JWT de autenticación
//  Accept: application/json               ← qué tipo de respuesta acepto
//  User-Agent: PostmanRuntime/7.32        ← quién hace la petición
//  X-Request-ID: abc-123-def              ← ID personalizado (X- = custom)
//                                         ← línea en blanco separa headers de body
//  {                                      ← BODY (solo POST/PUT/PATCH)
//    "nombre": "Juan Pérez",
//    "email": "juan@email.com",
//    "password": "mipassword123"
//  }
//
//  ESTRUCTURA VISUAL DE UNA RESPUESTA HTTP REAL:
//  ───────────────────────────────────────────────
//
//  HTTP/1.1 201 Created                   ← versión + código + mensaje
//  Content-Type: application/json         ← tipo de dato que devuelvo
//  Content-Length: 142                    ← tamaño del body
//  Date: Wed, 03 Jun 2026 10:30:00 GMT   ← cuándo se generó
//  X-Response-Time: 45ms                  ← tiempo de procesamiento
//                                         ← línea en blanco
//  {                                      ← BODY de la respuesta
//    "exito": true,
//    "mensaje": "Usuario creado exitosamente",
//    "dato": { "_id": "64abc123...", "nombre": "Juan Pérez" }
//  }
//
//  ─────────────────────────────────────────────────────────
//  HEADERS HTTP MÁS IMPORTANTES
//  ─────────────────────────────────────────────────────────
//
//  HEADERS DE PETICIÓN (los envía el cliente):
//
//  Content-Type: application/json
//    → Le dice al servidor qué formato de datos envía en el body.
//    → application/json    → datos JSON (lo más común en APIs)
//    → multipart/form-data → archivos (imágenes, PDFs)
//    → application/x-www-form-urlencoded → formularios HTML
//    → text/plain          → texto plano
//
//  Authorization: Bearer eyJhbGci...
//    → Envía credenciales o tokens para autenticación.
//    → "Bearer TOKEN" es el estándar para JWT.
//    → Basic dXNlcjpwYXNz → usuario:contraseña en base64 (no seguro sin HTTPS)
//
//  Accept: application/json
//    → Le dice al servidor qué formato acepta en la respuesta.
//    → El servidor debería honrarlo (Content Negotiation).
//
//  Cache-Control: no-cache
//    → Controla si la respuesta puede guardarse en caché.
//
//  User-Agent: Mozilla/5.0... o PostmanRuntime/7.32
//    → Identifica qué cliente hace la petición.
//    → El servidor puede usarlo para adaptar la respuesta.
//
//  HEADERS DE RESPUESTA (los envía el servidor):
//
//  Content-Type: application/json; charset=utf-8
//    → Tipo de dato del body de la respuesta.
//
//  Location: /api/usuarios/64abc123
//    → Nuevo cuando se crea un recurso (201 Created).
//    → También en redirecciones (301, 302).
//
//  Cache-Control: max-age=3600
//    → El cliente puede cachear esta respuesta por 1 hora.
//
//  Access-Control-Allow-Origin: *
//    → Header CORS que permite peticiones de cualquier origen.
//
//  Set-Cookie: sessionId=abc123; HttpOnly; Secure
//    → Establece una cookie en el navegador.
//    → HttpOnly → JavaScript no puede leerla (protección XSS).
//    → Secure → solo se envía por HTTPS.
//
//  X-RateLimit-Remaining: 58
//    → Cuántas peticiones quedan en la ventana de rate limit.
//    → X- indica que es un header personalizado (no estándar).
//
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
//  CONCEPTOS FUNDAMENTALES:
//  ─────────────────────────
//
//  SEGURIDAD (Safe):
//  Un método es "seguro" si NO modifica datos en el servidor.
//  GET, HEAD, OPTIONS → seguros (solo leen)
//  POST, PUT, PATCH, DELETE → no seguros (modifican datos)
//
//  IDEMPOTENCIA:
//  Una operación es idempotente si ejecutarla 1 vez o N veces
//  produce el MISMO RESULTADO FINAL en el servidor.
//  GET, PUT, DELETE, HEAD, OPTIONS → idempotentes
//  POST → NO idempotente (cada POST crea algo nuevo)
//
//  Ejemplo de idempotencia:
//  DELETE /usuarios/5 → primera vez: elimina. Segunda vez: 404.
//  El ESTADO FINAL es el mismo (usuario 5 no existe) en ambos casos.
//  Pero POST /usuarios → primera vez crea usuario con id=1.
//  Segunda vez crea OTRO usuario con id=2. Estado final diferente.
//
//  RELACIÓN ENTRE MÉTODOS, CRUD Y BASE DE DATOS:
//  ───────────────────────────────────────────────
//  ┌─────────┬──────────┬───────────────────────┬─────────────────────────┐
//  │ Método  │   CRUD   │  SQL                  │  MongoDB/Mongoose       │
//  ├─────────┼──────────┼───────────────────────┼─────────────────────────┤
//  │ GET     │ READ     │ SELECT                │ .find() .findById()     │
//  │ POST    │ CREATE   │ INSERT INTO           │ .save() .create()       │
//  │ PUT     │ UPDATE   │ UPDATE SET (completo) │ .findByIdAndUpdate()    │
//  │ PATCH   │ UPDATE   │ UPDATE SET (parcial)  │ findByIdAndUpdate $set  │
//  │ DELETE  │ DELETE   │ DELETE FROM           │ .findByIdAndDelete()    │
//  └─────────┴──────────┴───────────────────────┴─────────────────────────┘
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
//  Cuando haces clic en un enlace, es un GET.
//  Cuando escribes una URL en la barra del navegador, es un GET.
//
//  CARACTERÍSTICAS TÉCNICAS:
//  ──────────────────────────
//  ✅ No tiene BODY — los datos van en la URL (query params o path params)
//  ✅ Es SEGURO     — no modifica ningún dato en el servidor
//  ✅ Es IDEMPOTENTE — hacer 1 o 100 GETs da exactamente el mismo resultado
//  ✅ Se puede guardar en caché — el navegador puede recordar la respuesta
//  ✅ Se puede usar directamente en el navegador escribiendo la URL
//  ✅ Se puede compartir como enlace (la URL tiene toda la información)
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Listar todos los recursos:         GET /api/usuarios
//  - Obtener un recurso específico:     GET /api/usuarios/5
//  - Buscar o filtrar:                  GET /api/usuarios?ciudad=Cali&activo=true
//  - Paginar resultados:                GET /api/productos?pagina=2&limite=10
//  - Obtener el perfil autenticado:     GET /api/auth/perfil
//  - Buscar por texto:                  GET /api/productos?buscar=laptop
//  - Obtener datos anidados:            GET /api/usuarios/5/pedidos
//  - Ver las estadísticas:              GET /api/dashboard/estadisticas
//
//  PARÁMETROS EN GET:
//  ───────────────────
//  Hay dos formas de enviar datos en una petición GET:
//
//  1. ROUTE PARAMS (parámetros de ruta) — parte de la URL:
//     GET /api/usuarios/5
//     → req.params.id = "5"
//     Se usan para identificar UN recurso específico.
//
//  2. QUERY PARAMS (parámetros de consulta) — después del ?:
//     GET /api/usuarios?ciudad=Cali&activo=true&pagina=2
//     → req.query.ciudad = "Cali"
//     → req.query.activo = "true"   ← OJO: siempre string
//     → req.query.pagina = "2"      ← debes convertir a número
//     Se usan para filtrar, buscar, paginar, ordenar.
//
//  CÓDIGO DE RESPUESTA EXITOSO: 200 OK
//
//  EJEMPLOS:

//   Obtener todos los usuarios
//  GET /api/usuarios
//  Headers: { Authorization: "Bearer eyJ..." }
//  Body: (vacío)
//  → Respuesta 200: { total: 3, datos: [{...}, {...}, {...}] }
//
//   Obtener un usuario específico
//  GET /api/usuarios/64abc123
//  → Respuesta 200: { dato: { _id: "64abc123", nombre: "Juan", ... } }
//  → Si no existe: Respuesta 404: { mensaje: "No encontrado" }
//
//   Filtrar con query params
//  GET /api/usuarios?ciudad=Cali&activo=true&pagina=1&limite=5
//  En Express: const { ciudad, activo, pagina, limite } = req.query;
//  → Respuesta 200: { paginacion: {...}, datos: [...] }
//
//   En Express — las dos formas de parámetros:
//  app.get('/api/usuarios/:id', (req, res) => {
//    const { id }     = req.params;  // /api/usuarios/64abc123
//    const { ciudad } = req.query;   // ?ciudad=Cali
//    const authHeader = req.headers['authorization']; // Bearer eyJ...
//    res.status(200).json(usuario);
//  });
//
//   Con fetch() en el frontend:
//  const respuesta = await fetch('/api/usuarios?ciudad=Cali', {
//    headers: { 'Authorization': `Bearer ${token}` }
//  });
//  if (!respuesta.ok) { /* manejar error */ }
//  const datos = await respuesta.json();


// ============================================================
//  MÉTODO POST — Crear / Enviar datos nuevos
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  POST sirve para CREAR un nuevo recurso en el servidor,
//  o para enviar datos que el servidor debe procesar (como un login).
//  Los datos viajan en el BODY de la petición (no en la URL),
//  lo que los hace más seguros que GET y soporta más volumen de datos.
//
//  CARACTERÍSTICAS TÉCNICAS:
//  ──────────────────────────
//  ✅ Tiene BODY   — los datos van en el cuerpo de la petición
//  ❌ NO es seguro — sí modifica datos (crea nuevos recursos)
//  ❌ NO es idempotente — si haces POST 3 veces, crea 3 recursos distintos
//  ❌ No se guarda en caché (los navegadores no cachean POSTs)
//  ❌ No se puede compartir como enlace (los datos están en el body, no en la URL)
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Registrar un usuario:    POST /api/auth/registro
//  - Iniciar sesión:          POST /api/auth/login     ← devuelve JWT
//  - Crear un producto:       POST /api/productos
//  - Publicar un comentario:  POST /api/comentarios
//  - Hacer un pedido:         POST /api/pedidos
//  - Subir un archivo:        POST /api/archivos
//  - Enviar un email:         POST /api/notificaciones/email
//  - Cargar datos iniciales:  POST /api/seed
//
//  NOTA SOBRE LOGIN:
//  El login técnicamente no "crea" un recurso en el sentido REST puro.
//  Pero se usa POST porque:
//  1. Envía datos sensibles (contraseña) que NO deben ir en la URL
//  2. "Crea" una sesión o genera un token JWT (el recurso creado es la sesión)
//  3. Nunca usarías GET /login?password=1234 — quedaría en logs y caché
//
//  CÓDIGO DE RESPUESTA EXITOSO: 201 Created
//
//  EJEMPLOS:

//   Crear un nuevo usuario
//  POST /api/usuarios
//  Headers: { Content-Type: "application/json" }
//  Body: { "nombre": "Carlos", "email": "carlos@mail.com", "password": "secreta123" }
//  → Respuesta 201: { "exito": true, "dato": { "_id": "64abc...", "nombre": "Carlos" } }
//  → Si falta email: 400 { "errores": ["El email es obligatorio"] }
//  → Si email ya existe: 409 { "mensaje": "El email ya está registrado" }
//
//   Login
//  POST /api/auth/login
//  Body: { "email": "carlos@mail.com", "password": "secreta123" }
//  → Respuesta 200: { "token": "eyJhbGci...", "usuario": { "nombre": "Carlos" } }
//  → Si credenciales incorrectas: 401 { "mensaje": "Email o contraseña incorrectos" }
//
//   En Express con Mongoose:
//  app.post('/api/usuarios', async (req, res) => {
//    try {
//      const { nombre, email, password } = req.body;
//      if (!nombre || !email || !password) {
//        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
//      }
//      const nuevoUsuario = new Usuario({ nombre, email, password });
//      await nuevoUsuario.save();  // los hooks pre-save se ejecutan aquí
//      res.status(201).json({ exito: true, dato: nuevoUsuario });
//    } catch (error) {
//      if (error.code === 11000) {
//        return res.status(409).json({ mensaje: "Email ya registrado" });
//      }
//      res.status(500).json({ mensaje: "Error interno" });
//    }
//  });
//
//   Con fetch() en el frontend:
//  const respuesta = await fetch('/api/usuarios', {
//    method: 'POST',
//    headers: { 'Content-Type': 'application/json' },
//    body: JSON.stringify({ nombre: 'Carlos', email: 'carlos@mail.com', password: '1234' })
//  });
//  const datos = await respuesta.json();
//  if (respuesta.status === 201) { /* usuario creado */ }
//  if (respuesta.status === 409) { /* email ya existe */ }


// ============================================================
//  MÉTODO PUT — Actualizar un recurso COMPLETO
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  PUT sirve para REEMPLAZAR COMPLETAMENTE un recurso existente.
//  Envías TODOS los campos del recurso con sus nuevos valores.
//  Los campos que no envíes quedan en null o undefined (dependen
//  de cómo esté programado el servidor).
//
//  CARACTERÍSTICAS TÉCNICAS:
//  ──────────────────────────
//  ✅ Tiene BODY    — los nuevos datos van en el cuerpo
//  ❌ NO es seguro  — modifica datos
//  ✅ Es IDEMPOTENTE — hacer PUT 5 veces con los mismos datos
//                     siempre deja el recurso en el mismo estado final
//  ❌ No tiene sentido sin ID en la URL (¿cómo sabe qué reemplazar?)
//
//  DIFERENCIA CLAVE CON PATCH:
//  ────────────────────────────
//  PUT   → Reemplaza el recurso COMPLETO (como borrar y volver a crear)
//  PATCH → Solo modifica los campos que envías (el resto queda igual)
//
//  Ejemplo concreto con un usuario real:
//  Usuario actual en MongoDB:
//  { _id: "...", nombre: "Juan", email: "juan@mail.com", ciudad: "Cali", activo: true }
//
//  CON PUT { nombre: "Juan Actualizado", email: "nuevo@mail.com" }:
//  → Resultado: { _id: "...", nombre: "Juan Actualizado", email: "nuevo@mail.com" }
//  → ciudad y activo DESAPARECEN porque no los enviaste
//  → (en Mongoose con $set esto no pasa, pero en PUT semántico puro sí)
//
//  CON PATCH { nombre: "Juan Actualizado" }:
//  → Resultado: { _id: "...", nombre: "Juan Actualizado", email: "juan@mail.com", ciudad: "Cali", activo: true }
//  → Solo cambia nombre. Todo lo demás se conserva intacto.
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Editar completamente el perfil de un usuario (formulario con todos los campos)
//  - Reemplazar toda la información de un producto
//  - Actualizar un artículo entero en un blog
//  - Cuando la UI tiene un formulario con TODOS los campos cargados
//    y el usuario los puede editar todos
//
//  ¿CUÁNDO NO USARLO Y USAR PATCH?
//  ────────────────────────────────
//  - Cambiar solo la contraseña (no deberías enviar todos los datos por eso)
//  - Activar/desactivar un usuario
//  - Cambiar solo la foto de perfil
//  - Cualquier actualización de 1-2 campos de un documento grande
//
//  CÓDIGO DE RESPUESTA EXITOSO: 200 OK
//
//  EJEMPLOS:

//   Actualizar completamente el usuario 64abc123
//  PUT /api/usuarios/64abc123
//  Body: {
//    "nombre": "Juan Pérez Actualizado",
//    "email": "juannuevo@mail.com",
//    "ciudad": "Bogotá",
//    "activo": true
//  }
//  → Respuesta 200: { "dato": { "_id": "...", "nombre": "Juan Pérez Actualizado", ... } }
//  → Si no existe: 404 { "mensaje": "Usuario no encontrado" }
//
//   En Express con Mongoose:
//  app.put('/api/usuarios/:id', async (req, res) => {
//    try {
//      const actualizado = await Usuario.findByIdAndUpdate(
//        req.params.id,
//        req.body,               // reemplaza con todo lo que llegó en el body
//        { new: true, runValidators: true }  // devuelve el doc actualizado + valida
//      );
//      if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
//      res.status(200).json({ dato: actualizado });
//    } catch (error) {
//      res.status(500).json({ mensaje: error.message });
//    }
//  });
//
//   Con fetch() en el frontend:
//  const respuesta = await fetch(`/api/usuarios/${userId}`, {
//    method: 'PUT',
//    headers: {
//      'Content-Type': 'application/json',
//      'Authorization': `Bearer ${token}`
//    },
//    body: JSON.stringify({ nombre: 'Juan', email: 'juan@mail.com', ciudad: 'Bogotá', activo: true })
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
//  Es el método más usado en la práctica para actualizaciones
//  porque rara vez necesitas cambiar TODOS los campos a la vez.
//
//  CARACTERÍSTICAS TÉCNICAS:
//  ──────────────────────────
//  ✅ Tiene BODY    — solo los campos a modificar
//  ❌ NO es seguro  — modifica datos
//  ⚠️  NO siempre es idempotente — depende de la implementación.
//     PATCH { precio: precio * 0.9 } aplicado 3 veces da 3 precios distintos.
//     PATCH { activo: false } aplicado 3 veces siempre da activo: false.
//
//  EN MONGOOSE, $set GARANTIZA EL COMPORTAMIENTO CORRECTO:
//  ─────────────────────────────────────────────────────────
//  findByIdAndUpdate(id, { $set: req.body }, options)
//  $set → solo actualiza los campos presentes en req.body
//  Sin $set → reemplazaría el documento completo (comportamiento de PUT)
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Cambiar solo la contraseña:         PATCH /api/usuarios/5  → { password: "nueva" }
//  - Activar/desactivar:                 PATCH /api/usuarios/5  → { activo: false }
//  - Cambiar solo el precio:             PATCH /api/productos/3 → { precio: 299000 }
//  - Marcar tarea como completada:       PATCH /api/tareas/7    → { completada: true }
//  - Cambiar foto de perfil:             PATCH /api/usuarios/5  → { fotoPerfil: "url" }
//  - Actualizar un campo específico:     PATCH /api/config/5    → { tema: "oscuro" }
//  - Cualquier actualización parcial de 1 o pocos campos
//
//  CÓDIGO DE RESPUESTA EXITOSO: 200 OK
//
//  EJEMPLOS:

//   Cambiar SOLO el email del usuario 64abc123
//  PATCH /api/usuarios/64abc123
//  Body: { "email": "nuevoemail@mail.com" }
//  → nombre, ciudad, activo, password... todos se conservan igual
//  → Respuesta 200: { "dato": { "_id": "...", "nombre": "Juan", "email": "nuevoemail@mail.com", ... } }
//
//   Desactivar un usuario
//  PATCH /api/usuarios/64abc123
//  Body: { "activo": false }
//  → Solo cambia activo. Todo lo demás permanece intacto.
//
//   En Express con Mongoose usando $set:
//  app.patch('/api/usuarios/:id', async (req, res) => {
//    try {
//      if (!req.body || Object.keys(req.body).length === 0) {
//        return res.status(400).json({ mensaje: "Envía al menos un campo para actualizar" });
//      }
//      const actualizado = await Usuario.findByIdAndUpdate(
//        req.params.id,
//        { $set: req.body },            // $set → solo actualiza los campos enviados
//        { new: true, runValidators: true }
//      );
//      if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
//      res.status(200).json({
//        dato: actualizado,
//        camposActualizados: Object.keys(req.body)
//      });
//    } catch (error) {
//      res.status(500).json({ mensaje: error.message });
//    }
//  });


// ============================================================
//  MÉTODO DELETE — Eliminar un recurso
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  DELETE sirve para ELIMINAR un recurso del servidor.
//  Generalmente el recurso se identifica por su ID en la URL.
//  Normalmente NO lleva body (aunque técnicamente puede tenerlo).
//
//  CARACTERÍSTICAS TÉCNICAS:
//  ──────────────────────────
//  ❌ NO es seguro  — elimina datos
//  ✅ Es IDEMPOTENTE — eliminar algo 5 veces tiene el mismo resultado
//                     (después de la primera vez, ya no existe)
//  ⚠️  Generalmente sin BODY (aunque el estándar lo permite)
//  ⚠️  Acción irreversible si es borrado físico
//
//  BORRADO FÍSICO vs BORRADO LÓGICO:
//  ───────────────────────────────────
//
//  BORRADO FÍSICO (Hard Delete):
//    → Elimina el registro PERMANENTEMENTE de la base de datos.
//    → Usa: await Modelo.findByIdAndDelete(id)
//    → Ventaja: base de datos más limpia, menos espacio.
//    → Desventaja: irreversible, rompe el historial de referencias.
//    → Úsalo para: datos temporales, de prueba, o por requisitos legales (GDPR).
//
//  BORRADO LÓGICO (Soft Delete):
//    → NO elimina el registro. Solo cambia un campo { activo: false }.
//    → Usa: await Modelo.findByIdAndUpdate(id, { activo: false })
//    → Ventaja: historial conservado, recuperable, integridad referencial.
//    → Desventaja: base de datos crece, debes filtrar en cada consulta.
//    → Úsalo para: usuarios, productos, pedidos, cualquier dato con historial.
//
//  EJEMPLO DE POR QUÉ EL BORRADO LÓGICO IMPORTA:
//  Si el usuario "Juan" hizo 20 pedidos y lo eliminas físicamente,
//  esos 20 pedidos ahora referencian un usuario que no existe.
//  El historial de pedidos queda corrupto.
//  Con borrado lógico, Juan sigue existiendo (activo: false),
//  y el historial de pedidos sigue siendo coherente.
//
//  ¿CUÁNDO USARLO?
//  ────────────────
//  - Eliminar la cuenta propia:    DELETE /api/usuarios/5
//  - Admin elimina un usuario:     DELETE /api/admin/usuarios/5
//  - Borrar un producto:           DELETE /api/productos/laptop-hp
//  - Eliminar un comentario:       DELETE /api/comentarios/99
//  - Cancelar un pedido:           DELETE /api/pedidos/12
//  - Revocar un token:             DELETE /api/auth/token
//
//  CÓDIGO DE RESPUESTA EXITOSO:
//  200 OK         → devuelves el recurso eliminado en el body (más informativo)
//  204 No Content → no devuelves nada (más estricto según REST puro)
//
//  EJEMPLOS:

//   Eliminar el usuario 64abc123
//  DELETE /api/usuarios/64abc123
//  Headers: { Authorization: "Bearer eyJ..." }
//  Body: (vacío)
//  → Respuesta 200: { "mensaje": "Eliminado", "eliminado": { "_id": "...", "nombre": "Juan" } }
//  → Si no existe: 404 { "mensaje": "No encontrado" }
//
//   En Express — Borrado FÍSICO:
//  app.delete('/api/usuarios/:id', async (req, res) => {
//    const eliminado = await Usuario.findByIdAndDelete(req.params.id);
//    if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
//    res.status(200).json({ mensaje: "Eliminado permanentemente", dato: eliminado });
//  });
//
//   En Express — Borrado LÓGICO (recomendado en producción):
//  app.delete('/api/usuarios/:id', async (req, res) => {
//    const desactivado = await Usuario.findByIdAndUpdate(
//      req.params.id,
//      { $set: { activo: false, eliminadoEn: new Date() } },
//      { new: true }
//    );
//    if (!desactivado) return res.status(404).json({ mensaje: "No encontrado" });
//    res.status(200).json({ mensaje: "Usuario desactivado", dato: desactivado });
//  });


// ============================================================
//  MÉTODO HEAD — Solo verificar sin descargar el body
// ============================================================
//
//  ¿QUÉ ES?
//  ─────────
//  HEAD es exactamente igual a GET pero el servidor devuelve
//  SOLO los headers de la respuesta, SIN el body.
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
//  ¿CUÁNDO SE USA EN LA PRÁCTICA?
//  ────────────────────────────────
//  - Verificar si un archivo existe antes de descargarlo (Content-Length)
//  - Comprobar cuándo fue la última modificación (Last-Modified) para caché
//  - Los crawlers de Google usan HEAD para detectar cambios en URLs
//  - Health checks: verificar que un servidor responde sin descargar la respuesta
//  - Verificar si un recurso existe sin traer sus datos
//
//  EJEMPLO:

//  HEAD /api/usuarios/5
//  → Si el usuario existe: 200 OK  (sin body en la respuesta)
//  → Si no existe: 404 Not Found   (sin body)
//  → Headers incluyen: Content-Length, Last-Modified, ETag, etc.
//
//   Express responde HEAD automáticamente a las rutas GET.
//   No necesitas definir una ruta HEAD separada.
//  app.get('/api/usuarios/:id', (req, res) => {
//    res.status(200).json(usuario); // En HEAD, Express omite el body automáticamente
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
//  Se usa principalmente en dos casos muy importantes:
//
//  1. CORS PREFLIGHT REQUEST (el caso más común):
//     Cuando tu frontend en http://localhost:5173 (Vite/React)
//     intenta hacer una petición a tu backend en http://localhost:3000,
//     el navegador detecta que son ORÍGENES DIFERENTES.
//     Antes de enviar la petición real, el navegador envía automáticamente
//     un OPTIONS para preguntar: "¿Puedo hacer peticiones desde este origen?"
//     Si el servidor responde con los headers CORS correctos,
//     el navegador procede con la petición real.
//     Si no responde correctamente → el navegador bloquea la petición
//     y ves el famoso error: "CORS policy: No 'Access-Control-Allow-Origin' header"
//
//  2. Descubrimiento de API:
//     Para saber qué operaciones están disponibles en un endpoint.
//     Menos común hoy porque las APIs tienen documentación (Swagger, Postman).
//
//  EJEMPLO:

//  OPTIONS /api/usuarios
//  → Respuesta headers:
//    Allow: GET, POST, OPTIONS
//    Access-Control-Allow-Origin: http://localhost:5173
//    Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
//    Access-Control-Allow-Headers: Content-Type, Authorization
//    Access-Control-Max-Age: 86400  ← el navegador puede cachear el preflight por 1 día
//
//   En Express, el paquete 'cors' maneja OPTIONS automáticamente:
//  const cors = require('cors');
//  app.use(cors({
//    origin: 'http://localhost:5173',           // Solo permite este origen
//    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//    allowedHeaders: ['Content-Type', 'Authorization']
//  }));
//   Con esta configuración, el paquete cors responde todos los OPTIONS
//   automáticamente con los headers correctos. No necesitas hacer nada más.


// ============================================================
//  RESUMEN VISUAL COMPLETO DE MÉTODOS HTTP
// ============================================================
//
//  ┌─────────┬──────────────────────────┬───────┬──────────┬───────────────┬──────────────────┐
//  │ Método  │ Acción                   │ Body  │ Seguro   │ Idempotente   │ Código éxito     │
//  ├─────────┼──────────────────────────┼───────┼──────────┼───────────────┼──────────────────┤
//  │ GET     │ Leer / Obtener           │  No   │ Sí       │ Sí            │ 200 OK           │
//  │ POST    │ Crear / Enviar           │  Sí   │ No       │ No            │ 201 Created      │
//  │ PUT     │ Actualizar COMPLETO      │  Sí   │ No       │ Sí            │ 200 OK           │
//  │ PATCH   │ Actualizar PARCIAL       │  Sí   │ No       │ No siempre    │ 200 OK           │
//  │ DELETE  │ Eliminar                 │  No   │ No       │ Sí            │ 200 / 204        │
//  │ HEAD    │ Verificar sin descargar  │  No   │ Sí       │ Sí            │ 200 OK           │
//  │ OPTIONS │ Consultar métodos / CORS │  No   │ Sí       │ Sí            │ 200 OK           │
//  └─────────┴──────────────────────────┴───────┴──────────┴───────────────┴──────────────────┘
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
//    2. Un MENSAJE REASON    →  texto corto descriptivo (ej: "Not Found")
//    3. HEADERS              →  metadatos de la respuesta
//    4. Un CUERPO (body)     →  los datos reales (JSON, HTML, etc.)
//
//  El código de estado le dice al cliente SI la petición funcionó,
//  y si no funcionó, POR QUÉ falló. Es el lenguaje universal que
//  usan clientes y servidores para comunicar el resultado.
//
//  REGLA DE ORO: SIEMPRE usa el código correcto.
//  Un 200 con { error: true } en el body es una mala práctica terrible.
//  Los clientes leen el status code PRIMERO para decidir qué hacer.
//  Si dices 200, el cliente asume éxito y no maneja el error.
//
//  ANALOGÍA DEL RESTAURANTE:
//  ─────────────────────────
//  - 200 → "Sí señor, en 30 minutos llega su pedido." (todo bien)
//  - 201 → "Su mesa fue reservada. Número: 42." (algo nuevo fue creado)
//  - 204 → "Pedido cancelado correctamente." (sin más información)
//  - 301 → "Nos mudamos, ahora estamos en la calle 5." (redirección permanente)
//  - 400 → "No entendí su pedido. ¿Puede repetirlo?" (error del cliente)
//  - 401 → "¿Me da su nombre? No lo tengo registrado." (no autenticado)
//  - 403 → "Lo conozco señor, pero esa sección es VIP." (sin permiso)
//  - 404 → "Ese plato no existe en nuestra carta." (no encontrado)
//  - 409 → "Ya tiene una reserva para hoy señor." (conflicto)
//  - 422 → "Entiendo que pide 'pizza', pero el sabor 'capibara' no existe." (datos inválidos)
//  - 429 → "Está llamando demasiado seguido. Espere 1 minuto." (rate limit)
//  - 500 → "Perdone, se cayó la cocina. Error nuestro." (error del servidor)
//  - 503 → "Estamos cerrados por mantenimiento. Vuelva en 1 hora." (no disponible)
//
//  LAS 5 FAMILIAS DE CÓDIGOS:
//  ───────────────────────────
//    1xx → Informativos   → el servidor está procesando, espera
//    2xx → Éxito          → todo salió bien ✅
//    3xx → Redirecciones  → el recurso está en otro lugar 🔄
//    4xx → Error cliente  → TÚ hiciste algo mal ❌
//    5xx → Error servidor → EL SERVIDOR falló 💥
//
// ============================================================


// ============================================================
//  FAMILIA 1xx — INFORMATIVOS
// ============================================================

/*
  100 — Continue
  ───────────────
  El servidor recibió los headers de la petición y el cliente
  puede continuar enviando el body. Se usa en peticiones con
  archivos grandes: primero preguntas si el servidor puede
  recibirlos con el header Expect: 100-continue.
  Si el servidor responde 100, envías el body.
  Si responde 417 Expectation Failed, no lo envías (ahorras el upload).
  En la práctica moderna, los clientes envían el body de todas
  formas y este código es cada vez menos relevante.
*/

/*
  101 — Switching Protocols
  ──────────────────────────
  El servidor acepta cambiar el protocolo de comunicación.
  El caso más común en el mundo web: pasar de HTTP a WebSocket.
  WebSocket permite comunicación BIDIRECCIONAL en tiempo real
  (el servidor puede enviar mensajes al cliente sin que el cliente
  haga una petición). Lo usas para chats, notificaciones en vivo,
  juegos multijugador, editores colaborativos.

  Flujo WebSocket:
  1. Cliente envía petición HTTP con header: Upgrade: websocket
  2. Servidor responde: 101 Switching Protocols
  3. La conexión HTTP se convierte en una conexión WebSocket persistente
  4. Ahora cliente Y servidor pueden enviar mensajes en cualquier momento
*/

//   Con socket.io en Express:
//  const { Server } = require('socket.io');
//  const io = new Server(servidor);
//  io.on('connection', (socket) => {
//    console.log('Cliente conectado via WebSocket (101)');
//    socket.emit('bienvenida', { mensaje: 'Conectado al chat' });
//    socket.on('mensaje', (data) => {
//      io.emit('mensaje', data); // broadcast a todos los clientes
//    });
//  });


// ============================================================
//  FAMILIA 2xx — ÉXITO ✅
// ============================================================

/*
  200 — OK
  ─────────
  La petición fue exitosa y hay datos en la respuesta.
  Es el código más genérico de éxito.
  Se usa para: GET (siempre), PUT, PATCH, DELETE (cuando devuelves datos).
  No lo uses para POST que crea recursos — para eso es 201.
*/

//  app.get('/api/usuarios', async (req, res) => {
//    const usuarios = await Usuario.find({ activo: true });
//    res.status(200).json({ total: usuarios.length, datos: usuarios });
//     sin .status(200) Express usa 200 por defecto,
//     pero es buena práctica ser explícito
//  });

/*
  201 — Created
  ──────────────
  Se creó exitosamente un nuevo recurso.
  Úsalo SIEMPRE después de un POST que crea algo nuevo.
  La respuesta generalmente incluye el recurso creado con su ID asignado.
  Opcionalmente se incluye un header Location con la URL del nuevo recurso:
  Location: /api/usuarios/64abc123
*/

//  app.post('/api/usuarios', async (req, res) => {
//    const nuevo = await Usuario.create(req.body);
//    res
//      .status(201)
//      .header('Location', `/api/usuarios/${nuevo._id}`)
//      .json({ exito: true, dato: nuevo });
//  });

/*
  202 — Accepted
  ───────────────
  La petición fue recibida y SE PROCESARÁ en el futuro,
  pero AÚN NO ha sido procesada.
  Se usa para operaciones asíncronas largas: exportar un reporte,
  procesar un video, enviar emails masivos, etc.
  El cliente puede consultar el estado del proceso con polling.
*/

//  app.post('/api/reportes/generar', async (req, res) => {
//    const jobId = await colaTrabajos.agregar({ tipo: 'reporte', config: req.body });
//    res.status(202).json({
//      mensaje: "Reporte en proceso. Te notificaremos cuando esté listo.",
//      jobId,
//      urlEstado: `/api/reportes/estado/${jobId}`
//    });
//  });

/*
  204 — No Content
  ─────────────────
  Exitoso pero SIN body en la respuesta.
  Se usa en DELETE cuando no necesitas devolver nada,
  o en PUT/PATCH cuando no necesitas devolver el documento actualizado.
  ⚠️  Si intentas leer res.json() en el cliente cuando el status es 204
  obtendrás un error porque no hay body. Siempre verifica el status primero.
*/

//   En el servidor:
//  app.delete('/api/usuarios/:id', async (req, res) => {
//    await Usuario.findByIdAndDelete(req.params.id);
//    res.status(204).send(); // .send() sin argumentos → sin body
//  });
//
//   En el cliente, debes manejar 204 diferente:
//  const respuesta = await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
//  if (respuesta.status === 204) {
//    console.log('Eliminado — sin datos en la respuesta');
//     NO llames respuesta.json() aquí — lanzaría un error
//  }

/*
  206 — Partial Content
  ──────────────────────
  El servidor devuelve solo UNA PARTE del recurso solicitado.
  YouTube y Netflix lo usan constantemente para el streaming de video.
  El cliente envía el header Range para pedir un rango de bytes específico:
  Range: bytes=0-1023  → pide los primeros 1024 bytes
  El servidor responde con Content-Range: bytes 0-1023/50000
  Esto permite pausar y reanudar descargas sin empezar desde cero.
*/


// ============================================================
//  FAMILIA 3xx — REDIRECCIONES 🔄
// ============================================================

/*
  301 — Moved Permanently
  ────────────────────────
  El recurso se movió PERMANENTEMENTE a una nueva URL.
  El navegador actualiza su caché y siempre irá a la nueva URL.
  Google actualiza su índice para la nueva URL.
  El header Location indica la nueva URL.
  Úsalo cuando cambias URLs de forma definitiva.

  Caso real: migraste de HTTP a HTTPS
  → Toda petición a http://... redirige permanentemente a https://...
*/

//  app.get('/vieja-ruta', (req, res) => {
//    res.redirect(301, '/nueva-ruta');
//  });
//
//   Para redirigir HTTP → HTTPS en producción:
//  app.use((req, res, next) => {
//    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//      return res.redirect(301, `https://${req.headers.host}${req.url}`);
//    }
//    next();
//  });

/*
  302 — Found (Moved Temporarily)
  ────────────────────────────────
  El recurso está TEMPORALMENTE en otra URL.
  El navegador NO guarda en caché — siempre consulta el servidor.
  Google mantiene la URL original en su índice.
  Muy usado en flujos de autenticación: después de hacer login,
  el servidor te redirige al dashboard.
*/

//  app.post('/login', async (req, res) => {
//    const usuario = await autenticar(req.body);
//    if (usuario) {
//      req.session.userId = usuario._id;
//      return res.redirect(302, '/dashboard');
//    }
//    res.redirect(302, '/login?error=credenciales-invalidas');
//  });

/*
  304 — Not Modified
  ───────────────────
  El recurso NO cambió desde la última vez que el cliente lo pidió.
  El cliente puede usar su versión en caché, ahorrando ancho de banda.

  Funciona con condicionales:
  1ª petición:  Cliente pide /api/productos
                Servidor responde 200 + datos + ETag: "abc123"
  2ª petición:  Cliente envía If-None-Match: "abc123"
                Servidor verifica si cambió:
                  - Si no cambió → responde 304 (sin body, cliente usa caché)
                  - Si cambió   → responde 200 + nuevos datos + nuevo ETag
*/


// ============================================================
//  FAMILIA 4xx — ERRORES DEL CLIENTE ❌
// ============================================================

/*
  400 — Bad Request
  ──────────────────
  La petición está mal formada o los datos son inválidos.
  El servidor no puede procesarla porque le falta información
  o los datos tienen un formato incorrecto.

  Causas comunes:
  - JSON mal formado: { nombre: "Juan" (falta la llave de cierre)
  - Campos obligatorios ausentes: nombre es required pero no llegó
  - Tipos de datos incorrectos: precio: "dos millones" (debería ser número)
  - Parámetros mal formados: ?pagina=abc (debería ser número)
  - Validación de Mongoose falla (ValidationError)

  Es el código de error más genérico del lado del cliente.
  Cuando no sabes cuál error usar, 400 es un buen default.
*/

//  app.post('/api/usuarios', (req, res) => {
//    const errores = [];
//    if (!req.body.nombre) errores.push("El nombre es obligatorio");
//    if (!req.body.email)  errores.push("El email es obligatorio");
//    if (!req.body.email?.includes('@')) errores.push("Email inválido");
//    if (errores.length > 0) {
//      return res.status(400).json({ codigo: 400, errores });
//    }
//     ... crear el usuario
//  });

/*
  401 — Unauthorized
  ───────────────────
  El cliente NO está AUTENTICADO. El servidor no sabe quién eres.
  Necesitas enviar un token JWT válido o credenciales correctas.

  ⚠️  CONFUSIÓN CLÁSICA — el nombre es engañoso:
  401 "Unauthorized" = "Unauthenticated" (no autenticado, no identificado)
  403 "Forbidden"    = "Unauthorized" (identificado pero no permitido)

  La respuesta incluye generalmente el header:
  WWW-Authenticate: Bearer realm="API de Tienda"
  Que le dice al cliente qué tipo de autenticación se requiere.

  Cuándo ocurre:
  - No enviaste el token JWT
  - El token expiró
  - El token está malformado
  - Las credenciales de login son incorrectas
*/

//  function verificarToken(req, res, next) {
//    const authHeader = req.headers['authorization'];
//    if (!authHeader || !authHeader.startsWith('Bearer ')) {
//      return res.status(401).json({
//        codigo: 401,
//        mensaje: "Acceso denegado. Debes iniciar sesión.",
//        solucion: "Envía el token en el header: Authorization: Bearer TU_TOKEN"
//      });
//    }
//    try {
//      const token = authHeader.split(' ')[1];
//      const payload = jwt.verify(token, process.env.JWT_SECRET);
//      req.usuario = payload;
//      next();
//    } catch (error) {
//      if (error.name === 'TokenExpiredError') {
//        return res.status(401).json({ codigo: 401, mensaje: "Token expirado. Vuelve a iniciar sesión." });
//      }
//      return res.status(401).json({ codigo: 401, mensaje: "Token inválido." });
//    }
//  }

/*
  403 — Forbidden
  ────────────────
  El servidor SABE quién eres (token válido, usuario identificado)
  pero NO TIENES PERMISO para realizar esta acción específica.
  Diferente al 401: aquí SÍ estás autenticado, pero no autorizado.

  Cuándo ocurre:
  - Usuario normal intenta acceder a rutas de administrador
  - Intentas modificar datos de otro usuario (no los tuyos)
  - Tu cuenta no tiene el rol necesario para esta operación
  - La acción está bloqueada para tu tipo de cuenta

  En diseño de APIs REST, nunca digas 404 cuando deberías decir 403.
  Algunos sistemas devuelven 404 intencionalmente para no revelar
  que el recurso existe (seguridad por oscuridad), pero el 403 es más honesto.
*/

//  function verificarRol(rolesPermitidos) {
//    return (req, res, next) => {
//      if (!rolesPermitidos.includes(req.usuario.rol)) {
//        return res.status(403).json({
//          codigo: 403,
//          mensaje: `Acceso prohibido. Se requiere uno de estos roles: ${rolesPermitidos.join(', ')}`,
//          tuRol: req.usuario.rol
//        });
//      }
//      next();
//    };
//  }
//
//   Uso:
//  app.delete('/api/admin/usuarios/:id', verificarToken, verificarRol(['admin']), async (req, res) => {
//    await Usuario.findByIdAndDelete(req.params.id);
//    res.status(200).json({ mensaje: "Usuario eliminado por admin" });
//  });
//
//   Verificar que el usuario solo modifica sus propios datos:
//  app.put('/api/usuarios/:id', verificarToken, async (req, res) => {
//    if (req.params.id !== req.usuario._id.toString() && req.usuario.rol !== 'admin') {
//      return res.status(403).json({ codigo: 403, mensaje: "Solo puedes modificar tu propio perfil" });
//    }
//     ... actualizar
//  });

/*
  404 — Not Found
  ────────────────
  El recurso solicitado NO EXISTE en el servidor.
  El código más famoso de internet (la página de error 404).

  Causas comunes:
  - URL mal escrita: /api/usarios (typo) en vez de /api/usuarios
  - El recurso fue eliminado: el producto con ese ID ya no existe
  - El ID no existe en la base de datos
  - La ruta simplemente no está definida en el servidor

  ¿Cuándo usar 404 vs 400 vs 403?
  - /api/usuarios/abc123-no-valido → 400 (ID mal formado)
  - /api/usuarios/64abc123 (no existe) → 404 (no encontrado)
  - /api/admin/panel (sin permisos) → 403 (prohibido)
  - /api/ruta-inexistente → 404 (ruta no definida)
*/

//  app.get('/api/usuarios/:id', async (req, res) => {
//    try {
//      const usuario = await Usuario.findById(req.params.id);
//      if (!usuario) {
//        return res.status(404).json({
//          codigo: 404,
//          mensaje: `No existe ningún usuario con ID ${req.params.id}`
//        });
//      }
//      res.status(200).json({ dato: usuario });
//    } catch (error) {
//      if (error.name === 'CastError') { // ID con formato inválido
//        return res.status(400).json({ codigo: 400, mensaje: "ID inválido" });
//      }
//      res.status(500).json({ codigo: 500, mensaje: "Error interno" });
//    }
//  });

/*
  405 — Method Not Allowed
  ─────────────────────────
  El método HTTP usado no está permitido para esa ruta.
  Ejemplo: intentar hacer DELETE en una ruta que solo acepta GET.
  La respuesta debe incluir el header Allow con los métodos permitidos:
  Allow: GET, POST
*/

//   Express no genera 405 automáticamente.
//   Si haces PUT en una ruta que solo tiene GET, Express dará 404.
//   Para 405 explícito:
//  app.all('/api/usuarios', (req, res, next) => {
//    const metodosPermitidos = ['GET', 'POST'];
//    if (!metodosPermitidos.includes(req.method)) {
//      return res.status(405)
//        .header('Allow', metodosPermitidos.join(', '))
//        .json({ codigo: 405, mensaje: `Método ${req.method} no permitido. Usa: ${metodosPermitidos.join(', ')}` });
//    }
//    next();
//  });

/*
  409 — Conflict
  ───────────────
  Conflicto con el estado actual del recurso.
  El servidor no puede completar la petición porque entraría
  en conflicto con algo que ya existe.

  Casos más comunes:
  - Registrar un email que ya está en uso (violación unique)
  - Crear un nombre de usuario que ya existe
  - Intentar crear un registro duplicado
  - Eliminar una categoría que tiene productos (integridad referencial)
  - Dos usuarios intentan editar el mismo recurso simultáneamente

  En Mongoose, código 11000 = violación de índice unique = 409.
*/

//  app.post('/api/usuarios', async (req, res) => {
//    try {
//      const nuevo = await Usuario.create(req.body);
//      res.status(201).json({ dato: nuevo });
//    } catch (error) {
//      if (error.code === 11000) {
//        const campo = Object.keys(error.keyValue)[0];
//        return res.status(409).json({
//          codigo: 409,
//          mensaje: `El ${campo} '${error.keyValue[campo]}' ya está registrado`
//        });
//      }
//      res.status(500).json({ codigo: 500, mensaje: "Error interno" });
//    }
//  });

/*
  410 — Gone
  ───────────
  El recurso EXISTIÓ pero fue eliminado PERMANENTEMENTE y
  ya no volverá. A diferencia del 404, el servidor confirma
  activamente que el recurso existió y fue eliminado.

  Uso práctico:
  - Artículos de blog eliminados intencionalmente
  - Cuentas de usuario dadas de baja permanentemente
  - Versiones antiguas de API deprecadas

  Los motores de búsqueda desindexan páginas con 410 más
  agresivamente que con 404, lo que puede ser útil si quieres
  que Google elimine una URL de su índice rápidamente.
*/

/*
  422 — Unprocessable Entity
  ───────────────────────────
  El JSON llegó BIEN FORMADO (sintácticamente correcto)
  pero los VALORES son semánticamente inválidos.

  DIFERENCIA IMPORTANTE con 400:
  400 = "No entiendo lo que me mandaste" (formato roto, JSON inválido)
  422 = "Entiendo lo que mandaste PERO los valores no tienen sentido"

  En la práctica muchos APIs usan 400 para ambos casos.
  Pero 422 es más preciso para errores de validación de valores.

  Casos de uso:
  - edad: -5 (JSON válido, pero edad negativa no tiene sentido)
  - email: "no-es-un-email" (string válido, pero no es un email)
  - fechaNacimiento: "2030-01-01" (fecha futura para nacimiento)
  - precio: 0 (válido técnicamente, pero no tiene sentido para un producto)
*/

//   Ejemplo combinando 400 y 422:
//  app.post('/api/usuarios', async (req, res) => {
//     400: campos obligatorios ausentes
//    if (!req.body.email || !req.body.password) {
//      return res.status(400).json({ errores: ["email y password son obligatorios"] });
//    }
//     422: valores semánticamente inválidos
//    const errores = [];
//    if (!req.body.email.includes('@')) errores.push("Email inválido");
//    if (req.body.password.length < 6) errores.push("Password debe tener al menos 6 caracteres");
//    if (req.body.edad < 0) errores.push("La edad no puede ser negativa");
//    if (errores.length > 0) {
//      return res.status(422).json({ errores });
//    }
//     ... crear el usuario
//  });

/*
  429 — Too Many Requests  = demasiadas peticiones o solicitudes en un período de tiempo
  ────────────────────────
  El cliente hizo demasiadas peticiones en un período de tiempo.
  El servidor está aplicando RATE LIMITING para protegerse.

  La respuesta incluye generalmente:
  X-RateLimit-Limit: 100       → máximo de peticiones por ventana
  X-RateLimit-Remaining: 0     → peticiones restantes
  X-RateLimit-Reset: 1716800000 → cuándo se reinicia el contador (Unix timestamp)
  Retry-After: 60              → segundos hasta que puedes reintentar

  Casos de uso del rate limiting:
  - Proteger contra ataques de fuerza bruta en el login
  - Prevenir scraping de la API
  - Limitar el uso gratuito de la API
  - Proteger el servidor de sobrecarga
*/

//  const rateLimit = require('express-rate-limit');
//
//   Rate limit general: 100 req/15min por IP
//  const limitadorGeneral = rateLimit({
//    windowMs: 15 * 60 * 1000,  // ventana de 15 minutos
//    max: 100,                   // máximo 100 peticiones por ventana
//    standardHeaders: true,      // incluir headers X-RateLimit-*
//    legacyHeaders: false,
//    message: { codigo: 429, mensaje: "Demasiadas peticiones. Espera 15 minutos." }
//  });
//
//   Rate limit estricto para login: 5 intentos/15min (anti fuerza bruta)
//  const limitadorLogin = rateLimit({
//    windowMs: 15 * 60 * 1000,
//    max: 5,
//    message: { codigo: 429, mensaje: "Demasiados intentos de login. Espera 15 minutos." }
//  });
//
//  app.use('/api/', limitadorGeneral);
//  app.use('/api/auth/login', limitadorLogin);


// ============================================================
//  FAMILIA 5xx — ERRORES DEL SERVIDOR 💥
// ============================================================

/*
  500 — Internal Server Error
  ─────────────────────────────
  Error inesperado en el servidor. El cliente hizo todo bien
  pero el código del servidor falló.
  Es el código de error más genérico del lado del servidor.

  En producción:
  - NO reveles detalles del error al cliente (stack traces, mensajes internos).
    Un atacante puede usar esa información para explotar vulnerabilidades.
  - SÍ registra el error completo en los logs del servidor.
  - Considera usar un servicio de monitoreo (Sentry, Datadog).

  SIEMPRE usa try-catch en rutas async para evitar que el servidor
  crashee sin enviar respuesta al cliente.
*/

//   ❌ Mal — puede crashear sin responder al cliente:
//  app.get('/api/perfil', async (req, res) => {
//    const usuario = await Usuario.findById(req.params.id);
//    res.json(usuario.nombre); // 💥 crash si usuario es null
//  });
//
//   ✅ Bien — siempre responde, aunque sea con error:
//  app.get('/api/perfil', async (req, res) => {
//    try {
//      const usuario = await Usuario.findById(req.params.id);
//      if (!usuario) return res.status(404).json({ mensaje: "No encontrado" });
//      res.status(200).json({ dato: usuario });
//    } catch (error) {
//      console.error('Error en GET /perfil:', error); // log completo para debugging
//      res.status(500).json({
//        codigo: 500,
//        mensaje: process.env.NODE_ENV === 'development'
//          ? error.message  // en desarrollo: muestra el error
//          : "Error interno del servidor"  // en producción: mensaje genérico
//      });
//    }
//  });

/*
  501 — Not Implemented
  ──────────────────────
  El servidor reconoce el método HTTP pero no lo implementó.
  No es un error del cliente — el servidor simplemente no soporta eso.
  Diferente al 405 (Method Not Allowed): el 405 es intencional,
  el 501 significa que el servidor no tiene esa funcionalidad todavía.

  Caso de uso: API en desarrollo donde algunas rutas no están listas.
*/

//  app.put('/api/productos/:id', (req, res) => {
//    res.status(501).json({
//      codigo: 501,
//      mensaje: "Actualización de productos no implementada todavía",
//      eta: "Disponible en la versión 2.0 de la API"
//    });
//  });

/*
  502 — Bad Gateway
  ──────────────────
  Tu servidor intentó llamar a OTRO servicio externo (backend interno,
  microservicio, API de terceros) y recibió una respuesta inválida.

  Muy común en arquitecturas de microservicios donde un servicio
  le habla a otro y ese otro está fallando.

  Ejemplos:
  - Tu API llama a PayU para procesar un pago y PayU falla
  - Nginx (tu proxy) no puede alcanzar Node.js
  - Un microservicio interno está caído
*/

//  app.post('/api/pagos', async (req, res) => {
//    try {
//      const respuestaPago = await axios.post('https://api.payu.com/pay', req.body);
//      res.status(200).json({ transaccion: respuestaPago.data });
//    } catch (error) {
//      if (error.response) {
//         PayU respondió pero con error
//        return res.status(502).json({ codigo: 502, mensaje: "Error en el servicio de pagos: " + error.response.statusText });
//      }
//      if (error.request) {
//         PayU no respondió (timeout, caído)
//        return res.status(502).json({ codigo: 502, mensaje: "Servicio de pagos no disponible" });
//      }
//      res.status(500).json({ codigo: 500, mensaje: "Error interno" });
//    }
//  });

/*
  503 — Service Unavailable
  ──────────────────────────
  El servidor no puede atender peticiones en este momento.
  A diferencia del 500 (error inesperado), el 503 es INTENCIONAL:
  el servidor sabe que no puede responder y lo comunica claramente.

  Causas:
  - El servidor está en mantenimiento programado
  - El servidor está sobrecargado (más peticiones de las que puede manejar)
  - La base de datos está caída o no responde
  - Se están aplicando actualizaciones

  La respuesta incluye el header Retry-After para indicar cuándo
  el servicio volverá a estar disponible.
*/

//  app.use(async (req, res, next) => {
//    if (mongoose.connection.readyState !== 1) {
//      return res.status(503)
//        .header('Retry-After', '30')
//        .json({
//          codigo: 503,
//          mensaje: "Base de datos no disponible. Intenta en 30 segundos.",
//          reintentarEn: "30 segundos"
//        });
//    }
//    next();
//  });

/*
  504 — Gateway Timeout
  ──────────────────────
  Similar al 502 pero por razón de tiempo: tu servidor esperó
  demasiado tiempo por la respuesta de un servicio externo
  y se rindió (timeout).

  Un servicio externo puede tardar demasiado si:
  - Está muy cargado y procesando lentamente
  - Una query a base de datos no tiene índices y es muy lenta
  - Una operación de machine learning tarda demasiado

  Implementar timeouts es una buena práctica para evitar que
  tu servidor quede bloqueado esperando indefinidamente.
*/

//   Con axios, configura un timeout:
//  const respuesta = await axios.get('https://api-externa.com/datos', {
//    timeout: 5000 // 5 segundos máximo
//  });
//
//   Si tarda más de 5 segundos → axios lanza ETIMEDOUT
//   Tú capturas el error y respondes 504


// ============================================================
//  TABLA DE REFERENCIA COMPLETA PARA UN CRUD
// ============================================================
//
//  Operación              Código exitoso   Errores comunes
//  ─────────────────────────────────────────────────────────────────
//  GET    /recursos         200 OK          400 ID mal formado
//  GET    /recursos/:id     200 OK          400 ID inválido
//                                           404 No existe
//  POST   /recursos         201 Created     400 Datos incompletos
//                                           409 Ya existe (unique)
//                                           422 Validación valores
//  PUT    /recursos/:id     200 OK          400 Datos inválidos
//                                           404 No existe
//  PATCH  /recursos/:id     200 OK          400 Sin datos / inválidos
//                                           404 No existe
//  DELETE /recursos/:id     200 OK / 204    404 No existe
//                                           409 Tiene dependencias
//
//  Transversales (aplican a cualquier endpoint):
//  - No autenticado                         401 Falta token / expiró
//  - Autenticado pero sin permisos          403 No autorizado
//  - Demasiadas peticiones                  429 Rate limit
//  - Error del servidor                     500 Error interno
//  - BD caída / mantenimiento              503 No disponible
//  - Timeout esperando servicio externo    504 Gateway timeout
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
//  GET    http://localhost:3000/                              → Info de rutas
//  GET    http://localhost:3000/api/usuarios                  → 200 Lista todos
//  GET    http://localhost:3000/api/usuarios?ciudad=Cali      → 200 Filtrado
//  GET    http://localhost:3000/api/usuarios?activo=true      → 200 Solo activos
//  GET    http://localhost:3000/api/usuarios/1                → 200 Obtiene uno
//  GET    http://localhost:3000/api/usuarios/999              → 404 No existe
//  GET    http://localhost:3000/api/usuarios/abc              → 400 ID inválido
//  POST   http://localhost:3000/api/usuarios  (con body)      → 201 Crea
//  POST   http://localhost:3000/api/usuarios  (sin body)      → 400 Error
//  POST   http://localhost:3000/api/usuarios  (email dupl)    → 409 Conflicto
//  PUT    http://localhost:3000/api/usuarios/1  (con body)    → 200 Reemplaza todo
//  PATCH  http://localhost:3000/api/usuarios/1  (con body)    → 200 Actualiza parte
//  DELETE http://localhost:3000/api/usuarios/1                → 200 Elimina
//  GET    http://localhost:3000/api/demo/headers              → Tus headers actuales
//  GET    http://localhost:3000/api/demo/codigos/201          → Explica código 201
//  GET    http://localhost:3000/api/demo/codigos/404          → Explica código 404
//  GET    http://localhost:3000/ruta-inexistente              → 404 Ruta no existe
//
// ============================================================

"use strict";

const express = require("express");
const app     = express();
const PUERTO  = 3000;

app.use(express.json());
// Middleware global: parsea el body JSON.
// Sin esto, req.body sería undefined en POST/PUT/PATCH.


// ─────────────────────────────────────────────────────────
//  MIDDLEWARE GLOBAL: Logger detallado de peticiones HTTP
//  Muestra en consola el detalle de cada petición recibida.
//  En producción usarías el paquete 'morgan' para esto.
// ─────────────────────────────────────────────────────────
app.use((req, res, next) => {
  const hora = new Date().toLocaleTimeString("es-CO");

  console.log("\n══════════════════════════════════════════════");
  console.log("  📨 NUEVA PETICIÓN HTTP");
  console.log("══════════════════════════════════════════════");
  console.log(`  ⏰ Hora:    ${hora}`);
  console.log(`  📋 Método:  ${req.method}`);
  console.log(`  🌐 URL:     ${req.url}`);
  console.log(`  🖥️  IP:      ${req.ip || req.connection.remoteAddress}`);

  // Mostrar query params si existen
  if (Object.keys(req.query).length > 0) {
    console.log(`  🔍 Query:   ${JSON.stringify(req.query)}`);
  }

  // Mostrar el Content-Type si existe (indica qué tipo de body envía el cliente)
  if (req.headers["content-type"]) {
    console.log(`  📦 Content-Type: ${req.headers["content-type"]}`);
  }

  // Mostrar el header de autenticación si existe
  if (req.headers["authorization"]) {
    const auth = req.headers["authorization"];
    // Solo mostramos los primeros caracteres del token por seguridad
    console.log(`  🔑 Auth:    ${auth.substring(0, 20)}...`);
  }

  // Mostrar el body si tiene datos (POST/PUT/PATCH)
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`  📝 Body:`);
    // Ocultamos la contraseña en los logs — buena práctica de seguridad
    const bodySeguro = { ...req.body };
    if (bodySeguro.password) bodySeguro.password = "****";
    if (bodySeguro.token) bodySeguro.token = "****";
    console.log(
      JSON.stringify(bodySeguro, null, 2)
        .split("\n")
        .map((l) => "    " + l)
        .join("\n")
    );
  }

  console.log("──────────────────────────────────────────────");

  // Interceptamos res.json() para también loggear la respuesta
  const jsonOriginal = res.json.bind(res);
  res.json = function (body) {
    console.log(`  ✉️  Respuesta: ${res.statusCode} | ${JSON.stringify(body).substring(0, 80)}...`);
    return jsonOriginal(body);
  };

  next();
  // Llama al siguiente middleware o ruta.
  // Sin esto, ninguna petición llegaría a las rutas.
});


// ─────────────────────────────────────────────────────────
//  BASE DE DATOS EN MEMORIA (simula MongoDB)
//  En tu proyecto real, esto sería MongoDB + Mongoose.
//  Usamos arrays JS aquí para poder ejecutar sin instalar nada.
// ─────────────────────────────────────────────────────────
let usuarios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@email.com",
    ciudad: "Cali",
    activo: true,
    rol: "usuario",
    creadoEn: new Date("2024-01-15").toISOString(),
  },
  {
    id: 2,
    nombre: "Ana García",
    email: "ana@email.com",
    ciudad: "Bogotá",
    activo: true,
    rol: "admin",
    creadoEn: new Date("2024-03-20").toISOString(),
  },
  {
    id: 3,
    nombre: "Luis Torres",
    email: "luis@email.com",
    ciudad: "Medellín",
    activo: false,
    rol: "usuario",
    creadoEn: new Date("2024-06-10").toISOString(),
  },
];

let contadorId = usuarios.length;
// Rastrea el último ID asignado para auto-incrementar.

// Diccionario completo de códigos HTTP con explicaciones
const diccionarioCodigos = {
  // 1xx
  100: { nombre: "Continue",            familia: "1xx Informativo",   descripcion: "Continúa enviando el body de la petición" },
  101: { nombre: "Switching Protocols", familia: "1xx Informativo",   descripcion: "Cambio de protocolo (ej: HTTP → WebSocket)" },
  // 2xx
  200: { nombre: "OK",                  familia: "2xx Éxito",         descripcion: "Petición exitosa con datos en la respuesta",         usarEn: "GET, PUT, PATCH, DELETE (con body)" },
  201: { nombre: "Created",             familia: "2xx Éxito",         descripcion: "Nuevo recurso creado exitosamente",                  usarEn: "POST que crea un recurso" },
  202: { nombre: "Accepted",            familia: "2xx Éxito",         descripcion: "Petición aceptada, procesará en el futuro",          usarEn: "Operaciones asíncronas largas" },
  204: { nombre: "No Content",          familia: "2xx Éxito",         descripcion: "Exitoso pero sin body en la respuesta",              usarEn: "DELETE sin necesidad de devolver datos" },
  206: { nombre: "Partial Content",     familia: "2xx Éxito",         descripcion: "Devuelve parte del recurso (streaming)",             usarEn: "Descarga de archivos grandes, video streaming" },
  // 3xx
  301: { nombre: "Moved Permanently",   familia: "3xx Redirección",   descripcion: "URL cambió permanentemente. Google actualiza índice",  usarEn: "Migraciones de URL, HTTP → HTTPS" },
  302: { nombre: "Found",               familia: "3xx Redirección",   descripcion: "Redirección temporal. No cachear.",                   usarEn: "Post-login redirect, mantenimiento temporal" },
  304: { nombre: "Not Modified",        familia: "3xx Redirección",   descripcion: "Recurso sin cambios, usar caché del cliente",         usarEn: "APIs con caché condicional (ETag, Last-Modified)" },
  // 4xx
  400: { nombre: "Bad Request",         familia: "4xx Error cliente", descripcion: "Petición mal formada o datos inválidos",              usarEn: "Falta body, JSON malformado, validación falla" },
  401: { nombre: "Unauthorized",        familia: "4xx Error cliente", descripcion: "No autenticado. El servidor no sabe quién eres",      usarEn: "Falta token, token inválido/expirado" },
  403: { nombre: "Forbidden",           familia: "4xx Error cliente", descripcion: "Autenticado pero sin permisos para esta acción",      usarEn: "Sin rol admin, intentar modificar datos ajenos" },
  404: { nombre: "Not Found",           familia: "4xx Error cliente", descripcion: "El recurso no existe",                               usarEn: "ID inexistente, URL incorrecta" },
  405: { nombre: "Method Not Allowed",  familia: "4xx Error cliente", descripcion: "Método HTTP no permitido para esta ruta",             usarEn: "DELETE en ruta que solo acepta GET" },
  409: { nombre: "Conflict",            familia: "4xx Error cliente", descripcion: "Conflicto con el estado actual del recurso",          usarEn: "Email duplicado (unique), dependencias existentes" },
  410: { nombre: "Gone",                familia: "4xx Error cliente", descripcion: "Existió pero fue eliminado permanentemente",          usarEn: "Recursos deprecados, cuentas permanentemente borradas" },
  422: { nombre: "Unprocessable Entity",familia: "4xx Error cliente", descripcion: "JSON válido pero valores semánticamente inválidos",   usarEn: "edad: -5, email sin @, fecha futura de nacimiento" },
  429: { nombre: "Too Many Requests",   familia: "4xx Error cliente", descripcion: "Rate limit excedido",                                usarEn: "Anti-brute-force, límites de uso de API" },
  // 5xx
  500: { nombre: "Internal Server Error",familia: "5xx Error servidor",descripcion: "Error inesperado en el servidor",                    usarEn: "Bugs, excepciones no capturadas" },
  501: { nombre: "Not Implemented",     familia: "5xx Error servidor",descripcion: "Funcionalidad no implementada todavía",               usarEn: "Endpoints en desarrollo" },
  502: { nombre: "Bad Gateway",         familia: "5xx Error servidor",descripcion: "Respuesta inválida de servicio externo",              usarEn: "Microservicio caído, API externa fallando" },
  503: { nombre: "Service Unavailable", familia: "5xx Error servidor",descripcion: "Servidor no disponible (mantenimiento/sobrecarga)",   usarEn: "Mantenimiento, BD caída, servidor sobrecargado" },
  504: { nombre: "Gateway Timeout",     familia: "5xx Error servidor",descripcion: "Timeout esperando respuesta de servicio externo",     usarEn: "API de pagos lenta, query sin índice muy lento" },
};


// ════════════════════════════════════════════════════════════
//  RUTA: GET / → Información general de la API
// ════════════════════════════════════════════════════════════
app.get("/", (req, res) => {
  // res.setHeader() agrega headers personalizados a la respuesta.
  // Los headers X- son headers personalizados (no estándar).
  res.setHeader("X-Servidor", "Express-HTTP-Demo");
  res.setHeader("X-Version", "1.0.0");

  res.status(200).json({
    mensaje: "Servidor de demostración — Métodos y Códigos HTTP",
    descripcion: "Prueba todas las rutas para ver los diferentes métodos y códigos HTTP en acción",

    metodosHTTP: {
      GET:     "Leer/Obtener datos — sin body — código éxito: 200",
      POST:    "Crear nuevo recurso — con body — código éxito: 201",
      PUT:     "Reemplazar completo — con body — código éxito: 200",
      PATCH:   "Actualizar parcial  — con body — código éxito: 200",
      DELETE:  "Eliminar recurso    — sin body — código éxito: 200 o 204",
      HEAD:    "Verificar existencia — sin body respuesta",
      OPTIONS: "Consultar métodos permitidos — usado en CORS preflight",
    },

    rutasParaProbarEnNavegador: [
      "GET /api/usuarios",
      "GET /api/usuarios/1",
      "GET /api/usuarios/999",
      "GET /api/usuarios/abc-invalido",
      "GET /api/usuarios?ciudad=Cali",
      "GET /api/usuarios?activo=false",
      "GET /api/demo/headers",
      "GET /api/demo/codigos/200",
      "GET /api/demo/codigos/404",
      "GET /api/demo/codigos/429",
      "GET /api/demo/comparacion",
    ],

    rutasParaPostman: [
      "POST   /api/usuarios         Body: { nombre, email, ciudad }",
      "PUT    /api/usuarios/:id     Body: { nombre, email, ciudad, activo, rol }",
      "PATCH  /api/usuarios/:id     Body: cualquier campo a cambiar",
      "DELETE /api/usuarios/:id     Sin body",
    ],
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: GET /api/demo/headers → Muestra los headers recibidos
// ════════════════════════════════════════════════════════════
app.get("/api/demo/headers", (req, res) => {
  // req.headers contiene TODOS los headers que el cliente envió.
  // Es un objeto donde las claves son los nombres de los headers
  // en minúsculas y los valores son strings.
  res.status(200).json({
    mensaje: "Estos son los headers que enviaste en tu petición",
    totalHeaders: Object.keys(req.headers).length,
    tusHeaders: req.headers,
    consejo: "Prueba agregando headers personalizados en Postman. Ej: Authorization: Bearer tu-token-aquí",
    headersImportantes: {
      "content-type":   req.headers["content-type"]  || "No enviado",
      "authorization":  req.headers["authorization"] || "No enviado (no estás autenticado)",
      "user-agent":     req.headers["user-agent"]    || "No enviado",
      "accept":         req.headers["accept"]        || "No enviado",
    },
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: GET /api/demo/codigos/:codigo → Explica un código HTTP
// ════════════════════════════════════════════════════════════
app.get("/api/demo/codigos/:codigo", (req, res) => {
  const codigo = parseInt(req.params.codigo);

  if (isNaN(codigo)) {
    return res.status(400).json({
      codigo: 400,
      mensaje: "El código debe ser un número. Ejemplo: /api/demo/codigos/404",
    });
  }

  const info = diccionarioCodigos[codigo];

  if (!info) {
    return res.status(404).json({
      codigo: 404,
      mensaje: `El código HTTP ${codigo} no está en el diccionario de esta API`,
      codigosDisponibles: Object.keys(diccionarioCodigos).map(Number).sort((a, b) => a - b),
      referencia: "https://developer.mozilla.org/es/docs/Web/HTTP/Status",
    });
  }

  res.status(200).json({
    codigo,
    ...info,
    emoji: codigo < 200 ? "ℹ️" : codigo < 300 ? "✅" : codigo < 400 ? "🔄" : codigo < 500 ? "❌" : "💥",
    referencia: `https://developer.mozilla.org/es/docs/Web/HTTP/Status/${codigo}`,
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: GET /api/demo/comparacion → PUT vs PATCH
// ════════════════════════════════════════════════════════════
app.get("/api/demo/comparacion", (req, res) => {
  // Esta ruta ayuda a entender la diferencia entre PUT y PATCH visualmente.
  const documentoOriginal = { id: 1, nombre: "Juan", email: "juan@mail.com", ciudad: "Cali", activo: true };

  const bodyPUT   = { nombre: "Juan Actualizado", email: "nuevo@mail.com" };
  const bodyPATCH = { nombre: "Juan Actualizado" };

  // Resultado de PUT: reemplaza completamente (campos no enviados desaparecen)
  const resultadoPUT = { id: documentoOriginal.id, ...bodyPUT };

  // Resultado de PATCH: solo cambia los campos enviados (el resto queda igual)
  const resultadoPATCH = { ...documentoOriginal, ...bodyPATCH };

  res.status(200).json({
    titulo: "Comparación PUT vs PATCH",
    documentoOriginal,
    ejemploPUT: {
      descripcion: "PUT — Reemplaza COMPLETAMENTE el documento",
      bodyEnviado: bodyPUT,
      resultado: resultadoPUT,
      observacion: "⚠️ 'ciudad' y 'activo' desaparecieron porque no los enviaste",
    },
    ejemploPATCH: {
      descripcion: "PATCH — Solo actualiza los campos enviados",
      bodyEnviado: bodyPATCH,
      resultado: resultadoPATCH,
      observacion: "✅ 'email', 'ciudad' y 'activo' se conservaron intactos",
    },
    regla: "Usa PUT cuando tienes un formulario con TODOS los campos. Usa PATCH para actualizaciones parciales.",
  });
});


// ════════════════════════════════════════════════════════════
//  RUTAS CRUD: GET /api/usuarios → Listar con filtros (200)
// ════════════════════════════════════════════════════════════
app.get("/api/usuarios", (req, res) => {
  const { ciudad, activo, rol, buscar } = req.query;
  // req.query → todos los parámetros después del '?' en la URL
  // /api/usuarios?ciudad=Cali&activo=true → { ciudad: "Cali", activo: "true" }
  // IMPORTANTE: todos son strings. activo === "true", NO activo === true

  let resultado = [...usuarios];
  // Copia el array para no modificar el original al filtrar.

  if (ciudad) {
    resultado = resultado.filter(
      (u) => u.ciudad.toLowerCase() === ciudad.toLowerCase()
    );
    // Comparación case-insensitive: "cali" y "Cali" y "CALI" dan el mismo resultado = "cali" en minusculas.
  }

  if (activo !== undefined) {
    const activoBool = activo === "true";
    // Convertimos string a booleano porque req.query siempre da strings.
    resultado = resultado.filter((u) => u.activo === activoBool);
  }

  if (rol) {
    resultado = resultado.filter((u) => u.rol === rol);
  }

  if (buscar) {
    resultado = resultado.filter((u) =>
      u.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
      u.email.toLowerCase().includes(buscar.toLowerCase())
    );
  }

  res.status(200).json({
    // 200 OK → la consulta fue exitosa aunque no haya resultados.
    // Un array vacío [] con 200 es correcto.
    // El 404 es para cuando el RECURSO no existe, no cuando la búsqueda no da resultados.
    metodo: "GET",
    codigo: 200,
    filtrosAplicados: { ciudad, activo, rol, buscar },
    total: resultado.length,
    datos: resultado,
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: GET /api/usuarios/:id → Obtener uno (200, 400, 404)
// ════════════════════════════════════════════════════════════
app.get("/api/usuarios/:id", (req, res) => {
  // req.params.id siempre es un string.
  // Para nuestra BD en memoria los IDs son números, así que convertimos.
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    // El cliente envió algo que no es un número como ID.
    // En MongoDB sería un CastError si el string no tiene formato de ObjectId.
    return res.status(400).json({
      metodo: "GET",
      codigo: 400,
      mensaje: `El ID '${req.params.id}' no es válido. Debe ser un número entero.`,
      ejemplo: "GET /api/usuarios/1",
    });
  }

  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      metodo: "GET",
      codigo: 404,
      mensaje: `No existe ningún usuario con ID ${id}`,
      sugerencia: "Consulta GET /api/usuarios para ver los IDs disponibles",
    });
  }

  res.status(200).json({
    metodo: "GET",
    codigo: 200,
    dato: usuario,
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: POST /api/usuarios → Crear (201, 400, 409)
// ════════════════════════════════════════════════════════════
app.post("/api/usuarios", (req, res) => {
  // req.body → los datos del body JSON enviado por el cliente.
  // Disponible gracias al middleware express.json() que pusimos arriba.
  const { nombre, email, ciudad, rol } = req.body;

  // VALIDACIÓN 400: Campos obligatorios faltantes
  const errores = [];
  if (!nombre || nombre.trim() === "") errores.push("El campo 'nombre' es obligatorio");
  if (!email  || email.trim()  === "") errores.push("El campo 'email' es obligatorio");
  if (!ciudad || ciudad.trim() === "") errores.push("El campo 'ciudad' es obligatorio");

  // Validación de formato de email
  if (email && !email.includes("@")) {
    errores.push("El email debe contener '@' para ser válido");
  }

  if (errores.length > 0) {
    return res.status(400).json({
      // 400 Bad Request: el cliente envió datos incorrectos o faltantes.
      metodo: "POST",
      codigo: 400,
      mensaje: "Los datos enviados no son válidos",
      errores,
      formatoCorrecto: { nombre: "string (obligatorio)", email: "string con @ (obligatorio)", ciudad: "string (obligatorio)", rol: "usuario | admin (opcional, default: usuario)" },
    });
  }

  // VALIDACIÓN 409: Email duplicado (simula violación de índice unique)
  if (usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({
      // 409 Conflict: ya existe un recurso con ese email.
      // En Mongoose esto ocurre cuando hay error.code === 11000
      metodo: "POST",
      codigo: 409,
      mensaje: `El email '${email}' ya está registrado por otro usuario`,
      solucion: "Usa un email diferente o inicia sesión si ya tienes cuenta",
    });
  }

  // Crear el nuevo usuario
  contadorId++;
  const nuevoUsuario = {
    id: contadorId,
    nombre: nombre.trim(),
    email: email.trim().toLowerCase(),
    ciudad: ciudad.trim(),
    activo: true,
    rol: rol || "usuario",
    creadoEn: new Date().toISOString(),
  };

  usuarios.push(nuevoUsuario);

  res
    .status(201)
    // 201 Created: se creó exitosamente un nuevo recurso.
    // Opcionalmente se incluye el header Location con la URL del nuevo recurso.
    .header("Location", `/api/usuarios/${nuevoUsuario.id}`)
    .json({
      metodo: "POST",
      codigo: 201,
      mensaje: "Usuario creado exitosamente",
      dato: nuevoUsuario,
      urlRecurso: `/api/usuarios/${nuevoUsuario.id}`,
    });
});


// ════════════════════════════════════════════════════════════
//  RUTA: PUT /api/usuarios/:id → Reemplazar completo (200, 404)
// ════════════════════════════════════════════════════════════
app.put("/api/usuarios/:id", (req, res) => {
  // PUT = REEMPLAZAR COMPLETAMENTE.
  // El cliente DEBE enviar todos los campos que quiere conservar.
  // Los campos no enviados quedan como undefined/null.
  // En Mongoose, para evitar esto, siempre usa { $set: req.body }.

  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex((u) => u.id === id);

  if (isNaN(id)) {
    return res.status(400).json({ codigo: 400, mensaje: "ID inválido" });
  }

  if (idx === -1) {
    return res.status(404).json({
      metodo: "PUT",
      codigo: 404,
      mensaje: `No existe ningún usuario con ID ${id}`,
    });
  }

  const documentoAntes = { ...usuarios[idx] };

  // PUT: reemplazamos completamente el usuario con lo que llegó en req.body.
  // Solo conservamos el ID original (no puede cambiar).
  // Los campos no enviados quedan como undefined.
  const { nombre, email, ciudad, activo, rol } = req.body;

  usuarios[idx] = {
    id,                                          // ID siempre se conserva
    nombre:    nombre ?? documentoAntes.nombre,
    email:     email  ?? documentoAntes.email,
    ciudad:    ciudad ?? documentoAntes.ciudad,
    activo:    activo !== undefined ? activo : documentoAntes.activo,
    rol:       rol    ?? documentoAntes.rol,
    creadoEn:  documentoAntes.creadoEn,          // fecha creación siempre se conserva
    actualizadoEn: new Date().toISOString(),
  };
  // NOTA: En una implementación PUT pura, los campos undefined se perderían.
  // Aquí usamos ?? para simular que Mongoose los conserva con $set.
  // En la práctica, PUT se implementa casi igual que PATCH con Mongoose,
  // porque ambos usan findByIdAndUpdate con { new: true }.

  res.status(200).json({
    metodo: "PUT",
    codigo: 200,
    mensaje: "Usuario reemplazado completamente",
    antes:   documentoAntes,
    despues: usuarios[idx],
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: PATCH /api/usuarios/:id → Actualizar parcial (200, 400, 404)
// ════════════════════════════════════════════════════════════
app.patch("/api/usuarios/:id", (req, res) => {
  // PATCH = ACTUALIZAR PARCIALMENTE.
  // Solo se actualizan los campos que llegaron en req.body.
  // Los demás campos se conservan exactamente igual.
  // En Mongoose: { $set: req.body } garantiza este comportamiento.

  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex((u) => u.id === id);

  if (isNaN(id)) {
    return res.status(400).json({ codigo: 400, mensaje: "ID inválido" });
  }

  if (idx === -1) {
    return res.status(404).json({
      metodo: "PATCH",
      codigo: 404,
      mensaje: `No existe ningún usuario con ID ${id}`,
    });
  }

  // Validar que se enviaron datos
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      metodo: "PATCH",
      codigo: 400,
      mensaje: "Debes enviar al menos un campo para actualizar",
      camposDisponibles: ["nombre", "email", "ciudad", "activo", "rol"],
    });
  }

  const documentoAntes = { ...usuarios[idx] };
  const camposActualizados = Object.keys(req.body);

  // PATCH: spread operator — primero todos los campos actuales, luego los nuevos.
  // Los campos nuevos sobreescriben los actuales. Los que no llegaron se conservan.
  usuarios[idx] = {
    ...usuarios[idx],          // todos los campos actuales
    ...req.body,               // solo los campos enviados (sobreescriben los actuales)
    id,                        // el ID nunca cambia
    creadoEn: documentoAntes.creadoEn, // la fecha de creación nunca cambia
    actualizadoEn: new Date().toISOString(),
  };

  res.status(200).json({
    metodo: "PATCH",
    codigo: 200,
    mensaje: "Usuario actualizado parcialmente",
    camposActualizados,
    antes:   documentoAntes,
    despues: usuarios[idx],
    diferencias: camposActualizados.map((campo) => ({
      campo,
      valorAnterior: documentoAntes[campo],
      valorNuevo: usuarios[idx][campo],
    })),
  });
});


// ════════════════════════════════════════════════════════════
//  RUTA: DELETE /api/usuarios/:id → Eliminar (200, 404)
// ════════════════════════════════════════════════════════════
app.delete("/api/usuarios/:id", (req, res) => {
  // DELETE = ELIMINAR un recurso.
  // Aquí hacemos borrado FÍSICO (lo quitamos del array).
  // En producción con MongoDB, normalmente harías borrado LÓGICO:
  // { activo: false } en vez de findByIdAndDelete().

  const id  = parseInt(req.params.id);
  const idx = usuarios.findIndex((u) => u.id === id);

  if (isNaN(id)) {
    return res.status(400).json({ codigo: 400, mensaje: "ID inválido" });
  }

  if (idx === -1) {
    return res.status(404).json({
      metodo: "DELETE",
      codigo: 404,
      mensaje: `No existe ningún usuario con ID ${id}. No hay nada que eliminar.`,
    });
  }

  const eliminado = usuarios.splice(idx, 1)[0];
  // splice(idx, 1): elimina 1 elemento en el índice idx.
  // Modifica el array usuarios en su lugar (in-place).
  // Devuelve un array con los elementos eliminados → tomamos [0].

  res.status(200).json({
    metodo: "DELETE",
    codigo: 200,
    mensaje: `Usuario '${eliminado.nombre}' eliminado exitosamente`,
    usuarioEliminado: eliminado,
    totalRestantes: usuarios.length,
    nota: "En producción considera usar borrado lógico (activo: false) para conservar el historial",
  });
  // Alternativa con 204 (sin body):
  // res.status(204).send();
  // Más estricto según REST pero menos informativo para el cliente.
});


// ════════════════════════════════════════════════════════════
//  MIDDLEWARE: 404 — Ruta no encontrada
//  Se ejecuta cuando NINGUNA ruta anterior coincidió.
//  DEBE estar al final de todas las rutas.
// ════════════════════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({
    codigo: 404,
    mensaje: `La ruta '${req.method} ${req.url}' no existe en esta API`,
    sugerencia: "Haz GET / para ver todas las rutas disponibles",
    posiblesCausas: [
      "URL escrita incorrectamente (typo)",
      "Método HTTP incorrecto para esta ruta",
      "La ruta fue deprecada o movida",
    ],
  });
});


// ════════════════════════════════════════════════════════════
//  MIDDLEWARE: 500 — Manejador global de errores
//  Se activa cuando se llama next(error) en cualquier ruta
//  o cuando ocurre una excepción no capturada en una ruta.
//  Tiene EXACTAMENTE 4 parámetros — así Express lo reconoce como error handler.
// ════════════════════════════════════════════════════════════
app.use((err, req, res, next) => {
  // Registramos el error completo en los logs del servidor
  console.error("\n💥 ERROR NO CAPTURADO:");
  console.error("  Mensaje:", err.message);
  console.error("  Stack:", err.stack);

  res.status(err.status || 500).json({
    codigo: err.status || 500,
    mensaje: process.env.NODE_ENV === "development"
      ? err.message                          // En desarrollo: mensaje real
      : "Error interno del servidor",        // En producción: mensaje genérico
    // Nunca expongas stack traces o detalles internos en producción.
    // Un atacante puede usarlos para explotar vulnerabilidades.
  });
});


// ════════════════════════════════════════════════════════════
//  INICIAR SERVIDOR
// ════════════════════════════════════════════════════════════
app.listen(PUERTO, () => {
  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║    📘 MÉTODOS Y CÓDIGOS HTTP — EXPRESS DEMO     ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log(`\n  ✅  Servidor: http://localhost:${PUERTO}`);
  console.log(`\n  📋 Prueba estas URLs en el navegador:`);
  console.log(`     http://localhost:${PUERTO}/`);
  console.log(`     http://localhost:${PUERTO}/api/usuarios`);
  console.log(`     http://localhost:${PUERTO}/api/usuarios/1`);
  console.log(`     http://localhost:${PUERTO}/api/usuarios/999           ← 404`);
  console.log(`     http://localhost:${PUERTO}/api/usuarios/abc           ← 400`);
  console.log(`     http://localhost:${PUERTO}/api/usuarios?ciudad=Cali`);
  console.log(`     http://localhost:${PUERTO}/api/usuarios?activo=false`);
  console.log(`     http://localhost:${PUERTO}/api/demo/headers`);
  console.log(`     http://localhost:${PUERTO}/api/demo/codigos/200`);
  console.log(`     http://localhost:${PUERTO}/api/demo/codigos/401`);
  console.log(`     http://localhost:${PUERTO}/api/demo/codigos/503`);
  console.log(`     http://localhost:${PUERTO}/api/demo/comparacion       ← PUT vs PATCH`);
  console.log(`\n  📦 Para POST/PUT/PATCH/DELETE usa Postman:`);
  console.log(`     POST   ${`http://localhost:${PUERTO}/api/usuarios`}`);
  console.log(`     PUT    ${`http://localhost:${PUERTO}/api/usuarios/1`}`);
  console.log(`     PATCH  ${`http://localhost:${PUERTO}/api/usuarios/1`}`);
  console.log(`     DELETE ${`http://localhost:${PUERTO}/api/usuarios/1`}`);
  console.log("\n  🛑 Ctrl + C para detener el servidor\n");
});



// TENER_EN_CUENTA_LA_LINEA_1336 ⚠️