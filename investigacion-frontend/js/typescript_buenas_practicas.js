// ============================================================
//  📘 INVESTIGACIÓN #5 — TYPESCRIPT: BUENAS PRÁCTICAS Y TIPOS AVANZADOS
// ============================================================
//
//  NOTA IMPORTANTE SOBRE ESTE ARCHIVO:
//  ─────────────────────────────────────────────────────────
//  Este archivo mantiene la extensión .js para que lo ejecutes
//  directamente con Node.js en tu consola local.
//  Todo el código de TypeScript avanzado está dentro de los COMENTARIOS
//  diseñado detalladamente para que lo repases, analices y copies.
//
//  Ejecutar: node 05_typescript_buenas_practicas.js
//
// ============================================================
//
//  ¿POR QUÉ REPASAR BUENAS PRÁCTICAS EN EL FRONTEND?
//  ─────────────────────────────────────────────────────────
//  Angular no es solo escribir código que funcione; es un framework
//  altamente empresarial que exige escalabilidad. Un mal manejo de
//  tipos o abusar de comodines destruye la seguridad que TypeScript
//  ofrece al compilador antes de desplegar la aplicación en el navegador.
//
//  En este módulo final de fundamentos aprenderás a dominar:
//  1. El peligro absoluto del tipo 'any' y cómo reemplazarlo de forma segura.
//  2. Type Assertions (Aserciones de tipo) frente al tipado real.
//  3. El operador Nullish Coalescing y el Optional Chaining indispensables en UI.
//  4. Buenas prácticas de modularización y exportación de interfaces limpias.
//
// ============================================================
//  BLOQUES DE ESTUDIO — TypeScript en comentarios
// ============================================================

"use strict";

// ════════════════════════════════════════════════════════
//  BLOQUE 1: LA REGLA DE ORO — PROHIBIDO ELIMINAR EL TIPADO ('any')
//  ¿Por qué 'any' es el enemigo silencioso y cómo usar 'unknown'?
// ════════════════════════════════════════════════════════
//
//  El tipo 'any' le dice a TypeScript: "Apaga el compilador para esta variable,
//  no verifiques nada". Esto anula el sentido de usar la tecnología y abre la
//  puerta a errores en tiempo de ejecución (Runtime Errors).
//
//  ── EL PELIGRO DE ANY ─────────────────────────────────────
//
//  // En TypeScript (.ts):
//  let respuestaApi: any = { login: true, token: "xyz123" };
//
//  // El compilador te dejará escribir estas locuras sin quejarse:
//  respuestaApi.metodoQueNoExiste(); // ❌ Rompe la app en el navegador
//  respuestaApi = "Ahora soy un string"; // ❌ Pierdes el control del flujo del dato
//
//  ── LA ALTERNATIVA SEGURA: 'unknown' ──────────────────────
//
//  'unknown' es la versión segura de 'any'. Te dice: "Aquí viene un dato, pero
//  todavía no sé qué forma tiene. Estás obligado a verificarlo antes de usarlo".
//
//  // En TypeScript (.ts):
//  let datoSeguro: unknown;
//
//  datoSeguro = "Hola Cali"; // ✅ Permitido asignar cualquier cosa temporalmente
//
//  // Si intentas usarlo directamente como si fuera un string:
//  // console.log(datoSeguro.toUpperCase()); // ❌ Error: Object is of type 'unknown'
//
//  // Para usarlo de forma segura, debes hacer una VALIDACIÓN DE TIPO (Type Guard):
//  if (typeof datoSeguro === "string") {
//      console.log(datoSeguro.toUpperCase()); // ✅ ¡Perfecto! Aquí TypeScript ya sabe que es un string
//  }

// ════════════════════════════════════════════════════════
//  BLOQUE 2: OPERADORES CLAVE PARA RENDERIZAR EN INTERFACES
//  Optional Chaining (?.) y Nullish Coalescing (??)
// ════════════════════════════════════════════════════════
//
//  En el desarrollo Frontend con Angular, es común recibir datos asíncronos de APIs
//  donde algunas propiedades pueden venir vacías, nulas o indefinidas. Si intentas
//  entrar a una subpropiedad de un objeto que no existe, la pantalla se queda en blanco.
//
//  ── OPTIONAL CHAINING (?.) ────────────────────────────────
//
//  Evita el clásico error: "Cannot read properties of undefined". Si la propiedad
//  intermedia no existe, frena la ejecución de la línea de golpe y devuelve 'undefined'
//  en lugar de romper la aplicación.
//
//  // En TypeScript (.ts):
//  interface UsuarioPerfil {
//      nombre: string;
//      redesSociales?: {
//          github: string;
//          instagram?: string;
//      }
//  }
//
//  const usuarioIncompleto: UsuarioPerfil = { nombre: "Oscar" };
//
//  // Sin optional chaining tocaría hacer: if(usuario.redesSociales && usuario.redesSociales.github)
//  // Con optional chaining es directo y limpio:
//  console.log(usuarioIncompleto.redesSociales?.github); // ✅ Devuelve 'undefined' de forma segura, no rompe la app
//
//  ── NULLISH COALESCING (??) ──────────────────────────────
//
//  Sirve para asignar valores por defecto en la UI de manera estricta. A diferencia del OR (||),
//  el operador ?? solo se activa si el valor de la izquierda es estrictamente 'null' o 'undefined'.
//  Si el valor es 0 o un string vacío "", los respeta y los mantiene válidos.
//
//  // En TypeScript (.ts):
//  let respuestasComentarios = 0;
//
//  let usarOr = respuestasComentarios || -1; // ❌ Da -1 (porque 0 es considerado Falsy en JS tradicional)
//  let usarNullish = respuestasComentarios ?? -1; // ✅ Da 0 (porque reconoce que el 0 es un dato real cargado)
//
//  console.log(`Comentarios activos: ${usarNullish}`);

// ════════════════════════════════════════════════════════
//  BLOQUE 3: ASERCIONES DE TIPO (Type Assertions)
//  Cómo decirle al compilador que tú sabes más que él sobre un elemento
// ════════════════════════════════════════════════════════
//
//  Hay ocasiones donde TypeScript no puede adivinar qué tipo de dato específico está
//  manipulando (por ejemplo, cuando interactúas con elementos del DOM del navegador).
//  Las aserciones se hacen usando la palabra clave 'as'.
//
//  ⚠️ ADVERTENCIA: Esto no convierte el tipo de dato en tiempo de ejecución (no es un casteo),
//  solo silencia al compilador asegurándole que tú te haces responsable del tipo.
//
//  // En TypeScript (.ts):
//  // TypeScript solo sabe que esto devuelve un 'HTMLElement' general:
//  const miBoton = document.getElementById("btn-enviar-formulario");
//
//  // Si intentas acceder a propiedades específicas de un botón HTML, dará error:
//  // miBoton.disabled = true; // ❌ Error: 'disabled' no existe en 'HTMLElement'
//
//  // Solución con Aserción de Tipo:
//  const miBotonReal = document.getElementById("btn-enviar-formulario") as HTMLButtonElement;
//  miBotonReal.disabled = true; // ✅ ¡Perfecto! Ahora el compilador sabe que tiene la propiedad 'disabled'

// ════════════════════════════════════════════════════════
//  BLOQUE 4: BUENAS PRÁCTICAS DE MODULARIZACIÓN
//  Uso de Imports/Exports limpios para evitar dependencias circulares
// ════════════════════════════════════════════════════════
//
//  En Angular, cada componente, servicio o interfaz debe vivir en su propio archivo.
//  No metas interfaces de datos dentro del mismo archivo de lógica del componente;
//  sepáralas en archivos dedicados (.models.ts o .interfaces.ts).
//
//  Sintaxis limpia de exportación e importación en TypeScript:
//
//  // En el archivo: usuario.interface.ts (.ts)
//  export interface UsuarioSession {
//      uid: string;
//      email: string;
//      roles: string[];
//  }
//
//  // En el archivo: auth.service.ts (.ts)
//  // Importas de manera limpia usando llaves la estructura exacta:
//  import { UsuarioSession } from './usuario.interface';
//
//  export class AuthService {
//      private usuarioActual?: UsuarioSession;
//
//      getIsAdmin(): boolean {
//          return this.usuarioActual?.roles.includes('ADMIN') ?? false;
//      }
//  }

// ============================================================
//  🚀 VERIFICACIÓN DE EJECUCIÓN LOCAL CON NODE.JS
// ============================================================

console.log("\n========================================================");
console.log(" ✅ Archivo 05_typescript_buenas_practicas.js leído con éxito");
console.log("========================================================");
console.log(" -> Todo el código TypeScript avanzado está documentado en los comentarios.");
console.log(" -> Úsalo como guía teórica para estructurar tus futuros desarrollos en Angular.");
console.log("========================================================\n");