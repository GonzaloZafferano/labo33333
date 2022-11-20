import { crearTabla } from "./tablaDinamica.js";

const getElementosAXIOS = (url)=>{ 
    axios(url)
    .then((rta)=>{
        return rta.data;
    })  
    .catch((err)=>{
        console.error(err);
        console.error(err.message);
    });
}

const getElementosAsyncAXIOS = async (url)=>{ 
    try{
        //DESESTRUCTURO EL OBJETO.
        const {data} = await axios(url);
        return data;
    }catch(error){
        console.error(error.message);
    }
}

const getElementoPorIdAXIOS = (url, id)=>{   
    axios(url + "/" + id)
    .then((rta)=>{      
        return rta.data;
    })  
    .catch((err)=>{
        console.error(err);
        console.error(err.message);
    });
}

const getElementoPorIdAsyncAXIOS = async (url, id)=>{ 
    try{        
        const {data} = await axios(url + "/" + id);
        return data;
    }catch(error){
        console.error(error);
    }
}

const insertarElemento = (url, nuevoElemento)=>{    
    axios(url, {
        method : "POST",
        headers : {
            "Content-Type"  : "application/json"
        },
        //EN LUGAR DE USAR BODY, USA DATA.
        data : JSON.stringify(nuevoElemento)
    })
    .then(({data})=>{
        return data;
    })
    .catch((err)=>{
        console.log(err.message);
    });    
}

const deleteElementoPorIdAXIOS = (url, id)=>{  
    axios.delete(url + "/" + id)
    .then((rta)=>{       
        return rta.data;
    })  
    .catch((err)=>{
        console.error(err);
        console.error(err.message);
    });
}

const updateElementoAXIOS= (url, nuevoElemento)=>{
    axios(url + "/" + nuevoElemento.id, {
        method : "PUT",
        headers : {
            "Content-Type"  : "application/json"
        },
        data : JSON.stringify(nuevoElemento)
    })
    .then(({data})=>{
        return data;
    })
    .catch((err)=>{
        console.log(err.message);
    });    
}

export {deleteElementoPorIdAXIOS, getElementoPorIdAXIOS, getElementoPorIdAsyncAXIOS, getElementosAXIOS,getElementosAsyncAXIOS,
insertarElemento,updateElementoAXIOS,deleteElementoPorIdAXIOS,};