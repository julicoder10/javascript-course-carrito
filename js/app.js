const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];
cargarEventListeners();

function cargarEventListeners(){
    //Se agrega un curso al "agregar carrito"
    listaCursos.addEventListener('click', agregarCurso)

    //elimina cursos del carrito

    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito

    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [] //reseteamos arreglo

        limpiarHTML(); //eliminamos todo el html
    })
}



//Functions


//Eimina un curso

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo por el id;

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML();
    }
}

function agregarCurso(e){
    e.preventDefault();


    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}



//Lee la info del curso al que le dimos click.

function leerDatosCurso(curso){
    console.log(curso);

    //Creo un objeto con la info del curso seleccionado.

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    
    //Revisa si el elemento ya existe en carrito.

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)

    if(existe){
        //Actualizo la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna objecto actualizado
            } else {
                return curso; //retorna objetos no duplicados.
            }
        } )
        articulosCarrito = [...cursos]
    } else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    // Agrega elementos al arreglo de carrito

    

    console.log(articulosCarrito)

    carritoHTML();
}

//Muestra el carrito de compras en html

function carritoHTML(){

    //Limpio el HTML

    limpiarHTML();


    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100"
            </td>
        
        
            <td>
                ${titulo}
            </td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `

        //Agrega el html a tbody

        contenedorCarrito.appendChild(row);
    })
}


//Elimina los cursos del tbody

function limpiarHTML(){

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}