const listado = leerLista() || [];

function guardarLista(){ 
    localStorage.setItem("lista", JSON.stringify(listado));   
}

function leerLista(){   
    return JSON.parse(localStorage.getItem("lista")) 
}

function actualizarItem(item){
    if(item){

        let indice = listado.findIndex((x)=>{
            return x.id == item.id;
        });
        listado.splice(indice, 1);
        listado.push(item);
    
        guardarLista();  
    }
}

function borrarItem(item){
    if(item){

        let indice = listado.findIndex((x)=>{
            return x.id == item.id;
        });
        listado.splice(indice, 1);
    
        guardarLista();  
    }
}

function insertarItem(item){
    if(item){
        listado.push(item);    
        guardarLista();  
    }
}

export{leerLista, guardarLista, actualizarItem, insertarItem, borrarItem, listado};