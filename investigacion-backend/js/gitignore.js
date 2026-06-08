// ============================================================
//  📘 INVESTIGACIÓN #11 — EL ARCHIVO .gitignore
// ============================================================
//
//  Antes de entender .gitignore, necesitamos entender el
//  problema que resuelve. Y para eso, necesitamos entender
//  brevemente qué es Git y por qué existe.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES GIT? (contexto necesario)
//  ─────────────────────────────────────────────────────────
//
//  Git es un sistema de CONTROL DE VERSIONES.
//  Registra cada cambio que haces en tu código a lo largo
//  del tiempo, como un historial detallado de todo lo que pasó.
//
//  Piénsalo como el historial de versiones de Google Docs,
//  pero para código, infinitamente más poderoso y para proyectos
//  con miles de archivos.
//
//  Con Git puedes:
//  - Ver qué cambió en cada archivo y cuándo
//  - Volver a cualquier versión anterior del código
//  - Trabajar en equipo sin pisarse los cambios
//  - Crear ramas (branches) para desarrollar funciones nuevas
//    sin afectar el código que ya funciona
//  - Ver quién escribió cada línea de código y por qué
//
//  GitHub es una PLATAFORMA WEB que aloja repositorios Git
//  en la nube. Git es la herramienta, GitHub es el servicio.
//  Otras alternativas a GitHub: GitLab, Bitbucket, Azure DevOps.
//
//  COMANDOS BÁSICOS DE GIT (para contexto):
//  git init              → inicia un repositorio Git en la carpeta actual
//  git add .             → marca todos los cambios para el próximo commit
//  git commit -m "msg"   → guarda un snapshot del estado actual con un mensaje
//  git push              → sube los commits al repositorio remoto (GitHub)
//  git pull              → descarga los cambios del repositorio remoto
//  git clone <url>       → descarga un repositorio completo de GitHub
//  git status            → muestra qué archivos cambiaron y cuáles están listos
//  git log               → muestra el historial de commits
//
//  ─────────────────────────────────────────────────────────
//  EL PROBLEMA: GIT RASTREA TODO
//  ─────────────────────────────────────────────────────────
//
//  Por defecto, Git rastrea CADA archivo en la carpeta del proyecto.
//  Si haces git add . y luego git commit, git incluirá:
//  - Tus archivos .js de código → BIEN, eso queremos
//  - Tu .env con contraseñas → MAL, eso es peligroso
//  - La carpeta node_modules → MAL, pesa cientos de MB
//  - Archivos .log de errores → innecesario, son temporales
//  - Archivos .DS_Store de macOS → basura del sistema operativo
//
//  Sin .gitignore, el primer git push de un proyecto Node.js
//  subiría TODO ese contenido problemático.
//
//  Consecuencias concretas de no usar .gitignore:
//
//  Si subes node_modules/:
//  - Tu repositorio puede pesar 200MB, 500MB o más
//  - Cada git push tarda minutos en lugar de segundos
//  - GitHub puede rechazar el push (límite de 100MB por archivo)
//  - El historial de commits se llena de cambios de paquetes
//    que no tienen nada que ver con tu código real
//  - Quien clone el repo descargará todo ese peso innecesario
//    (cuando podría simplemente hacer npm install)
//
//  Si subes el .env:
//  - Tu contraseña de MongoDB es pública en internet
//  - Tu JWT_SECRET está expuesto → cualquiera puede crear tokens
//  - Hay bots que escanean GitHub buscando estas credenciales
//  - En minutos, alguien puede borrar tu base de datos entera
//  - Incluso si haces el repo privado, el riesgo es real
//  - PEOR: aunque borres el .env después, el commit donde
//    lo subiste SIGUE en el historial de Git para siempre
//    (el historial es inmutable por diseño)
//
//  ─────────────────────────────────────────────────────────
//  LA SOLUCIÓN: .gitignore
//  ─────────────────────────────────────────────────────────
//
//  El archivo .gitignore le dice a Git exactamente qué archivos
//  y carpetas debe IGNORAR completamente, como si no existieran.
//
//  Git nunca rastreará los archivos listados en .gitignore:
//  - No aparecen en git status
//  - No se incluyen en git add .
//  - No se suben con git push
//  - No se ven en GitHub
//
//  NOMBRE Y UBICACIÓN:
//  - Se llama exactamente: .gitignore (punto + gitignore)
//  - Sin extensión adicional (no es .gitignore.txt)
//  - El punto al inicio lo hace un archivo "oculto" en Unix
//  - Va en la carpeta RAÍZ del proyecto (junto al package.json)
//  - Puede haber .gitignore en subcarpetas (para reglas locales)
//    pero con uno en la raíz es suficiente para empezar
//
//  ─────────────────────────────────────────────────────────
//  SINTAXIS DEL .gitignore — CÓMO ESCRIBIR REGLAS
//  ─────────────────────────────────────────────────────────
//
//  El .gitignore tiene su propio lenguaje de patrones simple.
//  Cada línea es una regla. Git la evalúa para cada archivo
//  cuando decides qué rastrear.
//
//  REGLAS BÁSICAS:
//  ───────────────
//
//  nombre_exacto        → ignora un archivo con ese nombre exacto
//  carpeta/             → ignora una carpeta completa (la / al final
//                         indica que es directorio, no archivo)
//  *.extension          → ignora todos los archivos con esa extensión
//                         (* = wildcard = "cualquier cosa")
//  /archivo             → ignora solo en la raíz (la / al inicio)
//  !archivo             → EXCEPCIÓN: no ignores este archivo aunque
//                         coincida con otra regla
//  # comentario         → línea de comentario (Git la ignora)
//  línea_en_blanco      → separador visual, no tiene efecto
//
//  EJEMPLOS PRÁCTICOS:
//  ───────────────────
//
//  node_modules/     → ignora la carpeta node_modules dondequiera que esté
//  .env              → ignora el archivo .env exacto en la raíz
//  *.log             → ignora TODOS los archivos que terminen en .log
//                      (error.log, server.log, npm-debug.log, etc.)
//  *.log             → también aplica a subcarpetas: logs/error.log
//  /dist             → ignora la carpeta dist/ SOLO en la raíz
//                      (no ignoraría src/components/dist/)
//  build/            → ignora cualquier carpeta llamada "build"
//  .DS_Store         → ignora ese archivo específico del macOS
//  Thumbs.db         → ignora ese archivo específico de Windows
//  coverage/         → ignora la carpeta de cobertura de tests
//  **/*.test.js      → ** = cualquier nivel de carpetas
//                      ignora todos los .test.js en cualquier subcarpeta
//
//  EXCEPCIÓN CON !:
//  ────────────────
//  *.log             → ignora todos los .log
//  !important.log    → EXCEPCIÓN: important.log sí se rastrea
//
//  Esto es útil cuando tienes una regla general pero quieres
//  incluir un caso específico.
//
//  RUTAS RELATIVAS:
//  ────────────────
//  Las rutas en .gitignore son relativas a la ubicación del
//  propio archivo .gitignore. Si el .gitignore está en la raíz:
//  node_modules/  → raíz/node_modules/  (la carpeta más común)
//  src/temp/      → raíz/src/temp/      (solo esa subcarpeta)
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ DEBE IR EN EL .gitignore DE UN PROYECTO NODE.JS?
//  ─────────────────────────────────────────────────────────
//
//  OBLIGATORIO (sin esto el proyecto está mal configurado):
//
//  node_modules/
//  Por qué: contiene miles de archivos de paquetes npm.
//  Un proyecto Express con 5 dependencias puede tener 200MB en node_modules.
//  Se regenera completamente con un solo comando: npm install
//  (npm lee el package.json y descarga todo).
//  NUNCA tiene sentido subir node_modules. Es como subir el compilador
//  de C++ junto con tu código fuente.
//
//  .env
//  Por qué: contiene credenciales reales (contraseñas de BD, claves JWT,
//  claves de APIs externas como Stripe, SendGrid, etc.)
//  Si se expone → seguridad comprometida → datos de usuarios en riesgo.
//  Si trabajas en empresa → puede costarte el empleo.
//
//  MUY RECOMENDADO:
//
//  .env.local, .env.production, .env.staging
//  Por qué: variantes del .env para diferentes entornos.
//  Todas pueden contener credenciales reales.
//  Patrón seguro: ignorar TODOS los .env excepto .env.example
//  con: *.env → ignora todos; luego !.env.example → excepción
//
//  *.log
//  Por qué: los archivos de log registran errores y actividad del servidor.
//  Pueden contener información sensible (stack traces con rutas, etc.).
//  Son generados automáticamente y no tienen valor en el repositorio.
//
//  .DS_Store (macOS)
//  Por qué: archivo oculto que macOS crea en cada carpeta para guardar
//  metadatos del Finder (íconos, posición de ventanas, etc.).
//  No tiene ningún valor para el proyecto. Es "basura" del SO.
//
//  Thumbs.db (Windows)
//  Por qué: igual que .DS_Store pero generado por el Explorador de Windows.
//  Guarda miniaturas de imágenes. Sin valor para el proyecto.
//
//  OPCIONAL PERO COMÚN:
//
//  dist/ y build/
//  Por qué: son carpetas generadas automáticamente por herramientas
//  de build (Webpack, Babel, TypeScript, etc.).
//  Se regeneran con: npm run build
//  Subirlas haría el repositorio más pesado sin beneficio.
//  EXCEPCIÓN: algunos proyectos sí suben el build si es para deploy.
//
//  coverage/
//  Por qué: generado por Jest con los reportes de cobertura de tests.
//  Se regenera con: npm test -- --coverage
//
//  .nyc_output/
//  Por qué: directorio temporal de NYC (herramienta de cobertura de Istanbul).
//
//  .vscode/ (debatible)
//  Por qué: configuración de VS Code (extensiones recomendadas, settings, etc.)
//  Algunos equipos SÍ lo suben para estandarizar la configuración del editor.
//  Otros lo ignoran porque son preferencias personales del desarrollador.
//  Si lo subes, asegúrate de no incluir configuraciones con rutas absolutas
//  de tu computadora específica.
//
//  tmp/ y temp/
//  Por qué: carpetas de archivos temporales creadas durante el desarrollo.
//
//  *.sqlite y *.db
//  Por qué: archivos de bases de datos SQLite.
//  Contienen datos (posiblemente reales) y pueden pesar mucho.
//  En desarrollo con SQLite en memoria o archivo local, ignóralos.
//
//  ─────────────────────────────────────────────────────────
//  ERRORES COMUNES CON .gitignore
//  ─────────────────────────────────────────────────────────
//
//  ERROR 1: Crear el .gitignore DESPUÉS de hacer commits
//  ──────────────────────────────────────────────────────
//  Si ya hiciste git add . y git commit antes de crear el .gitignore,
//  Git ya rastreó esos archivos. Agregar la regla al .gitignore
//  NO los elimina del rastreo.
//
//  Síntoma: "añadí node_modules/ al .gitignore pero git status
//            sigue mostrando cambios en node_modules/"
//
//  Solución: decirle a Git que deje de rastrear esos archivos:
//  git rm -r --cached node_modules    → "olvida" node_modules del índice
//  git rm --cached .env               → "olvida" .env del índice
//  git commit -m "Eliminar archivos que deberían estar en .gitignore"
//  git push
//
//  El -r es para "recursive" (necesario para carpetas).
//  El --cached elimina del índice de Git pero NO borra el archivo
//  de tu computadora (solo deja de rastrearlo).
//
//  ERROR 2: El .gitignore no funciona para archivos ya commiteados
//  ───────────────────────────────────────────────────────────────
//  .gitignore solo funciona para archivos que Git TODAVÍA NO rastreó.
//  Si un archivo ya tiene historial en Git, el .gitignore lo ignora.
//  La solución es git rm --cached como se explicó arriba.
//
//  ERROR 3: Subir .env accidentalmente
//  ────────────────────────────────────
//  Si subiste el .env a GitHub:
//  1. CAMBIA INMEDIATAMENTE todas las contraseñas y claves expuestas.
//     (Hay bots que escanean GitHub en tiempo real)
//  2. Agrega .env al .gitignore
//  3. Ejecuta: git rm --cached .env
//  4. Commit: git commit -m "Eliminar .env del rastreo de Git"
//  5. Push: git push
//  6. Considera usar BFG Repo Cleaner para limpiar el historial
//     (git filter-branch o git filter-repo también sirven)
//
//  OJO: El commit con el .env SIGUE en el historial aunque lo borres.
//  Para limpiarlo completamente del historial:
//  bfg --delete-files .env (BFG Repo Cleaner es más fácil)
//  → Pero esto reescribe el historial, lo que puede causar problemas
//    si hay otros colaboradores.
//
//  ERROR 4: Patrones incorrectos
//  ──────────────────────────────
//  INCORRECTO: node_modules  (sin la /)
//  → Ignora un ARCHIVO llamado node_modules
//  → NO ignora la CARPETA node_modules/
//
//  CORRECTO: node_modules/
//  → Ignora la CARPETA node_modules/ con todo su contenido
//
//  INCORRECTO: .env.local (puede no funcionar si .env.* ya está)
//  CORRECTO: verificar el orden y precedencia de las reglas
//
//  ERROR 5: Confundir .gitignore con .npmignore
//  ─────────────────────────────────────────────
//  .gitignore → le dice a GIT qué ignorar (para el repositorio)
//  .npmignore → le dice a NPM qué ignorar al PUBLICAR un paquete
//  Son archivos diferentes para propósitos diferentes.
//
//  ─────────────────────────────────────────────────────────
//  GENERADORES DE .gitignore
//  ─────────────────────────────────────────────────────────
//
//  No tienes que escribir el .gitignore desde cero. Hay herramientas
//  que generan uno adaptado a tu stack tecnológico:
//
//  gitignore.io (web):
//  Visita https://www.toptal.com/developers/gitignore
//  Escribe: node, windows, macos, linux, vscode
//  Te genera un .gitignore completo para esa combinación.
//  Es la herramienta más popular y completa.
//
//  GitHub al crear un repositorio:
//  Cuando creas un nuevo repo en GitHub, puedes seleccionar
//  una plantilla de .gitignore (Node, Python, Java, etc.).
//  GitHub agrega el .gitignore automáticamente al repo.
//
//  VS Code extensiones:
//  La extensión "gitignore" de CodeZombie permite generar
//  el .gitignore desde la paleta de comandos (Ctrl + Shift + P).
//
//  npm init (plantillas):
//  Algunos templates de npm init ya incluyen un .gitignore básico.
//
//  ─────────────────────────────────────────────────────────
//  .gitignore GLOBAL — Para tu computadora completa
//  ─────────────────────────────────────────────────────────
//
//  Además del .gitignore por proyecto, puedes tener un .gitignore
//  GLOBAL que aplica a TODOS los repositorios de tu computadora.
//
//  Útil para ignorar archivos del sistema operativo que siempre
//  son basura: .DS_Store (macOS), Thumbs.db (Windows), etc.
//  Así no tienes que agregarlos a cada proyecto nuevo.
//
//  Cómo configurarlo:
//  1. Crea el archivo:
//     touch ~/.gitignore_global     (Linux/macOS)
//     Equivalente en Windows: C:\Users\TuNombre\.gitignore_global
//
//  2. Agrégale contenido:
//     echo ".DS_Store" >> ~/.gitignore_global
//     echo "Thumbs.db" >> ~/.gitignore_global
//     echo "*.log" >> ~/.gitignore_global
//
//  3. Configura Git para usarlo:
//     git config --global core.excludesfile ~/.gitignore_global
//
//  4. Verifica:
//     git config --global core.excludesfile
//
//  Desde ese momento, nunca más se subirá un .DS_Store de
//  ningún proyecto en tu computadora.
//
//  ─────────────────────────────────────────────────────────
//  VERIFICAR QUÉ IGNORA TU .gitignore
//  ─────────────────────────────────────────────────────────
//
//  Para confirmar que una regla funciona:
//
//  git check-ignore -v nombre_archivo
//  → Muestra si el archivo está ignorado y por qué regla.
//  Ejemplo:
//  $ git check-ignore -v .env
//  .gitignore:2:.env    .env
//  → Significa: la regla en la línea 2 del .gitignore aplica a .env.
//
//  git check-ignore -v node_modules/express/index.js
//  → Verifica que node_modules está siendo ignorado.
//
//  git status --ignored
//  → Muestra todos los archivos ignorados actualmente.
//
//  git ls-files --others --ignored --exclude-standard
//  → Lista todos los archivos ignorados en la carpeta actual.
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — Simulación completa del .gitignore
// ============================================================
//
//  INSTRUCCIONES:
//  1. Abre la terminal (Ctrl + ñ)
//  2. Ejecuta: node gitignore.js
//  3. Lee cada sección con atención — simula situaciones reales
//
// ============================================================

"use strict"; // Modo estricto: errores más claros, código más seguro.

const path = require("path");
// path es un módulo NATIVO de Node.js (no necesita npm install).
// Proporciona herramientas para trabajar con rutas de archivos y carpetas
// de forma compatible entre sistemas operativos.
// path.join() → une segmentos de ruta con el separador correcto (/ en Unix, \ en Windows)
// path.basename() → nombre del archivo de una ruta
// path.extname() → extensión de un archivo (.js, .env, etc.)
// path.dirname() → directorio padre de una ruta

const fs = require("fs");
// fs (File System) es otro módulo nativo de Node.js.
// Permite leer y escribir archivos y carpetas del sistema.
// fs.existsSync() → verifica si un archivo/carpeta existe
// fs.readFileSync() → lee un archivo (bloqueante, no async)
// fs.writeFileSync() → escribe un archivo
// fs.readdirSync() → lista el contenido de una carpeta

// ─────────────────────────────────────────────────────────
//  SECCIÓN 1: Introducción visual
// ─────────────────────────────────────────────────────────

console.log("========================================");
console.log("  📋 GUÍA COMPLETA DEL .gitignore");
console.log("========================================\n");

console.log("  El .gitignore evita que archivos problemáticos lleguen a GitHub.\n");
console.log("  SIN .gitignore, git add . incluiría:");
console.log("  ─────────────────────────────────────");

const archivosProblematicos = [
  {
    nombre:    "node_modules/",
    problema:  "Puede pesar 200MB+. Se regenera con npm install.",
    icono:     "📦",
    gravedad:  "alta",
  },
  {
    nombre:    ".env",
    problema:  "Contiene contraseñas reales. Si se sube, tu BD puede ser borrada.",
    icono:     "🔐",
    gravedad:  "critica",
  },
  {
    nombre:    "*.log",
    problema:  "Archivos de log temporales. Sin valor en el repositorio.",
    icono:     "📝",
    gravedad:  "baja",
  },
  {
    nombre:    ".DS_Store",
    problema:  "Archivo de metadatos de macOS. Basura del sistema operativo.",
    icono:     "🍎",
    gravedad:  "baja",
  },
  {
    nombre:    "Thumbs.db",
    problema:  "Archivo de miniaturas de Windows. Igual de inútil en el repo.",
    icono:     "🪟",
    gravedad:  "baja",
  },
  {
    nombre:    "dist/ y build/",
    problema:  "Código compilado. Se regenera con npm run build.",
    icono:     "⚙️",
    gravedad:  "media",
  },
];

const iconoGravedad = { critica: "⛔", alta: "🔴", media: "🟡", baja: "🟢" };
// Objeto que mapea niveles de gravedad a sus íconos visuales.
// Esto permite mostrar el nivel de riesgo de cada archivo de forma intuitiva.

archivosProblematicos.forEach(({ nombre, problema, icono, gravedad }) => {
  // Destructuring del objeto en los parámetros del callback.
  // Equivale a: (item) => { const { nombre, problema, icono, gravedad } = item; ... }
  // Pero más conciso.

  console.log(`\n  ${icono} ${nombre}  ${iconoGravedad[gravedad]} [${gravedad.toUpperCase()}]`);
  // Concatenamos: icono del tipo + nombre del archivo + icono de gravedad + nivel
  console.log(`     ⚠️  ${problema}`);
});

// ─────────────────────────────────────────────────────────
//  SECCIÓN 2: El archivo .gitignore del proyecto
// ─────────────────────────────────────────────────────────

console.log("\n\n========================================");
console.log("  📄 CONTENIDO DEL .gitignore");
console.log("========================================\n");

console.log("  Copia esto a tu archivo .gitignore (raíz del proyecto):\n");
console.log("  ─────────────────── INICIO ──────────────────────────");

// Definimos el contenido exacto del .gitignore como un array de strings.
// Cada elemento es una sección del archivo con sus comentarios y reglas.
const contenidoGitignore = [
  "",
  "# ─────────────────────────────────────────────────────",
  "# DEPENDENCIAS DE NODE.JS",
  "# ─────────────────────────────────────────────────────",
  "# La carpeta donde npm guarda todos los paquetes instalados.",
  "# Puede contener miles de archivos y pesar 200MB o más.",
  "# Se regenera completamente con: npm install",
  "node_modules/",
  "",
  "# ─────────────────────────────────────────────────────",
  "# VARIABLES DE ENTORNO — CRÍTICO DE SEGURIDAD",
  "# ─────────────────────────────────────────────────────",
  "# Contienen contraseñas, claves API y URIs de bases de datos.",
  "# NUNCA deben subirse al repositorio.",
  ".env",
  ".env.local",
  ".env.development.local",
  ".env.test.local",
  ".env.production.local",
  ".env.staging",
  "",
  "# ─────────────────────────────────────────────────────",
  "# ARCHIVOS DEL SISTEMA OPERATIVO",
  "# ─────────────────────────────────────────────────────",
  "# macOS: archivos de metadatos del Finder",
  ".DS_Store",
  ".AppleDouble",
  ".LSOverride",
  "",
  "# Windows: archivos de miniaturas y configuración",
  "Thumbs.db",
  "Thumbs.db:encryptable",
  "ehthumbs.db",
  "Desktop.ini",
  "",
  "# Linux: archivos de respaldo del editor",
  "*~",
  "",
  "# ─────────────────────────────────────────────────────",
  "# LOGS — ARCHIVOS DE REGISTRO",
  "# ─────────────────────────────────────────────────────",
  "# Archivos generados automáticamente con registros de actividad.",
  "# No tienen valor en el repositorio.",
  "*.log",
  "npm-debug.log*",
  "yarn-debug.log*",
  "yarn-error.log*",
  "pnpm-debug.log*",
  "logs/",
  "",
  "# ─────────────────────────────────────────────────────",
  "# CÓDIGO COMPILADO / GENERADO",
  "# ─────────────────────────────────────────────────────",
  "# Carpetas generadas por herramientas de build.",
  "# Se regeneran con: npm run build",
  "dist/",
  "build/",
  "out/",
  "",
  "# ─────────────────────────────────────────────────────",
  "# COBERTURA DE TESTS",
  "# ─────────────────────────────────────────────────────",
  "# Reportes generados por Jest y otras herramientas de testing.",
  "coverage/",
  ".nyc_output/",
  "",
  "# ─────────────────────────────────────────────────────",
  "# ARCHIVOS TEMPORALES",
  "# ─────────────────────────────────────────────────────",
  "tmp/",
  "temp/",
  "*.tmp",
  "*.temp",
  "",
  "# ─────────────────────────────────────────────────────",
  "# BASE DE DATOS LOCAL (si usas SQLite en desarrollo)",
  "# ─────────────────────────────────────────────────────",
  "*.sqlite",
  "*.sqlite3",
  "*.db",
  "",
  "# ─────────────────────────────────────────────────────",
  "# ARCHIVOS DE EDITOR (opcional — decide en equipo)",
  "# ─────────────────────────────────────────────────────",
  "# Descomenta si NO quieres subir configuración de VS Code:",
  "# .vscode/",
  "# Descomenta si NO quieres subir configuración de JetBrains:",
  "# .idea/",
  "",
];

contenidoGitignore.forEach((linea) => {
  // Mostramos cada línea con un prefijo visual para que se vea
  // como el archivo real (con sangría y formato).
  console.log(`  ${linea}`);
});

console.log("  ─────────────────── FIN ─────────────────────────────");

// ─────────────────────────────────────────────────────────
//  SECCIÓN 3: Verificación del .gitignore actual
// ─────────────────────────────────────────────────────────

console.log("\n\n========================================");
console.log("  🔍 VERIFICACIÓN DEL .gitignore ACTUAL");
console.log("========================================\n");

const rutaGitignore = path.join(process.cwd(), ".gitignore");
// process.cwd() = Current Working Directory = la carpeta desde donde
// ejecutas el comando "node gitignore.js".
// path.join() une las partes de la ruta con el separador correcto.
// En Windows: C:\Users\juan\mi-proyecto\.gitignore
// En Linux/Mac: /home/juan/mi-proyecto/.gitignore

const existeGitignore = fs.existsSync(rutaGitignore);
// fs.existsSync() comprueba sincrónicamente si el archivo existe.
// Devuelve true si existe, false si no.
// La versión "Sync" es bloqueante (espera a terminar antes de continuar).
// Para archivos pequeños en startup, está bien usar la versión síncrona.

if (existeGitignore) {
  console.log(`  ✅ Se encontró .gitignore en: ${rutaGitignore}\n`);

  const contenido = fs.readFileSync(rutaGitignore, "utf-8");
  // fs.readFileSync(ruta, encoding) lee el archivo completo como string.
  // "utf-8" es el encoding para texto normal (español, inglés, etc.).
  // Sin el encoding, devuelve un Buffer (bytes crudos, no texto).
  // readFileSync es síncrono → el código espera hasta que termine la lectura.

  const lineas = contenido.split("\n");
  // .split("\n") divide el string por saltos de línea.
  // Resultado: un array donde cada elemento es una línea del archivo.
  // "\n" = newline = salto de línea en Linux/Mac
  // En Windows puede ser "\r\n" → .split(/\r?\n/) sería más robusto

  const reglas = lineas.filter((linea) => {
    // .filter() devuelve un nuevo array con solo los elementos que
    // cumplen la condición (la función callback devuelve true).
    const trimmed = linea.trim();
    // .trim() elimina espacios y saltos de línea al inicio y final.
    return trimmed !== "" && !trimmed.startsWith("#");
    // !== "" → excluye líneas vacías
    // !.startsWith("#") → excluye líneas de comentario
    // Solo nos quedamos con las REGLAS reales (no comentarios, no vacías).
  });

  console.log(`  📊 Estadísticas del .gitignore:`);
  console.log(`     Total de líneas:     ${lineas.length}`);
  console.log(`     Reglas activas:      ${reglas.length}`);
  console.log(`     Comentarios/vacías:  ${lineas.length - reglas.length}\n`);

  // ─────────────────────────────────────────────────────
  //  Verificamos que las reglas CRÍTICAS estén presentes
  // ─────────────────────────────────────────────────────
  const reglasCriticas = [
    {
      patron:     "node_modules",
      descripcion: "Excluir node_modules/ del repositorio",
      ayuda:      'Agrega la línea: node_modules/',  // osea agregar al .gitignore.
    },
    {
      patron:     ".env",
      descripcion: "Proteger credenciales del archivo .env",
      ayuda:      'Agrega la línea: .env',  // osea agregar al .gitignore.
    },
  ];

  console.log("  🔐 Verificación de reglas críticas:");
  console.log("  ─────────────────────────────────────");

  reglasCriticas.forEach(({ patron, descripcion, ayuda }) => {
    const estaPresente = reglas.some((regla) => regla.includes(patron));
    // Array.some() devuelve true si AL MENOS UN elemento cumple la condición.
    // A diferencia de .every() que requiere que TODOS cumplan.
    // .includes(patron) verifica si la regla contiene el texto del patrón.
    // Esto es más flexible que igualdad exacta (cubre ".env" y ".env.local").

    if (estaPresente) {
      console.log(`  ✅ "${patron}" → ${descripcion}`);
    } else {
      console.log(`  ❌ "${patron}" → FALTA: ${descripcion}`);
      console.log(`     Solución: ${ayuda}`);
    }
  });

  // ─────────────────────────────────────────────────────
  //  Mostramos todas las reglas encontradas
  // ─────────────────────────────────────────────────────
  console.log(`\n  📋 Todas las reglas activas (${reglas.length}):`);
  console.log("  ─────────────────────────────────────");
  reglas.forEach((regla, indice) => {
    // El segundo parámetro del callback en forEach es el ÍNDICE del elemento.
    // Lo usamos para numerar las reglas en la salida.
    console.log(`  ${String(indice + 1).padStart(3, " ")}. ${regla}`);
    // String(indice + 1) → convierte el número a string
    // .padStart(3, " ") → rellena con espacios a la izquierda hasta tener 3 chars
    // "1" → "  1", "10" → " 10", "100" → "100"
    // Esto alinea los números verticalmente para mejor legibilidad.
  });

} else {
  console.log(`  ❌ NO se encontró .gitignore en: ${rutaGitignore}`);
  console.log("\n  ⚠️  RIESGO: Sin .gitignore, git add . subiría:");
  console.log("     - node_modules/ (cientos de MB de paquetes npm)");
  console.log("     - .env (contraseñas expuestas públicamente)");
  console.log("     - Archivos de logs y temporales");
  console.log("\n  📋 SOLUCIÓN INMEDIATA:");
  console.log("     1. Crea el archivo .gitignore en la raíz del proyecto");
  console.log('        (la carpeta donde está el package.json)');
  console.log("     2. Copia el contenido de la SECCIÓN 2 de este archivo");
  console.log("     3. Guarda el .gitignore");
  console.log("     4. Verifica con: git status\n");
}

// ─────────────────────────────────────────────────────────
//  SECCIÓN 4: Verificación de archivos en el proyecto
// ─────────────────────────────────────────────────────────

console.log("\n\n========================================");
console.log("  📁 ARCHIVOS DEL PROYECTO ACTUAL");
console.log("========================================\n");

const rutaProyecto = process.cwd();
// El directorio actual de trabajo → la raíz del proyecto.

let archivosEnRaiz;
try {
  archivosEnRaiz = fs.readdirSync(rutaProyecto);
  // readdirSync() lista el contenido de una carpeta.
  // Devuelve un array con los nombres de archivos y subcarpetas.
  // Solo lista el nivel inmediato (no es recursivo).
} catch (error) {
  archivosEnRaiz = [];
  console.log("  ⚠️  No se pudo leer el directorio actual.");
}

console.log(`  Archivos y carpetas en: ${rutaProyecto}\n`);

// Clasificamos los archivos según su importancia para .gitignore
const clasificacion = {
  criticos:    [],  // Deben estar en .gitignore sí o sí
  importantes: [],  // Deberían estar en .gitignore
  normales:    [],  // Se pueden subir a GitHub
};

const patronesCriticos    = [".env", "node_modules"];
const patronesImportantes = [".DS_Store", "Thumbs.db", "*.log", "dist", "build", "coverage"];

archivosEnRaiz.forEach((nombreArchivo) => {
  const esCritico = patronesCriticos.some(
    (patron) => nombreArchivo === patron || nombreArchivo.startsWith(patron)
    // Verificamos si el nombre del archivo es exactamente el patrón
    // o si empieza con ese patrón (ej: ".env.local" empieza con ".env")
  );

  const esImportante = patronesImportantes.some(
    (patron) => {
      if (patron.startsWith("*")) {
        // El patrón tiene wildcard (*): verificamos la extensión
        const extension = patron.substring(1);
        // substring(1) → elimina el primer carácter (el *)
        // "*.log" → ".log"
        return nombreArchivo.endsWith(extension);
        // endsWith() → true si el nombre termina con esa extensión
      }
      return nombreArchivo === patron || nombreArchivo.startsWith(patron);
    }
  );

  if (esCritico) {
    clasificacion.criticos.push(nombreArchivo);
  } else if (esImportante) {
    clasificacion.importantes.push(nombreArchivo);
  } else {
    clasificacion.normales.push(nombreArchivo);
  }
});

// Mostramos los archivos clasificados
if (clasificacion.criticos.length > 0) {
  console.log("  ⛔ CRÍTICOS (deben estar en .gitignore):");
  clasificacion.criticos.forEach((f) => console.log(`     ❌ ${f}`));
  console.log();
}

if (clasificacion.importantes.length > 0) {
  console.log("  🟡 IMPORTANTES (deberían estar en .gitignore):");
  clasificacion.importantes.forEach((f) => console.log(`     ⚠️  ${f}`));
  console.log();
}

if (clasificacion.normales.length > 0) {
  console.log("  ✅ NORMALES (pueden ir en el repositorio):");
  clasificacion.normales.forEach((f) => console.log(`     ✓  ${f}`));
  console.log();
}

// ─────────────────────────────────────────────────────────
//  SECCIÓN 5: Simulación de git status con y sin .gitignore
// ─────────────────────────────────────────────────────────

console.log("\n========================================");
console.log("  🔄 SIMULACIÓN: git status");
console.log("========================================\n");

// Simulamos qué mostraría git status en un proyecto típico
// con y sin .gitignore configurado.

console.log("  📌 ESCENARIO: Proyecto Node.js recién creado con npm install");
console.log("  ──────────────────────────────────────────────────────────────\n");

console.log("  ❌ SIN .gitignore → git status mostraría:");
console.log("  ─────────────────────────────────────────");

const archivosSinIgnore = [
  { archivo: "index.js",                    tipo: "archivo de código → QUEREMOS subir" },
  { archivo: ".env",                        tipo: "⛔ CONTRASEÑAS → NO DEBE subir" },
  { archivo: "node_modules/ (4,847 archivos)", tipo: "⛔ PAQUETES NPM → NO DEBE subir" },
  { archivo: "package.json",                tipo: "configuración → queremos subir" },
  { archivo: "package-lock.json",           tipo: "lock de versiones → queremos subir" },
  { archivo: ".DS_Store",                   tipo: "basura macOS → NO debe subir" },
  { archivo: "server.log",                  tipo: "log de errores → NO debe subir" },
];

archivosSinIgnore.forEach(({ archivo, tipo }) => {
  console.log(`     ${archivo.padEnd(45, " ")} (${tipo})`);
  // .padEnd(45, " ") rellena el string con espacios a la DERECHA
  // hasta alcanzar 45 caracteres de longitud total.
  // Así todos los tipos quedan alineados en la misma columna.
});

console.log("\n  Resultado: git add . → incluiría TODO. git push → sube TODO.");
console.log("  Contraseñas expuestas en 30 segundos. Repositorio de 200MB+.\n");

console.log("  ✅ CON .gitignore → git status mostraría:");
console.log("  ─────────────────────────────────────────");

const archivosConIgnore = [
  { archivo: "index.js",          accion: "✅ se rastrea → irá al commit" },
  { archivo: "package.json",      accion: "✅ se rastrea → irá al commit" },
  { archivo: "package-lock.json", accion: "✅ se rastrea → irá al commit" },
  { archivo: ".env",              accion: "🚫 IGNORADO por regla: .env" },
  { archivo: "node_modules/",     accion: "🚫 IGNORADO por regla: node_modules/" },
  { archivo: ".DS_Store",         accion: "🚫 IGNORADO por regla: .DS_Store" },
  { archivo: "server.log",        accion: "🚫 IGNORADO por regla: *.log" },
];

archivosConIgnore.forEach(({ archivo, accion }) => {
  console.log(`     ${archivo.padEnd(25, " ")} → ${accion}`);
});

console.log("\n  Resultado: git add . → incluye SOLO el código relevante.");
console.log("  git push → sube 3 archivos en segundos. Credenciales protegidas.\n");

// ─────────────────────────────────────────────────────────
//  SECCIÓN 6: Demostración de patrones de .gitignore
// ─────────────────────────────────────────────────────────

console.log("\n========================================");
console.log("  🎯 PATRONES DEL .gitignore — EJEMPLOS");
console.log("========================================\n");

const patronesExplicados = [
  {
    patron:      "node_modules/",
    descripcion: "Ignora la carpeta node_modules/ completa",
    coincide:    ["node_modules/", "node_modules/express/", "node_modules/lodash/index.js"],
    noCoincide:  ["mi-node_modules/", "src/node_modules.js"],
  },
  {
    patron:      ".env",
    descripcion: "Ignora exactamente el archivo .env",
    coincide:    [".env"],
    noCoincide:  [".env.example", ".env.local", "mi.env"],
    nota:        "Para cubrir más variantes, agrega líneas adicionales: .env.local, .env.*",
  },
  {
    patron:      "*.log",
    descripcion: "Ignora CUALQUIER archivo con extensión .log",
    coincide:    ["error.log", "server.log", "npm-debug.log", "logs/app.log"],
    noCoincide:  ["logging.js", "log.txt"],
    nota:        "El * es un wildcard que significa 'cualquier nombre'",
  },
  {
    patron:      "*.env",
    descripcion: "Ignora cualquier archivo que TERMINE en .env",
    coincide:    [".env", "development.env", "production.env"],
    noCoincide:  [".env.example", ".env.local"],
    nota:        "Útil para ignorar todos los archivos de entorno",
  },
  {
    patron:      "dist/",
    descripcion: "Ignora la carpeta dist/ en CUALQUIER nivel del proyecto",
    coincide:    ["dist/", "dist/index.js", "packages/mi-lib/dist/"],
    noCoincide:  ["distribution/", "dist.js"],
  },
  {
    patron:      "/dist",
    descripcion: "Ignora dist SOLO en la raíz del proyecto",
    coincide:    ["dist/", "dist/index.js"],
    noCoincide:  ["packages/mi-lib/dist/"],
    nota:        "La / al inicio ancla la regla a la raíz del repositorio",
  },
  {
    patron:      "**/*.test.js",
    descripcion: "Ignora archivos .test.js en CUALQUIER subcarpeta",
    coincide:    ["app.test.js", "src/utils.test.js", "src/api/auth.test.js"],
    noCoincide:  ["app.spec.js", "tests/utils.js"],
    nota:        "** = cualquier número de niveles de carpetas",
  },
  {
    patron:      "!.env.example",
    descripcion: "EXCEPCIÓN: no ignores .env.example aunque haya reglas que lo cubran",
    nota:        "El ! invierte la regla. Útil cuando tienes *.env pero quieres subir .env.example",
    coincide:    [],
    noCoincide:  [".env.example"],
  },
];

patronesExplicados.forEach(({ patron, descripcion, coincide, noCoincide, nota }) => {
  console.log(`  📌 Patrón: "${patron}"`);
  console.log(`     ${descripcion}`);

  if (nota) {
    console.log(`     💡 Nota: ${nota}`);
  }

  if (coincide.length > 0) {
    console.log(`     ✅ Ignora:         ${coincide.join(", ")}`);
  }
  if (noCoincide.length > 0) {
    console.log(`     ❌ NO ignora:      ${noCoincide.join(", ")}`);
  }
  console.log();
});

// ─────────────────────────────────────────────────────────
//  SECCIÓN 7: Flujo de trabajo completo con Git + .gitignore
// ─────────────────────────────────────────────────────────

console.log("\n========================================");
console.log("  🛠️  FLUJO DE TRABAJO CORRECTO CON GIT");
console.log("========================================\n");

const pasosFlujo = [
  {
    paso:      1,
    titulo:    "Crear el proyecto",
    comandos:  ["mkdir mi-proyecto", "cd mi-proyecto", "npm init -y"],
    detalle:   "Creamos la carpeta e inicializamos Node.js con package.json.",
    cuando:    "Una sola vez al crear el proyecto.",
  },
  {
    paso:      2,
    titulo:    "Inicializar Git",
    comandos:  ["git init"],
    detalle:   "Crea la carpeta oculta .git/ en el proyecto. A partir de aquí Git rastrea cambios.",
    cuando:    "Una sola vez al crear el proyecto.",
  },
  {
    paso:      3,
    titulo:    "Crear .gitignore ANTES de cualquier commit",
    comandos:  ["# Crea el archivo .gitignore en VS Code", "# Pega el contenido de la Sección 2"],
    detalle:   "CRÍTICO: debe crearse ANTES del primer commit. Si ya hiciste commits, usa git rm --cached.",
    cuando:    "Una sola vez al crear el proyecto. ANTES del primer git add.",
  },
  {
    paso:      4,
    titulo:    "Crear el archivo .env",
    comandos:  ["# Crea .env con tus credenciales reales", "# Verifica que .gitignore tiene '.env'"],
    detalle:   "El .env es invisible para Git gracias al .gitignore. Tus contraseñas están seguras.",
    cuando:    "Una sola vez al configurar el proyecto.",
  },
  {
    paso:      5,
    titulo:    "Verificar que .gitignore funciona",
    comandos:  ["git status"],
    detalle:   "git status no debe mostrar node_modules/ ni .env. Si los muestra, el .gitignore no funciona.",
    cuando:    "Cada vez que tengas dudas sobre qué está siendo rastreado.",
  },
  {
    paso:      6,
    titulo:    "Primer commit del proyecto",
    comandos:  ["git add .", "git commit -m 'Configuración inicial del proyecto'"],
    detalle:   "git add . agrega todos los archivos NO ignorados. git commit crea el snapshot.",
    cuando:    "Primera vez. Después haces commits cada vez que termines algo significativo.",
  },
  {
    paso:      7,
    titulo:    "Conectar con GitHub y subir",
    comandos:  [
      "git remote add origin https://github.com/tu-usuario/mi-proyecto.git",
      "git branch -M main",
      "git push -u origin main",
    ],
    detalle:   "remote add: conecta con el repo de GitHub. push: sube los commits.",
    cuando:    "Primera vez. Después solo necesitas: git push",
  },
  {
    paso:      8,
    titulo:    "Flujo de trabajo diario",
    comandos:  [
      "# Haces cambios en el código...",
      "git status              # Ver qué cambió",
      "git add .               # Agregar todos los cambios",
      "git commit -m 'Agrego función de login'  # Guardar snapshot",
      "git push                # Subir a GitHub",
    ],
    detalle:   "Este es el ciclo que repites mientras desarrollas: cambiar → add → commit → push.",
    cuando:    "Cada vez que termines algo funcional que quieras guardar.",
  },
];

pasosFlujo.forEach(({ paso, titulo, comandos, detalle, cuando }) => {
  console.log(`  PASO ${paso}: ${titulo}`);
  console.log(`  ${"─".repeat(50)}`);
  // "─".repeat(50) → crea un string de 50 guiones para la línea separadora.

  comandos.forEach((cmd) => {
    if (cmd.startsWith("#")) {
      console.log(`    ${cmd}`);
      // Los comentarios (líneas con #) se muestran sin el prompt $
    } else {
      console.log(`    $ ${cmd}`);
      // Los comandos reales se muestran con el prompt $ para indicar
      // que se ejecutan en la terminal.
    }
  });

  console.log(`\n    💡 Qué hace: ${detalle}`);
  console.log(`    🕐 Cuándo:   ${cuando}\n`);
});

// ─────────────────────────────────────────────────────────
//  SECCIÓN 8: Solución a "ya subí node_modules/.env"
// ─────────────────────────────────────────────────────────

console.log("\n========================================");
console.log("  🚨 EMERGENCIAS — ¿Ya subiste algo que no debías?");
console.log("========================================\n");

const emergencias = [
  {
    situacion: "Subí node_modules/ a GitHub",
    urgencia:  "🟡 Alta — el repo está muy pesado",
    pasos: [
      'echo "node_modules/" >> .gitignore       # Agregar regla si falta',
      "git rm -r --cached node_modules          # Dejar de rastrear (no borra los archivos locales)",
      "git add .gitignore                        # Agregar el .gitignore actualizado",
      'git commit -m "Eliminar node_modules del rastreo de Git"',
      "git push",
    ],
    nota: "El -r es para recursive (necesario en carpetas). --cached = solo del índice de Git, no del disco.",
  },
  {
    situacion: "Subí el .env con contraseñas reales",
    urgencia:  "⛔ CRÍTICA — actúa en los próximos minutos",
    pasos: [
      "# PASO 1 (INMEDIATO): Cambia todas las contraseñas expuestas",
      "#   - Cambia la contraseña de MongoDB Atlas",
      "#   - Rota el JWT_SECRET en producción",
      "#   - Invalida cualquier API key expuesta",
      "",
      '# PASO 2: Eliminar del rastreo',
      'echo ".env" >> .gitignore',
      "git rm --cached .env",
      'git commit -m "Eliminar .env del rastreo - credenciales rotadas"',
      "git push",
      "",
      "# PASO 3 (opcional pero recomendado): Limpiar el historial",
      "# Instala BFG Repo Cleaner: https://rtyley.github.io/bfg-repo-cleaner/",
      "# java -jar bfg.jar --delete-files .env mi-repositorio.git",
    ],
    nota: "Aunque borres el .env del repositorio, el commit donde lo subiste sigue en el historial. Las contraseñas deben cambiarse de todas formas.",
  },
  {
    situacion: "El .gitignore no ignora archivos que ya fueron commiteados",
    urgencia:  "🟡 Media — el .gitignore no tiene efecto retroactivo",
    pasos: [
      "# .gitignore solo ignora archivos que Git TODAVÍA NO rastreó",
      "# Para archivos ya commiteados, debes eliminarlos del índice:",
      "",
      "git rm --cached nombre-del-archivo       # Para un archivo",
      "git rm -r --cached carpeta/              # Para una carpeta",
      'git commit -m "Dejar de rastrear archivos ignorados"',
      "git push",
    ],
    nota: "git rm --cached no borra el archivo de tu computadora, solo de Git.",
  },
];

emergencias.forEach(({ situacion, urgencia, pasos, nota }) => {
  console.log(`  ${urgencia}`);
  console.log(`  SITUACIÓN: ${situacion}`);
  console.log(`  ${"─".repeat(55)}`);
  console.log("  SOLUCIÓN:");
  pasos.forEach((paso) => {
    if (paso === "") {
      console.log();
    } else if (paso.startsWith("#")) {
      console.log(`    ${paso}`);
    } else {
      console.log(`    $ ${paso}`);
    }
  });
  console.log(`\n  📌 Importante: ${nota}\n`);
});

// ─────────────────────────────────────────────────────────
//  SECCIÓN 9: Verificación final y resumen
// ─────────────────────────────────────────────────────────

console.log("\n========================================");
console.log("  ✅ CHECKLIST FINAL DEL .gitignore");
console.log("========================================\n");

const checklist = [
  {
    item:       "El archivo .gitignore existe en la raíz del proyecto",
    verificar:  "Busca el archivo junto al package.json",
    hecho:      existeGitignore,
  },
  {
    item:       "node_modules/ está en el .gitignore",
    verificar:  "Abre el .gitignore y busca la línea 'node_modules/'",
    hecho:      existeGitignore && (() => {
      try {
        const c = fs.readFileSync(rutaGitignore, "utf-8");
        return c.includes("node_modules");
      } catch { return false; }
    })(),
  },
  {
    item:       ".env está en el .gitignore",
    verificar:  "Abre el .gitignore y busca la línea '.env'",
    hecho:      existeGitignore && (() => {
      try {
        const c = fs.readFileSync(rutaGitignore, "utf-8");
        return c.includes(".env");
      } catch { return false; }
    })(),
  },
  {
    item:       "El .gitignore se creó ANTES del primer commit",
    verificar:  "Si ya hiciste commits con node_modules o .env, usa git rm --cached",
    hecho:      null,
    // null = no podemos verificarlo automáticamente sin ejecutar git commands
  },
  {
    item:       "Tienes un .env.example (o env.ejemplo.js) con valores ficticios",
    verificar:  "Este archivo SÍ debe estar en GitHub para que otros sepan qué configurar",
    hecho:      fs.existsSync(path.join(process.cwd(), ".env.example")) ||
                fs.existsSync(path.join(process.cwd(), "env.ejemplo.js")),
    // Verificamos si existe alguno de los dos posibles nombres del archivo de ejemplo.
  },
];

checklist.forEach(({ item, verificar, hecho }) => {
  let icono;
  if (hecho === true)  icono = "✅";
  else if (hecho === false) icono = "❌";
  else icono = "❓"; // null = no verificable automáticamente

  console.log(`  ${icono} ${item}`);
  if (hecho !== true) {
    // Solo mostramos la instrucción de verificación si el item NO está confirmado.
    console.log(`     → Cómo verificar: ${verificar}`);
  }
  console.log();
});

// ─────────────────────────────────────────────────────────
//  Mensaje final
// ─────────────────────────────────────────────────────────

console.log("========================================");
console.log("  📝 RESUMEN FINAL");
console.log("========================================\n");

console.log("  El .gitignore es simple pero FUNDAMENTAL.");
console.log("  Sin él, cada proyecto Node.js tiene dos riesgos graves:");
console.log("  1. node_modules → repositorio de cientos de MB innecesarios");
console.log("  2. .env         → contraseñas expuestas públicamente\n");
console.log("  REGLA DE ORO:");
console.log("  Crea el .gitignore ANTES del primer 'git add .'");
console.log("  Así nunca tendrás que hacer limpieza de emergencia.\n");
console.log("  ORDEN CORRECTO AL CREAR UN PROYECTO:");
console.log("  1. mkdir mi-proyecto && cd mi-proyecto");
console.log("  2. npm init -y");
console.log("  3. Crear .gitignore  ← ANTES de git init o git add");
console.log("  4. Crear .env");
console.log("  5. npm install express mongoose dotenv ...");
console.log("  6. git init");
console.log("  7. git add .");
console.log('  8. git commit -m "Configuración inicial"\n');
console.log("  9 .git push origin ...\n");

// ============================================================
//  📝 RESUMEN DE LO APRENDIDO EN ESTA INVESTIGACIÓN
// ============================================================
//
//  1. .gitignore es un archivo de texto que le dice a Git qué
//     archivos y carpetas IGNORAR completamente.
//
//  2. Las dos reglas MÁS IMPORTANTES para proyectos Node.js:
//     - node_modules/ → no subir (cientos de MB, se regenera)
//     - .env → no subir (contiene contraseñas reales)
//
//  3. Sintaxis del .gitignore:
//     - carpeta/   → ignora una carpeta
//     - *.ext      → ignora archivos por extensión
//     - /archivo   → ignora solo en la raíz
//     - !archivo   → excepción (no ignorar este)
//     - # texto    → comentario
//
//  4. .gitignore solo aplica a archivos que Git todavía no rastreó.
//     Para archivos ya commiteados: git rm --cached <archivo>
//
//  5. Si subiste el .env accidentalmente:
//     → Cambia las contraseñas INMEDIATAMENTE
//     → Luego limpia el repositorio
//
//  6. Puedes configurar un .gitignore global para tu computadora
//     que aplique a todos tus proyectos (útil para .DS_Store, etc.)
//
//  7. gitignore.io genera .gitignore completos adaptados a tu stack.
//
//  8. El orden importa: crea el .gitignore ANTES del primer commit.
// ============================================================