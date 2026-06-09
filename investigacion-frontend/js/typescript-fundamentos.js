

// ============================================================
//  📘 INVESTIGACIÓN #1 — ¿QUÉ ES TYPESCRIPT? TIPOS Y FUNDAMENTOS
// ============================================================
//
//  NOTA IMPORTANTE SOBRE ESTE ARCHIVO:
//  ─────────────────────────────────────────────────────────
//  Este archivo es .js (JavaScript) para ejecutarlo con Node.js.
//  Todo el código TypeScript está en los COMENTARIOS para que
//  lo leas, lo estudies y lo entiendas línea por línea.
//  Cuando trabajes en Angular, escribirás esa misma sintaxis
//  en archivos .ts y el CLI se encarga de compilarlo.
//
//  Ejecutar: node 01_typescript_fundamentos.js
//
// ============================================================
//
//  ¿QUÉ ES TYPESCRIPT? — LA HISTORIA Y EL CONTEXTO COMPLETO
//  ─────────────────────────────────────────────────────────
//
//  TypeScript es un lenguaje de programación creado por Microsoft
//  y lanzado en 2012. Su creador principal fue Anders Hejlsberg,
//  el mismo ingeniero que diseñó C#. No es casualidad: TypeScript
//  trae al mundo JavaScript muchas ideas que existen en C# y Java.
//
//  La definición oficial: TypeScript es un SUPERCONJUNTO tipado de
//  JavaScript que compila a JavaScript puro.
//
//  ¿Qué significa "superconjunto"?
//  Imagina dos círculos, uno dentro del otro:
//
//  ┌─────────────────────────────────────────────┐
//  │              T Y P E S C R I P T            │
//  │                                             │
//  │    ┌─────────────────────────────────┐      │
//  │    │        J A V A S C R I P T      │      │
//  │    │   (todo lo que ya sabes)        │      │
//  │    │   variables, funciones, clases  │      │
//  │    │   arrays, objetos, promesas     │      │
//  │    └─────────────────────────────────┘      │
//  │                                             │
//  │  + Tipos estáticos (string, number, etc.)   │
//  │  + Interfaces y type aliases                │
//  │  + Decoradores (@Component, @Injectable)    │
//  │  + Genéricos <T>                            │
//  │  + Modificadores de acceso (private, etc.)  │
//  │  + Enums                                    │
//  └─────────────────────────────────────────────┘
//
//  Consecuencias concretas de ser superconjunto:
//  1. Todo archivo .js válido PUEDE renombrarse a .ts y compilará.
//     No tienes que reescribir nada para empezar a usar TypeScript.
//
//  2. Puedes aprender TypeScript de forma GRADUAL. Empiezas con
//     JavaScript normal y vas agregando tipos poco a poco.
//
//  3. TypeScript desaparece en producción. El compilador 'tsc'
//     convierte todo a JavaScript puro antes de ejecutarse.
//     El navegador y Node.js nunca ven TypeScript, solo JavaScript.
//
//  ─────────────────────────────────────────────────────────
//  EL PROBLEMA QUE RESUELVE — JavaScript y los tipos dinámicos
//  ─────────────────────────────────────────────────────────
//
//  JavaScript es un lenguaje de tipado DINÁMICO.
//  "Dinámico" significa que las variables pueden cambiar de tipo
//  en cualquier momento durante la ejecución del programa.
//  JavaScript ni siquiera te avisa. Simplemente lo permite.
//
//  ─── JAVASCRIPT puro — el tipo cambia sin avisar ─────────
//  let dato = "Juan";     // dato es string
//  dato = 42;             // dato ahora es number — JS lo permite sin queja
//  dato = true;           // dato ahora es boolean — JS sigue sin quejarse
//  dato = { id: 1 };      // dato ahora es un objeto — todo bien para JS
//
//  Parece flexible, pero en proyectos reales esto crea bugs silenciosos.
//  El error más clásico de JavaScript:
//
//   ─── BUG REAL que TypeScript PREVIENE ────────────────────
//  function calcularDescuento(precio, porcentaje) {
//    return precio - (precio * porcentaje / 100);
//  }
//
//   Uso correcto:
//  calcularDescuento(100, 10);     // → 90 ✅
//
//   Uso incorrecto — nadie te avisa:
//  calcularDescuento("100", 10);   // → "10010" 💥 ERROR SILENCIOSO
//   JavaScript convierte "100" - (10) = "100" + "-10"...
//   No lanza ningún error. Devuelve "10010" (un string) en lugar de 90.
//   Este bug puede llegar a producción fácilmente.
//
//   ─── CON TYPESCRIPT — el error aparece al escribir ────────
//   function calcularDescuento(precio: number, porcentaje: number): number {
//     return precio - (precio * porcentaje / 100);
//   }
//  
//   calcularDescuento("100", 10);
//   ❌ Error al compilar: Argument of type 'string' is not assignable
//                         to parameter of type 'number'
//  
//   La línea roja aparece en VS Code MIENTRAS escribes.
//   Antes de ejecutar una sola línea de código.
//   Imposible que ese bug llegue a producción.
//
//  ─────────────────────────────────────────────────────────
//  BENEFICIOS CONCRETOS EN PROYECTOS REALES
//  ─────────────────────────────────────────────────────────
//
//  1. AUTOCOMPLETADO INTELIGENTE EN VS CODE:
//
//     Sin TypeScript:
//     Escribes usuario. y VS Code no sabe qué propiedades
//     tiene ese objeto. No puede sugerirte nada útil.
//
//     Con TypeScript:
//     Escribes usuario. y VS Code muestra INMEDIATAMENTE:
//     .id, .nombre, .email, .rol, .edad, .fechaCreacion
//     Si escribes usuario.emial (error ortográfico), VS Code
//     subraya con rojo y sugiere usuario.email.
//     Esto ahorra muchísimo tiempo y evita errores de typo.
//
//  2. REFACTORIZACIÓN SEGURA (renombrar propiedades en todo el proyecto):
//
//     Tienes la propiedad "email" en una interfaz y se usa en 47 archivos.
//     El cliente pide cambiarla a "correoElectronico".
//
//     Sin TypeScript: buscas y reemplazas manualmente "email" en 47 archivos.
//     Rezas para no romper nada. Seguro te olvidas alguno.
//
//     Con TypeScript: cambias el nombre en la interfaz.
//     El compilador te muestra EXACTAMENTE los 47 lugares que necesitan
//     actualización. No se puede escapar ninguno. Refactorización segura.
//
//  3. DOCUMENTACIÓN VIVA EN EL CÓDIGO:
//
//      Sin TypeScript — ¿qué se supone que hace esta función?
//     function procesarPago(datos, opciones) { ... }
//      ¿Qué es 'datos'? ¿Un objeto? ¿Un string? ¿Un array?
//      Tienes que leer TODO el cuerpo para entender qué espera.
//
//      Con TypeScript — todo queda claro de inmediato:
//      function procesarPago(datos: DatosTarjeta, opciones: OpcionesPago): ResultadoPago
//      Solo con la firma sabes exactamente qué recibe y qué devuelve.
//      No hace falta leer el cuerpo ni la documentación.
//
//  4. DETECCIÓN TEMPRANA DE ERRORES COMUNES:
//     → Llamar función sin pasar argumentos requeridos
//     → Acceder a una propiedad que no existe en el objeto
//     → Pasar un string donde se espera un número
//     → Olvidar manejar el caso en que algo puede ser null
//     → Olvidar un 'case' en un switch exhaustivo
//
//  5. EQUIPOS GRANDES — todos siguen el mismo contrato:
//     En un equipo de 10 desarrolladores, TypeScript garantiza
//     que nadie puede pasar datos incorrectos a la función de otro.
//     Los tipos son el contrato entre partes del código.
//
//  ─────────────────────────────────────────────────────────
//  ¿POR QUÉ ANGULAR USA TYPESCRIPT OBLIGATORIAMENTE?
//  ─────────────────────────────────────────────────────────
//
//  Angular fue reescrito completamente en TypeScript en 2016 (Angular 2).
//  No hay forma de usar Angular sin TypeScript. No es opcional.
//
//  Las razones técnicas por las que Google eligió TypeScript:
//
//  RAZÓN 1 — Decoradores:
//  Los decoradores son una característica de TypeScript que permite
//  agregar METADATOS a clases, métodos y propiedades.
//  @Component, @Injectable, @Input, @Output son decoradores.
//  Sin TypeScript, los decoradores no existen. Sin decoradores,
//  Angular no puede funcionar.
//
//  RAZÓN 2 — Inyección de Dependencias automática:
//  Angular sabe qué servicio inyectar en cada constructor
//  GRACIAS A LOS TIPOS de TypeScript.
//  constructor(private authService: AuthService) {}
//  Angular lee el tipo 'AuthService' y sabe exactamente qué inyectar.
//  Sin tipos, Angular no podría hacer esto automáticamente.
//
//  RAZÓN 3 — Escala empresarial:
//  Las aplicaciones Angular suelen tener miles de archivos.
//  Google tiene aplicaciones Angular internas con millones de líneas.
//  TypeScript hace ese tamaño manejable.
//
//  RAZÓN 4 — Templates verificados:
//  Con strictTemplates: true en tsconfig.json, TypeScript también
//  verifica los tipos en los templates HTML de Angular.
//  Si en el HTML escribes {{ usuario.emial }}, TypeScript da error.
//
//  CONCLUSIÓN: No es una carga, es una ventaja. Después de aprender
//  los fundamentos (esta investigación), TypeScript se vuelve natural
//  y trabajar sin él se siente inseguro.
//
// ============================================================
//  BLOQUES DE ESTUDIO — TypeScript en comentarios
//
//  Cada bloque explica:
//  1. Por qué existe ese concepto
//  2. La sintaxis exacta en TypeScript (.ts)
//  3. Los errores que TypeScript detectaría
//  4. La conexión con Angular cuando aplica
// ============================================================

"use strict";

// ════════════════════════════════════════════════════════
//  BLOQUE 1: TIPOS PRIMITIVOS
//  string, number y boolean — los tipos más básicos
// ════════════════════════════════════════════════════════
//
//  En JavaScript los tipos son IMPLÍCITOS: JavaScript decide
//  el tipo según el valor que asignas, y puede cambiar en cualquier momento.
//
//  En TypeScript los tipos son EXPLÍCITOS: tú los declaras una vez
//  y TypeScript garantiza que la variable siempre sea de ese tipo.
//
//  La sintaxis para declarar el tipo es:
//  let nombreVariable: tipoDeDato = valorInicial;
//                     ↑
//              dos puntos + tipo
//
//  ── STRING ───────────────────────────────────────────────
//
//  'string' representa cualquier texto, sin importar la longitud:
//  desde "" (string vacío) hasta un párrafo completo.
//  Se puede escribir con comillas simples, dobles o backticks.
//
//   En TypeScript (.ts):
//  let ciudad: string = "Cali";
//  let saludo: string = 'Hola mundo';
//  let mensaje: string = `Bienvenido a ${ciudad}`; // template literal
//   Los tres son strings. TypeScript los reconoce en todos los formatos.
//
//  let nombre: string; // Declaro la variable sin asignar valor todavía
//  nombre = "Ana García"; // La asigno después — TypeScript lo permite
//   nombre = 123;      // ❌ Error: Type 'number' is not assignable to type 'string'
//   TypeScript recuerda que 'nombre' es string aunque no tuviera valor.
//   El tipo queda fijado desde la declaración.
//
//   Métodos disponibles (VS Code los sugiere con autocompletado):
//  ciudad.toUpperCase();       // "CALI"
//  ciudad.toLowerCase();       // "cali"
//  ciudad.includes("ali");     // true
//  ciudad.startsWith("Ca");    // true
//  ciudad.replace("Ca", "Ba"); // "Bali"
//  ciudad.split("");           // ["C", "a", "l", "i"]
//  ciudad.length;              // 4 (número de caracteres)
//  ciudad.trim();              // elimina espacios al inicio y final
//
//   Con TypeScript, todos estos métodos tienen autocompletado.
//   Sin TypeScript, VS Code no sabe si ciudad es string o no.
//
//  ── NUMBER ───────────────────────────────────────────────
//
//  En lenguajes como Java o C# tienes:
//  int (entero), float (decimal), double (decimal preciso),
//  long (entero grande), short (entero pequeño), etc.
//
//  En TypeScript y JavaScript NO existe esa distinción.
//  TODOS los números son del tipo 'number', sin importar si son
//  enteros, decimales, negativos o muy grandes.
//  Esto simplifica mucho el trabajo con números.
//
//   En TypeScript (.ts):
//  let edad: number = 28;           // entero positivo
//  let precio: number = 99.99;      // decimal
//  let temperatura: number = -5;    // negativo
//  let porcentaje: number = 0.75;   // entre 0 y 1
//  let poblacion: number = 2_200_000; // separador visual para legibilidad
//   El _ no afecta el valor. 2_200_000 es exactamente 2200000.
//   TypeScript ignora el _ al compilar. Solo mejora la legibilidad.
//
//   Valores especiales de number:
//  let infinito: number = Infinity;    // resultado de 1/0
//  let noEsNum: number  = NaN;         // Not a Number: resultado de "hola" * 2
//  let max: number      = Number.MAX_SAFE_INTEGER; // 9007199254740991
//
//  // Operaciones matemáticas — TypeScript las verifica:
//  let resultado: number = edad + precio; // ✅ number + number = number
//  // let malo: number = edad + ciudad;   // ❌ Error: string no se puede sumar así
//
//  ── BOOLEAN ──────────────────────────────────────────────
//
//  'boolean' solo tiene DOS valores posibles: true o false.
//  Nada más. No hay "truthy" ni "falsy" como en JavaScript.
//  En TypeScript, 0 es number, NO es boolean.
//  "" es string, NO es boolean.
//  null es null, NO es boolean.
//
//  // En TypeScript (.ts):
//  let estaActivo: boolean = true;
//  let tienePermiso: boolean = false;
//  let esMayorDeEdad: boolean = edad >= 18; // la expresión evalúa a boolean
//  let esAdminYActivo: boolean = esAdmin && estaActivo; // && retorna boolean
//  let esAdminOActivo: boolean = esAdmin || estaActivo; // || retorna boolean
//
//  // En TypeScript estricto, no puedes asignar "truthy" a boolean:
//  // let activo: boolean = 1;       // ❌ Error: '1' no es boolean
//  // let activo: boolean = "true";  // ❌ Error: '"true"' no es boolean
//  // let activo: boolean = null;    // ❌ Error: 'null' no es boolean (con strict)
//
//  ─────────────────────────────────────────────────────────
//  INFERENCIA DE TIPOS — No siempre necesitas escribir el tipo
//  ─────────────────────────────────────────────────────────
//
//  TypeScript tiene un motor de INFERENCIA muy inteligente.
//  Cuando asignas un valor al declarar la variable, TypeScript
//  puede deducir el tipo solo. No tienes que repetirte.
//
//  // En TypeScript (.ts):
//  let ciudad = "Cali";    // TypeScript infiere: string (por el valor "Cali")
//  let descuento = 15;     // TypeScript infiere: number (por el valor 15)
//  let activo = true;      // TypeScript infiere: boolean (por el valor true)
//
//  // Estos son EXACTAMENTE EQUIVALENTES a:
//  let ciudad2: string  = "Cali";
//  let descuento2: number = 15;
//  let activo2: boolean = true;
//
//  // Aunque no declares el tipo, TypeScript LO RECUERDA:
//  ciudad = "Bogotá";  // ✅ string → string, OK
//  ciudad = 42;        // ❌ Error: el tipo string fue fijado por inferencia
//  ciudad = true;      // ❌ Error: igual, TypeScript sabe que es string
//
//  CUÁNDO dejar que TypeScript infiera (no escribir el tipo):
//  ✅ const nombre = "Ana";             // El valor grita que es string
//  ✅ const total = precio * cantidad;  // Operación de numbers → number
//  ✅ const activo = usuario.activo;    // TypeScript lo saca del tipo de usuario
//
//  CUÁNDO escribir el tipo explícitamente:
//  ✅ let resultado: number;            // Declaras sin valor inicial
//  ✅ function saludar(nombre: string)  // Parámetros de funciones
//  ✅ function calcular(): number       // Tipo de retorno de funciones públicas
//  ✅ let datos: Usuario | null = null  // Uniones no obvias

// ════════════════════════════════════════════════════════
//  BLOQUE 2: TIPOS ESPECIALES
//  any, unknown, void, never, null y undefined
// ════════════════════════════════════════════════════════
//
//  Además de string, number y boolean, TypeScript tiene tipos
//  para situaciones especiales. Conocerlos es clave para escribir
//  código TypeScript de calidad y evitar trampas comunes.
//
//  ── any — El "tipo trampa" que DEBES evitar ──────────────
//
//  'any' es la puerta trasera de TypeScript. Cuando lo usas,
//  le dices al compilador: "No me importa el tipo de esta variable.
//  Deja de verificar. Confía en mí."
//
//  TypeScript deja de verificar ESA variable completamente.
//  No hay autocompletado útil, no hay detección de errores,
//  no hay ninguna de las ventajas de TypeScript.
//  Es exactamente igual a JavaScript puro.
//
//  // En TypeScript (.ts) — qué pasa con 'any':
//  let valor: any = "texto inicial";
//  valor = 42;                  // OK, sin error (cambió a number)
//  valor = true;                // OK, sin error (cambió a boolean)
//  valor = { id: 1, nombre: "Ana" }; // OK, sin error (cambió a objeto)
//  valor.metodoInventado();     // ✅ TypeScript lo permite... 💥 FALLA en runtime
//  valor.propiedadQueNoExiste;  // ✅ TypeScript lo permite... 💥 FALLA en runtime
//  valor * 2;                   // ✅ TypeScript lo permite... resultado impredecible
//
//  El problema no es que se permitan esas operaciones en compilación.
//  El problema es que TypeScript ya no te protege de NADA.
//  Cualquier error que habrías detectado al compilar, ahora
//  solo lo descubres cuando el usuario encuentra el bug.
//
//  CUÁNDO EVITAR 'any' (la respuesta corta: siempre):
//  → En código nuevo que tú controlas: NUNCA uses 'any'.
//  → Si algo "parece necesitar" any, hay un tipo mejor disponible.
//
//  CUÁNDO puede ser aceptable (casos muy contados):
//  → Al migrar gradualmente un proyecto de JS a TS (es temporal)
//  → Con librerías de terceros muy antiguas sin tipos definidos
//  → Como deuda técnica temporal con un TODO en el código
//
//  ── unknown — La alternativa SEGURA a 'any' ──────────────
//
//  'unknown' también acepta CUALQUIER tipo de valor, igual que 'any'.
//  La diferencia fundamental: 'unknown' te OBLIGA a verificar
//  qué tipo es antes de poder usarlo.
//
//  Analogía útil:
//  'any'    = paquete que abres y usas sin mirar qué contiene.
//  'unknown' = paquete que PRIMERO inspeccionas (¿es frágil? ¿peligroso?)
//              y LUEGO usas con cuidado según lo que encontraste.
//
//  // En TypeScript (.ts):
//  let dato: unknown = obtenerRespuestaDeServidor();
//  // 'dato' puede ser cualquier cosa que devuelva el servidor.
//
//  // NO puedes usar 'unknown' directamente:
//  // dato.toUpperCase();   // ❌ Error: Object is of type 'unknown'
//  // dato * 2;             // ❌ Error: Object is of type 'unknown'
//  // dato.id;              // ❌ Error: Object is of type 'unknown'
//
//  // DEBES verificar el tipo primero (esto se llama type narrowing):
//  if (typeof dato === "string") {
//    // TypeScript SABE que dato es string en este bloque
//    console.log(dato.toUpperCase()); // ✅ Permitido
//    console.log(dato.length);        // ✅ Permitido
//  }
//
//  if (typeof dato === "number") {
//    // TypeScript SABE que dato es number en este bloque
//    console.log(dato * 2);           // ✅ Permitido
//    console.log(dato.toFixed(2));    // ✅ Permitido
//  }
//
//  if (typeof dato === "object" && dato !== null && "id" in dato) {
//    // Verificamos que sea objeto, no null, y que tenga propiedad 'id'
//    console.log(dato.id);            // ✅ Permitido
//  }
//
//  REGLA PRÁCTICA: Cuando el tipo genuinamente no se conoce,
//  usa 'unknown' en lugar de 'any'. Te obliga a ser seguro.
//
//  EN ANGULAR: 'unknown' aparece mucho en manejo de errores:
//  // try {
//  //   await this.http.post('/api/guardar', datos).toPromise();
//  // } catch (error: unknown) {
//  //   if (error instanceof HttpErrorResponse) {
//  //     // Aquí TypeScript SABE que error tiene .status, .message, etc.
//  //     this.mensajeError = error.message;
//  //   }
//  // }
//
//  ── void — "Esta función no devuelve ningún valor útil" ──
//
//  'void' es el tipo de retorno para funciones que realizan una
//  ACCIÓN pero no devuelven ningún dato.
//  Funciones de efecto secundario: guardar, navegar, mostrar, emitir.
//
//  La diferencia con 'undefined':
//  void = "esta función INTENCIONALMENTE no retorna nada"
//  undefined = "este valor no existe todavía"
//
//  // En TypeScript (.ts):
//  function mostrarNotificacion(mensaje: string): void {
//    alert(mensaje);
//    // No hay return → TypeScript espera void → correcto
//    // return 42;   // ❌ Error: Type 'number' is not assignable to type 'void'
//    // return;      // ✅ OK: return sin valor es válido en void
//  }
//
//  function guardarEnStorage(clave: string, valor: string): void {
//    localStorage.setItem(clave, valor);
//    // Solo guarda, no devuelve nada útil → void
//  }
//
//  function registrarLog(nivel: string, datos: object): void {
//    console.log(`[${nivel}]`, datos);
//    // Solo loguea → void
//  }
//
//  EN ANGULAR — casi todos los métodos de componentes son void:
//  // ngOnInit(): void { this.cargarUsuarios(); }
//  // onGuardarClick(): void { this.usuarioService.guardar(this.formulario.value); }
//  // onCancelar(): void { this.router.navigate(['/lista']); }
//
//  ── never — "Esta función NUNCA termina de forma normal" ─
//
//  'never' es el tipo más extremo. Representa valores que
//  literalmente NUNCA ocurren. Se usa cuando una función:
//  a) Siempre lanza una excepción (nunca retorna)
//  b) Tiene un bucle infinito (nunca termina)
//
//  Diferencia clave con void:
//  void = la función TERMINA pero sin devolver valor útil
//  never = la función NUNCA TERMINA (interrumpe el programa o corre forever)
//
//  // En TypeScript (.ts):
//  function lanzarError(mensaje: string): never {
//    throw new Error(mensaje);
//    // throw interrumpe el flujo. La función nunca llega al final.
//    // Código después del throw nunca se ejecuta → tipo: never
//  }
//
//  function bucleServidor(): never {
//    while (true) {
//      procesarPeticiones(); // corre para siempre
//    }
//    // Nunca termina → tipo: never
//  }
//
//  // 'never' en EXHAUSTIVE CHECKS — verificar todos los casos posibles:
//  // type Color = "rojo" | "verde" | "azul";
//  //
//  // function procesarColor(color: Color): string {
//  //   switch (color) {
//  //     case "rojo":  return "#FF0000";
//  //     case "verde": return "#00FF00";
//  //     case "azul":  return "#0000FF";
//  //     default:
//  //       const _agotado: never = color;
//  //       // Si agregas "amarillo" a Color pero olvidas el case,
//  //       // TypeScript da error AQUÍ porque color ya no es never.
//  //       // Es una trampa de seguridad para no olvidar casos.
//  //       throw new Error(`Color no manejado: ${color}`);
//  //   }
//  // }
//
//  ── null y undefined — Los valores "vacíos" ──────────────
//
//  En JavaScript, null y undefined representan ausencia de valor.
//  Son parecidos pero tienen semánticas diferentes:
//  - undefined: la variable existe pero no se le asignó ningún valor
//  - null: se asignó explícitamente "vacío" como valor intencional
//
//  Con TypeScript y strict: true activado (siempre debes tenerlo),
//  null y undefined son tipos SEPARADOS y ESPECÍFICOS.
//  No puedes asignarlos a string, number, etc. sin declararlo.
//
//  // Sin strict (MAL — no hagas esto):
//  // let nombre: string = null;   // TypeScript lo permitiría sin strict
//
//  // Con strict: true (BIEN — como debes trabajar siempre):
//  // let nombre: string = null;   // ❌ Error: 'null' is not assignable to 'string'
//
//  // Para permitir null, debes usar UNIÓN DE TIPOS explícitamente:
//  let nombre: string | null = null;
//  // nombre puede ser string O null. Ambos son válidos.
//
//  nombre = "Ana García";  // ✅ string asignado
//  nombre = null;          // ✅ null asignado (indica "sin usuario")
//  // nombre = 42;         // ❌ Error: 'number' no está en el tipo
//
//  // Para usar nombre cuando puede ser null, DEBES verificar primero:
//  if (nombre !== null) {
//    // TypeScript SABE que nombre es string aquí
//    console.log(nombre.toUpperCase()); // ✅
//  }
//
//  // Operadores especiales para null/undefined (muy usados en Angular):
//  //
//  // Optional chaining (?.) — accede a la propiedad solo si no es null/undefined:
//  // usuario?.nombre          → undefined si usuario es null, o el nombre
//  // usuario?.direccion?.ciudad → encadenado: seguro en múltiples niveles
//  //
//  // Nullish coalescing (??) — valor por defecto si es null o undefined:
//  // const display = nombre ?? "Usuario Anónimo"
//  // Si nombre es null → usa "Usuario Anónimo"
//  // Si nombre tiene valor → usa ese valor
//  //
//  // Non-null assertion (!) — le dices a TypeScript "confía en mí, no es null":
//  // nombre!.toUpperCase()    // Riesgoso: si es null, falla en runtime
//  // Úsalo solo cuando SABES con certeza que no es null

// ════════════════════════════════════════════════════════
//  BLOQUE 3: ARRAYS Y TUPLAS
//  Colecciones tipadas — solo pueden contener el tipo declarado
// ════════════════════════════════════════════════════════
//
//  En JavaScript, un array puede contener cualquier mezcla de tipos:
//  [1, "hola", true, null, { id: 1 }] → esto es válido en JavaScript.
//
//  En TypeScript, un array TIPADO solo puede contener UN tipo.
//  TypeScript verifica cada elemento que agregas y cada operación
//  que haces sobre los elementos del array.
//
//  ── ARRAYS TIPADOS ───────────────────────────────────────
//
//  Hay dos sintaxis exactamente equivalentes para tipar arrays.
//  Puedes usar cualquiera, la primera (Tipo[]) es más común en Angular:
//
//  // En TypeScript (.ts):
//
//  // Sintaxis 1: Tipo[] — la más idiomática en Angular
//  let numeros: number[]  = [1, 2, 3, 4, 5];
//  let nombres: string[]  = ["Ana", "Luis", "María", "Carlos"];
//  let activos: boolean[] = [true, false, true, true];
//
//  // Sintaxis 2: Array<Tipo> — equivalente, más "genérica" visualmente
//  let precios: Array<number> = [10.99, 25.50, 5.00];
//  let etiquetas: Array<string> = ["angular", "typescript"];
//
//  // TypeScript protege las OPERACIONES sobre el array:
//  nombres.push("Pedro");    // ✅ string en array de strings — OK
//  // nombres.push(123);     // ❌ Error: 'number' no es 'string'
//  // nombres.push(true);    // ❌ Error: 'boolean' no es 'string'
//  // nombres[0] = 42;       // ❌ Error: no puedes asignar number a posición de string
//
//  // El tipo funciona para TODOS los métodos del array:
//  const mayusculas: string[] = nombres.map(n => n.toUpperCase());
//  // .map() sobre string[] con callback (string → string) → devuelve string[]
//  // TypeScript infiere que mayusculas es string[]
//
//  const longitudes: number[] = nombres.map(n => n.length);
//  // .map() sobre string[] con callback (string → number) → devuelve number[]
//  // TypeScript infiere que longitudes es number[]
//
//  const primerNombre: string = nombres[0];
//  // TypeScript sabe que primerNombre es string porque nombres es string[]
//  primerNombre.toUpperCase(); // ✅ TypeScript sabe que tiene .toUpperCase()
//
//  // Array de OBJETOS con interface — el caso más común en Angular:
//  //
//  // interface Producto {
//  //   id: number;
//  //   nombre: string;
//  //   precio: number;
//  //   disponible: boolean;
//  // }
//  //
//  // let catalogo: Producto[] = [
//  //   { id: 1, nombre: "Laptop", precio: 1200, disponible: true },
//  //   { id: 2, nombre: "Mouse", precio: 25, disponible: true },
//  // ];
//  //
//  // catalogo.push({ id: 3, nombre: "Teclado", precio: 85 });
//  // ❌ Error: Property 'disponible' is missing in type '{ id: number; nombre: string; precio: number; }'
//  // TypeScript exige que cada elemento cumpla COMPLETAMENTE la interface.
//
//  // Readonly arrays — arrays que no se pueden modificar:
//  // const ESTADOS: readonly string[] = ["pendiente", "activo", "inactivo"];
//  // ESTADOS.push("nuevo");   // ❌ Error: Property 'push' does not exist on type 'readonly string[]'
//  // ESTADOS[0] = "otro";     // ❌ Error: Index signature in type 'readonly string[]' only permits reading
//
//  EN ANGULAR — los arrays tipados aparecen constantemente:
//  // productos: Producto[] = [];           // propiedad del componente
//  // getProductos(): Observable<Producto[]> // método de servicio
//  // @Input() items: string[] = [];         // propiedad que recibe el padre
//  // this.http.get<Producto[]>('/api/productos') // petición HTTP tipada
//
//  ── TUPLAS — Arrays con estructura fija y tipo por posición ──
//
//  Una TUPLA es un tipo de array donde:
//  1. La LONGITUD es fija y conocida de antemano
//  2. Cada POSICIÓN tiene su propio tipo específico y diferente
//
//  La diferencia con un array normal:
//  - Array:  todos los elementos son del MISMO tipo → string[]
//  - Tupla:  cada posición tiene su PROPIO tipo → [string, number, boolean]
//
//  Las tuplas son perfectas cuando los datos tienen una estructura
//  fija donde la POSICIÓN importa: coordenadas, pares clave-valor,
//  resultados de funciones con múltiples valores de retorno.
//
//  // En TypeScript (.ts):
//
//  // Tupla de coordenadas geográficas [latitud, longitud]:
//  let coordCali: [number, number] = [4.7110, -74.0721];
//  // coordCali[0] = 4.7110  (number: latitud)
//  // coordCali[1] = -74.0721 (number: longitud)
//  // coordCali[2] = 0;  // ❌ Error: Tuple type '[number, number]' has no element at index '2'
//
//  // Tupla con tipos DIFERENTES por posición:
//  let registroEmpleado: [string, number, boolean, string] = ["Ana García", 32, true, "Ingeniería"];
//  // [0] string → nombre del empleado
//  // [1] number → edad
//  // [2] boolean → si está activo
//  // [3] string → departamento
//
//  // TypeScript verifica cada posición individualmente:
//  registroEmpleado[0].toUpperCase();  // ✅ posición 0 es string
//  registroEmpleado[1] * 2;            // ✅ posición 1 es number
//  // registroEmpleado[1].toUpperCase(); // ❌ Error: number no tiene toUpperCase
//  // registroEmpleado[0] = 99;          // ❌ Error: number no es string
//
//  // Desestructuración de tuplas — la forma más común de usarlas:
//  const [lat, lng] = coordCali;
//  // lat = 4.7110 (TypeScript sabe que es number)
//  // lng = -74.0721 (TypeScript sabe que es number)
//
//  const [nombreEmp, edadEmp, activoEmp, depto] = registroEmpleado;
//  // TypeScript sabe el tipo exacto de cada variable destructurada
//
//  // Tuplas NOMBRADAS (TypeScript 4.0+) — mucho más legibles:
//  let coordenada: [latitud: number, longitud: number] = [4.7110, -74.0721];
//  let rgb: [rojo: number, verde: number, azul: number] = [255, 128, 0];
//  // Los nombres son solo documentación visual — no afectan el tipo.
//  // Pero quien lea el código entiende QUÉ significa cada posición.
//
//  // Tupla con elemento OPCIONAL:
//  let conOpcional: [string, number, boolean?] = ["Ana", 30];
//  // El tercer elemento es opcional: puede estar o no.
//  conOpcional = ["Ana", 30, true]; // También válido.

// ════════════════════════════════════════════════════════
//  BLOQUE 4: INTERFACES
//  El contrato que deben cumplir los objetos
// ════════════════════════════════════════════════════════
//
//  Una INTERFACE es posiblemente la herramienta más importante
//  de TypeScript para proyectos Angular. Define la ESTRUCTURA
//  exacta que debe tener un objeto: qué propiedades existen,
//  de qué tipo es cada una, cuáles son obligatorias y cuáles
//  opcionales, cuáles pueden modificarse y cuáles no.
//
//  Piénsala como un CONTRATO LEGAL:
//  "Todo objeto que declare ser de tipo Usuario DEBE cumplir
//  exactamente estas reglas. Sin excepciones. Si falta una
//  propiedad requerida o tiene el tipo incorrecto, error."
//
//  // En TypeScript (.ts):
//
//  interface Usuario {
//
//    // ─── PROPIEDADES REQUERIDAS ─────────────────────────────
//    id: number;
//    // Obligatoria: todo Usuario DEBE tener id de tipo number.
//    // Si creas un objeto { nombre: "Ana" } sin id, TypeScript da error.
//
//    nombre: string;
//    // Obligatoria.
//
//    email: string;
//    // Obligatoria.
//
//    // ─── PROPIEDADES OPCIONALES con ? ───────────────────────
//    edad?: number;
//    // El '?' hace la propiedad OPCIONAL.
//    // El objeto puede tenerla o no. Ambos casos son válidos.
//    // Internamente TypeScript la trata como: number | undefined
//    // Si accedes a ella sin verificar, puede ser undefined.
//
//    telefono?: string;
//    // También opcional.
//
//    // ─── PROPIEDADES DE SOLO LECTURA con readonly ───────────
//    readonly fechaCreacion: Date;
//    // Solo se puede asignar al crear el objeto (en el constructor o literal).
//    // Después no se puede cambiar. Es como 'const' pero para propiedades.
//    // usuario.fechaCreacion = new Date(); // ❌ Error: readonly property
//
//    // ─── TIPOS LITERALES — solo valores específicos ─────────
//    rol: "admin" | "usuario" | "moderador";
//    // El valor de 'rol' SOLO puede ser exactamente uno de esos tres strings.
//    // "superadmin" → ❌ Error (no está en la lista)
//    // "ADMIN" → ❌ Error (sensible a mayúsculas)
//    // "admin" → ✅ Válido
//    // Es una unión de tipos literales de string.
//
//    // ─── MÉTODOS EN LA INTERFACE ────────────────────────────
//    obtenerNombreCompleto?(): string;
//    // La interface puede incluir la firma de métodos.
//    // Si está presente, el objeto DEBE tener ese método.
//    // El '?' al final lo hace opcional.
//  }
//
//  // Creando objetos que cumplen la interface:
//  const ana: Usuario = {
//    id: 1,
//    nombre: "Ana García",
//    email: "ana@ejemplo.com",
//    // edad no se incluye → es opcional, está bien
//    fechaCreacion: new Date(),
//    rol: "admin",
//  };
//
//  const luis: Usuario = {
//    id: 2,
//    nombre: "Luis Martínez",
//    email: "luis@ejemplo.com",
//    edad: 28,               // opcional, puede incluirse
//    fechaCreacion: new Date(),
//    rol: "usuario",
//  };
//
//  // Errores que TypeScript detectaría:
//  // const malo1: Usuario = { nombre: "Pedro" };
//  // ❌ Error: Property 'id' is missing in type '{ nombre: string }'
//  //           Property 'email' is missing in type '...'
//  //           Property 'fechaCreacion' is missing in type '...'
//  //           Property 'rol' is missing in type '...'
//  //           (Acumula TODOS los errores juntos)
//
//  // const malo2: Usuario = { ...ana, rol: "hacker" };
//  // ❌ Error: Type '"hacker"' is not assignable to type '"admin" | "usuario" | "moderador"'
//
//  // ana.fechaCreacion = new Date();
//  // ❌ Error: Cannot assign to 'fechaCreacion' because it is a read-only property
//
//  // ─── EXTENDER INTERFACES (herencia) ─────────────────────
//
//  // Una interface puede EXTENDER otra con 'extends'.
//  // Hereda TODAS las propiedades de la interface padre
//  // y agrega sus propias propiedades adicionales.
//
//  // interface UsuarioConPerfil extends Usuario {
//  //   // Hereda TODO de Usuario y agrega:
//  //   avatar: string;
//  //   biografia?: string;
//  //   seguidores: number;
//  //   redesSociales: {               // Objeto anidado dentro de la interface
//  //     twitter?: string;
//  //     linkedin?: string;
//  //     github?: string;
//  //   };
//  // }
//  // Un UsuarioConPerfil tiene:
//  // → De Usuario: id, nombre, email, edad?, telefono?, fechaCreacion, rol
//  // → Propias: avatar, biografia?, seguidores, redesSociales
//
//  // Una interface puede extender MÚLTIPLES interfaces:
//  // interface EntidadCompleta extends ConTimestamps, ConAuditoria, ConSoftDelete {
//  //   // Hereda las propiedades de las tres interfaces
//  // }
//
//  EN ANGULAR — las interfaces son ESENCIALES:
//  //
//  // 1. Tipar respuestas de la API:
//  //    interface UsuarioAPI { id: number; name: string; email: string; }
//  //    this.http.get<UsuarioAPI[]>('/api/usuarios')  // tipado automático
//  //
//  // 2. Ciclo de vida de componentes:
//  //    implements OnInit, OnDestroy, OnChanges
//  //    → TypeScript exige que implementes ngOnInit(), ngOnDestroy(), etc.
//  //
//  // 3. Estado de la aplicación (NgRx):
//  //    interface ProductoState { items: Producto[]; cargando: boolean; error: string | null; }
//  //
//  // 4. Contratos de servicios para testabilidad:
//  //    interface IAuthService { login(): Observable<Token>; logout(): void; }

// ════════════════════════════════════════════════════════
//  BLOQUE 5: TYPE ALIASES
//  Dar nombre a cualquier tipo, no solo a objetos
// ════════════════════════════════════════════════════════
//
//  Un TYPE ALIAS crea un NOMBRE para CUALQUIER tipo.
//  A diferencia de 'interface' que solo puede describir objetos,
//  'type' puede nombrar primitivos, uniones, tuplas, funciones,
//  y también objetos (aunque para objetos se prefiere interface).
//
//  SINTAXIS: type NombreTipo = definición;
//
//  // En TypeScript (.ts):
//
//  // ─── ALIAS PARA PRIMITIVOS Y UNIONES ────────────────────
//
//  type ID = string | number;
//  // Un ID puede venir como string "uuid-abc-123" o como number 42.
//  // Con este alias, escribes 'ID' en lugar de 'string | number' siempre.
//  let idProducto: ID = "prod-001"; // ✅
//  idProducto = 42;                 // ✅
//  // idProducto = true;            // ❌ boolean no está en ID
//
//  type EstadoTarea = "pendiente" | "en_progreso" | "completada" | "cancelada";
//  // Solo esos 4 valores exactos son válidos. Nada más.
//  let estado: EstadoTarea = "pendiente"; // ✅
//  // estado = "borrador"; // ❌ Error: '"borrador"' is not assignable to type 'EstadoTarea'
//  // VS Code autocompletará con los 4 valores disponibles cuando escribas estado =
//
//  type RolUsuario = "admin" | "usuario" | "moderador" | "invitado";
//
//  type PuntajeNota = 0 | 1 | 2 | 3 | 4 | 5;
//  // Solo los enteros del 0 al 5 son válidos.
//  // let nota: PuntajeNota = 6; // ❌ Error: '6' is not assignable to type 'PuntajeNota'
//
//  // ─── ALIAS PARA TIPOS DE FUNCIONES ──────────────────────
//
//  type ManejadorClick = (evento: MouseEvent) => void;
//  // Este tipo describe "una función que recibe MouseEvent y no retorna nada".
//  // Puedes usarlo para tipar callbacks y handlers de eventos.
//
//  type Comparador<T> = (a: T, b: T) => number;
//  // Función que compara dos elementos del mismo tipo.
//  // Comparador<string> = (a: string, b: string) => number
//  // Comparador<Producto> = (a: Producto, b: Producto) => number
//
//  type Predicado<T> = (elemento: T) => boolean;
//  // Función que evalúa si un elemento cumple una condición.
//
//  // ─── ALIAS CON GENÉRICOS — muy usado en Angular ──────────
//
//  type RespuestaAPI<T> = {
//    data: T;
//    error: string | null;
//    statusCode: number;
//    timestamp: string;
//  };
//  // T es el tipo de 'data'. Un mismo tipo sirve para todas las respuestas.
//  // RespuestaAPI<Usuario>    → data es Usuario
//  // RespuestaAPI<Producto[]> → data es Producto[]
//  // RespuestaAPI<void>       → la petición no devuelve datos
//
//  type Paginado<T> = {
//    items: T[];
//    total: number;
//    pagina: number;
//    totalPaginas: number;
//    hayAnterior: boolean;
//    haySiguiente: boolean;
//  };
//  // Paginado<Usuario>   → lista paginada de usuarios
//  // Paginado<Producto>  → lista paginada de productos
//
//  // ─── INTERFACE vs TYPE — cuándo usar cada uno ────────────
//
//  // SON INTERCAMBIABLES para describir objetos en la mayoría de casos.
//  // Las diferencias REALES que importan:
//
//  // INTERFACE — úsala para:
//  // ✅ Describir la forma de objetos y clases
//  // ✅ Cuando necesitas herencia con 'extends'
//  // ✅ Cuando la librería puede querer extenderla (declaration merging)
//  // ✅ Los errores de TypeScript son más descriptivos con interfaces
//
//  // TYPE ALIAS — úsalo para:
//  // ✅ Uniones de tipos: type Estado = "activo" | "inactivo"
//  // ✅ Tuplas: type Coordenadas = [number, number]
//  // ✅ Tipos de funciones: type Handler = (e: Event) => void
//  // ✅ Primitivos con alias: type ID = string | number
//  // ✅ Tipos condicionales (avanzado)
//
//  // REGLA PRÁCTICA ANGULAR:
//  // → Para objetos/modelos de datos → interface
//  // → Para uniones, tipos de funciones, tuplas → type
//  // → Si tienes dudas → usa interface (es la convención del equipo Angular)

// ════════════════════════════════════════════════════════
//  BLOQUE 6: TIPOS DE UNIÓN E INTERSECCIÓN
//  Combinar tipos existentes para crear nuevos tipos
// ════════════════════════════════════════════════════════
//
//  TypeScript permite COMBINAR tipos para crear nuevos.
//  Hay dos operadores: | (unión, como OR) y & (intersección, como AND).
//
//  ── UNIÓN (|) — "puede ser A o B o C" ────────────────────
//
//  Un tipo unión acepta CUALQUIERA de los tipos listados.
//  Una variable de tipo unión puede tener cualquiera de ellos.
//
//  // En TypeScript (.ts):
//  type StringONumero = string | number;
//  let valor: StringONumero = "abc-123"; // ✅ string
//  valor = 456;                          // ✅ number
//  // valor = true;                      // ❌ boolean no está en la unión
//
//  // Para usar métodos específicos de uno de los tipos,
//  // DEBES verificar cuál es primero (type narrowing):
//  if (typeof valor === "string") {
//    valor.toUpperCase(); // ✅ TypeScript sabe que aquí es string
//  }
//  if (typeof valor === "number") {
//    valor.toFixed(2);    // ✅ TypeScript sabe que aquí es number
//  }
//
//  // ─── DISCRIMINATED UNION — el patrón más poderoso ────────
//
//  // Es una unión de interfaces donde cada tipo tiene un campo especial
//  // (el "discriminador") con un valor ÚNICO que lo identifica.
//  // TypeScript usa ese campo para saber exactamente con cuál trabaja.
//  // Es el patrón BASE de NgRx (gestión de estado en Angular).
//
//  // interface EstadoCargando {
//  //   estado: "cargando";  // ← discriminador único de este tipo
//  //   // No hay datos ni error: solo estamos cargando
//  // }
//  //
//  // interface EstadoExito<T> {
//  //   estado: "exito";     // ← discriminador único de este tipo
//  //   datos: T;            // Solo EstadoExito tiene 'datos'
//  // }
//  //
//  // interface EstadoError {
//  //   estado: "error";     // ← discriminador único de este tipo
//  //   mensaje: string;     // Solo EstadoError tiene 'mensaje'
//  //   codigo: number;
//  // }
//  //
//  // type EstadoPeticion<T> = EstadoCargando | EstadoExito<T> | EstadoError;
//  //
//  // function procesarEstado(peticion: EstadoPeticion<Usuario[]>): void {
//  //   switch (peticion.estado) {
//  //     case "cargando":
//  //       // TypeScript SABE que peticion es EstadoCargando
//  //       mostrarSpinner(); // no hay .datos ni .mensaje aquí
//  //       break;
//  //     case "exito":
//  //       // TypeScript SABE que peticion es EstadoExito<Usuario[]>
//  //       renderizarLista(peticion.datos); // ✅ .datos existe y es Usuario[]
//  //       break;
//  //     case "error":
//  //       // TypeScript SABE que peticion es EstadoError
//  //       mostrarError(peticion.mensaje, peticion.codigo); // ✅
//  //       break;
//  //   }
//  // }
//
//  ── INTERSECCIÓN (&) — "debe ser A y también B" ──────────
//
//  Una intersección COMBINA múltiples tipos en uno solo.
//  El resultado DEBE cumplir con TODOS los tipos al mismo tiempo.
//  Útil para agregar "capas" de propiedades a un tipo base.
//
//  // En TypeScript (.ts):
//
//  // interface ConTimestamps {
//  //   creadoEn: Date;
//  //   actualizadoEn: Date;
//  // }
//  //
//  // interface ConAuditoria {
//  //   creadoPor: string;
//  //   actualizadoPor: string;
//  // }
//  //
//  // interface ConSoftDelete {
//  //   eliminado: boolean;
//  //   eliminadoEn?: Date;
//  // }
//  //
//  // type EntidadCompleta = ConTimestamps & ConAuditoria & ConSoftDelete;
//  // EntidadCompleta tiene TODAS las propiedades de los tres tipos:
//  // creadoEn, actualizadoEn, creadoPor, actualizadoPor, eliminado, eliminadoEn?
//  //
//  // type ProductoEnBD = Producto & EntidadCompleta;
//  // ProductoEnBD tiene: todas las props de Producto + todas las de EntidadCompleta
//  //
//  // En una app real, todos los documentos de MongoDB tienen estas propiedades.
//  // En lugar de repetirlas en cada interface, se definen una vez y se combinan.

// ════════════════════════════════════════════════════════
//  BLOQUE 7: ENUMS
//  Constantes nombradas — evitar "magic strings" y "magic numbers"
// ════════════════════════════════════════════════════════
//
//  El problema de los "magic strings" o "magic numbers":
//  Son valores literales dispersos por el código que no tienen
//  ningún nombre significativo ni protección de tipos.
//
//  // ❌ MAL — magic strings sin protección:
//  // function procesarPago(estado: string) {
//  //   if (estado === "completado") { ... }  // ¿Y si escribes "Completado"?
//  //   if (estado === "rechazado")  { ... }  // ¿O "rechazado " (con espacio)?
//  //   if (estado === "PENDIENTE")  { ... }  // ¿O "pendiente" (minúsculas)?
//  // }
//  // TypeScript no puede verificar qué strings son válidos.
//  // Cualquier string pasa. Los errores son invisibles hasta runtime.
//
//  // ✅ BIEN — enum con protección completa:
//  // function procesarPago(estado: EstadoPago) { ... }
//  // procesarPago(EstadoPago.COMPLETADO);  // ✅ único valor válido
//  // procesarPago("completado");           // ❌ Error: no es tipo EstadoPago
//
//  // En TypeScript (.ts):
//
//  // ─── STRING ENUM — el tipo más recomendado ───────────────
//  // Cada miembro tiene un valor string explícito.
//  // Los valores son legibles en logs, en la red y en el localStorage.
//
//  // enum EstadoPago {
//  //   PENDIENTE  = "pendiente",
//  //   PROCESANDO = "procesando",
//  //   COMPLETADO = "completado",
//  //   RECHAZADO  = "rechazado",
//  //   CANCELADO  = "cancelado",
//  // }
//
//  // enum Rol {
//  //   ADMIN      = "admin",
//  //   USUARIO    = "usuario",
//  //   MODERADOR  = "moderador",
//  //   INVITADO   = "invitado",
//  // }
//
//  // ─── NUMERIC ENUM — cuando los valores numéricos importan ─
//
//  // enum Prioridad {
//  //   MUY_BAJA = 1,
//  //   BAJA     = 2,
//  //   MEDIA    = 3,
//  //   ALTA     = 4,
//  //   CRITICA  = 5,
//  // }
//  //
//  // function esCritico(prioridad: Prioridad): boolean {
//  //   return prioridad >= Prioridad.ALTA; // Comparación numérica: >= 4
//  // }
//
//  // ─── ALTERNATIVA MODERNA — union de literales (más ligera) ─
//  //
//  // type EstadoPago2 = "pendiente" | "procesando" | "completado" | "rechazado";
//  //
//  // Ventajas sobre enum:
//  // → NO genera código JavaScript extra (enum sí genera un objeto en el .js)
//  // → Los valores son strings normales (más fáciles en JSON y APIs)
//  // → No necesitas importar el tipo en cada archivo
//  //
//  // Muchos equipos Angular modernos prefieren union de literales.
//  // Para proyectos nuevos, considera usar union de literales sobre enum.

// ════════════════════════════════════════════════════════
//  BLOQUE 8: GENÉRICOS <T>
//  Código que funciona con CUALQUIER tipo manteniendo la seguridad
// ════════════════════════════════════════════════════════
//
//  Los GENÉRICOS son la característica más poderosa de TypeScript.
//  Permiten escribir código que trabaja con CUALQUIER tipo de dato,
//  pero PRESERVANDO la información del tipo en cada uso concreto.
//
//  Analogía para entenderlos:
//  Un genérico es como una "variable de tipo".
//  Igual que una variable de datos guarda un valor (42, "hola", true),
//  una variable de tipo guarda un tipo (string, number, Usuario).
//  El tipo se "rellena" cuando llamas la función o creas el objeto.
//
//  ─────────────────────────────────────────────────────────
//  EL PROBLEMA SIN GENÉRICOS
//  ─────────────────────────────────────────────────────────
//
//  Necesitas una función que devuelve el primer elemento de cualquier array.
//
//  // OPCIÓN 1: Usar 'any' — funciona pero pierde el tipo:
//  // function primerElemento(arr: any[]): any {
//  //   return arr[0];
//  // }
//  // const p = primerElemento(["Ana", "Luis"]); // p es 'any'
//  // p.toUpperCase(); // Sin error pero sin autocompletado
//  // p * 2;          // Sin error aunque sea string — inseguro
//
//  // OPCIÓN 2: Una función por tipo — funciona pero duplica código:
//  // function primerString(arr: string[]): string  { return arr[0]; }
//  // function primerNumber(arr: number[]): number  { return arr[0]; }
//  // function primerBoolean(arr: boolean[]): boolean { return arr[0]; }
//  // → Hay que escribir una versión nueva para cada tipo nuevo.
//
//  ─────────────────────────────────────────────────────────
//  LA SOLUCIÓN CON GENÉRICOS
//  ─────────────────────────────────────────────────────────
//
//  // En TypeScript (.ts) — UNA función para todos los tipos:
//  // function primerElemento<T>(arr: T[]): T {
//  //   return arr[0];
//  // }
//  //                ↑
//  // T se declara entre < > después del nombre de la función.
//  // Es una "variable de tipo": se reemplaza por el tipo real
//  // cuando TypeScript procesa cada llamada de la función.
//
//  // Cuando llamas la función, TypeScript infiere T automáticamente:
//  // const a = primerElemento(["Ana", "Luis"]);  // T=string → a es string
//  // const b = primerElemento([1, 2, 3]);         // T=number → b es number
//  // const c = primerElemento([true, false]);     // T=boolean → c es boolean
//
//  // Y el autocompletado funciona según el tipo:
//  // a.toUpperCase();  // ✅ TypeScript sabe que a es string
//  // b.toFixed(2);     // ✅ TypeScript sabe que b es number
//  // c && true;        // ✅ TypeScript sabe que c es boolean
//  // a * 2;            // ❌ Error: string no se puede multiplicar
//
//  // ─── GENÉRICOS EN INTERFACES Y TYPE ALIASES ──────────────
//
//  // interface Caja<T> {
//  //   contenido: T;
//  //   etiqueta: string;
//  //   sellado: boolean;
//  // }
//  // Caja<string>          → contenido es string
//  // Caja<number>          → contenido es number
//  // Caja<Producto[]>      → contenido es un array de Producto
//
//  // type Estado<T> = {
//  //   datos: T | null;
//  //   cargando: boolean;
//  //   error: string | null;
//  // };
//  // Estado<Usuario>       → datos es Usuario | null
//  // Estado<Producto[]>    → datos es Producto[] | null
//  // ESTE PATRÓN es muy común para manejar estado asíncrono en Angular.
//
//  // ─── GENÉRICOS CON RESTRICCIONES (extends) ───────────────
//
//  // A veces necesitas que T tenga ciertas propiedades.
//  // Usas 'extends' para imponer restricciones al tipo genérico:
//
//  // function buscarPorId<T extends { id: number }>(array: T[], id: number): T | undefined {
//  //   return array.find(elemento => elemento.id === id);
//  //   // T extends { id: number } → T debe tener al menos una propiedad 'id: number'
//  //   // TypeScript permite acceder a elemento.id porque lo exige la restricción
//  //   // Pero retorna T completo: si T es Usuario, retorna Usuario con todas sus propiedades
//  // }
//
//  EN ANGULAR — los genéricos están en todos lados:
//  // Observable<T>                    → flujo de datos de tipo T
//  // Promise<T>                       → promesa que resuelve en T
//  // EventEmitter<T>                  → emisor de eventos de tipo T
//  // HttpClient.get<T>(url)           → GET request que devuelve T
//  // signal<T>(valorInicial)          → signal del tipo T (Angular 17+)
//  // WritableSignal<T>                → signal modificable de tipo T

// ════════════════════════════════════════════════════════
//  BLOQUE 9: UTILITY TYPES
//  Tipos predefinidos para transformar otros tipos
// ════════════════════════════════════════════════════════
//
//  TypeScript incluye una librería de UTILITY TYPES predefinidos.
//  Son tipos genéricos que toman un tipo existente y lo transforman.
//  No necesitas instalarlos ni importarlos. Siempre están disponibles.
//
//  Interface base para los ejemplos:
//  interface Tarea {
//    id: number;           titulo: string;
//    descripcion: string;  prioridad: number;
//    completada: boolean;  etiquetas?: string[];
//  }
//
//  ── Partial<T> ─── "Todo opcional" ───────────────────────
//
//  Crea un tipo donde TODAS las propiedades de T pasan a ser opcionales.
//  Equivale a agregarle '?' a cada propiedad.
//
//  // type TareaEditable = Partial<Tarea>
//  // Resultado: { id?: number; titulo?: string; descripcion?: string;
//  //              prioridad?: number; completada?: boolean; etiquetas?: string[]; }
//
//  // Uso real 1 — función de actualización parcial (PATCH):
//  // function actualizarTarea(id: number, cambios: Partial<Tarea>): Promise<Tarea> {
//  //   // cambios puede ser solo { titulo: "Nuevo título" } sin los demás campos
//  //   // O { estado: "completada", prioridad: 5 } con solo los campos cambiados
//  // }
//
//  // Uso real 2 — formulario de edición donde no todo es obligatorio:
//  // let borrador: Partial<Tarea> = {};
//  // borrador.titulo = "Primera tarea";    // Agrego un campo
//  // borrador.prioridad = 3;               // Agrego otro
//  // // Al guardar, verificas que tenga todos los campos requeridos
//
//  ── Required<T> ─── "Todo requerido" ─────────────────────
//
//  Elimina todos los '?' — hace cada propiedad obligatoria.
//  Lo contrario exacto de Partial<T>.
//
//  // type TareaCompleta = Required<Tarea>
//  // 'etiquetas' ya no es opcional: etiquetas: string[] (requerida)
//
//  // Uso real — cuando lees de la BD y sabes que el objeto está completo:
//  // function guardarEnCache(tarea: Required<Tarea>): void { ... }
//
//  ── Readonly<T> ─── "Todo de solo lectura" ────────────────
//
//  Hace que TODAS las propiedades sean de solo lectura.
//  No puedes modificar ninguna propiedad después de crear el objeto.
//
//  // type TareaInmutable = Readonly<Tarea>
//  // Resultado: { readonly id: number; readonly titulo: string; ... }
//
//  // const tarea: Readonly<Tarea> = { id: 1, titulo: "Estudiar", ... };
//  // tarea.titulo = "Otro";  // ❌ Error: Cannot assign to 'titulo' (read-only)
//
//  // Uso real — estado de NgRx que NO debe mutarse directamente:
//  // interface ProductoState { readonly items: Readonly<Producto[]>; }
//  // El estado solo cambia a través de acciones, nunca directamente.
//
//  ── Pick<T, K> ─── "Solo las propiedades que elijo" ───────
//
//  Crea un tipo con UN SUBCONJUNTO de las propiedades de T.
//  Las propiedades que no eliges NO existen en el nuevo tipo.
//
//  // type ResumenTarea = Pick<Tarea, "id" | "titulo" | "completada">
//  // Resultado: { id: number; titulo: string; completada: boolean }
//  // descripcion, prioridad y etiquetas NO EXISTEN en ResumenTarea
//
//  // Uso real — la API devuelve objetos reducidos en las listas:
//  // function obtenerListaTareas(): Observable<Pick<Tarea, "id" | "titulo" | "completada">[]>
//  // La lista solo muestra id, título y estado. El detalle completo se carga después.
//
//  ── Omit<T, K> ─── "Todo excepto las que excluyo" ─────────
//
//  Lo contrario de Pick: todas las propiedades EXCEPTO las excluidas.
//
//  // type TareaSinID = Omit<Tarea, "id">
//  // Tiene: titulo, descripcion, prioridad, completada, etiquetas?
//  // NO tiene: id
//
//  // type CrearTareaDTO = Omit<Tarea, "id" | "completada">
//  // El usuario solo provee: titulo, descripcion, prioridad, etiquetas?
//  // id → lo genera el servidor (autoincrement o UUID)
//  // completada → siempre empieza en false, no lo elige el usuario
//
//  // function crearTarea(nuevaTarea: CrearTareaDTO): Observable<Tarea>
//  // Al crear, solo envías los datos que el usuario puede definir.
//
//  ── Record<K, V> ─── "Mapa de clave → valor con tipos" ────
//
//  Crea un tipo de objeto donde todas las claves son de tipo K
//  y todos los valores son de tipo V.
//
//  // type ErroresPorCampo = Record<string, string>
//  // { nombre: "El nombre es requerido", email: "Formato de email inválido" }
//
//  // type CacheProductos = Record<number, Producto>
//  // { 1: { id: 1, nombre: "Laptop", ... }, 2: { id: 2, nombre: "Mouse", ... } }
//  // Búsqueda O(1): cache[productoId] → devuelve el producto directamente
//
//  // type TraduccionesApp = Record<string, Record<string, string>>
//  // { es: { guardar: "Guardar", cancelar: "Cancelar" },
//  //   en: { guardar: "Save", cancelar: "Cancel" } }
//
//  ── NonNullable<T> ─── "Elimina null y undefined" ──────────
//
//  // type SoloString = NonNullable<string | null | undefined>
//  // Resultado: string (sin null ni undefined)
//
//  // Útil después de verificar que un valor no es null:
//  // const nombreSeguro: NonNullable<typeof nombre> = nombre!;
//
//  ── ReturnType<T> ─── "El tipo que devuelve una función" ───
//
//  // function obtenerConfig() {
//  //   return { apiUrl: "https://api.com", timeout: 5000, debug: false };
//  // }
//  // type Config = ReturnType<typeof obtenerConfig>
//  // Resultado: { apiUrl: string; timeout: number; debug: boolean }
//  // Útil cuando no tienes la interface pero sí la función.

// ════════════════════════════════════════════════════════
//  BLOQUE 10: tsconfig.json
//  La configuración del compilador TypeScript explicada
// ════════════════════════════════════════════════════════
//
//  tsconfig.json es el archivo de configuración del compilador (tsc).
//  Está en la raíz del proyecto, junto al package.json.
//  Angular CLI lo crea y configura automáticamente.
//  Aquí están las opciones más importantes y qué hacen:
//
//  {
//    "compilerOptions": {
//
//      "target": "ES2022"
//      ──────────────────
//      A qué versión de JavaScript debe compilar.
//      ES2022 = JavaScript moderno. Soportado por todos los
//      navegadores actuales y Node.js moderno.
//      Si necesitas IE11 (muy raro hoy): "ES5".
//
//      "lib": ["ES2022", "dom"]
//      ─────────────────────────
//      Qué APIs globales están disponibles en tu código.
//      "dom"    → document, window, HTMLElement, Event, localStorage...
//      "ES2022" → Promise, Map, Set, Array.flat(), structuredClone...
//      Sin "dom", TypeScript no reconocería document.getElementById().
//
//      "strict": true   ← LA MÁS IMPORTANTE
//      ────────────────
//      Activa el "modo estricto" de TypeScript. Enciende VARIAS
//      verificaciones adicionales de una sola vez:
//      - strictNullChecks: null/undefined son tipos separados (no puedes asignar null a string)
//      - noImplicitAny: si TypeScript no puede inferir el tipo, da error (no infiere 'any')
//      - strictFunctionTypes: verifica los tipos en callbacks y funciones
//      - strictPropertyInitialization: las propiedades de clase deben inicializarse
//      SIEMPRE actívalo en proyectos nuevos. Sin él, TypeScript es mucho menos útil.
//
//      "noImplicitAny": true
//      ─────────────────────
//      Si TypeScript no puede inferir el tipo de un parámetro o variable,
//      da ERROR en lugar de inferir 'any' silenciosamente.
//      // function procesar(datos) { ... }  // ❌ Error: 'datos' has implicit 'any' type
//      // Debes declarar: function procesar(datos: string) { ... }
//
//      "strictNullChecks": true
//      ─────────────────────────
//      null y undefined NO se pueden asignar a string, number, etc.
//      El error más común en JavaScript (null pointer exceptions) es
//      detectado por TypeScript ANTES de ejecutar el código.
//      // let nombre: string = null;   // ❌ Error con strictNullChecks
//      // let nombre: string | null = null;  // ✅ decláralo explícitamente
//
//      "noUnusedLocals": true
//      ───────────────────────
//      Error si declaras una variable y nunca la usas.
//      Previene código muerto y variables olvidadas.
//      // const temporal = "hola";  // ❌ Error: 'temporal' is declared but never read
//
//      "noUnusedParameters": true
//      ───────────────────────────
//      Error si declaras un parámetro de función y nunca lo usas dentro.
//      // function sumar(a: number, b: number) { return a; }
//      // ❌ Error: 'b' is declared but never read
//      // Si intencionalmente no lo usas, prefija con _:
//      // function sumar(a: number, _b: number) { return a; }
//
//      "skipLibCheck": true
//      ─────────────────────
//      No verifica los tipos de las definiciones en node_modules.
//      Acelera SIGNIFICATIVAMENTE la compilación en proyectos grandes.
//      Casi siempre debe estar activado.
//
//      "experimentalDecorators": true
//      ──────────────────────────────
//      NECESARIO para usar decoradores: @Component, @Injectable, etc.
//      Angular no puede funcionar sin esto.
//      Angular CLI lo activa automáticamente.
//
//      "paths": { "@app/*": ["src/app/*"] }
//      ─────────────────────────────────────
//      Alias de rutas para imports más limpios.
//      Sin paths: ../../../../core/services/auth.service
//      Con paths:  @app/core/services/auth.service
//    }
//  }

// ════════════════════════════════════════════════════════
//  DEMOSTRACIÓN EJECUTABLE
//  Ejecuta: node 01_typescript_fundamentos.js
//  Esta sección corre en Node.js y muestra los conceptos en acción.
// ════════════════════════════════════════════════════════

console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║   📘 INVESTIGACIÓN #1 — TypeScript: Fundamentos y Tipos  ║");
console.log("╚══════════════════════════════════════════════════════════╝\n");

// ─────────────────────────────────────────────────────────
//  DEMO 1: Tipos primitivos y cómo TypeScript los ve
// ─────────────────────────────────────────────────────────
console.log("  🔷 DEMO 1 — TIPOS PRIMITIVOS: string, number, boolean");
console.log("  ──────────────────────────────────────────────────────");

const nombreUsuario = "Carlos Mendoza";   // En TS: let nombreUsuario: string
const precioProducto = 99.99;             // En TS: let precioProducto: number
const estaActivo = true;                  // En TS: let estaActivo: boolean
const edad = 28;
const esAdmin = false;
const granNumero = 1_000_000;             // Separador visual de TypeScript

console.log(`  nombreUsuario  = "${nombreUsuario}"`);
console.log(`  → En TypeScript: let nombreUsuario: string = "Carlos Mendoza"`);
console.log(`  → typeof en JS: ${typeof nombreUsuario}`);

console.log(`\n  precioProducto = ${precioProducto}`);
console.log(`  → En TypeScript: let precio: number = 99.99`);
console.log(`  → typeof en JS: ${typeof precioProducto}`);

console.log(`\n  estaActivo     = ${estaActivo}`);
console.log(`  → En TypeScript: let estaActivo: boolean = true`);
console.log(`  → typeof en JS: ${typeof estaActivo}`);

console.log(`\n  Expresión boolean: edad >= 18 = ${edad >= 18}`);
console.log(`  → En TS: let esMayor: boolean = edad >= 18`);
console.log(`  → TypeScript infiere que el resultado es boolean`);

console.log(`\n  Separador visual: 1_000_000 = ${granNumero}`);
console.log(`  → En TS: let gran: number = 1_000_000`);
console.log(`  → El _ no afecta el valor, solo mejora la lectura`);

// ─────────────────────────────────────────────────────────
//  DEMO 2: Por qué TypeScript detecta errores que JavaScript no ve
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 2 — ERRORES QUE TYPESCRIPT DETECTA (JavaScript NO)");
console.log("  ──────────────────────────────────────────────────────────");

console.log("  El bug más famoso de JavaScript: concatenar en vez de sumar\n");

const numeroComoString = "100";
const multiplicador = 10;

console.log(`  numeroComoString = "${numeroComoString}" (string, no number)`);
console.log(`  multiplicador    = ${multiplicador} (number)`);
console.log(`\n  Operaciones en JavaScript puro (sin TypeScript):`);
console.log(`  "100" - 10  = ${numeroComoString - 10}     (conversión implícita, parece OK)`);
console.log(`  "100" * 2   = ${numeroComoString * 2}    (conversión implícita, parece OK)`);
console.log(`  "100" / 2   = ${numeroComoString / 2}    (conversión implícita, parece OK)`);
console.log(`  "100" + 10  = ${numeroComoString + 10}  ← BUG SILENCIOSO: concatenó, no sumó`);
console.log(`\n  → El + con strings concatena en lugar de sumar.`);
console.log(`  → JavaScript no lanza error. Devuelve "10010" en lugar de 110.`);
console.log(`  → Este bug puede existir en producción meses sin ser detectado.`);
console.log(`\n  En TypeScript (.ts) esto se detecta al compilar:`);
console.log(`  let x: number = "100";  // ❌ Error: 'string' no es 'number'`);
console.log(`  calcular("100", 10);    // ❌ Error: argumento 1 esperaba 'number'`);

// ─────────────────────────────────────────────────────────
//  DEMO 3: Interfaces en la práctica
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 3 — INTERFACES: contratos para objetos");
console.log("  ──────────────────────────────────────────────");
console.log("  En TypeScript (.ts) defines la estructura una vez:");
console.log("");
console.log("  interface Producto {");
console.log("    id: number;                        // requerida");
console.log("    nombre: string;                    // requerida");
console.log("    precio: number;                    // requerida");
console.log("    descripcion?: string;              // opcional (?)");
console.log("    readonly creadoEn: Date;           // solo lectura");
console.log("    categoria: 'electronica' | 'ropa' | 'hogar'; // literales");
console.log("  }");
console.log("");
console.log("  TypeScript verifica:");
console.log("  ✅ Que tenga id, nombre, precio, creadoEn, categoria (requeridas)");
console.log("  ✅ Que descripcion sea string si está presente (opcional)");
console.log("  ❌ Error si categoria = 'juguetes' (no está en los literales)");
console.log("  ❌ Error si creadoEn = new Date() después de crear (readonly)");
console.log("  ❌ Error si precio = '99.99' (string en lugar de number)");

// Creamos objetos que cumplen la "interface" (en JS, no tiene validación real)
const catalogo = [
  {
    id: 1,
    nombre: "Laptop Gaming",
    precio: 1200,
    descripcion: "Procesador i7, 16GB RAM, RTX 3060",
    creadoEn: new Date("2024-01-15"),
    categoria: "electronica",
  },
  {
    id: 2,
    nombre: "Mouse Inalámbrico",
    precio: 45,
    // descripcion no incluida → es opcional
    creadoEn: new Date("2024-02-20"),
    categoria: "electronica",
  },
  {
    id: 3,
    nombre: "Camiseta Básica",
    precio: 25,
    descripcion: "100% algodón, varios colores",
    creadoEn: new Date("2024-03-10"),
    categoria: "ropa",
  },
];

console.log("\n  Productos del catálogo:");
catalogo.forEach((p) => {
  const desc = p.descripcion ? ` — ${p.descripcion.substring(0, 30)}` : "";
  console.log(`  [${p.id}] ${p.nombre.padEnd(22)} $${p.precio.toFixed(2).padStart(8)}  (${p.categoria})${desc}`);
});

// ─────────────────────────────────────────────────────────
//  DEMO 4: Tipos especiales en acción
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 4 — TIPOS ESPECIALES: any, unknown, void, never");
console.log("  ──────────────────────────────────────────────────────");

const resumenTiposEspeciales = [
  {
    tipo: "any",
    descripcion: "Desactiva el tipado. Acepta cualquier valor, verifica nada.",
    cuando: "EVITAR siempre. Solo al migrar código JS→TS gradualmente.",
    ejemplo: 'let x: any = "texto"; x = 42; x = true; // todo OK (inseguro)',
    peligro: "ALTO — pierdes todas las ventajas de TypeScript",
  },
  {
    tipo: "unknown",
    descripcion: "Acepta cualquier valor PERO exige verificar tipo antes de usar.",
    cuando: "Datos externos: APIs, localStorage, inputs del usuario.",
    ejemplo: 'if (typeof dato === "string") { dato.toUpperCase(); // ✅ }',
    peligro: "BAJO — te obliga a ser seguro",
  },
  {
    tipo: "void",
    descripcion: "Tipo de retorno de funciones que no devuelven ningún valor.",
    cuando: "Funciones de efectos: guardar, navegar, loguear, emitir eventos.",
    ejemplo: "function guardar(dato: string): void { localStorage.setItem('k', dato); }",
    peligro: "NINGUNO — es semánticamente correcto",
  },
  {
    tipo: "never",
    descripcion: "Función que NUNCA termina normalmente.",
    cuando: "Funciones que siempre lanzan error o bucles infinitos.",
    ejemplo: "function fallo(msg: string): never { throw new Error(msg); }",
    peligro: "NINGUNO — es una característica de seguridad",
  },
];

resumenTiposEspeciales.forEach(({ tipo, descripcion, cuando, ejemplo, peligro }) => {
  console.log(`\n  📌 ${tipo.toUpperCase()}  [Peligro: ${peligro}]`);
  console.log(`     Qué es:  ${descripcion}`);
  console.log(`     Cuándo:  ${cuando}`);
  console.log(`     Ejemplo: ${ejemplo}`);
});

// ─────────────────────────────────────────────────────────
//  DEMO 5: Arrays tipados — operaciones con verificación de tipo
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 5 — ARRAYS TIPADOS: solo el tipo declarado");
console.log("  ──────────────────────────────────────────────────────");

const nombres = ["Valentina", "Andrés", "Camila", "Juan", "María"];
const precios = [10.99, 250.00, 5.50, 75.00, 1200.00, 45.00];
const activos = [true, false, true, true, false, true];

// En TypeScript estas serían:
// const nombres: string[]  = [...]
// const precios: number[]  = [...]
// const activos: boolean[] = [...]

console.log("  Declaración en TypeScript:");
console.log("  const nombres: string[]  = ['Valentina', 'Andrés', ...]");
console.log("  const precios: number[]  = [10.99, 250.00, ...]");
console.log("  const activos: boolean[] = [true, false, ...]");

console.log("\n  Operaciones — TypeScript conoce el tipo en cada método:");

// map retorna string[] porque transforma string → string
const nombresMayus = nombres.map((n) => n.toUpperCase());
console.log(`\n  nombres.map(n => n.toUpperCase())`);
console.log(`  → Retorna: string[] (TypeScript infiere el tipo de retorno)`);
console.log(`  → [${nombresMayus.join(", ")}]`);

// map retorna number[] porque transforma string → number
const longitudes = nombres.map((n) => n.length);
console.log(`\n  nombres.map(n => n.length)`);
console.log(`  → Retorna: number[] (string → number)`);
console.log(`  → [${longitudes.join(", ")}]`);

// reduce retorna number porque acumula numbers
const total = precios.reduce((suma, p) => suma + p, 0);
console.log(`\n  precios.reduce((suma, p) => suma + p, 0)`);
console.log(`  → Retorna: number`);
console.log(`  → Total: $${total.toFixed(2)}`);

// filter retorna number[] (mismos elementos filtrados)
const caros = precios.filter((p) => p > 100);
console.log(`\n  precios.filter(p => p > 100)`);
console.log(`  → Retorna: number[] (solo los mayores a 100)`);
console.log(`  → [${caros.join(", ")}]`);

// sort no cambia el tipo
const preciosOrdenados = [...precios].sort((a, b) => a - b);
console.log(`\n  precios.sort((a,b) => a - b)`);
console.log(`  → Retorna: number[] (mismo tipo, ordenado)`);
console.log(`  → [${preciosOrdenados.join(", ")}]`);

const activosContados = activos.filter(Boolean).length;
console.log(`\n  activos.filter(Boolean).length`);
console.log(`  → Cuántos están activos: ${activosContados} de ${activos.length}`);

console.log("\n  Error que TypeScript detectaría:");
console.log("  // nombres.push(42);      ❌ 'number' no es 'string'");
console.log("  // precios.push('mucho'); ❌ 'string' no es 'number'");
console.log("  // activos[0] = 'si';     ❌ 'string' no es 'boolean'");

// ─────────────────────────────────────────────────────────
//  DEMO 6: Discriminated Union
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 6 — DISCRIMINATED UNION: TypeScript sabe exactamente qué es");
console.log("  ──────────────────────────────────────────────────────────────────");
console.log("  En TypeScript (.ts):");
console.log("  interface Circulo    { tipo: 'circulo';     radio: number; }");
console.log("  interface Rectangulo { tipo: 'rectangulo';  ancho: number; alto: number; }");
console.log("  interface Triangulo  { tipo: 'triangulo';   base: number; altura: number; }");
console.log("  type Figura = Circulo | Rectangulo | Triangulo;");
console.log("");
console.log("  Dentro de cada case del switch, TypeScript da acceso SOLO");
console.log("  a las propiedades de ESE tipo específico.");
console.log("  Si intentas figura.radio dentro del case 'rectangulo' → ❌ Error\n");

function calcularArea(figura) {
  // En TS: function calcularArea(figura: Figura): number
  switch (figura.tipo) {
    case "circulo":
      // TypeScript SABE: figura.radio existe, figura.ancho NO existe
      return Math.PI * figura.radio ** 2;
    case "rectangulo":
      // TypeScript SABE: figura.ancho y .alto existen, figura.radio NO
      return figura.ancho * figura.alto;
    case "triangulo":
      // TypeScript SABE: figura.base y .altura existen
      return (figura.base * figura.altura) / 2;
    default:
      return 0;
  }
}

function describir(figura) {
  switch (figura.tipo) {
    case "circulo":     return `Círculo (r=${figura.radio})`;
    case "rectangulo":  return `Rectángulo (${figura.ancho}×${figura.alto})`;
    case "triangulo":   return `Triángulo (base=${figura.base}, h=${figura.altura})`;
    default:            return "Figura desconocida";
  }
}

const figuras = [
  { tipo: "circulo",     radio: 5 },
  { tipo: "rectangulo",  ancho: 10,  alto: 4 },
  { tipo: "triangulo",   base: 8,    altura: 6 },
  { tipo: "circulo",     radio: 3 },
  { tipo: "rectangulo",  ancho: 7,   alto: 3 },
  { tipo: "triangulo",   base: 12,   altura: 5 },
];

figuras.forEach((figura) => {
  const area = calcularArea(figura);
  console.log(`  ${describir(figura).padEnd(32)} → área: ${area.toFixed(2)}`);
});

// ─────────────────────────────────────────────────────────
//  DEMO 7: Genéricos — una función para todos los tipos
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 7 — GENÉRICOS <T>: código reutilizable con seguridad de tipos");
console.log("  ──────────────────────────────────────────────────────────────────");
console.log("  En TypeScript (.ts):");
console.log("  function primerElemento<T>(arr: T[]): T | undefined { return arr[0]; }");
console.log("  // UNA función, cualquier tipo, TypeScript infiere T automáticamente\n");

function primerElemento(arr) {
  // En TS: function primerElemento<T>(arr: T[]): T | undefined
  return arr.length > 0 ? arr[0] : undefined;
}

function ultimoElemento(arr) {
  // En TS: function ultimoElemento<T>(arr: T[]): T | undefined
  return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

function filtrar(arr, predicado) {
  // En TS: function filtrar<T>(arr: T[], predicado: (elemento: T) => boolean): T[]
  return arr.filter(predicado);
}

function mapear(arr, transformar) {
  // En TS: function mapear<T, U>(arr: T[], transformar: (e: T) => U): U[]
  return arr.map(transformar);
}

console.log("  primerElemento con diferentes tipos:");
console.log(`  → string[]:  "${primerElemento(["Cali", "Bogotá", "Medellín"])}"`);
console.log(`  → number[]:  ${primerElemento([100, 200, 300])}`);
console.log(`  → boolean[]: ${primerElemento([false, true, false])}`);
console.log(`  → objeto[]:  ${JSON.stringify(primerElemento([{ id: 1, nombre: "Ana" }, { id: 2 }]))}`);

console.log("\n  mapear (equivale a .map() tipado):");
const ciudades = ["cali", "bogota", "medellin"];
const mayus = mapear(ciudades, (c) => c.toUpperCase());
const longits = mapear(ciudades, (c) => c.length);
console.log(`  ciudades en mayúsculas: [${mayus.join(", ")}]`);
console.log(`  → TypeScript infiere: T=string, U=string → retorna string[]`);
console.log(`  longitudes de ciudades: [${longits.join(", ")}]`);
console.log(`  → TypeScript infiere: T=string, U=number → retorna number[]`);

// ─────────────────────────────────────────────────────────
//  DEMO 8: Utility Types en la práctica
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 8 — UTILITY TYPES: transformar tipos existentes");
console.log("  ──────────────────────────────────────────────────────────");
console.log("  Interface base:");
console.log("  interface Tarea { id, titulo, descripcion, prioridad, completada, etiquetas? }");
console.log("");

const utilityTypesDemo = [
  {
    nombre: "Partial<Tarea>",
    descripcion: "Todas las propiedades se vuelven opcionales (agrega ? a todas)",
    equivale: "{ id?: number; titulo?: string; descripcion?: string; ... }",
    usoReal: "Para PATCH requests: envías solo los campos que cambiaron",
    ejemplo: { titulo: "Nuevo título actualizado" },
  },
  {
    nombre: "Required<Tarea>",
    descripcion: "Todas las propiedades se vuelven requeridas (elimina todos los ?)",
    equivale: "{ id: number; titulo: string; ...; etiquetas: string[] }",
    usoReal: "Cuando lees de la BD y el objeto siempre está completo",
    ejemplo: { id: 1, titulo: "Tarea", descripcion: "...", prioridad: 3, completada: false, etiquetas: [] },
  },
  {
    nombre: "Pick<Tarea, 'id'|'titulo'|'completada'>",
    descripcion: "SOLO las propiedades elegidas existen en este tipo",
    equivale: "{ id: number; titulo: string; completada: boolean }",
    usoReal: "Listas que muestran solo resumen, sin todos los datos",
    ejemplo: { id: 1, titulo: "Estudiar TypeScript", completada: false },
  },
  {
    nombre: "Omit<Tarea, 'id'|'completada'>",
    descripcion: "Todo EXCEPTO las propiedades excluidas",
    equivale: "{ titulo: string; descripcion: string; prioridad: number; etiquetas?: string[] }",
    usoReal: "DTO para crear: el servidor genera id, completada empieza en false",
    ejemplo: { titulo: "Nueva tarea", descripcion: "Descripción", prioridad: 2 },
  },
  {
    nombre: "Record<string, string>",
    descripcion: "Objeto con claves de tipo K y valores de tipo V",
    equivale: "{ [clave: string]: string }",
    usoReal: "Errores de validación por campo en formularios",
    ejemplo: { titulo: "El título es requerido", email: "Formato de email inválido" },
  },
];

utilityTypesDemo.forEach(({ nombre, descripcion, equivale, usoReal, ejemplo }) => {
  console.log(`  📌 ${nombre}`);
  console.log(`     Qué hace: ${descripcion}`);
  console.log(`     Resultado: ${equivale}`);
  console.log(`     Uso real:  ${usoReal}`);
  console.log(`     Ejemplo:   ${JSON.stringify(ejemplo)}`);
  console.log();
});

// ─────────────────────────────────────────────────────────
//  DEMO 9: Type narrowing — verificar tipos antes de usar
// ─────────────────────────────────────────────────────────
console.log("  🔷 DEMO 9 — TYPE NARROWING: verificar el tipo antes de usarlo");
console.log("  ───────────────────────────────────────────────────────────────");
console.log("  Cuando tienes una unión (A | B), TypeScript exige verificar");
console.log("  cuál de los tipos es antes de acceder a propiedades específicas.");
console.log("");

function procesarDato(dato) {
  // En TS: function procesarDato(dato: string | number | string[]): string

  if (typeof dato === "string") {
    // TypeScript SABE que dato es string en este bloque
    return `Texto (${dato.length} chars): "${dato.toUpperCase()}"`;
  }

  if (typeof dato === "number") {
    // TypeScript SABE que dato es number en este bloque
    return `Número: ${dato} | cuadrado: ${dato ** 2} | raíz: ${Math.sqrt(dato).toFixed(2)}`;
  }

  if (Array.isArray(dato)) {
    // TypeScript SABE que dato es un array aquí
    return `Array de ${dato.length} elementos: [${dato.join(", ")}]`;
  }

  return "Tipo no reconocido";
}

const entradas = [
  "hola typescript",
  42,
  ["Cali", "Bogotá", "Medellín"],
  "Angular 17",
  16,
  ["uno", "dos", "tres", "cuatro"],
];

entradas.forEach((entrada) => {
  console.log(`  → ${JSON.stringify(entrada).padEnd(35)} ${procesarDato(entrada)}`);
});

// ─────────────────────────────────────────────────────────
//  DEMO 10: Tabla completa de todos los tipos
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 10 — TABLA COMPLETA: todos los tipos de TypeScript");
console.log("  ──────────────────────────────────────────────────────────────");

const tablaCompleta = [
  { cat: "Primitivo", tipo: "string",          uso: "Texto de cualquier tipo y longitud" },
  { cat: "Primitivo", tipo: "number",          uso: "Todos los números (int, float, negativos, etc.)" },
  { cat: "Primitivo", tipo: "boolean",         uso: "Solo true o false — nada más" },
  { cat: "Especial",  tipo: "any",             uso: "EVITAR — desactiva completamente el tipado" },
  { cat: "Especial",  tipo: "unknown",         uso: "Valor desconocido — exige verificar antes de usar" },
  { cat: "Especial",  tipo: "void",            uso: "Retorno de funciones que no devuelven valor" },
  { cat: "Especial",  tipo: "never",           uso: "Función que nunca termina normalmente" },
  { cat: "Especial",  tipo: "null",            uso: "Ausencia intencional de valor (string | null)" },
  { cat: "Especial",  tipo: "undefined",       uso: "Variable declarada pero sin valor asignado" },
  { cat: "Colección", tipo: "T[]",             uso: "Array tipado: number[], string[], Producto[]" },
  { cat: "Colección", tipo: "[T, U]",          uso: "Tupla: longitud fija, tipo específico por posición" },
  { cat: "Objeto",    tipo: "interface",       uso: "Contrato de forma de objeto — herencia con extends" },
  { cat: "Objeto",    tipo: "type alias",      uso: "Alias para cualquier tipo — uniones, funciones, tuplas" },
  { cat: "Combinado", tipo: "A | B",           uso: "Unión: puede ser A o puede ser B" },
  { cat: "Combinado", tipo: "A & B",           uso: "Intersección: debe ser A y también B" },
  { cat: "Combinado", tipo: "'a'|'b'|'c'",    uso: "Literales: solo esos valores exactos permitidos" },
  { cat: "Genérico",  tipo: "<T>",             uso: "Variable de tipo — código para cualquier tipo" },
  { cat: "Utility",   tipo: "Partial<T>",      uso: "Todas las propiedades opcionales" },
  { cat: "Utility",   tipo: "Required<T>",     uso: "Todas las propiedades requeridas" },
  { cat: "Utility",   tipo: "Readonly<T>",     uso: "Todas las propiedades de solo lectura" },
  { cat: "Utility",   tipo: "Pick<T,K>",       uso: "Solo las propiedades elegidas" },
  { cat: "Utility",   tipo: "Omit<T,K>",       uso: "Todo excepto las propiedades excluidas" },
  { cat: "Utility",   tipo: "Record<K,V>",     uso: "Mapa tipado: claves K → valores V" },
  { cat: "Utility",   tipo: "NonNullable<T>",  uso: "Elimina null y undefined del tipo" },
  { cat: "Utility",   tipo: "ReturnType<T>",   uso: "El tipo de retorno de una función" },
];

const categorias = [...new Set(tablaCompleta.map((t) => t.cat))];
categorias.forEach((cat) => {
  console.log(`\n  ── ${cat} ${"─".repeat(58 - cat.length)}`);
  tablaCompleta
    .filter((t) => t.cat === cat)
    .forEach(({ tipo, uso }) => {
      console.log(`  ${tipo.padEnd(22)} → ${uso}`);
    });
});

// ─────────────────────────────────────────────────────────
//  DEMO 11: Dónde verás estos tipos en Angular
// ─────────────────────────────────────────────────────────
console.log("\n\n  🔷 DEMO 11 — CONEXIÓN CON ANGULAR: dónde aparece cada tipo");
console.log("  ──────────────────────────────────────────────────────────────");

const conexion = [
  {
    tipo:    "interface",
    donde:   "Modelos de datos y respuestas de la API",
    ejemplo: "interface ProductoDTO { id: number; nombre: string; precio: number; }",
    uso:     "this.http.get<ProductoDTO[]>('/api/productos') → tipado automático",
  },
  {
    tipo:    "type alias (literales)",
    donde:   "Estado del componente, rutas, roles",
    ejemplo: "type EstadoCarga = 'idle' | 'cargando' | 'exito' | 'error';",
    uso:     "estado: EstadoCarga = 'idle'; cambia según las peticiones HTTP",
  },
  {
    tipo:    "Partial<T>",
    donde:   "Formularios de edición y actualizaciones parciales",
    ejemplo: "actualizarProducto(id: number, cambios: Partial<Producto>)",
    uso:     "Solo envías los campos que el usuario modificó (PATCH)",
  },
  {
    tipo:    "Readonly<T>",
    donde:   "Estado global con NgRx",
    ejemplo: "interface AppState { readonly productos: Readonly<Producto[]>; }",
    uso:     "El estado no se muta directamente — solo con actions/reducers",
  },
  {
    tipo:    "Observable<T>  (genérico)",
    donde:   "Cualquier dato asíncrono: HTTP, eventos, state",
    ejemplo: "productos$: Observable<Producto[]> = this.productoService.getAll();",
    uso:     "Todos los datos del HttpClient son Observable<T>",
  },
  {
    tipo:    "Discriminated Union",
    donde:   "NgRx Actions — gestión de estado",
    ejemplo: "type Action = LoadAction | SuccessAction | ErrorAction",
    uso:     "El campo 'type' discrimina exactamente qué acción fue disparada",
  },
  {
    tipo:    "unknown en catch",
    donde:   "Manejo de errores en servicios",
    ejemplo: "catch (error: unknown) { if (error instanceof HttpErrorResponse) {...} }",
    uso:     "TypeScript 4+ usa 'unknown' por defecto en catch — más seguro",
  },
  {
    tipo:    "signal<T>  (Angular 17+)",
    donde:   "Reactividad moderna en componentes",
    ejemplo: "const contador = signal<number>(0); contador.set(1); contador();",
    uso:     "Estado reactivo sin necesidad de RxJS en casos simples",
  },
];

conexion.forEach(({ tipo, donde, ejemplo, uso }) => {
  console.log(`\n  📌 ${tipo}`);
  console.log(`     Dónde:   ${donde}`);
  console.log(`     Ejemplo: ${ejemplo}`);
  console.log(`     Cómo:    ${uso}`);
});

console.log("\n\n╔══════════════════════════════════════════════════════════╗");
console.log("║   ✅ Investigación #1 completada                         ║");
console.log("╠══════════════════════════════════════════════════════════╣");
console.log("║                                                          ║");
console.log("║   Resumen de lo que estudiaste:                          ║");
console.log("║   ✓ Por qué TypeScript existe y qué problema resuelve    ║");
console.log("║   ✓ Tipos primitivos: string, number, boolean            ║");
console.log("║   ✓ Inferencia de tipos automática                       ║");
console.log("║   ✓ Tipos especiales: any, unknown, void, never          ║");
console.log("║   ✓ null y undefined con strict mode                     ║");
console.log("║   ✓ Arrays tipados y tuplas                              ║");
console.log("║   ✓ Interfaces: contratos para objetos                   ║");
console.log("║   ✓ Type aliases: nombres para cualquier tipo            ║");
console.log("║   ✓ Unión (|) e intersección (&) de tipos               ║");
console.log("║   ✓ Discriminated Union: el patrón más poderoso          ║");
console.log("║   ✓ Enums y alternativa con literales                    ║");
console.log("║   ✓ Genéricos <T>: código para cualquier tipo            ║");
console.log("║   ✓ Utility Types: Partial, Required, Readonly,          ║");
console.log("║     Pick, Omit, Record, NonNullable, ReturnType          ║");
console.log("║   ✓ tsconfig.json: opciones del compilador               ║");
console.log("║   ✓ Conexión de todos estos conceptos con Angular        ║");
console.log("║                                                          ║");
console.log("║   Siguiente archivo: node 02_typescript_funciones.js     ║");
console.log("╚══════════════════════════════════════════════════════════╝\n");
Listo
