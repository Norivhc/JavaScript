let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar")



function cargarProductosCarrito () {
  if (productosEnCarrito && productosEnCarrito.length > 0) {

    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.remove("disabled")
    contenedorCarritoAcciones.classList.remove("disabled")
    contenedorCarritoComprado.classList.add("disabled")
    
    contenedorCarritoProductos.innerHTML = ""
    
    productosEnCarrito.forEach(producto => {
      const div = document.createElement("div")
      div.classList.add("carrito-producto")
      div.innerHTML = `
      <img
                    class="carrito-producto-img"
                    src="${producto.img}"
                    alt="${producto.nombre}"
                  />
                  <div class="carrito-producto-title">
                    <small>Titulo</small>
                    <h3>${producto.nombre}</h3>
                  </div>
                  <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                  </div>
                  <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                  </div>
                  <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                  </div>
                  <button class="carrito-producto-eliminar" id="${producto.id}">
                    <i class="bi bi-trash-fill"></i>
                  </button>
      `
      contenedorCarritoProductos.append(div)
    })
    
    } else {
      contenedorCarritoVacio.classList.remove("disabled")
      contenedorCarritoProductos.classList.add("disabled")
      contenedorCarritoAcciones.classList.add("disabled")
      contenedorCarritoComprado.classList.add("disabled")
    }
    actualizarBotonesEliminar()
    actualizarTotal()
}

cargarProductosCarrito ()


function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach(boton => {
    boton.addEventListener("click", eliminarDelCarrito)
  });
}

function eliminarDelCarrito (e) {
  Toastify({
    text: "Producto eliminado",
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #46b086, #e8e4db)",
    },
    onClick: function(){} // Callback after click
  }).showToast();

  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)


productosEnCarrito.splice(index, 1)
cargarProductosCarrito ()

  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
}


botonVaciar.addEventListener("click", vaciarCarrito)
function vaciarCarrito() {

Swal.fire({
  position: 'bottom-end',
  icon: 'success',
  title: 'Vaciaste el carrito',
  showConfirmButton: false,
  timer: 1500
})
  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
  cargarProductosCarrito ()
}

function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
total.innerText = `$${totalCalculado}`
}

botonComprar.addEventListener("click", comprarCarrito)
function comprarCarrito() {

  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
  contenedorCarritoVacio.classList.add("disabled")
  contenedorCarritoProductos.classList.add("disabled")
  contenedorCarritoAcciones.classList.add("disabled")
  contenedorCarritoComprado.classList.remove("disabled")

}
const formulario = document.querySelector("#miFormulario");
const datosMostrados = document.querySelector("#datosMostrados");

formulario.addEventListener("submit", function(e) {
  e.preventDefault(); 


  const nombre = document.querySelector("#nombre").value;
  const email = document.querySelector("#email").value;

 
  datosMostrados.innerHTML = `
    <p>Nombre: ${nombre}</p>
    <p>Email: ${email}</p>
  `;


  formulario.reset();
});