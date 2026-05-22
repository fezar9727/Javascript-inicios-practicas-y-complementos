// ============================================================
//  📘 INVESTIGACIÓN #9 — ¿QUÉ ES UN CRUD?
// ============================================================
//
//  CRUD es un acrónimo que representa las 4 operaciones
//  básicas que se pueden hacer sobre datos en cualquier
//  sistema de información o base de datos:
//
//  C → CREATE  (Crear)
//  R → READ    (Leer / Consultar)
//  U → UPDATE  (Actualizar)
//  D → DELETE  (Eliminar)
//
//  CRUD es el concepto más fundamental del desarrollo backend.
//  Prácticamente TODA aplicación que maneja datos implementa
//  estas 4 operaciones de alguna forma.
//
//  RELACIÓN CRUD CON HTTP Y MongoDB/SQL:
//  ──────────────────────────────────────
//  ┌──────────┬────────────┬─────────────────────┬──────────────────────┐
//  │  CRUD    │ Método HTTP│ MongoDB (Mongoose)   │ SQL                  │
//  ├──────────┼────────────┼─────────────────────┼──────────────────────┤
//  │ CREATE   │ POST       │ .save() / insertOne  │ INSERT INTO          │
//  │ READ     │ GET        │ .find() / findById   │ SELECT               │
//  │ UPDATE   │ PUT/PATCH  │ .findByIdAndUpdate   │ UPDATE SET           │
//  │ DELETE   │ DELETE     │ .findByIdAndDelete   │ DELETE FROM          │
//  └──────────┴────────────┴─────────────────────┴──────────────────────┘
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES UN BACKEND?
//  ─────────────────────────────────────────────────────────
//  El backend es la parte del sistema que corre en el SERVIDOR.
//  El usuario no lo ve directamente. Se encarga de:
//  - Manejar la lógica de negocio
//  - Comunicarse con la base de datos
//  - Autenticar usuarios
//  - Procesar y devolver datos al frontend
//
//  Frontend ←──── HTTP/JSON ────▶ Backend ←──── ODM ────▶ Base de datos
//  (React/Vue)               (Node.js/Express)         (MongoDB/PostgreSQL)
//
//  ─────────────────────────────────────────────────────────
//  ARQUITECTURA DE UN CRUD EN EXPRESS + MONGOOSE
//  ─────────────────────────────────────────────────────────
//
//  Una buena arquitectura separa el código en capas:
//
//  📁 src/
//  ├── 📁 models/         → Schemas y Models de Mongoose
//  │   └── Tarea.js
//  ├── 📁 routes/         → Definición de las rutas (URLs)
//  │   └── tareas.routes.js
//  ├── 📁 controllers/    → Lógica de cada ruta
//  │   └── tareas.controller.js
//  ├── 📁 middlewares/    → Funciones intermedias (auth, validación)
//  │   └── auth.middleware.js
//  └── index.js           → Punto de entrada de la app
//
//  En este archivo de investigación ponemos TODO en un solo
//  archivo para facilitar el aprendizaje. En proyectos reales
//  se separa en la estructura de arriba.
//
//  ─────────────────────────────────────────────────────────
//  LAS 4 OPERACIONES CRUD EN DETALLE
//  ─────────────────────────────────────────────────────────
//
//  ── CREATE (Crear) ──────────────────────────────────────
//  → Insertar un nuevo registro en la base de datos.
//  → HTTP: POST /api/tareas
//  → Body JSON: { "titulo": "Mi tarea", "descripcion": "..." }
//  → Respuesta: 201 Created + el objeto creado con su _id
//
//  ── READ (Leer) ─────────────────────────────────────────
//  Hay dos variantes:
//  a) Leer TODOS los registros:
//     → HTTP: GET /api/tareas
//     → Puede incluir filtros, paginación, ordenamiento
//     → Respuesta: 200 OK + array de objetos
//
//  b) Leer UN registro por ID:
//     → HTTP: GET /api/tareas/:id
//     → Respuesta: 200 OK + el objeto, o 404 si no existe
//
//  ── UPDATE (Actualizar) ──────────────────────────────────
//  Hay dos variantes:
//  a) PUT → Actualización COMPLETA (reemplaza todo el objeto)
//     → HTTP: PUT /api/tareas/:id
//     → Body: todos los campos nuevos
//
//  b) PATCH → Actualización PARCIAL (solo los campos enviados)
//     → HTTP: PATCH /api/tareas/:id
//     → Body: solo los campos a cambiar
//
//  ── DELETE (Eliminar) ────────────────────────────────────
//  Dos estrategias:
//  a) BORRADO FÍSICO: elimina el registro para siempre
//     → Más simple, pero irreversible
//
//  b) BORRADO LÓGICO: cambia un campo 'activo' a false
//     → Conserva historial, permite recuperar datos
//     → Más usado en producción
//
//  ─────────────────────────────────────────────────────────
//  PAGINACIÓN (buena práctica en READ)
//  ─────────────────────────────────────────────────────────
//  Cuando hay miles de registros, no devuelves todos de una vez.
//  Divides los resultados en "páginas":
//
//  GET /api/tareas?pagina=1&limite=10
//  → Devuelve los primeros 10 resultados
//
//  GET /api/tareas?pagina=2&limite=10
//  → Devuelve los registros del 11 al 20
//
//  En Mongoose:
//  .skip((pagina - 1) * limite)  → Cuántos saltar
//  .limit(limite)                → Cuántos devolver
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — CRUD completo con Express + Mongoose
// ============================================================
//
//  INSTRUCCIONES:
//  1. npm install express mongoose dotenv
//  2. Crea .env con:
//     MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@cluster.mongodb.net/tareasDB
//     PUERTO=3000
//  3. node 09_crud.js
//  4. POST http://localhost:3000/api/seed  (carga datos de prueba)
//  5. Prueba las rutas del CRUD
//
//  RUTAS DEL CRUD:
//  ───────────────
//  CREATE → POST   /api/tareas
//  READ   → GET    /api/tareas
//  READ   → GET    /api/tareas/:id
//  UPDATE → PUT    /api/tareas/:id
//  UPDATE → PATCH  /api/tareas/:id
//  DELETE → DELETE /api/tareas/:id  (borrado lógico)
//  DELETE → DELETE /api/tareas/:id/permanente  (borrado físico)
//
//  EXTRAS:
//  GET /api/tareas?estado=pendiente   → filtrar por estado
//  GET /api/tareas?pagina=1&limite=3  → paginación
//  GET /api/tareas?orden=prioridad    → ordenar
//
// ============================================================

"use strict";

require("dotenv").config();

const express  = require("express");
const mongoose = require("mongoose");

const app    = express();
const PUERTO = process.env.PUERTO || 3000;

app.use(express.json());

// ════════════════════════════════════════════════════════
//  CONEXIÓN A MONGODB
// ════════════════════════════════════════════════════════
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("\n❌ ERROR: No se encontró MONGODB_URI en el .env");
  console.error("   Crea el .env con:");
  console.error("   MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@cluster.mongodb.net/tareasDB\n");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("\n✅ Conectado a MongoDB exitosamente");
    console.log(`   Base de datos: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error("\n❌ Error conectando a MongoDB:", err.message);
    process.exit(1);
  });

mongoose.connection.on("disconnected", () => console.log("⚠️  Desconectado de MongoDB"));

// ════════════════════════════════════════════════════════
//  SCHEMA Y MODEL — Definición de la estructura de Tarea
// ════════════════════════════════════════════════════════
const tareaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      minlength: [3,   "El título debe tener al menos 3 caracteres"],
      maxlength: [100, "El título no puede superar 100 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, "La descripción no puede superar 500 caracteres"],
      default: "",
    },
    estado: {
      type: String,
      // enum: solo acepta estos valores exactos
      enum: {
        values:  ["pendiente", "en_progreso", "completada", "cancelada"],
        message: "Estado inválido. Usa: pendiente, en_progreso, completada, cancelada",
      },
      default: "pendiente",
    },
    prioridad: {
      type: String,
      enum: {
        values:  ["baja", "media", "alta", "urgente"],
        message: "Prioridad inválida. Usa: baja, media, alta, urgente",
      },
      default: "media",
    },
    fechaLimite: {
      type: Date,
      validate: {
        validator: function (fecha) {
          // La fecha límite no puede ser en el pasado
          if (!fecha) return true; // Es opcional
          return fecha >= new Date();
        },
        message: "La fecha límite no puede ser en el pasado",
      },
    },
    etiquetas: {
      type: [String], // Array de strings
      default: [],
    },
    activo: {
      type: Boolean,
      default: true,
    },
    completadaEn: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt y updatedAt automáticos
    versionKey: false,
  }
);

// ────────────────────────────────────────────────────────
//  HOOK — Cuando se marca como completada, guarda la fecha
// ────────────────────────────────────────────────────────
tareaSchema.pre("save", function (next) {
  if (this.isModified("estado") && this.estado === "completada") {
    this.completadaEn = new Date();
    console.log(`  [Hook] Tarea "${this.titulo}" marcada como completada`);
  }
  next();
});

// ────────────────────────────────────────────────────────
//  MÉTODO DE INSTANCIA: resumen de la tarea
// ────────────────────────────────────────────────────────
tareaSchema.methods.resumen = function () {
  return `[${this.prioridad.toUpperCase()}] ${this.titulo} — ${this.estado}`;
};

// ────────────────────────────────────────────────────────
//  MÉTODOS ESTÁTICOS: consultas reutilizables
// ────────────────────────────────────────────────────────
tareaSchema.statics.porEstado = function (estado) {
  return this.find({ estado, activo: true }).sort({ createdAt: -1 });
};

tareaSchema.statics.porPrioridad = function (prioridad) {
  return this.find({ prioridad, activo: true }).sort({ createdAt: -1 });
};

const Tarea = mongoose.model("Tarea", tareaSchema);

// ════════════════════════════════════════════════════════
//  RUTAS DEL CRUD
// ════════════════════════════════════════════════════════

// ── GET / → Información de la API ────────────────────────
app.get("/", (req, res) => {
  res.json({
    mensaje:     "📋 API CRUD de Tareas — Express + Mongoose",
    conexionDB:  mongoose.connection.readyState === 1 ? "✅ Conectada" : "❌ Desconectada",
    instruccion: "Primero ejecuta POST /api/seed para cargar datos de prueba",
    operacionesCRUD: {
      "CREATE → POST   /api/tareas":              "Crear una nueva tarea",
      "READ   → GET    /api/tareas":              "Listar todas las tareas",
      "READ   → GET    /api/tareas/:id":          "Ver una tarea por ID",
      "UPDATE → PUT    /api/tareas/:id":          "Actualizar tarea completa",
      "UPDATE → PATCH  /api/tareas/:id":          "Actualizar tarea parcial",
      "DELETE → DELETE /api/tareas/:id":          "Borrado lógico (activo=false)",
      "DELETE → DELETE /api/tareas/:id/permanente":"Borrado físico definitivo",
    },
    filtrosDisponibles: {
      "?estado=pendiente":        "Filtrar por estado",
      "?prioridad=alta":          "Filtrar por prioridad",
      "?pagina=1&limite=5":       "Paginación",
      "?orden=prioridad":         "Ordenar por prioridad",
      "?buscar=reunión":          "Buscar en título",
    },
  });
});

// ════════════════════════════════════════════════════════
//  C — CREATE: POST /api/tareas
//  Crea una nueva tarea con los datos del body
// ════════════════════════════════════════════════════════
app.post("/api/tareas", async (req, res) => {
  try {
    console.log("\n  📌 CREATE — Creando nueva tarea...");

    // Creamos la instancia con los datos del body
    const nuevaTarea = new Tarea(req.body);

    // .save() guarda en MongoDB y valida el Schema
    const guardada = await nuevaTarea.save();

    console.log(`  ✅ Tarea creada: "${guardada.titulo}" (${guardada._id})`);
    console.log(`     Resumen: ${guardada.resumen()}`); // Método de instancia

    res.status(201).json({
      exito:       true,
      operacion:   "CREATE",
      mensaje:     "Tarea creada exitosamente",
      dato:        guardada,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        exito:   false,
        mensaje: "Error de validación",
        errores: mensajes,
      });
    }
    console.error("  ❌ Error CREATE:", error.message);
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  R — READ: GET /api/tareas
//  Lista todas las tareas con filtros, ordenamiento y paginación
// ════════════════════════════════════════════════════════
app.get("/api/tareas", async (req, res) => {
  try {
    console.log("\n  📖 READ — Consultando tareas...");

    // Extraemos parámetros de la query string
    const {
      estado,
      prioridad,
      buscar,
      orden    = "createdAt",
      pagina   = 1,
      limite   = 10,
    } = req.query;

    // ── Construimos el filtro dinámicamente ──────────────
    const filtro = { activo: true }; // Solo tareas activas

    if (estado)    filtro.estado    = estado;
    if (prioridad) filtro.prioridad = prioridad;

    // Búsqueda por texto en el título (búsqueda parcial, sin importar mayúsculas)
    if (buscar) {
      filtro.titulo = { $regex: buscar, $options: "i" };
    }

    // ── Configuramos ordenamiento ────────────────────────
    const opcionesOrden = {
      createdAt:  { createdAt: -1 },   // Más reciente primero
      titulo:     { titulo: 1 },        // Alfabético
      prioridad:  { prioridad: -1 },    // Alta prioridad primero
      estado:     { estado: 1 },        // Por estado
    };
    const ordenamiento = opcionesOrden[orden] || { createdAt: -1 };

    // ── Paginación ───────────────────────────────────────
    const paginaNum  = Math.max(1, parseInt(pagina));
    const limiteNum  = Math.min(50, Math.max(1, parseInt(limite))); // Máx 50
    const skip       = (paginaNum - 1) * limiteNum;

    // ── Ejecutamos la consulta ───────────────────────────
    // Hacemos dos consultas en paralelo con Promise.all (más eficiente)
    const [tareas, total] = await Promise.all([
      Tarea.find(filtro).sort(ordenamiento).skip(skip).limit(limiteNum),
      Tarea.countDocuments(filtro),
    ]);

    const totalPaginas = Math.ceil(total / limiteNum);

    console.log(`  ✅ ${tareas.length} de ${total} tarea(s) encontradas`);

    res.status(200).json({
      exito:       true,
      operacion:   "READ (listar todos)",
      total,
      paginacion: {
        paginaActual:  paginaNum,
        totalPaginas,
        limite:        limiteNum,
        hayAnterior:   paginaNum > 1,
        haySiguiente:  paginaNum < totalPaginas,
      },
      filtrosAplicados: { estado, prioridad, buscar, orden },
      datos: tareas,
    });
  } catch (error) {
    console.error("  ❌ Error READ:", error.message);
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  R — READ: GET /api/tareas/:id
//  Obtiene UNA tarea por su _id de MongoDB
// ════════════════════════════════════════════════════════
app.get("/api/tareas/:id", async (req, res) => {
  try {
    console.log(`\n  📖 READ — Buscando tarea con id: ${req.params.id}`);

    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({
        exito:   false,
        mensaje: `No se encontró ninguna tarea con id: ${req.params.id}`,
      });
    }

    if (!tarea.activo) {
      return res.status(404).json({
        exito:   false,
        mensaje: "Esta tarea fue eliminada (borrado lógico)",
      });
    }

    console.log(`  ✅ Tarea encontrada: "${tarea.titulo}"`);

    res.status(200).json({
      exito:     true,
      operacion: "READ (una tarea)",
      dato:      tarea,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "ID con formato inválido" });
    }
    console.error("  ❌ Error READ (id):", error.message);
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  U — UPDATE: PUT /api/tareas/:id
//  Actualización COMPLETA — reemplaza todos los campos
// ════════════════════════════════════════════════════════
app.put("/api/tareas/:id", async (req, res) => {
  try {
    console.log(`\n  ✏️  UPDATE (PUT) — Actualizando tarea: ${req.params.id}`);

    const { titulo, descripcion, estado, prioridad, fechaLimite, etiquetas } = req.body;

    // Con PUT, si no envían un campo, lo dejamos como estaba
    // pero la intención es reemplazar todo
    const datosActualizados = {
      titulo,
      descripcion,
      estado,
      prioridad,
      fechaLimite,
      etiquetas,
    };

    // Removemos campos undefined para no sobreescribir con null
    Object.keys(datosActualizados).forEach(
      (k) => datosActualizados[k] === undefined && delete datosActualizados[k]
    );

    const actualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      {
        new:          true,  // Devuelve el documento ACTUALIZADO
        runValidators: true, // Ejecuta validaciones del Schema
      }
    );

    if (!actualizada) {
      return res.status(404).json({ exito: false, mensaje: "Tarea no encontrada" });
    }

    // Si se marcó como completada, actualizamos completadaEn
    if (estado === "completada" && !actualizada.completadaEn) {
      actualizada.completadaEn = new Date();
      await actualizada.save();
    }

    console.log(`  ✅ Tarea actualizada (PUT): "${actualizada.titulo}"`);

    res.status(200).json({
      exito:     true,
      operacion: "UPDATE (PUT — actualización completa)",
      mensaje:   "Tarea actualizada exitosamente",
      dato:      actualizada,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ exito: false, errores: mensajes });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "ID con formato inválido" });
    }
    console.error("  ❌ Error UPDATE (PUT):", error.message);
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  U — UPDATE: PATCH /api/tareas/:id
//  Actualización PARCIAL — solo los campos enviados
// ════════════════════════════════════════════════════════
app.patch("/api/tareas/:id", async (req, res) => {
  try {
    console.log(`\n  ✏️  UPDATE (PATCH) — Campos a modificar:`, Object.keys(req.body));

    // Con PATCH pasamos directamente req.body
    // Mongoose solo actualiza los campos que lleguen
    const actualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // $set actualiza SOLO los campos enviados
      { new: true, runValidators: true }
    );

    if (!actualizada) {
      return res.status(404).json({ exito: false, mensaje: "Tarea no encontrada" });
    }

    console.log(`  ✅ Tarea actualizada (PATCH): "${actualizada.titulo}"`);

    res.status(200).json({
      exito:            true,
      operacion:        "UPDATE (PATCH — actualización parcial)",
      mensaje:          "Tarea actualizada parcialmente",
      camposModificados: Object.keys(req.body),
      dato:             actualizada,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ exito: false, errores: mensajes });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "ID con formato inválido" });
    }
    console.error("  ❌ Error UPDATE (PATCH):", error.message);
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  D — DELETE: DELETE /api/tareas/:id
//  BORRADO LÓGICO (recomendado para producción)
//  Cambia activo a false en vez de eliminar
// ════════════════════════════════════════════════════════
app.delete("/api/tareas/:id", async (req, res) => {
  try {
    console.log(`\n  🗑️  DELETE (lógico) — Desactivando tarea: ${req.params.id}`);

    const desactivada = await Tarea.findByIdAndUpdate(
      req.params.id,
      { activo: false }, // Solo cambiamos activo a false
      { new: true }
    );

    if (!desactivada) {
      return res.status(404).json({ exito: false, mensaje: "Tarea no encontrada" });
    }

    console.log(`  ✅ Tarea desactivada: "${desactivada.titulo}"`);

    res.status(200).json({
      exito:     true,
      operacion: "DELETE (borrado lógico — activo = false)",
      mensaje:   `Tarea '${desactivada.titulo}' desactivada. No aparecerá en las consultas.`,
      dato:      desactivada,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "ID con formato inválido" });
    }
    console.error("  ❌ Error DELETE (lógico):", error.message);
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  D — DELETE: DELETE /api/tareas/:id/permanente
//  BORRADO FÍSICO — elimina para siempre de la BD
//  ⚠️  Úsalo con cuidado — no se puede deshacer
// ════════════════════════════════════════════════════════
app.delete("/api/tareas/:id/permanente", async (req, res) => {
  try {
    console.log(`\n  🗑️  DELETE (físico) — Eliminando definitivamente: ${req.params.id}`);

    // .findByIdAndDelete() elimina completamente el documento
    const eliminada = await Tarea.findByIdAndDelete(req.params.id);

    if (!eliminada) {
      return res.status(404).json({ exito: false, mensaje: "Tarea no encontrada" });
    }

    console.log(`  ✅ Tarea eliminada permanentemente: "${eliminada.titulo}"`);

    res.status(200).json({
      exito:     true,
      operacion: "DELETE (borrado físico — eliminación permanente)",
      mensaje:   `Tarea '${eliminada.titulo}' eliminada permanentemente. Esta acción no se puede deshacer.`,
      dato:      eliminada,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "ID con formato inválido" });
    }
    console.error("  ❌ Error DELETE (físico):", error.message);
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  RUTA SEED — Inserta datos de prueba
// ════════════════════════════════════════════════════════
app.post("/api/seed", async (req, res) => {
  try {
    await Tarea.deleteMany({});

    const tareas = await Tarea.insertMany([
      {
        titulo:      "Estudiar Node.js",
        descripcion: "Revisar módulos nativos: os, path, fs y el Event Loop",
        estado:      "completada",
        prioridad:   "alta",
        etiquetas:   ["estudios", "programacion", "nodejs"],
      },
      {
        titulo:      "Hacer ejercicio",
        descripcion: "30 minutos de cardio y 20 de pesas",
        estado:      "pendiente",
        prioridad:   "media",
        etiquetas:   ["salud", "rutina"],
      },
      {
        titulo:      "Investigar Express y JWT",
        descripcion: "Entender middlewares, rutas protegidas y autenticación",
        estado:      "en_progreso",
        prioridad:   "urgente",
        etiquetas:   ["estudios", "programacion", "backend"],
      },
      {
        titulo:      "Comprar mercado",
        descripcion: "Leche, pan, huevos, frutas y verduras",
        estado:      "pendiente",
        prioridad:   "baja",
        etiquetas:   ["hogar", "compras"],
      },
      {
        titulo:      "Revisar correos pendientes",
        descripcion: "Revisar y responder correos importantes de la semana",
        estado:      "pendiente",
        prioridad:   "media",
        etiquetas:   ["trabajo", "comunicacion"],
      },
      {
        titulo:      "Entrega proyecto MongoDB",
        descripcion: "Subir la investigación de MongoDB al repositorio de GitHub",
        estado:      "en_progreso",
        prioridad:   "urgente",
        etiquetas:   ["estudios", "github", "mongodb"],
      },
    ]);

    res.status(201).json({
      exito:   true,
      mensaje: "✅ Datos de prueba insertados exitosamente",
      total:   tareas.length,
      datos:   tareas,
    });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  RUTA ESTADÍSTICAS — Extra útil para demostrar READ avanzado
// ════════════════════════════════════════════════════════
app.get("/api/estadisticas", async (req, res) => {
  try {
    // Promise.all ejecuta múltiples consultas al mismo tiempo (más rápido)
    const [total, porEstado, porPrioridad] = await Promise.all([
      Tarea.countDocuments({ activo: true }),
      Tarea.aggregate([
        { $match: { activo: true } },
        { $group: { _id: "$estado", cantidad: { $sum: 1 } } },
        { $sort:  { cantidad: -1 } },
      ]),
      Tarea.aggregate([
        { $match: { activo: true } },
        { $group: { _id: "$prioridad", cantidad: { $sum: 1 } } },
        { $sort:  { cantidad: -1 } },
      ]),
    ]);

    res.json({
      exito:        true,
      totalTareas:  total,
      porEstado:    porEstado.reduce((acc, e) => ({ ...acc, [e._id]: e.cantidad }), {}),
      porPrioridad: porPrioridad.reduce((acc, e) => ({ ...acc, [e._id]: e.cantidad }), {}),
    });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  404 y error handler
// ════════════════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({ exito: false, mensaje: `Ruta '${req.method} ${req.url}' no existe` });
});

app.use((err, req, res, next) => {
  console.error("❌ Error global:", err.stack);
  res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
});

// ════════════════════════════════════════════════════════
//  Iniciar servidor
// ════════════════════════════════════════════════════════
app.listen(PUERTO, () => {
  console.log("\n========================================");
  console.log("  📋 CRUD DE TAREAS — Express + Mongoose");
  console.log("========================================");
  console.log(`  ✅ Servidor: http://localhost:${PUERTO}`);
  console.log("\n  Pasos:");
  console.log("  1. POST http://localhost:" + PUERTO + "/api/seed");
  console.log("  2. GET  http://localhost:" + PUERTO + "/api/tareas");
  console.log("  3. GET  http://localhost:" + PUERTO + "/api/estadisticas");
  console.log("\n  Filtros de ejemplo:");
  console.log("  GET /api/tareas?estado=pendiente");
  console.log("  GET /api/tareas?prioridad=urgente");
  console.log("  GET /api/tareas?buscar=node");
  console.log("  GET /api/tareas?pagina=1&limite=3");
  console.log("\n  Ctrl + C para detener\n");
});