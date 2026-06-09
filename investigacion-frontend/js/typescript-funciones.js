// ============================================================
//  📘 INVESTIGACIÓN #2 — TYPESCRIPT: FUNCIONES TIPADAS
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
//  Ejecutar: node 02_typescript_funciones.js
//
// ============================================================
//
//  ¿POR QUÉ TIPAR LAS FUNCIONES ES LO MÁS IMPORTANTE EN TYPESCRIPT?
//  ─────────────────────────────────────────────────────────────────
//
//  Una aplicación Angular es básicamente un conjunto de funciones
//  que se llaman entre sí: componentes que llaman a servicios,
//  servicios que hacen peticiones HTTP, pipes que transforman datos,
//  guards que deciden si el usuario puede navegar, etc.
//
//  El 80% de los bugs en aplicaciones reales ocurren en los
//  LÍMITES entre funciones, es decir, en el momento en que
//  una función llama a otra:
//  - Le pasas un string donde esperaba un number
//  - Olvidas pasar un argumento obligatorio
//  - Asumes que devuelve string pero devuelve string | null
//  - El callback que pasas tiene la firma incorrecta
//  - La función async devuelve void pero asumes que devuelve datos
//
//  TypeScript detecta TODOS estos errores en tiempo de compilación,
//  no cuando el usuario encuentra el bug en producción a las 2am.
//
//  ─────────────────────────────────────────────────────────
//  DÓNDE APARECEN LAS FUNCIONES TIPADAS EN ANGULAR
//  ─────────────────────────────────────────────────────────
//
//  COMPONENTES:
//  ngOnInit(): void { ... }         → ciclo de vida
//  ngOnDestroy(): void { ... }      → ciclo de vida
//  onGuardarClick(): void { ... }   → evento del usuario
//  onSeleccionar(item: Producto): void { ... }  → evento con dato
//
//  SERVICIOS:
//  obtenerProductos(): Observable<Producto[]>   → petición GET
//  crearProducto(dto: CrearProductoDTO): Observable<Producto>  → POST
//  actualizarProducto(id: number, cambios: Partial<Producto>): Observable<Producto>  → PATCH
//  eliminarProducto(id: number): Observable<void>  → DELETE
//
//  PIPES:
//  transform(valor: string, formato?: string): string  → transformar dato
//
//  GUARDS:
//  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean>
//
//  RESOLVERS:
//  resolve(route: ActivatedRouteSnapshot): Observable<Producto>
//
//  En todos estos casos, tipar correctamente significa que:
//  → VS Code sabe exactamente qué puedes pasar y qué recibes
//  → Si cambias la firma de un servicio, Angular te dice
//    en qué componentes debes actualizar las llamadas
//  → El compilador verifica que usas los datos devueltos correctamente
//
// ============================================================
//  BLOQUES DE ESTUDIO — TypeScript en comentarios
//
//  Cada bloque explica:
//  1. Qué problema resuelve ese concepto
//  2. La sintaxis exacta en TypeScript (.ts)
//  3. Los errores que TypeScript detectaría
//  4. La conexión con Angular cuando aplica
// ============================================================

"use strict";

// ════════════════════════════════════════════════════════
//  BLOQUE 1: TIPADO BÁSICO — Parámetros y tipo de retorno
//  La base de las funciones en TypeScript
// ════════════════════════════════════════════════════════
//
//  En JavaScript, una función no declara qué tipo de datos
//  recibe ni qué tipo devuelve. Es responsabilidad del programador
//  documentarlo en comentarios (que pueden quedar desactualizados)
//  y verificarlo manualmente (que suele olvidarse).
//
//  En TypeScript, los tipos son parte de la FIRMA de la función.
//  Son código, no documentación. El compilador los verifica.
//
//  SINTAXIS PARA TIPAR UNA FUNCIÓN:
//
//  function nombre(param1: Tipo1, param2: Tipo2): TipoRetorno {
//    // cuerpo
//  }
//
//  Arrow function equivalente:
//  const nombre = (param1: Tipo1, param2: Tipo2): TipoRetorno => {
//    // cuerpo
//  }
//
//  ── Ejemplo completo con parámetros y retorno ─────────────
//
//  // En TypeScript (.ts):
//
//  function sumar(a: number, b: number): number {
//    return a + b;
//    // TypeScript verifica DOS cosas:
//    //
//    // 1. Al LLAMAR la función:
//    //    sumar(5, 3)        → ✅ OK
//    //    sumar("5", 3)      → ❌ Error: 'string' no es 'number'
//    //    sumar(5)           → ❌ Error: falta el argumento 'b'
//    //    sumar(5, 3, 1)     → ❌ Error: se esperaban 2 argumentos, se recibieron 3
//    //
//    // 2. Al RETORNAR de la función:
//    //    return a + b;      → ✅ OK: number + number = number
//    //    return "resultado"; → ❌ Error: 'string' no es 'number'
//    //    return;            → ❌ Error: se espera 'number', no 'undefined'
//  }
//
//  // Arrow function — exactamente equivalente:
//  const restar = (a: number, b: number): number => a - b;
//  const multiplicar = (a: number, b: number): number => {
//    return a * b;
//  };
//
//  // Con objetos como parámetro:
//  interface DatosPersona {
//    nombre: string;
//    apellido: string;
//    edad: number;
//  }
//
//  function crearSaludo(persona: DatosPersona): string {
//    return `Hola, ${persona.nombre} ${persona.apellido}. Tienes ${persona.edad} años.`;
//    // TypeScript sabe exactamente qué propiedades tiene 'persona'
//    // Si escribes persona.nombr (error de typo) → ❌ Error al compilar
//  }
//
//  ── Inferencia del tipo de retorno ───────────────────────
//
//  TypeScript puede INFERIR el tipo de retorno de muchas funciones.
//  Si el cuerpo de la función hace obvio qué tipo devuelve,
//  no necesitas escribirlo explícitamente.
//
//  // En TypeScript (.ts):
//
//  function obtenerNombreCompleto(nombre: string, apellido: string) {
//    return `${nombre} ${apellido}`;
//    // TypeScript infiere: el return es un template literal → string
//    // El tipo de retorno es string aunque no lo declares
//  }
//
//  function esMayorDeEdad(edad: number) {
//    return edad >= 18;
//    // TypeScript infiere: la expresión >= devuelve boolean
//  }
//
//  function calcularDescuento(precio: number, porcentaje: number) {
//    const descuento = precio * (porcentaje / 100);
//    return precio - descuento;
//    // TypeScript infiere: número - número = number
//  }
//
//  // CUÁNDO DEJAR QUE TYPESCRIPT INFIERA (sin declarar el tipo de retorno):
//  // ✅ Funciones privadas pequeñas con return obvio
//  // ✅ Arrow functions de una línea: const doble = (n: number) => n * 2;
//  // ✅ Funciones internas usadas solo dentro del mismo archivo
//
//  // CUÁNDO DECLARAR EXPLÍCITAMENTE EL TIPO DE RETORNO:
//  // ✅ Funciones exportadas (usadas por otros archivos)
//  // ✅ Métodos de servicios y componentes de Angular
//  // ✅ Funciones largas donde el return no es obvio de inmediato
//  // ✅ Funciones que pueden devolver múltiples tipos (string | null)
//  // ✅ Cuando quieres que TypeScript VERIFIQUE que retornas el tipo correcto
//  //    (si cambias el cuerpo y el retorno cambia, TypeScript te avisa)
//
//  ── Función que retorna void ──────────────────────────────
//
//  'void' como tipo de retorno significa: "esta función realiza
//  una acción pero NO devuelve ningún valor útil".
//  Es la declaración correcta para funciones de efecto secundario:
//  guardar en DB, navegar a otra página, mostrar una notificación,
//  actualizar el DOM, emitir un evento, limpiar un timer, etc.
//
//  // En TypeScript (.ts):
//
//  function mostrarAlerta(mensaje: string, tipo: "info" | "error" | "exito"): void {
//    // Solo realiza acciones, no devuelve nada
//    const elemento = document.createElement("div");
//    elemento.className = `alerta alerta-${tipo}`;
//    elemento.textContent = mensaje;
//    document.body.appendChild(elemento);
//    // No hay return → TypeScript espera void → correcto
//    // return "ok";  // ❌ Error: Type 'string' is not assignable to type 'void'
//  }
//
//  function guardarEnLocalStorage(clave: string, valor: unknown): void {
//    localStorage.setItem(clave, JSON.stringify(valor));
//    // Guarda y listo. No devuelve nada útil.
//  }
//
//  function registrarActividad(accion: string, usuario: string): void {
//    const registro = { accion, usuario, timestamp: new Date().toISOString() };
//    console.log("[ACTIVIDAD]", registro);
//  }
//
//  // EN ANGULAR — los métodos de ciclo de vida y handlers son void:
//  // ngOnInit(): void { this.cargarDatos(); }
//  // ngOnDestroy(): void { this.subscripcion.unsubscribe(); }
//  // onGuardar(): void { this.formulario.reset(); }
//  // onClickEliminar(id: number): void { this.servicio.eliminar(id); }
//
//  ── Función que retorna un objeto tipado ──────────────────
//
//  Cuando una función devuelve un objeto, declarar el tipo de retorno
//  documenta exactamente qué recibirás y TypeScript verifica que
//  cada 'return' en el cuerpo devuelva exactamente eso.
//
//  // En TypeScript (.ts):
//
//  interface ResultadoValidacion {
//    esValido: boolean;
//    errores: string[];
//    campo?: string;       // opcional: qué campo falló
//  }
//
//  function validarEmail(email: string): ResultadoValidacion {
//    if (!email) {
//      return { esValido: false, errores: ["El email es requerido"], campo: "email" };
//    }
//    if (!email.includes("@")) {
//      return { esValido: false, errores: ["El email debe contener @"], campo: "email" };
//    }
//    if (!email.includes(".")) {
//      return { esValido: false, errores: ["El email debe contener un dominio"], campo: "email" };
//    }
//    return { esValido: true, errores: [] };
//    // TypeScript verifica que CADA return cumple ResultadoValidacion
//    // Si en algún return olvidaras 'errores', TypeScript da error
//  }

// ════════════════════════════════════════════════════════
//  BLOQUE 2: PARÁMETROS ESPECIALES
//  Opcionales, por defecto y rest (...)
// ════════════════════════════════════════════════════════
//
//  TypeScript tiene tres formas de manejar parámetros que
//  no siempre son obligatorios o tienen una cantidad variable.
//  Cada una tiene su caso de uso específico.
//
//  ── PARÁMETROS OPCIONALES con '?' ────────────────────────
//
//  El '?' después del nombre del parámetro lo hace OPCIONAL.
//  El llamador puede pasarlo o no. Si no lo pasa, su valor es undefined.
//  TypeScript cambia el tipo internamente a: TipoOriginal | undefined
//
//  REGLA: los parámetros opcionales DEBEN ir al final.
//  No puedes tener un parámetro obligatorio después de uno opcional.
//
//  // En TypeScript (.ts):
//
//  function crearSaludo(nombre: string, titulo?: string): string {
//    // 'titulo' es string | undefined (por el ?)
//    // No puedes usar titulo.toUpperCase() directamente → puede ser undefined
//
//    if (titulo) {
//      // Dentro del if, TypeScript SABE que titulo es string (no undefined)
//      // Este proceso se llama type narrowing (estrechamiento de tipo)
//      return `${titulo} ${nombre}`;
//    }
//    return `Hola, ${nombre}`;
//  }
//
//  crearSaludo("Ana");              // ✅ "Hola, Ana" (sin titulo)
//  crearSaludo("García", "Dr.");    // ✅ "Dr. García" (con titulo)
//  crearSaludo("Ana", undefined);   // ✅ "Hola, Ana" (undefined explícito)
//  // crearSaludo();               // ❌ Error: se espera al menos 1 argumento
//
//  // OTRO EJEMPLO — función con múltiples opcionales:
//  function formatearFecha(
//    fecha: Date,
//    incluirHora?: boolean,    // opcional
//    formato?: "corto" | "largo"  // opcional
//  ): string {
//    const opciones: Intl.DateTimeFormatOptions = {};
//    if (incluirHora) {
//      opciones.hour = "2-digit";
//      opciones.minute = "2-digit";
//    }
//    if (formato === "largo") {
//      opciones.weekday = "long";
//      opciones.year = "numeric";
//      opciones.month = "long";
//      opciones.day = "numeric";
//    }
//    return fecha.toLocaleDateString("es-CO", opciones);
//  }
//
//  formatearFecha(new Date());               // Solo fecha
//  formatearFecha(new Date(), true);         // Con hora
//  formatearFecha(new Date(), true, "largo"); // Con hora y formato largo
//
//  ── PARÁMETROS CON VALOR POR DEFECTO ─────────────────────
//
//  Cuando el parámetro no se pasa (o se pasa undefined), usa el valor
//  por defecto que declaraste. TypeScript infiere el tipo del valor default.
//  Es similar al parámetro opcional pero con un valor en lugar de undefined.
//
//  DIFERENCIA CLAVE entre opcional (?) y por defecto:
//  → Opcional:       titulo?: string   → si no se pasa, es undefined
//  → Por defecto:    titulo = "Hola"   → si no se pasa, es "Hola"
//
//  // En TypeScript (.ts):
//
//  function paginar(pagina: number = 1, limite: number = 10): { skip: number; limit: number } {
//    // Si pagina no se pasa → usa 1
//    // Si limite no se pasa → usa 10
//    // TypeScript infiere que pagina y limite son number por los valores por defecto
//    return {
//      skip: (pagina - 1) * limite,
//      limit: limite,
//    };
//  }
//
//  paginar()           // → { skip: 0, limit: 10 }  (ambos por defecto)
//  paginar(2)          // → { skip: 10, limit: 10 } (solo pagina cambia)
//  paginar(3, 25)      // → { skip: 50, limit: 25 } (ambos personalizados)
//  paginar(undefined, 20) // → { skip: 0, limit: 20 } (undefined usa default)
//
//  // Valor por defecto con tipo explícito (cuando el default es null u objeto):
//  function crearProducto(nombre: string, categoria: string = "general", precio: number = 0): Producto {
//    return { id: Date.now(), nombre, categoria, precio, activo: true };
//  }
//
//  // Valor por defecto como objeto:
//  function configurarConexion(
//    host: string,
//    opciones: { timeout: number; reintentos: number } = { timeout: 5000, reintentos: 3 }
//  ): void {
//    console.log(`Conectando a ${host} con timeout ${opciones.timeout}ms`);
//  }
//
//  ── PARÁMETROS REST (...) ─────────────────────────────────
//
//  El operador '...' antes del último parámetro captura TODOS los
//  argumentos restantes en un array tipado. Permite llamar la función
//  con cualquier cantidad de argumentos (incluido ninguno).
//
//  REGLA: el parámetro rest SIEMPRE debe ser el ÚLTIMO parámetro.
//
//  // En TypeScript (.ts):
//
//  function sumarTodos(...numeros: number[]): number {
//    // 'numeros' es un array de numbers.
//    // Puede recibir: 1 número, 10 números, o ninguno.
//    return numeros.reduce((acumulado, numero) => acumulado + numero, 0);
//    // reduce() itera el array y va acumulando la suma
//  }
//
//  sumarTodos()                  // → 0   (array vacío)
//  sumarTodos(5)                 // → 5   (un elemento)
//  sumarTodos(1, 2, 3)           // → 6   (tres elementos)
//  sumarTodos(10, 20, 30, 40, 50) // → 150 (cinco elementos)
//  // sumarTodos(1, "dos", 3)    // ❌ Error: "dos" no es number
//
//  // Combinado con parámetros normales:
//  function construirURL(protocolo: string, dominio: string, ...segmentos: string[]): string {
//    // protocolo y dominio son obligatorios
//    // segmentos captura TODOS los demás argumentos
//    const base = `${protocolo}://${dominio}`;
//    if (segmentos.length === 0) return base;
//    return `${base}/${segmentos.join("/")}`;
//  }
//
//  construirURL("https", "api.ejemplo.com")
//  // → "https://api.ejemplo.com"
//
//  construirURL("https", "api.ejemplo.com", "usuarios")
//  // → "https://api.ejemplo.com/usuarios"
//
//  construirURL("https", "api.ejemplo.com", "usuarios", "123", "perfil")
//  // → "https://api.ejemplo.com/usuarios/123/perfil"
//
//  // Rest con tipo de objeto:
//  function registrarEventos(...eventos: { tipo: string; datos: unknown }[]): void {
//    eventos.forEach(evento => {
//      console.log(`[${new Date().toISOString()}] ${evento.tipo}`, evento.datos);
//    });
//  }
//
//  // DIFERENCIA entre rest (...) y array normal:
//  //
//  // Con rest: puedes pasar los elementos individualmente
//  // sumarTodos(1, 2, 3, 4, 5)
//  //
//  // Con array normal:
//  // function sumar(numeros: number[]): number { ... }
//  // sumar([1, 2, 3, 4, 5])  ← tienes que pasar el array completo
//  //
//  // Ambos son válidos. El rest es más cómodo para llamar.

// ════════════════════════════════════════════════════════
//  BLOQUE 3: TIPOS DE FUNCIONES
//  Las funciones también tienen tipos — se pueden declarar, pasar y retornar
// ════════════════════════════════════════════════════════
//
//  En TypeScript, las funciones son CIUDADANOS DE PRIMERA CLASE.
//  Tienen tipos. Puedes declararlos, asignarlos a variables,
//  pasarlos como parámetros (callbacks), y retornarlos.
//
//  La sintaxis del tipo de una función es:
//  (param1: Tipo1, param2: Tipo2) => TipoRetorno
//
//  ── DECLARAR EL TIPO DE UNA FUNCIÓN ──────────────────────
//
//  // En TypeScript (.ts):
//
//  // Con 'type alias' — la forma más común:
//  type Transformador = (valor: string) => string;
//  // Esto significa: "una función que recibe un string y devuelve un string"
//
//  // Estas funciones CUMPLEN el tipo Transformador:
//  const aMayusculas: Transformador = (v) => v.toUpperCase();
//  const aMinusculas: Transformador = (v) => v.toLowerCase();
//  const eliminarEspacios: Transformador = (v) => v.trim();
//  const revertir: Transformador = (v) => v.split("").reverse().join("");
//
//  // Esta función NO cumple el tipo:
//  // const calcularLongitud: Transformador = (v) => v.length;
//  // ❌ Error: '(v: string) => number' no es asignable a 'Transformador'
//  //          Transformador devuelve string, esta función devuelve number
//
//  // Tipos de función más complejos:
//  type Predicado<T> = (elemento: T) => boolean;
//  // "una función que recibe T y devuelve boolean"
//  // Predicado<number>  = (n: number) => boolean
//  // Predicado<string>  = (s: string) => boolean
//  // Predicado<Usuario> = (u: Usuario) => boolean
//
//  type Comparador<T> = (a: T, b: T) => number;
//  // "función para ordenar: negativo si a<b, 0 si igual, positivo si a>b"
//  // Comparador<number>   = (a: number, b: number) => number
//  // Comparador<Producto> = (a: Producto, b: Producto) => number
//
//  type ManejadorError = (error: Error, contexto?: string) => void;
//  // "función para manejar errores: recibe el error y contexto opcional"
//
//  ── PASAR FUNCIONES COMO PARÁMETROS (callbacks) ──────────
//
//  El caso de uso más común de los tipos de función es tipar
//  callbacks: funciones que pasas como argumento para que sean
//  llamadas en algún momento (al terminar una operación, en cada
//  elemento de un array, cuando ocurre un evento, etc.)
//
//  // En TypeScript (.ts):
//
//  type Transformador = (valor: string) => string;
//
//  function procesarTextos(textos: string[], transformar: Transformador): string[] {
//    return textos.map(transformar);
//    // TypeScript sabe que 'transformar' recibe string y devuelve string
//    // Puede llamarla con cualquier string del array
//    // El resultado del .map() será string[] (inferido)
//  }
//
//  // Uso:
//  const ciudades = ["cali", "bogota", "medellin", "cartagena"];
//  const mayusculas = procesarTextos(ciudades, (c) => c.toUpperCase());
//  // → ["CALI", "BOGOTA", "MEDELLIN", "CARTAGENA"]
//  // TypeScript infiere que mayusculas es string[]
//
//  // Pasando función nombrada:
//  const sinEspacios: Transformador = (v) => v.trim();
//  const procesadas = procesarTextos(["  hola  ", "  mundo  "], sinEspacios);
//  // → ["hola", "mundo"]
//
//  // Con callback más complejo — función con múltiples parámetros:
//  type ManejadorEvento<T> = (evento: T, indice: number) => void;
//
//  function procesarLista<T>(
//    lista: T[],
//    manejar: ManejadorEvento<T>,
//    filtrar?: Predicado<T>
//  ): void {
//    const listaFiltrada = filtrar ? lista.filter(filtrar) : lista;
//    listaFiltrada.forEach((elemento, indice) => manejar(elemento, indice));
//  }
//
//  ── FUNCIONES COMO PROPIEDADES DE INTERFACES ─────────────
//
//  Las interfaces pueden incluir métodos (funciones).
//  Cuando una clase implementa la interface, DEBE tener esos métodos.
//
//  // En TypeScript (.ts):
//
//  interface Repositorio<T> {
//    // Métodos CRUD que cualquier repositorio debe tener
//    buscarPorId(id: number): T | undefined;
//    buscarTodos(filtro?: Partial<T>): T[];
//    guardar(entidad: T): T;
//    actualizar(id: number, cambios: Partial<T>): T | undefined;
//    eliminar(id: number): boolean;
//    contarTodos(filtro?: Partial<T>): number;
//  }
//
//  // Si creas una clase que implementa este contrato:
//  // class ProductoRepositorio implements Repositorio<Producto> {
//  //   // TypeScript EXIGE que implementes todos los métodos
//  //   // con exactamente esas firmas (tipos de parámetros y retorno)
//  // }
//
//  // EN ANGULAR — HttpClient usa este patrón internamente:
//  // this.http.get<Producto[]>('/api')     → retorna Observable<Producto[]>
//  // this.http.post<Producto>('/api', dto) → retorna Observable<Producto>
//  // this.http.delete<void>('/api/1')      → retorna Observable<void>

// ════════════════════════════════════════════════════════
//  BLOQUE 4: SOBRECARGA DE FUNCIONES (Function Overloads)
//  La misma función con diferentes combinaciones de parámetros
// ════════════════════════════════════════════════════════
//
//  La sobrecarga permite que una función tenga MÚLTIPLES "firmas"
//  (combinaciones válidas de parámetros y tipos de retorno).
//  TypeScript verifica que el llamador use una de las firmas válidas.
//
//  ¿Cuándo necesitas sobrecarga?
//  Cuando una función puede ser llamada de formas muy diferentes
//  y el tipo de retorno DEPENDE de cómo la llamas.
//
//  Ejemplo: formatear() con un string devuelve string.
//           formatear() con un number devuelve string.
//           formatear() con boolean devuelve string.
//  → Siempre devuelve string, pero acepta tipos diferentes.
//
//  // En TypeScript (.ts):
//
//  // Las DECLARACIONES DE SOBRECARGA (firmas sin cuerpo):
//  // Le dicen a TypeScript qué combinaciones son válidas.
//  function formatearValor(valor: string): string;
//  function formatearValor(valor: number, decimales: number): string;
//  function formatearValor(valor: number, decimales: number, moneda: string): string;
//  function formatearValor(valor: boolean): string;
//  function formatearValor(valor: Date, formato: "corto" | "largo"): string;
//
//  // La IMPLEMENTACIÓN (debe manejar todos los casos):
//  // Esta firma no es visible desde fuera — solo las de arriba lo son.
//  function formatearValor(
//    valor: string | number | boolean | Date,
//    extra?: number | "corto" | "largo",
//    moneda?: string
//  ): string {
//    if (typeof valor === "string") {
//      return `"${valor}"`;
//    }
//    if (typeof valor === "number") {
//      const decimales = typeof extra === "number" ? extra : 2;
//      if (moneda) {
//        return `${moneda}${valor.toFixed(decimales)}`;
//      }
//      return valor.toFixed(decimales);
//    }
//    if (typeof valor === "boolean") {
//      return valor ? "Sí" : "No";
//    }
//    if (valor instanceof Date) {
//      const formato = extra as "corto" | "largo" ?? "corto";
//      return valor.toLocaleDateString("es-CO", {
//        dateStyle: formato === "largo" ? "full" : "short",
//      });
//    }
//    return String(valor);
//  }
//
//  // TypeScript verifica según las firmas de sobrecarga:
//  formatearValor("hola")            // ✅ firma 1: string → string
//  formatearValor(3.14159, 3)        // ✅ firma 2: number, decimales → string
//  formatearValor(1500.50, 2, "$")   // ✅ firma 3: número con moneda
//  formatearValor(true)              // ✅ firma 4: boolean → string
//  formatearValor(new Date(), "largo") // ✅ firma 5: Date con formato
//
//  // formatearValor(42)             // ❌ Error: la firma 2 requiere decimales
//  // formatearValor("hola", 2)      // ❌ Error: firma 1 no acepta segundo argumento
//
//  // CUÁNDO USAR sobrecarga en Angular:
//  // Cuando un servicio tiene un método que puede retornar
//  // tipos diferentes según los parámetros que recibe.
//
//  // interface BusquedaService {
//  //   buscar(id: number): Observable<Producto>;           // por ID
//  //   buscar(filtro: FiltroProducto): Observable<Producto[]>; // por filtro
//  // }

// ════════════════════════════════════════════════════════
//  BLOQUE 5: FUNCIONES GENÉRICAS
//  Una función que funciona con cualquier tipo, con seguridad
// ════════════════════════════════════════════════════════
//
//  Las funciones genéricas son funciones que pueden trabajar con
//  CUALQUIER tipo de dato, pero MANTIENEN la relación de tipos
//  entre los parámetros y el valor de retorno.
//
//  Son la alternativa segura a usar 'any': en lugar de perder
//  el tipo completamente, TypeScript lo "recuerda" y lo verifica.
//
//  ── FUNCIÓN GENÉRICA BÁSICA ───────────────────────────────
//
//  // En TypeScript (.ts):
//
//  // SIN genérico — pierde el tipo:
//  function primerElemento(arr: any[]): any {
//    return arr[0];
//    // TypeScript no sabe qué tipo devuelve. Pierde el tipo.
//  }
//  const p1 = primerElemento(["Ana", "Luis"]); // p1 es 'any'
//  p1.toUpperCase(); // Sin error pero sin ayuda. p1 podría no ser string.
//  p1 * 2;           // Sin error aunque sea incorrecto.
//
//  // CON genérico — preserva el tipo:
//  function primerElemento<T>(arr: T[]): T | undefined {
//    return arr.length > 0 ? arr[0] : undefined;
//    // T es una "variable de tipo".
//    // Se reemplaza por el tipo real cuando TypeScript procesa la llamada.
//  }
//
//  const p2 = primerElemento(["Ana", "Luis"]);  // T=string → p2 es string | undefined
//  const p3 = primerElemento([1, 2, 3]);          // T=number → p3 es number | undefined
//  const p4 = primerElemento([true, false]);      // T=boolean → p4 es boolean | undefined
//
//  // TypeScript verifica el tipo en cada uso:
//  if (p2 !== undefined) {
//    p2.toUpperCase(); // ✅ TypeScript sabe que p2 es string aquí
//    p2 * 2;          // ❌ Error: string no se puede multiplicar
//  }
//
//  ── GENÉRICOS CON MÚLTIPLES TIPOS ────────────────────────
//
//  Una función puede tener VARIOS parámetros de tipo genérico.
//  Cada uno es independiente: pueden ser iguales o diferentes.
//
//  // En TypeScript (.ts):
//
//  function crearPar<T, U>(primero: T, segundo: U): { primero: T; segundo: U } {
//    return { primero, segundo };
//    // T y U pueden ser cualquier tipo, iguales o diferentes.
//  }
//
//  const par1 = crearPar("nombre", 42);
//  // T=string, U=number → { primero: string; segundo: number }
//
//  const par2 = crearPar(true, ["a", "b", "c"]);
//  // T=boolean, U=string[] → { primero: boolean; segundo: string[] }
//
//  // Función genérica con T y U — transformación tipada:
//  function transformarArray<T, U>(
//    array: T[],
//    transformar: (elemento: T, indice: number) => U
//  ): U[] {
//    return array.map(transformar);
//    // T = tipo de los elementos de entrada
//    // U = tipo de los elementos de salida (puede ser diferente)
//  }
//
//  const longitudes = transformarArray(
//    ["hola", "mundo", "Angular", "TypeScript"],
//    (palabra) => palabra.length  // T=string, U=number (inferido del return)
//  );
//  // TypeScript infiere que longitudes es number[]
//
//  const objetos = transformarArray(
//    [1, 2, 3, 4, 5],
//    (num, idx) => ({ valor: num, posicion: idx, espar: num % 2 === 0 })
//    // T=number, U={ valor: number; posicion: number; espar: boolean }
//  );
//
//  ── GENÉRICOS CON RESTRICCIONES (extends) ────────────────
//
//  A veces necesitas que T sea al menos de cierto tipo.
//  Usas 'extends' para restringir qué tipos son aceptables.
//
//  // En TypeScript (.ts):
//
//  // Solo acepta tipos que tengan al menos una propiedad 'id: number':
//  function buscarPorId<T extends { id: number }>(array: T[], id: number): T | undefined {
//    return array.find(elemento => elemento.id === id);
//    // T extends { id: number } → TypeScript sabe que elemento.id existe
//    // Pero retorna T completo con TODAS sus propiedades
//  }
//
//  const usuarios = [
//    { id: 1, nombre: "Ana", rol: "admin" },
//    { id: 2, nombre: "Luis", rol: "usuario" },
//  ];
//  const encontrado = buscarPorId(usuarios, 1);
//  // TypeScript infiere T = { id: number; nombre: string; rol: string }
//  // encontrado es ese tipo | undefined
//  if (encontrado) {
//    encontrado.nombre; // ✅ TypeScript sabe que existe .nombre
//    encontrado.rol;    // ✅ TypeScript sabe que existe .rol
//  }
//
//  // Solo acepta objetos (no primitivos):
//  function clonarObjeto<T extends object>(objeto: T): T {
//    return { ...objeto };
//    // T extends object → no aceptas string, number ni boolean
//    // Retornas T exactamente → el tipo se preserva
//  }
//
//  const usuario = { nombre: "Ana", edad: 30 };
//  const clon = clonarObjeto(usuario);
//  // TypeScript infiere T = { nombre: string; edad: number }
//  // clon es { nombre: string; edad: number }
//  clon.nombre; // ✅ TypeScript sabe que existe .nombre
//  // clonarObjeto("hola"); // ❌ Error: string no cumple 'T extends object'
//
//  ── GENÉRICOS CON keyof — acceder a propiedades de forma segura ──
//
//  'keyof T' es el tipo de todas las claves posibles de T.
//  Si T = { nombre: string; edad: number }, entonces keyof T = "nombre" | "edad"
//
//  // En TypeScript (.ts):
//
//  function obtenerPropiedad<T extends object, K extends keyof T>(
//    objeto: T,
//    clave: K
//  ): T[K] {
//    return objeto[clave];
//    // K extends keyof T → clave DEBE ser una propiedad que exista en T
//    // T[K] → el tipo exacto de esa propiedad (puede ser string, number, etc.)
//    // Si T={ nombre: string, edad: number } y K="nombre" → retorna string
//    // Si T={ nombre: string, edad: number } y K="edad"   → retorna number
//  }
//
//  const persona = { nombre: "Carlos", edad: 25, ciudad: "Cali" };
//  const nom = obtenerPropiedad(persona, "nombre");   // string ✅
//  const eda = obtenerPropiedad(persona, "edad");     // number ✅
//  const ciu = obtenerPropiedad(persona, "ciudad");   // string ✅
//  // obtenerPropiedad(persona, "telefono"); // ❌ Error: 'telefono' no existe en persona
//
//  // EN ANGULAR — los genéricos aparecen constantemente:
//  // Observable<T>                   → cualquier flujo de datos tipado
//  // Promise<T>                      → cualquier promesa tipada
//  // EventEmitter<T>                 → emisor tipado de eventos
//  // HttpClient.get<T>(url)          → GET que devuelve T
//  // signal<T>(inicial)              → estado reactivo de tipo T
//  // WritableSignal<T>               → signal que se puede modificar

// ════════════════════════════════════════════════════════
//  BLOQUE 6: FUNCIONES ASÍNCRONAS
//  async/await y Promises tipadas
// ════════════════════════════════════════════════════════
//
//  En JavaScript moderno, las operaciones asíncronas (peticiones HTTP,
//  acceso a base de datos, leer archivos, timers, etc.) se manejan
//  con async/await y Promises.
//
//  En TypeScript, cuando una función es async, su tipo de retorno
//  SIEMPRE es Promise<T>, donde T es el tipo del valor que devuelves
//  con 'return' dentro de la función.
//
//  ── FUNCIÓN ASYNC BÁSICA ─────────────────────────────────
//
//  // En TypeScript (.ts):
//
//  // La función devuelve Promise<string> automáticamente por ser async:
//  async function obtenerMensaje(): Promise<string> {
//    await esperar(1000); // simula un delay
//    return "Operación completada";
//    // El return es string → TypeScript exige que el tipo de retorno sea Promise<string>
//  }
//
//  // Función async con parámetros tipados:
//  async function obtenerUsuario(id: number): Promise<Usuario | null> {
//    // Promise<Usuario | null> porque puede no encontrar al usuario
//    const respuesta = await fetch(`/api/usuarios/${id}`);
//    if (!respuesta.ok) return null;
//    const datos = await respuesta.json();
//    return datos as Usuario;
//    // 'as Usuario' es un type assertion: le dices a TypeScript que confíe en ti
//    // En proyectos reales, deberías validar la estructura de datos aquí
//  }
//
//  // ─── MANEJO DE ERRORES TIPADO ─────────────────────────────
//
//  // En TypeScript 4+ con strict, el error en catch es 'unknown' por defecto.
//  // Debes verificar el tipo antes de acceder a sus propiedades.
//
//  async function llamarAPI<T>(url: string): Promise<{ datos: T | null; error: string | null }> {
//    try {
//      const respuesta = await fetch(url);
//
//      if (!respuesta.ok) {
//        return {
//          datos: null,
//          error: `HTTP ${respuesta.status}: ${respuesta.statusText}`,
//        };
//      }
//
//      const datos: T = await respuesta.json();
//      return { datos, error: null };
//
//    } catch (error: unknown) {
//      // 'error' es 'unknown' — necesitas verificar el tipo
//
//      if (error instanceof Error) {
//        // Aquí TypeScript SABE que error es de tipo Error
//        // y tiene: .message, .name, .stack
//        return { datos: null, error: error.message };
//      }
//
//      // Si no es Error, puede ser cualquier cosa lanzada con throw
//      return { datos: null, error: "Error desconocido" };
//    }
//  }
//
//  // Uso:
//  // const { datos, error } = await llamarAPI<Usuario[]>("/api/usuarios");
//  // TypeScript sabe que datos es Usuario[] | null y error es string | null
//
//  // ─── PROMISE.ALL TIPADO ───────────────────────────────────
//
//  // Promise.all ejecuta múltiples promesas en paralelo.
//  // TypeScript infiere los tipos de cada promesa automáticamente.
//
//  async function cargarDatosParalelo(): Promise<void> {
//    const [usuarios, productos, categorias] = await Promise.all([
//      fetch("/api/usuarios").then(r => r.json() as Promise<Usuario[]>),
//      fetch("/api/productos").then(r => r.json() as Promise<Producto[]>),
//      fetch("/api/categorias").then(r => r.json() as Promise<Categoria[]>),
//    ]);
//    // TypeScript infiere:
//    // usuarios → Usuario[]
//    // productos → Producto[]
//    // categorias → Categoria[]
//
//    console.log(usuarios.length);   // ✅ TypeScript sabe que es Usuario[]
//    console.log(productos[0].nombre); // ✅ TypeScript sabe que tiene .nombre
//  }
//
//  // ─── OBSERVABLE vs PROMISE EN ANGULAR ────────────────────
//
//  // En Angular rara vez usas Promise directamente para HTTP.
//  // HttpClient devuelve Observables (de la librería RxJS).
//  // Observable<T> es como Promise<T> pero más poderoso:
//  // → Puede emitir múltiples valores a lo largo del tiempo
//  // → Puede cancelarse (unsubscribe)
//  // → Tiene operadores: map, filter, switchMap, combineLatest, etc.
//
//  // En un servicio Angular (.ts):
//  //
//  // @Injectable({ providedIn: 'root' })
//  // export class ProductoService {
//  //   constructor(private http: HttpClient) {}
//  //
//  //   // Observable<T> en lugar de Promise<T>
//  //   obtenerTodos(): Observable<Producto[]> {
//  //     return this.http.get<Producto[]>('/api/productos');
//  //     // El tipado funciona exactamente igual que Promise<T>
//  //     // <Producto[]> le dice a TypeScript qué devuelve el endpoint
//  //   }
//  //
//  //   obtenerPorId(id: number): Observable<Producto | undefined> {
//  //     return this.http.get<Producto>(`/api/productos/${id}`).pipe(
//  //       catchError(() => of(undefined))
//  //     );
//  //   }
//  //
//  //   crear(dto: CrearProductoDTO): Observable<Producto> {
//  //     return this.http.post<Producto>('/api/productos', dto);
//  //   }
//  //
//  //   actualizar(id: number, cambios: Partial<Producto>): Observable<Producto> {
//  //     return this.http.patch<Producto>(`/api/productos/${id}`, cambios);
//  //   }
//  //
//  //   eliminar(id: number): Observable<void> {
//  //     return this.http.delete<void>(`/api/productos/${id}`);
//  //   }
//  // }

// ════════════════════════════════════════════════════════
//  BLOQUE 7: BUENAS PRÁCTICAS CON FUNCIONES
//  Patrones que debes seguir en proyectos Angular reales
// ════════════════════════════════════════════════════════
//
//  ── PRÁCTICA 1: Siempre anota parámetros de funciones públicas/exportadas ──
//
//  TypeScript puede inferir tipos en muchos casos, pero NO puede
//  inferir los tipos de los parámetros. Debes anotarlos siempre
//  en funciones que usarás desde otros archivos o componentes.
//
//  // MAL — los parámetros no tienen tipo declarado:
//  // function calcular(precio, cantidad, descuento) {
//  //   return (precio * cantidad) * (1 - descuento);
//  // }
//  // ¿Son todos number? ¿Es descuento entre 0 y 1 o un porcentaje?
//  // Nadie lo sabe sin leer el cuerpo.
//
//  // BIEN — cada parámetro tiene tipo y significado claro:
//  // function calcular(
//  //   precio: number,
//  //   cantidad: number,
//  //   descuentoPorcentaje: number  // entre 0 y 100
//  // ): number {
//  //   return (precio * cantidad) * (1 - descuentoPorcentaje / 100);
//  // }
//
//  ── PRÁCTICA 2: Anota el tipo de retorno de funciones de servicios ─────────
//
//  Si declaras explícitamente el tipo de retorno, TypeScript verifica
//  que TODOS los paths del cuerpo devuelven ese tipo.
//  Si cambias el cuerpo accidentalmente y el retorno cambia, TypeScript
//  te avisa en la línea de la firma, no donde se llama.
//
//  // Ejemplo — TypeScript DETECTA el error en la declaración:
//  // function obtenerDescuento(esVIP: boolean, total: number): number {
//  //   if (esVIP) return total * 0.2;
//  //   if (total > 1000) return 50;
//  //   // Olvidaste el return por defecto → TypeScript da error aquí
//  //   // ❌ Error: Function lacks ending return statement and return type does not include 'undefined'
//  // }
//
//  ── PRÁCTICA 3: Evita 'any' — usa 'unknown' con type guard ────────────────
//
//  // MAL — 'any' desactiva el tipado:
//  // function procesarDato(dato: any): string {
//  //   return dato.toString();  // ¿Y si dato es null? Falla en runtime.
//  // }
//
//  // BIEN — 'unknown' con verificación explícita:
//  // function procesarDato(dato: unknown): string {
//  //   if (dato === null || dato === undefined) return "Sin dato";
//  //   if (typeof dato === "string") return dato;
//  //   if (typeof dato === "number") return dato.toFixed(2);
//  //   if (typeof dato === "boolean") return dato ? "Sí" : "No";
//  //   return String(dato);
//  // }
//
//  ── PRÁCTICA 4: Genéricos en lugar de 'any' para múltiples tipos ──────────
//
//  // MAL — con any, pierde el tipo en el retorno:
//  // function clonar(objeto: any): any { return { ...objeto }; }
//  // const clon = clonar(usuario); // clon es 'any' — no hay autocompletado
//
//  // BIEN — con genérico, preserva el tipo:
//  // function clonar<T extends object>(objeto: T): T { return { ...objeto }; }
//  // const clon = clonar(usuario); // clon es el mismo tipo que usuario
//
//  ── PRÁCTICA 5: Nombra los tipos de callbacks ─────────────────────────────
//
//  Cuando una función recibe otra función como parámetro, declara
//  el tipo del callback con un 'type alias'. Hace el código más
//  legible y el tipo es reutilizable en múltiples funciones.
//
//  // MAL — la firma es larga e ilegible:
//  // function procesarItems(
//  //   items: string[],
//  //   callback: (item: string, index: number, transformado: string) => boolean
//  // ): string[]
//
//  // BIEN — tipo con nombre descriptivo:
//  // type CallbackProcesamiento = (item: string, index: number, transformado: string) => boolean;
//  // function procesarItems(items: string[], callback: CallbackProcesamiento): string[]
//
//  ── PRÁCTICA 6: Partial<T> para parámetros de actualización ──────────────
//
//  Cuando una función actualiza un objeto, el llamador solo debería
//  pasar los campos que quiere cambiar. Partial<T> hace eso posible.
//
//  // MAL — obliga a pasar TODO el objeto para cambiar un campo:
//  // function actualizar(usuario: Usuario): Promise<Usuario>
//  // Para cambiar solo el nombre:
//  // actualizar({ ...usuarioExistente, nombre: "Nuevo nombre" })
//  // → Debes conocer y pasar todos los campos del objeto
//
//  // BIEN — solo los campos que cambian:
//  // function actualizar(id: number, cambios: Partial<Usuario>): Promise<Usuario>
//  // Para cambiar solo el nombre:
//  // actualizar(1, { nombre: "Nuevo nombre" })
//  // → Simple, claro, y TypeScript verifica que 'nombre' es string
//
//  ── PATRÓN FACTORY / CURRYING — Función que retorna función ──────────────
//
//  Una función puede RETORNAR otra función. Esto se llama currying
//  o factory de funciones. Es muy común en Angular para:
//  - Crear validadores de formularios configurables
//  - Crear funciones con configuración diferente por contexto
//  - Crear middlewares e interceptors configurables
//
//  // En TypeScript (.ts):
//
//  function crearValidador(minLongitud: number, maxLongitud: number = Infinity) {
//    // Esta función RETORNA otra función
//    return (texto: string): { valido: boolean; error?: string } => {
//      // TypeScript infiere el tipo de retorno de la función interna
//      const limpio = texto.trim();
//      if (limpio.length < minLongitud) {
//        return { valido: false, error: `Mínimo ${minLongitud} caracteres` };
//      }
//      if (limpio.length > maxLongitud) {
//        return { valido: false, error: `Máximo ${maxLongitud} caracteres` };
//      }
//      return { valido: true };
//    };
//  }
//
//  const validarNombre = crearValidador(2, 50);   // entre 2 y 50 chars
//  const validarClave  = crearValidador(8, 100);  // entre 8 y 100 chars
//  const validarCodigo = crearValidador(6, 6);    // exactamente 6 chars
//
//  validarNombre("Ana").valido;        // true
//  validarNombre("A").error;           // "Mínimo 2 caracteres"
//  validarClave("pass1234").valido;    // true
//  validarCodigo("ABCDEF").valido;     // true
//  validarCodigo("ABC").error;         // "Mínimo 6 caracteres"
//
//  // EN ANGULAR — este patrón para validadores de formularios:
//  // function minimoCaracteres(min: number): ValidatorFn {
//  //   return (control: AbstractControl): ValidationErrors | null => {
//  //     const valor = control.value as string ?? "";
//  //     return valor.length >= min ? null : { minimoCaracteres: { min, actual: valor.length } };
//  //   };
//  // }
//  //
//  // En el componente:
//  // nombre: FormControl = new FormControl("", [
//  //   Validators.required,
//  //   minimoCaracteres(3),   // Validador configurado con 3 como mínimo
//  // ]);

// ════════════════════════════════════════════════════════
//  DEMOSTRACIÓN EJECUTABLE
//  Ejecuta: node 02_typescript_funciones.js
// ════════════════════════════════════════════════════════

console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║   📘 INVESTIGACIÓN #2 — TypeScript: Funciones Tipadas    ║");
console.log("╚══════════════════════════════════════════════════════════╝\n");

// ─────────────────────────────────────────────────────────
//  DEMO 1: Funciones básicas con tipos declarados
// ─────────────────────────────────────────────────────────
console.log("  🔷 DEMO 1 — FUNCIONES BÁSICAS CON TIPOS");
console.log("  ──────────────────────────────────────────");

// En TypeScript (.ts):
// function sumar(a: number, b: number): number { return a + b; }
function sumar(a, b) { return a + b; }

// En TypeScript (.ts):
// const multiplicar = (a: number, b: number): number => a * b;
const multiplicar = (a, b) => a * b;

// En TypeScript (.ts):
// function calcularDescuento(precio: number, porciento: number): number
function calcularDescuento(precio, porciento) {
  return precio - (precio * porciento / 100);
}

// En TypeScript (.ts):
// function obtenerNombreCompleto(nombre: string, apellido: string): string
function obtenerNombreCompleto(nombre, apellido) {
  return `${nombre} ${apellido}`;
}

// En TypeScript (.ts):
// function esMayorDeEdad(edad: number): boolean
function esMayorDeEdad(edad) {
  return edad >= 18;
}

console.log("  Declaración en TypeScript:");
console.log("  function sumar(a: number, b: number): number");
console.log("  const multiplicar = (a: number, b: number): number => a * b");
console.log("  function calcularDescuento(precio: number, porciento: number): number");
console.log("  function obtenerNombreCompleto(nombre: string, apellido: string): string");
console.log("  function esMayorDeEdad(edad: number): boolean");

console.log("\n  Resultados:");
console.log(`  sumar(15, 7)                    = ${sumar(15, 7)}`);
console.log(`  multiplicar(8, 6)               = ${multiplicar(8, 6)}`);
console.log(`  calcularDescuento(100, 20)      = $${calcularDescuento(100, 20)}`);
console.log(`  calcularDescuento(250, 15)      = $${calcularDescuento(250, 15)}`);
console.log(`  obtenerNombreCompleto("Ana","García") = ${obtenerNombreCompleto("Ana", "García")}`);
console.log(`  esMayorDeEdad(20)               = ${esMayorDeEdad(20)}`);
console.log(`  esMayorDeEdad(15)               = ${esMayorDeEdad(15)}`);

console.log("\n  Errores que TypeScript detectaría:");
console.log("  sumar('5', 3)       → ❌ Argument of type 'string' is not assignable to type 'number'");
console.log("  sumar(5)            → ❌ Expected 2 arguments, but got 1");
console.log("  sumar(1, 2, 3)      → ❌ Expected 2 arguments, but got 3");

// ─────────────────────────────────────────────────────────
//  DEMO 2: Función que retorna objeto tipado
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 2 — FUNCIÓN QUE RETORNA OBJETO TIPADO");
console.log("  ────────────────────────────────────────────────");
console.log("  En TypeScript (.ts):");
console.log("  interface ResultadoValidacion { esValido: boolean; errores: string[]; }");
console.log("  function validarEmail(email: string): ResultadoValidacion { ... }\n");

function validarEmail(email) {
  // En TS: function validarEmail(email: string): ResultadoValidacion
  // interface ResultadoValidacion { esValido: boolean; errores: string[]; campo?: string; }
  const errores = [];
  if (!email || email.trim() === "") errores.push("El email es requerido");
  else {
    if (!email.includes("@")) errores.push("Debe contener @");
    if (!email.includes(".")) errores.push("Debe tener un dominio con punto");
    if (email.length > 100) errores.push("Demasiado largo (máx 100 chars)");
  }
  return { esValido: errores.length === 0, errores };
}

function validarContrasena(password) {
  // En TS: function validarContrasena(password: string): ResultadoValidacion
  const errores = [];
  if (!password) errores.push("La contraseña es requerida");
  else {
    if (password.length < 8) errores.push("Mínimo 8 caracteres");
    if (!/[A-Z]/.test(password)) errores.push("Debe tener al menos una mayúscula");
    if (!/[0-9]/.test(password)) errores.push("Debe tener al menos un número");
    if (!/[!@#$%]/.test(password)) errores.push("Debe tener al menos un símbolo (!@#$%)");
  }
  return { esValido: errores.length === 0, errores };
}

const emails = [
  "ana@ejemplo.com",
  "correo-sin-arroba.com",
  "",
  "sin-dominio@",
  "valido@empresa.co",
];

const passwords = [
  "Segur@123",
  "corta",
  "sinmayuscula1!",
  "SinNumero!",
  "SinSimbolo1",
  "Completa1!",
];

console.log("  Validación de emails:");
emails.forEach((email) => {
  const resultado = validarEmail(email);
  const estado = resultado.esValido ? "✅" : "❌";
  const errores = resultado.errores.length > 0 ? `→ ${resultado.errores.join(", ")}` : "→ Válido";
  console.log(`  ${estado} "${email || "(vacío)"}".padEnd(30) ${errores}`);
});

console.log("\n  Validación de contraseñas:");
passwords.forEach((pass) => {
  const resultado = validarContrasena(pass);
  const estado = resultado.esValido ? "✅" : "❌";
  const errores = resultado.errores.length > 0 ? `→ ${resultado.errores.join(", ")}` : "→ Válida";
  console.log(`  ${estado} "${pass}".padEnd(20) ${errores}`);
});

// ─────────────────────────────────────────────────────────
//  DEMO 3: Parámetros especiales
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 3 — PARÁMETROS: opcionales, por defecto y rest");
console.log("  ─────────────────────────────────────────────────────────");

// Parámetro opcional
function crearSaludo(nombre, titulo) {
  // En TS: function crearSaludo(nombre: string, titulo?: string): string
  if (titulo) return `${titulo} ${nombre}`;
  return `Hola, ${nombre}`;
}

// Parámetros por defecto
function paginar(pagina = 1, limite = 10, orden = "asc") {
  // En TS: function paginar(pagina: number=1, limite: number=10, orden: "asc"|"desc"="asc")
  const skip = (pagina - 1) * limite;
  return { skip, limit: limite, orden, paginaActual: pagina };
}

// Parámetros rest
function sumarTodos(...numeros) {
  // En TS: function sumarTodos(...numeros: number[]): number
  return numeros.reduce((sum, n) => sum + n, 0);
}

function construirURL(base, ...segmentos) {
  // En TS: function construirURL(base: string, ...segmentos: string[]): string
  return segmentos.length > 0 ? `${base}/${segmentos.join("/")}` : base;
}

function combinarMensajes(separador, ...mensajes) {
  // En TS: function combinarMensajes(separador: string, ...mensajes: string[]): string
  return mensajes.join(separador);
}

console.log("  Parámetros OPCIONALES (?):");
console.log(`  crearSaludo("Ana")             = "${crearSaludo("Ana")}"`);
console.log(`  crearSaludo("García", "Dra.")  = "${crearSaludo("García", "Dra.")}"`);
console.log(`  crearSaludo("Pérez", "Ing.")   = "${crearSaludo("Pérez", "Ing.")}"`);

console.log("\n  Parámetros con VALOR POR DEFECTO:");
console.log(`  paginar()                  = ${JSON.stringify(paginar())}`);
console.log(`  paginar(2)                 = ${JSON.stringify(paginar(2))}`);
console.log(`  paginar(3, 25)             = ${JSON.stringify(paginar(3, 25))}`);
console.log(`  paginar(1, 5, "desc")      = ${JSON.stringify(paginar(1, 5, "desc"))}`);

console.log("\n  Parámetros REST (...):");
console.log(`  sumarTodos()                   = ${sumarTodos()}`);
console.log(`  sumarTodos(1, 2, 3)            = ${sumarTodos(1, 2, 3)}`);
console.log(`  sumarTodos(5, 10, 15, 20, 25)  = ${sumarTodos(5, 10, 15, 20, 25)}`);
console.log(`  construirURL("https://api.com")                = "${construirURL("https://api.com")}"`);
console.log(`  construirURL("https://api.com","users","123")  = "${construirURL("https://api.com", "users", "123")}"`);
console.log(`  combinarMensajes(" | ", "uno", "dos", "tres")  = "${combinarMensajes(" | ", "uno", "dos", "tres")}"`);

// ─────────────────────────────────────────────────────────
//  DEMO 4: Tipos de funciones y callbacks
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 4 — TIPOS DE FUNCIONES Y CALLBACKS");
console.log("  ──────────────────────────────────────────────");
console.log("  En TypeScript (.ts):");
console.log("  type Transformador = (valor: string) => string;");
console.log("  type Predicado<T> = (elemento: T) => boolean;");
console.log("  type Comparador<T> = (a: T, b: T) => number;\n");

// En TS: type Transformador = (valor: string) => string;
const aMayusculas     = (v) => v.toUpperCase();
const aMinusculas     = (v) => v.toLowerCase();
const sinEspacios     = (v) => v.trim();
const invertir        = (v) => v.split("").reverse().join("");
const primeraMayuscula = (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();

function aplicarTransformacion(texto, transformar) {
  // En TS: function aplicarTransformacion(texto: string, transformar: Transformador): string
  return transformar(texto);
}

function aplicarVarias(texto, ...transformadores) {
  // En TS: function aplicarVarias(texto: string, ...transformadores: Transformador[]): string
  return transformadores.reduce((resultado, fn) => fn(resultado), texto);
}

function procesarLista(items, transformar) {
  // En TS: function procesarLista<T, U>(items: T[], transformar: (item: T) => U): U[]
  return items.map(transformar);
}

function filtrarLista(items, predicado) {
  // En TS: function filtrarLista<T>(items: T[], predicado: Predicado<T>): T[]
  return items.filter(predicado);
}

const ciudades = ["  cali  ", "  bogota  ", "  medellin  ", "  cartagena  ", "  bucaramanga  "];
const numeros = [1, 5, 2, 8, 3, 7, 4, 9, 6, 10];

console.log("  Transformaciones individuales:");
console.log(`  aMayusculas("hola angular")     = "${aplicarTransformacion("hola angular", aMayusculas)}"`);
console.log(`  invertir("TypeScript")          = "${aplicarTransformacion("TypeScript", invertir)}"`);
console.log(`  primeraMayuscula("CARLOS")      = "${aplicarTransformacion("CARLOS", primeraMayuscula)}"`);

console.log("\n  Transformaciones encadenadas:");
const resultado = aplicarVarias("  hola mundo  ", sinEspacios, primeraMayuscula);
console.log(`  "  hola mundo  " → sinEspacios → primeraMayuscula = "${resultado}"`);

console.log("\n  Procesando listas:");
const nombresCiudades = procesarLista(
  ciudades,
  (c) => primeraMayuscula(c.trim())
);
console.log(`  ciudades (limpias y capitalizadas): [${nombresCiudades.join(", ")}]`);

const pares = filtrarLista(numeros, (n) => n % 2 === 0);
const impares = filtrarLista(numeros, (n) => n % 2 !== 0);
const mayoresDe5 = filtrarLista(numeros, (n) => n > 5);
console.log(`  pares:       [${pares.join(", ")}]`);
console.log(`  impares:     [${impares.join(", ")}]`);
console.log(`  mayores de 5: [${mayoresDe5.join(", ")}]`);

// ─────────────────────────────────────────────────────────
//  DEMO 5: Sobrecarga de funciones
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 5 — SOBRECARGA DE FUNCIONES");
console.log("  ──────────────────────────────────────────");
console.log("  En TypeScript (.ts) defines múltiples firmas:");
console.log("  function formatearValor(valor: string): string;");
console.log("  function formatearValor(valor: number, decimales: number): string;");
console.log("  function formatearValor(valor: boolean): string;");
console.log("  function formatearValor(valor: Date): string;\n");

function formatearValor(valor, extra) {
  // Implementación que maneja todos los casos
  if (typeof valor === "string")  return `"${valor}"`;
  if (typeof valor === "number")  return valor.toFixed(typeof extra === "number" ? extra : 2);
  if (typeof valor === "boolean") return valor ? "Sí" : "No";
  if (valor instanceof Date)      return valor.toLocaleDateString("es-CO");
  if (Array.isArray(valor))       return `[${valor.join(", ")}]`;
  return JSON.stringify(valor);
}

const valoresParaFormatear = [
  ["string",  "hola TypeScript",    undefined],
  ["number",  3.14159,              3],
  ["number",  1500.50,              2],
  ["boolean", true,                 undefined],
  ["boolean", false,                undefined],
  ["Date",    new Date("2024-06-15"), undefined],
  ["number",  0.5,                  4],
];

valoresParaFormatear.forEach(([tipo, valor, extra]) => {
  const resultado = formatearValor(valor, extra);
  const descripcion = extra !== undefined ? `${String(valor)} (${extra} decimales)` : String(valor);
  console.log(`  formatearValor(${tipo}: ${descripcion.padEnd(25)}) = ${resultado}`);
});

// ─────────────────────────────────────────────────────────
//  DEMO 6: Funciones genéricas
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 6 — FUNCIONES GENÉRICAS <T>");
console.log("  ────────────────────────────────────────");
console.log("  UNA función, múltiples tipos, seguridad en cada uso\n");

function primerElemento(arr) {
  // En TS: function primerElemento<T>(arr: T[]): T | undefined
  return arr.length > 0 ? arr[0] : undefined;
}

function ultimoElemento(arr) {
  // En TS: function ultimoElemento<T>(arr: T[]): T | undefined
  return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

function encontrarPrimero(arr, predicado) {
  // En TS: function encontrarPrimero<T>(arr: T[], predicado: (e: T) => boolean): T | undefined
  return arr.find(predicado);
}

function agruparPor(arr, obtenerClave) {
  // En TS: function agruparPor<T>(arr: T[], obtenerClave: (e: T) => string): Record<string, T[]>
  return arr.reduce((grupos, elemento) => {
    const clave = obtenerClave(elemento);
    if (!grupos[clave]) grupos[clave] = [];
    grupos[clave].push(elemento);
    return grupos;
  }, {});
}

function ordenarPor(arr, obtenerValor) {
  // En TS: function ordenarPor<T>(arr: T[], obtenerValor: (e: T) => number | string): T[]
  return [...arr].sort((a, b) => {
    const va = obtenerValor(a);
    const vb = obtenerValor(b);
    if (typeof va === "string") return va.localeCompare(String(vb));
    return Number(va) - Number(vb);
  });
}

const productos = [
  { id: 1, nombre: "Laptop",    precio: 1200, categoria: "electronica" },
  { id: 2, nombre: "Camiseta",  precio: 25,   categoria: "ropa" },
  { id: 3, nombre: "Mouse",     precio: 45,   categoria: "electronica" },
  { id: 4, nombre: "Pantalon",  precio: 60,   categoria: "ropa" },
  { id: 5, nombre: "Teclado",   precio: 85,   categoria: "electronica" },
  { id: 6, nombre: "Zapatos",   precio: 120,  categoria: "ropa" },
];

console.log("  Funciones genéricas aplicadas a productos:");
console.log(`  primerElemento:   ${JSON.stringify(primerElemento(productos))}`);
console.log(`  ultimoElemento:   ${JSON.stringify(ultimoElemento(productos))}`);

const masCaro = encontrarPrimero(productos, (p) => p.precio > 100);
console.log(`  primerPrecio>100: ${JSON.stringify(masCaro)}`);

const porCategoria = agruparPor(productos, (p) => p.categoria);
console.log("\n  Agrupados por categoría:");
Object.entries(porCategoria).forEach(([cat, prods]) => {
  console.log(`  ${cat}: [${prods.map((p) => p.nombre).join(", ")}]`);
});

const ordenadosPorPrecio = ordenarPor(productos, (p) => p.precio);
console.log("\n  Ordenados por precio:");
ordenadosPorPrecio.forEach((p) => {
  console.log(`  $${String(p.precio).padStart(6)} → ${p.nombre}`);
});

// ─────────────────────────────────────────────────────────
//  DEMO 7: Factory / Currying
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 7 — FACTORY: función que retorna función");
console.log("  ──────────────────────────────────────────────────");
console.log("  En TypeScript (.ts):");
console.log("  function crearValidador(min: number, max?: number): (texto: string) => Resultado");
console.log("  Muy usado en Angular para validadores de formularios configurables\n");

function crearValidador(minLongitud, maxLongitud = Infinity) {
  // En TS: function crearValidador(min: number, max: number = Infinity): (texto: string) => {...}
  return (texto) => {
    const limpio = texto.trim();
    if (limpio.length < minLongitud) {
      return { valido: false, error: `Mínimo ${minLongitud} caracteres` };
    }
    if (limpio.length > maxLongitud) {
      return { valido: false, error: `Máximo ${maxLongitud} caracteres` };
    }
    return { valido: true, error: null };
  };
}

function crearValidadorEmail() {
  return (email) => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      return { valido: false, error: "Email inválido" };
    }
    return { valido: true, error: null };
  };
}

function crearValidadorRango(min, max) {
  return (numero) => {
    if (numero < min || numero > max) {
      return { valido: false, error: `Debe estar entre ${min} y ${max}` };
    }
    return { valido: true, error: null };
  };
}

const validarNombre   = crearValidador(2, 50);
const validarApellido = crearValidador(2, 50);
const validarClave    = crearValidador(8, 100);
const validarCodigo   = crearValidador(6, 6);
const validarEmail    = crearValidadorEmail();
const validarEdad     = crearValidadorRango(18, 120);

const datosFormulario = [
  { campo: "nombre",   valor: "Ana" },
  { campo: "nombre",   valor: "A" },
  { campo: "apellido", valor: "García López" },
  { campo: "clave",    valor: "Segura123!" },
  { campo: "clave",    valor: "corta" },
  { campo: "codigo",   valor: "ABCDEF" },
  { campo: "codigo",   valor: "ABC" },
  { campo: "email",    valor: "ana@empresa.com" },
  { campo: "email",    valor: "correo-invalido" },
  { campo: "edad",     valor: 25 },
  { campo: "edad",     valor: 15 },
];

const validadores = {
  nombre:   validarNombre,
  apellido: validarApellido,
  clave:    validarClave,
  codigo:   validarCodigo,
  email:    validarEmail,
  edad:     validarEdad,
};

datosFormulario.forEach(({ campo, valor }) => {
  const validar = validadores[campo];
  if (!validar) return;
  const resultado = validar(valor);
  const icono = resultado.valido ? "✅" : "❌";
  const msg = resultado.valido ? "Válido" : resultado.error;
  console.log(`  ${icono} ${campo}: "${valor}"  → ${msg}`);
});

// ─────────────────────────────────────────────────────────
//  DEMO 8: Funciones asíncronas
// ─────────────────────────────────────────────────────────
async function ejecutarDemoAsync() {
  console.log("\n  🔷 DEMO 8 — FUNCIONES ASÍNCRONAS: async/await tipado");
  console.log("  ────────────────────────────────────────────────────────");
  console.log("  En TypeScript (.ts):");
  console.log("  async function obtenerUsuario(id: number): Promise<Usuario | null>");
  console.log("  async function llamarAPI<T>(url: string): Promise<{ datos: T|null; error: string|null }>\n");

  // Simulación de función async con tipo de retorno
  async function simularPeticion(url, exitosa = true, delay = 20) {
    // En TS: async function simularPeticion(url: string, exitosa?: boolean): Promise<{datos: unknown; error: string|null}>
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (!exitosa) {
      throw new Error(`HTTP 500: Error del servidor para ${url}`);
    }

    // Simula diferentes respuestas según la URL
    if (url.includes("usuarios")) {
      return [
        { id: 1, nombre: "Ana García", email: "ana@test.com", rol: "admin" },
        { id: 2, nombre: "Luis Pérez",  email: "luis@test.com", rol: "usuario" },
      ];
    }
    if (url.includes("productos")) {
      return [
        { id: 1, nombre: "Laptop",  precio: 1200 },
        { id: 2, nombre: "Mouse",   precio: 45 },
      ];
    }
    return { mensaje: "OK" };
  }

  // Función con manejo de errores tipado
  async function peticionSegura(url, exitosa = true) {
    // En TS: async function peticionSegura<T>(url: string): Promise<{ datos: T|null; error: string|null }>
    try {
      const datos = await simularPeticion(url, exitosa);
      return { datos, error: null };
    } catch (error) {
      // TypeScript: error es 'unknown' en catch con strict
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      return { datos: null, error: mensaje };
    }
  }

  // Peticiones individuales
  console.log("  Peticiones individuales:");
  const { datos: usuarios, error: err1 } = await peticionSegura("/api/usuarios");
  const { datos: productos, error: err2 } = await peticionSegura("/api/productos");
  const { datos: fallidaData, error: err3 } = await peticionSegura("/api/algo", false);

  console.log(`  GET /api/usuarios  → ${err1 ? `❌ ${err1}` : `✅ ${JSON.stringify(usuarios).substring(0, 60)}...`}`);
  console.log(`  GET /api/productos → ${err2 ? `❌ ${err2}` : `✅ ${JSON.stringify(productos).substring(0, 60)}...`}`);
  console.log(`  GET /api/algo      → ${err3 ? `❌ ${err3}` : `✅ OK`}`);

  // Promise.all — peticiones en paralelo
  console.log("\n  Promise.all — múltiples peticiones en paralelo:");
  const inicio = Date.now();
  const [resUsuarios, resProductos] = await Promise.all([
    peticionSegura("/api/usuarios"),
    peticionSegura("/api/productos"),
  ]);
  const tiempo = Date.now() - inicio;
  console.log(`  Ambas peticiones completadas en ~${tiempo}ms (paralelo)`);
  console.log(`  Usuarios: ${resUsuarios.error ? "❌" : "✅"} | Productos: ${resProductos.error ? "❌" : "✅"}`);
  if (resUsuarios.datos) {
    console.log(`  Usuarios recibidos: ${resUsuarios.datos.length}`);
  }
}

// ─────────────────────────────────────────────────────────
//  DEMO 9: Tabla de buenas prácticas
// ─────────────────────────────────────────────────────────
function mostrarBuenasPracticas() {
  console.log("\n  🔷 DEMO 9 — BUENAS PRÁCTICAS: resumen con ejemplos");
  console.log("  ─────────────────────────────────────────────────────");

  const practicas = [
    {
      numero: 1,
      titulo: "Anota los parámetros de funciones públicas/exportadas",
      malo:   "function calcular(precio, cantidad) { ... }",
      bien:   "function calcular(precio: number, cantidad: number): number { ... }",
      razon:  "Los parámetros no se pueden inferir. Sin anotación → TypeScript asume 'any'",
    },
    {
      numero: 2,
      titulo: "Anota el tipo de retorno de funciones de servicios",
      malo:   "function obtenerProducto(id) { ... } // ¿Qué devuelve?",
      bien:   "function obtenerProducto(id: number): Promise<Producto | null> { ... }",
      razon:  "Si cambias el cuerpo y el retorno cambia, TypeScript lo detecta",
    },
    {
      numero: 3,
      titulo: "Usa 'unknown' + type guard en lugar de 'any'",
      malo:   "function procesar(dato: any): string { return dato.toString(); }",
      bien:   "function procesar(dato: unknown): string { return dato === null ? '' : String(dato); }",
      razon:  "'unknown' obliga a verificar antes de usar. 'any' desactiva el tipado",
    },
    {
      numero: 4,
      titulo: "Usa genéricos <T> en lugar de 'any' para múltiples tipos",
      malo:   "function clonar(obj: any): any { return { ...obj }; }",
      bien:   "function clonar<T extends object>(obj: T): T { return { ...obj }; }",
      razon:  "El genérico preserva el tipo. Con 'any' el resultado pierde el tipo",
    },
    {
      numero: 5,
      titulo: "Nombra los tipos de callbacks con 'type alias'",
      malo:   "function procesar(items: string[], cb: (s: string, i: number) => string[]): void",
      bien:   "type FnProcesamiento = (s: string, i: number) => string[];\n     function procesar(items: string[], cb: FnProcesamiento): void",
      razon:  "Más legible y reutilizable en múltiples lugares",
    },
    {
      numero: 6,
      titulo: "Usa Partial<T> para parámetros de actualización",
      malo:   "function actualizar(usuario: Usuario): Promise<Usuario>",
      bien:   "function actualizar(id: number, cambios: Partial<Usuario>): Promise<Usuario>",
      razon:  "El llamador solo pasa los campos que cambiaron, no el objeto completo",
    },
    {
      numero: 7,
      titulo: "Promise<T> async — siempre especifica el tipo T",
      malo:   "async function getProductos(): Promise<any> { ... }",
      bien:   "async function getProductos(): Promise<Producto[]> { ... }",
      razon:  "Sin T, el resultado es 'any'. Con T, TypeScript conoce el tipo exacto",
    },
    {
      numero: 8,
      titulo: "En Angular: Observable<T> con HttpClient",
      malo:   "obtenerProductos(): Observable<any> { return this.http.get('/api/productos'); }",
      bien:   "obtenerProductos(): Observable<Producto[]> { return this.http.get<Producto[]>('/api/productos'); }",
      razon:  "El <T> en http.get<T> le dice a Angular qué tipo devuelve el endpoint",
    },
  ];

  practicas.forEach(({ numero, titulo, malo, bien, razon }) => {
    console.log(`\n  ${numero}. ${titulo}`);
    console.log(`     ❌ Mal:  ${malo}`);
    console.log(`     ✅ Bien: ${bien}`);
    console.log(`     📌 Por qué: ${razon}`);
  });
}

// ─────────────────────────────────────────────────────────
//  Ejecutar todas las demos
// ─────────────────────────────────────────────────────────
async function main() {
  await ejecutarDemoAsync();
  mostrarBuenasPracticas();

  console.log("\n\n╔══════════════════════════════════════════════════════════╗");
  console.log("║   ✅ Investigación #2 completada                         ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log("║                                                          ║");
  console.log("║   Resumen de lo que estudiaste:                          ║");
  console.log("║   ✓ Tipar parámetros y tipo de retorno                   ║");
  console.log("║   ✓ Inferencia del tipo de retorno (cuándo usarla)       ║");
  console.log("║   ✓ void: funciones que no retornan valor                ║");
  console.log("║   ✓ Parámetros opcionales (?)                            ║");
  console.log("║   ✓ Parámetros con valor por defecto                     ║");
  console.log("║   ✓ Parámetros rest (...)                                ║");
  console.log("║   ✓ Tipos de funciones con 'type alias'                  ║");
  console.log("║   ✓ Callbacks tipados                                    ║");
  console.log("║   ✓ Sobrecarga de funciones (overloads)                  ║");
  console.log("║   ✓ Funciones genéricas <T>                              ║");
  console.log("║   ✓ Restricciones con extends en genéricos               ║");
  console.log("║   ✓ async/await con Promise<T> tipado                    ║");
  console.log("║   ✓ Manejo de errores con unknown en catch               ║");
  console.log("║   ✓ Promise.all con múltiples tipos                      ║");
  console.log("║   ✓ Factory/Currying: función que retorna función        ║");
  console.log("║   ✓ 8 buenas prácticas para proyectos Angular            ║");
  console.log("║                                                          ║");
  console.log("║   Siguiente archivo: node 03_typescript_clases_interfaces.js ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
}

main().catch(console.error);