// ============================================================
//  📄 gitignore.js — EXPLICACIÓN DEL ARCHIVO .gitignore
// ============================================================
//
//  ¿QUÉ ES EL ARCHIVO .gitignore?
//  ────────────────────────────────
//  Es un archivo de texto que le dice a Git qué archivos o
//  carpetas debe IGNORAR, es decir, que NO debe subir al
//  repositorio en GitHub.
//
//  Se llama exactamente: .gitignore (con punto, sin extensión)
//  Va en la carpeta raíz del proyecto.
//
//  ¿POR QUÉ ES IMPORTANTE?
//  ────────────────────────
//  Hay archivos que NO deben subirse a GitHub:
//
//  1. node_modules/
//     La carpeta donde npm guarda todos los paquetes instalados.
//     Puede pesar cientos de MB. No tiene sentido subirla porque
//     cualquiera puede regenerarla con solo correr: npm install
//
//  2. .env
//     Contiene contraseñas, claves secretas y URLs de bases de
//     datos. Si lo subes a GitHub, cualquier persona en internet
//     puede ver y usar tus credenciales. Es un riesgo de seguridad.
//
//  ¿CÓMO CREAR EL .gitignore?
//  ───────────────────────────
//  1. En VS Code, en la raíz del proyecto crea un archivo nuevo
//  2. Nómbralo exactamente: .gitignore
//  3. Pega el siguiente contenido:
//
// ============================================================
//
//  CONTENIDO PARA COPIAR EN TU ARCHIVO .gitignore:
//  ─────────────────────────────────────────────────
//
//  # Dependencias — se regeneran con: npm install
//  node_modules/
//
//  # Variables de entorno — contienen contraseñas reales
//  .env
//  .env.local
//  .env.production
//
//  # Archivos del sistema operativo
//  .DS_Store
//  Thumbs.db
//
//  # Logs de Node.js y npm
//  *.log
//  npm-debug.log*
//
//  # Carpetas de compilación/build
//  dist/
//  build/
//  coverage/
//
// ============================================================

console.log("📄 Este archivo explica qué es el .gitignore.");
console.log("   Crea un archivo llamado .gitignore en la raíz del proyecto");
console.log("   y pega el contenido que aparece en los comentarios de arriba.");