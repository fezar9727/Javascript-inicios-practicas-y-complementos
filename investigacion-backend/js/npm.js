// ============================================================
//  📘 INVESTIGACIÓN #2 — ¿QUÉ ES npm?
// ============================================================
//
//  npm (Node Package Manager) es el GESTOR DE PAQUETES oficial
//  de Node.js. Viene instalado automáticamente cuando instalas
//  Node.js en tu computador.
//
//  ¿QUÉ ES UN "PAQUETE"?
//  ─────────────────────
//  Un paquete es un conjunto de archivos de código reutilizable
//  que alguien ya escribió y publicó para que otros lo usen.
//  En vez de escribir código desde cero, puedes "instalar" ese
//  paquete y usarlo directamente en tu proyecto.
//
//  ¿QUÉ ES npm EXACTAMENTE?
//  ─────────────────────────
//  npm tiene DOS cosas:
//
//  1. 📦 UN REGISTRO (REGISTRY):
//     Es como una tienda/biblioteca gigante en internet
//     (https://www.npmjs.com) donde hay más de 2 MILLONES de
//     paquetes gratuitos que puedes usar en tus proyectos.
//
//  2. 🛠️ UNA HERRAMIENTA DE LÍNEA DE COMANDOS (CLI):
//     Es el comando 'npm' que usas en la terminal para instalar,
//     actualizar y eliminar paquetes de tu proyecto.
//
//  ─────────────────────────────────────────────────────────
//  COMANDOS ESENCIALES DE npm:
//  ─────────────────────────────────────────────────────────
//
//  📌 INICIAR UN PROYECTO:
//  ──────────────────────
//  npm init
//    → Inicia un proyecto nuevo. Te hace preguntas y crea
//      el archivo package.json paso a paso.
//
//  npm init -y
//    → Igual que npm init pero responde "sí" a todo automáticamente.
//      Crea el package.json con valores por defecto.
//      Es la opción más rápida para empezar.
//
//  📌 INSTALAR PAQUETES:
//  ─────────────────────
//  npm install <nombre-paquete>        (también: npm i <paquete>)
//    → Instala un paquete y lo agrega a "dependencies" en package.json.
//    → Crea (o actualiza) la carpeta node_modules/.
//    Ejemplo: npm install express
//
//  npm install <paquete> --save-dev    (también: npm i <paquete> -D)
//    → Instala un paquete SOLO para desarrollo.
//    → Lo agrega a "devDependencies" en package.json.
//    → Estos paquetes NO se incluyen en producción.
//    Ejemplo: npm install nodemon --save-dev
//
//  npm install -g <paquete>
//    → Instala un paquete de forma GLOBAL en tu computador
//      (disponible en cualquier proyecto, no solo en el actual).
//    Ejemplo: npm install -g nodemon
//
//  npm install (sin nombre de paquete)
//    → Instala TODOS los paquetes listados en package.json.
//    → Útil cuando clonas un proyecto de GitHub (no trae node_modules).
//
//  📌 DESINSTALAR PAQUETES:
//  ─────────────────────────
//  npm uninstall <paquete>
//    → Elimina el paquete del proyecto y lo quita del package.json.
//    Ejemplo: npm uninstall express
//
//  📌 ACTUALIZAR PAQUETES:
//  ────────────────────────
//  npm update
//    → Actualiza todos los paquetes a sus últimas versiones compatibles.
//
//  npm update <paquete>
//    → Actualiza un paquete específico.
//
//  📌 VER PAQUETES INSTALADOS:
//  ────────────────────────────
//  npm list
//    → Muestra todos los paquetes instalados en el proyecto actual.
//
//  npm list -g
//    → Muestra los paquetes instalados globalmente.
//
//  📌 EJECUTAR SCRIPTS:
//  ─────────────────────
//  npm run <nombre-script>
//    → Ejecuta un script definido en el package.json.
//    Ejemplo: npm run start   →  node index.js
//             npm run dev     →  nodemon index.js
//
//  npm start
//    → Atajo especial para ejecutar el script "start".
//
//  npm test
//    → Atajo especial para ejecutar el script "test".
//
//  📌 INFORMACIÓN:
//  ────────────────
//  npm --version   → Muestra la versión de npm instalada.
//  node --version  → Muestra la versión de Node.js instalada.
//  npm search <termino>  → Busca paquetes en el registro de npm.
//  npm info <paquete>    → Muestra detalles de un paquete.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES node_modules/?
//  ─────────────────────────────────────────────────────────
//  Cuando instalas paquetes, npm crea una carpeta llamada
//  'node_modules' en tu proyecto. Ahí guarda todos los
//  archivos de los paquetes instalados.
//
//  ⚠️  IMPORTANTE: NUNCA subas node_modules/ a GitHub ni la
//  compartas. Es una carpeta enorme que se puede regenerar
//  con 'npm install'. Agrégala al archivo .gitignore.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES .gitignore?
//  ─────────────────────────────────────────────────────────
//  Es un archivo que le dice a Git qué archivos o carpetas
//  debe IGNORAR (no subir a GitHub). Siempre debes incluir:
//    node_modules/
//    .env
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ SON dependencies vs devDependencies?
//  ─────────────────────────────────────────────────────────
//  dependencies (producción):
//    Paquetes que tu aplicación NECESITA para funcionar
//    cuando está en producción (en el servidor real).
//    Ejemplo: express, mongoose, cors
//
//  devDependencies (desarrollo):
//    Paquetes que solo necesitas MIENTRAS DESARROLLAS.
//    No son necesarios en producción.
//    Ejemplo: nodemon (reinicia el server automáticamente)
//             jest (para hacer pruebas)
//             prettier (para formatear código)
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — Simulación del flujo de npm
// ============================================================
//
//  INSTRUCCIONES:
//  1. Abre la terminal en VS Code (Ctrl + `)
//  2. Ejecuta: node 02_que_es_npm.js
//
//  NOTA: Este archivo NO requiere instalar nada.
//  Simula y explica el flujo de trabajo con npm.
//
// ============================================================

"use strict";

console.log("========================================");
console.log("  📦 GUÍA PRÁCTICA DE npm");
console.log("========================================\n");

// ────────────────────────────────────────────────────────
//  Simulamos la estructura de un proyecto Node.js típico
// ────────────────────────────────────────────────────────

// Esto es lo que contendría un package.json real
const packageJsonEjemplo = {
  name: "mi-primer-proyecto",
  version: "1.0.0",
  description: "Proyecto de ejemplo para aprender npm",
  main: "index.js",
  scripts: {
    start: "node index.js",
    dev: "nodemon index.js",
    test: 'echo "No hay tests aún" && exit 1',
  },
  keywords: ["nodejs", "ejemplo", "npm"],
  author: "Estudiante Programador",
  license: "MIT",
  dependencies: {
    express: "^4.18.2",
    mongoose: "^7.0.0",
    cors: "^2.8.5",
    dotenv: "^16.0.3",
  },
  devDependencies: {
    nodemon: "^3.0.0",
  },
};

console.log("📄 ESTRUCTURA DE UN package.json TÍPICO:");
console.log("──────────────────────────────────────────");
console.log(JSON.stringify(packageJsonEjemplo, null, 2));

// ────────────────────────────────────────────────────────
//  Explicamos cada campo del package.json
// ────────────────────────────────────────────────────────
console.log("\n\n📖 ¿QUÉ SIGNIFICA CADA CAMPO?:");
console.log("──────────────────────────────");

const explicaciones = [
  {
    campo: "name",
    descripcion: "Nombre único de tu proyecto (sin mayúsculas ni espacios)",
  },
  {
    campo: "version",
    descripcion:
      "Versión del proyecto. Usa Semantic Versioning: MAJOR.MINOR.PATCH",
  },
  {
    campo: "description",
    descripcion: "Descripción breve de para qué sirve el proyecto",
  },
  {
    campo: "main",
    descripcion: "Archivo principal que se ejecuta (punto de entrada)",
  },
  {
    campo: "scripts",
    descripcion: "Comandos que puedes ejecutar con 'npm run <nombre>'",
  },
  {
    campo: "dependencies",
    descripcion: "Paquetes necesarios para que la app funcione en producción",
  },
  {
    campo: "devDependencies",
    descripcion:
      "Paquetes solo para desarrollo (no se usan en producción/servidor real)",
  },
  {
    campo: "license",
    descripcion:
      "Tipo de licencia del proyecto (MIT = libre uso, modificación y distribución)",
  },
];

explicaciones.forEach(({ campo, descripcion }) => {
  console.log(`  🔹 "${campo}": ${descripcion}`);
});

// ────────────────────────────────────────────────────────
//  Explicación del Versionado Semántico (semver)
// ────────────────────────────────────────────────────────
console.log("\n\n🔢 VERSIONADO SEMÁNTICO (semver) — Muy usado en npm:");
console.log("──────────────────────────────────────────────────────");
console.log('  Una versión como "4.18.2" significa:');
console.log("  ┌──────┬─────────┬────────┐");
console.log("  │  4   │   18    │   2    │");
console.log("  │MAJOR │  MINOR  │ PATCH  │");
console.log("  └──────┴─────────┴────────┘");
console.log(
  "  MAJOR → Cambios que ROMPEN compatibilidad con versiones anteriores"
);
console.log(
  "  MINOR → Nuevas funcionalidades, SIN romper compatibilidad anterior"
);
console.log("  PATCH → Corrección de bugs pequeños\n");

console.log("  Los símbolos en las versiones del package.json:");
console.log(
  '  "^4.18.2"  → Acepta actualizaciones MINOR y PATCH (4.x.x pero no 5.x.x)'
);
console.log(
  '  "~4.18.2"  → Solo acepta actualizaciones PATCH (4.18.x pero no 4.19.x)'
);
console.log(
  '  "4.18.2"   → Versión EXACTA, no acepta actualizaciones automáticas'
);

// ────────────────────────────────────────────────────────
//  Comandos más usados con ejemplos visuales
// ────────────────────────────────────────────────────────
console.log("\n\n🛠️  FLUJO DE TRABAJO TÍPICO CON npm:");
console.log("─────────────────────────────────────");

const flujo = [
  {
    paso: 1,
    comando: "npm init -y",
    descripcion: "Crear package.json en un nuevo proyecto",
  },
  {
    paso: 2,
    comando: "npm install express",
    descripcion: "Instalar Express (framework web para Node.js)",
  },
  {
    paso: 3,
    comando: "npm install nodemon --save-dev",
    descripcion: "Instalar Nodemon solo para desarrollo",
  },
  {
    paso: 4,
    comando: "npm run dev",
    descripcion: "Ejecutar el script 'dev' definido en package.json",
  },
  {
    paso: 5,
    comando: "npm install",
    descripcion:
      "Al clonar un proyecto, instalar todas las dependencias de una vez",
  },
];

flujo.forEach(({ paso, comando, descripcion }) => {
  console.log(`\n  Paso ${paso}:`);
  console.log(`    $ ${comando}`);
  console.log(`    → ${descripcion}`);
});

// ────────────────────────────────────────────────────────
//  Paquetes más populares del ecosistema npm
// ────────────────────────────────────────────────────────
console.log("\n\n🌟 PAQUETES MÁS POPULARES EN npm:");
console.log("───────────────────────────────────");

const paquetesPopulares = [
  {
    nombre: "express",
    uso: "Framework web — crear servidores y APIs",
    instalar: "npm install express",
  },
  {
    nombre: "mongoose",
    uso: "Conectar y trabajar con MongoDB",
    instalar: "npm install mongoose",
  },
  {
    nombre: "dotenv",
    uso: "Cargar variables de entorno desde un archivo .env",
    instalar: "npm install dotenv",
  },
  {
    nombre: "cors",
    uso: "Habilitar CORS (peticiones entre dominios)",
    instalar: "npm install cors",
  },
  {
    nombre: "nodemon",
    uso: "Reiniciar el servidor automáticamente al guardar cambios",
    instalar: "npm install nodemon --save-dev",
  },
  {
    nombre: "bcryptjs",
    uso: "Encriptar contraseñas de forma segura",
    instalar: "npm install bcryptjs",
  },
  {
    nombre: "jsonwebtoken",
    uso: "Crear y verificar tokens JWT para autenticación",
    instalar: "npm install jsonwebtoken",
  },
  {
    nombre: "axios",
    uso: "Hacer peticiones HTTP a otras APIs",
    instalar: "npm install axios",
  },
];

paquetesPopulares.forEach(({ nombre, uso, instalar }) => {
  console.log(`\n  📦 ${nombre}`);
  console.log(`     Uso:      ${uso}`);
  console.log(`     Instalar: ${instalar}`);
});

console.log("\n\n✅ Investigación de npm completada exitosamente.\n");