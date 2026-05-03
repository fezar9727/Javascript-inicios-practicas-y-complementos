

/*  lo sgte es de BIT con el profe Sebastian Amaya */

/*     de ahora en adelante ya no se usara function, solo usaremos const */

/*     Funcion sin parametros  */

/*
const saludar = () => {
    console.log('Hola!!!');
}

saludar();
*/


//que son los backtics y como colocarlos en su teclado
const saludar = (nombre, apellido) => {
    // console.log('Hola ' + nombre);
    console.log(`Hola mi nombre es: ${ nombre } y mi apellido es: ${apellido}`);
};

saludar('milton', 'ramirez');
saludar('anderson', 'salamanca');
saludar('juan', 'botero');
saludar('pedro', 'gomez');


// forma larga
const suma = (num1, num2) => {
    console.log(`la suma de ${ num1 } y ${ num2 } es: ${ num1 + num2 }`);
};

suma(197, 698);


// forma corta
const sumar = (a, b=2) => {
    console.log(`reultado : ${a + b}`);
}

sumar(268, 406);
sumar(2, 46);
sumar(68, 4);
sumar(268, 406);
sumar(268,);

