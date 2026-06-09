// ============================================================
//  📘 INVESTIGACIÓN #3 — TYPESCRIPT: CLASES E INTERFACES
// ============================================================
//
//  NOTA IMPORTANTE SOBRE ESTE ARCHIVO:
//  ─────────────────────────────────────────────────────────
//  Este archivo es .js para ejecutarlo con: node 03_typescript_clases_interfaces.js
//  El código TypeScript está en los COMENTARIOS para estudiarlo.
//  En Angular escribirás exactamente esa sintaxis en archivos .ts
//
//  ¿POR QUÉ SON IMPORTANTES LAS CLASES EN ANGULAR?
//  ─────────────────────────────────────────────────────────
//
//  En Angular, CASI TODO es una CLASE con un decorador:
//
//  - Componentes:  clase + @Component
//  - Servicios:    clase + @Injectable
//  - Pipes:        clase + @Pipe
//  - Guards:       clase + @Injectable
//  - Directivas:   clase + @Directive
//  - Interceptores: clase + @Injectable
//
//  Por eso entender clases de TypeScript es FUNDAMENTAL para
//  entender cómo funciona Angular por dentro.
//
//  Ejecutar: node 03_typescript_clases_interfaces.js
//
// ============================================================

"use strict";

// ════════════════════════════════════════════════════════
//  BLOQUE 1: CLASES BÁSICAS EN TYPESCRIPT
// ════════════════════════════════════════════════════════
//
//  Las clases de TypeScript son como las de JavaScript (ES6+),
//  pero con tipos y modificadores de acceso.
//
//  // En TypeScript (.ts):
//  class Animal {
//
//    // PROPIEDADES DE LA CLASE
//    nombre: string;
//    // 'nombre' es pública (public) por defecto.
//    // Cualquiera puede leerla y modificarla.
//
//    private energia: number;
//    // 'private' → solo accesible DENTRO de esta clase.
//    // animal.energia → ❌ Error: Property 'energia' is private
//
//    protected especie: string;
//    // 'protected' → accesible en esta clase Y en subclases.
//    // Más permisivo que private, más restrictivo que public.
//
//    readonly fechaNacimiento: Date;
//    // 'readonly' → puede leerse desde fuera, NO modificarse.
//    // Solo se puede asignar en el constructor.
//
//    // CONSTRUCTOR: inicializa las propiedades al crear el objeto
//    constructor(nombre: string, especie: string, energia: number = 100) {
//      this.nombre = nombre;
//      this.especie = especie;
//      this.energia = energia;
//      this.fechaNacimiento = new Date();
//    }
//
//    // MÉTODOS PÚBLICOS
//    moverse(distancia: number): string {
//      if (this.energia < distancia) {
//        return `${this.nombre} no tiene suficiente energía`;
//      }
//      this.energia -= distancia;
//      return `${this.nombre} se movió ${distancia}m. Energía: ${this.energia}`;
//    }
//
//    // GETTER: propiedad calculada de solo lectura
//    get estadoEnergia(): string {
//      if (this.energia >= 80) return "excelente";
//      if (this.energia >= 50) return "buena";
//      if (this.energia >= 20) return "baja";
//      return "crítica";
//    }
//    // Uso: animal.estadoEnergia (sin paréntesis, como propiedad)
//
//    // SETTER: validar antes de asignar
//    set nivelEnergia(nuevo: number) {
//      if (nuevo < 0) throw new Error("La energía no puede ser negativa");
//      this.energia = Math.min(nuevo, 100);
//    }
//    // Uso: animal.nivelEnergia = 75 (como asignación normal)
//  }
//
//  ─────────────────────────────────────────────────────────
//  SHORTHAND DE CONSTRUCTOR — La forma compacta (muy usada en Angular)
//  ─────────────────────────────────────────────────────────
//
//  En TypeScript puedes declarar Y asignar propiedades en el
//  constructor con UN SOLO PASO usando modificadores en los params.
//
//  // En TypeScript (.ts):
//  class Persona {
//    constructor(
//      public nombre: string,
//      // 'public' en el param = declarar como public + asignar
//      // Equivale a: public nombre: string; + this.nombre = nombre;
//
//      private edad: number,
//      // Equivale a: private edad: number; + this.edad = edad;
//
//      protected email: string,
//
//      readonly id: number = Date.now(),
//      // readonly + valor por defecto
//
//      private activo: boolean = true,
//    ) {
//      // No necesitas escribir nada aquí para estas propiedades.
//      // TypeScript las crea y asigna automáticamente.
//    }
//
//    saludar(): string {
//      return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
//    }
//  }
//
//  // EN ANGULAR esto se ve en los SERVICIOS todo el tiempo:
//  // @Component({ ... })
//  // class MiComponente {
//  //   constructor(
//  //     private usuarioService: UsuarioService,
//  //     private router: Router,
//  //     private fb: FormBuilder,
//  //   ) {
//  //     // Angular inyecta estas dependencias automáticamente
//  //   }
//  // }

// ════════════════════════════════════════════════════════
//  BLOQUE 2: MODIFICADORES DE ACCESO — TABLA COMPARATIVA
// ════════════════════════════════════════════════════════
//
//  ┌─────────────┬────────────────────┬──────────────┬───────────────┐
//  │ Modificador │ Dentro de la clase │ En subclases │ Desde afuera  │
//  ├─────────────┼────────────────────┼──────────────┼───────────────┤
//  │ public      │ ✅ Sí              │ ✅ Sí        │ ✅ Sí         │
//  │ protected   │ ✅ Sí              │ ✅ Sí        │ ❌ No         │
//  │ private     │ ✅ Sí              │ ❌ No        │ ❌ No         │
//  │ readonly    │ Solo en constructor│ ✅ Sí (leer) │ ✅ Leer, ❌ Escribir│
//  └─────────────┴────────────────────┴──────────────┴───────────────┘
//
//  CUÁNDO USAR CADA UNO:
//  public    → API pública del objeto (lo que quieres exponer)
//  private   → Estado interno, lógica interna, constantes internas
//  protected → Cuando las subclases necesitan acceso pero no el exterior
//  readonly  → Datos que no deben cambiar después de la construcción

// ════════════════════════════════════════════════════════
//  BLOQUE 3: HERENCIA (extends)
// ════════════════════════════════════════════════════════
//
//  // En TypeScript (.ts):
//  class Perro extends Animal {
//    // Hereda TODO de Animal y agrega cosas propias.
//
//    raza: string;
//
//    constructor(nombre: string, raza: string) {
//      super(nombre, "Canis lupus familiaris");
//      // 'super(...)' llama al constructor de la clase PADRE.
//      // OBLIGATORIO si hay constructor en la subclase.
//      // Debe ser la PRIMERA línea del constructor.
//
//      this.raza = raza;
//    }
//
//    ladrar(): string {
//      return `${this.nombre} (${this.raza}): ¡Guau guau!`;
//    }
//
//    // SOBREESCRIBIR un método del padre:
//    override moverse(distancia: number): string {
//      // 'override' documenta que estás sobreescribiendo.
//      // Si el padre NO tiene ese método → TypeScript da error.
//      const resultado = super.moverse(distancia); // llama al padre
//      return `🐕 ${resultado}`;
//    }
//
//    obtenerEspecie(): string {
//      return this.especie; // ✅ protected → accesible en subclase
//      // this.energia;     // ❌ Error: private → no accesible
//    }
//  }

// ════════════════════════════════════════════════════════
//  BLOQUE 4: CLASES ABSTRACTAS
//  Clases que NO se pueden instanciar directamente.
// ════════════════════════════════════════════════════════
//
//  Una clase abstracta es un "contrato parcialmente implementado".
//  Define QUÉ deben hacer las subclases (métodos abstractos)
//  y puede proveer implementaciones comunes (métodos concretos).
//
//  EN ANGULAR: FormControl, FormGroup y FormArray heredan de
//  la clase abstracta AbstractControl. Los Guards implementan
//  interfaces como CanActivate. Es el mismo patrón.
//
//  // En TypeScript (.ts):
//  abstract class FormularioBase {
//
//    // MÉTODO ABSTRACTO: sin implementación.
//    // Las subclases DEBEN implementarlo o TypeScript da error.
//    abstract validar(): boolean;
//    abstract obtenerDatos(): Record<string, unknown>;
//
//    // MÉTODO CONCRETO: tiene implementación.
//    // Las subclases lo heredan y pueden sobreescribirlo.
//    enviar(): void {
//      if (this.validar()) {
//        const datos = this.obtenerDatos();
//        console.log("Enviando datos:", datos);
//      } else {
//        console.log("Formulario inválido.");
//      }
//    }
//  }
//
//  // new FormularioBase(); // ❌ Error: Cannot create an instance of abstract class
//
//  class FormularioRegistro extends FormularioBase {
//    private nombre: string = "";
//    private email: string  = "";
//
//    setNombre(v: string): void { this.nombre = v; }
//    setEmail(v: string): void  { this.email  = v; }
//
//    override validar(): boolean {
//      // Implementación requerida (declarada abstract en FormularioBase)
//      return this.nombre.trim().length >= 2 &&
//             this.email.includes("@");
//    }
//
//    override obtenerDatos(): Record<string, unknown> {
//      return { nombre: this.nombre, email: this.email };
//    }
//  }

// ════════════════════════════════════════════════════════
//  BLOQUE 5: INTERFACES IMPLEMENTADAS POR CLASES
// ════════════════════════════════════════════════════════
//
//  Una INTERFACE es un CONTRATO PURO: solo define qué debe existir,
//  sin implementar nada. Las clases la "implementan" con 'implements'.
//
//  DIFERENCIA CON CLASE ABSTRACTA:
//  - Clase abstracta: puede tener implementación (métodos concretos)
//  - Interface: NUNCA tiene implementación, solo firmas
//
//  // En TypeScript (.ts):
//  interface Serializable {
//    serializar(): string;
//    // Cualquier clase que implemente esto DEBE tener este método.
//  }
//
//  interface Comparable<T> {
//    compararCon(otro: T): number;
//    // Negativo = this < otro, 0 = iguales, positivo = this > otro
//  }
//
//  // Una clase puede implementar MÚLTIPLES interfaces
//  // (a diferencia de extends que solo permite una clase padre):
//  class Producto implements Serializable, Comparable<Producto> {
//    constructor(
//      public id: number,
//      public nombre: string,
//      public precio: number,
//    ) {}
//
//    serializar(): string {
//      return JSON.stringify({ id: this.id, nombre: this.nombre, precio: this.precio });
//    }
//
//    compararCon(otro: Producto): number {
//      return this.precio - otro.precio;
//      // Negativo si this es más barato
//    }
//  }
//
//  ─────────────────────────────────────────────────────────
//  IMPORTANTE: En Angular las interfaces son ESENCIALES para:
//  ─────────────────────────────────────────────────────────
//  - Tipar las respuestas de la API: interface UsuarioDTO { ... }
//  - Tipar el estado de NgRx: interface AppState { ... }
//  - Contrato de ciclo de vida: OnInit, OnDestroy, OnChanges
//
//  // interface OnInit {
//  //   ngOnInit(): void;   // Angular lo llama cuando el componente inicia
//  // }
//  //
//  // @Component({ ... })
//  // class MiComponente implements OnInit {
//  //   ngOnInit(): void {
//  //     this.cargarDatos(); // Se ejecuta al iniciar el componente
//  //   }
//  // }

// ════════════════════════════════════════════════════════
//  BLOQUE 6: DECORADORES — El corazón de Angular
// ════════════════════════════════════════════════════════
//
//  Un DECORADOR es una función especial que se aplica a:
//  - Clases:      @Component, @Injectable, @Pipe, @NgModule
//  - Propiedades: @Input, @Output, @ViewChild, @HostBinding
//  - Métodos:     @HostListener
//  - Parámetros:  @Inject
//
//  Son el mecanismo que Angular usa para agregar METADATOS
//  a las clases sin modificar su código directamente.
//
//  REQUIEREN en tsconfig.json:  "experimentalDecorators": true
//  Angular CLI lo configura automáticamente al crear el proyecto.
//
//  ─────────────────────────────────────────────────────────
//  ASÍ SE USAN LOS DECORADORES EN ANGULAR REAL:
//  ─────────────────────────────────────────────────────────
//
//  // COMPONENTE — la unidad básica de Angular:
//  @Component({
//    selector: 'app-usuario',          // El tag HTML: <app-usuario>
//    standalone: true,                 // Componente standalone (Angular 17+)
//    imports: [NgIf, NgFor, AsyncPipe], // Qué directivas usa el template
//    template: `
//      <h1>{{ titulo }}</h1>
//      <p *ngIf="mostrar">Contenido visible</p>
//    `,
//    styles: [`h1 { color: blue; }`]
//  })
//  export class UsuarioComponent implements OnInit {
//    @Input() titulo: string = '';
//    // @Input() → este componente RECIBE datos del padre
//
//    @Output() seleccionado = new EventEmitter<Usuario>();
//    // @Output() → este componente EMITE eventos al padre
//
//    @ViewChild('formulario') formRef!: ElementRef;
//    // @ViewChild() → referencia a un elemento del template
//
//    mostrar = false;
//
//    ngOnInit(): void {
//      // Se ejecuta cuando el componente inicia
//      console.log('Componente iniciado');
//    }
//  }
//
//  // SERVICIO — para lógica compartida entre componentes:
//  @Injectable({
//    providedIn: 'root'   // disponible en toda la aplicación
//  })
//  export class UsuarioService {
//    constructor(private http: HttpClient) {}
//    // Angular inyecta HttpClient automáticamente gracias a @Injectable
//
//    obtenerUsuarios(): Observable<Usuario[]> {
//      return this.http.get<Usuario[]>('/api/usuarios');
//    }
//  }
//
//  ─────────────────────────────────────────────────────────
//  LO QUE HACE UN DECORADOR POR DENTRO (simplificado):
//  ─────────────────────────────────────────────────────────
//
//  // Decorador simple que solo agrega un log:
//  function Logeable(constructor: Function): void {
//    console.log(`Clase registrada: ${constructor.name}`);
//  }
//
//  @Logeable
//  class MiServicio { }
//  // → Imprime: "Clase registrada: MiServicio"
//
//  // Decorador con parámetros (como @Component({ selector: '...' })):
//  function Configurar(config: { nombre: string }) {
//    return function(constructor: Function) {
//      Object.defineProperty(constructor.prototype, 'config', {
//        value: config
//      });
//    };
//  }
//
//  @Configurar({ nombre: "Mi App" })
//  class MiApp { }
//  // Angular hace algo similar pero mucho más sofisticado.

// ════════════════════════════════════════════════════════
//  BLOQUE 7: MÉTODOS Y PROPIEDADES ESTÁTICAS
// ════════════════════════════════════════════════════════
//
//  'static' = pertenece a la CLASE, no a las instancias.
//  No necesitas crear un objeto para usarlo.
//
//  // En TypeScript (.ts):
//  class ConfiguracionApp {
//    static readonly VERSION: string = "1.0.0";
//    static readonly MAX_INTENTOS: number = 3;
//
//    private static instancia: ConfiguracionApp | null = null;
//
//    // Constructor privado → nadie puede hacer new ConfiguracionApp()
//    private constructor() {}
//
//    // Patrón Singleton: una sola instancia en toda la app
//    static getInstancia(): ConfiguracionApp {
//      if (!ConfiguracionApp.instancia) {
//        ConfiguracionApp.instancia = new ConfiguracionApp();
//      }
//      return ConfiguracionApp.instancia;
//    }
//  }
//
//  console.log(ConfiguracionApp.VERSION);  // "1.0.0" (sin instanciar)
//  const config1 = ConfiguracionApp.getInstancia();
//  const config2 = ConfiguracionApp.getInstancia();
//  console.log(config1 === config2);  // true → misma instancia
//
//  // EN ANGULAR los servicios con providedIn: 'root' son Singletons.
//  // Angular gestiona la instancia única automáticamente.

// ════════════════════════════════════════════════════════
//  DEMOSTRACIÓN EJECUTABLE
// ════════════════════════════════════════════════════════

console.log("========================================");
console.log("  📘 INVESTIGACIÓN #3 — TypeScript:");
console.log("     Clases e Interfaces");
console.log("========================================\n");

// ─────────────────────────────────────────────────────────
//  Simulando clases de TypeScript en JavaScript
// ─────────────────────────────────────────────────────────

class Animal {
  // En TS tendría: private energia, protected especie, readonly fechaNacimiento
  constructor(nombre, especie, energia = 100) {
    this.nombre   = nombre;
    this.especie  = especie;
    this._energia = energia; // En TS sería: private energia: number
    this.fechaNacimiento = new Date();
  }

  moverse(distancia) {
    // En TS: moverse(distancia: number): string
    if (this._energia < distancia) {
      return `${this.nombre} no tiene suficiente energía para moverse ${distancia}m`;
    }
    this._energia -= distancia;
    return `${this.nombre} se movió ${distancia}m. Energía restante: ${this._energia}`;
  }

  get estadoEnergia() {
    // En TS: get estadoEnergia(): string
    if (this._energia >= 80) return "excelente";
    if (this._energia >= 50) return "buena";
    if (this._energia >= 20) return "baja";
    return "crítica";
  }

  set nivelEnergia(nuevo) {
    // En TS: set nivelEnergia(nuevo: number)
    if (nuevo < 0) throw new Error("La energía no puede ser negativa");
    this._energia = Math.min(nuevo, 100);
  }
}

class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre, "Canis lupus familiaris"); // En TS: super() OBLIGATORIO
    this.raza = raza;
  }

  ladrar() {
    // En TS: ladrar(): string
    return `${this.nombre} (${this.raza}): ¡Guau guau!`;
  }

  moverse(distancia) {
    // En TS: override moverse(distancia: number): string
    const resultado = super.moverse(distancia); // llama al padre
    return `🐕 ${resultado}`;
  }
}

console.log("  🔷 CLASES BÁSICAS — Animal:");
console.log("  ─────────────────────────────────────");
const animal = new Animal("León", "Panthera leo");
console.log(`  ${animal.moverse(10)}`);
console.log(`  ${animal.moverse(20)}`);
console.log(`  Estado energía: ${animal.estadoEnergia}`);

console.log("\n  🔷 HERENCIA — Perro extends Animal:");
console.log("  ─────────────────────────────────────");
const perro = new Perro("Rex", "Labrador");
console.log(`  ${perro.ladrar()}`);
console.log(`  ${perro.moverse(15)}`);
console.log(`  Estado energía: ${perro.estadoEnergia}`);

// ─────────────────────────────────────────────────────────
//  Simulando clase abstracta
// ─────────────────────────────────────────────────────────

// En JS no existe abstract, simulamos el patrón:
class FormularioBase {
  validar() {
    // En TS: abstract validar(): boolean;
    throw new Error("Implementa validar() en la subclase");
  }

  obtenerDatos() {
    // En TS: abstract obtenerDatos(): Record<string, unknown>;
    throw new Error("Implementa obtenerDatos() en la subclase");
  }

  enviar() {
    // En TS: enviar(): void  (método concreto, no abstracto)
    if (this.validar()) {
      const datos = this.obtenerDatos();
      console.log("  ✅ Formulario válido. Enviando:", JSON.stringify(datos));
    } else {
      console.log("  ❌ Formulario inválido. Corrige los errores.");
    }
  }

  mostrarError(campo, mensaje) {
    console.log(`     Error en '${campo}': ${mensaje}`);
  }
}

class FormularioRegistro extends FormularioBase {
  constructor() {
    super();
    this.nombre = "";
    this.email  = "";
  }

  setNombre(v) { this.nombre = v; }
  setEmail(v)  { this.email  = v; }

  validar() {
    // En TS: override validar(): boolean
    const nombreOK = this.nombre.trim().length >= 2;
    const emailOK  = this.email.includes("@") && this.email.includes(".");
    if (!nombreOK) this.mostrarError("nombre", "Mínimo 2 caracteres");
    if (!emailOK)  this.mostrarError("email",  "Formato inválido (debe tener @ y .)");
    return nombreOK && emailOK;
  }

  obtenerDatos() {
    // En TS: override obtenerDatos(): Record<string, unknown>
    return { nombre: this.nombre, email: this.email };
  }
}

console.log("\n  🔷 CLASE ABSTRACTA — FormularioBase:");
console.log("  ─────────────────────────────────────");

const form = new FormularioRegistro();
console.log("  Intento 1 — datos inválidos:");
form.setNombre("A");
form.setEmail("correo-mal");
form.enviar();

console.log("\n  Intento 2 — datos válidos:");
form.setNombre("Ana García");
form.setEmail("ana@ejemplo.com");
form.enviar();

// ─────────────────────────────────────────────────────────
//  Simulando interfaces con clases que las implementan
// ─────────────────────────────────────────────────────────

// En JS no existen interfaces, pero las simulamos con el patrón:
class Producto {
  // En TS: implements Serializable, Comparable<Producto>
  constructor(id, nombre, precio) {
    this.id     = id;
    this.nombre = nombre;
    this.precio = precio;
    this.creadoEn = new Date();
    this._historial = [];
  }

  // Serializable
  serializar() {
    // En TS: serializar(): string
    return JSON.stringify({ id: this.id, nombre: this.nombre, precio: this.precio });
  }

  // Comparable<Producto>
  compararCon(otro) {
    // En TS: compararCon(otro: Producto): number
    return this.precio - otro.precio;
    // Negativo = this es más barato
  }

  registrarCambio(campo, anterior, nuevo) {
    this._historial.push(`${campo}: ${anterior} → ${nuevo}`);
  }

  getHistorial() {
    return [...this._historial]; // Copia para no exponer el original
  }
}

console.log("\n  🔷 INTERFACES implementadas por clases:");
console.log("  ─────────────────────────────────────");

const laptop = new Producto(1, "Laptop", 1200);
const mouse  = new Producto(2, "Mouse", 25);
const teclado = new Producto(3, "Teclado", 85);

console.log(`  laptop.serializar():          ${laptop.serializar()}`);
console.log(`  laptop.compararCon(mouse):    ${laptop.compararCon(mouse)} → Laptop más caro`);
console.log(`  mouse.compararCon(laptop):    ${mouse.compararCon(laptop)} → Mouse más barato`);
console.log(`  mouse.compararCon(mouse):     ${mouse.compararCon(mouse)} → Iguales`);

laptop.registrarCambio("precio", 1200, 999);
laptop.registrarCambio("nombre", "Laptop", "Laptop Pro");
console.log(`  Historial de cambios de laptop: ${laptop.getHistorial().join(" | ")}`);

// Ordenar productos por precio (compararCon lo permite)
const todosLosProductos = [laptop, mouse, teclado];
todosLosProductos.sort((a, b) => a.compararCon(b));
console.log("\n  Productos ordenados por precio:");
todosLosProductos.forEach((p) => {
  console.log(`  $${String(p.precio).padEnd(6)} → ${p.nombre}`);
});

// ─────────────────────────────────────────────────────────
//  Singleton estático
// ─────────────────────────────────────────────────────────

class ConfiguracionApp {
  static VERSION     = "1.0.0";
  static MAX_PAGINAS = 50;
  static _instancia  = null; // En TS: private static instancia: ConfiguracionApp | null = null;

  constructor() {
    if (ConfiguracionApp._instancia) return ConfiguracionApp._instancia;
    this._config = new Map();
    this._config.set("tema", "oscuro");
    this._config.set("idioma", "es");
    ConfiguracionApp._instancia = this;
  }

  static getInstancia() {
    // En TS: static getInstancia(): ConfiguracionApp
    if (!ConfiguracionApp._instancia) {
      ConfiguracionApp._instancia = new ConfiguracionApp();
    }
    return ConfiguracionApp._instancia;
  }

  obtener(clave) { return this._config.get(clave); }
  establecer(clave, valor) { this._config.set(clave, valor); }
}

console.log("\n  🔷 SINGLETON — ConfiguracionApp:");
console.log("  ─────────────────────────────────────");
console.log(`  ConfiguracionApp.VERSION   = ${ConfiguracionApp.VERSION}`);
console.log(`  ConfiguracionApp.MAX_PAGINAS = ${ConfiguracionApp.MAX_PAGINAS}`);

const config1 = ConfiguracionApp.getInstancia();
const config2 = ConfiguracionApp.getInstancia();
console.log(`  config1 === config2        = ${config1 === config2}  (misma instancia)`);
console.log(`  tema actual:               ${config1.obtener("tema")}`);
config1.establecer("tema", "claro");
console.log(`  tema después del cambio:   ${config2.obtener("tema")}  (mismo objeto)`);

// ─────────────────────────────────────────────────────────
//  Resumen de comparación
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 TABLA COMPARATIVA — Clase vs Interface vs Abstract:");
console.log("  ─────────────────────────────────────────────────────────");

const tabla = [
  { concepto: "class",             instanciable: "✅ Sí",  implementacion: "✅ Sí",  herencia:  "extends (1 sola)" },
  { concepto: "abstract class",    instanciable: "❌ No",  implementacion: "✅ Sí",  herencia:  "extends (1 sola)" },
  { concepto: "interface",         instanciable: "❌ No",  implementacion: "❌ No",  herencia:  "implements (múltiples)" },
];

console.log("  Concepto           ¿Instanciable?  ¿Tiene impl?  Herencia");
tabla.forEach(({ concepto, instanciable, implementacion, herencia }) => {
  console.log(`  ${concepto.padEnd(18)} ${instanciable.padEnd(15)} ${implementacion.padEnd(13)} ${herencia}`);
});

console.log("\n✅ Investigación #3 completada.");
console.log("   Siguiente: node 04_typescript_buenas_practicas.js\n");