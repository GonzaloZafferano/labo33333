function validarCampoVacio(e) {
  const input = e.target;
  input.value.trim() ? limpiarInputDeError(input) : setearErrorEnInput(input, "Campo requerido");
};

function validarNumero(e) {
  const numero = e.target.value;

  !isNaN(numero) && numero >= 0 && numero <= 5000 ? 
  limpiarInputDeError() :
  setearErrorEnInput(e.target, "Debe ingresar un numero entre 0 y 5000.");
}

function validarLongitudMaxima(input, maximo) {
  input.value.trim().length >= maximo ? setearErrorEnInput(input, `Max ${maximo} caracteres.`) : limpiarFormularioDeErroresDeValidacion();
}

function setearErrorEnInput(input, mensaje) {
  const $small = input.nextElementSibling;
  $small.textContent = mensaje || "Campo requerido";
  input.classList.add("inputError");
  $small.classList.add("smallError");
};

function limpiarInputDeError(input) {
  if(input)
  {
    const $small = input.nextElementSibling;
    $small.textContent = "";
    input.classList.remove("inputError");
    $small.classList.remove("smallError");
  }
};

function validarFecha(input){
  let fecha = input.target.value;

  if(fecha && fecha.length > 0)
  {
    
      if(fecha.includes("/")){
    
          let datos = fecha.split("/");
        if(datos.length == 3 && datos[0] > 0 && datos[0] < 32 &&
          datos[1] >0 && datos[1] < 13 &&
          datos[2] > 2000 && datos[2] <= new Date().getFullYear()){
            limpiarFormularioDeErroresDeValidacion(input);
            return;
          }
        }
        setearErrorEnInput(input.target, "Formato dd/mm/aaaa y entre el 2000 al " + new Date().getFullYear());

  }
}

function cargarValidacionesEnFormulario($formulario) {

  if ($formulario) {
    const controles = $formulario.elements;

    for (let i = 0; i < controles.length; i++) {
      const control = controles.item(i);

      if(control instanceof HTMLSelectElement){
        control.addEventListener("blur", validarCampoVacio);
      }

      if (control.matches("input")) {

        if (control.matches("[type=email]") ||
          control.matches("[type=text]") ||
          control.matches("[type=password]") ||
          control.matches("[type=number]") ||
          control.matches("[type=datetime]")) {

          control.addEventListener("blur", validarCampoVacio);
          if (control.matches("[type=email]")) {
            control.addEventListener("blur", validarEmail);
          } else if (control.matches("[type=password]")) {
            control.addEventListener("blur", validarPassword);
          }
          else if (control.matches("[type=number]")) {
            control.addEventListener("blur", validarNumero);
          }    else if (control.matches("[type=datetime]")) {
            control.addEventListener("blur", validarFecha);
          }



        } else if (control.matches("[type=file]")) {
          control.addEventListener("change", validarExtension);
        }
      }
    }
  }
}

function limpiarFormularioDeErroresDeValidacion(formulario) {

  if(formulario){
    const controles = formulario.elements;
  
    if(controles){
      for (let i = 0; i < controles.length; i++) {
    
        controles[i].classList.remove("inputError");
    
        if (controles[i] && controles[i].nextElementSibling && controles[i].nextElementSibling.tagName.toLowerCase() == "small") {
          controles[i].nextElementSibling.classList.remove("smallError");
          controles[i].nextElementSibling.innerHTML = "";
        }
      }
    }
  }
}

function existenInputsInvalidos(inputs) {
  if (inputs) {
    for (const input of inputs) {
      if (input.classList.contains("inputError")) {
        return true;
      }
    }
  }
}

export { cargarValidacionesEnFormulario, limpiarFormularioDeErroresDeValidacion, existenInputsInvalidos, validarLongitudMaxima };