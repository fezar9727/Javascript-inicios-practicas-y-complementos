// ============================================================
//  📘 INVESTIGACIÓN #3 — ¿QUÉ ES package.json?
// ============================================================
//
//  El archivo package.json es el CORAZÓN de cualquier proyecto
//  Node.js. Es un archivo de configuración en formato JSON que
//  describe tu proyecto y gestiona sus dependencias.
//
//  Cuando ejecutas 'npm init -y', npm crea este archivo automáticamente.
//
//  ¿QUÉ ES JSON?
//  ─────────────
//  JSON significa "JavaScript Object Notation" (Notación de Objetos
//  de JavaScript). Es un formato de texto para representar datos
//  estructurados. Fue creado por Douglas Crockford alrededor del año 2001.
//
//  Antes de JSON, los sistemas usaban XML para intercambiar datos:
//  <persona><nombre>Juan</nombre><edad>30</edad></persona>
//  XML es verboso y difícil de leer. JSON es mucho más limpio:
//  { "nombre": "Juan", "edad": 30 }
//
//  Las reglas estrictas de JSON son:
//  - Las CLAVES siempre van entre comillas dobles: "name"
//  - Los STRINGS siempre van entre comillas dobles: "mi-proyecto"
//  - Los NÚMEROS van sin comillas: 18, 3.14
//  - Los BOOLEANOS son true o false (sin comillas, minúsculas)
//  - null (sin comillas) representa ausencia de valor
//  - Los ARRAYS van entre corchetes: ["a", "b", "c"]
//  - Los OBJETOS van entre llaves: { "clave": "valor" }
//  - Los elementos van separados por coma
//  - El ÚLTIMO elemento de un objeto/array NO lleva coma al final
//  - JSON NO permite comentarios (a diferencia de JavaScript)
//
//  ¿POR QUÉ package.json USA JSON y no JavaScript normal?
//  Porque JSON es un formato universal — puede ser leído por
//  cualquier lenguaje de programación (Python, Java, Go, etc.).
//  Si package.json fuera código JavaScript ejecutable, solo
//  Node.js podría entenderlo. Con JSON, cualquier herramienta
//  del ecosistema puede leer y modificar la configuración del proyecto.
//
//  ¿QUÉ INFORMACIÓN CONTIENE package.json?
//  ────────────────────────────────────────
//  1. Metadatos del proyecto (nombre, versión, descripción, autor)
//  2. Lista de paquetes (dependencias) que necesita el proyecto
//  3. Scripts/comandos que se pueden ejecutar con npm
//  4. Configuración diversa del proyecto y de herramientas
//  5. Restricciones de versión de Node.js y npm requeridos
//
//  ¿POR QUÉ ES TAN IMPORTANTE?
//  ────────────────────────────
//  Imagina que trabajas en equipo o compartes tu código en GitHub.
//  NO puedes subir la carpeta node_modules (pesa cientos de MB
//  y tiene miles de archivos). Solo subes el package.json que
//  lista CUÁLES paquetes necesitas y en qué versiones.
//  Cualquiera que clone tu proyecto corre 'npm install' y npm
//  descarga exactamente los mismos paquetes automáticamente.
//
//  Es como la diferencia entre enviar una biblioteca entera por
//  correo vs enviar la lista de libros que necesitas: la segunda
//  opción es mucho más práctica y la otra persona puede conseguir
//  los libros por su cuenta.
//
//  CAMPOS PRINCIPALES DE package.json:
//  ─────────────────────────────────────
//
//  "name"
//    Nombre del proyecto o paquete. Reglas estrictas:
//    - Solo minúsculas
//    - Sin espacios (usa guiones: "mi-proyecto", no "mi proyecto")
//    - Sin caracteres especiales excepto guion (-) y guion bajo (_)
//    - Máximo 214 caracteres
//    - No puede empezar con punto (.) ni guion bajo (_)
//    - Debe ser único en npm si lo vas a publicar
//    - Para proyectos privados puede ser cualquier nombre válido
//
//  "version"
//    Versión usando Semantic Versioning (semver): MAJOR.MINOR.PATCH
//    - MAJOR: cambios que ROMPEN compatibilidad con versiones anteriores
//    - MINOR: nuevas funciones añadidas, SIN romper lo anterior
//    - PATCH: solo corrección de errores, sin cambios de funcionalidad
//    Siempre empieza en "1.0.0" o "0.1.0" (proyectos en desarrollo)
//
//  "description"
//    Una línea que explica para qué sirve el proyecto.
//    Aparece en los resultados de búsqueda de npmjs.com.
//    Para proyectos privados es solo documentación interna.
//
//  "main"
//    Archivo de ENTRADA (entry point) del proyecto. Cuando alguien
//    hace require('tu-paquete'), Node.js ejecuta este archivo.
//    Convención en la industria: "index.js" o "src/index.js".
//
//  "scripts"
//    Comandos personalizados ejecutables con 'npm run <nombre>'.
//    Son atajos para comandos largos y estandarizan cómo el equipo
//    trabaja con el proyecto. Los más comunes:
//      "start"  → producción: node src/index.js
//      "dev"    → desarrollo: nodemon src/index.js
//      "test"   → pruebas: jest
//      "build"  → compilación: webpack, babel, etc.
//      "lint"   → análisis de código: eslint
//
//  "dependencies"
//    Paquetes NECESARIOS para que la app funcione en producción.
//    Sin estos paquetes, tu app no arranca en ningún entorno.
//    Se instalan con: npm install <paquete>
//    Ejemplos: express, mongoose, jsonwebtoken, bcryptjs
//
//  "devDependencies"
//    Paquetes que solo necesitas MIENTRAS DESARROLLAS.
//    En el servidor de producción no se instalan (ahorra espacio).
//    Se instalan con: npm install <paquete> --save-dev
//    Ejemplos: nodemon, jest, eslint, prettier
//
//  "engines"
//    Versiones de Node.js y npm con las que es compatible el proyecto.
//    Muy útil para advertir a otros desarrolladores o al servidor.
//    Ejemplo: { "node": ">=18.0.0", "npm": ">=9.0.0" }
//
//  "private"
//    Si es true, npm se niega a publicar el paquete en el registro.
//    Protección contra publicar accidentalmente código privado.
//    Para proyectos de empresa siempre pon "private": true.
//
//  "keywords"
//    Array de strings para buscar el paquete en npmjs.com.
//    Solo relevante si publicas el paquete.
//
//  "author"
//    Tu nombre o el de tu empresa. Puede ser un string simple
//    o un objeto con name, email y url.
//
//  "license"
//    Licencia que rige cómo otros pueden usar tu código:
//    - "MIT"          → Libre uso, modificación y distribución.
//    - "ISC"          → Similar a MIT, ligeramente más simple.
//    - "Apache-2.0"   → Como MIT pero con protección de patentes.
//    - "GPL-3.0"      → Proyectos derivados deben ser open source (copyleft).
//    - "UNLICENSED"   → Código privado, nadie más puede usarlo.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES package-lock.json?
//  ─────────────────────────────────────────────────────────
//  Cuando instalas paquetes, npm también crea 'package-lock.json'.
//  Este archivo registra las versiones EXACTAS de TODOS los paquetes
//  instalados, incluyendo las dependencias de las dependencias
//  (las que npm instaló automáticamente, no solo las que pediste tú).
//
//  La diferencia clave:
//  package.json dice:      "express": "^4.18.2"   → compatible con 4.x.x
//  package-lock.json dice: "express": "4.18.3"    → EXACTAMENTE esa versión
//
//  Esto garantiza que si tú tienes express 4.18.3 hoy, tu compañero
//  o el servidor de producción también instalarán 4.18.3, aunque
//  exista una versión más nueva. Reproducibilidad total.
//
//  ✅ SÍ sube package-lock.json a Git
//  ❌ NO subas node_modules/ a Git (agrega al .gitignore)
//
//  ─────────────────────────────────────────────────────────
//  ¿CUÁNDO SE CREA Y SE MODIFICA package.json?
//  ─────────────────────────────────────────────────────────
//
//  Se CREA cuando ejecutas:
//    npm init       → creación interactiva con preguntas
//    npm init -y    → creación automática con valores por defecto
//
//  Se MODIFICA automáticamente cuando ejecutas:
//    npm install <paquete>          → agrega a "dependencies"
//    npm install <paquete> -D       → agrega a "devDependencies"
//    npm uninstall <paquete>        → elimina del campo correspondiente
//    npm version patch/minor/major  → incrementa el campo "version"
//
//  También puedes EDITARLO MANUALMENTE en VS Code como cualquier
//  archivo de texto. Es un JSON válido, así que respeta la sintaxis.
//
// ============================================================
//  🧪 EJEMPLOS PRÁCTICOS
// ============================================================
//
//  INSTRUCCIONES:
//  1. Abre la terminal en VS Code (Ctrl + ñ)
//  2. Ejecuta: node 03_package_json.js
//
// ============================================================

"use strict";

// El módulo 'fs' y 'path' son nativos de Node.js (no necesitan instalarse)
const fs = require("fs");
const path = require("path");

console.log("========================================");
console.log("  📄 EXPLORANDO EL package.json");
console.log("========================================\n");


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 1: Leer el package.json del proyecto actual
// ═══════════════════════════════════════════════════════════
//
//  Lo primero es ver si hay un package.json real en la carpeta
//  donde estás ejecutando el script. Si existe, lo leemos y
//  mostramos su contenido de forma organizada.
//
//  Usamos fs.existsSync() y fs.readFileSync() — las versiones
//  SÍNCRONAS del módulo fs. ¿Por qué síncronas aquí y no en
//  la investigación anterior donde usamos las asíncronas?
//
//  Porque esto ocurre durante la INICIALIZACIÓN del script
//  (al arrancar), no durante la ejecución del servidor.
//  Cuando el programa arranca, está bien bloquear momentáneamente
//  para leer archivos de configuración. Una vez arrancado,
//  usaríamos versiones asíncronas para no bloquear las peticiones.
//
//  Esta es la regla de oro:
//  - Al ARRANCAR la aplicación (setup, configuración): fs.readFileSync ✅
//  - Durante la EJECUCIÓN del servidor (atendiendo peticiones): fs.readFile ✅

const rutaPackageJson = path.join(__dirname, "package.json");
// path.join(__dirname, "package.json") construye la ruta completa
// al package.json que está en la misma carpeta que este archivo .js.
// __dirname es la carpeta donde está el archivo que se ejecuta.
// Sin path.join, tendrías que escribir la ruta a mano, lo que
// no funcionaría en otras computadoras con rutas diferentes.

console.log("📂 Buscando package.json en:", __dirname);
console.log("─────────────────────────────────────────");

if (fs.existsSync(rutaPackageJson)) {
  // fs.existsSync() verifica si un archivo o carpeta existe en el disco.
  // Devuelve true si existe, false si no.
  // Es síncrono — espera la respuesta antes de continuar.
  // Perfecto para verificaciones al inicio del programa.

  const contenidoRaw = fs.readFileSync(rutaPackageJson, "utf8");
  // fs.readFileSync() lee el archivo y devuelve su contenido
  // como string (porque le pasamos "utf8").
  // Sin "utf8" devolvería un Buffer (datos binarios crudos),
  // que no podríamos parsear directamente como JSON.
  // contenidoRaw es un string de texto que se ve así:
  // '{\n  "name": "mi-proyecto",\n  "version": "1.0.0"\n}'

  const pkg = JSON.parse(contenidoRaw);
  // JSON.parse() convierte el string JSON a un objeto JavaScript.
  // Después de esto, pkg es un objeto normal:
  // pkg.name → "mi-proyecto"
  // pkg.version → "1.0.0"
  // pkg.dependencies → { express: "^4.18.2", ... }
  //
  // Si el string no es JSON válido (por ejemplo tiene un error
  // de sintaxis), JSON.parse() lanza un SyntaxError.
  // En producción envolvería esto en un try-catch, pero aquí
  // sabemos que package.json siempre es JSON válido si npm lo creó.

  console.log("✅ package.json encontrado!\n");
  console.log("  📌 Nombre del proyecto:  ", pkg.name || "No definido");
  // El operador || (OR) devuelve el lado derecho si el lado izquierdo
  // es falsy (undefined, null, "", 0, false).
  // Si pkg.name no existe (undefined), muestra "No definido".
  // Así evitamos imprimir "undefined" en la consola.

  console.log("  📌 Versión:              ", pkg.version || "No definido");
  console.log("  📌 Descripción:          ", pkg.description || "No definido");
  console.log("  📌 Archivo principal:    ", pkg.main || "No definido");
  console.log(
    "  📌 Autor:                ",
    typeof pkg.author === "object"
      ? `${pkg.author.name} <${pkg.author.email}>`
      : pkg.author || "No definido"
  );
  // El campo "author" puede ser un string ("Juan García")
  // o un objeto ({ name: "Juan", email: "juan@email.com" }).
  // Usamos typeof para saber cuál es y formatearlo correctamente.
  // typeof devuelve un string con el tipo: "object", "string",
  // "number", "boolean", "undefined", "function".

  console.log("  📌 Licencia:             ", pkg.license || "No definido");
  console.log(
    "  📌 Es privado:           ",
    pkg.private === true ? "Sí (no se publicará en npm)" : "No"
  );

  // Mostramos los engines si existen
  if (pkg.engines) {
    console.log("\n  ⚙️  Versiones requeridas (engines):");
    Object.entries(pkg.engines).forEach(([herramienta, versionRequerida]) => {
      console.log(`    ${herramienta}: ${versionRequerida}`);
    });
    // Object.entries() convierte un objeto en un array de pares [clave, valor].
    // { node: ">=18", npm: ">=9" }
    // → [["node", ">=18"], ["npm", ">=9"]]
    // Luego desestructuramos cada par: [herramienta, versionRequerida]
    // Es el método más limpio para iterar sobre las propiedades de un objeto.
  }

  // Mostramos los scripts si existen
  if (pkg.scripts && Object.keys(pkg.scripts).length > 0) {
    console.log("\n  📋 Scripts disponibles:");
    Object.entries(pkg.scripts).forEach(([nombre, comando]) => {
      const nombreFormateado =
        nombre === "start" || nombre === "test"
          ? `npm ${nombre}`
          : `npm run ${nombre}`;
      // "start" y "test" son scripts especiales que no necesitan "run".
      // Todos los demás necesitan "npm run <nombre>".
      // Aquí formateamos el mensaje correctamente según el caso.
      console.log(`    ${nombreFormateado.padEnd(25)} → ${comando}`);
      // .padEnd(25) rellena el string con espacios a la derecha
      // hasta llegar a 25 caracteres. Esto alinea las columnas
      // en la salida de la terminal para que se vea como tabla.
    });
  }

  // Mostramos las dependencias si existen
  if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) {
    console.log("\n  📦 Dependencies (producción):");
    Object.entries(pkg.dependencies).forEach(([paquete, version]) => {
      console.log(`    ${paquete.padEnd(25)} ${version}`);
    });
  }

  if (pkg.devDependencies && Object.keys(pkg.devDependencies).length > 0) {
    console.log("\n  🔧 DevDependencies (solo desarrollo):");
    Object.entries(pkg.devDependencies).forEach(([paquete, version]) => {
      console.log(`    ${paquete.padEnd(25)} ${version}`);
    });
  }
} else {
  console.log("⚠️  No se encontró package.json en esta carpeta.");
  console.log("   Para crear uno, ejecuta: npm init -y\n");
  console.log("   O con preguntas interactivas: npm init\n");
}


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 2: Anatomía completa de un package.json real
// ═══════════════════════════════════════════════════════════
//
//  Aquí creamos un package.json de ejemplo completo con TODOS
//  los campos más importantes explicados. Este es el tipo de
//  package.json que verías en un proyecto profesional real.
//
//  Nota: en la realidad este sería un archivo JSON separado
//  llamado package.json. Aquí lo definimos como objeto
//  JavaScript para poder ejecutarlo y mostrarlo.

console.log("\n\n🔨 ANATOMÍA DE UN package.json PROFESIONAL COMPLETO:");
console.log("──────────────────────────────────────────────────────");

const packageJsonCompleto = {
  name: "tienda-virtual-api",
  // Nombre del proyecto. Usa solo minúsculas y guiones.
  // Este nombre es el que usarías en: npm install tienda-virtual-api
  // si lo publicaras en npm (en este caso es privado).

  version: "1.0.0",
  // Versión actual. Empieza en 1.0.0.
  // Cuando hagas cambios, actualizas con:
  // npm version patch → 1.0.1 (bugfix)
  // npm version minor → 1.1.0 (nueva función)
  // npm version major → 2.0.0 (cambio que rompe compatibilidad)

  description: "API REST para una tienda virtual con Node.js, Express y MongoDB",
  // Descripción breve. Una oración que explica para qué sirve.

  main: "src/index.js",
  // Punto de entrada. Cuál archivo ejecuta Node.js primero.
  // Convención: si tienes carpeta src/, apuntas a src/index.js.
  // Sin carpeta src/: simplemente "index.js".

  private: true,
  // MUY IMPORTANTE para proyectos de empresa.
  // Con private: true, si alguien ejecuta 'npm publish' por error,
  // npm rechazará la publicación. Protección contra filtrar código.
  // Para proyectos open source que SÍ quieres publicar: no pongas este campo.

  scripts: {
    // SCRIPTS ESENCIALES:

    start: "node src/index.js",
    // Producción: ejecuta Node.js directamente, sin nodemon.
    // El servidor de producción no debe reiniciarse solo.
    // Se ejecuta con: npm start

    dev: "nodemon src/index.js",
    // Desarrollo: nodemon reinicia el servidor al guardar cambios.
    // Solo para uso local en tu computadora.
    // Se ejecuta con: npm run dev

    test: "jest --coverage",
    // Ejecuta todos los archivos de test (*.test.js, *.spec.js).
    // --coverage genera un reporte de qué porcentaje del código
    // está cubierto por tests. Esencial en equipos profesionales.
    // Se ejecuta con: npm test

    "test:watch": "jest --watch",
    // Ejecuta jest en modo vigilancia — corre los tests afectados
    // cada vez que guardas un archivo. Muy útil al escribir tests.
    // Las comillas en la clave son necesarias porque tiene dos puntos (:).
    // Se ejecuta con: npm run test:watch

    lint: "eslint src/",
    // ESLint analiza el código buscando errores, malas prácticas
    // y violaciones del estilo de código configurado.
    // Muestra advertencias y errores pero NO modifica los archivos.
    // Se ejecuta con: npm run lint

    "lint:fix": "eslint src/ --fix",
    // Igual que lint pero corrige automáticamente los errores
    // que ESLint puede resolver solo (sangría, comillas, etc.).
    // No puede corregir errores lógicos, solo de estilo.
    // Se ejecuta con: npm run lint:fix

    format: "prettier --write src/",
    // Prettier reformatea todos los archivos con el estilo configurado.
    // Diferencia con eslint: eslint busca ERRORES, prettier solo
    // formatea (espacios, saltos de línea, comillas, etc.).
    // Se ejecuta con: npm run format

    // SCRIPTS DE DEPLOYMENT:
    "build:prod": "NODE_ENV=production node src/index.js",
    // Inicia el servidor con la variable NODE_ENV=production.
    // Tu código puede leer process.env.NODE_ENV para comportarse
    // diferente según el entorno (más logs en dev, menos en prod).

    "db:seed": "node src/scripts/seed.js",
    // Script personalizado para poblar la base de datos con
    // datos de prueba. Útil para configurar un entorno nuevo.
    // Se ejecuta con: npm run db:seed

    "db:migrate": "node src/scripts/migrate.js",
    // Script para correr migraciones de base de datos (cambios en
    // la estructura de los datos).

    prepare: "husky install",
    // Script especial: npm lo ejecuta automáticamente al hacer
    // npm install. Se usa para configurar husky (herramienta que
    // ejecuta scripts antes de cada git commit, como lint y tests).
    // Este script se ejecuta SOLO con npm install, no necesitas llamarlo.
  },

  keywords: ["api", "rest", "nodejs", "express", "mongodb", "ecommerce"],
  // Palabras clave para búsqueda en npmjs.com.
  // Solo útil si publicas el paquete. En proyectos privados no importa.

  author: {
    // El author puede ser un string: "Ana García <ana@ejemplo.com>"
    // O un objeto con campos separados (más limpio y estructurado):
    name: "Ana García",
    email: "ana@ejemplo.com",
    url: "https://anagarcia.dev",
  },

  license: "MIT",

  engines: {
    // Declara con qué versiones de Node.js y npm funciona este proyecto.
    // Si alguien intenta instalar con una versión incompatible,
    // npm mostrará una advertencia.
    // '>= 18.0.0' significa "Node.js 18 o mayor".
    // Node.js 18 introdujo el fetch nativo, por ejemplo.
    node: ">=18.0.0",
    npm: ">=9.0.0",
  },

  dependencies: {
    // PAQUETES DE PRODUCCIÓN — necesarios para que la app funcione.
    // Se instalan en el servidor real.

    express: "^4.18.2",
    // Framework web. La base de tu API.

    mongoose: "^7.0.0",
    // ODM para MongoDB. Define modelos, schemas y hace queries.

    cors: "^2.8.5",
    // Permite peticiones HTTP desde otros dominios (frontend → backend).

    dotenv: "^16.0.3",
    // Carga variables de entorno desde el archivo .env.

    bcryptjs: "^2.4.3",
    // Hashing de contraseñas. Nunca guardes contraseñas en texto plano.

    jsonwebtoken: "^9.0.0",
    // Crea y verifica tokens JWT para autenticación.

    "express-validator": "^7.0.0",
    // Valida los datos que llegan en req.body, req.params, req.query.
    // Evita que datos inválidos lleguen a tu base de datos.

    helmet: "^7.0.0",
    // Configura headers HTTP de seguridad automáticamente.
    // Protege contra XSS, clickjacking y otros ataques comunes.

    morgan: "^1.10.0",
    // Logger HTTP: registra cada petición que recibe el servidor.
    // Formato: GET /api/tasks 200 45ms - 1.2kb
    // Muy útil para depurar y monitorear en producción.

    "express-rate-limit": "^7.0.0",
    // Limita peticiones por IP para prevenir ataques de fuerza bruta.
    // Ejemplo: máximo 100 peticiones por minuto por dirección IP.
  },

  devDependencies: {
    // PAQUETES DE DESARROLLO — solo para trabajar en el código.
    // NO se instalan en el servidor de producción.
    // Se instalan con: npm install --production (omite estos).

    nodemon: "^3.0.0",
    // Reinicia el servidor al guardar cambios durante desarrollo.

    jest: "^29.0.0",
    // Framework de testing. Corre pruebas unitarias y de integración.

    supertest: "^6.3.0",
    // Permite testear las rutas de tu API Express sin levantar
    // un servidor real. Muy usado junto con Jest.

    eslint: "^8.0.0",
    // Analiza el código en busca de errores y malas prácticas.

    "eslint-config-airbnb-base": "^15.0.0",
    // Conjunto de reglas ESLint usadas por Airbnb.
    // Es el estándar de la industria más popular para estilo de código.

    prettier: "^3.0.0",
    // Formateador de código. Elimina debates sobre estilo en el equipo.

    husky: "^8.0.0",
    // Ejecuta scripts (lint, tests) automáticamente antes de cada
    // git commit. Previene subir código con errores.
  },
};

console.log(JSON.stringify(packageJsonCompleto, null, 2));
// JSON.stringify convierte el objeto JavaScript a un string JSON formateado.
// null → sin función de reemplazo personalizada
// 2   → 2 espacios de indentación para legibilidad


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 3: Los scripts a fondo — cómo funcionan por dentro
// ═══════════════════════════════════════════════════════════
//
//  Los scripts de package.json son más que simples atajos.
//  npm hace cosas especiales cuando los ejecuta:
//
//  1. Agrega node_modules/.bin al PATH temporalmente:
//     Cuando instalas un paquete que tiene herramienta CLI
//     (como nodemon, jest, eslint), su ejecutable se guarda en
//     node_modules/.bin/nodemon
//     Sin npm, ejecutar nodemon en la terminal daría error porque
//     no está en el PATH del sistema.
//     Pero cuando ejecutas 'npm run dev', npm agrega
//     node_modules/.bin/ al PATH temporalmente, así puede
//     encontrar nodemon sin que lo tengas instalado globalmente.
//
//  2. Los hooks pre y post son automáticos:
//     Si tienes un script "build", puedes tener:
//     "prebuild"  → se ejecuta ANTES de build
//     "postbuild" → se ejecuta DESPUÉS de build
//     npm los detecta por el prefijo y los ejecuta en orden.
//
//  3. Las variables de entorno npm_* están disponibles:
//     Dentro de un script, puedes acceder a las propiedades
//     del package.json como variables de entorno:
//     npm_package_name    → el valor de "name"
//     npm_package_version → el valor de "version"

console.log("\n\n📋 GUÍA COMPLETA DE SCRIPTS:");
console.log("──────────────────────────────");

const scriptGuia = [
  {
    script: "npm start",
    descripcion: "Ejecuta el script 'start'. Para producción.",
    cuandoUsar:
      "En el servidor de producción (Heroku, AWS, VPS). Node.js directo, sin nodemon.",
    ejemplo: '"start": "node src/index.js"',
    esAtajo: true,
  },
  {
    script: "npm run dev",
    descripcion: "Ejecuta el script 'dev'. Para desarrollo local.",
    cuandoUsar:
      "En tu computadora mientras programas. Nodemon reinicia al guardar.",
    ejemplo: '"dev": "nodemon src/index.js"',
    esAtajo: false,
  },
  {
    script: "npm test",
    descripcion: "Ejecuta el script 'test'. Corre las pruebas automáticas.",
    cuandoUsar:
      "Antes de hacer push a GitHub. En CI/CD (integración continua).",
    ejemplo: '"test": "jest --coverage"',
    esAtajo: true,
  },
  {
    script: "npm run lint",
    descripcion: "Analiza el código buscando errores y malas prácticas.",
    cuandoUsar:
      "Antes de hacer commit. Encuentra errores que el compilador no ve.",
    ejemplo: '"lint": "eslint src/"',
    esAtajo: false,
  },
  {
    script: "npm run lint:fix",
    descripcion: "Corrige automáticamente errores de estilo que ESLint puede resolver.",
    cuandoUsar:
      "Cuando lint reporta muchos errores de formato. Arregla los simples solo.",
    ejemplo: '"lint:fix": "eslint src/ --fix"',
    esAtajo: false,
  },
  {
    script: "npm run format",
    descripcion: "Reformatea todos los archivos con Prettier.",
    cuandoUsar:
      "Para estandarizar el estilo de código en el equipo. Todos el código queda igual.",
    ejemplo: '"format": "prettier --write src/"',
    esAtajo: false,
  },
  {
    script: "npm run build",
    descripcion:
      "Compila el código (transpila TypeScript a JS, bundlea con Webpack, etc.).",
    cuandoUsar:
      "Proyectos con TypeScript o que necesitan empaquetado. En backend puro con JS no suele ser necesario.",
    ejemplo: '"build": "tsc"  o  "build": "webpack --config webpack.config.js"',
    esAtajo: false,
  },
];

scriptGuia.forEach(({ script, descripcion, cuandoUsar, ejemplo, esAtajo }) => {
  console.log(`\n  $ ${script}`);
  if (esAtajo) {
    console.log(
      `    ℹ️  Es un ATAJO — no necesitas escribir 'run'. Solo '${script}' es suficiente.`
    );
  }
  console.log(`    📌 Qué hace:     ${descripcion}`);
  console.log(`    ✅ Cuándo usar:  ${cuandoUsar}`);
  console.log(`    📝 Ejemplo:      ${ejemplo}`);
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 4: Diferencia visual entre dependencies y devDependencies
// ═══════════════════════════════════════════════════════════
//
//  Esta es una de las confusiones más comunes al principio.
//  ¿Cómo sé si un paquete va en dependencies o devDependencies?
//  La regla es simple pero hay que interiorizarla.
//
//  Pregúntate: "¿Sin este paquete, mi aplicación no funcionaría
//  cuando está corriendo en el servidor de producción?"
//  - SÍ → dependencies
//  - NO (solo lo uso mientras programo) → devDependencies

console.log("\n\n📦 dependencies vs devDependencies — La diferencia visual:");
console.log("──────────────────────────────────────────────────────────");

console.log(`
  Imagina que tu proyecto es una panadería:

  DEPENDENCIES (ingredientes que SIEMPRE necesitas):
  ┌─────────────────────────────────────────────────────────┐
  │  express       → el horno (fundamental para cocinar)    │
  │  mongoose      → la receta base (conectar a BD)         │
  │  dotenv        → el libro de secretos (.env)            │
  │  bcryptjs      → la caja fuerte (contraseñas)           │
  │  jsonwebtoken  → los carnés de identidad (JWT)          │
  │  cors          → la puerta de entrada (peticiones HTTP) │
  └─────────────────────────────────────────────────────────┘
  Sin CUALQUIERA de estos, la panadería no puede abrir.

  DEVDEPENDENCIES (herramientas del panadero, no del cliente):
  ┌─────────────────────────────────────────────────────────┐
  │  nodemon    → el alarma que avisa cuando algo cambia    │
  │  jest       → el inspector de calidad (tests)           │
  │  eslint     → el corrector de recetas (linter)          │
  │  prettier   → el libro de estilo (formato de código)    │
  │  husky      → el portero que revisa antes de publicar   │
  └─────────────────────────────────────────────────────────┘
  El CLIENTE nunca ve estas herramientas. Solo las usa
  el panadero (desarrollador) mientras trabaja.
  En el servidor de producción, estas herramientas
  NO están instaladas. Solo los ingredientes.
`);

// Simulamos los dos entornos para dejar claro qué se instala dónde
const entornos = [
  {
    nombre: "Tu computadora (DESARROLLO)",
    comando: "npm install",
    paquetesInstalados: [
      "express ✅",
      "mongoose ✅",
      "dotenv ✅",
      "bcryptjs ✅",
      "jsonwebtoken ✅",
      "cors ✅",
      "nodemon ✅ (devDep)",
      "jest ✅ (devDep)",
      "eslint ✅ (devDep)",
      "prettier ✅ (devDep)",
    ],
    descripcion:
      "npm install instala TODO — dependencies Y devDependencies.\nAsí tienes todas las herramientas para desarrollar.",
  },
  {
    nombre: "Servidor de producción (PRODUCCIÓN)",
    comando: "npm install --production",
    paquetesInstalados: [
      "express ✅",
      "mongoose ✅",
      "dotenv ✅",
      "bcryptjs ✅",
      "jsonwebtoken ✅",
      "cors ✅",
      "nodemon ❌ (no necesario)",
      "jest ❌ (no necesario)",
      "eslint ❌ (no necesario)",
      "prettier ❌ (no necesario)",
    ],
    descripcion:
      "npm install --production instala SOLO dependencies.\nAhorra espacio en disco y reduce la superficie de ataque.",
  },
];

entornos.forEach(({ nombre, comando, paquetesInstalados, descripcion }) => {
  console.log(`\n  🖥️  ${nombre}`);
  console.log(`  Comando ejecutado: ${comando}`);
  console.log(`  Paquetes instalados:`);
  paquetesInstalados.forEach((p) => console.log(`    ${p}`));
  console.log(`\n  ℹ️  ${descripcion}`);
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 5: Las versiones de paquetes a fondo
// ═══════════════════════════════════════════════════════════
//
//  Entender los símbolos de versión (^, ~, *, >=) es crucial
//  para gestionar bien las dependencias de un proyecto.
//  Un error al especificar versiones puede hacer que una
//  actualización rompa tu aplicación sin previo aviso.

console.log("\n\n🔢 ESPECIFICACIÓN DE VERSIONES EN package.json:");
console.log("──────────────────────────────────────────────");

const ejemplosVersiones = [
  {
    especificacion: '"express": "4.18.2"',
    nombre: "Versión EXACTA (fijada)",
    significado: "Solo instala EXACTAMENTE express 4.18.2. Ninguna otra.",
    cuandoUsar:
      "Cuando necesitas estabilidad absoluta y sabes que una versión específica funciona bien. Más común en package-lock.json que en package.json.",
    riesgo:
      "No recibes automáticamente correcciones de seguridad en versiones patch.",
  },
  {
    especificacion: '"express": "^4.18.2"',
    nombre: "Compatible (caret ^) — EL MÁS COMÚN",
    significado:
      "Instala 4.18.2 o cualquier versión 4.x.x más nueva. NUNCA 5.x.x.",
    cuandoUsar:
      "La opción por defecto de npm. Recibes bugfixes y nuevas funciones compatibles automáticamente.",
    riesgo:
      "En teoría mínimo (versiones minor no rompen compatibilidad). En la práctica a veces sí ocurren problemas.",
  },
  {
    especificacion: '"express": "~4.18.2"',
    nombre: "Aproximada (tilde ~) — CONSERVADORA",
    significado:
      "Instala 4.18.2 o cualquier 4.18.x más nueva. NUNCA 4.19.x.",
    cuandoUsar:
      "Cuando quieres solo correcciones de seguridad (patch) pero no nuevas funcionalidades. Más estricto que ^.",
    riesgo:
      "Muy bajo. Solo acepta correcciones de bugs, no cambios de funcionalidad.",
  },
  {
    especificacion: '"express": ">=4.18.2"',
    nombre: "Mayor o igual",
    significado: "Instala 4.18.2 o CUALQUIER versión más nueva, incluso 5.x.x.",
    cuandoUsar:
      "Raramente en producción. Puede instalar versiones MAJOR que rompan tu código.",
    riesgo:
      "ALTO. Evitar en dependencias de producción a menos que seas muy cuidadoso.",
  },
  {
    especificacion: '"express": ">=4.0.0 <5.0.0"',
    nombre: "Rango explícito",
    significado: "Instala cualquier versión 4.x.x. Equivalente a ^4.0.0.",
    cuandoUsar:
      "Cuando quieres ser muy explícito sobre el rango aceptable. Documentación clara.",
    riesgo: "Bajo. Equivale a usar ^ pero es más descriptivo.",
  },
  {
    especificacion: '"express": "*"',
    nombre: "Cualquier versión",
    significado: "Instala la versión más reciente disponible, sea cual sea.",
    cuandoUsar: "NUNCA en proyectos reales. Solo para experimentos rápidos.",
    riesgo: "MUY ALTO. Puede instalar versiones que rompan completamente tu app.",
  },
  {
    especificacion: '"express": "latest"',
    nombre: "La más reciente (etiqueta)",
    significado: "Instala la versión marcada como 'latest' en npm.",
    cuandoUsar: "Solo para experimentar. Igual de arriesgado que *.",
    riesgo: "MUY ALTO. Mismas implicaciones que *.",
  },
];

ejemplosVersiones.forEach(({ especificacion, nombre, significado, cuandoUsar, riesgo }) => {
  console.log(`\n  📌 ${especificacion}`);
  console.log(`     Nombre:       ${nombre}`);
  console.log(`     Significa:    ${significado}`);
  console.log(`     Usar cuando:  ${cuandoUsar}`);
  console.log(`     Riesgo:       ${riesgo}`);
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 6: package.json como fuente de verdad del proyecto
// ═══════════════════════════════════════════════════════════
//
//  Una propiedad poderosa de package.json es que muchas
//  herramientas del ecosistema Node.js lo usan para guardar
//  su configuración. En vez de tener docenas de archivos de
//  configuración separados, muchas herramientas leen su config
//  directamente de package.json.
//
//  Esto mantiene el proyecto más organizado.

console.log("\n\n⚙️  package.json COMO CENTRO DE CONFIGURACIÓN:");
console.log("────────────────────────────────────────────────");

const packageConConfiguraciones = {
  name: "proyecto-con-config",
  version: "1.0.0",

  // Configuración de Jest (framework de testing):
  jest: {
    testEnvironment: "node",
    // Donde corren los tests. "node" para backend, "jsdom" para frontend.

    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    // Porcentaje mínimo de cobertura de tests requerido.
    // Si los tests no cubren al menos el 80% del código,
    // 'npm test' falla. Garantiza calidad mínima.

    testMatch: ["**/__tests__/**/*.js", "**/*.test.js"],
    // Patrón de archivos que Jest reconoce como archivos de test.
  },

  // Configuración de ESLint (linter de código):
  eslintConfig: {
    extends: ["airbnb-base"],
    // Hereda las reglas del estilo de Airbnb (el más popular).

    env: {
      node: true,
      // Activa las variables globales de Node.js (require, module, etc.)
      es2022: true,
      // Activa las características modernas de JavaScript (ES2022).
    },

    rules: {
      "no-console": "off",
      // Airbnb prohíbe console.log por defecto (para producción).
      // En un backend con logging, queremos poder usar console.log.
      // "off" desactiva esa regla específica.

      "import/prefer-default-export": "off",
      // Airbnb prefiere export default, pero en CommonJS no existe.
    },
  },

  // Configuración de Prettier (formateador):
  prettier: {
    semi: true,
    // Poner punto y coma al final de cada línea.

    singleQuote: true,
    // Usar comillas simples en vez de dobles (estilo JavaScript moderno).

    tabWidth: 2,
    // 2 espacios de indentación.

    trailingComma: "es5",
    // Poner coma al final del último elemento en objetos y arrays
    // donde sea válido en ES5. Hace los diffs de Git más limpios.

    printWidth: 100,
    // Longitud máxima de línea antes de hacer salto de línea.
  },

  // Configuración de Browserslist (qué navegadores soporta):
  browserslist: ["> 1%", "last 2 versions", "not dead"],
  // Esto le dice a Babel/Webpack qué navegadores debe soportar.
  // "> 1%": navegadores usados por más del 1% globalmente
  // "last 2 versions": las últimas 2 versiones de cada navegador
  // "not dead": excluir navegadores sin soporte oficial

  scripts: { start: "node index.js", test: "jest" },
  dependencies: {},
  devDependencies: {},
};

console.log(
  "\n  Muchas herramientas leen su configuración desde package.json:"
);
console.log(
  "  En vez de tener .eslintrc.json, .prettierrc, jest.config.js"
);
console.log(
  "  por separado, todo puede vivir en package.json:\n"
);

const seccionesConfig = [
  {
    campo: '"jest": { ... }',
    herramienta: "Jest",
    descripcion: "Configura cómo correr los tests, qué archivos son tests, cobertura mínima",
  },
  {
    campo: '"eslintConfig": { ... }',
    herramienta: "ESLint",
    descripcion: "Define las reglas de estilo y buenas prácticas del código",
  },
  {
    campo: '"prettier": { ... }',
    herramienta: "Prettier",
    descripcion: "Define cómo formatear el código (comillas, punto y coma, indentación)",
  },
  {
    campo: '"browserslist": [ ... ]',
    herramienta: "Babel / Webpack",
    descripcion: "Define qué navegadores debe soportar el código compilado",
  },
  {
    campo: '"husky": { ... }',
    herramienta: "Husky",
    descripcion: "Configura qué scripts correr antes de git commit/push",
  },
];

seccionesConfig.forEach(({ campo, herramienta, descripcion }) => {
  console.log(`  🔧 ${campo}`);
  console.log(`     Herramienta: ${herramienta}`);
  console.log(`     Qué hace:    ${descripcion}`);
  console.log("");
});

console.log(
  "  Resultado: un proyecto limpio con UN solo archivo de config central,"
);
console.log("  en vez de 5-6 archivos de configuración separados.\n");


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 7: Crear un package.json desde cero con Node.js
// ═══════════════════════════════════════════════════════════
//
//  Aquí hacemos algo práctico: generamos un package.json
//  programáticamente y lo escribimos al disco. Así ves cómo
//  se combina el conocimiento de JSON, el módulo fs, path
//  y la estructura de package.json en código real.
//
//  En la práctica usarías 'npm init -y' para esto, pero
//  entender cómo hacerlo programáticamente es valioso para
//  herramientas de scaffolding (generadores de proyectos).

console.log("\n\n🛠️  GENERANDO UN package.json PROGRAMÁTICAMENTE:");
console.log("──────────────────────────────────────────────────");

function generarPackageJson(opciones) {
  // Esta función recibe opciones y construye un objeto package.json.
  // Es una versión simplificada de lo que hace 'npm init'.
  //
  // El parámetro 'opciones' es un objeto con las propiedades
  // que el usuario quiere personalizar.

  const {
    nombre,
    descripcion = "Un proyecto Node.js",
    // El = después de la desestructuración es un VALOR POR DEFECTO.
    // Si descripcion no está en el objeto opciones (es undefined),
    // toma el valor "Un proyecto Node.js" automáticamente.
    autor = "Desarrollador",
    esPrivado = true,
    tieneExpress = true,
    tieneMongoose = false,
  } = opciones;
  // DESTRUCTURING del objeto opciones:
  // En vez de escribir opciones.nombre, opciones.descripcion, etc.,
  // extraemos las propiedades en variables locales de una vez.
  // Los valores después de = son defaults para propiedades no definidas.

  // Construimos el objeto base del package.json
  const pkg = {
    name: nombre.toLowerCase().replace(/\s+/g, "-"),
    // .toLowerCase() convierte todo a minúsculas.
    // .replace(/\s+/g, "-") reemplaza uno o más espacios con guion.
    // /\s+/g es una expresión regular:
    //   \s  → cualquier espacio en blanco (espacio, tab, etc.)
    //   +   → uno o más de lo anterior
    //   g   → global: reemplaza TODOS, no solo el primero
    // Resultado: "Mi Proyecto Node" → "mi-proyecto-node"
    // Así el nombre siempre cumple las reglas de npm.

    version: "1.0.0",
    description: descripcion,
    main: "src/index.js",
    private: esPrivado,
    scripts: {
      start: "node src/index.js",
      dev: "nodemon src/index.js",
      test: 'echo "No hay tests configurados" && exit 1',
    },
    author: autor,
    license: esPrivado ? "UNLICENSED" : "MIT",
    // Operador ternario: condición ? valorSiVerdadero : valorSiFalso
    // Si el proyecto es privado → "UNLICENSED" (no para distribución)
    // Si es público → "MIT" (libre uso)
    dependencies: {},
    devDependencies: {
      nodemon: "^3.0.0",
    },
  };

  // Agregamos dependencias condicionalmente según las opciones
  if (tieneExpress) {
    pkg.dependencies.express = "^4.18.2";
    pkg.dependencies.cors = "^2.8.5";
    pkg.dependencies.dotenv = "^16.0.3";
    pkg.dependencies.morgan = "^1.10.0";
    // Solo si el usuario quiere Express, agregamos estos paquetes.
    // Esto permite crear un generador flexible que adapta el
    // package.json según las necesidades del proyecto.
  }

  if (tieneMongoose) {
    pkg.dependencies.mongoose = "^7.0.0";
    // Solo si el usuario quiere MongoDB, agregamos mongoose.
  }

  return pkg;
}

// Probamos la función con diferentes configuraciones
const proyectoA = generarPackageJson({
  nombre: "API de Tareas",
  descripcion: "API REST para gestión de tareas",
  autor: "Tu Nombre",
  esPrivado: true,
  tieneExpress: true,
  tieneMongoose: true,
});

const proyectoB = generarPackageJson({
  nombre: "CLI Tool",
  descripcion: "Herramienta de línea de comandos",
  autor: "Tu Nombre",
  esPrivado: false,
  tieneExpress: false,
  tieneMongoose: false,
});

console.log("\n  Proyecto A — API con Express y MongoDB:");
console.log("  " + "─".repeat(45));
console.log(JSON.stringify(proyectoA, null, 2));

console.log("\n  Proyecto B — Herramienta CLI sin servidor web:");
console.log("  " + "─".repeat(45));
console.log(JSON.stringify(proyectoB, null, 2));

// Guardamos el Proyecto A como archivo real
const rutaSalida = path.join(__dirname, "package_generado_ejemplo.json");
fs.writeFile(rutaSalida, JSON.stringify(proyectoA, null, 2) + "\n", "utf8", (error) => {
  if (error) {
    console.error("\n  ❌ No se pudo guardar el archivo:", error.message);
    return;
  }
  console.log(
    `\n  ✅ Archivo 'package_generado_ejemplo.json' generado exitosamente.`
  );
  console.log(
    `     Ubicación: ${rutaSalida}`
  );
  console.log(
    `     Así es como herramientas como 'create-react-app' o 'npm init'`
  );
  console.log(
    `     generan el package.json automáticamente por ti.`
  );
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 8: El archivo .gitignore — qué no subir a GitHub
// ═══════════════════════════════════════════════════════════
//
//  El .gitignore es un archivo de texto que Git lee para saber
//  qué archivos y carpetas debe IGNORAR completamente.
//  Los archivos ignorados no aparecen en 'git status', no se
//  añaden con 'git add .', y nunca se suben a GitHub.
//
//  ¿Por qué existe .gitignore?
//  Porque hay archivos que NO deben subirse a un repositorio:
//  - Archivos muy grandes que se pueden regenerar (node_modules)
//  - Archivos con información sensible (.env con contraseñas)
//  - Archivos generados automáticamente por el SO o el editor
//  - Archivos de configuración local que son diferentes en cada computadora
//
//  El .gitignore usa patrones glob para especificar qué ignorar:
//  - node_modules/    → ignora la carpeta entera
//  - *.log            → ignora CUALQUIER archivo con extensión .log
//  - .env             → ignora exactamente el archivo .env
//  - dist/            → ignora la carpeta dist/
//  - !importante.log  → excepción: NO ignora este archivo aunque *.log diga que sí

console.log("\n\n🚫 ARCHIVO .gitignore — Qué nunca subir a GitHub:");
console.log("────────────────────────────────────────────────");

const gitignoreContenido = `# ================================================
# .gitignore para proyectos Node.js
# ================================================
# Este archivo le dice a Git qué ignorar.
# Los archivos ignorados no se suben a GitHub.

# ───────────────────────────────────────────────
# DEPENDENCIAS — La más importante
# ───────────────────────────────────────────────
node_modules/
# Esta carpeta puede pesar cientos de MB y tiene miles de archivos.
# Se regenera en cualquier computadora con solo ejecutar: npm install
# NUNCA, jamás, bajo ninguna circunstancia subas node_modules a Git.
# Si lo haces por error, el repositorio queda gigante para siempre.

# ───────────────────────────────────────────────
# VARIABLES DE ENTORNO — La más peligrosa
# ───────────────────────────────────────────────
.env
.env.local
.env.development
.env.production
.env.test
# Estos archivos contienen contraseñas, claves de API, credenciales
# de base de datos, secretos JWT y otra información sensible.
# Si los subes a un repositorio PÚBLICO, cualquiera puede ver tus
# contraseñas. Incluso en repos PRIVADOS, es mala práctica.
# Siempre crea un .env.example con los NOMBRES de las variables
# (sin los valores) para que otros sepan qué configurar.

# ───────────────────────────────────────────────
# ARCHIVOS GENERADOS — Se pueden regenerar
# ───────────────────────────────────────────────
dist/
build/
out/
# Código compilado/transpilado. Se regenera con npm run build.
# No tiene sentido versionar código generado automáticamente.

coverage/
# Reporte de cobertura de tests generado por jest --coverage.
# Se regenera con npm test.

# ───────────────────────────────────────────────
# ARCHIVOS DEL SISTEMA OPERATIVO — Basura del SO
# ───────────────────────────────────────────────
.DS_Store
.DS_Store?
._*
# macOS crea estos archivos ocultos en cada carpeta para guardar
# metadatos (icono de carpeta, posición de ventana, etc.).
# En Windows y Linux no existen. Son completamente inútiles en Git.

Thumbs.db
ehthumbs.db
Desktop.ini
# Windows crea estos archivos para cachear miniaturas de imágenes
# y configuración de carpetas. No tienen ningún valor en el repositorio.

# ───────────────────────────────────────────────
# ARCHIVOS DE EDITORES — Configuración local
# ───────────────────────────────────────────────
.vscode/
# Carpeta de VS Code con configuración local (extensiones recomendadas,
# settings). OPCIONAL: algunos equipos SÍ la suben para compartir
# la configuración del editor. Decide con tu equipo.
# Si la subes, asegúrate de no tener rutas absolutas en los settings.

.idea/
*.swp
*.swo
# .idea/ es de IntelliJ IDEA/WebStorm.
# .swp y .swo son archivos temporales de Vim.

# ───────────────────────────────────────────────
# LOGS — Archivos de registro
# ───────────────────────────────────────────────
*.log
logs/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# Los logs son generados por la aplicación durante su ejecución.
# Son específicos de cada entorno. No tienen sentido en el repositorio.

# ───────────────────────────────────────────────
# ARCHIVOS DE TESTING Y ANÁLISIS
# ───────────────────────────────────────────────
coverage/
.nyc_output/
# Resultados de cobertura de tests. Se regeneran corriendo los tests.

# ───────────────────────────────────────────────
# ARCHIVOS VARIOS
# ───────────────────────────────────────────────
*.pid
*.seed
*.pid.lock
# Archivos de proceso (PID = Process ID).
# Los crea el sistema operativo cuando un proceso está corriendo.
`;

console.log("\n  Contenido del .gitignore recomendado:");
console.log("  (Crea este archivo como '.gitignore' en la raíz del proyecto)\n");
gitignoreContenido.split("\n").forEach((linea) => {
  console.log("  " + linea);
});

// Guardamos el .gitignore de ejemplo como archivo real
const rutaGitignore = path.join(__dirname, "gitignore_ejemplo.txt");
fs.writeFile(rutaGitignore, gitignoreContenido, "utf8", (error) => {
  if (error) {
    console.error("  ❌ Error guardando .gitignore de ejemplo:", error.message);
    return;
  }
  console.log(
    `\n  ✅ Archivo 'gitignore_ejemplo.txt' guardado.`
  );
  console.log(
    `     En tu proyecto real, créalo como '.gitignore' (con el punto al inicio).`
  );
  console.log(
    `     El punto al inicio lo hace un archivo oculto en Linux/Mac.`
  );
  console.log(
    `     Git lo detecta automáticamente por su nombre exacto: .gitignore`
  );
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 9: Errores comunes con package.json y cómo evitarlos
// ═══════════════════════════════════════════════════════════
//
//  Estos son los errores más frecuentes que cometen los
//  desarrolladores al trabajar con package.json, especialmente
//  al principio. Conocerlos de antemano te ahorra horas.

console.log("\n\n🐛 ERRORES COMUNES CON package.json:");
console.log("──────────────────────────────────────");

const erroresPackageJson = [
  {
    error: "SyntaxError: JSON.parse: unexpected character",
    causa:
      "Hay un error de sintaxis en el package.json. JSON es muy estricto.",
    erroresDeJson: [
      "Coma al final del último elemento: { 'x': 1, } ← coma sobrante",
      "Comillas simples en vez de dobles: { 'name': 'proyecto' }",
      "Falta de coma entre propiedades: { 'name': 'x' 'version': '1.0.0' }",
      "Comentarios dentro del JSON: // esto no está permitido",
      "Clave sin comillas: { name: 'proyecto' } ← las claves necesitan comillas",
    ],
    solucion:
      "Instala la extensión 'Error Lens' en VS Code para ver errores JSON en tiempo real. O usa jsonlint.com para validar.",
  },
  {
    error:
      "El proyecto funcionaba en mi computadora pero no en la del compañero",
    causa:
      "No tienen las mismas versiones de los paquetes. package-lock.json no se subió a Git.",
    erroresDeJson: [],
    solucion:
      "Asegúrate de subir package-lock.json a Git. Nunca lo agregues al .gitignore.",
  },
  {
    error: "npm install no instala todos los paquetes que necesito",
    causa:
      "Instalaste un paquete manualmente moviendo archivos a node_modules sin agregarlo al package.json.",
    erroresDeJson: [],
    solucion:
      "Siempre instala paquetes con 'npm install <paquete>'. Nunca copies archivos a node_modules manualmente.",
  },
  {
    error: "npm run dev dice: 'nodemon is not recognized as a command'",
    causa:
      "nodemon está en devDependencies pero no está instalado (falta npm install).",
    erroresDeJson: [],
    solucion:
      "Ejecuta 'npm install' para instalar todas las dependencias. O 'npm install nodemon --save-dev' para agregarlo.",
  },
  {
    error: "Publiqué accidentalmente mi proyecto privado en npm",
    causa: 'No tenías "private": true en el package.json.',
    erroresDeJson: [],
    solucion:
      'Agrega "private": true al package.json de todos tus proyectos privados. npm rechazará publicarlos.',
  },
  {
    error: "El repositorio de GitHub pesa cientos de MB",
    causa:
      "Subiste node_modules/ a Git porque no tenías .gitignore o lo creaste después del primer commit.",
    erroresDeJson: [],
    solucion:
      "1) Agrega node_modules/ al .gitignore. 2) Ejecuta: git rm -r --cached node_modules  3) Haz commit de los cambios.",
  },
];

erroresPackageJson.forEach(({ error, causa, erroresDeJson, solucion }) => {
  console.log(`\n  ❌ Problema: "${error}"`);
  console.log(`     Causa:    ${causa}`);
  if (erroresDeJson.length > 0) {
    console.log(`     Errores de sintaxis JSON más comunes:`);
    erroresDeJson.forEach((e) => console.log(`       • ${e}`));
  }
  console.log(`     Solución: ${solucion}`);
});


// ═══════════════════════════════════════════════════════════
//  CONEXIÓN CON TU PROYECTO DE BACKEND
// ═══════════════════════════════════════════════════════════
//
//  Todo lo que aprendiste sobre package.json es la infraestructura
//  invisible de tu proyecto de backend con Express y MongoDB.
//
//  Tu package.json actual debería tener:
//
//  "scripts": {
//    "start": "node src/index.js",       ← para producción
//    "dev": "nodemon src/index.js"        ← para desarrollo
//  }
//
//  "dependencies": {
//    "express": "^4.x.x",        ← el servidor web
//    "mongoose": "^7.x.x",       ← la conexión a MongoDB
//    "dotenv": "^16.x.x",        ← para leer el .env
//    "cors": "^2.x.x",           ← para peticiones del frontend
//    "bcryptjs": "^2.x.x",       ← para las contraseñas
//    "jsonwebtoken": "^9.x.x"    ← para los tokens JWT
//  }
//
//  "devDependencies": {
//    "nodemon": "^3.x.x"         ← reinicio automático al guardar
//  }
//
//  El flujo completo cuando alguien clona tu proyecto:
//  1. git clone https://github.com/tu-usuario/tu-proyecto
//  2. cd tu-proyecto
//  3. npm install           ← lee el package.json y descarga todo
//  4. cp .env.example .env  ← crea el .env con los secretos
//  5. npm run dev           ← arranca el servidor
//
//  En producción (en el servidor real):
//  1. git pull origin main         ← actualiza el código
//  2. npm install --production     ← instala solo dependencies
//  3. npm start                    ← arranca con node (no nodemon)

console.log("\n\n✅ Investigación de package.json completada exitosamente.\n");