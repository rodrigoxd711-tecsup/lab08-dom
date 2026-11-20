// Tarea Laboratorio 08: control de stock de un almacen
// Combina una clase propia (Material), el DOM y tres tipos de eventos: submit, click e input.

const STOCK_MINIMO = 5;

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

// Datos iniciales del almacen
const materiales = [
  new Material("M001", "Casco de seguridad", 25),
  new Material("M002", "Guantes de nitrilo", 40),
  new Material("M003", "Barreno de 1.2 m", 4),
];

const formMaterial = document.querySelector("#formMaterial");
const inputCodigo = document.querySelector("#codigo");
const inputNombre = document.querySelector("#nombre");
const inputStock = document.querySelector("#stock");
const mensaje = document.querySelector("#mensaje");
const buscar = document.querySelector("#buscar");
const listaMateriales = document.querySelector("#listaMateriales");
const vacio = document.querySelector("#vacio");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

// Convierte un texto en entero positivo; devuelve null si no lo es.
function leerEntero(texto, permitirCero) {
  const numero = Number(texto);
  const minimo = permitirCero ? 0 : 1;
  if (texto.trim() === "" || !Number.isInteger(numero) || numero < minimo) {
    return null;
  }
  return numero;
}

function crearFila(material) {
  const li = document.createElement("li");
  li.dataset.codigo = material.codigo;
  if (material.stockBajo()) {
    li.classList.add("bajo");
  }

  const texto = document.createElement("span");
  texto.textContent = material.descripcion();

  const stock = document.createElement("span");
  stock.className = "stock";
  stock.textContent = material.stock + " und";

  const cantidad = document.createElement("input");
  cantidad.type = "number";
  cantidad.className = "cantidad";
  cantidad.min = "1";
  cantidad.step = "1";
  cantidad.placeholder = "Cant.";

  const btnRetirar = document.createElement("button");
  btnRetirar.textContent = "Retirar";
  btnRetirar.dataset.accion = "retirar";

  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "Borrar";
  btnBorrar.className = "peligro";
  btnBorrar.dataset.accion = "borrar";

  li.append(texto, stock, cantidad, btnRetirar, btnBorrar);
  return li;
}

function mostrarMateriales() {
  const filtro = buscar.value.trim().toLowerCase();
  listaMateriales.textContent = "";

  const visibles = materiales.filter((m) =>
    m.descripcion().toLowerCase().includes(filtro)
  );

  visibles.forEach((m) => {
    listaMateriales.appendChild(crearFila(m));
  });

  vacio.hidden = visibles.length > 0;
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
  formMaterial.reset();
  inputCodigo.focus();
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
    mostrarMensaje(
      "Stock insuficiente de " + material.codigo + ": hay " + material.stock + " und y pediste " + cantidad + ".",
      "error"
    );
    return;
  }

  mostrarMensaje("Salida de " + cantidad + " und de " + material.codigo + ". Stock actual: " + material.stock + ".", "ok");
  mostrarMateriales();
});

// Evento 3 (input): filtrar la lista mientras se escribe
buscar.addEventListener("input", mostrarMateriales);

mostrarMateriales();
