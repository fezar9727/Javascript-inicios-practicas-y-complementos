
// tipo de dato Boolean, falso o verdadero

// const verdadero = true;
// const falso = false;

const edad = prompt('por favor escriba su edad');

// los operadores de comparacion nos devuelven un true o un false (verdadero o falso)
// const validacion = edad >= 18
// console.log(`la validacion es: ${ validacion }`);


//validar que la edad sea un numero
if(isNaN (edad)) {
    alert('Ingresaste un valor que no es un numero !!!')
} else {
    if(edad >= 18){
    console.log(`Tienes ${ edad } años. Eres mayor de edad, puedes ingresar`);
    } else {
        console.log(`Tienes ${ edad } años. Eres menor de edad, no puedes ingresar`);
    }
}





console.log('Finalizo el programa')

// mis ejercicios con isNaN

// 1-Pedir el precio de un producto, si no es un número da error.
// Si es un número, aplica un descuento del 10% y se muestra en consola.

const precio = prompt('Ingrese el precio del producto:');

if(isNaN(precio)) {
    alert('Eso no es un precio válido.');
} else {
    const total = precio * 0.90;
    console.log(`El precio con descuento es: ${total}`);
}


// 2-Pedir dos notas valida ambas, si son números saca el promedio.
// Si el promedio es mayor o igual a 3, dile  aprobó, si no que reprobó.

const nota1 = prompt('Nota 1:');
const nota2 = prompt('Nota 2:');

if(isNaN(nota1) || isNaN(nota2)) {
    alert('Alguna de las notas no es un número válido.');
} else {
    const promedio = (parseFloat(nota1) + parseFloat(nota2)) / 2;
    if(promedio >= 3) {
        console.log(`Tu promedio es ${promedio}. ¡aprobaste!`);
    } else {
        console.log(`Tu promedio es ${promedio}. reprobaste...`);
    }
}


// 3-Pedir una cantidad en pesos colombianos validar que sea número.
// Si lo es, conviértelo a dólares (unos 4000 pesos por dólar) y mostrarlo.

const pesos = prompt('¿Cuántos pesos quieres convertir?');

if(isNaN(pesos)) {
    alert('Valor no reconocido.');
} else {
    const dolares = pesos / 4000;
    console.log(`Tienes el equivalente a $${dolares.toFixed(2)} dólares.`);
}

// 4-Pedir la temperatura actual si no es número avisa. 
// Si es número y es mayor a 30 que diga "Hace calor en Cali"; 
// si es menor a 15 que diga "Está haciendo frío"; de lo contrario "Clima agradable".


const temp = prompt('¿A cuántos grados estamos?');

if(isNaN(temp)) {
    alert('Ingresa la temperatura en números.');
} else {
    if(temp > 30) {
        console.log('Hace calor en Cali');
    } else if(temp < 15) {
        console.log('Está haciendo frío');
    } else {
        console.log('Clima agradable');
    }
}

// 5-Pedir al usuario su nombre, si ingresa un número muestra un error.
//  Si ingresa texto, dale la bienvenida.

const nombre = prompt('Ingresa tu nombre:');

if (!isNaN(nombre)) {
    alert('Error: Ingresa texto, no números.');
} else {
    console.log(`Bienvenido, ${nombre}`);
}





/*                   
*TAREA DE JAVASCRIPT - BOOTCAMP BIT

*FECHA DE REALIZACIÓN: 
03 de Mayo de 2026

*ESTUDIANTE: 
Oscar Fernando Salazar Toro

*INSTRUCTOR: 
Sebastián Amaya

*DESCRIPCIÓN: 
Este documento contiene la investigación técnica sobre los 
fundamentos de JavaScript, abarcando desde lógica condicional hasta 
peticiones asíncronas con Fetch.
*/

// * Lo primero: Para sacar las comillas inclinadas (los backticks ``) 
// en MI COMPUTADOR, uso la combinación de teclas: Alt Gr + ] 
// (la tecla que tiene el corchete de cierre).


// ==========================================
// * TAREA 1
// ==========================================

/* 
*1. INVESTIGACIÓN: CONDICIONALES ANIDADOS
Los condicionales anidados son básicamente estructuras donde un bloque "if" se encuentra 
dentro de otro bloque "if". Esto se hace cuando queremos realizar validaciones más 
específicas que dependen de una condición principal. 

*Es como un filtro de seguridad:
si no pasas la primera puerta (el primer if), el código 
ni siquiera mira lo que hay en la segunda puerta (el segundo if). Se usan mucho para 
manejar diferentes niveles de permisos o para validar datos paso a paso sin que el 
programa se confunda.
*/

// * Ejemplo práctico: Validación de acceso a un evento en Cali


// * CONFIGURACIÓN INICIAL (Variables)
const tieneEntrada = true;
const edadPersona = 20;

// * ESTRUCTURA DE DECISIÓN
if (tieneEntrada) {
    // Si tiene entrada o ticket físico, pasa a la siguiente etapa
    if (edadPersona >= 18) {
        // Si es mayor de edad, se le permite el acceso al área VIP
        console.log("Bienvenido al evento, puedes pasar al área VIP.");
    } else {
        // Si tiene entrada pero es menor, se le asigna el área general
        console.log("Bienvenido, pero por ser menor de edad vas al área general.");
    }
} else {
    // Si desde el principio no tiene entrada, no se ejecuta el siguiente if ni nada de lo que le sigue
    console.log("No tienes entrada. Por favor dirígete a la taquilla.");
}

/*
* Explicación:
El programa evalúa primero si la persona tiene entrada. Si no la tiene, 
se detiene ahí y muestra el mensaje correspondiente sin revisar nada más. 
Si sí tiene entrada, se realiza una segunda validación donde se toma una decisión 
según la edad: si es mayor de edad accede al área VIP, de lo contrario se le asigna 
el área general. Esto muestra cómo una condición depende de otra para continuar con la lógica.
*/


// ========================================================================================================
/* 
*2. INVESTIGACIÓN: OPERADORES LÓGICOS
Los operadores lógicos son herramientas fundamentales que nos permiten conectar dos o más 
comparaciones para obtener un único resultado (verdadero o falso). Son el motor de la 
toma de decisiones compleja en el código, ya que permiten evaluar múltiples variables 
al mismo tiempo antes de ejecutar una acción.

*Los tres operadores principales en JavaScript son:

*AND (&&): 
Este operador es muy estricto. Para que el resultado final sea "true", 
TODAS las condiciones que estás comparando deben cumplirse obligatoriamente. Si una 
sola es falsa, todo el resultado se cae y es falso.

*OR (||): 
Este es más flexible. Basta con que una sola de las condiciones sea verdadera 
para que todo el resultado sea "true". Solo devuelve falso si absolutamente todas las 
condiciones son falsas.

*NOT (!): 
A diferencia de los otros, este trabaja con una sola condición y lo que hace 
es invertir su valor. Si algo es verdadero, lo vuelve falso, y viceversa. Es muy útil 
para crear validaciones de "lo que NO debe pasar".
*/


// * Ejemplo práctico: Control de acceso a un sistema premium

// * CONFIGURACIÓN INICIAL (Variables)
const tieneCuenta = true;
const tieneSuscripcion = false;
const esAdministrador = true;
const cuentaBloqueada = false;

// * ESTRUCTURA DE DECISIÓN

// * 1. Usamos && (AND):
// (tieneCuenta && tieneSuscripcion) → Debe tener cuenta Y suscripcion para ser usuario premium

// * 2. Usamos || (OR): 
// || esAdministrador → Permite el acceso si es usuario premium O si es administrador.

// * 3. Usamos ! (NOT): 
// y !cuentaBloqueada → Solo entra si la cuenta NO está bloqueada.

if  (((tieneCuenta && tieneSuscripcion) || esAdministrador) && !cuentaBloqueada) {
    console.log("Acceso concedido al panel de control.");
} else {
    console.log("Acceso denegado: Verifique su suscripción o el estado de su cuenta.");
}

/*
* Explicación:
El programa evalúa varias condiciones combinadas. Primero verifica si el usuario cumple
alguna de estas dos opciones: tener cuenta y suscripción activa (usuario premium) o ser
administrador. Si se cumple al menos una de ellas, pasa a la siguiente validación, donde
se revisa que la cuenta no esté bloqueada.

Solo si se cumple una condición de acceso (premium o administrador) y además la cuenta
está activa, se concede el acceso. En caso contrario, el sistema lo rechaza.

Esto muestra cómo los operadores lógicos permiten combinar múltiples condiciones en una
sola decisión, controlando el flujo del programa de forma más precisa.
*/



// ========================================================================================================
/* 
*3. INVESTIGACIÓN: ARRAYS (ARREGLOS)
Los arrays son estructuras de datos fundamentales que nos permiten almacenar una colección 
organizada de elementos bajo un mismo nombre de variable. A diferencia de una variable 
estándar que solo guarda un dato, un array funciona como un contenedor múltiple donde 
podemos guardar textos, números, objetos o incluso otros arrays.

*Conceptos clave de los Arrays:

*Índice: 
Cada elemento en un array tiene una posición numerada. Es vital recordar que 
en programación los índices siempre comienzan en 0. Es decir, el primer elemento está 
en la posición [0], el segundo en la [1], y así sucesivamente.

*Dinamismo: 
En JavaScript, los arrays son dinámicos; podemos cambiar su tamaño, agregar 
o quitar elementos en cualquier momento durante la ejecución del programa.

*Utilidad: 
Son la base para manejar listas de datos, como los productos de una tienda, 
los nombres de una base de datos o los elementos de un carrito de compras.
*/

// * Ejemplo práctico de Arrays con 3 funciones principales:

// * CONFIGURACIÓN INICIAL (Array)
const herramientas = ['Martillo', 'Destornillador'];

/*
*1. FUNCIÓN push()
Esta función se encarga de añadir uno o más elementos al final de un array. 
Lo interesante es que esta función modifica la longitud original del arreglo 
y devuelve el nuevo número de elementos que tiene. 

*Uso común: 
Es la función que se dispara, por ejemplo, cuando un usuario en una 
tienda virtual hace clic en "Agregar al carrito"; el sistema hace un .push() 
del producto a la lista de compras del cliente.
*/
herramientas.push('Llave inglesa'); 
// * Ahora el array es: ['Martillo', 'Destornillador', 'Llave inglesa']


/*
*2. FUNCIÓN pop()
Es la operación inversa a push(). Se encarga de extraer y eliminar el último 
elemento del array. Es una función muy útil porque no solo borra el dato, sino 
que también te lo "entrega" por si necesitas guardarlo en otra variable antes 
de que desaparezca del arreglo original.

*Uso común: 
Se utiliza mucho en sistemas de "Pilas" (como el historial de navegación), 
donde el último elemento que entró es el primero en salir al darle al botón "atrás".
*/
herramientas.pop(); 
// * Ahora el array queda nuevamente como: ['Martillo', 'Destornillador']


/*
*3. FUNCIÓN includes()
Introducida en versiones más modernas de JavaScript (ES6), esta función realiza 
una búsqueda interna para determinar si un valor específico existe dentro de la 
lista. Lo mejor es su simplicidad: devuelve un valor booleano (true o false).

*Uso común: 
Es perfecta para validaciones rápidas de seguridad o existencia. 
Por ejemplo, verificar si un nombre de usuario ya está en una lista de invitados 
o, en este caso, comprobar si una herramienta específica como "Martillo" 
está disponible en el inventario antes de usarla o asignarla a una tarea.
*/
if (herramientas.includes('Martillo')) {
    console.log("El Martillo está disponible en el inventario.");
}
// * Verifica si "Martillo" existe dentro del array y, si es así, muestra un mensaje


console.log("Inventario actualizado: " + herramientas);
/* 
* Muestra el estado final del array después de aplicar push() y pop()
* ['Martillo', 'Destornillador']
*/

/* 
*Explicación:
El programa comienza con un arreglo inicial de herramientas. Primero se agrega
un nuevo elemento al final usando push(), lo que aumenta el tamaño del array.
Luego se utiliza pop() para eliminar el último elemento agregado, dejando el
arreglo como estaba originalmente.

Después, con includes(), se verifica si un elemento específico existe dentro
del array. Si la condición se cumple, se muestra un mensaje indicando su
disponibilidad.

Finalmente, se imprime el estado actual del arreglo. Esto muestra cómo se pueden
agregar, eliminar y validar datos dentro de una misma estructura, permitiendo
gestionar listas de forma dinámica.
*/


// ========================================================================================================
/* 
*4. INVESTIGACIÓN: LOS OBJETOS EN JAVASCRIPT
Si los arrays son listas, los objetos son representaciones de la vida real. Un objeto 
es una colección de propiedades (datos) y métodos (acciones) que describen a una entidad 
específica. En lugar de usar índices numéricos, los objetos usan "claves" (nombres) 
para acceder a la información, lo que hace que el código sea mucho más fácil de leer.

*Conceptos fundamentales:

*Propiedades: 
Son las características o variables del objeto (ej. color, marca, precio).
Métodos: Son funciones que viven dentro del objeto y definen lo que el objeto puede 
hacer (ej. encender, calcularIva, saludar).

*Estructura Clave-Valor: 
Los objetos se definen con llaves { } y cada dato se guarda 
asociando un nombre (clave) con su contenido (valor).

*Importancia: 
En el desarrollo Full Stack, casi toda la información que viaja desde una 
base de datos o una API llega en formato de objeto (JSON). Dominarlos es obligatorio.
*/

// *Ejemplo práctico: Representación de un Celular

// * CONFIGURACIÓN INICIAL (Objeto)
const celular = {
    marca: "Samsung",
    modelo: "S24",
    // Método: acción que el objeto puede ejecutar
    encender: function() { 
        return "El sistema operativo se está iniciando... Celular prendido."; 
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
// * Resultado: ["Samsung", "S24", function encender()]
// * Muestra los valores del objeto, incluyendo el método como función



/*
* Explicación:
El programa define un objeto llamado "celular" que contiene información (marca y modelo)
y también una acción (encender). Primero se ejecuta el método encender(), demostrando
que el objeto puede realizar acciones propias.

Luego, con Object.keys(), se obtienen los nombres de las propiedades del objeto,
lo que permite conocer su estructura. Después, con Object.values(), se accede a los
valores almacenados, incluyendo la función como parte del contenido del objeto.

Esto muestra cómo los objetos permiten agrupar datos y comportamiento en una sola
estructura, facilitando la organización y manipulación de la información.
*/


// ==========================================
// * TAREA 2
// ==========================================

/*
*1. INVESTIGACIÓN: LOS CICLOS (LOOPS)
Los ciclos o bucles son estructuras de control fundamentales que permiten ejecutar un 
mismo bloque de código de forma repetida mientras se cumpla una condición específica. 
Su función principal es la automatización: en lugar de escribir 100 veces la misma 
instrucción, usamos un ciclo para que la computadora lo haga por nosotros en milisegundos.

*En el desarrollo web, los ciclos son indispensables para:
Recorrer listas de datos (Arrays) que vienen de una base de datos.
Crear elementos repetitivos en el HTML (como las tarjetas de una tienda virtual).
Realizar cálculos acumulativos o procesar grandes cantidades de información.

Existen varios tipos de ciclos, pero los más usados cuando trabajamos con colecciones 
de datos son el 'for' tradicional (por su control total) y el 'for...of' (por su sencillez).
*/

// * CONFIGURACIÓN INICIAL (Array)
const equipos = ['Cali', 'América', 'Nacional'];

/*
* EJEMPLO 1: Ciclo 'for' tradicional
Es el más potente y flexible. Se compone de tres partes:

*1. Inicialización (let i = 0): 
Creamos un contador que empieza en cero.

*2. Condición (i < equipos.length): 
El ciclo sigue dando vueltas mientras el contador 
sea menor que el tamaño de la lista.

*3. Actualización (i++): 
El contador aumenta de uno en uno en cada vuelta.

Es ideal cuando necesitamos saber exactamente en qué posición (índice) estamos.

*/
for (let i = 0; i < equipos.length; i++) {
    console.log("Equipo en la posición " + i + ": " + equipos[i]);
}
// * Recorre el array mostrando cada equipo junto con su posición (índice)


/*
* EJEMPLO 2: Ciclo 'for...of'
Es una versión mucho más moderna y limpia introducida en ES6. Se usa específicamente 
para recorrer objetos iterables (como los Arrays). 

Aquí no necesitamos manejar contadores ni índices manualmente; el ciclo "extrae" 
directamente cada elemento de la lista en cada vuelta. Es el preferido cuando 
solo nos interesa el contenido y no la posición.
*/
for (const equipo of equipos) {
    console.log("Revisando a: " + equipo);
}
// * Recorre el array mostrando directamente cada elemento sin usar índices

/*
* Explicación:
El programa recorre un arreglo de equipos utilizando dos tipos de ciclos. 
Primero, con el ciclo 'for' tradicional, se accede a cada elemento mediante su índice 
(posición dentro del array), lo que permite conocer tanto la posición como el valor.

Luego, con el ciclo 'for...of', se recorre el mismo arreglo de forma más directa, 
obteniendo cada elemento sin necesidad de usar índices ni contadores.

Esto muestra dos formas de recorrer una lista: una con mayor control (usando índices y posiciones) 
y otra más simple y legible cuando solo interesa trabajar con los valores directamente. Ambos permiten automatizar 
procesos repetitivos y trabajar de manera eficiente con colecciones de datos.
*/


// ========================================================================================================
/*
*2. INVESTIGACIÓN: LAS PROMESAS EN JAVASCRIPT
Una Promesa es un objeto que representa el éxito o el fracaso de una operación asíncrona. 
En palabras sencillas, es como cuando pides comida en un restaurante: te dan un "ticket" 
(la promesa). El ticket te asegura que recibirás la comida (éxito) o que te avisarán 
si se acabó un ingrediente (error). Mientras tanto, puedes seguir hablando con tus 
amigos sin tener que quedarte parado frente a la cocina.

*Las promesas tienen tres estados posibles:

*Pendiente (Pending): 
Es el estado inicial, cuando la operación aún no termina.

*Cumplida (Fulfilled): 
La operación se completó con éxito y ya tenemos el dato.

*Rechazada (Rejected): 
La operación falló por algún motivo (error de red, dato no encontrado).

Gracias a las promesas, JavaScript puede realizar tareas pesadas (como consultar una base 
de datos o cargar una imagen) en "segundo plano", permitiendo que el resto de la página 
siga funcionando con fluidez.
*/


// * CONFIGURACIÓN INICIAL (Promesa simple)
const promesaEnvio = new Promise((resolve) => {
    resolve("¡El paquete ha sido entregado con éxito!");
});


/*
* EJEMPLO 1: Uso de .then()
.then() se ejecuta cuando la promesa se cumple correctamente (resolve).
*/
promesaEnvio.then((mensaje) => {
    console.log("Resultado: " + mensaje);
});
// * Muestra el mensaje cuando la promesa se resuelve con éxito



// * CONFIGURACIÓN INICIAL (Promesa con simulación de proceso)
const cargarDatosUsuario = new Promise((resolve, reject) => {
    const exito = true; // Simula si la operación será exitosa o fallida

    setTimeout(() => {
        if (exito) {
            resolve("Datos de usuario cargados correctamente.");
        } else {
            reject("Error: No se pudo conectar con el servidor.");
        }
    }, 2000);
});


/*
* EJEMPLO 2: Uso de .then() y .catch()
.then() maneja el resultado exitoso
.catch() maneja los errores si la promesa falla
*/
cargarDatosUsuario
    .then((respuesta) => {
        console.log("Éxito: " + respuesta);
    })
    .catch((error) => {
        console.log("Falla: " + error);
    });
// * Dependiendo del resultado, muestra éxito o error después de 2 segundos



/*
* Explicación:
El programa trabaja con promesas para manejar operaciones que no se ejecutan de forma inmediata.

En el primer ejemplo, la promesa se resuelve instantáneamente, por lo que el método .then()
recibe el resultado y lo muestra en consola.

En el segundo ejemplo, se simula una operación que tarda un tiempo en completarse. Aquí se
utiliza setTimeout para representar ese retraso. Dependiendo del valor de la variable "exito",
la promesa puede resolverse correctamente (resolve) o fallar (reject).

Luego, con .then() se maneja el caso exitoso, mientras que .catch() permite capturar y mostrar
el error si algo sale mal.

Esto demuestra cómo las promesas permiten manejar tareas asíncronas sin detener la ejecución
del programa, organizando el flujo de resultados de forma clara y controlada.
*/


// ========================================================================================================
/*
*3. INVESTIGACIÓN: LA FUNCIÓN FETCH
La función fetch() es una herramienta nativa de JavaScript que revolucionó la forma en 
que las aplicaciones web consumen datos. Su propósito principal es realizar peticiones 
HTTP de forma asíncrona a recursos externos (servidores, archivos JSON o APIs). 

Antes de fetch, este proceso era mucho más complicado. Ahora, fetch nos permite "ir 
a buscar" información a través de internet sin tener que recargar la página del usuario.

*Conceptos clave de Fetch:

*Basado en Promesas: 
fetch() siempre devuelve una Promesa. Esto significa que podemos 
usar .then() y .catch() para manejar la respuesta del servidor.

*Dos pasos de conversión: 
Cuando fetch recibe la respuesta, primero obtenemos un objeto 
que representa la respuesta HTTP completa. Luego, debemos usar el método .json() 
para convertir esos datos crudos en un objeto de JavaScript que podamos manipular.

*Importancia en el desarrollo: 
Es la base de casi cualquier aplicación moderna, desde 
ver el clima en una app hasta cargar los posts de una red social en tiempo real.
*/

// * Ejemplo práctico: Consultando datos desde un archivo local (simulando una API)

// * CONFIGURACIÓN INICIAL (URL local)
const URL = './usuario.json';

console.log("Iniciando petición con fetch...");

fetch(URL)
    .then(respuesta => {
        // Verificamos si la respuesta del archivo fue exitosa
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo local.");
        }
        // Convertimos la respuesta a formato JSON (objeto usable en JS)
        return respuesta.json();
    })
    .then(usuario => {
        // Aquí ya tenemos el objeto de JavaScript listo para usar
        console.log("Datos recibidos con éxito:");
        console.log("Nombre del usuario: " + usuario.name);
        console.log("Ciudad: " + usuario.address.city);
    })
    .catch(error => {
        // Si hay un error al cargar el archivo o procesar los datos
        console.error("Hubo un problema con la petición: ", error.message);
    });

// * Este mensaje se ejecuta primero porque fetch es asíncrono
console.log("Este mensaje aparece antes que los datos porque fetch trabaja de forma asíncrona.");


/*
* Explicación:
El programa utiliza fetch() para solicitar información desde un archivo local que simula
el comportamiento de una API. Esta operación no se ejecuta de forma inmediata, sino en
segundo plano, permitiendo que el resto del código continúe ejecutándose.

Primero, se envía la petición al archivo definido en la URL. Cuando el sistema obtiene
una respuesta, se recibe un objeto de tipo Response. En ese punto, se verifica si la
respuesta fue correcta mediante la propiedad "ok". Si ocurre un error, se interrumpe el
proceso lanzando una excepción.

Si la respuesta es válida, se realiza una segunda transformación usando el método .json(),
que convierte los datos en un objeto de JavaScript que ya se puede manipular.

Luego, en el siguiente bloque .then(), se accede directamente a los datos y se muestran
en consola, evidenciando cómo trabajar con información estructurada.

En caso de que ocurra algún problema, el bloque .catch() captura el error y muestra un
mensaje adecuado, evitando que el programa falle sin control.

Finalmente, el último console.log demuestra el comportamiento asíncrono de fetch, ya que
se ejecuta antes de que los datos sean cargados. Esto permite entender cómo JavaScript
puede manejar múltiples tareas sin bloquear la ejecución principal del programa.
*/



// ==========================================
// * CONCLUSIÓN Y BIBLIOGRAFÍA
// ==========================================

/* 
* CONCLUSIÓN:
La investigación realizada permite comprender cómo JavaScript gestiona la lógica 
mediante estructuras fundamentales como condicionales, operadores lógicos, arrays, 
objetos y ciclos, los cuales son esenciales para controlar el flujo de ejecución 
de cualquier programa.

Además, se logró entender el manejo de la asincronía a través de promesas y la función 
fetch, herramientas clave en el desarrollo web moderno, ya que permiten trabajar con 
datos externos sin bloquear la ejecución del programa.

En conjunto, estos conceptos forman la base para construir aplicaciones web dinámicas, 
interactivas y eficientes, permitiendo manipular datos, tomar decisiones y comunicarse 
con servidores de manera organizada. Dominar estos fundamentos es esencial para avanzar 
hacia niveles más complejos del desarrollo de software.
*/

/* 
*BIBLIOGRAFÍA (Fuentes consultadas):
1. Plataforma educativa Q10 (Bootcamp BIT).
2. MDN Web Docs (Mozilla): Documentación oficial sobre Array, Object y Fetch.
3. JavaScript.info: Tutoriales sobre Promesas y Asincronía.
4. W3Schools: Guías de referencia para Operadores y Ciclos for/for-of.
5. Documentación técnica de ES6+: Estándares modernos de JavaScript.


/*                    
 * FIN DE LA TAREA 
*/

