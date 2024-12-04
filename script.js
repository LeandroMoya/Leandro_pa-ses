//Barra navegación
var icono_menu = document.querySelector(".icono_menu");
var  barra_lateral = document.querySelector(".barra_lateral");
var icono_salir = document.querySelector(".icono_salir");

    //Abre el menú lateral de la barra de navegación
    icono_menu.addEventListener("click", ()=>{
        barra_lateral.classList.add("visible");
    });
    //Cierra el menú lateral de la barra de navegación
    icono_salir.addEventListener("click", ()=>{
        barra_lateral.classList.remove("visible");
    });

    //Cierra el menú hamburguesa
    window.addEventListener('resize', (e)=>{
        if(e.target.innerWidth>500){
            barra_lateral.classList.remove("visible");
        }
    });
    
    //Hace la peticion que obtiene los paises
    function obtener_paises() {
        return fetch('https://restcountries.com/v3.1/all');
    }
    //Carga todos los países 
    async function cargar_paises() {
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
            //Crea todos lo paises
            crear_paises(paises,contenedor_paises);
        } catch (error) {
            alert("A ocurrido un error")  
        }
    }

    //Crea y agerga todos los paises obtenodos de la peticion
    function crear_paises(paises,contenedor_paises) {
        try {
            //Vacia el contenido del contenedor de los paises
            contenedor_paises.innerHTML ="";
            //Agrega cada país uno por uno
            paises.forEach(elemento => {
                contenedor_paises.innerHTML =  
                contenedor_paises.innerHTML + 
                //Crea un solo país con su nombre
                `<div class ="pais">
                <p class ="nombre_pais" >${elemento.name || "Sin nombre"}</p>
                <button class="btn_mostrar_pais">Ver mas</button>
               </div>`
            });
            //Obtiene todos los botones que fueron creados
            btn_mostrar_pais = document.getElementsByClassName("btn_mostrar_pais");
            //Agrega el evento que mustra los paises a cada botón
            for (const elemento of btn_mostrar_pais) {
                elemento.addEventListener("click",(event)=>{
                    //Muestra un país en un modal
                    mostrar_pais(event);
                })
            }
        } catch (error) {
            alert("A ocurrido un error",error) 
        }
    }

    //Muestra un pais seleccionado
    function mostrar_pais(event) {
        try {
            //Busca el país seleccionado por nombre
            let pais = paises.find(pais => pais.name == event.target.parentElement.children[0].textContent);
            //Agrega la bandera al modal
            
            bandera.setAttribute("src",pais.flags); 
            //Agregar los demas datos del país  //Obtiene todos los lenguajes del país
            lenguaje.textContent = `Lenguaje :${ordenar_lenguajes(pais.languages) || "Sin lenguaje"}`;
            nombre_pais.textContent = `País :${pais.name || "Sin nombre"}`;
            capital.textContent = `Capital :${pais.capital || "Sin nombre"}`;
            poblacion.textContent = `Pablación :${pais.population}`;
            //Hace que aparesca el modal
            fondo_modal.style.display = "block";
        } catch (error) {
            alert("A ocurrido un error")  
        }
    }

    //Busca los paises por nombre
    function buscar_pais(nombre_pais,paises,contenedor_paises) {
        try {
            //Se pasa todo el texto a minuscula y se buscan las concidencias
            //Con el texto de los paises
            let paises_filtrados = paises.filter(pais => 
                pais.name.toLowerCase().includes(nombre_pais.toLowerCase()));
                //Carga la nueva lista de paises
                crear_paises(paises_filtrados,contenedor_paises)
            //Valida si se desea mantener el recordatorio de busqueda
        } catch (error) {
            alert("A ocurrido un error")  
        }
    }
    //Obtiene todos los lenguajes de un país
    function ordenar_lenguajes(leguaje) {
        try {
            let lenguajes ="";
            //Recorre los indices del objeto para acceder a el valor que tiene
            for (const i in leguaje) {
                lenguajes = lenguajes + `, ${leguaje[i]}`;
            }
            //Retorna el lenguaje sin los 2 últimos carateres
            return lenguajes.slice(2);
        } catch (error) {
            alert("A ocurrido un error")  
        }
    }
