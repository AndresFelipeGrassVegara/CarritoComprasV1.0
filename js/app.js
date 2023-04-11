// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito= [];

//Listeners
cargarEventListeners();


function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar carrito"
    listaCursos.addEventListener('click', agregarCurso);
    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso );
    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; // Reseteamos el arreglo
        LimpiarHTML(); //Eliminamos todo el HTML
    } )
    }




//Funciones
function agregarCurso(e){
// Previene la opcion por default de subir
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        // se crea una variable para pasar el curso que se selecciono
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        //console.log(e.target)

    }
   
}
//Elimina un curso del carrito
function eliminarCurso (e) {
    //console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso =>curso.id !==cursoId);
        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
    }
}


// Lee el contenido del HTML que le dimos click y extrae la info del curso

function leerDatosCurso(curso){
    //crear un objeto con elc ontenido del cuso actual
        const infocurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso=> curso.id === infocurso.id);
    if(existe) {
        //Actualizamos la cantidad
        const cursos= articulosCarrito.map(curso => {
         if (curso.id === infocurso.id)  {
             curso.cantidad++;
             return curso; //retorna el objeto actualizado
         } else {
            return curso;  // retorna los objetos que no son duplicados
         }
        })
        articulosCarrito =[...cursos];
    }else {
        // Agrega elementos al arreglo del carrito
   articulosCarrito=[...articulosCarrito, infocurso];
    }





   

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    LimpiarHTML();

    //Recorre el carrito
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;

        
        const row =document.createElement('tr');
        row.innerHTML = `
           <td>
              <img src=${imagen} width="100">
            </td>

            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X  </a>
            </td>
        `;
        //Agrega el HTML del carrito en el Tbody
        contenedorCarrito.appendChild(row);
        
    });
}

//Elimina los cursos del tbody
function LimpiarHTML() {
    //Forma lenta
   // contenedorCarrito:innerHTML = '';
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild) 
            
        

    }
}