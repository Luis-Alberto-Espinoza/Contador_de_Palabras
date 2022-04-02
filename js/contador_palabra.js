let contador = 0;

function contarPalabras() {
    if (contador > 0) {
        console.log("paso mas de una vez");
        //cuerpoTabla.re;
    }
    contador++;
    console.log("--------------inicio de ejecucion---------------------");
    /* Seguarda en texto lo que tenga el cuadro de texto */
    let texto = document.getElementById('textoIngresado').value;

    const myArray = [];
    var pala;

    /* se manda el texto a validar */
    texto = validarTexto((texto));

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
}

/* VALIDA EL TEXTO PARA ELIMINARCARACTERES ESPECIALES */
function validarTexto(frase) {

    /* Quita los espacios iniciales y finales de toda la cadena */
    frase = frase.trim();

    /*EXPRESIONES REGULARES*/
    /* https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions */

    /*Remplaza 1 o mas espacios en blanco por uno solo */
    frase = frase.replace(/[ ]{1,}/g, ' ');

    /* Remplaza 1 o mas saltos de linea por un espacio en blanco*/
    frase = frase.replace(/\n{1,}/g, ' ');

    /* Remplaza los signos ,.! por un espacio en blanco (dia!lluvioso = dia lluvios) */
    frase = frase.replace(/[-.!*¡_?¿,/]{1,}/g, ' ');

    /* Remplaza las letras Mayúsculas por espacios en blanco */
    //frase = frase.replace(/[,-_]{1,}/g, ' ');

    /* Quita los espacios al inicio de la cadena */
    frase = frase.replace(/^ /, '');

    /* Quita los espacios al final de la cadena */
    frase = frase.replace(/ $/, '');

    /* Deja solo un espacio en blanco entre las palabras */
    frase = frase.replace(/[ ]+/g, ' ');

    return frase;
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
        for (let j = i + 1; j < myArray.length - 1; j++) {

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
    /* Se muestra por consola el resultado del nuevo Array */
    for (let i = 0; i < arrayPAnteriores.length; i++) {
        console.log(arrayPAnteriores[i], "-*-*-*-*-*-");
    }
    agregarDatos(arrayPAnteriores);
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
/* Funcion para blanquear el cuadro de texto-text area */
function limpiar() {
    document.getElementById('textoIngresado').value = "";
}


function agregarDatos(arrayPAnteriores) {
    /*https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces */
    /* https://lenguajejs.com/javascript/dom/crear-elementos-dom/ */
    const mostrarResultados = document.getElementById('tablaXpalabra');
    const cuerpoTabla = document.createElement('tBody');

    let mitadMenos = (Math.round(arrayPAnteriores.length / 2));
    let encabezado = document.createElement('tr');

    let td0 = document.createElement('td');
    td0.className = "classTd";
    td0.innerText = ('PALABRAS');
    encabezado.appendChild(td0);

    td0 = document.createElement('td');
    td0.className = "classTdC";
    td0.innerText = ("REPETICIONES");
    encabezado.appendChild(td0);

    cuerpoTabla.appendChild(encabezado);

    for (let i = 0; i < mitadMenos; i++) {

        let fila = document.createElement('tr');

        let td = document.createElement('td');
        td.className = "classTd";
        td.innerText = arrayPAnteriores[i].palabra;
        fila.appendChild(td);

        td = document.createElement('td');
        td.className = "classTdC";
        td.innerText = arrayPAnteriores[i].cant;
        fila.appendChild(td);

        cuerpoTabla.appendChild(fila);
    }

    mostrarResultados.appendChild(cuerpoTabla);

    agregarDatos1(arrayPAnteriores);
}

function agregarDatos1(arrayPAnteriores) {
    const mostrarResultados = document.getElementById('tablaXpalabra1');
    const cuerpoTabla = document.createElement('tBody');

    let mitadMas = (Math.round((arrayPAnteriores.length / 2)));

    let encabezado = document.createElement('tr');

    let td0 = document.createElement('td');
    td0.className = "classTd";
    td0.innerText = ('PALABRAS');
    encabezado.appendChild(td0);

    td0 = document.createElement('td');
    td0.className = "classTdC";
    td0.innerText = ("REPETICIONES");
    encabezado.appendChild(td0);

    cuerpoTabla.appendChild(encabezado);

    for (let i = mitadMas; i < arrayPAnteriores.length; i++) {

        let fila = document.createElement('tr');

        let td = document.createElement('td');
        td.className = "classTd";
        td.innerText = arrayPAnteriores[i].palabra;
        fila.appendChild(td);

        td = document.createElement('td');
        td.className = "classTdC";
        td.innerText = arrayPAnteriores[i].cant;
        fila.appendChild(td);

        cuerpoTabla.appendChild(fila);
    }

    mostrarResultados.appendChild(cuerpoTabla);

}

function textoPrueba() {
    let escrito = "¿Qué es Contador de palabras?\n    Contador de palabras y contador de caracteres es una herramienta que te permite contar la cantidad de palabras o de caracteres que posee un texto. Simplemente, debes posicionar el cursor dentro de la ventana y comenzar a escribir con el teclado. El sistema contará automáticamente la cantidad de palabras y caracteres que has ingresado. También es posible copiar y pegar un texto que hayas escrito fuera del sistema; automáticamente mostrará el recuento de palabras y caracteres del texto copiado.\n        Además, Contador de palabras y contador de caracteres posee dos botones sobre la derecha de la pantalla, los cuales te permiten borrar y contar, respectivamente. Verás que uno de ellos posee un icono de una papelera con el que podrás borrar todo el contenido de la ventana. El otro, que posee el icono de una flecha, te permite contar palabras y caracteres de lo que hayas escrito.\n        Saber el número de palabras o caracteres de un documento puede ser muy útil. Como ejemplo, si se le pide a un autor un mínimo o un máximo de palabras permitidas para escribir, el contador de palabras lo ayudará a saber si su artículo cumple con los requisitos.\nAdemás, el contador de palabras muestra automáticamente las diez palabras más utilizadas y la densidad de las mismas dentro del artículo que estás escribiendo. Esto te permite saber qué palabras utilizas con más frecuencia y en qué porcentaje las utilizas dentro del artículo. Esto te ayudará a evitar que utilices en exceso ciertas palabras en un texto y te permitirá asegurarte de que la distribución de las palabras clave coincide con lo que estás buscando obtener a partir del texto.\nEl recuento de palabras también puede ser importante para definir las velocidades de lectura y escritura. El contador de palabras te ayudará a determinar ambas. Basta con establecer el cronómetro y comenzar a escribir. Cuando se acabe el tiempo, podrás saber de manera instantánea cuántas palabras has escrito durante ese período de tiempo.";
}