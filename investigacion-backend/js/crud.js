// ============================================================
//  📘 INVESTIGACIÓN #9 — ¿QUÉ ES UN CRUD?
// ============================================================
//
//  CRUD es un acrónimo que representa las 4 operaciones
//  básicas que puedes hacer con datos en cualquier sistema:
//
//  C → CREATE  (Crear)    → Insertar datos nuevos
//  R → READ    (Leer)     → Consultar datos existentes
//  U → UPDATE  (Actualizar) → Modificar datos existentes
//  D → DELETE  (Eliminar) → Borrar datos
//
//  CRUD es el concepto más fundamental del desarrollo backend.
//  Prácticamente TODA aplicación que maneja datos implementa
//  estas 4 operaciones. Algunos ejemplos reales:
//
//  Instagram:
//    CREATE → Publicar una foto
//    READ   → Ver el feed o el perfil de alguien
//    UPDATE → Editar el pie de foto
//    DELETE → Borrar una publicación
//
//  WhatsApp:
//    CREATE → Enviar un mensaje
//    READ   → Leer un chat
//    UPDATE → Marcar como leído, editar mensaje
//    DELETE → Eliminar un mensaje para todos
//
//  Mercado Libre:
//    CREATE → Publicar un producto
//    READ   → Buscar y ver productos
//    UPDATE → Actualizar el precio o stock
//    DELETE → Dar de baja una publicación
//
//  Si aprendes a hacer CRUD bien, puedes construir el backend
//  de prácticamente cualquier aplicación del mundo real.
//
//  ─────────────────────────────────────────────────────────
//  RELACIÓN CRUD CON HTTP, MONGOOSE Y SQL
//  ─────────────────────────────────────────────────────────
//
//  Cada operación CRUD tiene un método HTTP estándar asociado.
//  Los métodos HTTP son los "verbos" del protocolo HTTP:
//  definen QUÉ tipo de acción se quiere hacer sobre un recurso.
//
//  ┌──────────┬────────────┬──────────────────────┬──────────────────────┐
//  │  CRUD    │ Método HTTP│ Mongoose (MongoDB)   │ SQL (PostgreSQL)      │
//  ├──────────┼────────────┼──────────────────────┼──────────────────────┤
//  │ CREATE   │ POST       │ new Model().save()   │ INSERT INTO tabla    │
//  │          │            │ Model.create({})     │ VALUES (...)         │
//  ├──────────┼────────────┼──────────────────────┼──────────────────────┤
//  │ READ     │ GET        │ Model.find({})       │ SELECT * FROM tabla  │
//  │ (todos)  │            │ Model.findOne({})    │ WHERE condicion      │
//  ├──────────┼────────────┼──────────────────────┼──────────────────────┤
//  │ READ     │ GET        │ Model.findById(id)   │ SELECT * FROM tabla  │
//  │ (uno)    │            │                      │ WHERE id = ?         │
//  ├──────────┼────────────┼──────────────────────┼──────────────────────┤
//  │ UPDATE   │ PUT/PATCH  │ Model                │ UPDATE tabla SET     │
//  │          │            │ .findByIdAndUpdate() │ campo=? WHERE id=?   │
//  ├──────────┼────────────┼──────────────────────┼──────────────────────┤
//  │ DELETE   │ DELETE     │ Model                │ DELETE FROM tabla    │
//  │          │            │ .findByIdAndDelete() │ WHERE id=?           │
//  └──────────┴────────────┴──────────────────────┴──────────────────────┘
// 
//  ¿Por qué estos métodos HTTP y no otros?
//  ────────────────────────────────────────────────────────
//  Es una convención del estándar REST (Representational State Transfer).
//  REST define que las URLs representan RECURSOS (sustantivos)
//  y los métodos HTTP representan ACCIONES (verbos).
//
//  Ejemplo con una API de libros:
//  GET    /api/libros         → Listar todos los libros
//  GET    /api/libros/123     → Ver el libro con ID 123
//  POST   /api/libros         → Crear un libro nuevo
//  PUT    /api/libros/123     → Reemplazar el libro 123 completo
//  PATCH  /api/libros/123     → Actualizar solo algunos campos del libro 123
//  DELETE /api/libros/123     → Eliminar el libro 123
//
//  Nota: La URL es SIEMPRE la misma (/api/libros/123).
//  Lo que cambia es el MÉTODO HTTP. Eso es REST.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES UN BACKEND? (repaso contextual)
//  ─────────────────────────────────────────────────────────
//
//  El backend es la parte del sistema que corre en el SERVIDOR.
//  El usuario no lo ve directamente en su navegador.
//  Se encarga de:
//  - Manejar la LÓGICA DE NEGOCIO
//    (¿puedo hacer esta acción? ¿cumple las reglas de negocio?)
//  - Comunicarse con la BASE DE DATOS
//    (leer, escribir, actualizar, borrar datos)
//  - AUTENTICAR y AUTORIZAR usuarios
//    (¿eres quién dices ser? ¿tienes permiso para esto?)
//  - Procesar y devolver datos al FRONTEND
//    (respuestas JSON, archivos, etc.)
//
//  La cadena completa de una petición:
//
//  Usuario hace clic                →  Navegador (frontend)
//  Navegador envía petición HTTP    →  Servidor (backend/Express)
//  Backend procesa y consulta datos →  Base de datos (MongoDB)
//  MongoDB devuelve los datos       →  Backend (Express/Mongoose)
//  Backend formatea respuesta JSON  →  Navegador (frontend)
//  Frontend renderiza la información →  Usuario ve el resultado
//
//  En código:
//  Frontend (React/Vue/HTML) ←──── HTTP/JSON ────▶ Backend (Node.js/Express)
//  Backend (Express)         ←──── Mongoose  ────▶ Base de datos (MongoDB)
//
//  ─────────────────────────────────────────────────────────
//  ARQUITECTURA DE UN CRUD EN EXPRESS + MONGOOSE
//  ─────────────────────────────────────────────────────────
//
//  En proyectos pequeños todo puede ir en un archivo.
//  En proyectos medianos y grandes, el código se separa en capas.
//  Cada capa tiene una RESPONSABILIDAD única (principio de separación).
//
//  📁 mi-proyecto/
//  ├── 📄 index.js                  → Punto de entrada.
//  │                                  Inicia el servidor, conecta la BD,
//  │                                  registra las rutas principales.
//  │
//  ├── 📁 src/
//  │   ├── 📁 models/               → Schemas y Models de Mongoose.
//  │   │   └── Tarea.js             Define la ESTRUCTURA de los datos
//  │   │                            y las VALIDACIONES del Schema.
//  │   │
//  │   ├── 📁 routes/               → Definición de las URLs disponibles.
//  │   │   └── tareas.routes.js     Registra qué función se ejecuta
//  │   │                            para cada método+URL.
//  │   │
//  │   ├── 📁 controllers/          → Lógica de cada ruta.
//  │   │   └── tareas.controller.js Aquí va el código async/await que
//  │   │                            consulta la BD y arma la respuesta.
//  │   │
//  │   └── 📁 middlewares/          → Funciones intermedias.
//  │       └── auth.middleware.js   Verificación de tokens JWT,
//  │                                validación de datos, logs, etc.
//  │
//  ├── 📄 .env                      → Variables de entorno (no subir a Git)
//  ├── 📄 .gitignore                → node_modules/, .env
//  └── 📄 package.json              → Dependencias y scripts
//
//  ¿Por qué esta separación?
//  - Cada archivo tiene UNA sola responsabilidad → más fácil de entender
//  - Si cambias la base de datos, solo tocas los models
//  - Si cambias la lógica de negocio, solo tocas los controllers
//  - Varios desarrolladores pueden trabajar en paralelo
//  - Es más fácil escribir pruebas automatizadas
//
//  En ESTA investigación ponemos TODO en un solo archivo para
//  que sea más fácil de estudiar y entender. En tu proyecto
//  real, separas en la estructura de arriba.
//
//  ─────────────────────────────────────────────────────────
//  LAS 4 OPERACIONES CRUD EN DETALLE
//  ─────────────────────────────────────────────────────────
//
//  ── CREATE (Crear) ──────────────────────────────────────
//
//  Qué hace: Inserta un nuevo documento en MongoDB.
//  Método HTTP: POST
//  URL típica: POST /api/tareas
//  Body (lo que envía el cliente): { "titulo": "Estudiar CRUD", "prioridad": "alta" }
//  Respuesta exitosa: código 201 Created + el documento guardado con su _id
//
//  En Mongoose hay varias formas de crear:
//    Forma 1 — instancia + save():
//      const tarea = new Tarea({ titulo: "..." });
//      await tarea.save(); // Guarda en MongoDB y ejecuta hooks pre/post
//
//    Forma 2 — create() directo:
//      const tarea = await Tarea.create({ titulo: "..." });
//       Más corto, equivalente al anterior
//
//    Forma 3 — insertMany() para crear varios a la vez:
//      const tareas = await Tarea.insertMany([{ titulo: "A" }, { titulo: "B" }]);
//
//  Diferencia entre 200 OK y 201 Created:
//  - 200 OK: la petición fue exitosa (para GET, PUT, PATCH, DELETE)
//  - 201 Created: la petición fue exitosa Y se creó un nuevo recurso (para POST)
//  Es una distinción semántica: le dice al cliente exactamente qué pasó.
//
//  ── READ (Leer) ─────────────────────────────────────────
//
//  Hay dos variantes principales:
//
//  a) READ ALL — Leer TODOS los registros:
//     Método HTTP: GET
//     URL: GET /api/tareas
//     Puede incluir filtros via query string:
//       GET /api/tareas?estado=pendiente
//       GET /api/tareas?prioridad=alta&pagina=2&limite=10
//     Respuesta: { total: 25, datos: [...array de tareas...] }
//
//  b) READ ONE — Leer UN registro específico:
//     Método HTTP: GET
//     URL: GET /api/tareas/:id  (el :id es el _id de MongoDB)
//     Respuesta exitosa: { dato: { ...la tarea... } }
//     Respuesta si no existe: 404 Not Found
//
//  ── UPDATE (Actualizar) ──────────────────────────────────
//
//  Hay dos métodos HTTP para actualizar:
//
//  a) PUT → Actualización COMPLETA:
//     Reemplaza TODO el documento con los datos enviados.
//     Si no envías un campo, puede quedar vacío o con el valor default.
//     Caso de uso: formulario de edición que envía todos los campos.
//     Ejemplo: PUT /api/tareas/123 con body: { titulo: "Nuevo", estado: "completada", prioridad: "baja" }
//
//  b) PATCH → Actualización PARCIAL:
//     Actualiza SOLO los campos enviados. Los demás quedan igual.
//     Caso de uso: quiero solo cambiar el estado sin tocar el título ni prioridad.
//     Ejemplo: PATCH /api/tareas/123 con body: { estado: "completada" }
//     → Solo cambia el estado. El título y prioridad no se tocan.
//
//  Analogía PUT vs PATCH:
//  PUT   = Reemplazar toda la página de un libro (borras y escribes desde cero)
//  PATCH = Corregir solo una palabra en la página (edición quirúrgica)
//
//  En Mongoose: Tarea.findByIdAndUpdate(id, datosNuevos, { new: true, runValidators: true })
//  - new: true         → devuelve el documento CON los cambios aplicados (no el original)
//  - runValidators: true → aplica las validaciones del Schema al actualizar
//
//  ── DELETE (Eliminar) ────────────────────────────────────
//
//  Hay dos estrategias:
//
//  a) BORRADO FÍSICO (Hard Delete):
//     Elimina el documento de MongoDB para siempre.
//     Método Mongoose: Tarea.findByIdAndDelete(id)
//     Ventaja: simple, libera espacio en disco.
//     Desventaja: irreversible, sin historial.
//     Cuándo usar: datos irrelevantes, prototipos, logs viejos.
//
//  b) BORRADO LÓGICO (Soft Delete):
//     NO elimina el documento. Cambia un campo "activo" de true a false.
//     El documento sigue en MongoDB pero las consultas lo excluyen.
//     Ventaja: conservas historial, puedes "restaurar" datos, trazabilidad.
//     Desventaja: la BD crece más, las consultas deben filtrar activo=true.
//     Cuándo usar: PRODUCCIÓN — casi siempre preferible.
//
//  Ejemplo real de por qué el borrado lógico es importante:
//  Un e-commerce "elimina" un producto. Pero hay órdenes anteriores
//  que lo referenciaban. Con borrado físico, esas órdenes pierden
//  la info del producto. Con borrado lógico, el producto sigue
//  en la BD (activo=false) y las órdenes pueden consultarlo.
//
//  ─────────────────────────────────────────────────────────
//  PAGINACIÓN (buena práctica obligatoria en READ)
//  ─────────────────────────────────────────────────────────
//
//  Imagina que tu BD tiene 100,000 tareas. Si devuelves todas
//  de una vez en GET /api/tareas, pasarían varias cosas malas:
//  - El servidor tarda mucho en procesar 100,000 documentos
//  - La respuesta pesa varios MB (el usuario espera mucho)
//  - El frontend no puede mostrar 100,000 items a la vez de forma útil
//
//  La solución es la PAGINACIÓN: dividir los resultados en "páginas".
//
//  El cliente indica qué página quiere y cuántos items por página:
//  GET /api/tareas?pagina=1&limite=10  → items del 1 al 10
//  GET /api/tareas?pagina=2&limite=10  → items del 11 al 20
//  GET /api/tareas?pagina=3&limite=10  → items del 21 al 30
//
//  En Mongoose se implementa con:
//  .skip()   → cuántos documentos saltar desde el inicio
//  .limit()  → cuántos documentos devolver
//
//  Fórmula para skip: (numeroPagina - 1) * itemsPorPagina
//  Página 1: skip = (1-1) * 10 = 0   → empieza desde el inicio
//  Página 2: skip = (2-1) * 10 = 10  → salta los primeros 10
//  Página 3: skip = (3-1) * 10 = 20  → salta los primeros 20
//
//  ─────────────────────────────────────────────────────────
//  CÓDIGOS DE ESTADO HTTP — LOS MÁS USADOS EN CRUD
//  ─────────────────────────────────────────────────────────
//
//  Los códigos HTTP le dicen al cliente si la petición fue
//  exitosa y, si falló, qué tipo de problema hubo.
//  Son un "lenguaje común" entre cliente y servidor.
//
//  2xx → Éxito:
//  200 OK             → Petición exitosa (GET, PUT, PATCH, DELETE)
//  201 Created        → Recurso creado exitosamente (POST)
//  204 No Content     → Exitoso pero sin cuerpo de respuesta
//                       (DELETE sin devolver el objeto eliminado)
//
//  4xx → Error del cliente (el cliente hizo algo mal):
//  400 Bad Request    → Los datos enviados son incorrectos o inválidos
//                       (faltan campos, formato incorrecto, validación falló)
//  401 Unauthorized   → No está autenticado (no envió token o es inválido)
//  403 Forbidden      → Está autenticado pero no tiene permiso para esto
//  404 Not Found      → El recurso solicitado no existe
//  409 Conflict       → Conflicto: el recurso ya existe
//                       (intentar crear usuario con email repetido)
//  422 Unprocessable  → Los datos tienen el formato correcto pero
//                       son semánticamente incorrectos
//
//  5xx → Error del servidor (el servidor falló por su cuenta):
//  500 Internal Server Error → Error inesperado en el servidor
//                              (el try/catch capturó algo que no esperábamos)
//
//  Regla práctica:
//  - El problema fue del cliente → 4xx
//  - El problema fue del servidor → 5xx
//  - Todo salió bien → 2xx
//
//  ─────────────────────────────────────────────────────────
//  MONGOOSE: MÉTODOS DE CONSULTA MÁS USADOS EN CRUD
//  ─────────────────────────────────────────────────────────
//
//  CREATE:
//  new Model(datos).save()                     → Crea + ejecuta hooks
//  await Model.create(datos)                   → Más corto, mismo resultado
//  await Model.insertMany([datos1, datos2])    → Crear varios a la vez
//
//  READ:
//  await Model.find({})                        → Todos los documentos
//  await Model.find({ activo: true })          → Con filtro
//  await Model.findOne({ email: "..." })       → El primero que coincida
//  await Model.findById("64abc...")            → Por _id de MongoDB
//  await Model.countDocuments({ activo: true }) → Solo contar, no traer datos
//
//  Encadenamiento de operaciones (Query Builder):
//  await Model
//    .find({ activo: true })      → filtro
//    .sort({ createdAt: -1 })     → ordenamiento (-1 = descendente, 1 = ascendente)
//    .skip(10)                    → saltar 10 documentos (paginación)
//    .limit(5)                    → máximo 5 documentos
//    .select("titulo estado -_id")→ solo traer esos campos (-campo = excluir)
//
//  UPDATE:
//  await Model.findByIdAndUpdate(id, datosNuevos, { new: true })
//    → new: true = devuelve el doc DESPUÉS del update (sin esto devuelve el original)
//    → runValidators: true = aplica validaciones del Schema
//  await Model.updateMany({ activo: false }, { eliminadoEn: new Date() })
//    → Actualiza MÚLTIPLES documentos que cumplan el filtro
//
//  DELETE:
//  await Model.findByIdAndDelete(id)           → Borrado físico por ID
//  await Model.deleteMany({ activo: false })   → Borrar múltiples documentos
//
//  Operadores de MongoDB más usados en filtros:
//  { campo: valor }              → igual a valor
//  { campo: { $ne: valor } }     → diferente de valor ($ne = not equal)
//  { campo: { $gt: 5 } }        → mayor que 5 ($gt = greater than)
//  { campo: { $gte: 5 } }       → mayor o igual que 5
//  { campo: { $lt: 5 } }        → menor que 5 ($lt = less than)
//  { campo: { $in: [a, b, c] }} → campo es a, b, o c
//  { campo: { $regex: "texto", $options: "i" } } → búsqueda de texto (i = case insensitive)
//  { $or: [{ a: 1 }, { b: 2 }] } → campo a=1 O campo b=2
//  { $and: [{ a: 1 }, { b: 2 }]} → campo a=1 Y campo b=2
//
//  ─────────────────────────────────────────────────────────
//  MONGOOSE: SCHEMA Y VALIDACIONES
//  ─────────────────────────────────────────────────────────
//
//  Un SCHEMA define la estructura de los documentos en MongoDB.
//  Sin Mongoose, MongoDB acepta cualquier cosa (es schema-less).
//  Con el Schema de Mongoose, defines:
//  - Qué campos tiene el documento
//  - Qué tipo de dato es cada campo
//  - Si el campo es obligatorio o no
//  - Valores por defecto
//  - Validaciones (longitud, formato, valores permitidos, etc.)
//
//  new mongoose.Schema({
//    titulo: {
//      type:      String,                      → tipo de dato
//      required:  [true, "mensaje de error"],  → obligatorio
//      trim:      true,                        → elimina espacios en blanco
//      minlength: [3, "mín 3 caracteres"],     → longitud mínima
//      maxlength: [100, "máx 100 caracteres"], → longitud máxima
//    },
//    estado: {
//      type:    String,
//      enum:    { values: ["a", "b", "c"], message: "..." }, → solo acepta esos valores
//      default: "a",                           → valor por defecto si no se envía
//    },
//    fecha: { type: Date },                    → fechas automáticas
//    activo: { type: Boolean, default: true }, → booleano
//    tags: { type: [String], default: [] },    → array de strings
//  }, {
//    timestamps: true,     → agrega createdAt y updatedAt automáticamente
//    versionKey: false,    → elimina el campo __v (versión interna de Mongoose)
//  });
//
//  HOOKS (Middleware de Mongoose):
//  Son funciones que se ejecutan ANTES (pre) o DESPUÉS (post)
//  de ciertas operaciones como save(), find(), delete(), etc.
//
//  tareaSchema.pre("save", function(next) {
//     Se ejecuta antes de cada .save()
//     'this' es el documento que se va a guardar
//     Útil para: formatear datos, calcular campos derivados, logs
//    next(); // SIEMPRE debes llamar next() para continuar
//  });
//
//  tareaSchema.post("save", function(doc) {
//     Se ejecuta después de cada .save() exitoso
//     'doc' es el documento que se guardó
//     Útil para: enviar emails de confirmación, actualizar caché
//  });
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — CRUD completo con Express + Mongoose
// ============================================================
//
//  INSTRUCCIONES PASO A PASO:
//  ────────────────────────────
//  1. Abre la terminal (Ctrl + ñ)
//  2. Instala dependencias:
//       npm install express mongoose dotenv
//  3. Crea el archivo .env con:
//       MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@cluster.mongodb.net/tareasDB
//       PUERTO=3000
//     (Reemplaza USUARIO y PASSWORD con los tuyos de MongoDB Atlas)
//  4. Inicia el servidor:
//       node 09_crud.js
//  5. En Postman, primero ejecuta:
//       POST http://localhost:3000/api/seed
//     Eso inserta datos de prueba para tener con qué trabajar.
//  6. Luego prueba las rutas del CRUD (ver abajo).
//
//  RUTAS DISPONIBLES:
//  ─────────────────────────────────────────────────────
//  CRUD:
//  CREATE → POST   /api/tareas              Crear tarea nueva
//  READ   → GET    /api/tareas              Listar todas las tareas
//  READ   → GET    /api/tareas/:id          Ver una tarea específica
//  UPDATE → PUT    /api/tareas/:id          Actualizar tarea completa
//  UPDATE → PATCH  /api/tareas/:id          Actualizar campos específicos
//  DELETE → DELETE /api/tareas/:id          Borrado lógico (activo = false)
//  DELETE → DELETE /api/tareas/:id/permanente  Borrado físico definitivo
//
//  EXTRAS:
//  GET /api/tareas?estado=pendiente         Filtrar por estado
//  GET /api/tareas?prioridad=alta           Filtrar por prioridad
//  GET /api/tareas?buscar=node              Buscar texto en el título
//  GET /api/tareas?pagina=1&limite=3        Paginación
//  GET /api/tareas?orden=prioridad          Ordenar resultados
//  GET /api/estadisticas                   Resumen de estadísticas
//  POST /api/seed                          Insertar datos de prueba
//
// ============================================================

"use strict"; // Modo estricto de JavaScript.
              // Lanza errores en situaciones que normalmente fallarían
              // silenciosamente. Ejemplo: usar variable sin declarar.
              // Siempre úsalo en proyectos Node.js.

// ─────────────────────────────────────────────────────────
//  IMPORTACIÓN DE MÓDULOS Y CONFIGURACIÓN INICIAL
// ─────────────────────────────────────────────────────────

require("dotenv").config();
// Lee el archivo .env de la raíz del proyecto y carga todas
// las variables como propiedades de process.env.
// Debe ir PRIMERO, antes de cualquier uso de process.env,
// para que las variables ya estén disponibles cuando las necesitemos.
// Sin esta línea, process.env.MONGODB_URI sería undefined.

const express  = require("express");
// Express: framework web para Node.js.
// Nos da el sistema de rutas (app.get, app.post, etc.)
// y los middlewares para procesar peticiones.

const mongoose = require("mongoose");
// Mongoose: librería ODM (Object Document Mapper) para MongoDB.
// ODM = convierte documentos de MongoDB en objetos JavaScript
// y viceversa. Nos da Schema, validaciones y métodos de consulta.

const app    = express();
// Creamos la instancia de la aplicación Express.
// Aquí registraremos todas las rutas y middlewares.

const PUERTO = process.env.PUERTO || 3000;
// Leemos el puerto del .env. Si no está configurado, usamos 3000.
// En producción, plataformas como Heroku o Railway definen PUERTO
// automáticamente, así que process.env.PUERTO siempre tendrá valor.
// El || 3000 es solo un fallback para desarrollo local.

app.use(express.json());
// Middleware global de Express que parsea automáticamente el body
// de las peticiones con Content-Type: application/json.
// Sin esto, req.body sería undefined en todas las rutas.
// app.use() registra el middleware para TODAS las rutas y métodos.

// ════════════════════════════════════════════════════════
//  CONEXIÓN A MONGODB
// ════════════════════════════════════════════════════════

const MONGODB_URI = process.env.MONGODB_URI;
// Leemos la URI de conexión a MongoDB del .env.
// Una URI de MongoDB Atlas se ve así:
// mongodb+srv://miUsuario:miPassword@cluster0.abc123.mongodb.net/tareasDB
// Componentes:
// - mongodb+srv:// → protocolo para MongoDB Atlas (cloud)
// - miUsuario      → nombre de usuario de MongoDB
// - miPassword     → contraseña (nunca en el código, siempre en .env)
// - cluster0.abc123.mongodb.net → dirección del servidor en la nube
// - /tareasDB      → nombre de la base de datos a usar

if (!MONGODB_URI) {
  // Verificación defensiva: si no hay URI, no tiene sentido arrancar.
  // process.exit(1) termina el proceso de Node.js con código de error 1.
  // Código 0 = éxito, código 1 = error. Esto es importante para
  // sistemas de monitoreo que detectan si la app cayó.
  console.error("\n❌ ERROR: No se encontró MONGODB_URI en el archivo .env");
  console.error("   Crea el archivo .env en la raíz del proyecto con:");
  console.error("   MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@cluster.mongodb.net/tareasDB");
  console.error("   Reemplaza USUARIO y PASSWORD con tus credenciales de MongoDB Atlas\n");
  process.exit(1); // Detenemos el proceso inmediatamente
}

mongoose
  .connect(MONGODB_URI)
  // mongoose.connect() devuelve una Promise.
  // Intenta conectarse a MongoDB con la URI proporcionada.
  // La conexión es asíncrona: puede tardar unos segundos.
  // El servidor Express empieza a aceptar peticiones ANTES de que
  // la conexión esté lista, por eso las rutas verifican el estado.

  .then(() => {
    // Se ejecuta si la conexión fue exitosa.
    // mongoose.connection.name = el nombre de la base de datos.
    console.log("\n✅ Conectado a MongoDB exitosamente");
    console.log(`   Base de datos: ${mongoose.connection.name}`);
    // Imprimimos el nombre de la BD para confirmar que nos conectamos
    // a la correcta (development vs production, etc.)
  })

  .catch((err) => {
    // Se ejecuta si la conexión falló.
    // Causas comunes: URI incorrecta, contraseña mal copiada,
    // IP no en whitelist de MongoDB Atlas, sin internet.
    console.error("\n❌ Error al conectar a MongoDB:", err.message);
    console.error("   Verifica: URI correcta, contraseña, IP en whitelist de Atlas");
    process.exit(1); // Detenemos: sin BD no tiene sentido continuar
  });

mongoose.connection.on("disconnected", () => {
  // El evento "disconnected" se emite cuando la conexión se pierde
  // inesperadamente (pérdida de internet, servidor MongoDB caído, etc.)
  // En producción tendrías lógica de reconexión aquí.
  console.log("⚠️  Desconectado de MongoDB. Intentando reconectar...");
});

mongoose.connection.on("reconnected", () => {
  // Evento que se emite cuando Mongoose logra reconectarse automáticamente.
  // Mongoose intenta reconectarse solo por defecto.
  console.log("✅ Reconectado a MongoDB");
});

// ════════════════════════════════════════════════════════
//  SCHEMA DE MONGOOSE — Estructura y validaciones de Tarea
// ════════════════════════════════════════════════════════
//
//  Un Schema es como el "plano" o "molde" de los documentos.
//  Define qué campos existen, qué tipo de datos son,
//  si son obligatorios, sus validaciones, valores por defecto, etc.
//
//  Sin Schema, MongoDB acepta cualquier estructura (NoSQL flexible).
//  Con Schema de Mongoose, los documentos deben cumplir las reglas.

const tareaSchema = new mongoose.Schema(
  {
    // ──────────────────────────────────────────────────
    //  CAMPO: titulo
    // ──────────────────────────────────────────────────
    titulo: {
      type: String,
      // El tipo de dato. Opciones de Mongoose:
      // String, Number, Boolean, Date, Array, ObjectId, Mixed

      required: [true, "El campo 'titulo' es obligatorio"],
      // required: true → el campo debe existir en el documento.
      // Formato array: [condición, "mensaje de error personalizado"]
      // Sin el array: required: true → el mensaje de error sería genérico.

      trim: true,
      // Elimina automáticamente los espacios en blanco al inicio y final
      // antes de guardar en MongoDB.
      // "  Mi tarea  " → se guarda como "Mi tarea"
      // Así evitas que " hola" y "hola" sean considerados diferentes.

      minlength: [3,   "El título debe tener al menos 3 caracteres"],
      // Longitud mínima del string. El array tiene 2 elementos:
      // [número mínimo, mensaje de error si no se cumple]

      maxlength: [100, "El título no puede superar los 100 caracteres"],
      // Longitud máxima. Importante para evitar que alguien guarde
      // títulos de 10,000 caracteres que ocupen mucho espacio en BD.
    },

    // ──────────────────────────────────────────────────
    //  CAMPO: descripcion
    // ──────────────────────────────────────────────────
    descripcion: {
      type:      String,
      trim:      true,
      maxlength: [500, "La descripción no puede superar 500 caracteres"],
      default:   "",
      // Si no se envía descripcion al crear la tarea,
      // MongoDB guardará "" (string vacío) en lugar de undefined.
      // Los defaults se aplican cuando el campo no viene en el body.
    },

    // ──────────────────────────────────────────────────
    //  CAMPO: estado
    // ──────────────────────────────────────────────────
    estado: {
      type: String,
      enum: {
        // enum (enumeración) restringe los valores permitidos.
        // Si el cliente envía un estado diferente a los listados,
        // Mongoose lanza un ValidationError con el mensaje definido.
        values:  ["pendiente", "en_progreso", "completada", "cancelada"],
        message: "Estado inválido. Valores permitidos: pendiente, en_progreso, completada, cancelada",
      },
      default: "pendiente",
      // Las tareas nuevas empiezan como "pendiente" si no se especifica.
    },

    // ──────────────────────────────────────────────────
    //  CAMPO: prioridad
    // ──────────────────────────────────────────────────
    prioridad: {
      type: String,
      enum: {
        values:  ["baja", "media", "alta", "urgente"],
        message: "Prioridad inválida. Valores permitidos: baja, media, alta, urgente",
      },
      default: "media",
      // Si el usuario no especifica prioridad, se asume "media".
    },

    // ──────────────────────────────────────────────────
    //  CAMPO: fechaLimite
    // ──────────────────────────────────────────────────
    fechaLimite: {
      type: Date,
      // MongoDB guarda fechas en formato ISODate internamente.
      // El cliente puede enviar: "2025-12-31", "2025-12-31T23:59:59Z", etc.
      // Mongoose convierte el string a objeto Date automáticamente.

      validate: {
        // validate: permite crear validaciones personalizadas
        // con cualquier lógica que necesites.
        validator: function (fecha) {
          // Esta función recibe el valor del campo y debe retornar:
          // true → el valor es válido (pasa la validación)
          // false → el valor es inválido (Mongoose lanza ValidationError)
          //
          // 'this' es el documento completo (en operaciones save()).
          // Nota: en findByIdAndUpdate con runValidators: true,
          // 'this' puede ser null → mejor no depender de otros campos aquí.
          if (!fecha) return true;
          // Si no se envió fechaLimite, es válido (el campo es opcional).
          // Sin esta verificación, la comparación con new Date() fallaría.

          return fecha >= new Date();
          // La fecha límite no puede ser en el pasado.
          // new Date() = ahora mismo.
          // Si fecha >= ahora → es válida (hoy o en el futuro).
          // Si fecha < ahora → es inválida (ya pasó).
        },
        message: "La fecha límite no puede estar en el pasado",
      },
    },

    // ──────────────────────────────────────────────────
    //  CAMPO: etiquetas (tags)
    // ──────────────────────────────────────────────────
    etiquetas: {
      type:    [String],
      // [String] es la sintaxis de Mongoose para un ARRAY de strings.
      // En MongoDB se guarda como: ["trabajo", "urgente", "cliente-x"]
      // También se puede escribir: { type: Array, default: [] }

      default: [],
      // Si no se envían etiquetas, se guarda un array vacío.
      // Mejor que undefined para que las consultas sean consistentes.
    },

    // ──────────────────────────────────────────────────
    //  CAMPO: activo (para borrado lógico)
    // ──────────────────────────────────────────────────
    activo: {
      type:    Boolean,
      default: true,
      // true = la tarea existe y es visible en las consultas.
      // false = "eliminada" lógicamente. No aparece en las consultas
      //         que filtran por { activo: true } (que son casi todas).
      //
      // NUNCA modificamos este campo directamente desde el frontend.
      // Solo se cambia a false cuando se hace un DELETE /api/tareas/:id.
    },

    // ──────────────────────────────────────────────────
    //  CAMPO: completadaEn
    // ──────────────────────────────────────────────────
    completadaEn: {
      type:    Date,
      default: null,
      // null = la tarea no ha sido completada todavía.
      // Cuando el estado cambia a "completada", el hook pre("save")
      // cambia este campo a la fecha y hora actuales automáticamente.
      // Así sabemos exactamente cuándo se completó cada tarea.
    },
  },

  // ─────────────────────────────────────────────────────
  //  OPCIONES DEL SCHEMA (segundo argumento del constructor)
  // ─────────────────────────────────────────────────────
  {
    timestamps: true,
    // Cuando timestamps: true, Mongoose agrega automáticamente
    // dos campos a CADA documento:
    //   createdAt: Date → cuándo se creó el documento (mongoose lo pone al hacer save() por primera vez)
    //   updatedAt: Date → cuándo se modificó por última vez (mongoose lo actualiza en cada save() o update)
    // No tienes que gestionarlos manualmente. Muy útil para auditoría.

    versionKey: false,
    // Por defecto, Mongoose agrega un campo "__v" a cada documento
    // para rastrear la versión del Schema internamente.
    // Ejemplo de documento sin versionKey: false:
    //   { _id: ..., titulo: "Mi tarea", __v: 0 }
    // Con versionKey: false, ese __v desaparece de los documentos.
    // Lo eliminamos para mantener los documentos más limpios.
  }
);

// ════════════════════════════════════════════════════════
//  HOOKS DE MONGOOSE (Middleware del Schema)
// ════════════════════════════════════════════════════════
//
//  Los HOOKS son funciones que Mongoose ejecuta automáticamente
//  ANTES (pre) o DESPUÉS (post) de operaciones como:
//  save, validate, findOne, find, update, delete, etc.
//
//  Son perfectos para lógica que siempre debe ejecutarse
//  sin importar desde qué ruta se llame la operación.

tareaSchema.pre("save", function (next) {
  // "pre" = antes. "save" = la operación save().
  // Esta función se ejecuta ANTES de cada .save() en este Schema.
  //
  // IMPORTANTE: aquí se usa function() tradicional, NO arrow function (=>).
  // ¿Por qué? Porque necesitamos 'this'.
  // Con function() → 'this' es el DOCUMENTO que se está guardando.
  // Con arrow function → 'this' sería el contexto exterior (undefined en strict mode).
  // Esto es una particularidad de JavaScript que debes recordar con Mongoose.

  if (this.isModified("estado") && this.estado === "completada") {
    // this.isModified("campo"):
    // Devuelve true si el campo "estado" fue modificado en esta operación.
    // Así evitamos actualizar completadaEn si el estado ya era "completada"
    // y no cambió (evitar sobreescribir la fecha de completado original).
    //
    // this.estado === "completada":
    // Verificamos que el nuevo valor del estado sea exactamente "completada".
    //
    // Solo si AMBAS condiciones son true, actualizamos completadaEn.

    this.completadaEn = new Date();
    // Asignamos la fecha y hora actuales como momento de completado.
    // new Date() sin argumentos devuelve el instante actual.
    // Esto se guardará en MongoDB cuando se ejecute el save().

    console.log(`  [Hook pre-save] Tarea "${this.titulo}" marcada como completada en: ${this.completadaEn.toLocaleString("es-CO")}`);
  }

  next();
  // SIEMPRE debes llamar a next() al final del hook pre.
  // next() le dice a Mongoose que continúe con la operación save().
  // Si no llamas next(), el save() se queda colgado (sin completarse).
  // Si hay un error: next(new Error("mensaje")) → cancela el save y lanza el error.
});

tareaSchema.post("save", function (doc) {
  // "post" = después. Se ejecuta DESPUÉS de un save() exitoso.
  // 'doc' es el documento que se acaba de guardar en MongoDB.
  // Aquí 'this' también funciona, pero doc es más explícito.
  //
  // Casos de uso típicos del post-save:
  // - Enviar email de confirmación
  // - Actualizar un caché (Redis)
  // - Registrar en un log de auditoría
  // - Notificar a un webhook externo

  console.log(`  [Hook post-save] Documento guardado en MongoDB → ID: ${doc._id}`);
  // Solo hacemos un log informativo para ver cuándo ocurren los saves.
  // En un proyecto real podrías enviar una notificación aquí.
});

// ════════════════════════════════════════════════════════
//  MÉTODOS DE INSTANCIA
//  Se llaman sobre un documento específico (una tarea concreta)
// ════════════════════════════════════════════════════════
//
//  Los métodos de instancia se agregan al prototipo del modelo.
//  Se llaman con: miTarea.nombreDelMetodo()
//  Dentro del método, 'this' es el documento (la tarea específica).

tareaSchema.methods.resumen = function () {
  // Este método devuelve una línea de texto con info clave de la tarea.
  // Uso: const texto = tarea.resumen()
  //      → "[URGENTE] Entregar proyecto — en_progreso"
  //
  // .toUpperCase() convierte el string a mayúsculas.
  // this.prioridad → "urgente", .toUpperCase() → "URGENTE"

  const diasRestantes = this.fechaLimite
    ? Math.ceil((this.fechaLimite - new Date()) / (1000 * 60 * 60 * 24))
    // Si tiene fechaLimite calculamos cuántos días faltan:
    // fechaLimite - new Date() = diferencia en MILISEGUNDOS
    // / (1000 * 60 * 60 * 24) = convertir milisegundos a DÍAS
    //   (1000ms=1seg, *60=1min, *60=1hora, *24=1día)
    // Math.ceil() redondea hacia arriba (1.2 días → 2 días)
    : null;
  // Si no tiene fechaLimite, diasRestantes es null.

  const infoFecha = diasRestantes !== null
    ? (diasRestantes < 0
        ? ` (⚠️ VENCIDA hace ${Math.abs(diasRestantes)} días)`
        // Math.abs() devuelve el valor absoluto (sin signo negativo)
        // diasRestantes = -3 → "VENCIDA hace 3 días"
        : ` (📅 ${diasRestantes} días restantes)`)
    : "";

  return `[${this.prioridad.toUpperCase()}] ${this.titulo} — ${this.estado}${infoFecha}`;
};

tareaSchema.methods.esUrgente = function () {
  // Método que devuelve true si la tarea es urgente o de alta prioridad
  // Y aún no está completada ni cancelada.
  // Útil para filtrar o destacar tareas críticas en el frontend.
  return (this.prioridad === "urgente" || this.prioridad === "alta")
      && (this.estado !== "completada" && this.estado !== "cancelada");
};

// ════════════════════════════════════════════════════════
//  MÉTODOS ESTÁTICOS (del modelo, no de una instancia)
//  Se llaman sobre el MODELO directamente: Tarea.nombreDelMetodo()
// ════════════════════════════════════════════════════════

tareaSchema.statics.porEstado = function (estado) {
  // Método estático reutilizable para buscar tareas por estado.
  // Se llama como: await Tarea.porEstado("pendiente")
  // 'this' dentro de un método estático es el MODELO (Tarea),
  // no un documento específico.
  //
  // Equivale a: Tarea.find({ estado: "pendiente", activo: true }).sort({ createdAt: -1 })
  // Pero encapsulado en un método con nombre descriptivo.
  return this.find({ estado, activo: true }).sort({ createdAt: -1 });
  // Encadenamos .find() con .sort().
  // sort({ createdAt: -1 }) → ordena por fecha de creación descendente
  // (las más recientes primero). -1 = descendente, 1 = ascendente.
};

tareaSchema.statics.porPrioridad = function (prioridad) {
  // Similar al anterior pero filtra por prioridad.
  // Uso: await Tarea.porPrioridad("urgente")
  return this.find({ prioridad, activo: true }).sort({ createdAt: -1 });
};

tareaSchema.statics.pendientesVencidas = function () {
  // Devuelve las tareas pendientes cuya fechaLimite ya pasó.
  // Muy útil para enviar recordatorios o alertas automáticas.
  return this.find({
    activo:      true,
    estado:      { $in: ["pendiente", "en_progreso"] },
    // $in: acepta un array de valores posibles.
    // El estado debe ser "pendiente" O "en_progreso".
    fechaLimite: { $lt: new Date() },
    // $lt = less than = menor que.
    // fechaLimite < ahora → la fecha ya pasó → tarea vencida.
    // $ne: null asegura que solo traiga tareas con fechaLimite definido.
  }).sort({ fechaLimite: 1 });
  // Ordenamos por fechaLimite ascendente: las más vencidas primero.
};

// ════════════════════════════════════════════════════════
//  CREACIÓN DEL MODEL
// ════════════════════════════════════════════════════════

const Tarea = mongoose.model("Tarea", tareaSchema);
// mongoose.model(nombre, schema) crea y registra el Model.
//
// El nombre "Tarea" (singular, primera letra mayúscula) es importante:
// Mongoose lo usa para determinar el nombre de la COLECCIÓN en MongoDB.
// Por convención, Mongoose convierte el nombre a plural y minúsculas:
// "Tarea" → colección "tareas"
// "Usuario" → colección "usuarios"
// "ProductoDigital" → colección "productosdigitals" (OJO: no siempre funciona bien con plurales complejos)
//
// El Model es la INTERFAZ para interactuar con la colección.
// Desde Tarea podemos: crear, buscar, actualizar, eliminar documentos.
// Tarea.find(), Tarea.findById(), Tarea.create(), etc.

// ════════════════════════════════════════════════════════
//  FUNCIÓN AUXILIAR: validar ID de MongoDB
// ════════════════════════════════════════════════════════

const esIdValido = (id) => mongoose.Types.ObjectId.isValid(id);
// Los IDs de MongoDB son ObjectId: strings hexadecimales de 24 caracteres.
// Ejemplo válido: "64abc123def456789012abcd"
// Si el cliente envía un ID con formato incorrecto (ej: "hola" o "123"),
// Mongoose lanzaría un CastError. Es mejor verificar antes de consultar.
// mongoose.Types.ObjectId.isValid() devuelve true/false.
//
// Esta función la reutilizaremos en todas las rutas que reciben un :id.

// ════════════════════════════════════════════════════════
//  FUNCIÓN AUXILIAR: manejar errores de Mongoose
// ════════════════════════════════════════════════════════

const manejarErrorMongoose = (error, res) => {
  // Función que centraliza el manejo de errores de Mongoose.
  // Así no repetimos el mismo bloque if/else en cada ruta.
  // DRY principle: Don't Repeat Yourself.

  if (error.name === "ValidationError") {
    // ValidationError: los datos del body no pasaron las validaciones del Schema.
    // Ejemplos: título vacío, estado inválido, fecha en el pasado.
    //
    // error.errors es un objeto donde cada clave es el nombre del campo fallido.
    // Object.values() convierte los valores del objeto en un array.
    // .map(e => e.message) extrae solo el mensaje de error de cada campo.
    const mensajes = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({
      exito:   false,
      tipo:    "ValidationError",
      mensaje: "Los datos enviados no pasaron la validación",
      errores: mensajes,
      // Devolvemos TODOS los errores de validación juntos para que
      // el cliente pueda mostrarlos todos al usuario de una vez.
    });
  }

  if (error.name === "CastError") {
    // CastError: Mongoose intentó convertir un valor al tipo del Schema y falló.
    // El caso más común: el :id en la URL no es un ObjectId válido.
    // Ejemplo: GET /api/tareas/hola → "hola" no es un ObjectId → CastError.
    return res.status(400).json({
      exito:   false,
      tipo:    "CastError",
      mensaje: `El ID proporcionado ('${error.value}') no tiene un formato válido de MongoDB`,
      ayuda:   "Los IDs de MongoDB tienen 24 caracteres hexadecimales (0-9, a-f)",
    });
  }

  if (error.code === 11000) {
    // Error de clave duplicada (duplicate key).
    // Ocurre cuando intentas insertar un documento con un campo
    // que tiene índice único (unique: true en el Schema) y ese valor ya existe.
    // Ejemplo: dos usuarios con el mismo email.
    // error.keyValue = { email: "juan@email.com" } → qué campo y valor causó el conflicto.
    return res.status(409).json({
      // 409 Conflict: el recurso ya existe (hay un conflicto con el estado actual)
      exito:   false,
      tipo:    "DuplicateKey",
      mensaje: "Ya existe un documento con ese valor único",
      campo:   error.keyValue,
    });
  }

  // Si no reconocemos el error específico, respondemos con 500 genérico.
  console.error("  ❌ Error no manejado:", error.message);
  return res.status(500).json({
    exito:   false,
    tipo:    "ServerError",
    mensaje: "Error interno del servidor",
    // No revelamos el error técnico al cliente por seguridad.
    // Los detalles quedan en los logs del servidor.
  });
};

// ════════════════════════════════════════════════════════
//  GET / → Ruta raíz: documentación de la API
// ════════════════════════════════════════════════════════
app.get("/", (req, res) => {
  // Esta ruta no es async porque no hace consultas a MongoDB.
  // Es solo una respuesta estática con la documentación.
  //
  // mongoose.connection.readyState devuelve un número:
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const estadoDB = mongoose.connection.readyState === 1 ? "✅ Conectada" : "⚠️ Desconectada";

  res.json({
    api:           "📋 API CRUD de Tareas",
    tecnologias:   "Node.js + Express + Mongoose + MongoDB",
    estadoDB,
    // Si el estado es "⚠️ Desconectada", las rutas que consultan MongoDB fallarán.
    instruccion:   "Ejecuta primero POST /api/seed para cargar datos de prueba",
    rutas: {
      crud: {
        "POST   /api/tareas":               "CREATE — Crear tarea nueva",
        "GET    /api/tareas":               "READ   — Listar todas (con filtros)",
        "GET    /api/tareas/:id":           "READ   — Ver una tarea por ID",
        "PUT    /api/tareas/:id":           "UPDATE — Actualización completa",
        "PATCH  /api/tareas/:id":           "UPDATE — Actualización parcial",
        "DELETE /api/tareas/:id":           "DELETE — Borrado lógico (activo=false)",
        "DELETE /api/tareas/:id/permanente":"DELETE — Borrado físico definitivo",
      },
      extras: {
        "POST /api/seed":             "Cargar datos de prueba (borra los anteriores)",
        "GET  /api/estadisticas":     "Resumen estadístico de las tareas",
        "GET  /api/tareas/vencidas":  "Tareas pendientes con fecha vencida",
      },
      filtros: {
        "?estado=pendiente":          "Filtrar por estado",
        "?prioridad=alta":            "Filtrar por prioridad",
        "?buscar=node":               "Buscar texto en el título (no distingue mayúsculas)",
        "?pagina=1&limite=5":         "Paginación: página 1, 5 resultados por página",
        "?orden=prioridad":           "Ordenar resultados (createdAt, titulo, prioridad, estado)",
        "?activo=false":              "Ver tareas eliminadas lógicamente",
      },
    },
  });
});

// ════════════════════════════════════════════════════════
//  C — CREATE: POST /api/tareas
// ════════════════════════════════════════════════════════
//
//  Crea una nueva tarea con los datos enviados en el body.
//
//  Body de ejemplo:
//  {
//    "titulo": "Estudiar CRUD con Mongoose",
//    "descripcion": "Entender Schema, validaciones y operaciones CRUD",
//    "estado": "en_progreso",
//    "prioridad": "alta",
//    "etiquetas": ["estudio", "backend"]
//  }
//
//  Respuesta exitosa → 201 Created
//  {
//    "exito": true,
//    "operacion": "CREATE",
//    "dato": { "_id": "...", "titulo": "...", ... }
//  }

app.post("/api/tareas", async (req, res) => {
  // async porque usamos await dentro.
  // Toda función que use await DEBE ser async.

  try {
    // El bloque try/catch captura cualquier error en las operaciones async.
    // Si algo dentro del try lanza un error (incluidas las Promises rechazadas),
    // el flujo salta al catch y nunca llega al res.json() de éxito.

    console.log("\n  📌 CREATE — Nueva tarea:");
    console.log("     Datos recibidos:", JSON.stringify(req.body, null, 2));
    // JSON.stringify con null, 2 formatea el objeto con indentación de 2 espacios.
    // Útil para ver en la terminal qué datos exactamente llegaron del cliente.

    // ─────────────────────────────────────────────────
    //  Validación manual adicional (antes del Schema)
    // ─────────────────────────────────────────────────
    if (!req.body || Object.keys(req.body).length === 0) {
      // Object.keys(obj) devuelve un array con las claves del objeto.
      // Si el body está vacío {}, su array de claves tiene length 0.
      return res.status(400).json({
        exito:   false,
        mensaje: "El body de la petición está vacío. Envía al menos el campo 'titulo'.",
        ejemplo: { titulo: "Mi tarea", prioridad: "alta", estado: "pendiente" },
      });
    }

    // ─────────────────────────────────────────────────
    //  Creación de la instancia del documento
    // ─────────────────────────────────────────────────
    const nuevaTarea = new Tarea(req.body);
    // new Tarea(datos) crea una instancia del modelo con los datos del body.
    // En este punto el documento existe en MEMORIA (JavaScript),
    // pero todavía NO está en MongoDB.
    //
    // Mongoose aplica los valores default del Schema aquí:
    // Si req.body.estado es undefined → nuevaTarea.estado = "pendiente"
    // Si req.body.activo es undefined → nuevaTarea.activo = true
    //
    // Los campos no válidos son ignorados silenciosamente:
    // Si req.body tiene { titulo: "...", campoInventado: "xyz" },
    // campoInventado no aparecerá en el documento (no está en el Schema).

    // ─────────────────────────────────────────────────
    //  Guardado en MongoDB con validación automática
    // ─────────────────────────────────────────────────
    const guardada = await nuevaTarea.save();
    // .save() hace dos cosas:
    // 1. VALIDA el documento contra el Schema (required, minlength, enum, etc.)
    //    Si alguna validación falla → lanza ValidationError → va al catch.
    // 2. Inserta el documento en MongoDB si las validaciones pasan.
    //    MongoDB asigna automáticamente un _id (ObjectId único) al documento.
    //
    // await: espera a que la operación asíncrona termine antes de continuar.
    // Sin await, guardada sería una Promise pendiente (no el documento).
    //
    // También ejecuta los HOOKS: primero pre("save"), luego guarda, luego post("save").

    console.log(`  ✅ Tarea creada: "${guardada.titulo}"`);
    console.log(`     ID en MongoDB: ${guardada._id}`);
    console.log(`     Resumen: ${guardada.resumen()}`);
    // Llamamos al método de instancia definido en el Schema.

    res.status(201).json({
      // 201 Created: la petición fue exitosa y creó un nuevo recurso.
      exito:     true,
      operacion: "CREATE",
      mensaje:   "Tarea creada exitosamente en MongoDB",
      dato:      guardada,
      // guardada es el documento completo tal como quedó en MongoDB:
      // incluye el _id asignado por MongoDB, los defaults aplicados,
      // y los timestamps createdAt y updatedAt.
    });

  } catch (error) {
    manejarErrorMongoose(error, res);
    // Delegamos al manejador centralizado de errores.
    // Si fue ValidationError → 400, si fue CastError → 400, etc.
  }
});

// ════════════════════════════════════════════════════════
//  R — READ ALL: GET /api/tareas
// ════════════════════════════════════════════════════════
//
//  Lista las tareas con soporte para:
//  - Filtros por estado, prioridad, texto de búsqueda
//  - Paginación (pagina, limite)
//  - Ordenamiento (orden)
//  - Ver tareas inactivas opcionalmente
//
//  Ejemplos de URL con filtros:
//  GET /api/tareas                           → todas las activas
//  GET /api/tareas?estado=pendiente          → solo pendientes
//  GET /api/tareas?prioridad=urgente         → solo urgentes
//  GET /api/tareas?buscar=node               → título contiene "node"
//  GET /api/tareas?pagina=2&limite=5         → página 2, 5 por página
//  GET /api/tareas?orden=titulo              → ordenadas por título
//  GET /api/tareas?activo=false              → solo las eliminadas lógicamente
//  GET /api/tareas?estado=pendiente&prioridad=alta → combinar filtros

app.get("/api/tareas", async (req, res) => {
  try {
    console.log("\n  📖 READ ALL — Parámetros de consulta:", req.query);
    // req.query es un objeto con los query params de la URL.
    // Para GET /api/tareas?estado=pendiente&limite=5:
    // req.query = { estado: "pendiente", limite: "5" }
    // OJO: todos los valores de query params llegan como STRING,
    // incluso los números. Por eso más adelante usamos parseInt().

    // ─────────────────────────────────────────────────
    //  EXTRACCIÓN DE PARÁMETROS CON VALORES POR DEFECTO
    // ─────────────────────────────────────────────────
    const {
      estado,
      prioridad,
      buscar,
      orden    = "createdAt",
      // Si no especifican orden, ordenamos por fecha de creación.
      pagina   = 1,
      // Si no especifican pagina, empezamos en la página 1.
      limite   = 10,
      // Si no especifican limite, devolvemos 10 por página.
      mostrarInactivos = "false",
      // Por defecto solo mostramos las activas (activo = true).
      // Para ver las eliminadas: ?mostrarInactivos=true
    } = req.query;
    // Desestructuramos req.query con valores por defecto.
    // Si req.query.orden existe → usa ese valor.
    // Si no existe → usa "createdAt".

    // ─────────────────────────────────────────────────
    //  CONSTRUCCIÓN DEL FILTRO DE MONGODB
    // ─────────────────────────────────────────────────
    const filtro = {};
    // Empezamos con un filtro vacío y lo vamos construyendo.
    // Un filtro vacío {} en MongoDB significa "sin condiciones" = devuelve todo.
    // Iremos agregando condiciones según los parámetros recibidos.

    if (mostrarInactivos !== "true") {
      filtro.activo = true;
      // Por defecto mostramos solo las tareas activas.
      // Si el cliente envía ?mostrarInactivos=true, no agregamos este filtro
      // y vemos todas (activas e inactivas).
    }

    if (estado) {
      filtro.estado = estado;
      // Si llegó el parámetro ?estado=pendiente, filtramos por ese estado.
      // El valor de filtro.estado puede ser cualquier string; si no es uno
      // de los valores del enum del Schema, MongoDB simplemente no encontrará nada.
      // (No necesitamos validar aquí, la consulta devuelve [] si es inválido)
    }

    if (prioridad) {
      filtro.prioridad = prioridad;
    }

    if (buscar && buscar.trim() !== "") {
      filtro.titulo = {
        $regex:   buscar,
        // $regex: permite buscar por expresión regular o string parcial.
        // buscar = "node" → encuentra tareas con "node" en el título.
        // También encuentra "Node.js", "nodejs", "NODE.JS", etc. (si $options: "i")

        $options: "i",
        // "i" = case insensitive (no distingue mayúsculas/minúsculas).
        // Sin esto: "node" solo encontraría "node", no "Node" ni "NODE".
        // Con "i": encuentra cualquier combinación de mayúsculas.
      };
      // Esto es equivalente a la cláusula LIKE '%node%' en SQL.
    }

    // ─────────────────────────────────────────────────
    //  CONFIGURACIÓN DEL ORDENAMIENTO
    // ─────────────────────────────────────────────────
    const opcionesOrden = {
      // Mapa de nombre de orden (que viene en la URL) a
      // objeto de ordenamiento de Mongoose.
      createdAt:  { createdAt: -1 },
      // -1 = descendente (más reciente primero)
      //  1 = ascendente (más antiguo primero)

      titulo:     { titulo: 1 },
      // 1 = ascendente = A → Z (orden alfabético)

      prioridad:  { prioridad: -1 },
      // -1 = descendente: "urgente" > "alta" > "media" > "baja"
      // (en orden alfabético descendente, que coincide con la urgencia)

      estado:     { estado: 1 },
      // 1 = ascendente: "cancelada" < "completada" < "en_progreso" < "pendiente"
      // (orden alfabético)

      fechaLimite: { fechaLimite: 1 },
      // 1 = ascendente: las que vencen más pronto aparecen primero.
    };

    const ordenamiento = opcionesOrden[orden] || { createdAt: -1 };
    // Si el valor de 'orden' está en opcionesOrden → usa ese.
    // Si no → usamos el default { createdAt: -1 }.
    // Esto evita que un cliente malicioso inyecte un ordenamiento arbitrario.

    // ─────────────────────────────────────────────────
    //  CÁLCULO DE PAGINACIÓN
    // ─────────────────────────────────────────────────
    const paginaNum = Math.max(1, parseInt(pagina, 10));
    // parseInt(pagina, 10) convierte el string "2" al número 2.
    // El segundo argumento 10 es la BASE numérica (decimal).
    // Si el valor no es un número (ej: "abc"), parseInt devuelve NaN.
    // Math.max(1, NaN) devuelve NaN... pero Math.max(1, parseInt("abc",10))...
    // Una forma más robusta: Number.isNaN(parseInt(pagina)) ? 1 : parseInt(pagina)
    // Simplificamos: Math.max(1, ...) asegura que nunca sea menor que 1.
    // Si alguien envía ?pagina=0 o ?pagina=-5, usamos 1.

    const limiteNum = Math.min(50, Math.max(1, parseInt(limite, 10)));
    // Math.max(1, ...) → mínimo 1 resultado por página
    // Math.min(50, ...) → máximo 50 resultados por página
    // Así evitamos que alguien pida ?limite=100000 y colapse el servidor.
    // El cliente puede pedir hasta 50 por página. Si quiere más, hace más peticiones.

    const skip = (paginaNum - 1) * limiteNum;
    // skip = cuántos documentos saltar antes de empezar a devolver.
    // Página 1: (1-1) * 10 = 0  → empieza desde el principio
    // Página 2: (2-1) * 10 = 10 → salta los primeros 10
    // Página 3: (3-1) * 10 = 20 → salta los primeros 20
    // Fórmula general: (página - 1) × límite

    // ─────────────────────────────────────────────────
    //  EJECUCIÓN DE LA CONSULTA (con paginación en paralelo)
    // ─────────────────────────────────────────────────
    const [tareas, total] = await Promise.all([
      // Promise.all() ejecuta múltiples Promises EN PARALELO.
      // En lugar de:
      //   const tareas = await Tarea.find(...);  // espera a terminar
      //   const total  = await Tarea.countDocuments(...);  // luego ejecuta esto
      // Con Promise.all ambas consultas se ejecutan AL MISMO TIEMPO.
      // Si cada consulta tarda 100ms → total: ~100ms (paralelo)
      // Sin Promise.all → total: ~200ms (secuencial)
      // En producción con muchas consultas, esto importa mucho.

      Tarea
        .find(filtro)
        // find(filtro) busca documentos que cumplan las condiciones del filtro.
        // Si filtro = {} → devuelve todos.
        // Si filtro = { activo: true, estado: "pendiente" } → solo pendientes activas.
        .sort(ordenamiento)
        // sort() ordena los resultados ANTES de aplicar skip y limit.
        // El orden de encadenamiento importa: siempre sort antes de skip/limit.
        .skip(skip)
        // skip(n) salta los primeros n documentos del resultado ordenado.
        .limit(limiteNum),
        // limit(n) devuelve máximo n documentos después del skip.

      Tarea.countDocuments(filtro),
      // countDocuments(filtro) cuenta cuántos documentos cumplen el filtro.
      // NO trae los documentos, solo el número. Más eficiente que .find().length.
      // Necesitamos este total para calcular cuántas páginas hay en total.
    ]);
    // El resultado de Promise.all es un array.
    // Desestructuramos: const [resultado1, resultado2] = await Promise.all([p1, p2])
    // tareas = resultado de Tarea.find(...)
    // total  = resultado de Tarea.countDocuments(...)

    const totalPaginas = Math.ceil(total / limiteNum);
    // Math.ceil() redondea hacia ARRIBA.
    // Si hay 25 tareas y mostramos 10 por página:
    // 25 / 10 = 2.5 → Math.ceil(2.5) = 3 páginas
    // (3 páginas: 10 + 10 + 5)
    // Si usáramos Math.floor: 25/10=2.5 → 2 → nos faltaría mostrar las últimas 5.

    console.log(`  ✅ Resultado: ${tareas.length} tareas en página ${paginaNum} de ${totalPaginas} (total: ${total})`);

    res.status(200).json({
      exito:     true,
      operacion: "READ (listar tareas)",
      total,
      // Total de documentos que cumplen el filtro (sin paginación).
      paginacion: {
        paginaActual:  paginaNum,
        totalPaginas,
        limite:        limiteNum,
        resultadosEnEstaPagina: tareas.length,
        hayPaginaAnterior: paginaNum > 1,
        hayPaginaSiguiente: paginaNum < totalPaginas,
        // Estos booleans son útiles para que el frontend decida
        // si mostrar botones "Anterior" y "Siguiente".
      },
      filtrosAplicados: {
        estado:    estado    || "todos",
        prioridad: prioridad || "todas",
        buscar:    buscar    || "sin búsqueda",
        orden,
      },
      // Devolvemos los filtros aplicados para que el cliente
      // sepa exactamente qué consulta se procesó.
      datos: tareas,
    });

  } catch (error) {
    manejarErrorMongoose(error, res);
  }
});

// ════════════════════════════════════════════════════════
//  R — READ ONE: GET /api/tareas/:id
// ════════════════════════════════════════════════════════
//
//  Obtiene UNA tarea específica por su _id de MongoDB.
//
//  El :id en la URL es un parámetro de ruta (route param).
//  Si la URL es: GET /api/tareas/64abc123def456789012abcd
//  Entonces: req.params.id = "64abc123def456789012abcd"
//
//  Respuesta exitosa → 200 OK con el documento.
//  Si no existe → 404 Not Found.
//  Si el ID tiene formato inválido → 400 Bad Request.

app.get("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Desestructuramos req.params para extraer el id de la URL.
    // req.params es un objeto con todos los parámetros de ruta.
    // Para la ruta /api/tareas/:id con URL /api/tareas/abc:
    // req.params = { id: "abc" }

    console.log(`\n  📖 READ ONE — Buscando tarea con ID: ${id}`);

    // Validación previa del formato del ID
    if (!esIdValido(id)) {
      return res.status(400).json({
        exito:   false,
        mensaje: `'${id}' no es un ID válido de MongoDB`,
        ayuda:   "Los IDs de MongoDB tienen exactamente 24 caracteres hexadecimales",
        ejemplo: "64abc123def456789012abcd",
      });
    }

    const tarea = await Tarea.findById(id);
    // Tarea.findById(id) es equivalente a Tarea.findOne({ _id: id }).
    // Es un atajo conveniente para buscar por el _id de MongoDB.
    // Si no encuentra ningún documento con ese _id → devuelve null (no lanza error).
    //
    // En MongoDB, los IDs se llaman "_id" (con guión bajo).
    // Mongoose también acepta "id" (sin guión bajo) gracias a un getter virtual.

    if (!tarea) {
      // Si findById devuelve null, el documento no existe en la BD.
      return res.status(404).json({
        // 404 Not Found: el recurso solicitado no existe.
        exito:   false,
        mensaje: `No existe ninguna tarea con el ID: ${id}`,
      });
    }

    if (!tarea.activo) {
      // El documento existe en MongoDB pero fue eliminado lógicamente.
      // Podemos dar información más específica en el error.
      return res.status(404).json({
        exito:   false,
        mensaje: "Esta tarea fue eliminada. Ya no está disponible.",
        eliminadaId: id,
      });
    }

    console.log(`  ✅ Tarea encontrada: "${tarea.titulo}" — ${tarea.resumen()}`);

    res.status(200).json({
      exito:     true,
      operacion: "READ (una tarea)",
      dato:      tarea,
    });

  } catch (error) {
    manejarErrorMongoose(error, res);
  }
});

// ════════════════════════════════════════════════════════
//  U — UPDATE COMPLETO: PUT /api/tareas/:id
// ════════════════════════════════════════════════════════
//
//  PUT = Actualización COMPLETA del documento.
//  La intención de PUT es reemplazar todo el recurso con los
//  nuevos datos enviados.
//
//  Body de ejemplo:
//  {
//    "titulo": "Nuevo título",
//    "descripcion": "Nueva descripción",
//    "estado": "completada",
//    "prioridad": "baja"
//  }
//
//  Diferencia clave PUT vs PATCH:
//  PUT   → el cliente envía todos los campos (o los que quiere conservar) si solo envia algunos campos, 
// los demás se borran o quedan en su valor default, por eso es importante enviar TODOS los campos 
// que quieres conservary a la vez actualizar.
//  PATCH → el cliente envía SOLO los campos a cambiar y los demás quedan intactos

app.put("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`\n  ✏️  UPDATE PUT — Tarea: ${id}`);
    console.log("     Datos nuevos:", JSON.stringify(req.body, null, 2));

    if (!esIdValido(id)) {
      return res.status(400).json({ exito: false, mensaje: `ID inválido: '${id}'` });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        exito:   false,
        mensaje: "El body está vacío. Envía los campos a actualizar.",
      });
    }

    // ─────────────────────────────────────────────────
    //  Construimos el objeto de actualización
    // ─────────────────────────────────────────────────
    // Extraemos solo los campos actualizables del body.
    // NUNCA permitimos que el cliente cambie _id, activo, createdAt, etc.
    // directamente desde esta ruta.
    const {
      titulo, descripcion, estado, prioridad, fechaLimite, etiquetas
    } = req.body;

    const datosActualizados = { titulo, descripcion, estado, prioridad, fechaLimite, etiquetas };

    // Eliminamos los campos undefined del objeto.
    // Si el cliente no envió 'titulo', no queremos pasar titulo: undefined a MongoDB
    // porque eso podría borrar el valor actual.
    Object.keys(datosActualizados).forEach((campo) => {
      if (datosActualizados[campo] === undefined) {
        delete datosActualizados[campo];
        // delete elimina la propiedad del objeto.
        // Así solo quedan en datosActualizados los campos que SÍ vinieron en el body.
      }
    });

    // ─────────────────────────────────────────────────
    //  Lógica especial: si se marca como completada
    // ─────────────────────────────────────────────────
    if (estado === "completada") {
      datosActualizados.completadaEn = new Date();
      // Si el nuevo estado es "completada", registramos la fecha.
      // El hook pre("save") hace esto automáticamente con .save(),
      // pero findByIdAndUpdate NO ejecuta los hooks pre("save").
      // Por eso debemos hacerlo manualmente aquí.
      //
      // DIFERENCIA IMPORTANTE:
      // new Tarea().save()         → ejecuta hooks pre("save") y post("save")
      // findByIdAndUpdate(...)     → NO ejecuta hooks pre("save") (salvo con { runValidators: true })
      // Esta es una trampa común con Mongoose que debes recordar.
    }

    // ─────────────────────────────────────────────────
    //  Actualización en MongoDB
    // ─────────────────────────────────────────────────
    const actualizada = await Tarea.findByIdAndUpdate(
      id,
      // Primer argumento: el _id del documento a actualizar.

      datosActualizados,
      // Segundo argumento: los datos nuevos.
      // Sin ningún operador de MongoDB ($set, $push, etc.),
      // Mongoose aplica un $set implícito para los campos enviados.
      // Esto significa que SOLO actualiza los campos en datosActualizados
      // y NO borra los demás (a diferencia de un reemplazo completo).

      {
        new:           true,
        // new: true → devuelve el documento DESPUÉS de aplicar los cambios.
        // Sin esto → devuelve el documento ANTES de los cambios (el original).
        // En el 99% de los casos quieres el documento actualizado, así que siempre new: true.

        runValidators: true,
        // Ejecuta las validaciones del Schema al actualizar.
        // Por defecto, findByIdAndUpdate NO las ejecuta.
        // Con runValidators: true → si el nuevo estado no está en el enum → ValidationError.
        // Importante para mantener la integridad de los datos.
      }
    );

    if (!actualizada) {
      return res.status(404).json({ exito: false, mensaje: `No existe tarea con ID: ${id}` });
    }

    console.log(`  ✅ Tarea actualizada (PUT): "${actualizada.titulo}"`);
    console.log(`     Resumen: ${actualizada.resumen()}`);

    res.status(200).json({
      exito:             true,
      operacion:         "UPDATE (PUT — actualización completa)",
      mensaje:           "Tarea actualizada exitosamente",
      camposActualizados: Object.keys(datosActualizados),
      // Informamos qué campos se actualizaron para que el cliente lo sepa.
      dato:              actualizada,
    });

  } catch (error) {
    manejarErrorMongoose(error, res);
  }
});

// ════════════════════════════════════════════════════════
//  U — UPDATE PARCIAL: PATCH /api/tareas/:id
// ════════════════════════════════════════════════════════
//
//  PATCH = Actualización PARCIAL.
//  Solo se actualizan los campos que el cliente envíe.
//  Los demás campos del documento quedan INTACTOS.
//
//  Ejemplo: una tarea tiene titulo, descripcion, estado, prioridad.
//  Si haces PATCH con body: { "estado": "completada" }
//  → Solo cambia el estado. Los otros 3 campos no se tocan.
//
//  PUT requiere enviar todos los campos que quieres conservar.
//  PATCH es más eficiente para cambios puntuales.
//
//  Body de ejemplo:
//  { "estado": "completada" }
//  { "prioridad": "urgente" }
//  { "estado": "en_progreso", "etiquetas": ["trabajo", "cliente"] }

app.patch("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`\n  ✏️  UPDATE PATCH — Tarea: ${id}`);
    console.log("     Campos a modificar:", Object.keys(req.body));

    if (!esIdValido(id)) {
      return res.status(400).json({ exito: false, mensaje: `ID inválido: '${id}'` });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        exito:   false,
        mensaje: "El body está vacío. Envía al menos un campo a actualizar.",
      });
    }

    // ─────────────────────────────────────────────────
    //  Campos protegidos que no se pueden cambiar por PATCH
    // ─────────────────────────────────────────────────
    const camposProtegidos = ["_id", "activo", "createdAt", "updatedAt", "completadaEn"];
    const camposInvalidos = Object.keys(req.body).filter(c => camposProtegidos.includes(c));
    // .filter() devuelve un nuevo array con los elementos que cumplen la condición.
    // Filtramos las claves del body que estén en la lista de campos protegidos.

    if (camposInvalidos.length > 0) {
      return res.status(400).json({
        exito:     false,
        mensaje:   "Estás intentando modificar campos que no se pueden cambiar directamente",
        invalidos: camposInvalidos,
        permitidos: ["titulo", "descripcion", "estado", "prioridad", "fechaLimite", "etiquetas"],
      });
    }

    // ─────────────────────────────────────────────────
    //  Lógica especial: fecha de completado
    // ─────────────────────────────────────────────────
    const datosActualizados = { ...req.body };
    // Spread operator: copiamos el body para no mutarlo directamente.
    // { ...req.body } crea un nuevo objeto con todas las propiedades de req.body.

    if (req.body.estado === "completada") {
      datosActualizados.completadaEn = new Date();
      // Igual que en PUT: si se marca como completada, registramos cuándo.
    }

    // ─────────────────────────────────────────────────
    //  Actualización parcial con $set
    // ─────────────────────────────────────────────────
    const actualizada = await Tarea.findByIdAndUpdate(
      id,
      { $set: datosActualizados },
      // $set es un operador de actualización de MongoDB.
      // $set: actualiza SOLO los campos especificados, deja los demás igual.
      // Sin $set: en algunos casos MongoDB podría REEMPLAZAR el documento entero
      //           con solo los campos enviados (comportamiento de sustitución).
      // Con $set: siempre es una actualización PARCIAL, que es lo que queremos en PATCH.
      //
      // Ejemplo en MongoDB Shell:
      // Sin $set: db.tareas.updateOne({ _id: id }, { estado: "completada" })
      //   → El documento quedaría con SOLO { _id, estado }. Se perderían titulo, prioridad, etc.
      // Con $set: db.tareas.updateOne({ _id: id }, { $set: { estado: "completada" } })
      //   → Solo cambia estado. Los demás campos intactos.
      { new: true, runValidators: true }
    );

    if (!actualizada) {
      return res.status(404).json({ exito: false, mensaje: `No existe tarea con ID: ${id}` });
    }

    console.log(`  ✅ Tarea actualizada (PATCH): "${actualizada.titulo}"`);

    res.status(200).json({
      exito:             true,
      operacion:         "UPDATE (PATCH — actualización parcial)",
      mensaje:           "Campos actualizados exitosamente",
      camposModificados: Object.keys(datosActualizados),
      // Informamos exactamente qué campos se tocaron.
      dato:              actualizada,
    });

  } catch (error) {
    manejarErrorMongoose(error, res);
  }
});

// ════════════════════════════════════════════════════════
//  D — DELETE LÓGICO: DELETE /api/tareas/:id
// ════════════════════════════════════════════════════════
//
//  BORRADO LÓGICO (Soft Delete):
//  No elimina el documento de MongoDB. Solo cambia activo = false.
//  El documento sigue existiendo en la base de datos pero
//  las consultas que filtran { activo: true } no lo mostrarán.
//
//  Ventajas del borrado lógico:
//  - Los datos no se pierden → puedes restaurarlos
//  - Mantenes historial → ¿quién lo eliminó? ¿cuándo?
//  - Si tienes relaciones (un usuario hizo esta tarea), no se rompen
//  - Puedes auditar qué se "eliminó" y cuándo
//
//  ¿Cuándo usar borrado físico en cambio?
//  - Datos muy sensibles que no deben quedar en la BD (por ley: GDPR)
//  - Limpieza de datos temporales o logs viejos
//  - El espacio en disco es crítico y la información no es relevante

app.delete("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`\n  🗑️  DELETE LÓGICO — Desactivando tarea: ${id}`);

    if (!esIdValido(id)) {
      return res.status(400).json({ exito: false, mensaje: `ID inválido: '${id}'` });
    }

    // Verificamos si ya fue eliminada lógicamente antes
    const tareaExistente = await Tarea.findById(id);

    if (!tareaExistente) {
      return res.status(404).json({ exito: false, mensaje: `No existe tarea con ID: ${id}` });
    }

    if (!tareaExistente.activo) {
      // Si ya estaba inactiva, informamos en lugar de hacer una operación innecesaria.
      return res.status(400).json({
        exito:   false,
        mensaje: "Esta tarea ya fue eliminada anteriormente",
        id,
        // El cliente puede interpretar esto y no mostrar error al usuario.
      });
    }

    const desactivada = await Tarea.findByIdAndUpdate(
      id,
      {
        activo:      false,
        // Cambiamos activo a false → borrado lógico.
        eliminadaEn: new Date(),
        // Registramos el momento exacto de la eliminación.
        // Deberías agregar este campo al Schema si quieres persistirlo.
      },
      { new: true }
      // new: true → devolvemos el documento DESPUÉS del cambio.
    );

    console.log(`  ✅ Tarea desactivada: "${desactivada.titulo}" (activo: false)`);
    console.log("     La tarea sigue en MongoDB pero no aparecerá en las consultas normales.");

    res.status(200).json({
      exito:     true,
      operacion: "DELETE (borrado lógico)",
      mensaje:   `Tarea '${desactivada.titulo}' desactivada. Sigue en la BD con activo=false.`,
      recuperar: `Para restaurarla: PATCH /api/tareas/${id}  con body: { "activo": true }`,
      // Informamos cómo restaurarla si fue un error.
      dato:      desactivada,
    });

  } catch (error) {
    manejarErrorMongoose(error, res);
  }
});

// ════════════════════════════════════════════════════════
//  D — DELETE FÍSICO: DELETE /api/tareas/:id/permanente
// ════════════════════════════════════════════════════════
//
//  BORRADO FÍSICO (Hard Delete):
//  Elimina el documento de MongoDB para SIEMPRE.
//  Esta operación es IRREVERSIBLE.
//
//  Nota sobre el orden de las rutas:
//  La ruta DELETE /api/tareas/:id/permanente debe estar definida
//  ANTES que DELETE /api/tareas/:id, para que Express no confunda
//  "permanente" con un valor del parámetro :id.
//  En Express, las rutas se evalúan en orden de definición.
//  PERO como la primera ruta es /:id y esta es /:id/permanente,
//  Express las diferencia por la estructura de la URL. No hay conflicto.

app.delete("/api/tareas/:id/permanente", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`\n  🗑️  DELETE FÍSICO — Eliminando PERMANENTEMENTE: ${id}`);
    console.log("  ⚠️  Esta acción NO se puede deshacer");

    if (!esIdValido(id)) {
      return res.status(400).json({ exito: false, mensaje: `ID inválido: '${id}'` });
    }

    const eliminada = await Tarea.findByIdAndDelete(id);
    // findByIdAndDelete(id) elimina el documento completo de MongoDB.
    // Si existe → lo elimina y lo devuelve (para que podamos saber qué se eliminó).
    // Si no existe → devuelve null.
    //
    // En MongoDB Shell equivale a:
    // db.tareas.deleteOne({ _id: ObjectId("64abc...") })

    if (!eliminada) {
      return res.status(404).json({ exito: false, mensaje: `No existe tarea con ID: ${id}` });
    }

    console.log(`  ✅ Eliminación física completada: "${eliminada.titulo}" ya no existe en MongoDB`);

    res.status(200).json({
      exito:     true,
      operacion: "DELETE (borrado físico permanente)",
      mensaje:   `Tarea '${eliminada.titulo}' eliminada definitivamente de MongoDB. No hay vuelta atrás.`,
      advertencia: "El documento ya no existe en la base de datos. Esta acción no se puede deshacer.",
      dato:      eliminada,
      // Devolvemos el documento que se eliminó, por si el cliente necesita
      // mostrar información de lo que se borró o hacer una operación con esos datos.
    });

  } catch (error) {
    manejarErrorMongoose(error, res);
  }
});

// ════════════════════════════════════════════════════════
//  RUTA EXTRA: GET /api/tareas/vencidas
// ════════════════════════════════════════════════════════
//
//  Muestra las tareas pendientes o en progreso cuya fecha
//  límite ya pasó. Usa el método estático definido en el Schema.
//
//  NOTA: Esta ruta usa el método estático 'pendientesVencidas'
//  que filtra con { fechaLimite: { $lt: new Date() } }.
//  Para que muestre resultados, las tareas deben tener fechaLimite
//  configurada en el pasado. Puedes editar los datos del seed
//  para probar esta funcionalidad.

app.get("/api/tareas/vencidas", async (req, res) => {
  try {
    console.log("\n  📖 READ — Tareas vencidas");

    const vencidas = await Tarea.pendientesVencidas();
    // Llamamos al método estático definido en el Schema.
    // Equivalente a: Tarea.find({ activo: true, estado: { $in: [...] }, fechaLimite: { $lt: new Date() } })

    res.status(200).json({
      exito:    true,
      total:    vencidas.length,
      mensaje:  vencidas.length > 0
        ? `⚠️ Tienes ${vencidas.length} tarea(s) vencidas que requieren atención`
        : "✅ No tienes tareas vencidas",
      datos:    vencidas,
    });
  } catch (error) {
    manejarErrorMongoose(error, res);
  }
});

// ════════════════════════════════════════════════════════
//  RUTA EXTRA: GET /api/estadisticas
// ════════════════════════════════════════════════════════
//
//  Usa MongoDB Aggregation Pipeline para calcular estadísticas.
//  El Pipeline de Agregación es la forma de hacer consultas
//  complejas en MongoDB: agrupar, contar, promediar, etc.
//  Es el equivalente al GROUP BY de SQL.

app.get("/api/estadisticas", async (req, res) => {
  try {
    console.log("\n  📊 ESTADÍSTICAS — Calculando...");

    // Promise.all para ejecutar las 3 consultas en paralelo.
    const [total, porEstado, porPrioridad, tareasMasRecientes] = await Promise.all([

      Tarea.countDocuments({ activo: true }),
      // Cuenta el total de tareas activas.

      Tarea.aggregate([
        // aggregate() ejecuta un Pipeline de Agregación.
        // Un pipeline es un array de ETAPAS ($match, $group, $sort, $project, etc.)
        // Cada etapa transforma los documentos antes de pasarlos a la siguiente.
        // Se lee como: "Filtra → Agrupa → Ordena → ..."

        { $match: { activo: true } },
        // $match: filtra los documentos (como .find()).
        // Solo pasamos las tareas activas a las siguientes etapas.
        // Siempre pon $match primero para reducir datos antes de agrupar.

        { $group: { _id: "$estado", cantidad: { $sum: 1 } } },
        // $group: agrupa documentos por un campo y calcula métricas.
        // _id: "$estado" → el campo de agrupación (el "$" indica que es un campo del documento)
        // cantidad: { $sum: 1 } → cuenta +1 por cada documento del grupo
        // Resultado: [{ _id: "pendiente", cantidad: 3 }, { _id: "completada", cantidad: 2 }]

        { $sort:  { cantidad: -1 } },
        // $sort: ordena los grupos por cantidad descendente (el estado más frecuente primero).
      ]),

      Tarea.aggregate([
        { $match: { activo: true } },
        { $group: { _id: "$prioridad", cantidad: { $sum: 1 } } },
        { $sort:  { cantidad: -1 } },
      ]),

      Tarea.find({ activo: true })
        .sort({ createdAt: -1 })
        .limit(3)
        .select("titulo estado prioridad createdAt"),
        // .select() especifica qué campos traer (como SELECT en SQL).
        // "campo" → incluir ese campo
        // "-campo" → excluir ese campo
        // Solo traemos los campos relevantes para el resumen.
    ]);

    // ─────────────────────────────────────────────────
    //  Transformamos los arrays de agregación en objetos
    // ─────────────────────────────────────────────────
    // El resultado de aggregate es: [{ _id: "pendiente", cantidad: 3 }, ...]
    // Queremos: { pendiente: 3, completada: 2, ... }
    // Usamos reduce() para construir ese objeto.

    const estadoPorNombre = porEstado.reduce((acumulador, item) => {
      // reduce() itera el array y va "acumulando" un resultado.
      // acumulador: empieza como {} (el valor inicial, segundo arg de reduce)
      // item: cada elemento del array
      // Para cada item, agregamos una propiedad al acumulador:
      // { ...acumulador } = spread del acumulador actual (conserva las propiedades anteriores)
      // [item._id]: item.cantidad → nueva propiedad con el nombre del estado y su cantidad
      return { ...acumulador, [item._id]: item.cantidad };
      // Ejemplo de iteración:
      // Iter 1: acumulador={}, item={_id:"pendiente", cantidad:3} → {pendiente:3}
      // Iter 2: acumulador={pendiente:3}, item={_id:"completada", cantidad:2} → {pendiente:3, completada:2}
    }, {});
    // {} = valor inicial del acumulador

    const prioridadPorNombre = porPrioridad.reduce((acc, item) => ({
      ...acc, [item._id]: item.cantidad
    }), {});

    const completadas = estadoPorNombre.completada || 0;
    // || 0 por si no hay tareas completadas (el campo no existiría en el objeto)

    const porcentajeCompletado = total > 0
      ? Math.round((completadas / total) * 100)
      // Calculamos el porcentaje: (completadas / total) * 100
      // Math.round() redondea al entero más cercano.
      // Ejemplo: 2 completadas de 6 total → (2/6)*100 = 33.33 → Math.round = 33
      : 0;
    // Si no hay tareas (total = 0), el porcentaje es 0 para evitar división por cero.

    res.json({
      exito:              true,
      resumen: {
        totalActivas:         total,
        completadas,
        porcentajeCompletado: `${porcentajeCompletado}%`,
      },
      porEstado:            estadoPorNombre,
      porPrioridad:         prioridadPorNombre,
      tareasMasRecientes:   tareasMasRecientes,
      timestamp:            new Date().toLocaleString("es-CO"),
    });

  } catch (error) {
    manejarErrorMongoose(error, res);
  }
});

// ════════════════════════════════════════════════════════
//  RUTA SEED: POST /api/seed
//  Inserta datos de prueba en MongoDB para poder probar el CRUD
// ════════════════════════════════════════════════════════

app.post("/api/seed", async (req, res) => {
  try {
    console.log("\n  🌱 SEED — Insertando datos de prueba...");

    await Tarea.deleteMany({});
    // deleteMany({}) con filtro vacío elimina TODOS los documentos de la colección.
    // Esto asegura que empezamos desde cero cada vez que corremos el seed.
    // ⚠️  NUNCA pongas esta operación en código de producción sin un guard muy robusto.
    // En producción, los datos reales no se deben borrar con un simple endpoint.

    const tareasDePrueba = [
      {
        titulo:      "Estudiar Node.js y el Event Loop",
        descripcion: "Revisar cómo funciona el event loop, los callbacks, Promises y async/await. Ver el video de Philip Roberts.",
        estado:      "completada",
        prioridad:   "alta",
        etiquetas:   ["estudios", "javascript", "nodejs"],
      },
      {
        titulo:      "Hacer ejercicio diario",
        descripcion: "30 minutos de cardio en la mañana y 20 minutos de pesas en la tarde.",
        estado:      "pendiente",
        prioridad:   "media",
        etiquetas:   ["salud", "rutina", "bienestar"],
      },
      {
        titulo:      "Investigar JWT y autenticación",
        descripcion: "Entender cómo funciona JWT, los middlewares de autenticación en Express, y el flujo de login/logout.",
        estado:      "en_progreso",
        prioridad:   "urgente",
        etiquetas:   ["estudios", "seguridad", "backend"],
      },
      {
        titulo:      "Comprar mercado semanal",
        descripcion: "Leche, pan integral, huevos, frutas de temporada, verduras para ensalada y proteínas.",
        estado:      "pendiente",
        prioridad:   "baja",
        etiquetas:   ["hogar", "compras"],
      },
      {
        titulo:      "Revisar y responder correos pendientes",
        descripcion: "Hay varios correos sin responder de esta semana. Priorizar los del cliente principal.",
        estado:      "pendiente",
        prioridad:   "media",
        etiquetas:   ["trabajo", "comunicacion", "cliente"],
      },
      {
        titulo:      "Entrega: Proyecto CRUD con MongoDB",
        descripcion: "Subir el proyecto completo al repositorio de GitHub. Incluir README con instrucciones de instalación y uso.",
        estado:      "en_progreso",
        prioridad:   "urgente",
        etiquetas:   ["estudios", "github", "mongodb", "entrega"],
      },
      {
        titulo:      "Leer capítulo sobre Mongoose",
        descripcion: "Leer los capítulos 5 y 6 del libro 'Node.js en Acción' sobre schemas avanzados y relaciones.",
        estado:      "pendiente",
        prioridad:   "baja",
        etiquetas:   ["estudios", "lectura"],
      },
    ];

    const tareasCreadas = await Tarea.insertMany(tareasDePrueba);
    // insertMany() inserta múltiples documentos de una vez.
    // Es más eficiente que hacer varios .save() individuales.
    // MongoDB hace una sola operación de escritura en lugar de N.
    // Devuelve un array con los documentos insertados (incluyendo sus _id).
    //
    // Nota: insertMany() por defecto NO ejecuta los hooks pre("save").
    // Si necesitas que los hooks se ejecuten, debes hacer:
    // for (const datos of tareasDePrueba) { await new Tarea(datos).save(); }
    // Pero es más lento porque hace N operaciones individuales.

    console.log(`  ✅ ${tareasCreadas.length} tareas de prueba insertadas en MongoDB`);

    res.status(201).json({
      exito:   true,
      mensaje: `${tareasCreadas.length} tareas de prueba creadas exitosamente`,
      total:   tareasCreadas.length,
      datos:   tareasCreadas,
      siguiente: [
        "GET  /api/tareas                     → Ver todas las tareas",
        "GET  /api/tareas?estado=pendiente    → Filtrar por estado",
        "GET  /api/estadisticas              → Ver estadísticas",
      ],
    });

  } catch (error) {
    manejarErrorMongoose(error, res);
  }
});

// ════════════════════════════════════════════════════════
//  MIDDLEWARE 404 — Ruta no encontrada
// ════════════════════════════════════════════════════════
//
//  Se ejecuta cuando NINGUNA ruta definida arriba coincide
//  con la petición del cliente. Debe ir DESPUÉS de todas las rutas.
//  El orden en Express importa: las rutas se evalúan de arriba a abajo.

app.use((req, res) => {
  res.status(404).json({
    exito:   false,
    codigo:  404,
    mensaje: `La ruta '${req.method} ${req.url}' no existe en esta API`,
    // req.method: el verbo HTTP (GET, POST, PUT, etc.)
    // req.url: la URL que intentó acceder el cliente
    sugerencia: "Consulta GET / para ver todas las rutas disponibles",
  });
});

// ════════════════════════════════════════════════════════
//  MANEJADOR DE ERRORES GLOBAL — Error 500
// ════════════════════════════════════════════════════════
//
//  Express reconoce los manejadores de error por su firma de 4 parámetros.
//  Se ejecuta cuando alguna ruta llama next(error) o cuando una
//  función sync lanza un error no capturado.
//  Para errores en funciones async, el try/catch los captura primero.

app.use((err, req, res, next) => {
  // err: el objeto Error
  // req, res: como siempre
  // next: requerido por Express para reconocer este como error handler
  console.error("❌ Error global no manejado:");
  console.error("   Mensaje:", err.message);
  console.error("   Stack:", err.stack);
  // err.stack contiene el mensaje de error + el stack trace completo.
  // El stack trace muestra la secuencia de llamadas que llevaron al error.
  // Muy útil para depurar en desarrollo; no lo muestres al cliente en producción.

  res.status(500).json({
    exito:   false,
    codigo:  500,
    mensaje: "Error interno del servidor. El equipo técnico fue notificado.",
  });
});

// ════════════════════════════════════════════════════════
//  INICIAR EL SERVIDOR
// ════════════════════════════════════════════════════════

app.listen(PUERTO, () => {
  // app.listen() inicia el servidor HTTP y lo pone a escuchar
  // peticiones en el puerto especificado.
  // El callback se ejecuta UNA VEZ cuando el servidor está listo.
  // Desde este momento, el proceso Node.js no termina solo;
  // se queda corriendo esperando peticiones (event loop activo).

  console.log("\n========================================");
  console.log("  📋 CRUD DE TAREAS — Express + Mongoose");
  console.log("========================================");
  console.log(`  ✅ Servidor corriendo: http://localhost:${PUERTO}`);
  console.log(`  📡 Conectando a MongoDB...`);
  console.log("\n  🧪 GUÍA RÁPIDA DE PRUEBAS EN POSTMAN:");
  console.log("  ──────────────────────────────────────");
  console.log("  PASO 1: Cargar datos de prueba");
  console.log(`          POST http://localhost:${PUERTO}/api/seed`);
  console.log("\n  PASO 2: Leer todas las tareas");
  console.log(`          GET  http://localhost:${PUERTO}/api/tareas`);
  console.log("\n  PASO 3: Crear una tarea nueva");
  console.log(`          POST http://localhost:${PUERTO}/api/tareas`);
  console.log('          Body: { "titulo": "Nueva tarea", "prioridad": "alta" }');
  console.log("\n  PASO 4: Actualizar una tarea (usa un ID del paso 2)");
  console.log(`          PATCH http://localhost:${PUERTO}/api/tareas/<id>`);
  console.log('          Body: { "estado": "completada" }');
  console.log("\n  PASO 5: Eliminar lógicamente");
  console.log(`          DELETE http://localhost:${PUERTO}/api/tareas/<id>`);
  console.log("\n  FILTROS DISPONIBLES:");
  console.log(`          GET /api/tareas?estado=pendiente`);
  console.log(`          GET /api/tareas?prioridad=urgente`);
  console.log(`          GET /api/tareas?buscar=node`);
  console.log(`          GET /api/tareas?pagina=1&limite=3`);
  console.log("\n  Ctrl + C para detener el servidor\n");
});

// ============================================================
//  📝 RESUMEN FINAL — LO QUE APRENDISTE EN ESTA INVESTIGACIÓN
// ============================================================
//
//  1. CRUD son las 4 operaciones básicas de cualquier sistema de datos:
//     Create → Read → Update → Delete.
//     Toda aplicación real las implementa de alguna forma.
//
//  2. En REST, cada operación CRUD tiene un método HTTP:
//     POST → CREATE, GET → READ, PUT/PATCH → UPDATE, DELETE → DELETE.
//
//  3. PUT vs PATCH:
//     PUT = actualiza el recurso completo (envías todos los campos)
//     PATCH = actualiza solo los campos que envías (más eficiente)
//
//  4. Borrado lógico vs físico:
//     Lógico = activo: false (el dato sigue en BD, es recuperable)
//     Físico = findByIdAndDelete (el dato desaparece para siempre)
//     En producción casi siempre preferimos borrado lógico.
//
//  5. El Schema de Mongoose define estructura, tipos y validaciones.
//     Si los datos no cumplen el Schema → ValidationError → 400.
//
//  6. Los Hooks (pre/post save) ejecutan lógica automáticamente
//     antes o después de ciertas operaciones de Mongoose.
//
//  7. La paginación es obligatoria en producción:
//     .skip((pagina-1)*limite).limit(limite)
//     Nunca devuelvas miles de registros sin paginar.
//
//  8. Promise.all() ejecuta múltiples consultas en paralelo,
//     reduciendo el tiempo de respuesta cuando necesitas
//     resultados de varias consultas independientes.
//
//  9. Los códigos HTTP comunican el resultado:
//     201 = creado, 200 = éxito, 400 = datos inválidos,
//     404 = no encontrado, 500 = error del servidor.
//
//  10. DRY (Don't Repeat Yourself): centraliza la lógica repetida
//      en funciones auxiliares como manejarErrorMongoose() y esIdValido().
//      Tu código será más limpio y fácil de mantener.
// ============================================================