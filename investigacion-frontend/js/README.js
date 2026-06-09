// ============================================================
//  📘 README.js — INVESTIGACIÓN ANGULAR + TYPESCRIPT
// ============================================================
//
//  INVESTIGACIÓN: TypeScript + Angular CLI + Standalone Components
//  ═══════════════════════════════════════════════════════════════
//
//  ¿QUÉ ES ESTE PROYECTO?
//  ─────────────────────────────────────────────────────────
//
//  Este es un proyecto de APRENDIZAJE que cubre el stack de
//  desarrollo frontend con Angular y TypeScript.
//
//  Cada archivo es una investigación independiente con teoría
//  detallada y ejemplos de código comentados línea por línea.
//  El objetivo es que puedas leerlo, ejecutarlo y entenderlo
//  sin necesidad de otro material externo.
//
//  TECNOLOGÍAS DEL STACK:
//  ─────────────────────────────────────────────────────────
//
//  TypeScript → JavaScript con tipos estáticos.
//               Detecta errores ANTES de ejecutar el código.
//               Todo Angular está escrito en TypeScript.
//
//  Angular    → Framework frontend de Google para construir
//               aplicaciones web (SPAs) completas y robustas.
//               Incluye sistema de componentes, routing,
//               formularios, HTTP, testing y más.
//
//  Angular CLI → Herramienta de línea de comandos para crear
//                proyectos, generar archivos y compilar Angular.
//
// ══════════════════════════════════════════════════════════
//  📚 ARCHIVOS DE LA INVESTIGACIÓN
// ══════════════════════════════════════════════════════════
//
//  ──────────────────────────────────────────────────────────
//  01_typescript_fundamentos.ts                     [BÁSICO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué es TypeScript y por qué existe
//    - Cómo se diferencia de JavaScript
//    - Tipado de variables: string, number, boolean, any, unknown
//    - Arrays y tuplas tipados
//    - Objetos tipados con interfaces y type aliases
//    - Tipos de unión (|) e intersección (&)
//    - Tipos literales y enums
//    - El tipo especial: void, null, undefined, never
//    - Type assertions y type narrowing
//    - Tipos genéricos: Array<T>, Promise<T>, los tuyos
//    - Utility Types: Partial, Required, Readonly, Pick, Omit
//    - Configuración del tsconfig.json
//  Ejecutar: npx ts-node 01_typescript_fundamentos.ts
//
//  ──────────────────────────────────────────────────────────
//  02_typescript_funciones.ts                       [BÁSICO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Cómo tipar los parámetros de una función
//    - Cómo tipar el valor de retorno
//    - Parámetros opcionales (?), por defecto y rest (...)
//    - Tipos de funciones como variables y callbacks
//    - Sobrecarga de funciones (overloads)
//    - Funciones genéricas
//    - Cómo tipar async/await y Promises
//    - Buenas prácticas: inferencia vs anotación explícita
//  Ejecutar: npx ts-node 02_typescript_funciones.ts
//
//  ──────────────────────────────────────────────────────────
//  03_typescript_clases_interfaces.ts           [INTERMEDIO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Interfaces: qué son y cuándo usarlas
//    - Type aliases vs interfaces (diferencias reales)
//    - Clases en TypeScript: propiedades tipadas
//    - Modificadores de acceso: public, private, protected, readonly
//    - Implementar interfaces con implements
//    - Herencia con extends y super
//    - Clases abstractas
//    - Decoradores: qué son (base para Angular)
//    - Diferencia entre clase, interface y type en la práctica
//  Ejecutar: npx ts-node 03_typescript_clases_interfaces.ts
//
//  ──────────────────────────────────────────────────────────
//  04_typescript_buenas_practicas.ts            [INTERMEDIO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Por qué evitar 'any' y qué usar en su lugar
//    - strict mode: qué activa y por qué importa
//    - null safety: cómo manejar null y undefined correctamente
//    - Type narrowing: if, typeof, instanceof, in operator
//    - Discriminated unions: el patrón más poderoso de TypeScript
//    - Non-null assertion (!) cuándo está bien usarlo
//    - Organización del código: exportar tipos, barrel exports
//    - Patrones comunes en proyectos Angular reales
//  Ejecutar: npx ts-node 04_typescript_buenas_practicas.ts
//
//  ──────────────────────────────────────────────────────────
//  05_angular_cli.ts                                [BÁSICO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué es Angular CLI y qué problema resuelve
//    - Cómo instalar Angular CLI globalmente
//    - ng new: crear un proyecto Angular desde cero
//    - ng serve: ejecutar el servidor de desarrollo
//    - ng generate: crear componentes, servicios, módulos, etc.
//    - ng build: compilar para producción
//    - ng test: ejecutar tests con Jest/Karma
//    - ng lint: verificar calidad del código
//    - ng update: actualizar Angular y dependencias
//    - ng add: agregar librerías con ng add
//    - Las flags más importantes de cada comando
//    - angular.json: el archivo de configuración del CLI
//  Ejecutar: node 05_angular_cli.ts  (es solo informativo)
//
//  ──────────────────────────────────────────────────────────
//  06_estructura_proyecto_angular.ts                [BÁSICO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - La estructura completa de un proyecto Angular nuevo
//    - Para qué sirve cada carpeta y cada archivo
//    - src/, app/, assets/, environments/ explicados
//    - main.ts: el punto de entrada de la aplicación
//    - app.config.ts: la configuración de la app (nueva forma)
//    - angular.json: qué configura el CLI aquí
//    - tsconfig.json y tsconfig.app.json
//    - package.json en un proyecto Angular
//    - Los archivos que SÍ y NO se suben a GitHub
//    - Cómo escalar la estructura para proyectos grandes
//  Ejecutar: node 06_estructura_proyecto_angular.ts
//
//  ──────────────────────────────────────────────────────────
//  07_standalone_components.ts                  [INTERMEDIO]
//  ──────────────────────────────────────────────────────────
//  ¿Qué aprenderás?
//    - Qué eran los NgModules y sus problemas
//    - Qué son los Standalone Components (Angular 17+)
//    - Por qué son el futuro (y el presente) de Angular
//    - Cómo crear un Standalone Component
//    - El decorador @Component explicado campo por campo
//    - selector, template, styles, imports
//    - Cómo importar otros componentes standalone
//    - Cómo importar directivas: NgIf, NgFor, NgClass
//    - Comunicación entre componentes: @Input y @Output
//    - Signals: la nueva forma reactiva de Angular 17+
//    - Diferencias clave con la arquitectura de módulos
//    - Cuándo todavía necesitas módulos
//  Ejecutar: node 07_standalone_components.ts
//
// ══════════════════════════════════════════════════════════
//  🛠️  CONFIGURACIÓN — CÓMO EJECUTAR LOS ARCHIVOS .ts
// ══════════════════════════════════════════════════════════
//
//  PASO 1 — Instalar Node.js y npm
//  ─────────────────────────────────────────────────────────
//  Descarga la versión LTS desde: https://nodejs.org
//  Verifica: node --version  y  npm --version
//
//  PASO 2 — Instalar TypeScript y ts-node globalmente
//  ─────────────────────────────────────────────────────────
//  npm install -g typescript ts-node
//
//  typescript → el compilador de TypeScript (tsc)
//  ts-node    → ejecuta archivos .ts directamente sin compilar
//               (como si fuera 'node' pero para TypeScript)
//
//  Verifica: tsc --version  y  ts-node --version
//
//  PASO 3 — Instalar Angular CLI
//  ─────────────────────────────────────────────────────────
//  npm install -g @angular/cli
//
//  Verifica: ng version
//
//  PASO 4 — Ejecutar los archivos de investigación
//  ─────────────────────────────────────────────────────────
//  Para archivos .ts:
//    npx ts-node 01_typescript_fundamentos.ts
//
//  Para archivos .js (los informativos):
//    node 05_angular_cli.ts
//    node 06_estructura_proyecto_angular.ts
//    node 07_standalone_components.ts
//
// ══════════════════════════════════════════════════════════
//  🔧 COMANDOS RÁPIDOS DE REFERENCIA
// ══════════════════════════════════════════════════════════
//
//  TYPESCRIPT:
//  tsc archivo.ts              → Compila .ts a .js
//  tsc --init                  → Crea tsconfig.json
//  tsc --watch                 → Compila en modo watch (auto)
//  npx ts-node archivo.ts      → Ejecuta .ts directamente
//
//  ANGULAR CLI:
//  ng new mi-app               → Crear proyecto nuevo
//  ng serve                    → Servidor de desarrollo (localhost:4200)
//  ng generate component nombre → Crear componente
//  ng generate service nombre  → Crear servicio
//  ng build                    → Compilar para producción
//  ng build --configuration production → Build optimizado
//  ng test                     → Correr tests
//  ng lint                     → Verificar código
//  ng update                   → Actualizar Angular
//  ng add @angular/material    → Agregar Angular Material
//
// ══════════════════════════════════════════════════════════
//  📋 GLOSARIO RÁPIDO
// ══════════════════════════════════════════════════════════
//
//  TypeScript    → JS con tipos. Detecta errores en tiempo de desarrollo.
//  Angular       → Framework frontend de Google para SPAs.
//  SPA           → Single Page Application: una sola página HTML.
//  CLI           → Command Line Interface: herramienta de terminal.
//  Componente    → Bloque reutilizable de UI (HTML + CSS + TypeScript).
//  Standalone    → Componente sin NgModule, se importa directamente.
//  NgModule      → Sistema antiguo de Angular para organizar código.
//  Decorador     → @Component, @Injectable — metadatos de clases.
//  Template      → El HTML que renderiza un componente.
//  Binding       → Conexión entre TypeScript y el template HTML.
//  Signal        → Nueva forma reactiva de manejar estado en Angular 17+.
//  Directive     → Instrucción que modifica el DOM: NgIf, NgFor, NgClass.
//  Service       → Clase para lógica compartida e inyección de dependencias.
//  DI            → Dependency Injection: patrón para inyectar servicios.
//  tsconfig.json → Archivo de configuración del compilador TypeScript.
//  angular.json  → Archivo de configuración del Angular CLI.
//
// ══════════════════════════════════════════════════════════
//  🔗 RECURSOS PARA SEGUIR APRENDIENDO
// ══════════════════════════════════════════════════════════
//
//  Documentación oficial:
//  TypeScript:  https://www.typescriptlang.org/docs
//  Angular:     https://angular.dev  (nueva doc oficial)
//  Angular CLI: https://angular.dev/tools/cli
//
//  Playground online (sin instalar nada):
//  TypeScript:  https://www.typescriptlang.org/play
//  Angular:     https://stackblitz.com/fork/angular
//
// ============================================================

console.log("╔══════════════════════════════════════════════════════╗");
console.log("║   📘 INVESTIGACIÓN: ANGULAR + TYPESCRIPT             ║");
console.log("╚══════════════════════════════════════════════════════╝\n");
console.log("  Archivos de la investigación:");
console.log("  01_typescript_fundamentos.ts    → Tipos de datos");
console.log("  02_typescript_funciones.ts      → Tipar funciones");
console.log("  03_typescript_clases_interfaces.ts → Clases e interfaces");
console.log("  04_typescript_buenas_practicas.ts  → Buenas prácticas");
console.log("  05_angular_cli.ts               → Angular CLI");
console.log("  06_estructura_proyecto_angular.ts  → Estructura del proyecto");
console.log("  07_standalone_components.ts     → Standalone Components\n");
console.log("  Para ejecutar archivos .ts:");
console.log("  npx ts-node nombre_del_archivo.ts\n");