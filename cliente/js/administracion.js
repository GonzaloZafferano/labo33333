import { crearTabla } from "./tablaDinamica.js";
import { Anuncio_Mascota } from "./clase.js";
//import { actualizarItem, borrarItem, insertarItem, listado } from "./localStorage.js";


//import {actualizarElementoAJAX,borrarElementoAJAX,getElementoPorIdAJAX,getElementosAJAX,insertarElementoAJAX} from "./ajax.js";

//import {borrarElementoPorIdFETCH,getElementoPorIdFETCH,getElementosAsyncFETCH,getElementosFETCH,updateElementoFETCH} from "./fetch.js";

//import {deleteElementoPorIdAXIOS,getElementoPorIdAXIOS,getElementoPorIdAsyncAXIOS,getElementosAXIOS,getElementosAsyncAXIOS,insertarElemento,updateElementoAXIOS} from "./axios.js";

import { cargarValidacionesEnFormulario, validarLongitudMaxima,limpiarFormularioDeErroresDeValidacion, existenInputsInvalidos } from "./validaciones.js";

let hayModificacion = false;
let sePuedeOperar = true;

const URL = "http://localhost:3000/mascotas";

const $spinner = document.getElementById("spinner");
const $tabla = document.getElementById("tablaDinamica");
const filterSelect = document.getElementById("filter");
const $inputPromedio = document.getElementById("promedio");
const tituloForm = document.getElementById("tituloForm");
const $chkTitulo = document.getElementById("chkTitulo");
const $chkDescripcion = document.getElementById("chkDescripcion");
const $chkAnimal = document.getElementById("chkAnimal");
const $chkPrecio = document.getElementById("chkPrecio");
const $chkRaza = document.getElementById("chkRaza");
const $chkFecha = document.getElementById("chkFecha");
const $chkVacuna = document.getElementById("chkVacuna");
const $formulario = document.forms[0];
const checkBoxList = document.querySelectorAll(".chk");
const { id, agregar, limpiar, eliminar, titulo, descripcion, gato, perro, precio, raza, fecha, inyeccion } = $formulario;

filterSelect.addEventListener("change", ()=>{
    getElementosAJAX(URL);
    //getElementosAXIOS(URL);
    //getElementosFETCH(URL);
});
checkBoxList.forEach(x =>{
    x.addEventListener("change", ()=>{
        getElementosAJAX(URL);
      //  getElementosAXIOS(URL);
        //getElementosFETCH(URL);
    });
});

actualizarTabla();
cargarValidacionesEnFormulario($formulario);

titulo.addEventListener("change", ()=>{hayModificacion = true;});
descripcion.addEventListener("change", ()=>{hayModificacion = true;});
precio.addEventListener("change", ()=>{hayModificacion = true;});
gato.addEventListener("change", ()=>{hayModificacion = true;});
perro.addEventListener("change", ()=>{hayModificacion = true;});
raza.addEventListener("change", ()=>{hayModificacion = true;});
fecha.addEventListener("change", ()=>{hayModificacion = true;});
inyeccion.addEventListener("change", ()=>{hayModificacion = true;});
descripcion.addEventListener("blur", (e)=>{validarLongitudMaxima(e.target, 25);});
titulo.addEventListener("blur",  (e)=>{validarLongitudMaxima(e.target, 25);});

$formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if(hayModificacion){ 
        if(!existenInputsInvalidos(e.target.elements) && inyeccion.value && (gato.checked || perro.checked)){
            
            let idItem = id.dataset.id || 0;
            let animal = perro.checked ? "perro" : "gato";

            let item = new Anuncio_Mascota(idItem, titulo.value, descripcion.value, animal, precio.value, raza.value, fecha.value, inyeccion.value);
        
            if (!idItem) {
                insertarElementoAJAX(URL, item);
                //insertElementoFETCH(URL, item);
               // insertarElementoAXIOS(URL, item);
               //insertElementoAsyncFETCH(URL, item);
                    
            } else {
                if(confirm("Realmente desea modificar la mascota?")){
                    //actualizarElementoAJAX(URL, item);
                    //updateElementoFETCH(URL, item);
                    updateElementoAXIOS(URL, item);
                }
                limpiarFormulario();
            }
        }else{
            alert("Faltan completar campos o hay datos invalidos.");
        }
    }else{
        alert("No se han realizado modificaciones para guardar.");
    }
});

eliminar.addEventListener("click", (e)=>{
    let idItem = id.dataset.id;
  //  borrarElementoAJAX(URL, idItem);
    //borrarElementoPorIdFETCH(URL, idItem);
    deleteElementoPorIdAXIOS(URL, idItem);
   limpiarFormulario();
});

limpiar.addEventListener("click", (e)=>{
    limpiarFormulario();
});

$tabla.addEventListener("click", (e) => {
    const elemento = e.target;
    if (elemento.matches("td")) {
        limpiarFormularioDeErroresDeValidacion($formulario);
        let itemId = elemento.parentElement.dataset.id;
        
       // getElementoPorIdAJAX(URL, itemId);
        //getElementoPorIdFETCH(URL, itemId);
        getElementoPorIdAXIOS(URL, itemId);
    }
});

function limpiarFormulario(){
    hayModificacion = false;
    $formulario.reset();

    const i = document.createElement("i");
    i.setAttribute("class", "fa-solid fa-floppy-disk");  
    agregar.innerHTML = "";
    agregar.appendChild(i);
    agregar.appendChild(document.createTextNode("Guardar"));

    limpiar.innerHTML = "Limpiar";
    tituloForm.innerHTML = "Formulario de Alta";
    eliminar.classList.add("d-none");
    id.dataset.id = "";
    limpiarFormularioDeErroresDeValidacion($formulario);
}

function actualizarTabla() {
    limpiarTabla();
    //getElementosAJAX(URL); 
    //getElementosFETCH(URL);
    getElementosAXIOS(URL);
};

function limpiarTabla(){
    while ($tabla.hasChildNodes()) {
        $tabla.removeChild($tabla.firstElementChild);
    }
}

function setSpinner () {
    if(!$spinner.hasChildNodes()){
        const i = document.createElement("i");
        $spinner.classList.add("m-5");
        i.setAttribute("class", "fas fa-paw fa-spin");
        $spinner.appendChild(i);
    }
}

function removeSpinner (){
    while($spinner.hasChildNodes()){
        $spinner.removeChild($spinner.firstElementChild);
    }
    $spinner.classList.remove("m-5");
}

function cargarTablaConDatos(datos){
    limpiarTabla();

    if(filterSelect.value == 2){
        datos = datos.filter(x  => x.animal.toLowerCase() == "perro");
    }else if(filterSelect.value == 3){
        datos = datos.filter(x  => x.animal.toLowerCase() == "gato");
    }
        
    if(filterSelect.value != 1){
        let totalPrecio = datos.reduce((p, v, i, array)=> (p + parseFloat(v.precio.replace("$","").replaceAll(".", ""))/(array.length)), 0);
        $inputPromedio.value = totalPrecio.toFixed(2);
    }else{
        $inputPromedio.value = "N/A";
    }

    if(!chkAnimal.checked){
        datos = datos.map(x => {delete x.animal; return x;});
    }
    if(!chkDescripcion.checked){
        datos = datos.map(x => {delete x.descripcion; return x;});
    }
    if(!chkFecha.checked){
        datos = datos.map(x => {delete x.fecha; return x;});
    }
    if(!chkPrecio.checked){
        datos = datos.map(x => {delete x.precio; return x;});
    }
    if(!chkRaza.checked){
        datos = datos.map(x => {delete x.raza; return x;});
    }
    if(!chkTitulo.checked){
        datos = datos.map(x => {delete x.titulo; return x;});
    }
    if(!chkVacuna.checked){
        datos = datos.map(x => {delete x.vacuna; return x;});
    }    
    $tabla.appendChild(crearTabla(datos));
}

function cargarFormulario(item) {
    id.dataset.id = item.id;
    titulo.value = item.titulo;
    descripcion.value = item.descripcion;
    precio.value = item.precio.replace("$","").replaceAll(".", "");
    fecha.value = item.fecha;
    raza.value = item.raza;
    gato.checked = item.animal.toLowerCase() == "gato";
    perro.checked = item.animal.toLowerCase() == "perro";
    inyeccion.value = item.vacuna;
    
    agregar.innerHTML = "Actualizar";
    limpiar.innerHTML = "Cancelar";
    tituloForm.innerHTML = "Formulario de Modificacion";
    eliminar.classList.remove("d-none");
    //eliminar.classList.add("mostrar");
}



//AJAX
function getElementosAJAX (url){    
    if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();  
        if(url){
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", ()=>{
                if(xhr.readyState === 4){           
                    if(xhr.status >= 200 && xhr.status < 300){               
                        const data = JSON.parse(xhr.responseText);    
                        cargarTablaConDatos(data);
                    }else{
                        console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                    }
                    removeSpinner();
                    sePuedeOperar = true;
                }
            });
            xhr.open("GET", url);    
            xhr.send();
        }
    }
}

function getElementoPorIdAJAX (url, id){
    if(sePuedeOperar){
        setSpinner();
    sePuedeOperar = false;

        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState === 4){  
                if(xhr.status >= 200 && xhr.status < 300){
                    console.log(xhr);
                    const data = JSON.parse(xhr.responseText);                 
                    cargarFormulario(data); 
                }else{
                    console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
                removeSpinner();
                sePuedeOperar = true;
            }
        });
        xhr.open("GET", url +"/" + id);    
        xhr.send();
    }
}

function insertarElementoAJAX (url, nuevoElemento){
    if(sePuedeOperar){
  
        setSpinner();
        sePuedeOperar = false;
    
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{            
            if(xhr.readyState === 4){           
                if(xhr.status >= 200 && xhr.status < 300){ 
                    const data = JSON.parse(xhr.responseText);
                   // actualizarTabla();                    
                }else{
                    console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
                removeSpinner();
                sePuedeOperar = true;
            }
        });
        xhr.open("POST", url);       
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(nuevoElemento));

    }
}

function actualizarElementoAJAX (url, elemento){ 
    if(sePuedeOperar){

        setSpinner();
    sePuedeOperar = false;

        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState === 4){           
                if(xhr.status >= 200 && xhr.status < 300){              
                    const data = JSON.parse(xhr.responseText);                    
                    actualizarTabla();
                }else{
                    console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
                removeSpinner();
                sePuedeOperar = true;
            }
        });
        xhr.open("PUT", url + "/" + elemento.id);        
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(elemento));
    }
}

function borrarElementoAJAX (url, id){ 
    if(sePuedeOperar){
       
        setSpinner();
        sePuedeOperar = false;
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300){         
                    const data = JSON.parse(xhr.responseText);
                    actualizarTabla();
                }else{
                    console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
                removeSpinner();
                sePuedeOperar = true;
            }
        });
        xhr.open("DELETE", url +"/" + id);    
        xhr.send();

    }
}







//FETCH
function getElementosFETCH (url){ 
    if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();
        fetch(url)
        .then((rta)=>{      
            if(rta.ok){
                return rta.json();
            }else{
                return Promise.reject(`Error: ${rta.status} - ${rta.statusText}`); 
            }
        })
        .then((dataOk)=>{   
            cargarTablaConDatos(dataOk);
        })
        .catch((err)=>{
            console.error(err);
        })    .finally(()=>{
            removeSpinner();
            sePuedeOperar = true;
        });
    }  
}

const getElementosAsyncFETCH = async (url)=>{ 
    
    try{
        const res = await fetch(url);
        if(!res.ok){
            throw new Error("Error: " + res.status+ " - " +res.statusText);
        }
        const data = await res.json();
        return data;
    }catch(error){
        console.error(error);
    }finally{

    }
}

function getElementoPorIdFETCH (url, id){ 
    if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();
        fetch(url + "/" + id)
        .then((rta)=>{    
            if(rta.ok){
                return rta.json();
            }else{
                return Promise.reject(`Error: ${rta.status} - ${rta.statusText}`); 
            }
        })
        .then((dataOk)=>{
            cargarFormulario(dataOk); 
        })
        .catch((err)=>{
            console.error(err);
        }).finally(()=>{
            removeSpinner();
            sePuedeOperar = true;
        });
    }
}


function insertElementoFETCH(url, elemento){

    if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();
        fetch(url,
        {
            method: "POST",
            headers:{
                "Content-Type"  :"application/json"
            },
            body : JSON.stringify(elemento)
        })
        .then((rta)=>{   
            if(rta.ok){
                return rta.json();
            }else{
                return Promise.reject(`Error: ${rta.status} - ${rta.statusText}`); 
            }
        })
        .then((dataOk)=>{
            actualizarTabla();
        })
        .catch((err)=>{
            console.error(err);            
        }).finally(()=>{
            sePuedeOperar = true;
            removeSpinner();
        });
    }


/*

    try {    
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(nota),
      };
      let res = await fetch("/nueva_nota_spa", options); 
      let mensaje = await res.json();
      console.log(mensaje);   
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
       actualizarNotas();
    } catch (error) {
      let message = error.statusText || "Ocurrió un error";
      console.error(message);
    }

    */
  };



  const insertElementoAsyncFETCH = async (url, elemento)=>{

    if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();

        try {    
            const options = {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=utf-8",
              },
              body: JSON.stringify(elemento),
            };
            let res = await fetch(url, options); 
            let mensaje = await res.json();
            console.log(mensaje);   
            if (!res.ok) throw { status: res.status, statusText: res.statusText };
            actualizarTabla();
          } catch (error) {
            let message = error.statusText || "Ocurrió un error";
            console.error(message);
          }
          finally{
              sePuedeOperar = true;
              removeSpinner();
          }
    }
  };


function updateElementoFETCH (url, elemento){  

    if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();
        fetch(url + "/" + elemento.id,
        {
            method: "PUT",
            headers:{
                "Content-Type"  :"application/json"
            },
            body : JSON.stringify(elemento)
        })
        .then((rta)=>{   
            if(rta.ok){
                return rta.json();
            }else{
                return Promise.reject(`Error: ${rta.status} - ${rta.statusText}`); 
            }
        })
        .then((dataOk)=>{
            actualizarTabla();
        })
        .catch((err)=>{
            console.error(err);
        })    .finally(()=>{
            removeSpinner();
            sePuedeOperar = true;
        });    
    }
}

function borrarElementoPorIdFETCH (url, id){  
    
    if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();
        fetch(url + "/" + id,
        {
            method: "DELETE"       
        })
        .then((rta)=>{    
            if(rta.ok){
                return rta.json();
            }else{
                return Promise.reject(`Error: ${rta.status} - ${rta.statusText}`); 
            }
        })
        .then((dataOk)=>{
            actualizarTabla();
        })
        .catch((err)=>{
            console.error(err);
        }).finally(()=>{
            removeSpinner();
            sePuedeOperar = true;
        });
    }
}






//AXIOS
function getElementosAXIOS (url){ 

    if(sePuedeOperar){
        setSpinner();
        sePuedeOperar = false;
        axios(url)
        .then((rta)=>{          
            cargarTablaConDatos(rta.data);
        })  
        .catch((err)=>{
            console.error(err);
            console.error(err.message);
        }).finally(()=>{
            removeSpinner();
        sePuedeOperar = true;
        });
    }
}

const getElementosAsyncAXIOS = async (url)=>{ 
    try{
        //DESESTRUCTURO EL OBJETO.
        const {data} = await axios(url);
        return data;
    }catch(error){
        console.error(error.message);
    }finally{
        removeSpinner();
    }
}

function getElementoPorIdAXIOS (url, id){   
    if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();
        axios(url + "/" + id)
        .then((rta)=>{                  
            cargarFormulario(rta.data);
        })  
        .catch((err)=>{
            console.error(err);
            console.error(err.message);
        }).finally(()=>{
            removeSpinner();
            sePuedeOperar = true;
        });
    }
}

const getElementoPorIdAsyncAXIOS = async (url, id)=>{ 
    try{        
        const {data} = await axios(url + "/" + id);
        return data;
    }catch(error){
        console.error(error);
    }finally{
        removeSpinner();
    }
}

function insertarElementoAXIOS (url, nuevoElemento){    

    if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();
        axios(url, {
            method : "POST",
            headers : {
                "Content-Type"  : "application/json"
            },
            //EN LUGAR DE USAR BODY, USA DATA.
            data : JSON.stringify(nuevoElemento)
        })
        .then(({data})=>{
            actualizarTabla();
        })
        .catch((err)=>{
            console.log(err.message);
        }).finally(()=>{
            removeSpinner();
            sePuedeOperar = true;
        });  
    }
}

function deleteElementoPorIdAXIOS (url, id){  
    if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();
        axios.delete(url + "/" + id)
        .then((rta)=>{       
            actualizarTabla();
        })  
        .catch((err)=>{
            console.error(err);
            console.error(err.message);
        }).finally(()=>{
            removeSpinner();
            sePuedeOperar = true;
        });
    }
}

function updateElementoAXIOS (url, nuevoElemento){
    if(sePuedeOperar){
        sePuedeOperar = false;
         setSpinner();
         axios(url + "/" + nuevoElemento.id, {
             method : "PUT",
             headers : {
                 "Content-Type"  : "application/json"
             },
             data : JSON.stringify(nuevoElemento)
         })
         .then(({data})=>{
            actualizarTabla();

         })
         .catch((err)=>{
             console.log(err.message);
         }).finally(()=>{
             removeSpinner();
             sePuedeOperar = true;
         });   
    }
}