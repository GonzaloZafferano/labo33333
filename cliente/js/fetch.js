import { crearTabla } from "./tablaDinamica.js";

const getElementosFETCH = (url)=>{   
    fetch(url)
    .then((rta)=>{      
        if(rta.ok){
            return rta.json();
        }else{
            return Promise.reject(`Error: ${rta.status} - ${rta.statusText}`); 
        }
    })
    .then((dataOk)=>{
        return dataOk;
    })
    .catch((err)=>{
        console.error(err);
    });
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
    }
}

const getElementoPorIdFETCH = (url, id)=>{ 
    fetch(url + "/" + id)
    .then((rta)=>{    
        if(rta.ok){
            return rta.json();
        }else{
            return Promise.reject(`Error: ${rta.status} - ${rta.statusText}`); 
        }
    })
    .then((dataOk)=>{
        return dataOk;
    })
    .catch((err)=>{
        console.error(err);
    });
}

const updateElementoFETCH = (url, elemento)=>{  
    fetch(url + "/" + persona.id,
    {
        method: "PUT",
        headers:{
            "Content-Type"  :"application/json"
        },
        body : JSON.stringify(persona)
    })
    .then((rta)=>{   
        if(rta.ok){
            return rta.json();
        }else{
            return Promise.reject(`Error: ${rta.status} - ${rta.statusText}`); 
        }
    })
    .then((dataOk)=>{
        return dataOk;
    })
    .catch((err)=>{
        console.error(err);
    });
}

const borrarElementoPorIdFETCH = (url, id)=>{   
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
        return dataOk;
    })
    .catch((err)=>{
        console.error(err);
    });
}

export {borrarElementoPorIdFETCH,getElementoPorIdFETCH,getElementosAsyncFETCH,getElementosFETCH,updateElementoFETCH};