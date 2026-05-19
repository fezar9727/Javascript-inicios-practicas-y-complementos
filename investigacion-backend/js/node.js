// ============================================================
//  📘 INVESTIGACIÓN #1 — ¿QUÉ ES NODE.JS?
// ============================================================
//
//  Node.js es un ENTORNO DE EJECUCIÓN de JavaScript del lado
//  del servidor. Fue creado por Ryan Dahl en 2009.
//
//  Normalmente, JavaScript solo corría dentro del navegador
//  (Chrome, Firefox, etc.). Node.js rompió esa barrera: permite
//  ejecutar JavaScript FUERA del navegador, directamente en tu
//  computador o servidor.
//
//  ¿CÓMO FUNCIONA?
//  ───────────────
//  Node.js está construido sobre el motor V8 de Google Chrome,
//  el mismo motor que ejecuta JS en el navegador. Lo que hace
//  Node.js es "sacar" ese motor y ponerlo disponible en la
//  terminal/consola de tu sistema operativo.
//
//  CARACTERÍSTICAS CLAVE:
//  ──────────────────────
//  1. ASÍNCRONO Y NO BLOQUEANTE:
//     Node.js usa un modelo de E/S (entrada/salida) no bloqueante.
//     Esto significa que mientras espera leer un archivo o consultar
//     una base de datos, puede seguir atendiendo otras peticiones.
//     Esto lo hace MUY rápido y eficiente.
//
//  2. SINGLE-THREADED (un solo hilo):
//     A diferencia de lenguajes como Java o PHP que crean un hilo
//     por cada petición, Node.js usa un solo hilo con un "Event Loop"
//     (bucle de eventos) para manejar múltiples conexiones.
//
//  3. EVENT-DRIVEN (orientado a eventos):
//     Todo en Node.js gira alrededor de eventos. Cuando algo ocurre
//     (llega una petición, se lee un archivo), se dispara un evento
//     y una función "callback" lo maneja.
//
//  4. NPM (Node Package Manager):
//     Node.js viene con npm, el gestor de paquetes más grande del
//     mundo, con más de 2 millones de paquetes/librerías disponibles.
//
//  ¿PARA QUÉ SE USA NODE.JS?
//  ──────────────────────────
//  - APIs REST y servicios web
//  - Aplicaciones en tiempo real (chats, notificaciones)
//  - Servidores web
//  - Herramientas de línea de comandos (CLI)
//  - Microservicios
//  - Streaming de datos
//
//  VENTAJAS:
//  ─────────
//  ✅ Mismo lenguaje (JS) en frontend y backend
//  ✅ Muy rápido para operaciones de I/O
//  ✅ Gran comunidad y ecosistema (npm)
//  ✅ Perfecto para aplicaciones en tiempo real
//  ✅ Fácil de aprender si ya sabes JavaScript
//
//  DESVENTAJAS:
//  ─────────────
//  ❌ No es ideal para tareas con uso intensivo de CPU
//     (procesamiento de imágenes, cálculos matemáticos pesados)
//  ❌ El modelo asíncrono puede ser confuso al principio
//     (Callback Hell, aunque Promises y async/await lo resolvieron)
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — Fundamentos de Node.js
// ============================================================
//
//  INSTRUCCIONES PARA EJECUTAR EN VISUAL STUDIO CODE:
//  1. Asegúrate de tener Node.js instalado (https://nodejs.org)
//  2. Abre esta carpeta en VS Code
//  3. Abre la terminal: Ctrl + ` (o menú Terminal > New Terminal)
//  4. Escribe:  node 01_que_es_nodejs.js
//  5. Presiona Enter y observa la salida
//
// ============================================================

"use strict"; // Buena práctica: activa el modo estricto de JS

// ─────────────────────────────────────────
//  MÓDULO 'os' — Información del Sistema Operativo
//  Node.js incluye módulos nativos (built-in) que no necesitas instalar.
//  Se importan con 'require()'.
// ─────────────────────────────────────────
const os = require("os");

// ─────────────────────────────────────────
//  MÓDULO 'path' — Manejo de rutas de archivos
// ─────────────────────────────────────────
const path = require("path");

// ─────────────────────────────────────────
//  MÓDULO 'fs' (File System) — Leer y escribir archivos
// ─────────────────────────────────────────
const fs = require("fs");

// ────────────────────────────────────────────────────────
//  DEMO 1: Variables globales de Node.js
//  En Node.js existen variables especiales disponibles en todo momento
// ────────────────────────────────────────────────────────
console.log("\n========================================");
console.log("  🟢 BIENVENIDO AL MUNDO DE NODE.JS");
console.log("========================================\n");

console.log("📂 VARIABLES GLOBALES DE NODE.JS:");
console.log("──────────────────────────────────");

// __filename → ruta completa del archivo actual
console.log("  __filename:", __filename);

// __dirname → directorio donde está el archivo actual
console.log("  __dirname: ", __dirname);

// process → información sobre el proceso de Node.js en ejecución
console.log("  Versión de Node.js:   ", process.version);
console.log("  Sistema Operativo:     ", process.platform);
console.log("  ID del proceso (PID):  ", process.pid);

// ────────────────────────────────────────────────────────
//  DEMO 2: Usando el módulo 'os'
// ────────────────────────────────────────────────────────
console.log("\n💻 INFORMACIÓN DEL SISTEMA OPERATIVO (módulo 'os'):");
console.log("─────────────────────────────────────────────────");
console.log("  Sistema Operativo: ", os.type());
console.log("  Arquitectura CPU:  ", os.arch());
console.log("  CPUs disponibles:  ", os.cpus().length);

// Convertimos bytes a GB para que sea legible
const memoriaGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
const memoriaLibreGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
console.log("  Memoria total:     ", memoriaGB, "GB");
console.log("  Memoria libre:     ", memoriaLibreGB, "GB");
console.log("  Carpeta home:      ", os.homedir());

// ────────────────────────────────────────────────────────
//  DEMO 3: Usando el módulo 'path'
// ────────────────────────────────────────────────────────
console.log("\n📁 MANEJO DE RUTAS (módulo 'path'):");
console.log("─────────────────────────────────");

const rutaEjemplo = "/usuarios/juan/proyectos/miapp/index.js";

// path.basename → obtiene el nombre del archivo
console.log("  Archivo:      ", path.basename(rutaEjemplo));

// path.dirname → obtiene el directorio
console.log("  Directorio:   ", path.dirname(rutaEjemplo));

// path.extname → obtiene la extensión
console.log("  Extensión:    ", path.extname(rutaEjemplo));

// path.join → une partes de rutas de forma segura (maneja / correctamente)
const rutaUnida = path.join(__dirname, "subcarpeta", "archivo.txt");
console.log("  Ruta unida:   ", rutaUnida);

// ────────────────────────────────────────────────────────
//  DEMO 4: Escritura y Lectura de Archivos (módulo 'fs')
//  ASÍNCRONO con Callbacks — así funciona Node.js internamente
// ────────────────────────────────────────────────────────
console.log("\n📝 SISTEMA DE ARCHIVOS (módulo 'fs'):");
console.log("──────────────────────────────────────");

const nombreArchivo = "saludo_nodejs.txt";
const contenido = `¡Hola desde Node.js!
Fecha de creación: ${new Date().toLocaleString("es-CO")}
Este archivo fue creado automáticamente por Node.js.
Node.js versión: ${process.version}
`;

// fs.writeFile → escribe un archivo de forma ASÍNCRONA
// El tercer parámetro es un "callback": función que se ejecuta cuando termina
fs.writeFile(nombreArchivo, contenido, "utf8", (error) => {
  // Si ocurre un error, lo mostramos y salimos
  if (error) {
    console.error("  ❌ Error al escribir archivo:", error.message);
    return;
  }

  console.log(`  ✅ Archivo '${nombreArchivo}' creado exitosamente.`);

  // Ahora leemos el archivo que acabamos de crear
  fs.readFile(nombreArchivo, "utf8", (errorLectura, datos) => {
    if (errorLectura) {
      console.error("  ❌ Error al leer archivo:", errorLectura.message);
      return;
    }

    console.log("  📖 Contenido del archivo:");
    console.log("  ─────────────────────────");
    // Agregamos sangría a cada línea para que se vea bonito en consola
    datos.split("\n").forEach((linea) => console.log("    " + linea));
  });
});

// ────────────────────────────────────────────────────────
//  DEMO 5: Event Loop y comportamiento ASÍNCRONO
//  Este ejemplo muestra cómo Node.js NO se bloquea mientras espera
// ────────────────────────────────────────────────────────
console.log("\n⏱️  DEMOSTRACIÓN DEL EVENT LOOP (Asincronía):");
console.log("───────────────────────────────────────────");

console.log("  1️⃣  Este mensaje aparece PRIMERO (síncrono)");

// setTimeout ejecuta el callback DESPUÉS de 0ms, pero es asíncrono
// Esto significa que Node.js lo programa y continúa ejecutando código
setTimeout(() => {
  console.log("  3️⃣  Este mensaje aparece TERCERO (asíncrono, 0ms de delay)");
}, 0);

// Promise.resolve() es una promesa ya resuelta — también es asíncrona
Promise.resolve().then(() => {
  console.log(
    "  3️⃣  Este mensaje también es asíncrono (Microtask Queue / Promise)"
  );
});

console.log("  2️⃣  Este mensaje aparece SEGUNDO (síncrono)");

// ────────────────────────────────────────────────────────
//  DEMO 6: Módulos propios (cómo Node.js organiza el código)
// ────────────────────────────────────────────────────────
console.log("\n📦 SISTEMA DE MÓDULOS DE NODE.JS:");
console.log("──────────────────────────────────");
console.log("  En Node.js puedes exportar funciones con module.exports");
console.log("  e importarlas en otros archivos con require().");
console.log("  Esto permite organizar el código en archivos separados.");
console.log("  Ejemplo:");
console.log("    // En math.js:");
console.log("    module.exports = { sumar: (a, b) => a + b };");
console.log("    // En index.js:");
console.log('    const math = require("./math");');
console.log("    console.log(math.sumar(3, 4)); // → 7");

// ────────────────────────────────────────────────────────
//  DEMOSTRACIÓN DIRECTA de módulos
// ────────────────────────────────────────────────────────
// Definimos un "módulo simulado" dentro del mismo archivo
const calculadora = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
  dividir: (a, b) => {
    if (b === 0) throw new Error("No se puede dividir entre cero");
    return a / b;
  },
};

console.log("\n🧮 Usando una calculadora como módulo:");
console.log("  sumar(10, 5)       =", calculadora.sumar(10, 5));
console.log("  restar(10, 5)      =", calculadora.restar(10, 5));
console.log("  multiplicar(10, 5) =", calculadora.multiplicar(10, 5));
console.log("  dividir(10, 5)     =", calculadora.dividir(10, 5));

console.log("\n✅ Investigación de Node.js completada exitosamente.\n");