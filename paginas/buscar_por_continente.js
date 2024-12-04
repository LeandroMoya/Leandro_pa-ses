var contenedor_paises = document.getElementById("contenedor_paises");
var btn_buscar = document.querySelector(".btn_buscar");
var nombre_regiones = document.getElementById("nombre_region");
//Regiones
var antartida = document.getElementById("antartida");
var america = document.getElementById("america");
var africa = document.getElementById("africa");
var europa = document.getElementById("europa");
var asia = document.getElementById("asia");
var oceania = document.getElementById("oceania");
var nombre_pais = document.getElementById("pais");
//Obtiene los paises del localStorage en caso de tenerlos 
var paises = JSON.parse(localStorage.getItem("paises"));

    async function cargar_paises_region() {
        try {
            //Realiza la petición
            let resultado = await obtener_paises();
            //Obtiene una promesa
            let paises = await resultado.json();
            //El mapa crea un arreglo solo con la información necesaria
            let mapa = paises.map(pais_consulta => ({
                name: pais_consulta.name.common,
                capital: pais_consulta.capital,
                region : pais_consulta.region,
                population: pais_consulta.population,
                flags: pais_consulta.flags.png,
                languages : pais_consulta.languages
              })
            );
            //Guarda los paises obtenidos de la promesa
            localStorage.setItem("paises", JSON.stringify(mapa));
            let nombre_region = validar_region(nombre_regiones.value);
            //Crea todos lo paises
            buscar_pais_region(nombre_region,paises,contenedor_paises);
        } catch (error) {
            alert("A ocurrido un error")  
        }
    }

    //Valida que el localStorage este vacio para hacer la petición
    if(paises == undefined ||paises == null){
        cargar_paises_region();
    }

    //Valida que el localStorage tenga información para útilizarla
    if(paises != undefined || paises != null){
        let nombre_region = validar_region(nombre_regiones.value);
        buscar_pais_region(nombre_region,paises,contenedor_paises);
    }

    //Agrega el evento de buscar al botón
    btn_buscar.addEventListener("click",()=>{
        
        let nombre_region = validar_region(nombre_regiones.value);
        //Busca todos los paises pertenecientes a una region
        buscar_pais_region(nombre_region,paises,contenedor_paises);
    });

    //Busca los paises por region
    function buscar_pais_region(nombre_region,paises,contenedor_paises_region) {
        try {
            //Se pasa todo el texto a minuscula y se buscan las concidencias
            //Con el texto de los paises
            let paises_filtrados = paises.filter(pais => 
                pais.region.toLowerCase().includes(nombre_region.toLowerCase()));
                //Carga la nueva lista de paises
                crear_paises(paises_filtrados,contenedor_paises_region)
        } catch (error) {
            alert("A ocurrido un error")  
        }
    }

    //Agrega el evento a cada imagen de cada continente para realizar la busqueda
    //Por region
    antartida.addEventListener("click",()=>{
        try {
            nombre_regiones.value = "Antartida";
            buscar_pais_region("Antarctic",paises,contenedor_paises);
        } catch (error) {
            alert("A ocurrido un error")  
        }
    });

    america.addEventListener("click",()=>{
        try {
            nombre_regiones.value = "America";
            buscar_pais_region("Americas",paises,contenedor_paises);
        } catch (error) {
            alert("A ocurrido un error")  
        }
    });

    africa.addEventListener("click",()=>{
        try {
            nombre_regiones.value = "Africa";
            buscar_pais_region("Africa",paises,contenedor_paises);
        } catch (error) {
            alert("A ocurrido un error")  
        }
    });

    europa.addEventListener("click",()=>{
        try {
            nombre_regiones.value = "Europa";
            buscar_pais_region("Europe",paises,contenedor_paises);
        } catch (error) {
            alert("A ocurrido un error")  
        }
    });

    asia.addEventListener("click",()=>{
        try {
            nombre_regiones.value = "Asia";
            buscar_pais_region("Asia",paises,contenedor_paises);
        } catch (error) {
            alert("A ocurrido un error")  
        }
    });

    oceania.addEventListener("click",()=>{
        try {
            nombre_regiones.value = "Oceania";
            buscar_pais_region("Oceania",paises,contenedor_paises);
        } catch (error) {
            alert("A ocurrido un error")  
        }
    });

    //Retorna la region seleccionada por el usuario
    function validar_region(region) {
        try {
            let nombre_region;
            //Valida los nombres de las regiones
            switch (region) {
                case "America":
                    nombre_region ="Americas";
                    break;
                case "Asia":
                    nombre_region ="Asia";
                    break;
                case "Antartida":
                    nombre_region ="Antarctic";
                    break;
                case "Oceania":
                    nombre_region ="Oceania";
                    break;
                case "Africa":
                    nombre_region ="Africa";
                    break;
                default:
                    nombre_region ="Europe";
                    break;
            }
            return nombre_region;
        } catch (error) {
            alert("A ocurrido un error")  
        }
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
