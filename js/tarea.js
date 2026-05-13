
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

// Función reutilizable que valida que el usuario escriba solo "si" o "no"
// Usa while(true) para repetir la pregunta hasta obtener una respuesta válida
function preguntarSiNo(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta);

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return false;
        }

        const respuestaLower = respuesta.toLowerCase();

        // Si es válida, retorna el resultado y sale del while
        if (respuestaLower === 'si' || respuestaLower === 'no') {
            return respuestaLower === 'si';
        }

        // Si escribió algo diferente, avisa y vuelve a preguntar
        alert('Por favor escribe solo: si o no');
    }
}

// Función reutilizable que valida que el usuario escriba un número
// Usa while(true) para repetir la pregunta hasta obtener un número válido
function preguntarNumero(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta);

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        // isNaN verifica si lo ingresado NO es un número
        if (!isNaN(respuesta) && respuesta.trim() !== '') {
            // parseInt convierte el texto "20" al número real 20
            return parseInt(respuesta);
        }

        // Si no es un número válido, avisa y vuelve a preguntar
        alert('Por favor escribe solo un número.');
    }
}

const tieneEntrada = preguntarSiNo('¿Tienes entrada? Escribe: si o no');
const edadPersona  = preguntarNumero('¿Cuántos años tienes?');

// * VALIDACIÓN Y ESTRUCTURA DE DECISIÓN
if (edadPersona === null) {
    // Si canceló la pregunta de la edad, no se ejecuta nada más
    console.log('Operación cancelada por el usuario.');
} else if (tieneEntrada) {
    // Si tiene entrada, pasa a la siguiente etapa
    if (edadPersona >= 18) {
        // Si es mayor de edad, accede al área VIP
        console.log("Bienvenido al evento, puedes pasar al área VIP.");
    } else {
        // Si tiene entrada pero es menor, va al área general
        console.log("Bienvenido, pero por ser menor de edad vas al área general.");
    }
} else {
    // Si no tiene entrada, no se ejecuta nada más
    console.log("No tienes entrada. Por favor dirígete a la taquilla.");
}

/*
* Explicación:
El programa usa prompt() para pedirle datos al usuario directamente en el navegador,
haciendo el ejemplo interactivo y dinámico. Para manejar las preguntas de forma
organizada y sin repetir código, se crearon dos funciones reutilizables y escalables:
preguntarSiNo() y preguntarNumero(). Ambas usan while(true) para repetir la pregunta
indefinidamente hasta obtener una respuesta válida, lo que es más seguro que la recursión.

preguntarSiNo() pregunta si tiene entrada (si o no). Con .toLowerCase() se convierte la
respuesta a minúsculas automáticamente, para que funcione sin importar si el usuario
escribe "SI", "Si" o "si". Si el usuario escribe algo diferente de "si" o "no", avisa
y vuelve a preguntar automáticamente sin avanzar. Si cancela el prompt, se detiene todo.

preguntarNumero() pregunta la edad. Primero verifica si el usuario canceló el prompt,
lo que devolvería null y rompería el código. Luego valida con isNaN() que lo ingresado
sea realmente un número — si escribe "julio" o deja el campo vacío, avisa y vuelve a
preguntar. Solo si es un número válido, lo convierte con parseInt() para que las
comparaciones matemáticas funcionen correctamente.

Solo si la edad es un número válido, el programa evalúa las condiciones. Primero
verifica si la persona tiene entrada — si no la tiene, se detiene ahí y muestra el
mensaje correspondiente sin revisar nada más. Si sí tiene entrada, pasa a la siguiente
etapa donde se valida la edad: si es mayor de edad accede al área VIP, de lo contrario
se le asigna el área general.

Esto muestra cómo los condicionales anidados permiten tomar decisiones paso a paso,
y cómo funciones reutilizables con while(true), prompt(), .toLowerCase(), isNaN() y
parseInt() hacen que el programa sea robusto, interactivo y preparado para manejar
cualquier error del usuario.
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

// Función reutilizable que valida que el usuario escriba solo "si" o "no"
// Usa while(true) para repetir la pregunta indefinidamente hasta obtener una respuesta válida
// Esto es más seguro que la recursión porque no tiene riesgo de colapsar el navegador
function preguntarSiNo(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta);

        // Si el usuario cancela el prompt, devuelve null y rompería el código
        // por eso se detecta antes de hacer cualquier otra operación
        if (respuesta === null) {
            alert('Operación cancelada.');
            return false;
        }

        // Ahora sí es seguro usar .toLowerCase() porque ya sabemos que no es null
        const respuestaLower = respuesta.toLowerCase();

        // Si el usuario escribió "si" o "no", retorna el resultado y sale del while
        if (respuestaLower === 'si' || respuestaLower === 'no') {
            return respuestaLower === 'si';
        }

        // Si escribió algo diferente, avisa y el while vuelve a preguntar automáticamente
        alert('Por favor escribe solo: si o no');
    }
}

const tieneCuenta      = preguntarSiNo('¿Tienes cuenta? Escribe: si o no');
const tieneSuscripcion = preguntarSiNo('¿Tienes suscripción activa? Escribe: si o no');
const esAdministrador  = preguntarSiNo('¿Eres administrador? Escribe: si o no');
const cuentaBloqueada  = preguntarSiNo('¿Tu cuenta está bloqueada? Escribe: si o no');


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
El programa usa prompt() para pedirle los datos al usuario directamente en el navegador,
haciendo el ejemplo interactivo. Para manejar las preguntas de forma organizada y sin
repetir código, se creó la función preguntarSiNo() que se reutiliza para cada pregunta.

Esta función usa while(true) para repetir la pregunta indefinidamente hasta obtener una
respuesta válida, lo que es más seguro que llamarse a sí misma (recursión). Primero
verifica si el usuario canceló el prompt, lo que devolvería null y rompería el código,
por eso se detecta antes de cualquier otra operación. Luego usa .toLowerCase() para
convertir la respuesta a minúsculas automáticamente, y así funciona sin importar si el
usuario escribe "SI", "Si" o "si". Si el usuario escribe algo diferente de "si" o "no",
avisa y vuelve a preguntar automáticamente sin avanzar.

Con esos datos validados, el programa evalúa varias condiciones combinadas. Primero 
verifica si el usuario cumple alguna de estas dos opciones: tener cuenta y suscripción 
activa (usuario premium) o ser administrador. Si se cumple al menos una de ellas, pasa 
a la siguiente validación, donde se revisa que la cuenta no esté bloqueada.

Solo si se cumple una condición de acceso (premium o administrador) y además la cuenta
está activa, se concede el acceso. En caso contrario, el sistema lo rechaza.

Esto muestra cómo los operadores lógicos permiten combinar múltiples condiciones en una
sola decisión, y cómo una función reutilizable con while(true), prompt() y .toLowerCase()
hace que el programa sea robusto, interactivo y preparado para manejar errores del usuario.
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
// El inventario base con el que inicia el programa
const herramientas = ['Martillo', 'Destornillador'];

// Lista de herramientas permitidas — solo estas se pueden agregar o buscar
const herramientasPermitidas = [
    'Martillo', 'Destornillador', 'Llave inglesa', 'Taladro', 'Serrucho', 'Alicate', 'Nivel', 'Cinta métrica', 'Tijeras', 'Navaja',
    'Llave adjustable', 'Llave de tubo', 'Llave allen', 'Llave de cruz', 'Pala', 'Pico', 'Rastrillo', 'Azadón', 'Machete',
    'Cincel', 'Formón', 'Segueta', 'Sierra circular', 'Sierra caladora', 'Lijadora', 'Pulidora', 'Soldadora', 'Compresor', 'Pistola de silicona',
    'Flexómetro', 'Escuadra', 'Plomada', 'Paleta', 'Espátula', 'Pinza', 'Cortafríos', 'Punzón', 'Berbiquí', 'Gato hidráulico'
];

// Función auxiliar que elimina acentos y convierte a minúsculas para comparar
// Así "Flexómetro", "FLEXOMETRO" o "flexometro" se tratan como lo mismo
// Esta función es compartida por toda la sección de arrays y arrays de objetos
function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Función reutilizable que pide texto al usuario y valida que no esté vacío
// y que además sea una herramienta de la lista permitida
// Usa while(true) para repetir hasta obtener una respuesta válida
function preguntarTexto(pregunta) {
    while (true) {
        // Muestra la lista de herramientas disponibles en el mismo prompt
        const respuesta = prompt(pregunta + '\nHerramientas disponibles: ' + herramientasPermitidas.join(', '));

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        // .trim() elimina espacios en blanco al inicio y al final
        // Si después de limpiar espacios queda algo, es válido
        const respuestaLimpia = respuesta.trim();

        // .trim() también evita que "   " cuente como texto válido
        if (respuestaLimpia === '') {
            alert('Por favor escribe el nombre de la herramienta.');
            continue;
        }

        // .some() recorre la lista y verifica si alguna coincide
        // normalizar() elimina acentos y convierte a minúsculas para que no importe
        // si el usuario escribe "flexometro", "FLEXÓMETRO" o "Flexómetro"
        const esValida = herramientasPermitidas.some(h => normalizar(h) === normalizar(respuestaLimpia));

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
*3.1 INVESTIGACIÓN: ARRAYS DE OBJETOS (DATOS ESTRUCTURADOS)
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
// El inventario ahora es una colección detallada de entidades
// Para escalar: solo agrega más objetos aquí, el resto del código no se toca
const inventario = [
    { id: 1, nombre: 'Martillo',      precio: 25000,  stock: 10, categoria: 'Manual'    },
    { id: 2, nombre: 'Taladro',       precio: 180000, stock: 5,  categoria: 'Eléctrica' },
    { id: 3, nombre: 'Llave Inglesa', precio: 15000,  stock: 15, categoria: 'Manual'    },
    { id: 4, nombre: 'Serrucho',      precio: 35000,  stock: 8,  categoria: 'Manual'    },
    { id: 5, nombre: 'Lijadora',      precio: 120000, stock: 3,  categoria: 'Eléctrica' }
];

// Lista de nombres válidos extraída del inventario — evita escribirla dos veces
// Si agregas un producto al inventario, automáticamente queda disponible para buscar
const nombresValidos = inventario.map(item => item.nombre);

// Lista de categorías válidas extraída del inventario
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

        // normalizar() elimina acentos y convierte a minúsculas para que no importe
        // si el usuario escribe "llave inglesa", "LLAVE INGLESA" o "Llave Inglesa"
        const productoValido = inventario.find(item => normalizar(item.nombre) === normalizar(respuestaLimpia));

        if (productoValido) {
            return productoValido.nombre;
        }

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

        const respuestaLimpia = respuesta.trim();

        if (respuestaLimpia === '') {
            alert('Por favor escribe una categoría.');
            continue;
        }

        // normalizar() elimina acentos y convierte a minúsculas para que no importe
        // si el usuario escribe "electrica", "ELÉCTRICA" o "Eléctrica"
        const categoriaValida = categoriasValidas.find(c => normalizar(c) === normalizar(respuestaLimpia));

        if (categoriaValida) {
            return categoriaValida;
        }

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
// Mostramos el primer producto del inventario usando notación de punto
console.log('* Acceso directo: ' + inventario[0].nombre + ' — $' + inventario[0].precio);


/*
*2. FUNCIÓN .find() 
A diferencia de .includes(), que solo devuelve true/false, .find() busca en el 
array y devuelve el OBJETO COMPLETO que coincida con la búsqueda.

*Uso común: 
Buscar un producto específico por su nombre o ID para mostrar sus detalles.
*/

// El usuario decide qué producto buscar
const nombreBuscado = preguntarNombreProducto('¿Qué producto quieres buscar?');

if (nombreBuscado !== null) {
    // normalizar() para búsqueda sin importar mayúsculas ni acentos
    const productoEncontrado = inventario.find(item => normalizar(item.nombre) === normalizar(nombreBuscado));

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

// .map() extrae solo los nombres de todos los productos del inventario
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
// Para escalar: solo agrega más equipos aquí, el resto del código no se toca
const equipos = ['Cali', 'América', 'Nacional', 'Millonarios', 'Junior', 'Santa Fe'];

// Función auxiliar que elimina acentos y convierte a minúsculas para comparar
// Así "América", "AMERICA" o "america" se tratan como lo mismo
function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Función reutilizable que pide un equipo válido de la lista
// Usa while(true) para repetir hasta obtener una respuesta válida
function preguntarEquipo(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta + '\nEquipos disponibles: ' + equipos.join(', '));

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return null;
        }

        // .trim() elimina espacios en blanco al inicio y al final
        const respuestaLimpia = respuesta.trim();

        if (respuestaLimpia === '') {
            alert('Por favor escribe el nombre de un equipo.');
            continue;
        }

        // normalizar() elimina acentos y convierte a minúsculas para que no importe
        // si el usuario escribe "america", "AMÉRICA" o "América"
        const equipoValido = equipos.find(e => normalizar(e) === normalizar(respuestaLimpia));

        if (equipoValido) {
            return equipoValido;
        }

        alert(`"${respuestaLimpia}" no es un equipo válido.\nEscribe uno de la lista.`);
    }
}

// El usuario elige el equipo que quiere buscar
const equipoBuscado = preguntarEquipo('¿Qué equipo quieres buscar en la lista?');


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

if (equipoBuscado !== null) {
    console.log('\n--- Ciclo for tradicional ---');
    for (let i = 0; i < equipos.length; i++) {
        console.log("Equipo en la posición " + i + ": " + equipos[i]);
    }
    // * Recorre el array mostrando cada equipo junto con su posición (índice)

    // Muestra en qué posición está el equipo buscado
    const posicion = equipos.findIndex(e => normalizar(e) === normalizar(equipoBuscado));
    console.log(`\n"${equipoBuscado}" está en la posición ${posicion} de la lista.`);
}


/*
* EJEMPLO 2: Ciclo 'for...of'
Es una versión mucho más moderna y limpia introducida en ES6. Se usa específicamente 
para recorrer objetos iterables (como los Arrays). 

Aquí no necesitamos manejar contadores ni índices manualmente; el ciclo "extrae" 
directamente cada elemento de la lista en cada vuelta. Es el preferido cuando 
solo nos interesa el contenido y no la posición.
*/

if (equipoBuscado !== null) {
    console.log('\n--- Ciclo for...of ---');
    for (const equipo of equipos) {
        // Usamos normalizar() para comparar sin importar acentos ni mayúsculas
        if (normalizar(equipo) === normalizar(equipoBuscado)) {
            console.log(`✓ Encontrado: ${equipo}`);
        } else {
            console.log("Revisando a: " + equipo);
        }
    }
    // * Recorre el array mostrando directamente cada elemento sin usar índices
}

/*
* Explicación:
El programa usa prompt() para pedirle datos al usuario directamente en el navegador,
haciendo el ejemplo interactivo y dinámico. Para garantizar que solo se ingresen
equipos válidos, se creó la función preguntarEquipo() que usa while(true) para repetir
la pregunta hasta obtener una respuesta válida. Usa .trim() para evitar espacios vacíos,
normalizar() para que no importe si el usuario escribe "america", "AMÉRICA" o "América",
y detecta null si el usuario cancela el prompt para detener todo sin errores.

El programa recorre un arreglo de equipos utilizando dos tipos de ciclos.
Primero, con el ciclo 'for' tradicional, se accede a cada elemento mediante su índice 
(posición dentro del array), lo que permite conocer tanto la posición como el valor.
Adicionalmente, con .findIndex() se muestra en qué posición exacta está el equipo
que el usuario buscó, demostrando la utilidad del índice en situaciones reales.

Luego, con el ciclo 'for...of', se recorre el mismo arreglo de forma más directa, 
obteniendo cada elemento sin necesidad de usar índices ni contadores. Aquí se usa
normalizar() para identificar y destacar el equipo buscado mientras se recorre la lista.

Esto muestra dos formas de recorrer una lista: una con mayor control (usando índices y 
posiciones) y otra más simple y legible cuando solo interesa trabajar con los valores 
directamente. Ambos permiten automatizar procesos repetitivos y trabajar de manera 
eficiente con colecciones de datos, combinados con prompt(), normalizar() y while(true)
para hacerlo interactivo, robusto y preparado para escalar.
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

// Función reutilizable que valida que el usuario escriba solo "si" o "no"
// Usa while(true) para repetir hasta obtener una respuesta válida
function preguntarSiNo(pregunta) {
    while (true) {
        const respuesta = prompt(pregunta);

        // Si el usuario cancela el prompt, se detiene todo
        if (respuesta === null) {
            alert('Operación cancelada.');
            return false;
        }

        // .toLowerCase() para que no importe si escribe "SI", "Si" o "si"
        const respuestaLower = respuesta.toLowerCase();

        if (respuestaLower === 'si' || respuestaLower === 'no') {
            return respuestaLower === 'si';
        }

        // Si escribió algo diferente, avisa y vuelve a preguntar
        alert('Por favor escribe solo: si o no');
    }
}


/*
* EJEMPLO 1: Uso de .then()
.then() se ejecuta cuando la promesa se cumple correctamente (resolve).
*/

// * CONFIGURACIÓN INICIAL (Promesa simple)
// La promesa se resuelve instantáneamente con un mensaje fijo
const promesaEnvio = new Promise((resolve) => {
    resolve("¡El paquete ha sido entregado con éxito!");
});

promesaEnvio.then((mensaje) => {
    console.log("Resultado: " + mensaje);
});
// * Muestra el mensaje cuando la promesa se resuelve con éxito


/*
* EJEMPLO 2: Uso de .then() y .catch()
.then() maneja el resultado exitoso
.catch() maneja los errores si la promesa falla
El usuario decide si la operación será exitosa o fallida
*/

// El usuario controla si la operación tendrá éxito o fallará
const simulaExito = preguntarSiNo('¿Quieres que la carga de datos sea exitosa? Escribe: si o no');

// * CONFIGURACIÓN INICIAL (Promesa con simulación de proceso)
const cargarDatosUsuario = new Promise((resolve, reject) => {
    // setTimeout simula una operación que tarda 2 segundos en completarse
    setTimeout(() => {
        if (simulaExito) {
            resolve("Datos de usuario cargados correctamente.");
        } else {
            reject("Error: No se pudo conectar con el servidor.");
        }
    }, 2000);
});

cargarDatosUsuario
    .then((respuesta) => {
        // .then() se ejecuta si la promesa fue exitosa (resolve)
        console.log("Éxito: " + respuesta);
    })
    .catch((error) => {
        // .catch() se ejecuta si la promesa falló (reject)
        console.log("Falla: " + error);
    });
// * Dependiendo de lo que respondiste, muestra éxito o error después de 2 segundos

/*
* Explicación:
El programa usa prompt() para pedirle al usuario que decida si la operación
será exitosa o fallida, haciendo el ejemplo interactivo. La función preguntarSiNo()
usa while(true) para repetir hasta obtener una respuesta válida, .toLowerCase() para
que no importe si escribe "SI", "Si" o "si", y detecta null si cancela.

En el primer ejemplo, la promesa se resuelve instantáneamente con un mensaje fijo,
por lo que .then() recibe el resultado y lo muestra en consola de inmediato.

En el segundo ejemplo, se simula una operación que tarda 2 segundos en completarse
usando setTimeout. Dependiendo de lo que respondió el usuario, la promesa se resuelve
correctamente con resolve() o falla con reject(). Con .then() se maneja el caso
exitoso, mientras que .catch() captura y muestra el error si algo sale mal.

Esto demuestra cómo las promesas permiten manejar tareas asíncronas sin detener la
ejecución del programa, y cómo el usuario puede interactuar para ver ambos escenarios
posibles — éxito y falla — en tiempo real.
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

// Función reutilizable que pide un número de personaje válido
// Usa while(true) para repetir hasta obtener un número válido
// isNaN() valida que sea número y parseInt() lo convierte al número real
function preguntarNumeroPersonaje() {
    while (true) {
        const respuesta = prompt(
            '¿Qué personaje de Rick and Morty quieres consultar?\nEscribe un número del 1 al 826:'
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
            alert('El número debe estar entre 1 y 826.');
        } else {
            // Si escribió texto como "veinticinco", avisa y vuelve a preguntar
            alert('Por favor escribe solo un número.\nNo se acepta texto como "veinticinco".');
        }
    }
}

// * EJEMPLO 1: Fetch con archivo local (simulando una API)
// * CONFIGURACIÓN INICIAL (URL local)
const URL = './js/usuario.json';

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


// * EJEMPLO 2: Fetch con API real e interacción del usuario
// El usuario elige qué personaje consultar — aquí sí aplica prompt()
// porque la entrada del usuario ocurre ANTES de la petición asíncrona
const numeroPersonaje = preguntarNumeroPersonaje();

if (numeroPersonaje !== null) {
    console.log(`\nConsultando personaje #${numeroPersonaje}...`);

    fetch(`https://rickandmortyapi.com/api/character/${numeroPersonaje}`)
        .then(respuesta => {
            // Verificamos si la respuesta fue exitosa
            if (!respuesta.ok) {
                throw new Error("No se encontró el personaje.");
            }
            // Convertimos la respuesta a formato JSON
            return respuesta.json();
        })
        .then(personaje => {
            // Accedemos a las propiedades del objeto recibido
            console.log("\n--- Personaje encontrado ---");
            console.log("Nombre: "  + personaje.name);
            console.log("Estado: "  + personaje.status);
            console.log("Especie: " + personaje.species);
            console.log("Origen: "  + personaje.origin.name);
        })
        .catch(error => {
            // Si hay un error en la petición o en el proceso de datos
            console.error("Error con la API: " + error.message);
        });

    // * Este mensaje también se ejecuta antes que los datos de la API
    console.log("Petición enviada — esperando respuesta de la API...");
}

/*
* Explicación:
El programa tiene dos ejemplos de fetch para mostrar su versatilidad.

En el primer ejemplo, fetch() carga un archivo local que simula una API. La operación
no se ejecuta de forma inmediata sino en segundo plano, por eso el último console.log
aparece antes que los datos — eso es el comportamiento asíncrono de fetch.

En el segundo ejemplo, primero se usa prompt() con while(true) para pedirle al usuario
un número de personaje válido. isNaN() verifica que sea un número, parseInt() convierte
el texto "25" al número real 25, y se valida que esté en el rango 1-826. El prompt()
va antes del fetch() porque la entrada del usuario debe ocurrir antes de la petición.

En ambos casos, fetch() devuelve una Promesa. El primer .then() verifica si la respuesta
fue exitosa con la propiedad "ok". El segundo .then() convierte la respuesta con .json()
y accede a las propiedades del objeto. El .catch() captura cualquier error sin que el
programa falle sin control.

Esto demuestra cómo fetch() es la herramienta fundamental para consumir datos externos
en aplicaciones web modernas, tanto desde archivos locales como desde APIs reales.
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

