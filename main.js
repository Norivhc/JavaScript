//variables globales
let opcion1, opcion2;
let precio1, precio2;

//funciones
function pedirNombre() {
  let nombre = prompt("Por favor, ingrese su nombre");
  alert("¡Hola" + " " + nombre + "! Bienvenido/a a nuestro sitio web.");
  let eleccion = prompt(
    "¿Qué tipo de perfume desea ver? (mujer/hombre/niñas/niños)"
  ).toLowerCase();

  //condicionales
  if (eleccion === "mujer") {
    opcion1 = "Mugler Angel";
    precio1 = 4500.0;
    opcion2 = "Chanel Coco Mademoiselle";
    precio2 = 5400.0;

    alert("Opciones de perfumes para mujeres:");
    alert("1. " + opcion1 + " (ARS" + precio1 + ")");
    alert("2. " + opcion2 + " (ARS" + precio2 + ")");
  } else if (eleccion === "hombre") {
    opcion1 = "Dior Sauvage";
    precio1 = 4050.0;
    opcion2 = "Armani Code";
    precio2 = 3600.0;

    alert("Opciones de perfumes para hombres:");
    alert("1. " + opcion1 + " (ARS" + precio1 + ")");
    alert("2. " + opcion2 + " (ARS" + precio2 + ")");
  } else if (eleccion === "niñas") {
    opcion1 = "Barbie Princess Power";
    precio1 = 1125.0;
    opcion2 = "Disney Frozen";
    precio2 = 1350.0;

    alert("Opciones de perfumes para niñas:");
    alert("1. " + opcion1 + " (ARS" + precio1 + ")");
    alert("2. " + opcion2 + " (ARS" + precio2 + ")");
  } else if (eleccion === "niños") {
    opcion1 = "Marvel Spider-Man";
    precio1 = 900.0;
    opcion2 = "Disney Pixar Cars";
    precio2 = 1012.5;

    alert("Opciones de perfumes para niños:");
    alert("1. " + opcion1 + " (ARS" + precio1 + ")");
    alert("2. " + opcion2 + " (ARS" + precio2 + ")");
  } else {
    alert(
      "Por favor, ingrese una de las siguientes opciones: 'mujer', 'hombre', 'niñas' o 'niños'."
    );
    pedirNombre();
  }
}
pedirNombre();

let compraFinalizada = false;

while (!compraFinalizada) {
  let seleccion = prompt("Por favor, seleccione una opción de perfume (1 o 2)");

  if (seleccion === "1") {
    alert(
      "Usted ha seleccionado " + opcion1 + " por un precio de ARS" + precio1
    );
    compraFinalizada = true;
  } else if (seleccion === "2") {
    alert(
      "Usted ha seleccionado " + opcion2 + " por un precio de ARS" + precio2
    );
    compraFinalizada = true;
  }
}
