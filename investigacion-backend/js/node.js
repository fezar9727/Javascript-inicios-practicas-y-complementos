// ============================================================
//  📘 INVESTIGACIÓN #1 — ¿QUÉ ES NODE.JS?
// ============================================================
//
//  ¿QUÉ ES NODE.JS?
//  ─────────────────
//  Node.js es un ENTORNO DE EJECUCIÓN de JavaScript del lado
//  del servidor. Fue creado por Ryan Dahl en 2009.
//
//  Antes de Node.js, JavaScript SOLO podía correr dentro del
//  navegador (Chrome, Firefox, etc.). Si intentabas ejecutar
//  JavaScript en tu computador directamente, sin abrir ningún
//  navegador, simplemente no podía. JavaScript estaba "atrapado"
//  dentro del navegador.
//
//  Ryan Dahl tomó el motor V8 de Google Chrome — que es el
//  programa que lee y ejecuta JavaScript — y lo sacó del
//  navegador. Lo empaquetó con herramientas adicionales para
//  poder interactuar con el sistema operativo, leer archivos,
//  abrir puertos de red, y lo llamó Node.js.
//
//  Desde ese momento puedes abrir la terminal y escribir:
//     node miarchivo.js
//  ...y ejecutar JavaScript sin ningún navegador.
//  Eso es Node.js en una frase:
//  JavaScript que corre FUERA del navegador, directamente
//  en tu sistema operativo.
//
// ─────────────────────────────────────────────────────────────
//
//  EL MOTOR V8 — El corazón de Node.js
//  ─────────────────────────────────────
//  V8 es un programa escrito en C++ que Google creó para Chrome.
//  Lo que hace V8 es tomar tu código JavaScript (que es texto
//  legible por humanos) y convertirlo en instrucciones de máquina
//  que el procesador puede ejecutar directamente.
//
//  V8 es extremadamente rápido. Google lo desarrolló para que
//  Chrome ejecutara JavaScript a velocidades comparables con
//  lenguajes compilados como C++. Node.js aprovecha esa velocidad
//  para crear servidores muy eficientes.
//
// ─────────────────────────────────────────────────────────────
//
//  ASÍNCRONO Y NO BLOQUEANTE — El concepto más importante
//  ───────────────────────────────────────────────────────
//  Imagina que eres un mesero en un restaurante.
//  Hay dos formas de trabajar:
//
//  FORMA BLOQUEANTE (síncrona — lo que NO hace Node.js):
//  Tomas el pedido de la mesa 1, vas a la cocina, te quedas
//  parado esperando que preparen la comida, la traes, y SOLO
//  ENTONCES atiendes la mesa 2. Si la cocina tarda 20 minutos,
//  las mesas 2, 3 y 4 esperan paradas sin atención.
//
//  FORMA NO BLOQUEANTE (asíncrona — lo que SÍ hace Node.js):
//  Tomas el pedido de la mesa 1, lo llevas a la cocina, y
//  MIENTRAS la cocina trabaja, vas a atender la mesa 2, luego
//  la mesa 3, luego la mesa 4. Cuando la cocina avisa que el
//  pedido de la mesa 1 está listo, lo recoges y lo llevas.
//  Atiendes muchas mesas simultáneamente sin quedarte parado.
//
//  Node.js trabaja como el segundo mesero. Cuando tu código
//  le pide que lea un archivo o consulte una base de datos,
//  Node.js envía esa petición al sistema operativo y SIGUE
//  ejecutando código. Cuando el archivo o la base de datos
//  responden, Node.js atiende esa respuesta.
//
//  Esto es lo que permite que un servidor Node.js maneje
//  miles de conexiones simultáneas con muy pocos recursos.
//
// ─────────────────────────────────────────────────────────────
//
//  EL EVENT LOOP — Cómo Node.js logra ser asíncrono
//  con un SOLO hilo de ejecución
//  ──────────────────────────────────────────────────
//  La mayoría de lenguajes (Java, PHP, C#) manejan múltiples
//  peticiones creando múltiples hilos (threads) — básicamente
//  múltiples "meseros". Cada petición tiene su propio mesero.
//  Esto consume mucha memoria porque cada hilo ocupa recursos.
//
//  Node.js usa UN SOLO HILO pero con un mecanismo llamado
//  Event Loop (Bucle de Eventos) que lo hace muy eficiente.
//
//  El Event Loop es un ciclo infinito que Node.js corre
//  internamente. Así funciona paso a paso:
//
//  1. Node.js ejecuta el código síncrono de arriba hacia abajo
//  2. Cuando encuentra una operación asíncrona (leer archivo,
//     consultar BD, setTimeout), la envía a ejecutar en segundo
//     plano y CONTINÚA con el código siguiente
//  3. Cuando esa operación asíncrona termina, coloca su función
//     callback en una COLA DE TAREAS
//  4. El Event Loop revisa constantemente: "¿Terminé el código
//     síncrono? ¿Hay callbacks pendientes en la cola?"
//  5. Cuando el hilo principal queda libre, toma el siguiente
//     callback de la cola y lo ejecuta
//
//  Node.js tiene DOS colas con diferente prioridad:
//  - Microtask Queue (alta prioridad): Promesas (.then)
//  - Task Queue (menor prioridad): setTimeout, setInterval
//
//  Por eso en el EJEMPLO 5 más abajo verás que el código NO se
//  ejecuta en el orden en que está escrito: algunas instrucciones
//  son síncronas (se ejecutan de inmediato) y otras son asíncronas
//  (se programan para después). Cuando ejecutes el archivo,
//  observa el orden en que aparecen los mensajes numerados —
//  ese orden no coincide con el orden visual del código, y ese
//  es exactamente el punto.
//
// ─────────────────────────────────────────────────────────────
//
//  SINGLE-THREADED (Un solo hilo de ejecución)
//  ─────────────────────────────────────────────
//  A diferencia de Java o PHP que crean un hilo por cada
//  petición que llega, Node.js usa UN SOLO HILO principal.
//  Suena como una limitación pero con el Event Loop es una
//  ventaja: no hay overhead de crear y destruir hilos, no
//  hay problemas de condiciones de carrera entre hilos, y
//  consume mucha menos memoria.
//
//  La clave está en que Node.js DELEGA las operaciones lentas
//  al sistema operativo o a hilos internos de libuv (la
//  librería C++ que maneja la asincronía por debajo), y cuando
//  esas operaciones terminan, Node.js las atiende en el hilo
//  principal a través del Event Loop.
//
// ─────────────────────────────────────────────────────────────
//
//  EVENT-DRIVEN (Orientado a Eventos)
//  ────────────────────────────────────
//  Todo en Node.js gira alrededor de eventos. Un evento es
//  simplemente algo que ocurrió: llegó una petición HTTP,
//  se terminó de leer un archivo, se cerró una conexión.
//
//  Cuando ocurre un evento, Node.js llama a la función que
//  registraste para manejar ese evento. Esa función se llama
//  "callback" o "event handler" (manejador de eventos).
//
//  Ejemplo:
//  Cuando haces app.get('/usuarios', función) en Express,
//  le dices a Node.js: "Cuando llegue un evento de tipo
//  'petición GET a /usuarios', ejecuta esta función."
//
// ─────────────────────────────────────────────────────────────
//
//  NPM — Node Package Manager
//  ────────────────────────────
//  Cuando instalas Node.js, automáticamente también se instala
//  npm (Node Package Manager). npm es el gestor de paquetes
//  más grande del mundo, con más de 2 millones de paquetes
//  disponibles que puedes instalar con un comando.
//
//  Un paquete es código que alguien más escribió y publicó
//  para que todos lo puedan usar. Por ejemplo:
//  - express → para crear servidores web
//  - mongoose → para conectarse a MongoDB
//  - bcrypt → para encriptar contraseñas
//  - jsonwebtoken → para crear tokens JWT
//
//  En vez de escribir todo ese código desde cero, instalas
//  el paquete con: npm install nombre-del-paquete
//  Y lo usas con: const express = require('express')
//
// ─────────────────────────────────────────────────────────────
//
//  ¿PARA QUÉ SE USA NODE.JS?
//  ──────────────────────────
//  - APIs REST: la función principal para backends modernos.
//    Tu proyecto actual con Express y MongoDB es exactamente
//    esto — una API REST construida con Node.js.
//
//  - Aplicaciones en tiempo real: chats, notificaciones en
//    vivo, dashboards que se actualizan solos. Node.js es
//    ideal aquí por su naturaleza asíncrona y el protocolo
//    WebSocket.
//
//  - Servidores web: servir páginas HTML, imágenes, archivos.
//
//  - Herramientas CLI: programas que corren en la terminal.
//    Webpack, ESLint, el propio npm son herramientas CLI
//    construidas con Node.js.
//
//  - Microservicios: dividir una aplicación grande en muchos
//    servicios pequeños independientes.
//
//  - Streaming de datos: procesar datos en tiempo real,
//    como logs, métricas, archivos grandes.
//
// ─────────────────────────────────────────────────────────────
//
//  VENTAJAS DE NODE.JS:
//  ─────────────────────
//  ✅ Mismo lenguaje en frontend y backend:
//     Con JavaScript en ambos lados, un desarrollador puede
//     trabajar en toda la aplicación. No necesitas aprender
//     Python o Java para el backend.
//
//  ✅ Muy rápido para operaciones de I/O:
//     I/O significa Input/Output — leer/escribir archivos,
//     consultar bases de datos, hacer peticiones HTTP.
//     Node.js brilla en esto gracias a su naturaleza asíncrona.
//
//  ✅ Gran comunidad y ecosistema (npm):
//     Prácticamente cualquier funcionalidad que necesites
//     ya existe como paquete en npm.
//
//  ✅ Perfecto para aplicaciones en tiempo real:
//     Chats, juegos multijugador, colaboración en vivo.
//
//  ✅ Fácil de aprender si ya sabes JavaScript:
//     No aprendes un lenguaje nuevo, solo un nuevo entorno.
//
// ─────────────────────────────────────────────────────────────
//
//  DESVENTAJAS DE NODE.JS:
//  ─────────────────────────
//  ❌ No es ideal para tareas con uso intensivo de CPU:
//     Si necesitas procesar imágenes, renderizar videos,
//     hacer cálculos matemáticos pesados o machine learning,
//     Node.js no es la mejor opción. Usa un solo hilo y las
//     operaciones pesadas de CPU bloquearían el Event Loop,
//     congelando todos los demás usuarios del servidor.
//     Para eso son mejores Python, Go o Java.
//
//  ❌ El modelo asíncrono puede confundir al principio:
//     El problema original era el "Callback Hell" — callbacks
//     dentro de callbacks dentro de callbacks, creando código
//     muy difícil de leer. Las Promesas y async/await resolvieron
//     esto en gran medida, pero el concepto de asincronía
//     sigue siendo difícil al principio.
//
// ============================================================
//  🧪 EJEMPLOS PRÁCTICOS
// ============================================================
//
//  INSTRUCCIONES PARA EJECUTAR EN VISUAL STUDIO CODE:
//  ────────────────────────────────────────────────────
//  1. Asegúrate de tener Node.js instalado
//     Descárgalo gratis en: https://nodejs.org
//     Elige la versión LTS (Long Term Support) — la más estable
//
//  2. Abre esta carpeta en VS Code
//
//  3. Abre la terminal integrada de VS Code:
//     Atajo: Ctrl + ñ (tecla del acento grave)
//     O menú: Terminal > New Terminal
//
//  4. En la terminal escribe exactamente:
//     node 01_que_es_nodejs.js
//
//  5. Presiona Enter y observa la salida en la terminal
//
//  TIP: Si ves un error que dice "node no se reconoce como
//  comando", Node.js no está instalado o no está en el PATH.
//  Ve a https://nodejs.org, descarga e instala la versión LTS.
//
// ============================================================

"use strict";
// "use strict" activa el MODO ESTRICTO de JavaScript.
//
// En modo normal (sin strict), JavaScript es muy permisivo:
// puedes usar variables sin declararlas, hay comportamientos
// extraños heredados de versiones antiguas del lenguaje, etc.
//
// Con "use strict" JavaScript se vuelve más riguroso:
// - Si usas una variable sin declararla con const/let/var,
//   lanza un error (en modo normal la crearía silenciosamente)
// - Prohíbe sintaxis confusa o peligrosa
// - Convierte errores silenciosos en errores reales que puedes ver
//
// Siempre ponlo al inicio de tus archivos Node.js. Es una
// buena práctica que te ayuda a escribir código más limpio.
//
// Ejemplo de lo que previene:
// Sin strict:  x = 5;  // Crea una variable global sin querer
// Con strict:  x = 5;  // Error: x is not defined


// ─────────────────────────────────────────────────────────────
//  require() — La función para importar módulos en Node.js
// ─────────────────────────────────────────────────────────────
//
//  require() es la función de Node.js para importar código
//  de otros archivos o de módulos instalados con npm.
//
//  Hay tres tipos de módulos que puedes importar con require():
//
//  1. MÓDULOS NATIVOS (built-in):
//     Vienen incluidos con Node.js, no necesitas instalarlos.
//     Los identificas porque son solo el nombre, sin ruta:
//     require('os'), require('path'), require('fs')
//
//  2. MÓDULOS DE NPM (instalados con npm install):
//     Los instalas en tu proyecto y Node.js los busca en
//     la carpeta node_modules:
//     require('express'), require('mongoose'), require('bcrypt')
//
//  3. MÓDULOS PROPIOS (archivos .js que tú creaste):
//     Los identificas porque empiezan con ./ o ../ (ruta relativa):
//     require('./controllers/auth.controller')
//     require('../models/User')
//
//  require() es síncrono — espera a que el módulo cargue
//  completamente antes de continuar. Esto está bien porque
//  las importaciones solo ocurren al iniciar el programa, no
//  mientras está corriendo y atendiendo peticiones.


// ─────────────────────────────────────────────────────────────
//  MÓDULO 'os' — Información del Sistema Operativo
// ─────────────────────────────────────────────────────────────
//
//  'os' viene de "Operating System" (Sistema Operativo).
//  Este módulo nativo te da acceso a información sobre el
//  sistema operativo donde está corriendo Node.js.
//
//  ¿Para qué sirve esto en proyectos reales?
//  En servidores de producción (Linux en la nube), es útil
//  para monitorear el servidor: cuánta memoria queda libre,
//  cuántos procesadores tiene, etc. También para hacer código
//  que funcione en Windows, Mac y Linux sin cambios.
const os = require("os");


// ─────────────────────────────────────────────────────────────
//  MÓDULO 'path' — Manejo de rutas de archivos
// ─────────────────────────────────────────────────────────────
//
//  Este módulo nativo maneja rutas de archivos y carpetas
//  de forma inteligente y compatible con todos los sistemas
//  operativos.
//
//  ¿Por qué no simplemente usar strings para las rutas?
//  Porque las rutas son diferentes según el SO:
//  - Windows:  C:\Users\fezar\proyectos\index.js
//  - Linux/Mac: /home/fezar/proyectos/index.js
//
//  Si escribes rutas a mano con strings y backslashes (\),
//  tu código solo funcionará en Windows. Con el módulo path,
//  el código funciona igual en todos los sistemas.
//
//  ¿Para qué sirve en proyectos reales?
//  En tu backend con Express, cuando necesitas servir
//  archivos estáticos, construir rutas a carpetas de uploads,
//  o cargar archivos de configuración, usas path para
//  construir las rutas correctamente.
const path = require("path");


// ─────────────────────────────────────────────────────────────
//  MÓDULO 'fs' (File System) — Leer y escribir archivos
// ─────────────────────────────────────────────────────────────
//
//  'fs' viene de "File System" (Sistema de Archivos).
//  Este módulo nativo te permite interactuar con los archivos
//  y carpetas del disco duro directamente desde JavaScript.
//
//  Con 'fs' puedes:
//  - Crear archivos nuevos
//  - Leer el contenido de archivos existentes
//  - Modificar archivos existentes
//  - Eliminar archivos
//  - Crear carpetas
//  - Listar el contenido de una carpeta
//  - Mover y renombrar archivos
//
//  fs tiene dos versiones de cada operación:
//  - Versión ASÍNCRONA (la que usaremos): no bloquea el programa
//    Ejemplo: fs.readFile(), fs.writeFile()
//  - Versión SÍNCRONA: bloquea hasta terminar (evitar en servidores)
//    Ejemplo: fs.readFileSync(), fs.writeFileSync()
//
//  ¿Para qué sirve en proyectos reales?
//  Guardar archivos que los usuarios suben (imágenes, PDFs),
//  leer archivos de configuración, escribir logs, generar
//  reportes en formato de archivo, etc.
const fs = require("fs");


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 1: Variables globales de Node.js
// ═══════════════════════════════════════════════════════════
//
//  Node.js inyecta automáticamente ciertas variables en CADA
//  archivo JavaScript que ejecutas. Las más importantes son:
//
//  __filename  → ruta completa del archivo actual
//  __dirname   → carpeta donde está el archivo actual
//  process     → información y control del proceso de Node.js
//
//  Estas variables NO las declaras tú. Node.js las pone
//  disponibles automáticamente, como si fueran "regalos"
//  que tienes en cada archivo sin pedirlos.
//
//  ¿Por qué son útiles?
//  Imagina que tu proyecto está en C:\proyectos\miapp\
//  y necesitas cargar un archivo que está en
//  C:\proyectos\miapp\assets\logo.png
//
//  Si escribes la ruta completa a mano, cuando alguien más
//  clone tu proyecto en otra computadora, la ruta no existirá.
//  Con __dirname construyes rutas relativas a tu proyecto:
//  path.join(__dirname, 'assets', 'logo.png')
//  Esto funciona en CUALQUIER computadora porque es relativo
//  a donde está el archivo, no a una ruta absoluta hardcodeada.

console.log("\n========================================");
console.log("  🟢 BIENVENIDO AL MUNDO DE NODE.JS");
console.log("========================================\n");
// El \n dentro del string es un carácter de escape.
// Cuando Node.js ve \n no imprime la letra n, imprime un
// salto de línea (como presionar Enter). Esto crea espacios
// en blanco en la terminal para que la salida sea más legible.

console.log("📂 VARIABLES GLOBALES DE NODE.JS:");
console.log("──────────────────────────────────");

console.log("  __filename:", __filename);
// __filename contiene la ruta COMPLETA y ABSOLUTA del archivo
// que Node.js está ejecutando en este momento.
// Ejemplo de resultado:
// C:\Users\fezar\OneDrive\Escritorio\investigaciones\01_que_es_nodejs.js
//
// "Absoluta" significa que empieza desde la raíz del sistema
// de archivos, no desde alguna carpeta relativa.
// Úsala cuando necesitas saber exactamente dónde está el archivo.

console.log("  __dirname: ", __dirname);
// __dirname contiene solo la CARPETA donde está el archivo,
// sin incluir el nombre del archivo en sí.
// Ejemplo de resultado:
// C:\Users\fezar\OneDrive\Escritorio\investigaciones
//
// Esta es la variable que más usarás. Cuando necesites
// cargar otro archivo del proyecto, haces:
// path.join(__dirname, 'carpeta', 'otroarchivo.js')
// Y funcionará en cualquier computadora.

console.log("  Versión de Node.js:   ", process.version);
// process es el objeto global más importante de Node.js.
// Representa el proceso de Node.js que está corriendo ahora.
//
// process.version devuelve la versión de Node.js instalada.
// Ejemplo: 'v20.11.0'
// Útil para verificar que el servidor tiene la versión
// correcta de Node.js antes de ejecutar el código.

console.log("  Sistema Operativo:     ", process.platform);
// process.platform devuelve en qué sistema operativo está
// corriendo Node.js.
// Valores posibles:
// 'win32'  → Windows (aunque sea 64 bits, dice win32)
// 'linux'  → Linux
// 'darwin' → macOS
//
// ¿Para qué sirve saber esto?
// Puedes escribir código que se comporta diferente según
// el sistema operativo. Por ejemplo, limpiar la terminal
// con 'cls' en Windows o 'clear' en Linux/Mac.

console.log("  ID del proceso (PID):  ", process.pid);
// PID = Process ID (Identificador del Proceso)
// El sistema operativo le asigna un número único a cada
// programa que está corriendo en tu computadora.
// Si abres el Administrador de Tareas de Windows (Ctrl+Alt+Del)
// y ves la columna PID, ese es el mismo número.
//
// ¿Para qué sirve?
// En servidores, cuando un proceso se cuelga, puedes matarlo
// por su PID con el comando: kill [PID] (Linux/Mac)
// También se usa para logging — registrar en los logs qué
// proceso generó cada mensaje.
//
// NOTA IMPORTANTE sobre process:
// process también tiene process.env que es el objeto donde
// viven las variables de entorno. En tu proyecto de backend
// cuando haces process.env.PORT o process.env.JWT_SECRET,
// estás accediendo al objeto process. Por eso el archivo .env
// se llama "variables de ENTORNO" — porque viven en el entorno
// del proceso.


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 2: Módulo 'os' — Información del sistema
// ═══════════════════════════════════════════════════════════
//
//  Aquí usamos los métodos del módulo 'os' para obtener
//  información del hardware y sistema operativo.
//  En un servidor de producción esto es muy útil para
//  monitoreo: saber si la memoria se está agotando, cuántos
//  núcleos tiene el servidor para configurar clustering, etc.

console.log("\n💻 INFORMACIÓN DEL SISTEMA OPERATIVO (módulo 'os'):");
console.log("─────────────────────────────────────────────────");

console.log("  Sistema Operativo: ", os.type());
// os.type() devuelve el nombre del kernel del sistema operativo.
// Resultados posibles:
// 'Windows_NT' → Windows (NT es la arquitectura del kernel de Windows)
// 'Linux'      → Linux (Ubuntu, Debian, CentOS, etc.)
// 'Darwin'     → macOS (Darwin es el nombre del kernel de Apple)
//
// Diferencia con process.platform:
// process.platform da 'win32', 'linux', 'darwin'
// os.type() da 'Windows_NT', 'Linux', 'Darwin'
// Son similares pero con nombres diferentes.

console.log("  Arquitectura CPU:  ", os.arch());
// os.arch() devuelve la arquitectura del procesador.
// Resultados posibles:
// 'x64'   → Procesadores Intel/AMD de 64 bits (la mayoría de PCs)
// 'x32'   → Procesadores de 32 bits (muy antigua, raro hoy en día)
// 'arm64' → Procesadores ARM de 64 bits (Apple M1/M2, tablets, Raspberry Pi)
// 'arm'   → Procesadores ARM de 32 bits
//
// ¿Para qué sirve?
// Algunos paquetes de npm tienen código nativo compilado
// (no solo JavaScript puro). Esos paquetes se compilan
// diferente para cada arquitectura. Si instalas un paquete
// en una máquina x64 y luego intentas correrlo en arm64,
// puede fallar. Saber la arquitectura ayuda a diagnosticar
// estos problemas.

console.log("  CPUs disponibles:  ", os.cpus().length);
// os.cpus() devuelve un ARRAY donde cada elemento contiene
// información detallada de un núcleo del procesador:
// modelo, velocidad en MHz, tiempos de uso (user, nice,
// sys, idle, irq).
//
// Con .length obtienes el número total de núcleos.
// Ejemplos: un i5 moderno tiene 8, un i7 tiene 12 o 16.
//
// ¿Para qué sirve en Node.js?
// Node.js usa un solo hilo. Para aprovechar todos los núcleos
// del procesador puedes usar el módulo 'cluster' de Node.js
// que crea múltiples instancias de tu servidor, una por núcleo.
// os.cpus().length te dice cuántas instancias crear.

const memoriaGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
const memoriaLibreGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
// os.totalmem() → memoria RAM total instalada, en BYTES
// os.freemem()  → memoria RAM libre disponible, en BYTES
//
// Los bytes son la unidad más pequeña de almacenamiento digital.
// 1 carácter de texto = 1 byte
// Para convertir a unidades más legibles:
//   bytes ÷ 1024 = kilobytes  (KB)
//   KB    ÷ 1024 = megabytes  (MB)
//   MB    ÷ 1024 = gigabytes  (GB)
//
// Por eso dividimos tres veces entre 1024.
// Si tienes 16GB de RAM, os.totalmem() devuelve algo como:
// 17179869184 bytes → 17179869184 / 1024 / 1024 / 1024 = 16.00 GB
//
// .toFixed(2) redondea a 2 decimales.
// Sin .toFixed: 15.876234523 GB
// Con .toFixed(2): 15.88 GB
// Mucho más legible.

console.log("  Memoria total:     ", memoriaGB, "GB");
console.log("  Memoria libre:     ", memoriaLibreGB, "GB");
console.log("  Carpeta home:      ", os.homedir());
// os.homedir() devuelve la carpeta personal del usuario actual.
// En Windows: C:\Users\fezar
// En Linux: /home/fezar
// En macOS: /Users/fezar
//
// ¿Para qué sirve?
// Para guardar archivos de configuración de la aplicación
// en la carpeta personal del usuario, similar a cómo
// muchos programas guardan sus configuraciones ahí.


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 3: Módulo 'path' — Manejo seguro de rutas
// ═══════════════════════════════════════════════════════════
//
//  El módulo path es indispensable en cualquier proyecto
//  Node.js serio. Te protege de los problemas de compatibilidad
//  entre sistemas operativos y simplifica el trabajo con rutas.

console.log("\n📁 MANEJO DE RUTAS (módulo 'path'):");
console.log("─────────────────────────────────");

const rutaEjemplo = "/usuarios/juan/proyectos/miapp/index.js";
// Esta ruta es solo un ejemplo para demostrar los métodos de path.
// Es un string normal. No tiene que existir realmente en tu computador.
// Nota que usa forward slashes (/) — en Windows las rutas reales
// usan backslashes (\) pero path.basename y los otros métodos
// funcionan con ambos tipos de slash.

console.log("  Archivo:      ", path.basename(rutaEjemplo));
// path.basename() extrae el ÚLTIMO SEGMENTO de la ruta,
// que generalmente es el nombre del archivo.
// Del string '/usuarios/juan/proyectos/miapp/index.js'
// resultado: 'index.js'
//
// También puedes pasarle la extensión como segundo argumento
// para obtener el nombre SIN extensión:
// path.basename('/miapp/index.js', '.js') → 'index'
//
// ¿Para qué sirve?
// Cuando recibes la ruta de un archivo subido por un usuario
// y necesitas extraer solo el nombre del archivo para
// mostrárselo o guardarlo en la base de datos.

console.log("  Directorio:   ", path.dirname(rutaEjemplo));
// path.dirname() devuelve TODO menos el último segmento —
// es decir, la carpeta que CONTIENE el archivo.
// Del string '/usuarios/juan/proyectos/miapp/index.js'
// resultado: '/usuarios/juan/proyectos/miapp'
//
// ¿Para qué sirve?
// Cuando tienes la ruta completa de un archivo y necesitas
// saber en qué carpeta está para hacer operaciones en esa carpeta.

console.log("  Extensión:    ", path.extname(rutaEjemplo));
// path.extname() devuelve solo la EXTENSIÓN del archivo,
// incluyendo el punto.
// Del string '/usuarios/juan/proyectos/miapp/index.js'
// resultado: '.js'
//
// Más ejemplos:
// path.extname('imagen.png')     → '.png'
// path.extname('archivo.pdf')    → '.pdf'
// path.extname('sin-extension')  → ''  (string vacío)
//
// ¿Para qué sirve?
// Cuando un usuario sube un archivo y necesitas verificar
// que sea del tipo correcto (solo .jpg, .png, .pdf, etc.).

const rutaUnida = path.join(__dirname, "subcarpeta", "archivo.txt");
console.log("  Ruta unida:   ", rutaUnida);
// path.join() toma múltiples PARTES de una ruta y las une
// correctamente según el sistema operativo donde estás.
//
// En Windows usará backslash (\):
// C:\Users\fezar\investigaciones\subcarpeta\archivo.txt
//
// En Linux/Mac usará forward slash (/):
// /home/fezar/investigaciones/subcarpeta/archivo.txt
//
// Si intentaras hacer esto con concatenación de strings:
// __dirname + '\subcarpeta\archivo.txt'  // Solo funciona en Windows
// __dirname + '/subcarpeta/archivo.txt'  // Solo funciona en Linux/Mac
//
// path.join() lo hace bien en todos los sistemas con el mismo código.
//
// ¿Para qué sirve en proyectos reales?
// Construir rutas a archivos estáticos, carpetas de uploads,
// archivos de configuración, plantillas de email, etc.
// En tu backend Express lo usarías para:
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 4: Módulo 'fs' — Escritura y lectura de archivos
// ═══════════════════════════════════════════════════════════
//
//  Aquí vemos uno de los patrones más fundamentales de Node.js:
//  las operaciones de I/O asíncronas con callbacks.
//
//  IMPORTANTE: Este ejemplo crea un archivo real en tu computador.
//  Cuando ejecutes node 01_que_es_nodejs.js, verás aparecer
//  el archivo 'saludo_nodejs.txt' en la misma carpeta.

console.log("\n📝 SISTEMA DE ARCHIVOS (módulo 'fs'):");
console.log("──────────────────────────────────────");

const nombreArchivo = "saludo_nodejs.txt";
// El nombre del archivo que vamos a crear.
// Como no tiene ruta (no empieza con ./ o C:\), Node.js
// lo crea en la carpeta DESDE DONDE ejecutas el comando
// 'node 01_que_es_nodejs.js', que normalmente es la carpeta
// donde está el archivo .js.

const contenido = `¡Hola desde Node.js!
Fecha de creación: ${new Date().toLocaleString("es-CO")} 
Este archivo fue creado automáticamente por Node.js.
Node.js versión: ${process.version}
`;
// Este es un TEMPLATE LITERAL — un tipo especial de string
// que se define con comillas invertidas (backticks: ` ).
//
// Los template literals tienen dos ventajas sobre los strings normales:
//
// 1. MULTILÍNEA: Puedes escribir el texto en múltiples líneas
//    y los saltos de línea se preservan. Con strings normales
//    tendrías que poner \n manualmente.
// 
// 2. INTERPOLACIÓN: Puedes insertar cualquier expresión JavaScript
//    directamente en el string usando ${ }.
//    La expresión se evalúa y su resultado se convierte a string.
//
//    ${new Date()} → crea un objeto Date con la fecha y hora actual
//    .toLocaleString("es-CO") → convierte a string legible en
//    formato colombiano: "31/5/2026, 10:30:00 a. m." 
//
//    ${process.version} → inserta la versión de Node.js
//
//  El resultado final de 'contenido' sería algo así:
//  "¡Hola desde Node.js!
//  Fecha de creación: 31/5/2026, 10:30:00 a. m.
//  Este archivo fue creado automáticamente por Node.js.
//  Node.js versión: v20.11.0"

fs.writeFile(nombreArchivo, contenido, "utf8", (error) => {
  // fs.writeFile() escribe un archivo en el disco.
  // Recibe CUATRO argumentos:
  //
  // 1er argumento — 'nombreArchivo':
  //    La ruta del archivo a crear. Si el archivo ya existe,
  //    lo SOBREESCRIBE completamente (no agrega al final).
  //    Si quisieras agregar al final sin borrar lo anterior,
  //    usarías fs.appendFile().
  //
  // 2do argumento — 'contenido':
  //    El texto a escribir en el archivo.
  //
  // 3er argumento — 'utf8':
  //    La CODIFICACIÓN del texto. utf8 es el estándar universal
  //    que soporta caracteres especiales como tildes (á é í ó ú),
  //    ñ, emojis, caracteres chinos, etc.
  //    Si omites la codificación y tu texto tiene tildes,
  //    el archivo podría tener caracteres corruptos (como Ã© en
  //    lugar de é).
  //
  // 4to argumento — la función callback (error) => { }:
  //    Esta función NO se ejecuta de inmediato.
  //    Node.js envía la operación de escritura al sistema
  //    operativo y CONTINÚA ejecutando el código siguiente
  //    (el Ejemplo 5 se ejecuta antes de que esto termine).
  //    Cuando el sistema operativo termina de escribir el
  //    archivo, llama a esta función callback.
  //    Si algo salió mal, el callback recibe el error.
  //    Si todo salió bien, error es null.
  //
  //  ESTO ES LA ASINCRONÍA EN ACCIÓN.
  //  Por eso cuando ejecutes el archivo verás los mensajes del
  //  Ejemplo 5 ANTES que el mensaje de "archivo creado exitosamente",
  //  aunque en el código el Ejemplo 4 aparezca antes del Ejemplo 5.
  //  El Ejemplo 5 es síncrono → se ejecuta de inmediato.
  //  Este callback es asíncrono → espera a que el disco responda.

  if (error) {
    // El patrón de manejo de errores con callbacks en Node.js
    // es siempre el mismo: el PRIMER argumento es el error.
    // Si error es null, significa que todo fue bien.
    // Si error tiene un valor, algo salió mal.
    //
    // Siempre verificas el error PRIMERO, antes de usar los datos.
    // Si hay error, terminas la función con return para no
    // ejecutar el código siguiente que asumiría que todo fue bien.
    console.error("  ❌ Error al escribir archivo:", error.message);
    // console.error() funciona igual que console.log() pero
    // imprime el mensaje en rojo en la terminal y lo registra
    // en el stream de errores (stderr) en lugar del stream
    // normal (stdout). Útil para distinguir logs de errores.
    return;
    // El return aquí no devuelve ningún valor, solo DETIENE
    // la ejecución de la función. Sin este return, el código
    // siguiente (que asume que el archivo se escribió bien)
    // se ejecutaría aunque hubiera habido un error.
  }

  console.log(`  ✅ Archivo '${nombreArchivo}' creado exitosamente.`);
  // Nota: También usamos template literal aquí con ${nombreArchivo}
  // para incluir el nombre del archivo en el mensaje.

  fs.readFile(nombreArchivo, "utf8", (errorLectura, datos) => {
    // fs.readFile() lee el contenido de un archivo.
    // Recibe TRES argumentos:
    //
    // 1er argumento — nombreArchivo:
    //    La ruta del archivo a leer.
    //
    // 2do argumento — 'utf8':
    //    La codificación. Importante: si omites la codificación,
    //    fs.readFile devuelve un Buffer (datos binarios crudos)
    //    en lugar de un string legible.
    //
    // 3er argumento — el callback (errorLectura, datos):
    //    En este callback hay DOS parámetros:
    //    - errorLectura: el error (si hubo), o null si todo fue bien
    //    - datos: el contenido del archivo como string
    //
    //    El patrón "error primero, datos segundo" es una convención
    //    de Node.js llamada "error-first callbacks". SIEMPRE el
    //    primer argumento del callback es el error.
    //
    //  Este readFile también es asíncrono. Está ANIDADO dentro del
    //  callback del writeFile, lo que significa que solo empieza
    //  a leer DESPUÉS de que termine de escribir. Esto es correcto
    //  porque necesitas que el archivo exista antes de leerlo.
    //
    //  Cuando anidas muchos callbacks así, obtienes lo que se llama
    //  "Callback Hell" — código muy difícil de leer con muchos
    //  niveles de indentación. Las Promesas y async/await (que usas
    //  en tu backend) resolvieron este problema con una sintaxis más limpia.

    if (errorLectura) {
      console.error("  ❌ Error al leer archivo:", errorLectura.message);
      return;
    }

    console.log("  📖 Contenido del archivo:");
    console.log("  ─────────────────────────");

    datos.split("\n").forEach((linea) => console.log("    " + linea));
    // Aquí procesamos el contenido del archivo para mostrarlo bonito.
    //
    // datos → es el contenido completo del archivo como un STRING.
    // Por ejemplo: "¡Hola desde Node.js!\nFecha de creación: ..."
    // El \n dentro del string representa los saltos de línea del archivo.
    //
    // .split("\n") → divide el string en un ARRAY usando \n como separador.
    // Cada elemento del array es una línea del archivo.
    // Resultado: ["¡Hola desde Node.js!", "Fecha de creación: ...", ...]
    //
    // .forEach(callback) → itera sobre cada elemento del array.
    // Para cada elemento (que llamamos 'linea'), ejecuta la función.
    // (linea) => console.log("    " + linea) → imprime 4 espacios
    // de sangría seguidos del contenido de la línea.
    //
    // Es solo presentación visual para que se vea indentado en la terminal.
  });
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 5: El Event Loop — La asincronía visible
// ═══════════════════════════════════════════════════════════
//
//  Este es el ejemplo más importante conceptualmente.
//  Muestra cómo Node.js NO ejecuta el código en el orden
//  en que está escrito cuando hay operaciones asíncronas.
//
//  ANTES DE EJECUTAR, PREDICE EL ORDEN:
//  Mira las líneas de abajo. Hay tres mensajes numerados 1️⃣, 2️⃣ y 3️⃣.
//  ¿En qué orden crees que aparecerán en la terminal?
//  La respuesta intuitiva sería 1, 2, 3 porque así están escritos.
//  Pero la respuesta real es diferente. Ejecútalo y compruébalo.
//
//  SPOILER — el orden real de ejecución será:
//  1️⃣  primero  (síncrono, ejecuta inmediatamente)
//  2️⃣  segundo  (síncrono, ejecuta inmediatamente)
//  3️⃣  tercero  (Promise — Microtask Queue, alta prioridad)
//  3️⃣  cuarto   (setTimeout — Task Queue, menor prioridad)
//
//  ¿Por qué 2️⃣ aparece antes de los 3️⃣ si en el código está después?
//  Porque 2️⃣ es código SÍNCRONO y los 3️⃣ son ASÍNCRONOS.
//  Node.js ejecuta todo el código síncrono primero, sin importar
//  el orden en que estén escritos los bloques asíncronos.
//
//  Este comportamiento es lo que te confundirá al principio
//  del backend pero es fundamental para ser un buen
//  desarrollador Node.js.

console.log("\n⏱️  DEMOSTRACIÓN DEL EVENT LOOP (Asincronía):");
console.log("───────────────────────────────────────────");
console.log("  (Observa el orden en que aparecen los mensajes numerados)");

console.log("  1️⃣  Este mensaje aparece PRIMERO (síncrono)");
// SÍNCRONO: Node.js ejecuta esta línea de INMEDIATO.
// No hay espera, no hay callbacks, no hay promesas.
// Código síncrono = código que se ejecuta línea por línea sin interrupciones.
// Node.js no puede hacer nada más mientras ejecuta esta línea,
// pero como solo es un console.log, termina en microsegundos.

setTimeout(() => {
  console.log("  3️⃣  [setTimeout] Este aparece ÚLTIMO (asíncrono - Task Queue)");
}, 0);
// setTimeout() PROGRAMA una función para ejecutarse en el futuro.
// El segundo argumento (0) indica el delay mínimo en milisegundos.
//
// AUNQUE EL DELAY ES 0 MILISEGUNDOS, NO SE EJECUTA DE INMEDIATO.
// Esta es una de las mayores confusiones al aprender Node.js.
//
// ¿Por qué no se ejecuta de inmediato si el delay es 0?
// Porque setTimeout es una operación ASÍNCRONA por naturaleza.
// Cuando Node.js encuentra un setTimeout, lo que hace es:
// 1. Registrar el callback en el sistema de temporizadores
// 2. CONTINUAR ejecutando el código síncrono siguiente
// 3. Cuando termina TODO el código síncrono Y pasa el tiempo
//    del delay (en este caso 0ms), el Event Loop toma el
//    callback de la Task Queue y lo ejecuta.
//
// El delay de 0ms significa "ejecuta esto lo antes posible
// DESPUÉS de que termine el código síncrono y las promesas".
// No significa "ejecuta esto ahora mismo".

Promise.resolve().then(() => {
  console.log("  3️⃣  [Promise]    Este aparece TERCERO (asíncrono - Microtask Queue)");
});
// Promise.resolve() crea una Promesa que ya está RESUELTA.
// No hay ninguna operación asíncrona real aquí — simplemente
// demostramos cómo se comportan las promesas en el Event Loop.
//
// .then(callback) registra una función para ejecutar cuando
// la promesa se resuelva. Como ya está resuelta, el callback
// se ejecuta en cuanto el hilo principal queda libre.
//
// Las promesas tienen MAYOR PRIORIDAD que setTimeout.
// Node.js tiene dos colas diferentes:
//
// MICROTASK QUEUE (alta prioridad):
//   → Callbacks de Promesas (.then, .catch, .finally)
//   → Node.js vacía TODA esta cola antes de procesar la Task Queue
//
// TASK QUEUE / MACROTASK QUEUE (menor prioridad):
//   → Callbacks de setTimeout y setInterval
//   → Se procesan de uno en uno, entre vuelta y vuelta del Event Loop
//
// Por eso el callback de la Promesa se ejecuta ANTES que el
// callback del setTimeout, aunque ambos estén "listos" al mismo tiempo.
//
// Este orden explica por qué cuando en tu backend haces:
//   const tasks = await Task.find()
// El código después del await espera correctamente a que
// MongoDB responda antes de continuar — el await internamente
// usa Promesas y el Microtask Queue del Event Loop.

console.log("  2️⃣  Este mensaje aparece SEGUNDO (síncrono)");
// SÍNCRONO: aunque en el código está DESPUÉS del setTimeout
// y la Promesa, se ejecuta DE INMEDIATO porque es código síncrono.
// Node.js procesa todo el código síncrono primero, sin importar
// si en medio hay bloques asíncronos escritos antes.
//
// RESUMEN DEL ORDEN DE EJECUCIÓN:
// ┌─────────────────────────────────────────────────────────┐
// │ 1. console.log 1️⃣    → síncrono → ejecuta ahora        │
// │ 2. setTimeout(fn, 0) → asíncrono → registra en Timer   │
// │ 3. Promise.resolve() → asíncrono → registra en MicroQ  │
// │ 4. console.log 2️⃣    → síncrono → ejecuta ahora        │
// │    ↓ Todo el código síncrono terminó. Event Loop activa │
// │ 5. Callback Promise  → Microtask Queue (alta prioridad) │
// │ 6. Callback setTimeout → Task Queue (menor prioridad)   │
// └─────────────────────────────────────────────────────────┘


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 6: Sistema de módulos de Node.js
// ═══════════════════════════════════════════════════════════
//
//  El sistema de módulos es lo que permite organizar el código
//  en múltiples archivos. Sin módulos, tendrías todo tu
//  proyecto en un solo archivo enorme e imposible de mantener.
//
//  En Node.js, cada archivo .js ES un módulo.
//  Por defecto, nada de lo que defines en un archivo es
//  visible desde otros archivos. Tienes que EXPORTARLO
//  explícitamente con module.exports si quieres usarlo en
//  otro lugar.
//
//  Ejemplo de cómo funciona en un proyecto real:
//
//  En el archivo User.js (tu modelo):
//    const mongoose = require('mongoose');
//    const userSchema = new mongoose.Schema({...});
//    module.exports = mongoose.model('User', userSchema);
//     ↑ Exportas el modelo para usarlo en otros archivos
//
//  En el archivo auth.controller.js (tu controlador):
//    const User = require('../models/User');
//     ↑ Importas el modelo que exportaste en User.js
//     Ahora puedes usar User.find(), User.save(), etc.
//
//  module.exports es UN SOLO OBJETO por archivo.
//  Puedes exportar lo que quieras: una función, un objeto,
//  una clase, un array, un valor primitivo.
//  La convención es:
//  - Para exportar UNA sola cosa:  module.exports = laFuncion
//  - Para exportar VARIAS cosas:   module.exports = { funcion1, funcion2 }

console.log("\n📦 SISTEMA DE MÓDULOS DE NODE.JS:");
console.log("──────────────────────────────────");
console.log("  En Node.js cada archivo .js es un módulo.");
console.log("  Para compartir código entre archivos:");
console.log("  - Usa module.exports para EXPORTAR desde un archivo");
console.log("  - Usa require() para IMPORTAR en otro archivo");
console.log("");
console.log("  Ejemplo en un proyecto real:");
console.log("    // En calculadora.js:");
console.log("    module.exports = { sumar: (a, b) => a + b };");
console.log("    // En index.js:");
console.log('    const calc = require("./calculadora");');
console.log("    console.log(calc.sumar(3, 4)); // → 7");

const calculadora = {
  // En un proyecto real esto estaría en un archivo separado
  // llamado calculadora.js y lo importarías con require().
  // Aquí lo definimos inline solo para demostrar el concepto
  // sin necesitar crear múltiples archivos.

  sumar: (a, b) => a + b,
  // Arrow function: (a, b) => a + b
  // Es equivalente a: function(a, b) { return a + b; }
  // Las arrow functions son más concisas para funciones simples.
  // Cuando solo hay una expresión, el return es implícito.

  restar: (a, b) => a - b,

  multiplicar: (a, b) => a * b,
  // El asterisco * es el operador de multiplicación en JS.

  dividir: (a, b) => {
    // Esta función es más compleja porque necesita validar
    // que no se divida entre cero. Por eso usa llaves {}
    // y un return explícito.

    if (b === 0) throw new Error("No se puede dividir entre cero");
    // throw lanza un ERROR manualmente. Cuando Node.js encuentra
    // un throw, detiene la ejecución de la función actual y
    // busca el bloque try-catch más cercano para manejar el error.
    //
    // new Error("mensaje") crea un objeto Error con el mensaje
    // descriptivo del problema.
    //
    // Si este código estuviera dentro de un try-catch:
    //   try {
    //     calculadora.dividir(5, 0);
    //   } catch (error) {
    //     console.log(error.message); // "No se puede dividir entre cero"
    //   }
    //
    // Si NO estuviera en un try-catch, Node.js detendría el
    // programa completamente con un mensaje de error en la terminal.
    //
    // === vs ==:
    // === es "igualdad estricta" — verifica que el valor Y el tipo sean iguales
    // == es "igualdad débil" — hace conversiones de tipo raras antes de comparar
    // SIEMPRE usa === en JavaScript para evitar bugs extraños.

    return a / b;
    // Solo llegamos aquí si b no es 0.
  },
};

console.log("\n🧮 Usando una calculadora como módulo:");
console.log("  sumar(10, 5)       =", calculadora.sumar(10, 5));
console.log("  restar(10, 5)      =", calculadora.restar(10, 5));
console.log("  multiplicar(10, 5) =", calculadora.multiplicar(10, 5));
console.log("  dividir(10, 5)     =", calculadora.dividir(10, 5));

console.log("\n✅ Investigación de Node.js completada exitosamente.\n");


// ═══════════════════════════════════════════════════════════
//  CONEXIÓN CON TU PROYECTO DE BACKEND
// ═══════════════════════════════════════════════════════════
//
//  Todo lo que ves en esta investigación es la FUNDACIÓN de
//  lo que usas en tu proyecto con Express y MongoDB.
//
//  require() → Lo usas en CADA archivo de tu backend:
//    const express = require('express')
//    const mongoose = require('mongoose')
//    const Task = require('../models/Task')
//
//  process.env → Lo usas para las variables de entorno:
//    const PORT = process.env.PORT
//    const JWT_SECRET = process.env.JWT_SECRET
//    Son las variables que guardas en el archivo .env
//
//  Callbacks y asincronía → Evolucionaron a async/await:
//    Los callbacks que ves en fs.writeFile son la versión
//    antigua. Las Promesas los mejoraron. Y async/await
//    es la versión moderna más limpia que usas en:
//    const tasks = await Task.find()
//    await newTask.save()
//
//  module.exports → Lo usas para exportar en cada archivo:
//    module.exports = mongoose.model('Task', taskSchema)
//    module.exports = { createTask, getTasks }
//    module.exports = router
//
//  Event Loop → Explica por qué puedes usar await:
//    Cuando haces await Task.find(), Node.js no bloquea
//    el servidor. Mientras espera la respuesta de MongoDB,
//    puede atender otras peticiones de otros usuarios.
//    El Event Loop es lo que hace esto posible.
//
//  Entender esta investigación a fondo te da las bases
//  para entender TODO lo que hace tu backend por dentro.