import { crearTabla } from "./tablaDinamica.js";

const getElementosAJAX = (url, callback)=>{    
    if(url){
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState === 4){           
                if(xhr.status >= 200 && xhr.status < 300){               
                    const data = JSON.parse(xhr.responseText); 
                    callback(data);
                }else{
                    console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            }
        });
        xhr.open("GET", url);    
        xhr.send();
    }
}

const getElementoPorIdAJAX = (url, id)=>{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState === 4){  
            if(xhr.status >= 200 && xhr.status < 300){
                console.log(xhr);
                const data = JSON.parse(xhr.responseText);
                return data;
            }else{
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("GET", url +"/" + id);    
    xhr.send();
}

const insertarElementoAJAX = (url, nuevoElemento)=>{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState === 4){           
            if(xhr.status >= 200 && xhr.status < 300){ 
                const data = JSON.parse(xhr.responseText);
            }else{
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("POST", url);       
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(nuevoElemento));
}

const actualizarElementoAJAX = (url, elemento)=>{ 
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState === 4){           
            if(xhr.status >= 200 && xhr.status < 300){ 
                console.log(xhr);
                const data = JSON.parse(xhr.responseText);
            }else{
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("PUT", url + "/" + elemento.id);        
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(elemento));
}

const borrarElementoAJAX = (url, id)=>{ 
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300){         
                const data = JSON.parse(xhr.responseText);
            }else{
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("DELETE", url +"/" + id);    
    xhr.send();
}

export {actualizarElementoAJAX,borrarElementoAJAX, getElementoPorIdAJAX, getElementosAJAX, insertarElementoAJAX};