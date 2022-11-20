
class Anuncio{
    
    constructor(id,titulo, descripcion, animal, precio){

        if(!id){
            id = Date.now();
        }

        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.animal = animal;
        this.precio = `$${new Intl.NumberFormat('de-DE').format(precio)}`;
    }
}

class Anuncio_Mascota extends Anuncio{

    constructor(id,titulo, descripcion, animal, precio,raza, fecha, vacuna){
        super(id, titulo, descripcion, animal, precio);
       
        this.raza = raza;
        this.fecha = fecha;
        this.vacuna = vacuna;
    }
}

export {Anuncio_Mascota};