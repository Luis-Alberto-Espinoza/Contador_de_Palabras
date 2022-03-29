function contarPalabras() {
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