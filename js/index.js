let contador = 0;
const mostrartablas = document.getElementById('tablaXpalabra');

function inicio() {

    console.log("--------------inicio de ejecucion---------------------");
    /* Seguarda en texto lo que tenga el cuadro de texto */
    let texto = document.getElementById('textoIngresado').value;

    /* Se borran los resultados anteriores para no acumularlos */
    document.getElementById('mostrarResultados').replaceChildren();

    if ("" == texto.trim()) {
        alert("Ingrese su texto")
        return;
    }

    agregarelEmentos()
    let myArray = [];
    const textoOriginal = texto;

    /* se manda el texto a validar */
    texto = validarTexto(texto);

    /* Se imprime por consola el texto ya validado */
    console.log(texto);

    /* Se convierte el texto en minúscula */
    texto = texto.toLowerCase();

    /* se guarda en un Array en el atributo pala cada palabra */
    for (let i = 0; i < texto.split(' ').length; i++) {
        myArray[i] = { pala: texto.split(' ')[i] };
    }

    /* Se imprime por consola la cantidad de palabras */
    console.log("La cantidad de palabras es:", texto.split(' ').length);
    let cantPalabras
    if (texto.trim() === "") {
        cantPalabras = 0
    } else {
        cantPalabras = texto.split(' ').length;
    }
    mostrarEstadisticas([
        { nombre: 'Palabras', valor: cantPalabras },
        { nombre: 'Caracteres', valor: textoOriginal.length },
        { nombre: 'Sin espacios', valor: textoOriginal.replace(/\s/g, '').length },
        { nombre: 'Oraciones', valor: contarOraciones(textoOriginal) },
        { nombre: 'Párrafos', valor: contarParrafos(textoOriginal) },
    ]);

    /* Se ordena el Array por orden alfabético, para agrupar las palabras repetidas */
    /* https://desarrolloweb.com/articulos/ordenacion-arrays-javascript-sort */
    myArray.sort((a, b) => {
        if (a.pala == b.pala) {
            return 0;
        }
        if (a.pala < b.pala) {
            return -1;
        }
        return 1;
    });

    /* se envia el texto para contabilizar la cant de palabras repetidas */
    contarOcurrencia(myArray);

    /* Se lleva la vista (y el foco) a los resultados para que queden a la vista */
    const resultados = document.getElementById('mostrarResultados');
    resultados.scrollIntoView({ behavior: 'smooth', block: 'start' });
    resultados.focus({ preventScroll: true });
}
/* Muestra cada dato del texto en una tarjeta, arriba de las tablas */
function mostrarEstadisticas(datos) {
    const lista = creadorDeElementos('ul', 'estadisticas', '');
    datos.forEach(dato => {
        const item = creadorDeElementos('li', 'estadistica', '');
        item.appendChild(creadorDeElementos('span', 'valorEstadistica', dato.valor));
        item.appendChild(creadorDeElementos('span', 'nombreEstadistica', dato.nombre));
        lista.appendChild(item);
    });
    document.getElementById('resultado').prepend(lista);
}

/* Divide el texto en oraciones: termina en . ! ? o en un salto de línea */
function dividirEnOraciones(texto) {
    return [...texto.matchAll(/[^.!?\n]+[.!?]*/g)].filter(o => o[0].trim() !== "");
}

/* Solo cuentan las oraciones que tienen alguna letra o número ("..." no es una oración) */
function contarOraciones(texto) {
    return dividirEnOraciones(texto).filter(o => /[\p{L}\p{N}]/u.test(o[0])).length;
}

/* Cada línea con texto es un párrafo; las vacías o de puros signos no cuentan */
function contarParrafos(texto) {
    return texto.split('\n').filter(linea => /[\p{L}\p{N}]/u.test(linea)).length;
}

/* VALIDA EL TEXTO PARA ELIMINARCARACTERES ESPECIALES */
function validarTexto(frase) {

    /*EXPRESIONES REGULARES*/
    /* https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions */

    /* Una palabra son letras o números (con acentos, ñ, etc.). Los símbolos sueltos
       como ) ¿ " … quedan afuera. Se permiten guiones o apóstrofos en el medio:
       "teórico-práctico" o "O'Higgins" cuentan como una sola palabra */
    const palabras = frase.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu);

    /* Se devuelven separadas por un solo espacio */
    return palabras ? palabras.join(' ') : '';
}

/* CONTAR PALABRAS, CONTABILIZAR REPETIDAS */
function contarOcurrencia(myArray) {

    let contadorPalabra = 0;
    let contadorRepeticiones = 1;
    let palabraAnterior = "";
    let arrayPAnteriores = [];

    /* se recorre todo el texto */
    for (let i = 0; i < myArray.length; i++) {

        /* Se guarda en variable la palabra anterior */
        palabraAnterior = myArray[i].pala;
        contadorRepeticiones = 1;

        /* Se recorre el texto, desde la palabra anterior +1 = J */
        for (let j = i + 1; j < myArray.length; j++) {

            /* Si la palabra anterior es = a lo que tenga el array en la posición J */
            if (palabraAnterior == myArray[j].pala) {
                /* Si son iguales se autoincrementa la variable contadoRepeticiones */
                contadorRepeticiones++;
            } else {
                /* Si no son iguales se deja de recorrer el array porque no hay más repetido */
                /* Recordar que el Array esta ordenado alfabeticamente */
                break;
            }
        }
        if (contadorRepeticiones > 1) {
            /* Se guarda en variable Boleana lo que devuelve la comparacion de la funcion "estaRepetido" */
            let repe = estaRepetido(arrayPAnteriores, palabraAnterior);
            if (!repe) { // si no esta repetido entra
                /* Se guarda en un nuevo Array en la posición dada por el contador que es = cant palabras no repetidas */
                arrayPAnteriores[contadorPalabra] = { palabra: palabraAnterior, cant: contadorRepeticiones };
                contadorPalabra++ //se auto incrementa la cantidad de palabras no repetidas
            }
        }
    }

    /* Se ordena el Array por la cantidad de palabras repetidas */
    /* https://desarrolloweb.com/articulos/ordenacion-arrays-javascript-sort */
    arrayPAnteriores.sort((a, b) => {
        if (a.cant == b.cant) {
            return 0;
        }
        if (a.cant > b.cant) {
            return -1;
        }
        return 1;
    });

    /* Se envia el Array para Determinar como será mostrado */
    if (!(arrayPAnteriores.length == 0)) {
        dividirTablas(arrayPAnteriores);

    }
}

function estaRepetido(arrayPAnteriores, palabraAnterior) {
    let nueva = 0
    /* se recorre el nuevo Array que contiene una unica vez, las palabras repetidas del antiguo Array */
    for (let i = 0; i < arrayPAnteriores.length; i++) {
        /* si ya existe, devolvera verdadero, de  lo contrario será falso */
        if (palabraAnterior == arrayPAnteriores[i].palabra) {
            nueva++;
        }
    }
    if (nueva > 0) {
        return true;
    } else {
        return false;
    }
}
function segundoTexto() {
    document.getElementById('textoIngresado').value = textoPrueba();
}
/* Funcion para blanquear el cuadro de texto-text area */
function limpiar() {
    const general = document.getElementById('mostrarResultados');
    const cuadroTexto = document.getElementById('textoIngresado');
    /* Se deja todo como al abrir la página */
    cuadroTexto.value="";
    ajustarAltura();
    terminarLectura();
    general.replaceChildren();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function dividirTablas(arrayPAnteriores) {
    let contador = 0;
    let terminado = false;
    let desde;
    let hasta;
    let elementoPadre;

    do {
        /* En la vuelta = 0 se selecciona la primera mitad de lo que contenga el Array de palabras repetidas */
        if (contador == 0) {
            desde = 0;
            hasta = Math.round(arrayPAnteriores.length / 2);
            elementoPadre = 'tablaXpalabra';
            /* Si el Array tiene menos de 6 palabras se creará una sola columna para mostrar las palabras repetidas */
            if (arrayPAnteriores.length < 6) {
                hasta = arrayPAnteriores.length;
                terminado = true;
            }
        } else {
            /* En la vuelta = 1 se selecciona la segunda mitad de la lista. siendo esta mayor a 5 palabras */
            /* Esto se hace para darle una clase diferente, para así poder con el estilo flex colocarla al lado  */
            desde = Math.round(arrayPAnteriores.length / 2);
            hasta = arrayPAnteriores.length;
            elementoPadre = 'tablaXpalabra1';
            terminado = true;
        }
        /* Se envian los datos necesarios para crear los elementos */
        agregarDatos(arrayPAnteriores, desde, hasta, elementoPadre);
        contador++;
    } while (!terminado);
}


function agregarelEmentos() {
    const padreDiv = document.getElementById('mostrarResultados')

    let fragment = document.createDocumentFragment();
    let divMostrarResultado //= document.createElement('div');
    divMostrarResultado = (creadorDeElementos('div', 'resultado', null))
    divMostrarResultado.id = 'resultado'
    fragment.appendChild(divMostrarResultado)
    padreDiv.appendChild(fragment)


    let agrupaResultado = (creadorDeElementos('div', 'agrupaResultado', null))
    agrupaResultado.id = 'agrupaResultado'
    fragment.appendChild(agrupaResultado)
    padreDiv.appendChild(fragment)



    let divTabla1 = (creadorDeElementos('div', ' resultadoRepeticiones', null))
    fragment.appendChild(divTabla1)
    agrupaResultado.appendChild(fragment)

    let tabla1 = creadorDeElementos('table', 'tabla0', null)
    tabla1.id = "tablaXpalabra"
    fragment.appendChild(tabla1)
    divTabla1.appendChild(fragment)

    let divTabla2 = (creadorDeElementos('div', 'resultado2', null))
    fragment.appendChild(divTabla2)
    agrupaResultado.appendChild(fragment)

    let tabla2 = creadorDeElementos('table', 'tabla0', null)
    tabla2.id = "tablaXpalabra1"
    fragment.appendChild(tabla2)
    divTabla2.appendChild(fragment)
}


function agregarDatos(arrayPAnteriores, desde, hasta, elementoPadre) {
    /*https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces */
    /* https://lenguajejs.com/javascript/dom/crear-elementos-dom/ */
    /* https://developer.mozilla.org/es/docs/Web/API/Document/createDocumentFragment */

    /* Se captura el elemento existente en el DOM, para trabajarlo como padre */
    let mostrartablas = document.getElementById(elementoPadre);
    let fragment = document.createDocumentFragment();
    let filas = document.createElement('tr');

    /* Se crea el Encabezado de la Lista-Resultado */
    filas.appendChild(creadorDeElementos('td', 'classTd', 'PALABRAS'));
    filas.appendChild(creadorDeElementos('td', 'classTdC', 'REPETICIONES'));
    fragment.appendChild(filas); //se la agrega al nodo

    /* Se crea el cuerpo de la tabla */
    for (let i = desde; i < hasta; i++) {
        let elementos = document.createElement('tr');
        elementos.appendChild(creadorDeElementos('td', 'classTdR', arrayPAnteriores[i].palabra)); //columna PALABRAS
        elementos.appendChild(creadorDeElementos('td', 'classTdCR', arrayPAnteriores[i].cant)); //columna CANTIDAD DE REPETICIONES
        fragment.appendChild(elementos); // se agreaga al nodo
    }
    mostrartablas.appendChild(fragment); // se agrega todo al nodo PADRE existente en el DOM
}

function creadorDeElementos(elemento, clase, texto) {
    let td = document.createElement(elemento);
    td.className = clase;
    td.innerText = (texto);
    return td;
}


function textoPrueba() {
    let escrito = "¿Qué es Contador de palabras?.\n    Contador de palabras y contador de caracteres es una herramienta que te permite contar la cantidad de palabras o de caracteres que posee un texto.";
    let escrito2 = '¿Qué es Contador de palabras?.\n    Contador de palabras y contador de caracteres es una herramienta que te permite contar la cantidad de palabras o de caracteres que posee un texto. \nSimplemente, debes posicionar el cursor dentro de la ventana y comenzar a escribir con el teclado.\nEl sistema contará automáticamente la cantidad de palabras y caracteres que has ingresado. \nTambién es posible copiar y pegar un texto que hayas escrito fuera del sistema; automáticamente mostrará el recuento de palabras y caracteres del texto copiado.'
    // let escrito = "¿Qué es Contador de palabras?\n    Contador de palabras y contador de caracteres es una herramienta que te permite contar la cantidad de palabras o de caracteres que posee un texto. Simplemente, debes posicionar el cursor dentro de la ventana y comenzar a escribir con el teclado. El sistema contará automáticamente la cantidad de palabras y caracteres que has ingresado. También es posible copiar y pegar un texto que hayas escrito fuera del sistema; automáticamente mostrará el recuento de palabras y caracteres del texto copiado.\n        Además, Contador de palabras y contador de caracteres posee dos botones sobre la derecha de la pantalla, los cuales te permiten borrar y contar, respectivamente. Verás que uno de ellos posee un icono de una papelera con el que podrás borrar todo el contenido de la ventana. El otro, que posee el icono de una flecha, te permite contar palabras y caracteres de lo que hayas escrito.\n        Saber el número de palabras o caracteres de un documento puede ser muy útil. Como ejemplo, si se le pide a un autor un mínimo o un máximo de palabras permitidas para escribir, el contador de palabras lo ayudará a saber si su artículo cumple con los requisitos.\nAdemás, el contador de palabras muestra automáticamente las diez palabras más utilizadas y la densidad de las mismas dentro del artículo que estás escribiendo. Esto te permite saber qué palabras utilizas con más frecuencia y en qué porcentaje las utilizas dentro del artículo. Esto te ayudará a evitar que utilices en exceso ciertas palabras en un texto y te permitirá asegurarte de que la distribución de las palabras clave coincide con lo que estás buscando obtener a partir del texto.\nEl recuento de palabras también puede ser importante para definir las velocidades de lectura y escritura. El contador de palabras te ayudará a determinar ambas. Basta con establecer el cronómetro y comenzar a escribir. Cuando se acabe el tiempo, podrás saber de manera instantánea cuántas palabras has escrito durante ese período de tiempo.";


    //<!-- ¿Qué es Contador de palabras?
    // Contador de palabras y contador de caracteres es una herramienta que te permite contar la cantidad de palabras o de caracteres que posee un texto. Simplemente, debes posicionar el cursor dentro de la ventana y comenzar a escribir con el teclado. El sistema contará automáticamente la cantidad de palabras y caracteres que has ingresado. También es posible copiar y pegar un texto que hayas escrito fuera del sistema; automáticamente mostrará el recuento de palabras y caracteres del texto copiado. -->
    return escrito2;

}

/* LA CAJA DE TEXTO CRECE SEGÚN EL CONTENIDO */
function ajustarAltura() {
    const cuadroTexto = document.getElementById('textoIngresado');
    /* Primero se deja el tamaño del CSS (llena el espacio libre de la pantalla) */
    cuadroTexto.style.height = '';
    /* Si el texto no entra, se agranda lo justo (sumando el borde) */
    if (cuadroTexto.scrollHeight > cuadroTexto.clientHeight) {
        const borde = cuadroTexto.offsetHeight - cuadroTexto.clientHeight;
        cuadroTexto.style.height = (cuadroTexto.scrollHeight + borde) + 'px';
    }
}

/* Mide la altura que ocupa solo el texto (sin la altura mínima de la caja) */
function alturaDelTexto(cuadroTexto) {
    const alturaAnterior = cuadroTexto.style.height;
    const minimaAnterior = cuadroTexto.style.minHeight;
    const flexAnterior = cuadroTexto.style.flex;
    cuadroTexto.style.flex = 'none';
    cuadroTexto.style.minHeight = '0';
    cuadroTexto.style.height = '0';
    const altura = cuadroTexto.scrollHeight;
    cuadroTexto.style.height = alturaAnterior;
    cuadroTexto.style.minHeight = minimaAnterior;
    cuadroTexto.style.flex = flexAnterior;
    return altura;
}

/* DOBLE CLICK EN UNA ZONA SIN TEXTO (DENTRO O FUERA DE LA CAJA) SELECCIONA TODO */
function seleccionarTodoConDobleClick(evento) {
    const cuadroTexto = document.getElementById('textoIngresado');
    if (cuadroTexto.value === "") {
        return;
    }
    if (evento.target === cuadroTexto) {
        const seleccion = cuadroTexto.value.slice(cuadroTexto.selectionStart, cuadroTexto.selectionEnd);
        const debajoDelTexto = evento.offsetY > alturaDelTexto(cuadroTexto);
        /* Si el doble click cayó sobre una palabra, se deja la selección normal */
        if (seleccion.trim() !== "" && !debajoDelTexto) {
            return;
        }
    } else if (evento.target.closest('button, select, input, a, dialog, .mostrarResultado')) {
        /* Afuera de la caja, pero sobre algo que tiene su propio uso */
        return;
    }
    window.getSelection().removeAllRanges();
    cuadroTexto.focus();
    cuadroTexto.select();
}

/* TEMA CLARO / OSCURO */
function aplicarTema(tema) {
    document.documentElement.dataset.theme = tema;
    document.getElementById('btnTema').textContent = tema === 'oscuro' ? '☀' : '☾';
    document.getElementById('btnTema').title = tema === 'oscuro' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
}

function cambiarTema() {
    const nuevo = document.documentElement.dataset.theme === 'oscuro' ? 'claro' : 'oscuro';
    aplicarTema(nuevo);
    guardarPreferencia('tema', nuevo);
}

/* localStorage puede fallar (modo privado, cookies bloqueadas): no es grave */
function guardarPreferencia(clave, valor) {
    try { localStorage.setItem(clave, valor); } catch (error) { }
}

function leerPreferencia(clave) {
    try { return localStorage.getItem(clave); } catch (error) { return null; }
}

/* REEMPLAZA EL TEXTO DE LA CAJA POR LO QUE HAYA EN EL PORTAPAPELES */
/* https://developer.mozilla.org/es/docs/Web/API/Clipboard/readText */
async function pegarPortapapeles() {
    if (!navigator.clipboard || !navigator.clipboard.readText) {
        alert("Tu navegador no permite leer el portapapeles. Usá Ctrl+V.");
        return;
    }
    try {
        const texto = await navigator.clipboard.readText();
        terminarLectura();
        document.getElementById('textoIngresado').value = texto;
        ajustarAltura();
    } catch (error) {
        alert("No se pudo leer el portapapeles (permiso denegado). Usá Ctrl+V.");
    }
}

/* LEE EL TEXTO EN VOZ ALTA, SELECCIONANDO CADA ORACIÓN MIENTRAS SE ESCUCHA */
/* https://developer.mozilla.org/es/docs/Web/API/Web_Speech_API */
let leyendo = false;
let oraciones = [];
let oracionActual = 0;
/* Dónde quedó la lectura al pausar (posición en el texto), o null si no hay pausa */
let posicionPausa = null;
/* Cada lectura tiene un número: así los avisos de una lectura cancelada no afectan a la nueva */
let lecturaId = 0;

/* Llena la lista de voces: primero las de español, la de Google (Chrome) como preferida */
function cargarVoces() {
    const selector = document.getElementById('selectorVoz');
    const todas = speechSynthesis.getVoices();
    if (todas.length === 0) {
        return;
    }
    const enEspanol = todas.filter(v => v.lang.startsWith('es'));
    const voces = enEspanol.length > 0 ? enEspanol : todas;

    selector.replaceChildren();
    voces.forEach(voz => {
        const opcion = document.createElement('option');
        opcion.value = voz.name;
        opcion.textContent = voz.name + ' (' + voz.lang + ')';
        selector.appendChild(opcion);
    });

    const guardada = leerPreferencia('voz');
    const google = voces.find(v => v.name.includes('Google'));
    if (guardada && voces.some(v => v.name === guardada)) {
        selector.value = guardada;
    } else if (google) {
        selector.value = google.name;
    }
}

function vozElegida() {
    const nombre = document.getElementById('selectorVoz').value;
    return speechSynthesis.getVoices().find(v => v.name === nombre) || null;
}

function mostrarVelocidad() {
    const velocidad = document.getElementById('velocidad').value;
    document.getElementById('valorVelocidad').textContent = Number(velocidad).toFixed(1) + 'x';
}

function leerTexto() {
    const cuadroTexto = document.getElementById('textoIngresado');

    if (!('speechSynthesis' in window)) {
        alert("Tu navegador no soporta lectura en voz alta.");
        return;
    }

    /* Si ya está leyendo, el botón funciona como PAUSAR */
    if (leyendo) {
        pausarLectura();
        return;
    }

    if (cuadroTexto.value.trim() === "") {
        alert("Ingrese su texto");
        return;
    }

    /* Desde dónde leer: lo seleccionado, o donde se pausó, o el principio */
    let desde = 0;
    if (cuadroTexto.selectionStart !== cuadroTexto.selectionEnd) {
        desde = cuadroTexto.selectionStart;
    } else if (posicionPausa !== null) {
        desde = posicionPausa;
    }

    /* Se divide en oraciones (la voz de Google corta los textos largos)
       y se descartan las que quedan antes del punto de inicio */
    oraciones = [];
    dividirEnOraciones(cuadroTexto.value).forEach(o => {
        const fin = o.index + o[0].length;
        if (fin <= desde) {
            return;
        }
        /* Si el inicio cae en el medio de una oración, se lee desde ese punto */
        const inicio = Math.max(o.index, desde);
        const texto = cuadroTexto.value.slice(inicio, fin);
        if (/[\p{L}\p{N}]/u.test(texto)) {
            oraciones.push({ texto: texto, inicio: inicio });
        }
    });

    if (oraciones.length === 0) {
        terminarLectura();
        return;
    }

    oracionActual = 0;
    posicionPausa = null;
    leyendo = true;
    lecturaId++;
    document.getElementById('btnLeer').textContent = "PAUSAR";
    leerSiguienteOracion(lecturaId);
}

/* Se lee de a una oración: así los cambios de voz y velocidad se aplican enseguida */
function leerSiguienteOracion(id) {
    if (id !== lecturaId) {
        return;
    }
    if (oracionActual >= oraciones.length) {
        /* Terminó: se quita la selección para que el próximo LEER empiece del principio */
        const cuadroTexto = document.getElementById('textoIngresado');
        terminarLectura();
        cuadroTexto.setSelectionRange(0, 0);
        return;
    }
    const cuadroTexto = document.getElementById('textoIngresado');
    const oracion = oraciones[oracionActual];
    const locucion = new SpeechSynthesisUtterance(oracion.texto);
    const voz = vozElegida();

    locucion.lang = voz ? voz.lang : 'es-ES';
    locucion.voice = voz;
    locucion.rate = Number(document.getElementById('velocidad').value);
    locucion.onstart = () => {
        if (id !== lecturaId) {
            return;
        }
        cuadroTexto.focus({ preventScroll: true });
        cuadroTexto.setSelectionRange(oracion.inicio, oracion.inicio + oracion.texto.length);
        mostrarOracionEnPantalla(cuadroTexto, oracion.inicio);
    };
    locucion.onend = () => {
        if (id === lecturaId && leyendo) {
            oracionActual++;
            leerSiguienteOracion(id);
        }
    };
    speechSynthesis.speak(locucion);
}

/* Pausa: se corta la voz y se recuerda la oración. Al seguir, se repite esa oración entera */
function pausarLectura() {
    posicionPausa = oraciones[oracionActual].inicio;
    leyendo = false;
    lecturaId++;
    speechSynthesis.cancel();
    document.getElementById('btnLeer').textContent = "SEGUIR";
}

/* Corta la lectura del todo y olvida la pausa */
function terminarLectura() {
    posicionPausa = null;
    leyendo = false;
    lecturaId++;
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
    document.getElementById('btnLeer').textContent = "LEER";
}

/* Calcula a qué altura (en px) de la caja está una posición del texto.
   Se copia la caja en un div invisible con el mismo estilo, y se mide dónde cae un marcador */
function alturaDePosicion(cuadroTexto, posicion) {
    const estilo = getComputedStyle(cuadroTexto);
    const espejo = document.createElement('div');
    ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'padding',
        'border', 'boxSizing', 'width'].forEach(propiedad => {
        espejo.style[propiedad] = estilo[propiedad];
    });
    espejo.style.position = 'absolute';
    espejo.style.visibility = 'hidden';
    espejo.style.whiteSpace = 'pre-wrap';
    espejo.style.overflowWrap = 'break-word';
    espejo.textContent = cuadroTexto.value.slice(0, posicion);
    const marcador = document.createElement('span');
    marcador.textContent = '|';
    espejo.appendChild(marcador);
    document.body.appendChild(espejo);
    const altura = marcador.offsetTop;
    espejo.remove();
    return altura;
}

/* AUTO SCROLL: si la oración que se lee quedó fuera de la pantalla, se la trae al centro */
function mostrarOracionEnPantalla(cuadroTexto, posicion) {
    const arribaDeLaOracion = cuadroTexto.getBoundingClientRect().top + alturaDePosicion(cuadroTexto, posicion);
    const alturaDeLinea = parseFloat(getComputedStyle(cuadroTexto).lineHeight) || 30;
    const margen = 80;
    if (arribaDeLaOracion < margen || arribaDeLaOracion + alturaDeLinea > window.innerHeight - margen) {
        window.scrollTo({
            top: window.scrollY + arribaDeLaOracion - window.innerHeight / 3,
            behavior: 'smooth'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('textoIngresado').addEventListener('input', () => {
        ajustarAltura();
        /* Si se edita el texto, las posiciones de la lectura ya no sirven */
        if (leyendo || posicionPausa !== null) {
            terminarLectura();
        }
    });
    document.addEventListener('dblclick', seleccionarTodoConDobleClick);
    window.addEventListener('resize', ajustarAltura);

    /* El botón de subir aparece solo cuando se bajó un poco */
    const btnSubir = document.getElementById('btnSubir');
    const mostrarBtnSubir = () => btnSubir.classList.toggle('visible', window.scrollY > 200);
    window.addEventListener('scroll', mostrarBtnSubir);
    mostrarBtnSubir();

    /* La ventana de trucos se cierra también con un click afuera */
    const trucos = document.getElementById('trucos');
    trucos.addEventListener('click', (evento) => {
        if (evento.target === trucos) {
            trucos.close();
        }
    });

    /* Tema: el guardado, o si no el que use el sistema */
    const temaGuardado = leerPreferencia('tema');
    const sistemaOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    aplicarTema(temaGuardado || (sistemaOscuro ? 'oscuro' : 'claro'));

    const velocidad = document.getElementById('velocidad');
    velocidad.value = leerPreferencia('velocidad') || 1;
    mostrarVelocidad();
    velocidad.addEventListener('input', () => {
        mostrarVelocidad();
        guardarPreferencia('velocidad', velocidad.value);
    });

    document.getElementById('selectorVoz').addEventListener('change', (evento) => {
        guardarPreferencia('voz', evento.target.value);
    });

    /* Las voces se cargan de forma asíncrona en algunos navegadores */
    if ('speechSynthesis' in window) {
        cargarVoces();
        speechSynthesis.addEventListener('voiceschanged', cargarVoces);
    }
});
