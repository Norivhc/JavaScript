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
