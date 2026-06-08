// ============================================================
//  📘 INVESTIGACIÓN #10 — VARIABLES DE ENTORNO Y ARCHIVOS .env
// ============================================================
//
//  Antes de entender para qué sirve este archivo, necesitamos
//  entender el problema que resuelve.
//
//  ─────────────────────────────────────────────────────────
//  EL PROBLEMA: CREDENCIALES EN EL CÓDIGO
//  ─────────────────────────────────────────────────────────
//
//  Imagina que estás desarrollando un backend y necesitas
//  conectarte a MongoDB Atlas. Tu código dice:
//
//  mongoose.connect("mongodb+srv://juan:MiPassword123@cluster0.abc.mongodb.net/tiendaDB")
//
//  Eso funciona perfectamente en tu computador. Pero ahora:
//
//  1. Subes el código a GitHub (para compartirlo o respaldarlo).
//  2. Cualquier persona que vea tu repositorio puede ver:
//     - Tu usuario de MongoDB: juan
//     - Tu contraseña real: MiPassword123
//     - El nombre de tu cluster: cluster0.abc.mongodb.net
//     - El nombre de tu base de datos: tiendaDB
//  3. Con eso, alguien puede:
//     - Acceder a toda tu base de datos
//     - Borrar todos tus datos
//     - Robar información de tus usuarios
//     - Usar tu base de datos para guardar sus propios datos
//       (haciéndote pagar la factura de MongoDB)
//
//  Esto no es hipotético. Hay bots que escanean GitHub
//  constantemente buscando credenciales expuestas.
//  Cada hora, cientos de desarrolladores cometen este error.
//
//  ─────────────────────────────────────────────────────────
//  LA SOLUCIÓN: VARIABLES DE ENTORNO
//  ─────────────────────────────────────────────────────────
//
//  Una VARIABLE DE ENTORNO es una variable que existe en el
//  SISTEMA OPERATIVO (el "entorno"), no en el código JavaScript.
//
//  En lugar de escribir la contraseña en el código:
//  mongoose.connect("mongodb+srv://juan:MiPassword123@...")  ← MAL
//
//  Escribes una referencia a una variable del sistema:
//  mongoose.connect(process.env.MONGODB_URI)  ← BIEN
//
//  Y esa variable (MONGODB_URI) existe solo en TU computadora
//  o en el servidor de producción, NUNCA en el repositorio.
//
//  process.env es un objeto de Node.js que contiene todas las
//  variables de entorno del sistema operativo y las que cargues
//  con dotenv. Es la "ventana" al entorno del sistema desde JS.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES UN ARCHIVO .env?
//  ─────────────────────────────────────────────────────────
//
//  Un archivo .env (pronunciado "dot env" o "punto env") es un
//  archivo de texto PLANO que guarda las variables de entorno
//  de tu proyecto en formato clave=valor.
//
//  Se llama ".env" con un punto al inicio porque en sistemas
//  Unix/Linux/macOS, los archivos que empiezan con punto (.)
//  son archivos OCULTOS. No aparecen en el explorador de archivos
//  normal (debes activar "mostrar archivos ocultos" para verlos).
//
//  Ejemplo de archivo .env:
//  ─────────────────────────
//  MONGODB_URI=mongodb+srv://juan:MiPassword123@cluster0.abc.mongodb.net/tiendaDB
//  PUERTO=3000
//  JWT_SECRET=clave_super_secreta_larga_aleatoria_2024
//  NODE_ENV=development
//
//  Características importantes del .env:
//  - Es un archivo de TEXTO PLANO (no es código JavaScript)
//  - NO usa comillas en los valores (salvo que el valor tenga espacios)
//  - NO usa punto y coma al final
//  - Los comentarios se hacen con # al inicio de la línea
//  - Las líneas en blanco se ignoran
//  - Es sensible a mayúsculas: PUERTO ≠ puerto ≠ Puerto
//
//  ─────────────────────────────────────────────────────────
//  ¿CÓMO LEE NODE.JS EL ARCHIVO .env?
//  ─────────────────────────────────────────────────────────
//
//  Node.js NO lee el .env automáticamente. Necesitas el paquete
//  dotenv para que lo lea y cargue las variables en process.env.
//
//  Sin dotenv: process.env.MONGODB_URI → undefined (no existe)
//  Con dotenv:  process.env.MONGODB_URI → "mongodb+srv://..."
//
//  Instalación: npm install dotenv
//
//  Uso (debe ser LO PRIMERO en tu archivo principal):
//  require("dotenv").config()
//   A partir de aquí, process.env tiene todas las variables del .env
//
//  ¿Qué hace exactamente dotenv.config()?
//  1. Busca el archivo .env en el directorio raíz del proyecto
//     (donde está el package.json)
//  2. Lee el archivo línea por línea
//  3. Parsea cada línea en formato CLAVE=VALOR
//  4. Agrega cada par clave-valor a process.env
//  5. Si una variable ya existe en process.env (puesta por el SO),
//     dotenv NO la sobreescribe (el entorno tiene prioridad)
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES process.env?
//  ─────────────────────────────────────────────────────────
//
//  process es un objeto GLOBAL de Node.js que representa el proceso
//  actual que está ejecutándose. Siempre está disponible sin importar.
//
//  process.env es una propiedad de process que contiene un objeto
//  con TODAS las variables de entorno del sistema operativo.
//
//  Antes de dotenv, process.env ya tiene variables del sistema:
//  process.env.PATH         → rutas del sistema para encontrar ejecutables
//  process.env.HOME         → directorio home del usuario (/home/juan en Linux)
//  process.env.USER         → nombre del usuario del sistema operativo
//  process.env.NODE_ENV     → entorno (si está configurado en el SO)
//  process.env.PWD          → directorio de trabajo actual
//
//  Después de require("dotenv").config(), también tiene las tuyas:
//  process.env.MONGODB_URI  → tu URI de conexión a MongoDB
//  process.env.JWT_SECRET   → tu clave secreta para JWT
//  process.env.PUERTO       → el puerto del servidor
//
//  ─────────────────────────────────────────────────────────
//  EL PATRÓN: .env + .env.example (o env.ejemplo.js)
//  ─────────────────────────────────────────────────────────
//
//  Como el .env NO se sube a GitHub, surge un problema:
//  ¿Cómo sabe alguien que clona tu proyecto qué variables
//  de entorno necesita configurar?
//
//  La solución es el ARCHIVO DE EJEMPLO:
//
//  .env (NO sube a GitHub):
//    MONGODB_URI=mongodb+srv://juan:ContraseñaREAL@cluster.net/tiendaDB
//    JWT_SECRET=claveSecretaREALsuperLarga2024
//    PUERTO=3000
//
//  .env.example (SÍ sube a GitHub — valores ficticios/vacíos):
//    MONGODB_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster.mongodb.net/tiendaDB
//    JWT_SECRET=pon_aqui_tu_clave_secreta_larga
//    PUERTO=3000
//
//  Cuando alguien clona el proyecto:
//  1. Ve el .env.example en el repositorio
//  2. Crea su propio .env copiando el ejemplo
//  3. Rellena con SUS propias credenciales
//  4. Ejecuta el proyecto normalmente
//
//  En este proyecto usamos env.ejemplo.js en vez de .env.example
//  porque así podemos agregar comentarios extensos de JavaScript
//  (los archivos .env puros solo admiten comentarios con #).
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ ES .gitignore Y POR QUÉ ES CRUCIAL?
//  ─────────────────────────────────────────────────────────
//
//  .gitignore es un archivo que le dice a Git qué archivos o
//  carpetas NO debe rastrear ni subir al repositorio.
//
//  Su contenido son patrones de nombres de archivos/carpetas:
//
//  .env              ← ignora el archivo .env (cualquier carpeta)
//  node_modules/     ← ignora la carpeta completa
//  *.log             ← ignora todos los archivos .log
//  dist/             ← ignora la carpeta dist/
//  .DS_Store         ← ignora archivos de macOS
//  *.env             ← ignora cualquier archivo que termine en .env
//
//  Si no tienes .gitignore y subes .env a GitHub:
//  - Tus contraseñas son PÚBLICAS (si el repo es público)
//  - Incluso si el repo es privado, si alguien obtiene acceso → riesgo
//  - GitHub guarda el historial: aunque borres el archivo después,
//    el commit donde lo subiste SIGUE en el historial de git.
//    Alguien puede ver versiones anteriores del repositorio.
//
//  Si accidentalmente subes .env a GitHub:
//  1. Cambia INMEDIATAMENTE todas las contraseñas/claves expuestas
//  2. Agrega .env al .gitignore
//  3. Elimina el archivo del historial de git:
//     git rm --cached .env
//     git commit -m "Eliminar .env del repositorio"
//     git push
//  4. Para limpiar el historial completo (bfg-repo-cleaner o git filter-branch)
//
//  ─────────────────────────────────────────────────────────
//  NODE_ENV — LA VARIABLE MÁS ESPECIAL
//  ─────────────────────────────────────────────────────────
//
//  NODE_ENV es una variable de entorno por convención del ecosistema
//  de Node.js. Muchas librerías (Express, Mongoose, etc.) la leen
//  para comportarse diferente según el entorno.
//
//  Valores estándar:
//
//  NODE_ENV=development (tu computadora local):
//  - Express muestra mensajes de error detallados
//  - Mongoose muestra queries en la consola (con mongoose.set("debug", true))
//  - Nodemon reinicia el servidor al guardar
//  - No se optimiza el rendimiento (más fácil de depurar)
//  - Se usan bases de datos de desarrollo (datos de prueba)
//
//  NODE_ENV=production (servidor real en la nube):
//  - Express oculta detalles de errores al cliente (seguridad)
//  - Se optimiza el rendimiento (caché, compresión, etc.)
//  - Los logs son mínimos y estructurados (no en consola)
//  - Se usan bases de datos de producción (datos reales)
//  - HTTPS obligatorio
//
//  NODE_ENV=test (cuando corres las pruebas automatizadas):
//  - Se usa una base de datos separada solo para tests
//  - Los tests no afectan los datos de desarrollo ni producción
//  - Jest y otros frameworks lo detectan automáticamente
//
//  Cómo leerlo en tu código:
//  const esProduccion = process.env.NODE_ENV === "production";
//  if (!esProduccion) {
//    mongoose.set("debug", true); // Solo en desarrollo
//  }
//
//  ─────────────────────────────────────────────────────────
//  VARIABLES DE ENTORNO EN PRODUCCIÓN (sin archivo .env)
//  ─────────────────────────────────────────────────────────
//
//  En un servidor de producción NUNCA creas un archivo .env.
//  Las variables se configuran directamente en la plataforma.
//
//  Railway (plataforma cloud popular):
//  Variables → Add Variable → MONGODB_URI = "mongodb+srv://..."
//
//  Heroku:
//  heroku config:set MONGODB_URI="mongodb+srv://..."
//  heroku config:set JWT_SECRET="tu_clave_secreta"
//
//  Render:
//  Environment → Add Environment Variable
//
//  AWS / Google Cloud / Azure:
//  Tienen sus propios sistemas de gestión de secretos:
//  AWS Secrets Manager, Google Secret Manager, Azure Key Vault.
//
//  VPS (servidor propio con Ubuntu):
//  Configuras las variables en el archivo de servicio systemd,
//  o las exportas en el shell antes de iniciar la app:
//  export MONGODB_URI="mongodb+srv://..."
//  node index.js
//
//  La ventaja: las variables nunca están en ningún archivo de código,
//  están solo en la plataforma o en el sistema operativo del servidor.
//  Dotenv no hace nada en producción si no hay .env → usa las del SO.
//
//  ─────────────────────────────────────────────────────────
//  MÚLTIPLES ARCHIVOS .env PARA MÚLTIPLES ENTORNOS
//  ─────────────────────────────────────────────────────────
//
//  En proyectos más grandes puedes tener:
//
//  .env.development → variables para tu máquina local
//  .env.test        → variables para correr los tests
//  .env.production  → variables para producción (ojo: no subir)
//  .env             → variables por defecto (fallback)
//
//  Para cargar un archivo específico:
//  require("dotenv").config({ path: ".env.test" })
//
//  O automáticamente según NODE_ENV (con la librería dotenv-flow):
//  require("dotenv-flow").config()
//  → carga .env.development si NODE_ENV=development
//  → carga .env.test si NODE_ENV=test
//
//  Para empezar, un solo .env es más que suficiente.
//
//  ─────────────────────────────────────────────────────────
//  BUENAS PRÁCTICAS CON VARIABLES DE ENTORNO
//  ─────────────────────────────────────────────────────────
//
//  ✅ SIEMPRE agrega .env al .gitignore ANTES del primer commit
//     (si ya hiciste commits con .env, el daño ya está hecho)
//
//  ✅ SIEMPRE verifica que las variables existan antes de usarlas:
//     if (!process.env.MONGODB_URI) {
//       console.error("❌ Falta configurar MONGODB_URI en el .env");
//       process.exit(1);
//     }
//     No esperes a que falle en producción para darte cuenta.
//
//  ✅ SIEMPRE usa process.env.VARIABLE || "valor_por_defecto"
//     para variables no críticas:
//     const PUERTO = process.env.PUERTO || 3000;
//
//  ✅ NUNCA hagas || "valor_por_defecto" para secretos:
//     const JWT_SECRET = process.env.JWT_SECRET; // sin default
//     if (!JWT_SECRET) throw new Error("JWT_SECRET no configurado");
//     Si falta el secreto, mejor fallar rápido y visible.
//
//  ✅ MANTÉN el .env.example actualizado. Cada vez que agregues
//     una variable nueva al .env, agrégala también al .env.example
//     (con valor ficticio). Así quien clone el proyecto sabe que existe.
//
//  ✅ DOCUMENTA para qué sirve cada variable con comentarios.
//     El .env.example es el mejor lugar para esa documentación.
//
//  ❌ NUNCA pongas credenciales reales en el código JavaScript.
//     Ni siquiera en comentarios. Los comentarios también van a GitHub.
//
//  ❌ NUNCA uses el mismo JWT_SECRET o contraseña de BD en
//     desarrollo y en producción. Si se filtra uno, el otro está seguro.
//
//  ❌ NUNCA hagas console.log(process.env) completo en producción.
//     Imprimiría TODAS las variables de entorno, incluyendo los secretos.
//
//  ─────────────────────────────────────────────────────────
//  VALIDACIÓN ROBUSTA DE VARIABLES AL INICIAR LA APP
//  ─────────────────────────────────────────────────────────
//
//  Una técnica profesional es validar TODAS las variables
//  necesarias al inicio, antes de que la app empiece a servir
//  peticiones. Así detectas configuraciones faltantes de inmediato.
//
//   En tu index.js, DESPUÉS de require("dotenv").config():
//
//  const variablesRequeridas = ["MONGODB_URI", "JWT_SECRET", "PUERTO"];
//  const variablesFaltantes  = variablesRequeridas.filter(
//    (variable) => !process.env[variable]
//  );
//  if (variablesFaltantes.length > 0) {
//    console.error("❌ Faltan variables de entorno obligatorias:");
//    variablesFaltantes.forEach((v) => console.error(`   - ${v}`));
//    process.exit(1);
//  }
//  console.log("✅ Todas las variables de entorno están configuradas");
//
//  ─────────────────────────────────────────────────────────
//  LA ESTRUCTURA COMPLETA DE UNA CONEXIÓN CON .env
//  ─────────────────────────────────────────────────────────
//
//  .env (en tu computadora, no en GitHub):
//    MONGODB_URI=mongodb+srv://juan:Password@cluster.mongodb.net/miDB
//    PUERTO=3000
//    JWT_SECRET=x7kP9mN2qR5vL8hJ3wF6dA0cE4iB
//    NODE_ENV=development
//
//  index.js (en GitHub, seguro):
//    require("dotenv").config();
//    const mongoose = require("mongoose");
//
//    mongoose.connect(process.env.MONGODB_URI);
//     No hay contraseña en el código. Solo una referencia a la variable.
//
//  Cuando corres "node index.js":
//  1. dotenv.config() lee el .env y carga las variables
//  2. process.env.MONGODB_URI ya tiene el valor real
//  3. mongoose.connect() recibe la URI completa con la contraseña
//  4. La conexión se establece
//  ¡Pero la contraseña nunca estuvo en el código JavaScript!
//
// ============================================================
//  📄 PLANTILLA — COPIA ESTO A TU ARCHIVO .env
// ============================================================
//
//  INSTRUCCIONES:
//  ──────────────────────────────────────────────────────────
//  1. En VS Code, crea un archivo nuevo llamado exactamente:
//        .env
//     (con el punto al inicio, sin extensión después del punto)
//
//  2. Copia el bloque de texto que está entre los guiones de abajo.
//
//  3. Reemplaza cada valor con tus datos reales:
//     - TU_USUARIO → tu nombre de usuario de MongoDB Atlas
//     - TU_PASSWORD → tu contraseña de MongoDB Atlas
//     - XXXXX → los caracteres del cluster (los ves en Atlas → Connect)
//     - tiendaDB → el nombre de tu base de datos (puedes cambiarlo)
//
//  ¿Dónde encuentro la MONGODB_URI?
//  1. Ve a MongoDB Atlas (cloud.mongodb.com)
//  2. Haz clic en tu cluster → botón "Connect"
//  3. Selecciona "Drivers" → Node.js
//  4. Copia la URI que aparece en la sección "Connection string"
//  5. Reemplaza <password> con tu contraseña real
//  6. Reemplaza myFirstDatabase con el nombre de tu BD (ej: tiendaDB)
//
//  ──────────────────────────────────────────────────────────
//  COPIA DESDE AQUÍ ↓
//  ──────────────────────────────────────────────────────────
//
//  # ─────────────────────────────────────────────────────
//  # CONEXIÓN A MONGODB ATLAS
//  # ─────────────────────────────────────────────────────
//  # URI completa de conexión a MongoDB Atlas.
//  # La obtienes en: Atlas → tu Cluster → Connect → Drivers → Node.js
//  # Reemplaza TU_USUARIO, TU_PASSWORD y los demás valores.
//  MONGODB_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster0.XXXXX.mongodb.net/tiendaDB
//
//  # ─────────────────────────────────────────────────────
//  # SERVIDOR EXPRESS
//  # ─────────────────────────────────────────────────────
//  # Puerto donde correrá el servidor. 3000 es la convención de desarrollo.
//  # En producción, la plataforma (Railway, Heroku, etc.) lo define automáticamente.
//  PUERTO=3000
//
//  # ─────────────────────────────────────────────────────
//  # JWT (AUTENTICACIÓN)
//  # ─────────────────────────────────────────────────────
//  # Clave secreta para firmar los tokens JWT.
//  # Debe ser larga, aleatoria y DIFERENTE en producción.
//  # Nunca uses palabras del diccionario ni datos personales.
//  # Ejemplo de clave segura: openssl rand -base64 32 (en terminal Linux/Mac)
//  JWT_SECRET=cambia_esto_por_una_clave_larga_aleatoria_y_segura
//
//  # Tiempo de expiración del JWT de acceso.
//  # Formatos: "15m" = 15 minutos, "1h" = 1 hora, "7d" = 7 días.
//  # Para desarrollo puedes usar "7d". En producción usa "1h" o menos.
//  JWT_EXPIRES_IN=1h
//
//  # ─────────────────────────────────────────────────────
//  # ENTORNO DE EJECUCIÓN
//  # ─────────────────────────────────────────────────────
//  # Controla el comportamiento de Express, Mongoose y otras librerías.
//  # Valores: development | production | test
//  # En tu máquina: development. En el servidor real: production.
//  NODE_ENV=development
//
//  COPIA HASTA AQUÍ ↑
//  ──────────────────────────────────────────────────────────
//
// ============================================================
//  🧪 EJEMPLO PRÁCTICO — SIMULACIÓN DEL SISTEMA .env
// ============================================================
//
//  INSTRUCCIONES:
//  1. Abre la terminal (Ctrl + ñ)
//  2. Ejecuta: node env.ejemplo.js
//  3. Observa cómo el código lee y valida las variables de entorno
//
// ============================================================

"use strict"; // Modo estricto: lanza errores en código potencialmente problemático.

// ─────────────────────────────────────────────────────────
//  PASO 1: Cargar las variables de entorno desde el .env
// ─────────────────────────────────────────────────────────

require("dotenv").config();
// dotenv.config() lee el archivo .env y carga las variables en process.env.
//
// DEBE ser la primera línea ejecutable del archivo.
// Si pones algún require("express") u otro módulo antes,
// ese módulo podría intentar leer process.env.VARIABLE antes
// de que dotenv la haya cargado → valor undefined.
//
// Si no existe el archivo .env, dotenv.config() NO lanza un error.
// Simplemente no carga nada. Las variables no estarán disponibles.
// Por eso verificamos su existencia más adelante.

// ─────────────────────────────────────────────────────────
//  PASO 2: Definir las variables con valores por defecto
// ─────────────────────────────────────────────────────────

const MONGODB_URI  = process.env.MONGODB_URI;
// process.env.MONGODB_URI → el valor que pusiste en el .env.
// Si no existe el .env o no tiene esa variable → undefined.
// NO ponemos valor por defecto porque es un SECRETO.
// Si falta, preferimos fallar de forma visible y controlada.

const PUERTO = process.env.PUERTO || 3000;
// process.env.PUERTO → valor del .env (llega como string: "3000")
// || 3000 → si no está definido, usamos 3000 como fallback.
// Puerto NO es un secreto → tener un valor por defecto está bien.
// OJO: el valor del .env llega como STRING. Si necesitas número:
// const PUERTO = parseInt(process.env.PUERTO) || 3000;
// En Express, app.listen() acepta strings, así que no importa mucho.

const JWT_SECRET = process.env.JWT_SECRET;
// Clave secreta para firmar tokens JWT. Sin valor por defecto.
// Si falta en producción, el sistema de autenticación no debe funcionar.

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
// Tiempo de expiración del token. "1h" es un default razonable.
// No es un secreto (es solo una configuración de tiempo).

const NODE_ENV = process.env.NODE_ENV || "development";
// El entorno de ejecución. Si no está configurado, asumimos development.
// En producción, la plataforma cloud siempre lo configura explícitamente.

// ─────────────────────────────────────────────────────────
//  PASO 3: Mostrar el estado del entorno (con seguridad)
// ─────────────────────────────────────────────────────────

console.log("========================================");
console.log("  🔧 ANÁLISIS DE VARIABLES DE ENTORNO");
console.log("========================================\n");

console.log("  📁 Archivo .env:");
console.log("  ─────────────────────────────────────");

// Verificamos cada variable y mostramos su estado SIN revelar el valor real
const variables = [
  {
    nombre:      "MONGODB_URI",
    valor:       MONGODB_URI,
    esSecreto:   true,
    descripcion: "URI de conexión a MongoDB Atlas",
    ejemplo:     "mongodb+srv://usuario:password@cluster.mongodb.net/miDB",
    obligatoria: true,
  },
  {
    nombre:      "PUERTO",
    valor:       PUERTO,
    esSecreto:   false,
    // El puerto NO es un secreto. Cualquiera puede ver en qué puerto corre el servidor.
    descripcion: "Puerto del servidor Express",
    ejemplo:     "3000",
    obligatoria: false,
  },
  {
    nombre:      "JWT_SECRET",
    valor:       JWT_SECRET,
    esSecreto:   true,
    // JWT_SECRET SÍ es un secreto. Revelarlo comprometería la autenticación.
    descripcion: "Clave secreta para firmar tokens JWT",
    ejemplo:     "una_clave_larga_aleatoria_y_segura",
    obligatoria: true,
  },
  {
    nombre:      "JWT_EXPIRES_IN",
    valor:       JWT_EXPIRES_IN,
    esSecreto:   false,
    descripcion: "Tiempo de expiración del token JWT",
    ejemplo:     "1h, 15m, 7d",
    obligatoria: false,
  },
  {
    nombre:      "NODE_ENV",
    valor:       NODE_ENV,
    esSecreto:   false,
    descripcion: "Entorno de ejecución",
    ejemplo:     "development | production | test",
    obligatoria: false,
  },
];

variables.forEach(({ nombre, valor, esSecreto, descripcion, ejemplo, obligatoria }) => {
  // Para cada variable, determinamos si está configurada y cómo mostrarla.

  const estaConfigurada = valor !== undefined && valor !== null && valor !== "";
  // Una variable está "configurada" si tiene algún valor no vacío.
  // undefined → no existe en process.env (no está en el .env)
  // "" → existe pero está vacío (ej: JWT_SECRET= sin valor)

  const estado = estaConfigurada ? "✅" : (obligatoria ? "❌" : "⚠️");
  // ✅ = está configurada correctamente
  // ❌ = es obligatoria y NO está configurada → problema grave
  // ⚠️ = es opcional y no está configurada → usará el valor por defecto

  let valorMostrado;
  if (!estaConfigurada) {
    valorMostrado = "⟨no configurada⟩";
    // Valor especial para indicar que no se encontró en el .env
  } else if (esSecreto) {
    // Para las variables secretas, NUNCA mostramos el valor real.
    // Mostramos solo los primeros caracteres y asteriscos.
    const valorStr = String(valor);
    // String() convierte cualquier tipo a string (por si es número, etc.)

    if (valorStr.length <= 8) {
      // Si el valor es muy corto (posiblemente un placeholder como "secreto")
      valorMostrado = "*".repeat(valorStr.length);
      // "*".repeat(n) crea un string con n asteriscos.
      // "secreto".length = 7 → "*******"
    } else {
      // Si el valor es suficientemente largo (probablemente es real)
      valorMostrado = valorStr.substring(0, 4) + "*".repeat(8) + "... (" + valorStr.length + " caracteres)";
      // substring(0, 4) → primeros 4 caracteres
      // + "*".repeat(8) → 8 asteriscos
      // + "... (n caracteres)" → cuántos caracteres tiene en total
      // Ejemplo: "x7kP9mN2qR5v..." → "x7kP********... (32 caracteres)"
    }
  } else {
    valorMostrado = String(valor);
    // Para variables no secretas, mostramos el valor real.
    // Útil para confirmar que PUERTO=3000 o NODE_ENV=development.
  }

  console.log(`  ${estado} ${nombre}`);
  console.log(`     Descripción: ${descripcion}`);
  console.log(`     Valor:       ${valorMostrado}`);
  if (!estaConfigurada) {
    console.log(`     Ejemplo:     ${ejemplo}`);
    // Solo mostramos el ejemplo si la variable no está configurada.
    // Así el desarrollador sabe exactamente qué valor poner.
  }
  if (obligatoria && !estaConfigurada) {
    console.log(`     ⚠️  ¡ESTA VARIABLE ES OBLIGATORIA! La app no funcionará sin ella.`);
  }
  console.log(); // Línea en blanco para separar visualmente cada variable
});

// ─────────────────────────────────────────────────────────
//  PASO 4: Validación de variables obligatorias
// ─────────────────────────────────────────────────────────

console.log("  🔍 VALIDACIÓN DE VARIABLES OBLIGATORIAS:");
console.log("  ─────────────────────────────────────────");

const variablesObligatorias = ["MONGODB_URI", "JWT_SECRET"];
// Lista de variables que la app NECESITA para funcionar.
// Ajusta esta lista según lo que use tu proyecto.

const variablesFaltantes = variablesObligatorias.filter(
  (nombreVariable) => !process.env[nombreVariable]
  // process.env[nombreVariable] → acceso dinámico a una propiedad.
  // Es igual que process.env.MONGODB_URI pero usando una variable como nombre.
  // !process.env["MONGODB_URI"] → true si NO está definida (o es "")
  // .filter() devuelve un array con solo las variables que faltan.
);

if (variablesFaltantes.length === 0) {
  console.log("  ✅ Todas las variables obligatorias están configuradas.");
  console.log("     La app puede iniciarse correctamente.\n");
} else {
  console.log(`  ❌ Faltan ${variablesFaltantes.length} variable(s) obligatoria(s):`);
  variablesFaltantes.forEach((nombre) => {
    console.log(`     - ${nombre}`);
  });
  console.log("\n  📋 SOLUCIÓN:");
  console.log("     1. Crea un archivo .env en la raíz del proyecto");
  console.log("     2. Copia el contenido de este archivo env.ejemplo.js");
  console.log("     3. Reemplaza los valores de ejemplo con tus datos reales");
  console.log("     4. Guarda el .env y vuelve a ejecutar el servidor\n");

  // En una app real, aquí harías:
  // process.exit(1);
  // → Termina el proceso con código de error 1 (no es éxito).
  // → Impide que la app intente conectarse a MongoDB sin URI válida.
  // Lo comentamos para que el resto del script pueda ejecutarse en este ejemplo.
}

// ─────────────────────────────────────────────────────────
//  PASO 5: Mostrar información del entorno
// ─────────────────────────────────────────────────────────

console.log("  🌍 INFORMACIÓN DEL ENTORNO:");
console.log("  ─────────────────────────────────────");
console.log(`  Entorno (NODE_ENV):    ${NODE_ENV}`);
console.log(`  Puerto configurado:    ${PUERTO}`);
console.log(`  Expiración JWT:        ${JWT_EXPIRES_IN}`);
console.log(`  Versión de Node.js:    ${process.version}`);
// process.version → la versión de Node.js que está ejecutando el script.
// Ejemplo: "v20.11.0"
// Útil para confirmar que estás usando la versión correcta.

console.log(`  Plataforma del SO:     ${process.platform}`);
// process.platform → el sistema operativo.
// "win32" = Windows, "darwin" = macOS, "linux" = Linux.
// Útil para código que debe comportarse diferente por OS.

console.log(`  Directorio de trabajo: ${process.cwd()}`);
// process.cwd() = Current Working Directory.
// El directorio desde donde se ejecutó el comando "node env.ejemplo.js".
// Importante para entender desde dónde busca dotenv el archivo .env.
// dotenv busca el .env en el directorio de trabajo actual (cwd).

console.log();

// ─────────────────────────────────────────────────────────
//  PASO 6: Demostración de process.env completo
// ─────────────────────────────────────────────────────────

console.log("  🔎 DEMOSTRACIÓN: ¿QUÉ CONTIENE process.env?");
console.log("  ─────────────────────────────────────────────");
console.log("  process.env es un objeto con TODAS las variables de entorno.");
console.log("  Las del sistema operativo + las del archivo .env (vía dotenv).\n");

// Filtramos las variables de process.env para mostrar solo las relevantes.
// NO mostramos el process.env completo para no revelar variables del sistema.
const variablesDelProyecto = [
  "MONGODB_URI", "PUERTO", "JWT_SECRET", "JWT_EXPIRES_IN", "NODE_ENV"
];

console.log("  Variables del proyecto en process.env:");
variablesDelProyecto.forEach((nombre) => {
  const valor = process.env[nombre];
  // Acceso dinámico: process.env["MONGODB_URI"] === process.env.MONGODB_URI
  // La notación de corchetes permite usar variables como nombres de propiedad.

  if (valor) {
    // Si la variable tiene valor, mostramos que está presente.
    // Para los secretos NO mostramos el valor completo.
    const esSecreto = ["MONGODB_URI", "JWT_SECRET"].includes(nombre);
    // Array.includes() devuelve true si el elemento está en el array.

    const display = esSecreto
      ? `"${String(valor).substring(0, 6)}..." (${String(valor).length} chars)`
      : `"${valor}"`;
    // Operador ternario: condición ? valorSiTrue : valorSiFalse
    // Si es secreto → muestra primeros 6 chars + "..."
    // Si no es secreto → muestra el valor completo entre comillas

    console.log(`    process.env.${nombre} = ${display}`);
  } else {
    console.log(`    process.env.${nombre} = undefined (no configurada en .env)`);
  }
});

console.log();

// ─────────────────────────────────────────────────────────
//  PASO 7: Demostración del patrón de validación al inicio
// ─────────────────────────────────────────────────────────

console.log("  📋 PATRÓN RECOMENDADO para validar variables al inicio de tu app:");
console.log("  ────────────────────────────────────────────────────────────────");
console.log(`
  // ── En tu index.js ──────────────────────────────────────────
  require("dotenv").config(); // ← SIEMPRE PRIMERO

  // Lista de variables que tu app NECESITA para funcionar
  const requeridas = ["MONGODB_URI", "JWT_SECRET"];

  // Filtramos las que faltan
  const faltantes = requeridas.filter((v) => !process.env[v]);

  // Si alguna falta, detenemos la app con un error claro
  if (faltantes.length > 0) {
    console.error("❌ Variables de entorno faltantes:");
    faltantes.forEach((v) => console.error(\`   - \${v}\`));
    console.error("   Configura el archivo .env y vuelve a intentar.");
    process.exit(1); // Termina el proceso con código de error
  }

  // Si llegamos aquí, todas las variables están OK
  console.log("✅ Variables de entorno validadas correctamente");

  // Ahora sí podemos conectar a la BD y arrancar el servidor
  mongoose.connect(process.env.MONGODB_URI);
  app.listen(process.env.PUERTO || 3000);
  // ─────────────────────────────────────────────────────────────
`);

// ─────────────────────────────────────────────────────────
//  PASO 8: Demostración de cómo usar las variables en código real
// ─────────────────────────────────────────────────────────

console.log("  💡 CÓMO USAR LAS VARIABLES EN TU CÓDIGO:");
console.log("  ─────────────────────────────────────────────────────────────");

// Simulamos cómo se usarían en un proyecto real
const configuracion = {
  // Objeto de configuración centralizada (patrón recomendado).
  // En vez de leer process.env en mil lugares del código,
  // lo lees UNA VEZ aquí y exportas el objeto.
  // Así si cambia el nombre de una variable, solo cambias UN lugar.

  baseDeDatos: {
    uri:    MONGODB_URI || "⟨no configurada⟩",
    nombre: MONGODB_URI
      ? MONGODB_URI.split("/").pop().split("?")[0]
      // Extraemos el nombre de la BD de la URI:
      // "mongodb+srv://user:pass@cluster.net/tiendaDB?retryWrites=true"
      // .split("/") → [..., "tiendaDB?retryWrites=true"]
      // .pop()      → "tiendaDB?retryWrites=true" (último elemento)
      // .split("?") → ["tiendaDB", "retryWrites=true"]
      // [0]         → "tiendaDB"
      : "⟨no disponible⟩",
  },

  servidor: {
    puerto:  PUERTO,
    entorno: NODE_ENV,
    esDesarrollo: NODE_ENV === "development",
    // true si estamos en desarrollo, false en producción y test.
    esProduccion:  NODE_ENV === "production",
  },

  auth: {
    secretConfigurado: !!JWT_SECRET,
    // !! convierte cualquier valor a booleano:
    // !!"clave_larga" → true (el string no está vacío → truthy → !!truthy → true)
    // !!undefined     → false (undefined es falsy → !!falsy → false)
    // Así no revelamos el secreto pero sabemos si está configurado.
    expiresIn: JWT_EXPIRES_IN,
  },
};

console.log("\n  Configuración extraída de las variables de entorno:");
console.log(JSON.stringify(configuracion, null, 4));
// JSON.stringify(objeto, null, 4):
// - objeto: lo que queremos convertir a JSON
// - null: no usamos función de reemplazo personalizada
// - 4: 4 espacios de indentación para legibilidad

// ─────────────────────────────────────────────────────────
//  PASO 9: Resumen de buenas prácticas con checklist
// ─────────────────────────────────────────────────────────

console.log("\n\n  ✅ CHECKLIST DE SEGURIDAD CON VARIABLES DE ENTORNO:");
console.log("  ─────────────────────────────────────────────────────");

const checklist = [
  {
    item: ".env está en el .gitignore",
    verificacion: "Revisa que tu .gitignore contenga la línea: .env",
    critico: true,
  },
  {
    item: "No hay contraseñas en el código JavaScript (.js)",
    verificacion: "Busca en tus archivos: grep -r 'password' *.js (Linux/Mac)",
    critico: true,
  },
  {
    item: "El .env.example (o env.ejemplo.js) está en el repositorio",
    verificacion: "Permite que otros colaboradores sepan qué variables configurar",
    critico: false,
  },
  {
    item: "Las variables obligatorias se validan al inicio",
    verificacion: "Si falta MONGODB_URI o JWT_SECRET, la app debe detenerse con error claro",
    critico: true,
  },
  {
    item: "JWT_SECRET es largo y aleatorio",
    verificacion: "Mínimo 32 caracteres. Sin palabras del diccionario. Diferente en producción.",
    critico: true,
  },
  {
    item: "NODE_ENV=production en el servidor real",
    verificacion: "Express y otras librerías optimizan su comportamiento en modo producción",
    critico: false,
  },
  {
    item: "No hay console.log(process.env) en el código de producción",
    verificacion: "Imprimiría todos los secretos en los logs del servidor",
    critico: true,
  },
  {
    item: "Las variables de producción están en la plataforma cloud, no en .env",
    verificacion: "Railway, Heroku, Render → sección de Environment Variables",
    critico: false,
  },
];

checklist.forEach(({ item, verificacion, critico }) => {
  const icono = critico ? "🔴" : "🟡";
  // 🔴 = crítico (seguridad)
  // 🟡 = importante pero no crítico
  console.log(`\n  ${icono} ${item}`);
  console.log(`     → ${verificacion}`);
});

// ─────────────────────────────────────────────────────────
//  PASO 10: Mensaje final con las instrucciones clave
// ─────────────────────────────────────────────────────────

console.log("\n\n========================================");
console.log("  📋 RESUMEN DE INSTRUCCIONES");
console.log("========================================\n");

if (variablesFaltantes.length > 0) {
  console.log("  ❌ Tu .env no está configurado correctamente.");
  console.log("\n  PASOS PARA CONFIGURARLO:");
  console.log("  1. Crea el archivo .env en la raíz del proyecto");
  console.log("     (la misma carpeta donde está package.json)");
  console.log("\n  2. Copia este contenido en el .env:");
  console.log("  ──────────────────────────────────────────────");
  console.log("  MONGODB_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster0.XXXXX.mongodb.net/tiendaDB");
  console.log("  PUERTO=3000");
  console.log("  JWT_SECRET=pon_aqui_una_clave_larga_aleatoria_y_segura");
  console.log("  JWT_EXPIRES_IN=1h");
  console.log("  NODE_ENV=development");
  console.log("  ──────────────────────────────────────────────");
  console.log("\n  3. Reemplaza los valores con tus datos reales de MongoDB Atlas");
  console.log("  4. Guarda el archivo y ejecuta: node index.js\n");
} else {
  console.log("  ✅ Tu entorno está correctamente configurado.");
  console.log(`  🚀 Puedes iniciar tu servidor con: npm run dev\n`);
}

// ─────────────────────────────────────────────────────────
//  CONEXIÓN CON TU PROYECTO REAL
// ─────────────────────────────────────────────────────────

console.log("  🔗 CÓMO SE RELACIONA CON TU PROYECTO:");
console.log("  ─────────────────────────────────────────────────");
console.log("  index.js (o app.js):");
console.log('    require("dotenv").config();     // Lee el .env');
console.log('    mongoose.connect(process.env.MONGODB_URI);  // Usa la URI del .env');
console.log('    jwt.sign(payload, process.env.JWT_SECRET);  // Usa el secreto del .env');
console.log('    app.listen(process.env.PUERTO || 3000);     // Usa el puerto del .env');
console.log("\n  La app lee las variables → tus credenciales NUNCA están en el código.");
console.log("  El código va a GitHub. Las credenciales quedan en tu máquina.\n");

// ============================================================
//  📝 RESUMEN DE LO APRENDIDO
// ============================================================
//
//  1. Las variables de entorno guardan información sensible
//     (contraseñas, claves) FUERA del código fuente.
//
//  2. El archivo .env guarda esas variables en tu computadora.
//     NUNCA se sube a GitHub (está en .gitignore).
//
//  3. dotenv.config() lee el .env y carga las variables en
//     process.env para que tu código JS pueda usarlas.
//
//  4. process.env es el puente entre el sistema y tu código.
//     process.env.VARIABLE_NOMBRE → lee la variable.
//
//  5. El .env.example (o env.ejemplo.js) documenta qué variables
//     existen, SIN los valores reales. SÍ se sube a GitHub.
//
//  6. Valida las variables obligatorias al inicio con process.exit(1)
//     si alguna falta. Falla rápido, falla visible.
//
//  7. En producción no usas .env. Las variables se configuran
//     directamente en la plataforma (Railway, Heroku, etc.).
//
//  8. NODE_ENV controla el comportamiento de Express y otras
//     librerías: development (más logs, más errores visibles)
//     vs production (optimizado, errores ocultados al cliente).
// ============================================================