# Bitacora de JavaScript interactivo

Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos.

Navegador usado: Brave

## Ejercicio 2: Seleccionar y modificar el DOM

| Instruccion | Que cambio en la pantalla | Se mantiene al recargar (Si/No) |
|-------------|---------------------------|---------------------------------|
| textContent desde la consola | El titulo cambio a "Hola desde la consola" | No |
| textContent desde app.js | El titulo cambio a "Hola TECSUP" | Si |
| style.color | El titulo se puso de color azul | Si |
| classList.add("destacado") | El parrafo "Este texto va a cambiar." tomo fondo amarillo | Si |
| createElement + appendChild | La lista paso de 2 a 3 elementos: HTML, CSS y JavaScript | Si |

El cambio desde la consola desaparecio al recargar porque solo existia en el DOM, no en el archivo. Los cambios escritos en app.js se mantienen porque el navegador vuelve a ejecutar el archivo cada vez que carga la pagina.
En el panel Elements se ve que el h1 ahora tiene style="color: blue": JavaScript no cambia el archivo index.html, cambia el arbol del DOM.

## Ejercicio 3: Evento click

| Tipo de evento | Que accion lo dispara | Cuanto suma por accion |
|----------------|-----------------------|------------------------|
| click | Un clic en el boton Sumar 1 | 1 por cada clic |
| dblclick | Dos clics rapidos seguidos; un clic solo no hace nada | 1 por cada doble clic |
| mouseover | Pasar el mouse por encima del boton, sin hacer clic | 1 cada vez que el mouse entra al boton |

En la consola, evento.type mostro el nombre del evento que ocurrio (click).
evento.target mostro el elemento que recibio el evento: el boton <button id="btnSumar">Sumar 1</button>.

## Ejercicio 4: Eventos input y submit

| Prueba | Que paso en la pantalla | Se recargo la pagina (Si/No) |
|--------|-------------------------|------------------------------|
| Escribir en el campo nombre | El texto "Hola, ..." cambio letra por letra mientras escribia | No |
| Enviar sin preventDefault | "Enviado" aparecio un instante y desaparecio; el campo de correo quedo vacio | Si |
| Enviar con preventDefault, correo sin @ | Aparecio "Correo no valido: falta @" en rojo | No |
| Enviar con preventDefault, correo con @ | Aparecio "Enviado: rodrigoxd711@gmail.com" en negro | No |

Sin preventDefault el navegador recarga la pagina al enviar el formulario y se pierde lo que mostro JavaScript; ademas la direccion quedo con un "?" al final.
Con preventDefault el codigo decide que mostrar: valida el correo y usa la clase error para pintar el mensaje en rojo.

## Ejercicio 5: Clases y objetos

| Objeto | nombre | precio | conDescuento(0.25) |
|--------|--------|--------|--------------------|
| laptop | Laptop | 2500 | 1875 |
| mouse | Mouse | 45 | 33.75 |
| teclado | Teclado | 120 | 90 |
| monitor | Monitor | 680 | 510 |

Con la clase Producto escribo una sola vez los atributos y los metodos, y cada producto nuevo es solo una linea con new: el monitor aparecio en la pagina sin tocar el HTML.
Ademas, todos los productos se muestran con el mismo formato (descripcion) y calculan el descuento de la misma forma, asi que si cambio el metodo, cambia para todos.