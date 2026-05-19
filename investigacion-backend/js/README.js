// ============================================================
//  📄 README.js — GUÍA COMPLETA DEL PROYECTO
// ============================================================
//
//  INVESTIGACIÓN: Node.js + Express + MongoDB + Mongoose
//  ══════════════════════════════════════════════════════
//
//  ARCHIVOS DEL PROYECTO:
//  ─────────────────────────────────────────────────────────
//
//  01_que_es_nodejs.js
//    → Qué es Node.js, cómo funciona, módulos nativos (os, path, fs)
//    → Ejecutar: node 01_que_es_nodejs.js
//
//  02_que_es_npm.js
//    → Qué es npm, todos los comandos esenciales, paquetes populares
//    → Ejecutar: node 02_que_es_npm.js
//
//  03_package_json.js
//    → Qué es package.json, cada campo explicado, versionado semántico
//    → Ejecutar: node 03_package_json.js
//
//  04_express.js
//    → Qué es Express, API REST CRUD completa (sin base de datos)
//    → Instalar: npm install express
//    → Ejecutar: node 04_express.js
//    → Abrir:    http://localhost:3000
//
//  05_mongodb_no_relacional.js
//    → Bases de datos no relacionales, SQL vs NoSQL,
//      qué es MongoDB, cómo crear cuenta en Mongo Atlas paso a paso
//    → Ejecutar: node 05_mongodb_no_relacional.js
//
//  06_mongoose.js
//    → Qué es Mongoose, Schemas, Models, Validaciones,
//      Hooks, Population, API completa conectada a MongoDB Atlas
//    → Instalar: npm install express mongoose dotenv
//    → Configurar: crear archivo .env con la URI de Atlas
//    → Ejecutar: node 06_mongoose.js
//    → Primer paso: POST http://localhost:3000/api/seed
//
//  env.ejemplo.js
//    → Plantilla de ejemplo del archivo .env (seguro para subir a GitHub)
//
//  gitignore.js
//    → Explicación del archivo .gitignore y su contenido
//
// ══════════════════════════════════════════════════════════
//  PASOS PARA CONFIGURAR Y EJECUTAR EL PROYECTO COMPLETO
// ══════════════════════════════════════════════════════════
//
//  PASO 1 — Instalar Node.js (si no lo tienes):
//  ──────────────────────────────────────────────
//  Descargar desde: https://nodejs.org
//  Elegir la versión LTS (la más estable).
//  Verificar instalación en la terminal:
//    node --version
//    npm --version
//
//  PASO 2 — Inicializar el proyecto:
//  ───────────────────────────────────
//  En la terminal dentro de esta carpeta:
//    npm init -y
//  Esto crea el archivo package.json.
//
//  PASO 3 — Instalar dependencias:
//  ─────────────────────────────────
//    npm install express mongoose dotenv
//  Esto crea la carpeta node_modules/ con los paquetes.
//
//  PASO 4 — Crear cuenta en MongoDB Atlas:
//  ─────────────────────────────────────────
//  1. Ve a: https://www.mongodb.com/atlas/database
//  2. Clic "Try Free" → Regístrate
//  3. Crea un cluster FREE (M0 Sandbox — gratis para siempre)
//  4. Database Access → Crear usuario y contraseña
//  5. Network Access → Allow Access from Anywhere
//  6. Connect → Connect your application → Copia la URI
//
//  PASO 5 — Crear el archivo .env:
//  ─────────────────────────────────
//  Crea un archivo llamado exactamente ".env" en esta carpeta.
//  Contenido (reemplaza con tus datos reales):
//
//    MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@cluster0.xxxxx.mongodb.net/tiendaDB
//    PUERTO=3000
//    NODE_ENV=development
//
//  ⚠️  NUNCA subas el .env a GitHub.
//
//  PASO 6 — Ejecutar el servidor:
//  ────────────────────────────────
//    node 06_mongoose.js
//
//  PASO 7 — Cargar datos de prueba (solo la primera vez):
//  ────────────────────────────────────────────────────────
//  En Postman o en el navegador:
//    POST http://localhost:3000/api/seed
//
//  PASO 8 — Probar la API:
//  ─────────────────────────
//  En el navegador:
//    http://localhost:3000/api/productos
//    http://localhost:3000/api/categorias
//
// ══════════════════════════════════════════════════════════
//  COMANDOS RÁPIDOS DE REFERENCIA
// ══════════════════════════════════════════════════════════
//
//  npm init -y                         → Crear package.json
//  npm install express mongoose dotenv → Instalar todo
//  node 06_mongoose.js                 → Iniciar servidor
//  Ctrl + C                            → Detener servidor
//
// ══════════════════════════════════════════════════════════
//  RUTAS DE LA API (archivo 06_mongoose.js)
// ══════════════════════════════════════════════════════════
//
//  POST   /api/seed              → Cargar datos de prueba
//  GET    /api/categorias        → Listar categorías
//  GET    /api/categorias/:id    → Ver una categoría
//  POST   /api/categorias        → Crear categoría
//  DELETE /api/categorias/:id    → Eliminar categoría
//  GET    /api/productos         → Listar productos
//  GET    /api/productos/:id     → Ver un producto
//  POST   /api/productos         → Crear producto
//  PUT    /api/productos/:id     → Actualizar producto
//  DELETE /api/productos/:id     → Desactivar producto
//
// ══════════════════════════════════════════════════════════
//  RESUMEN DE CONCEPTOS
// ══════════════════════════════════════════════════════════
//
//  Node.js   → Entorno para ejecutar JS fuera del navegador
//  npm       → Gestor de paquetes de Node.js
//  package.json → Archivo de configuración del proyecto
//  Express   → Framework web para crear servidores y APIs
//  MongoDB   → Base de datos NoSQL orientada a documentos JSON
//  Mongoose  → Librería que conecta Node.js con MongoDB
//  Schema    → Plantilla que define la estructura de documentos
//  Model     → Interfaz para hacer CRUD en una colección
//  populate()→ Equivalente al JOIN de SQL en MongoDB
//  .env      → Archivo con variables secretas (NO subir a GitHub)
//  .gitignore→ Le dice a Git qué archivos ignorar
//
// ============================================================

console.log("📚 README del proyecto — Investigación Node.js + MongoDB");
console.log("   Lee los comentarios de este archivo para entender");
console.log("   cómo está organizado y cómo ejecutar cada parte.\n");