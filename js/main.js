/* // Variables globales
let perfumes = [];

// Funciones
function pedirNombre() {
  let nombre = prompt("Por favor, ingrese su nombre");
  mostrarMensaje(`¡Hola ${nombre}! Bienvenido/a a nuestro sitio web.`);

  let eleccion = prompt(
    "¿Qué tipo de perfume desea ver? (mujer/hombre/niñas/niños)"
  ).toLowerCase();

  if (eleccion === "mujer") {
    perfumes = [
      { nombre: "Mugler Angel", precio: 4500.0 },
      { nombre: "Chanel Coco Mademoiselle", precio: 5400.0 },
    ];
    mostrarOpciones("Opciones de perfumes para mujeres:");
  } else if (eleccion === "hombre") {
    perfumes = [
      { nombre: "Dior Sauvage", precio: 4050.0 },
      { nombre: "Armani Code", precio: 3600.0 },
    ];
    mostrarOpciones("Opciones de perfumes para hombres:");
  } else if (eleccion === "niñas") {
    perfumes = [
      { nombre: "Barbie Princess Power", precio: 1125.0 },
      { nombre: "Disney Frozen", precio: 1350.0 },
    ];
    mostrarOpciones("Opciones de perfumes para niñas:");
  } else if (eleccion === "niños") {
    perfumes = [
      { nombre: "Marvel Spider-Man", precio: 900.0 },
      { nombre: "Disney Pixar Cars", precio: 1012.5 },
    ];
    mostrarOpciones("Opciones de perfumes para niños:");
  } else {
    mostrarMensaje(
      "Por favor, ingrese una de las siguientes opciones: 'mujer', 'hombre', 'niñas' o 'niños'."
    );
    pedirNombre();
    return;
  }
}

function mostrarOpciones(titulo) {
  mostrarMensaje(titulo);

  perfumes.forEach(function (perfume, index) {
    mostrarMensaje(`${index + 1}. ${perfume.nombre} (ARS${perfume.precio})`);
  });
}

function mostrarMensaje(mensaje) {
  alert(mensaje);
}

// Llamada a la función para pedir el nombre
pedirNombre();

let compraFinalizada = false;

while (!compraFinalizada) {
  let seleccion = prompt("Por favor, seleccione una opción de perfume (1 o 2)");

  if (seleccion === "1" || seleccion === "2") {
    let indiceSeleccionado = parseInt(seleccion) - 1;

    if (perfumes[indiceSeleccionado]) {
      let perfumeSeleccionado = perfumes[indiceSeleccionado];
      mostrarMensaje(
        `Usted ha seleccionado ${perfumeSeleccionado.nombre} por un precio de ARS${perfumeSeleccionado.precio}`
      );
      compraFinalizada = true;
    } else {
      mostrarMensaje(
        "Opción inválida. Por favor, seleccione una opción válida."
      );
    }
  } else {
    mostrarMensaje("Opción inválida. Por favor, seleccione una opción válida.");
  }
}

// Método de búsqueda por nombre de perfume
let nombrePerfume = prompt("Ingrese el nombre del perfume que desea buscar");

let perfumeEncontrado = perfumes.find((perfume) =>
  perfume.nombre.toLowerCase().includes(nombrePerfume.toLowerCase())
);

if (perfumeEncontrado) {
  mostrarMensaje(
    `¡El perfume ${perfumeEncontrado.nombre} ha sido encontrado! Precio: ARS ${perfumeEncontrado.precio}`
  );
} else {
  mostrarMensaje(`El perfume ${nombrePerfume} no se encuentra disponible.`);
}

// Método de filtrado de perfumes por precio mayor a 4000.0
let perfumesCaros = perfumes.filter((perfume) => perfume.precio > 4000.0);
mostrarMensaje("Perfumes caros:");

perfumesCaros.forEach(function (perfume, index) {
  mostrarMensaje(`${index + 1}. ${perfume.nombre} (ARS${perfume.precio})`);
}); */

async function cargarProductosAsync() {
  let productos = [];

  await fetch("./js/productos.JSON")
    .then(response => response.json())
    .then(data => {
      productos = data
    });

  const contenedorProductos = document.querySelector("#contenedor-productos");
  const botonesCategorias = document.querySelectorAll(".boton-categoria");
  const tituloPrincipal = document.querySelector("#titulo-principal");
  let botonesAgregar = document.querySelectorAll(".product-add");
  const numerito = document.querySelector("#numerito")

  function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <img class="product-img" src="${producto.img}" alt="${producto.nombre}" />
        <div class="product-details">
          <h3 class="product-title">${producto.nombre}</h3>
          <p class="product-precio">$${producto.precio}</p>
          <button class="product-add" id="${producto.id}">Agregar</button>
        </div>
      `;

      contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
  }

  botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
      botonesCategorias.forEach(boton => boton.classList.remove("active"))
      e.currentTarget.classList.add("active");

      if (e.currentTarget.id != "todos") {
        const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);

        tituloPrincipal.innerHTML = productoCategoria.categoria.nombre;

        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);
      } else {
        tituloPrincipal.innerHTML = "Todos los productos";
        cargarProductos(productos);
      }
    });
  });

  function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".product-add");
    botonesAgregar.forEach(boton => {
      boton.addEventListener("click", agregarAlCarrito);
    });
  }

  let productosEnCarrito;
  let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

  if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
  } else {
    productosEnCarrito = [];
  }

  function agregarAlCarrito(e) {
    Toastify({
      text: "Producto agregado",
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #46b086, #e8e4db)",
      },
      onClick: function() {}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
      const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
      productosEnCarrito[index].cantidad++;
    } else {
      productoAgregado.cantidad = 1;
      productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  }

  function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
  }
}

cargarProductosAsync();
