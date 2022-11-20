const URL = "http://localhost:3000/mascotas";

const $spinner = document.getElementById("spinner");
const $contenidoDinamico = document.getElementById("contenidoDinamico");
let sePuedeOperar = true;

//getElementosAJAX(URL);
//getElementosAXIOS(URL);
getElementosFETCH(URL);

function crearArticulo(item) {
    const divCard = document.createElement("div");
    const articulo = document.createElement("article");
    const titulo = document.createElement("h3");
    const precio = document.createElement("p");
    const descripcion = document.createElement("p");
    const raza = document.createElement("p");
    const fecha = document.createElement("p");
    const vacunas = document.createElement("p");
    const boton = document.createElement("button");

    const iraza = document.createElement("i");
    const ivacunas = document.createElement("i");
    const ifecha = document.createElement("i");

    const divraza = document.createElement("div");
    const divvacunas = document.createElement("div");
    const divfecha = document.createElement("div");
    const divCaracteristicas = document.createElement("div");

    divvacunas.appendChild(vacunas);
    divfecha.appendChild(fecha);
    divraza.appendChild(raza);

    divCaracteristicas.appendChild(divraza);
    divCaracteristicas.appendChild(divfecha);
    divCaracteristicas.appendChild(divvacunas);

    vacunas.appendChild(ivacunas);
    fecha.appendChild(ifecha);
    raza.appendChild(iraza);

    ifecha.setAttribute("class", "fas fa-dove");
    ivacunas.setAttribute("class", "fas fa-syringe");
    iraza.setAttribute("class", "fas fa-dog");
    titulo.classList.add("card-title");
    raza.classList.add("card-text");
    vacunas.classList.add("card-text");
    fecha.classList.add("card-text");
    descripcion.classList.add("card-text");
    precio.classList.add("card-text");
    divCard.classList.add("card");
    divCard.classList.add("mb-3");
    boton.classList.add("btn");
    boton.classList.add("btn-success");
    divCard.classList.add("estiloParaArticulo");

    divCard.appendChild(titulo);

    articulo.appendChild(titulo);
    articulo.appendChild(descripcion);
    articulo.appendChild(precio);
    articulo.appendChild(divCaracteristicas);
    articulo.appendChild(boton);

    titulo.appendChild(document.createTextNode(item.titulo));
    vacunas.appendChild(document.createTextNode(item.vacuna));
    precio.appendChild(document.createTextNode(item.precio));
    raza.appendChild(document.createTextNode(item.raza));
    fecha.appendChild(document.createTextNode(item.fecha));
    descripcion.appendChild(document.createTextNode(item.descripcion));

    const i = document.createElement("i");
    i.setAttribute("class", "fa-solid fa-paw");    
    boton.appendChild(i);
    boton.appendChild(document.createTextNode("Ver Mascota"));

    articulo.classList.add("estiloParaArticulo");

    return articulo;
}

function crearArticulos(listado) {
    const fragmento = document.createDocumentFragment();
    listado.forEach(item => {
        fragmento.appendChild(crearArticulo(item));
    });
    $contenidoDinamico.appendChild(fragmento);
}






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
                        console.log(data);   
                        crearArticulos(data);
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
            crearArticulos(dataOk);
        })
        .catch((err)=>{
            console.error(err);
        })    .finally(()=>{
            removeSpinner();
            sePuedeOperar = true;
        });
    }  
}

function getElementosAXIOS (url){ 

    if(sePuedeOperar){
        setSpinner();
        sePuedeOperar = false;
        axios(url)
        .then((rta)=>{          
            crearArticulos(rta.data);
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