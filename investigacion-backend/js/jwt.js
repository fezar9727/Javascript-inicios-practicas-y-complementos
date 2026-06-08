// ============================================================
//  📘 INVESTIGACIÓN #8 — ¿QUÉ ES JWT? (JSON Web Token)
// ============================================================
//
//  JWT = JSON Web Token (Token Web JSON)
//
//  Es un ESTÁNDAR ABIERTO (RFC 7519) para transmitir información
//  de forma segura entre dos partes como un objeto JSON.
//  Esa información puede ser VERIFICADA porque está FIRMADA
//  digitalmente con una clave secreta.
//
//  La palabra clave es FIRMADA, no encriptada.
//  Firmar significa que cualquiera puede LEER el contenido,
//  pero nadie puede MODIFICARLO sin que el servidor lo detecte.
//  Es como una carta sellada: el sello no oculta el contenido,
//  pero garantiza que nadie la tocó después de enviarla.
//
//  ─────────────────────────────────────────────────────────
//  ¿POR QUÉ NECESITAMOS JWT?
//  ─────────────────────────────────────────────────────────
//
//  El protocolo HTTP es STATELESS (sin estado). Esto significa
//  que cada petición HTTP es completamente independiente de las
//  anteriores. El servidor no recuerda nada entre peticiones.
//
//  Entonces, ¿cómo sabe el servidor quién eres en cada petición?
//  Necesita algún mecanismo para que el cliente "pruebe" su
//  identidad en CADA petición, no solo al hacer login.
//
//  Solución antigua → SESIONES:
//  1. El usuario hace login.
//  2. El servidor crea una sesión en memoria (o base de datos)
//     con los datos del usuario: { sessionId: "abc123", userId: "usr001" }
//  3. Le envía al cliente una cookie con ese sessionId.
//  4. En cada petición, el cliente envía esa cookie.
//  5. El servidor busca en memoria/BD: ¿quién es "abc123"? → usr001.
//
//  Problema de las sesiones:
//  - El servidor guarda el estado de cada usuario en memoria.
//  - Si tienes 3 servidores (escalabilidad horizontal), la sesión
//    creada en el Servidor 1 no existe en el Servidor 2 o 3.
//  - Requiere una base de datos centralizada solo para sesiones.
//  - A mayor usuarios, mayor memoria consumida por sesiones.
//
//  Solución moderna → JWT:
//  1. El usuario hace login.
//  2. El servidor crea un JWT con los datos del usuario:
//     { userId: "usr001", rol: "admin" } y lo FIRMA con su clave secreta.
//  3. Le envía ese token al cliente.
//  4. En cada petición, el cliente envía el token en el header.
//  5. El servidor VERIFICA la firma del token. Si es válida,
//     sabe exactamente quién es el usuario SIN buscar en ninguna BD.
//
//  Ventaja: El servidor no guarda NADA. Cualquier servidor del
//  mundo que tenga la misma clave secreta puede verificar el token.
//  Escala perfectamente.
//
//  ─────────────────────────────────────────────────────────
//  ¿PARA QUÉ SE USA JWT?
//  ─────────────────────────────────────────────────────────
//
//  AUTENTICACIÓN → Verificar QUIÉN eres.
//    Ejemplo: "¿Eres Juan Pérez?" → El token lo confirma.
//    Después del login, cada petición incluye el JWT para
//    que el servidor sepa quién la está haciendo.
//
//  AUTORIZACIÓN → Verificar QUÉ PUEDES hacer.
//    Ejemplo: "¿Puedes borrar este post?" → El token dice tu rol.
//    Si eres "admin", sí. Si eres "usuario", no.
//    El servidor decide basándose en los datos del token.
//
//  INTERCAMBIO DE INFORMACIÓN → Transmitir datos verificados.
//    Ejemplo: Microservicios que necesitan saber quién hace
//    la petición sin consultar la base de datos de usuarios.
//
//  ─────────────────────────────────────────────────────────
//  ¿CUÁL ES EL FLUJO COMPLETO DE JWT?
//  ─────────────────────────────────────────────────────────
//
//  PASO 1 → El usuario envía sus credenciales:
//    POST /api/auth/login
//    Body: { email: "juan@email.com", password: "12345678" }
//
//  PASO 2 → El servidor verifica las credenciales en la BD.
//    Busca el email en MongoDB.
//    Compara la contraseña con bcrypt.compare().
//
//  PASO 3 → Si son correctas, el servidor GENERA un JWT:
//    jwt.sign({ userId: "usr001", rol: "admin" }, SECRET, { expiresIn: "1h" })
//    Y lo devuelve al cliente:
//    { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
//
//  PASO 4 → El cliente GUARDA el token.
//    Opciones de almacenamiento (cada una con pros y contras):
//    - localStorage: fácil pero vulnerable a ataques XSS
//    - sessionStorage: igual que localStorage pero se borra al cerrar pestaña
//    - Cookie httpOnly: más seguro, el JS no puede leerla (recomendado)
//    - Memoria RAM (variable JS): muy seguro, pero se pierde al recargar
//
//  PASO 5 → En cada petición protegida, el cliente envía el token:
//    GET /api/perfil
//    Headers: { Authorization: "Bearer eyJhbGci..." }
//
//    Nota: "Bearer" significa "portador". El token prueba que eres
//    el portador legítimo de esa identidad.
//
//  PASO 6 → El servidor VERIFICA el token:
//    jwt.verify(token, SECRET) → si la firma coincide y no expiró,
//    devuelve el payload con los datos del usuario.
//    Si algo falla → responde 401 Unauthorized.
//
//  DIAGRAMA COMPLETO:
//  ──────────────────
//
//  Cliente (frontend)         Servidor (backend)         Base de Datos
//       │                           │                          │
//       │── POST /login ──────────▶│                          │
//       │   { email, password }     │── buscar usuario ──────▶│
//       │                           │◀─ usuario encontrado ───│
//       │                           │   verificar contraseña   │
//       │◀── { token: "eyJ..." } ──│   generar JWT            │
//       │                           │                          │
//       │   (guarda el token)       │                          │
//       │                           │                          │
//       │── GET /perfil ──────────▶│                          │
//       │   Authorization:          │   verificar firma JWT    │
//       │   Bearer eyJ...           │   (NO necesita BD)       │
//       │                           │                          │
//       │◀── datos del usuario ────│                          │
//       │                           │                          │
//
//  Nota clave: la segunda petición (GET /perfil) NO requiere
//  consultar la base de datos para saber quién es el usuario.
//  Toda la información está en el token y verificarla es instantáneo.
//
//  ─────────────────────────────────────────────────────────
//  ESTRUCTURA DE UN JWT — LAS 3 PARTES
//  ─────────────────────────────────────────────────────────
//
//  Un JWT se ve así (un string largo separado por puntos):
//
//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//  .
//  eyJ1c2VySWQiOiJ1c3IwMDEiLCJub21icmUiOiJKdWFuIiwicm9sIjoiYWRtaW4ifQ
//  .
//  SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
//
//  (En la práctica todo está en una línea, sin saltos. Los puntos
//   son los separadores entre las 3 partes.)
//
//  ┌──────────────────────────────────────────────────────────────┐
//  │  PARTE 1: HEADER (encabezado)                                │
//  │                                                              │
//  │  Base64url: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9           │
//  │  Decodificado: { "alg": "HS256", "typ": "JWT" }             │
//  │                                                              │
//  │  alg = HS256 → el algoritmo de firma:                        │
//  │    HS = HMAC (Hash-based Message Authentication Code)        │
//  │    256 = SHA-256 (función hash de 256 bits)                  │
//  │  typ = JWT → el tipo de token                                │
//  └──────────────────────────────────────────────────────────────┘
//  ┌──────────────────────────────────────────────────────────────┐
//  │  PARTE 2: PAYLOAD (carga útil / datos)                       │
//  │                                                              │
//  │  Base64url: eyJ1c2VySWQiOiJ1c3IwMDEiLCJyb2wiOiJhZG1pbiJ9  │
//  │  Decodificado: {                                             │
//  │    "userId": "usr001",                                       │
//  │    "nombre": "Juan Pérez",                                   │
//  │    "rol":    "admin",                                        │
//  │    "iat":    1716384000,   ← issued at (cuándo se creó)      │
//  │    "exp":    1716387600    ← expiration (cuándo expira)      │
//  │  }                                                           │
//  │                                                              │
//  │  ⚠️  IMPORTANTE: El payload NO está encriptado.             │
//  │  Solo está en Base64url (una codificación, no cifrado).      │
//  │  Cualquiera puede decodificarlo con: atob(parte2)            │
//  │  Por eso NUNCA debes poner contraseñas ni datos              │
//  │  muy sensibles en el payload.                                │
//  └──────────────────────────────────────────────────────────────┘
//  ┌──────────────────────────────────────────────────────────────┐
//  │  PARTE 3: SIGNATURE (firma digital)                          │
//  │                                                              │
//  │  Se calcula así:                                             │
//  │  HMACSHA256(                                                 │
//  │    base64url(header) + "." + base64url(payload),            │
//  │    CLAVE_SECRETA                                             │
//  │  )                                                           │
//  │                                                              │
//  │  Si alguien modifica el payload (ej: cambia rol de          │
//  │  "usuario" a "admin"), la firma ya no coincide con          │
//  │  el nuevo contenido y el servidor rechaza el token.          │
//  │                                                              │
//  │  SOLO el servidor conoce la CLAVE_SECRETA,                  │
//  │  así que solo él puede crear tokens válidos.                 │
//  └──────────────────────────────────────────────────────────────┘
//
//  ¿QUÉ ES BASE64url?
//  ───────────────────
//  Base64 es una forma de representar datos binarios usando solo
//  caracteres seguros: A-Z, a-z, 0-9, +, /, =
//  Base64url es una variante que reemplaza + por - y / por _
//  para que sea seguro usarlo en URLs (sin necesidad de encodear).
//  NO es encriptación. Es solo una forma de representar los datos
//  como texto. Cualquiera puede revertirlo con atob() en JS.
//
//  ─────────────────────────────────────────────────────────
//  CLAIMS ESTÁNDAR DEL PAYLOAD (campos especiales que JWT entiende)
//  ─────────────────────────────────────────────────────────
//
//  JWT define algunos nombres de campos con significados especiales.
//  Se llaman "claims registrados". No son obligatorios, pero si los
//  usas, deben seguir el estándar:
//
//  "iss" (Issuer)     → Quién emitió el token.
//                       Ejemplo: "mi-app.com" o "auth.empresa.com"
//                       Útil cuando tienes múltiples servicios.
//
//  "sub" (Subject)    → El "sujeto" del token = ID del usuario.
//                       Ejemplo: "usr001" o "64abc123def456"
//                       Identifica de quién es este token.
//
//  "aud" (Audience)   → Para quién está destinado el token.
//                       Ejemplo: "mi-app-frontend" o "api.mi-app.com"
//                       El servidor puede rechazar tokens no
//                       dirigidos a él.
//
//  "exp" (Expiration) → Timestamp Unix de cuándo expira.
//                       Ejemplo: 1716387600 = 21 mayo 2024 14:00:00
//                       jwt.verify() rechaza automáticamente tokens
//                       expirados. MUY IMPORTANTE por seguridad.
//
//  "iat" (Issued At)  → Timestamp Unix de cuándo fue creado.
//                       jwt.sign() lo agrega automáticamente.
//                       Útil para saber la "edad" del token.
//
//  "nbf" (Not Before) → El token no es válido ANTES de este momento.
//                       Útil para tokens con activación diferida.
//                       Ejemplo: un token que activarás mañana.
//
//  "jti" (JWT ID)     → Identificador único del token.
//                       Útil para invalidar tokens específicos
//                       guardando una blacklist de JTI en Redis.
//
//  Además de estos, puedes agregar tus propios campos:
//  { userId, nombre, rol, ciudad, plan, ... }
//  Se llaman "private claims" y son los que tú defines.
//
//  ─────────────────────────────────────────────────────────
//  ACCESS TOKEN vs REFRESH TOKEN
//  ─────────────────────────────────────────────────────────
//
//  Un problema de JWT: no se puede invalidar un token antes de
//  que expire. Si el token de un usuario fue robado, no puedes
//  "desactivarlo" porque el servidor no guarda nada en BD.
//
//  La solución es usar DOS tipos de token:
//
//  ACCESS TOKEN:
//  - Vida corta: 15 minutos a 1 hora.
//  - Se envía en cada petición protegida.
//  - Si es robado, expira rápido (daño limitado).
//  - Se guarda en memoria o sessionStorage.
//
//  REFRESH TOKEN:
//  - Vida larga: 7 días, 30 días o más.
//  - Se guarda en una cookie httpOnly (no accesible por JS).
//  - NO se envía en cada petición. Solo se usa para renovar
//    el access token cuando este expira.
//  - SÍ se guarda en la base de datos (para poder invalidarlo).
//  - Si el usuario hace "cerrar sesión", el servidor borra el
//    refresh token de la BD → ya no puede renovar el access token.
//
//  FLUJO CON AMBOS TOKENS:
//  1. Login → servidor devuelve access token (1h) + refresh token (7d)
//  2. Cliente usa access token en cada petición.
//  3. Access token expira → cliente envía refresh token al endpoint
//     POST /api/auth/refresh
//  4. Servidor verifica refresh token en la BD → devuelve nuevo access token.
//  5. Si el usuario hace logout → se borra el refresh token de la BD.
//
//  ─────────────────────────────────────────────────────────
//  JWT vs SESIONES — COMPARACIÓN DETALLADA
//  ─────────────────────────────────────────────────────────
//
//  ┌─────────────────────┬──────────────────────┬──────────────────────┐
//  │ Característica       │ Sesiones             │ JWT                  │
//  ├─────────────────────┼──────────────────────┼──────────────────────┤
//  │ ¿Dónde se guarda?   │ Servidor (BD/memoria) │ Cliente (el token)   │
//  │ Escalabilidad       │ Difícil (sesión en 1  │ Excelente (cualquier │
//  │                     │ solo servidor)         │ servidor verifica)   │
//  │ Invalidar sesión    │ Fácil (borrar de BD)  │ Difícil (esperar     │
//  │                     │                        │ que expire)          │
//  │ Consulta a BD       │ En cada petición       │ NO (solo verificar   │
//  │                     │                        │ firma criptográfica) │
//  │ Uso de memoria      │ Crece con usuarios     │ Constante            │
//  │ APIs REST           │ Complicado             │ Ideal                │
//  │ Apps móviles        │ Complicado             │ Ideal                │
//  │ Microservicios      │ Complicado             │ Ideal                │
//  │ Seguridad si robado │ Se invalida en BD      │ Válido hasta expirar │
//  └─────────────────────┴──────────────────────┴──────────────────────┘
//
//  ─────────────────────────────────────────────────────────
//  BUENAS PRÁCTICAS CON JWT
//  ─────────────────────────────────────────────────────────
//
//  ✅ Guarda el SECRET en el .env, NUNCA en el código fuente.
//     La clave secreta debe ser larga (mínimo 32 caracteres),
//     aleatoria y diferente entre desarrollo y producción.
//     Ejemplo seguro: "x7kP9mN2qR5vL8hJ3wF6dA0cE4iB1oY"
//     Ejemplo inseguro: "secreto", "12345", "mi_clave"
//
//  ✅ Usa tiempos de expiración CORTOS para access tokens.
//     15 minutos a 1 hora es lo estándar.
//     Si alguien roba el token, tiene poco tiempo para usarlo.
//
//  ✅ Usa HTTPS en producción siempre.
//     En HTTP, el token viaja en texto plano y puede ser
//     interceptado por un atacante en la red (Man in the Middle).
//
//  ✅ Valida SIEMPRE el token en el servidor.
//     Nunca confíes en datos del cliente sin verificar el JWT.
//     Un atacante puede fabricar peticiones con cualquier header.
//
//  ✅ No guardes datos sensibles en el payload.
//     El payload es legible por cualquiera. Guarda solo lo
//     necesario: userId, rol, email. Nada de contraseñas, CVV, etc.
//
//  ✅ Usa Refresh Tokens para una mejor experiencia de usuario.
//     Así el usuario no tiene que hacer login cada hora.
//
//  ❌ No guardes el JWT en localStorage en apps críticas.
//     localStorage es accesible por JavaScript, lo que lo hace
//     vulnerable a ataques XSS (Cross-Site Scripting).
//     Prefiere cookies httpOnly (el JS no puede leerlas).
//
//  ❌ No uses algoritmos débiles de firma.
//     HS256 es bueno para la mayoría de casos.
//     Evita "none" (sin firma) que es un error de seguridad grave.
//
//  ─────────────────────────────────────────────────────────
//  ALGORITMOS DE FIRMA
//  ─────────────────────────────────────────────────────────
//
//  HS256 (HMAC + SHA-256):
//    - Usa UNA clave secreta para firmar Y verificar.
//    - La misma clave en el servidor que crea y verifica el token.
//    - Simple y muy eficiente.
//    - Ideal para aplicaciones donde el mismo servidor hace todo.
//
//  RS256 (RSA + SHA-256):
//    - Usa un PAR de claves: clave privada para firmar,
//      clave pública para verificar.
//    - Puedes compartir la clave pública con otros servicios
//      sin revelar la clave privada.
//    - Ideal para microservicios y sistemas distribuidos.
//    - Más lento que HS256.
//
//  Para tu proyecto de backend → usa HS256.
//  Es suficiente, simple y muy bien soportado.
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — Sistema de autenticación con JWT
// ============================================================
//
//  INSTRUCCIONES PASO A PASO:
//  ──────────────────────────
//  1. Abre la terminal en VS Code (Ctrl + ñ)
//  2. Instala las dependencias:
//       npm install express jsonwebtoken dotenv
//  3. Crea el archivo .env en la raíz del proyecto con este contenido:
//       JWT_SECRET=clave_super_secreta_larga_para_firmar_tokens_2024
//       JWT_EXPIRES_IN=1h
//  4. Ejecuta el servidor:
//       node 08_jwt.js
//  5. Prueba en Postman siguiendo el flujo:
//
//  FLUJO DE PRUEBA EN POSTMAN:
//  ────────────────────────────
//  a) Registro de usuario nuevo:
//     POST http://localhost:3000/api/auth/registro
//     Body (JSON): { "nombre": "María", "email": "maria@email.com", "password": "12345678" }
//
//  b) Login con usuario existente:
//     POST http://localhost:3000/api/auth/login
//     Body (JSON): { "email": "juan@email.com", "password": "12345678" }
//     → Copia el token que devuelve la respuesta
//
//  c) Ver tu perfil (ruta protegida):
//     GET http://localhost:3000/api/perfil
//     Headers: Authorization: Bearer <pega el token aquí>
//
//  d) Panel de admin (solo si tienes rol admin):
//     GET http://localhost:3000/api/admin
//     Headers: Authorization: Bearer <token del usuario admin>
//     Credenciales admin: admin@email.com / admin1234
//
//  e) Verificar un token manualmente:
//     POST http://localhost:3000/api/auth/verificar-token
//     Body (JSON): { "token": "<pega el token>" }
//
//  f) Ver la estructura del JWT explicada:
//     GET http://localhost:3000/api/auth/info-jwt
//
// ============================================================

"use strict"; // Activa el modo estricto de JavaScript.
              // En modo estricto, JS lanza errores en situaciones
              // que de otro modo fallarían silenciosamente.
              // Ejemplo: usar una variable sin declararla con let/const/var
              // en modo normal no da error; en modo estricto sí.

// ─────────────────────────────────────────────────────────
//  IMPORTACIÓN DE MÓDULOS
// ─────────────────────────────────────────────────────────

require("dotenv").config();
// dotenv.config() lee el archivo .env de la raíz del proyecto
// y carga todas las variables como propiedades de process.env.
// Después de esta línea, process.env.JWT_SECRET existe y tiene valor.
// DEBE ser la primera línea ejecutable del archivo para que las
// demás partes del código puedan acceder a las variables de entorno.

const express = require("express");
// Importamos el framework Express para crear el servidor HTTP.
// Express nos da herramientas para:
// - Definir rutas (GET /perfil, POST /login, etc.)
// - Procesar peticiones y enviar respuestas
// - Usar middlewares (funciones que se ejecutan entre la petición y la respuesta)

const jwt = require("jsonwebtoken");
// Importamos la librería jsonwebtoken para trabajar con JWT.
// Esta librería tiene 3 funciones principales que usaremos:
//   jwt.sign(payload, secret, options)   → CREAR un token
//   jwt.verify(token, secret)            → VERIFICAR y DECODIFICAR un token
//   jwt.decode(token)                    → DECODIFICAR sin verificar (inseguro)

// ─────────────────────────────────────────────────────────
//  CONFIGURACIÓN INICIAL
// ─────────────────────────────────────────────────────────

const app    = express();
// express() crea una instancia de la aplicación Express.
// Esta instancia (app) es donde registraremos todas las rutas
// y middlewares. Es el "corazón" de nuestro servidor.

const PUERTO = 3000;
// El número de puerto en el que escuchará el servidor.
// Puerto 3000 es convención en desarrollo para Node.js.
// En producción usarías process.env.PORT (lo define el servidor cloud).

app.use(express.json());
// Middleware que parsea el cuerpo (body) de las peticiones con Content-Type: application/json.
// Sin este middleware, req.body sería undefined.
// Con él, si el cliente envía { "email": "...", "password": "..." },
// puedes leerlo como req.body.email y req.body.password.
// app.use() registra un middleware global (se aplica a TODAS las rutas).

// ─────────────────────────────────────────────────────────
//  VARIABLES DE CONFIGURACIÓN DE JWT
// ─────────────────────────────────────────────────────────

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_temporal_solo_para_pruebas_2024";
// JWT_SECRET es la clave con la que firmamos y verificamos los tokens.
//
// process.env.JWT_SECRET → lee la variable del archivo .env
// || "clave_secreta_..." → si el .env no existe o no tiene esa variable,
//                          usa este valor por defecto (solo para desarrollo)
//
// ⚠️  IMPORTANTE: En producción NUNCA uses un fallback hardcodeado.
//     Si JWT_SECRET no está configurado en producción, el proceso
//     debería terminar con un error, no usar un valor por defecto.
//     Ejemplo seguro:
//     if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET no configurado");
//
// La clave debe ser:
// - Larga (mínimo 32 caracteres)
// - Aleatoria (no palabras del diccionario)
// - Diferente en desarrollo y producción
// - SECRETA (solo el servidor la conoce)

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
// Tiempo de expiración del token.
// La librería jsonwebtoken acepta varios formatos:
//   "60"     → 60 segundos
//   "60m"    → 60 minutos
//   "1h"     → 1 hora
//   "7d"     → 7 días
//   "365d"   → 365 días
//   1000     → número = segundos
// Para access tokens: entre 15 minutos y 1 hora es lo estándar.
// Cuanto más corto, más seguro (pero más incómodo para el usuario).

// ─────────────────────────────────────────────────────────
//  "BASE DE DATOS" EN MEMORIA (simulación)
// ─────────────────────────────────────────────────────────

const usuarios = [
  // Array de objetos que simula una colección de MongoDB.
  // En un proyecto real, estos datos estarían en MongoDB y
  // las contraseñas estarían encriptadas con bcrypt.
  {
    id:       "usr001",
    // ID único del usuario. En MongoDB sería el ObjectId generado automáticamente.
    // Aquí lo ponemos manual para simplificar.

    nombre:   "Juan Pérez",
    email:    "juan@email.com",

    password: "12345678",
    // ⚠️  NUNCA guardes contraseñas en texto plano en producción.
    // Usa bcrypt: const hash = await bcrypt.hash(password, 10)
    // bcrypt genera un hash que no se puede revertir a la contraseña original.
    // Para verificar: const ok = await bcrypt.compare(passwordIngresada, hash)

    rol:    "usuario",
    // El rol define los permisos del usuario.
    // Valores típicos: "usuario", "admin", "moderador", "superadmin"
    // El rol se guarda en el JWT para que el servidor
    // sepa qué puede hacer sin consultar la BD en cada petición.

    ciudad: "Cali",
  },
  {
    id:       "usr002",
    nombre:   "Admin General",
    email:    "admin@email.com",
    password: "admin1234",
    rol:      "admin",
    // Este usuario tiene rol "admin" para probar las rutas
    // que requieren permisos de administrador.
    ciudad:   "Bogotá",
  },
];

// ════════════════════════════════════════════════════════
//  MIDDLEWARE DE AUTENTICACIÓN: verificarToken
// ════════════════════════════════════════════════════════
//
//  Un MIDDLEWARE es una función que se ejecuta ENTRE la petición
//  del cliente y la respuesta del servidor. Tiene acceso a:
//  - req: el objeto de la petición (qué llegó del cliente)
//  - res: el objeto de respuesta (qué devolveremos al cliente)
//  - next: una función para pasar al siguiente middleware o ruta
//
//  Si el middleware llama a next() → continúa al siguiente paso.
//  Si el middleware llama a res.json() sin next() → la cadena termina ahí.
//
//  Este middleware específico:
//  1. Lee el token del header Authorization
//  2. Valida que el formato sea correcto (Bearer <token>)
//  3. Verifica la firma y vigencia del token con jwt.verify()
//  4. Si todo está bien, guarda el payload en req.usuario y llama next()
//  5. Si algo falla, devuelve 401 Unauthorized y NO llama next()
//
//  Al guardarlo en una variable y pasarlo como argumento en las rutas,
//  podemos reutilizarlo en cualquier ruta que necesite autenticación:
//  app.get("/mi-ruta-protegida", verificarToken, (req, res) => { ... })

const verificarToken = (req, res, next) => {
  // req.headers es un objeto con todos los headers de la petición.
  // Los nombres de los headers son case-insensitive, pero en Express
  // se acceden en minúsculas: req.headers["authorization"]
  const authHeader = req.headers["authorization"];

  // Verificamos que el header Authorization exista.
  // Si el cliente no envió ese header, la petición es anónima.
  if (!authHeader) {
    return res.status(401).json({
      // 401 Unauthorized: el cliente no se identificó.
      // Es diferente a 403 Forbidden (se identificó pero no tiene permiso).
      exito:   false,
      codigo:  401,
      mensaje: "Acceso denegado. No se proporcionó token de autenticación.",
      ayuda:   "Agrega el header: Authorization: Bearer <tu_token>",
    });
    // return es necesario aquí para detener la ejecución del middleware.
    // Sin return, el código continuaría ejecutando las líneas siguientes
    // incluso después de enviar la respuesta (causando el error:
    // "Cannot set headers after they are sent to the client")
  }

  // El formato estándar del header Authorization para JWT es:
  // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  // Hay un espacio entre "Bearer" y el token.
  // Usamos split(" ") para separar las dos partes.
  const partes = authHeader.split(" ");
  // partes[0] = "Bearer"
  // partes[1] = "eyJhbGci..."

  // Verificamos que el formato sea exactamente "Bearer <token>":
  // - partes.length !== 2: si hay más o menos de 2 palabras
  // - partes[0] !== "Bearer": si la primera palabra no es "Bearer"
  //   (con B mayúscula, es sensible a mayúsculas)
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({
      exito:   false,
      mensaje: "Formato de token inválido. El formato correcto es: Bearer <token>",
    });
  }

  const token = partes[1];
  // Extraemos solo el token (la segunda parte).
  // Este es el JWT que verificaremos.

  try {
    // jwt.verify() hace DOS cosas simultáneamente:
    //
    // 1. VERIFICA LA FIRMA: recalcula el HMACSHA256 del header y payload
    //    usando JWT_SECRET y lo compara con la firma del token.
    //    Si no coinciden → el token fue modificado → error.
    //
    // 2. VERIFICA LA EXPIRACIÓN: compara el campo "exp" del payload
    //    con la hora actual. Si el token expiró → error.
    //
    // Si AMBAS verificaciones pasan → devuelve el payload decodificado.
    // Si CUALQUIERA falla → lanza una excepción (que capturamos en catch).
    const payload = jwt.verify(token, JWT_SECRET);

    // Si llegamos aquí, el token es 100% válido.
    // Guardamos el payload en req.usuario para que las rutas
    // que usen este middleware puedan acceder a los datos del usuario.
    // Por ejemplo: req.usuario.userId, req.usuario.rol, req.usuario.nombre
    req.usuario = payload;

    console.log(`  🔐 Token válido para: ${payload.nombre} (${payload.rol})`);
    // Este log nos ayuda a ver en la terminal quién está haciendo
    // cada petición durante el desarrollo.

    next();
    // Llamamos a next() para pasar al siguiente middleware o al handler de la ruta.
    // Si NO llamamos a next(), la petición quedaría "colgada" sin respuesta.
    // Si llamamos a res.json() Y luego a next(), podría causar errores.
    // Por eso: o llamamos next() o enviamos respuesta, nunca ambas.

  } catch (error) {
    // jwt.verify() puede lanzar varios tipos de errores:

    if (error.name === "TokenExpiredError") {
      // El token existía, era válido, pero ya venció su tiempo de expiración.
      // error.expiredAt contiene el momento exacto en que expiró.
      return res.status(401).json({
        exito:     false,
        codigo:    401,
        mensaje:   "El token ha expirado. Por favor inicia sesión nuevamente.",
        expiredAt: error.expiredAt,
        // Incluimos cuándo expiró para que el frontend pueda mostrarlo al usuario.
      });
    }

    if (error.name === "JsonWebTokenError") {
      // El token tiene un formato inválido, fue modificado,
      // fue firmado con una clave diferente, o simplemente es un string aleatorio.
      return res.status(401).json({
        exito:   false,
        codigo:  401,
        mensaje: "Token inválido o manipulado. Por favor inicia sesión nuevamente.",
      });
    }

    if (error.name === "NotBeforeError") {
      // El token tiene el campo "nbf" (Not Before) y todavía no es válido.
      return res.status(401).json({
        exito:   false,
        codigo:  401,
        mensaje: "El token aún no es válido.",
        date:    error.date,
      });
    }

    // Cualquier otro error inesperado
    console.error("Error inesperado en verificarToken:", error);
    return res.status(500).json({
      exito:   false,
      mensaje: "Error interno al verificar el token.",
    });
  }
};

// ════════════════════════════════════════════════════════
//  MIDDLEWARE DE AUTORIZACIÓN: verificarRol
// ════════════════════════════════════════════════════════
//
//  Este middleware verifica si el usuario tiene el ROL adecuado
//  para acceder a una ruta específica.
//
//  Se usa DESPUÉS de verificarToken (que ya puso req.usuario),
//  porque necesita saber el rol del usuario autenticado.
//
//  Es una FUNCIÓN QUE RETORNA UN MIDDLEWARE (función de orden superior).
//  Esto nos permite pasarle argumentos al middleware.
//
//  ¿Por qué necesitamos este patrón?
//  Un middleware normal es: (req, res, next) => { ... }
//  No puedes pasarle argumentos adicionales directamente.
//  Pero si envuelves el middleware en otra función que sí recibe
//  los argumentos, puedes hacerlo:
//
//  verificarRol("admin")          → devuelve (req, res, next) => { ... }
//  verificarRol("admin", "super") → devuelve (req, res, next) => { ... }
//
//  Uso en rutas:
//  app.get("/admin", verificarToken, verificarRol("admin"), handler)
//  Se ejecutan en orden: primero verificarToken, luego verificarRol("admin"),
//  finalmente el handler de la ruta.

const verificarRol = (...rolesPermitidos) => {
  // El operador spread (...) antes del parámetro crea un array con
  // todos los argumentos recibidos. Ejemplos:
  //   verificarRol("admin")          → rolesPermitidos = ["admin"]
  //   verificarRol("admin", "super") → rolesPermitidos = ["admin", "super"]
  //   verificarRol("a", "b", "c")    → rolesPermitidos = ["a", "b", "c"]

  return (req, res, next) => {
    // Esta es la función middleware real que retornamos.
    // Tiene acceso a rolesPermitidos gracias al closure de JavaScript:
    // las funciones internas recuerdan las variables de su función externa.

    const rolUsuario = req.usuario?.rol;
    // req.usuario fue puesto por verificarToken.
    // ?.rol es optional chaining: si req.usuario es undefined,
    // devuelve undefined en lugar de lanzar un error.
    // Aunque si llegamos aquí, verificarToken ya garantizó que
    // req.usuario existe. Es una precaución extra.

    if (!rolesPermitidos.includes(rolUsuario)) {
      // Array.includes() devuelve true si el elemento está en el array.
      // Si el rol del usuario NO está en la lista de roles permitidos,
      // respondemos con 403 Forbidden.
      //
      // 403 Forbidden: el cliente SÍ está autenticado (a diferencia de 401),
      // pero NO tiene permiso para acceder a este recurso.
      // Analogía: tienes entrada al edificio (401 sería sin entrada),
      // pero no tienes acceso al piso VIP (403 = sin permiso en ese piso).
      return res.status(403).json({
        exito:           false,
        codigo:          403,
        mensaje:         "Acceso prohibido. No tienes los permisos necesarios para esta acción.",
        tuRol:           rolUsuario,
        rolesRequeridos: rolesPermitidos,
        // Incluimos qué rol se necesitaba para que el cliente pueda
        // mostrar un mensaje claro al usuario: "Necesitas ser administrador".
      });
    }

    next();
    // El rol es válido → continúa al siguiente middleware o handler.
  };
};

// ════════════════════════════════════════════════════════
//  FUNCIÓN AUXILIAR: generarToken
// ════════════════════════════════════════════════════════
//
//  Encapsulamos la creación del JWT en una función reutilizable.
//  Así no repetimos la misma lógica en /registro y en /login.
//  Esto es el principio DRY: Don't Repeat Yourself.

const generarToken = (usuario) => {
  // Creamos el PAYLOAD — los datos que irán dentro del token.
  // Solo incluimos lo necesario: no toda la info del usuario.
  // Regla: si no necesitas el dato en cada petición, no lo pongas en el token.
  const payload = {
    userId: usuario.id,
    // El ID del usuario. Lo usaremos para buscarlo en la BD si necesitamos
    // más información (como la ciudad, teléfono, etc.) que no está en el token.

    nombre: usuario.nombre,
    // El nombre para personalizar respuestas sin consultar la BD.
    // "Hola, Juan" sin buscar en la BD quién es.

    email:  usuario.email,
    // El email puede ser útil para enviar notificaciones o identificar al usuario.

    rol:    usuario.rol,
    // El rol es FUNDAMENTAL en el payload porque lo usamos en verificarRol()
    // para autorización en cada petición. Si no estuviera en el token,
    // tendríamos que consultar la BD en cada petición para saber el rol.
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  // jwt.sign() recibe 3 argumentos:
  //
  // 1. payload: el objeto con los datos a incluir en el token.
  //    jwt.sign() agrega automáticamente "iat" (issued at) al payload.
  //
  // 2. JWT_SECRET: la clave secreta con la que se firmará el token.
  //    Debe ser la MISMA que se usa en jwt.verify() para verificarlo.
  //
  // 3. options: objeto con opciones adicionales:
  //    expiresIn: cuánto tiempo es válido el token.
  //    jwt.sign() calcula el timestamp de expiración y lo agrega
  //    automáticamente como "exp" en el payload.
  //
  // El resultado es el JWT como string: "eyJhbGci...header.payload.signature"

  return token;
  // Devolvemos el token para usarlo en las rutas de registro y login.
};

// ════════════════════════════════════════════════════════
//  RUTAS PÚBLICAS — No requieren token de autenticación
// ════════════════════════════════════════════════════════
//
//  Estas rutas son accesibles para cualquier cliente, sin importar
//  si está autenticado o no. Son el "lobby público" de la API.

// ─────────────────────────────────────────────────────────
//  GET / → Ruta raíz: información general del servidor
// ─────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  // Cuando el cliente hace GET /, ejecutamos esta función callback.
  // req: objeto con información de la petición entrante
  // res: objeto con métodos para enviar la respuesta

  res.json({
    // res.json() serializa el objeto a JSON, lo envía al cliente,
    // y configura el header Content-Type: application/json automáticamente.
    mensaje:         "🔐 Sistema de Autenticación con JWT",
    version:         "1.0.0",
    rutasPublicas: [
      // Listamos todas las rutas disponibles para que sean autodocumentadas.
      // En proyectos reales usarías Swagger/OpenAPI para documentación.
      "GET    /                           → Esta documentación",
      "GET    /api/auth/info-jwt          → Estructura y explicación de un JWT real",
      "POST   /api/auth/registro          → Crear cuenta nueva",
      "POST   /api/auth/login             → Iniciar sesión → devuelve JWT",
      "POST   /api/auth/verificar-token   → Verificar y decodificar un token",
    ],
    rutasProtegidas: [
      "GET    /api/perfil                 → Ver mi perfil (requiere token)",
      "PUT    /api/perfil                 → Actualizar mi perfil (requiere token)",
      "GET    /api/admin                  → Solo rol 'admin'",
      "GET    /api/usuarios               → Solo rol 'admin'",
      "DELETE /api/usuarios/:id           → Solo rol 'admin'",
    ],
    instrucciones: [
      "1) Usa POST /api/auth/login para obtener tu token",
      "2) Copia el valor del campo 'token' de la respuesta",
      "3) En Postman, ve a Headers y agrega: Authorization: Bearer <token>",
      "4) Ahora puedes acceder a las rutas protegidas",
    ],
  });
});

// ─────────────────────────────────────────────────────────
//  GET /api/auth/info-jwt → Explicación visual de la estructura JWT
// ─────────────────────────────────────────────────────────
app.get("/api/auth/info-jwt", (req, res) => {
  // Esta ruta crea un JWT real de demostración y lo "disecciona"
  // para mostrar cada parte con su decodificación.
  // Es didáctica: te permite ver el token y entender su estructura.

  const tokenDemo = jwt.sign(
    // Creamos un token de ejemplo con datos ficticios.
    {
      userId: "demo123",
      nombre: "Usuario Demo",
      rol:    "usuario",
      ciudad: "Cali",
    },
    JWT_SECRET,
    { expiresIn: "5m" }
    // Expiración de 5 minutos para que puedas probarlo
    // en Postman antes de que expire.
  );

  // Un JWT tiene el formato: header.payload.signature
  // Separamos por "." para obtener las 3 partes.
  const partes = tokenDemo.split(".");
  // partes[0] = header en Base64url
  // partes[1] = payload en Base64url
  // partes[2] = signature en Base64url

  // Decodificamos el header de Base64url a un objeto JavaScript.
  // Buffer.from(string, "base64") decodifica un string Base64.
  // .toString() convierte el Buffer a string.
  // JSON.parse() convierte el string JSON a objeto JavaScript.
  const headerDecodificado = JSON.parse(Buffer.from(partes[0], "base64").toString());

  // Igual para el payload. Usamos "base64url" que maneja
  // los caracteres especiales de Base64url (- y _).
  const payloadDecodificado = JSON.parse(Buffer.from(partes[1], "base64url").toString());

  const ahora = Math.floor(Date.now() / 1000);
  // Date.now() devuelve milisegundos desde el 1 enero 1970 (Unix timestamp en ms).
  // Math.floor(.../ 1000) lo convierte a segundos (timestamp Unix).
  // Los timestamps de JWT (iat, exp) están en SEGUNDOS, no milisegundos.

  res.json({
    descripcion:   "Un JWT se divide en 3 partes separadas por puntos (.)",
    tokenCompleto: tokenDemo,
    longitud:      `${tokenDemo.length} caracteres`,

    estructura: {
      header: {
        posicion:     "Parte 1 (antes del primer punto)",
        rawBase64url: partes[0],
        // El string tal como aparece en el token (codificado)
        decodificado: headerDecodificado,
        // El objeto JavaScript que representa
        explicacion: {
          alg: "HS256 = HMAC con SHA-256. El algoritmo de firma.",
          typ: "JWT = El tipo de token.",
        },
      },
      payload: {
        posicion:     "Parte 2 (entre los dos puntos)",
        rawBase64url: partes[1],
        decodificado: payloadDecodificado,
        explicacion: {
          userId: "ID único del usuario en la base de datos",
          nombre: "Nombre del usuario para personalizar respuestas",
          rol:    "Permisos del usuario (usuario, admin, etc.)",
          ciudad: "Dato extra personalizado (private claim)",
          iat:    `Issued At: ${payloadDecodificado.iat} = ${new Date(payloadDecodificado.iat * 1000).toLocaleString("es-CO")}`,
          exp:    `Expiration: ${payloadDecodificado.exp} = ${new Date(payloadDecodificado.exp * 1000).toLocaleString("es-CO")}`,
          tiempoRestante: `${payloadDecodificado.exp - ahora} segundos hasta expirar`,
        },
        advertencia: "⚠️ El payload NO está encriptado. NUNCA pongas contraseñas aquí.",
        comoDecodificar: "En JavaScript: atob(parteDelMedio) te da el JSON del payload",
      },
      signature: {
        posicion:   "Parte 3 (después del último punto)",
        valor:      partes[2],
        como_se_calcula: "HMACSHA256(base64url(header) + '.' + base64url(payload), JWT_SECRET)",
        proposito:  "Garantiza que nadie modificó el header ni el payload.",
        importante: "Solo el servidor conoce JWT_SECRET, por eso solo él puede crear tokens válidos.",
      },
    },

    comoVerificarlo: [
      "1. El servidor recibe el token del cliente",
      "2. Separa las 3 partes por los puntos",
      "3. Recalcula: HMACSHA256(parte1 + '.' + parte2, JWT_SECRET)",
      "4. Compara el resultado con parte3 (la firma original)",
      "5. Si coinciden → token auténtico. Si no → fue modificado.",
      "6. Verifica también que 'exp' sea mayor a la hora actual",
    ],
  });
});

// ─────────────────────────────────────────────────────────
//  POST /api/auth/registro → Crear cuenta nueva
// ─────────────────────────────────────────────────────────
app.post("/api/auth/registro", (req, res) => {
  // Extraemos los campos del body usando destructuring.
  // Si el cliente envió: { "nombre": "María", "email": "...", "password": "...", "ciudad": "..." }
  // Obtenemos cada campo como variable individual.
  const { nombre, email, password, ciudad } = req.body;

  // ─────────────────────────────────────────
  //  VALIDACIÓN DE DATOS DE ENTRADA
  // ─────────────────────────────────────────
  // Nunca confíes en los datos que vienen del cliente.
  // Valida todo antes de procesarlo.
  // Usamos un array para acumular TODOS los errores y devolverlos juntos,
  // en lugar de devolver un error a la vez (mejor UX).

  const errores = [];
  // Array vacío que iremos llenando con mensajes de error.

  if (!nombre || nombre.trim() === "") {
    // !nombre → es undefined, null, "", false, o 0 (valores falsy)
    // nombre.trim() === "" → solo tenía espacios en blanco
    errores.push("El campo 'nombre' es obligatorio");
  } else if (nombre.trim().length < 2) {
    // else if → solo ejecuta si el nombre existe (no está vacío)
    // .trim() elimina espacios al inicio y al final
    // .length < 2 → muy corto para ser un nombre real
    errores.push("El nombre debe tener al menos 2 caracteres");
  }

  if (!email || email.trim() === "") {
    errores.push("El campo 'email' es obligatorio");
  } else if (!email.includes("@") || !email.includes(".")) {
    // Validación simple de formato de email.
    // En producción usarías una librería como joi o validator.js
    // para validaciones más robustas:
    // Joi.string().email().required()
    errores.push("El email no tiene un formato válido (debe contener @ y .)");
  } else if (usuarios.find((u) => u.email === email.trim().toLowerCase())) {
    // Buscamos si ya existe un usuario con ese email.
    // .find() devuelve el elemento encontrado o undefined.
    // .toLowerCase() para comparar sin distinción de mayúsculas.
    errores.push(`El email '${email}' ya está registrado en el sistema`);
  }

  if (!password) {
    errores.push("El campo 'password' es obligatorio");
  } else if (password.length < 8) {
    // Longitud mínima de contraseña.
    // En producción también validarías que tenga:
    // - Al menos una mayúscula
    // - Al menos un número
    // - Al menos un carácter especial
    errores.push("La contraseña debe tener al menos 8 caracteres");
  }

  if (errores.length > 0) {
    // Si hubo algún error, devolvemos 400 Bad Request con todos los errores.
    // 400 Bad Request: la petición tiene datos incorrectos o incompletos.
    // No llegamos a procesar nada hasta que los datos sean válidos.
    return res.status(400).json({
      exito:   false,
      mensaje: "Los datos enviados no son válidos",
      errores, // Atajo de ES6: { errores } es igual a { errores: errores }
    });
  }

  // ─────────────────────────────────────────
  //  CREACIÓN DEL USUARIO
  // ─────────────────────────────────────────

  const nuevoUsuario = {
    id:       `usr${Date.now()}`,
    // Date.now() devuelve el timestamp actual en milisegundos.
    // Es prácticamente único (dos usuarios registrados en el mismo milisegundo
    // tendrían el mismo ID, pero es muy improbable).
    // En producción usarías el ObjectId de MongoDB o crypto.randomUUID().

    nombre:   nombre.trim(),
    // .trim() elimina espacios extras al inicio y final
    // "  Juan  " → "Juan"

    email:    email.trim().toLowerCase(),
    // .toLowerCase() normaliza el email para evitar duplicados
    // "Juan@Email.COM" y "juan@email.com" son el mismo email.
    // Al guardar siempre en minúsculas, la comparación es consistente.

    password,
    // ⚠️  En producción real:
    // const hash = await bcrypt.hash(password, 10);
    // Guardas hash en lugar de password.
    // bcrypt aplica un algoritmo de hashing unidireccional:
    // no se puede "desencriptar" para obtener la contraseña original.
    // El 10 es el "salt rounds": cuántas veces itera el algoritmo.
    // Más iteraciones = más seguro, pero más lento.

    rol:    "usuario",
    // Los nuevos usuarios siempre empiezan con rol básico.
    // Un admin no puede registrarse como admin directamente.
    // Para hacer a alguien admin, un superadmin lo cambia manualmente
    // desde la BD o desde un panel de administración.

    ciudad: ciudad?.trim() || "Sin especificar",
    // ciudad?.trim() → optional chaining: si ciudad es undefined, no llama .trim()
    //                  (evita error: Cannot read property 'trim' of undefined)
    // || "Sin especificar" → si no vino ciudad en el body, usamos este default
  };

  usuarios.push(nuevoUsuario);
  // Agregamos el nuevo usuario al array.
  // En MongoDB sería: await Usuario.create(nuevoUsuario)

  // ─────────────────────────────────────────
  //  GENERACIÓN DEL TOKEN
  // ─────────────────────────────────────────
  // Generamos el JWT inmediatamente al registrar.
  // Así el usuario puede empezar a usar la API sin hacer login
  // por separado después de registrarse.
  const token = generarToken(nuevoUsuario);

  // ─────────────────────────────────────────
  //  RESPUESTA: EXCLUIR LA CONTRASEÑA
  // ─────────────────────────────────────────
  // NUNCA devuelvas la contraseña en la respuesta, aunque esté encriptada.
  // No hay ninguna razón para que el cliente la necesite.
  //
  // Usamos destructuring para separar la contraseña del resto:
  const { password: _password, ...usuarioSinPassword } = nuevoUsuario;
  // Esta línea hace dos cosas:
  // 1. Extrae nuevoUsuario.password y lo guarda en _password (que ignoramos)
  // 2. Extrae TODAS las demás propiedades en usuarioSinPassword
  //
  // _password: el prefijo _ es convención para "variable que no usamos"
  // ...usuarioSinPassword: el spread operator con el rest pattern
  // crea un nuevo objeto con todas las propiedades EXCEPTO password.
  //
  // Resultado: usuarioSinPassword = { id, nombre, email, rol, ciudad }
  //            (sin password)

  console.log(`  ✅ Nuevo usuario registrado: ${nuevoUsuario.nombre} (${nuevoUsuario.email})`);

  res.status(201).json({
    // 201 Created: la petición fue exitosa y se creó un nuevo recurso.
    // Es más específico que 200 OK, indica que algo nuevo fue creado.
    exito:     true,
    mensaje:   `¡Cuenta creada exitosamente! Bienvenido/a, ${nuevoUsuario.nombre}`,
    token,
    // El token para que el usuario pueda empezar a hacer peticiones autenticadas.
    expiraEn:  JWT_EXPIRES_IN,
    // Informamos al cliente cuánto tiempo es válido el token.
    usuario:   usuarioSinPassword,
    // Los datos del usuario SIN la contraseña.
    siguiente: "Usa el token en el header Authorization: Bearer <token>",
  });
});

// ─────────────────────────────────────────────────────────
//  POST /api/auth/login → Iniciar sesión, obtener JWT
// ─────────────────────────────────────────────────────────
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  // Extraemos email y password del cuerpo de la petición.

  // Validación básica de campos obligatorios.
  if (!email || !password) {
    return res.status(400).json({
      exito:   false,
      mensaje: "Email y contraseña son obligatorios",
    });
  }

  // ─────────────────────────────────────────
  //  BÚSQUEDA DEL USUARIO
  // ─────────────────────────────────────────
  const usuario = usuarios.find(
    (u) => u.email === email.toLowerCase().trim()
    // Buscamos por email normalizado (minúsculas, sin espacios).
    // .find() itera el array hasta encontrar el primer elemento
    // que cumpla la condición. Devuelve el elemento o undefined.
    // En MongoDB sería: await Usuario.findOne({ email: email.toLowerCase() })
  );

  // ─────────────────────────────────────────
  //  VERIFICACIÓN — Respuesta genérica por seguridad
  // ─────────────────────────────────────────
  if (!usuario || usuario.password !== password) {
    // ⚠️  SEGURIDAD IMPORTANTE: damos el MISMO mensaje en ambos casos:
    // - si el email no existe (usuario es undefined)
    // - si la contraseña es incorrecta
    //
    // Si dieras mensajes diferentes ("email no encontrado" vs "contraseña incorrecta"),
    // un atacante podría usar el endpoint para descubrir qué emails están registrados
    // (ataque de enumeración de usuarios). Al dar el mismo mensaje, no revelas
    // si el problema es el email o la contraseña.
    //
    // En producción con bcrypt sería:
    // const passwordValida = await bcrypt.compare(password, usuario?.password || "");
    // if (!usuario || !passwordValida) { ... }
    //
    // El "|| ''" en usuario?.password asegura que bcrypt.compare() siempre
    // reciba un string, evitando fugas de tiempo en la comparación.
    return res.status(401).json({
      exito:   false,
      codigo:  401,
      mensaje: "Credenciales incorrectas. Verifica tu email y contraseña.",
    });
  }

  // ─────────────────────────────────────────
  //  GENERACIÓN DEL TOKEN
  // ─────────────────────────────────────────
  const token = generarToken(usuario);
  // Si las credenciales son correctas, generamos el JWT.

  // Creamos objeto de respuesta sin la contraseña.
  const { password: _password, ...usuarioSinPassword } = usuario;

  console.log(`  ✅ Login exitoso: ${usuario.nombre} (${usuario.email}) - Rol: ${usuario.rol}`);

  res.status(200).json({
    // 200 OK: la petición fue exitosa.
    exito:     true,
    mensaje:   `¡Bienvenido/a de vuelta, ${usuario.nombre}!`,
    token,
    // El JWT que el cliente debe guardar y enviar en cada petición protegida.
    expiraEn:  JWT_EXPIRES_IN,
    usuario:   usuarioSinPassword,
    // Info del usuario para que el frontend pueda mostrarla (nombre, rol, etc.)
    comoUsarlo: [
      "1. Copia el valor del campo 'token'",
      "2. En Postman: Headers → Authorization: Bearer <token>",
      "3. En código: fetch('/api/perfil', { headers: { Authorization: `Bearer ${token}` } })",
    ],
  });
});

// ─────────────────────────────────────────────────────────
//  POST /api/auth/verificar-token → Verificar y decodificar un token
// ─────────────────────────────────────────────────────────
app.post("/api/auth/verificar-token", (req, res) => {
  // Esta ruta es didáctica: te permite pegar un token y ver
  // si es válido y qué contiene. Útil para depuración y aprendizaje.

  const { token } = req.body;
  // Esperamos que el cliente envíe: { "token": "eyJhbGci..." }

  if (!token) {
    return res.status(400).json({
      exito:   false,
      mensaje: "Debes enviar el token en el body: { \"token\": \"eyJ...\" }",
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Si jwt.verify() no lanza una excepción, el token es válido.
    // payload contiene todos los datos que se pusieron al crear el token
    // más iat y exp que jwt agrega automáticamente.

    const ahora = Math.floor(Date.now() / 1000);
    // Timestamp actual en segundos para calcular tiempo restante.

    const segundosRestantes = payload.exp - ahora;
    // payload.exp es el timestamp de expiración en segundos.
    // La diferencia entre exp y ahora es el tiempo que queda.

    res.json({
      exito:          true,
      valido:         true,
      payload,
      // Todos los datos del token decodificados.
      resumen: {
        tiempoRestante: `${Math.floor(segundosRestantes / 60)} minutos y ${segundosRestantes % 60} segundos`,
        // Math.floor(segundos / 60) → convierte segundos a minutos (redondeando hacia abajo)
        // segundos % 60 → los segundos restantes que no completaron un minuto
        // Ejemplo: 3725 segundos → 62 minutos y 5 segundos

        creadoEn: new Date(payload.iat * 1000).toLocaleString("es-CO"),
        // payload.iat está en segundos → * 1000 para convertir a milisegundos
        // new Date(ms) crea un objeto de fecha
        // .toLocaleString("es-CO") formatea según la zona horaria colombiana

        expiraEn: new Date(payload.exp * 1000).toLocaleString("es-CO"),
        // Igual que arriba pero para la fecha de expiración.

        estaVigente: segundosRestantes > 0,
        // true si todavía no ha expirado, false si ya venció.
      },
    });
  } catch (error) {
    // Si jwt.verify() lanzó una excepción, el token no es válido.
    res.status(401).json({
      exito:       false,
      valido:      false,
      tipoError:   error.name,
      // Ejemplo: "TokenExpiredError", "JsonWebTokenError"
      mensajeError: error.message,
      // Descripción técnica del error.
      consejo: error.name === "TokenExpiredError"
        ? "El token venció. Haz login nuevamente para obtener uno nuevo."
        : "El token es inválido. ¿Lo copiaste completo?",
    });
  }
});

// ════════════════════════════════════════════════════════
//  RUTAS PROTEGIDAS — Requieren JWT válido en el header
// ════════════════════════════════════════════════════════
//
//  Estas rutas usan verificarToken como middleware.
//  Si el token no es válido, verificarToken devuelve 401 y
//  el handler (la función de la ruta) NUNCA se ejecuta.
//
//  SINTAXIS:
//  app.get("/ruta", middlewareA, middlewareB, handler)
//  Los middlewares se ejecutan en ORDEN de izquierda a derecha.
//  Cada uno llama a next() para pasar al siguiente.

// ─────────────────────────────────────────────────────────
//  GET /api/perfil → Ver mi perfil
// ─────────────────────────────────────────────────────────
app.get("/api/perfil", verificarToken, (req, res) => {
  // req.usuario fue puesto por verificarToken.
  // Contiene: { userId, nombre, email, rol, iat, exp }

  // Buscamos el usuario completo en la "BD" usando el ID del token.
  const usuario = usuarios.find((u) => u.id === req.usuario.userId);
  // req.usuario.userId es el ID que pusimos en el payload al crear el token.
  // Lo usamos para buscar el usuario en la BD y obtener datos
  // que no pusimos en el token (como ciudad, teléfono, etc.).

  if (!usuario) {
    // Esto sería raro: el token es válido pero el usuario ya no existe en la BD.
    // Podría pasar si el usuario fue eliminado después de crear el token.
    return res.status(404).json({
      exito:   false,
      mensaje: "Usuario no encontrado. La cuenta puede haber sido eliminada.",
    });
  }

  const { password: _password, ...usuarioSinPassword } = usuario;
  // Excluimos la contraseña antes de devolverla al cliente.

  res.json({
    exito:     true,
    mensaje:   "Perfil obtenido exitosamente",
    perfil:    usuarioSinPassword,
    tokenInfo: {
      // Incluimos información del token para que el cliente
      // sepa cuándo necesitará renovarlo.
      userId:   req.usuario.userId,
      rol:      req.usuario.rol,
      expiraEn: new Date(req.usuario.exp * 1000).toLocaleString("es-CO"),
      // Convertimos el timestamp Unix a fecha legible.
    },
  });
});

// ─────────────────────────────────────────────────────────
//  PUT /api/perfil → Actualizar mi propio perfil
// ─────────────────────────────────────────────────────────
app.put("/api/perfil", verificarToken, (req, res) => {
  // PUT se usa para actualizar un recurso existente.
  // Solo permite actualizar el perfil del usuario autenticado,
  // NO el de otros usuarios (eso previene que alguien modifique
  // perfiles ajenos aunque tenga un token válido).

  const { nombre, ciudad } = req.body;
  // Solo permitimos actualizar ciertos campos.
  // El email, rol y contraseña requieren procesos especiales
  // (verificación de email, panel admin, proceso de cambio de contraseña).

  // Buscamos el índice del usuario en el array para modificarlo.
  const indice = usuarios.findIndex((u) => u.id === req.usuario.userId);
  // .findIndex() es como .find() pero devuelve el ÍNDICE en lugar del elemento.
  // Necesitamos el índice para modificar directamente: usuarios[indice].nombre = ...

  if (indice === -1) {
    // -1 significa que no encontró ningún elemento que cumpla la condición.
    return res.status(404).json({
      exito:   false,
      mensaje: "Usuario no encontrado",
    });
  }

  // Actualizamos solo los campos que el cliente envió.
  // Si no envió un campo, no lo tocamos (no lo sobreescribimos con undefined).
  if (nombre && nombre.trim()) {
    usuarios[indice].nombre = nombre.trim();
    // Solo actualizamos si el nombre vino en el body y no está vacío.
  }
  if (ciudad && ciudad.trim()) {
    usuarios[indice].ciudad = ciudad.trim();
  }

  const { password: _password, ...usuarioActualizado } = usuarios[indice];
  // Preparamos la respuesta sin la contraseña.

  console.log(`  ✏️  Perfil actualizado: ${usuarios[indice].nombre}`);

  res.json({
    exito:   true,
    mensaje: "Perfil actualizado exitosamente",
    perfil:  usuarioActualizado,
  });
});

// ─────────────────────────────────────────────────────────
//  GET /api/admin → Panel de administración
// ─────────────────────────────────────────────────────────
app.get("/api/admin", verificarToken, verificarRol("admin"), (req, res) => {
  // Encadenamos DOS middlewares antes del handler:
  // 1. verificarToken: verifica que el token sea válido y pone req.usuario
  // 2. verificarRol("admin"): verifica que req.usuario.rol sea "admin"
  //
  // Si cualquiera falla (token inválido o rol incorrecto),
  // el handler de la ruta nunca se ejecuta.
  //
  // Este patrón de middlewares encadenados es el corazón de la
  // autorización basada en roles en Express.

  res.json({
    exito:    true,
    mensaje:  `Panel de Administración`,
    acceso:   "EXCLUSIVO PARA ADMINISTRADORES",
    admin:    req.usuario.nombre,
    // Usamos el nombre del admin del token para personalizar.
    rol:      req.usuario.rol,
    funciones: [
      "Ver todos los usuarios: GET /api/usuarios",
      "Eliminar usuario: DELETE /api/usuarios/:id",
      "Ver estadísticas del sistema",
      "Gestionar roles y permisos",
    ],
    nota: "En un sistema real, aquí irían funciones de gestión completa",
  });
});

// ─────────────────────────────────────────────────────────
//  GET /api/usuarios → Listar todos los usuarios (solo admin)
// ─────────────────────────────────────────────────────────
app.get("/api/usuarios", verificarToken, verificarRol("admin"), (req, res) => {
  // .map() itera el array y devuelve un nuevo array transformado.
  // Para cada usuario, hacemos destructuring para excluir la contraseña
  // y devolvemos el resto con el spread operator.
  const usuariosSinPassword = usuarios.map(({ password: _p, ...u }) => u);
  // Equivalente a:
  // const usuariosSinPassword = usuarios.map((usuario) => {
  //   const { password, ...resto } = usuario;
  //   return resto;
  // });

  res.json({
    exito:       true,
    total:       usuariosSinPassword.length,
    // Número total de usuarios en el sistema.
    datos:       usuariosSinPassword,
    // Array con todos los usuarios (sin contraseñas).
    consultadoPor: req.usuario.nombre,
    // Registramos quién realizó la consulta (útil para auditoría).
    timestamp:   new Date().toLocaleString("es-CO"),
  });
});

// ─────────────────────────────────────────────────────────
//  DELETE /api/usuarios/:id → Eliminar usuario (solo admin)
// ─────────────────────────────────────────────────────────
app.delete("/api/usuarios/:id", verificarToken, verificarRol("admin"), (req, res) => {
  // req.params.id captura el valor de :id en la URL.
  // Si la URL es DELETE /api/usuarios/usr001 → req.params.id = "usr001"
  const { id } = req.params;

  // Un admin no debería poder eliminarse a sí mismo.
  // Comparamos el ID del token con el ID a eliminar.
  if (id === req.usuario.userId) {
    return res.status(400).json({
      exito:   false,
      mensaje: "No puedes eliminar tu propia cuenta mientras estás autenticado.",
    });
  }

  const indice = usuarios.findIndex((u) => u.id === id);
  // Buscamos el índice del usuario a eliminar.

  if (indice === -1) {
    return res.status(404).json({
      exito:   false,
      mensaje: `No existe ningún usuario con el ID '${id}'`,
    });
  }

  const usuarioEliminado = usuarios[indice];
  // Guardamos referencia antes de eliminar para incluirlo en la respuesta.

  usuarios.splice(indice, 1);
  // Array.splice(inicio, cantidad):
  // - inicio: desde qué índice empezar
  // - cantidad: cuántos elementos eliminar
  // splice(indice, 1) elimina 1 elemento en la posición 'indice'.
  // MODIFICA el array original (a diferencia de .filter() que crea uno nuevo).
  // En MongoDB sería: await Usuario.findByIdAndDelete(id)

  console.log(`  🗑️  Usuario eliminado: ${usuarioEliminado.nombre} (por: ${req.usuario.nombre})`);

  res.json({
    exito:   true,
    mensaje: `Usuario '${usuarioEliminado.nombre}' eliminado exitosamente`,
    eliminadoPor: req.usuario.nombre,
    // Registramos quién hizo la eliminación (auditoría).
  });
});

// ════════════════════════════════════════════════════════
//  MIDDLEWARE 404 — Ruta no encontrada
// ════════════════════════════════════════════════════════
//
//  Este middleware se ejecuta cuando NINGUNA ruta definida
//  arriba coincide con la petición del cliente.
//  Debe ir DESPUÉS de todas las rutas (el orden importa en Express).

app.use((req, res) => {
  // app.use() sin ruta como primer argumento se aplica a CUALQUIER ruta y método.
  // Como está al final, solo llega aquí si ninguna ruta anterior coincidió.
  res.status(404).json({
    // 404 Not Found: el recurso solicitado no existe.
    exito:    false,
    codigo:   404,
    mensaje:  `La ruta '${req.method} ${req.url}' no existe en esta API`,
    // req.method: el método HTTP (GET, POST, PUT, DELETE, etc.)
    // req.url: la URL solicitada (ej: /api/algo-que-no-existe)
    rutasValidas: [
      "GET  /",
      "GET  /api/auth/info-jwt",
      "POST /api/auth/registro",
      "POST /api/auth/login",
      "POST /api/auth/verificar-token",
      "GET  /api/perfil",
      "PUT  /api/perfil",
      "GET  /api/admin",
      "GET  /api/usuarios",
      "DELETE /api/usuarios/:id",
    ],
  });
});

// ════════════════════════════════════════════════════════
//  MIDDLEWARE DE MANEJO DE ERRORES GLOBALES
// ════════════════════════════════════════════════════════
//
//  Express reconoce un middleware como "manejador de errores"
//  cuando tiene CUATRO parámetros: (err, req, res, next).
//  Captura errores que se lanzaron con next(error) en otras rutas.
//  También debe ir al final, después de todas las rutas.

app.use((err, req, res, next) => {
  // err: el objeto de error capturado
  // req, res: igual que siempre
  // next: no suele usarse aquí, pero Express requiere los 4 params
  //       para reconocerlo como manejador de errores.

  console.error("❌ Error no manejado:", err.message);
  // Registramos el error en la consola del servidor para depuración.
  // En producción usarías un logger como Winston o Pino.

  res.status(500).json({
    // 500 Internal Server Error: algo falló en el servidor,
    // no por culpa del cliente.
    exito:   false,
    codigo:  500,
    mensaje: "Error interno del servidor. El equipo técnico fue notificado.",
    // No exponemos los detalles del error al cliente por seguridad.
    // Los detalles quedan solo en los logs del servidor.
  });
});

// ════════════════════════════════════════════════════════
//  INICIAR EL SERVIDOR
// ════════════════════════════════════════════════════════

app.listen(PUERTO, () => {
  // app.listen(puerto, callback):
  // - Inicia el servidor y lo pone a "escuchar" peticiones en el puerto especificado.
  // - El callback se ejecuta UNA VEZ cuando el servidor ya está listo.
  // - A partir de este momento, el proceso de Node.js NO termina;
  //   se queda corriendo esperando peticiones indefinidamente.
  // - Para detenerlo: Ctrl + C en la terminal.

  console.log("\n========================================");
  console.log("  🔐 SERVIDOR JWT — LISTO");
  console.log("========================================");
  console.log(`  ✅ Corriendo en: http://localhost:${PUERTO}`);
  console.log(`  🔑 JWT_SECRET: ${JWT_SECRET.substring(0, 10)}... (${JWT_SECRET.length} caracteres)`);
  // Mostramos solo los primeros 10 caracteres por seguridad, no la clave completa.
  // .substring(inicio, fin): extrae una parte del string
  console.log(`  ⏱️  Expiración token: ${JWT_EXPIRES_IN}`);
  console.log("\n  ─────────────────────────────────────");
  console.log("  📧 Usuarios de prueba:");
  console.log("     juan@email.com  / 12345678  → rol: usuario");
  console.log("     admin@email.com / admin1234 → rol: admin");
  console.log("\n  🧪 Flujo de prueba en Postman:");
  console.log("  1. POST /api/auth/login");
  console.log('     Body: { "email": "juan@email.com", "password": "12345678" }');
  console.log("  2. Copia el campo 'token' de la respuesta");
  console.log("  3. GET /api/perfil");
  console.log("     Header → Authorization: Bearer <token>");
  console.log("  4. GET /api/admin con el token del admin");
  console.log("  ─────────────────────────────────────");
  console.log("  Ctrl + C para detener el servidor\n");
});

// ============================================================
//  📝 RESUMEN DE LO APRENDIDO EN ESTA INVESTIGACIÓN
// ============================================================
//
//  1. JWT es un estándar para transmitir información firmada entre
//     cliente y servidor. Soluciona el problema del estado en HTTP.
//
//  2. Tiene 3 partes: Header (algoritmo), Payload (datos),
//     Signature (firma que garantiza integridad).
//
//  3. El payload NO está encriptado, solo codificado en Base64.
//     Nunca guardes contraseñas ni datos críticos en él.
//
//  4. jwt.sign() crea el token. jwt.verify() lo verifica.
//     Ambos usan la misma clave secreta (JWT_SECRET).
//
//  5. Los middlewares en Express son la clave para proteger rutas:
//     verificarToken → verifica el JWT
//     verificarRol() → verifica los permisos
//     Se encadenan: app.get("/ruta", verificarToken, verificarRol("admin"), handler)
//
//  6. Siempre usa HTTPS en producción para que el token
//     no pueda ser interceptado en tránsito.
//
//  7. Guarda JWT_SECRET en el .env, nunca en el código.
//     Usa tiempos de expiración cortos (15min - 1h).
//
//  8. Para mejor experiencia: combina access token (corto) con
//     refresh token (largo) para que el usuario no tenga que
//     hacer login frecuentemente.
// ============================================================