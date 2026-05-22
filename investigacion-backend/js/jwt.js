// ============================================================
//  📘 INVESTIGACIÓN #8 — ¿QUÉ ES JWT?
// ============================================================
//
//  JWT = JSON Web Token (Token Web JSON)
//
//  Es un ESTÁNDAR ABIERTO (RFC 7519) para transmitir información
//  de forma segura entre dos partes como un objeto JSON.
//  Esa información puede ser VERIFICADA porque está firmada
//  digitalmente.
//
//  ¿PARA QUÉ SE USA?
//  ─────────────────
//  Principalmente para AUTENTICACIÓN y AUTORIZACIÓN:
//
//  AUTENTICACIÓN → Verificar quién eres (¿eres Juan Pérez?)
//  AUTORIZACIÓN  → Verificar qué puedes hacer (¿puedes borrar este post?)
//
//  ¿CUÁL ES EL FLUJO DE JWT?
//  ──────────────────────────
//
//  1. El usuario envía sus credenciales:
//     POST /api/auth/login  { email: "juan@...", password: "1234" }
//
//  2. El servidor verifica las credenciales en la base de datos.
//
//  3. Si son correctas, el servidor GENERA un JWT y lo envía:
//     { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
//
//  4. El cliente GUARDA el token (en localStorage o memoria).
//
//  5. En cada petición protegida, el cliente ENVÍA el token
//     en el header Authorization:
//     Authorization: Bearer eyJhbGci...
//
//  6. El servidor VERIFICA el token con su clave secreta.
//     Si es válido → permite el acceso.
//     Si expiró o es inválido → responde 401 Unauthorized.
//
//  DIAGRAMA DEL FLUJO:
//  ────────────────────
//  Cliente          Servidor
//    │                │
//    │─── login ─────▶│  Verifica email + password
//    │◀── JWT token ──│  Genera y devuelve token
//    │                │
//    │─── GET /perfil ▶│  Envía token en header
//    │  Authorization: │  Verifica token
//    │  Bearer <token> │
//    │◀── datos ───────│  Si es válido, devuelve datos
//
//  ─────────────────────────────────────────────────────────
//  ESTRUCTURA DE UN JWT
//  ─────────────────────────────────────────────────────────
//
//  Un JWT tiene 3 partes separadas por puntos (.):
//
//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9    ← HEADER
//  .
//  eyJ1c2VySWQiOiIxMjMiLCJub21icmUiOiJK... ← PAYLOAD
//  .
//  SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQ  ← SIGNATURE
//
//  1. HEADER (encabezado):
//     Indica el algoritmo de firma y el tipo de token.
//     En Base64: { "alg": "HS256", "typ": "JWT" }
//     alg = HS256 → HMAC con SHA-256 (el más usado)
//
//  2. PAYLOAD (carga útil):
//     Los DATOS que quieres guardar en el token (llamados "claims").
//     En Base64: {
//       "userId": "64abc123",
//       "nombre": "Juan Pérez",
//       "rol": "admin",
//       "iat": 1716384000,    ← issued at: cuándo se creó
//       "exp": 1716988800     ← expiration: cuándo expira
//     }
//     ⚠️  El payload NO está encriptado, solo codificado en Base64.
//        NUNCA guardes contraseñas ni datos muy sensibles en el payload.
//
//  3. SIGNATURE (firma):
//     Garantiza que el token NO fue modificado.
//     Se crea así:
//     HMACSHA256(
//       base64(header) + "." + base64(payload),
//       SECRET_KEY  ← clave secreta que SOLO el servidor conoce
//     )
//     Si alguien modifica el payload, la firma ya no coincide
//     y el servidor rechaza el token.
//
//  ─────────────────────────────────────────────────────────
//  JWT vs SESIONES TRADICIONALES
//  ─────────────────────────────────────────────────────────
//
//  SESIONES (forma antigua):
//  ✅ El servidor guarda la sesión en memoria/base de datos
//  ✅ El cliente solo guarda un ID de sesión (en cookie)
//  ❌ No escala bien (si tienes 3 servidores, ¿cuál tiene la sesión?)
//  ❌ Requiere base de datos para cada verificación
//
//  JWT (forma moderna):
//  ✅ El servidor NO guarda nada — el token lo lleva el cliente
//  ✅ Escala perfectamente (cualquier servidor puede verificarlo)
//  ✅ Funciona para APIs, apps móviles, microservicios
//  ❌ No se puede invalidar un token antes de que expire
//     (solución: usar refresh tokens o blacklist en Redis)
//  ❌ Si el token es robado, el atacante tiene acceso hasta que expire
//
//  ─────────────────────────────────────────────────────────
//  CLAIMS ESTÁNDAR DEL PAYLOAD
//  ─────────────────────────────────────────────────────────
//  iss (Issuer)     → Quién emitió el token ("mi-app.com")
//  sub (Subject)    → ID del usuario ("64abc123")
//  aud (Audience)   → Para quién es el token ("mi-app-frontend")
//  exp (Expiration) → Cuándo expira (timestamp Unix)
//  iat (Issued At)  → Cuándo fue creado (timestamp Unix)
//  nbf (Not Before) → No válido antes de este momento
//
//  ─────────────────────────────────────────────────────────
//  BUENAS PRÁCTICAS CON JWT
//  ─────────────────────────────────────────────────────────
//  ✅ Guarda el SECRET en el .env, NUNCA en el código
//  ✅ Usa tiempos de expiración cortos (15min - 1h para access token)
//  ✅ Usa Refresh Tokens para renovar access tokens
//  ✅ Transmite JWT solo por HTTPS en producción
//  ✅ No guardes datos sensibles (contraseñas) en el payload
//  ✅ Valida SIEMPRE el token en el servidor, nunca confíes en el cliente
//  ❌ No guardes el JWT en localStorage en apps críticas (riesgo XSS)
//     Mejor en httpOnly cookies o en memoria
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — Sistema de autenticación con JWT
// ============================================================
//
//  INSTRUCCIONES:
//  1. npm install express jsonwebtoken dotenv
//  2. Crea .env con: JWT_SECRET=mi_clave_secreta_super_larga_2024
//  3. node 08_jwt.js
//  4. Prueba en Postman:
//     a) POST http://localhost:3000/api/auth/registro
//        Body: { "nombre": "Juan", "email": "juan@email.com", "password": "12345678" }
//     b) POST http://localhost:3000/api/auth/login
//        Body: { "email": "juan@email.com", "password": "12345678" }
//        → Copia el token que devuelve
//     c) GET http://localhost:3000/api/perfil
//        Header: Authorization: Bearer <pega el token aquí>
//     d) GET http://localhost:3000/api/admin
//        Header: Authorization: Bearer <token de usuario admin>
//
// ============================================================

"use strict";

require("dotenv").config();

const express = require("express");
const jwt     = require("jsonwebtoken");

const app    = express();
const PUERTO = 3000;

app.use(express.json());

// ────────────────────────────────────────────────────────
//  Clave secreta para firmar los JWT
//  En producción debe ser muy larga y estar en el .env
//  Si no hay .env, usamos un valor por defecto (solo para pruebas)
// ────────────────────────────────────────────────────────
const JWT_SECRET     = process.env.JWT_SECRET || "clave_secreta_temporal_solo_para_pruebas_2024";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"; // El token expira en 1 hora

// ────────────────────────────────────────────────────────
//  "Base de datos" de usuarios en memoria
//  En un proyecto real, estarían en MongoDB con contraseñas encriptadas con bcrypt
// ────────────────────────────────────────────────────────
const usuarios = [
  {
    id: "usr001",
    nombre: "Juan Pérez",
    email: "juan@email.com",
    // ⚠️  En producción real NUNCA guardes contraseñas en texto plano
    // Usa bcrypt: const hash = await bcrypt.hash(password, 10)
    password: "12345678",
    rol: "usuario",
    ciudad: "Cali",
  },
  {
    id: "usr002",
    nombre: "Admin General",
    email: "admin@email.com",
    password: "admin1234",
    rol: "admin",
    ciudad: "Bogotá",
  },
];

// ════════════════════════════════════════════════════════
//  MIDDLEWARE DE AUTENTICACIÓN
//  Verifica que el JWT en el header Authorization sea válido.
//  Se reutiliza en cualquier ruta que necesite protección.
// ════════════════════════════════════════════════════════
const verificarToken = (req, res, next) => {
  // El token debe venir en el header: Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];

  // Verificamos que el header exista
  if (!authHeader) {
    return res.status(401).json({
      exito:   false,
      codigo:  401,
      mensaje: "Acceso denegado. No se proporcionó token de autenticación.",
      ayuda:   "Agrega el header: Authorization: Bearer <tu_token>",
    });
  }

  // El formato es "Bearer <token>" — extraemos solo el token
  const partes = authHeader.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({
      exito:   false,
      mensaje: "Formato de token inválido. Usa: Bearer <token>",
    });
  }

  const token = partes[1];

  try {
    // jwt.verify() hace DOS cosas:
    // 1. Verifica que la firma sea correcta (con JWT_SECRET)
    // 2. Verifica que el token no haya expirado (exp)
    // Si algo falla, lanza una excepción que capturamos abajo
    const payload = jwt.verify(token, JWT_SECRET);

    // Si el token es válido, guardamos el payload en req.usuario
    // para que las rutas siguientes puedan usarlo
    req.usuario = payload;

    console.log(`  🔐 Token válido para: ${payload.nombre} (${payload.rol})`);
    next(); // Continúa al siguiente middleware o ruta
  } catch (error) {
    // TokenExpiredError: el token expiró
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        exito:   false,
        codigo:  401,
        mensaje: "El token ha expirado. Inicia sesión nuevamente.",
        expiredAt: error.expiredAt,
      });
    }
    // JsonWebTokenError: token inválido, modificado o firma incorrecta
    return res.status(401).json({
      exito:   false,
      codigo:  401,
      mensaje: "Token inválido o manipulado.",
    });
  }
};

// ════════════════════════════════════════════════════════
//  MIDDLEWARE DE AUTORIZACIÓN POR ROL
//  Se usa después de verificarToken para verificar el rol.
//  Es una función que DEVUELVE un middleware (función de orden superior)
// ════════════════════════════════════════════════════════
const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    // req.usuario fue puesto por verificarToken
    const rolUsuario = req.usuario?.rol;

    if (!rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({
        exito:          false,
        codigo:         403,
        mensaje:        "Acceso prohibido. No tienes los permisos necesarios.",
        tuRol:          rolUsuario,
        rolesRequeridos: rolesPermitidos,
      });
    }

    next(); // El rol es válido, continúa
  };
};

// ════════════════════════════════════════════════════════
//  RUTAS PÚBLICAS (no requieren token)
// ════════════════════════════════════════════════════════

// GET / → Información general
app.get("/", (req, res) => {
  res.json({
    mensaje: "🔐 Sistema de Autenticación con JWT",
    rutasPublicas: [
      "GET    /                         → Esta página",
      "GET    /api/auth/info-jwt        → Explicación del JWT",
      "POST   /api/auth/registro        → Registrar usuario",
      "POST   /api/auth/login           → Iniciar sesión → devuelve JWT",
      "POST   /api/auth/verificar-token → Verificar y decodificar un token",
    ],
    rutasProtegidas: [
      "GET    /api/perfil               → Ver mi perfil (cualquier usuario autenticado)",
      "PUT    /api/perfil               → Actualizar mi perfil",
      "GET    /api/admin                → Solo rol 'admin'",
      "GET    /api/usuarios             → Solo rol 'admin'",
    ],
    instrucciones: "1) Regístrate o usa login → 2) Copia el token → 3) Úsalo en header Authorization: Bearer <token>",
  });
});

// GET /api/auth/info-jwt → Explica la estructura del JWT
app.get("/api/auth/info-jwt", (req, res) => {
  // Creamos un token de demostración para mostrarlo
  const tokenDemo = jwt.sign(
    {
      userId: "demo123",
      nombre: "Usuario Demo",
      rol:    "usuario",
      ciudad: "Cali",
    },
    JWT_SECRET,
    { expiresIn: "5m" }
  );

  // Decodificamos manualmente para mostrar las partes
  const partes = tokenDemo.split(".");

  res.json({
    descripcion: "Un JWT tiene 3 partes separadas por puntos (.)",
    tokenCompleto: tokenDemo,
    partes: {
      header: {
        posicion:    "Parte 1 (antes del primer punto)",
        base64:      partes[0],
        decodificado: JSON.parse(Buffer.from(partes[0], "base64").toString()),
        explicacion: "Algoritmo de firma y tipo de token",
      },
      payload: {
        posicion:    "Parte 2 (entre los dos puntos)",
        base64:      partes[1],
        decodificado: JSON.parse(Buffer.from(partes[1], "base64url").toString()),
        explicacion: "Los datos del usuario (NO está encriptado, solo codificado)",
      },
      signature: {
        posicion:   "Parte 3 (después del último punto)",
        valor:      partes[2],
        explicacion: "Firma digital que garantiza que el token no fue modificado",
      },
    },
    advertencia: "El payload es legible, NUNCA guardes contraseñas en él",
  });
});

// POST /api/auth/registro → Crear cuenta nueva
app.post("/api/auth/registro", (req, res) => {
  const { nombre, email, password, ciudad } = req.body;

  // Validación básica
  const errores = [];
  if (!nombre)   errores.push("El nombre es obligatorio");
  if (!email)    errores.push("El email es obligatorio");
  if (!password) errores.push("La contraseña es obligatoria");
  if (password && password.length < 8) {
    errores.push("La contraseña debe tener al menos 8 caracteres");
  }
  if (email && usuarios.find((u) => u.email === email)) {
    errores.push(`El email '${email}' ya está registrado`);
  }

  if (errores.length > 0) {
    return res.status(400).json({ exito: false, errores });
  }

  // Creamos el usuario (en producción real encriptaríamos la contraseña con bcrypt)
  const nuevoUsuario = {
    id:       `usr${Date.now()}`,
    nombre:   nombre.trim(),
    email:    email.trim().toLowerCase(),
    password, // ⚠️  En producción: bcrypt.hash(password, 10)
    rol:      "usuario",
    ciudad:   ciudad || "Sin especificar",
  };

  usuarios.push(nuevoUsuario);

  // Generamos el JWT para que pueda empezar a usarlo inmediatamente
  const token = jwt.sign(
    {
      userId: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email:  nuevoUsuario.email,
      rol:    nuevoUsuario.rol,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  // Devolvemos el usuario SIN la contraseña
  const { password: _, ...usuarioSinPassword } = nuevoUsuario;

  res.status(201).json({
    exito:   true,
    mensaje: "Usuario registrado exitosamente",
    token,
    usuario: usuarioSinPassword,
    expira:  JWT_EXPIRES_IN,
  });
});

// POST /api/auth/login → Iniciar sesión, devuelve JWT
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      exito:   false,
      mensaje: "Email y contraseña son obligatorios",
    });
  }

  // Buscamos el usuario
  const usuario = usuarios.find(
    (u) => u.email === email.toLowerCase()
  );

  // Verificación: usuario no existe o contraseña incorrecta
  // ⚠️  El mensaje es GENÉRICO a propósito (seguridad: no decimos
  //     si el email existe o no, para evitar enumeración de usuarios)
  if (!usuario || usuario.password !== password) {
    return res.status(401).json({
      exito:   false,
      codigo:  401,
      mensaje: "Credenciales incorrectas. Verifica tu email y contraseña.",
    });
  }

  // Generamos el JWT con el payload del usuario
  // NUNCA incluyas la contraseña en el payload
  const token = jwt.sign(
    {
      userId: usuario.id,
      nombre: usuario.nombre,
      email:  usuario.email,
      rol:    usuario.rol,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const { password: _, ...usuarioSinPassword } = usuario;

  console.log(`  ✅ Login exitoso: ${usuario.nombre} (${usuario.rol})`);

  res.status(200).json({
    exito:     true,
    mensaje:   `Bienvenido/a, ${usuario.nombre}!`,
    token,
    expiraEn:  JWT_EXPIRES_IN,
    usuario:   usuarioSinPassword,
    comoUsarlo: "Agrega este header en tus peticiones: Authorization: Bearer <token>",
  });
});

// POST /api/auth/verificar-token → Decodifica y verifica un token
app.post("/api/auth/verificar-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ exito: false, mensaje: "Envía el token en el body: { token: '...' }" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const ahora   = Math.floor(Date.now() / 1000);

    res.json({
      exito:     true,
      valido:    true,
      payload,
      tiempoRestante: `${payload.exp - ahora} segundos`,
      creadoEn:  new Date(payload.iat * 1000).toLocaleString("es-CO"),
      expiraEn:  new Date(payload.exp * 1000).toLocaleString("es-CO"),
    });
  } catch (error) {
    res.status(401).json({
      exito:  false,
      valido: false,
      error:  error.name,
      mensaje: error.message,
    });
  }
});

// ════════════════════════════════════════════════════════
//  RUTAS PROTEGIDAS — Requieren JWT válido
//  Usamos verificarToken como middleware antes del handler
// ════════════════════════════════════════════════════════

// GET /api/perfil → Cualquier usuario autenticado puede ver su perfil
app.get("/api/perfil", verificarToken, (req, res) => {
  // req.usuario fue puesto por el middleware verificarToken
  const usuario = usuarios.find((u) => u.id === req.usuario.userId);
  const { password: _, ...usuarioSinPassword } = usuario;

  res.json({
    exito:     true,
    mensaje:   "Perfil obtenido exitosamente",
    perfil:    usuarioSinPassword,
    tokenInfo: {
      userId:   req.usuario.userId,
      rol:      req.usuario.rol,
      expiraEn: new Date(req.usuario.exp * 1000).toLocaleString("es-CO"),
    },
  });
});

// PUT /api/perfil → Actualizar mi perfil (solo el mío)
app.put("/api/perfil", verificarToken, (req, res) => {
  const idx = usuarios.findIndex((u) => u.id === req.usuario.userId);
  const { nombre, ciudad } = req.body;

  if (nombre) usuarios[idx].nombre = nombre;
  if (ciudad) usuarios[idx].ciudad = ciudad;

  const { password: _, ...usuarioSinPassword } = usuarios[idx];

  res.json({
    exito:   true,
    mensaje: "Perfil actualizado exitosamente",
    perfil:  usuarioSinPassword,
  });
});

// GET /api/admin → Solo accesible por rol "admin"
// Encadenamos dos middlewares: primero verifica token, luego verifica rol
app.get("/api/admin", verificarToken, verificarRol("admin"), (req, res) => {
  res.json({
    exito:   true,
    mensaje: `Panel de administración — Bienvenido/a ${req.usuario.nombre}`,
    acceso:  "SOLO ADMINISTRADORES",
    info:    "Aquí irían funciones exclusivas de administrador",
    tuRol:   req.usuario.rol,
  });
});

// GET /api/usuarios → Solo admins pueden ver todos los usuarios
app.get("/api/usuarios", verificarToken, verificarRol("admin"), (req, res) => {
  const usuariosSinPassword = usuarios.map(({ password: _, ...u }) => u);

  res.json({
    exito:   true,
    total:   usuariosSinPassword.length,
    datos:   usuariosSinPassword,
    vistoBy: req.usuario.nombre,
  });
});

// ════════════════════════════════════════════════════════
//  404 y manejo de errores
// ════════════════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({ mensaje: `Ruta '${req.method} ${req.url}' no existe` });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ mensaje: "Error interno del servidor" });
});

// ════════════════════════════════════════════════════════
//  Iniciar servidor
// ════════════════════════════════════════════════════════
app.listen(PUERTO, () => {
  console.log("\n========================================");
  console.log("  🔐 SERVIDOR JWT INICIADO");
  console.log("========================================");
  console.log(`  ✅ URL: http://localhost:${PUERTO}`);
  console.log("\n  Flujo de prueba en Postman:");
  console.log("  1. POST /api/auth/login");
  console.log('     Body: { "email": "juan@email.com", "password": "12345678" }');
  console.log("  2. Copia el token de la respuesta");
  console.log("  3. GET  /api/perfil");
  console.log("     Header: Authorization: Bearer <token>");
  console.log("\n  Usuarios de prueba:");
  console.log("  📧 juan@email.com   / 12345678 → rol: usuario");
  console.log("  📧 admin@email.com  / admin1234 → rol: admin");
  console.log("\n  Ctrl + C para detener\n");
});