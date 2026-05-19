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
//  ¿QUÉ INFORMACIÓN CONTIENE?
//  ──────────────────────────
//  1. Metadatos del proyecto (nombre, versión, descripción, autor)
//  2. Lista de paquetes (dependencias) que necesita el proyecto
//  3. Scripts/comandos que se pueden ejecutar con npm
//  4. Configuración diversa del proyecto
//
//  ¿POR QUÉ ES TAN IMPORTANTE?
//  ──────────────────────────────
//  Imagina que trabajas en equipo o compartes tu código en GitHub.
//  NO puedes subir la carpeta node_modules (pesa cientos de MB).
//  Solo subes el package.json que lista CUÁLES paquetes necesitas.
//  Cualquiera que clone tu proyecto corre 'npm install' y descarga
//  exactamente los mismos paquetes automáticamente.
//
//  CAMPOS PRINCIPALES:
//  ─────────────────────
//
//  "name"
//    Nombre del proyecto. Reglas:
//    - Solo minúsculas
//    - Sin espacios (usa guiones: "mi-proyecto")
//    - Único en npm si lo vas a publicar
//
//  "version"
//    Versión usando Semantic Versioning (semver): X.Y.Z
//    - X = MAJOR: cambios que rompen compatibilidad
//    - Y = MINOR: nuevas funciones compatibles
//    - Z = PATCH: corrección de errores
//
//  "main"
//    Archivo principal del proyecto. Cuando alguien usa tu paquete
//    con require('tu-paquete'), Node.js busca este archivo.
//    Por convención: "index.js"
//
//  "scripts"
//    Comandos personalizados. Se ejecutan con 'npm run <nombre>'.
//    Los más comunes:
//      "start" → npm start (ejecutar en producción)
//      "dev"   → npm run dev (ejecutar en desarrollo)
//      "test"  → npm test (correr pruebas)
//      "build" → npm run build (compilar el proyecto)
//
//  "dependencies"
//    Paquetes NECESARIOS para producción.
//    Se instalan con: npm install <paquete>
//
//  "devDependencies"
//    Paquetes solo para DESARROLLO.
//    Se instalan con: npm install <paquete> --save-dev
//    No se instalan en el servidor de producción.
//
//  "engines"
//    Especifica versiones compatibles de Node.js y npm.
//    Ejemplo: { "node": ">=18.0.0" }
//
//  "keywords"
//    Palabras clave para encontrar el paquete en npm (si lo publicas).
//
//  "author"
//    Nombre del autor del proyecto.
//
//  "license"
//    Licencia del proyecto:
//    - "MIT"     → Libre uso, modificación y distribución
//    - "ISC"     → Similar a MIT, más simple
//    - "GPL-3.0" → Requiere que los proyectos derivados sean open source
//    - "UNLICENSED" → Privado, no para distribución pública
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES package-lock.json?
//  ─────────────────────────────────────────────────────────
//  Cuando instalas paquetes, npm también crea 'package-lock.json'.
//  Este archivo registra las versiones EXACTAS de todos los paquetes
//  (incluyendo las dependencias de las dependencias).
//
//  Mientras package.json dice "express ^4.18.2" (cualquier 4.x.x),
//  package-lock.json dice "express 4.18.3" (EXACTAMENTE esa versión).
//
//  ✅ SÍ debes subir package-lock.json a Git (garantiza reproducibilidad).
//  ❌ NO subas node_modules/ a Git (agrega al .gitignore).
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — Trabajando con package.json
// ============================================================
//
//  INSTRUCCIONES:
//  1. Abre la terminal en VS Code (Ctrl + `)
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

// ────────────────────────────────────────────────────────
//  DEMO 1: Leer el package.json de ESTE proyecto
//  Si existe un package.json en la carpeta actual, lo mostramos
// ────────────────────────────────────────────────────────
const rutaPackageJson = path.join(__dirname, "package.json");

console.log("📂 Buscando package.json en:", __dirname);
console.log("─────────────────────────────────────────");

if (fs.existsSync(rutaPackageJson)) {
  // Leemos y parseamos el archivo
  const contenidoRaw = fs.readFileSync(rutaPackageJson, "utf8");
  const pkg = JSON.parse(contenidoRaw);

  console.log("✅ package.json encontrado!\n");
  console.log("  📌 Nombre del proyecto:  ", pkg.name || "No definido");
  console.log("  📌 Versión:              ", pkg.version || "No definido");
  console.log("  📌 Descripción:          ", pkg.description || "No definido");
  console.log("  📌 Archivo principal:    ", pkg.main || "No definido");
  console.log("  📌 Autor:                ", pkg.author || "No definido");
  console.log("  📌 Licencia:             ", pkg.license || "No definido");

  // Mostramos los scripts si existen
  if (pkg.scripts && Object.keys(pkg.scripts).length > 0) {
    console.log("\n  📋 Scripts disponibles:");
    Object.entries(pkg.scripts).forEach(([nombre, comando]) => {
      console.log(`    npm run ${nombre.padEnd(10)} → ${comando}`);
    });
  }

  // Mostramos las dependencias si existen
  if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) {
    console.log("\n  📦 Dependencies (producción):");
    Object.entries(pkg.dependencies).forEach(([paquete, version]) => {
      console.log(`    ${paquete.padEnd(20)} ${version}`);
    });
  }

  if (pkg.devDependencies && Object.keys(pkg.devDependencies).length > 0) {
    console.log("\n  🔧 DevDependencies (solo desarrollo):");
    Object.entries(pkg.devDependencies).forEach(([paquete, version]) => {
      console.log(`    ${paquete.padEnd(20)} ${version}`);
    });
  }
} else {
  console.log("⚠️  No se encontró package.json en esta carpeta.");
  console.log("   Para crear uno, ejecuta: npm init -y\n");
}

// ────────────────────────────────────────────────────────
//  DEMO 2: Generamos y mostramos un package.json de ejemplo
// ────────────────────────────────────────────────────────
console.log("\n\n🔨 CREANDO UN package.json DE EJEMPLO COMPLETO:");
console.log("──────────────────────────────────────────────");

const packageJsonCompleto = {
  name: "tienda-virtual-api",
  version: "1.0.0",
  description: "API REST para una tienda virtual con Node.js, Express y MongoDB",
  main: "src/index.js",
  scripts: {
    start: "node src/index.js",
    dev: "nodemon src/index.js",
    test: "jest --coverage",
    "test:watch": "jest --watch",
    lint: "eslint src/",
    "lint:fix": "eslint src/ --fix",
    build: "echo 'No hay build en proyectos Node.js puros'",
  },
  keywords: ["api", "rest", "nodejs", "express", "mongodb", "ecommerce"],
  author: {
    name: "Ana García",
    email: "ana@ejemplo.com",
    url: "https://anagarcia.dev",
  },
  license: "MIT",
  engines: {
    node: ">=18.0.0",
    npm: ">=9.0.0",
  },
  dependencies: {
    express: "^4.18.2",
    mongoose: "^7.0.0",
    cors: "^2.8.5",
    dotenv: "^16.0.3",
    bcryptjs: "^2.4.3",
    jsonwebtoken: "^9.0.0",
    "express-validator": "^7.0.0",
  },
  devDependencies: {
    nodemon: "^3.0.0",
    jest: "^29.0.0",
    eslint: "^8.0.0",
    "eslint-config-airbnb-base": "^15.0.0",
  },
};

console.log(JSON.stringify(packageJsonCompleto, null, 2));

// ────────────────────────────────────────────────────────
//  DEMO 3: Explicación de los scripts más importantes
// ────────────────────────────────────────────────────────
console.log("\n\n📋 GUÍA DE SCRIPTS COMUNES:");
console.log("────────────────────────────");

const scriptGuia = [
  {
    script: "npm start",
    descripcion:
      "Ejecuta el script 'start'. Para producción. No reinicia automáticamente.",
  },
  {
    script: "npm run dev",
    descripcion:
      "Ejecuta el script 'dev'. Para desarrollo con nodemon (reinicio automático).",
  },
  {
    script: "npm test",
    descripcion: "Ejecuta las pruebas del proyecto.",
  },
  {
    script: "npm run lint",
    descripcion:
      "Analiza el código en busca de errores de estilo y buenas prácticas.",
  },
  {
    script: "npm run lint:fix",
    descripcion:
      "Corrige automáticamente los errores de estilo que puede solucionar.",
  },
];

scriptGuia.forEach(({ script, descripcion }) => {
  console.log(`\n  $ ${script}`);
  console.log(`    → ${descripcion}`);
});

// ────────────────────────────────────────────────────────
//  DEMO 4: Archivo .gitignore recomendado
// ────────────────────────────────────────────────────────
console.log("\n\n🚫 ARCHIVO .gitignore RECOMENDADO PARA PROYECTOS NODE.JS:");
console.log("────────────────────────────────────────────────────────");
console.log(
  "  (Crea este archivo en la raíz de tu proyecto como '.gitignore')"
);
console.log();

const gitignoreContenido = `# Dependencias - NO subir a Git (se regeneran con npm install)
node_modules/

# Variables de entorno - NUNCA subir (contienen contraseñas/claves)
.env
.env.local
.env.production

# Archivos del sistema operativo
.DS_Store        # macOS
Thumbs.db        # Windows

# Archivos de editores
.vscode/         # VS Code (opcional, algunos prefieren subirlo)
.idea/           # IntelliJ IDEA

# Carpeta de build/compilación
dist/
build/

# Cobertura de tests
coverage/

# Logs
*.log
npm-debug.log*
`;

gitignoreContenido.split("\n").forEach((linea) => {
  console.log("  " + linea);
});

console.log("\n✅ Investigación de package.json completada exitosamente.\n");