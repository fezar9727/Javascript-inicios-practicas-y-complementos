
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


