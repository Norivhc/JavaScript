const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".product-add");
const numerito = document.querySelector("#numerito");

async function cargarProductosAsync() {
  let productos = [];

  await fetch("./js/productos.JSON")
    .then(response => response.json())
    .then(data => {
      productos = data;
    });

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

  // Llamar a la función para cargar los productos
  cargarProductos(productos);
}

cargarProductosAsync();
