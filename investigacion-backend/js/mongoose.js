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
//  La idea central: en vez de escribir consultas crudas de MongoDB
//  en formato JSON (como el driver nativo), Mongoose te permite
//  trabajar con CLASES y OBJETOS de JavaScript. Defines un Schema
//  (molde), creas un Model (clase), y usas métodos de ese Model
//  para interactuar con la base de datos de forma orientada a objetos.
//
//  ─────────────────────────────────────────────────────────
//  ¿POR QUÉ USAR MONGOOSE Y NO EL DRIVER NATIVO DE MONGODB?
//  ─────────────────────────────────────────────────────────
//
//  MongoDB tiene su propio driver oficial para Node.js:
//  npm install mongodb
//
//  Con el driver nativo, así creas un documento:
//  const client = new MongoClient(uri);
//  await client.connect();
//  const db = client.db('tiendaDB');
//  const collection = db.collection('productos');
//  await collection.insertOne({ nombre: "Laptop", precio: 2500000 });
//
//  Funciona, pero es muy básico. No hay validación, no hay
//  tipos definidos, no hay métodos preconstruidos. Para cada
//  operación debes escribir todo el código manualmente.
//
//  Mongoose agrega encima del driver nativo:
//
//  1. 📋 SCHEMAS (Esquemas):
//     Define la ESTRUCTURA exacta que deben tener los documentos.
//     Sin Schema, MongoDB acepta cualquier cosa sin validar:
//     { precio: "dos millones" } — string donde debería ser número.
//     Con Schema de Mongoose: precio: { type: Number, required: true }
//     Mongoose rechaza automáticamente datos inválidos.
//
//  2. ✅ VALIDACIÓN AUTOMÁTICA:
//     Valida los datos ANTES de enviarlos a MongoDB.
//     Si faltan campos requeridos, los tipos son incorrectos,
//     o un valor no está en el enum, Mongoose lanza un
//     ValidationError claro y descriptivo. No tienes que
//     escribir validación manual en cada ruta.
//
//  3. 🏗️  MODELS (Modelos):
//     Una clase JavaScript que representa una colección.
//     Te da todos los métodos de consulta preconstruidos:
//     .find(), .findById(), .findOne(), .create(), .save(),
//     .findByIdAndUpdate(), .findByIdAndDelete(), .countDocuments()
//     Sin Mongoose, tendrías que escribir todo esto manualmente.
//
//  4. 🔗 MIDDLEWARE / HOOKS:
//     Funciones que se ejecutan automáticamente ANTES o DESPUÉS
//     de ciertas operaciones (save, update, delete, etc.).
//     Casos de uso reales:
//     - pre('save'): hashear contraseña antes de guardar
//     - pre('save'): calcular un campo derivado automáticamente
//     - post('save'): enviar email de bienvenida después de registrar
//     - pre('findOneAndDelete'): eliminar datos relacionados en cascada
//
//  5. 🔄 POPULATION (populate):
//     Reemplaza automáticamente un ObjectId con los datos completos
//     del documento referenciado. Es el equivalente al JOIN de SQL,
//     pero más simple de usar.
//     await Pedido.find().populate('usuario')
//     → devuelve el pedido con todos los datos del usuario,
//       no solo su _id.
//
//  6. 🧩 MÉTODOS PERSONALIZADOS:
//     Puedes agregar tus propios métodos al Schema.
//     methods → métodos de INSTANCIA (sobre un documento)
//     statics → métodos ESTÁTICOS (sobre el Model completo)
//
//  7. 🔍 VIRTUALS:
//     Campos calculados que no se guardan en MongoDB pero
//     están disponibles en tus objetos.
//     Ejemplo: "nombreCompleto" calculado de "nombre" + "apellido".
//
//  8. 🔎 QUERY HELPERS:
//     Métodos personalizados que puedes encadenar en las consultas.
//     Ejemplo: Producto.find().activos().baratos(200000)
//
//  ─────────────────────────────────────────────────────────
//  CONCEPTOS CLAVE DE MONGOOSE — En detalle
//  ─────────────────────────────────────────────────────────
//
//  📋 SCHEMA — El "molde" que deben seguir los documentos
//  ─────────────────────────────────────────────────────────
//  Un Schema define QUÉ campos tiene un documento, QUÉ tipo
//  de dato es cada uno, y QUÉ validaciones debe cumplir.
//
//  const usuarioSchema = new mongoose.Schema({
//    nombre: {
//      type: String,          ← tipo de dato
//      required: true,        ← campo obligatorio
//      trim: true,            ← elimina espacios
//      minlength: 2,          ← mínimo 2 caracteres
//      maxlength: 50          ← máximo 50 caracteres
//    },
//    email: {
//      type: String,
//      required: [true, "El email es obligatorio"],  ← mensaje personalizado
//      unique: true,          ← no puede repetirse
//      lowercase: true        ← siempre guarda en minúsculas
//    },
//    edad: {
//      type: Number,
//      min: [0, "La edad no puede ser negativa"],
//      max: [120, "Edad inválida"]
//    },
//    rol: {
//      type: String,
//      enum: ["admin", "usuario", "vendedor"],  ← solo estos valores
//      default: "usuario"     ← valor por defecto
//    },
//    activo: {
//      type: Boolean,
//      default: true
//    }
//  }, {
//    timestamps: true,   ← agrega createdAt y updatedAt automáticamente
//    versionKey: false   ← elimina el campo __v (versión interna)
//  });
//
//  📦 MODEL — La clase que representa la colección
//  ─────────────────────────────────────────────────────────
//  const Usuario = mongoose.model('Usuario', usuarioSchema);
//
//  El nombre 'Usuario' → colección 'usuarios' en MongoDB
//  (Mongoose pluraliza y pone en minúsculas automáticamente)
//
//  'Producto'  → 'productos'
//  'Categoria' → 'categorias'
//  'TaskItem'  → 'taskitems'
//
//  ─────────────────────────────────────────────────────────
//  TODOS LOS TIPOS DE DATOS EN MONGOOSE:
//  ─────────────────────────────────────────────────────────
//
//  String     → Texto: "Hola", "juan@email.com"
//  Number     → Número: 42, 3.14, -10
//  Boolean    → true / false
//  Date       → Fecha y hora: new Date(), Date.now
//  Buffer     → Datos binarios (imágenes, archivos en BD)
//  Mixed      → Cualquier tipo sin validación (usar con cuidado)
//  ObjectId   → ID de referencia a otro documento
//  Array      → Arreglo: [1, 2, 3], ["a", "b"]
//  Decimal128 → Número decimal de alta precisión (datos financieros)
//  Map        → Mapa de clave-valor con tipos definidos
//
//  ─────────────────────────────────────────────────────────
//  TODOS LOS VALIDADORES DE MONGOOSE:
//  ─────────────────────────────────────────────────────────
//
//  PARA TODOS LOS TIPOS:
//  required: true | [true, 'mensaje']  → campo obligatorio
//  default: valor | función            → valor por defecto
//  enum: [val1, val2]                  → solo acepta esos valores
//  validate: { validator: fn, message: 'msg' } → validación custom
//
//  PARA STRING:
//  minlength: n | [n, 'mensaje']       → mínimo n caracteres
//  maxlength: n | [n, 'mensaje']       → máximo n caracteres
//  match: /regex/ | [/regex/, 'msg']   → debe coincidir con regex
//  trim: true                          → elimina espacios al inicio/fin
//  lowercase: true                     → guarda siempre en minúsculas
//  uppercase: true                     → guarda siempre en mayúsculas
//
//  PARA NUMBER:
//  min: n | [n, 'mensaje']            → valor mínimo
//  max: n | [n, 'mensaje']            → valor máximo
//
//  PARA DATE:
//  min: fecha                         → fecha mínima
//  max: fecha                         → fecha máxima
//
//  ÍNDICES:
//  unique: true                        → índice único (no duplicados)
//  index: true                         → índice simple (búsqueda rápida)
//  sparse: true                        → índice que ignora nulls
//
//  ─────────────────────────────────────────────────────────
//  OPERACIONES CRUD CON MONGOOSE — Guía rápida
//  ─────────────────────────────────────────────────────────
//
//  CREATE:
//  const doc = new Modelo(datos); await doc.save();
//  await Modelo.create(datos);
//  await Modelo.insertMany([datos1, datos2]);
//
//  READ:
//  await Modelo.find({})                         → todos
//  await Modelo.find({ campo: valor })           → con filtro
//  await Modelo.findById(id)                     → por _id
//  await Modelo.findOne({ campo: valor })        → el primero
//  await Modelo.find({}).select('campo1 campo2') → proyección
//  await Modelo.find({}).sort({ campo: 1 })      → ordenado
//  await Modelo.find({}).skip(10).limit(5)       → paginado
//  await Modelo.find({}).populate('refCampo')    → con JOIN
//  await Modelo.countDocuments({ activo: true }) → contar
//
//  UPDATE:
//  await Modelo.findByIdAndUpdate(id, { $set: datos }, { new: true })
//  await Modelo.updateOne({ filtro }, { $set: datos })
//  await Modelo.updateMany({ filtro }, { $set: datos })
//  doc.campo = nuevoValor; await doc.save();
//
//  DELETE:
//  await Modelo.findByIdAndDelete(id)
//  await Modelo.deleteOne({ filtro })
//  await Modelo.deleteMany({ filtro })
//
//  ─────────────────────────────────────────────────────────
//  MANEJO DE ERRORES EN MONGOOSE — Los más comunes
//  ─────────────────────────────────────────────────────────
//
//  ValidationError:
//    Ocurre cuando los datos no cumplen el Schema.
//    error.name === 'ValidationError'
//    error.errors → objeto con los campos que fallaron
//    Object.values(error.errors).map(e => e.message) → mensajes
//
//  CastError:
//    Ocurre cuando pasas un ID con formato inválido.
//    "64abc123" tiene 8 chars — un ObjectId válido tiene 24.
//    error.name === 'CastError'
//    Responde con 400 Bad Request.
//
//  MongoServerError code 11000:
//    Violación de campo unique. Ya existe ese valor.
//    error.code === 11000
//    error.keyValue → qué campo está duplicado
//    Responde con 409 Conflict.
//
// ============================================================
//  🧪 EJEMPLOS PRÁCTICOS — Mongoose + Express + MongoDB Atlas
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
//  RUTAS DISPONIBLES:
//  POST   /api/seed                  → Cargar datos iniciales de prueba
//  GET    /api/categorias            → Listar todas las categorías
//  GET    /api/categorias/:id        → Obtener una categoría por ID
//  POST   /api/categorias            → Crear nueva categoría
//  PUT    /api/categorias/:id        → Actualizar una categoría
//  DELETE /api/categorias/:id        → Eliminar una categoría
//  GET    /api/productos             → Listar todos (con filtros y populate)
//  GET    /api/productos/baratos     → Productos usando método estático
//  GET    /api/productos/:id         → Obtener uno (con populate)
//  POST   /api/productos             → Crear nuevo producto
//  PUT    /api/productos/:id         → Actualizar producto
//  DELETE /api/productos/:id         → Borrado lógico (activo: false)
//  POST   /api/productos/:id/reactivar → Reactivar producto desactivado
//  GET    /api/estadisticas          → Aggregation Pipeline
//
// ============================================================

"use strict";

// ─────────────────────────────────────────────────────────
//  IMPORTACIONES
// ─────────────────────────────────────────────────────────

require("dotenv").config();
// dotenv.config() lee el archivo .env y carga cada variable en process.env.
// DEBE estar en la primera línea antes de cualquier require() que use
// process.env, porque si lo pones después esas variables serían undefined.
//
// .env:                        process.env después de config():
// MONGODB_URI=mongodb+srv://...  → process.env.MONGODB_URI = "mongodb+srv://..."
// PUERTO=3000                    → process.env.PUERTO = "3000"  (SIEMPRE string)
//
// Por eso cuando usas process.env.PUERTO necesitas convertirlo a número:
// const PUERTO = Number(process.env.PUERTO) || 3000;

const express  = require("express");
const mongoose = require("mongoose");
// mongoose es el ODM que actúa de puente entre Node.js y MongoDB.
// El objeto mongoose importado es un singleton — siempre es la misma
// instancia en toda la aplicación. Esto es importante porque la
// conexión a MongoDB se hace UNA SOLA VEZ y se reutiliza en todos
// los modelos y rutas.

// ─────────────────────────────────────────────────────────
//  CONFIGURACIÓN INICIAL
// ─────────────────────────────────────────────────────────
const app    = express();
const PUERTO = Number(process.env.PUERTO) || 3000;
// Number() convierte el string "3000" al número 3000.
// app.listen() necesita un número, no un string.
// El || 3000 es el valor por defecto si PUERTO no está en el .env.

app.use(express.json());
// Middleware global: parsea el body JSON de las peticiones.
// Sin esto, req.body sería undefined en POST/PUT/PATCH.

// ════════════════════════════════════════════════════════════
//  CONEXIÓN A MONGODB ATLAS
// ════════════════════════════════════════════════════════════

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // Si no hay URI configurada, el servidor no tiene sentido correr.
  // Mostramos un error claro y terminamos el proceso.
  // Es mucho mejor fallar rápido con un mensaje descriptivo que
  // fallar silenciosamente cuando se intenta una consulta.
  console.error("\n❌ ERROR CRÍTICO: No se encontró MONGODB_URI en el archivo .env");
  console.error("   Crea el archivo .env con:");
  console.error("   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tiendaDB");
  console.error("   PUERTO=3000\n");
  process.exit(1);
  // process.exit(1) termina el proceso de Node.js.
  // El código 1 indica que terminó con error (código 0 = éxito).
}

mongoose
  .connect(MONGODB_URI)
  // .connect() devuelve una Promesa. Usamos .then() y .catch()
  // en vez de async/await porque este código está en el nivel raíz
  // del módulo (fuera de una función async).
  // Mongoose internamente crea un POOL de conexiones (varias
  // conexiones simultáneas a MongoDB), lo que permite que el
  // servidor atienda múltiples peticiones paralelas eficientemente.
  .then(() => {
    console.log("\n✅ Conectado a MongoDB Atlas exitosamente");
    console.log(`   Base de datos: ${mongoose.connection.name}`);
    // mongoose.connection.name → el nombre de la BD en la URI
    // Si la URI es: .../tiendaDB, aquí verás "tiendaDB"
  })
  .catch((error) => {
    console.error("\n❌ Error al conectar a MongoDB:", error.message);
    console.error("   Causas comunes:");
    console.error("   1. Contraseña incorrecta en la URI");
    console.error("   2. IP no está en la lista blanca de Atlas (Network Access)");
    console.error("   3. El cluster está pausado (el M0 gratuito se pausa con inactividad)");
    console.error("   4. Sin conexión a internet");
    process.exit(1);
  });

// Eventos del ciclo de vida de la conexión MongoDB
mongoose.connection.on("disconnected", () => {
  console.log("⚠️  Desconectado de MongoDB. Mongoose intentará reconectar automáticamente.");
  // Mongoose tiene reconexión automática activada por defecto.
  // No necesitas reiniciar el servidor manualmente.
});

mongoose.connection.on("reconnected", () => {
  console.log("✅ Reconectado a MongoDB exitosamente.");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Error de conexión MongoDB:", err.message);
  // Los errores de conexión son distintos a los errores de consulta.
  // Un error de conexión afecta a TODAS las consultas.
  // Un error de consulta afecta solo a esa operación específica.
});


// ════════════════════════════════════════════════════════════
//  SCHEMAS — La definición de estructura de los documentos
// ════════════════════════════════════════════════════════════
//
//  Aquí definimos los SCHEMAS de Mongoose.
//  Un Schema es un "contrato" que dice: "todos los documentos
//  de esta colección DEBEN tener esta estructura".
//
//  IMPORTANTE: los Schemas se definen ANTES de los Models,
//  y los Models se crean ANTES de las rutas.
//  El orden importa: si defines una ruta que usa un Model
//  que aún no existe, obtendrás un error.


// ────────────────────────────────────────────────────────────
//  SCHEMA: Categoría
// ────────────────────────────────────────────────────────────
const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la categoría es obligatorio"],
      // required con array: [condición, mensaje personalizado]
      // El mensaje aparece en el ValidationError cuando falla.
      // Sin mensaje personalizado: "Path `nombre` is required." (en inglés)
      // Con mensaje personalizado: "El nombre de la categoría es obligatorio"

      unique: true,
      // unique crea un índice único en MongoDB.
      // Significa que no pueden existir dos documentos con el mismo nombre.
      // Si intentas insertar uno duplicado, MongoDB lanza error code 11000.
      // NOTA IMPORTANTE: unique NO es un validador de Mongoose.
      // Es una instrucción de índice para MongoDB. Por eso el error
      // que se lanza es un MongoServerError (code 11000), no un
      // ValidationError. Debes manejarlo por separado.

      trim: true,
      // trim elimina espacios al inicio y al final ANTES de guardar.
      // "  Electrónica  " → "Electrónica"
      // Muy importante para evitar duplicados accidentales:
      // "electronica" y "electronica " serían diferentes sin trim.

      lowercase: true,
      // lowercase guarda siempre en minúsculas.
      // "Electrónica" → "electronica"
      // Normaliza los datos para que las búsquedas sean consistentes.
      // Combinado con unique: "Electrónica" y "electronica" serían
      // considerados duplicados después de la normalización.

      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede superar 50 caracteres"],
    },

    descripcion: {
      type: String,
      trim: true,
      maxlength: [200, "La descripción no puede superar 200 caracteres"],
      // Sin required → el campo es OPCIONAL.
      // Si no se envía, el campo simplemente no existe en el documento.
      // En SQL una columna sin NOT NULL acepta NULL. Similar aquí.
    },

    icono: {
      type: String,
      default: "📦",
      // default: el valor que se asigna si el campo no se envía.
      // Puede ser un valor estático (como aquí) o una función:
      // default: () => new Date()  → función para fechas dinámicas
      // default: Date.now          → referencia a función (sin paréntesis)
    },

    activa: {
      type: Boolean,
      default: true,
      // Todas las categorías empiezan como activas.
      // Cuando se "elimina" una categoría, ponemos activa: false
      // en vez de borrar el documento (borrado lógico).
    },

    orden: {
      type: Number,
      default: 0,
      // Campo para ordenar las categorías en la UI.
      // Si no se envía, se ordena al final (orden: 0).
    },
  },
  {
    timestamps: true,
    // timestamps: true agrega automáticamente:
    // - createdAt: fecha de creación del documento
    // - updatedAt: fecha de la última actualización
    // MongoDB actualiza updatedAt automáticamente en cada save/update.
    // No tienes que hacerlo manualmente nunca.

    versionKey: false,
    // versionKey: false elimina el campo __v que Mongoose agrega
    // por defecto para control de versiones optimista (optimistic
    // concurrency). Para la mayoría de proyectos simples no necesitas
    // este campo y solo agrega ruido en las respuestas JSON.
  }
);

// Índice compuesto en categoriaSchema
// Buscaremos categorías por nombre + activa frecuentemente.
// Un índice compuesto acelera esas consultas.
categoriaSchema.index({ nombre: 1, activa: 1 });
// 1 = orden ascendente en el índice
// -1 = orden descendente en el índice


// ────────────────────────────────────────────────────────────
//  SCHEMA: Producto
// ────────────────────────────────────────────────────────────
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
      required: [true, "El precio del producto es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
      // validate: validación personalizada más compleja
      validate: {
        validator: function (valor) {
          // El validador recibe el valor del campo.
          // Debe retornar true (válido) o false (inválido).
          // También puede retornar una Promesa para validaciones async.
          return Number.isFinite(valor) && valor <= 1_000_000_000;
          // Number.isFinite verifica que sea un número finito (no Infinity, no NaN)
          // El _ en 1_000_000_000 es un separador visual (ES2021+) — es igual a 1000000000
        },
        message: "El precio debe ser un número finito menor a 1.000.000.000",
      },
    },

    precioAnterior: {
      type: Number,
      min: [0, "El precio anterior no puede ser negativo"],
      // Campo opcional para mostrar descuentos.
      // Si precioAnterior > precio → el producto está en descuento.
    },

    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: [0, "El stock no puede ser negativo"],
      default: 0,
      validate: {
        validator: Number.isInteger,
        // Number.isInteger → retorna true si es entero, false si tiene decimales
        // No puedes tener 2.5 unidades de un producto físico.
        message: "El stock debe ser un número entero",
      },
    },

    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      // ObjectId es el tipo especial de MongoDB para IDs.
      // Cuando guardas un ObjectId en un campo, MongoDB lo almacena
      // de forma eficiente como 12 bytes (no como string).
      // Cuando haces populate(), Mongoose lo reemplaza con el documento completo.

      ref: "Categoria",
      // ref indica el nombre del MODEL al que hace referencia.
      // Debe coincidir exactamente con el nombre que usaste en:
      // mongoose.model('Categoria', categoriaSchema)
      // Este es el "puntero" que usa populate() para saber qué
      // colección consultar cuando resuelve la referencia.

      required: [true, "La categoría del producto es obligatoria"],
    },

    imagenes: {
      type: [String],
      // Array de strings — cada string es una URL de imagen.
      // [String] es la forma corta de: [{ type: String }]
      default: [],
      // Array vacío por defecto. El producto puede no tener imágenes al crearse.
    },

    etiquetas: {
      type: [String],
      default: [],
      // Tags para búsqueda y filtrado.
      // ["laptop", "hp", "windows", "intel"]
    },

    calificacion: {
      promedio: { type: Number, default: 0, min: 0, max: 5 },
      totalReseñas: { type: Number, default: 0, min: 0 },
      // Objeto anidado directamente en el Schema.
      // En MongoDB se guarda como subdocumento:
      // { calificacion: { promedio: 4.5, totalReseñas: 127 } }
    },

    activo: {
      type: Boolean,
      default: true,
      // false = producto "eliminado" (borrado lógico).
      // Nunca borramos datos reales — solo los marcamos como inactivos.
      // Ventajas del borrado lógico:
      // - Historial de pedidos no se rompe (el producto sigue existiendo)
      // - Puedes reactivar un producto si fue un error
      // - Auditoría de qué había antes
    },

    destacado: {
      type: Boolean,
      default: false,
      // true = aparece en la sección "destacados" o "más vendidos"
    },
  },
  {
    timestamps: true,
    versionKey: false,
    // toJSON nos permite controlar cómo se serializa el documento
    // cuando se convierte a JSON (en res.json())
    toJSON: {
      virtuals: true,
      // virtuals: true → incluye los campos virtuales en el JSON.
      // Sin esto, los virtuales no aparecerían en la respuesta.
      transform: function (doc, ret) {
        // transform permite modificar el objeto antes de serializarlo.
        // 'ret' es el objeto que se va a serializar.
        // Aquí eliminamos campos internos que no queremos exponer:
        delete ret.id;
        // 'id' es un virtual que Mongoose agrega automáticamente
        // como alias de '_id' como string. Como ya tenemos '_id',
        // eliminamos 'id' para evitar duplicar información.
        return ret;
      },
    },
  }
);

// VIRTUAL — Campo calculado que NO se guarda en MongoDB
productoSchema.virtual("tieneDescuento").get(function () {
  // 'this' apunta al documento actual.
  // Un virtual getter se calcula cuando accedes a la propiedad.
  return this.precioAnterior !== undefined && this.precioAnterior > this.precio;
});
// Uso: producto.tieneDescuento → true o false (calculado al vuelo)
// NO ocupa espacio en MongoDB porque no se almacena.

productoSchema.virtual("porcentajeDescuento").get(function () {
  if (!this.tieneDescuento) return 0;
  return Math.round(((this.precioAnterior - this.precio) / this.precioAnterior) * 100);
});
// Uso: producto.porcentajeDescuento → número entre 0 y 100
// Si precioAnterior era 200000 y precio es 150000:
// ((200000 - 150000) / 200000) * 100 = 25% de descuento

productoSchema.virtual("estadoStock").get(function () {
  if (this.stock === 0) return "agotado";
  if (this.stock <= 5) return "últimas unidades";
  return "disponible";
});
// Virtual para mostrar el estado del stock como texto descriptivo.
// Útil para el frontend: muestra "últimas unidades" en vez de el número 5.

// ÍNDICES del productoSchema
productoSchema.index({ categoria: 1 });
// Búsquedas por categoría serán rápidas.
productoSchema.index({ precio: 1 });
// Ordenar por precio será rápido.
productoSchema.index({ nombre: "text", descripcion: "text" });
// Índice de texto para búsqueda full-text.
// Permite: Producto.find({ $text: { $search: "laptop gamer" } })


// ════════════════════════════════════════════════════════════
//  HOOKS (Middleware de Mongoose)
// ════════════════════════════════════════════════════════════
//
//  Los hooks son funciones que se ejecutan automáticamente
//  en ciertos momentos del ciclo de vida de un documento.
//
//  Hay dos tipos:
//  PRE: se ejecuta ANTES de la operación → puedes modificar datos
//  POST: se ejecuta DESPUÉS de la operación → datos ya en MongoDB


// ── pre('save') → ANTES de cada .save() ─────────────────────
productoSchema.pre("save", function (next) {
  // 'this' → el documento que se está guardando
  // 'next' → función para continuar al siguiente hook o a MongoDB
  //
  // IMPORTANTE: en pre hooks usa function() tradicional, NO arrow functions.
  // Las arrow functions NO tienen su propio 'this', así que 'this'
  // apuntaría al scope del módulo, no al documento.
  // CORRECTO:   pre('save', function(next) { this.campo = ... })
  // INCORRECTO: pre('save', (next) => { this.campo = ... })

  // Normalizamos el nombre: primera letra de cada palabra en mayúscula
  if (this.isModified("nombre")) {
    // .isModified(campo) → true si ese campo fue modificado en esta operación.
    // Evitamos procesar campos que no cambiaron.
    this.nombre = this.nombre
      .split(" ")
      .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
      .join(" ");
    // "laptop hp pavilion" → "Laptop Hp Pavilion"
    // .split(" ")     → ["laptop", "hp", "pavilion"]
    // .map(...)        → ["Laptop", "Hp", "Pavilion"]
    // .join(" ")       → "Laptop Hp Pavilion"
  }

  // Si el precio cambió y había un precio anterior, calculamos el descuento
  if (this.isModified("precio") && this.precioAnterior) {
    const descuento = ((this.precioAnterior - this.precio) / this.precioAnterior) * 100;
    console.log(`  [Hook pre-save] Precio actualizado. Descuento: ${Math.round(descuento)}%`);
  }

  console.log(`  [Hook pre-save]  Procesando: "${this.nombre}" — precio: $${this.precio}`);
  next();
  // next() sin argumentos → continúa con el guardado.
  // next(new Error("mensaje")) → cancela el guardado y lanza el error.
  // Útil para validaciones complejas que no se pueden hacer solo con el Schema.
});


// ── pre('findOneAndUpdate') → ANTES de updates con findByIdAndUpdate ──
productoSchema.pre("findOneAndUpdate", function (next) {
  // 'this' → la query (no el documento) en hooks de find/update
  // Para acceder a los datos del update: this.getUpdate()
  const update = this.getUpdate();

  // Si se está actualizando el precio, guardamos el precio anterior
  if (update.$set && update.$set.precio !== undefined) {
    this.getUpdate().$set.updatedAt = new Date();
    console.log(`  [Hook pre-update] Actualizando precio a: $${update.$set.precio}`);
  }

  next();
});


// ── post('save') → DESPUÉS de cada .save() ──────────────────
productoSchema.post("save", function (doc, next) {
  // 'doc' → el documento que fue guardado (con el _id asignado)
  console.log(`  [Hook post-save] Guardado exitosamente con _id: ${doc._id}`);
  // Aquí podrías:
  // - Enviar una notificación
  // - Actualizar una caché
  // - Registrar en un log externo
  // - Enviar un evento a un sistema de mensajería (RabbitMQ, Kafka)
  next();
});


// ── post('findOneAndDelete') → DESPUÉS de eliminar ──────────
productoSchema.post("findOneAndDelete", async function (doc) {
  // Este hook es útil para eliminar datos relacionados en CASCADA.
  // Si eliminamos un producto, podríamos limpiar sus reseñas, etc.
  if (doc) {
    console.log(`  [Hook post-delete] Producto "${doc.nombre}" eliminado de la BD`);
    // En un proyecto real aquí harías:
    // await Reseña.deleteMany({ productoId: doc._id });
    // await Carrito.updateMany({}, { $pull: { items: { productoId: doc._id } } });
  }
});


// ════════════════════════════════════════════════════════════
//  MÉTODOS PERSONALIZADOS
// ════════════════════════════════════════════════════════════

// ── Método de INSTANCIA — se llama sobre un documento ───────
productoSchema.methods.formatearPrecio = function () {
  // 'this' → el documento específico
  // Uso: const p = await Producto.findById(id); p.formatearPrecio()
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(this.precio);
  // Intl.NumberFormat → API estándar de JS para formatear números.
  // "es-CO" → formato colombiano
  // "COP" → pesos colombianos
  // Resultado: "$2.500.000"
};

productoSchema.methods.aplicarDescuento = function (porcentaje) {
  // Aplica un descuento al producto y devuelve el precio final.
  // No guarda en BD — es un cálculo temporal.
  // Uso: const precioConDescuento = producto.aplicarDescuento(20)
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error("El porcentaje debe estar entre 0 y 100");
  }
  const descuento = this.precio * (porcentaje / 100);
  return Math.round(this.precio - descuento);
};

productoSchema.methods.tieneStock = function (cantidad = 1) {
  // Verifica si hay stock suficiente para la cantidad pedida.
  // Uso: if (producto.tieneStock(3)) { ... }
  return this.stock >= cantidad;
};


// ── Método ESTÁTICO — se llama sobre el Model completo ──────
productoSchema.statics.buscarPorPrecioMaximo = function (precioMax) {
  // 'this' → el Model completo (la clase Producto)
  // Uso: await Producto.buscarPorPrecioMaximo(500000)
  return this.find({ precio: { $lte: precioMax }, activo: true })
    .populate("categoria")
    .sort({ precio: 1 });
};

productoSchema.statics.buscarPorTexto = function (texto) {
  // Búsqueda full-text usando el índice de texto que definimos.
  // Requiere el índice: productoSchema.index({ nombre: "text", descripcion: "text" })
  // Uso: await Producto.buscarPorTexto("laptop gamer")
  return this.find({ $text: { $search: texto }, activo: true })
    .populate("categoria");
};

productoSchema.statics.obtenerDestacados = function (limite = 5) {
  return this.find({ activo: true, destacado: true })
    .populate("categoria")
    .sort({ "calificacion.promedio": -1 })
    .limit(limite);
};


// ════════════════════════════════════════════════════════════
//  MODELS — Las clases para interactuar con las colecciones
// ════════════════════════════════════════════════════════════
//
//  mongoose.model(nombre, schema) crea o recupera un modelo.
//  Si el modelo ya fue creado (ej: en otro archivo), Mongoose
//  devuelve el modelo existente en vez de crear uno nuevo.
//  Esto es importante porque en Node.js los módulos se cachean.

const Categoria = mongoose.model("Categoria", categoriaSchema);
const Producto  = mongoose.model("Producto",  productoSchema);
// 'Categoria' → colección 'categorias' en MongoDB
// 'Producto'  → colección 'productos' en MongoDB
//
// Mongoose pluraliza y pone en minúsculas automáticamente.
// 'User'      → 'users'
// 'BlogPost'  → 'blogposts'
// 'TaskItem'  → 'taskitems'
//
// Si necesitas un nombre de colección específico:
// mongoose.model('Producto', productoSchema, 'mis_productos')
// El tercer argumento fuerza el nombre de la colección.


// ════════════════════════════════════════════════════════════
//  RUTAS — PÁGINA PRINCIPAL
// ════════════════════════════════════════════════════════════

app.get("/", (req, res) => {
  const estadoConexion = mongoose.connection.readyState;
  // readyState indica el estado de la conexión:
  // 0 → disconnected
  // 1 → connected (lo que queremos ver)
  // 2 → connecting
  // 3 → disconnecting

  const estados = { 0: "❌ Desconectado", 1: "✅ Conectado", 2: "🔄 Conectando...", 3: "⏳ Desconectando..." };

  res.json({
    mensaje: "🍃 API con Mongoose + MongoDB Atlas",
    estadoMongoDB: estados[estadoConexion] || "❓ Desconocido",
    baseDeDatos: mongoose.connection.name || "Sin conexión",
    version: { mongoose: mongoose.version, node: process.version },
    instruccion: "Primero ejecuta POST /api/seed para cargar datos de prueba",
    rutasDisponibles: {
      seed:       "POST   /api/seed",
      stats:      "GET    /api/estadisticas",
      categorias: ["GET /api/categorias", "GET /api/categorias/:id", "POST /api/categorias", "PUT /api/categorias/:id", "DELETE /api/categorias/:id"],
      productos:  ["GET /api/productos", "GET /api/productos/baratos?max=500000", "GET /api/productos/:id", "POST /api/productos", "PUT /api/productos/:id", "DELETE /api/productos/:id", "POST /api/productos/:id/reactivar"],
    },
  });
});


// ════════════════════════════════════════════════════════════
//  RUTAS — CATEGORÍAS (CRUD completo)
// ════════════════════════════════════════════════════════════

// ── GET /api/categorias → Listar todas ──────────────────────
app.get("/api/categorias", async (req, res) => {
  try {
    const { activa, buscar } = req.query;
    // req.query → parámetros después del '?' en la URL
    // ?activa=true → req.query.activa = "true" (string)
    // ?buscar=electr → req.query.buscar = "electr"

    const filtro = {};
    // Construimos el filtro dinámicamente según los query params recibidos.
    // Empezamos con {} (sin filtro) y añadimos condiciones según lo que llegue.

    if (activa !== undefined) {
      filtro.activa = activa === "true";
      // Convertimos el string "true"/"false" a booleano real.
      // activa === "true" → true si el string es "true", false en cualquier otro caso.
    }

    if (buscar) {
      filtro.nombre = { $regex: buscar, $options: "i" };
      // $regex → búsqueda por expresión regular
      // $options: "i" → case-insensitive (ignora mayúsculas)
      // Buscar "electr" encontraría "Electrónica", "Electro", "electrodomésticos"
    }

    const categorias = await Categoria.find(filtro)
      .sort({ orden: 1, nombre: 1 });
    // .sort({ orden: 1, nombre: 1 }) → ordena primero por 'orden' (asc)
    // y luego por 'nombre' (asc) si dos tienen el mismo 'orden'.
    // El encadenamiento de sorts permite ordenamiento multi-nivel.

    res.status(200).json({
      exito: true,
      total: categorias.length,
      datos: categorias,
    });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ── GET /api/categorias/:id → Obtener una por ID ────────────
app.get("/api/categorias/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    // findById(id) es equivalente a findOne({ _id: id }).
    // Retorna el documento o null si no existe.
    // Mongoose convierte automáticamente el string a ObjectId.

    if (!categoria) {
      return res.status(404).json({
        exito: false,
        mensaje: `No existe ninguna categoría con ID ${req.params.id}`,
      });
    }

    res.status(200).json({ exito: true, dato: categoria });
  } catch (error) {
    if (error.name === "CastError") {
      // CastError: el string que enviaron no tiene el formato de un ObjectId.
      // Un ObjectId válido tiene 24 caracteres hexadecimales.
      // Si envían "123" en vez de "64abc123def456789012aa01", ocurre CastError.
      return res.status(400).json({
        exito: false,
        mensaje: "El ID proporcionado no tiene un formato válido de MongoDB",
        detalle: "Un ID válido de MongoDB tiene 24 caracteres hexadecimales",
      });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ── POST /api/categorias → Crear nueva categoría ────────────
app.post("/api/categorias", async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    // new Categoria(datos) → crea una instancia del documento en MEMORIA.
    // El documento NO está en MongoDB todavía. Solo existe en RAM.
    // Los campos se validan según el Schema pero no se envía nada a la BD.

    const guardada = await nuevaCategoria.save();
    // .save() → AHORA sí envía el documento a MongoDB.
    // Antes de enviar, Mongoose ejecuta:
    // 1. Los pre('save') hooks
    // 2. La validación del Schema
    // 3. Si pasa todo, escribe en MongoDB
    // 4. Ejecuta los post('save') hooks
    // Si la validación falla, lanza ValidationError y NO guarda nada.

    res.status(201).json({
      exito: true,
      mensaje: "Categoría creada exitosamente",
      dato: guardada,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // ValidationError: el Schema rechazó los datos.
      // error.errors → objeto con un entry por cada campo que falló.
      // Object.values() → convierte el objeto a array de valores.
      // .map(e => e.message) → extrae solo el mensaje de cada error.
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        exito: false,
        mensaje: "Los datos enviados no son válidos",
        errores: mensajes,
      });
    }
    if (error.code === 11000) {
      // Error code 11000 → violación de índice unique.
      // error.keyValue → { nombre: "electronica" } — qué campo y valor duplicados.
      const campo = Object.keys(error.keyValue)[0];
      const valor = error.keyValue[campo];
      return res.status(409).json({
        // 409 Conflict → el recurso ya existe, hay un conflicto.
        exito: false,
        mensaje: `Ya existe una categoría con ${campo}: "${valor}"`,
      });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ── PUT /api/categorias/:id → Actualizar una categoría ──────
app.put("/api/categorias/:id", async (req, res) => {
  try {
    const actualizada = await Categoria.findByIdAndUpdate(
      req.params.id,
      // El primer argumento es el ID a buscar.

      { $set: req.body },
      // $set → actualiza SOLO los campos enviados en req.body.
      // Sin $set, MongoDB REEMPLAZARÍA el documento completo con req.body.
      // Con $set, los campos no incluidos en req.body quedan sin cambios.
      //
      // Ejemplo:
      // Documento actual: { nombre: "Electrónica", descripcion: "...", activa: true }
      // req.body: { nombre: "Electrónica actualizada" }
      // Con $set:    { nombre: "Electrónica actualizada", descripcion: "...", activa: true }
      // Sin $set:    { nombre: "Electrónica actualizada" } ← descripcion y activa desaparecen

      {
        new: true,
        // new: true → devuelve el documento DESPUÉS de la actualización.
        // Por defecto (new: false) devuelve el documento ANTES (el original).
        // Casi siempre quieres new: true para mostrar el estado actualizado.

        runValidators: true,
        // runValidators: true → ejecuta las validaciones del Schema al actualizar.
        // Por defecto, findByIdAndUpdate NO ejecuta validaciones.
        // Sin esto, podrías actualizar un precio a -100 sin error.
      }
    );

    if (!actualizada) {
      return res.status(404).json({
        exito: false,
        mensaje: `No existe ninguna categoría con ID ${req.params.id}`,
      });
    }

    res.status(200).json({
      exito: true,
      mensaje: "Categoría actualizada exitosamente",
      dato: actualizada,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ exito: false, errores: mensajes });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "ID inválido" });
    }
    if (error.code === 11000) {
      return res.status(409).json({ exito: false, mensaje: "Ya existe una categoría con ese nombre" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ── DELETE /api/categorias/:id → Eliminar categoría ─────────
app.delete("/api/categorias/:id", async (req, res) => {
  try {
    // Antes de eliminar, verificamos si hay productos en esta categoría.
    // Si los hay, no eliminamos — protegemos la integridad referencial.
    // MongoDB/Mongoose NO hace esto automáticamente (a diferencia de SQL con FK).
    const productosEnCategoria = await Producto.countDocuments({
      categoria: req.params.id,
      activo: true,
    });
    // .countDocuments(filtro) → cuenta documentos sin cargarlos en memoria.
    // Mucho más eficiente que .find().length cuando solo necesitas el número.

    if (productosEnCategoria > 0) {
      return res.status(409).json({
        exito: false,
        mensaje: `No se puede eliminar: hay ${productosEnCategoria} producto(s) en esta categoría`,
        sugerencia: "Primero reasigna o elimina los productos de esta categoría",
      });
    }

    const eliminada = await Categoria.findByIdAndDelete(req.params.id);
    // findByIdAndDelete → busca, elimina y devuelve el documento eliminado.
    // Si no existe, devuelve null.

    if (!eliminada) {
      return res.status(404).json({
        exito: false,
        mensaje: "Categoría no encontrada",
      });
    }

    res.status(200).json({
      exito: true,
      mensaje: `Categoría "${eliminada.nombre}" eliminada permanentemente`,
      dato: eliminada,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "ID inválido" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ════════════════════════════════════════════════════════════
//  RUTAS — PRODUCTOS (CRUD completo + funcionalidades extra)
// ════════════════════════════════════════════════════════════

// ── GET /api/productos/baratos → Método estático personalizado ──
// IMPORTANTE: Esta ruta debe estar ANTES de /api/productos/:id
// porque Express procesa las rutas en orden.
// Si /api/productos/:id está primero, "baratos" sería interpretado
// como un ID y la ruta estática nunca se alcanzaría.
app.get("/api/productos/baratos", async (req, res) => {
  try {
    const max = Number(req.query.max) || 200000;
    // Si no envían ?max=, el precio máximo por defecto es 200.000.
    const productos = await Producto.buscarPorPrecioMaximo(max);
    // Usamos el método estático que definimos en el Schema.
    // Esto mantiene la lógica de negocio en el modelo, no en la ruta.

    res.status(200).json({
      exito: true,
      precioMaximo: max,
      total: productos.length,
      datos: productos,
    });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ── GET /api/productos → Listar con filtros y populate ──────
app.get("/api/productos", async (req, res) => {
  try {
    const { categoria, minPrecio, maxPrecio, buscar, ordenar, pagina, limite } = req.query;

    const filtro = { activo: true };
    // Siempre filtramos solo productos activos.
    // Los "eliminados" (activo: false) no deben aparecer en el listado.

    if (categoria) filtro.categoria = categoria;
    // Si se envía ?categoria=64abc123..., filtramos por ese ObjectId.
    // Mongoose convierte el string al ObjectId automáticamente.

    if (minPrecio || maxPrecio) {
      filtro.precio = {};
      if (minPrecio) filtro.precio.$gte = Number(minPrecio);
      if (maxPrecio) filtro.precio.$lte = Number(maxPrecio);
    }
    // Construimos el filtro de rango de precio dinámicamente.
    // Si solo se envía ?minPrecio=100000, filtramos solo por mínimo.
    // Si solo se envía ?maxPrecio=500000, filtramos solo por máximo.
    // Si se envían ambos: { precio: { $gte: 100000, $lte: 500000 } }

    if (buscar) {
      filtro.$or = [
        { nombre: { $regex: buscar, $options: "i" } },
        { descripcion: { $regex: buscar, $options: "i" } },
      ];
      // $or → al menos una de las condiciones debe cumplirse.
      // Buscamos en nombre O en descripción.
      // Esto hace la búsqueda más completa para el usuario.
    }

    // Opciones de ordenamiento
    const opcionesOrden = {
      precio_asc:  { precio: 1 },
      precio_desc: { precio: -1 },
      nombre_asc:  { nombre: 1 },
      nombre_desc: { nombre: -1 },
      recientes:   { createdAt: -1 },
      populares:   { "calificacion.promedio": -1 },
    };
    const orden = opcionesOrden[ordenar] || { createdAt: -1 };
    // Si el parámetro de ordenamiento no está en el mapa, usamos
    // los más recientes como orden por defecto.

    // Paginación
    const limitePorPagina = Math.min(Number(limite) || 10, 50);
    const paginaActual = Math.max(Number(pagina) || 1, 1);
    const saltar = (paginaActual - 1) * limitePorPagina;

    // Ejecutamos la consulta y el conteo en PARALELO con Promise.all
    const [productos, total] = await Promise.all([
      Producto.find(filtro)
        .populate("categoria", "nombre icono")
        // populate("categoria", "nombre icono") → trae el documento de la
        // categoría pero SOLO los campos nombre e icono.
        // Sin el segundo argumento, traería TODOS los campos de la categoría.
        // Proyectar solo lo necesario reduce el tamaño de la respuesta.
        .sort(orden)
        .skip(saltar)
        .limit(limitePorPagina),
      Producto.countDocuments(filtro),
      // countDocuments con el mismo filtro para calcular la paginación.
    ]);
    // Promise.all([p1, p2]) ejecuta p1 y p2 EN PARALELO.
    // Espera a que AMBAS terminen antes de continuar.
    // Si las ejecutáramos secuencialmente (await p1; await p2),
    // tardaría el doble de tiempo sin ningún beneficio.
    // Destrucuturamos el array resultante: [resultado1, resultado2]

    res.status(200).json({
      exito: true,
      paginacion: {
        paginaActual,
        totalPaginas: Math.ceil(total / limitePorPagina),
        totalProductos: total,
        itemsPorPagina: limitePorPagina,
      },
      datos: productos,
    });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ── GET /api/productos/:id → Obtener uno con populate ───────
app.get("/api/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)
      .populate("categoria");
    // .populate("categoria") → reemplaza el ObjectId del campo "categoria"
    // con el documento completo de la colección "categorias".
    //
    // SIN populate, la respuesta sería:
    // { _id: "...", nombre: "Laptop", categoria: "64abc123..." }
    //
    // CON populate, la respuesta sería:
    // { _id: "...", nombre: "Laptop", categoria: { _id: "...", nombre: "electrónica", ... } }
    //
    // Esto es el equivalente a un JOIN en SQL:
    // SELECT p.*, c.* FROM productos p JOIN categorias c ON p.categoria_id = c.id

    if (!producto) {
      return res.status(404).json({
        exito: false,
        mensaje: "Producto no encontrado",
      });
    }

    // Usamos métodos de instancia definidos en el Schema
    console.log(`  Precio formateado: ${producto.formatearPrecio()}`);
    console.log(`  Estado stock: ${producto.estadoStock}`);
    // 'estadoStock' es un virtual — no está en MongoDB pero Mongoose lo calcula.

    res.status(200).json({
      exito: true,
      dato: {
        ...producto.toJSON(),
        // .toJSON() convierte el documento Mongoose a un objeto JS plano.
        // El spread ... copia todas las propiedades en el objeto respuesta.
        precioFormateado: producto.formatearPrecio(),
        estadoStock: producto.estadoStock,
        tieneDescuento: producto.tieneDescuento,
        porcentajeDescuento: producto.porcentajeDescuento,
        // Añadimos campos calculados por métodos e instancias.
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "El ID proporcionado no es válido" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ── POST /api/productos → Crear nuevo producto ──────────────
app.post("/api/productos", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    // Los hooks pre('save') y post('save') se ejecutan automáticamente.
    // El pre hook normaliza el nombre antes de guardar.
    // El post hook registra en consola el _id asignado.

    // Populamos la categoría para devolverla completa en la respuesta
    await guardado.populate("categoria");
    // .populate() también funciona sobre una instancia del documento.
    // Lo ejecutamos DESPUÉS del save para no afectar el proceso de guardado.

    res.status(201).json({
      exito: true,
      mensaje: "Producto creado exitosamente",
      dato: guardado,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        exito: false,
        mensaje: "Los datos enviados no pasan la validación del Schema",
        errores: mensajes,
      });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ── PUT /api/productos/:id → Actualizar producto ─────────────
app.put("/api/productos/:id", async (req, res) => {
  try {
    // Verificamos que exista antes de actualizar
    const productoExistente = await Producto.findById(req.params.id);
    if (!productoExistente) {
      return res.status(404).json({ exito: false, mensaje: "Producto no encontrado" });
    }

    // Si se actualiza el precio, guardamos el precio anterior
    if (req.body.precio && req.body.precio !== productoExistente.precio) {
      req.body.precioAnterior = productoExistente.precio;
      // Guardamos el precio actual como "precio anterior" antes de actualizarlo.
      // Esto permite mostrar el descuento en la UI.
    }

    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("categoria");

    res.status(200).json({
      exito: true,
      mensaje: "Producto actualizado exitosamente",
      dato: actualizado,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ exito: false, errores: mensajes });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "ID inválido" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ── DELETE /api/productos/:id → Borrado lógico ──────────────
app.delete("/api/productos/:id", async (req, res) => {
  try {
    // BORRADO LÓGICO: no eliminamos el documento de MongoDB.
    // Simplemente marcamos activo: false.
    //
    // Ventajas del borrado lógico:
    // ✅ El historial de pedidos sigue referenciando el producto
    // ✅ Puedes ver qué productos existían antes
    // ✅ Puedes reactivarlo si fue un error
    // ✅ Auditoría completa de cambios
    //
    // En qué casos usar borrado FÍSICO (eliminar de verdad):
    // - Datos de usuarios que solicitan eliminación GDPR
    // - Datos temporales o de prueba
    // - Datos que por ley no puedes conservar

    const desactivado = await Producto.findByIdAndUpdate(
      req.params.id,
      { $set: { activo: false } },
      { new: true }
    );

    if (!desactivado) {
      return res.status(404).json({ exito: false, mensaje: "Producto no encontrado" });
    }

    res.status(200).json({
      exito: true,
      mensaje: `Producto "${desactivado.nombre}" desactivado (borrado lógico). Usa POST /api/productos/:id/reactivar para restaurarlo.`,
      dato: desactivado,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "ID inválido" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ── POST /api/productos/:id/reactivar → Reactivar producto ──
app.post("/api/productos/:id/reactivar", async (req, res) => {
  try {
    const reactivado = await Producto.findByIdAndUpdate(
      req.params.id,
      { $set: { activo: true } },
      { new: true }
    ).populate("categoria");

    if (!reactivado) {
      return res.status(404).json({ exito: false, mensaje: "Producto no encontrado" });
    }

    res.status(200).json({
      exito: true,
      mensaje: `Producto "${reactivado.nombre}" reactivado exitosamente`,
      dato: reactivado,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ exito: false, mensaje: "ID inválido" });
    }
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ════════════════════════════════════════════════════════════
//  RUTA: GET /api/estadisticas — Aggregation Pipeline real
// ════════════════════════════════════════════════════════════
//
//  Aquí usamos el Aggregation Pipeline de Mongoose para
//  calcular estadísticas sobre los productos. Esto equivale a
//  GROUP BY, SUM, AVG, COUNT en SQL pero con sintaxis MongoDB.

app.get("/api/estadisticas", async (req, res) => {
  try {
    const [resumenGeneral, porCategoria] = await Promise.all([

      // Pipeline 1: estadísticas generales
      Producto.aggregate([
        { $match: { activo: true } },
        // $match → filtra documentos (equivale a WHERE)

        { $group: {
          _id: null,
          // _id: null → agrupa TODOS los documentos en un solo grupo.
          // Si usáramos _id: "$categoria", agruparía por categoría.

          totalProductos:   { $sum: 1 },
          // $sum: 1 → cuenta documentos (suma 1 por cada uno)

          precioPromedio:   { $avg: "$precio" },
          // $avg: "$campo" → calcula el promedio del campo
          // El $ antes del nombre indica que es un campo del documento.

          precioMaximo:     { $max: "$precio" },
          precioMinimo:     { $min: "$precio" },
          stockTotal:       { $sum: "$stock" },
          calificacionMedia:{ $avg: "$calificacion.promedio" },
          // Accedemos a campos anidados con punto (dot notation)
        }},

        { $project: {
          _id: 0,
          // $project → selecciona qué campos devolver (equivale a SELECT)
          // _id: 0 → excluye el campo _id de la salida

          totalProductos: 1,
          precioPromedio: { $round: ["$precioPromedio", 0] },
          // $round: [campo, decimales] → redondea al número de decimales
          precioMaximo: 1,
          precioMinimo: 1,
          stockTotal: 1,
          calificacionMedia: { $round: ["$calificacionMedia", 2] },
        }},
      ]),

      // Pipeline 2: estadísticas por categoría
      Producto.aggregate([
        { $match: { activo: true } },
        { $group: {
          _id: "$categoria",
          // Agrupa por el ObjectId de la categoría
          totalProductos: { $sum: 1 },
          precioPromedio: { $avg: "$precio" },
          stockTotal: { $sum: "$stock" },
        }},
        { $lookup: {
          // $lookup → JOIN con otra colección (el equivalente a SQL JOIN)
          from: "categorias",    // colección a joinear
          localField: "_id",     // campo de esta colección
          foreignField: "_id",   // campo de la colección "categorias"
          as: "infoCategoria",   // nombre del campo resultado
        }},
        // Después del $lookup, cada documento tiene:
        // { _id: ObjectId, totalProductos: 3, ..., infoCategoria: [{...}] }
        // infoCategoria es un ARRAY — siempre lo es con $lookup.

        { $unwind: "$infoCategoria" },
        // $unwind → convierte el array infoCategoria en un objeto único.
        // Antes: infoCategoria: [{ nombre: "electrónica" }]
        // Después: infoCategoria: { nombre: "electrónica" }

        { $project: {
          _id: 0,
          categoria: "$infoCategoria.nombre",
          totalProductos: 1,
          precioPromedio: { $round: ["$precioPromedio", 0] },
          stockTotal: 1,
        }},
        { $sort: { totalProductos: -1 } },
      ]),
    ]);

    res.status(200).json({
      exito: true,
      general: resumenGeneral[0] || {},
      porCategoria,
    });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ════════════════════════════════════════════════════════════
//  RUTA SEED — Inserta datos de prueba iniciales
// ════════════════════════════════════════════════════════════

app.post("/api/seed", async (req, res) => {
  try {
    // Limpiamos las colecciones para empezar desde cero
    await Promise.all([
      Categoria.deleteMany({}),
      Producto.deleteMany({}),
    ]);
    // Promise.all → ejecuta ambas en paralelo.
    // Más rápido que hacerlos secuencialmente.

    // Creamos las categorías
    const categorias = await Categoria.insertMany([
      { nombre: "electrónica",  descripcion: "Dispositivos electrónicos y gadgets",   icono: "💻", orden: 1 },
      { nombre: "accesorios",   descripcion: "Accesorios para computadores y móviles", icono: "🖱️",  orden: 2 },
      { nombre: "periféricos",  descripcion: "Teclados, mouse, monitores y más",       icono: "⌨️",  orden: 3 },
      { nombre: "mobiliario",   descripcion: "Muebles y ergonomía para oficina",       icono: "🪑",  orden: 4 },
    ]);
    // insertMany() → inserta múltiples documentos en una sola operación.
    // Más eficiente que hacer varios create() individuales.
    // Retorna un array con los documentos creados (con sus _id asignados).

    // Mapeamos los nombres a sus _id para usarlos en los productos
    const catPorNombre = {};
    categorias.forEach((c) => { catPorNombre[c.nombre] = c._id; });
    // Resultado: { "electrónica": ObjectId("..."), "accesorios": ObjectId("...") }

    // Creamos los productos
    await Producto.insertMany([
      {
        nombre: "laptop hp pavilion",
        // El pre('save') hook normalizará esto a "Laptop Hp Pavilion"
        descripcion: "Intel i5 de 11va gen, 8GB RAM, 512GB SSD, 15.6\" FHD",
        precio: 2500000,
        stock: 15,
        categoria: catPorNombre["electrónica"],
        etiquetas: ["laptop", "hp", "intel", "ssd"],
        calificacion: { promedio: 4.5, totalReseñas: 127 },
        destacado: true,
      },
      {
        nombre: "macbook air m2",
        descripcion: "Apple chip M2, 8GB RAM unificada, 256GB SSD, 13.6\"",
        precio: 5800000,
        precioAnterior: 6200000,
        stock: 8,
        categoria: catPorNombre["electrónica"],
        etiquetas: ["laptop", "apple", "m2", "mac"],
        calificacion: { promedio: 4.9, totalReseñas: 342 },
        destacado: true,
      },
      {
        nombre: "mouse inalámbrico logitech mx master 3",
        descripcion: "Bluetooth + USB, 4000 DPI, recargable, ergonómico",
        precio: 280000,
        stock: 45,
        categoria: catPorNombre["accesorios"],
        etiquetas: ["mouse", "logitech", "inalambrico", "ergonomico"],
        calificacion: { promedio: 4.8, totalReseñas: 891 },
      },
      {
        nombre: "teclado mecánico keychron k2",
        descripcion: "Switches Brown táctiles, TKL, compatible Mac/Windows",
        precio: 320000,
        stock: 30,
        categoria: catPorNombre["periféricos"],
        etiquetas: ["teclado", "mecanico", "keychron", "tactil"],
        calificacion: { promedio: 4.7, totalReseñas: 456 },
      },
      {
        nombre: 'monitor lg 27" 4k uhd',
        descripcion: "IPS 4K 60Hz, HDR400, USB-C 65W, ideal para diseño",
        precio: 1800000,
        precioAnterior: 2100000,
        stock: 12,
        categoria: catPorNombre["periféricos"],
        etiquetas: ["monitor", "lg", "4k", "ips", "uhd"],
        calificacion: { promedio: 4.6, totalReseñas: 203 },
        destacado: true,
      },
      {
        nombre: "silla ergonómica secretlab titan",
        descripcion: "Malla transpirable, soporte lumbar, max 130kg, 5 años garantía",
        precio: 1200000,
        stock: 7,
        categoria: catPorNombre["mobiliario"],
        etiquetas: ["silla", "ergonomica", "oficina", "gaming"],
        calificacion: { promedio: 4.4, totalReseñas: 178 },
      },
    ]);

    res.status(201).json({
      exito: true,
      mensaje: "✅ Datos de prueba insertados exitosamente",
      resumen: {
        categorias: categorias.length,
        productos: 6,
      },
      siguientePaso: "Ahora prueba GET /api/productos para ver los datos",
    });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: error.message });
  }
});


// ════════════════════════════════════════════════════════════
//  MIDDLEWARES FINALES
// ════════════════════════════════════════════════════════════

// 404 — Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: `La ruta '${req.method} ${req.url}' no existe en esta API`,
    ayuda: "Consulta GET / para ver las rutas disponibles",
  });
});

// 500 — Manejo global de errores
app.use((err, req, res, next) => {
  console.error("❌ Error no capturado:", err.stack);
  res.status(500).json({
    exito: false,
    mensaje: process.env.NODE_ENV === "development" ? err.message : "Error interno del servidor",
  });
});


// ════════════════════════════════════════════════════════════
//  INICIAR SERVIDOR
// ════════════════════════════════════════════════════════════

app.listen(PUERTO, () => {
  console.log("\n════════════════════════════════════════════");
  console.log("  🚀 API MONGOOSE + MONGODB ATLAS INICIADA");
  console.log("════════════════════════════════════════════");
  console.log(`  ✅  URL:    http://localhost:${PUERTO}`);
  console.log(`  ✅  API:    http://localhost:${PUERTO}/api/productos`);
  console.log(`  ✅  Stats:  http://localhost:${PUERTO}/api/estadisticas`);
  console.log("");
  console.log("  📋 Primer paso obligatorio:");
  console.log(`     POST http://localhost:${PUERTO}/api/seed`);
  console.log("");
  console.log("  📋 Luego prueba estas rutas en el navegador:");
  console.log(`     GET  http://localhost:${PUERTO}/api/productos`);
  console.log(`     GET  http://localhost:${PUERTO}/api/categorias`);
  console.log(`     GET  http://localhost:${PUERTO}/api/productos/baratos?max=300000`);
  console.log(`     GET  http://localhost:${PUERTO}/api/estadisticas`);
  console.log("");
  console.log("  📋 Para crear/actualizar/eliminar usa Postman:");
  console.log(`     POST   http://localhost:${PUERTO}/api/productos`);
  console.log(`     PUT    http://localhost:${PUERTO}/api/productos/:id`);
  console.log(`     DELETE http://localhost:${PUERTO}/api/productos/:id`);
  console.log("");
  console.log("  🛑 Para detener el servidor: Ctrl + C");
  console.log("════════════════════════════════════════════\n");
});


// ════════════════════════════════════════════════════════════
//  CIERRE LIMPIO DEL SERVIDOR
// ════════════════════════════════════════════════════════════

process.on("SIGINT", async () => {
  console.log("\n\n  ⏹️  Cerrando servidor y conexión a MongoDB...");
  await mongoose.connection.close();
  // Cerramos la conexión a MongoDB limpiamente antes de terminar.
  // Esto libera los recursos del pool de conexiones en Atlas.
  console.log("  ✅  Conexión a MongoDB cerrada correctamente.");
  console.log("  👋  ¡Hasta la próxima!\n");
  process.exit(0);
});


// ════════════════════════════════════════════════════════════
//  CONEXIÓN CON TU PROYECTO DE BACKEND
// ════════════════════════════════════════════════════════════
//
//  Todo lo que ves aquí es exactamente el patrón que usas
//  en tu proyecto real. Las diferencias son de organización:
//
//  EN ESTE ARCHIVO (monolítico para aprender):
//  Todo está en un solo archivo: schemas, models, rutas, etc.
//
//  EN UN PROYECTO REAL (organizado en carpetas):
//  src/
//  ├── index.js              ← arranca el servidor (app.listen)
//  ├── app.js                ← configura Express y middlewares
//  ├── config/
//  │   └── db.js             ← mongoose.connect() va aquí
//  ├── models/
//  │   ├── Categoria.js      ← categoriaSchema + Categoria model
//  │   └── Producto.js       ← productoSchema + Producto model
//  ├── controllers/
//  │   ├── categoria.controller.js  ← la lógica de las rutas
//  │   └── producto.controller.js
//  ├── routes/
//  │   ├── categoria.routes.js      ← express.Router() con las rutas
//  │   └── producto.routes.js
//  └── middlewares/
//      ├── auth.middleware.js       ← verifica el JWT
//      └── error.middleware.js      ← manejo de errores global
//
//  PATRONES QUE YA USAS EN TU PROYECTO:
//
//  require("dotenv").config()         → cargar variables de entorno
//  mongoose.connect(process.env.MONGODB_URI)  → conectar a Atlas
//  const Task = mongoose.model('Task', taskSchema)  → crear model
//  await Task.find({ usuario: userId })  → consultar documentos
//  await Task.findById(req.params.id)    → buscar por ID
//  await nuevaTarea.save()               → guardar en MongoDB
//  await Task.findByIdAndUpdate(id, ...) → actualizar
//  await Task.findByIdAndDelete(id)      → eliminar
//  if (error.name === 'ValidationError') → manejo de errores
//  if (error.name === 'CastError')       → ID inválido