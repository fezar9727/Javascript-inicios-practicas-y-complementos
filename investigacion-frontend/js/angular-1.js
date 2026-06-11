// ============================================================
//  📘 INVESTIGACIÓN #1 — ¿QUÉ ES ANGULAR CLI?
// ============================================================
//
//  NOTA: Este archivo es .js para ejecutarlo con Node.js.
//  Todo el código Angular/TypeScript está en los COMENTARIOS.
//  Ejecutar: node 05_angular_cli.js
//
// ============================================================
//
//  ¿QUÉ ES ANGULAR CLI?
//  ─────────────────────────────────────────────────────────
//
//  CLI = Command Line Interface (Interfaz de Línea de Comandos).
//  Angular CLI es una herramienta oficial del equipo de Angular
//  que te permite crear, desarrollar, compilar y desplegar
//  aplicaciones Angular desde la terminal.
//
//  Sin Angular CLI tendrías que:
//  → Configurar Webpack manualmente (cientos de líneas)
//  → Configurar TypeScript manualmente
//  → Configurar el servidor de desarrollo manualmente
//  → Crear cada componente/servicio/pipe a mano con su estructura
//  → Configurar las pruebas unitarias manualmente
//  → Configurar la optimización del build de producción
//
//  Con Angular CLI:
//  → ng new mi-app         → proyecto completo en 2 minutos
//  → ng serve              → servidor de desarrollo en 1 segundo
//  → ng generate component → componente completo en 1 segundo
//  → ng build              → build optimizado de producción
//
//  ES UNA HERRAMIENTA DE PRODUCTIVIDAD. No es parte de Angular
//  en sí mismo, es una herramienta EXTERNA que trabaja con Angular.
//
//  ANALOGÍA:
//  Angular CLI es como un "asistente de construcción":
//  tú dices "quiero una habitación nueva" y él construye
//  los muros, el techo y las conexiones automáticamente.
//  Sin él, tendrías que hacerlo ladrillo por ladrillo.
//
//  ─────────────────────────────────────────────────────────
//  CÓMO INSTALAR ANGULAR CLI
//  ─────────────────────────────────────────────────────────
//
//  Angular CLI se instala GLOBALMENTE con npm.
//  "Global" significa que lo instalas una sola vez en tu
//  computadora y está disponible en todos tus proyectos.
//
//  PASO 1 — Verificar que tienes Node.js instalado:
//  node --version          → debe mostrar v18+ o v20+
//  npm --version           → debe mostrar 9+ o 10+
//
//  PASO 2 — Instalar Angular CLI globalmente:
//  npm install -g @angular/cli
//
//  El -g significa "global". Sin -g, solo se instalaría en el
//  proyecto actual y no podría usarse desde cualquier carpeta.
//
//  PASO 3 — Verificar la instalación:
//  ng version
//
//  Resultado esperado:
//  Angular CLI: 17.x.x  (o la versión más reciente)
//  Node: 20.x.x
//  Package Manager: npm 10.x.x
//  OS: Windows/macOS/Linux
//
//  PASO 4 — Actualizar Angular CLI si ya lo tienes:
//  npm uninstall -g @angular/cli
//  npm install -g @angular/cli@latest
//  ng version
//
//  ─────────────────────────────────────────────────────────
//  VERSIONES DE ANGULAR — CONTEXTO HISTÓRICO
//  ─────────────────────────────────────────────────────────
//
//  AngularJS (2010) = framework original v1.x (MUY diferente)
//  Angular 2  (2016) = reescritura COMPLETA con TypeScript
//  Angular 4  (2017) = saltan el 3 por conflicto de versiones
//  Angular 6  (2018) = introduce Angular Elements
//  Angular 9  (2020) = Ivy renderer (compilador más rápido)
//  Angular 14 (2022) = Standalone Components (preview)
//  Angular 15 (2022) = Standalone Components estables
//  Angular 16 (2023) = Signals (nuevo sistema reactivo)
//  Angular 17 (2023) = @if @for @switch en templates, nuevo logo
//  Angular 18 (2024) = zoneless change detection
//  Angular 19 (2024) = mejoras en signals y performance
//
//  IMPORTANTE: "AngularJS" y "Angular" son frameworks DIFERENTES.
//  Cuando decimos "Angular" hoy nos referimos a Angular 2+.
//  Esta investigación cubre Angular 17+.

"use strict";

// ════════════════════════════════════════════════════════
//  BLOQUE 1: COMANDO ng new — Crear un proyecto Angular
// ════════════════════════════════════════════════════════
//
//  'ng new' es el primer comando que usas. Crea la estructura
//  completa de un proyecto Angular con toda la configuración.
//
//  ── SINTAXIS BÁSICA ──────────────────────────────────────
//
//  ng new nombre-del-proyecto
//
//  Ejemplo:
//  ng new city-soul-echoes-frontend
//
//  Angular CLI te hará estas preguntas:
//  1. "Would you like to add Angular routing?" → YES (recomendado)
//  2. "Which stylesheet format?" → CSS (o SCSS si prefieres)
//
//  ── FLAGS MÁS IMPORTANTES ────────────────────────────────
//
//  ng new mi-app --routing
//  → Crea el archivo de rutas automáticamente (app.routes.ts)
//  → Equivale a responder "Yes" a la pregunta de routing
//
//  ng new mi-app --style=scss
//  → Usa SCSS en lugar de CSS
//  → Opciones: css, scss, sass, less
//
//  ng new mi-app --standalone
//  → Crea el proyecto usando Standalone Components (Angular 17+)
//  → Es la forma MODERNA y recomendada (veremos en investigación #7)
//  → En Angular 17+ ya es el comportamiento por defecto
//
//  ng new mi-app --skip-tests
//  → No genera archivos .spec.ts (de pruebas unitarias)
//  → Útil cuando estás aprendiendo y no harás tests todavía
//
//  ng new mi-app --minimal
//  → Crea el proyecto con la configuración mínima posible
//  → Sin archivos de test, sin README extra
//
//  ng new mi-app --dry-run
//  → SIMULA la creación sin crear ningún archivo
//  → Ideal para ver qué archivos se crearían antes de hacerlo
//  → Muy útil también en ng generate (lo veremos más adelante)
//
//  ── EJEMPLO COMPLETO DE UN PROYECTO REAL ─────────────────
//
//  ng new tienda-angular \
//    --routing \
//    --style=scss \
//    --standalone
//
//  Crea:
//  tienda-angular/
//  ├── src/
//  │   ├── app/
//  │   │   ├── app.component.ts
//  │   │   ├── app.component.html
//  │   │   ├── app.component.scss
//  │   │   ├── app.component.spec.ts
//  │   │   ├── app.config.ts         ← config de la app (standalone)
//  │   │   └── app.routes.ts         ← rutas de la app
//  │   ├── assets/
//  │   ├── index.html
//  │   ├── main.ts
//  │   └── styles.scss
//  ├── angular.json
//  ├── package.json
//  ├── tsconfig.json
//  └── tsconfig.app.json

// ════════════════════════════════════════════════════════
//  BLOQUE 2: COMANDO ng serve — Servidor de desarrollo
// ════════════════════════════════════════════════════════
//
//  'ng serve' inicia el servidor de desarrollo local.
//  Compila la app, la sirve en un puerto local y
//  recarga automáticamente cuando guardas cambios.
//
//  ── SINTAXIS Y FLAGS ─────────────────────────────────────
//
//  ng serve
//  → Inicia en http://localhost:4200 (puerto por defecto)
//  → Hot Module Replacement: recarga solo los módulos que cambiaron
//  → Detener con: Ctrl + C
//
//  ng serve --port 4201
//  → Cambia el puerto si el 4200 está ocupado
//
//  ng serve --open
//  → Abre el navegador automáticamente al iniciar
//  → Alias: ng serve -o
//
//  ng serve --host 0.0.0.0
//  → Hace la app accesible desde otros dispositivos en la red local
//  → Útil para probar en tu celular mientras desarrollas
//
//  ng serve --configuration production
//  → Sirve la app con optimizaciones de producción
//  → Más lento de compilar pero muestra cómo quedará en producción
//
//  ng serve --poll 1000
//  → Usa polling en lugar de file watching (útil en Windows con WSL)
//  → El número es el intervalo en milisegundos
//
//  ── LO QUE HACE ng serve POR DETRÁS ─────────────────────
//
//  1. Lee angular.json para saber la configuración del proyecto
//  2. Compila TypeScript a JavaScript con el compilador de Angular
//  3. Empaqueta los archivos con esbuild (Angular 17+) o Webpack
//  4. Inicia un servidor HTTP local en el puerto 4200
//  5. Observa cambios en los archivos con file watchers
//  6. Cuando detecta un cambio, recompila SOLO lo necesario
//  7. Envía la actualización al navegador (sin recargar la página)
//
//  Tiempo de compilación típico:
//  Primera compilación: 3-8 segundos
//  Recompilaciones siguientes: 0.1-0.5 segundos (incremental)

// ════════════════════════════════════════════════════════
//  BLOQUE 3: COMANDO ng generate — Generar archivos
//  El comando más usado del día a día con Angular CLI
// ════════════════════════════════════════════════════════
//
//  'ng generate' (o 'ng g' como alias corto) crea archivos
//  con la estructura correcta de Angular automáticamente.
//  Nunca más crearás un componente a mano.
//
//  ── GENERAR COMPONENTES ───────────────────────────────────
//
//  ng generate component nombre
//  → Crea 4 archivos: .ts, .html, .css/.scss, .spec.ts
//  → Actualiza automáticamente las importaciones necesarias
//  → Alias: ng g c nombre
//
//  Ejemplo:
//  ng g c productos/lista-productos
//
//  Crea:
//  src/app/productos/lista-productos/
//  ├── lista-productos.component.ts
//  ├── lista-productos.component.html
//  ├── lista-productos.component.css
//  └── lista-productos.component.spec.ts
//
//  IMPORTANTE — Flags para componentes:
//
//  ng g c header --standalone
//  → Genera componente standalone (sin NgModule)
//  → En proyectos Angular 17+ ya es el default
//
//  ng g c footer --inline-template
//  → El template HTML va DENTRO del archivo .ts (no archivo .html separado)
//  → Útil para componentes muy pequeños
//  → Alias: --inline-template o -t
//
//  ng g c sidebar --inline-style
//  → El CSS va DENTRO del archivo .ts (no archivo .css separado)
//  → Alias: --inline-style o -s
//
//  ng g c boton --skip-tests
//  → No genera el archivo .spec.ts de pruebas
//
//  ng g c header --dry-run
//  → SIMULA la creación y muestra qué archivos se crearían
//  → Úsalo siempre antes de generar algo para verificar la ruta
//
//  ── GENERAR SERVICIOS ─────────────────────────────────────
//
//  ng generate service nombre
//  ng g s nombre
//
//  Ejemplo:
//  ng g s servicios/productos
//
//  Crea:
//  src/app/servicios/
//  ├── productos.service.ts
//  └── productos.service.spec.ts
//
//  El archivo .service.ts generado:
//
//  import { Injectable } from '@angular/core';
//
//  @Injectable({
//    providedIn: 'root'   // disponible en toda la app
//  })
//  export class ProductosService {
//    constructor() { }
//  }
//
//  ── GENERAR INTERFACES ────────────────────────────────────
//
//  ng generate interface nombre
//  ng g i nombre
//
//  Ejemplo:
//  ng g i modelos/producto
//
//  Crea:
//  src/app/modelos/producto.ts
//
//  Contenido:
//  export interface Producto {
//  }
//
//  ── GENERAR PIPES ─────────────────────────────────────────
//
//  ng generate pipe nombre
//  ng g p nombre
//
//  Ejemplo:
//  ng g p pipes/moneda
//
//  Crea un pipe para transformar datos en el template:
//
//  @Pipe({
//    name: 'moneda',
//    standalone: true,
//    pure: true
//  })
//  export class MonedaPipe implements PipeTransform {
//    transform(valor: number, simbolo: string = '$'): string {
//      return `${simbolo}${valor.toFixed(2)}`;
//    }
//  }
//
//  Uso en el template: {{ producto.precio | moneda }}
//  → "$25.00"
//
//  ── GENERAR GUARDS (PROTECTORES DE RUTAS) ─────────────────
//
//  ng generate guard nombre
//  ng g guard nombre
//
//  Ejemplo:
//  ng g guard guards/auth
//
//  Crea un guard para proteger rutas:
//  Si el usuario no está autenticado, no puede entrar a esa ruta.
//
//  ── GENERAR DIRECTIVAS ────────────────────────────────────
//
//  ng generate directive nombre
//  ng g d nombre
//
//  Ejemplo:
//  ng g d directivas/resaltar
//
//  Modifica el comportamiento o apariencia de elementos HTML.
//
//  ── GENERAR MÓDULOS (forma clásica, aún válida) ───────────
//
//  ng generate module nombre
//  ng g m nombre
//
//  ng g m productos --routing
//  → Crea un módulo con su propio archivo de rutas
//  → Usado en la arquitectura de módulos (anterior a Standalone)
//
//  ── TABLA RESUMEN DE ng generate ─────────────────────────
//
//  Comando largo             Alias    Qué crea
//  ─────────────────────────────────────────────────────────
//  ng g component nombre     ng g c   Componente (ts+html+css+spec)
//  ng g service nombre       ng g s   Servicio con @Injectable
//  ng g interface nombre     ng g i   Interface de TypeScript
//  ng g class nombre         ng g cl  Clase de TypeScript
//  ng g enum nombre          ng g e   Enum de TypeScript
//  ng g pipe nombre          ng g p   Pipe para templates
//  ng g directive nombre     ng g d   Directiva
//  ng g guard nombre         ng g g   Guard de ruta
//  ng g module nombre        ng g m   NgModule (forma clásica)
//  ng g resolver nombre      ng g r   Resolver de ruta
//  ng g interceptor nombre   —        HTTP Interceptor

// ════════════════════════════════════════════════════════
//  BLOQUE 4: COMANDO ng build — Compilar para producción
// ════════════════════════════════════════════════════════
//
//  'ng build' compila la aplicación para producción.
//  El resultado es código JavaScript optimizado que puedes
//  subir a cualquier servidor web (Netlify, Vercel, etc.)
//
//  ── COMANDOS ─────────────────────────────────────────────
//
//  ng build
//  → Genera el build de producción en la carpeta dist/
//  → Minifica el código JavaScript y CSS
//  → Elimina código no usado (Tree-shaking)
//  → Genera hashes en los nombres de archivos (caché)
//
//  ng build --configuration production
//  → Igual que ng build (production es el default)
//
//  ng build --configuration development
//  → Build de desarrollo: sin minificación, más rápido
//  → Útil para inspeccionar el código generado
//
//  ng build --stats-json
//  → Genera un archivo JSON con estadísticas del bundle
//  → Lo puedes analizar en webpack-bundle-analyzer
//
//  ── QUÉ GENERA ng build ──────────────────────────────────
//
//  dist/
//  └── nombre-app/
//      ├── index.html               ← HTML principal
//      ├── main-[hash].js           ← Código de la app
//      ├── polyfills-[hash].js      ← Compatibilidad navegadores
//      ├── styles-[hash].css        ← Estilos globales
//      └── assets/                  ← Imágenes y archivos estáticos
//
//  Los hashes en los nombres (ej: main-3a7f8d.js) garantizan
//  que el navegador descargue el archivo nuevo cuando la app cambia.
//  Sin hash, el navegador usaría la versión en caché (vieja).
//
//  ── TAMAÑOS TÍPICOS DE UN BUILD DE PRODUCCIÓN ────────────
//
//  main.js          ~200-500 KB (código de tu app)
//  polyfills.js     ~30-50 KB   (soporte de navegadores)
//  styles.css       ~10-50 KB   (estilos compilados)
//
//  Con lazy loading (carga perezosa de rutas), los archivos
//  se dividen en chunks más pequeños que se descargan solo
//  cuando el usuario navega a esa sección.

// ════════════════════════════════════════════════════════
//  BLOQUE 5: COMANDO ng test — Pruebas unitarias
// ════════════════════════════════════════════════════════
//
//  'ng test' ejecuta las pruebas unitarias del proyecto.
//  Por defecto usa Karma como test runner y Jasmine como
//  framework de aserciones.
//
//  ng test
//  → Ejecuta todos los archivos .spec.ts del proyecto
//  → Abre un navegador con el reporte de resultados
//  → Observa cambios y re-ejecuta las pruebas automáticamente
//
//  ng test --watch=false
//  → Ejecuta las pruebas una vez y termina (sin observar cambios)
//  → Ideal para CI/CD (entornos de integración continua)
//
//  ng test --code-coverage
//  → Genera un reporte de cobertura de código
//  → Muestra qué porcentaje del código está siendo probado
//  → El reporte se guarda en coverage/
//
//  ── EJEMPLO DE PRUEBA UNITARIA ───────────────────────────
//
//  // productos.service.spec.ts
//  describe('ProductosService', () => {
//    let service: ProductosService;
//
//    beforeEach(() => {
//      TestBed.configureTestingModule({});
//      service = TestBed.inject(ProductosService);
//    });
//
//    it('should be created', () => {
//      expect(service).toBeTruthy();
//    });
//
//    it('should return product list', () => {
//      const productos = service.getAll();
//      expect(productos.length).toBeGreaterThan(0);
//    });
//  });

// ════════════════════════════════════════════════════════
//  BLOQUE 6: COMANDO ng lint — Verificar calidad del código
// ════════════════════════════════════════════════════════
//
//  'ng lint' verifica el código con ESLint y reporta problemas
//  de calidad, estilo y posibles bugs.
//
//  ng lint
//  → Analiza todos los archivos TypeScript del proyecto
//  → Reporta errores y advertencias según las reglas configuradas
//
//  ng lint --fix
//  → Intenta corregir automáticamente los problemas que puede
//  → No puede corregir todo, solo los que tienen autofix disponible
//
//  ── QUÉ DETECTA ng lint ──────────────────────────────────
//
//  → Variables declaradas pero no usadas
//  → Uso de 'any' cuando debería haber un tipo específico
//  → Imports no usados
//  → Funciones demasiado largas
//  → Nombres de variables que no siguen las convenciones
//  → Problemas de accesibilidad en templates HTML

// ════════════════════════════════════════════════════════
//  BLOQUE 7: COMANDO ng update — Actualizar dependencias
// ════════════════════════════════════════════════════════
//
//  'ng update' actualiza Angular y sus dependencias de forma
//  segura, aplicando los "migration scripts" automáticamente.
//
//  ng update
//  → Muestra qué paquetes tienen actualizaciones disponibles
//
//  ng update @angular/core @angular/cli
//  → Actualiza Angular core y CLI a la última versión compatible
//
//  ng update @angular/core@17
//  → Actualiza a una versión específica
//
//  ── POR QUÉ ES MEJOR ng update QUE npm update ────────────
//
//  Angular a veces hace cambios que "rompen" código existente
//  (breaking changes). Cuando actualizas con 'ng update',
//  el CLI ejecuta scripts de migración automáticos que:
//  → Actualizan la sintaxis deprecada en tus archivos
//  → Cambian configuraciones que ya no son válidas
//  → Te avisan de lo que no pudo migrar automáticamente
//
//  Con 'npm update' solo cambias la versión del paquete
//  pero tu código queda desactualizado y puede romperse.

// ════════════════════════════════════════════════════════
//  BLOQUE 8: COMANDO ng add — Agregar librerías integradas
// ════════════════════════════════════════════════════════
//
//  'ng add' instala una librería Y la configura automáticamente
//  en el proyecto. Es diferente a 'npm install'.
//
//  ng add @angular/material
//  → Instala Angular Material (librería de UI de Google)
//  → Configura los temas, estilos e importaciones automáticamente
//  → Te pregunta el tema de colores que quieres
//
//  ng add @angular/pwa
//  → Convierte tu app en una Progressive Web App
//  → Genera el service worker y el manifest automáticamente
//
//  ng add @ngrx/store
//  → Instala NgRx (gestión de estado) y lo configura
//
//  ng add @angular/fire
//  → Integra Firebase con la aplicación Angular
//
//  ── DIFERENCIA: ng add vs npm install ────────────────────
//
//  npm install @angular/material
//  → Solo descarga el paquete. Tú debes configurar todo a mano.
//
//  ng add @angular/material
//  → Descarga el paquete + ejecuta un "schematic" que configura
//    automáticamente los estilos, módulos y todo lo necesario.

// ════════════════════════════════════════════════════════
//  BLOQUE 9: angular.json — El archivo de configuración del CLI
//  El "cerebro" de Angular CLI en tu proyecto
// ════════════════════════════════════════════════════════
//
//  angular.json es el archivo que Angular CLI lee para saber
//  cómo comportarse en TU proyecto específico.
//
//  ESTRUCTURA SIMPLIFICADA:
//  {
//    "projects": {
//      "nombre-app": {
//        "architect": {
//          "build": {
//            "options": {
//              "outputPath": "dist/nombre-app",
//              "index": "src/index.html",
//              "browser": "src/main.ts",
//              "polyfills": ["zone.js"],
//              "tsConfig": "tsconfig.app.json",
//              "assets": [
//                { "glob": "**/*", "input": "public" }
//              ],
//              "styles": ["src/styles.css"],
//              "scripts": []
//            },
//            "configurations": {
//              "production": {
//                "budgets": [
//                  {
//                    "type": "initial",
//                    "maximumWarning": "500kb",
//                    "maximumError": "1mb"
//                    // Si el bundle supera 1mb, el build FALLA
//                    // Esto fuerza buenas prácticas de tamaño
//                  }
//                ],
//                "outputHashing": "all"
//                // Los archivos tendrán hash en producción
//              }
//            }
//          },
//          "serve": {
//            "options": {
//              "buildTarget": "nombre-app:build"
//            }
//          },
//          "test": { ... }
//        }
//      }
//    }
//  }
//
//  CONFIGURACIONES COMUNES QUE PUEDES CAMBIAR:
//
//  → Cambiar el puerto por defecto de ng serve:
//    "serve": { "options": { "port": 3000 } }
//
//  → Agregar archivos CSS globales (Bootstrap, etc.):
//    "styles": ["src/styles.css", "node_modules/bootstrap/dist/css/bootstrap.min.css"]
//
//  → Agregar scripts globales (jQuery, etc.):
//    "scripts": ["node_modules/jquery/dist/jquery.min.js"]
//
//  → Agregar carpetas de assets adicionales:
//    "assets": ["public", { "glob": "**/*", "input": "src/assets/" }]

// ════════════════════════════════════════════════════════
//  BLOQUE 10: BUENAS Y MALAS PRÁCTICAS CON ANGULAR CLI
// ════════════════════════════════════════════════════════
//
//  ── BUENAS PRÁCTICAS ✅ ───────────────────────────────────
//
//  1. SIEMPRE usa ng generate en lugar de crear archivos a mano.
//     ng g c componentes/header  →  estructura correcta garantizada
//     Crear a mano              →  puedes olvidar el barrel, imports, etc.
//
//  2. Usa --dry-run antes de generar para ver qué se creará:
//     ng g c mi-componente --dry-run
//     Así evitas generar en la carpeta equivocada.
//
//  3. Organiza los componentes en carpetas por feature (característica):
//     src/app/
//     ├── productos/          ← todo lo de productos
//     │   ├── lista-productos/
//     │   ├── detalle-producto/
//     │   └── formulario-producto/
//     ├── usuarios/           ← todo lo de usuarios
//     └── shared/             ← componentes reutilizables
//
//  4. Usa ng update (no npm update) para actualizar Angular.
//     Las migraciones automáticas te ahorran horas de trabajo.
//
//  5. Revisa los budgets en angular.json para controlar el tamaño:
//     Si el bundle crece demasiado, el build te avisará.
//
//  6. Usa ng build --configuration production antes de desplegar.
//     Nunca subas el código sin optimizar a producción.
//
//  ── MALAS PRÁCTICAS ❌ ────────────────────────────────────
//
//  1. Crear archivos de componentes a mano sin ng generate:
//     ❌ Crear component.ts, component.html, etc. manualmente
//     → Puedes equivocarte en la estructura o los decoradores
//
//  2. Poner todo en la carpeta raíz de app/:
//     ❌ src/app/header.component.ts (sin subcarpeta)
//     ✅ src/app/shared/header/header.component.ts
//
//  3. Ignorar los warnings de budgets:
//     ❌ "Solo es un warning, no importa"
//     → Los bundles grandes afectan el tiempo de carga
//
//  4. Usar npm update para actualizar Angular:
//     ❌ npm update @angular/core
//     ✅ ng update @angular/core @angular/cli
//
//  5. Dejar el nombre de la app como "my-app" (default):
//     ❌ ng new my-app (sin pensar el nombre)
//     ✅ ng new tienda-frontend (nombre descriptivo)
//
//  6. No usar --skip-tests cuando acabas de empezar a aprender:
//     → Los archivos spec.ts vacíos generan confusión al principio
//     → Mejor: ng g c header --skip-tests mientras aprendes

// ════════════════════════════════════════════════════════
//  DEMOSTRACIÓN EJECUTABLE
// ════════════════════════════════════════════════════════

console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║   📘 INVESTIGACIÓN #5 — Angular CLI                      ║");
console.log("╚══════════════════════════════════════════════════════════╝\n");

console.log("  🔷 INSTALACIÓN:");
console.log("  ─────────────────────────────────────────────────────────");
console.log("  npm install -g @angular/cli     → instalar globalmente");
console.log("  ng version                       → verificar instalación\n");

const comandos = [
  {
    cmd: "ng new mi-app --routing --style=scss --standalone",
    desc: "Crear proyecto Angular con rutas, SCSS y Standalone Components",
    cuando: "Una vez, al inicio del proyecto",
  },
  {
    cmd: "ng serve",
    desc: "Servidor de desarrollo en http://localhost:4200",
    cuando: "Todos los días mientras desarrollas",
  },
  {
    cmd: "ng serve --open --port 4201",
    desc: "Servidor en puerto 4201, abre el navegador automáticamente",
    cuando: "Cuando el puerto 4200 está ocupado",
  },
  {
    cmd: "ng generate component productos/lista",
    desc: "Crea el componente ListaComponent en la carpeta productos/",
    cuando: "Cada vez que necesitas un componente nuevo",
  },
  {
    cmd: "ng g c header --standalone --skip-tests",
    desc: "Crea HeaderComponent standalone sin archivos de test",
    cuando: "Mientras aprendes (para no distraerse con tests)",
  },
  {
    cmd: "ng generate service servicios/productos",
    desc: "Crea ProductosService con @Injectable",
    cuando: "Cuando necesitas lógica de negocio compartida",
  },
  {
    cmd: "ng generate interface modelos/producto",
    desc: "Crea la interface Producto para tipar los datos",
    cuando: "Antes de crear el servicio que usa ese modelo",
  },
  {
    cmd: "ng generate pipe pipes/moneda",
    desc: "Crea un pipe para transformar datos en el template",
    cuando: "Para formatear fechas, monedas, textos, etc.",
  },
  {
    cmd: "ng generate guard guards/auth",
    desc: "Crea un guard para proteger rutas",
    cuando: "Cuando tienes rutas que requieren autenticación",
  },
  {
    cmd: "ng build",
    desc: "Compila la app optimizada para producción en dist/",
    cuando: "Antes de desplegar a producción",
  },
  {
    cmd: "ng test",
    desc: "Ejecuta todas las pruebas unitarias del proyecto",
    cuando: "Antes de hacer un commit importante",
  },
  {
    cmd: "ng lint --fix",
    desc: "Analiza el código y corrige automáticamente lo que puede",
    cuando: "Regularmente para mantener la calidad del código",
  },
  {
    cmd: "ng update @angular/core @angular/cli",
    desc: "Actualiza Angular con migraciones automáticas",
    cuando: "Cuando sale una nueva versión de Angular",
  },
  {
    cmd: "ng add @angular/material",
    desc: "Instala y configura Angular Material automáticamente",
    cuando: "Cuando quieres usar los componentes de UI de Google",
  },
];

console.log("  🔷 TABLA DE COMANDOS ESENCIALES:");
console.log("  ─────────────────────────────────────────────────────────\n");

comandos.forEach(({ cmd, desc, cuando }) => {
  console.log(`  📌 ${cmd}`);
  console.log(`     Qué hace: ${desc}`);
  console.log(`     Cuándo:   ${cuando}\n`);
});

console.log("  🔷 FLUJO DE TRABAJO DIARIO CON ANGULAR CLI:");
console.log("  ─────────────────────────────────────────────────────────");
const flujo = [
  "1. ng new mi-app --routing --style=scss   → solo una vez al crear",
  "2. cd mi-app                               → entrar a la carpeta",
  "3. ng serve --open                         → iniciar desarrollo",
  "4. ng g c componentes/mi-nuevo            → crear componentes",
  "5. ng g s servicios/mi-servicio           → crear servicios",
  "6. ng g i modelos/mi-modelo              → crear interfaces",
  "7. [desarrollar la funcionalidad...]       → tu código aquí",
  "8. ng lint --fix                           → verificar calidad",
  "9. ng build                               → build de producción",
  "10. [desplegar dist/ a servidor]           → subir a producción",
];
flujo.forEach((paso) => console.log(`  ${paso}`));

console.log("\n  🔷 BUENAS PRÁCTICAS — Resumen:");
console.log("  ─────────────────────────────────────────────────────────");
const bpracticas = [
  "✅ Usa ng generate siempre (nunca crear archivos a mano)",
  "✅ Usa --dry-run para verificar antes de generar",
  "✅ Organiza en carpetas por feature (productos/, usuarios/)",
  "✅ Usa ng update para actualizar Angular (no npm update)",
  "✅ Usa ng build antes de desplegar a producción",
];
const mpracticas = [
  "❌ Crear archivos de componentes manualmente",
  "❌ Poner todos los componentes en la raíz de app/",
  "❌ Usar npm update para actualizar Angular",
  "❌ Ignorar los budgets de tamaño del angular.json",
  "❌ Subir a producción sin hacer ng build",
];

console.log("\n  Buenas prácticas:");
bpracticas.forEach((p) => console.log(`  ${p}`));
console.log("\n  Malas prácticas:");
mpracticas.forEach((p) => console.log(`  ${p}`));

console.log("\n╔══════════════════════════════════════════════════════════╗");
console.log("║   ✅ Investigación #5 completada                         ║");
console.log("║   Siguiente: node 06_estructura_proyecto_angular.js      ║");
console.log("╚══════════════════════════════════════════════════════════╝\n");