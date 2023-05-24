// Variables globales
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
});
