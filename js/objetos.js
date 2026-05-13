/*
*4. INVESTIGACIÓN: LOS OBJETOS EN JAVASCRIPT
Si los arrays son listas, los objetos son representaciones de la vida real. Un objeto 
es una colección de propiedades (datos) y métodos (acciones) que describen a una entidad 
específica. En lugar de usar índices numéricos, los objetos usan "claves" (nombres) 
para acceder a la información, lo que hace que el código sea mucho más fácil de leer.

*Conceptos fundamentales:

*Propiedades: 
Son las características o variables del objeto (ej. color, marca, precio).

*Métodos: 
Son funciones que viven dentro del objeto y definen lo que el objeto puede 
hacer (ej. encender, calcularIva, saludar).

*Estructura Clave-Valor: 
Los objetos se definen con llaves { } y cada dato se guarda 
asociando un nombre (clave) con su contenido (valor).

*Importancia: 
En el desarrollo Full Stack, casi toda la información que viaja desde una 
base de datos o una API llega en formato de objeto (JSON). Dominarlos es obligatorio.
*/

// *Ejemplo práctico: Representación de un Celular

// * MARCAS Y MODELOS PERMITIDOS — solo estos se pueden ingresar
// Para escalar: solo agrega más marcas y modelos aquí, el resto del código no se toca
const marcasPermitidas = ['Samsung', 'Apple', 'Xiaomi', 'Huawei', 'Motorola', 'Sony', 'LG', 'Nokia', 'OnePlus', 'Google'];
const modelosPermitidos = {
    'Samsung': ['S24', 'S23', 'A54', 'A34', 'M54'],
    'Apple':   ['iPhone 15', 'iPhone 14', 'iPhone 13', 'iPhone SE'],
    'Xiaomi':  ['14 Pro', '13', 'Redmi Note 13', 'POCO X5'],
    'Huawei':  ['P60', 'P50', 'Mate 50', 'Nova 11'],
    'Motorola':['Edge 40', 'Moto G84', 'Moto G54', 'Razr 40'],
    'Sony':    ['Xperia 1 V', 'Xperia 5 V', 'Xperia 10 V'],
    'LG':      ['Wing', 'Velvet', 'G8'],
    'Nokia':   ['G42', 'G22', 'X30'],
    'OnePlus': ['12', '11', 'Nord 3', 'Nord CE 3'],
    'Google':  ['Pixel 8', 'Pixel 8 Pro', 'Pixel 7a']
};

// Función reutilizable que valida que el usuario escriba una marca permitida
// Usa while(true) para repetir hasta obtener una respuesta válida
function preguntarMarca() {
    while (true) {
        const respuesta = prompt('¿Cuál es la marca del celular?\nMarcas disponibles: ' + marcasPermitidas.join(', '));

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        const respuestaLimpia = respuesta.trim();

        if (respuestaLimpia === '') {
            alert('Por favor escribe una marca.');
            continue;
        }

        // .some() + .toLowerCase() para que no importe mayúsculas
        const marcaValida = marcasPermitidas.find(m => m.toLowerCase() === respuestaLimpia.toLowerCase());

        if (marcaValida) {
            // Retorna la marca con la capitalización correcta de la lista
            return marcaValida;
        }

        alert(`"${respuestaLimpia}" no es una marca válida.\nEscribe una de la lista.`);
    }
}

// Función reutilizable que valida que el usuario escriba un modelo de la marca elegida
// Usa while(true) para repetir hasta obtener una respuesta válida
function preguntarModelo(marca) {
    const modelos = modelosPermitidos[marca];

    while (true) {
        const respuesta = prompt(`¿Cuál es el modelo del ${marca}?\nModelos disponibles: ` + modelos.join(', '));

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        const respuestaLimpia = respuesta.trim();

        if (respuestaLimpia === '') {
            alert('Por favor escribe un modelo.');
            continue;
        }

        // .find() + .toLowerCase() para que no importe mayúsculas
        const modeloValido = modelos.find(m => m.toLowerCase() === respuestaLimpia.toLowerCase());

        if (modeloValido) {
            // Retorna el modelo con la capitalización correcta de la lista
            return modeloValido;
        }

        alert(`"${respuestaLimpia}" no es un modelo válido para ${marca}.\nEscribe uno de la lista.`);
    }
}

// El usuario elige la marca y el modelo del celular
const marcaElegida = preguntarMarca();

// Solo continúa si el usuario no canceló
if (marcaElegida === null) {
    console.log('Operación cancelada por el usuario.');
} else {
    const modeloElegido = preguntarModelo(marcaElegida);

    if (modeloElegido === null) {
        console.log('Operación cancelada por el usuario.');
    } else {

        // * CONFIGURACIÓN INICIAL (Objeto)
        // Se construye el objeto con los datos que el usuario ingresó
        const celular = {
            marca: marcaElegida,
            modelo: modeloElegido,
            // Método: acción que el objeto puede ejecutar
            encender: function() {
                return `El sistema operativo del ${this.marca} ${this.modelo} se está iniciando... Celular prendido.`;
            }
        };

        /*
        *1. LLAMADA A UN MÉTODO (Función del objeto)
        Para ejecutar una acción del objeto usamos la sintaxis de punto.
        Esto demuestra que un objeto no solo almacena datos, sino que también puede tener comportamiento.
        */
        console.log(celular.encender());
        // * Ejecuta el método "encender" y devuelve el mensaje del sistema iniciando

        /*
        *2. FUNCIÓN Object.keys()
        Es un método estático de la clase Object que nos devuelve un array con todos 
        los nombres de las propiedades (las llaves) del objeto. 

        *Uso común: 
        Se utiliza cuando necesitamos conocer la estructura del objeto, por ejemplo,
        para recorrer sus campos o generar interfaces dinámicas.
        */
        console.log(Object.keys(celular));
        // * Resultado: ["marca", "modelo", "encender"]
        // * Muestra las propiedades disponibles dentro del objeto

        /*
        *3. FUNCIÓN Object.values()
        Al contrario de keys, este método nos devuelve un array con los datos reales 
        (los valores) almacenados en cada propiedad.

        *Uso común: 
        Se usa para obtener directamente la información almacenada sin importar el nombre de cada propiedad.
        */
        console.log(Object.values(celular));
        // * Resultado: [marca elegida, modelo elegido, function encender()]
        // * Muestra los valores del objeto, incluyendo el método como función
    }
}

/*
* Explicación:
El programa usa prompt() para pedirle datos al usuario directamente en el navegador,
haciendo el ejemplo interactivo y dinámico. Para garantizar que solo se ingresen datos
válidos, se definieron dos estructuras de datos: marcasPermitidas (un array con las
marcas disponibles) y modelosPermitidos (un objeto donde cada marca tiene su propia
lista de modelos). Para escalar, solo se tocan estas dos estructuras — el resto del
código funciona solo.

Para manejar las entradas del usuario se crearon dos funciones reutilizables:
preguntarMarca() y preguntarModelo(). Ambas usan while(true) para repetir la pregunta
hasta obtener una respuesta válida, lo que es más seguro que la recursión. Usan
.trim() para evitar espacios vacíos, .toLowerCase() para que no importe si el usuario
escribe "SAMSUNG", "samsung" o "Samsung", y .find() para verificar que lo ingresado
exista en la lista. Si el usuario cancela el prompt devuelve null y se detiene todo.
Si escribe algo inválido, avisa y vuelve a preguntar automáticamente.

Con esos datos validados, el programa define un objeto llamado "celular" que contiene
información (marca y modelo) y también una acción (encender). El método encender()
usa "this" para acceder a las propiedades del propio objeto, demostrando que un objeto
no solo almacena datos sino que también puede tener comportamiento propio.

Luego, con Object.keys(), se obtienen los nombres de las propiedades del objeto,
lo que permite conocer su estructura. Después, con Object.values(), se accede a los
valores almacenados, incluyendo la función como parte del contenido del objeto.

Esto muestra cómo los objetos permiten agrupar datos y comportamiento en una sola
estructura, y cómo funciones reutilizables con while(true), prompt(), .toLowerCase(),
.trim() y .find() hacen que el programa sea robusto, interactivo y preparado para
manejar cualquier error del usuario.
*/






// ========================================================================================================
/*
*5. INVESTIGACIÓN: PROFUNDIZANDO EN OBJETOS — OBJECT, ACCESO Y APIs

*El objeto Object en JavaScript:
En JavaScript, Object es la base de todo. Todos los objetos heredan de Object,
lo que significa que tienen acceso a métodos poderosos para inspeccionar,
copiar y transformar sus datos.

*Métodos estáticos de Object más importantes:

*Object.keys(obj):
Devuelve un array con todas las CLAVES (nombres de propiedades) del objeto.
Útil para saber qué propiedades tiene un objeto sin conocerlo de antemano.
Ejemplo: Object.keys({ nombre: "Oscar", edad: 25 }) → ["nombre", "edad"]

*Object.values(obj):
Devuelve un array con todos los VALORES del objeto.
Útil para procesar los datos sin importar los nombres de las claves.
Ejemplo: Object.values({ nombre: "Oscar", edad: 25 }) → ["Oscar", 25]

*Object.entries(obj):
Devuelve un array de pares [clave, valor]. Es la combinación de keys y values.
Muy útil para recorrer un objeto con for...of.
Ejemplo: Object.entries({ nombre: "Oscar" }) → [["nombre", "Oscar"]]

*Object.assign(destino, origen):
Copia las propiedades de un objeto origen hacia un objeto destino.
Ejemplo: Object.assign({}, celular) → copia superficial del objeto

*Object.freeze(obj):
Congela el objeto — no se puede modificar, agregar ni eliminar propiedades.
Útil para constantes o configuraciones que no deben cambiar.


*ACCESO A PROPIEDADES — Notación de Punto vs Corchetes:

*Notación de Punto (objeto.propiedad):
Es la forma más común y limpia. Se usa cuando conocemos el nombre exacto
de la propiedad desde el principio y no cambia.
Ejemplo: persona.nombre → devuelve "Oscar"

*Notación de Corchetes (objeto["propiedad"]):
Se usa cuando el nombre de la propiedad es dinámico (viene de una variable),
tiene espacios, o se genera en tiempo de ejecución.
Ejemplo: persona["nombre"] → devuelve "Oscar"
Ejemplo dinámico: const clave = "nombre"; persona[clave] → devuelve "Oscar"

*¿Cuándo usar cada una?
Punto → cuando sabes la clave de antemano y es un nombre simple.
Corchetes → cuando la clave viene de una variable, tiene espacios o caracteres especiales.


*CURIOSIDADES Y BUENAS PRÁCTICAS AVANZADAS DE OBJETOS:

*Objetos dentro de objetos (anidamiento):
Un objeto puede tener como valor otro objeto, creando estructuras más complejas.
const persona = { nombre: "Oscar", direccion: { ciudad: "Cali", pais: "Colombia" } };
console.log(persona.direccion.ciudad); // → "Cali"

*Desestructuración de objetos:
Permite extraer propiedades directamente en variables sin repetir el nombre del objeto.
const { nombre, edad } = persona; // En vez de persona.nombre y persona.edad

*Desestructuración con renombre:
const { nombre: miNombre } = persona; // La variable se llama miNombre, no nombre

*Spread Operator en objetos (...):
Permite copiar o combinar objetos sin modificar el original.
const copia = { ...persona }; // Copia segura del objeto
const combinado = { ...persona, pais: "Colombia" }; // Agrega o sobreescribe propiedades

*Optional Chaining (?.) en objetos:
Evita errores si intentamos acceder a una propiedad que no existe.
console.log(persona.direccion?.barrio); // Devuelve undefined en vez de error
console.log(persona.trabajo?.empresa?.nombre); // Cadena segura de accesos

*JSON (JavaScript Object Notation):
Los objetos de JavaScript y JSON son casi idénticos. JSON es el formato
estándar para enviar y recibir datos entre el frontend y el backend.
JSON.stringify(obj) → convierte el objeto a texto JSON
JSON.stringify(obj, null, 2) → con sangría legible
JSON.parse(texto) → convierte texto JSON de vuelta a objeto JavaScript

*this en métodos:
Dentro de un método, "this" hace referencia al objeto que contiene ese método.
Es la forma en que el objeto "se habla a sí mismo" para acceder a sus propias propiedades.
const obj = { nombre: "Oscar", saludar: function() { return "Hola, soy " + this.nombre; } };


*LA API DE RICK AND MORTY — Contexto e Investigación:

*¿Qué es una API?
Una API (Application Programming Interface) es un servicio disponible en internet
que nos entrega datos cuando hacemos una petición HTTP. Funciona como un mesero
en un restaurante: le pedimos algo (la petición), él va a la cocina (el servidor)
y nos trae lo que pedimos (los datos en formato JSON).

*¿Qué es la API de Rick and Morty?
Es una API pública y gratuita que contiene información de todos los personajes,
episodios y ubicaciones de la serie animada. No requiere registro ni clave de acceso,
lo que la hace perfecta para aprender a consumir APIs reales.

*URL base de la API:
https://rickandmortyapi.com/api/

*Endpoints disponibles:
/character     → todos los personajes (paginado)
/character/1   → personaje con ID 1 (Rick Sanchez)
/character/2   → personaje con ID 2 (Morty Smith)
/episode       → todos los episodios
/location      → todas las ubicaciones

*¿Qué datos devuelve un personaje?
La API devuelve un objeto JSON con estas propiedades:
{
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",      // Alive, Dead, o unknown
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "..." },     // objeto anidado
  location: { name: "Citadel of Ricks", url: "..." }, // objeto anidado
  image: "https://...",
  episode: ["https://...", ...],  // array de URLs
  url: "https://...",
  created: "2017-11-04T..."
}

*Conexión con los objetos:
Cada respuesta de la API ES un objeto JavaScript. Podemos acceder a sus propiedades
con punto o corchetes, desestructurarlo, copiarlo con spread, y recorrerlo con
Object.keys(), Object.values() y Object.entries() — exactamente igual que cualquier
objeto que creamos manualmente. Esta es la razón por la que aprender objetos es
fundamental: el mundo real habla en objetos JSON.
*/


// * EJEMPLO PRÁCTICO: Object, acceso con punto y corchetes, y API de Rick and Morty

// Función reutilizable que pide un número de personaje válido
// Usa while(true) para repetir hasta obtener un número válido
// isNaN() valida que sea número y parseInt() lo convierte al número real
function preguntarNumeroPersonaje() {
    while (true) {
        const respuesta = prompt(
            '¿Qué número de personaje de Rick and Morty quieres consultar?\nEscribe un número del 1 al 826:'
        );

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        // .trim() evita espacios vacíos
        // isNaN() verifica si lo ingresado NO es un número
        if (!isNaN(respuesta) && respuesta.trim() !== '') {
            // parseInt() convierte el texto "25" al número real 25
            const numero = parseInt(respuesta);

            // Validamos que esté en el rango válido de la API
            if (numero >= 1 && numero <= 826) {
                return numero;
            }
            alert('El número debe estar entre 1 y 826.\nIntenta con: 1, 25, 100, 500...');
        } else {
            // Si escribió texto como "veinticinco", avisa y vuelve a preguntar
            alert('Por favor escribe solo un número.\nEjemplo: 1, 25, 100\nNo se acepta texto como "veinticinco".');
        }
    }
}

// El usuario elige qué personaje consultar
const numeroPersonaje = preguntarNumeroPersonaje();

if (numeroPersonaje === null) {
    console.log('Operación cancelada por el usuario.');
} else {
    console.log(`\nConsultando personaje #${numeroPersonaje} en la API de Rick and Morty...`);

    // fetch() hace la petición HTTP a la API — devuelve una Promesa
    // La API de Rick and Morty es pública y gratuita — no requiere registro
    fetch(`https://rickandmortyapi.com/api/character/${numeroPersonaje}`)
        .then(respuesta => {
            // Verificamos si la respuesta fue exitosa
            if (!respuesta.ok) {
                throw new Error('No se encontró el personaje. El número puede estar fuera del rango.');
            }
            // .json() convierte la respuesta HTTP en un objeto JavaScript
            return respuesta.json();
        })
        .then(personaje => {
            // "personaje" ahora es un objeto JavaScript con todas sus propiedades

            console.log('\n========== DATOS DEL PERSONAJE ==========');

            /*
            * ACCESO CON NOTACIÓN DE PUNTO
            * La forma más directa cuando conocemos la clave de antemano
            */
            console.log('\n--- Notación de punto ---');
            console.log('Nombre: '  + personaje.name);
            console.log('Estado: '  + personaje.status);
            console.log('Especie: ' + personaje.species);
            console.log('Género: '  + personaje.gender);

            /*
            * OBJETO ANIDADO — location y origin son objetos dentro del objeto personaje
            * Para acceder a ellos encadenamos la notación de punto
            */
            console.log('Origen: '    + personaje.origin.name);
            console.log('Ubicación: ' + personaje.location.name);

            /*
            * ACCESO CON NOTACIÓN DE CORCHETES
            * Útil cuando la clave es dinámica o viene de una variable
            */
            console.log('\n--- Notación de corchetes ---');
            const clave1 = 'name';
            const clave2 = 'status';
            console.log('Nombre (corchetes): '  + personaje[clave1]);
            console.log('Estado (corchetes): '  + personaje[clave2]);
            console.log('Especie (corchetes): ' + personaje['species']);

            /*
            * Object.keys() — muestra todas las claves del objeto
            * Muy útil para explorar objetos desconocidos como los que vienen de APIs
            */
            console.log('\n--- Object.keys() ---');
            console.log('Propiedades disponibles:', Object.keys(personaje));

            /*
            * Object.values() — muestra todos los valores del objeto
            */
            console.log('\n--- Object.values() ---');
            console.log('Valores del objeto:', Object.values(personaje));

            /*
            * Object.entries() — pares [clave, valor]
            * Combina keys y values en un solo array
            */
            console.log('\n--- Object.entries() (primeras 4 propiedades) ---');
            Object.entries(personaje).slice(0, 4).forEach(([clave, valor]) => {
                console.log(`  ${clave}: ${valor}`);
            });

            /*
            * DESESTRUCTURACIÓN del objeto de la API
            * Extrae propiedades directamente en variables limpias
            */
            console.log('\n--- Desestructuración ---');
            const { name, status, species, gender } = personaje;
            console.log(`${name} está ${status} y es ${species} (${gender})`);

            /*
            * SPREAD OPERATOR — copia segura del objeto
            * La copia no afecta al original
            */
            console.log('\n--- Spread Operator ---');
            const copiaPersonaje = { ...personaje };
            console.log('Copia creada para:', copiaPersonaje.name);

            /*
            * OPTIONAL CHAINING (?.)
            * Acceso seguro a propiedades que podrían no existir
            */
            console.log('\n--- Optional Chaining ---');
            console.log('Tipo de ubicación (puede no existir): ' + personaje.location?.type);

            /*
            * JSON.stringify — convierte el objeto a texto JSON legible
            * Útil para ver la estructura completa o para enviar datos
            */
            console.log('\n--- JSON.stringify() ---');
            const resumen = {
                nombre:    personaje.name,
                estado:    personaje.status,
                especie:   personaje.species,
                origen:    personaje.origin.name,
                ubicacion: personaje.location.name
            };
            console.log(JSON.stringify(resumen, null, 2));
        })
        .catch(error => {
            // Si hay algún error en la petición o en el proceso de datos
            console.error('Error al consultar la API: ' + error.message);
        });
}

/*
* Explicación:
Este ejemplo profundiza en el trabajo con objetos usando una API real. La función
preguntarNumeroPersonaje() usa while(true) para repetir hasta obtener un número válido,
isNaN() para verificar que sea un número (no texto como "veinticinco"), parseInt() para
convertir el texto "25" al número real 25, y valida que esté en el rango 1-826.
Si el usuario cancela, detecta null y detiene todo.

Con el número válido, se hace una petición a la API pública de Rick and Morty usando
fetch(). Esta API es gratuita, no requiere registro y devuelve los datos de cada
personaje en formato JSON. JavaScript convierte ese JSON automáticamente en un objeto
con el que podemos trabajar igual que cualquier otro objeto que creamos manualmente.

El ejemplo demuestra todas las formas de acceder y manipular los datos del objeto:
notación de punto para acceso directo cuando conocemos la clave, notación de corchetes
cuando la clave es dinámica o viene de una variable, Object.keys() para explorar todas
las propiedades disponibles (muy útil con APIs desconocidas), Object.values() para
obtener todos los valores, Object.entries() para recorrer pares clave-valor,
desestructuración para extraer propiedades en variables limpias, Spread Operator para
crear copias seguras del objeto, Optional Chaining para acceder a propiedades que
podrían no existir sin generar errores, y JSON.stringify() para convertir el objeto
a texto legible.

Los objetos anidados como origin y location demuestran que las APIs del mundo real
devuelven estructuras complejas donde un objeto puede contener otros objetos,
y que podemos navegar esa estructura encadenando la notación de punto.

Esto confirma que los objetos son el formato universal de datos en el desarrollo web
moderno — dominarlos significa poder trabajar con cualquier API del mundo real.
*/