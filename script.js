// Obtener los elementos input de horas y minutos
const inputHoras = document.getElementById("horasL");
const inputMinutos = document.getElementById("minutosL");

// Obtener la tabla donde se insertarán los valores
const tablaHoras = document.getElementById("tablaHoras");

// Crear un array para almacenar los valores de horas y minutos
const horasMinutosArray = [];

// Función para agregar los valores de horas y minutos al array y a la tabla
function agregarHorasMinutos(horas, minutos) {
  // Agregar los valores al array
  horasMinutosArray.push({ horas, minutos });

  // Crear una nueva fila en la tabla y agregar los valores
  const fila = tablaHoras.insertRow();
  const celdaHoras = fila.insertCell();
  const celdaMinutos = fila.insertCell();

  celdaHoras.textContent = horas;
  celdaMinutos.textContent = minutos;

  // Limpiar los campos de entrada
  inputHoras.value = '';
  inputMinutos.value = '';
}

// Agregar un evento al botón "Calcular" para ejecutar la función agregarHorasMinutos
function introducir() {
  const horas = inputHoras.value;
  const minutos = inputMinutos.value;

  // Validar que los campos no estén vacíos y sean números enteros
  if (horas && minutos && Number.isInteger(Number(horas)) && Number.isInteger(Number(minutos))) {
    // Agregar los valores al array y a la tabla
    agregarHorasMinutos(horas, minutos);
  } else {
    alert("Introduce números enteros");
  }

  // Limpiar los campos de entrada
  inputHoras.value = "";
  inputMinutos.value = "";
}

function mostrarTotal() {
  let totalHoras = 0;
  let totalMinutos = 0;

  // Sumar las horas y minutos del array
  horasMinutosArray.forEach(({ horas, minutos }) => {
    totalHoras += Number(horas);
    totalMinutos += Number(minutos);
  });

  // Convertir los minutos excedentes en horas si superan 60 minutos
  const horasExtra = Math.floor(totalMinutos / 60);
  totalHoras += horasExtra;
  totalMinutos %= 60;

  // Mostrar el resultado en un elemento HTML
  const resultado = document.getElementById("resultado");
  resultado.textContent = `Total: ${totalHoras} horas y ${totalMinutos} minutos`;
}

function borrar() {
  // Vaciar el array
  horasMinutosArray.length = 0;

  // Eliminar las filas de la tabla
  tablaHoras.innerHTML = "<thead><tr><th>Horas</th><th>Minutos</th></tr></thead>";

  // Limpiar el contenido del elemento de resultado
  const resultado = document.getElementById("resultado");
  resultado.textContent = "";
}

function mostrarDatosTabla() {
  // Eliminar todas las filas existentes en la tabla
  while (tablaHoras.rows.length > 1) {
    tablaHoras.deleteRow(1);
  }

  // Recorrer el array y agregar los valores a la tabla
  horasMinutosArray.forEach(({ horas, minutos }) => {
    const fila = tablaHoras.insertRow();
    const celdaHoras = fila.insertCell();
    const celdaMinutos = fila.insertCell();

    celdaHoras.textContent = horas;
    celdaMinutos.textContent = minutos;
  });
}

function leerArchivo() {
  const archivo = document.getElementById("archivoTiempo").files[0];
  const lector = new FileReader();

  lector.onload = function (evento) {
    const contenido = evento.target.result;
    procesarContenidoTiempo(contenido);
  };

  lector.readAsText(archivo);
}

function procesarContenidoTiempo(contenido) {
  const lineas = contenido.trim().split("\n");
  const formato = detectarFormatoContenido(lineas);

  if (formato === "formato1") {
    procesarFormato1(lineas);
  } else if (formato === "formato2") {
    procesarFormato2(lineas);
  } else {
    alert("Formato de contenido no reconocido");
  }
}

function detectarFormatoContenido(lineas) {
    const formato1Regex = /^\s*\d{2}:\d{2}\s*$/;
  
    if (lineas.every((linea) => formato1Regex.test(linea))) {
      return "formato1";
    }
  
    const formato2Regex = /\t\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2}\s+\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2}\s+\d{2}:\d{2}\s*/;
  
    if (lineas.every((linea) => formato2Regex.test(linea))) {
      return "formato2";
    }
  
    return "desconocido";
  }

function procesarFormato1(lineas) {
  lineas.forEach((linea) => {
    const [horas, minutos] = linea.trim().split(":");
    agregarHorasMinutos(horas, minutos);
  });
}

function procesarFormato2(lineas) {
  lineas.forEach((linea) => {
    const tiempo = linea.trim().split("\t")[3];
    const [horas, minutos] = tiempo.substr(-5).split(":");
    agregarHorasMinutos(horas, minutos);
  });
}

function agregarTiempoATablaYArray(horas, minutos) {
  agregarHorasMinutos(horas, minutos);
}
