let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const emptyCart = () => {
  Swal.fire({
    position: 'bottom-end',
    icon: 'success',
    title: 'Your cart is empty',
    showConfirmButton: false,
    timer: 1500
  });

  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  loadCartProducts();
};

const loadCartProducts = () => {
  const cartEmptyContainer = document.querySelector("#carrito-vacio");
  const cartProductsContainer = document.querySelector("#carrito-productos");
  const cartActionsContainer = document.querySelector("#carrito-acciones");
  const cartPurchasedContainer = document.querySelector("#carrito-comprado");
  const deleteButtons = document.querySelectorAll(".carrito-producto-eliminar");
  const emptyCartButton = document.querySelector("#carrito-acciones-vaciar");
  const buyButton = document.querySelector("#carrito-acciones-comprar");

  if (productosEnCarrito && productosEnCarrito.length > 0) {
    cartEmptyContainer.classList.add("disabled");
    cartProductsContainer.classList.remove("disabled");
    cartActionsContainer.classList.remove("disabled");
    cartPurchasedContainer.classList.add("disabled");

    cartProductsContainer.innerHTML = "";

    productosEnCarrito.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
        <img class="carrito-producto-img" src="${product.img}" alt="${product.nombre}" />
        <div class="carrito-producto-title">
          <small>Nombre</small>
          <h3>${product.nombre}</h3>
        </div>
        <div class="carrito-producto-cantidad">
          <small>Cantidad</small>
          <p>${product.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
          <small>Precio</small>
          <p>$${product.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
          <small>Subtotal</small>
          <p>$${product.precio * product.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${product.id}">
          <i class="bi bi-trash-fill"></i>
        </button>
      `;
      cartProductsContainer.append(div);
    });
  } else {
    cartEmptyContainer.classList.remove("disabled");
    cartProductsContainer.classList.add("disabled");
    cartActionsContainer.classList.add("disabled");
    cartPurchasedContainer.classList.add("disabled");
  }

  updateDeleteButtons();
  updateTotal(cartProductsContainer);
};

const updateDeleteButtons = () => {
  const deleteButtons = document.querySelectorAll(".carrito-producto-eliminar");

  deleteButtons.forEach(button => {
    button.addEventListener("click", removeFromCart);
  });
};

const removeFromCart = (e) => {
  Toastify({
    text: 'Product removed',
    duration: 1500,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    backgroundColor: "linear-gradient(to right, #46b086, #e8e4db)",
    onClick: function() {}
  }).showToast();

  const productId = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(product => product.id === productId);

  if (index !== -1) {
    productosEnCarrito.splice(index, 1);
    loadCartProducts();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  }
};

const emptyCartButton = document.querySelector("#carrito-acciones-vaciar");
emptyCartButton.addEventListener("click", emptyCart);

const updateTotal = (cartProductsContainer) => {
  const totalContainer = document.querySelector("#total");
  const total = productosEnCarrito.reduce((acc, product) => acc + (product.precio * product.cantidad), 0);
  totalContainer.innerText = `$${total}`;
};

const buyButton = document.querySelector("#carrito-acciones-comprar");
buyButton.addEventListener("click", () => {
  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  const cartEmptyContainer = document.querySelector("#carrito-vacio");
  const cartProductsContainer = document.querySelector("#carrito-productos");
  const cartActionsContainer = document.querySelector("#carrito-acciones");
  const cartPurchasedContainer = document.querySelector("#carrito-comprado");

  cartEmptyContainer.classList.add("disabled");
  cartProductsContainer.classList.add("disabled");
  cartActionsContainer.classList.add("disabled");
  cartPurchasedContainer.classList.remove("disabled");
});

document.getElementById("miFormulario").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("mensaje").value;

  const displayedData = document.getElementById("datosMostrados");
  const dataParagraph = document.createElement("p");
  dataParagraph.textContent = `Name: ${name}, Email: ${email}, Message: ${message}`;

  displayedData.appendChild(dataParagraph);

  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mensaje").value = "";
});

loadCartProducts();

