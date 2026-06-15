// ============================================================
//  📘 INVESTIGACIÓN #2 — ARQUITECTURA, RENDERIZADO Y SEGURIDAD
// ============================================================

//
//  NOTA: Este archivo es .js para ser ejecutado con Node.js.
//  Todo el desarrollo teórico y código Angular/TypeScript está 
//  documentado exhaustivamente dentro de los COMENTARIOS.
//
//  Ejecutar en terminal: node angular-2.js
//
// ============================================================
//
//  ¿QUÉ ABARCA ESTA SEGUNDA ETAPA DE APRENDIZAJE?
//  ─────────────────────────────────────────────────────────
//  Una vez dominado el CLI, entramos en las entrañas del framework.
//  Esta investigación aborda cómo Angular gestiona el ciclo de flujo
//  de datos bidireccional, el control dinámico de las interfaces 
//  según el estado de la aplicación, y el ecosistema nativo de seguridad
//  para blindar el acceso a los datos del usuario en el cliente.
//
// ============================================================

"use strict";

// ============================================================
//  📘 BLOQUE 1: EL ARCO COMPLETO DE AUTENTICACIÓN (LOGIN)
// ============================================================
//
//  ¿POR QUÉ EL LOGIN EN ANGULAR NO ES COMO EN ENTORNOS CLÁSICOS?
//  ─────────────────────────────────────────────────────────
//  En el desarrollo tradicional (como servidores que renderizan HTML directo),
//  el servidor valida la sesión y redirecciona de inmediato usando cookies de 
//  sesión seguras. En una aplicación SPA (Single Page Application) con Angular,
//  el navegador ya tiene el control absoluto de la interfaz web.
//  
//  Por lo tanto, "Hacer el Login" en Angular significa implementar un flujo
//  arquitectónico en cuatro capas independientes donde cada archivo tiene una
//  responsabilidad única, comunicándose mediante reactividad asíncrona.
//
//  ─────────────────────────────────────────────────────────
//  DESGLOSE ARQUITECTÓNICO ULTRA DETALLADO DE CAPAS
//  ─────────────────────────────────────────────────────────
//
//  CAPA 1: LA INTERFAZ REACTIVA (Formularios Reactivos en HTML)
//  ─────────────────────────────────────────────────────────
//  No usamos vinculación directa manual por variables sueltas ni rastreo del 
//  DOM nativo. Angular provee el módulo `ReactiveFormsModule` que mapea el 
//  árbol de etiquetas HTML a objetos lógicos de control en memoria.
//
//  SINTAXIS REAL EN TEMPLATE (login.component.html):
//
//  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
//    <div class="form-group">
//      <label for="email">Correo Electrónico:</label>
//      <input id="email" type="email" formControlName="email" class="form-control" />
//            <div *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['email']" class="error">
//        ⚠️ El formato del correo electrónico ingresado es inválido.
//      </div>
//    </div>
//    
//    <div class="form-group">
//      <label for="password">Contraseña de Acceso:</label>
//      <input id="password" type="password" formControlName="password" class="form-control" />
//    </div>
//    
//        <button type="submit" [disabled]="loginForm.invalid" class="btn-submit">
//      Iniciar Sesión
//    </button>
//  </form>
//
//
//  CAPA 2: EL CONTROLADOR DE LA INTERFAZ (login.component.ts)
//  ─────────────────────────────────────────────────────────
//  Su única y estricta misión es coordinar la interacción visual del usuario:
//  recibe los eventos del formulario, valida que las restricciones físicas se 
//  cumplan, acciona spinners o pantallas de carga, y transfiere la carga útil
//  (payload) limpia al servicio de datos. Nunca se comunica directo con la API.
//
//  CÓMO OPERA INTERNAMENTE EL COMPONENTE:
//  1. Define la estructura de validaciones en tiempo de diseño con FormBuilder.
//  2. Al dispararse el evento (ngSubmit), valida el objeto reactivo general.
//  3. Se suscribe al Observable asíncrono que expone el servicio.
//  4. Enruta al usuario hacia zonas protegidas si la respuesta del backend es satisfactoria.
//
//
//  CAPA 3: EL MOTOR RECEPTOR DE ESTADO (auth.service.ts)
//  ─────────────────────────────────────────────────────────
//  Es un Singleton (una única instancia persistente en memoria global). Se encarga
//  de emitir los paquetes HTTP serializados en JSON hacia los controladores correspondientes 
//  de Node.js o Express.
//
//  Maneja los flujos de datos asíncronos mediante la librería RxJS (Reactive Extensions).
//  Utiliza el operador de tubería `.pipe()` y el interceptor de efectos secundarios `.tap()`.
//  ¿Por qué `.tap()`? Porque intercepta la respuesta exitosa para almacenar el Token 
//  en la máquina del cliente sin alterar la salida final del flujo que el componente espera.
//
//
//  CAPA 4: PERSISTENCIA LOCAL DE LA SESIÓN (Local Storage vs Cookies)
//  ─────────────────────────────────────────────────────────
//  Cuando la API responde con un estado de éxito (200 OK) y adjunta la cadena codificada 
//  del JSON Web Token (JWT), Angular necesita un lugar físico para recordarlo en cada recarga.
//
//  MECANISMO DE ELECCIÓN: localStorage
//  → `localStorage.setItem('token', tokenString)` -> Almacena de forma indefinida en el navegador.
//  → `localStorage.getItem('token')` -> Extrae el token para inyectarlo en cabeceras de peticiones.
//  → `localStorage.removeItem('token')` -> Destruye el token cerrando la sesión del cliente por completo.
//
//  Diferencia Clave: A diferencia de las cookies de sesión tradicionales, las SPA leen 
//  el Local Storage manualmente para construir peticiones HTTP bajo demanda mediante 
//  cabeceras de autorización personalizadas (`Authorization: Bearer <TOKEN>`).
//
//  ─────────────────────────────────────────────────────────
//  EVOLUCIÓN EN ANGULAR MODERNIZADO: SIGNALS vs COMPORTAMIENTOS ANTERIORES
//  ─────────────────────────────────────────────────────────
//
//  En versiones previas (Angular 16 e inferiores), el estado del usuario autenticado
//  se propagaba forzosamente con `BehaviorSubject` de RxJS. Esto requería suscripciones
//  manuales obligatorias, desuscripciones para evitar fugas de memoria (`Memory Leaks`) 
//  y sobrecargaba el ciclo de detección de cambios clásico del framework (Zone.js).
//
//  A partir de Angular 17+, las **Signals** toman el control total. Una Signal es un
//  contenedor reactivo primitivo de valor. Cuando el valor cambia, Angular sabe con 
//  precisión quirúrgica exacta qué elemento del HTML debe redibujarse en pantalla sin 
//  necesidad de escanear o evaluar todo el árbol del DOM de la SPA.
//
//  SINTAXIS DE USO CON SIGNALS EN AUTH:
//  → Declaración: `currentUser = signal<User | null>(null);` (Estado inicial reactivo).
//  → Modificación: `this.currentUser.set(newUserObject);` (Cambia el valor y notifica al DOM).
//  → Lectura reactiva: `this.currentUser()` (Obtiene el valor instantáneo sin suscribirse).
//
//  ─────────────────────────────────────────────────────────
//  ANATOMÍA EN CASO DE ERRORES COMUNES EN CONSOLA (Debugging)
//  ─────────────────────────────────────────────────────────
//
//  Al implementar este bloque exacto de Login, te encontrarás típicamente con:
//
//  1. ERROR: "NullInjectorError: No provider for HttpClient!"
//     ──> Causa: Estás intentando inyectar `HttpClient` en el servicio, pero no has 
//           habilitado el proveedor global de peticiones en la configuración raíz.
//     ──> Solución: Ir a `app.config.ts` e incluir `provideHttpClient()` dentro del 
//           arreglo de `providers`.
//
//  2. ERROR: "NG01203: No value accessor for form control with name 'email'"
//     ──> Causa: Declaraste la directiva `formControlName="email"` en una etiqueta 
//           HTML que no es un campo input válido, o no has importado `ReactiveFormsModule`.
//     ──> Solución: Asegurar la importación del módulo de formularios en el arreglo 
//           de `imports` del componente Standalone actual.
//
//  3. ERROR: "CORS Policy: No 'Access-Control-Allow-Origin' header is present..."
//     ──> Causa: Tu servidor backend de Node.js corre en el puerto 3000 y el cliente 
//           Angular corre en el 4200. El navegador bloquea la petición por seguridad.
//     ──> Solución: Habilitar el middleware `cors()` en Express, o mapear un proxy local 
//           en el archivo `angular.json` del CLI.
// ============================================================

"use strict";

// Aquí continúa tu flujo lógico del código ejecutable nativo en JavaScript...



// ============================================================
//  📘 BLOQUE 2: EL PARADIGMA DE LAS VISTAS PROTEGIDAS
// ============================================================
//
//  EL GRAN CHOQUE DE MENTALIDADES: WEB TRADICIONAL VS. MULTIVERSO SPA
//  ─────────────────────────────────────────────────────────
//  Para entender qué es una vista protegida en Angular, primero hay que romper
//  el chip de la arquitectura web clásica (Server-Side Rendering / Arquitectura Monolítica).
//
//  1. En la Web Tradicional (PHP, JSP, ASP.NET, Laravel):
//     Cuando un usuario digita `tupagina.com/dashboard`, el navegador envía una
//     petición HTTP directa al servidor. El servidor recibe la petición, evalúa
//     la sesión en la base de datos y, si el usuario no está logueado, ejecuta
//     una redirección 302 hacia `/login`. El código HTML de la vista protegida 
//     NUNCA sale del servidor; es físicamente imposible que un hacker lo vea 
//     porque el servidor jamás llegó a compilar ni enviar esas etiquetas.
//
//  2. En una SPA moderna (Single Page Application - Angular):
//     Al cargar la aplicación por primera vez, el servidor web envía al navegador 
//     un paquete comprimido (bundles) con el HTML inicial, los estilos CSS y todo el 
//     código JavaScript que compone la lógica de la app. Esto significa que cuando 
//     cambias de pestaña o de ruta (ej: de `/login` a `/tasks`), NO estás haciendo 
//     un viaje al servidor. El enrutador de Angular (`RouterModule` / `@angular/router`) 
//     intercepta la barra de direcciones del navegador, destruye los componentes visuales 
//     actuales y pinta los nuevos componentes en milisegundos directamente en el cliente.
//
//  DEFINICIÓN TÉCNICA FORMAL:
//  Una Vista Protegida en Angular es una ruta virtual del lado del cliente cuyo 
//  ciclo de instanciación e inserción en el DOM (Document Object Model) ha sido condicionado 
//  y bloqueado de forma lógica por el enrutador del framework, impidiendo el renderizado 
//  del árbol de componentes asociado hasta que se cumplan criterios estrictos de estado.


//  ─────────────────────────────────────────────────────────
//  DESGLOSE PROFUNDO DE LOS OBJETIVOS PRINCIPALES
//  ─────────────────────────────────────────────────────────
//
//  A. Control de Inyección Directa en la Barra de Direcciones (Deep Linking)
//  ─────────────────────────────────────────────────────────
//  Cualquier usuario puede abrir la consola de desarrollo, o simplemente escribir en la URL: 
//  `http://localhost:4200/tasks`. Sin una arquitectura de vistas protegidas, Angular 
//  obedecería ciegamente la directiva de la URL y montaría el componente en pantalla. 
//  La vista protegida actúa como un muro de contención en el evento de navegación local.
//
//  B. Segmentación por Roles y Permisos (RBAC - Role-Based Access Control)
//  ─────────────────────────────────────────────────────────
//  No todas las áreas protegidas son iguales. Un ecosistema robusto divide sus rutas en 
//  múltiples niveles de criticidad. Las vistas protegidas permiten estructurar jerarquías:
//  → `/profile`     : Requiere nivel básico (Cualquier usuario autenticado).
//  → `/tasks/audit` : Requiere nivel medio (Usuarios con rol de "Supervisor").
//  → `/admin/config`: Requiere nivel crítico (Usuarios con rol de "ADMIN").
//  El sistema evalúa el payload del token o el estado del usuario para decidir exactamente 
//  hasta qué nodo del árbol de rutas se le permite avanzar al cliente.
//
//  C. Mitigación de la Fuga Visual y Parpadeo de Interfaz (Layout Flickering)
//  ─────────────────────────────────────────────────────────
//  Cuando una aplicación no implementa vistas protegidas correctamente en el enrutador 
//  e intenta validar la sesión "adentro" del componente (usando un `ngOnInit`), ocurre un 
//  defecto visual crítico: la pantalla de administración secreta se dibuja durante un 
//  fracción de segundo antes de que el código JavaScript note que no hay sesión y lo 
//  fuerce a salir. Las vistas protegidas aseguran que el componente NI SIQUIERA se inicialice 
//  ni se cargue en memoria hasta que la validación sea exitosa.


//  ─────────────────────────────────────────────────────────
//  LA LEY DORADA DE LA SEGURIDAD: FRONTEND VS. BACKEND
//  ─────────────────────────────────────────────────────────
//
//  ⚠️ MÁXIMA DE INGENIERÍA DE SOFTWARE:
//  "Todo lo que vive en el cliente (navegador) es inseguro por naturaleza y puede ser alterado."
//
//  ¿Qué significa esto en el mundo real?
//  Un programador o atacante con conocimientos intermedios puede abrir las Herramientas de 
//  Desarrollador (F12), ir a la pestaña 'Sources', buscar los archivos JS compilados de Angular, 
//  poner un punto de ruptura (breakpoint) o reescribir la función de validación para que devuelva 
//  `true` de forma artificial. Con esto, el enrutador de Angular se engañará y le dará acceso 
//  físico a la vista `/admin`. Rompió la seguridad del frontend.
//
//  ¿Por qué esto no destruye la seguridad de tu sistema si está bien diseñado?
//  Porque cuando el componente `/admin` se renderice en la pantalla del atacante, su primera 
//  acción obligatoria en el ciclo de vida será disparar una petición HTTP (vía `HttpClient`) 
//  hacia el backend en Node.js/Express para solicitar los datos sensibles del backend:
//  `this.http.get('http://localhost:3000/api/admin/dashboard-stats')`
//
//  Es AQUÍ donde el Backend despliega su verdadera artillería pesada. Si el atacante no posee 
//  un JSON Web Token (JWT) real, firmado digitalmente por la clave secreta del servidor, el 
//  backend de Node.js cortará la conexión inmediatamente con un código de estado HTTP **401 Unauthorized** //  o **403 Forbidden**.
//
//  EL RESULTADO:
//  El hacker logró alterar el JavaScript de Angular y "abrió" la pantalla de administrador, pero 
//  lo que verá será un cascarón vacío, un diseño sin datos, tablas desiertas y gráficas en cero. 
//  No hubo fuga de información real, porque los datos jamás salieron de la base de datos (MongoDB).
//
//  REGLA MNEMOTÉCNICA PARA RECORDAR SIEMPRE:
//  → La protección de vistas en el Frontend sirve para la **Experiencia de Usuario (UX)** y el flujo lógico de la interfaz.
//  → La protección de rutas en el Backend sirve para la **Integridad y Seguridad Absoluta** de los datos del negocio.
//
//  ─────────────────────────────────────────────────────────
//  ANATOMÍA EN CASO DE ERRORES COMUNES EN VISTAS PROTEGIDAS (Debugging)
//  ─────────────────────────────────────────────────────────
//
//  1. ERROR: "Maximum call stack size exceeded" (Bucle Infinito de Redirección)
//     ──> Causa: Protegiste la ruta `/login` con el mismo mecanismo que protege `/tasks`. 
//           El sistema ve que no estás logueado en `/tasks`, te manda a `/login`. Al llegar 
//           a `/login`, la protección se ejecuta, ve que no estás logueado y te vuelve a mandar 
//           a `/login`, encallando al navegador en un ciclo infinito de redirección.
//     ──> Solución: Excluir explícitamente la ruta de Login de los bloqueos de seguridad.
//
//  2. ERROR: "ExpressionChangedAfterItHasBeenCheckedError"
//     ──> Causa: Intentar modificar estados de visibilidad de interfaces principales del layout 
//           (como barras de navegación superiores) de forma síncrona en medio del proceso de 
//           evaluación de las vistas y componentes hijos.
//     ──> Solución: Utilizar estados asíncronos nativos o Signals para desvincular los flujos.
// ============================================================

"use strict";

// Aquí continúa tu Bloque 3: Guards en Angular...



// ============================================================
//  📘 BLOQUE 3: EL ECOISTEMA DE GUARDS (LOS PORTEROS DEL ENRUTAMIENTO)
// ============================================================
//
//  MECANISMO DE INTERCEPCIÓN EN PROFUNDIDAD
//  ─────────────────────────────────────────────────────────
//  Imaginá la navegación en Angular no como un salto instantáneo, sino como un tren 
//  que avanza por rieles virtuales. Cada vez que cambias la URL o disparas un 
//  `router.navigate()`, el Enrutador (`@angular/router`) inicia un ciclo de vida 
//  de navegación formal. Antes de que el tren llegue a la estación (instanciar el 
//  componente en memoria y renderizarlo), existen alcabalas o puestos de control obligatorios. 
//  Esos puestos de control son los **Guards**.
//
//  Un Guard es un resolvedor lógico sincrónico o asincrónico. Puede retornar:
//  → `boolean`       : `true` para abrir la compuerta, `false` para cancelarla de inmediato.
//  → `UrlTree`       : Un objeto de redirección directa. Si devuelves un UrlTree, Angular 
//                     cancela la ruta actual y desvía el tren a la nueva ruta en un solo movimiento.
//  → `Observable<boolean | UrlTree>` o `Promise<boolean | UrlTree>`: Para flujos asíncronos 
//                     (por ejemplo, validar un token haciendo una petición HTTP rápida).



//  ─────────────────────────────────────────────────────────
//  DESGLOSE OPERACIONAL DE LOS TIPOS DE GUARDS NATIVOS
//  ─────────────────────────────────────────────────────────
//
//  1. CanActivate (¿Se puede entrar?)
//  ─────────────────────────────────────────────────────────
//  Es el protector perimetral estándar. Evalúa la viabilidad de la ruta destino.
//  Se dispara justo después de que el enrutador empareja la URL con un camino en tu array 
//  de rutas. Si tienes 5 componentes en una sección administrativa, tendrías que ponérselo 
//  a cada una de las 5 rutas si las declaras por separado.
//
//  2. CanActivateChild (¿Se puede entrar a las sub-rutas?)
//  ─────────────────────────────────────────────────────────
//  Diseñado para la eficiencia en estructuras jerárquicas complejas. En lugar de copiar 
//  y pegar un `canActivate` en 20 sub-rutas de un panel, lo pones una sola vez en el nodo 
//  padre. Automáticamente, cualquier intento de ir a `/admin/users`, `/admin/settings` o 
//  `/admin/reports` pasará por este filtro centralizado.
//
//  3. CanDeactivate (¿Se puede salir de aquí?)
//  ─────────────────────────────────────────────────────────
//  El guard de salida. No mira el estado de autenticación, sino el **estado interno del 
//  componente actual**. Es el que salva la experiencia de usuario cuando está rellenando 
//  un formulario masivo de 50 campos, da un clic erróneo en el menú lateral para ir a Inicio, 
//  y el sistema frena la destrucción del componente lanzando un modal flotante: 
//  "Detectamos cambios sin guardar en el formulario. Si sales perderás todo. ¿Deseas continuar?".
//
//  4. CanMatch (¿Esta ruta coincide con lo que buscas?)
//  ─────────────────────────────────────────────────────────
//  Introducido con fuerza en la era moderna de Angular. Controla si la ruta coincide lógicamente 
//  con la URL **antes** de descargar el código fuente. Esto es vital para técnicas avanzadas como:
//  → A/B Testing: Cargar un componente totalmente distinto en la misma URL `/dashboard` 
//     dependiendo de si el usuario es "Beta Tester" o "Usuario Regular".
//  → Lazy Loading Segura: Si el usuario no tiene permisos de administrador, `CanMatch` evita 
//     que el navegador llegue a descargar el archivo de código javascript `.js` comprimido de la 
//     zona de administración, impidiendo que revisen las tripas del código en la pestaña 'Network'.



//  ─────────────────────────────────────────────────────────
//  LA REVOLUCIÓN DE ARQUITECTURA: DE CLASES A FUNCIONES (DEPRECACIÓN)
//  ─────────────────────────────────────────────────────────
//
//  En el Angular clásico, un Guard era un servicio con el decorador `@Injectable()` que 
//  obligaba a implementar una interfaz rígida. El código terminaba lleno de "boilerplate" (código repetitivo):
//
//   ❌ ENFOQUE OBSOLETO DE CLASE (No utilizar en proyectos modernos)
//  @Injectable({ providedIn: 'root' })
//  export class AntiguoAuthGuard implements CanActivate {
//    constructor(private authService: AuthService, private router: Router) {}
//    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//      if (this.authService.isAuthenticated()) return true;
//      this.router.navigate(['/login']);
//      return false;
//    }
//  }
//
//  ¿Por qué se eliminó este enfoque?
//  1. Inyección rigida: Forzaba a declarar constructores solo para traer servicios simples.
//  2. Tamaño del Bundle: Las clases no se prestan eficientemente para el "Tree-Shaking" 
//     (proceso donde el compilador remueve el código que no usas para achicar el peso de la app).
//  3. Complejidad innecesaria: Escribir 15 líneas de estructura para resolver un condicional de 3 líneas.
//
//   ✅ ENFOQUE MODERNO: GUARDS FUNCIONALES
//  Hoy en día son simples funciones puras de TypeScript. No tienen constructor. Si necesitan un 
//  servicio, lo extraen del contexto de inyección global usando la función nativa `inject(MiServicio)`.
//  Son extremadamente livianos, se procesan en microsegundos y se acoplan directamente en el 
//  archivo de rutas.

//  ─────────────────────────────────────────────────────────
//  SINTAXIS AVANZADA Y PASO DE PARÁMETROS EN CONFIGURACIÓN
//  ─────────────────────────────────────────────────────────
//
//  ¿Cómo hacemos si un mismo Guard funcional debe comportarse diferente según la ruta? 
//  (Ej: que una ruta pida rol 'ADMIN' y otra pida 'VENDEDOR'). Le pasamos datos personalizados 
//  a través de la propiedad estática `data` de la ruta, y el Guard funcional los lee desde 
//  su primer parámetro (`route`).
//
//  IMPLEMENTACIÓN DEL ROLES GUARD FUNCIONAL (role.guard.ts):
//
//  import { inject } from '@angular/core';
//  import { CanActivateFn, Router } from '@angular/router';
//  import { AuthService } from '../services/auth.service';
//
//  export const roleGuard: CanActivateFn = (route, state) => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
//
//      Extraemos el arreglo de roles configurados en la ruta de control
//     const rolesEsperados = route.data['expectedRoles'] as Array<string>;
//     const rolUsuario = authService.obtenerRolActual(); 
//
//     if (authService.isAuthenticated() && rolesEsperados.includes(rolUsuario)) {
//        return true; // Cumple con la autenticación y con el rol requerido. Pasa.
//     }
//
//     console.warn('⚠️ Intento de violación de privilegios detectado.');
//     router.navigate(['/unauthorized']); // Redirección a pantalla de acceso denegado
//     return false;
//  };
//
//  VINCULACIÓN JERÁRQUICA EN RUTA (app.routes.ts):
//
//  export const routes: Routes = [
//     { 
//        path: 'dashboard', 
//        component: DashboardComponent, 
//        canActivate: [authGuard] // Primer filtro: Estar logueado
//     },
//     { 
//        path: 'admin/panel', 
//        component: AdminPanelComponent, 
//        canActivate: [authGuard, roleGuard], // Se pueden encadenar múltiples guards en orden
//        data: { expectedRoles: ['ADMIN', 'SUPER_USER'] } // Parámetros dinámicos inyectados
//     }
//  ];

//  ─────────────────────────────────────────────────────────
//  ANATOMÍA EN CASO DE ERRORES COMUNES EN GUARDS (Debugging)
//  ─────────────────────────────────────────────────────────
//
//  1. ERROR: "NG0200: Circular dependency in DI detected" (Dependencia Circular)
//     ──> Causa: Tu `AuthGuard` inyecta al `AuthService`. Y tu `AuthService` a su vez 
//           inyecta el `Router` o un interceptor que depende del enrutamiento de los guards. 
//           Angular se muerde la cola al intentar instanciar los objetos en memoria.
//     ──> Solución: Separar la lógica de almacenamiento de tokens o romper el ciclo usando 
//           `Injector` de forma diferida en lugar de inyecciones transversales directas.
//
//  2. ERROR: La pantalla se queda "en blanco" y congelada al dar clic en un enlace.
//     ──> Causa: Creaste un Guard asíncrono enganchado a un Observable de RxJS (como la respuesta 
//           de un http), pero te olvidaste de completar el flujo. Angular esperará infinitamente 
//           a que el flujo se cierre (`complete`) antes de tomar una decisión sobre la ruta.
//     ──> Solución: Asegurarse de usar operadores como `first()` o `take(1)` en el flujo reactivo 
//           para forzar al Guard a emitir el valor inicial y cerrarse.
// ============================================================

"use strict";

// Aquí continúa tu Bloque 4: Interpolación...


// ============================================================
//  📘 BLOQUE 4: LA INTERPOLACIÓN A FONDO (DATA BINDING UNIDIRECCIONAL)
// ============================================================
//
//  MECANISMO DE SINCRONIZACIÓN Y ARQUITECTURA DE FLUJO
//  ─────────────────────────────────────────────────────────
//  La interpolación no es un simple sistema de plantillas estáticas (como los reemplazos 
//  de strings que se hacen en otros entornos). Es una ventana de comunicación directa, 
//  reactiva y en tiempo real que se abre desde el Controlador (`.ts`) hacia la Vista (`.html`).
//
//  En la arquitectura de Angular, esto se clasifica formalmente como **One-Way Data Binding** //  (Vinculación de datos unidireccional). El flujo de información tiene un único sentido 
//  estricto: nace en las propiedades y variables de la clase del componente y viaja hacia 
//  el DOM para alterar lo que el usuario ve. Si la variable en TypeScript cambia (ya sea por 
//  una petición HTTP, un temporizador o un evento), la vista se actualiza de inmediato. Sin embargo, 
//  si el usuario altera textualmente ese HTML en el navegador de alguna forma, la variable en 
//  TypeScript ni se inmuta.



//  ── ¿CÓMO FUNCIONA POR DENTRO? EL COMPILADOR IVY ──────────
//  Cuando compilas tu proyecto Angular, el motor **Ivy** (el compilador moderno del framework) 
//  toma tus archivos HTML y los transforma en instrucciones optimizadas de JavaScript ejecutable. 
//  Las dobles llaves `{{ }}` (coloquialmente llamadas "mustache" o bigotes) son identificadas por 
//  el analizador sintáctico. 
//  
//  Ivy reemplaza esos bigotes por una función interna de actualización llamada `ɵɵtextInterpolate()`. 
//  Durante cada ciclo de detección de cambios, Angular ejecuta esa función, evalúa la expresión 
//  de TypeScript asociada, compara el resultado con el valor anterior y, si detecta una diferencia, 
//  reemplaza el texto de forma quirúrgica en el nodo de texto correspondiente del DOM sin alterar 
//  el resto de la página.
//
//  ─────────────────────────────────────────────────────────
//  ANATOMÍA INTERNA: COMPONENTE VS. TEMPLATE
//  ─────────────────────────────────────────────────────────
//
//   user.component.ts (El Controlador - Fuente de la Verdad)
//  import { Component } from '@angular/core';
//
//  @Component({
//    selector: 'app-user',
//    standalone: true,
//    templateUrl: './user.component.html',
//    styleUrls: ['./user.component.css']
//  })
//  export class UserComponent {
//       Propiedades de la clase (Tienen que ser públicas para que el HTML las lea)
//      username: string = 'Oscar Fernando Salazar';
//      horasClase: number = 8;
//      proyectoActivo: boolean = true;
//      tecnologias: string[] = ['Angular', 'TypeScript', 'Node.js'];
//      
//      calcularMinutos(horas: number): number {
//          return horas * 60;
//      }
//  }
//
//    <div class="profile-container">
//            <h1>Bienvenido Aprendiz, {{ username }}</h1>
//
//            <p>El total de minutos procesados en la sesión es: {{ calcularMinutos(horasClase) }}</p>
//  </div>



//  ─────────────────────────────────────────────────────────
//  CAPACIDADES AVANZADAS DENTRO DE LOS BIGOTES {{ }}
//  ─────────────────────────────────────────────────────────
//
//  Angular le permite a la interpolación ir mucho más allá de simplemente mostrar variables. 
//  Cualquier expresión válida de JavaScript/TypeScript que se resuelva en un valor imprimible 
//  (como un string, número o booleano) puede vivir dentro de las llaves:
//
//  A. Operaciones Matemáticas y Lógicas Dinámicas
//  ─────────────────────────────────────────────────────────
//  Puedes realizar cálculos directos en la vista para evitar saturar el archivo de TypeScript 
//  con variables secundarias:
//  `<p>El precio final con IVA incluido es: {{ 150000 * 1.19 }}</p>`
//
//  B. Evaluación Condicional (Operador Ternario)
//  ─────────────────────────────────────────────────────────
//  Es ideal para cambiar pequeños fragmentos de texto o clases de forma limpia según el estado lógico:
//  `<span class="badge">{{ proyectoActivo ? 'CONECTADO EN VIVO' : 'SISTEMA FUERA DE LÍNEA' }}</span>`
//
//  C. Manipulación Básica de Arreglos y Métodos Nativos
//  ─────────────────────────────────────────────────────────
//  Puedes acceder a propiedades indexadas o métodos rápidos de los prototipos nativos:
//  `<p>Tecnología principal de desarrollo: {{ tecnologias[0].toUpperCase() }}</p>`
//  `<p>Cantidad de herramientas en el stack: {{ tecnologias.length }}</p>`
//
//  D. Transformación de Datos mediante PIPES (Sintaxis de Tubería `|`)
//  ─────────────────────────────────────────────────────────
//  Los Pipes son funciones especiales que transforman la salida visual de los datos sin modificar 
//  la variable original en el componente. Son vitales para fechas, monedas y formatos:
//  `<p>Costo del módulo de software: {{ 3500 | currency:'USD' }}</p>` //  `<p>Última sincronización: {{ fechaActual | date:'medium' }}</p>`
//
//  E. Operador de Navegación Segura (Safe Navigation Operator `?.`)
//  ─────────────────────────────────────────────────────────
//  Si intentas interpolar una propiedad de un objeto que se carga de forma asíncrona (desde una API), 
//  y al principio está vacío (`null` o `undefined`), Angular romperá la aplicación lanzando un error en 
//  consola. El operador `?.` frena la lectura si el objeto no existe todavía, evitando el colapso:
//  `<p>Dirección de entrega: {{ usuario Remoto?.direccion?.calle }}</p>`

//  ─────────────────────────────────────────────────────────
//  ❌ LIMITACIONES ABSOLUTAS (REGLAS ESTRICTAS DE EXPRESIÓN)
//  ─────────────────────────────────────────────────────────
//
//  Para mantener una separación de conceptos limpia (Clean Architecture) y garantizar el rendimiento, 
//  Angular bloquea agresivamente ciertas operaciones dentro de la interpolación. Si violas estas 
//  reglas, el proyecto arrojará un **Template Parse Error** y no compilará:
//
//  1. Prohibida la Asignación Directa de Valores
//  ─────────────────────────────────────────────────────────
//  No puedes alterar el estado del componente desde el HTML. El HTML lee datos, no los escribe.
//  `<p>{{ username = 'Otro Nombre' }}</p>`
//  `<button>{{ contador++ }}</button>`
//
//  2. Prohibido el Encadenamiento de Sentencias (Uso del punto y coma `;`)
//  ─────────────────────────────────────────────────────────
//  No puedes escribir secuencias de comandos o bloques de algoritmos dentro de las llaves.
//  `<p>{{ calcularBase() ; ejecutarLogica() }}</p>`
//
//  3. Acceso Bloqueado a Objetos Globales del Navegador (Window, Document, Console)
//  ─────────────────────────────────────────────────────────
//  El contexto de evaluación de los bigotes está estrictamente confinado a la instancia de la 
//  clase del componente. El HTML no tiene visibilidad del entorno global del navegador.
//  `<p>{{ window.location.href }}</p>`
//  `<p>{{ console.log('Hola') }}</p>`
//  Si necesitas mostrar la URL actual o imprimir un log, debes capturar ese valor en una variable 
//  pública dentro de tu archivo `.ts` y luego interpolar esa variable de forma limpia.
//
//  4. Prohibida la Creación de Instancias (Operador `new`)
//  ─────────────────────────────────────────────────────────
//  `<p>Año actual: {{ new Date().getFullYear() }}</p>`
//
//  ─────────────────────────────────────────────────────────
//  ANATOMÍA EN CASO DE ERRORES COMUNES EN INTERPOLACIÓN (Debugging)
//  ─────────────────────────────────────────────────────────
//
//  1. ERROR: "Property 'X' does not exist on type 'MyComponent'"
//     ──> Causa: Escribiste mal el nombre de la variable dentro de los bigotes `{{ }}`, o la variable 
//           fue declarada con el modificador de acceso `private` o `protected` en TypeScript.
//     ──> Solución: Verificar que el nombre coincida letra por letra y asegurarte de que la propiedad 
//           sea completamente pública en la clase.
//
//  2. ERROR: "TypeError: Cannot read properties of undefined (reading 'X')"
//     ──> Causa: Estás interpolando un objeto anidado (`{{ cliente.perfil.telefono }}`) pero en el 
//           momento en que Angular renderiza la vista, la propiedad `perfil` o `cliente` aún no se 
//           ha descargado del backend de Node.js/MongoDB y su estado es indefinido.
//     ──> Solución: Implementar el operador de navegación segura: `{{ cliente?.perfil?.telefono }}`.
// ============================================================

"use strict";

// Aquí continúa tu Bloque 5: Directivas Estructurales (*ngIf y *ngFor)...



// ============================================================
//  📘 BLOQUE 5: DIRECTIVAS ESTRUCTURALES Y FLUJO DE CONTROL EN PROFUNDIDAD
// ============================================================
//
//  LA MANIPULACIÓN QUIRÚRGICA DEL DOM: ¿QUÉ HACE ESTRELLA (*) EN UNA DIRECTIVA?
//  ─────────────────────────────────────────────────────────
//  En el desarrollo web nativo, cuando quieres ocultar un elemento con JavaScript o CSS, 
//  suele aplicarse un estilo `display: none` o `visibility: hidden`. El elemento sigue 
//  existiendo en el árbol del DOM (Document Object Model), consume memoria y es completamente 
//  rastreable inspeccionando el código de la página.
//
//  Angular rompe este paradigma mediante las **Directivas Estructurales**. Su propósito 
//  no es esconder elementos, sino **alterar físicamente la estructura del layout**, añadiendo, 
//  removiendo o clonando nodos del DOM de forma dinámica basándose en el estado de la aplicación.
//
//  SINTAXIS ENMASCARADA: ¿Por qué llevan un asterisco (*)?
//  El asterisco es un "azúcar sintáctico" (sugar syntax). Le avisa al compilador de Angular 
//  que ese fragmento de HTML es una plantilla enlazada que debe ser descompuesta internamente. 
//  Cuando Angular lee `*ngIf="condicion"`, desenvuelve el HTML real transformándolo en una 
//  etiqueta contenedor especial llamada `<ng-template>` combinada con Property Binding:
//
//   Lo que tú escribes de forma simplificada:
//  <div *ngIf="isLoggedIn">Bienvenido</div>
//
//   Lo que el compilador de Angular interpreta internamente:
//  <ng-template [ngIf]="isLoggedIn">
//      <div>Bienvenido</div>
//  </ng-template>
//
//  El elemento `<ng-template>` actúa como un fantasma lógico: define un bloque de HTML que 
//  por defecto está instanciado en memoria pero NO se renderiza en la pantalla del navegador 
//  hasta que la directiva estructural le dé la orden de inyectarse.



//  ─────────────────────────────────────────────────────────
//  DIAGNÓSTICO INGENIERIL: DIRECTIVA CONDICIONAL (*ngIf)
//  ─────────────────────────────────────────────────────────
//
//  La directiva `*ngIf` evalúa expresiones condicionales. Si la expresión se resuelve como 
//  un valor verdadero (truthy), Angular toma el bloque contenido dentro de su `<ng-template>` 
//  y lo inserta físicamente en el DOM. Si pasa a ser falso (falsy), el nodo **SE DESTRUYE**.
//
//  Consecuencias críticas en el ciclo de vida (Lifecycle Hooks):
//  → Cada vez que un `*ngIf` pasa de falso a verdadero, el componente hijo que esté adentro 
//    vuelve a nacer, ejecutando sus constructores y su método de inicio `ngOnInit()`.
//  → Cuando pasa de verdadero a falso, el componente se desmantela por completo del navegador, 
//    disparando el método de destrucción `ngOnDestroy()`. Esto limpia la memoria RAM del cliente.
//
//  SINTAXIS AVANZADA AVANZADA CON BLOQUES ALTERNOS (Manejo de estados con `else` e `if-else`):
//
//    <div class="auth-container" *ngIf="authService.isAuthenticated(); else formularioAnonimo">
//            <div class="user-card">
//          <img [src]="usuario.avatar" alt="Avatar">
//          <p>Sesión activa como: {{ usuario.username }}</p>
//          <button (click)="logout()">Cerrar Sesión</button>
//      </div>
//  </div>
//
//    <ng-template #formularioAnonimo>
//      <div class="login-box">
//          <h3>Acceso Denegado</h3>
//          <p>Por favor, ingresa tus credenciales de desarrollo para continuar.</p>
//          <button (click)="redirigirAlLogin()">Ir al Login</button>
//      </div>
//  </ng-template>

//  ─────────────────────────────────────────────────────────
//  DIAGNÓSTICO INGENIERIL: DIRECTIVA ITERATIVA (*ngFor)
//  ─────────────────────────────────────────────────────────
//
//  La directiva `*ngFor` implementa un patrón repetidor. Itera sobre colecciones u objetos 
//  iterables (como arreglos procedentes de una base de datos MongoDB) y clona el nodo HTML 
//  anfitrión por cada registro encontrado.
//
//  Manejo y Captura de Variables Locales del Sistema de Plantillas:
//  Para construir interfaces complejas, Angular expone variables internas de control que se 
//  pueden capturar en cada iteración del ciclo usando la palabra clave `let`:
//  → `index` (number) : El índice entero de la iteración actual (comienza en base 0).
//  → `first` (boolean): Se vuelve `true` únicamente si el elemento es el primero de la lista.
//  → `last` (boolean) : Se vuelve `true` únicamente si el elemento es el último de la lista.
//  → `even` (boolean) : Se vuelve `true` si el índice actual es un número par.
//  → `odd` (boolean)  : Se vuelve `true` si el índice actual es un número impar.
//
//  SINTAXIS REAL EXTENSA CON CAPTURA DE CONTEXTO MÚLTIPLE (HTML):
//
//  <ul class="list-group">
//      <li *ngFor="let tarea of listaTareas; 
//                  let i = index; 
//                  let esElPrimero = first; 
//                  let esElUltimo = last; 
//                  let esPar = even" 
//          [class.bg-light]="esPar" 
//          [class.border-primary]="esElPrimero"
//          class="list-group-item d-flex justify-content-between">
//          
//          <div>
//                           <span class="badge bg-secondary">{{ i + 1 }}</span>
//              <strong class="ms-2">{{ tarea.name }}</strong>
//          </div>
//
//                    <div class="tags-container">
//              <span *ngIf="esElPrimero" class="badge bg-danger">🔥 Prioridad Máxima</span>
//              <span *ngIf="esElUltimo" class="badge bg-info">📌 Última Asignada</span>
//              <span class="status-indicator">Estado: {{ tarea.status }}</span>
//          </div>
//      </li>
//  </ul>
//
//  ⚠️ EL PELIGRO DEL RENDIMIENTO: LA NECESIDAD DE trackBy
//  Por defecto, si tienes un arreglo de 1000 tareas renderizadas con `*ngFor`, y modificas 
//  una sola letra de una sola tarea en tu TypeScript, Angular no sabe qué cambió exactamente. 
//  Ante la duda, su comportamiento nativo es **borrar los 1000 elementos del DOM y volver a 
//  crear los 1000 desde cero**. Esto destruye el rendimiento de la CPU del navegador.
//
//  Para solucionar esto en el `*ngFor` tradicional, se debe implementar una función de rastreo 
//  optimizada llamada `trackBy`. Esta función le indica a Angular cuál es el campo identificador 
//  único (como el `_id` de MongoDB) de cada registro para que solo se redibuje la fila cambiada:
//
//   En tu archivo componente.ts:
//  rastrearPorId(index: number, item: any): number {
//      return item.id; 
//  }
//
//    <div *ngFor="let item of lista; trackBy: rastrearPorId">{{ item.name }}</div>

//  ─────────────────────────────────────────────────────────
//  🚀 REVOLUCIÓN ARQUITECTÓNICA EN ANGULAR 17+: EL NUEVO CONTROL FLOW
//  ─────────────────────────────────────────────────────────
//
//  A partir de Angular 17, el equipo de ingeniería del framework introdujo una nueva 
//  característica revolucionaria llamada **Built-in Control Flow** (Flujo de control nativo).
//  Este sistema reemplaza por completo la necesidad de usar `*ngIf` y `*ngFor` mediante 
//  bloques de control con sintaxis de arroba (`@`).
//
//  ¿Por qué es infinitamente superior al enfoque anterior?
//  1. **Rendimiento Puro**: No requiere directivas de JavaScript externas. Está integrado directamente 
//     en el motor de plantillas del compilador, reduciendo los tiempos de renderizado hasta en un 30%.
//  2. **Adiós a las Importaciones**: En los componentes modernos tipo Standalone, ya no tienes 
//     que importar manualmente `CommonModule`, `NgIf` ni `NgFor` en tu arreglo de imports. 
//     Funciona de forma nativa en cualquier archivo HTML.
//  3. **Legibilidad Total**: Sintaxis limpia, muy similar a las estructuras de control de lenguajes 
//     como JavaScript o C#, evitando saturar las etiquetas HTML con atributos directivos.
//  4. **Seguridad Obligatoria de Trackeo**: En el nuevo bucle `@for`, el parámetro `track` es 
//     **estrictamente obligatorio**. El compilador lanzará un error si intentas iterar sin definir 
//     un algoritmo de rastreo, garantizando aplicaciones ultrarápidas por defecto.
//
//  SINTAXIS REAL EQUIVALENTE EN EL NUEVO PARADIGMA:



//  ── A. EL NUEVO BLOQUE CONDICIONAL (@if / @else if / @else) ──
//
//  @if (authService.isLoading()) {
//      <div class="spinner">Cargando datos del servidor...</div>
//  } @else if (authService.isAuthenticated()) {
//      <div class="dashboard-content">
//          <h2>Hola de nuevo, {{ usuario.name }}</h2>
//          <p>Tu rol de acceso actual es: {{ usuario.role }}</p>
//      </div>
//  } @else {
//      <div class="redirect-card">
//          <p>No posees credenciales activas en el sistema.</p>
//          <button (click)="irAlLogin()">Iniciar Sesión</button>
//      </div>
//  }
//
//  ── B. EL NUEVO BLOQUE ITERATIVO (@for) CON MANEJO DE COMPLEMENTO (@empty) ──
//
//  <div class="cards-grid">
//            @for (producto of listaProductos; track producto.id; let i = $index; let esPrimero = $first) {
//          <div class="product-card" [class.featured]="esPrimero">
//              <h4>Fila: {{ i }} - {{ producto.nombre }}</h4>
//              <p>Precio Unitario: ${{ producto.precio }}</p>
//              <button class="btn-buy">Adquirir Producto</button>
//          </div>
//      } @empty {
//                              <div class="no-data-alert">
//              <p>⚠️ No existen productos disponibles en el inventario en este momento.</p>
//          </div>
//      }
//  </div>

//  ─────────────────────────────────────────────────────────
//  ANATOMÍA EN CASO DE ERRORES COMUNES EN CONTROL FLOW (Debugging)
//  ─────────────────────────────────────────────────────────
//
//  1. ERROR: "Can't bind to 'ngIf' since it isn't a known property of 'div'"
//     ──> Causa: Estás usando la sintaxis vieja `*ngIf` dentro de un componente Standalone, 
//           pero te olvidaste de importar el módulo `CommonModule` (o la directiva `NgIf`) 
//           dentro del arreglo de `imports: []` en tu archivo TypeScript `.ts`.
//     ──> Solución: Importar la directiva o, mejor aún, migrar el bloque a la sintaxis moderna `@if`.
//
//  2. ERROR: "NgForOf expects a trackBy function but none was provided" o lentitud extrema.
//     ──> Causa: Rendimiento degradado al renderizar listas dinámicas pesadas sin proveer un criterio 
//           de identidad a la directiva iterativa.
//     ──> Solución: Migrar a `@for` y declarar un identificador único en la cláusula `track` 
//           (ej: `track tarea.id`).
// ============================================================

"use strict";

// Tu laboratorio práctico simulado ejecutable en Node.js se mantiene acoplado abajo...





// ============================================================
//  🧪 LABORATORIO PRÁCTICO EN JAVASCRIPT (EJECUTABLE CON NODE)
// ============================================================
// Simulación en tiempo de ejecución de cómo operan todos los conceptos juntos.
//
// ─────────────────────────────────────────────────────────
// PROPROPÓSITO ARQUITECTÓNICO DEL LABORATORIO
// ─────────────────────────────────────────────────────────
// Este archivo simula el comportamiento de un entorno JavaScript real ejecutado 
// bajo el motor V8 (Node.js). Su objetivo es emular mediante código imperativo nativo 
// lo que Angular realiza de forma declarativa bajo el capó: la inyección de dependencias, 
// el ciclo de vida del enrutamiento, las directivas condicionales y el bucle iterativo.
//
// Al ejecutar este archivo (`node angular-2.js`), se puede auditar paso a paso cómo 
// las variables lógicas controlan directamente la existencia o destrucción de los 
// bloques visuales simulados.

"use strict";

// ─────────────────────────────────────────────────────────
// 1. SIMULACIÓN DEL SERVICIO DE AUTENTICACIÓN CENTRALIZADO (AuthService)
// ─────────────────────────────────────────────────────────
// En Angular, este servicio se declara con el decorador `@Injectable({ providedIn: 'root' })`.
// Actúa como un patrón Singleton (garantiza una única instancia en toda la aplicación).
// Conserva el estado de la sesión activa para proveerlo a cualquier componente que lo requiera.

class AngularAuthService {
    // El constructor inicializa el estado de la memoria volatil al arrancar la app
    constructor() {
        this.sessionToken = null; // Almacena la cadena del JSON Web Token (JWT)
        this.userData = null;     // Almacena el payload del usuario autenticado
    }

    /**
     * Proceso analógico al método http.post() de la API de autenticación.
     * En una app real, este payload viaja en formato JSON en el cuerpo de la petición.
     * @param {string} email 
     * @param {string} password 
     * @returns {Object} Respuesta HTTP simulada
     */
    ejecutarPostLogin(email, password) {
        // Validación simulada de credenciales (emulando la respuesta de la base de datos)
        if (email === "oscar@dev.com" && password === "123456") {
            this.sessionToken = "JWT_TOKEN_SECRET_VALID_2026_SENA";
            this.userData = { 
                fullName: "Oscar Fernando Salazar", 
                role: "ADMIN"
            };
            return { status: 200, message: "Login Exitoso" };
        }
        // Si las credenciales no coinciden, se emula un error de protocolo HTTP 401
        return { status: 401, message: "Unauthorized - Credenciales Erróneas" };
    }

    /**
     * Actúa exactamente como el método de verificación que consume el Guard funcional.
     * @returns {boolean} Estado de la existencia del token en memoria
     */
    verificarEstadoAutenticacion() {
        // Retorna true si hay un token registrado, false si es null o undefined
        return this.sessionToken !== null; 
    }

    /**
     * Expone de forma segura los datos del usuario logueado en el sistema
     * @returns {Object|null} Objeto con información de perfil
     */
    obtenerUsuario() {
        return this.userData;
    }

    /**
     * Emula la destrucción de la sesión, similar a limpiar el localStorage
     */
    ejecutarLogout() {
        this.sessionToken = null;
        this.userData = null;
        console.log(" 🚪 [AUTH SERVICE]: Sesión destruida en memoria.");
    }
}

// ─────────────────────────────────────────────────────────
// 2. SIMULACIÓN DE LA COLECCIÓN DE DATOS DE TAREAS (Base para el *ngFor)
// ─────────────────────────────────────────────────────────
// Estos datos emulan el set de datos que el framework descarga asíncronamente 
// desde una API en Node.js/Express conectada a una base de datos. Cada objeto 
// posee una firma única (`id`) que servirá para la optimización del trackeo.

const coleccionTareasBackend = [
    { id: 1, name: "Maquetar Login con Bootstrap 5", status: "Terminado" },
    { id: 2, name: "Construir Guards funcionales en la ruta /tasks", status: "En Proceso" },
    { id: 3, name: "Conectar controladores de MongoDB al Frontend", status: "Pendiente" }
];

// Inicialización de la instancia única global (Singleton)
const authServiceInstance = new AngularAuthService();

// ─────────────────────────────────────────────────────────
// 3. MOTOR DE SIMULACIÓN DEL ENRUTADOR Y DE RENDERIZADO DE PLANTILLAS
// ─────────────────────────────────────────────────────────
// Esta función simula el núcleo de `@angular/router` y el compilador Ivy combinados.
// Procesa el ciclo completo: intercepta la ruta, ejecuta el Guard y renderiza el DOM.

function simularEnrutadorYRenderizadoHTML(rutaSolicitada) {
    console.log(`\n============================================================`);
    console.log(`[ENRUTADOR] Navegando hacia la ruta virtual: /${rutaSolicitada}...`);
    console.log(`============================================================`);

    // ── INTERCEPCIÓN DE RUTA: SIMULACIÓN DE CANACTIVATE GUARD ──
    // El enrutador analiza las restricciones asociadas a la ruta solicitada.
    if (rutaSolicitada === "tasks") {
        // El Guard invoca al servicio inyectado para evaluar el token
        if (!authServiceInstance.verificarEstadoAutenticacion()) {
            console.log(" 🛑 [GUARD INTERCEPTADO]: CanActivate retornó (FALSE). Acceso denegado.");
            console.log(" 🔄 [REDIRECCIÓN]: Forzando enrutamiento inmediato a: /login");
            
            // Simulación de la redirección automática del router: router.navigate(['/login'])
            simularEnrutadorYRenderizadoHTML("login");
            return; // Corta la ejecución de la función. No se renderiza nada de /tasks.
        }
    }

    console.log(` 🟩 [GUARD CONFIRMADO]: CanActivate retornó (TRUE). Acceso autorizado.`);
    console.log(` 📦 [COMPILADOR IVY]: Cargando y montando componentes de /${rutaSolicitada} en el DOM.`);

    // ── VISTA DE LOGIN ──
    if (rutaSolicitada === "login") {
        console.log("\n 🖥️  [VISTA RENDEREADA: /login]");
        console.log("    [HTML Form] <form [formGroup]='loginForm'>");
        console.log("    [HTML Input] Campo de correo electrónico listo.");
        console.log("    [HTML Input] Campo de contraseña listo.");
    }

    // ── VISTA PROTEGIDA DE TAREAS ──
    if (rutaSolicitada === "tasks") {
        const usuario = authServiceInstance.obtenerUsuario();

        // ── SIMULACIÓN DE INTERPOLACIÓN: {{ usuario.fullName }} ──
        // El motor evalúa el objeto TypeScript e incrusta el string resultante en el nodo de texto.
        console.log(`\n 🤖 [INTERPOLACIÓN DOM]: "Bienvenido: ${usuario.fullName}"`);
        
        // ── SIMULACIÓN DE DIRECTIVA ITERATIVA: *ngFor o @for ──
        // Por cada elemento en la colección, se clona la estructura HTML y se inyecta en el árbol.
        console.log("\n ── [RENDERIZADO DE PLANTILLA] Procesando flujo iterativo (@for) ──");
        
        if (coleccionTareasBackend.length === 0) {
            // Emulación del bloque de contingencia nativo @empty de Angular 17+
            console.log("    [DOM HTML] @empty: No hay tareas pendientes en este momento.");
        } else {
            // Bucle nativo que emula la clonación física de etiquetas <li>
            coleccionTareasBackend.forEach((tarea, index) => {
                // Captura de variables de contexto: index (i), first ($first), last ($last)
                const esPrimero = index === 0;
                const esUltimo = index === coleccionTareasBackend.length - 1;
                let tagsVisuales = "";

                if (esPrimero) tagsVisuales += " [🔥 PRIORIDAD MÁXIMA]";
                if (esUltimo)  tagsVisuales += " [📌 ÚLTIMA ASIGNADA]";

                console.log(`    <li> [Index: ${index}] -> ID: ${tarea.id} | Actividad: ${tarea.name} -> Estado: [${tarea.status}]${tagsVisuales}`);
            });
        }

        // ── SIMULACIÓN DE DIRECTIVA CONDICIONAL: *ngIf o @if ──
        // La existencia del bloque de botones administrativos depende estrictamente del rol.
        console.log("\n ── [RENDERIZADO DE PLANTILLA] Procesando flujo condicional (@if) ──");
        
        if (usuario.role === "ADMIN") {
            // Bloque TRUE: Se inyecta en el DOM
            console.log("    [DOM HTML] @if (TRUE): Renderizando panel de acciones críticas de Administrador.");
            console.log("    [BOTÓN INYECTADO] 🛠️ [Eliminar Tarea] | 📝 [Editar Todo]");
        } else {
            // Bloque FALSE: No se oculta con CSS, se remueve completamente del DOM y de la memoria
            console.log("    [DOM HTML] @else (FALSE): Removiendo del DOM los botones de administración por falta de privilegios.");
        }
    }
}

// ─────────────────────────────────────────────────────────
// 4. ORQUESTACIÓN DEL FLUJO DE PRUEBAS EN TIEMPO DE EJECUCIÓN (Ejecución del Lab)
// ─────────────────────────────────────────────────────────
console.clear();
console.log("🚀 ARRANCANDO SIMULADOR DE ENTORNO ANGULAR EN NODE.JS");

// PRUEBA 1: Intentar ingresar a la zona restringida sin haberse autenticado.
// El sistema debe interceptar la navegación y redirigir inmediatamente.
simularEnrutadorYRenderizadoHTML("tasks");

// PRUEBA 2: Ejecutar el proceso de autenticación enviando datos incorrectos.
console.log("\n[FORMULARIO]: El usuario digita credenciales erróneas...");
let respuestaLogin = authServiceInstance.ejecutarPostLogin("oscar@dev.com", "clave_incorrecta");
console.log(`[BACKEND RESPONSE]: Status: ${respuestaLogin.status} | Message: ${respuestaLogin.message}`);

// Intentamos volver a entrar a la ruta protegida; debe seguir bloqueada.
simularEnrutadorYRenderizadoHTML("tasks");

// PRUEBA 3: Iniciar sesión de forma correcta utilizando las credenciales válidas.
console.log("\n[FORMULARIO]: El usuario digita credenciales válidas...");
respuestaLogin = authServiceInstance.ejecutarPostLogin("oscar@dev.com", "123456");
console.log(`[BACKEND RESPONSE]: Status: ${respuestaLogin.status} | Message: ${respuestaLogin.message}`);

// Ahora que el token está guardado en el estado del servicio, el enrutador debe permitir el acceso
// y el motor de renderizado dibujará dinámicamente la información e interpolará los datos.
simularEnrutadorYRenderizadoHTML("tasks");

// PRUEBA 4: Simular degradación de privilegios para auditar el comportamiento de la directiva condicional.
// Si el usuario deja de ser administrador, la interfaz se reconfigura destruyendo elementos del DOM.
console.log("\n[CAMBIO DE ESTADO]: Se alteran de forma dinámica los privilegios del usuario activo a 'USER'...");
authServiceInstance.userData.role = "USER";

// Se vuelve a procesar la ruta; los botones de administrador deben desaparecer del árbol HTML.
simularEnrutadorYRenderizadoHTML("tasks");

// PRUEBA 5: Cierre de sesión (Logout). Se destruye el token.
console.log("\n[BOTÓN LOGOUT]: El usuario presiona cerrar sesión...");
authServiceInstance.ejecutarLogout();

// Si se intenta regresar a la ruta protegida, el guard frena al usuario en el perímetro.
simularEnrutadorYRenderizadoHTML("tasks");
console.log(`\n============================================================`);
console.log("🏁 SIMULACIÓN TERMINADA CON ÉXITO SIN ERRORES DE MEMORIA");
console.log(`============================================================`);




// ============================================================
//  📘 CASOS DE PRUEBA: COMPORTAMIENTO INTERNO DE RUNTIME, MEMORIA Y LOGS
// ============================================================
//
//  EL VALOR DE AUDITAR EL TIEMPO DE EJECUCIÓN (Runtime Debugging)
//  ─────────────────────────────────────────────────────────
//  En las aplicaciones SPA de nivel profesional, las pruebas en consola y el seguimiento 
//  de flujos asíncronos no son simples herramientas de depuración secundaria; son la base 
//  para entender cómo interactúa el estado lógico con el árbol visual del DOM.
//
//  Cuando ejecutas este bloque en la terminal utilizando el motor V8 de Node.js, estás 
//  reproduciendo una **Auditoría de Caja Negra**. Cada caso de prueba emula el comportamiento 
//  de un usuario real interactuando con la interfaz web y cómo los centinelas lógicos (Guards) 
//  y los motores de transformación (Ivy) responden de forma determinista ante los cambios de estado.
//
//  A continuación, se desglosa de manera exhaustiva y milimétrica la mecánica interna de cada caso, 
//  describiendo qué ocurre exactamente en la memoria RAM del cliente, en el enrutador y en la interfaz.



//  ─────────────────────────────────────────────────────────
//  DESGLOSE TÉCNICO ULTRA DETALLADO DE LOS CASOS DE PRUEBA
//  ─────────────────────────────────────────────────────────
//
//  🏎️ CASO 1: LA INTEGRIDAD PERIMETRAL (El Intento de Acceso Anónimo)
//  ─────────────────────────────────────────────────────────
//  → Acción del Usuario: 
//    El usuario abre una pestaña limpia en el navegador web e introduce directamente en la 
//    barra de direcciones la URL: `http://localhost:4200/tasks`, intentando saltarse el Login.
//
//  → Flujo Interno del Enrutador (Paso a Paso):
//    1. Intercepción del Evento: El módulo `@angular/router` captura la URL modificada antes de que el 
//       navegador intente recargar la página completa. Al tratarse de una SPA, intercepta el hilo.
//    2. Evaluación de Metadatos de la Ruta: El enrutador busca la coincidencia exacta en el arreglo 
//       `routes` configurado en `app.routes.ts`. Encuentra que el camino `tasks` tiene asociado un
//       mecanismo de interceptación perimetral a través de la propiedad `canActivate: [authGuard]`.
//    3. Invocación del Guard Funcional: Se congela la navegación transitoria. El framework invoca la 
//       función anónima `authGuard`. Dado que es un guard moderno (funcional), utiliza la función nativa
//       `inject(AuthService)` para obtener acceso directo a la instancia Singleton del servicio de datos.
//    4. Comprobación del Estado de Memoria: El Guard llama al método `authService.verificarEstadoAutenticacion()`.
//       Debido a que la aplicación acaba de inicializarse por primera vez en el navegador del cliente, 
//       la propiedad física `this.sessionToken` contiene un valor equivalente a `null`.
//    5. Resolución de Rechazo y Desvío: El método devuelve un booleano `false` estricto. Al recibir este valor, 
//       el enrutador de Angular aborta la carga del componente `TasksComponent`. Inmediatamente después, se ejecuta 
//       la instrucción de rescate `router.navigate(['/login'])`, la cual genera un nuevo ciclo de enrutamiento 
//       hacia la vista de autenticación pública.
//
//  → Comportamiento en la Memoria RAM y el DOM:
//    El código fuente de `TasksComponent` ni siquiera llega a ser instanciado en la pila de ejecución (Call Stack). 
//    No se reservan recursos del sistema, no se ejecutan sus constructores y las etiquetas HTML asociadas permanecen 
//    completamente ajenas al árbol del DOM. Se evita al 100% el parpadeo visual de datos restringidos.



//  🛠️ CASO 2: EL CONTROL DE EXCEPCIONES Y ERRORES (Petición HTTP Rechazada)
//  ─────────────────────────────────────────────────────────
//  → Acción del Usuario: 
//    El usuario se encuentra ahora en la pantalla de Login. Rellena los campos con datos aleatorios o maliciosos 
//    (por ejemplo, intenta ataques de inyección básica o introduce contraseñas erróneas) y presiona "Iniciar Sesión".
//
//  → Flujo Interno del Sistema (Paso a Paso):
//    1. Captura del Evento del Formulario: La directiva `(ngSubmit)="onSubmit()"` se dispara en el HTML. El controlador 
//       `.ts` intercepta la llamada, extrae de manera limpia el objeto JSON empaquetado por el `FormGroup` reactivo 
//       y valida que cumpla con los requisitos físicos mínimos del lado del cliente (como el patrón de correo).
//    2. Delegación y Emisión HTTP: El componente invoca al método `login()` del servicio. Este método genera una 
//       tubería asíncrona utilizando `HttpClient.post()`, la cual envía el payload serializado en JSON hacia el backend.
//    3. Procesamiento en el Servidor y Rechazo: El servidor (por ejemplo, una API construida en Node.js y Express) 
//       compara los datos contra los registros cifrados de la base de datos. Al fallar la coincidencia, el servidor 
//       deniega la solicitud y responde enviando un paquete con la cabecera de estado **401 Unauthorized**.
//    4. Recepción del Error en la Tubería RxJS: El flujo asíncrono viaja de vuelta a Angular. Al tratarse de un estado 
//       de falla (rango 4xx), la función de efectos secundarios `.pipe(tap(...))` se salta las instrucciones de éxito 
//       e ignora el almacenamiento. Las propiedades `sessionToken` y `userData` permanecen estrictamente vacías en `null`.
//    5. Gestión del Error en el Componente: El hilo de ejecución llega a la suscripción del componente, cayendo de 
//       forma directa dentro del bloque callback `error: (err) => { ... }`. El componente desactiva las pantallas de 
//       espera (spinners) y muta una variable local para mostrar un mensaje dinámico de alerta roja en la interfaz.
//
//  → Comportamiento en la Memoria RAM y el DOM:
//    La aplicación mantiene su estado público intacto. La barra de navegación se congela en la ruta `/login`. El DOM 
//    sufre una mutación menor controlada, insertando únicamente la etiqueta contenedora de la alerta del error, manteniendo 
//    al usuario restringido en la zona de acceso público.



//  🔐 CASO 3: LA MUTACIÓN DEL ESTADO GLOBAL (Autenticación Exitosa)
//  ─────────────────────────────────────────────────────────
//  → Acción del Usuario: 
//    El usuario visualiza la alerta de error, corrige las credenciales en los campos de entrada de texto e introduce 
//    las credenciales válidas registradas en el sistema, haciendo clic en el botón de confirmación.
//
//  → Flujo Interno del Sistema (Paso a Paso):
//    1. Nueva Solicitud HTTP: Se repite el ciclo de recolección de datos del formulario reactivo y se despacha una 
//       nueva petición asíncrona HTTP POST hacia el endpoint correspondiente del backend (`/api/auth/login`).
//    2. Validación y Emisión del JWT: El backend verifica que el usuario existe. Genera un JSON Web Token (JWT) firmado 
//       digitalmente mediante una clave secreta del lado del servidor y responde al cliente con un estado **200 OK**, 
//       adjuntando el token y un objeto con los metadatos públicos del perfil del usuario.
//    3. Intercepción y Captura de Estado: El flujo de datos entra a la tubería reactiva del servicio Angular. El operador 
//       `.pipe(tap(response => { ... }))` intercepta el flujo exitoso antes de que llegue al componente final. El servicio 
//       extrae la cadena string del token y la guarda físicamente en la máquina del cliente ejecutando `localStorage.setItem('token', ...)`.
//    4. Mutación de la Signal de Perfil: En el mismo instante, el servicio modifica su estado reactivo interno mutando el 
//       valor de su Signal: `this.currentUser.set(response.user)`. Al cambiar el valor de la Signal, todos los componentes 
//       del ecosistema que lean esta variable quedan automáticamente notificados del cambio de estado.
//    5. Ejecución del Flujo de Éxito en la Vista: La promesa/observable se resuelve satisfactoriamente en el controlador del 
//       componente de Login, activando de inmediato el callback de éxito `next: () => { this.router.navigate(['/tasks']); }`.
//
//  → Comportamiento en la Memoria RAM y el DOM:
//    El almacenamiento persistente local (`localStorage`) ahora retiene de forma indefinida la credencial del token. La memoria 
//    volátil del hilo principal de JavaScript actualiza el objeto global del usuario. El enrutador destruye de la memoria RAM 
//    el componente de Login y limpia la pantalla para dar paso a la ruta protegida.

//  🎨 CASO 4: EL REDIBUJADO DE LA INTERFAZ (Renderizado Dinámico Reactivo)
//  ─────────────────────────────────────────────────────────
//  → Acción del Usuario: 
//    El sistema ejecuta de forma automatizada e imperativa la redirección física hacia la ruta protegida `/tasks`.
//
//  → Flujo Interno del Sistema (Paso a Paso):
//    1. Segunda Validación del Guard: El enrutador vuelve a procesar las restricciones del camino `/tasks`. El `authGuard` 
//       se ejecuta por segunda vez en el ciclo de vida de la aplicación.
//    2. Apertura del Perímetro: Al evaluar `authService.verificarEstadoAutenticacion()`, el servicio lee que el token ya existe 
//       en memoria y retorna un `true` rotundo. El enrutador abre las compuertas y permite el paso de la navegación.
//    3. Inicialización del Componente: El framework instancia el componente `TasksComponent` en la memoria del navegador. 
//       Se dispara el ciclo de vida inicializador `ngOnInit()`, el cual inyecta y extrae la colección de tareas del inventario.
//    4. Procesamiento de la Interpolación (Ivy): El motor de renderizado de Angular (Ivy) analiza las etiquetas HTML del template. 
//       Al encontrar la sintaxis de bigotes `{{ usuario.fullName }}`, ejecuta una lectura ultra rápida en la memoria, traduce 
//       la instrucción en texto plano e inyecta quirúrgicamente el string dentro del nodo del DOM correspondiente.
//    5. Despliegue de Listas Dinámicas: El motor evalúa la directiva iterativa de control de flujo (`@for` o `*ngFor`). Lee el 
//       arreglo de objetos procedentes del backend. Por cada registro, clona la fila HTML de forma exacta, calcula sus índices 
//       internos y evalúa condicionales adicionales para renderizar etiquetas visuales de prioridad en las filas correspondientes.
//    6. Evaluación del Bloque de Privilegios: Finalmente, el motor procesa la directiva condicional estructural `@if` o `*ngIf`. 
//       Al comprobar que la propiedad de rol del usuario equivale estrictamente a `ADMIN`, el compilador inserta físicamente en 
//       el layout el árbol completo de botones avanzados (como eliminar y editar).
//
//  → Comportamiento en la Memoria RAM y el DOM:
//    La interfaz gráfica se transforma por completo ante los ojos del desarrollador. El DOM pasa de ser un cascarón genérico 
//    a un panel hiper-personalizado que despliega en tiempo real información vinculada al estado de la memoria del cliente.



//  ─────────────────────────────────────────────────────────
//  CONSOLA DE CONTROL: TRAZABILIDAD Y ANÁLISIS DE LOGS
//  ─────────────────────────────────────────────────────────
console.log("=================================================================");
console.log(" 🧪 INICIANDO PRUEBAS DE LOGUEO, GUARDS Y RENDERIZADO EN NODE.JS ");
console.log("=================================================================");

// ── EJECUCIÓN CASO 1: Simulación de intrusión anónima directa a zona segura ──
console.log("\n[PROCESO DE AUDITORÍA]: Ejecutando Caso 1 (Ataque perimetral por barra de URL)...");
// El enrutador interceptará la solicitud y debe forzar el desvío automático hacia el login público.
simularEnrutadorYRenderizadoHTML("tasks");


// ── EJECUCIÓN CASO 2: Simulación de envío de datos erróneos en el formulario ──
console.log("\n[PROCESO DE AUDITORÍA]: Ejecutando Caso 2 (Falla de validación de credenciales)...");
console.log("[Formulario] El usuario introduce credenciales no registradas en la base de datos...");
// Se emula la petición HTTP enviando datos inválidos; el backend responderá con código 401.
let intentoInvalido = authServiceInstance.ejecutarPostLogin("hacker@correo.com", "incorrecta");
console.log(`  Respuesta Servidor: Código Estado: ${intentoInvalido.status} | Mensaje: ${intentoInvalido.message}`);

// Re-verificamos la ruta de tareas para constatar que el Guard mantiene el bloqueo absoluto del DOM
simularEnrutadorYRenderizadoHTML("tasks");


// ── EJECUCIÓN CASO 3: Simulación de proceso de Login satisfactorio y almacenamiento ──
console.log("\n[PROCESO DE AUDITORÍA]: Ejecutando Caso 3 (Sincronización y firma exitosa)...");
console.log("[Formulario] El usuario introduce datos de cuenta verídicos y autorizados...");
// El backend valida los datos, emite el token y el servicio altera las variables lógicas globales.
let intentoValido = authServiceInstance.ejecutarPostLogin("oscar@dev.com", "123456");
console.log(`  Respuesta Servidor: Código Estado: ${intentoValido.status} | Mensaje: ${intentoValido.message}`);


// ── EJECUCIÓN CASO 4: Acceso definitivo a la ruta restringida con sesión activa ──
console.log("\n[PROCESO DE AUDITORÍA]: Ejecutando Caso 4 (Apertura de compuertas y dibujo de interfaz)...");
// Con el estado de sesión activo, el Guard retornará TRUE y el compilador Ivy procesará las directivas e interpolaciones.
simularEnrutadorYRenderizadoHTML("tasks");

console.log("\n=================================================================");
console.log(" ✅ Compilación teórica y laboratorio ejecutados exitosamente.");
console.log("=================================================================");

