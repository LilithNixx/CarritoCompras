//captura de elementos:
const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();
const btns = document.querySelectorAll('.card .btn');

//array en el que se irán acumulando los objetos "producto" que se clickeen:
const carritoArray = [];

//función que permite agregar los objetos "producto" al objeto "carritoObjeto"
const agregarAlCarrito = (e)=>{
    //console.log(e.target.dataset.fruta) -> se trae la informacion del boton que se presionó;

    //objeto "Producto" (frutilla, banana, manzana):
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1
    };
   
    //comprobamos si el carrito tiene elementos o está vacío (-1)
    const indice = carritoArray.findIndex((item) => item.id === producto.id);

    //si no está empujo el producto al carrito sino le sumo 1
    if(indice === -1){
        carritoArray.push(producto);
    }else {
        carritoArray[indice].cantidad ++;
    }

    pintarCarrito(carritoArray);
}

//Función para ir "pintando" el carritoArray:
const pintarCarrito = (array) =>{
    //El "carrito" (ul) comienza vacío:
    carrito.textContent = "";

    //recorremos el carritoArray
    array.forEach(prod => {
        const clone = template.content.firstElementChild.cloneNode(true); //Se crea un clon.
        
        //Se capturan los elementos que queremos mostrar y le modificamos el textContent con el del producto que se clickee.
        clone.querySelector('.lead').textContent = prod.titulo;
        clone.querySelector('.num').textContent = prod.cantidad;

        //usamos el fragment para que no haya reflow.
        //Un Reflow sucede cuando un navegador debe procesar y pintar parte de, o toda una pagina web nuevamente, Como después de actualizar un sitio web interactivo
        fragment.appendChild(clone);
    })

    //Agregamos al "carrito" (ul) el fragmento
    carrito.appendChild(fragment);
};

//detección de los botones. Cada vez que se detecta el click se agrega al carrito:
btns.forEach(btn =>btn.addEventListener('click', agregarAlCarrito));

