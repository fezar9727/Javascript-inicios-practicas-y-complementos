// ============================================================
//  📘 INVESTIGACIÓN #5 — BASES DE DATOS NO RELACIONALES
// ============================================================
//
//  Antes de entender MongoDB, necesitamos entender QUÉ SON
//  las bases de datos no relacionales y por qué existen.
//  Para eso, primero debemos entender qué problema resuelven
//  comparándolas con lo que ya existía: las bases de datos
//  relacionales (SQL).
//
//  ─────────────────────────────────────────────────────────
//  UN POCO DE HISTORIA — ¿Por qué nacieron las NoSQL?
//  ─────────────────────────────────────────────────────────
//
//  Durante décadas, las bases de datos relacionales (SQL)
//  dominaron el mundo del software. MySQL, PostgreSQL, Oracle,
//  SQL Server. Todo el mundo usaba tablas y filas.
//
//  Pero alrededor del año 2000 llegó un problema nuevo:
//  internet escaló de millones a MILES DE MILLONES de usuarios.
//  Empresas como Google, Amazon, Facebook, Twitter empezaron a
//  manejar volúmenes de datos que las bases relacionales no
//  podían soportar eficientemente.
//
//  El problema no era solo el volumen — era la VARIEDAD:
//  un tweet no tiene la misma estructura que un perfil de
//  usuario, que a su vez no tiene la misma estructura que
//  un producto de e-commerce. Forzar toda esa variedad en
//  tablas rígidas era cada vez más complejo y lento.
//
//  En 2007 nació MongoDB. En 2008 llegó Cassandra (Facebook).
//  El movimiento "NoSQL" (Not Only SQL) estaba en marcha.
//
//  La idea: no abandonar SQL (sigue siendo excelente para
//  muchos casos), sino tener alternativas que resuelvan
//  mejor los casos donde SQL no escala bien.
//
//  ─────────────────────────────────────────────────────────
//  PRIMERO: ¿QUÉ ES UNA BASE DE DATOS RELACIONAL? (SQL)
//  ─────────────────────────────────────────────────────────
//
//  Las bases de datos relacionales guardan información en
//  TABLAS — exactamente como una hoja de Excel. Cada tabla
//  tiene columnas definidas de antemano (el ESQUEMA) y las
//  filas son los datos.
//
//  El "relacional" viene de que las tablas se RELACIONAN
//  entre sí usando claves foráneas (foreign keys) y JOINs.
//
//  Ejemplo: tabla "usuarios" en SQL:
//  ┌────┬──────────────┬────────────────────┬──────┐
//  │ id │    nombre    │       email        │ edad │
//  ├────┼──────────────┼────────────────────┼──────┤
//  │  1 │ Juan Pérez   │ juan@email.com     │  25  │
//  │  2 │ Ana García   │ ana@email.com      │  30  │
//  │  3 │ Luis Torres  │ luis@email.com     │  22  │
//  └────┴──────────────┴────────────────────┴──────┘
//
//  Si quieres guardar la dirección de cada usuario, NO puedes
//  simplemente agregar columnas "ciudad" y "pais" al usuario
//  si un usuario puede tener múltiples direcciones. Necesitas
//  una tabla separada "direcciones":
//
//  Tabla "direcciones":
//  ┌────┬────────────┬────────────────┬────────────┬────────────┐
//  │ id │ usuario_id │    ciudad      │  depto.    │    pais    │
//  ├────┼────────────┼────────────────┼────────────┼────────────┤
//  │  1 │     1      │ Cali           │ Valle      │ Colombia   │
//  │  2 │     2      │ Bogotá         │ Cundi.     │ Colombia   │
//  └────┴────────────┴────────────────┴────────────┴────────────┘
//
//  Para obtener el usuario con su dirección, necesitas un JOIN:
//  SELECT u.nombre, d.ciudad
//  FROM usuarios u
//  INNER JOIN direcciones d ON u.id = d.usuario_id
//  WHERE u.id = 1;
//
//  Características SQL (Relacionales):
//  ✅ Estructura FIJA — el esquema se define antes de insertar datos
//  ✅ Datos bien organizados y sin duplicación (normalización)
//  ✅ Relaciones entre tablas mediante JOINs
//  ✅ ACID — garantías fuertes de consistencia (ver abajo)
//  ✅ SQL es un lenguaje estándar, universal
//  ✅ Ideal para datos con relaciones complejas y consistencia crítica
//  ❌ Difícil de escalar horizontalmente (añadir más servidores)
//  ❌ Poca flexibilidad para cambiar la estructura (migraciones dolorosas)
//  ❌ No maneja bien datos no estructurados o muy variables
//  ❌ Los JOINs se vuelven lentos con millones de registros
//
//  ¿QUÉ ES ACID?
//  ACID son las 4 garantías que una base de datos relacional
//  debe cumplir para cada transacción:
//  - Atomicidad:   Todo se guarda o nada se guarda. No hay estados medios.
//  - Consistencia: Los datos siempre están en un estado válido.
//  - Isolación:    Las transacciones paralelas no se interfieren.
//  - Durabilidad:  Lo que se confirmó (commit) nunca se pierde.
//
//  Ejemplo de por qué ACID importa:
//  En un banco, transferir $100 de cuenta A a cuenta B son dos
//  operaciones: descontar de A y agregar a B. Con ACID, si la
//  segunda falla, la primera se revierte. Sin ACID, podrías
//  perder el dinero de A sin que llegue a B.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES UNA BASE DE DATOS NO RELACIONAL? (NoSQL)
//  ─────────────────────────────────────────────────────────
//
//  NoSQL = "Not Only SQL" (No solo SQL — no es un rechazo a SQL,
//  sino una extensión del concepto para otros casos de uso).
//
//  Las bases NoSQL NO usan tablas fijas. Guardan la información
//  en diferentes formatos según el tipo de base de datos.
//  Hay 4 grandes tipos:
//
//  ────────────────────────────────────────────────────────
//  TIPO 1: DOCUMENTOS (MongoDB, CouchDB, Firebase Firestore)
//  ────────────────────────────────────────────────────────
//  Guardan datos como DOCUMENTOS, que son básicamente objetos
//  JSON/BSON. Cada documento puede tener una estructura
//  diferente al siguiente. No hay esquema fijo.
//
//  Fortaleza: muy natural para JavaScript, permite datos anidados
//  sin JOINs, flexible para estructuras variables.
//  Úsalo para: aplicaciones web, APIs REST, catálogos de productos,
//  perfiles de usuario, blogs, e-commerce.
//
//  ────────────────────────────────────────────────────────
//  TIPO 2: CLAVE-VALOR (Redis, DynamoDB, Memcached)
//  ────────────────────────────────────────────────────────
//  La estructura más simple posible: una CLAVE y su VALOR.
//  Como un diccionario o un objeto JavaScript simple.
//
//  clave: "sesion:usuario123"
//  valor: '{"userId": 1, "nombre": "Juan", "expira": "2024-12-31"}'
//
//  Fortaleza: EXTREMADAMENTE rápidos porque la búsqueda por
//  clave es O(1) — acceso directo sin búsqueda.
//  Úsalo para: caché, sesiones de usuario, colas de mensajes,
//  contadores en tiempo real (likes, visitas), leaderboards.
//
//  Redis es el más popular. Tu backend puede usar Redis para
//  no consultar MongoDB en cada petición de un dato que no cambia.
//
//  ────────────────────────────────────────────────────────
//  TIPO 3: COLUMNAR (Cassandra, HBase, Google Bigtable)
//  ────────────────────────────────────────────────────────
//  Parece una tabla pero los datos se guardan por COLUMNA,
//  no por fila. Óptimo para leer una columna de millones de filas.
//
//  En SQL (por filas):  leer una columna requiere leer TODAS las filas
//  En Columnar:         leer una columna es acceso directo al bloque
//
//  Fortaleza: analítica de grandes volúmenes, escrituras masivas.
//  Úsalo para: métricas, logs, historial de eventos, IoT (sensores),
//  analítica de negocio.
//
//  ────────────────────────────────────────────────────────
//  TIPO 4: GRAFOS (Neo4j, Amazon Neptune, ArangoDB)
//  ────────────────────────────────────────────────────────
//  Guardan datos como NODOS (entidades) y ARISTAS (relaciones).
//  Modelan directamente la estructura de un grafo matemático.
//
//  Nodo: { id: 1, tipo: "Persona", nombre: "Juan" }
//  Nodo: { id: 2, tipo: "Persona", nombre: "Ana" }
//  Arista: { desde: 1, hasta: 2, relacion: "AMIGO_DE" }
//
//  Fortaleza: encontrar relaciones entre entidades a múltiples
//  niveles de profundidad es instantáneo (en SQL requeriría
//  JOINs recursivos enormes y lentos). 
//  Úsalo para: redes sociales ("amigos de amigos"), sistemas de
//  recomendación ("también le gustó a personas como tú"),
//  detección de fraude, mapas de conocimiento.
//
//  ─────────────────────────────────────────────────────────
//  COMPARACIÓN COMPLETA: SQL vs NoSQL
//  ─────────────────────────────────────────────────────────
//
//  ┌────────────────────┬─────────────────────┬──────────────────────┐
//  │    Característica  │        SQL           │        NoSQL         │
//  ├────────────────────┼─────────────────────┼──────────────────────┤
//  │ Estructura         │ Tablas rígidas       │ Flexible (docs/kv)   │
//  │ Esquema            │ Fijo, predefinido    │ Dinámico, opcional   │
//  │ Escalabilidad      │ Vertical (+ potencia)│ Horizontal (+ nodos) │
//  │ Relaciones         │ JOINs entre tablas   │ Documentos anidados  │
//  │ Velocidad lectura  │ Media-Alta           │ Muy alta             │
//  │ Consistencia       │ Fuerte (ACID)        │ Eventual             │
//  │ Flexibilidad datos │ Baja                 │ Muy alta             │
//  │ Curva aprendizaje  │ Alta (SQL complejo)  │ Media (JSON natural) │
//  │ Casos ideales      │ Bancos, ERP, contab. │ Web, apps, IoT       │
//  │ Ejemplos           │ MySQL, PostgreSQL    │ MongoDB, Redis       │
//  └────────────────────┴─────────────────────┴──────────────────────┘
//
//  ¿QUÉ ES CONSISTENCIA EVENTUAL (NoSQL)?
//  En NoSQL distribuido, cuando escribes un dato en un servidor,
//  otros servidores del cluster pueden tardar milisegundos en
//  tener el dato actualizado. "Eventualmente" todos tendrán
//  la misma versión. Para la mayoría de apps web esto no importa.
//  Para un banco, sí importaría (necesitaría ACID fuerte).
//
//  ¿CUÁNDO USAR NoSQL (MongoDB)?
//  ✅ Datos con estructura variable o que cambia frecuentemente
//  ✅ Necesitas escalar a millones de usuarios rápidamente
//  ✅ Datos anidados o en árbol (usuario con pedidos con items)
//  ✅ Prototipos y startups (no pierdes tiempo en migraciones)
//  ✅ Aplicaciones web modernas, mobile, IoT
//  ✅ Tu equipo ya sabe JavaScript (JSON se siente natural)
//
//  ¿CUÁNDO USAR SQL?
//  ✅ Datos con relaciones muy complejas entre muchas entidades
//  ✅ Consistencia crítica sin excepciones (finanzas, salud)
//  ✅ Estructura de datos estable y bien definida
//  ✅ Necesitas consultas analíticas complejas (GROUP BY, HAVING)
//  ✅ El equipo ya domina SQL y el proyecto lo requiere
//
//  LA RESPUESTA REAL: no tienes que elegir uno solo.
//  Muchas empresas usan AMBOS:
//  PostgreSQL para datos financieros (transacciones, facturas)
//  MongoDB para perfiles de usuario, catálogos de productos
//  Redis para caché y sesiones
//
//  ─────────────────────────────────────────────────────────
//  📘 ¿QUÉ ES MONGODB? — En profundidad
//  ─────────────────────────────────────────────────────────
//
//  MongoDB es la base de datos NoSQL de tipo DOCUMENTAL más
//  popular del mundo. Fue creada en 2007 por la empresa 10gen
//  (hoy MongoDB Inc.). El nombre viene de "humongous" (enorme).
//
//  MongoDB guarda datos como DOCUMENTOS en formato BSON
//  (Binary JSON — JSON almacenado en binario para ser más
//  eficiente). Para nosotros los programadores, se ve y se
//  maneja exactamente igual que un objeto JSON de JavaScript.
//
//  LA JERARQUÍA DE MONGODB:
//  ─────────────────────────
//  MongoDB Server (la instancia)
//    └── Database (base de datos, ej: "tiendaDB")
//         └── Collection (colección, ej: "usuarios")
//              └── Document (documento, ej: { nombre: "Juan", ... })
//                   └── Field (campo, ej: nombre, email, edad)
//
//  UN DOCUMENTO REAL EN MONGODB:
//  {
//    "_id": ObjectId("64abc123def456789012aa01"),
//    "nombre": "Juan Pérez",
//    "email": "juan@email.com",
//    "edad": 25,
//    "activo": true,
//    "fechaRegistro": ISODate("2024-01-15T00:00:00.000Z"),
//    "direccion": {                    ← OBJETO ANIDADO
//      "ciudad": "Cali",               (en SQL: tabla separada + JOIN)
//      "departamento": "Valle del Cauca",
//      "pais": "Colombia"
//    },
//    "compras": [                      ← ARRAY DE OBJETOS
//      {                               (en SQL: tabla separada + JOIN)
//        "producto": "Laptop HP",
//        "precio": 2500000,
//        "fecha": ISODate("2024-02-10")
//      },
//      {
//        "producto": "Mouse",
//        "precio": 85000,
//        "fecha": ISODate("2024-03-05")
//      }
//    ]
//  }
//
//  En SQL relacional, este documento requeriría:
//  - Tabla "usuarios" (datos básicos)
//  - Tabla "direcciones" (con usuario_id como foreign key)
//  - Tabla "compras" (con usuario_id como foreign key)
//  - 3 tablas + 2 JOINs para obtener el dato completo
//
//  En MongoDB: TODO vive en un solo documento. Una sola consulta.
//
//  ¿QUÉ ES ObjectId?
//  Cada documento en MongoDB tiene un campo "_id" que es su
//  identificador único. Si no lo provees, MongoDB lo genera
//  automáticamente como un ObjectId.
//
//  Un ObjectId es un valor de 12 bytes (24 caracteres hex):
//  ObjectId("64abc123def456789012aa01")
//  └── 4 bytes: timestamp Unix (cuándo se creó)
//  └── 5 bytes: identificador único del proceso/máquina
//  └── 3 bytes: contador incremental
//
//  Esto garantiza que dos documentos creados en el mismo
//  milisegundo en servidores diferentes tengan IDs únicos.
//  A diferencia de SQL donde el ID es 1, 2, 3... (simple
//  autoincremento), el ObjectId es globalmente único.
//
//  TERMINOLOGÍA: MONGODB vs SQL
//  ─────────────────────────────
//  SQL                → MongoDB
//  Base de datos      → Database
//  Tabla (table)      → Colección (collection)
//  Fila (row/record)  → Documento (document)
//  Columna (column)   → Campo (field)
//  Primary Key (id)   → _id (ObjectId auto-generado)
//  Foreign Key        → Referencia manual o documento anidado
//  JOIN               → $lookup (en Aggregation) o embed
//  INDEX              → Index (igual concepto, diferente sintaxis)
//  Schema/DDL         → Mongoose Schema (opcional pero recomendado)
//
//  ─────────────────────────────────────────────────────────
//  ¿CUÁNDO ANIDAR vs CUÁNDO REFERENCIAR en MongoDB?
//  ─────────────────────────────────────────────────────────
//
//  MongoDB permite DOS formas de modelar relaciones:
//
//  OPCIÓN 1: DOCUMENTO ANIDADO (embedding)
//  Guardar los datos relacionados DENTRO del documento padre.
//  {
//    _id: "...",
//    nombre: "Juan",
//    direccion: { ciudad: "Cali", pais: "Colombia" }  ← anidado
//  }
//  ✅ Una sola consulta para obtener todo
//  ✅ Más rápido (no hay JOINs)
//  ❌ El documento puede hacerse muy grande
//  ❌ Los datos anidados se duplican si los comparten varios documentos
//
//  Úsalo cuando: los datos anidados no se comparten entre documentos
//  y se acceden siempre junto al padre (ej: dirección de un usuario).
//
//  OPCIÓN 2: REFERENCIA (referencing)
//  Guardar solo el _id del documento relacionado (como una foreign key).
//  {
//    _id: "...",
//    nombre: "Juan",
//    categoriaId: ObjectId("...") ← solo el ID, no el objeto completo
//  }
//  ✅ Datos no duplicados
//  ✅ Documentos más pequeños
//  ❌ Necesitas dos consultas (o $lookup) para obtener los datos
//
//  Úsalo cuando: los datos relacionados se comparten entre varios
//  documentos o se acceden independientemente
//  (ej: categoría de productos — muchos productos comparten categoría).
//
//  ─────────────────────────────────────────────────────────
//  ☁️  ¿QUÉ ES MONGODB ATLAS?
//  ─────────────────────────────────────────────────────────
//
//  MongoDB Atlas es MongoDB EN LA NUBE, como servicio (DBaaS —
//  Database as a Service). En vez de instalar MongoDB en tu
//  computadora o servidor, Atlas administra toda la infraestructura
//  por ti: servidores, backups, actualizaciones, seguridad.
//
//  VENTAJAS DE ATLAS vs MongoDB local:
//  ✅ Gratis en el plan M0 (512MB, suficiente para aprender y proyectos pequeños)
//  ✅ Accesible desde cualquier lugar con internet
//  ✅ Backups automáticos
//  ✅ Monitoreo visual desde el panel web
//  ✅ No necesitas configurar nada — funciona inmediatamente
//  ✅ Escala fácilmente si tu proyecto crece (cambiando el plan)
//
//  PASOS PARA CREAR CUENTA GRATUITA EN MONGO ATLAS:
//  ──────────────────────────────────────────────────
//
//  PASO 1: Registro
//    → Ve a https://www.mongodb.com/atlas/database
//    → Clic "Try Free"
//    → Regístrate con email o con tu cuenta de Google
//
//  PASO 2: Crear el Cluster gratuito
//    → Elige "FREE" (M0 Sandbox)
//    → Proveedor cloud: AWS, Google Cloud o Azure (da igual)
//    → Región: la más cercana (para Latinoamérica: us-east-1)
//    → Dale un nombre al cluster (ej: "Cluster0")
//    → Clic "Create Cluster" y espera ~2 minutos
//
//  PASO 3: Crear usuario de base de datos
//    → Menú izquierdo → "Database Access"
//    → Clic "Add New Database User"
//    → Authentication Method: Password
//    → Username: admin (o el que quieras)
//    → Password: una contraseña segura — ANÓTALA, la necesitarás
//    → Database User Privileges: "Atlas admin"
//    → Clic "Add User"
//
//  PASO 4: Permitir conexiones desde tu IP
//    → Menú izquierdo → "Network Access"
//    → Clic "Add IP Address"
//    → Clic "Allow Access from Anywhere" (0.0.0.0/0) — para desarrollo
//    → En producción real, solo permitirías la IP de tu servidor
//    → Clic "Confirm"
//
//  PASO 5: Obtener la cadena de conexión (Connection String)
//    → Ve a tu cluster → Clic "Connect"
//    → Elige "Connect your application"
//    → Driver: Node.js | Version: 5.5 or later
//    → Copia la cadena. Luce así:
//      mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/
//    → Reemplaza <password> con tu contraseña real (del paso 3)
//    → Agrega el nombre de tu base de datos al final:
//      mongodb+srv://admin:tuPassword@cluster0.xxxxx.mongodb.net/tiendaDB
//    → "tiendaDB" es el nombre de tu base de datos.
//      MongoDB la crea automáticamente cuando insertas el primer documento.
//
//  PASO 6: Guardar la cadena en el archivo .env
//    → Crea (o edita) el archivo .env en la raíz de tu proyecto:
//      MONGODB_URI=mongodb+srv://admin:tuPassword@cluster0.xxxxx.mongodb.net/tiendaDB
//
//    ⚠️  REGLA DE ORO NÚMERO 1:
//       NUNCA escribas la contraseña directamente en el código.
//       Siempre úsala como variable de entorno: process.env.MONGODB_URI
//
//    ⚠️  REGLA DE ORO NÚMERO 2:
//       NUNCA subas el archivo .env a GitHub.
//       Agrega .env al .gitignore ANTES de hacer el primer commit.
//       Si lo subes accidentalmente, cambia la contraseña inmediatamente.
//
//  ─────────────────────────────────────────────────────────
//  🔧 OPERACIONES CRUD EN MONGODB (sintaxis real de Mongoose)
//  ─────────────────────────────────────────────────────────
//
//  CRUD = Create, Read, Update, Delete
//  En tu backend con Mongoose, así se ven las operaciones reales:
//
//  CREATE (insertar):
//    const usuario = new Usuario({ nombre: "Juan", email: "juan@email.com" });
//    await usuario.save();
//     o en una línea:
//    await Usuario.create({ nombre: "Juan", email: "juan@email.com" });
//
//  READ (leer):
//    await Usuario.find({})                        → todos los documentos
//    await Usuario.find({ activo: true })          → con filtro
//    await Usuario.findById(id)                    → por _id
//    await Usuario.findOne({ email: "juan@..." })  → el primero que coincida
//    await Usuario.find({ "dir.ciudad": "Cali" })  → campo anidado
//
//  UPDATE (actualizar):
//    await Usuario.findByIdAndUpdate(id, { $set: { edad: 26 } })
//    await Usuario.updateOne({ email: "..." }, { $set: { activo: false } })
//    await Usuario.updateMany({ activo: false }, { $set: { eliminado: true } })
//
//  DELETE (eliminar):
//    await Usuario.findByIdAndDelete(id)
//    await Usuario.deleteOne({ email: "..." })
//    await Usuario.deleteMany({ activo: false })
//
//  OPERADORES DE CONSULTA más usados:
//    $eq    → igual:          { edad: { $eq: 25 } }  o simplemente { edad: 25 }
//    $ne    → no igual:       { edad: { $ne: 25 } }
//    $gt    → mayor que:      { precio: { $gt: 100000 } }
//    $gte   → mayor o igual:  { precio: { $gte: 100000 } }
//    $lt    → menor que:      { precio: { $lt: 500000 } }
//    $lte   → menor o igual:  { precio: { $lte: 500000 } }
//    $in    → en lista:       { categoria: { $in: ["electronica", "accesorios"] } }
//    $nin   → no en lista:    { estado: { $nin: ["cancelado", "eliminado"] } }
//    $and   → Y lógico:       { $and: [{ activo: true }, { edad: { $gte: 18 } }] }
//    $or    → O lógico:       { $or: [{ ciudad: "Cali" }, { ciudad: "Bogotá" }] }
//    $regex → expresión reg:  { nombre: { $regex: /juan/i } }
//    $exists→ campo existe:   { telefono: { $exists: true } }
//
// ============================================================
//  🧪 EJEMPLOS PRÁCTICOS
// ============================================================
//  INSTRUCCIONES: node 05_mongodb_no_relacional.js
// ============================================================

"use strict";

console.log("=================================================");
console.log("  🍃 BASES DE DATOS NO RELACIONALES & MONGODB");
console.log("=================================================\n");


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 1: Documentos MongoDB — La diferencia fundamental
// ═══════════════════════════════════════════════════════════
//
//  Los documentos de MongoDB son exactamente objetos JavaScript
//  (o JSON). No hay diferencia en cómo los ves o manipulas en
//  Node.js. Esto es lo que hace a MongoDB tan natural para el
//  desarrollo JavaScript.
//
//  BSON (Binary JSON) es el formato interno de almacenamiento
//  de MongoDB. Añade tipos que JSON no tiene: Date, ObjectId,
//  Binary, etc. Pero cuando trabajas con Mongoose en Node.js,
//  todo se convierte automáticamente a objetos JS normales.
//
//  Aquí simulamos dos colecciones reales:
//  - "usuarios": perfiles de usuarios del sistema
//  - "productos": catálogo de productos de una tienda
//
//  NOTA: En el mundo real estas colecciones vivirían en MongoDB.
//  Aquí las simulamos como arrays de objetos JS para poder
//  ejecutar este archivo sin necesitar una BD instalada.
//  La estructura es IDÉNTICA a lo que tendrías en MongoDB.

const coleccionUsuarios = [
  {
    _id: "64abc001def456789012aa01",
    // _id: identificador único del documento.
    // En MongoDB real sería un ObjectId generado automáticamente.
    // Aquí usamos strings que simulan el formato hexadecimal de ObjectId.

    nombre: "Juan Pérez",
    email: "juan@email.com",
    edad: 25,
    activo: true,
    fechaRegistro: new Date("2024-01-15"),
    // new Date() → JavaScript Date object.
    // En MongoDB se almacena como ISODate — un tipo nativo optimizado.
    // Mongoose convierte automáticamente entre Date de JS e ISODate de MongoDB.

    direccion: {
      ciudad: "Cali",
      departamento: "Valle del Cauca",
      pais: "Colombia",
    },
    // OBJETO ANIDADO (embedded document).
    // En SQL esto requeriría una tabla separada "direcciones"
    // con usuario_id como foreign key, y un JOIN para obtenerlo.
    // En MongoDB vive DENTRO del mismo documento — una sola consulta.
    //
    // Acceder en Mongoose: usuario.direccion.ciudad
    // Filtrar en Mongoose: Usuario.find({ "direccion.ciudad": "Cali" })
    // La notación de punto (dot notation) es la forma estándar.

    roles: ["usuario", "comprador", "vendedor"],
    // ARRAY de strings.
    // En SQL requeriría una tabla "roles" y una tabla pivote "usuario_roles".
    // En MongoDB es simplemente un array dentro del documento.
    //
    // Filtrar en Mongoose: Usuario.find({ roles: "vendedor" })
    // MongoDB busca dentro del array automáticamente.
    // También puedes usar $in: Usuario.find({ roles: { $in: ["admin", "vendedor"] } })

    historialPrecios: [],
    // Array vacío — perfectamente válido en MongoDB.
    // Se irá llenando cuando el usuario haga compras.
    // En SQL tendrías que crear la tabla desde el inicio aunque esté vacía.
  },
  {
    _id: "64abc002def456789012aa02",
    nombre: "Ana García",
    email: "ana@email.com",
    edad: 30,
    activo: true,
    fechaRegistro: new Date("2024-03-20"),
    direccion: {
      ciudad: "Bogotá",
      departamento: "Cundinamarca",
      pais: "Colombia",
    },
    roles: ["usuario", "comprador", "vendedor"],

    tiendaOnline: "Ana's Shop",
    // ← CAMPO EXTRA que Juan NO tiene.
    // Esto es perfectamente válido en MongoDB (NoSQL).
    // En SQL sería imposible sin alterar la tabla con ALTER TABLE
    // (lo que puede bloquear la tabla en producción con millones de filas).
    //
    // Esta flexibilidad es una de las mayores ventajas de MongoDB
    // para proyectos que evolucionan rápidamente.

    configuracion: {
      // Objeto anidado con configuración personalizada.
      // No todos los usuarios tienen este campo — y eso está bien.
      notificaciones: true,
      tema: "oscuro",
      idioma: "es-CO",
    },
  },
  {
    _id: "64abc003def456789012aa03",
    nombre: "Carlos López",
    email: "carlos@email.com",
    edad: 22,
    activo: false,
    // activo: false — usuario desactivado.
    // En SQL se haría lo mismo (campo booleano), pero las consultas
    // de filtrado son más lentas sin índices bien configurados.
    // En MongoDB, crear un índice en "activo" hace la consulta instantánea:
    // usuarioSchema.index({ activo: 1 }) en Mongoose.
    fechaRegistro: new Date("2024-06-10"),
    direccion: {
      ciudad: "Medellín",
      departamento: "Antioquia",
      pais: "Colombia",
    },
    roles: ["usuario"],
  },
  {
    _id: "64abc004def456789012aa04",
    nombre: "María Rodríguez",
    email: "maria@email.com",
    edad: 28,
    activo: true,
    fechaRegistro: new Date("2024-08-01"),
    direccion: {
      ciudad: "Barranquilla",
      departamento: "Atlántico",
      pais: "Colombia",
    },
    roles: ["usuario", "comprador"],

    comprasRecientes: [
      // Array de OBJETOS ANIDADOS (subdocumentos).
      // En SQL sería una tabla "compras" con usuario_id como FK.
      // En MongoDB vive directamente dentro del documento del usuario.
      { productoId: "64bcd001ef567890123bb01", nombre: "Laptop HP", precio: 2500000, fecha: new Date("2024-09-10") },
      { productoId: "64bcd002ef567890123bb02", nombre: "Mouse Inalámbrico", precio: 85000, fecha: new Date("2024-09-15") },
    ],
  },
];

const coleccionProductos = [
  {
    _id: "64bcd001ef567890123bb01",
    nombre: "Laptop HP",
    precio: 2500000,
    categoria: "electronica",
    stock: 15,
    activo: true,
    especificaciones: {
      // Objeto anidado con características técnicas.
      // Cada tipo de producto podría tener especificaciones totalmente diferentes.
      // En SQL necesitarías columnas genéricas (spec1, spec2...) o una tabla EAV
      // (Entity-Attribute-Value) — ambas son soluciones torpes.
      ram: "8GB",
      procesador: "Intel Core i5",
      almacenamiento: "512GB SSD",
      pantalla: "15.6 pulgadas",
      sistemaOperativo: "Windows 11",
    },
    etiquetas: ["laptop", "hp", "computador", "intel", "windows"],
    // Array de strings para búsqueda y filtrado.
    // En MongoDB puedes indexar arrays para búsquedas rápidas.
    imagenes: [
      { url: "https://cdn.tienda.com/laptop-hp-1.jpg", tipo: "principal" },
      { url: "https://cdn.tienda.com/laptop-hp-2.jpg", tipo: "lateral" },
    ],
    calificacionPromedio: 4.5,
    totalReseñas: 127,
    creadoEn: new Date("2024-01-05"),
    actualizadoEn: new Date("2024-11-01"),
  },
  {
    _id: "64bcd002ef567890123bb02",
    nombre: "Mouse Inalámbrico Logitech",
    precio: 85000,
    categoria: "accesorios",
    stock: 50,
    activo: true,
    especificaciones: {
      // Especificaciones completamente diferentes a la laptop.
      // En MongoDB esto es natural. En SQL necesitarías ALTER TABLE
      // para agregar columnas que no aplican a todos los productos.
      conexion: "Bluetooth + USB dongle",
      bateria: "Pilas AA x1 (incluidas)",
      dpi: 1600,
      peso: "101g",
      color: "Negro",
    },
    etiquetas: ["mouse", "inalambrico", "logitech", "bluetooth"],
    imagenes: [
      { url: "https://cdn.tienda.com/mouse-log-1.jpg", tipo: "principal" },
    ],
    calificacionPromedio: 4.8,
    totalReseñas: 342,
    creadoEn: new Date("2024-01-10"),
    actualizadoEn: new Date("2024-10-20"),
  },
  {
    _id: "64bcd003ef567890123bb03",
    nombre: "Silla Ergonómica Pro",
    precio: 890000,
    categoria: "mobiliario",
    stock: 8,
    activo: true,
    especificaciones: {
      // Otro tipo de producto, otras especificaciones.
      material: "Malla transpirable",
      ajusteAltura: "60-80cm",
      pesoMaximo: "120kg",
      reposabrazos: "4D ajustables",
      garantia: "2 años",
    },
    etiquetas: ["silla", "ergonomica", "oficina", "lumbar"],
    imagenes: [
      { url: "https://cdn.tienda.com/silla-erg-1.jpg", tipo: "principal" },
      { url: "https://cdn.tienda.com/silla-erg-2.jpg", tipo: "detalle" },
    ],
    calificacionPromedio: 4.3,
    totalReseñas: 89,
    creadoEn: new Date("2024-02-15"),
    actualizadoEn: new Date("2024-11-05"),
  },
];


// ── Mostramos los documentos ──────────────────────────────
console.log("📂 COLECCIÓN 'usuarios' (mostrando estructura de documentos):");
console.log("────────────────────────────────────────────────────────────");
coleccionUsuarios.forEach((u, i) => {
  console.log(`\n  Documento ${i + 1} — ${u.nombre}:`);
  console.log(
    JSON.stringify(u, null, 4)
      .split("\n")
      .map((l) => "  " + l)
      .join("\n")
  );
  // JSON.stringify(objeto, null, 4) → convierte el objeto a string JSON
  // con 4 espacios de indentación para legibilidad.
  // Luego lo dividimos por líneas y agregamos indentación extra
  // para que quede alineado con el resto de la salida en consola.
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 2: Simulación de operaciones CRUD de MongoDB
// ═══════════════════════════════════════════════════════════
//
//  Aquí simulamos las operaciones más comunes de MongoDB
//  usando métodos de arrays de JavaScript (find, filter, map, etc.)
//  porque no tenemos MongoDB instalado.
//
//  IMPORTANTE: En tu backend real con Mongoose, la sintaxis
//  es muy similar pero asíncrona:
//  JavaScript puro (simulación) → Mongoose (real)
//  array.filter(fn)              → await Modelo.find(query)
//  array.find(fn)                → await Modelo.findOne(query)
//  array.push(obj)               → await Modelo.create(datos)
//  objeto.campo = valor          → await Modelo.findByIdAndUpdate(id, {$set:...})
//  array.splice(idx, 1)          → await Modelo.findByIdAndDelete(id)

console.log("\n\n🔧 SIMULACIÓN DE OPERACIONES CRUD EN MONGODB:");
console.log("───────────────────────────────────────────────");


// ── READ: find() con filtro simple ──────────────────────
console.log("\n  ── READ: find() ──────────────────────────────");

const usuariosActivos = coleccionUsuarios.filter((u) => u.activo === true);
// MongoDB: await Usuario.find({ activo: true })
// Retorna TODOS los documentos que cumplen la condición.
// Si no hay ninguno, retorna array vacío [].
console.log(`\n  find({ activo: true })`);
console.log(`  → ${usuariosActivos.length} usuario(s) activos:`);
usuariosActivos.forEach((u) => console.log(`     • ${u.nombre} — ${u.email}`));


// ── READ: find() con campo anidado (dot notation) ───────
const usuariosDeCali = coleccionUsuarios.filter(
  (u) => u.direccion.ciudad === "Cali"
);
// MongoDB: await Usuario.find({ "direccion.ciudad": "Cali" })
// La "notación de punto" (dot notation) accede a campos anidados.
// Las comillas son OBLIGATORIAS en MongoDB cuando usas dot notation.
console.log(`\n  find({ "direccion.ciudad": "Cali" })`);
usuariosDeCali.forEach((u) =>
  console.log(`  → ${u.nombre} (${u.direccion.departamento})`)
);


// ── READ: find() con operador $gte (mayor o igual) ──────
const mayoresDe25 = coleccionUsuarios.filter((u) => u.edad >= 25);
// MongoDB: await Usuario.find({ edad: { $gte: 25 } })
// $gte = "greater than or equal" (mayor o igual que)
console.log(`\n  find({ edad: { $gte: 25 } })`);
mayoresDe25.forEach((u) => console.log(`  → ${u.nombre} (${u.edad} años)`));


// ── READ: find() con operador $in (en lista de valores) ─
const conRolVendedor = coleccionUsuarios.filter((u) =>
  u.roles.includes("vendedor")
);
// MongoDB: await Usuario.find({ roles: "vendedor" })
// o:       await Usuario.find({ roles: { $in: ["vendedor", "admin"] } })
// MongoDB busca dentro de arrays automáticamente.
console.log(`\n  find({ roles: "vendedor" })`);
conRolVendedor.forEach((u) =>
  console.log(`  → ${u.nombre} — roles: [${u.roles.join(", ")}]`)
);


// ── READ: findOne() — el primero que coincida ────────────
const usuarioConTienda = coleccionUsuarios.find(
  (u) => u.tiendaOnline !== undefined
);
// MongoDB: await Usuario.findOne({ tiendaOnline: { $exists: true } })
// findOne retorna UN documento o null (no un array).
// Útil para buscar por campos únicos como email.
console.log(`\n  findOne({ tiendaOnline: { $exists: true } })`);
console.log(
  `  → ${usuarioConTienda ? `${usuarioConTienda.nombre}: "${usuarioConTienda.tiendaOnline}"` : "null (no encontrado)"}`
);


// ── READ: findById() — buscar por _id ───────────────────
const idBuscado = "64abc002def456789012aa02";
const usuarioPorId = coleccionUsuarios.find((u) => u._id === idBuscado);
// MongoDB: await Usuario.findById("64abc002def456789012aa02")
// Es el método más común para obtener UN documento específico.
// En Express lo usas con: const usuario = await Usuario.findById(req.params.id)
console.log(`\n  findById("64abc002...aa02")`);
console.log(`  → ${usuarioPorId ? usuarioPorId.nombre : "null (no encontrado)"}`);


// ── CREATE: insertOne() / save() ────────────────────────
console.log("\n\n  ── CREATE: insertOne() / create() ────────────");

const nuevoUsuario = {
  _id: "64abc005def456789012aa05",
  nombre: "Luis Martínez",
  email: "luis@email.com",
  edad: 35,
  activo: true,
  fechaRegistro: new Date(),
  // new Date() sin argumentos → fecha y hora actual.
  // En Mongoose puedes configurar el campo con default: Date.now
  // para que se llene automáticamente.
  direccion: { ciudad: "Pereira", departamento: "Risaralda", pais: "Colombia" },
  roles: ["usuario"],
};

coleccionUsuarios.push(nuevoUsuario);
// MongoDB (con Mongoose):
//   const usuario = new Usuario(nuevoUsuario);
//   await usuario.save();
// o en una línea:
//   await Usuario.create(nuevoUsuario);
// MongoDB asigna el _id automáticamente si no lo provees.

console.log(`  insertOne({ nombre: "Luis Martínez", ... })`);
console.log(`  → Documento insertado con _id: ${nuevoUsuario._id}`);
console.log(`  → Total documentos en colección: ${coleccionUsuarios.length}`);


// ── UPDATE: updateOne() con $set ────────────────────────
console.log("\n\n  ── UPDATE: findByIdAndUpdate() / updateOne() ──");

const idAActualizar = "64abc001def456789012aa01";
const usuarioAActualizar = coleccionUsuarios.find((u) => u._id === idAActualizar);
const edadAnterior = usuarioAActualizar.edad;
usuarioAActualizar.edad = 26;
// MongoDB: await Usuario.findByIdAndUpdate(
//   "64abc001...",
//   { $set: { edad: 26 } },
//   { new: true }  ← devuelve el documento ACTUALIZADO, no el anterior
// )
//
// ¿Por qué $set y no simplemente edad: 26?
// Sin $set, MongoDB REEMPLAZARÍA el documento completo con solo { edad: 26 }.
// Con $set, solo actualiza el campo especificado y deja el resto igual.
// SIEMPRE usa $set para actualizaciones parciales.

console.log(`  findByIdAndUpdate("..aa01", { $set: { edad: 26 } }, { new: true })`);
console.log(`  → ${usuarioAActualizar.nombre}: edad ${edadAnterior} → ${usuarioAActualizar.edad}`);


// ── UPDATE: $push para agregar a un array ───────────────
const usuarioCon4 = coleccionUsuarios.find((u) => u._id === "64abc004def456789012aa04");
const nuevaCompra = {
  productoId: "64bcd003ef567890123bb03",
  nombre: "Silla Ergonómica Pro",
  precio: 890000,
  fecha: new Date(),
};
if (usuarioCon4.comprasRecientes) {
  usuarioCon4.comprasRecientes.push(nuevaCompra);
}
// MongoDB: await Usuario.findByIdAndUpdate(
//   "..aa04",
//   { $push: { comprasRecientes: nuevaCompra } }
// )
// $push agrega un elemento al final del array sin modificar los existentes.
// Otros operadores de arrays:
// $pull  → elimina elementos del array
// $addToSet → agrega solo si no existe (como un Set)
// $pop   → elimina el primero (-1) o el último (1)

console.log(`\n  findByIdAndUpdate("..aa04", { $push: { comprasRecientes: {...} } })`);
console.log(`  → ${usuarioCon4.nombre} ahora tiene ${usuarioCon4.comprasRecientes?.length} compra(s)`);


// ── UPDATE: updateMany() — actualizar varios a la vez ───
let contadorActualizados = 0;
coleccionUsuarios.forEach((u) => {
  if (!u.configuracion) {
    u.configuracion = { notificaciones: true, tema: "claro", idioma: "es-CO" };
    contadorActualizados++;
  }
});
// MongoDB: await Usuario.updateMany(
//   { configuracion: { $exists: false } },
//   { $set: { configuracion: { notificaciones: true, tema: "claro", idioma: "es-CO" } } }
// )
// updateMany() afecta TODOS los documentos que coincidan, no solo el primero.
// Muy útil para migraciones de datos — agregar un campo nuevo a todos los documentos.

console.log(`\n  updateMany({ configuracion: { $exists: false } }, { $set: { ... } })`);
console.log(`  → ${contadorActualizados} documento(s) actualizados`);


// ── DELETE: deleteOne() ──────────────────────────────────
console.log("\n\n  ── DELETE: findByIdAndDelete() / deleteOne() ──");

const idAEliminar = "64abc003def456789012aa03";
const indiceAEliminar = coleccionUsuarios.findIndex((u) => u._id === idAEliminar);
const documentoEliminado = coleccionUsuarios.splice(indiceAEliminar, 1)[0];
// MongoDB: const doc = await Usuario.findByIdAndDelete("64abc003..aa03")
// findByIdAndDelete devuelve el documento eliminado (o null si no existía).
// Útil para confirmar que algo se eliminó y para devolver los datos al cliente.

console.log(`  findByIdAndDelete("..aa03")`);
console.log(`  → "${documentoEliminado.nombre}" eliminado`);
console.log(`  → Colección ahora tiene ${coleccionUsuarios.length} documentos`);


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 3: Índices en MongoDB — Por qué las consultas son rápidas
// ═══════════════════════════════════════════════════════════
//
//  Un ÍNDICE es una estructura de datos auxiliar que MongoDB
//  mantiene para acelerar las búsquedas. Sin índices, MongoDB
//  haría un FULL COLLECTION SCAN — revisar CADA documento uno
//  por uno para encontrar los que coinciden.
//
//  Con índices, la búsqueda es como buscar en un índice de libro
//  en vez de leer el libro entero página por página.
//
//  Analogía:
//  Sin índice: tienes 1 millón de tarjetas de personas mezcladas.
//              Para encontrar a "Juan" debes revisar todas.
//  Con índice: las tarjetas están ordenadas alfabéticamente.
//              Puedes ir directo a la J y encontrar a Juan en segundos.
//
//  En Mongoose los índices se definen en el Schema:
//
//  const usuarioSchema = new mongoose.Schema({
//    email:  { type: String, unique: true, index: true },
//    activo: { type: Boolean, index: true },
//    "direccion.ciudad": { type: String }
//  });
//  usuarioSchema.index({ "direccion.ciudad": 1 });  // índice simple
//  usuarioSchema.index({ categoria: 1, precio: -1 }); // índice compuesto
//   1 = orden ascendente, -1 = orden descendente
//
//  TIPOS DE ÍNDICES EN MONGODB:
//  ─────────────────────────────
//
//  1. SINGLE FIELD (campo simple):
//     El más básico. Acelera búsquedas por un campo específico.
//     { email: 1 } → muy útil para buscar usuarios por email.
//
//  2. COMPOUND (compuesto):
//     Índice sobre múltiples campos. Acelera consultas que filtran
//     por varios campos a la vez.
//     { categoria: 1, precio: -1 } → útil para
//     "productos de electrónica ordenados por precio descendente".
//
//  3. UNIQUE:
//     Como el compound pero garantiza que no haya duplicados.
//     { email: 1 } con unique: true → no puede haber dos usuarios
//     con el mismo email. MongoDB lanza error si lo intentas.
//
//  4. TEXT:
//     Índice especial para búsqueda de texto completo (full-text search).
//     { nombre: "text", descripcion: "text" } → permite hacer búsquedas
//     como "laptop gamer" y encontrar documentos relevantes.
//
//  5. TTL (Time To Live):
//     Elimina documentos automáticamente después de cierto tiempo.
//     { expiraEn: 1 }, { expireAfterSeconds: 0 } → ideal para sesiones,
//     tokens temporales, caché con expiración automática.

console.log("\n\n📊 ÍNDICES EN MONGODB — Por qué las consultas son rápidas:");
console.log("─────────────────────────────────────────────────────────");

// Simulamos el impacto de índices en el rendimiento
const simularBusqueda = (nombre, tiempoSinIndice, tiempoConIndice, hayIndice) => {
  const tiempo = hayIndice ? tiempoConIndice : tiempoSinIndice;
  const estado = hayIndice ? "✅ ÍNDICE" : "⚠️  SIN ÍNDICE";
  console.log(`  ${estado} | Buscar por ${nombre.padEnd(20)} | ~${tiempo}`);
};

console.log(`\n  Colección con 1.000.000 de documentos:`);
console.log(`  ${"Campo".padEnd(30)} ${"Tiempo estimado".padEnd(20)}`);
console.log("  " + "─".repeat(52));

simularBusqueda("_id (siempre indexado)", "1ms", "1ms", true);
simularBusqueda("email (único, indexado)", "1ms", "1ms", true);
simularBusqueda("activo (indexado)", "2ms", "2ms", true);
simularBusqueda("nombre (SIN índice)", "2000ms", "3ms", false);
simularBusqueda('"direccion.ciudad" (SIN índice)', "2500ms", "4ms", false);
simularBusqueda("precio rango (SIN índice)", "3000ms", "5ms", false);

console.log(`
  💡 REGLA PRÁCTICA:
     Crea índices en los campos que usas frecuentemente en:
     • find() — filtros de búsqueda
     • sort() — ordenamiento
     • Campos únicos como email, username
     
     NO crees índices en:
     • Colecciones pequeñas (< 1000 docs) — no vale la pena
     • Campos que raramente se buscan
     • Campos con muy poca variedad (ej: un booleano en millones de docs)
       porque el índice no ayuda si la mitad son true y la mitad false.
`);


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 4: Consultas avanzadas — Operadores y proyecciones
// ═══════════════════════════════════════════════════════════
//
//  MongoDB tiene un sistema de consultas muy rico.
//  Puedes filtrar, proyectar, ordenar, paginar y agregar
//  datos con una sintaxis basada en objetos JSON.

console.log("\n\n🔍 CONSULTAS AVANZADAS CON OPERADORES:");
console.log("────────────────────────────────────────");

// ── Operadores de comparación ──────────────────────────────
const productosBaratos = coleccionProductos.filter((p) => p.precio < 200000);
// MongoDB: await Producto.find({ precio: { $lt: 200000 } })
console.log("\n  Productos con precio < 200.000 (operador $lt):");
productosBaratos.forEach((p) =>
  console.log(`  → ${p.nombre}: $${p.precio.toLocaleString("es-CO")}`)
);

const productosEnRango = coleccionProductos.filter(
  (p) => p.precio >= 100000 && p.precio <= 1000000
);
// MongoDB: await Producto.find({ precio: { $gte: 100000, $lte: 1000000 } })
// Puedes combinar múltiples operadores en el mismo campo.
console.log("\n  Productos entre $100.000 y $1.000.000 ($gte + $lte):");
productosEnRango.forEach((p) =>
  console.log(`  → ${p.nombre}: $${p.precio.toLocaleString("es-CO")}`)
);

// ── Proyección — seleccionar solo ciertos campos ──────────
const usuariosResumidos = coleccionUsuarios.map(({ nombre, email, activo }) => ({
  nombre, email, activo,
}));
// MongoDB: await Usuario.find({}, { nombre: 1, email: 1, activo: 1 })
// o con Mongoose: await Usuario.find({}).select("nombre email activo")
//
// La PROYECCIÓN elige qué campos devolver.
// { campo: 1 } → incluir ese campo
// { campo: 0 } → excluir ese campo
// Por defecto MongoDB devuelve TODOS los campos.
// La proyección es importante para no transferir datos innecesarios.
// Si tienes documentos con imágenes en base64 o textos largos,
// proyectar solo lo que necesitas puede acelerar mucho las respuestas.

console.log("\n  find({}, { nombre: 1, email: 1, activo: 1 }) — proyección:");
usuariosResumidos.forEach((u) =>
  console.log(
    `  → ${u.nombre.padEnd(20)} | ${u.email.padEnd(25)} | activo: ${u.activo}`
  )
);

// ── Ordenamiento y paginación ──────────────────────────────
const productosPorPrecio = [...coleccionProductos].sort(
  (a, b) => a.precio - b.precio
);
// MongoDB: await Producto.find({}).sort({ precio: 1 })
// 1 = ascendente (menor a mayor)
// -1 = descendente (mayor a menor)
// Orden múltiple: .sort({ categoria: 1, precio: -1 })
// → primero por categoría (A-Z), luego por precio (mayor a menor) dentro de cada cat.

console.log("\n  find({}).sort({ precio: 1 }) — ordenado por precio ascendente:");
productosPorPrecio.forEach((p) =>
  console.log(
    `  → $${String(p.precio).padStart(10)} | ${p.nombre}`
  )
);

// Paginación con limit y skip
const ITEMS_POR_PAGINA = 2;
const PAGINA_ACTUAL = 1;
const skip = (PAGINA_ACTUAL - 1) * ITEMS_POR_PAGINA;
const pagina1 = [...coleccionProductos].slice(skip, skip + ITEMS_POR_PAGINA);
// MongoDB: await Producto.find({}).skip(0).limit(2)
// .skip(n)  → salta los primeros n documentos
// .limit(n) → devuelve máximo n documentos
// Combinados permiten paginar los resultados.
// Para la página 2: .skip(2).limit(2)
// Para la página 3: .skip(4).limit(2)
// Fórmula: skip = (pagina - 1) * limite

console.log(
  `\n  find({}).skip(${skip}).limit(${ITEMS_POR_PAGINA}) — página ${PAGINA_ACTUAL} de productos:`
);
pagina1.forEach((p) => console.log(`  → ${p.nombre}`));

// ── Búsqueda por regex (texto parcial) ────────────────────
const busqueda = "laptop";
const resultadosBusqueda = coleccionProductos.filter((p) =>
  p.nombre.toLowerCase().includes(busqueda.toLowerCase())
);
// MongoDB: await Producto.find({ nombre: { $regex: /laptop/i } })
// /laptop/i → la i hace que sea case-insensitive (ignora mayúsculas)
// Para búsqueda más avanzada usa índices de texto:
// await Producto.find({ $text: { $search: "laptop" } })
// Esto requiere un índice de texto: productoSchema.index({ nombre: "text" })

console.log(`\n  find({ nombre: { $regex: /${busqueda}/i } }):`);
resultadosBusqueda.length > 0
  ? resultadosBusqueda.forEach((p) => console.log(`  → ${p.nombre}`))
  : console.log("  → No se encontraron resultados");


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 5: Comparación SQL vs MongoDB — Misma operación
// ═══════════════════════════════════════════════════════════
//
//  La misma lógica expresada en SQL y en MongoDB.
//  Esto te ayuda a entender cómo "traducir" entre los dos mundos.

console.log("\n\n📊 COMPARACIÓN SQL vs MONGODB — mismas consultas:");
console.log("─────────────────────────────────────────────────");

const comparaciones = [
  {
    descripcion: "Obtener todos los registros",
    sql: "SELECT * FROM usuarios;",
    mongodb: "await Usuario.find({})",
  },
  {
    descripcion: "Filtrar por campo",
    sql: "SELECT * FROM usuarios WHERE activo = 1;",
    mongodb: "await Usuario.find({ activo: true })",
  },
  {
    descripcion: "Filtrar por campo anidado",
    sql: "SELECT u.* FROM usuarios u\n    INNER JOIN direcciones d ON u.id = d.usuario_id\n    WHERE d.ciudad = 'Cali';",
    mongodb: 'await Usuario.find({ "direccion.ciudad": "Cali" })',
  },
  {
    descripcion: "Buscar por ID primario",
    sql: "SELECT * FROM usuarios WHERE id = 1;",
    mongodb: "await Usuario.findById('64abc001...')",
  },
  {
    descripcion: "Insertar un registro",
    sql: "INSERT INTO usuarios (nombre, email) VALUES ('Juan', 'juan@email.com');",
    mongodb: "await Usuario.create({ nombre: 'Juan', email: 'juan@email.com' })",
  },
  {
    descripcion: "Actualizar un campo",
    sql: "UPDATE usuarios SET edad = 26 WHERE id = 1;",
    mongodb: "await Usuario.findByIdAndUpdate(id, { $set: { edad: 26 } })",
  },
  {
    descripcion: "Actualizar varios",
    sql: "UPDATE usuarios SET activo = 0 WHERE ciudad = 'Cali';",
    mongodb: 'await Usuario.updateMany({ "direccion.ciudad": "Cali" }, { $set: { activo: false } })',
  },
  {
    descripcion: "Eliminar un registro",
    sql: "DELETE FROM usuarios WHERE id = 1;",
    mongodb: "await Usuario.findByIdAndDelete(id)",
  },
  {
    descripcion: "Contar registros",
    sql: "SELECT COUNT(*) FROM usuarios WHERE activo = 1;",
    mongodb: "await Usuario.countDocuments({ activo: true })",
  },
  {
    descripcion: "Ordenar resultados",
    sql: "SELECT * FROM productos ORDER BY precio ASC;",
    mongodb: "await Producto.find({}).sort({ precio: 1 })",
  },
  {
    descripcion: "Paginar resultados",
    sql: "SELECT * FROM productos LIMIT 10 OFFSET 20;",
    mongodb: "await Producto.find({}).skip(20).limit(10)",
  },
  {
    descripcion: "Buscar en array",
    sql: "SELECT u.* FROM usuarios u\n    INNER JOIN roles_usuario ru ON u.id = ru.usuario_id\n    WHERE ru.rol = 'vendedor';",
    mongodb: "await Usuario.find({ roles: 'vendedor' })",
  },
];

comparaciones.forEach(({ descripcion, sql, mongodb }) => {
  console.log(`\n  📌 ${descripcion}:`);
  console.log(`     🗄️  SQL:     ${sql}`);
  console.log(`     🍃 MongoDB: ${mongodb}`);
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 6: Aggregation Pipeline — El poder real de MongoDB
// ═══════════════════════════════════════════════════════════
//
//  El Aggregation Pipeline (tubería de agregación) es el
//  sistema de MongoDB para transformar y analizar datos.
//  Es como hacer múltiples operaciones SQL (WHERE, GROUP BY,
//  HAVING, JOIN, ORDER BY) pero de forma más flexible.
//
//  La idea: los documentos pasan por una SERIE DE ETAPAS
//  (stages) en orden. Cada etapa transforma la salida
//  y la pasa a la siguiente.
//
//  Entrada → [Stage 1] → [Stage 2] → [Stage 3] → Resultado
//
//  STAGES MÁS IMPORTANTES:
//  $match  → filtra documentos (como WHERE en SQL)
//  $group  → agrupa y calcula (como GROUP BY + SUM/COUNT en SQL)
//  $sort   → ordena (como ORDER BY en SQL)
//  $limit  → limita resultados (como LIMIT en SQL)
//  $skip   → salta resultados (como OFFSET en SQL)
//  $project→ selecciona/transforma campos (como SELECT en SQL)
//  $lookup → JOIN entre colecciones (como INNER JOIN en SQL)
//  $unwind → descompone arrays en documentos individuales
//  $count  → cuenta documentos
//  $sum    → suma valores
//  $avg    → calcula promedio
//  $min/$max → mínimo/máximo
//
//  Ejemplo de Aggregation en Mongoose:
//
//  const resultado = await Producto.aggregate([
//    { $match: { activo: true } },             // Solo activos
//    { $group: {
//        _id: "$categoria",                    // Agrupar por categoría
//        totalProductos: { $sum: 1 },          // Contar productos
//        precioPromedio: { $avg: "$precio" },   // Promedio de precio
//        precioMaximo: { $max: "$precio" },     // Precio máximo
//        stockTotal: { $sum: "$stock" }         // Stock total
//    }},
//    { $sort: { totalProductos: -1 } },        // Ordenar por cantidad desc
//  ]);

console.log("\n\n🔬 AGGREGATION PIPELINE — Análisis de datos:");
console.log("──────────────────────────────────────────────");

// Simulamos el pipeline de agregación con métodos de array JS
// Esto equivale a:
// db.productos.aggregate([
//   { $match: { activo: true } },
//   { $group: { _id: "$categoria", count: { $sum: 1 }, avgPrecio: { $avg: "$precio" } } },
//   { $sort: { count: -1 } }
// ])

const productosActivos = coleccionProductos.filter((p) => p.activo);

const porCategoria = productosActivos.reduce((acc, producto) => {
  const cat = producto.categoria;
  if (!acc[cat]) {
    acc[cat] = { categoria: cat, totalProductos: 0, precioTotal: 0, stockTotal: 0, maxPrecio: 0 };
  }
  acc[cat].totalProductos++;
  acc[cat].precioTotal += producto.precio;
  acc[cat].stockTotal += producto.stock;
  acc[cat].maxPrecio = Math.max(acc[cat].maxPrecio, producto.precio);
  return acc;
}, {});

const resultadoAgregacion = Object.values(porCategoria)
  .map((cat) => ({
    ...cat,
    precioPromedio: Math.round(cat.precioTotal / cat.totalProductos),
  }))
  .sort((a, b) => b.totalProductos - a.totalProductos);

console.log("\n  Pipeline equivalente en Mongoose:");
console.log("  await Producto.aggregate([");
console.log("    { $match: { activo: true } },");
console.log("    { $group: { _id: '$categoria', totalProductos: { $sum: 1 }, precioPromedio: { $avg: '$precio' } } },");
console.log("    { $sort: { totalProductos: -1 } }");
console.log("  ]);\n");

console.log("  Resultado:");
resultadoAgregacion.forEach(({ categoria, totalProductos, precioPromedio, stockTotal, maxPrecio }) => {
  console.log(`  📦 ${categoria.padEnd(15)}`);
  console.log(`     Productos:      ${totalProductos}`);
  console.log(`     Precio promedio: $${precioPromedio.toLocaleString("es-CO")}`);
  console.log(`     Precio máximo:   $${maxPrecio.toLocaleString("es-CO")}`);
  console.log(`     Stock total:     ${stockTotal} unidades`);
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 7: Modelado de datos — Decisiones de diseño
// ═══════════════════════════════════════════════════════════
//
//  Una de las decisiones más importantes en MongoDB es cómo
//  modelar las relaciones entre datos. No hay una respuesta
//  única — depende del patrón de acceso de tu aplicación.

console.log("\n\n🏗️  MODELADO DE DATOS — Embed vs Reference:");
console.log("─────────────────────────────────────────────");

const ejemplosModelado = [
  {
    caso: "Usuario y su dirección",
    decision: "EMBED (anidar)",
    razon: "La dirección siempre se accede con el usuario. No se comparte entre usuarios.",
    mongoDb: `{
  _id: "...",
  nombre: "Juan",
  direccion: { ciudad: "Cali", pais: "Colombia" }  ← anidado
}`,
  },
  {
    caso: "Producto y su categoría",
    decision: "REFERENCE (referenciar)",
    razon: "Muchos productos comparten la misma categoría. Cambiar el nombre de la categoría\n       solo requiere actualizar UN documento (no todos los productos).",
    mongoDb: `{
  _id: "...",
  nombre: "Laptop HP",
  categoriaId: ObjectId("...")  ← solo el ID
}
// Colección separada 'categorias':
{ _id: ObjectId("..."), nombre: "Electrónica", descripcion: "..." }`,
  },
  {
    caso: "Post de blog y sus comentarios",
    decision: "EMBED si son pocos. REFERENCE si pueden ser miles.",
    razon: "Los documentos de MongoDB tienen límite de 16MB. Si el post puede tener\n       miles de comentarios, referenciarlos evita superar el límite.",
    mongoDb: `// Con EMBED (pocos comentarios esperados):
{ _id: "...", titulo: "Mi post", comentarios: [{...}, {...}] }

// Con REFERENCE (muchos comentarios posibles):
{ _id: "...", titulo: "Mi post" }
// Colección 'comentarios':
{ _id: "...", postId: ObjectId("..."), texto: "..." }`,
  },
  {
    caso: "Pedido con sus productos",
    decision: "SNAPSHOT (copia de datos en el momento)",
    razon: "Si guardas la referencia al producto, y mañana cambia el precio,\n       el historial de pedidos estaría mal. Guardar una copia de los datos\n       en el momento del pedido preserva la información histórica correcta.",
    mongoDb: `{
  _id: "...",
  fecha: ISODate("..."),
  items: [
    {
      productoId: ObjectId("..."),    ← referencia para trazabilidad
      nombre: "Laptop HP",            ← copia del nombre en ese momento
      precio: 2500000,                ← copia del precio en ese momento
      cantidad: 1
    }
  ]
}`,
  },
];

ejemplosModelado.forEach(({ caso, decision, razon, mongoDb }) => {
  console.log(`\n  📌 Caso: ${caso}`);
  console.log(`     Decisión: ${decision}`);
  console.log(`     Por qué:  ${razon}`);
  console.log(`     Ejemplo:`);
  mongoDb.split("\n").forEach((l) => console.log(`     ${l}`));
});


// ═══════════════════════════════════════════════════════════
//  CONEXIÓN CON TU PROYECTO DE BACKEND
// ═══════════════════════════════════════════════════════════
//
//  Todo lo que ves aquí es la teoría detrás de lo que usas
//  en tu proyecto real con Mongoose y MongoDB Atlas.
//
//  LA CADENA COMPLETA:
//  Cliente (Postman/Frontend)
//    → HTTP Request
//    → Express (maneja la ruta)
//    → Controller (lógica del negocio)
//    → Mongoose (ODM)
//    → MongoDB Atlas (base de datos en la nube)
//    ← Devuelve los documentos como objetos JS
//    ← Controller los envía como JSON
//    ← Cliente recibe la respuesta
//
//  LO QUE YA USAS EN TU BACKEND:
//
//  mongoose.connect(process.env.MONGODB_URI)
//    → Se conecta a tu cluster en Atlas usando la cadena de conexión
//    → Internamente maneja un pool de conexiones para eficiencia
//
//  const taskSchema = new mongoose.Schema({...})
//    → Define la estructura esperada de los documentos
//    → No es obligatorio en MongoDB puro, pero Mongoose lo requiere
//    → Agrega validaciones, tipos y métodos automáticamente
//
//  const Task = mongoose.model('Task', taskSchema)
//    → Crea el modelo que usas para interactuar con la colección 'tasks'
//    → Por convención, el nombre del modelo en singular → colección en plural
//    → 'Task' → colección 'tasks' en MongoDB
//
//  await Task.find({ usuario: userId })
//    → Busca todos los documentos en 'tasks' donde usuario === userId
//    → El await espera la respuesta de MongoDB (operación asíncrona)
//    → Retorna un array de objetos JavaScript
//
//  await Task.findById(req.params.id)
//    → Busca el documento con ese _id
//    → Retorna el documento o null si no existe
//    → Siempre verifica si es null: if (!task) return res.status(404)...
//
//  await nuevaTarea.save()
//    → Inserta el documento en MongoDB
//    → Mongoose valida los datos según el Schema antes de insertar
//    → Si la validación falla, lanza un ValidationError

console.log("\n\n✅ Investigación de MongoDB y NoSQL completada exitosamente.\n");