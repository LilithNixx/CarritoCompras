//captura de elementos:
const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();
const btns = document.querySelectorAll('.card .btn');

//objeto en el que se irán acumulando los objetos "producto" que se clickeen:
const carritoObjeto = {};

//función que permite agregar los objetos "producto" al objeto "carritoObjeto"
const agregarAlCarrito = (e)=>{
    //console.log(e.target.dataset.fruta) -> se trae la informacion del boton que se presionó;

    //objeto "Producto" (frutilla, banana, manzana):
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1
    };
    //condición para que aumente la cantidad de elementos marcadados si ya existen.
    if (carritoObjeto.hasOwnProperty(producto.titulo)){
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1;
    }
    
    //Se ingresa al "carritoObjeto" el producto clickeado:
    carritoObjeto[producto.titulo] = producto;

    pintarCarrito(producto);
}

//Función para ir "pintando" el carrito:
const pintarCarrito = (prod) =>{
    //El "carrito" (ul) comienza vacío:
    carrito.textContent = "";

    //Object.values() hace un array con los elementos del objeto "carritoObjeto" para que se pueda recorrer.
    Object.values(carritoObjeto).forEach(prod => {
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

