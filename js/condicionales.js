
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







