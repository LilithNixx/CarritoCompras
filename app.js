//captura de elementos:
const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('templateFooter');
const fragment = document.createDocumentFragment();

//array en el que se irán acumulando los objetos "producto" que se clickeen:
let carritoArray = [];

//capturar botones (e es el evento capturado):
document.addEventListener("click", (e) => {
    //console.log(e.target.matches(".card .btn-fruta"));
    if(e.target.matches(".card .btn-fruta")){ //matches() es true o false
        agregarAlCarrito(e);
    }
    if(e.target.matches(".list-group .btn-agregar")){
        btnAgregar(e);
    }
    if(e.target.matches(".btn-quitar")){
        btnQuitar(e);
    }
});

//función que permite agregar los objetos "producto" al objeto "carritoObjeto"
const agregarAlCarrito = (e)=>{
   // console.log(e.target.dataset.fruta) -> se trae la informacion del boton que se presionó;

    //crear un objeto "Producto" (frutilla, banana, manzana):
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    };
   
    //comprobamos si el carrito tiene elementos o está vacío (-1)
    const indice = carritoArray.findIndex((item) => item.id === producto.id);

    //si no está empujo el producto al carrito sino le sumo 1
    if(indice === -1){
        carritoArray.push(producto);
    }else {
        carritoArray[indice].cantidad ++;
    }

    pintarCarrito();
}

//Función para ir "pintando" el carritoArray:
const pintarCarrito = () =>{
    //El "carrito" (ul) comienza vacío:
    carrito.textContent = "";

    //recorremos el carritoArray
    carritoArray.forEach((prod) => {
        const clone = template.content.cloneNode(true); //Se crea un clon.
        
        //Se capturan los elementos que queremos mostrar y le modificamos el textContent con el del producto que se clickee.
        clone.querySelector('.lead').textContent = prod.titulo;
        clone.querySelector('.num').textContent = prod.cantidad;
        clone.querySelector('div .lead-total span').textContent = prod.precio * prod.cantidad;
        //Seleccionamos uno de los botones y le agregamos un dataset.id para igualarlo al id del producto:
        clone.querySelector('.btn-quitar').dataset.id = prod.id;
        clone.querySelector('.btn-agregar').dataset.id = prod.id;
        
        //usamos el fragment para que no haya reflow. Se almacena todo lo hecho anteriormente ahí ya que no está en el DOM.
        //Un Reflow sucede cuando un navegador debe procesar y pintar parte de, o toda una pagina web nuevamente, Como después de actualizar un sitio web interactivo
        fragment.appendChild(clone);
    });

    //Agregamos al "carrito" (ul) el fragmento
    carrito.appendChild(fragment);

    pintarFooter();
};

//Función para ir "pintando" el footer:
const pintarFooter = () => {
    footer.textContent = "";

    const total = carritoArray.reduce(
        (acc, current) => acc + current.cantidad * current.precio, 0
        );
        console.log(total);   
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector('p .total-precio').textContent = total;
    
    footer.appendChild(clone);
};

//Función para agregar productos:
const btnAgregar = (e) => {
    //console.log(e.target.dataset.id);
    carritoArray = carritoArray.map(item => {
       //si el id de la fruta es igual al clikeado se aumenta en 1 la cantidad
        if (item.id === e.target.dataset.id){
            item.cantidad ++;
        }
        return item
    })

    pintarCarrito();
};

//Función para quitar productos:
const btnQuitar = (e) => {
    carritoArray = carritoArray.filter(item => {
        if(item.id === e.target.dataset.id){
            if (item.cantidad > 0){
                item.cantidad--;
                if (item.cantidad === 0) return;
                return item;
            }
        }else {
            return item;
        }
    });
    pintarCarrito();
};



