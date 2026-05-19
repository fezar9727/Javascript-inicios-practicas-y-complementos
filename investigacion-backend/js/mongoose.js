// ============================================================
//  📘 INVESTIGACIÓN #6 — ¿QUÉ ES MONGOOSE?
// ============================================================
//
//  Mongoose es una LIBRERÍA (ODM) para Node.js que facilita
//  trabajar con MongoDB. Es el puente entre tu código JavaScript
//  y tu base de datos MongoDB.
//
//  ODM = Object Document Mapper
//  (Mapeador de Objetos a Documentos)
//
//  ¿POR QUÉ USAR MONGOOSE Y NO CONECTARSE DIRECTO A MONGODB?
//  ──────────────────────────────────────────────────────────
//  MongoDB tiene su propio driver para Node.js, pero es muy
//  básico. Mongoose agrega encima:
//
//  1. 📋 SCHEMAS (Esquemas):
//     Define la ESTRUCTURA de tus documentos. Con MongoDB puro
//     cualquier documento puede tener cualquier campo sin reglas.
//     Con Mongoose defines exactamente qué campos debe tener
//     cada documento, qué tipo de dato es y qué validaciones cumplir.
//
//  2. ✅ VALIDACIÓN AUTOMÁTICA:
//     Valida los datos ANTES de guardarlos en MongoDB.
//     Si faltan campos requeridos o los tipos son incorrectos,
//     lanza un error claro y descriptivo. No tienes que
//     validar manualmente en cada ruta.
//
//  3. 🏗️  MODELS (Modelos):
//     La clase con la que haces todas las consultas.
//     Te da métodos listos: .find(), .save(),
//     .findById(), .findByIdAndUpdate(), .deleteOne(), etc.
//
//  4. 🔗 MIDDLEWARE / HOOKS:
//     Funciones que se ejecutan automáticamente ANTES o DESPUÉS
//     de ciertas operaciones.
//     Ej: hashear contraseña antes de guardar (pre-save hook).
//
//  5. 🔄 POPULATION (populate):
//     Reemplaza un ObjectId con los datos completos del documento
//     referenciado. Es el equivalente al JOIN de SQL, pero más simple.
//
//  6. 🧩 MÉTODOS PERSONALIZADOS:
//     Puedes agregar tus propios métodos al Schema.
//
//  ─────────────────────────────────────────────────────────
//  CONCEPTOS CLAVE DE MONGOOSE:
//  ─────────────────────────────────────────────────────────
//
//  📋 SCHEMA — El "molde" que deben seguir los documentos:
//  ────────────────────────────────────────────────────────
//  const usuarioSchema = new Schema({
//    nombre: { type: String, required: true },
//    email:  { type: String, required: true, unique: true },
//    edad:   { type: Number, min: 0, max: 120 },
//    activo: { type: Boolean, default: true }
//  });
//
//  📦 MODEL — Interfaz para interactuar con la colección:
//  ────────────────────────────────────────────────────────
//  const Usuario = mongoose.model('Usuario', usuarioSchema);
//  // → Mongoose usará la colección 'usuarios' en MongoDB
//  //   (pluraliza y pone en minúscula el nombre del modelo)
//
//  🔢 TIPOS DE DATOS EN MONGOOSE:
//  ────────────────────────────────
//  String   → Textos: "Hola", "Juan"
//  Number   → Números: 42, 3.14
//  Boolean  → true / false
//  Date     → Fechas: new Date()
//  Array    → Arreglos: [1,2,3], ["a","b"]
//  ObjectId → ID de referencia a otro documento
//  Mixed    → Cualquier tipo (sin validación)
//
//  ✅ VALIDADORES COMUNES:
//  ────────────────────────
//  required: true           → Campo obligatorio
//  unique: true             → No puede repetirse en la colección
//  default: valor           → Valor por defecto si no se envía
//  min / max                → Valor mínimo/máximo (Numbers)
//  minlength / maxlength    → Longitud mínima/máxima (Strings)
//  enum: ['a','b','c']      → Solo acepta esos valores
//  trim: true               → Elimina espacios inicio y fin
//  lowercase: true          → Guarda siempre en minúsculas
//  validate: función        → Validación personalizada
//
//  🔗 POPULATION — Referencias entre colecciones:
//  ────────────────────────────────────────────────
//  En vez de copiar todos los datos de otra colección,
//  guardas el _id y usas populate() al consultar.
//
//  pedidoSchema = {
//    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
//  }
//  Pedido.find().populate('usuario') → trae los datos completos
//  del usuario en vez de solo el _id
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — Mongoose + Express + MongoDB Atlas
// ============================================================
//
//  INSTRUCCIONES PARA EJECUTAR:
//  ─────────────────────────────
//  1. Tener cuenta en MongoDB Atlas con cluster M0 gratuito.
//     (Ver instrucciones en 05_mongodb_no_relacional.js)
//
//  2. Instalar dependencias:
//        npm install express mongoose dotenv
//
//  3. Crear archivo .env en esta misma carpeta:
//        MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@cluster0.xxxxx.mongodb.net/tiendaDB
//        PUERTO=3000
//     ⚠️  Reemplaza USUARIO, PASSWORD y el cluster con los tuyos reales.
//
//  4. Ejecutar el servidor:
//        node 06_mongoose.js
//
//  5. Primera vez — cargar datos de prueba (en Postman o navegador):
//        POST http://localhost:3000/api/seed
//
//  6. Probar las rutas:
//        GET  http://localhost:3000/api/productos
//        GET  http://localhost:3000/api/categorias
//
// ============================================================

"use strict";

// ─────────────────────────────────────────
//  IMPORTACIONES
// ─────────────────────────────────────────

// dotenv carga las variables del archivo .env a process.env
// Debe ser SIEMPRE la primera línea antes de usar process.env
require("dotenv").config();

const express  = require("express");
const mongoose = require("mongoose");

// ─────────────────────────────────────────
//  CONFIGURACIÓN INICIAL
// ─────────────────────────────────────────
const app    = express();
const PUERTO = process.env.PUERTO || 3000;

// Middleware: permite recibir JSON en el body de las peticiones
app.use(express.json());

// ════════════════════════════════════════════════════════
//  CONEXIÓN A MONGODB ATLAS
// ════════════════════════════════════════════════════════
const MONGODB_URI = process.env.MONGODB_URI;

// Verificamos que exista la URI antes de intentar conectar
if (!MONGODB_URI) {
  console.error("\n❌ ERROR: No se encontró MONGODB_URI en el archivo .env");
  console.error("   Crea un archivo .env con:");
  console.error("   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tiendaDB\n");
  process.exit(1); // Termina el proceso si no hay conexión configurada
}

// mongoose.connect() retorna una Promesa
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("\n✅ Conectado a MongoDB Atlas exitosamente");
    console.log(`   Base de datos: ${mongoose.connection.name}`);
  })
  .catch((error) => {
    console.error("\n❌ Error al conectar a MongoDB:", error.message);
    console.error("   Verifica tu MONGODB_URI en el archivo .env");
    process.exit(1);
  });

// Eventos para monitorear la conexión
mongoose.connection.on("disconnected", () => console.log("⚠️  Desconectado de MongoDB"));
mongoose.connection.on("error", (err) => console.error("❌ Error MongoDB:", err.message));

// ════════════════════════════════════════════════════════
//  SCHEMAS — Definen la estructura de los documentos
// ════════════════════════════════════════════════════════

// ── Schema de CATEGORÍA ──────────────────────────────────
const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la categoría es obligatorio"],
      unique: true,      // No puede haber dos categorías con el mismo nombre
      trim: true,        // Elimina espacios al inicio y al fin
      lowercase: true,   // Siempre guarda en minúsculas
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede superar 50 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [200, "La descripción no puede superar 200 caracteres"],
    },
    activa: {
      type: Boolean,
      default: true, // Si no se envía, será true por defecto
    },
  },
  {
    timestamps: true,  // Agrega createdAt y updatedAt automáticamente
    versionKey: false, // Quita el campo __v que Mongoose agrega por defecto
  }
);

// ── Schema de PRODUCTO ───────────────────────────────────
const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [100, "El nombre no puede superar 100 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, "La descripción no puede superar 500 caracteres"],
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: [0, "El stock no puede ser negativo"],
      default: 0,
    },
    // Referencia a la colección "Categoria"
    // Guardamos solo el _id de la categoría, no toda su información
    categoria: {
      type: mongoose.Schema.Types.ObjectId, // Tipo especial: ObjectId de MongoDB
      ref: "Categoria",                     // Nombre del Model al que apunta
      required: [true, "La categoría es obligatoria"],
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ────────────────────────────────────────────────────────
//  HOOKS (Middleware de Mongoose)
//  Se ejecutan automáticamente antes/después de operaciones
// ────────────────────────────────────────────────────────

// pre('save') → se ejecuta ANTES de guardar en MongoDB
productoSchema.pre("save", function (next) {
  // 'this' apunta al documento que se va a guardar
  console.log(`  [Hook pre-save]  Guardando: "${this.nombre}"`);
  next(); // OBLIGATORIO: llama next() para continuar el flujo
});

// post('save') → se ejecuta DESPUÉS de guardar exitosamente
productoSchema.post("save", function (doc) {
  console.log(`  [Hook post-save] Guardado con _id: ${doc._id}`);
});

// ────────────────────────────────────────────────────────
//  MÉTODO DE INSTANCIA
//  Se llama sobre un documento individual (una instancia)
// ────────────────────────────────────────────────────────
productoSchema.methods.formatearPrecio = function () {
  // 'this' apunta al documento actual
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(this.precio);
};

// ────────────────────────────────────────────────────────
//  MÉTODO ESTÁTICO
//  Se llama sobre el Model completo (no sobre una instancia)
// ────────────────────────────────────────────────────────
productoSchema.statics.buscarPorPrecioMaximo = function (precioMax) {
  // $lte = less than or equal (menor o igual que)
  return this.find({ precio: { $lte: precioMax } });
};

// ════════════════════════════════════════════════════════
//  MODELS — Interfaz para interactuar con las colecciones
//  mongoose.model('NombreModelo', schema)
//  Mongoose creará/usará la colección en plural y minúsculas:
//  'Categoria' → colección 'categorias'
//  'Producto'  → colección 'productos'
// ════════════════════════════════════════════════════════
const Categoria = mongoose.model("Categoria", categoriaSchema);
const Producto  = mongoose.model("Producto",  productoSchema);

// ════════════════════════════════════════════════════════
//  RUTAS DE LA API
// ════════════════════════════════════════════════════════

// ── Raíz / ───────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    mensaje: "🍃 API con Mongoose + MongoDB Atlas",
    estadoConexion: mongoose.connection.readyState === 1 ? "✅ Conectado" : "❌ Sin conexión",
    baseDeDatos: mongoose.connection.name,
    instruccion: "Primero ejecuta POST /api/seed para cargar datos de prueba",
    rutasDisponibles: [
      "POST   /api/seed              → Cargar datos de prueba",
      "GET    /api/categorias        → Listar todas las categorías",
      "GET    /api/categorias/:id    → Obtener una categoría por ID",
      "POST   /api/categorias        → Crear nueva categoría",
      "DELETE /api/categorias/:id    → Eliminar categoría",
      "GET    /api/productos         → Listar todos los productos",
      "GET    /api/productos/:id     → Obtener un producto por ID",
      "POST   /api/productos         → Crear nuevo producto",
      "PUT    /api/productos/:id     → Actualizar producto",
      "DELETE /api/productos/:id     → Desactivar producto (borrado lógico)",
    ],
  });
});

// ════════════════════════════════════════════════════════
//  RUTAS — CATEGORÍAS
// ════════════════════════════════════════════════════════

// GET /api/categorias → Listar todas las categorías
app.get("/api/categorias", async (req, res) => {
  try {
    // .find({}) busca TODOS los documentos de la colección
    // .sort({ nombre: 1 }) ordena A→Z (1=ASC, -1=DESC)
    const categorias = await Categoria.find({}).sort({ nombre: 1 });
    res.status(200).json({ exito: true, total: categorias.length, datos: categorias });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// GET /api/categorias/:id → Obtener una por ID
app.get("/api/categorias/:id", async (req, res) => {
  try {
    // .findById(id) busca por el campo _id de MongoDB
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ exito: false, mensaje: "Categoría no encontrada" });
    }
    res.status(200).json({ exito: true, dato: categoria });
  } catch (error) {
    // CastError ocurre cuando el ID no tiene formato válido de ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "El ID proporcionado no es válido" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// POST /api/categorias → Crear nueva categoría
app.post("/api/categorias", async (req, res) => {
  try {
    // Creamos una instancia del model con los datos del body
    const nuevaCategoria = new Categoria(req.body);
    // .save() guarda en MongoDB y valida el Schema antes de hacerlo
    const guardada = await nuevaCategoria.save();
    res.status(201).json({ exito: true, mensaje: "Categoría creada exitosamente", dato: guardada });
  } catch (error) {
    // ValidationError: Mongoose rechazó los datos por no cumplir el Schema
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ exito: false, mensaje: "Error de validación", errores: mensajes });
    }
    // Code 11000: violación de campo unique (ya existe ese valor)
    if (error.code === 11000) {
      return res.status(400).json({ exito: false, mensaje: "Ya existe una categoría con ese nombre" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// DELETE /api/categorias/:id → Eliminar categoría
app.delete("/api/categorias/:id", async (req, res) => {
  try {
    // .findByIdAndDelete() busca y elimina en una sola operación
    const eliminada = await Categoria.findByIdAndDelete(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ exito: false, mensaje: "Categoría no encontrada" });
    }
    res.status(200).json({ exito: true, mensaje: "Categoría eliminada exitosamente", dato: eliminada });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "El ID proporcionado no es válido" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  RUTAS — PRODUCTOS
// ════════════════════════════════════════════════════════

// GET /api/productos → Listar todos los productos activos
app.get("/api/productos", async (req, res) => {
  try {
    const productos = await Producto.find({ activo: true })
      // .populate('categoria') reemplaza el ObjectId de categoria
      // con los datos COMPLETOS del documento de esa categoría.
      // Esto es el equivalente a un JOIN en SQL.
      .populate("categoria")
      .sort({ nombre: 1 });
    res.status(200).json({ exito: true, total: productos.length, datos: productos });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// GET /api/productos/:id → Obtener un producto por ID
app.get("/api/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate("categoria");
    if (!producto) {
      return res.status(404).json({ exito: false, mensaje: "Producto no encontrado" });
    }
    // Usamos el método de instancia que definimos en el Schema
    console.log("  Precio formateado:", producto.formatearPrecio());
    res.status(200).json({ exito: true, dato: producto });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "El ID proporcionado no es válido" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// POST /api/productos → Crear nuevo producto
app.post("/api/productos", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    // Populamos para devolver los datos completos de la categoría
    await guardado.populate("categoria");
    res.status(201).json({ exito: true, mensaje: "Producto creado exitosamente", dato: guardado });
  } catch (error) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ exito: false, mensaje: "Error de validación", errores: mensajes });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// PUT /api/productos/:id → Actualizar un producto
app.put("/api/productos/:id", async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,            // Devuelve el documento ACTUALIZADO (no el anterior)
        runValidators: true,  // Ejecuta las validaciones del Schema al actualizar
      }
    ).populate("categoria");

    if (!actualizado) {
      return res.status(404).json({ exito: false, mensaje: "Producto no encontrado" });
    }
    res.status(200).json({ exito: true, mensaje: "Producto actualizado exitosamente", dato: actualizado });
  } catch (error) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ exito: false, mensaje: "Error de validación", errores: mensajes });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "El ID proporcionado no es válido" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// DELETE /api/productos/:id → Borrado LÓGICO (buena práctica)
// En vez de eliminar el registro para siempre, ponemos activo: false
// Así conservamos el historial y podemos reactivarlo si es necesario
app.delete("/api/productos/:id", async (req, res) => {
  try {
    const desactivado = await Producto.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );
    if (!desactivado) {
      return res.status(404).json({ exito: false, mensaje: "Producto no encontrado" });
    }
    res.status(200).json({
      exito: true,
      mensaje: "Producto desactivado (borrado lógico)",
      dato: desactivado,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "El ID proporcionado no es válido" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  RUTA SEED — Inserta datos de prueba en la base de datos
//  Ejecútala PRIMERO antes de probar las demás rutas
// ════════════════════════════════════════════════════════
app.post("/api/seed", async (req, res) => {
  try {
    // Limpiamos las colecciones para empezar desde cero
    await Categoria.deleteMany({});
    await Producto.deleteMany({});

    // Creamos las categorías con insertMany()
    const categorias = await Categoria.insertMany([
      { nombre: "electrónica",  descripcion: "Dispositivos electrónicos y gadgets" },
      { nombre: "accesorios",   descripcion: "Accesorios para computadores" },
      { nombre: "periféricos",  descripcion: "Teclados, mouse, monitores" },
    ]);

    // Tomamos los _id generados para usarlos en los productos
    const electronica = categorias.find((c) => c.nombre === "electrónica");
    const accesorios  = categorias.find((c) => c.nombre === "accesorios");
    const perifericos = categorias.find((c) => c.nombre === "periféricos");

    // Creamos los productos referenciando los _id de las categorías
    const productos = await Producto.insertMany([
      { nombre: "Laptop HP Pavilion", precio: 2500000, stock: 15, categoria: electronica._id, descripcion: "Intel i5, 8GB RAM, 512GB SSD" },
      { nombre: "MacBook Air M2",     precio: 5800000, stock: 8,  categoria: electronica._id, descripcion: "Apple chip M2, 8GB RAM" },
      { nombre: "Mouse Inalámbrico",  precio: 85000,   stock: 50, categoria: accesorios._id,  descripcion: "Bluetooth 1600 DPI" },
      { nombre: "Teclado Mecánico",   precio: 320000,  stock: 30, categoria: perifericos._id, descripcion: "Switches azules" },
      { nombre: 'Monitor LG 27"',     precio: 1200000, stock: 10, categoria: perifericos._id, descripcion: "Full HD 144Hz" },
    ]);

    res.status(201).json({
      exito: true,
      mensaje: "✅ Datos de prueba insertados exitosamente",
      resumen: { categorias: categorias.length, productos: productos.length },
    });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});

// ════════════════════════════════════════════════════════
//  RUTA NO ENCONTRADA — 404
//  Se ejecuta cuando ninguna ruta anterior coincidió
// ════════════════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: `La ruta '${req.method} ${req.url}' no existe en este servidor`,
  });
});

// ════════════════════════════════════════════════════════
//  MANEJO DE ERRORES GLOBALES — 500
//  Se activa cuando se llama next(error) en cualquier ruta
//  Tiene 4 parámetros — así Express lo reconoce como error handler
// ════════════════════════════════════════════════════════
app.use((err, req, res, next) => {
  console.error("❌ Error global:", err.stack);
  res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
});

// ════════════════════════════════════════════════════════
//  INICIAR SERVIDOR
// ════════════════════════════════════════════════════════
app.listen(PUERTO, () => {
  console.log("\n========================================");
  console.log("  🚀 API MONGOOSE + MONGODB ATLAS");
  console.log("========================================");
  console.log(`  ✅ Servidor corriendo en: http://localhost:${PUERTO}`);
  console.log("\n  📋 Primer paso:");
  console.log("     POST http://localhost:" + PUERTO + "/api/seed");
  console.log("\n  📋 Luego prueba:");
  console.log("     GET  http://localhost:" + PUERTO + "/api/productos");
  console.log("     GET  http://localhost:" + PUERTO + "/api/categorias");
  console.log("\n  Presiona Ctrl + C para detener el servidor\n");
});