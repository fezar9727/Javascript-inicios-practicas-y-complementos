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
//  Piénsalo así: imagina que quieres construir una casa.
//  Tienes dos opciones:
//  1. Fabricar tú mismo cada ladrillo, cada clavo, cada ventana.
//  2. Comprar los materiales en una ferretería y solo construir.
//
//  npm es la ferretería. Los paquetes son los materiales.
//  Tú te concentras en construir TU aplicación, no en reinventar
//  lo que ya existe.
//
//  ¿QUÉ ES npm EXACTAMENTE?
//  ─────────────────────────
//  npm tiene DOS cosas:
//
//  1. 📦 UN REGISTRO (REGISTRY):
//     Es como una tienda/biblioteca gigante en internet
//     (https://www.npmjs.com) donde hay más de 2 MILLONES de
//     paquetes gratuitos que puedes usar en tus proyectos.
//     Es el registro de paquetes más grande del mundo.
//     Cualquier persona puede publicar un paquete ahí.
//
//  2. 🛠️ UNA HERRAMIENTA DE LÍNEA DE COMANDOS (CLI):
//     Es el comando 'npm' que usas en la terminal para instalar,
//     actualizar y eliminar paquetes de tu proyecto.
//     Esta herramienta se instala automáticamente con Node.js.
//
//  ─────────────────────────────────────────────────────────
//  ¿POR QUÉ NECESITAMOS npm?
//  ─────────────────────────────────────────────────────────
//
//  Sin npm, para usar código de otra persona tendrías que:
//  1. Ir a su repositorio de GitHub
//  2. Descargar el código manualmente
//  3. Copiarlo en tu proyecto
//  4. Si ese código depende de OTRO código, repetir el proceso
//  5. Si hay una actualización, hacerlo todo de nuevo
//
//  Esto era lo que se hacía antes. Era un caos absoluto.
//  npm automatiza TODO ese proceso con un solo comando.
//
//  Además npm:
//  - Gestiona las VERSIONES exactas de cada paquete
//  - Instala automáticamente las DEPENDENCIAS de las dependencias
//    (un paquete puede depender de otros paquetes, y npm lo resuelve solo)
//  - Permite reproducir el entorno exacto en otra computadora
//  - Te avisa si hay vulnerabilidades de seguridad en tus paquetes
//
//  ─────────────────────────────────────────────────────────
//  ALTERNATIVAS A npm:
//  ─────────────────────────────────────────────────────────
//
//  Con el tiempo surgieron alternativas que mejoran algunos
//  aspectos de npm:
//
//  yarn (Facebook/Meta):
//    El más antiguo rival de npm. Surgió en 2016 porque npm
//    era muy lento. Hoy npm mejoró mucho pero yarn sigue siendo
//    popular. Usa yarn.lock en vez de package-lock.json.
//    Comando: yarn install, yarn add express, etc.
//
//  pnpm:
//    La alternativa más moderna y eficiente. Usa un sistema
//    de almacenamiento compartido — si dos proyectos usan
//    express@4.18.2, pnpm guarda UNA SOLA COPIA en tu disco
//    en vez de duplicarla en cada proyecto.
//    Mucho más rápido y ahorra espacio en disco.
//    Comando: pnpm install, pnpm add express, etc.
//
//  Para aprender, usa npm. Es el estándar y viene incluido.
//  En proyectos grandes o de empresa, pnpm es una excelente opción.
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
//      Preguntas que te hace:
//        package name: (nombre-de-tu-carpeta) →  nombre del proyecto
//        version: (1.0.0)                     →  versión inicial
//        description:                         →  descripción breve
//        entry point: (index.js)              →  archivo principal
//        test command:                        →  comando para tests
//        git repository:                      →  URL de GitHub
//        keywords:                            →  palabras clave
//        author:                              →  tu nombre
//        license: (ISC)                       →  tipo de licencia
//
//  npm init -y
//    → Igual que npm init pero responde "sí" a todo automáticamente.
//      Crea el package.json con valores por defecto sin preguntas.
//      Es la opción más rápida para empezar.
//      El -y viene de "yes" — sí a todo.
//
//  📌 INSTALAR PAQUETES:
//  ───────────────────────────────────────────────────────────────
//  npm install <nombre-paquete>        (también: npm i <paquete>)
//    → Instala un paquete y lo agrega a "dependencies" en package.json.
//    → Crea (o actualiza) la carpeta node_modules/.
//    → Crea o actualiza package-lock.json (más sobre esto abajo).
//    Ejemplo: npm install express
//             npm i express  (forma corta, mismo resultado)
//
//  npm install <paquete> --save-dev    (también: npm i <paquete> -D)
//    → Instala un paquete SOLO para desarrollo.
//    → Lo agrega a "devDependencies" en package.json.
//    → Estos paquetes NO se incluyen cuando haces deploy a producción.
//    Ejemplo: npm install nodemon --save-dev
//             npm i nodemon -D  (forma corta, mismo resultado)
//
//  npm install -g <paquete>
//    → Instala un paquete de forma GLOBAL en tu computador
//      (disponible en cualquier proyecto, no solo en el actual).
//    → Se instala en una carpeta del sistema, no en node_modules del proyecto.
//    → Úsalo para herramientas CLI que usas en muchos proyectos.
//    Ejemplo: npm install -g nodemon
//             npm install -g create-react-app
//
//  npm install (sin nombre de paquete)
//    → Lee el package.json y instala TODOS los paquetes listados.
//    → Útil cuando clonas un proyecto de GitHub (no trae node_modules).
//    → Crea node_modules/ desde cero.
//    → Es el primer comando que ejecutas al clonar cualquier proyecto.
//
//  npm install --production
//    → Instala SOLO los paquetes de "dependencies", ignora "devDependencies".
//    → Se usa al hacer deploy al servidor de producción.
//    → El servidor no necesita nodemon ni jest, solo express, mongoose, etc.
//
//  📌 DESINSTALAR PAQUETES:
//  ─────────────────────────
//  npm uninstall <paquete>
//    → Elimina el paquete del proyecto y lo quita del package.json.
//    → También elimina sus archivos de node_modules/.
//    Ejemplo: npm uninstall express
//             npm un express  (forma corta)
//
//  npm uninstall <paquete> -g
//    → Desinstala un paquete global.
//
//  📌 ACTUALIZAR PAQUETES:
//  ────────────────────────
//  npm update
//    → Actualiza todos los paquetes a sus últimas versiones COMPATIBLES
//      (respetando los símbolos ^ o ~ del package.json).
//    → No romperá tu código si las versiones son compatibles.
//
//  npm update <paquete>
//    → Actualiza un paquete específico.
//
//  npm outdated
//    → Muestra qué paquetes tienen versiones más nuevas disponibles.
//    → Te muestra: versión actual, versión deseada, versión más nueva.
//    → Muy útil para saber qué hay que actualizar sin hacerlo todavía.
//
//  📌 SEGURIDAD:
//  ──────────────
//  npm audit
//    → Analiza tus paquetes y reporta vulnerabilidades de seguridad conocidas.
//    → Se comunica con la base de datos de seguridad de npm en línea.
//    → Muestra el nivel de severidad: low, moderate, high, critical.
//
//  npm audit fix
//    → Intenta corregir automáticamente las vulnerabilidades encontradas.
//    → Solo actualiza versiones compatibles (no hace cambios que rompan código).
//
//  npm audit fix --force
//    → Fuerza actualizaciones aunque sean versiones MAJOR (puede romper código).
//    → Úsalo con cuidado y revisa los cambios después.
//
//  📌 VER PAQUETES INSTALADOS:
//  ────────────────────────────
//  npm list
//    → Muestra todos los paquetes instalados en el proyecto actual
//      en forma de árbol (con sus dependencias anidadas).
//
//  npm list --depth=0
//    → Muestra solo los paquetes que TÚ instalaste directamente,
//      sin mostrar las dependencias de las dependencias.
//      Mucho más legible.
//
//  npm list -g
//    → Muestra los paquetes instalados globalmente.
//
//  npm list -g --depth=0
//    → Paquetes globales sin las dependencias anidadas.
//
//  📌 EJECUTAR SCRIPTS:
//  ─────────────────────
//  npm run <nombre-script>
//    → Ejecuta un script definido en el package.json bajo "scripts".
//    Ejemplo: npm run start   →  ejecuta lo que diga "start" en scripts
//             npm run dev     →  ejecuta lo que diga "dev" en scripts
//             npm run build   →  ejecuta lo que diga "build" en scripts
//
//  npm start
//    → Atajo especial para ejecutar el script "start".
//    → No necesitas escribir "run". Solo 'npm start' es suficiente.
//
//  npm test
//    → Atajo especial para ejecutar el script "test".
//    → Solo 'npm test' o 'npm t' (forma corta).
//
//  📌 INFORMACIÓN:
//  ────────────────
//  npm --version            → Versión de npm instalada.
//  node --version           → Versión de Node.js instalada.
//  npm search <termino>     → Busca paquetes en el registro de npm.
//  npm info <paquete>       → Muestra detalles de un paquete (versión, autor, etc).
//  npm info <paquete> version → Muestra solo la versión más reciente del paquete.
//  npm docs <paquete>       → Abre la documentación del paquete en el navegador.
//  npm repo <paquete>       → Abre el repositorio GitHub del paquete.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES node_modules/?
//  ─────────────────────────────────────────────────────────
//  Cuando instalas paquetes, npm crea una carpeta llamada
//  'node_modules' en tu proyecto. Ahí guarda todos los
//  archivos de los paquetes instalados.
//
//  ¿Por qué es tan grande?
//  Un paquete simple como express depende internamente de
//  otros ~50 paquetes. Cada uno de esos puede depender de
//  otros más. npm los instala TODOS para que express funcione.
//  Por eso node_modules puede tener cientos o miles de carpetas.
//
//  Un ejemplo real:
//  $ npm install express
//  added 57 packages in 2.3s
//  Solo pediste express pero instaló 57 paquetes porque
//  express necesita todos esos para funcionar.
//
//  ⚠️  IMPORTANTE: NUNCA subas node_modules/ a GitHub.
//  Es una carpeta enorme (puede pesar 100MB o más) que
//  se puede regenerar con 'npm install'.
//  Siempre agrégala al archivo .gitignore.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES package-lock.json?
//  ─────────────────────────────────────────────────────────
//  Cuando ejecutas npm install por primera vez, npm crea
//  DOS archivos:
//  1. package.json        → la "lista de ingredientes" (aproximada)
//  2. package-lock.json   → la "receta exacta" (congelada)
//
//  package.json dice: "necesito express ^4.18.2"
//  Ese ^ significa "acepta 4.18.2 o cualquier versión compatible".
//
//  Si hoy instalas tu proyecto y existe express 4.19.0,
//  npm instalará 4.19.0 (es compatible con ^4.18.2).
//  Pero si tu compañero instala el mismo proyecto mañana
//  y ya existe express 4.20.0, él tendrá esa versión.
//  ¡Dos versiones diferentes en dos computadoras!
//
//  package-lock.json congela las versiones EXACTAS de
//  TODOS los paquetes (incluidas las dependencias de las
//  dependencias). Con este archivo, npm siempre instala
//  exactamente las mismas versiones, sin importar cuándo
//  ni en qué computadora ejecutes npm install.
//
//  REGLA:
//  ✅ SÍ sube package-lock.json a GitHub
//  ❌ NO subas node_modules/ a GitHub
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES .gitignore?
//  ─────────────────────────────────────────────────────────
//  Es un archivo que le dice a Git qué archivos o carpetas
//  debe IGNORAR (no subir a GitHub). Siempre debes incluir:
//
//    node_modules/    ← carpeta gigante, se regenera con npm install
//    .env             ← contiene contraseñas y claves secretas
//    .DS_Store        ← archivos ocultos de macOS (basura)
//    *.log            ← archivos de logs
//    dist/            ← código compilado/transpilado (se regenera)
//    build/           ← igual que dist/
//
//  Si NO tienes .gitignore y subes node_modules/ a GitHub:
//  - Tu repositorio pesará cientos de MB innecesariamente
//  - Cada git push tardará varios minutos
//  - Tu historial de commits se llenará de cambios en paquetes ajenos
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ SON dependencies vs devDependencies?
//  ─────────────────────────────────────────────────────────
//
//  dependencies (producción):
//    Paquetes que tu aplicación NECESITA para funcionar
//    cuando está en producción (en el servidor real).
//    Sin estos paquetes, tu app no arranca.
//    Ejemplo: express, mongoose, cors, dotenv, bcryptjs
//
//    Se instalan con: npm install <paquete>
//    Aparecen en el package.json bajo "dependencies"
//
//  devDependencies (desarrollo):
//    Paquetes que solo necesitas MIENTRAS DESARROLLAS en
//    tu computadora. No son necesarios en el servidor.
//    Si los instalas en producción, solo ocupan espacio.
//
//    Ejemplo:
//    - nodemon: reinicia el server al guardar. En producción
//      el server NUNCA debe reiniciarse solo por eso.
//    - jest: framework de pruebas. En producción no corres tests.
//    - prettier: formatea código. El servidor no necesita eso.
//    - eslint: analiza errores de código. El servidor tampoco.
//
//    Se instalan con: npm install <paquete> --save-dev
//    Aparecen en el package.json bajo "devDependencies"
//
//  RESUMEN PRÁCTICO:
//  Si la app NO funcionaría sin ese paquete → dependencies
//  Si es una herramienta que usas al programar → devDependencies
//
// ============================================================
//  🧪 EJEMPLOS PRÁCTICOS
// ============================================================
//
//  INSTRUCCIONES:
//  1. Abre la terminal en VS Code (Ctrl + ñ)
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


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 1: La estructura de un package.json real
// ═══════════════════════════════════════════════════════════
//
//  package.json es el CORAZÓN de cualquier proyecto Node.js.
//  Es un archivo JSON (JavaScript Object Notation) que contiene
//  toda la información sobre tu proyecto:
//  - Nombre, versión, descripción
//  - Qué paquetes necesita para funcionar
//  - Comandos disponibles para ejecutar
//  - Quién lo creó, qué licencia tiene
//
//  Cuando ejecutas 'npm init -y' en una carpeta vacía,
//  npm crea este archivo automáticamente. Es el primer
//  archivo que creas en cualquier proyecto Node.js.
//
//  JSON (JavaScript Object Notation) es un formato de texto
//  para representar datos. Las reglas son:
//  - Las claves van entre comillas dobles: "name"
//  - Los strings van entre comillas dobles: "mi-proyecto"
//  - Los números van sin comillas: 1.0
//  - Los booleanos son true o false (sin comillas)
//  - Los arrays van entre corchetes: ["node", "express"]
//  - Los objetos van entre llaves: { "clave": "valor" }
//  - No puede tener comentarios (por eso esta explicación
//    está en el archivo JS, no en el JSON real)

// Simulamos la estructura de un package.json real
const packageJsonEjemplo = {
  name: "mi-primer-proyecto",
  // El nombre del paquete. Reglas:
  // - Sin mayúsculas
  // - Sin espacios (usa guiones: mi-proyecto, no "mi proyecto")
  // - Sin caracteres especiales (excepto - y _)
  // - Debe ser único si lo quieres publicar en npm
  // - En proyectos privados puede ser lo que quieras

  version: "1.0.0",
  // La versión del proyecto siguiendo Semantic Versioning.
  // Siempre empieza en 1.0.0 o 0.0.1.
  // Más sobre esto en el Ejemplo 3.

  description: "Proyecto de ejemplo para aprender npm",
  // Una descripción breve de para qué sirve tu proyecto.
  // Aparece en npm si publicas el paquete.

  main: "index.js",
  // El archivo de ENTRADA del proyecto.
  // Cuando alguien hace require('tu-paquete') en su código,
  // Node.js ejecuta el archivo indicado en "main".
  // Para proyectos propios que no se publican en npm,
  // este campo indica cuál es el archivo principal a ejecutar.

  scripts: {
    // Los scripts son comandos que puedes ejecutar con
    // 'npm run nombre-del-script'. Son atajos para
    // comandos largos que no quieres escribir completos.
    //
    // ¿Por qué usar scripts en vez de escribir el comando directo?
    // 1. Estandarizan cómo correr el proyecto para todo el equipo
    // 2. Permiten comandos complejos guardados en un lugar
    // 3. Acceso a herramientas en node_modules sin rutas largas
    //    (npm sabe buscar dentro de node_modules/.bin automáticamente)
    //
    // Ejemplos:
    // Sin script: ./node_modules/.bin/nodemon --watch src index.js
    // Con script:  npm run dev  (mucho más simple)

    start: "node index.js",
    // npm start → ejecuta 'node index.js'
    // Es el script estándar para PRODUCCIÓN.
    // En un servidor real, siempre se usa 'node' directo,
    // nunca nodemon (nodemon es solo para desarrollo local).

    dev: "nodemon index.js",
    // npm run dev → ejecuta 'nodemon index.js'
    // Es el script para DESARROLLO local.
    // nodemon reinicia el servidor automáticamente cada vez
    // que guardas un cambio en cualquier archivo .js.
    // Sin nodemon tendrías que hacer Ctrl+C y volver a ejecutar
    // 'node index.js' cada vez que cambias algo. Un infierno.

    test: 'echo "No hay tests aún" && exit 1',
    // npm test → ejecuta este comando
    // El 'echo' imprime el mensaje en la terminal.
    // El '&& exit 1' hace que el script termine con código de error 1
    // (lo que indica "los tests fallaron") — es el placeholder
    // que npm pone por defecto cuando no tienes tests configurados.
    // Cuando agregues Jest u otro framework de tests, este campo
    // se reemplazaría por: "jest" o "jest --coverage"
  },

  keywords: ["nodejs", "ejemplo", "npm"],
  // Palabras clave que describen tu proyecto.
  // Solo son útiles si publicas el paquete en npm
  // para que otros lo encuentren al buscar.

  author: "Estudiante Programador",
  // Tu nombre o el de tu empresa.
  // También puede ser un objeto con más detalles:
  // { "name": "Tu Nombre", "email": "tu@email.com", "url": "https://tuweb.com" }

  license: "MIT",
  // Tipo de licencia que rige cómo otros pueden usar tu código.
  // Las más comunes:
  // MIT      → Libre uso, modificación y distribución con atribución.
  //            La más permisiva y popular en open source.
  // ISC      → Similar a MIT, ligeramente más simple.
  //            Es la que npm pone por defecto.
  // Apache-2.0 → Como MIT pero con protección de patentes.
  // GPL-3.0  → Si alguien usa tu código, DEBE publicar
  //            su código también como open source. (copyleft)
  // UNLICENSED → Código propietario, nadie más puede usarlo.
  //              Úsalo para proyectos privados de empresa.

  dependencies: {
    // Paquetes NECESARIOS para que la app funcione en producción.
    // Instalados con: npm install <paquete>
    express: "^4.18.2",
    mongoose: "^7.0.0",
    cors: "^2.8.5",
    dotenv: "^16.0.3",
  },

  devDependencies: {
    // Paquetes SOLO para desarrollo. No van al servidor.
    // Instalados con: npm install <paquete> --save-dev
    nodemon: "^3.0.0",
  },
};

console.log("📄 ESTRUCTURA DE UN package.json TÍPICO:");
console.log("──────────────────────────────────────────");
console.log(JSON.stringify(packageJsonEjemplo, null, 2));
// JSON.stringify() convierte un objeto JavaScript a un string JSON.
// Recibe tres argumentos:
// 1er argumento: el objeto a convertir
// 2do argumento: null → no usamos una función de reemplazo personalizada
// 3er argumento: 2 → usa 2 espacios de indentación para que sea legible
//
// Sin el 3er argumento, el resultado sería una sola línea enorme:
// {"name":"mi-primer-proyecto","version":"1.0.0",...}
// Con 2 espacios de indentación es mucho más fácil de leer.


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 2: Campos del package.json explicados
// ═══════════════════════════════════════════════════════════
//
//  Iteramos sobre un array de objetos para imprimir
//  las explicaciones de cada campo. Esto es un patrón
//  muy común en JavaScript: datos en un array de objetos
//  + .forEach() para procesarlos uno a uno.

console.log("\n\n📖 ¿QUÉ SIGNIFICA CADA CAMPO?:");
console.log("──────────────────────────────");

const explicaciones = [
  {
    campo: "name",
    descripcion: "Nombre único del proyecto (sin mayúsculas ni espacios)",
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
    descripcion: "Archivo principal (punto de entrada) del proyecto",
  },
  {
    campo: "scripts",
    descripcion:
      "Atajos de comandos que puedes ejecutar con 'npm run <nombre>'",
  },
  {
    campo: "keywords",
    descripcion: "Palabras clave para buscar el paquete en npm (si lo publicas)",
  },
  {
    campo: "author",
    descripcion: "Tu nombre o el de tu empresa",
  },
  {
    campo: "license",
    descripcion:
      "Tipo de licencia del proyecto (MIT = libre uso, modificación y distribución)",
  },
  {
    campo: "dependencies",
    descripcion: "Paquetes necesarios para que la app funcione en producción",
  },
  {
    campo: "devDependencies",
    descripcion:
      "Paquetes solo para desarrollo local (no se usan en producción/servidor real)",
  },
];

explicaciones.forEach(({ campo, descripcion }) => {
  // DESTRUCTURING en el parámetro del callback:
  // En vez de escribir (item) => { ... item.campo ... item.descripcion ... }
  // desestructuramos el objeto directamente: ({ campo, descripcion })
  // Esto es solo azúcar sintáctica — el resultado es el mismo
  // pero el código queda más limpio.

  console.log(`  🔹 "${campo}": ${descripcion}`);
  // Template literal con las propiedades del objeto.
  // Para cada elemento del array imprime una línea como:
  // 🔹 "name": Nombre único del proyecto (sin mayúsculas ni espacios)
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 3: Versionado Semántico (semver)
// ═══════════════════════════════════════════════════════════
//
//  Semver (Semantic Versioning) es un ESTÁNDAR para numerar
//  versiones de software de forma que transmita información
//  sobre los cambios que se hicieron.
//
//  Todos los paquetes de npm siguen semver. Cuando publicas
//  una nueva versión de un paquete, debes elegir qué tipo
//  de cambio fue para incrementar el número correcto.
//
//  Esto es importante para entender por qué a veces
//  npm install trae versiones diferentes en distintas
//  computadoras o en diferentes momentos.

console.log("\n\n🔢 VERSIONADO SEMÁNTICO (semver) — Muy usado en npm:");
console.log("──────────────────────────────────────────────────────");
console.log('  Una versión como "4.18.2" significa:');
console.log("");
console.log("  ┌───────────────────────────────────────────┐");
console.log("  │      4        .      18       .     2     │");
console.log("  │   MAJOR            MINOR            PATCH  │");
console.log("  └───────────────────────────────────────────┘");
console.log("");
console.log(
  "  MAJOR → Cambios que ROMPEN la compatibilidad con versiones anteriores."
);
console.log(
  "           Si tu código usa express 4.x y sale express 5.0.0,"
);
console.log(
  "           es posible que tu código se rompa. El salto de MAJOR"
);
console.log(
  "           advierte: 'hay cambios importantes, revisa la documentación'."
);
console.log("");
console.log(
  "  MINOR → Nuevas funcionalidades añadidas, SIN romper lo anterior."
);
console.log(
  "           Si usas express 4.18.2 y sale 4.19.0, puedes actualizar"
);
console.log(
  "           con tranquilidad — tu código existente seguirá funcionando."
);
console.log(
  "           El MINOR solo agrega, nunca quita ni cambia lo existente."
);
console.log("");
console.log(
  "  PATCH  → Solo corrección de bugs. No hay nuevas funcionalidades."
);
console.log(
  "           Express 4.18.2 → 4.18.3 solo arregló un error interno."
);
console.log(
  "           Siempre es seguro actualizar PATCH."
);

console.log("\n  Los símbolos DELANTE de las versiones en package.json:");
console.log("");
console.log(
  '  "^4.18.2"  → Acepta actualizaciones MINOR y PATCH (4.x.x pero no 5.x.x)'
);
console.log(
  '               El ^ es el símbolo más común. Significa "compatible con".'
);
console.log(
  '               Ejemplo: si sale 4.20.0, npm la instalaría. Si sale 5.0.0, no.'
);
console.log("");
console.log(
  '  "~4.18.2"  → Solo acepta actualizaciones PATCH (4.18.x pero no 4.19.x)'
);
console.log(
  '               Más conservador que ^. Solo acepta corrección de bugs.'
);
console.log(
  '               Ejemplo: si sale 4.18.5, sí. Si sale 4.19.0, no.'
);
console.log("");
console.log(
  '  "4.18.2"   → Versión EXACTA. npm SIEMPRE instala esta versión, sin excepción.'
);
console.log(
  '               Úsalo cuando necesitas estabilidad máxima y sabes que una'
);
console.log(
  '               versión específica funciona perfectamente en tu proyecto.'
);
console.log("");
console.log(
  '  ">=4.18.2" → Cualquier versión mayor o igual a 4.18.2.'
);
console.log(
  '  "<5.0.0"   → Cualquier versión menor que 5.0.0.'
);
console.log(
  '  ">=4.0.0 <5.0.0" → Rango: entre 4.0.0 y 5.0.0 (sin incluir 5.0.0).'
);
console.log(
  '  "*"        → Cualquier versión. Raramente se usa, muy arriesgado.'
);

// Simulación de cómo cambia una versión según el tipo de cambio
console.log("\n  Ejemplo de cómo evoluciona la versión de un paquete:");
console.log("");

const historialVersiones = [
  { version: "1.0.0", tipo: "Lanzamiento inicial", semver: "MAJOR" },
  { version: "1.0.1", tipo: "Fix: corregido error en login", semver: "PATCH" },
  { version: "1.0.2", tipo: "Fix: corregido error de validación", semver: "PATCH" },
  { version: "1.1.0", tipo: "Nueva función: exportar a PDF", semver: "MINOR" },
  { version: "1.1.1", tipo: "Fix: PDF con caracteres especiales", semver: "PATCH" },
  { version: "2.0.0", tipo: "Rediseño completo de la API (rompe compatibilidad)", semver: "MAJOR" },
];

historialVersiones.forEach(({ version, tipo, semver }) => {
  const emoji = semver === "MAJOR" ? "🔴" : semver === "MINOR" ? "🟡" : "🟢";
  console.log(`  ${emoji}  v${version}  [${semver}]  →  ${tipo}`);
});
// Para cada versión del historial imprime una línea con:
// - Un emoji de color según la gravedad del cambio (rojo=mayor, amarillo=menor, verde=patch)
// - El número de versión
// - El tipo de cambio semver
// - La descripción del cambio


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 4: El flujo de trabajo típico con npm
// ═══════════════════════════════════════════════════════════
//
//  Aquí mostramos los pasos exactos que sigues cada vez
//  que empiezas un proyecto nuevo o cuando alguien te pasa
//  un proyecto existente para que trabajes en él.
//
//  ESCENARIO A: Proyecto nuevo desde cero
//  ESCENARIO B: Clonar proyecto existente de GitHub

console.log("\n\n🛠️  FLUJO DE TRABAJO TÍPICO CON npm:");
console.log("─────────────────────────────────────");

console.log("\n  📌 ESCENARIO A: Empezar un proyecto desde cero");
console.log("  ────────────────────────────────────────────────");

const flujoNuevoProyecto = [
  {
    paso: 1,
    comando: "mkdir mi-backend && cd mi-backend",
    descripcion:
      "Crear la carpeta del proyecto y entrar en ella",
    detalle:
      "mkdir crea la carpeta. cd entra en ella. && significa: si el primero tiene éxito, ejecuta el segundo.",
  },
  {
    paso: 2,
    comando: "npm init -y",
    descripcion:
      "Crear el package.json con valores por defecto",
    detalle:
      "El -y responde 'sí' a todas las preguntas. Después puedes editar el package.json manualmente.",
  },
  {
    paso: 3,
    comando: "npm install express mongoose cors dotenv",
    descripcion:
      "Instalar los paquetes principales de producción",
    detalle:
      "Puedes instalar varios paquetes de una vez separándolos con espacio. Todos van a 'dependencies'.",
  },
  {
    paso: 4,
    comando: "npm install nodemon --save-dev",
    descripcion:
      "Instalar nodemon como dependencia de desarrollo",
    detalle:
      "El --save-dev lo mete en 'devDependencies'. En producción no se instala.",
  },
  {
    paso: 5,
    comando: "touch index.js  (o crear el archivo en VS Code)",
    descripcion:
      "Crear el archivo principal del proyecto",
    detalle:
      "touch crea un archivo vacío en Linux/Mac. En Windows: type nul > index.js. O simplemente créalo desde VS Code.",
  },
  {
    paso: 6,
    comando: "echo node_modules/ > .gitignore",
    descripcion:
      "Crear el .gitignore para no subir node_modules a GitHub",
    detalle:
      "Fundamental. Sin esto subirías cientos de MB innecesarios. También agrega .env al .gitignore.",
  },
  {
    paso: 7,
    comando: "npm run dev",
    descripcion:
      "Iniciar el servidor en modo desarrollo con nodemon",
    detalle:
      "Esto ejecuta el script 'dev' del package.json. Nodemon vigilará cambios y reiniciará solo.",
  },
];

flujoNuevoProyecto.forEach(({ paso, comando, descripcion, detalle }) => {
  console.log(`\n  Paso ${paso}: ${descripcion}`);
  console.log(`    $ ${comando}`);
  console.log(`    ℹ️  ${detalle}`);
});

console.log("\n\n  📌 ESCENARIO B: Clonar un proyecto existente de GitHub");
console.log("  ──────────────────────────────────────────────────────");

const flujoClonado = [
  {
    paso: 1,
    comando: "git clone https://github.com/usuario/mi-backend.git",
    descripcion: "Clonar el repositorio",
    detalle:
      "Descarga todo el código EXCEPTO node_modules (está en .gitignore) y .env (contiene secretos).",
  },
  {
    paso: 2,
    comando: "cd mi-backend",
    descripcion: "Entrar en la carpeta del proyecto",
    detalle:
      "Siempre debes estar dentro de la carpeta del proyecto para que npm funcione correctamente.",
  },
  {
    paso: 3,
    comando: "npm install",
    descripcion:
      "Instalar todas las dependencias listadas en package.json",
    detalle:
      "Lee el package.json (o package-lock.json si existe) y recrea la carpeta node_modules completa.",
  },
  {
    paso: 4,
    comando: "cp .env.example .env  (o crear .env manualmente)",
    descripcion: "Crear el archivo .env con las variables de entorno",
    detalle:
      "El .env nunca se sube a GitHub. El proyecto original debería incluir un .env.example con los nombres de las variables (sin los valores secretos) para que sepas qué debes configurar.",
  },
  {
    paso: 5,
    comando: "npm run dev",
    descripcion: "Iniciar el servidor",
    detalle:
      "Si todo está bien configurado, el servidor debería arrancar.",
  },
];

flujoClonado.forEach(({ paso, comando, descripcion, detalle }) => {
  console.log(`\n  Paso ${paso}: ${descripcion}`);
  console.log(`    $ ${comando}`);
  console.log(`    ℹ️  ${detalle}`);
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 5: Paquetes más populares del ecosistema npm
// ═══════════════════════════════════════════════════════════
//
//  Hay más de 2 millones de paquetes en npm.
//  Aquí están los que usarás o ya usas en tu proyecto
//  de backend con Node.js, Express y MongoDB.
//
//  Conocer el ecosistema de paquetes es tan importante como
//  conocer el lenguaje. Un buen desarrollador sabe qué
//  herramientas existen y cuándo usarlas.

console.log("\n\n🌟 PAQUETES MÁS POPULARES EN npm:");
console.log("───────────────────────────────────");

const paquetesPopulares = [
  {
    categoria: "🌐 SERVIDOR WEB Y APIs",
    paquetes: [
      {
        nombre: "express",
        uso: "Framework web minimalista para crear servidores y APIs REST",
        instalar: "npm install express",
        detalle:
          "El paquete más usado en Node.js. Simplifica enormemente crear rutas, middlewares y respuestas HTTP. Tu backend actual lo usa.",
      },
      {
        nombre: "fastify",
        uso: "Framework web más rápido que Express, con validación integrada",
        instalar: "npm install fastify",
        detalle:
          "Alternativa moderna a Express. Más rápido y con TypeScript mejor integrado. Popular en proyectos nuevos.",
      },
      {
        nombre: "cors",
        uso: "Habilitar CORS — permite peticiones HTTP entre dominios diferentes",
        instalar: "npm install cors",
        detalle:
          "Sin cors, tu frontend en localhost:3000 no podría hacer fetch a tu backend en localhost:5000. El navegador lo bloquea por seguridad.",
      },
    ],
  },
  {
    categoria: "🗄️  BASE DE DATOS",
    paquetes: [
      {
        nombre: "mongoose",
        uso: "ODM (Object Document Mapper) para MongoDB",
        instalar: "npm install mongoose",
        detalle:
          "Te permite definir schemas, modelos y hacer queries a MongoDB con una API limpia y orientada a objetos. Tu backend ya lo usa.",
      },
      {
        nombre: "pg",
        uso: "Cliente PostgreSQL para Node.js (base de datos relacional)",
        instalar: "npm install pg",
        detalle:
          "Si algún día usas PostgreSQL en vez de MongoDB, este es el paquete. PostgreSQL es SQL, MongoDB es NoSQL.",
      },
      {
        nombre: "prisma",
        uso: "ORM moderno con auto-completado y migrations para SQL",
        instalar: "npm install prisma",
        detalle:
          "El ORM más popular hoy para bases de datos SQL (PostgreSQL, MySQL, SQLite). Genera tipos TypeScript automáticamente.",
      },
    ],
  },
  {
    categoria: "🔐 AUTENTICACIÓN Y SEGURIDAD",
    paquetes: [
      {
        nombre: "bcryptjs",
        uso: "Encriptar contraseñas de forma segura con hashing",
        instalar: "npm install bcryptjs",
        detalle:
          "NUNCA guardes contraseñas en texto plano. bcryptjs aplica hashing con salt para que sean imposibles de revertir.",
      },
      {
        nombre: "jsonwebtoken",
        uso: "Crear y verificar tokens JWT para autenticación sin sesiones",
        instalar: "npm install jsonwebtoken",
        detalle:
          "JWT (JSON Web Token) permite autenticar usuarios sin guardar estado en el servidor. Tu backend ya lo usa.",
      },
      {
        nombre: "helmet",
        uso: "Configurar headers HTTP de seguridad automáticamente",
        instalar: "npm install helmet",
        detalle:
          "Protege tu app Express de vulnerabilidades web comunes configurando headers como X-Frame-Options, Content-Security-Policy, etc.",
      },
      {
        nombre: "express-rate-limit",
        uso: "Limitar la cantidad de peticiones por IP (anti-abuso)",
        instalar: "npm install express-rate-limit",
        detalle:
          "Previene ataques de fuerza bruta y abuso de la API limitando, por ejemplo, a 100 peticiones por minuto por IP.",
      },
    ],
  },
  {
    categoria: "⚙️  CONFIGURACIÓN Y UTILIDADES",
    paquetes: [
      {
        nombre: "dotenv",
        uso: "Cargar variables de entorno desde un archivo .env",
        instalar: "npm install dotenv",
        detalle:
          "Permite guardar configuración sensible (contraseñas, claves API) en un archivo .env que no se sube a GitHub.",
      },
      {
        nombre: "morgan",
        uso: "Logger HTTP — registra cada petición que recibe tu servidor",
        instalar: "npm install morgan",
        detalle:
          "Imprime en consola cada petición: método, URL, código de respuesta, tiempo. Muy útil para depurar.",
      },
      {
        nombre: "joi",
        uso: "Validar datos de entrada (body, params, query) con schemas",
        instalar: "npm install joi",
        detalle:
          "Define reglas de validación para los datos que recibe tu API. Si el body no cumple las reglas, rechaza la petición automáticamente.",
      },
      {
        nombre: "multer",
        uso: "Manejar subida de archivos (imágenes, PDFs, etc.)",
        instalar: "npm install multer",
        detalle:
          "Cuando tu API necesita recibir archivos (no solo JSON), multer procesa el multipart/form-data y te da acceso al archivo.",
      },
    ],
  },
  {
    categoria: "📤 COMUNICACIÓN Y SERVICIOS EXTERNOS",
    paquetes: [
      {
        nombre: "axios",
        uso: "Hacer peticiones HTTP a otras APIs desde Node.js",
        instalar: "npm install axios",
        detalle:
          "Cuando tu backend necesita consumir otra API (pagos, SMS, clima, etc.), axios hace las peticiones HTTP de forma simple.",
      },
      {
        nombre: "nodemailer",
        uso: "Enviar emails desde Node.js",
        instalar: "npm install nodemailer",
        detalle:
          "Envía emails de confirmación, recuperación de contraseña, notificaciones. Funciona con Gmail, Outlook, SMTP propio, etc.",
      },
      {
        nombre: "socket.io",
        uso: "WebSockets para comunicación en tiempo real bidireccional",
        instalar: "npm install socket.io",
        detalle:
          "Chats en tiempo real, notificaciones en vivo, juegos multijugador. Mantiene una conexión permanente entre cliente y servidor.",
      },
    ],
  },
  {
    categoria: "🧪 TESTING Y DESARROLLO",
    paquetes: [
      {
        nombre: "nodemon",
        uso: "Reiniciar el servidor automáticamente cuando guardas cambios",
        instalar: "npm install nodemon --save-dev",
        detalle:
          "Esencial durante el desarrollo. Vigila los archivos .js y reinicia el proceso de Node.js cuando detecta cambios. Solo para development.",
      },
      {
        nombre: "jest",
        uso: "Framework de testing para JavaScript y Node.js",
        instalar: "npm install jest --save-dev",
        detalle:
          "Permite escribir pruebas automatizadas para verificar que tu código funciona como esperado. Solo para development.",
      },
      {
        nombre: "prettier",
        uso: "Formatear el código automáticamente con un estilo consistente",
        instalar: "npm install prettier --save-dev",
        detalle:
          "Elimina las discusiones sobre estilo de código en equipos. Todos el código queda formateado igual automáticamente.",
      },
    ],
  },
];

paquetesPopulares.forEach(({ categoria, paquetes }) => {
  console.log(`\n  ${categoria}`);
  console.log("  " + "─".repeat(50));

  paquetes.forEach(({ nombre, uso, instalar, detalle }) => {
    console.log(`\n  📦 ${nombre}`);
    console.log(`     Uso:       ${uso}`);
    console.log(`     Instalar:  ${instalar}`);
    console.log(`     Detalle:   ${detalle}`);
  });
});


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 6: Simulación de npm audit (seguridad)
// ═══════════════════════════════════════════════════════════
//
//  npm mantiene una base de datos de vulnerabilidades de seguridad
//  conocidas en paquetes npm. Cuando ejecutas 'npm audit',
//  compara tu lista de paquetes contra esa base de datos.
//
//  Esto es importante porque:
//  - Un paquete popular puede tener una vulnerabilidad descubierta
//    después de que lo instalaste
//  - Los hackers atacan vulnerabilidades conocidas en paquetes
//    desactualizados
//  - En proyectos reales, el equipo de seguridad exige que
//    no haya vulnerabilidades sin resolver
//
//  Niveles de severidad de vulnerabilidades:
//  - low:      Bajo riesgo, puede esperarse a actualizar
//  - moderate: Riesgo medio, actualizar pronto
//  - high:     Alto riesgo, actualizar urgente
//  - critical: Riesgo crítico, actualizar INMEDIATAMENTE

console.log("\n\n🔒 SEGURIDAD CON npm audit:");
console.log("────────────────────────────");
console.log(
  "\n  Cuando ejecutas 'npm audit', la salida se ve algo así:"
);
console.log("");

// Simulamos la salida de npm audit
const vulnerabilidadesSimuladas = [
  {
    paquete: "lodash",
    version: "4.17.15",
    severidad: "HIGH",
    tipo: "Prototype Pollution",
    solucion: "npm update lodash",
  },
  {
    paquete: "express",
    version: "4.17.0",
    severidad: "MODERATE",
    tipo: "Open Redirect",
    solucion: "npm update express",
  },
  {
    paquete: "axios",
    version: "0.21.0",
    severidad: "HIGH",
    tipo: "Server-Side Request Forgery",
    solucion: "npm audit fix",
  },
];

const emojiSeveridad = { HIGH: "🔴", MODERATE: "🟡", LOW: "🟢", CRITICAL: "⛔" };

vulnerabilidadesSimuladas.forEach(({ paquete, version, severidad, tipo, solucion }) => {
  console.log(
    `  ${emojiSeveridad[severidad]} [${severidad}] ${paquete}@${version} — ${tipo}`
  );
  console.log(`     Solución: ${solucion}`);
  console.log("");
});

console.log(
  `  Found ${vulnerabilidadesSimuladas.length} vulnerabilities ` +
  `(${vulnerabilidadesSimuladas.filter(v => v.severidad === "HIGH").length} high, ` +
  `${vulnerabilidadesSimuladas.filter(v => v.severidad === "MODERATE").length} moderate)`
);
console.log("");
console.log("  Para corregir automáticamente las que se puedan:");
console.log("    $ npm audit fix");
console.log("");
console.log("  Para ver el reporte completo en el navegador:");
console.log("    $ npm audit --json > reporte.json");


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 7: Crear y publicar tu propio paquete en npm
// ═══════════════════════════════════════════════════════════
//
//  npm no es solo para consumir paquetes — también puedes
//  publicar los tuyos para que otras personas los usen.
//  Cualquiera puede publicar paquetes gratuitos en npm.
//
//  ¿Por qué publicar un paquete?
//  - Compartir utilidades que usas en varios proyectos
//  - Contribuir a la comunidad open source
//  - Construir reputación profesional como desarrollador
//  - Practicar la modularización del código
//
//  Pasos para publicar (solo para referencia, no ejecutes esto ahora):

console.log("\n\n📤 ¿CÓMO PUBLICAR TU PROPIO PAQUETE EN npm?");
console.log("──────────────────────────────────────────────");

const pasosPublicar = [
  {
    paso: 1,
    accion: "Crear cuenta en npmjs.com",
    comando: null,
    detalle: "Ve a https://www.npmjs.com y crea una cuenta gratuita.",
  },
  {
    paso: 2,
    accion: "Iniciar sesión en npm desde la terminal",
    comando: "npm login",
    detalle:
      "Te pedirá usuario, contraseña y email. Después de esto, npm sabe quién eres.",
  },
  {
    paso: 3,
    accion: "Crear tu paquete con package.json",
    comando: "npm init",
    detalle:
      "El campo 'name' en el package.json será el nombre con que otros instalen tu paquete.",
  },
  {
    paso: 4,
    accion: "Escribir tu código y exportarlo",
    comando: null,
    detalle:
      "En tu archivo principal (el que dice 'main' en package.json), exporta las funciones con module.exports.",
  },
  {
    paso: 5,
    accion: "Publicar el paquete",
    comando: "npm publish",
    detalle:
      "npm sube tu código al registro. En segundos, cualquiera en el mundo puede instalar tu paquete con npm install tu-paquete.",
  },
  {
    paso: 6,
    accion: "Actualizar el paquete cuando haya cambios",
    comando: "npm version patch  →  npm publish",
    detalle:
      "Debes actualizar la versión antes de publicar una nueva versión. npm version patch incrementa el PATCH automáticamente.",
  },
];

pasosPublicar.forEach(({ paso, accion, comando, detalle }) => {
  console.log(`\n  Paso ${paso}: ${accion}`);
  if (comando) console.log(`    $ ${comando}`);
  console.log(`    ℹ️  ${detalle}`);
});

// Mostramos un ejemplo de paquete simple que se podría publicar
console.log("\n\n  Ejemplo de un paquete sencillo publicable:");
console.log("  ──────────────────────────────────────────");
console.log("");
console.log("  // archivo: index.js (el main del paquete)");
console.log("");
console.log("  function calcularEdad(anioNacimiento) {");
console.log("    const hoy = new Date();");
console.log("    return hoy.getFullYear() - anioNacimiento;");
console.log("  }");
console.log("");
console.log("  function esMayorDeEdad(anioNacimiento) {");
console.log("    return calcularEdad(anioNacimiento) >= 18;");
console.log("  }");
console.log("");
console.log("  module.exports = { calcularEdad, esMayorDeEdad };");
console.log("");
console.log("  // Así lo usaría alguien después de: npm install utilidades-edad");
console.log('  // const { calcularEdad } = require("utilidades-edad");');
console.log("  // console.log(calcularEdad(2000)); → 25 (depende del año actual)");

// Ejecutamos localmente esa misma lógica para que no sea solo texto
const calcularEdad = (anioNacimiento) => new Date().getFullYear() - anioNacimiento;
const esMayorDeEdad = (anioNacimiento) => calcularEdad(anioNacimiento) >= 18;

console.log("\n  Ejecutando localmente:");
console.log(`  calcularEdad(2000)     = ${calcularEdad(2000)} años`);
console.log(`  calcularEdad(1995)     = ${calcularEdad(1995)} años`);
console.log(`  esMayorDeEdad(2010)    = ${esMayorDeEdad(2010)}`);
console.log(`  esMayorDeEdad(2000)    = ${esMayorDeEdad(2000)}`);


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 8: npm scripts avanzados
// ═══════════════════════════════════════════════════════════
//
//  Los scripts de npm son más poderosos de lo que parecen.
//  Puedes encadenar comandos, usar variables de entorno,
//  ejecutar scripts en paralelo y mucho más.
//
//  SCRIPTS ESPECIALES (atajos, no necesitan 'run'):
//  npm start  → ejecuta el script "start"
//  npm test   → ejecuta el script "test"  (también: npm t)
//  npm stop   → ejecuta el script "stop"
//  npm restart → ejecuta el script "restart"
//
//  TODOS los demás necesitan 'npm run':
//  npm run dev, npm run build, npm run lint, etc.
//
//  HOOKS DE SCRIPTS:
//  npm tiene hooks pre y post para cada script.
//  Si tienes un script "build", puedes tener:
//  "prebuild"  → se ejecuta ANTES de "build" automáticamente
//  "postbuild" → se ejecuta DESPUÉS de "build" automáticamente
//  npm los detecta por el nombre y los ejecuta en orden.

console.log("\n\n⚡ npm SCRIPTS AVANZADOS:");
console.log("─────────────────────────");

const scriptsAvanzados = {
  scripts: {
    // Script básico: simplemente ejecuta node
    start: "node index.js",

    // Pasa una variable de entorno al proceso
    dev: "NODE_ENV=development nodemon index.js",
    // NODE_ENV es la variable estándar para indicar el entorno.
    // Valores convencionales: development, production, test
    // Tu código puede leerla con process.env.NODE_ENV
    // y comportarse diferente (más logs en dev, menos en producción).

    // Hook pre: se ejecuta automáticamente ANTES de 'build'
    prebuild: "echo 'Limpiando carpeta dist...' && rm -rf dist",

    // El script principal
    build: "babel src -d dist",
    // Babel transpila código JavaScript moderno a una versión
    // compatible con navegadores y Node.js antiguos.

    // Hook post: se ejecuta automáticamente DESPUÉS de 'build'
    postbuild: "echo 'Build completado exitosamente'",

    // Encadenar comandos con && (el segundo solo corre si el primero fue exitoso)
    "test:coverage": "jest --coverage && echo 'Tests pasados, generando reporte'",

    // Correr dos cosas en paralelo con &
    // (solo en Linux/Mac; en Windows se usa concurrently)
    watch: "nodemon index.js & webpack --watch",

    // Scripts para diferentes entornos
    "start:prod": "NODE_ENV=production node index.js",
    "start:staging": "NODE_ENV=staging node index.js",

    // Script de despliegue completo
    deploy: "npm test && npm run build && git push heroku main",
    // Primero corre tests, si pasan hace build, si el build funciona
    // hace push a Heroku (servidor en la nube). Si cualquier paso
    // falla, los siguientes NO se ejecutan (gracias al &&).
  },
};

console.log("\n  Ejemplo de scripts avanzados en package.json:");
console.log("");
console.log(JSON.stringify(scriptsAvanzados, null, 2));
// Imprimimos el objeto como JSON formateado para que se vea
// como si fuera el package.json real.

console.log("\n  HOOKS automáticos — npm los ejecuta sin que los llames:");
console.log("    $ npm run build");
console.log("      → Primero ejecuta 'prebuild' automáticamente");
console.log("      → Luego ejecuta 'build'");
console.log("      → Luego ejecuta 'postbuild' automáticamente");


// ═══════════════════════════════════════════════════════════
//  EJEMPLO 9: Errores comunes con npm y cómo resolverlos
// ═══════════════════════════════════════════════════════════
//
//  Estos son los errores que encontrarás más frecuentemente
//  al trabajar con npm, especialmente al principio.
//  Conocerlos de antemano te ahorra horas de frustración.

console.log("\n\n🐛 ERRORES COMUNES CON npm Y SUS SOLUCIONES:");
console.log("──────────────────────────────────────────────");

const erroresComunes = [
  {
    error: "Cannot find module 'express'",
    causa:
      "Intentas usar un paquete que no está instalado en este proyecto.",
    solucion: "npm install express",
    detalle:
      "Ocurre cuando: clonas un proyecto sin ejecutar 'npm install', o el package.json menciona el paquete pero no está en node_modules.",
  },
  {
    error: "npm ERR! code EACCES",
    causa:
      "No tienes permisos para instalar el paquete globalmente.",
    solucion: "sudo npm install -g paquete  (Linux/Mac)",
    detalle:
      "En Windows, abre la terminal como Administrador. En Linux/Mac puedes configurar npm para no necesitar sudo: https://docs.npmjs.com/resolving-eacces-permissions-errors",
  },
  {
    error: "npm ERR! code ENOENT (no such file or directory)",
    causa:
      "npm no puede encontrar el archivo package.json en la carpeta actual.",
    solucion: "Asegúrate de estar en la carpeta del proyecto con 'cd mi-proyecto'",
    detalle:
      "Ocurre cuando ejecutas 'npm install' en una carpeta que no tiene package.json. Primero ejecuta 'npm init -y' si es un proyecto nuevo.",
  },
  {
    error: "npm WARN peer dep missing",
    causa:
      "Un paquete que instalaste necesita otro paquete (peer dependency) que no tienes.",
    solucion: "Instala el paquete que indica el warning: npm install <paquete>",
    detalle:
      "Las peer dependencies son paquetes que el paquete instalado espera que tú proveas. Por ejemplo, muchos plugins de React requieren que tengas React instalado.",
  },
  {
    error: "npm ERR! ERESOLVE unable to resolve dependency tree",
    causa:
      "Dos paquetes tienen versiones incompatibles entre sí.",
    solucion: "npm install --legacy-peer-deps",
    detalle:
      "npm v7+ es más estricto con las versiones compatibles. --legacy-peer-deps usa el comportamiento más permisivo de npm v6. Úsalo solo si entiendes que puede haber incompatibilidades.",
  },
  {
    error: "Error: EADDRINUSE: address already in use :::5000",
    causa:
      "El puerto que tu servidor intenta usar ya está siendo usado por otro proceso.",
    solucion: "Mata el proceso que usa ese puerto o cambia el puerto de tu app",
    detalle:
      "En Windows: netstat -ano | findstr :5000 para encontrar el PID, luego taskkill /PID [número] /F. En Linux/Mac: lsof -ti:5000 | xargs kill",
  },
  {
    error: "SyntaxError: Unexpected token 'export'",
    causa:
      "Usaste sintaxis ES Modules (export/import) en un proyecto configurado para CommonJS.",
    solucion:
      'Cambia a require/module.exports, o agrega "type": "module" al package.json',
    detalle:
      "Node.js tiene dos sistemas de módulos: CommonJS (require/module.exports, el clásico) y ES Modules (import/export, el moderno). Por defecto Node.js usa CommonJS. Para usar ES Modules agrega '\"type\": \"module\"' al package.json.",
  },
];

erroresComunes.forEach(({ error, causa, solucion, detalle }) => {
  console.log(`\n  ❌ Error: "${error}"`);
  console.log(`     Causa:    ${causa}`);
  console.log(`     Solución: ${solucion}`);
  console.log(`     Detalle:  ${detalle}`);
});


// ═══════════════════════════════════════════════════════════
//  CONEXIÓN CON TU PROYECTO DE BACKEND
// ═══════════════════════════════════════════════════════════
//
//  Todo lo que aprendiste sobre npm se aplica directamente
//  a tu proyecto con Express y MongoDB.
//
//  package.json de tu proyecto:
//    Tiene "express", "mongoose", "dotenv", "cors"
//    en "dependencies" porque son necesarios en producción.
//    Tiene "nodemon" en "devDependencies" porque solo lo
//    necesitas mientras desarrollas localmente.
//
//  npm run dev:
//    Ejecuta nodemon index.js (o app.js).
//    nodemon reinicia el servidor cada vez que guardas un archivo.
//    Sin nodemon tendrías que hacer Ctrl+C + node index.js
//    cada vez que cambias una línea de código.
//
//  npm install (al clonar el proyecto):
//    Recrea node_modules/ con todos los paquetes listados
//    en el package.json. Por eso node_modules/ no se sube
//    a GitHub — no hace falta, npm lo regenera.
//
//  .gitignore en tu proyecto:
//    Debe tener node_modules/ y .env para que Git los ignore.
//    Si accidentalmente subiste node_modules a GitHub,
//    agrégalo al .gitignore y luego ejecuta:
//    git rm -r --cached node_modules
//    git commit -m "Eliminar node_modules del repositorio"
//
//  npm audit:
//    En proyectos reales de empresa, el equipo de seguridad
//    exige que no haya vulnerabilidades HIGH o CRITICAL.
//    Ejecuta npm audit periódicamente para mantenerte al día.
//
//  Conocer npm profundamente te hace un mejor desarrollador
//  porque entiendes qué hay detrás de cada 'npm install'
//  y por qué el proyecto está estructurado como está.

console.log("\n\n✅ Investigación de npm completada exitosamente.\n");