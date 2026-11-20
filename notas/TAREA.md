# Tarea: Mi componente interactivo

## Componente elegido

**Control de stock de un almacen.** Permite registrar materiales (codigo, nombre y stock), retirar cantidades, borrar materiales y buscarlos por codigo o nombre. La regla principal es que una salida nunca puede dejar el stock en negativo. Lo elegi porque es el mismo problema de almacen que trabaje en los laboratorios 06 y 07, ahora como una pagina interactiva.

- Pagina publicada: https://rodrigoxd711-tecsup.github.io/lab08-dom/tarea/
- Archivos: `tarea/index.html` y `tarea/app.js`

## Codigo principal

```js
class Material {
  constructor(codigo, nombre, stock) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.stock = stock;
  }

  // Descuenta la cantidad solo si hay stock suficiente. Devuelve true si se pudo retirar.
  retirar(cantidad) {
    if (cantidad > this.stock) {
      return false;
    }
    this.stock = this.stock - cantidad;
    return true;
  }

  stockBajo() {
    return this.stock <= STOCK_MINIMO;
  }

  // Texto con el que se muestra cada material en la pagina.
  descripcion() {
    return this.codigo + " - " + this.nombre;
  }
}

// Evento 1 (submit): registrar un material nuevo
formMaterial.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const codigo = inputCodigo.value.trim().toUpperCase();
  const nombre = inputNombre.value.trim();
  const stock = leerEntero(inputStock.value, true);

  if (codigo === "" || nombre === "") {
    mostrarMensaje("Completa el codigo y el nombre del material.", "error");
    return;
  }
  if (stock === null) {
    mostrarMensaje("El stock debe ser un numero entero igual o mayor a 0.", "error");
    return;
  }
  if (materiales.some((m) => m.codigo === codigo)) {
    mostrarMensaje("Ya existe un material con el codigo " + codigo + ".", "error");
    return;
  }
  materiales.push(new Material(codigo, nombre, stock));
  mostrarMensaje("Material " + codigo + " registrado.", "ok");
  mostrarMateriales();
});

// Evento 2 (click): retirar o borrar desde la lista
listaMateriales.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton) {
    return;
  }
  const fila = boton.closest("li");
  const material = materiales.find((m) => m.codigo === fila.dataset.codigo);

  if (boton.dataset.accion === "borrar") {
    materiales.splice(materiales.indexOf(material), 1);
    mostrarMensaje("Material " + material.codigo + " eliminado.", "ok");
    mostrarMateriales();
    return;
  }

  const cantidad = leerEntero(fila.querySelector(".cantidad").value, false);
  if (cantidad === null) {
    mostrarMensaje("La cantidad a retirar debe ser un numero entero mayor a 0.", "error");
    return;
  }
  if (!material.retirar(cantidad)) {
    mostrarMensaje("Stock insuficiente de " + material.codigo + ": hay " + material.stock + " und y pediste " + cantidad + ".", "error");
    return;
  }
  mostrarMensaje("Salida de " + cantidad + " und de " + material.codigo + ". Stock actual: " + material.stock + ".", "ok");
  mostrarMateriales();
});

// Evento 3 (input): filtrar la lista mientras se escribe
buscar.addEventListener("input", mostrarMateriales);
```

Cada material se muestra con `createElement` en una fila que tiene su propio campo de cantidad y los botones Retirar y Borrar (funcion `crearFila` en `tarea/app.js`).

## Pruebas realizadas

| Accion | Resultado esperado | Cumple (Si/No) |
|--------|--------------------|----------------|
| Retirar 30 und de M001 (stock 25) | Mensaje en rojo "Stock insuficiente" y el stock se mantiene en 25 | Si |
| Retirar 5 und de M001 (stock 25) | Mensaje "Salida de 5 und" y el stock baja a 20 | Si |
| Retirar 0 und de un material | Mensaje en rojo: la cantidad debe ser un entero mayor a 0 | Si |
| Registrar M004 - Lentes de seguridad con stock 10 | El material aparece en la lista con 10 und | Si |
| Registrar otra vez el codigo M001 | Mensaje en rojo "Ya existe un material con el codigo M001" | Si |
| Escribir "guantes" en el buscador | Solo queda M002 - Guantes de nitrilo en la lista | Si |
| Borrar M003 | El material desaparece de la lista y sale "Material M003 eliminado" | Si |
| Stock de 5 und o menos | El numero del stock se muestra en naranja | Si |

## Por que disene asi mi clase

Elegi los atributos codigo, nombre y stock porque son los datos minimos que se controlan en un almacen: el codigo identifica cada material sin repetirse, el nombre lo hace entendible y el stock es lo que cambia con cada salida.
El metodo retirar() concentra la regla mas importante, que el stock nunca quede en negativo, asi la validacion esta en un solo lugar y no repartida en los eventos. descripcion() define una sola vez como se muestra cada material en la pagina, y stockBajo() permite resaltar los materiales que hay que reponer.