// // ============================================================
// //  📘 INVESTIGACIÓN #3 — UX, ALERTAS Y PERSONALIZACIÓN DE NAV
// // ============================================================

// //
// //  NOTA: Este archivo es .js para ser ejecutado con Node.js.
// //  El desarrollo teórico está documentado exhaustivamente dentro
// //  de los COMENTARIOS.
// //
// //  EJECUCIÓN: node angular-3.js
// //
// // ============================================================
// //
// //  ¿QUÉ ABARCA ESTA TERCERA ETAPA?
// //  ─────────────────────────────────────────────────────────
// //  1. Implementación de SweetAlert2: UX profesional para feedback.
// //  2. Interceptores para manejo global de errores y alertas.
// //  3. Personalización reactiva del Navbar basada en el estado (Signals).
// //  4. Integración de elementos en el Proyecto Final.
// //
// // ============================================================

// "use strict";

// // ============================================================
// //  📘 BLOQUE 1: IMPLEMENTACIÓN DE SWEETALERT2
// // ============================================================
// //
// //  ¿POR QUÉ SWEETALERT2?
// //  ─────────────────────────────────────────────────────────
// //  Los `alert()` nativos bloquean el hilo principal de ejecución
// //  del navegador y ofrecen una experiencia de usuario pobre.
// //  SweetAlert2 es asíncrono, altamente personalizable y mantiene
// //  la fluidez de la Single Page Application (SPA).
// //
// //  INSTALACIÓN:
// //  npm install sweetalert2
// //
// //  IMPLEMENTACIÓN EN EL COMPONENTE (Login.component.ts):
// //  ─────────────────────────────────────────────────────────
// /*
//     import Swal from 'sweetalert2';

//     // Para el caso de ÉXITO
//     const mostrarExito = (mensaje: string) => {
//         Swal.fire({
//             icon: 'success',
//             title: '¡Operación Exitosa!',
//             text: mensaje,
//             confirmButtonColor: '#3085d6',
//             timer: 2000
//         });
//     };

//     // Para el caso de ERROR
//     const mostrarError = (errorMsg: string) => {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: errorMsg,
//             footer: 'Inténtalo de nuevo o contacta a soporte.'
//         });
//     };
// */

// // ============================================================
// //  📘 BLOQUE 2: EL "NEXT" Y EL MANEJO GLOBAL DE ERRORES
// // ============================================================
// //
// //  Para no repetir el código de SweetAlert en cada componente, 
// //  debemos utilizar un INTERCEPTOR (HTTP Interceptor).
// //
// //  El interceptor captura las respuestas del servidor ANTES de 
// //  que lleguen al componente. Si el backend responde con un 401 
// //  o 403, el interceptor dispara la alerta automáticamente.
// //
// //  ESTRUCTURA DEL INTERCEPTOR (auth.interceptor.ts):
// //  ─────────────────────────────────────────────────────────
// /*
//     export const authInterceptor: HttpInterceptorFn = (req, next) => {
//         return next(req).pipe(
//             catchError((err: HttpErrorResponse) => {
//                 if (err.status === 401) {
//                     Swal.fire('Sesión caducada', 'Inicia sesión de nuevo', 'warning');
//                 }
//                 return throwError(() => err);
//             })
//         );
//     };
// */

// // ============================================================
// //  📘 BLOQUE 3: BARRAS DE NAVEGACIÓN REACTIVAS
// // ============================================================
// //
// //  El Navbar debe reaccionar al cambio de sesión instantáneamente.
// //  La mejor forma moderna es mediante el uso de SIGNALS en el servicio.
// //
// //  En AuthService:
// //  currentUser = signal<User | null>(null);
// //  isLoggedIn = computed(() => !!this.currentUser());
// //
// //  En NavbarComponent (HTML):
// //  ─────────────────────────────────────────────────────────
// /*
//     <nav>
//         <a routerLink="/home">Inicio</a>
        
//         @if (authService.isLoggedIn()) {
//             <a routerLink="/admin">Administración</a>
//             <button (click)="authService.logout()">Cerrar</button>
//         } @else {
//             <a routerLink="/login">Ingresar</a>
//         }
//     </nav>
// */

// // ============================================================
// //  📘 BLOQUE 4: INTEGRACIÓN FINAL EN PROYECTOS FINALES
// // ============================================================
// //
// //  CHECKLIST DE INTEGRACIÓN:
// //  1. [ ] ¿Los guards protegen todas las rutas internas?
// //  2. [ ] ¿SweetAlert está manejando el feedback en los forms?
// //  3. [ ] ¿El Navbar usa Signals para ocultar/mostrar elementos?
// //  4. [ ] ¿El `provideHttpClient()` está en `app.config.ts`?
// //
// //  CONSEJO PRO:
// //  Al personalizar barras de navegación, usa clases de CSS Grid
// //  para asegurar que en móviles el menú sea tipo "hamburguesa" 
// //  usando la misma lógica de `@if` con signals.
// //
// // ============================================================

// console.log("Investigación #3 cargada. Lista para implementar.");



// ============================================================
// 📘 INVESTIGACIÓN #3 — UX, ALERTAS Y PERSONALIZACIÓN DE NAV
// PARTE 1 DE 5
// ============================================================

"use strict";

// ============================================================
// INTRODUCCIÓN GENERAL
// ============================================================
//
// Cuando desarrollamos una aplicación web, nuestro objetivo no
// consiste únicamente en que el programa funcione correctamente.
// También debemos preocuparnos porque la aplicación sea agradable
// de utilizar, intuitiva, rápida y capaz de informar al usuario
// sobre todo lo que está ocurriendo.
//
// En el desarrollo moderno este conjunto de características se
// conoce como Experiencia de Usuario o User Experience (UX).
//
// Una buena UX permite que el usuario pueda realizar sus tareas
// sin confundirse, reciba mensajes claros cuando ocurre algún
// error y obtenga confirmaciones cuando una operación termina
// exitosamente.
//
// Imaginemos un sistema de inicio de sesión.
//
// El usuario escribe su correo electrónico y su contraseña.
//
// Existen varios posibles escenarios:
//
// • El inicio de sesión fue exitoso.
// • La contraseña es incorrecta.
// • El correo no existe.
// • El servidor dejó de responder.
// • Se perdió la conexión a Internet.
// • La sesión expiró.
//
// Si el sistema simplemente deja de funcionar o muestra un
// mensaje poco claro como:
//
// Error.
//
// el usuario no sabrá qué ocurrió.
//
// En cambio, una buena experiencia de usuario informa exactamente
// qué sucedió y, cuando es posible, ofrece una solución.
//
// Por ejemplo:
//
// ✓ Inicio de sesión correcto.
// ✓ Bienvenido nuevamente.
//
// o
//
// ❌ La contraseña es incorrecta.
// Intenta nuevamente.
//
// Este tipo de detalles hacen que una aplicación se perciba
// profesional.
//
// Angular proporciona muchas herramientas para construir
// aplicaciones robustas, pero la experiencia del usuario depende
// de cómo utilicemos esas herramientas.
//
// En esta investigación se estudiarán tres elementos muy
// importantes:
//
// 1. SweetAlert2.
// 2. HTTP Interceptors.
// 3. Navbar Reactivo mediante Signals.
//
// Estos tres componentes trabajan juntos para construir una
// aplicación moderna.
//
// El flujo normalmente es:
//
// Usuario
//      ↓
// Hace una acción
//      ↓
// Angular envía una petición HTTP
//      ↓
// El servidor responde
//      ↓
// El Interceptor analiza la respuesta
//      ↓
// SweetAlert informa el resultado
//      ↓
// El Navbar cambia automáticamente según el estado del usuario.
//
// Esta arquitectura evita repetir código y facilita el
// mantenimiento del proyecto.
//
// ============================================================
// BLOQUE 1
// IMPLEMENTACIÓN DE SWEETALERT2
// ============================================================
//
// ¿QUÉ ES SWEETALERT2?
//
// SweetAlert2 es una biblioteca de JavaScript especializada en
// mostrar ventanas emergentes modernas.
//
// Estas ventanas reciben el nombre de:
//
// Popups
//
// Modals
//
// Alertas personalizadas
//
// Su objetivo consiste en reemplazar las antiguas funciones:
//
// alert()
//
// confirm()
//
// prompt()
//
// que vienen incorporadas en todos los navegadores.
//
// ============================================================
// ¿POR QUÉ EXISTE SWEETALERT2?
// ============================================================
//
// Durante muchos años los navegadores utilizaron:
//
// alert("Hola");
//
// para mostrar mensajes.
//
// El problema es que estas ventanas poseen muchas limitaciones.
//
// Ejemplo:
//
// alert("Usuario registrado");
//
// El navegador mostrará una ventana sencilla.
//
// El usuario solamente puede presionar:
//
// OK
//
// Nada más.
//
// No puede cambiar colores.
//
// No puede insertar imágenes.
//
// No puede mostrar iconos.
//
// No puede aplicar animaciones.
//
// No puede personalizar botones.
//
// No puede modificar el diseño.
//
// Además:
//
// alert() detiene completamente la ejecución del navegador.
//
// Esto significa que mientras la alerta permanezca abierta:
//
// • No se puede escribir.
// • No se puede hacer scroll.
// • No se pueden pulsar botones.
// • No se ejecutan otras acciones.
//
// Técnicamente se dice que:
//
// alert() es una función BLOQUEANTE.
//
// Es decir:
//
// bloquea el hilo principal del navegador.
//
// Actualmente esto se considera una mala práctica para aplicaciones
// modernas.
//
// ============================================================
// ¿QUÉ ES EL HILO PRINCIPAL DEL NAVEGADOR?
// ============================================================
//
// Todos los navegadores poseen un proceso encargado de ejecutar
// JavaScript.
//
// Dicho proceso recibe el nombre de:
//
// Main Thread
//
// o
//
// Hilo Principal.
//
// Este hilo realiza múltiples tareas:
//
// ✓ Ejecutar JavaScript.
//
// ✓ Pintar la pantalla.
//
// ✓ Actualizar el DOM.
//
// ✓ Detectar clics.
//
// ✓ Procesar eventos.
//
// ✓ Ejecutar animaciones.
//
// Cuando utilizamos:
//
// alert();
//
// el navegador pausa completamente este hilo.
//
// Como consecuencia:
//
// No ocurre absolutamente nada hasta que el usuario cierre la
// ventana.
//
// Por esta razón:
//
// alert() prácticamente ha desaparecido de aplicaciones
// profesionales.
//
// ============================================================
// ¿QUÉ ES SWEETALERT2 ENTONCES?
// ============================================================
//
// SweetAlert2 NO bloquea el navegador.
//
// En lugar de utilizar las ventanas internas del navegador,
// crea una ventana HTML normal.
//
// Esto significa que realmente está creando:
//
// <div>
//     ventana bonita
// </div>
//
// con:
//
// HTML
//
// CSS
//
// JavaScript
//
// Como es una ventana HTML:
//
// Puede cambiar colores.
//
// Puede agregar imágenes.
//
// Puede usar Bootstrap.
//
// Puede utilizar animaciones.
//
// Puede incluir temporizadores.
//
// Puede mostrar barras de progreso.
//
// Puede contener formularios.
//
// Puede tener varios botones.
//
// Puede contener cualquier elemento HTML.
//
// Todo esto hace que la aplicación luzca mucho más profesional.
//
// ============================================================
// PRINCIPALES VENTAJAS DE SWEETALERT2
// ============================================================
//
// Entre las ventajas más importantes encontramos:
//
// ✔ Diseño moderno.
//
// Las ventanas poseen un aspecto agradable desde el primer momento.
//
// ------------------------------------------------------------
//
// ✔ Personalización.
//
// Podemos modificar:
//
// • Colores.
//
// • Tamaños.
//
// • Botones.
//
// • Iconos.
//
// • Fuentes.
//
// • Fondos.
//
// • Animaciones.
//
// ------------------------------------------------------------
//
// ✔ Asíncrono.
//
// No bloquea el navegador.
//
// El usuario continúa interactuando con la aplicación mientras la
// alerta permanece visible.
//
// ------------------------------------------------------------
//
// ✔ Fácil integración.
//
// Angular solamente necesita importar:
//
// import Swal from 'sweetalert2';
//
// y ya podemos comenzar a utilizarlo.
//
// ------------------------------------------------------------
//
// ✔ Compatible con Promesas.
//
// SweetAlert2 devuelve una Promesa.
//
// Esto permite esperar la respuesta del usuario.
//
// Por ejemplo:
//
// ¿Desea eliminar este registro?
//
// [Cancelar]
// [Eliminar]
//
// Dependiendo del botón presionado podremos ejecutar acciones
// diferentes.
//
// ============================================================
// INSTALACIÓN
// ============================================================
//
// SweetAlert2 se instala mediante npm.
//
// npm install sweetalert2
//
// ¿Qué hace este comando?
//
// npm significa:
//
// Node Package Manager.
//
// Es el administrador oficial de paquetes de Node.js.
//
// Cuando ejecutamos:
//
// npm install sweetalert2
//
// ocurren varias cosas:
//
// 1.
//
// npm busca la biblioteca en Internet.
//
// 2.
//
// Descarga todos sus archivos.
//
// 3.
//
// Los guarda dentro de:
//
// node_modules/
//
// 4.
//
// Actualiza automáticamente:
//
// package.json
//
// agregando:
//
// "sweetalert2"
//
// como dependencia del proyecto.
//
// Esto significa que cualquier desarrollador que descargue nuestro
// proyecto podrá instalar la misma biblioteca simplemente ejecutando:
//
// npm install
//
// ============================================================
// IMPORTACIÓN EN ANGULAR
// ============================================================
//
// Después de instalar la biblioteca debemos importarla en el
// componente donde la utilizaremos.
//
// import Swal from 'sweetalert2';
//
// ¿Qué significa esta línea?
//
// import
//
// indica que queremos utilizar código definido en otro archivo.
//
// Swal
//
// será el nombre que utilizaremos dentro del componente.
//
// from
//
// indica desde qué paquete proviene.
//
// 'sweetalert2'
//
// corresponde al paquete instalado mediante npm.
//
// Gracias a esta importación podremos escribir:
//
// Swal.fire(...)
//
//
// En la siguiente parte estudiaremos:
//
// • Swal.fire()
// • Todos sus parámetros.
// • Iconos.
// • Botones.
// • Temporizadores.
// • Confirmaciones.
// • Promesas.
// • Personalización completa.
// • Buenas prácticas.
// • Errores comunes.
// • Ejemplos reales de Login y Registro.
//
// ============================================================

console.log("Investigación #3 - Parte 1 completada.");

// ============================================================
// 📘 INVESTIGACIÓN #3 — UX, ALERTAS Y PERSONALIZACIÓN DE NAV
// PARTE 2 DE 5
// ============================================================

"use strict";

// ============================================================
// CONTINUACIÓN DEL BLOQUE 1
// SWEETALERT2
// ============================================================
//
// En la primera parte aprendimos:
//
// ✔ Qué es SweetAlert2.
//
// ✔ Por qué reemplaza a alert().
//
// ✔ Qué ventajas ofrece.
//
// ✔ Cómo instalarlo.
//
// ✔ Cómo importarlo.
//
// Ahora estudiaremos la función más importante de toda la
// biblioteca:
//
// Swal.fire()
//
// Esta función es el corazón de SweetAlert2.
//
// Todas las ventanas emergentes que aparecen en pantalla son
// creadas mediante ella.
//
// ============================================================
// ¿QUÉ ES Swal.fire()?
// ============================================================
//
// Swal.fire() es un método (función perteneciente al objeto Swal)
// encargado de construir y mostrar una ventana emergente.
//
// Su sintaxis general es:
//
// Swal.fire({
//      propiedad: valor,
//      propiedad: valor,
//      propiedad: valor
// });
//
// Observemos algo importante.
//
// Entre los paréntesis aparece:
//
// {
//
// }
//
// Esto significa que estamos enviando un OBJETO.
//
// En JavaScript un objeto es una estructura formada por pares:
//
// propiedad : valor
//
// Por ejemplo:
//
// {
//      nombre: "Fernando",
//      edad: 22,
//      activo: true
// }
//
// SweetAlert2 utiliza exactamente esta misma idea.
//
// Cada propiedad controla una parte de la ventana.
//
// ============================================================
// ¿QUÉ OCURRE INTERNAMENTE CUANDO EJECUTAMOS Swal.fire()?
// ============================================================
//
// El proceso puede resumirse así:
//
// Nuestro código
//
//      │
//
//      ▼
//
// Swal.fire(...)
//
//
//      │
//
//      ▼
//
// SweetAlert2 interpreta todas las propiedades.
//
//      │
//
//      ▼
//
// Construye el HTML.
//
//      │
//
//      ▼
//
// Agrega estilos CSS.
//
//      │
//
//      ▼
//
// Inserta animaciones.
//
//      │
//
//      ▼
//
// Muestra la ventana.
//
//      │
//
//      ▼
//
// Espera la interacción del usuario.
//
//      │
//
//      ▼
//
// Devuelve un resultado.
//
// Todo este proceso ocurre en apenas unas milésimas de segundo.
//
// ============================================================
// PROPIEDADES MÁS IMPORTANTES
// ============================================================
//
// SweetAlert2 posee decenas de propiedades.
//
// Sin embargo, existen algunas que prácticamente aparecen en todos
// los proyectos.
//
// Las estudiaremos una por una.
//
// ============================================================
// title
// ============================================================
//
// Define el título principal.
//
// Ejemplo:
//
// Swal.fire({
//      title: "Bienvenido"
// });
//
// Resultado:
//
// ------------------------------
// Bienvenido
// ------------------------------
//
// El título debe ser corto.
//
// Generalmente responde a:
//
// ¿Qué ocurrió?
//
// Algunos ejemplos:
//
// "Operación Exitosa"
//
// "Usuario Registrado"
//
// "Inicio de Sesión"
//
// "Acceso Denegado"
//
// "Registro Eliminado"
//
// ============================================================
// text
// ============================================================
//
// Muestra un mensaje debajo del título.
//
// Ejemplo:
//
// Swal.fire({
//      title: "Correcto",
//      text: "Los datos fueron almacenados."
// });
//
// Mientras title resume el evento,
//
// text proporciona información adicional.
//
// Por ejemplo:
//
// Título:
//
// "Compra realizada"
//
// Texto:
//
// "Tu pedido llegará en tres días."
//
// Esta separación mejora considerablemente la legibilidad.
//
// ============================================================
// html
// ============================================================
//
// En lugar de mostrar texto plano,
// SweetAlert2 también permite insertar HTML.
//
// Ejemplo:
//
// Swal.fire({
//      html: "<b>Bienvenido</b>"
// });
//
// Gracias a esto podemos utilizar:
//
// • Negritas.
//
// • Tablas.
//
// • Imágenes.
//
// • Formularios.
//
// • Listas.
//
// • Iconos.
//
// • Videos.
//
// Incluso podríamos insertar componentes bastante elaborados.
//
// Sin embargo:
//
// Debe utilizarse cuidadosamente.
//
// Si el contenido proviene del usuario,
// podría introducir código malicioso.
//
// Este tipo de ataques recibe el nombre de:
//
// Cross Site Scripting.
//
// Abreviado:
//
// XSS.
//
// Por ello,
// nunca debemos insertar HTML generado por el usuario sin antes
// validarlo.
//
// ============================================================
// icon
// ============================================================
//
// Probablemente sea la propiedad más utilizada.
//
// Define el icono principal.
//
// SweetAlert2 incorpora varios iconos predeterminados.
//
// success
//
// Indica éxito.
//
// Se utiliza cuando:
//
// ✔ Usuario registrado.
//
// ✔ Compra realizada.
//
// ✔ Datos guardados.
//
// ✔ Inicio de sesión correcto.
//
// Ejemplo:
//
// icon: "success"
//
// ------------------------------------------------------------
//
// error
//
// Indica fallo.
//
// Se utiliza cuando:
//
// ❌ Contraseña incorrecta.
//
// ❌ Error del servidor.
//
// ❌ Usuario inexistente.
//
// Ejemplo:
//
// icon: "error"
//
// ------------------------------------------------------------
//
// warning
//
// Advierte al usuario.
//
// Se utiliza antes de ejecutar acciones importantes.
//
// Por ejemplo:
//
// ¿Está seguro de eliminar este registro?
//
// icon: "warning"
//
// ------------------------------------------------------------
//
// info
//
// Se utiliza para mostrar información.
//
// Ejemplo:
//
// "Nueva actualización disponible."
//
// ------------------------------------------------------------
//
// question
//
// Se utiliza cuando esperamos una respuesta.
//
// Ejemplo:
//
// ¿Desea guardar los cambios?
//
// ============================================================
// confirmButtonText
// ============================================================
//
// Cambia el texto del botón principal.
//
// Por defecto aparece:
//
// OK
//
// Pero podemos personalizarlo.
//
// Ejemplo:
//
// confirmButtonText: "Aceptar"
//
// o
//
// confirmButtonText: "Ingresar"
//
// o
//
// confirmButtonText: "Continuar"
//
// Esto mejora considerablemente la experiencia del usuario.
//
// ============================================================
// confirmButtonColor
// ============================================================
//
// Permite cambiar el color.
//
// Ejemplo:
//
// confirmButtonColor: "#3085d6"
//
// Generalmente:
//
// Azul
//
// significa:
//
// Acción principal.
//
// Verde:
//
// Operación correcta.
//
// Rojo:
//
// Acción peligrosa.
//
// ============================================================
// timer
// ============================================================
//
// Hace que la ventana desaparezca automáticamente.
//
// Ejemplo:
//
// timer: 2000
//
// El número representa:
//
// milisegundos.
//
// Recordemos:
//
// 1000 ms = 1 segundo.
//
// Entonces:
//
// 2000 ms = 2 segundos.
//
// 5000 ms = 5 segundos.
//
// 10000 ms = 10 segundos.
//
// Esta propiedad resulta muy útil cuando:
//
// No esperamos ninguna respuesta del usuario.
//
// Por ejemplo:
//
// Login exitoso.
//
// Archivo guardado.
//
// Registro actualizado.
//
// ============================================================
// timerProgressBar
// ============================================================
//
// Muestra una barra indicando cuánto tiempo falta para cerrar
// automáticamente.
//
// Ejemplo:
//
// timerProgressBar: true
//
// Esta pequeña animación ayuda al usuario a comprender que la
// ventana desaparecerá sola.
//
// ============================================================
// position
// ============================================================
//
// Define dónde aparecerá la alerta.
//
// Ejemplos:
//
// center
//
// top
//
// bottom
//
// top-end
//
// bottom-start
//
// etc.
//
// Normalmente:
//
// center
//
// es la posición más utilizada.
//
// ============================================================
// toast
// ============================================================
//
// SweetAlert2 también permite crear notificaciones pequeñas.
//
// No todas las alertas deben ocupar el centro de la pantalla.
//
// Algunas aplicaciones utilizan mensajes discretos.
//
// Ejemplo:
//
// ✓ Producto agregado.
//
// ✓ Cambios guardados.
//
// ✓ Archivo descargado.
//
// Estas pequeñas notificaciones reciben el nombre de:
//
// Toast.
//
// Se activan mediante:
//
// toast: true
//
// Suelen aparecer en una esquina y desaparecer automáticamente.
//
// Son muy utilizadas en:
//
// Gmail.
//
// YouTube.
//
// GitHub.
//
// Facebook.
//
// Discord.
//
// ============================================================
// showConfirmButton
// ============================================================
//
// Controla si el botón principal será visible.
//
// true
//
// El botón aparece.
//
// false
//
// El botón desaparece.
//
// Esto resulta útil cuando:
//
// La ventana se cerrará automáticamente mediante timer.
//
// No tiene sentido pedirle al usuario que pulse un botón.
//
// ============================================================
// EJEMPLO COMPLETO
// ============================================================

/*

Swal.fire({

    icon: "success",

    title: "Inicio de sesión exitoso",

    text: "Bienvenido nuevamente.",

    confirmButtonText: "Continuar",

    confirmButtonColor: "#3085d6",

    timer: 3000,

    timerProgressBar: true

});

*/

// Analicemos línea por línea.
//
// icon
//
// Muestra un icono verde.
//
// ------------------------------------
//
// title
//
// Informa qué ocurrió.
//
// ------------------------------------
//
// text
//
// Agrega una explicación.
//
// ------------------------------------
//
// confirmButtonText
//
// Cambia el nombre del botón.
//
// ------------------------------------
//
// confirmButtonColor
//
// Personaliza el diseño.
//
// ------------------------------------
//
// timer
//
// Cierra automáticamente.
//
// ------------------------------------
//
// timerProgressBar
//
// Muestra el tiempo restante.
//
// ============================================================
// BUENAS PRÁCTICAS
// ============================================================
//
// ✔ Utilizar títulos cortos.
//
// ✔ Escribir mensajes fáciles de entender.
//
// ✔ Utilizar iconos adecuados.
//
// ✔ No abusar de las alertas.
//
// ✔ Mostrar únicamente información importante.
//
// ✔ Utilizar colores coherentes.
//
// ✔ Evitar mensajes técnicos.
//
// Incorrecto:
//
// SQLException: ORA-12541
//
// Correcto:
//
// No fue posible conectar con el servidor.
//
// Intente nuevamente más tarde.
//
// El usuario final no necesita conocer detalles técnicos.
//
// ============================================================
// ERRORES COMUNES
// ============================================================
//
// Error 1.
//
// Mostrar una alerta por cada acción.
//
// Demasiadas ventanas terminan molestando al usuario.
//
// ------------------------------------------------------------
//
// Error 2.
//
// Utilizar textos demasiado largos.
//
// Una alerta debe ser breve.
//
// Si se necesita mucha información,
// probablemente sea mejor abrir otra pantalla.
//
// ------------------------------------------------------------
//
// Error 3.
//
// Utilizar iconos incorrectos.
//
// Por ejemplo:
//
// Mostrar "success" cuando realmente ocurrió un error.
//
// Esto genera confusión.
//
// ------------------------------------------------------------
//
// Error 4.
//
// No controlar el tiempo.
//
// Algunas alertas deberían desaparecer automáticamente.
//
// Otras necesitan esperar la decisión del usuario.
//
// Elegir correctamente entre ambas opciones mejora la experiencia
// de uso.

// ============================================================

console.log("Investigación #3 - Parte 2 completada.");

// ============================================================
// 📘 INVESTIGACIÓN #3 — UX, ALERTAS Y PERSONALIZACIÓN DE NAV
// PARTE 3 DE 5
// ============================================================

"use strict";

// ============================================================
// CONTINUACIÓN DEL BLOQUE 1
// SWEETALERT2
// ============================================================
//
// Hasta este momento hemos aprendido:
//
// ✔ Qué es SweetAlert2.
//
// ✔ Cómo instalarlo.
//
// ✔ Cómo importar la librería.
//
// ✔ Qué hace Swal.fire().
//
// ✔ Las propiedades más importantes.
//
// Ahora estudiaremos una característica extremadamente importante:
//
// Las PROMESAS.
//
// Gracias a ellas SweetAlert2 puede esperar la decisión del usuario
// sin detener el funcionamiento del navegador.
//
// ============================================================
// ¿QUÉ ES UNA PROMESA?
// ============================================================
//
// Antes de entender SweetAlert2 debemos comprender qué es una
// Promesa en JavaScript.
//
// Una Promesa (Promise) es un objeto especial cuyo propósito es
// representar el resultado de una operación que aún no ha terminado.
//
// En otras palabras:
//
// Una promesa significa:
//
// "Todavía no tengo la respuesta, pero la tendré más adelante."
//
// Pensemos en un ejemplo cotidiano.
//
// Supongamos que realizamos una compra por Internet.
//
// En ese momento:
//
// • El pedido fue enviado.
// • El pago fue recibido.
// • El paquete aún no llega.
//
// Nosotros esperamos.
//
// Horas después:
//
// El paquete llega.
//
// Exactamente eso hace una Promesa.
//
// Mientras el resultado aún no existe,
// JavaScript continúa ejecutando el resto del programa.
//
// Cuando finalmente aparece el resultado,
// la Promesa avisa automáticamente.
//
// ============================================================
// ¿POR QUÉ SWEETALERT2 UTILIZA PROMESAS?
// ============================================================
//
// Imaginemos una ventana:
//
// ¿Desea eliminar este usuario?
//
// [Cancelar]
//
// [Eliminar]
//
// El programa necesita esperar la decisión del usuario.
//
// Pero...
//
// ¿Debe detener toda la aplicación?
//
// No.
//
// Mientras el usuario piensa:
//
// • Puede seguir funcionando la interfaz.
//
// • Continúan ejecutándose animaciones.
//
// • El navegador sigue respondiendo.
//
// Cuando finalmente el usuario presiona un botón,
// SweetAlert2 devuelve una Promesa indicando cuál fue la decisión.
//
// ============================================================
// EL MÉTODO then()
// ============================================================
//
// Las Promesas utilizan un método llamado:
//
// then()
//
// Su significado es:
//
// "Cuando termine esta operación, ejecuta este código."
//
// Ejemplo:
//
// Swal.fire({...}).then((resultado)=>{
//
//      // código
//
// });
//
// Analicemos cada parte.
//
// Swal.fire(...)
//
//
// Muestra la ventana.
//
// ------------------------------------------------------------
//
// then()
//
//
// Espera hasta que el usuario haga algo.
//
// ------------------------------------------------------------
//
// resultado
//
//
// Contiene la respuesta.
//
// ============================================================
// EJEMPLO COMPLETO
// ============================================================

/*

Swal.fire({

    title: "¿Eliminar usuario?",

    text: "Esta acción no puede deshacerse.",

    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Sí, eliminar",

    cancelButtonText: "Cancelar"

}).then((resultado)=>{

    if(resultado.isConfirmed){

        console.log("Eliminar usuario");

    }

});

*/

// ============================================================
// EXPLICACIÓN LÍNEA POR LÍNEA
// ============================================================
//
// title
//
// Pregunta al usuario.
//
// ------------------------------------------------------------
//
// text
//
// Explica las consecuencias.
//
// ------------------------------------------------------------
//
// icon
//
// Muestra una advertencia.
//
// ------------------------------------------------------------
//
// showCancelButton
//
// Agrega un botón Cancelar.
//
// Por defecto solamente existe un botón.
//
// Esta propiedad crea un segundo botón.
//
// ============================================================
// ¿QUÉ ES showCancelButton?
// ============================================================
//
// Valor:
//
// true
//
// Significa:
//
// Mostrar botón Cancelar.
//
// Resultado:
//
// ---------------------------
//
// ¿Eliminar registro?
//
// [Cancelar]
//
// [Eliminar]
//
// ---------------------------
//
// Si colocamos:
//
// false
//
// únicamente aparecerá:
//
// [Aceptar]
//
// ============================================================
// confirmButtonText
// ============================================================
//
// Personaliza el botón principal.
//
// En este caso:
//
// "Sí, eliminar"
//
// Esto evita mensajes ambiguos.
//
// Es mucho mejor que mostrar solamente:
//
// OK
//
// ============================================================
// cancelButtonText
// ============================================================
//
// Cambia el texto del botón secundario.
//
// Ejemplo:
//
// cancelButtonText: "No eliminar"
//
// o
//
// cancelButtonText: "Volver"
//
// o
//
// cancelButtonText: "Cancelar"
//
// ============================================================
// ¿QUÉ ES resultado?
// ============================================================
//
// Cuando el usuario hace clic,
// SweetAlert2 devuelve un objeto.
//
// Ese objeto contiene información sobre la decisión tomada.
//
// Por ejemplo:
//
// resultado
//
// puede contener:
//
// isConfirmed
//
// isDenied
//
// isDismissed
//
// Cada propiedad representa una acción diferente.
//
// ============================================================
// isConfirmed
// ============================================================
//
// Vale:
//
// true
//
// cuando el usuario acepta.
//
// Ejemplo:
//
// [Sí]
//
// entonces:
//
// resultado.isConfirmed
//
// será:
//
// true
//
// En ese momento podemos:
//
// eliminar datos.
//
// guardar información.
//
// enviar formularios.
//
// realizar compras.
//
// ============================================================
// isDismissed
// ============================================================
//
// Vale:
//
// true
//
// cuando la ventana se cierra.
//
// Puede ocurrir porque:
//
// • El usuario presionó ESC.
//
// • Pulsó fuera de la ventana.
//
// • Presionó Cancelar.
//
// Esto también debe controlarse.
//
// ============================================================
// ¿POR QUÉ ES IMPORTANTE CONFIRMAR?
// ============================================================
//
// Existen acciones que no deberían ejecutarse inmediatamente.
//
// Ejemplos:
//
// Eliminar un usuario.
//
// Eliminar una factura.
//
// Vaciar la papelera.
//
// Cerrar una sesión.
//
// Borrar una fotografía.
//
// Formatear un disco.
//
// Todas estas operaciones son potencialmente peligrosas.
//
// Una simple confirmación evita errores humanos.
//
// ============================================================
// FLUJO DE UNA CONFIRMACIÓN
// ============================================================
//
// Usuario
//
//      │
//
// Hace clic en Eliminar
//
//      │
//
//      ▼
//
// Swal.fire()
//
//      │
//
// Muestra la advertencia
//
//      │
//
// Espera
//
//      │
//
// Usuario responde
//
//      │
//
//      ▼
//
// then()
//
//      │
//
// isConfirmed?
//
//      │
//
// Sí
//
//      ▼
//
// Ejecutar eliminación
//
// ============================================================
// ¿POR QUÉ NO EJECUTAR LA ELIMINACIÓN DIRECTAMENTE?
// ============================================================
//
// Imaginemos:
//
// El usuario hace clic accidentalmente.
//
// Sin confirmación:
//
// El registro desaparece.
//
// Con confirmación:
//
// El usuario tiene una segunda oportunidad.
//
// Esta es una regla muy importante de UX:
//
// Toda acción irreversible debería solicitar confirmación.
//
// ============================================================
// EJEMPLO EN ANGULAR
// ============================================================

/*

eliminarUsuario(id:number){

    Swal.fire({

        title:"¿Eliminar usuario?",

        text:"Esta acción no podrá deshacerse.",

        icon:"warning",

        showCancelButton:true,

        confirmButtonText:"Eliminar",

        cancelButtonText:"Cancelar"

    }).then((resultado)=>{

        if(resultado.isConfirmed){

            this.usuarioService.eliminar(id);

        }

    });

}

*/

// Observemos que:
//
// Primero aparece la alerta.
//
// Solamente si el usuario acepta,
// Angular llama al servicio.
//
// Esto evita eliminar información por accidente.
//
// ============================================================
// INICIO DEL BLOQUE 2
// HTTP INTERCEPTORS
// ============================================================
//
// Después de comprender cómo mostrar mensajes,
// surge una nueva pregunta:
//
// ¿Quién debería mostrar esas alertas?
//
// ¿Cada componente?
//
// ¿El Login?
//
// ¿El Registro?
//
// ¿El Perfil?
//
// ¿Los Productos?
//
// Si cada componente implementa sus propias alertas,
// terminaremos repitiendo muchísimo código.
//
// Este problema dio origen a:
//
// HTTP Interceptors.
//
// ============================================================
// ¿QUÉ ES UN HTTP INTERCEPTOR?
// ============================================================
//
// La palabra:
//
// Interceptor
//
// significa:
//
// "Algo que intercepta."
//
// Es decir:
//
// Se coloca en medio del recorrido.
//
// En Angular,
// un HTTP Interceptor es un mecanismo que observa TODAS las
// peticiones HTTP realizadas por la aplicación.
//
// Antes:
//
// Componente
//
// ↓
//
// HttpClient
//
// ↓
//
// Servidor
//
// Después:
//
// Componente
//
// ↓
//
// Interceptor
//
// ↓
//
// HttpClient
//
// ↓
//
// Servidor
//
// De regreso:
//
// Servidor
//
// ↓
//
// HttpClient
//
// ↓
//
// Interceptor
//
// ↓
//
// Componente
//
// Como puede verse,
// el interceptor observa tanto:
//
// • La petición.
//
// como:
//
// • La respuesta.
//
// Esto permite:
//
// ✔ Agregar Tokens JWT.
//
// ✔ Detectar errores.
//
// ✔ Registrar actividad.
//
// ✔ Mostrar SweetAlert.
//
// ✔ Redireccionar automáticamente.
//
// ✔ Renovar sesiones.
//
// Todo desde un único lugar.
//
// ============================================================

console.log("Investigación #3 - Parte 3 completada.");

// ============================================================
// 📘 INVESTIGACIÓN #3 — UX, ALERTAS Y PERSONALIZACIÓN DE NAV
// PARTE 4 DE 5
// ============================================================

"use strict";

// ============================================================
// BLOQUE 2
// HTTP INTERCEPTORS
// ============================================================
//
// En la parte anterior conocimos qué es un interceptor.
//
// Ahora estudiaremos su funcionamiento interno.
//
// Aunque al principio parezca complicado, realmente la idea es
// bastante sencilla.
//
// Un interceptor actúa como un "guardia" que revisa todas las
// peticiones HTTP antes de salir y todas las respuestas antes de
// llegar al componente.
//
// Es decir:
//
// Componente
//
//      │
//
//      ▼
//
// Interceptor
//
//      │
//
//      ▼
//
// HttpClient
//
//      │
//
//      ▼
//
// Servidor
//
// Cuando el servidor responde:
//
// Servidor
//
//      │
//
//      ▼
//
// HttpClient
//
//      │
//
//      ▼
//
// Interceptor
//
//      │
//
//      ▼
//
// Componente
//
// Gracias a esto podemos modificar tanto la petición como la
// respuesta sin cambiar el código de cada componente.
//
// ============================================================
// ¿POR QUÉ UTILIZAR UN INTERCEPTOR?
// ============================================================
//
// Supongamos que tenemos:
//
// LoginComponent
//
// RegistroComponent
//
// ProductosComponent
//
// UsuariosComponent
//
// PerfilComponent
//
// ComprasComponent
//
// Todos realizan peticiones HTTP.
//
// Si cada uno implementa:
//
// if(error.status==401){
//
//      Swal.fire(...)
//
// }
//
// estaríamos copiando exactamente el mismo código una y otra vez.
//
// Esto viola uno de los principios más importantes del desarrollo
// de software:
//
// DRY
//
// Don't Repeat Yourself.
//
// Es decir:
//
// No te repitas.
//
// Un interceptor permite escribir el código una sola vez.
//
// ============================================================
// ESTRUCTURA BÁSICA DE UN INTERCEPTOR
// ============================================================

/*

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    return next(req);

};

*/

// Aunque parece poco código,
// aquí ocurre muchísimo.
//
// Analicemos cada elemento.
//
// ============================================================
// HttpInterceptorFn
// ============================================================
//
// En Angular moderno ya no es obligatorio crear una clase.
//
// Antes:
//
// class AuthInterceptor implements HttpInterceptor
//
// Actualmente:
//
// HttpInterceptorFn
//
// permite crear interceptores mediante funciones.
//
// Esto hace el código:
//
// ✔ Más corto.
//
// ✔ Más limpio.
//
// ✔ Más fácil de leer.
//
// ✔ Más fácil de mantener.
//
// ============================================================
// req
// ============================================================
//
// "req"
//
// significa:
//
// Request.
//
// Es decir:
//
// La petición HTTP.
//
// Dentro de req encontramos información como:
//
// URL.
//
// Método HTTP.
//
// Encabezados.
//
// Body.
//
// Parámetros.
//
// Tokens.
//
// Cookies.
//
// Todo lo relacionado con la petición.
//
// Ejemplo:
//
// req.url
//
// devuelve:
//
// https://api.midominio.com/login
//
// ============================================================
// next
// ============================================================
//
// Esta es probablemente la parte que más confunde cuando se aprende
// Angular.
//
// ¿Qué significa next?
//
// next representa:
//
// "Continúa con la petición."
//
// Es decir:
//
// El interceptor revisó la petición.
//
// Ahora le dice a Angular:
//
// Continúa normalmente.
//
// En otras palabras:
//
// Usuario
//
// ↓
//
// Interceptor
//
// ↓
//
// next(req)
//
// ↓
//
// Servidor
//
// Si nunca llamáramos:
//
// next(req)
//
// la petición jamás llegaría al servidor.
//
// La aplicación se quedaría esperando para siempre.
//
// Por eso:
//
// next() es obligatorio.
//
// ============================================================
// ¿QUÉ DEVUELVE next()?
// ============================================================
//
// next(req)
//
// devuelve un Observable.
//
// Recordemos:
//
// Angular utiliza RxJS.
//
// Todas las peticiones HTTP trabajan mediante Observables.
//
// Esto significa que podemos seguir manipulando la respuesta.
//
// Por ejemplo:
//
// return next(req).pipe(...)
//
//
// Aquí aparece:
//
// pipe()
//
// ============================================================
// ¿QUÉ ES pipe()?
// ============================================================
//
// pipe() significa:
//
// "Toma el resultado y aplícale transformaciones."
//
// Podemos imaginarlo como una tubería.
//
// Petición
//
// ↓
//
// pipe()
//
// ↓
//
// Operador 1
//
// ↓
//
// Operador 2
//
// ↓
//
// Operador 3
//
// ↓
//
// Resultado Final
//
// Gracias a pipe() podemos:
//
// Capturar errores.
//
// Transformar datos.
//
// Registrar información.
//
// Agregar lógica.
//
// Filtrar resultados.
//
// Todo antes de que la respuesta llegue al componente.
//
// ============================================================
// catchError()
// ============================================================
//
// Uno de los operadores más utilizados dentro de pipe() es:
//
// catchError()
//
// Su objetivo consiste en:
//
// Capturar cualquier error HTTP.
//
// Ejemplo:
//
// return next(req).pipe(
//
//      catchError(...)
//
// );
//
// Si el servidor responde correctamente:
//
// catchError()
// no hace absolutamente nada.
//
// Pero si ocurre un error:
//
// 401
//
// 403
//
// 404
//
// 500
//
// entonces:
//
// catchError()
// entra en funcionamiento.
//
// ============================================================
// HttpErrorResponse
// ============================================================
//
// Cuando ocurre un error,
// Angular crea automáticamente un objeto llamado:
//
// HttpErrorResponse
//
// Este objeto contiene toda la información del fallo.
//
// Por ejemplo:
//
// status
//
// Código HTTP.
//
// message
//
// Mensaje.
//
// url
//
// Dirección.
//
// headers
//
// Encabezados.
//
// error
//
// Información enviada por el servidor.
//
// Gracias a ello podemos decidir qué hacer dependiendo del tipo
// de error.
//
// ============================================================
// EJEMPLO COMPLETO
// ============================================================

/*

export const authInterceptor: HttpInterceptorFn = (req,next)=>{

    return next(req).pipe(

        catchError((err:HttpErrorResponse)=>{

            console.log(err.status);

            return throwError(()=>err);

        })

    );

}

*/

// Analicemos línea por línea.
//
// next(req)
//
// Envía la petición.
//
// ------------------------------------------------------------
//
// pipe()
//
// Espera la respuesta.
//
// ------------------------------------------------------------
//
// catchError()
//
// Captura errores.
//
// ------------------------------------------------------------
//
// err
//
// Contiene toda la información del error.
//
// ------------------------------------------------------------
//
// err.status
//
// Devuelve:
//
// 400
//
// 401
//
// 403
//
// 404
//
// 500
//
// dependiendo del problema.
//
// ============================================================
// CÓDIGOS HTTP MÁS IMPORTANTES
// ============================================================
//
// Todos los servidores responden utilizando códigos numéricos.
//
// Estos números indican qué ocurrió.
//
// Conocerlos resulta indispensable.
//
// ============================================================
// 200
// ============================================================
//
// Significa:
//
// Todo salió correctamente.
//
// El servidor procesó la petición sin inconvenientes.
//
// Generalmente:
//
// Login correcto.
//
// Consulta exitosa.
//
// Datos guardados.
//
// ============================================================
// 201
// ============================================================
//
// Significa:
//
// Recurso creado.
//
// Normalmente aparece después de:
//
// Registrar usuario.
//
// Crear producto.
//
// Crear factura.
//
// ============================================================
// 400
// ============================================================
//
// Significa:
//
// Bad Request.
//
// Es decir:
//
// El cliente envió información incorrecta.
//
// Ejemplos:
//
// Campos vacíos.
//
// Correo mal escrito.
//
// JSON inválido.
//
// Datos incompletos.
//
// ============================================================
// 401
// ============================================================
//
// Significa:
//
// Unauthorized.
//
// No autorizado.
//
// Generalmente ocurre cuando:
//
// No existe Token.
//
// El Token expiró.
//
// La sesión terminó.
//
// La contraseña es incorrecta.
//
// Este es uno de los errores más comunes.
//
// Muchas aplicaciones responden mostrando:
//
// "Su sesión ha expirado."
//
// y posteriormente redireccionan al Login.
//
// ============================================================
// 403
// ============================================================
//
// Significa:
//
// Forbidden.
//
// El usuario está autenticado,
// pero no tiene permisos.
//
// Ejemplo:
//
// Un usuario intenta acceder al panel administrador.
//
// El servidor responde:
//
// 403.
//
// El interceptor puede mostrar:
//
// "No tiene permisos suficientes."
//
// ============================================================
// 404
// ============================================================
//
// Significa:
//
// Not Found.
//
// No se encontró.
//
// Ejemplos:
//
// URL incorrecta.
//
// API inexistente.
//
// Recurso eliminado.
//
// Endpoint mal escrito.
//
// ============================================================
// 500
// ============================================================
//
// Significa:
//
// Internal Server Error.
//
// El problema ocurrió dentro del servidor.
//
// En este caso:
//
// El cliente normalmente no puede hacer nada.
//
// Lo correcto es informar:
//
// "Ocurrió un error interno.
// Intente nuevamente más tarde."
//
// ============================================================
// ¿QUÉ ES throwError()?
// ============================================================
//
// Después de capturar el error,
// normalmente encontramos:
//
// return throwError(()=>err);
//
// Muchos principiantes piensan:
//
// "¿Si ya capturé el error,
// por qué volver a lanzarlo?"
//
// La respuesta es sencilla.
//
// El interceptor solamente informa el problema.
//
// Pero otros componentes podrían necesitar conocer ese error.
//
// throwError() permite que el Observable continúe propagando la
// excepción hacia quien realizó la petición.
//
// Si no utilizáramos throwError(),
// el componente podría quedarse esperando una respuesta que nunca
// llegará.
//
// Por eso,
// después de realizar nuestras acciones (como mostrar una alerta),
// es recomendable volver a lanzar el error.
//
// ============================================================
// INTEGRANDO SWEETALERT2
// ============================================================
//
// Una de las mayores ventajas de los interceptores es que podemos
// integrar SweetAlert2 directamente aquí.
//
// De esta manera,
// cualquier error producido por cualquier componente mostrará una
// alerta uniforme.
//
// Por ejemplo:
//
// Login.
//
// Productos.
//
// Usuarios.
//
// Compras.
//
// Clientes.
//
// Todos utilizarán exactamente el mismo diseño.
//
// Esto mejora:
//
// ✔ La experiencia del usuario.
//
// ✔ El mantenimiento.
//
// ✔ La reutilización del código.
//
// En la siguiente parte construiremos un interceptor completo que
// mostrará diferentes alertas dependiendo del código HTTP,
// aprenderemos a registrar el interceptor en app.config.ts y
// finalizaremos con el Navbar Reactivo utilizando Signals,
// signal(), computed() y effect().
//
// ============================================================

console.log("Investigación #3 - Parte 4 completada.");

// ============================================================
// 📘 INVESTIGACIÓN #3 — UX, ALERTAS Y PERSONALIZACIÓN DE NAV
// PARTE 5 DE 5
// ============================================================

"use strict";

// ============================================================
// CONTINUACIÓN DEL BLOQUE 2
// REGISTRO DEL INTERCEPTOR EN ANGULAR
// ============================================================
//
// Después de crear un interceptor todavía falta un paso muy
// importante.
//
// Angular no sabe automáticamente que nuestro interceptor existe.
//
// Nosotros debemos registrarlo.
//
// En Angular moderno este registro normalmente se realiza dentro
// del archivo:
//
// app.config.ts
//
// Allí se configuran muchos servicios globales de la aplicación.
//
// Entre ellos:
//
// • Router.
//
// • HttpClient.
//
// • Animaciones.
//
// • Interceptores.
//
// ============================================================
// EJEMPLO
// ============================================================

/*

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {

    providers: [

        provideHttpClient(

            withInterceptors([authInterceptor])

        )

    ]

};

*/

// ============================================================
// EXPLICACIÓN
// ============================================================
//
// provideHttpClient()
//
// Activa todo el sistema HTTP de Angular.
//
// Sin esta línea:
//
// HttpClient
//
// no funcionará.
//
// ------------------------------------------------------------
//
// withInterceptors()
//
// Recibe un arreglo con todos los interceptores.
//
// En aplicaciones grandes puede haber:
//
// authInterceptor
//
// logInterceptor
//
// tokenInterceptor
//
// loadingInterceptor
//
// etc.
//
// Angular los ejecutará automáticamente.
//
// ============================================================
// INTERCEPTOR COMPLETO
// ============================================================

/*

export const authInterceptor: HttpInterceptorFn = (req,next)=>{

    return next(req).pipe(

        catchError((err:HttpErrorResponse)=>{

            switch(err.status){

                case 401:

                    Swal.fire({

                        icon:"warning",

                        title:"Sesión expirada",

                        text:"Debes iniciar sesión nuevamente."

                    });

                break;

                case 403:

                    Swal.fire({

                        icon:"error",

                        title:"Acceso denegado",

                        text:"No posee permisos suficientes."

                    });

                break;

                case 404:

                    Swal.fire({

                        icon:"info",

                        title:"Recurso no encontrado",

                        text:"La información solicitada no existe."

                    });

                break;

                case 500:

                    Swal.fire({

                        icon:"error",

                        title:"Error interno",

                        text:"El servidor presentó un problema."

                    });

                break;

            }

            return throwError(()=>err);

        })

    );

};

*/

// ============================================================
// ¿POR QUÉ ESTE CÓDIGO ES TAN IMPORTANTE?
// ============================================================
//
// Antes:
//
// Cada componente debía escribir:
//
// if(error.status==401)
//
// if(error.status==403)
//
// if(error.status==500)
//
// Después:
//
// Ningún componente necesita preocuparse.
//
// Todo queda centralizado.
//
// Esto facilita enormemente:
//
// ✔ El mantenimiento.
//
// ✔ La lectura.
//
// ✔ La reutilización.
//
// ✔ Las modificaciones futuras.
//
// ============================================================
// BLOQUE 3
// SIGNALS
// ============================================================
//
// Angular 16 introdujo una nueva forma de manejar el estado:
//
// Signals.
//
// Actualmente representan la forma recomendada por Angular para
// manejar datos reactivos sencillos.
//
// Antes:
//
// Angular dependía principalmente de:
//
// RxJS.
//
// BehaviorSubject.
//
// Subject.
//
// Observables.
//
// Aunque siguen siendo muy importantes,
// muchas situaciones sencillas ahora pueden resolverse mediante
// Signals.
//
// ============================================================
// ¿QUÉ ES UN SIGNAL?
// ============================================================
//
// Un Signal es una variable reactiva.
//
// ¿Qué significa reactiva?
//
// Significa:
//
// Cuando cambia,
// Angular actualiza automáticamente la interfaz.
//
// Sin necesidad de escribir código adicional.
//
// Podemos imaginar un Signal como una caja inteligente.
//
// Caja
//
// ↓
//
// Guarda información.
//
// Cuando cambia,
// automáticamente avisa:
//
// "Mi contenido cambió."
//
// Entonces Angular vuelve a dibujar solamente la parte necesaria.
//
// ============================================================
// CREANDO UN SIGNAL
// ============================================================

/*

currentUser = signal<User|null>(null);

*/

// Analicemos.
//
// signal()
//
// crea un estado reactivo.
//
// currentUser
//
// almacenará el usuario autenticado.
//
// Inicialmente:
//
// null
//
// porque nadie ha iniciado sesión.
//
// ============================================================
// CAMBIANDO EL VALOR
// ============================================================

/*

this.currentUser.set(usuario);

*/

// set()
//
// reemplaza completamente el valor.
//
// Si anteriormente:
//
// currentUser
//
// era:
//
// null
//
// ahora contendrá:
//
// usuario
//
// Automáticamente Angular actualizará todos los componentes que
// utilicen este Signal.
//
// ============================================================
// LEYENDO UN SIGNAL
// ============================================================

/*

currentUser()

*/

// Observemos los paréntesis.
//
// Esto suele confundir.
//
// Un Signal se lee como si fuera una función.
//
// No escribimos:
//
// currentUser
//
// sino:
//
// currentUser()
//
// porque internamente Angular necesita registrar qué componentes
// dependen de ese valor.
//
// ============================================================
// COMPUTED
// ============================================================
//
// Muchas veces necesitamos calcular información.
//
// Ejemplo:
//
// ¿Existe un usuario autenticado?
//
// En lugar de guardar otra variable:
//
// boolean logged=true;
//
// Angular propone:
//
// computed().

//

/*

isLoggedIn = computed(()=>!!this.currentUser());

*/

// Analicemos.
//
// currentUser()
//
// devuelve:
//
// Usuario
//
// o
//
// null.
//
// Los signos:
//
// !!
//
// convierten cualquier valor en:
//
// true
//
// o
//
// false.
//
// Entonces:
//
// Usuario
//
// produce:
//
// true.
//
// null
//
// produce:
//
// false.
//
// Gracias a ello:
//
// isLoggedIn()
//
// siempre tendrá el valor correcto.
//
// ============================================================
// VENTAJAS DE computed()
// ============================================================
//
// No necesitamos actualizar la variable manualmente.
//
// Cada vez que:
//
// currentUser
//
// cambie,
// Angular recalculará:
//
// isLoggedIn.
//
// Esto elimina muchos errores.
//
// ============================================================
// NAVBAR REACTIVO
// ============================================================
//
// Ahora veremos uno de los mejores usos de Signals.
//
// Antes:
//
// El Navbar debía actualizarse manualmente.
//
// Después:
//
// Angular lo hace automáticamente.
//
// ============================================================
// EJEMPLO
// ============================================================

/*

<nav>

    <a routerLink="/">Inicio</a>

    @if(authService.isLoggedIn()){

        <a routerLink="/perfil">

            Perfil

        </a>

        <button (click)="logout()">

            Cerrar sesión

        </button>

    }

    @else{

        <a routerLink="/login">

            Iniciar sesión

        </a>

    }

</nav>

*/

// ============================================================
// EXPLICACIÓN
// ============================================================
//
// Cuando:
//
// isLoggedIn()
//
// devuelve:
//
// false
//
// Angular muestra:
//
// Inicio.
//
// Login.
//
// Cuando el usuario inicia sesión:
//
// currentUser.set(usuario);
//
// computed()
// vuelve a calcular:
//
// isLoggedIn()
//
// Ahora vale:
//
// true.
//
// Entonces Angular elimina:
//
// Login.
//
// y muestra:
//
// Perfil.
//
// Cerrar sesión.
//
// Todo ocurre automáticamente.
//
// Nosotros no debemos modificar el HTML.
//
// ============================================================
// FLUJO COMPLETO
// ============================================================
//
// Usuario
//
// ↓
//
// Escribe usuario.
//
// ↓
//
// LoginComponent.
//
// ↓
//
// AuthService.login()
//
// ↓
//
// Backend.
//
// ↓
//
// Token JWT.
//
// ↓
//
// currentUser.set(usuario)
//
// ↓
//
// Signal cambia.
//
// ↓
//
// computed() se actualiza.
//
// ↓
//
// Navbar cambia.
//
// ↓
//
// Usuario observa el nuevo menú.
//
// Todo esto ocurre prácticamente de forma instantánea.
//
// ============================================================
// LOGOUT
// ============================================================

/*

logout(){

    this.currentUser.set(null);

}

*/

// Al colocar:
//
// null
//
// inmediatamente:
//
// isLoggedIn()
//
// devuelve:
//
// false.
//
// Angular vuelve a mostrar:
//
// Iniciar sesión.
//
// ============================================================
// VENTAJAS DE SIGNALS
// ============================================================
//
// ✔ Menos código.
//
// ✔ Mejor rendimiento.
//
// ✔ Actualización automática.
//
// ✔ Fácil aprendizaje.
//
// ✔ Excelente integración con Angular.
//
// ✔ No requiere suscripciones sencillas.
//
// ============================================================
// BUENAS PRÁCTICAS
// ============================================================
//
// ✔ Centralizar el manejo de errores mediante Interceptors.
//
// ✔ Mostrar mensajes claros utilizando SweetAlert2.
//
// ✔ Utilizar Signals para estados sencillos.
//
// ✔ Mantener la lógica del negocio dentro de servicios.
//
// ✔ No duplicar código.
//
// ✔ Utilizar nombres descriptivos.
//
// ✔ Separar componentes por responsabilidad.
//
// ✔ Validar siempre los formularios antes de enviarlos.
//
// ✔ Proteger las rutas mediante Guards.
//
// ✔ Utilizar HTTPS cuando se trabaje con autenticación.
//
// ============================================================
// ERRORES COMUNES
// ============================================================
//
// Error:
//
// Mostrar mensajes técnicos al usuario.
//
// Incorrecto:
//
// SQL Error 1452.
//
// Correcto:
//
// No fue posible completar la operación.
//
// ------------------------------------------------------------
//
// Error:
//
// Guardar lógica dentro del componente.
//
// Lo correcto:
//
// La lógica debe permanecer dentro de servicios.
//
// ------------------------------------------------------------
//
// Error:
//
// Repetir SweetAlert en todos los componentes.
//
// Solución:
//
// Utilizar un Interceptor.
//
// ------------------------------------------------------------
//
// Error:
//
// Modificar manualmente el Navbar.
//
// Solución:
//
// Utilizar Signals.
//
// ------------------------------------------------------------
//
// Error:
//
// No controlar la expiración del Token.
//
// Solución:
//
// Detectar automáticamente el código HTTP 401.
//
// ============================================================
// RESUMEN GENERAL
// ============================================================
//
// Durante toda esta investigación aprendimos:
//
// ✔ Qué es la Experiencia de Usuario (UX).
//
// ✔ Por qué alert() ya no se considera una buena práctica.
//
// ✔ Qué es SweetAlert2.
//
// ✔ Cómo instalarlo.
//
// ✔ Cómo utilizar Swal.fire().
//
// ✔ Personalizar iconos, botones y temporizadores.
//
// ✔ Trabajar con Promesas mediante then().
//
// ✔ Solicitar confirmaciones antes de eliminar información.
//
// ✔ Qué es un HTTP Interceptor.
//
// ✔ Cómo funciona internamente.
//
// ✔ Qué representa next().
//
// ✔ Qué hace pipe().
//
// ✔ Cómo funciona catchError().
//
// ✔ Qué es throwError().
//
// ✔ El significado de los códigos HTTP.
//
// ✔ Cómo registrar un interceptor.
//
// ✔ Cómo centralizar el manejo de errores.
//
// ✔ Qué son los Signals.
//
// ✔ Cómo utilizar signal().
//
// ✔ Cómo utilizar computed().
//
// ✔ Cómo construir un Navbar reactivo.
//
// ✔ Buenas prácticas para proyectos Angular.
//
// Todos estos elementos forman parte del desarrollo moderno de
// aplicaciones SPA con Angular y permiten crear sistemas más
// seguros, fáciles de mantener y con una experiencia de usuario
// mucho más profesional.
//
// ============================================================

console.log("Investigación #3 finalizada correctamente.");
