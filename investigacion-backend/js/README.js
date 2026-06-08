// ============================================================
//  📘 README.js — GUÍA COMPLETA DEL PROYECTO
// ============================================================
//
//  INVESTIGACIÓN: Node.js + Express + MongoDB + Mongoose
//  ══════════════════════════════════════════════════════
//
//  ¿QUÉ ES ESTE PROYECTO?
//  ─────────────────────────────────────────────────────────
//
//  Este es un proyecto de APRENDIZAJE que cubre todo el stack
//  de backend con JavaScript. Cada archivo es una investigación
//  independiente que explora un concepto específico, con teoría
//  detallada y ejemplos prácticos ejecutables en Node.js.
//
//  No es un proyecto de producción. Es un LABORATORIO donde
//  puedes leer, ejecutar y experimentar con cada concepto.
//
//  ¿A QUIÉN ESTÁ DIRIGIDO?
//  ─────────────────────────────────────────────────────────
//
//  A desarrolladores que ya conocen JavaScript básico (variables,
//  funciones, arrays, objetos, Promises, async/await) y quieren
//  aprender a construir APIs y backends con Node.js.
//
//  Si puedes entender esto, estás listo:
//  const suma = async (a, b) => await Promise.resolve(a + b);
//
//  ¿QUÉ APRENDERÁS?
//  ─────────────────────────────────────────────────────────
//
//  Al completar todas las investigaciones sabrás:
//
//  ✅ Qué es Node.js y cómo ejecutar JavaScript en el servidor
//  ✅ Cómo usar npm para gestionar dependencias y paquetes
//  ✅ Qué es y cómo leer el package.json de un proyecto
//  ✅ Cómo crear APIs REST completas con Express
//  ✅ Qué son las bases de datos NoSQL y cómo se diferencias del SQL
//  ✅ Cómo conectar tu aplicación a MongoDB Atlas (nube)
//  ✅ Cómo usar Mongoose para definir modelos y hacer consultas
//  ✅ Cómo implementar autenticación segura con JWT
//  ✅ Cómo hacer un CRUD completo (Create, Read, Update, Delete)
//  ✅ Cómo proteger datos sensibles con variables de entorno (.env)
//  ✅ Cómo usar Git y GitHub correctamente con .gitignore
//
//  TECNOLOGÍAS DEL STACK:
//  ─────────────────────────────────────────────────────────
//
//  ┌─────────────────────────────────────────────────────────┐
//  │                 CLIENTE (Frontend)                       │
//  │          React / Vue / Angular / HTML puro               │
//  │     Hace peticiones HTTP (fetch, axios, Postman)         │
//  └───────────────────────┬─────────────────────────────────┘
//                          │ HTTP (GET, POST, PUT, DELETE)
//                          │ Cuerpo: JSON
//                          ▼
//  ┌─────────────────────────────────────────────────────────┐
//  │                SERVIDOR (Backend)                        │
//  │              Node.js + Express                           │
//  │   Recibe peticiones, procesa lógica, responde JSON       │
//  └───────────────────────┬─────────────────────────────────┘
//                          │ Mongoose (ODM)
//                          │ Consultas a la BD
//                          ▼
//  ┌─────────────────────────────────────────────────────────┐
//  │              BASE DE DATOS                               │
//  │           MongoDB Atlas (nube)                           │
//  │    Almacena documentos JSON de forma persistente         │
//  └─────────────────────────────────────────────────────────┘
//
//  En este proyecto tú construyes la capa del SERVIDOR.
//  El cliente será Postman (durante el aprendizaje) y después
//  cualquier frontend que consuma tu API.
//
// ══════════════════════════════════════════════════════════
//  📚 MAPA DE APRENDIZAJE — TODOS LOS ARCHIVOS DEL PROYECTO
// ══════════════════════════════════════════════════════════
//
//  Los archivos están numerados en orden de complejidad.
//  Se recomienda estudiarlos EN ORDEN porque cada uno
//  construye sobre los conceptos del anterior.
//
//  ──────────────────────────────────────────────────────────
//  01_que_es_nodejs.js                              [BÁSICO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué es Node.js y por qué cambió el desarrollo web
//    - La diferencia entre ejecutar JS en el navegador vs Node.js
//    - Qué es el Event Loop (el motor que hace Node.js tan rápido)
//    - Qué son los módulos nativos de Node.js (sin instalar nada)
//    - Cómo usar el módulo 'os' para obtener info del sistema
//    - Cómo usar el módulo 'path' para trabajar con rutas de archivos
//    - Cómo usar el módulo 'fs' para leer y escribir archivos
//    - La diferencia entre código síncrono y asíncrono
//    - Qué son los CommonJS modules (require/module.exports)
//
//  Conceptos clave:
//    Node.js, Event Loop, non-blocking I/O, módulos nativos,
//    require(), module.exports, process, __dirname, __filename
//
//  Prerrequisitos: JavaScript básico (variables, funciones, arrays)
//  Ejecutar: node 01_que_es_nodejs.js
//  Tiempo estimado de estudio: 45-60 minutos
//
//  ──────────────────────────────────────────────────────────
//  02_que_es_npm.js                                 [BÁSICO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué es npm (Node Package Manager) y para qué sirve
//    - Qué es un "paquete" y la analogía con una ferretería
//    - La diferencia entre el registro de npm y la herramienta CLI
//    - Por qué necesitamos npm (el caos antes de los gestores)
//    - Todos los comandos esenciales: init, install, uninstall, update
//    - La diferencia entre dependencies y devDependencies
//    - Qué es node_modules/ y por qué NO se sube a GitHub
//    - Qué es package-lock.json y por qué SÍ se sube a GitHub
//    - Los paquetes más populares del ecosistema Node.js
//    - Alternativas a npm: yarn y pnpm
//
//  Conceptos clave:
//    npm registry, npm CLI, dependencies, devDependencies,
//    node_modules, package-lock.json, semver (^, ~, versión exacta)
//
//  Prerrequisitos: 01_que_es_nodejs.js
//  Ejecutar: node 02_que_es_npm.js
//  Tiempo estimado de estudio: 45 minutos
//
//  ──────────────────────────────────────────────────────────
//  03_package_json.js                               [BÁSICO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué es package.json y por qué es el "corazón" del proyecto
//    - Cada campo del package.json explicado en detalle
//    - Cómo crear y leer el package.json correctamente
//    - El versionado semántico (SemVer): MAJOR.MINOR.PATCH
//    - Qué significan los símbolos ^, ~ y versión exacta
//    - Los scripts de npm: cómo crear y usar atajos de comandos
//    - Scripts avanzados: hooks pre/post, comandos encadenados
//    - Los tipos de licencias más comunes (MIT, ISC, GPL)
//
//  Conceptos clave:
//    package.json, SemVer, scripts, main, dependencies,
//    devDependencies, license, npm run, npm start, npm test
//
//  Prerrequisitos: 02_que_es_npm.js
//  Ejecutar: node 03_package_json.js
//  Tiempo estimado de estudio: 30 minutos
//
//  ──────────────────────────────────────────────────────────
//  04_express.js                                [INTERMEDIO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué es Express y por qué es el framework web más popular
//    - Cómo funciona el protocolo HTTP (petición → respuesta)
//    - Los métodos HTTP: GET, POST, PUT, PATCH, DELETE
//    - Qué es una API REST y sus principios (URLs como sustantivos)
//    - Cómo definir rutas y sus manejadores (handlers)
//    - Qué son los middlewares y cómo funcionan en cadena
//    - Los objetos req (petición) y res (respuesta) en detalle
//    - Parámetros de ruta (:id), query params (?clave=valor) y body
//    - Los códigos de estado HTTP (200, 201, 400, 404, 500)
//    - API REST completa sin base de datos (datos en memoria)
//
//  Conceptos clave:
//    Express, HTTP, REST, middleware, req, res, next,
//    route params, query params, body, status codes, JSON
//
//  Instalar: npm install express
//  Ejecutar: node 04_express.js
//  Probar:   http://localhost:3000
//  Tiempo estimado de estudio: 90 minutos
//
//  ──────────────────────────────────────────────────────────
//  05_mongodb_no_relacional.js                  [INTERMEDIO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué es una base de datos y para qué sirve
//    - Diferencia entre SQL (relacional) y NoSQL (no relacional)
//    - Cuándo usar SQL y cuándo usar NoSQL (cada uno tiene su lugar)
//    - Qué es MongoDB y qué lo hace diferente
//    - Los conceptos: colección, documento, campo (vs tabla, fila, columna)
//    - Qué es BSON y por qué MongoDB lo usa internamente
//    - Cómo crear una cuenta gratuita en MongoDB Atlas paso a paso
//    - Qué es un ObjectId de MongoDB (_id)
//    - Los operadores de consulta de MongoDB: $eq, $gt, $in, $regex, etc.
//    - La estructura de una URI de conexión de MongoDB
//
//  Conceptos clave:
//    NoSQL, documento, colección, BSON, ObjectId, MongoDB Atlas,
//    URI de conexión, operadores de consulta ($gt, $in, $regex)
//
//  Prerrequisitos: 04_express.js
//  Ejecutar: node 05_mongodb_no_relacional.js
//  Tiempo estimado de estudio: 60 minutos
//
//  ──────────────────────────────────────────────────────────
//  06_mongoose.js                               [INTERMEDIO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué es Mongoose y qué problema resuelve (ODM = Object Document Mapper)
//    - Cómo conectarse a MongoDB Atlas con mongoose.connect()
//    - Qué es un Schema y cómo definir la estructura de tus datos
//    - Todos los tipos de datos de Mongoose: String, Number, Boolean, Date...
//    - Validaciones del Schema: required, minlength, enum, custom validators
//    - Qué es un Model y cómo crearlo desde un Schema
//    - Los métodos CRUD de Mongoose: find, findById, save, findByIdAndUpdate...
//    - Qué es populate() y cómo funciona (el JOIN de MongoDB)
//    - Los Hooks de Mongoose: pre('save'), post('save')
//    - Métodos de instancia y métodos estáticos en el Schema
//    - API completa conectada a MongoDB Atlas real
//
//  Conceptos clave:
//    Mongoose, Schema, Model, ODM, validaciones, populate(),
//    hooks, timestamps, CRUD con MongoDB, referencias entre colecciones
//
//  Instalar: npm install express mongoose dotenv
//  Configurar: Crear .env con MONGODB_URI (ver env.ejemplo.js)
//  Ejecutar: node 06_mongoose.js
//  Primer paso: POST http://localhost:3000/api/seed
//  Tiempo estimado de estudio: 2-3 horas
//
//  ──────────────────────────────────────────────────────────
//  07_bcrypt.js                                 [INTERMEDIO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Por qué NUNCA debemos guardar contraseñas en texto plano
//    - Qué es el hashing y cómo se diferencia del cifrado
//    - Qué es bcrypt y cómo funciona el algoritmo
//    - Qué es el "salt" y por qué previene ataques de rainbow table
//    - Cuántos "salt rounds" usar y el impacto en el rendimiento
//    - Cómo hashear una contraseña: bcrypt.hash()
//    - Cómo verificar una contraseña: bcrypt.compare()
//    - Por qué bcrypt.compare() nunca compara strings directamente
//    - Cómo integrar bcrypt con Mongoose en el hook pre('save')
//    - Vulnerabilidades comunes: timing attacks y cómo prevenirlos
//
//  Conceptos clave:
//    hashing, salt, bcrypt, bcrypt.hash(), bcrypt.compare(),
//    salt rounds, timing attacks, contraseñas seguras
//
//  Instalar: npm install bcryptjs
//  Ejecutar: node 07_bcrypt.js
//  Tiempo estimado de estudio: 45 minutos
//
//  ──────────────────────────────────────────────────────────
//  08_jwt.js                                    [INTERMEDIO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Por qué HTTP es stateless y qué problema crea
//    - Qué son las sesiones y sus limitaciones de escalabilidad
//    - Qué es JWT (JSON Web Token) y cómo soluciona el problema
//    - La estructura del JWT: Header, Payload, Signature
//    - Por qué el payload NO está encriptado (solo codificado en Base64)
//    - Cómo crear tokens: jwt.sign()
//    - Cómo verificar tokens: jwt.verify()
//    - Los claims estándar de JWT: iss, sub, aud, exp, iat
//    - Cómo implementar middleware de autenticación verificarToken()
//    - Cómo implementar autorización por roles verificarRol()
//    - Access Token vs Refresh Token: cuándo usar cada uno
//    - Buenas prácticas de seguridad con JWT
//
//  Conceptos clave:
//    JWT, stateless, autenticación, autorización, middleware,
//    Bearer token, header Authorization, roles, permisos
//
//  Instalar: npm install express jsonwebtoken dotenv
//  Configurar: .env con JWT_SECRET y JWT_EXPIRES_IN
//  Ejecutar: node 08_jwt.js
//  Tiempo estimado de estudio: 90 minutos
//
//  ──────────────────────────────────────────────────────────
//  09_crud.js                                   [AVANZADO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué es CRUD y por qué es el concepto más fundamental del backend
//    - Cómo mapear CRUD a métodos HTTP (POST, GET, PUT, PATCH, DELETE)
//    - La diferencia entre PUT (completo) y PATCH (parcial)
//    - Borrado lógico (soft delete) vs borrado físico (hard delete)
//    - Cuándo usar cada tipo de borrado en producción
//    - Paginación: cómo implementar .skip() y .limit() en Mongoose
//    - Filtros dinámicos: cómo construir el objeto de filtro en el servidor
//    - Ordenamiento de resultados con .sort()
//    - Búsqueda de texto parcial con $regex en MongoDB
//    - El Pipeline de Agregación de MongoDB ($match, $group, $sort)
//    - Promise.all() para ejecutar múltiples consultas en paralelo
//    - Los códigos HTTP correctos para cada operación CRUD
//    - Manejo centralizado de errores de Mongoose
//
//  Conceptos clave:
//    CRUD, REST, paginación, filtros, ordenamiento, borrado lógico,
//    aggregation pipeline, Promise.all(), ValidationError, CastError
//
//  Instalar: npm install express mongoose dotenv
//  Configurar: .env con MONGODB_URI
//  Ejecutar: node 09_crud.js
//  Primer paso: POST http://localhost:3000/api/seed
//  Tiempo estimado de estudio: 2-3 horas
//
//  ──────────────────────────────────────────────────────────
//  env.ejemplo.js                                   [BÁSICO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué son las variables de entorno y el problema que resuelven
//    - Qué es el archivo .env y por qué existe
//    - Cómo funciona dotenv y qué hace exactamente require("dotenv").config()
//    - Qué es process.env y cómo leer variables desde Node.js
//    - El patrón .env + .env.example para documentar sin exponer secretos
//    - Cómo validar variables obligatorias al inicio de la app
//    - Cómo configurar variables en plataformas cloud (Railway, Heroku)
//    - La variable especial NODE_ENV y cómo cambia el comportamiento
//    - Buenas prácticas de seguridad con variables de entorno
//
//  Conceptos clave:
//    dotenv, process.env, .env, variables de entorno, NODE_ENV,
//    MONGODB_URI, JWT_SECRET, seguridad de credenciales
//
//  Ejecutar: node env.ejemplo.js
//  Tiempo estimado de estudio: 30 minutos
//
//  ──────────────────────────────────────────────────────────
//  gitignore.js                                     [BÁSICO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué es Git y por qué existe el control de versiones
//    - Por qué Git rastrea TODO por defecto (el problema)
//    - Qué es .gitignore y cómo le dice a Git qué ignorar
//    - Los archivos que NUNCA deben subirse: .env, node_modules/
//    - La sintaxis del .gitignore: patrones, wildcards, excepciones
//    - Errores comunes: .gitignore no retroactivo, subir .env por accidente
//    - Cómo limpiar el historial si ya subiste algo que no debías
//    - El .gitignore global para toda tu computadora
//    - Comandos de verificación: git check-ignore, git status --ignored
//    - El flujo completo de trabajo con Git desde cero
//
//  Conceptos clave:
//    Git, .gitignore, node_modules, .env, git rm --cached,
//    patrones glob, control de versiones, GitHub
//
//  Ejecutar: node gitignore.js
//  Tiempo estimado de estudio: 30 minutos
//
// ══════════════════════════════════════════════════════════
//  🛠️  CONFIGURACIÓN DEL PROYECTO — PASO A PASO
// ══════════════════════════════════════════════════════════
//
//  PASO 1 — Instalar Node.js (si no lo tienes)
//  ─────────────────────────────────────────────────────────
//  Node.js es el entorno que ejecuta JavaScript fuera del navegador.
//  Sin Node.js no puedes correr ningún archivo de este proyecto.
//
//  1. Ve a: https://nodejs.org
//  2. Descarga la versión LTS (Long Term Support).
//     LTS = versión más estable, recomendada para proyectos reales.
//     (No la "Current" que tiene las últimas funciones pero puede tener bugs)
//  3. Instala normalmente (siguiente, siguiente, finalizar).
//  4. Cierra y vuelve a abrir la terminal.
//  5. Verifica la instalación:
//
//     node --version       → debe mostrar algo como: v20.11.0
//     npm --version        → debe mostrar algo como: 10.2.4
//
//  Si ves los números, Node.js está instalado correctamente.
//  Si ves "no se reconoce como un comando interno", reinicia la terminal.
//
//  PASO 2 — Abrir el proyecto en VS Code
//  ─────────────────────────────────────────────────────────
//  1. Abre VS Code.
//  2. Archivo → Abrir Carpeta → Selecciona la carpeta de este proyecto.
//  3. Abre la terminal integrada: Ver → Terminal (o Ctrl + ñ)
//  4. La terminal debe mostrar la ruta de la carpeta del proyecto.
//     Verifica que estás en el lugar correcto:
//     pwd (Linux/Mac) o cd (Windows) → debe mostrar la ruta del proyecto.
//
//  IMPORTANTE: Siempre ejecuta los comandos desde la carpeta del proyecto.
//  npm y node buscan los archivos relativos al directorio actual.
//
//  PASO 3 — Crear el .gitignore (ANTES de cualquier otra cosa)
//  ─────────────────────────────────────────────────────────
//  Si vas a usar Git (recomendado), crea el .gitignore PRIMERO.
//  Así evitas subir accidentalmente node_modules/ o .env a GitHub.
//
//  1. En VS Code, crea un archivo nuevo en la raíz del proyecto.
//  2. Nómbralo exactamente: .gitignore (con punto, sin extensión)
//  3. Pega este contenido mínimo:
//
//     node_modules/
//     .env
//     *.log
//     .DS_Store
//     Thumbs.db
//
//  4. Guarda el archivo.
//  Para más detalles: node gitignore.js
//
//  PASO 4 — Inicializar el proyecto con npm
//  ─────────────────────────────────────────────────────────
//  El package.json es el archivo de configuración del proyecto.
//  npm lo usa para saber qué paquetes necesita el proyecto.
//
//  En la terminal:
//    npm init -y
//
//  El -y responde "sí" a todas las preguntas automáticamente.
//  Resultado: se crea el archivo package.json en la carpeta.
//
//  Para más detalles: node 02_que_es_npm.js y node 03_package_json.js
//
//  PASO 5 — Instalar las dependencias
//  ─────────────────────────────────────────────────────────
//  Las dependencias son los paquetes externos que usa el proyecto.
//  npm los descarga de internet y los guarda en node_modules/.
//
//  En la terminal:
//    npm install express mongoose dotenv
//
//  Esto instala:
//  - express:  el framework para crear el servidor y las rutas API
//  - mongoose: la librería para conectarse y trabajar con MongoDB
//  - dotenv:   la librería para leer el archivo .env
//
//  Para los archivos con JWT y bcrypt, instala también:
//    npm install jsonwebtoken bcryptjs
//
//  Para desarrollo (nodemon reinicia el servidor automáticamente):
//    npm install nodemon --save-dev
//
//  Después de instalar, verifica que se creó node_modules/:
//    ls node_modules (Linux/Mac) o dir node_modules (Windows)
//
//  Para más detalles: node 02_que_es_npm.js
//
//  PASO 6 — Crear cuenta en MongoDB Atlas
//  ─────────────────────────────────────────────────────────
//  MongoDB Atlas es la versión en la nube de MongoDB.
//  Tiene un plan GRATUITO que es suficiente para aprender y proyectos pequeños.
//
//  1. Ve a: https://www.mongodb.com/atlas/database
//  2. Clic en "Try Free" → Regístrate con email o Google.
//
//  3. Crear el cluster (el servidor de base de datos):
//     - Elige "Free" (M0 Sandbox — 512MB, gratis para siempre)
//     - Proveedor: AWS, Google Cloud, o Azure (cualquiera está bien)
//     - Región: elige la más cercana a tu país
//     - Nombre del cluster: puedes dejarlo como "Cluster0"
//     - Clic en "Create Deployment"
//
//  4. Crear usuario de base de datos:
//     - En "Database Access" → "Add New Database User"
//     - Método: Password
//     - Username: pon tu nombre o "admin"
//     - Password: genera uno seguro y GUÁRDALO (lo necesitarás)
//     - Rol: "Atlas admin" (para aprendizaje está bien)
//     - Clic "Add User"
//
//  5. Configurar acceso de red:
//     - En "Network Access" → "Add IP Address"
//     - Clic "Allow Access from Anywhere" (0.0.0.0/0)
//     - Para producción limitarías las IPs, pero en desarrollo es más cómodo
//     - Clic "Confirm"
//
//  6. Obtener la URI de conexión:
//     - En tu cluster → clic "Connect"
//     - Selecciona "Drivers"
//     - Driver: Node.js → Versión: la más reciente
//     - Copia la URI que aparece. Se ve así:
//       mongodb+srv://tuUsuario:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
//     - Reemplaza <password> con tu contraseña real
//     - Agrega el nombre de la base de datos antes del ?:
//       mongodb+srv://tuUsuario:tuPassword@cluster0.abc123.mongodb.net/tiendaDB?retryWrites=true&w=majority
//       ↑ aquí: /tiendaDB (puedes usar el nombre que quieras)
//
//  Para más detalles: node 05_mongodb_no_relacional.js
//
//  PASO 7 — Crear el archivo .env
//  ─────────────────────────────────────────────────────────
//  El .env guarda los datos secretos del proyecto.
//  Sin este archivo, el servidor no puede conectarse a MongoDB.
//
//  1. En VS Code, crea un archivo nuevo llamado exactamente: .env
//     (con el punto al inicio, sin ninguna extensión después)
//  2. Pega y completa este contenido:
//
//     # Conexión a MongoDB Atlas
//     MONGODB_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster0.XXXXX.mongodb.net/tiendaDB
//
//     # Puerto del servidor Express
//     PUERTO=3000
//
//     # Clave secreta para JWT (cambia esto por algo largo y aleatorio)
//     JWT_SECRET=pon_aqui_una_clave_muy_larga_y_aleatoria_minimo_32_caracteres
//
//     # Expiración del token
//     JWT_EXPIRES_IN=1h
//
//     # Entorno de ejecución
//     NODE_ENV=development
//
//  3. Reemplaza TU_USUARIO, TU_PASSWORD y los XXXXX con tus datos reales.
//  4. Guarda el archivo.
//  5. Verifica que el .env está en el .gitignore (no se subirá a GitHub).
//
//  Para más detalles: node env.ejemplo.js
//
//  PASO 8 — Agregar scripts al package.json
//  ─────────────────────────────────────────────────────────
//  Los scripts de npm son atajos para comandos frecuentes.
//  Abre el package.json y modifica la sección "scripts":
//
//  "scripts": {
//    "start": "node index.js",
//    "dev":   "nodemon index.js",
//    "test":  "echo \"No hay tests configurados\" && exit 1"
//  }
//
//  Ahora puedes usar:
//  - npm start      → inicia el servidor en producción
//  - npm run dev    → inicia con nodemon (reinicia al guardar cambios)
//
//  Para más detalles: node 03_package_json.js
//
//  PASO 9 — Ejecutar los archivos de investigación
//  ─────────────────────────────────────────────────────────
//  Cada archivo puede ejecutarse individualmente con:
//    node nombre_del_archivo.js
//
//  Para los archivos que inician un servidor (04, 06, 07, 08, 09):
//  - El proceso se queda corriendo (no termina)
//  - Abre Postman para hacer peticiones al servidor
//  - Usa Ctrl + C para detener el servidor cuando termines
//
//  Para los archivos informativos (01, 02, 03, env.ejemplo.js, gitignore.js):
//  - El proceso imprime información y termina
//  - Lee el output en la terminal
//
// ══════════════════════════════════════════════════════════
//  🔧 COMANDOS RÁPIDOS DE REFERENCIA
// ══════════════════════════════════════════════════════════
//
//  SETUP (una sola vez al crear el proyecto):
//  ─────────────────────────────────────────────────────────
//  npm init -y                              → Crear package.json
//  npm install express mongoose dotenv      → Instalar dependencias principales
//  npm install jsonwebtoken bcryptjs        → Instalar auth
//  npm install nodemon --save-dev           → Instalar nodemon para dev
//
//  EJECUTAR ARCHIVOS DE INVESTIGACIÓN:
//  ─────────────────────────────────────────────────────────
//  node 01_que_es_nodejs.js                 → Ejecutar investigación 1
//  node 02_que_es_npm.js                    → Ejecutar investigación 2
//  node 03_package_json.js                  → Ejecutar investigación 3
//  node 04_express.js                       → Iniciar servidor Express (sin BD)
//  node 05_mongodb_no_relacional.js         → Información sobre MongoDB
//  node 06_mongoose.js                      → Iniciar servidor con MongoDB
//  node 07_bcrypt.js                        → Demo de hashing con bcrypt
//  node 08_jwt.js                           → Iniciar servidor con JWT
//  node 09_crud.js                          → Iniciar servidor CRUD completo
//  node env.ejemplo.js                      → Verificar variables de entorno
//  node gitignore.js                        → Info sobre .gitignore
//  node README.js                           → Este archivo
//
//  SERVIDOR EN DESARROLLO:
//  ─────────────────────────────────────────────────────────
//  npm run dev                              → Inicia con nodemon (reinicio automático)
//  npm start                                → Inicia con node (producción)
//  Ctrl + C                                 → Detener el servidor
//
//  GIT (control de versiones):
//  ─────────────────────────────────────────────────────────
//  git init                                 → Inicializar repositorio Git
//  git status                               → Ver qué archivos cambiaron
//  git add .                                → Agregar todos los cambios al stage
//  git commit -m "mensaje descriptivo"      → Guardar snapshot con descripción
//  git push                                 → Subir commits a GitHub
//  git pull                                 → Descargar cambios de GitHub
//  git clone <url>                          → Descargar repositorio completo
//  git log --oneline                        → Ver historial de commits resumido
//  git rm --cached .env                     → Dejar de rastrear .env (emergencia)
//  git rm -r --cached node_modules          → Dejar de rastrear node_modules
//
//  npm (paquetes):
//  ─────────────────────────────────────────────────────────
//  npm install                              → Instalar todo (al clonar un proyecto)
//  npm install <paquete>                    → Agregar una dependencia
//  npm install <paquete> --save-dev         → Agregar dependencia de desarrollo
//  npm uninstall <paquete>                  → Desinstalar un paquete
//  npm update                               → Actualizar todos los paquetes
//  npm outdated                             → Ver qué paquetes tienen actualizaciones
//  npm audit                                → Verificar vulnerabilidades de seguridad
//  npm audit fix                            → Corregir vulnerabilidades automáticamente
//  npm list --depth=0                       → Ver paquetes instalados directos
//
// ══════════════════════════════════════════════════════════
//  🌐 RUTAS DE LA API — REFERENCIA COMPLETA
// ══════════════════════════════════════════════════════════
//
//  ARCHIVO: 04_express.js (sin base de datos, datos en memoria)
//  Puerto: 3000
//  ─────────────────────────────────────────────────────────
//  GET    /                              → Info de la API
//  GET    /api/productos                 → Listar todos los productos
//  GET    /api/productos/:id             → Ver un producto por ID
//  POST   /api/productos                 → Crear producto nuevo
//  PUT    /api/productos/:id             → Actualizar producto completo
//  DELETE /api/productos/:id             → Eliminar producto
//  GET    /api/productos?categoria=ropa  → Filtrar por categoría
//
//  ARCHIVO: 06_mongoose.js (con MongoDB Atlas)
//  Puerto: 3000
//  ─────────────────────────────────────────────────────────
//  POST   /api/seed                      → Cargar datos de prueba (ejecutar primero)
//  GET    /api/categorias                → Listar todas las categorías
//  GET    /api/categorias/:id            → Ver una categoría con sus productos
//  POST   /api/categorias                → Crear categoría nueva
//  DELETE /api/categorias/:id            → Eliminar categoría
//  GET    /api/productos                 → Listar productos con populate()
//  GET    /api/productos/:id             → Ver un producto con su categoría
//  POST   /api/productos                 → Crear producto nuevo
//  PUT    /api/productos/:id             → Actualizar producto
//  DELETE /api/productos/:id             → Desactivar producto (borrado lógico)
//
//  ARCHIVO: 08_jwt.js (autenticación con JWT)
//  Puerto: 3000
//  ─────────────────────────────────────────────────────────
//  RUTAS PÚBLICAS (sin token):
//  GET    /                              → Documentación de la API
//  GET    /api/auth/info-jwt             → Explicación visual del JWT
//  POST   /api/auth/registro             → Crear cuenta nueva
//  POST   /api/auth/login                → Iniciar sesión → devuelve JWT
//  POST   /api/auth/verificar-token      → Verificar y decodificar un token
//
//  RUTAS PROTEGIDAS (requieren: Authorization: Bearer <token>):
//  GET    /api/perfil                    → Ver mi perfil
//  PUT    /api/perfil                    → Actualizar mi perfil
//  GET    /api/admin                     → Solo para rol "admin"
//  GET    /api/usuarios                  → Lista de usuarios (solo admin)
//  DELETE /api/usuarios/:id              → Eliminar usuario (solo admin)
//
//  ARCHIVO: 09_crud.js (CRUD completo con filtros y paginación)
//  Puerto: 3000
//  ─────────────────────────────────────────────────────────
//  POST   /api/seed                      → Cargar datos de prueba
//  POST   /api/tareas                    → CREATE: crear tarea
//  GET    /api/tareas                    → READ: listar tareas
//  GET    /api/tareas/:id                → READ: ver una tarea
//  PUT    /api/tareas/:id                → UPDATE: actualizar completo
//  PATCH  /api/tareas/:id                → UPDATE: actualizar parcial
//  DELETE /api/tareas/:id                → DELETE: borrado lógico
//  DELETE /api/tareas/:id/permanente     → DELETE: borrado físico
//  GET    /api/tareas/vencidas           → Tareas con fecha vencida
//  GET    /api/estadisticas              → Estadísticas con aggregation
//
//  Filtros disponibles en GET /api/tareas:
//  ?estado=pendiente                     → Filtrar por estado
//  ?prioridad=alta                       → Filtrar por prioridad
//  ?buscar=node                          → Búsqueda en el título
//  ?pagina=1&limite=5                    → Paginación
//  ?orden=prioridad                      → Ordenar resultados
//  ?mostrarInactivos=true                → Ver tareas eliminadas
//
// ══════════════════════════════════════════════════════════
//  📖 GLOSARIO — CONCEPTOS CLAVE DEL PROYECTO
// ══════════════════════════════════════════════════════════
//
//  Este glosario define brevemente todos los términos técnicos
//  que aparecen en las investigaciones. Úsalo como referencia
//  rápida cuando encuentres un término que no recuerdes.
//
//  ── ENTORNO Y HERRAMIENTAS ────────────────────────────────
//
//  Node.js
//    Entorno de ejecución de JavaScript en el servidor.
//    Permite ejecutar JS fuera del navegador.
//    Usa el motor V8 de Google Chrome.
//    Ideal para APIs, servidores en tiempo real, microservicios.
//
//  npm (Node Package Manager)
//    Gestor de paquetes oficial de Node.js.
//    Tiene dos partes: el registro (repositorio de paquetes)
//    y la herramienta CLI (el comando 'npm' en la terminal).
//    Viene instalado automáticamente con Node.js.
//
//  package.json
//    Archivo de configuración de todo proyecto Node.js.
//    Lista las dependencias, los scripts de npm, la versión,
//    el autor, la licencia y la descripción del proyecto.
//    Se crea con: npm init -y
//
//  node_modules/
//    Carpeta donde npm guarda los archivos de los paquetes instalados.
//    Puede pesar cientos de MB. NUNCA se sube a GitHub.
//    Se regenera completamente con: npm install
//
//  package-lock.json
//    Registra las versiones EXACTAS de todos los paquetes instalados.
//    Garantiza que todos los colaboradores tengan las mismas versiones.
//    SÍ se sube a GitHub (junto con package.json).
//
//  .env
//    Archivo de texto que guarda variables de entorno (credenciales,
//    claves secretas, configuración sensible). NUNCA se sube a GitHub.
//    Lo lee dotenv y carga las variables en process.env.
//
//  .gitignore
//    Archivo que le dice a Git qué archivos y carpetas ignorar
//    completamente (no rastrear, no subir a GitHub).
//    Las dos reglas más importantes: node_modules/ y .env
//
//  Git
//    Sistema de control de versiones. Registra cada cambio
//    del código con historial, autor y mensaje descriptivo.
//    Permite volver a versiones anteriores y trabajar en equipo.
//
//  GitHub
//    Plataforma web para alojar repositorios Git en la nube.
//    Git es la herramienta. GitHub es el servicio.
//
//  ── SERVIDOR Y API ────────────────────────────────────────
//
//  Express
//    Framework web minimalista para Node.js.
//    Simplifica la creación de servidores, rutas y APIs REST.
//    El paquete más descargado del ecosistema Node.js.
//
//  API (Application Programming Interface)
//    Interfaz que permite a dos sistemas comunicarse.
//    En este contexto: el backend expone endpoints (URLs)
//    que el frontend puede llamar para obtener o modificar datos.
//
//  API REST (RESTful API)
//    Estilo de diseño de APIs donde las URLs representan recursos
//    (sustantivos) y los métodos HTTP representan acciones (verbos).
//    GET /productos → leer. POST /productos → crear. Etc.
//
//  Endpoint
//    Una URL específica de la API con su método HTTP.
//    Ejemplo: GET /api/productos o POST /api/auth/login
//    Cada endpoint hace una cosa específica.
//
//  Middleware
//    Función que se ejecuta entre la petición y la respuesta.
//    Tiene acceso a req, res y next. Puede modificar la petición,
//    la respuesta, o pasar el control al siguiente middleware.
//    Ejemplo: express.json(), verificarToken, morgan (logs).
//
//  req (request)
//    El objeto que representa la petición HTTP entrante.
//    Contiene: req.body (cuerpo), req.params (parámetros de ruta),
//    req.query (query string), req.headers (cabeceras).
//
//  res (response)
//    El objeto que representa la respuesta HTTP saliente.
//    Métodos: res.json() (enviar JSON), res.status() (código HTTP),
//    res.send() (enviar texto), res.redirect() (redirigir).
//
//  CRUD
//    Create, Read, Update, Delete.
//    Las 4 operaciones básicas sobre datos en cualquier sistema.
//    Se mapean a: POST, GET, PUT/PATCH, DELETE en REST.
//
//  Códigos de estado HTTP
//    200 OK: éxito general.
//    201 Created: se creó un recurso nuevo.
//    400 Bad Request: datos inválidos del cliente.
//    401 Unauthorized: no autenticado (sin token o inválido).
//    403 Forbidden: autenticado pero sin permiso.
//    404 Not Found: el recurso no existe.
//    500 Internal Server Error: error en el servidor.
//
//  ── BASE DE DATOS ─────────────────────────────────────────
//
//  MongoDB
//    Base de datos NoSQL orientada a documentos.
//    Guarda datos en formato BSON (similar a JSON).
//    No tiene tablas ni filas: tiene colecciones y documentos.
//    Muy flexible: los documentos de una colección pueden tener
//    diferentes campos (aunque en la práctica se estandarizan).
//
//  MongoDB Atlas
//    Versión en la nube de MongoDB gestionada por MongoDB Inc.
//    Plan gratuito M0: 512MB, suficiente para aprender y proyectos pequeños.
//    Accesible desde cualquier lugar con la URI de conexión.
//
//  Colección (Collection)
//    Equivalente a una TABLA en SQL.
//    Agrupa documentos del mismo tipo.
//    Ejemplos: "productos", "usuarios", "pedidos"
//
//  Documento (Document)
//    Equivalente a una FILA en SQL.
//    Un registro individual de datos en formato JSON/BSON.
//    Cada documento tiene un _id único asignado por MongoDB.
//
//  _id (ObjectId)
//    Identificador único que MongoDB asigna automáticamente
//    a cada documento. Es un string hexadecimal de 24 caracteres.
//    Ejemplo: "64abc123def456789012abcd"
//
//  Mongoose
//    Librería ODM (Object Document Mapper) para Node.js + MongoDB.
//    Agrega estructura y validaciones a MongoDB (que es schema-less).
//    Proporciona una API orientada a objetos para interactuar con la BD.
//
//  Schema (Mongoose)
//    Define la estructura de los documentos de una colección:
//    qué campos existen, sus tipos, validaciones y valores por defecto.
//    Es el "molde" o "plano" para crear documentos.
//
//  Model (Mongoose)
//    La interfaz para interactuar con una colección de MongoDB.
//    Se crea a partir de un Schema.
//    Proporciona los métodos: find(), findById(), create(), save(),
//    findByIdAndUpdate(), findByIdAndDelete(), etc.
//
//  populate()
//    Método de Mongoose que reemplaza referencias (ObjectId) con
//    los documentos completos que referencia.
//    Es el equivalente al JOIN de SQL en MongoDB.
//    Ejemplo: un producto tiene { categoria: ObjectId("...") }
//    populate("categoria") → devuelve el objeto completo de la categoría.
//
//  Hooks (Middleware de Mongoose)
//    Funciones que se ejecutan antes (pre) o después (post)
//    de operaciones como save, find, delete, etc.
//    pre("save"): para hashear contraseñas, formatear datos, etc.
//    post("save"): para enviar emails de confirmación, logs, etc.
//
//  Borrado lógico (Soft Delete)
//    No eliminar el documento, sino cambiar un campo activo a false.
//    Los datos siguen en MongoDB pero no aparecen en las consultas.
//    Permite historial, recuperación y auditoría de datos.
//
//  Paginación
//    Dividir los resultados en "páginas" de N elementos.
//    Evita devolver miles de registros de una vez.
//    En Mongoose: .skip((pagina-1)*limite).limit(limite)
//
//  Aggregation Pipeline
//    Sistema de MongoDB para consultas complejas: agrupar, contar,
//    promediar, transformar datos. Equivalente al GROUP BY de SQL.
//    Etapas principales: $match (filtrar), $group (agrupar), $sort (ordenar).
//
//  ── AUTENTICACIÓN Y SEGURIDAD ─────────────────────────────
//
//  Autenticación
//    Verificar QUIÉN eres. ¿Eres quien dices ser?
//    Proceso: enviar credenciales → verificar en BD → emitir token.
//    Ejemplo: login con email y contraseña.
//
//  Autorización
//    Verificar QUÉ PUEDES HACER. ¿Tienes permiso para esto?
//    Proceso: verificar token → leer rol → comparar con permisos requeridos.
//    Ejemplo: solo los administradores pueden borrar usuarios.
//
//  bcrypt
//    Algoritmo de hashing para contraseñas.
//    Aplica un proceso matemático unidireccional: no se puede revertir.
//    Con "salt" agrega aleatoriedad: la misma contraseña genera hashes diferentes.
//    Funciones clave: bcrypt.hash() para crear el hash, bcrypt.compare() para verificar.
//
//  Hash
//    Resultado de aplicar una función matemática unidireccional a un valor.
//    "miContrasena123" → "$2b$10$abcdef..." (hash de bcrypt)
//    El hash no se puede convertir de vuelta a la contraseña original.
//    Solo se puede verificar comparando con bcrypt.compare().
//
//  Salt
//    Valor aleatorio que se agrega a la contraseña ANTES de hashear.
//    Previene los ataques de "rainbow table" (tablas de hashes precomputados).
//    bcrypt genera el salt automáticamente y lo incluye en el hash resultante.
//
//  JWT (JSON Web Token)
//    Estándar para transmitir información firmada digitalmente.
//    Tiene 3 partes: Header (algoritmo), Payload (datos), Signature (firma).
//    El payload es legible pero no modificable (la firma lo protege).
//    Se usa para autenticación stateless (el servidor no guarda nada).
//
//  Bearer Token
//    Formato para enviar el JWT en las peticiones HTTP.
//    En el header Authorization: "Bearer eyJhbGci..."
//    "Bearer" significa "portador" — quien tiene el token tiene la identidad.
//
//  Stateless
//    Sin estado. Cada petición es independiente.
//    El servidor no recuerda nada entre peticiones.
//    JWT permite que el cliente "demuestre" su identidad en cada petición
//    sin que el servidor guarde nada en memoria o base de datos.
//
//  Access Token
//    Token JWT de vida corta (15min a 1h) para cada petición.
//    Si es robado, expira rápido (daño limitado).
//
//  Refresh Token
//    Token JWT de vida larga (7-30 días) para renovar el access token.
//    Se guarda en la BD (puede invalidarse al hacer logout).
//    No se envía en cada petición, solo al renovar.
//
//  Variables de entorno (process.env)
//    Variables del sistema operativo accesibles en Node.js.
//    Guardan configuración sensible fuera del código fuente.
//    dotenv.config() carga el archivo .env en process.env.
//
// ══════════════════════════════════════════════════════════
//  💡 CONSEJOS DE ESTUDIO
// ══════════════════════════════════════════════════════════
//
//  1. ESTUDIA EN ORDEN
//     Los archivos están numerados por una razón. Cada investigación
//     usa conceptos de las anteriores. Si saltas el 04 (Express) e
//     intentas entender el 08 (JWT), te faltará contexto fundamental.
//
//  2. EJECUTA CADA ARCHIVO MIENTRAS LO LEES
//     Abre el archivo en VS Code (un monitor) y la terminal (otro).
//     Lee el código → ejecuta → ve el resultado → relaciona el código
//     con lo que ves en la terminal. Esto ancla el aprendizaje.
//
//  3. EXPERIMENTA Y ROMPE COSAS
//     Después de entender un archivo, modifícalo y ve qué pasa.
//     ¿Qué pasa si quitas el middleware express.json()?
//     ¿Qué pasa si el JWT_SECRET está vacío?
//     ¿Qué pasa si haces una petición sin token a una ruta protegida?
//     Romper controladamente es la mejor forma de aprender.
//
//  4. USA POSTMAN PARA LOS SERVIDORES
//     Los archivos 04, 06, 07, 08 y 09 inician un servidor Express.
//     Postman te permite hacer peticiones GET, POST, PUT, DELETE
//     con cualquier body y headers que necesites. Es esencial.
//     Descarga Postman: https://www.postman.com/downloads/
//
//  5. LEE LOS MENSAJES DE ERROR CON ATENCIÓN
//     Los errores de Node.js incluyen el nombre del archivo, el número
//     de línea y una descripción. El 90% del debugging es leer bien
//     el error y buscar exactamente ese mensaje en Google o en ChatGPT.
//     Ejemplo: "Cannot find module 'express'" → npm install express
//
//  6. UN CONCEPTO A LA VEZ
//     No intentes entender todo el archivo de una vez.
//     Lee una sección → entiéndela → ejecuta → pasa a la siguiente.
//     La profundidad importa más que la velocidad.
//
//  7. ESCRIBE TU PROPIO RESUMEN
//     Después de cada investigación, escribe con tus propias palabras
//     qué aprendiste (en papel o en un archivo de notas).
//     El proceso de reformular en tus palabras consolida el aprendizaje
//     mucho más que releer el material.
//
// ══════════════════════════════════════════════════════════
//  🚨 SOLUCIÓN A PROBLEMAS COMUNES
// ══════════════════════════════════════════════════════════
//
//  ─────────────────────────────────────────────────────────
//  Error: "node is not recognized as an internal command"
//  ─────────────────────────────────────────────────────────
//  Causa: Node.js no está instalado o la terminal no lo detecta.
//  Solución:
//  1. Verifica que Node.js está instalado: https://nodejs.org
//  2. Cierra COMPLETAMENTE la terminal y ábrela de nuevo.
//  3. En Windows: verifica que Node.js está en el PATH del sistema.
//     (El instalador lo hace automáticamente, pero a veces falla)
//
//  ─────────────────────────────────────────────────────────
//  Error: "Cannot find module 'express'" (u otro paquete)
//  ─────────────────────────────────────────────────────────
//  Causa: el paquete no está instalado en este proyecto.
//  Solución:
//    npm install express
//  O para instalar todo de una vez:
//    npm install express mongoose dotenv jsonwebtoken bcryptjs
//
//  ─────────────────────────────────────────────────────────
//  Error: "ENOENT: no such file or directory, open '.env'"
//  ─────────────────────────────────────────────────────────
//  Causa: no existe el archivo .env en la carpeta del proyecto.
//  Solución:
//  1. Crea el archivo .env en la misma carpeta que el package.json.
//  2. Agrégale las variables necesarias (ver env.ejemplo.js).
//
//  ─────────────────────────────────────────────────────────
//  Error: "MongoServerError: bad auth : Authentication failed"
//  ─────────────────────────────────────────────────────────
//  Causa: el usuario o contraseña de MongoDB Atlas es incorrecto.
//  Solución:
//  1. Ve a MongoDB Atlas → Database Access.
//  2. Edita tu usuario y cambia la contraseña.
//  3. Actualiza la contraseña en tu archivo .env.
//  4. Guarda y vuelve a ejecutar el servidor.
//
//  ─────────────────────────────────────────────────────────
//  Error: "MongooseServerSelectionError: Could not connect"
//  ─────────────────────────────────────────────────────────
//  Causas posibles:
//  1. Sin conexión a internet.
//  2. La IP no está en la whitelist de MongoDB Atlas.
//     → Atlas → Network Access → Add IP → Allow from Anywhere
//  3. La MONGODB_URI está mal escrita en el .env.
//     → Verifica que tiene el formato correcto con usuario y contraseña.
//
//  ─────────────────────────────────────────────────────────
//  Error: "Error: listen EADDRINUSE: address already in use :::3000"
//  ─────────────────────────────────────────────────────────
//  Causa: el puerto 3000 ya está siendo usado por otro proceso.
//  Solución:
//  En Windows (en una terminal con permisos de administrador):
//    netstat -ano | findstr :3000      → Busca el PID
//    taskkill /PID <número> /F         → Mata ese proceso
//
//  En Linux/macOS:
//    lsof -ti:3000 | xargs kill -9     → Mata el proceso en el puerto 3000
//
//  O simplemente cambia el puerto en el .env: PUERTO=3001
//
//  ─────────────────────────────────────────────────────────
//  Error: "SyntaxError: Unexpected token 'export'"
//  ─────────────────────────────────────────────────────────
//  Causa: estás usando la sintaxis de ES Modules (import/export)
//         en un proyecto configurado para CommonJS (require).
//  Solución A: usa require() en lugar de import.
//  Solución B: agrega "type": "module" en el package.json
//              para usar ES Modules en todo el proyecto.
//
//  ─────────────────────────────────────────────────────────
//  El servidor no reinicia al guardar cambios
//  ─────────────────────────────────────────────────────────
//  Causa: estás usando 'node' en lugar de 'nodemon'.
//  Solución:
//  1. Instala nodemon: npm install nodemon --save-dev
//  2. Agrega en package.json scripts: "dev": "nodemon nombre.js"
//  3. Ejecuta: npm run dev (en lugar de node nombre.js)
//
// ══════════════════════════════════════════════════════════
//  📋 RESUMEN DE CONCEPTOS — TABLA RÁPIDA
// ══════════════════════════════════════════════════════════
//
//  ┌─────────────────┬────────────────────────────────────────────────┐
//  │ Concepto        │ En una línea                                    │
//  ├─────────────────┼────────────────────────────────────────────────┤
//  │ Node.js         │ JavaScript en el servidor (fuera del navegador) │
//  │ npm             │ Gestor de paquetes: descarga código reutilizable │
//  │ package.json    │ Archivo de config: dependencias, scripts, info  │
//  │ node_modules/   │ Carpeta de paquetes instalados. Nunca a GitHub  │
//  │ Express         │ Framework para crear servidores y APIs REST      │
//  │ Middleware      │ Función entre petición y respuesta (req→res)    │
//  │ REST            │ URLs = recursos, métodos HTTP = acciones        │
//  │ CRUD            │ Create, Read, Update, Delete = las 4 ops de BD │
//  │ MongoDB         │ BD NoSQL: guarda documentos JSON en colecciones │
//  │ Atlas           │ MongoDB en la nube, gratis hasta 512MB          │
//  │ Mongoose        │ Librería que conecta Node.js con MongoDB        │
//  │ Schema          │ Molde que define la estructura de documentos    │
//  │ Model           │ Interfaz para hacer CRUD en una colección       │
//  │ populate()      │ Reemplaza ObjectId con el documento completo    │
//  │ Hooks           │ Funciones auto que corren antes/después de ops  │
//  │ bcrypt          │ Convierte contraseñas en hashes seguros         │
//  │ JWT             │ Token firmado para autenticación stateless      │
//  │ .env            │ Archivo de secretos locales. Nunca a GitHub     │
//  │ .gitignore      │ Le dice a Git qué archivos ignorar              │
//  │ process.env     │ Objeto de Node.js con variables de entorno      │
//  │ dotenv          │ Lee el .env y carga vars en process.env         │
//  │ Git             │ Control de versiones: historial de cambios      │
//  │ GitHub          │ Plataforma para alojar repositorios Git online  │
//  └─────────────────┴────────────────────────────────────────────────┘
//
// ══════════════════════════════════════════════════════════
//  🔗 RECURSOS PARA SEGUIR APRENDIENDO
// ══════════════════════════════════════════════════════════
//
//  Documentación oficial (siempre la fuente más confiable):
//  Node.js:   https://nodejs.org/en/docs
//  npm:       https://docs.npmjs.com
//  Express:   https://expressjs.com/es
//  Mongoose:  https://mongoosejs.com/docs
//  MongoDB:   https://www.mongodb.com/docs
//  JWT:       https://jwt.io  (también tiene un decodificador visual)
//  bcrypt:    https://www.npmjs.com/package/bcryptjs
//
//  Plataformas de aprendizaje complementarias:
//  MDN Web Docs:   https://developer.mozilla.org  (HTTP, JS, Web APIs)
//  freeCodeCamp:   https://www.freecodecamp.org   (cursos gratuitos)
//  The Odin Project: https://www.theodinproject.com  (full stack gratis)
//
//  Herramientas esenciales del developer:
//  Postman:    https://www.postman.com/downloads  (probar APIs)
//  MongoDB Atlas: https://cloud.mongodb.com        (BD en la nube)
//  GitKraken:  https://www.gitkraken.com           (Git visual)
//  Thunder Client: extensión de VS Code para probar APIs (alternativa a Postman)
//
//  Cuando busques ayuda:
//  Stack Overflow: busca el mensaje de error exacto entre comillas
//  GitHub Issues: si el problema es con un paquete específico
//  ChatGPT / Claude: explica el error y el contexto, pide explicación
//
// ══════════════════════════════════════════════════════════
//  ¿QUÉ SIGUE DESPUÉS DE COMPLETAR ESTE PROYECTO?
// ══════════════════════════════════════════════════════════
//
//  Con lo que aprendiste aquí tienes las bases para construir
//  backends reales. El siguiente paso natural es:
//
//  1. PROYECTO INTEGRADOR
//     Construye una API completa desde cero que combine todo:
//     usuarios con registro y login (bcrypt + JWT), recursos
//     con CRUD completo, autorización por roles, paginación.
//     Ejemplo: una API de blog, una tienda, un gestor de tareas.
//
//  2. ARQUITECTURA MVC
//     Separa tu código en Models, Views (rutas), Controllers.
//     Aprende a organizar proyectos medianos y grandes.
//
//  3. VALIDACIÓN CON JOI O ZOD
//     Validación robusta de datos de entrada con schemas
//     más expresivos que las validaciones de Mongoose.
//
//  4. TESTS AUTOMATIZADOS
//     Aprende Jest + Supertest para escribir pruebas que
//     verifiquen automáticamente que tu API funciona correctamente.
//
//  5. DESPLIEGUE (DEPLOYMENT)
//     Aprende a subir tu API a Railway, Render, o Heroku.
//     Configura las variables de entorno en la plataforma.
//     Conecta con MongoDB Atlas en producción.
//
//  6. TYPESCRIPT
//     Agrega tipos estáticos a tu código Node.js para atrapar
//     errores antes de ejecutar el código. Muy valorado en empresas.
//
// ============================================================

"use strict"; // Modo estricto: el código falla de forma clara cuando hay errores.

// ─────────────────────────────────────────────────────────
//  Cuando ejecutas este archivo, imprime un resumen del proyecto
// ─────────────────────────────────────────────────────────

const os = require("os");
// os es un módulo NATIVO de Node.js (no necesita npm install).
// Proporciona información sobre el sistema operativo:
// os.platform() → "win32", "darwin" (macOS), "linux"
// os.hostname() → nombre del computador
// os.cpus()     → información sobre los procesadores
// os.totalmem() → memoria total del sistema en bytes
// os.freemem()  → memoria libre del sistema en bytes

const { execSync } = require("child_process");
// child_process es otro módulo nativo de Node.js.
// Permite ejecutar comandos del sistema operativo desde Node.js.
// execSync ejecuta un comando y devuelve el resultado como string.
// Usamos destructuring para extraer solo execSync del módulo.

console.log("\n╔══════════════════════════════════════════════════════╗");
console.log("║     📚 README — PROYECTO NODE.js + MONGODB           ║");
console.log("╚══════════════════════════════════════════════════════╝\n");

// ─────────────────────────────────────────────────────────
//  Información del sistema
// ─────────────────────────────────────────────────────────

console.log("  🖥️  INFORMACIÓN DEL SISTEMA:");
console.log("  ─────────────────────────────────────");

const plataforma = {
  "win32":  "Windows",
  "darwin": "macOS",
  "linux":  "Linux",
};

console.log(`  Sistema operativo:  ${plataforma[os.platform()] || os.platform()}`);
console.log(`  Node.js:            ${process.version}`);
// process.version → la versión de Node.js actualmente en ejecución.
// Ejemplo: "v20.11.0"

// Intentamos obtener la versión de npm con un comando de terminal
let versionNpm = "no detectada";
try {
  versionNpm = execSync("npm --version", { encoding: "utf-8" }).trim();
  // execSync("comando") ejecuta el comando en la terminal y devuelve el output.
  // { encoding: "utf-8" } → devuelve string en lugar de Buffer de bytes.
  // .trim() → elimina espacios y saltos de línea al inicio y final.
  // Si npm no está instalado, execSync lanza un error → lo capturamos con catch.
} catch (_) {
  versionNpm = "no detectada";
}
console.log(`  npm:                ${versionNpm}`);

const memoriaGB = (os.totalmem() / (1024 ** 3)).toFixed(1);
// os.totalmem() devuelve la memoria en bytes.
// 1024^3 = 1 GB en bytes (1024 bytes = 1KB, 1024KB = 1MB, 1024MB = 1GB)
// .toFixed(1) → redondea a 1 decimal: 7.878... → "7.9"
console.log(`  Memoria total:      ${memoriaGB} GB\n`);

// ─────────────────────────────────────────────────────────
//  Lista de investigaciones con estado
// ─────────────────────────────────────────────────────────

const fs = require("fs");
// fs (File System) es un módulo nativo para trabajar con archivos.
// fs.existsSync() → verifica sincrónicamente si un archivo/carpeta existe.

const path = require("path");
// path es un módulo nativo para trabajar con rutas de archivos.
// path.join() → une segmentos con el separador del SO.

console.log("  📋 ARCHIVOS DE INVESTIGACIÓN:");
console.log("  ─────────────────────────────────────");

const investigaciones = [
  { archivo: "01_que_es_nodejs.js",           titulo: "Qué es Node.js",              nivel: "Básico",      requiereServidor: false },
  { archivo: "02_que_es_npm.js",              titulo: "Qué es npm",                  nivel: "Básico",      requiereServidor: false },
  { archivo: "03_package_json.js",            titulo: "Package.json",                nivel: "Básico",      requiereServidor: false },
  { archivo: "04_express.js",                 titulo: "Express y API REST",          nivel: "Intermedio",  requiereServidor: true  },
  { archivo: "05_mongodb_no_relacional.js",   titulo: "MongoDB y NoSQL",             nivel: "Intermedio",  requiereServidor: false },
  { archivo: "06_mongoose.js",                titulo: "Mongoose + Atlas",            nivel: "Intermedio",  requiereServidor: true  },
  { archivo: "07_bcrypt.js",                  titulo: "Bcrypt y contraseñas",        nivel: "Intermedio",  requiereServidor: false },
  { archivo: "08_jwt.js",                     titulo: "JWT y autenticación",         nivel: "Intermedio",  requiereServidor: true  },
  { archivo: "09_crud.js",                    titulo: "CRUD completo",               nivel: "Avanzado",    requiereServidor: true  },
  { archivo: "env.ejemplo.js",                titulo: "Variables de entorno (.env)", nivel: "Básico",      requiereServidor: false },
  { archivo: "gitignore.js",                  titulo: ".gitignore",                  nivel: "Básico",      requiereServidor: false },
  { archivo: "README.js",                     titulo: "Este archivo",                nivel: "Básico",      requiereServidor: false },
];

const iconNivel = { "Básico": "🟢", "Intermedio": "🟡", "Avanzado": "🔴" };
// Objeto que mapea niveles a íconos de colores para visualización rápida.

investigaciones.forEach(({ archivo, titulo, nivel, requiereServidor }) => {
  const existe   = fs.existsSync(path.join(process.cwd(), archivo));
  // fs.existsSync verifica si el archivo está en la carpeta del proyecto.
  // path.join(process.cwd(), archivo) construye la ruta completa.
  // process.cwd() = directorio donde ejecutas el comando.

  const estadoArchivo = existe ? "✅" : "⬜";
  // ✅ = el archivo existe en el proyecto
  // ⬜ = el archivo no se encuentra (puede no haberse creado aún)

  const servidorIndicador = requiereServidor ? " [servidor]" : "";
  // Los archivos que inician un servidor tienen esta etiqueta
  // para que el estudiante sepa que debe usar Postman para probarlos.

  console.log(`  ${estadoArchivo} ${iconNivel[nivel]} ${archivo.padEnd(38, " ")} ${titulo}${servidorIndicador}`);
  // .padEnd(38, " ") → rellena con espacios a la derecha hasta 38 caracteres.
  // Esto alinea todos los títulos en la misma columna.
});

console.log("\n  🟢 Básico  🟡 Intermedio  🔴 Avanzado  [servidor] = inicia servidor HTTP");

// ─────────────────────────────────────────────────────────
//  Estado de las dependencias
// ─────────────────────────────────────────────────────────

console.log("\n  📦 DEPENDENCIAS INSTALADAS:");
console.log("  ─────────────────────────────────────");

const dependenciasNecesarias = [
  { paquete: "express",        descripcion: "Servidor y rutas API" },
  { paquete: "mongoose",       descripcion: "ODM para MongoDB" },
  { paquete: "dotenv",         descripcion: "Cargar variables .env" },
  { paquete: "jsonwebtoken",   descripcion: "JWT para autenticación" },
  { paquete: "bcryptjs",       descripcion: "Hashear contraseñas" },
  { paquete: "nodemon",        descripcion: "Dev: reinicio automático" },
];

dependenciasNecesarias.forEach(({ paquete, descripcion }) => {
  const rutaPaquete = path.join(process.cwd(), "node_modules", paquete);
  const estaInstalado = fs.existsSync(rutaPaquete);
  // Verificamos si la carpeta del paquete existe en node_modules.
  // Si node_modules/express existe → express está instalado.

  const estado = estaInstalado ? "✅" : "❌";
  const instalar = estaInstalado ? "" : `  ← npm install ${paquete}`;

  console.log(`  ${estado} ${paquete.padEnd(18, " ")} ${descripcion}${instalar}`);
});

// ─────────────────────────────────────────────────────────
//  Verificación del .env
// ─────────────────────────────────────────────────────────

console.log("\n  🔐 CONFIGURACIÓN DEL ENTORNO:");
console.log("  ─────────────────────────────────────");

const existeEnv = fs.existsSync(path.join(process.cwd(), ".env"));
const existeGitignore = fs.existsSync(path.join(process.cwd(), ".gitignore"));
const existePackageJson = fs.existsSync(path.join(process.cwd(), "package.json"));
const existeNodeModules = fs.existsSync(path.join(process.cwd(), "node_modules"));

const checkItems = [
  { condicion: existePackageJson, texto: "package.json existe",                  solucion: "npm init -y" },
  { condicion: existeNodeModules, texto: "node_modules/ instalado",               solucion: "npm install" },
  { condicion: existeEnv,         texto: ".env existe con credenciales",          solucion: "Crea .env (ver env.ejemplo.js)" },
  { condicion: existeGitignore,   texto: ".gitignore configurado",                solucion: "Crea .gitignore (ver gitignore.js)" },
];

checkItems.forEach(({ condicion, texto, solucion }) => {
  if (condicion) {
    console.log(`  ✅ ${texto}`);
  } else {
    console.log(`  ❌ ${texto}`);
    console.log(`     → Solución: ${solucion}`);
  }
});

// ─────────────────────────────────────────────────────────
//  Mensaje final motivacional con próximos pasos
// ─────────────────────────────────────────────────────────

console.log("\n╔══════════════════════════════════════════════════════╗");
console.log("║              🚀 PRÓXIMOS PASOS                       ║");
console.log("╚══════════════════════════════════════════════════════╝\n");

if (!existePackageJson) {
  console.log("  1️⃣  Crea el package.json:    npm init -y");
} else if (!existeNodeModules) {
  console.log("  1️⃣  Instala dependencias:    npm install express mongoose dotenv");
} else if (!existeEnv) {
  console.log("  1️⃣  Crea el .env:            node env.ejemplo.js  (para instrucciones)");
} else {
  console.log("  ✅ El proyecto está configurado correctamente.");
  console.log("\n  Para empezar a estudiar:");
  console.log("  node 01_que_es_nodejs.js   → Empieza por el principio");
  console.log("  node 04_express.js         → Si ya conoces Node.js básico");
  console.log("  node 09_crud.js            → Si ya conoces Express + MongoDB");
}

console.log("\n  Lee los comentarios de cada archivo mientras lo ejecutas.");
console.log("  El conocimiento está en los comentarios, el código es el ejemplo.\n");