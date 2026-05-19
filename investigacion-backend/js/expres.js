// ============================================================
//  📘 INVESTIGACIÓN #4 — ¿QUÉ ES EXPRESS.JS?
// ============================================================
//
//  Express.js (o simplemente "Express") es el FRAMEWORK WEB
//  más popular para Node.js. Fue creado por TJ Holowaychuk
//  en 2010 y actualmente es mantenido por la comunidad.
//
//  ¿QUÉ ES UN FRAMEWORK?
//  ─────────────────────
//  Un framework es como una "plantilla o estructura pre-construida"
//  que simplifica el desarrollo. En vez de escribir código desde
//  cero para manejar rutas, peticiones HTTP, respuestas, etc.,
//  Express te da herramientas listas para usar.
//
//  ANALOGÍA:
//  ─────────
//  Construir un servidor web con Node.js puro es como construir
//  una casa desde los cimientos. Express es como comprar una casa
//  prefabricada: ya tiene estructura, paredes, puerta. Solo la
//  personalizas según tus necesidades.
//
//  ¿QUÉ PROBLEMAS RESUELVE EXPRESS?
//  ──────────────────────────────────
//  Node.js incluye un módulo HTTP básico para crear servidores,
//  pero es muy primitivo. Para cada funcionalidad (rutas, cookies,
//  manejo de errores) tendrías que escribir mucho código manual.
//
//  Express simplifica todo esto con:
//
//  1. 🛣️  ROUTING (Sistema de rutas):
//     Maneja diferentes URLs y métodos HTTP (GET, POST, PUT, DELETE)
//     de forma limpia y organizada.
//
//  2. 🔌 MIDDLEWARE:
//     Funciones intermedias que procesan las peticiones antes de
//     llegar a la ruta final. Sirven para:
//     - Parsear el cuerpo (body) de las peticiones
//     - Verificar autenticación
//     - Registrar logs
//     - Comprimir respuestas
//     - Manejar errores
//
//  3. 📝 PLANTILLAS (Template Engines):
//     Renderizar HTML dinámico (con EJS, Pug, Handlebars, etc.)
//
//  4. 🗂️  ARCHIVOS ESTÁTICOS:
//     Servir imágenes, CSS, JavaScript del frontend fácilmente.
//
//  5. 🔒 INTEGRACIÓN SENCILLA:
//     Se integra fácilmente con bases de datos (MongoDB, PostgreSQL),
//     sistemas de autenticación, validadores, etc.
//
//  ¿QUÉ ES UNA API REST?
//  ─────────────────────
//  REST = Representational State Transfer
//  Una API REST es una forma de comunicación entre sistemas usando
//  el protocolo HTTP. Express es ideal para crearlas.
//
//  MÉTODOS HTTP MÁS USADOS:
//  ────────────────────────
//  GET    → Obtener información (leer datos)
//  POST   → Crear nueva información (crear datos)
//  PUT    → Actualizar información completa (reemplazar)
//  PATCH  → Actualizar información parcial (modificar campos)
//  DELETE → Eliminar información
//
//  CÓDIGOS DE RESPUESTA HTTP:
//  ──────────────────────────
//  200 OK          → Todo salió bien
//  201 Created     → Recurso creado exitosamente
//  400 Bad Request → Error en los datos enviados por el cliente
//  401 Unauthorized → No tiene permiso/no está autenticado
//  403 Forbidden   → Autenticado pero sin permisos suficientes
//  404 Not Found   → El recurso no existe
//  500 Internal Server Error → Error en el servidor
//
//  ¿QUÉ ES MIDDLEWARE EN EXPRESS?
//  ──────────────────────────────
//  Un middleware es una función que tiene acceso a:
//  - req  → El objeto de la petición (request)
//  - res  → El objeto de la respuesta (response)
//  - next → Función para pasar al siguiente middleware
//
//  Flujo: Petición → Middleware1 → Middleware2 → Ruta → Respuesta
//
//  Ejemplo de middleware:
//  app.use((req, res, next) => {
//    console.log('Nueva petición:', req.method, req.url);
//    next(); // IMPORTANTE: llamar next() para continuar
//  });
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — Servidor Express completo
// ============================================================
//
//  INSTRUCCIONES PARA EJECUTAR:
//  1. Abre la terminal en VS Code (Ctrl + `)
//  2. Navega a la carpeta del proyecto:
//     cd investigacion_nodejs
//  3. Inicializa npm (si no lo has hecho):
//     npm init -y
//  4. Instala Express:
//     npm install express
//  5. Ejecuta este archivo:
//     node 04_express.js
//  6. Abre tu navegador en:
//     http://localhost:3000
//  7. Prueba las rutas listadas abajo
//  8. Para detener el servidor: Ctrl + C
//
//  RUTAS DISPONIBLES:
//  ──────────────────
//  GET  http://localhost:3000/              → Página de bienvenida
//  GET  http://localhost:3000/api/info      → Info del servidor
//  GET  http://localhost:3000/api/productos → Lista de productos
//  GET  http://localhost:3000/api/productos/1 → Producto con ID 1
//  POST http://localhost:3000/api/productos → Crear producto (usar Postman)
//  PUT  http://localhost:3000/api/productos/1 → Actualizar producto (Postman)
//  DELETE http://localhost:3000/api/productos/1 → Eliminar producto (Postman)
//
// ============================================================

"use strict";

// ─────────────────────────────────────────
//  IMPORTACIONES
// ─────────────────────────────────────────
const express = require("express"); // Framework web principal

// ─────────────────────────────────────────
//  CONFIGURACIÓN DE LA APLICACIÓN
// ─────────────────────────────────────────
const app = express(); // Creamos la instancia de Express
const PUERTO = 3000; // Puerto donde escuchará el servidor

// ─────────────────────────────────────────
//  BASE DE DATOS EN MEMORIA (simulada)
//  En un proyecto real, esto vendría de MongoDB con Mongoose
// ─────────────────────────────────────────
let productos = [
  {
    id: 1,
    nombre: "Laptop HP",
    precio: 2500000,
    categoria: "electrónica",
    stock: 15,
  },
  {
    id: 2,
    nombre: "Mouse Inalámbrico",
    precio: 85000,
    categoria: "accesorios",
    stock: 50,
  },
  {
    id: 3,
    nombre: "Teclado Mecánico",
    precio: 320000,
    categoria: "accesorios",
    stock: 30,
  },
  {
    id: 4,
    nombre: "Monitor 27\"",
    precio: 1200000,
    categoria: "electrónica",
    stock: 8,
  },
];

let contadorIds = productos.length; // Para auto-incrementar IDs

// ════════════════════════════════════════════════════════
//  MIDDLEWARES GLOBALES
//  Se ejecutan en CADA petición, antes de llegar a las rutas
// ════════════════════════════════════════════════════════

// Middleware 1: express.json()
// Permite que Express parsee (entienda) cuerpos JSON en las peticiones.
// Sin esto, req.body sería undefined en POST/PUT/PATCH.
app.use(express.json());

// Middleware 2: express.urlencoded()
// Permite parsear datos de formularios HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Middleware 3: Logger personalizado
// Registra cada petición que llega al servidor (muy útil para debugging)
app.use((req, res, next) => {
  const ahora = new Date().toLocaleTimeString("es-CO");
  console.log(`[${ahora}] ${req.method.padEnd(7)} ${req.url}`);
  next(); // FUNDAMENTAL: llama al siguiente middleware/ruta
});

// ════════════════════════════════════════════════════════
//  RUTAS — PÁGINA DE INICIO
// ════════════════════════════════════════════════════════

// GET / → Devuelve una página HTML de bienvenida
app.get("/", (req, res) => {
  // res.send() envía una respuesta. Puede ser HTML, texto, JSON.
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Mi Servidor Express</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          max-width: 700px; 
          margin: 40px auto; 
          padding: 20px;
          background: #f5f5f5;
        }
        h1 { color: #2c3e50; }
        h2 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 8px; }
        .ruta { 
          background: white; 
          padding: 10px 15px; 
          margin: 8px 0; 
          border-left: 4px solid #3498db;
          border-radius: 4px;
        }
        .metodo { 
          display: inline-block; 
          padding: 2px 8px; 
          border-radius: 3px; 
          font-weight: bold; 
          font-size: 12px;
          margin-right: 8px;
        }
        .get { background: #2ecc71; color: white; }
        .post { background: #3498db; color: white; }
        .put { background: #f39c12; color: white; }
        .delete { background: #e74c3c; color: white; }
        code { 
          background: #ecf0f1; 
          padding: 2px 6px; 
          border-radius: 3px; 
          font-size: 14px;
        }
        .badge {
          background: #27ae60;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 13px;
        }
      </style>
    </head>
    <body>
      <h1>🚀 Servidor Express Funcionando</h1>
      <p><span class="badge">✓ ACTIVO</span> El servidor está corriendo correctamente.</p>
      
      <h2>📋 Rutas Disponibles (API de Productos)</h2>
      
      <div class="ruta">
        <span class="metodo get">GET</span>
        <code>/api/info</code> — Información del servidor
      </div>
      <div class="ruta">
        <span class="metodo get">GET</span>
        <code>/api/productos</code> — Listar todos los productos
      </div>
      <div class="ruta">
        <span class="metodo get">GET</span>
        <code>/api/productos/:id</code> — Obtener un producto por ID
      </div>
      <div class="ruta">
        <span class="metodo get">GET</span>
        <code>/api/productos?categoria=electronica</code> — Filtrar por categoría
      </div>
      <div class="ruta">
        <span class="metodo post">POST</span>
        <code>/api/productos</code> — Crear un nuevo producto (requiere Postman)
      </div>
      <div class="ruta">
        <span class="metodo put">PUT</span>
        <code>/api/productos/:id</code> — Actualizar un producto (requiere Postman)
      </div>
      <div class="ruta">
        <span class="metodo delete">DELETE</span>
        <code>/api/productos/:id</code> — Eliminar un producto (requiere Postman)
      </div>

      <h2>🔗 Prueba estas URLs en el navegador</h2>
      <p><a href="/api/info">/api/info</a></p>
      <p><a href="/api/productos">/api/productos</a></p>
      <p><a href="/api/productos/1">/api/productos/1</a></p>
      <p><a href="/api/productos?categoria=electronica">/api/productos?categoria=electronica</a></p>
    </body>
    </html>
  `);
});

// ════════════════════════════════════════════════════════
//  RUTAS — INFORMACIÓN DEL SERVIDOR
// ════════════════════════════════════════════════════════

// GET /api/info → Devuelve información sobre el servidor
app.get("/api/info", (req, res) => {
  // res.json() serializa el objeto a JSON y lo envía
  // También establece el header Content-Type: application/json
  res.json({
    mensaje: "API de Tienda Virtual",
    version: "1.0.0",
    autor: "Estudiante Node.js",
    tecnologias: ["Node.js", "Express"],
    fechaActual: new Date().toLocaleString("es-CO"),
    nodejsVersion: process.version,
    uptime: `${Math.floor(process.uptime())} segundos`,
    endpoints: {
      productos: "/api/productos",
    },
  });
});

// ════════════════════════════════════════════════════════
//  RUTAS — CRUD DE PRODUCTOS
//  CRUD = Create (POST), Read (GET), Update (PUT), Delete (DELETE)
// ════════════════════════════════════════════════════════

// ──────────────────────────────────────
//  GET /api/productos → Listar TODOS los productos
//  También permite filtrar por categoría: ?categoria=electronica
// ──────────────────────────────────────
app.get("/api/productos", (req, res) => {
  // req.query contiene los parámetros de la URL después del '?'
  // Ejemplo: /api/productos?categoria=accesorios
  const { categoria } = req.query;

  let resultado = productos;

  // Si se envió el query param 'categoria', filtramos
  if (categoria) {
    resultado = productos.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  // Respondemos con estado 200 (OK) y el array de productos
  res.status(200).json({
    exito: true,
    total: resultado.length,
    datos: resultado,
  });
});

// ──────────────────────────────────────
//  GET /api/productos/:id → Obtener UN producto por su ID
//  :id es un parámetro de ruta (route parameter)
// ──────────────────────────────────────
app.get("/api/productos/:id", (req, res) => {
  // req.params contiene los parámetros de la ruta
  // req.params.id es el valor del ':id' en la URL
  const id = parseInt(req.params.id); // Convertimos a número

  // Validamos que el ID sea un número válido
  if (isNaN(id)) {
    return res.status(400).json({
      exito: false,
      mensaje: "El ID debe ser un número válido",
    });
  }

  // Buscamos el producto en nuestra "base de datos"
  const producto = productos.find((p) => p.id === id);

  // Si no existe, respondemos con 404
  if (!producto) {
    return res.status(404).json({
      exito: false,
      mensaje: `No se encontró ningún producto con ID ${id}`,
    });
  }

  // Si existe, lo devolvemos con 200
  res.status(200).json({
    exito: true,
    dato: producto,
  });
});

// ──────────────────────────────────────
//  POST /api/productos → Crear un NUEVO producto
//  Los datos vienen en el BODY de la petición (JSON)
// ──────────────────────────────────────
app.post("/api/productos", (req, res) => {
  // req.body contiene el JSON enviado en el cuerpo de la petición
  // (funciona gracias al middleware express.json() que pusimos arriba)
  const { nombre, precio, categoria, stock } = req.body;

  // ──── Validación de datos ────
  // Buena práctica: siempre validar los datos que llegan del cliente
  const errores = [];

  if (!nombre || nombre.trim() === "") {
    errores.push("El nombre del producto es obligatorio");
  }
  if (!precio || isNaN(precio) || precio <= 0) {
    errores.push("El precio debe ser un número mayor a 0");
  }
  if (!categoria || categoria.trim() === "") {
    errores.push("La categoría es obligatoria");
  }
  if (stock === undefined || isNaN(stock) || stock < 0) {
    errores.push("El stock debe ser un número mayor o igual a 0");
  }

  // Si hay errores, respondemos con 400 (Bad Request)
  if (errores.length > 0) {
    return res.status(400).json({
      exito: false,
      mensaje: "Datos inválidos",
      errores,
    });
  }

  // Creamos el nuevo producto
  contadorIds++;
  const nuevoProducto = {
    id: contadorIds,
    nombre: nombre.trim(),
    precio: Number(precio),
    categoria: categoria.trim().toLowerCase(),
    stock: Number(stock),
  };

  // Lo agregamos a nuestra "base de datos" en memoria
  productos.push(nuevoProducto);

  // Respondemos con 201 (Created) y el producto creado
  res.status(201).json({
    exito: true,
    mensaje: "Producto creado exitosamente",
    dato: nuevoProducto,
  });
});

// ──────────────────────────────────────
//  PUT /api/productos/:id → Actualizar un producto COMPLETO
// ──────────────────────────────────────
app.put("/api/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ exito: false, mensaje: "ID inválido" });
  }

  // Buscamos el índice del producto en el array
  const indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      mensaje: `No se encontró el producto con ID ${id}`,
    });
  }

  const { nombre, precio, categoria, stock } = req.body;

  // Actualizamos el producto (conservamos el id original)
  productos[indice] = {
    id, // Mantenemos el ID original
    nombre: nombre || productos[indice].nombre,
    precio: precio !== undefined ? Number(precio) : productos[indice].precio,
    categoria: categoria || productos[indice].categoria,
    stock: stock !== undefined ? Number(stock) : productos[indice].stock,
  };

  res.status(200).json({
    exito: true,
    mensaje: "Producto actualizado exitosamente",
    dato: productos[indice],
  });
});

// ──────────────────────────────────────
//  DELETE /api/productos/:id → Eliminar un producto
// ──────────────────────────────────────
app.delete("/api/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ exito: false, mensaje: "ID inválido" });
  }

  const indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      mensaje: `No se encontró el producto con ID ${id}`,
    });
  }

  // Guardamos el producto eliminado para mostrarlo en la respuesta
  const productoEliminado = productos[indice];

  // splice() elimina el elemento del array en el índice dado
  productos.splice(indice, 1);

  res.status(200).json({
    exito: true,
    mensaje: "Producto eliminado exitosamente",
    dato: productoEliminado,
  });
});

// ════════════════════════════════════════════════════════
//  MIDDLEWARE — RUTA NO ENCONTRADA (404)
//  Este middleware se ejecuta si ninguna ruta anterior coincidió.
//  Debe ir SIEMPRE al final, antes del middleware de errores.
// ════════════════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: `La ruta '${req.url}' no existe en este servidor`,
    rutasDisponibles: [
      "GET /",
      "GET /api/info",
      "GET /api/productos",
      "GET /api/productos/:id",
      "POST /api/productos",
      "PUT /api/productos/:id",
      "DELETE /api/productos/:id",
    ],
  });
});

// ════════════════════════════════════════════════════════
//  MIDDLEWARE — MANEJO DE ERRORES GLOBALES
//  Tiene 4 parámetros (err, req, res, next) — así Express lo reconoce.
//  Se ejecuta cuando se llama next(error) en cualquier ruta.
// ════════════════════════════════════════════════════════
app.use((err, req, res, next) => {
  console.error("❌ Error en el servidor:", err.stack);
  res.status(500).json({
    exito: false,
    mensaje: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ════════════════════════════════════════════════════════
//  INICIAR EL SERVIDOR
//  app.listen() hace que Express empiece a escuchar conexiones
// ════════════════════════════════════════════════════════
app.listen(PUERTO, () => {
  console.log("\n========================================");
  console.log("  🚀 SERVIDOR EXPRESS INICIADO");
  console.log("========================================");
  console.log(`  ✅ URL:     http://localhost:${PUERTO}`);
  console.log(`  ✅ API:     http://localhost:${PUERTO}/api/productos`);
  console.log(`  ✅ Info:    http://localhost:${PUERTO}/api/info`);
  console.log("\n  📋 Rutas disponibles:");
  console.log("  GET    /api/productos");
  console.log("  GET    /api/productos/:id");
  console.log("  GET    /api/productos?categoria=electronica");
  console.log("  POST   /api/productos");
  console.log("  PUT    /api/productos/:id");
  console.log("  DELETE /api/productos/:id");
  console.log("\n  Presiona Ctrl + C para detener el servidor\n");
});