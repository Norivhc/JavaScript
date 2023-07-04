/* const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numerito = document.querySelector("#numerito");
let productosEnCarrito = [];

async function cargarProductosAsync() {
  const response = await fetch("./js/productos.JSON");
  const productos = await response.json();

  botonesCategorias.forEach(boton => {
    boton.addEventListener("click", () => {
      const categoriaId = boton.id;

      botonesCategorias.forEach(boton => boton.classList.remove("active"));
      boton.classList.add("active");

      const productosFiltrados = filtrarProductosPorCategoria(productos, categoriaId);
      mostrarProductos(productosFiltrados);
    });
  });

  mostrarProductos(productos);
  cargarProductosEnCarrito();
  actualizarNumerito();
}

function filtrarProductosPorCategoria(productos, categoriaId) {
  if (categoriaId === "todos") {
    return productos;
  } else {
    return productos.filter(producto => producto.categoria.id === categoriaId);
  }
}

function mostrarProductos(productos) {
  contenedorProductos.innerHTML = "";

  productos.forEach(producto => {
    const div = crearElemento("div", "producto");
    const img = crearElemento("img", "product-img", { src: producto.img, alt: producto.nombre });
    const detalles = crearElemento("div", "product-details");
    const titulo = crearElemento("h3", "product-title", {}, producto.nombre);
    const precio = crearElemento("p", "product-precio", {}, `$${producto.precio}`);
    const boton = crearElemento("button", "product-add", { id: producto.id }, "Agregar");

    boton.addEventListener("click", () => agregarAlCarrito(producto));

    detalles.append(titulo, precio, boton);
    div.append(img, detalles);
    contenedorProductos.appendChild(div);
  });
}

function crearElemento(tag, clase, atributos = {}, texto = "") {
  const elemento = document.createElement(tag);
  elemento.classList.add(clase);

  for (const atributo in atributos) {
    elemento.setAttribute(atributo, atributos[atributo]);
  }

  elemento.innerText = texto;
  return elemento;
}

function agregarAlCarrito(producto) {
  const productoEnCarrito = productosEnCarrito.find(item => item.id === producto.id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    producto.cantidad = 1;
    productosEnCarrito.push(producto);
  }

  guardarProductosEnCarrito();
  actualizarNumerito();
  mostrarMensaje("Producto agregado al carrito");
}

function cargarProductosEnCarrito() {
  const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

  if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
  }
}

function guardarProductosEnCarrito() {
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
  numerito.innerText = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);
}

function mostrarMensaje(mensaje) {
  Toastify({
    text: mensaje,
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
}

cargarProductosAsync();
 */

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numerito = document.querySelector("#numerito");
let productosEnCarrito = [];

async function loadProductsAsync() {
  const response = await fetch("./js/productos.JSON");
  const productos = await response.json();

  botonesCategorias.forEach(boton => {
    boton.addEventListener("click", () => {
      const categoryId = boton.id;

      botonesCategorias.forEach(boton => boton.classList.remove("active"));
      boton.classList.add("active");

      const filteredProducts = filterProductsByCategory(productos, categoryId);
      displayProducts(filteredProducts);
    });
  });

  displayProducts(productos);
  loadProductsInCart();
  updateCartCount();
}

function filterProductsByCategory(products, categoryId) {
  if (categoryId === "todos") {
    return products;
  } else {
    return products.filter(product => product.categoria.id === categoryId);
  }
}

function displayProducts(products) {
  contenedorProductos.innerHTML = "";

  products.forEach(product => {
    const div = createElement("div", "producto");
    const img = createElement("img", "product-img", { src: product.img, alt: product.nombre });
    const details = createElement("div", "product-details");
    const title = createElement("h3", "product-title", {}, product.nombre);
    const price = createElement("p", "product-precio", {}, `$${product.precio}`);
    const button = createElement("button", "product-add", { id: product.id }, "Agregar");

    button.addEventListener("click", () => addToCart(product));

    details.append(title, price, button);
    div.append(img, details);
    contenedorProductos.appendChild(div);
  });
}

function createElement(tag, className, attributes = {}, text = "") {
  const element = document.createElement(tag);
  element.classList.add(className);

  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }

  element.innerText = text;
  return element;
}

function addToCart(product) {
  const productInCart = productosEnCarrito.find(item => item.id === product.id);

  if (productInCart) {
    productInCart.cantidad++;
  } else {
    product.cantidad = 1;
    productosEnCarrito.push(product);
  }

  saveCartProducts();
  updateCartCount();
  displayMessage("Producto agregado al carrito");
}

function loadProductsInCart() {
  const cartProductsFromLS = localStorage.getItem("productos-en-carrito");

  if (cartProductsFromLS) {
    productosEnCarrito = JSON.parse(cartProductsFromLS);
  }
}

function saveCartProducts() {
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function updateCartCount() {
  numerito.innerText = productosEnCarrito.reduce((total, product) => total + product.cantidad, 0);
}

function displayMessage(message) {
  Toastify({
    text: message,
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
}

loadProductsAsync();
