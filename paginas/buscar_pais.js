//Modal
var btn_salir = document.getElementById("btn_salir");
var fondo_modal = document.getElementById("fondo_modal");
var modal = document.getElementById("modal");
var capital = document.getElementById("capital");
var poblacion = document.getElementById("poblacion");
var bandera = document.getElementById("bandera"); 
var nombre_pais = document.getElementById("pais");
var lenguaje = document.getElementById("lenguaje");
//Buscador
var buscador = document.getElementById("buscador");
var btn_buscar = document.getElementsByClassName("btn_buscar");
var recordar = JSON.parse(localStorage.getItem("buscador"));

var contenedor_paises = document.getElementById("contenedor_paises");
//Obtiene los paises del localStorage en caso de tenerlos 
var paises = JSON.parse(localStorage.getItem("paises"));

    //Valida que el localStorage tenga datos
    if(paises != undefined ||paises != null){
        crear_paises(paises,contenedor_paises);
    }

    //Recuerda la última busqueda
    if( recordar != undefined || recordar != null){
        buscador.value = recordar;
        buscar_pais(recordar,paises,contenedor_paises,"buscador");
    }else{
        //Valida que el localStorage este vacio para hacer la petición
        if(paises == undefined ||paises == null){
            cargar_paises();
        }
    }

    //Agrega el evento para recordar la última busqueda en la pagína
    for (const elemento of btn_buscar) {
        elemento.addEventListener("click", ()=>{
            buscar_pais(buscador.value,paises,contenedor_paises);
        })
    }

    //Cierra el modal
    btn_salir.addEventListener("click",()=>{
        try {
            fondo_modal.style.display = "none";
        } catch (error) {
            alert("A ocurrido un error")  
        }
    });

    //Cierra el modal
    fondo_modal.addEventListener("click",()=>{
        try {
            fondo_modal.style.display = "none";
        } catch (error) {
            alert("A ocurrido un error")  
        }
    });

    //Evita la propagacion del evento click
    modal.addEventListener("click",(event)=>{
        event.stopPropagation(); 
    });

    //Guarda la última busqueda realizada por el usario
    window.addEventListener("beforeunload", () => {
        localStorage.setItem("buscador", JSON.stringify(buscador.value));
    });