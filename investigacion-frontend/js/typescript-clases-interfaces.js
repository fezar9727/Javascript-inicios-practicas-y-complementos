
// ============================================================
//  📘 INVESTIGACIÓN #3 — TYPESCRIPT: CLASES E INTERFACES
// ============================================================
//
//  NOTA IMPORTANTE SOBRE ESTE ARCHIVO:
//  ─────────────────────────────────────────────────────────
//  Este archivo es .js para ejecutarlo con Node.js directamente.
//  Todo el código TypeScript está en los COMENTARIOS para que
//  lo leas, estudies y entiendas línea por línea.
//  En Angular escribirás esa misma sintaxis en archivos .ts
//
//  Ejecutar: node 03_typescript_clases_interfaces.js
//
// ============================================================
//
//  ¿POR QUÉ LAS CLASES SON EL CENTRO DE ANGULAR?
//  ─────────────────────────────────────────────────────────
//
//  En Angular, ABSOLUTAMENTE TODO es una clase con un decorador:
//
//  COMPONENTES — la unidad de UI:
//  @Component({ selector: 'app-home', template: '<h1>Hola</h1>' })
//  export class HomeComponent implements OnInit { ... }
//
//  SERVICIOS — lógica de negocio compartida:
//  @Injectable({ providedIn: 'root' })
//  export class AuthService { ... }
//
//  PIPES — transformar datos en el template:
//  @Pipe({ name: 'moneda', standalone: true })
//  export class MonedaPipe implements PipeTransform { ... }
//
//  GUARDS — proteger rutas de navegación:
//  @Injectable({ providedIn: 'root' })
//  export class AuthGuard implements CanActivate { ... }
//
//  DIRECTIVAS — modificar el DOM:
//  @Directive({ selector: '[appResaltar]' })
//  export class ResaltarDirective { ... }
//
//  INTERCEPTORS — interceptar peticiones HTTP:
//  @Injectable()
//  export class TokenInterceptor implements HttpInterceptor { ... }
//
//  El patrón es siempre el mismo:
//  1. Una CLASE de TypeScript con propiedades y métodos tipados
//  2. Un DECORADOR que le agrega metadatos para Angular
//  3. Una o más INTERFACES de ciclo de vida (OnInit, OnDestroy, etc.)
//
//  Sin entender clases de TypeScript, Angular es magia negra.
//  Con entenderlas, Angular es completamente predecible.
//
//  ─────────────────────────────────────────────────────────
//  ¿QUÉ AGREGA TYPESCRIPT A LAS CLASES DE JAVASCRIPT?
//  ─────────────────────────────────────────────────────────
//
//  JavaScript ES6+ ya tiene clases, pero son básicas:
//  no tienen tipos, no tienen modificadores de acceso,
//  no tienen interfaces ni clases abstractas.
//
//  TypeScript agrega:
//  1. Tipos para propiedades:   nombre: string; edad: number;
//  2. Modificadores de acceso:  public, private, protected, readonly
//  3. Shorthand de constructor: constructor(private nombre: string) {}
//  4. Getters y setters tipados: get valor(): string { ... }
//  5. Clases abstractas:        abstract class Base { abstract metodo(): void; }
//  6. Implementar interfaces:   class X implements ISerializable { ... }
//  7. La palabra 'override':    override metodo() { ... }
//  8. Propiedades readonly:     readonly id: number;
//  9. Decoradores:              @Component, @Injectable, @Input...
//
// ============================================================
//  BLOQUES DE ESTUDIO — TypeScript en comentarios
// ============================================================

"use strict";

// ════════════════════════════════════════════════════════
//  BLOQUE 1: CLASES BÁSICAS EN TYPESCRIPT
//  Propiedades, constructor, métodos, getters y setters
// ════════════════════════════════════════════════════════
//
//  Una clase en TypeScript es como en JavaScript ES6,
//  pero con tipos estáticos para todo: propiedades, parámetros
//  y valores de retorno de métodos.
//
//  ANATOMÍA DE UNA CLASE TYPESCRIPT:
//
//  // En TypeScript (.ts):
//  class NombreClase {
//
//    // 1. PROPIEDADES (declaradas con tipo antes del constructor)
//    propiedad1: string;
//    propiedad2: number;
//
//    // 2. CONSTRUCTOR (inicializa las propiedades)
//    constructor(param1: string, param2: number) {
//      this.propiedad1 = param1;
//      this.propiedad2 = param2;
//    }
//
//    // 3. MÉTODOS (funciones de la clase, con tipos)
//    miMetodo(arg: string): void { ... }
//    otroMetodo(): number { return this.propiedad2; }
//
//    // 4. GETTER (propiedad calculada de solo lectura)
//    get propiedad3(): string { return `${this.propiedad1} calculado`; }
//
//    // 5. SETTER (validar antes de asignar)
//    set propiedad4(valor: string) { this.propiedad1 = valor.trim(); }
//  }
//
//  ── EJEMPLO COMPLETO — Clase Animal ──────────────────────
//
//  // En TypeScript (.ts):
//  class Animal {
//
//    // ─── PROPIEDADES ────────────────────────────────────────
//
//    nombre: string;
//    // public por defecto: cualquiera puede leer y escribir
//    // animal.nombre = "León" ✅ desde cualquier lugar
//
//    private energia: number;
//    // Solo accesible DENTRO de esta misma clase (Animal).
//    // animal.energia → ❌ Error: Property 'energia' is private
//    // Protege el estado interno del objeto.
//    // El mundo exterior no puede modificar la energía directamente.
//
//    protected especie: string;
//    // Accesible dentro de Animal Y en las subclases (Perro, Gato...).
//    // animal.especie desde afuera → ❌ Error: Property 'especie' is protected
//    // Pero desde dentro de Perro → ✅ this.especie
//
//    readonly fechaNacimiento: Date;
//    // Puede leerse desde cualquier lugar.
//    // PERO solo puede asignarse en el constructor.
//    // animal.fechaNacimiento = new Date() → ❌ Error: read-only property
//    // Es como 'const' pero para propiedades de objetos.
//
//    // ─── CONSTRUCTOR ────────────────────────────────────────
//
//    constructor(nombre: string, especie: string, energia: number = 100) {
//      // TypeScript verifica que los argumentos sean del tipo correcto.
//      // new Animal(42, "León") → ❌ Error: 'number' no es 'string'
//      // new Animal("León")    → ❌ Error: falta el argumento 'especie'
//
//      this.nombre   = nombre;    // pública → asignable desde constructor
//      this.especie  = especie;   // protegida → asignable desde constructor
//      this.energia  = energia;   // privada → asignable desde constructor
//      this.fechaNacimiento = new Date(); // readonly → SOLO en constructor
//
//      // energia tiene valor por defecto 100.
//      // new Animal("León", "Panthera leo") → energia = 100
//      // new Animal("León", "Panthera leo", 75) → energia = 75
//    }
//
//    // ─── MÉTODOS PÚBLICOS ────────────────────────────────────
//
//    moverse(distancia: number): string {
//      // TypeScript verifica que distancia sea number.
//      // animal.moverse("lejos") → ❌ Error al compilar
//
//      if (this.energia < distancia) {
//        return `${this.nombre} no tiene energía suficiente para moverse ${distancia}m`;
//      }
//      this.energia -= distancia;
//      // Accedemos a this.energia que es private → OK (estamos dentro de Animal)
//      return `${this.nombre} se movió ${distancia}m. Energía: ${this.energia}`;
//    }
//
//    alimentar(calorias: number): void {
//      // void: este método no retorna nada, solo tiene efecto
//      this.energia = Math.min(this.energia + calorias, 100);
//      console.log(`${this.nombre} fue alimentado. Energía: ${this.energia}`);
//    }
//
//    // ─── GETTER: propiedad calculada (sin paréntesis al usarlo) ──
//
//    get estadoEnergia(): string {
//      // Se usa como propiedad: animal.estadoEnergia (no como función)
//      // No puede recibir parámetros.
//      // Debe retornar el tipo declarado.
//      if (this.energia >= 80) return "Excelente";
//      if (this.energia >= 50) return "Buena";
//      if (this.energia >= 20) return "Baja";
//      return "Crítica";
//    }
//
//    get porcentajeEnergia(): number {
//      // Retorna la energía como porcentaje entre 0 y 100
//      return this.energia;
//    }
//
//    // ─── SETTER: validar antes de asignar ────────────────────
//
//    set nivelEnergia(nuevo: number) {
//      // Se usa como asignación: animal.nivelEnergia = 75
//      // No puede tener valor de retorno (implícitamente void).
//      if (nuevo < 0) {
//        throw new Error("La energía no puede ser negativa");
//      }
//      if (nuevo > 100) {
//        this.energia = 100; // Capping: máximo 100
//      } else {
//        this.energia = nuevo;
//      }
//    }
//  }
//
//  ── SHORTHAND DE CONSTRUCTOR — La forma compacta de Angular ──
//
//  TypeScript tiene una sintaxis especial donde declaras las
//  propiedades DIRECTAMENTE en los parámetros del constructor,
//  usando los modificadores (public, private, protected, readonly).
//  TypeScript declara la propiedad Y la asigna automáticamente.
//
//  // En TypeScript (.ts):
//
//  // SIN shorthand (forma larga):
//  class PersonaLarga {
//    public nombre: string;
//    private edad: number;
//    protected email: string;
//    readonly id: number;
//
//    constructor(nombre: string, edad: number, email: string, id: number) {
//      this.nombre = nombre;
//      this.edad   = edad;
//      this.email  = email;
//      this.id     = id;
//      // Son 8 líneas para 4 propiedades.
//    }
//  }
//
//  // CON shorthand (forma compacta — MUCHO más usada en Angular):
//  class PersonaCorta {
//    constructor(
//      public nombre: string,
//      // 'public' en el parámetro = declarar public nombre: string + this.nombre = nombre
//      // TypeScript hace TODO automáticamente.
//
//      private edad: number,
//      // Equivale a: private edad: number; + this.edad = edad;

//      protected email: string,
//      // Equivale a: protected email: string; + this.email = email;
//
//      readonly id: number = Date.now(),
//      // readonly + valor por defecto si no se pasa
//
//      private activo: boolean = true,
//      // También puede tener valor por defecto
//    ) {
//      // El cuerpo del constructor puede estar VACÍO si solo inicializas props.
//      // TypeScript hace el resto automáticamente.
//    }
//
//    saludar(): string {
//      return `Hola, soy ${this.nombre}, tengo ${this.edad} años. Activo: ${this.activo}`;
//    }
//  }
//
//  // ESTO es exactamente lo que hace Angular en los servicios y componentes:
//  //
//  // @Component({ ... })
//  // export class ProductoComponent {
//  //   constructor(
//  //     private productoService: ProductoService,
//  //     // Angular inyecta ProductoService automáticamente.
//  //     // El shorthand declara la propiedad productoService como private.
//  //     // Así puedes usar this.productoService en toda la clase.
//  //
//  //     private router: Router,
//  //     // Igual con Router
//  //
//  //     private fb: FormBuilder,
//  //     // Igual con FormBuilder
//  //   ) {}
//  //
//  //   ngOnInit(): void {
//  //     this.productoService.getAll().subscribe(...); // ✅ disponible
//  //   }
//  // }

// ════════════════════════════════════════════════════════
//  BLOQUE 2: MODIFICADORES DE ACCESO
//  public, private, protected, readonly — quién puede acceder
// ════════════════════════════════════════════════════════
//
//  Los modificadores de acceso controlan desde dónde se puede
//  leer o escribir una propiedad o llamar un método.
//  Son una herramienta de ENCAPSULACIÓN: ocultas los detalles
//  internos y expones solo lo que el exterior necesita.
//
//  ┌─────────────┬──────────────┬──────────────┬────────────────────┐
//  │ Modificador │ En la clase  │ En subclases │ Desde afuera       │
//  ├─────────────┼──────────────┼──────────────┼────────────────────┤
//  │ public      │ ✅ Sí        │ ✅ Sí        │ ✅ Sí              │
//  │ protected   │ ✅ Sí        │ ✅ Sí        │ ❌ No              │
//  │ private     │ ✅ Sí        │ ❌ No        │ ❌ No              │
//  │ readonly    │ Solo en ctor │ ✅ Leer      │ ✅ Leer / ❌ Escribir│
//  └─────────────┴──────────────┴──────────────┴────────────────────┘
//
//  ── CUÁNDO USAR CADA MODIFICADOR ─────────────────────────
//
//  public (o sin modificador — es el valor por defecto):
//  → Para la API pública del objeto: lo que otros pueden usar.
//  → En Angular: @Input() titulo: string = '' (siempre public)
//  → En servicios: los métodos que los componentes necesitan llamar.
//  Ejemplo: usuario.nombre, producto.precio, componente.titulo
//
//  private:
//  → Para el estado interno y lógica interna de la clase.
//  → En Angular: private http: HttpClient, private estado: boolean
//  → Para variables de ayuda que nadie más debería tocar.
//  → Para métodos helper privados: private calcularTotal(): number
//  → Para los servicios inyectados: private authService: AuthService
//  Ejemplo: this._energia, this._cache, this._subscripcion
//
//  protected:
//  → Cuando necesitas que las subclases accedan pero no el exterior.
//  → Útil en clases base con lógica común que las subclases aprovechan.
//  → En Angular: rara vez se usa directamente, pero existe en el framework.
//  Ejemplo: clase Animal con especie protected → Perro puede acceder a ella
//
//  readonly:
//  → Para datos que se asignan UNA vez y no deben cambiar.
//  → La fecha de creación, el ID de la entidad, la versión.
//  → En Angular: readonly VERSION = '1.0.0'
//  → También en servicios para URLs de API que no cambian.
//  Ejemplo: readonly id: number, readonly fechaCreacion: Date
//
//  ── EJEMPLO — por qué private protege el estado ──────────
//
//  // En TypeScript (.ts):
//
//  class CuentaBancaria {
//    private saldo: number;
//    readonly numeroCuenta: string;
//    readonly propietario: string;
//
//    constructor(propietario: string, saldoInicial: number = 0) {
//      this.propietario   = propietario;
//      this.numeroCuenta  = generarNumeroCuenta();
//      this.saldo         = saldoInicial;
//    }
//
//    depositar(monto: number): void {
//      if (monto <= 0) throw new Error("El monto debe ser positivo");
//      this.saldo += monto;
//      // Solo la cuenta puede modificar su propio saldo.
//      // Nadie puede hacer cuenta.saldo = 1000000 desde afuera.
//    }
//
//    retirar(monto: number): void {
//      if (monto <= 0) throw new Error("El monto debe ser positivo");
//      if (monto > this.saldo) throw new Error("Saldo insuficiente");
//      this.saldo -= monto;
//    }
//
//    get saldoActual(): number {
//      return this.saldo;
//      // Con getter readonly puedes LEER el saldo pero no modificarlo directamente.
//      // cuenta.saldoActual = 99999 → ❌ Error: no hay setter para saldoActual
//    }
//  }
//
//  const cuenta = new CuentaBancaria("Ana García", 1000);
//  cuenta.depositar(500);   // ✅ Método público: OK
//  cuenta.saldoActual;      // ✅ Getter: puedes leer → 1500
//  // cuenta.saldo = 99999; // ❌ Error: Property 'saldo' is private
//  // cuenta.saldo;         // ❌ Error: Property 'saldo' is private
//
//  // Sin 'private', cualquiera podría hacer:
//  // cuenta.saldo = 99999999; // "Hack" directo al saldo
//  // Con 'private', SOLO los métodos de la clase pueden cambiar el saldo.
//  // Esto es ENCAPSULACIÓN: el objeto controla su propio estado.
//
//  EN ANGULAR — por qué los servicios son private en el constructor:
//  // constructor(private authService: AuthService) {}
//  // → 'private' evita que el template HTML acceda directamente al servicio
//  // → El componente expone métodos públicos que usan el servicio internamente
//  // → Mejor separación de responsabilidades y testabilidad

// ════════════════════════════════════════════════════════
//  BLOQUE 3: HERENCIA CON extends
//  Una clase puede heredar de otra y extender su comportamiento
// ════════════════════════════════════════════════════════
//
//  La HERENCIA permite que una clase "hija" (subclase) reciba
//  automáticamente todas las propiedades y métodos de la clase
//  "padre" (superclase), y le agregue o sobreescriba lo que necesite.
//
//  Reglas fundamentales de la herencia en TypeScript:
//  1. Una clase solo puede extends UNA clase (no múltiples)
//  2. La subclase HEREDA: propiedades y métodos public y protected
//  3. La subclase NO HEREDA: propiedades y métodos private
//  4. Si hay constructor en la subclase, DEBE llamar a super() PRIMERO
//  5. 'super()' llama al constructor del padre con sus argumentos
//  6. 'super.metodo()' llama al método del padre desde la subclase
//
//  // En TypeScript (.ts):
//
//  class Perro extends Animal {
//    // Perro hereda de Animal:
//    // → nombre (public) ✅
//    // → especie (protected) ✅ — solo accesible dentro de Perro y sus subclases
//    // → fechaNacimiento (readonly) ✅
//    // → moverse(), alimentar(), estadoEnergia, nivelEnergia ✅
//    // → energia (private) ❌ — NO accesible, es interna de Animal
//
//    raza: string;
//    // Nueva propiedad propia de Perro, no existe en Animal
//
//    constructor(nombre: string, raza: string) {
//      super(nombre, "Canis lupus familiaris");
//      // 'super(...)' DEBE ser la PRIMERA línea del constructor.
//      // Llama al constructor de Animal con nombre y especie.
//      // La energía usa el valor por defecto (100).
//      // Si no llamas a super() → ❌ Error: Constructors for derived classes
//      //                          must contain a 'super' call.
//
//      this.raza = raza;
//      // Después de super(), puedes asignar las propiedades propias.
//    }
//
//    // ─── MÉTODOS PROPIOS ─────────────────────────────────────
//
//    ladrar(): string {
//      // Método nuevo que no existe en Animal
//      return `${this.nombre} (${this.raza}): ¡Guau guau!`;
//      // this.nombre ✅ — heredado de Animal (public)
//      // this.energia ❌ — Error: es private en Animal
//      // this.especie ✅ — heredada (protected): accesible en subclase
//    }
//
//    // ─── SOBREESCRIBIR (override) ────────────────────────────
//
//    override moverse(distancia: number): string {
//      // 'override' explícito (TypeScript 4.3+):
//      // → Documenta que intencionalmente sobreescribes el método del padre
//      // → Si el padre NO tiene 'moverse', TypeScript da error de compilación
//      //   (protege contra errores de typo en el nombre del método)
//      // → Sin 'override', TypeScript lo permite igual pero sin verificación
//
//      const resultadoPadre = super.moverse(distancia);
//      // super.moverse() llama al método de Animal primero.
//      // Luego podemos agregar comportamiento extra.
//
//      return `🐕 ${resultadoPadre} (corriendo alegremente)`;
//    }
//
//    // Sobreescribir getter también es posible:
//    override get estadoEnergia(): string {
//      const estadoBase = super.estadoEnergia; // llama al getter del padre
//      return `Estado de ${this.nombre}: ${estadoBase}`;
//    }
//  }
//
//  const perro = new Perro("Rex", "Labrador");
//  perro.nombre;                  // ✅ "Rex" (heredado public)
//  perro.ladrar();                // ✅ propio de Perro
//  perro.moverse(10);             // ✅ override de Animal.moverse
//  perro.alimentar(30);           // ✅ heredado de Animal (no se sobreescribió)
//  perro.estadoEnergia;           // ✅ override del getter
//  // perro.raza = "Pastor";      // ✅ propio de Perro
//  // perro.especie;              // ❌ Error: protected, no accesible desde fuera
//
//  ── HERENCIA EN ANGULAR ──────────────────────────────────
//
//  // Angular usa herencia internamente. Tus clases implementan
//  // interfaces y a veces heredan de clases base de Angular:
//  //
//  // FormControl HEREDA de AbstractControl
//  // FormGroup  HEREDA de AbstractControl
//  // FormArray  HEREDA de AbstractControl
//  //
//  // En tus propias clases, a veces creas clases base:
//  //
//  // class BaseComponent implements OnInit, OnDestroy {
//  //   protected subscripciones: Subscription[] = [];
//  //
//  //   ngOnInit(): void {}
//  //
//  //   ngOnDestroy(): void {
//  //     this.subscripciones.forEach(s => s.unsubscribe());
//  //   }
//  // }
//  //
//  // @Component({ ... })
//  // export class ProductoComponent extends BaseComponent {
//  //   override ngOnInit(): void {
//  //     const sub = this.service.getAll().subscribe(datos => { ... });
//  //     this.subscripciones.push(sub); // heredado de BaseComponent
//  //   }
//  //   // ngOnDestroy se hereda y limpia automáticamente
//  // }

// ════════════════════════════════════════════════════════
//  BLOQUE 4: CLASES ABSTRACTAS
//  Clases que definen el contrato sin implementar todo
// ════════════════════════════════════════════════════════
//
//  Una clase ABSTRACTA es un híbrido entre clase normal e interface:
//  → Puede tener métodos CON implementación (como clase normal)
//  → Puede tener métodos SIN implementación — declarados 'abstract'
//    que las subclases DEBEN implementar obligatoriamente
//  → NO se puede instanciar directamente (new ClaseAbstracta() → ❌ Error)
//  → Sirve como "plantilla" para un grupo de clases relacionadas
//
//  CUÁNDO usar clases abstractas:
//  → Tienes lógica COMÚN que varias clases relacionadas deben compartir
//  → Pero cada una tiene su propia forma de hacer ciertas operaciones
//  → Quieres FORZAR que las subclases implementen esas operaciones
//
//  Analogía: Un formulario abstracto define que todo formulario puede
//  "enviar" datos, pero cada tipo de formulario valida y obtiene
//  datos de forma diferente. El envío es común, el resto es específico.
//
//  // En TypeScript (.ts):
//
//  abstract class FormularioBase {
//
//    // ─── PROPIEDADES COMUNES ─────────────────────────────────
//    protected errores: Record<string, string> = {};
//    protected enviando: boolean = false;
//
//    // ─── MÉTODOS ABSTRACTOS: las subclases DEBEN implementarlos ─
//
//    abstract validar(): boolean;
//    // Cada formulario tiene sus propias reglas de validación.
//    // FormularioLogin valida email + password.
//    // FormularioRegistro valida nombre + email + password + confirmación.
//    // La clase abstracta declara QUÉ debe pasar, no CÓMO.
//
//    abstract obtenerDatos(): Record<string, unknown>;
//    // Cada formulario tiene sus propios campos.
//    // No se puede implementar genéricamente.
//
//    abstract resetear(): void;
//    // Cada formulario resetea sus propios campos.
//
//    // ─── MÉTODOS CONCRETOS: implementados en la clase base ───
//    // Las subclases los HEREDAN y pueden sobreescribirlos.
//
//    enviar(): void {
//      // Este método es igual para todos los formularios:
//      // validar → preparar datos → enviar → manejar resultado
//      if (this.enviando) return;  // evita doble envío
//
//      if (!this.validar()) {
//        console.log("Formulario inválido. Errores:", this.errores);
//        return;
//      }
//
//      this.enviando = true;
//      const datos = this.obtenerDatos();
//      console.log("Enviando datos al servidor:", datos);
//      // En Angular sería: this.service.guardar(datos).subscribe(...)
//      this.enviando = false;
//    }
//
//    mostrarError(campo: string, mensaje: string): void {
//      this.errores[campo] = mensaje;
//    }
//
//    limpiarError(campo: string): void {
//      delete this.errores[campo];
//    }
//
//    get tieneErrores(): boolean {
//      return Object.keys(this.errores).length > 0;
//    }
//
//    get estadoFormulario(): "limpio" | "invalido" | "enviando" | "listo" {
//      if (this.enviando) return "enviando";
//      if (this.tieneErrores) return "invalido";
//      return "listo";
//    }
//  }
//
//  // new FormularioBase(); // ❌ Error: Cannot create an instance of abstract class
//
//  // Subclase concreta — implementa los métodos abstractos:
//  class FormularioLogin extends FormularioBase {
//    private email: string = "";
//    private password: string = "";
//
//    setEmail(v: string): void {
//      this.email = v;
//      this.limpiarError("email"); // limpia error si había
//    }
//
//    setPassword(v: string): void {
//      this.password = v;
//      this.limpiarError("password");
//    }
//
//    override validar(): boolean {
//      // Implementación REQUERIDA — declarada abstract en la base
//      let esValido = true;
//
//      if (!this.email.includes("@")) {
//        this.mostrarError("email", "Email inválido");
//        esValido = false;
//      }
//      if (this.password.length < 6) {
//        this.mostrarError("password", "Mínimo 6 caracteres");
//        esValido = false;
//      }
//      return esValido;
//    }
//
//    override obtenerDatos(): Record<string, unknown> {
//      return { email: this.email, password: this.password };
//    }
//
//    override resetear(): void {
//      this.email    = "";
//      this.password = "";
//      this.errores  = {};
//    }
//  }
//
//  class FormularioContacto extends FormularioBase {
//    private nombre: string = "";
//    private email: string = "";
//    private mensaje: string = "";
//
//    setNombre(v: string): void { this.nombre = v; }
//    setEmail(v: string): void  { this.email  = v; }
//    setMensaje(v: string): void { this.mensaje = v; }
//
//    override validar(): boolean {
//      let ok = true;
//      if (this.nombre.trim().length < 2) {
//        this.mostrarError("nombre", "Mínimo 2 caracteres");
//        ok = false;
//      }
//      if (!this.email.includes("@")) {
//        this.mostrarError("email", "Email inválido");
//        ok = false;
//      }
//      if (this.mensaje.trim().length < 10) {
//        this.mostrarError("mensaje", "El mensaje debe tener al menos 10 caracteres");
//        ok = false;
//      }
//      return ok;
//    }
//
//    override obtenerDatos(): Record<string, unknown> {
//      return {
//        nombre: this.nombre,
//        email: this.email,
//        mensaje: this.mensaje,
//        fecha: new Date().toISOString(),
//      };
//    }
//
//    override resetear(): void {
//      this.nombre  = "";
//      this.email   = "";
//      this.mensaje = "";
//      this.errores = {};
//    }
//  }
//
//  EN ANGULAR — clases abstractas que ya conoces:
//  // AbstractControl ← FormControl, FormGroup y FormArray heredan de aquí
//  // HttpHandler ← los interceptors se basan en esta clase abstracta
//  //
//  // Tus propias clases base en proyectos grandes:
//  // abstract class BaseListComponent<T> {
//  //   items: T[] = [];
//  //   cargando = false;
//  //
//  //   abstract cargarItems(): Observable<T[]>;
//  //
//  //   ngOnInit(): void {
//  //     this.cargando = true;
//  //     this.cargarItems().subscribe(datos => {
//  //       this.items = datos;
//  //       this.cargando = false;
//  //     });
//  //   }
//  // }
//  //
//  // @Component({ ... })
//  // export class ProductoListComponent extends BaseListComponent<Producto> {
//  //   constructor(private service: ProductoService) { super(); }
//  //
//  //   override cargarItems(): Observable<Producto[]> {
//  //     return this.service.getAll();
//  //   }
//  // }

// ════════════════════════════════════════════════════════
//  BLOQUE 5: INTERFACES IMPLEMENTADAS POR CLASES
//  El contrato puro — sin implementación, solo la firma
// ════════════════════════════════════════════════════════
//
//  Una INTERFACE es la forma más pura de definir un contrato.
//  No tiene implementación: solo declara qué propiedades y
//  métodos deben existir, con qué tipos.
//
//  DIFERENCIA ENTRE CLASE ABSTRACTA E INTERFACE:
//
//  Clase abstracta:
//  ✅ Puede tener métodos CON implementación (concretos)
//  ✅ Puede tener estado (propiedades con valores)
//  ✅ Puede usar todos los modificadores de acceso
//  ❌ Una clase solo puede heredar de UNA clase abstracta
//
//  Interface:
//  ❌ NO tiene implementación (solo firmas)
//  ❌ NO tiene estado (solo declara propiedades, no las inicializa)
//  ✅ Todas las propiedades son implícitamente public
//  ✅ Una clase puede implementar MÚLTIPLES interfaces
//
//  // En TypeScript (.ts):
//
//  // Interface 1: cualquier cosa que pueda serializarse a JSON
//  interface Serializable {
//    serializar(): string;
//    deserializar(datos: string): void;
//  }
//
//  // Interface 2: cualquier cosa que pueda compararse con otra del mismo tipo
//  interface Comparable<T> {
//    compararCon(otro: T): number;
//    // Negativo: this "menor" que otro
//    // 0:        this "igual" a otro
//    // Positivo: this "mayor" que otro
//    esIgualA(otro: T): boolean;
//  }
//
//  // Interface 3: cualquier cosa que tenga un historial de cambios
//  interface Auditable {
//    readonly creadoEn: Date;
//    readonly actualizadoEn: Date;
//    registrarCambio(campo: string, anterior: unknown, nuevo: unknown): void;
//    obtenerHistorial(): string[];
//  }
//
//  // Clase que implementa MÚLTIPLES interfaces:
//  class Producto implements Serializable, Comparable<Producto>, Auditable {
//    readonly creadoEn: Date;
//    readonly actualizadoEn: Date;
//    private historial: string[] = [];
//
//    constructor(
//      public readonly id: number,
//      public nombre: string,
//      public precio: number,
//      public categoria: string,
//    ) {
//      this.creadoEn      = new Date();
//      this.actualizadoEn = new Date();
//    }
//
//    // ─── Implementación de Serializable ──────────────────────
//
//    serializar(): string {
//      return JSON.stringify({
//        id: this.id, nombre: this.nombre,
//        precio: this.precio, categoria: this.categoria,
//      });
//    }
//
//    deserializar(datos: string): void {
//      const obj = JSON.parse(datos);
//      this.nombre    = obj.nombre;
//      this.precio    = obj.precio;
//      this.categoria = obj.categoria;
//    }
//
//    // ─── Implementación de Comparable<Producto> ───────────────
//
//    compararCon(otro: Producto): number {
//      return this.precio - otro.precio;
//      // Útil para ordenar arrays de productos por precio:
//      // productos.sort((a, b) => a.compararCon(b))
//    }
//
//    esIgualA(otro: Producto): boolean {
//      return this.id === otro.id;
//      // Dos productos son "iguales" si tienen el mismo ID
//    }
//
//    // ─── Implementación de Auditable ──────────────────────────
//
//    registrarCambio(campo: string, anterior: unknown, nuevo: unknown): void {
//      const entrada = `[${new Date().toLocaleTimeString()}] ${campo}: "${anterior}" → "${nuevo}"`;
//      this.historial.push(entrada);
//    }
//
//    obtenerHistorial(): string[] {
//      return [...this.historial]; // copia del array — no expone el original
//    }
//  }
//
//  ── INTERFACES DE CICLO DE VIDA EN ANGULAR ───────────────
//
//  Angular define interfaces para el ciclo de vida de los componentes.
//  Cuando tu clase "implementa" esas interfaces, TypeScript verifica
//  que hayas definido los métodos correctamente.
//
//  // interface OnInit {
//  //   ngOnInit(): void;
//  // }
//  // Angular llama a ngOnInit() después de que el componente se crea
//  // y sus @Input() han recibido sus valores iniciales.
//
//  // interface OnDestroy {
//  //   ngOnDestroy(): void;
//  // }
//  // Angular llama a ngOnDestroy() antes de destruir el componente.
//  // Aquí debes limpiar: unsubscribe(), clearInterval(), etc.
//
//  // interface OnChanges {
//  //   ngOnChanges(changes: SimpleChanges): void;
//  // }
//  // Angular llama a ngOnChanges() cada vez que un @Input() cambia.
//
//  // @Component({ selector: 'app-lista', standalone: true, template: '...' })
//  // export class ListaComponent implements OnInit, OnDestroy {
//  //   private subscripcion!: Subscription;
//  //
//  //   ngOnInit(): void {
//  //     // TypeScript verifica que esta firma coincida con la interface
//  //     this.subscripcion = this.service.datos$.subscribe(d => this.datos = d);
//  //   }
//  //
//  //   ngOnDestroy(): void {
//  //     this.subscripcion.unsubscribe(); // limpieza de memoria
//  //   }
//  // }

// ════════════════════════════════════════════════════════
//  BLOQUE 6: DECORADORES — El mecanismo central de Angular
//  Agregar metadatos a las clases sin modificar su código
// ════════════════════════════════════════════════════════
//
//  Un DECORADOR es una función especial de TypeScript que:
//  1. Se aplica con el símbolo '@' antes de una clase/propiedad/método
//  2. Recibe la clase (o propiedad) como argumento
//  3. Puede leerla, modificarla o agregar información a ella
//  4. Angular los usa para registrar clases en su sistema interno
//
//  Actualmente son una propuesta de ECMAScript en Stage 3.
//  TypeScript los implementa con la opción "experimentalDecorators": true
//  en el tsconfig.json (Angular CLI lo activa automáticamente).
//
//  ── LOS DECORADORES DE ANGULAR QUE USARÁS SIEMPRE ───────
//
//  @Component — convierte una clase en un componente de UI:
//  // @Component({
//  //   selector: 'app-usuario',
//  //   // selector: el nombre del tag HTML que representará este componente
//  //   // Usa convención kebab-case con prefijo 'app-'
//  //   // En el HTML padre: <app-usuario [id]="usuarioId"></app-usuario>
//  //
//  //   standalone: true,
//  //   // true = Standalone Component (Angular 14+, default en Angular 17+)
//  //   // El componente maneja sus propias dependencias con 'imports'
//  //   // false = requiere ser declarado en un NgModule (forma antigua)
//  //
//  //   imports: [NgIf, NgFor, RouterLink, AsyncPipe],
//  //   // Lista de directivas, pipes y componentes que usa el template
//  //   // En lugar de un módulo global, cada componente declara lo que necesita
//  //
//  //   template: `
//  //     <h1>{{ titulo }}</h1>
//  //     <ul>
//  //       <li *ngFor="let item of items">{{ item.nombre }}</li>
//  //     </ul>
//  //   `,
//  //   // El HTML del componente (template inline)
//  //   // O templateUrl: './usuario.component.html' (archivo externo)
//  //
//  //   styles: [`h1 { color: #333; font-size: 24px; }`],
//  //   // CSS del componente (scoped: solo afecta a este componente)
//  //   // O styleUrls: ['./usuario.component.css'] (archivo externo)
//  // })
//  // export class UsuarioComponent implements OnInit, OnDestroy {
//  //   @Input() titulo: string = '';
//  //   @Input() usuarioId!: number;
//  //   // @Input() = la propiedad recibe datos del componente padre
//  //   // usuarioId!: el ! significa "confía en mí, Angular lo asignará"
//  //   // (Non-null assertion, porque TypeScript no sabe que Angular lo setea)
//  //
//  //   @Output() seleccionado = new EventEmitter<{ id: number; nombre: string }>();
//  //   // @Output() = el componente puede emitir eventos hacia el padre
//  //   // new EventEmitter<T>() emite valores del tipo T
//  //   // En el padre: <app-usuario (seleccionado)="onSeleccion($event)">
//  //
//  //   @ViewChild('btnEnviar') btnRef!: ElementRef<HTMLButtonElement>;
//  //   // @ViewChild() = referencia a un elemento del template por su #ref
//  //   // En el template: <button #btnEnviar>Enviar</button>
//  //   // Disponible en ngAfterViewInit (no en ngOnInit)
//  //
//  //   items: Usuario[] = [];
//  //   cargando = false;
//  //
//  //   constructor(private service: UsuarioService, private router: Router) {}
//  //   // Inyección de dependencias con shorthand de constructor
//  //   // Angular provee los servicios automáticamente
//  //
//  //   ngOnInit(): void {
//  //     this.cargando = true;
//  //     this.service.getAll().subscribe(datos => {
//  //       this.items   = datos;
//  //       this.cargando = false;
//  //     });
//  //   }
//  //
//  //   onClickItem(usuario: Usuario): void {
//  //     this.seleccionado.emit({ id: usuario.id, nombre: usuario.nombre });
//  //     this.router.navigate(['/usuario', usuario.id]);
//  //   }
//  //
//  //   ngOnDestroy(): void {
//  //     // limpiar subscripciones
//  //   }
//  // }
//
//  @Injectable — convierte una clase en un servicio inyectable:
//  // @Injectable({
//  //   providedIn: 'root'
//  //   // 'root' = Angular crea UNA sola instancia compartida en toda la app
//  //   // (patrón Singleton automático)
//  //   // Cualquier componente que inyecte este servicio recibe la MISMA instancia
//  //   // Alternativas: 'any', 'platform', o el nombre de un módulo/componente
//  // })
//  // export class ProductoService {
//  //   private readonly API_URL = 'https://api.tienda.com';
//  //
//  //   constructor(private http: HttpClient) {}
//  //   // Angular inyecta HttpClient aquí gracias a @Injectable
//  //
//  //   getAll(): Observable<Producto[]> {
//  //     return this.http.get<Producto[]>(`${this.API_URL}/productos`);
//  //   }
//  //
//  //   getById(id: number): Observable<Producto> {
//  //     return this.http.get<Producto>(`${this.API_URL}/productos/${id}`);
//  //   }
//  //
//  //   crear(dto: Omit<Producto, 'id'>): Observable<Producto> {
//  //     return this.http.post<Producto>(`${this.API_URL}/productos`, dto);
//  //   }
//  //
//  //   actualizar(id: number, cambios: Partial<Producto>): Observable<Producto> {
//  //     return this.http.patch<Producto>(`${this.API_URL}/productos/${id}`, cambios);
//  //   }
//  //
//  //   eliminar(id: number): Observable<void> {
//  //     return this.http.delete<void>(`${this.API_URL}/productos/${id}`);
//  //   }
//  // }
//
//  ── LO QUE HACE UN DECORADOR POR DENTRO (simplificado) ───
//
//  Un decorador de clase es una FUNCIÓN que recibe la clase
//  como argumento y puede modificarla o agregar metadatos.
//
//  // En TypeScript (.ts) — decorador simple sin parámetros:
//  function Log(constructor: Function): void {
//    console.log(`Clase creada: ${constructor.name}`);
//    // constructor es la CLASE misma (no una instancia)
//    // constructor.name es el nombre de la clase
//  }
//
//  @Log
//  class MiServicio {}
//  // Al definir la clase → imprime: "Clase creada: MiServicio"
//
//  // Decorador CON parámetros — necesita una función que retorna una función:
//  function Metadata(config: { version: string; autor: string }) {
//    return function(constructor: Function): void {
//      // Agrega metadatos a la clase como propiedades estáticas
//      (constructor as any).version = config.version;
//      (constructor as any).autor   = config.autor;
//    };
//  }
//
//  @Metadata({ version: "1.0.0", autor: "Fernando" })
//  class MiApp {}
//
//  // @Component({ selector: '...', template: '...' }) funciona igual:
//  // Component es una función que recibe la configuración y retorna
//  // otra función que recibe la clase y la registra en Angular.

// ════════════════════════════════════════════════════════
//  BLOQUE 7: MÉTODOS Y PROPIEDADES ESTÁTICAS
//  Pertenecen a la clase, no a las instancias
// ════════════════════════════════════════════════════════
//
//  'static' significa que la propiedad o método pertenece a la CLASE
//  misma, no a las INSTANCIAS (objetos creados con new).
//
//  La diferencia:
//  Sin static: instancia.propiedad (necesitas crear el objeto primero)
//  Con static: Clase.propiedad     (sin crear ningún objeto)
//
//  // En TypeScript (.ts):
//  class MathUtils {
//    // Propiedades estáticas:
//    static readonly PI = 3.14159265358979;
//    static readonly E  = 2.71828182845904;
//
//    // Métodos estáticos (funciones utilitarias):
//    static areaCirculo(radio: number): number {
//      return MathUtils.PI * radio ** 2;
//      // 'this' dentro de un método static se refiere a la clase,
//      // no a una instancia. Por convención se usa el nombre directamente.
//    }
//
//    static clamp(valor: number, min: number, max: number): number {
//      return Math.min(Math.max(valor, min), max);
//    }
//
//    static redondear(numero: number, decimales: number = 2): number {
//      return Math.round(numero * 10 ** decimales) / 10 ** decimales;
//    }
//  }
//
//  // Uso sin instanciar:
//  MathUtils.areaCirculo(5);           // ✅ sin new MathUtils()
//  MathUtils.clamp(150, 0, 100);       // ✅
//  MathUtils.redondear(3.14159, 3);    // ✅
//
//  // const m = new MathUtils();
//  // m.areaCirculo(5);  // ❌ Error: Property 'areaCirculo' does not exist on type 'MathUtils'
//  //                    // Los métodos static NO están en las instancias
//
//  ── PATRÓN SINGLETON con static ──────────────────────────
//
//  El Singleton garantiza que solo existe UNA instancia de
//  una clase en toda la aplicación. TypeScript lo implementa
//  con constructor privado + método estático getInstancia().
//
//  // En TypeScript (.ts):
//  class ConfiguracionApp {
//    static readonly VERSION: string = "2.1.0";
//    static readonly NOMBRE:  string = "Mi Aplicación Angular";
//
//    private static instancia: ConfiguracionApp | null = null;
//    // Propiedad estática que guarda la única instancia.
//    // null = todavía no se ha creado.
//
//    private config: Map<string, unknown> = new Map();
//    // Mapa de configuración interno.
//
//    private constructor() {
//      // Constructor PRIVADO: nadie puede hacer new ConfiguracionApp()
//      // desde afuera de la clase. Solo la clase misma puede instanciarse.
//      // new ConfiguracionApp() desde afuera → ❌ Error: constructor is private
//
//      this.config.set("tema",     "oscuro");
//      this.config.set("idioma",   "es");
//      this.config.set("apiUrl",   "https://api.miapp.com");
//      this.config.set("debug",    false);
//    }
//
//    static getInstancia(): ConfiguracionApp {
//      // El único punto de entrada para obtener la instancia.
//      if (!ConfiguracionApp.instancia) {
//        // Primera vez: crea la instancia
//        ConfiguracionApp.instancia = new ConfiguracionApp();
//      }
//      return ConfiguracionApp.instancia;
//      // Siguiente vez: retorna la misma instancia que ya existe
//    }
//
//    obtener<T>(clave: string): T | undefined {
//      return this.config.get(clave) as T;
//    }
//
//    establecer(clave: string, valor: unknown): void {
//      this.config.set(clave, valor);
//    }
//  }
//
//  // Uso:
//  const cfg1 = ConfiguracionApp.getInstancia();
//  const cfg2 = ConfiguracionApp.getInstancia();
//  cfg1 === cfg2;  // true → misma instancia
//  cfg1.establecer("tema", "claro");
//  cfg2.obtener("tema");  // "claro" → es el mismo objeto
//
//  // EN ANGULAR: Los servicios con providedIn: 'root' SON Singletons.
//  // Angular gestiona el patrón automáticamente con el sistema de DI.
//  // No necesitas implementar Singleton manualmente.
//  // @Injectable({ providedIn: 'root' }) hace que Angular cree
//  // UNA sola instancia y la inyecte donde la pidan.

// ════════════════════════════════════════════════════════
//  DEMOSTRACIÓN EJECUTABLE
//  Ejecuta: node 03_typescript_clases_interfaces.js
// ════════════════════════════════════════════════════════

console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║   📘 INVESTIGACIÓN #3 — TypeScript: Clases e Interfaces  ║");
console.log("╚══════════════════════════════════════════════════════════╝\n");

// ─────────────────────────────────────────────────────────
//  DEMO 1: Clase básica con modificadores de acceso
// ─────────────────────────────────────────────────────────
console.log("  🔷 DEMO 1 — CLASE BÁSICA con modificadores de acceso");
console.log("  ──────────────────────────────────────────────────────");

class Animal {
  // En TS: public nombre: string
  // En TS: private _energia: number
  // En TS: protected especie: string
  // En TS: readonly fechaNacimiento: Date

  constructor(nombre, especie, energia = 100) {
    this.nombre          = nombre;
    this.especie         = especie;
    this._energia        = energia;
    this.fechaNacimiento = new Date();
  }

  // En TS: moverse(distancia: number): string
  moverse(distancia) {
    if (this._energia < distancia) {
      return `${this.nombre} no tiene energía para moverse ${distancia}m (energía: ${this._energia})`;
    }
    this._energia -= distancia;
    return `${this.nombre} se movió ${distancia}m → energía restante: ${this._energia}`;
  }

  // En TS: alimentar(calorias: number): void
  alimentar(calorias) {
    const anterior = this._energia;
    this._energia = Math.min(this._energia + calorias, 100);
    console.log(`  ${this.nombre} alimentado: ${anterior} → ${this._energia} (+${this._energia - anterior})`);
  }

  // En TS: get estadoEnergia(): string
  get estadoEnergia() {
    if (this._energia >= 80) return "Excelente";
    if (this._energia >= 50) return "Buena";
    if (this._energia >= 20) return "Baja";
    return "Crítica";
  }

  // En TS: set nivelEnergia(nuevo: number)
  set nivelEnergia(nuevo) {
    if (nuevo < 0) throw new Error("Energía no puede ser negativa");
    this._energia = Math.min(nuevo, 100);
  }

  // En TS: get info(): string
  get info() {
    return `${this.nombre} (${this.especie}) — Energía: ${this._energia} [${this.estadoEnergia}]`;
  }
}

console.log("  Declaración TypeScript:");
console.log("  class Animal {");
console.log("    public nombre: string;         // todos pueden leer/escribir");
console.log("    private _energia: number;      // solo Animal puede acceder");
console.log("    protected especie: string;     // Animal y subclases");
console.log("    readonly fechaNacimiento: Date; // leer sí, escribir no");
console.log("  }");

console.log("\n  Creando instancias:");
const leon   = new Animal("León",  "Panthera leo",    80);
const tigre  = new Animal("Tigre", "Panthera tigris", 60);
const aguila = new Animal("Águila","Aquila chrysaetos");

[leon, tigre, aguila].forEach(a => console.log(`  → ${a.info}`));

console.log("\n  Movimientos y energía:");
console.log(`  ${leon.moverse(15)}`);
console.log(`  ${leon.moverse(30)}`);
console.log(`  ${leon.moverse(50)}`);   // sin energía suficiente
console.log(`  Estado actual: ${leon.estadoEnergia}`);

console.log("\n  Setter de energía (con validación):");
leon.nivelEnergia = 95;
console.log(`  Después de set nivelEnergia = 95 → ${leon._energia}`);
leon.nivelEnergia = 150; // capping en 100
console.log(`  Después de set nivelEnergia = 150 → ${leon._energia} (capped en 100)`);

console.log("\n  Readonly — la fecha de nacimiento no puede cambiar:");
console.log(`  leon.fechaNacimiento = ${leon.fechaNacimiento.toLocaleDateString("es-CO")}`);
console.log("  En TS: leon.fechaNacimiento = new Date() → ❌ Error: Cannot assign to 'fechaNacimiento' (read-only)");

// ─────────────────────────────────────────────────────────
//  DEMO 2: Herencia con extends
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 2 — HERENCIA: extends, super(), override");
console.log("  ────────────────────────────────────────────────");

class Perro extends Animal {
  constructor(nombre, raza, energia = 100) {
    super(nombre, "Canis lupus familiaris", energia);
    // super() PRIMERO — llama al constructor de Animal
    // Si no llamas super() → error en JavaScript también
    this.raza = raza;
  }

  // En TS: ladrar(): string
  ladrar() {
    return `${this.nombre} (${this.raza}): ¡Guau guau! 🐕`;
  }

  // En TS: override moverse(distancia: number): string
  moverse(distancia) {
    const resultado = super.moverse(distancia); // llama al padre
    return `🐕 ${resultado} (trotando alegremente)`;
  }

  // En TS: jugar(minutos: number): void
  jugar(minutos) {
    const energiaGastada = minutos * 2;
    this._energia = Math.max(this._energia - energiaGastada, 0);
    console.log(`  ${this.nombre} jugó ${minutos} min (-${energiaGastada} energía). Estado: ${this.estadoEnergia}`);
  }

  get infoCompleta() {
    return `${this.info} | Raza: ${this.raza}`;
  }
}

class Gato extends Animal {
  constructor(nombre, color, energia = 100) {
    super(nombre, "Felis catus", energia);
    this.color = color;
    this._vidas = 7;
  }

  maullar() {
    return `${this.nombre} (${this.color}): ¡Miau! 🐱`;
  }

  // Override — los gatos se mueven de forma diferente
  moverse(distancia) {
    // Los gatos gastan menos energía (son más eficientes)
    const energiaReal = Math.floor(distancia / 2);
    this._energia = Math.max(this._energia - energiaReal, 0);
    return `🐱 ${this.nombre} se deslizó ${distancia}m (gastó solo ${energiaReal} de energía)`;
  }

  get vidas() { return this._vidas; }
}

console.log("  Declaración TypeScript:");
console.log("  class Perro extends Animal { ... }");
console.log("  class Gato  extends Animal { ... }");
console.log("  → Ambos HEREDAN: moverse (Perro lo sobreescribe), alimentar, estadoEnergia, etc.");
console.log("  → Cada uno AGREGA sus propios métodos: ladrar(), maullar()\n");

const rex     = new Perro("Rex",    "Labrador",     90);
const firulais = new Perro("Firulais","Chihuahua",  70);
const whiskers = new Gato("Whiskers","naranja");
const luna     = new Gato("Luna",    "negro");

console.log("  Creando animales:");
[rex, firulais, whiskers, luna].forEach(a => console.log(`  → ${a.info}`));

console.log("\n  Métodos heredados Y propios:");
console.log(`  ${rex.ladrar()}`);
console.log(`  ${whiskers.maullar()}`);
console.log(`  ${luna.maullar()}`);

console.log("\n  Override del método moverse():");
console.log(`  ${rex.moverse(20)}`);
console.log(`  ${whiskers.moverse(20)}`);   // Gato gasta menos

console.log("\n  Método propio de Perro — jugar:");
rex.jugar(10);
firulais.jugar(25);

console.log("\n  Métodos heredados en todos:");
rex.alimentar(30);
whiskers.alimentar(20);

// ─────────────────────────────────────────────────────────
//  DEMO 3: Clase abstracta
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 3 — CLASE ABSTRACTA: contrato parcialmente implementado");
console.log("  ──────────────────────────────────────────────────────────────");
console.log("  En TypeScript (.ts): abstract class FormularioBase { ... }");
console.log("  → new FormularioBase() → ❌ Error: Cannot create instance of abstract class");
console.log("  → Las subclases DEBEN implementar: validar(), obtenerDatos(), resetear()\n");

class FormularioBase {
  constructor() {
    this._errores   = {};
    this._enviando  = false;
  }

  // En TS: abstract validar(): boolean
  validar() { throw new Error("Implementa validar() en la subclase"); }

  // En TS: abstract obtenerDatos(): Record<string, unknown>
  obtenerDatos() { throw new Error("Implementa obtenerDatos() en la subclase"); }

  // En TS: abstract resetear(): void
  resetear() { throw new Error("Implementa resetear() en la subclase"); }

  // Métodos concretos — heredados por todas las subclases
  mostrarError(campo, mensaje) { this._errores[campo] = mensaje; }
  limpiarError(campo) { delete this._errores[campo]; }
  get tieneErrores() { return Object.keys(this._errores).length > 0; }
  get errores() { return { ...this._errores }; }

  enviar() {
    // Este método es COMÚN para todos los formularios
    if (this._enviando) { console.log("  ⏳ Ya se está enviando..."); return; }
    if (!this.validar()) {
      console.log("  ❌ Formulario inválido:", JSON.stringify(this._errores));
      return;
    }
    this._enviando = true;
    const datos = this.obtenerDatos();
    console.log("  ✅ Enviando datos:", JSON.stringify(datos));
    this._enviando = false;
  }
}

class FormularioLogin extends FormularioBase {
  constructor() {
    super();
    this.email    = "";
    this.password = "";
  }

  setEmail(v)    { this.email    = v; this.limpiarError("email"); }
  setPassword(v) { this.password = v; this.limpiarError("password"); }

  validar() {
    let ok = true;
    if (!this.email.includes("@")) { this.mostrarError("email", "Email inválido"); ok = false; }
    if (this.password.length < 6)  { this.mostrarError("password", "Mínimo 6 chars"); ok = false; }
    return ok;
  }

  obtenerDatos() { return { email: this.email, password: "***" }; }
  resetear() { this.email = ""; this.password = ""; this._errores = {}; }
}

class FormularioRegistro extends FormularioBase {
  constructor() {
    super();
    this.nombre   = "";
    this.email    = "";
    this.password = "";
    this.confirmar = "";
  }

  setNombre(v)    { this.nombre   = v; this.limpiarError("nombre"); }
  setEmail(v)     { this.email    = v; this.limpiarError("email"); }
  setPassword(v)  { this.password = v; this.limpiarError("password"); }
  setConfirmar(v) { this.confirmar = v; this.limpiarError("confirmar"); }

  validar() {
    let ok = true;
    if (this.nombre.trim().length < 2)    { this.mostrarError("nombre", "Mínimo 2 chars"); ok = false; }
    if (!this.email.includes("@"))         { this.mostrarError("email", "Email inválido"); ok = false; }
    if (this.password.length < 8)          { this.mostrarError("password", "Mínimo 8 chars"); ok = false; }
    if (this.password !== this.confirmar)  { this.mostrarError("confirmar", "Las contraseñas no coinciden"); ok = false; }
    return ok;
  }

  obtenerDatos() {
    return { nombre: this.nombre, email: this.email };
  }

  resetear() {
    this.nombre = this.email = this.password = this.confirmar = "";
    this._errores = {};
  }
}

console.log("  FormularioLogin — intentos:");

const login = new FormularioLogin();
console.log("  → Datos inválidos:");
login.setEmail("correo-sin-arroba");
login.setPassword("abc");
login.enviar();

console.log("  → Datos válidos:");
login.setEmail("usuario@empresa.com");
login.setPassword("clave123");
login.enviar();

console.log("\n  FormularioRegistro — intentos:");
const registro = new FormularioRegistro();

console.log("  → Contraseñas no coinciden:");
registro.setNombre("Ana García");
registro.setEmail("ana@empresa.com");
registro.setPassword("clave1234!");
registro.setConfirmar("clave9999!");
registro.enviar();

console.log("  → Todo válido:");
registro.setConfirmar("clave1234!");
registro.enviar();

// ─────────────────────────────────────────────────────────
//  DEMO 4: Interfaces implementadas por clases
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 4 — INTERFACES implementadas por clases");
console.log("  ─────────────────────────────────────────────────");
console.log("  En TypeScript (.ts):");
console.log("  class Producto implements Serializable, Comparable<Producto>, Auditable { ... }");
console.log("  TypeScript EXIGE que la clase implemente TODOS los métodos de las interfaces\n");

class Producto {
  constructor(id, nombre, precio, categoria) {
    this.id        = id;
    this.nombre    = nombre;
    this.precio    = precio;
    this.categoria = categoria;
    this.creadoEn  = new Date();
    this._historial = [];
  }

  // Serializable
  serializar() {
    return JSON.stringify({ id: this.id, nombre: this.nombre, precio: this.precio, categoria: this.categoria });
  }

  deserializar(datos) {
    const obj = JSON.parse(datos);
    this.nombre = obj.nombre; this.precio = obj.precio; this.categoria = obj.categoria;
  }

  // Comparable<Producto>
  compararCon(otro) { return this.precio - otro.precio; }
  esIgualA(otro)    { return this.id === otro.id; }

  // Auditable
  registrarCambio(campo, anterior, nuevo) {
    this._historial.push(`[${new Date().toLocaleTimeString("es-CO")}] ${campo}: "${anterior}" → "${nuevo}"`);
  }

  obtenerHistorial() { return [...this._historial]; }

  toString() {
    return `[${this.id}] ${this.nombre.padEnd(20)} $${String(this.precio).padStart(8)} (${this.categoria})`;
  }
}

const catalogo = [
  new Producto(1, "Laptop Gaming",       1200, "electronica"),
  new Producto(2, "Mouse Inalámbrico",     45, "electronica"),
  new Producto(3, "Camiseta Básica",       25, "ropa"),
  new Producto(4, "Teclado Mecánico",     120, "electronica"),
  new Producto(5, "Pantalón Jean",         60, "ropa"),
  new Producto(6, "Audífonos Bluetooth",   85, "electronica"),
];

console.log("  Catálogo original:");
catalogo.forEach(p => console.log(`  ${p.toString()}`));

console.log("\n  Serializable — serializar() y deserializar():");
const laptop = catalogo[0];
const serializado = laptop.serializar();
console.log(`  Serializado: ${serializado}`);
const clone = new Producto(99, "", 0, "");
clone.deserializar(serializado);
console.log(`  Deserializado: ${clone.nombre} $${clone.precio}`);

console.log("\n  Comparable — ordenar por precio:");
const ordenados = [...catalogo].sort((a, b) => a.compararCon(b));
ordenados.forEach(p => console.log(`  $${String(p.precio).padStart(6)} → ${p.nombre}`));

console.log("\n  Auditable — historial de cambios:");
laptop.registrarCambio("precio", 1200, 999);
laptop.registrarCambio("nombre", "Laptop Gaming", "Laptop Pro Gaming");
laptop.nombre = "Laptop Pro Gaming";
laptop.precio = 999;
laptop.getHistorial().forEach(h => console.log(`  ${h}`));

console.log("\n  Comparable — esIgualA():");
console.log(`  catalogo[0].esIgualA(catalogo[0]) = ${catalogo[0].esIgualA(catalogo[0])}`);
console.log(`  catalogo[0].esIgualA(catalogo[1]) = ${catalogo[0].esIgualA(catalogo[1])}`);

// ─────────────────────────────────────────────────────────
//  DEMO 5: Shorthand de constructor (muy usado en Angular)
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 5 — SHORTHAND DE CONSTRUCTOR (el patrón de Angular)");
console.log("  ───────────────────────────────────────────────────────────");
console.log("  En TypeScript (.ts):");
console.log("  class Servicio {");
console.log("    constructor(");
console.log("      private http: HttpClient,  // declara + asigna en 1 línea");
console.log("      private router: Router,    // TypeScript lo hace automático");
console.log("      readonly baseUrl: string,  // readonly también funciona");
console.log("    ) {} // cuerpo vacío: todo ya está asignado");
console.log("  }\n");

// Simulamos el shorthand en JS con el mismo efecto
class ServicioSimulado {
  constructor(baseUrl, timeout = 5000, debug = false) {
    // En TS sería:
    // constructor(
    //   private readonly baseUrl: string,
    //   private timeout: number = 5000,
    //   private debug: boolean = false,
    // ) {}
    this.baseUrl = baseUrl;
    this._timeout = timeout;
    this._debug   = debug;
    this._cache   = new Map();
  }

  async get(endpoint) {
    const url = `${this.baseUrl}${endpoint}`;
    if (this._debug) console.log(`  [DEBUG] GET ${url}`);

    if (this._cache.has(url)) {
      if (this._debug) console.log(`  [DEBUG] Cache HIT para ${url}`);
      return this._cache.get(url);
    }

    const simulado = { url, datos: `Respuesta simulada de ${endpoint}`, timestamp: Date.now() };
    this._cache.set(url, simulado);
    return simulado;
  }

  get configuracion() {
    return { baseUrl: this.baseUrl, timeout: this._timeout, debug: this._debug };
  }
}

const servicio = new ServicioSimulado("https://api.tienda.com", 3000, true);
console.log("  Configuración del servicio:", JSON.stringify(servicio.configuracion));

async function demoServicio() {
  const resp1 = await servicio.get("/productos");
  const resp2 = await servicio.get("/productos"); // desde cache
  console.log(`  GET /productos → ${resp1.datos}`);
  console.log(`  GET /productos (cache) → ${resp2.datos}`);
}

// ─────────────────────────────────────────────────────────
//  DEMO 6: Singleton estático
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 6 — SINGLETON ESTÁTICO");
console.log("  ──────────────────────────────────");
console.log("  En Angular: @Injectable({ providedIn: 'root' }) hace esto automáticamente");
console.log("  Una sola instancia compartida en toda la aplicación\n");

class ConfiguracionApp {
  static VERSION = "2.1.0";
  static _inst   = null;

  constructor() {
    if (ConfiguracionApp._inst) return ConfiguracionApp._inst;
    this._config = new Map([
      ["tema",   "oscuro"],
      ["idioma", "es"],
      ["debug",  false],
      ["apiUrl", "https://api.miapp.com"],
    ]);
    ConfiguracionApp._inst = this;
  }

  static getInstancia() {
    return ConfiguracionApp._inst ?? (ConfiguracionApp._inst = new ConfiguracionApp());
  }

  get(clave)         { return this._config.get(clave); }
  set(clave, valor)  { this._config.set(clave, valor); }
  getAll()           { return Object.fromEntries(this._config); }
}

const cfg1 = ConfiguracionApp.getInstancia();
const cfg2 = ConfiguracionApp.getInstancia();
const cfg3 = ConfiguracionApp.getInstancia();

console.log(`  ConfiguracionApp.VERSION = ${ConfiguracionApp.VERSION}`);
console.log(`  cfg1 === cfg2 === cfg3    = ${cfg1 === cfg2 && cfg2 === cfg3}  (misma instancia)`);
console.log(`  Configuración inicial:   ${JSON.stringify(cfg1.getAll())}`);

cfg1.set("tema", "claro");
cfg1.set("debug", true);
console.log(`  cfg2.get("tema") después de cfg1.set("tema","claro") = "${cfg2.get("tema")}"`);
console.log(`  → Son el MISMO objeto. Cambiar cfg1 afecta cfg2 y cfg3.`);

// ─────────────────────────────────────────────────────────
//  DEMO 7: Tabla comparativa final
// ─────────────────────────────────────────────────────────
console.log("\n  🔷 DEMO 7 — TABLA COMPARATIVA COMPLETA");
console.log("  ─────────────────────────────────────────────────────────────");

const comparacion = [
  {
    concepto: "class",
    instanciable: "✅ Sí",
    implementacion: "✅ Sí",
    herencia: "extends una sola clase",
    cuandoUsar: "Lógica concreta, servicios, componentes",
  },
  {
    concepto: "abstract class",
    instanciable: "❌ No",
    implementacion: "✅ Parcial (mezcla)",
    herencia: "extends una sola clase abstracta",
    cuandoUsar: "Base común con lógica compartida + métodos a implementar",
  },
  {
    concepto: "interface",
    instanciable: "❌ No",
    implementacion: "❌ Solo firmas",
    herencia: "implements múltiples",
    cuandoUsar: "Contrato puro, modelos de datos, DTOs de API",
  },
];

console.log("  ┌──────────────────┬───────────────┬─────────────────┬─────────────────────────────┐");
console.log("  │ Concepto         │ Instanciable  │ Implementación  │ Herencia                    │");
console.log("  ├──────────────────┼───────────────┼─────────────────┼─────────────────────────────┤");
comparacion.forEach(({ concepto, instanciable, implementacion, herencia }) => {
  console.log(`  │ ${concepto.padEnd(16)} │ ${instanciable.padEnd(13)} │ ${implementacion.padEnd(15)} │ ${herencia.padEnd(27)} │`);
});
console.log("  └──────────────────┴───────────────┴─────────────────┴─────────────────────────────┘");

console.log("\n  Cuándo usar cada uno:");
comparacion.forEach(({ concepto, cuandoUsar }) => {
  console.log(`  ${concepto.padEnd(16)} → ${cuandoUsar}`);
});

console.log("\n  Modificadores de acceso:");
const modifs = [
  { mod: "public",    clase: "✅", subclase: "✅", afuera: "✅", usar: "API pública, métodos que otros necesitan llamar" },
  { mod: "private",   clase: "✅", subclase: "❌", afuera: "❌", usar: "Estado interno, servicios inyectados, helper methods" },
  { mod: "protected", clase: "✅", subclase: "✅", afuera: "❌", usar: "Lógica que subclases deben acceder pero no el exterior" },
  { mod: "readonly",  clase: "ctor", subclase: "✅ leer", afuera: "✅ leer", usar: "ID, fechas de creación, URLs base de API" },
];
modifs.forEach(({ mod, clase, subclase, afuera, usar }) => {
  console.log(`  ${mod.padEnd(10)} clase:${clase.padEnd(5)} subclase:${subclase.padEnd(10)} afuera:${afuera.padEnd(10)} → ${usar}`);
});

// Ejecutar demo async
demoServicio().then(() => {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║   ✅ Investigación #3 completada                         ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log("║                                                          ║");
  console.log("║   Resumen de lo que estudiaste:                          ║");
  console.log("║   ✓ Clases TypeScript con propiedades tipadas            ║");
  console.log("║   ✓ Modificadores: public, private, protected, readonly  ║");
  console.log("║   ✓ Constructor completo y shorthand de constructor      ║");
  console.log("║   ✓ Getters y setters tipados                            ║");
  console.log("║   ✓ Herencia con extends, super() y override             ║");
  console.log("║   ✓ Clases abstractas: métodos abstractos y concretos    ║");
  console.log("║   ✓ Interfaces implementadas por clases (implements)     ║");
  console.log("║   ✓ Una clase puede implementar múltiples interfaces     ║");
  console.log("║   ✓ Decoradores: @Component, @Injectable, @Input...      ║");
  console.log("║   ✓ Propiedades y métodos estáticos (static)             ║");
  console.log("║   ✓ Patrón Singleton con constructor privado             ║");
  console.log("║   ✓ Cómo todo esto se usa en Angular real                ║");
  console.log("║                                                          ║");
  console.log("║   Siguiente archivo: node 04_typescript_buenas_practicas.js ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
});
Listo

