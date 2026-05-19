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
// El array que almacena las herramientas en el inventario
const herramientas = ['Martillo', 'Destornillador'];

// Lista de herramientas permitidas — solo estas se pueden agregar o buscar
const herramientasPermitidas = [
    'Martillo', 'Destornillador', 'Llave inglesa', 'Taladro', 'Serrucho', 'Alicate', 'Nivel', 'Cinta métrica', 'Tijeras', 'Navaja',
    'Llave adjustable', 'Llave de tubo', 'Llave allen', 'Llave de cruz', 'Pala', 'Pico', 'Rastrillo', 'Azadón', 'Machete',
    'Cincel', 'Formón', 'Segueta', 'Sierra circular', 'Sierra caladora', 'Lijadora', 'Pulidora', 'Soldadora', 'Compresor', 'Pistola de silicona',
    'Flexómetro', 'Escuadra', 'Plomada', 'Paleta', 'Espátula', 'Pinza', 'Cortafríos', 'Punzón', 'Berbiquí', 'Gato hidráulico'
];

// Función para normalizar texto: convierte a minúsculas y elimina acentos
function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Función para preguntar al usuario por el nombre de una herramienta
function preguntarTexto(pregunta) {
    while (true) {
        // El prompt muestra la pregunta y la lista de herramientas permitidas para que el usuario elija
        const respuesta = prompt(pregunta + '\nHerramientas disponibles: ' + herramientasPermitidas.join(', '));

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        // .trim() elimina espacios en blanco al inicio y al final para evitar que "   " cuente como texto válido
        const respuestaLimpia = respuesta.trim();

        // Si el usuario no escribe nada, avisa y vuelve a preguntar automáticomente
        if (respuestaLimpia === '') {
            alert('Por favor escribe el nombre de la herramienta.');
            continue;
        }

        // .some() recorre la lista y verifica si alguna coincide
        // normalizar() elimina acentos y convierte a minúsculas para que no importe
        // si el usuario escribe "flexometro", "FLEXÓMETRO" o "Flexómetro"
        const esValida = herramientasPermitidas.some(h => normalizar(h) === normalizar(respuestaLimpia));

        // Si es una herramienta valida, la devuelve y sale del while, si no, avisa y vuelve a preguntar automáticamente
        if (esValida) {
            return respuestaLimpia;
        }

        // Si no está en la lista, avisa y vuelve a preguntar automáticamente
        alert(`"${respuestaLimpia}" no es una herramienta válida.\nEscribe una de la lista.`);
    }
}


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

// El usuario decide qué herramienta agregar al inventario
// En vez de tener el valor fijo en el código, ahora es dinámico e interactivo
const herramientaNueva = preguntarTexto('¿Qué herramienta quieres agregar al inventario?');

if (herramientaNueva !== null) {
    herramientas.push(herramientaNueva);
    // * Ahora el array tiene: ['Martillo', 'Destornillador', + lo que el usuario escribió]
    console.log(`Se agregó "${herramientaNueva}" al inventario.`);
    console.log('Inventario después de push(): ' + herramientas);
}


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

// Eliminamos el último elemento agregado y lo guardamos por si se necesita
// pop() no solo borra sino que devuelve el elemento eliminado
const herramientaEliminada = herramientas.pop();
// * Ahora el array queda nuevamente como: ['Martillo', 'Destornillador']
console.log(`Se eliminó "${herramientaEliminada}" del inventario.`);
console.log('Inventario después de pop(): ' + herramientas);


/*
*3. FUNCIÓN includes()
Introducida en versiones más modernas de JavaScript (ES6), esta función realiza 
una búsqueda interna para determinar si un valor específico existe dentro de la 
lista. Lo mejor es su simplicidad: devuelve un valor booleano (true o false).

*Uso común: 
Es perfecta para validaciones rápidas de seguridad o existencia. 
Por ejemplo, verificar si un nombre de usuario ya está en una lista de invitados 
o, en este caso, comprobar si una herramienta específica está disponible en el 
inventario antes de usarla o asignarla a una tarea.
*/

// El usuario decide qué herramienta buscar en el inventario
// Esto simula un buscador real de inventario
const herramientaBuscar = preguntarTexto('¿Qué herramienta quieres buscar en el inventario?');

if (herramientaBuscar !== null) {
    // includes() busca si el texto existe exactamente en el array
    // devuelve true si lo encuentra, false si no está
    if (herramientas.includes(herramientaBuscar)) {
        console.log(`"${herramientaBuscar}" está disponible en el inventario.`);
    } else {
        console.log(`"${herramientaBuscar}" NO está en el inventario.`);
    }
}

// Muestra el estado final del inventario después de todas las operaciones
console.log('Inventario final: ' + herramientas);

/* 
*Explicación:
El programa comienza con un arreglo inicial de herramientas y una lista de herramientas
permitidas. Para manejar las entradas del usuario de forma segura y reutilizable, se
creó la función preguntarTexto() que usa while(true) para repetir la pregunta hasta
obtener una respuesta válida. Esta función valida que el campo no esté vacío con
.trim(), y que la herramienta escrita exista en la lista permitida usando .some() con
normalizar() en ambos lados, para que no importe si el usuario escribe "FLEXOMETRO",
"flexómetro" o "Flexómetro" — los acentos y mayúsculas no afectan la búsqueda.
Si el usuario cancela el prompt, detecta null y detiene todo.
Si escribe algo que no está en la lista, avisa y vuelve a preguntar automáticamente.

Con esa validación activa, primero se agrega un nuevo elemento al final usando push(),
lo que aumenta el tamaño del array con exactamente lo que el usuario eligió de la lista.
Luego se utiliza pop() para eliminar el último elemento agregado, dejando el arreglo
como estaba originalmente. pop() no solo borra el dato sino que también lo devuelve,
por si se necesita guardarlo antes de que desaparezca del arreglo.

Después, con includes(), se verifica si un elemento específico existe dentro del array.
Si la condición se cumple, se muestra un mensaje indicando su disponibilidad.

Finalmente, se imprime el estado actual del arreglo. Esto muestra cómo se pueden
agregar, eliminar y validar datos dentro de una misma estructura, permitiendo gestionar
listas de forma dinámica, interactiva, segura y preparada para escalar.
*/


/* 
*4. INVESTIGACIÓN: ARRAYS DE OBJETOS (DATOS ESTRUCTURADOS)
Los Arrays de Objetos son el corazón de casi cualquier aplicación real. Si los arrays 
simples son una lista de "cosas", los arrays de objetos funcionan como una base de 
datos en miniatura, permitiendo almacenar múltiples propiedades para cada elemento.

En lugar de tener solo el nombre de una herramienta, ahora cada elemento puede 
contener su precio, stock, marca y un ID único para su identificación.

*Conceptos clave de los Arrays de Objetos:

*Estructura Clave-Valor: 
A diferencia de los arrays básicos, aquí cada posición contiene un objeto encerrado 
en llaves {}. Cada dato interno tiene una "clave" (el nombre del atributo) y un 
"valor" (el dato real).

*Centralización de Datos: 
Permite que toda la información de un producto o entidad viva en un solo lugar, 
facilitando la gestión de inventarios complejos o perfiles de usuario.

*Preparación para el mundo real: 
Este es el formato estándar (JSON) con el que se comunican las aplicaciones modernas 
y las bases de datos en la nube.
*/

// * CONFIGURACIÓN INICIAL (Array de Objetos)
// El inventario de herramientas ahora es un array de objetos, donde cada objeto representa una herramienta con varias propiedades
const inventario = [
    { id: 1, nombre: 'Martillo',      precio: 25000,  stock: 10, categoria: 'Manual'    },
    { id: 2, nombre: 'Taladro',       precio: 180000, stock: 5,  categoria: 'Eléctrica' },
    { id: 3, nombre: 'Llave Inglesa', precio: 15000,  stock: 15, categoria: 'Manual'    },
    { id: 4, nombre: 'Serrucho',      precio: 35000,  stock: 8,  categoria: 'Manual'    },
    { id: 5, nombre: 'Lijadora',      precio: 120000, stock: 3,  categoria: 'Eléctrica' }
];

// Lista de nombres válidos extraída del inventario para validar entradas del usuario sin tener que escribirlos a mano
const nombresValidos = inventario.map(item => item.nombre);

// Lista de categorías válidas extraída del inventario usando Set para eliminar duplicados
const categoriasValidas = [...new Set(inventario.map(item => item.categoria))];


// Función reutilizable que pide un nombre de producto válido
// Usa while(true) para repetir hasta obtener una respuesta válida
function preguntarNombreProducto(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta + '\nProductos disponibles: ' + nombresValidos.join(', '));

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        // .trim() elimina espacios al inicio y al final
        const respuestaLimpia = respuesta.trim();

        if (respuestaLimpia === '') {
            alert('Por favor escribe el nombre de un producto.');
            continue;
        }

        // .find() recorre el array y verifica si alguno coincide
        //  normalizar() elimina acentos y convierte a minúsculas para que no importe
        // si el usuario escribe "america", "AMÉRICA" o "América" 
        const productoValido = inventario.find(item => normalizar(item.nombre) === normalizar(respuestaLimpia));

        if (productoValido) {
            return productoValido.nombre;
        }

        // Si no se encuentra, avisa y vuelve a preguntar automáticamente
        alert(`"${respuestaLimpia}" no existe en el inventario.\nEscribe uno de la lista.`);
    }
}

// Función reutilizable que pide una categoría válida
// Usa while(true) para repetir hasta obtener una respuesta válida
function preguntarCategoria(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta + '\nCategorías disponibles: ' + categoriasValidas.join(', '));

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        // .trim() elimina espacios al inicio y al final para evitar que "   " cuente como texto válido
        const respuestaLimpia = respuesta.trim();

        // Si el usuario no escribe nada, avisa y vuelve a preguntar automáticomente
        if (respuestaLimpia === '') {
            alert('Por favor escribe una categoría.');
            continue;
        }

        // .find() recorre el array y verifica si alguno coincide
        //  normalizar() elimina acentos y convierte a minúsculas para que no importe
        // si el usuario escribe "electrica", "ELÉCTRICA" o "Eléctrica"
        const categoriaValida = categoriasValidas.find(c => normalizar(c) === normalizar(respuestaLimpia));

        // Si se encuentra, la devuelve y sale del while, si no, avisa y vuelve a preguntar automáticamente
        if (categoriaValida) {
            return categoriaValida;
        }

        // Si no se encuentra, avisa y vuelve a preguntar automáticamente   
        alert(`"${respuestaLimpia}" no es una categoría válida.\nEscribe una de la lista.`);
    }
}


/*
*1. ACCESO A LOS DATOS (Notación de Punto vs Corchetes)
Para llegar a un dato, primero accedemos al índice del array y luego usamos el 
punto (.) para entrar a la propiedad del objeto. Si la propiedad es dinámica 
o tiene espacios, usamos corchetes [].

*Ejemplo de acceso:
console.log(inventario[0].nombre); // Resultado: Martillo
*/
// Mostramos el nombre y precio del primer producto usando notación de punto para acceder a las propiedades del objeto dentro del array
console.log('* Acceso directo: ' + inventario[0].nombre + ' — $' + inventario[0].precio);


/*
*2. FUNCIÓN .find() 
A diferencia de .includes(), que solo devuelve true/false, .find() busca en el 
array y devuelve el OBJETO COMPLETO que coincida con la búsqueda.

*Uso común: 
Buscar un producto específico por su nombre o ID para mostrar sus detalles.
*/

// El usuario decide qué producto buscar en el inventario
const nombreBuscado = preguntarNombreProducto('¿Qué producto quieres buscar?');

if (nombreBuscado !== null) {
    // normalizar() para buscar sin importar mayúsculas ni acentos
    const productoEncontrado = inventario.find(item => normalizar(item.nombre) === normalizar(nombreBuscado));

    // Si se encuentra, muestra sus detalles, si no, el programa ya se encargó de avisar en la función preguntarNombreProducto()
    if (productoEncontrado) {
        console.log(`* Resultado find(): ${productoEncontrado.nombre} — Precio: $${productoEncontrado.precio} — Stock: ${productoEncontrado.stock}`);
    }
}


/*
*3. FUNCIÓN .filter()
Crea un nuevo array que contiene únicamente los objetos que cumplen con una 
condición específica. No modifica el array original.

*Uso común: 
Filtrar productos por categoría o mostrar solo artículos con stock disponible.
*/

// El usuario decide qué categoría filtrar
const categoriaFiltrada = preguntarCategoria('¿Qué categoría quieres filtrar?');

if (categoriaFiltrada !== null) {
    // normalizar() para filtrar sin importar mayúsculas ni acentos
    const productosFiltrados = inventario.filter(item => normalizar(item.categoria) === normalizar(categoriaFiltrada));
    console.log(`* Resultado filter() (${categoriaFiltrada}):`, productosFiltrados.map(p => p.nombre).join(', '));
}


/*
*4. FUNCIÓN .map()
Recorre el array y crea uno nuevo transformando los datos. Es ideal para extraer 
solo una parte de la información o realizar cálculos masivos.

*Uso común: 
Extraer solo los nombres para una lista o aplicar un descuento general a los precios.
*/

// .map() para extraer solo los nombres de todos los productos en el inventario, creando un nuevo array con solo esa información
const listaNombres = inventario.map(item => item.nombre);
console.log('* Resultado map() (Nombres): ' + listaNombres.join(', '));


/*
*5. CURIOSIDADES Y BUENAS PRÁCTICAS:

*Desestructuración (Destructuring): 
Permite extraer propiedades directamente en variables, haciendo el código más limpio.
const { nombre, precio } = inventario[1]; // Saca los datos del Taladro

*Referencia vs Valor: 
Al copiar un array de objetos con "const copia = inventario", ambos apuntan al 
mismo lugar. Para una copia segura, se usa el Spread Operator: [...inventario].

*Optional Chaining (?.): 
Evita que el programa explote si intentamos acceder a una propiedad que no existe:
console.log(inventario[0].proveedor?.nombre); // Devuelve undefined en vez de error.

*Acumulación con .reduce(): 
Sirve para obtener totales. Por ejemplo, sumar el precio de todo el inventario:
const total = inventario.reduce((acc, item) => acc + item.precio, 0);
*/


/* 
*Explicación de la Lógica:
El programa usa prompt() para pedirle datos al usuario directamente en el navegador,
haciendo el ejemplo interactivo y dinámico. Para garantizar que solo se ingresen datos
válidos, se definieron estructuras de datos reutilizables: nombresValidos (extraído
automáticamente del inventario con .map()) y categoriasValidas (extraído con .map() y
[...new Set()] para eliminar duplicados). Esto significa que si agregas un producto al
inventario, automáticamente queda disponible para buscar y filtrar sin tocar ninguna
otra parte del código.

Se creó la función normalizar() que combina .toLowerCase() con .normalize('NFD') para
eliminar acentos. Esto resuelve un problema real: "Eléctrica" y "ELECTRICA" no son
iguales para JavaScript, pero con normalizar() ambas se convierten a "electrica" antes
de comparar, haciendo el programa más robusto y amigable para el usuario.

Para manejar las entradas del usuario se crearon dos funciones reutilizables con
while(true): preguntarNombreProducto() y preguntarCategoria(). Ambas usan .trim() para
evitar espacios vacíos, normalizar() para comparar sin importar mayúsculas ni acentos,
y detectan null si el usuario cancela el prompt para detener todo sin errores.

Esta estructura evoluciona de listas simples a colecciones de datos complejas.
Mientras que en un array simple solo sabíamos que existía un "Martillo", aquí
podemos interactuar con su precio, stock e ID.

Con los datos validados, el programa demuestra cuatro operaciones fundamentales:
primero el acceso directo usando notación de punto (inventario[0].nombre) para llegar
a una propiedad específica de un objeto dentro del array. Luego .find() para localizar
una entidad única y devolver el objeto completo con todos sus datos — a diferencia de
.includes() que solo dice true o false. Después .filter() para segmentar el inventario
por categoría, creando un nuevo array sin modificar el original. Y finalmente .map()
para transformar el array y extraer solo los nombres de todos los productos.

La lógica se apoya en el uso de ID únicos para evitar duplicidad y asegurar que
el código sea escalable para sistemas que manejen miles de datos estructurados.
Las curiosidades y buenas prácticas del punto 5 muestran además herramientas avanzadas
como desestructuración, Spread Operator, Optional Chaining y .reduce(), que son
fundamentales en el desarrollo moderno con JavaScript.
*/