// ============================================================
//  📘 INVESTIGACIÓN #5 — BASES DE DATOS NO RELACIONALES
// ============================================================
//
//  Antes de entender MongoDB, necesitamos entender QUÉ SON
//  las bases de datos no relacionales y por qué existen.
//
//  ─────────────────────────────────────────────────────────
//  PRIMERO: ¿QUÉ ES UNA BASE DE DATOS RELACIONAL? (SQL)
//  ─────────────────────────────────────────────────────────
//  Las bases de datos relacionales (MySQL, PostgreSQL, SQL Server)
//  guardan la información en TABLAS con filas y columnas,
//  como una hoja de Excel.
//
//  Ejemplo tabla "usuarios" en SQL:
//  ┌────┬──────────────┬────────────────────┬──────┐
//  │ id │    nombre    │       email        │ edad │
//  ├────┼──────────────┼────────────────────┼──────┤
//  │  1 │ Juan Pérez   │ juan@email.com     │  25  │
//  │  2 │ Ana García   │ ana@email.com      │  30  │
//  │  3 │ Luis Torres  │ luis@email.com     │  22  │
//  └────┴──────────────┴────────────────────┴──────┘
//
//  Características SQL (Relacionales):
//  ✅ Estructura FIJA y rígida (esquema predefinido)
//  ✅ Los datos están muy bien organizados
//  ✅ Relaciones entre tablas mediante JOIN
//  ✅ ACID: Atomicidad, Consistencia, Isolación, Durabilidad
//  ❌ Difícil de escalar horizontalmente
//  ❌ Poca flexibilidad para cambiar la estructura
//  ❌ No manejan bien datos no estructurados
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES UNA BASE DE DATOS NO RELACIONAL? (NoSQL)
//  ─────────────────────────────────────────────────────────
//  NoSQL = "Not Only SQL"
//
//  NO usan tablas. Guardan la información en distintos formatos
//  según el tipo:
//
//  1. 📄 DOCUMENTOS (MongoDB, CouchDB, Firebase Firestore)
//     Guardan datos como documentos JSON/BSON.
//     Cada documento puede tener estructura diferente.
//
//  2. 🔑 CLAVE-VALOR (Redis, DynamoDB, Memcached)
//     Pares clave:valor, como un diccionario.
//     Muy rápidos. Ideales para caché y sesiones.
//
//  3. 📊 COLUMNAR (Cassandra, HBase)
//     Guardan datos en columnas en lugar de filas.
//     Ideales para analíticas de grandes volúmenes.
//
//  4. 🕸️  GRAFOS (Neo4j, Amazon Neptune)
//     Guardan nodos y relaciones entre ellos.
//     Ideales para redes sociales y recomendaciones.
//
//  ─────────────────────────────────────────────────────────
//  COMPARACIÓN: SQL vs NoSQL
//  ─────────────────────────────────────────────────────────
//
//  ┌───────────────────┬──────────────────┬────────────────────┐
//  │   Característica  │       SQL        │       NoSQL        │
//  ├───────────────────┼──────────────────┼────────────────────┤
//  │ Estructura        │ Tablas (rígida)  │ Flexible           │
//  │ Esquema           │ Fijo             │ Dinámico           │
//  │ Escalabilidad     │ Vertical         │ Horizontal         │
//  │ Relaciones        │ JOINs            │ Documentos anidados│
//  │ Velocidad lectura │ Media            │ Muy alta           │
//  │ Consistencia      │ Alta (ACID)      │ Eventual           │
//  │ Ejemplos          │ MySQL, PostgreSQL │ MongoDB, Redis    │
//  └───────────────────┴──────────────────┴────────────────────┘
//
//  ¿CUÁNDO USAR NoSQL?
//  ✅ Datos variables o sin estructura fija
//  ✅ Necesitas escalar a millones de usuarios
//  ✅ Datos en tiempo real
//  ✅ Aplicaciones web modernas, mobile apps, IoT
//
//  ¿CUÁNDO USAR SQL?
//  ✅ Datos con relaciones complejas
//  ✅ Consistencia crítica (bancos, contabilidad)
//  ✅ Estructura de datos estable y bien definida
//
//  ─────────────────────────────────────────────────────────
//  📘 ¿QUÉ ES MONGODB?
//  ─────────────────────────────────────────────────────────
//  MongoDB es la base de datos NoSQL de tipo DOCUMENTAL más
//  popular del mundo. Creada en 2007. El nombre viene de
//  "humongous" (enorme/gigantesco).
//
//  Guarda datos como DOCUMENTOS en formato BSON (Binary JSON).
//  Para nosotros los programadores, se ve exactamente igual
//  que un objeto JSON de JavaScript.
//
//  Ejemplo de UN documento en MongoDB:
//  {
//    "_id": "64abc123def456...",     ← ID único generado por MongoDB
//    "nombre": "Juan Pérez",
//    "email": "juan@email.com",
//    "edad": 25,
//    "direccion": {                   ← Objeto anidado (no necesita otra tabla)
//      "ciudad": "Cali",
//      "pais": "Colombia"
//    },
//    "compras": [                     ← Array (tampoco necesita otra tabla)
//      { "producto": "Laptop", "precio": 2500000 },
//      { "producto": "Mouse",  "precio": 85000   }
//    ]
//  }
//
//  En SQL esto requeriría 3 tablas + JOINs.
//  En MongoDB todo vive en un solo documento. Mucho más
//  natural para trabajar con JavaScript.
//
//  TERMINOLOGÍA: MONGODB vs SQL
//  ─────────────────────────────
//  SQL                → MongoDB
//  Base de datos      → Database
//  Tabla (table)      → Colección (collection)
//  Fila (row)         → Documento (document)
//  Columna (column)   → Campo (field)
//  Primary Key        → _id (ObjectId)
//  JOIN               → $lookup / documentos anidados
//
//  ─────────────────────────────────────────────────────────
//  ☁️  ¿QUÉ ES MONGO ATLAS?
//  ─────────────────────────────────────────────────────────
//  MongoDB Atlas es MongoDB EN LA NUBE. En vez de instalar
//  MongoDB en tu computador, Atlas te da una base de datos
//  en internet. Es gratis en su plan M0 (Sandbox).
//
//  PASOS PARA CREAR CUENTA GRATUITA EN MONGO ATLAS:
//  ──────────────────────────────────────────────────
//
//  PASO 1: Ve a https://www.mongodb.com/atlas/database
//          Clic en "Try Free" → Regístrate con email o Google
//
//  PASO 2: Crear el Cluster gratuito
//          - Tipo: FREE (M0 Sandbox — gratis para siempre)
//          - Proveedor: AWS, Google Cloud o Azure (cualquiera)
//          - Región: la más cercana (ej: us-east-1)
//          - Clic "Create Cluster" y espera ~2 minutos
//
//  PASO 3: Crear usuario de base de datos
//          - Menú izquierdo → "Database Access"
//          - Clic "Add New Database User"
//          - Username: admin (o el que quieras)
//          - Password: una contraseña segura (¡GUÁRDALA!)
//          - Role: "Atlas admin"
//          - Clic "Add User"
//
//  PASO 4: Permitir conexiones desde tu IP
//          - Menú izquierdo → "Network Access"
//          - Clic "Add IP Address"
//          - Clic "Allow Access from Anywhere" (para desarrollo)
//          - Clic "Confirm"
//
//  PASO 5: Obtener la cadena de conexión (Connection String)
//          - Ve a tu cluster → Clic "Connect"
//          - Elige "Connect your application"
//          - Driver: Node.js | Versión: 5.5 or later
//          - Copia la cadena. Luce así:
//            mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/
//          - Reemplaza <password> con tu contraseña real
//          - Agrega el nombre de tu BD al final:
//            mongodb+srv://admin:mipass@cluster0.xxxxx.mongodb.net/tiendaDB
//
//  PASO 6: Guarda esa cadena en un archivo .env:
//          MONGODB_URI=mongodb+srv://admin:mipass@cluster0.xxxxx.mongodb.net/tiendaDB
//          ⚠️  NUNCA escribas la contraseña directamente en el código
//          ⚠️  NUNCA subas el archivo .env a GitHub
//
// ============================================================
//  🧪 EJEMPLO — Simulación de estructura MongoDB en JavaScript
// ============================================================
//  INSTRUCCIONES: node 05_mongodb_no_relacional.js
// ============================================================

"use strict";

console.log("=================================================");
console.log("  🍃 BASES DE DATOS NO RELACIONALES & MONGODB");
console.log("=================================================\n");

// ─────────────────────────────────────────────────────────
//  Los documentos de MongoDB son exactamente objetos JS/JSON.
//  Aquí simulamos dos colecciones: "usuarios" y "productos"
// ─────────────────────────────────────────────────────────

const coleccionUsuarios = [
  {
    _id: "64abc001def456789012aa01",
    nombre: "Juan Pérez",
    email: "juan@email.com",
    edad: 25,
    activo: true,
    fechaRegistro: new Date("2024-01-15"),
    // Objeto anidado — en SQL sería otra tabla "direcciones"
    direccion: { ciudad: "Cali", departamento: "Valle del Cauca", pais: "Colombia" },
    // Array — en SQL sería otra tabla "roles_usuario"
    roles: ["usuario", "comprador"],
  },
  {
    _id: "64abc002def456789012aa02",
    nombre: "Ana García",
    email: "ana@email.com",
    edad: 30,
    activo: true,
    fechaRegistro: new Date("2024-03-20"),
    direccion: { ciudad: "Bogotá", departamento: "Cundinamarca", pais: "Colombia" },
    roles: ["usuario", "comprador", "vendedor"],
    tiendaOnline: "Ana's Shop", // ← Campo EXTRA que Juan no tiene — válido en NoSQL
  },
  {
    _id: "64abc003def456789012aa03",
    nombre: "Carlos López",
    email: "carlos@email.com",
    edad: 22,
    activo: false,
    fechaRegistro: new Date("2024-06-10"),
    direccion: { ciudad: "Medellín", departamento: "Antioquia", pais: "Colombia" },
    roles: ["usuario"],
  },
];

const coleccionProductos = [
  {
    _id: "64bcd001ef567890123bb01",
    nombre: "Laptop HP",
    precio: 2500000,
    categoria: "electronica",
    stock: 15,
    // Documento anidado con detalles técnicos
    especificaciones: { ram: "8GB", procesador: "Intel Core i5", almacenamiento: "512GB SSD" },
    etiquetas: ["laptop", "hp", "computador"],
  },
  {
    _id: "64bcd002ef567890123bb02",
    nombre: "Mouse Inalámbrico",
    precio: 85000,
    categoria: "accesorios",
    stock: 50,
    especificaciones: { conexion: "Bluetooth + USB", bateria: "AA x1", dpi: 1600 },
    etiquetas: ["mouse", "inalambrico"],
  },
];

// ── Mostramos los documentos ──────────────────────────────
console.log("📂 COLECCIÓN 'usuarios' (3 documentos):");
console.log("─────────────────────────────────────────");
coleccionUsuarios.forEach((u, i) => {
  console.log(`\n  Documento ${i + 1}:`);
  console.log(
    JSON.stringify(u, null, 4)
      .split("\n")
      .map((l) => "  " + l)
      .join("\n")
  );
});

console.log("\n\n📂 COLECCIÓN 'productos' (2 documentos):");
console.log("──────────────────────────────────────────");
coleccionProductos.forEach((p, i) => {
  console.log(`\n  Documento ${i + 1}:`);
  console.log(
    JSON.stringify(p, null, 4)
      .split("\n")
      .map((l) => "  " + l)
      .join("\n")
  );
});

// ── Simulamos operaciones CRUD de MongoDB ────────────────
console.log("\n\n🔧 SIMULACIÓN DE OPERACIONES CRUD EN MONGODB:");
console.log("───────────────────────────────────────────────");

// READ — find(): buscar todos los usuarios activos
const activos = coleccionUsuarios.filter((u) => u.activo === true);
console.log(`\n  🔍 find({ activo: true }) → ${activos.length} usuario(s):`);
activos.forEach((u) => console.log(`     - ${u.nombre} (${u.direccion.ciudad})`));

// READ — buscar por campo anidado "direccion.ciudad"
const deCali = coleccionUsuarios.filter((u) => u.direccion.ciudad === "Cali");
console.log(`\n  🔍 find({ "direccion.ciudad": "Cali" }):`);
deCali.forEach((u) => console.log(`     → ${u.nombre}`));

// INSERT — insertOne(): agregar un nuevo documento
const nuevoUsuario = {
  _id: "64abc004def456789012aa04",
  nombre: "María Rodríguez",
  email: "maria@email.com",
  edad: 27,
  activo: true,
  fechaRegistro: new Date(),
  direccion: { ciudad: "Barranquilla", departamento: "Atlántico", pais: "Colombia" },
  roles: ["usuario"],
};
coleccionUsuarios.push(nuevoUsuario);
console.log(`\n  ➕ insertOne({ nombre: "María Rodríguez" })`);
console.log(`     → _id asignado: ${nuevoUsuario._id}`);
console.log(`     → Total documentos en colección: ${coleccionUsuarios.length}`);

// UPDATE — updateOne() con $set: actualizar solo un campo
const aActualizar = coleccionUsuarios.find((u) => u._id === "64abc001def456789012aa01");
aActualizar.edad = 26; // Simulamos { $set: { edad: 26 } }
console.log(`\n  ✏️  updateOne({ _id: "..." }, { $set: { edad: 26 } })`);
console.log(`     → ${aActualizar.nombre} ahora tiene edad: ${aActualizar.edad}`);

// DELETE — deleteOne(): eliminar un documento
const idx = coleccionUsuarios.findIndex((u) => u._id === "64abc003def456789012aa03");
const eliminado = coleccionUsuarios.splice(idx, 1)[0];
console.log(`\n  🗑️  deleteOne({ _id: "..." })`);
console.log(`     → "${eliminado.nombre}" eliminado exitosamente`);
console.log(`     → Total documentos ahora: ${coleccionUsuarios.length}`);

// ── Comparación SQL vs MongoDB ────────────────────────────
console.log("\n\n📊 COMPARACIÓN SQL vs MONGODB — misma consulta:");
console.log("─────────────────────────────────────────────────");
console.log("\n  Obtener usuarios activos de Cali:\n");

console.log("  🗄️  SQL (necesita JOIN entre dos tablas):");
console.log("  SELECT u.nombre, u.email, d.ciudad");
console.log("  FROM usuarios u");
console.log("  INNER JOIN direcciones d ON u.id = d.usuario_id");
console.log("  WHERE u.activo = 1 AND d.ciudad = 'Cali';");

console.log("\n  🍃 MongoDB (todo en un solo documento, sin JOIN):");
console.log('  db.usuarios.find({');
console.log('    activo: true,');
console.log('    "direccion.ciudad": "Cali"');
console.log('  })');

console.log("\n  ✅ MongoDB no necesita JOIN porque la dirección");
console.log("     ya vive DENTRO del mismo documento.\n");

console.log("✅ Investigación completada. Ejecuta: node 05_mongodb_no_relacional.js\n");