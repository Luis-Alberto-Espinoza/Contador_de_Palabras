//contar todas las palabras 
function contadorDePalabras(frase) {
    /*EXPRESIONES REGULARES*/

    /*Remplaza 1 o mas espacios en blanco por uno solo */
    frase = frase.replace(/[ ]{1,}/g, ' ');

    /* Remplaza 1 o mas saltos de linea por un espacio en blanco*/
    frase = frase.replace(/\n{1,}/g, ' ');

    /* Remplaza los signos ,.! por un espacio en blanco (dia!lluvioso = dia lluvios) */
    frase = frase.replace(/[.!¡?¿,-_-]/g, ' ');

    /* Quita los espacios al inicio de la cadena */
    frase = frase.replace(/^ /, '');

    /* Quita los espacios al final de la cadena */
    frase = frase.replace(/ $/, '');

    /* Deja solo un espacio en blanco entre las palabras */
    frase = frase.replace(/[ ]+/g, ' ');

    /* Quita los espacios iniciales y finales de toda la cadena */
    frase = frase.trim();

    return frase;
}

function contarOcurrencia(myArray) {
    let arrayResultado;
    let element;
    let contadorPalabra = 0;
    let contadorRepeticiones = 1;
    let palabraAnterior = "";
    let arrayPAnteriores = [];
    let conteo;

    for (let i = 0; i < myArray.length; i++) {
        palabraAnterior = myArray[i].pala;
        contadorRepeticiones = 1;
        for (let j = i + 1; j < myArray.length - 1; j++) {
            if (palabraAnterior == myArray[j].pala) {

                contadorRepeticiones++;
            } else {
                break;
            }
        }
        if (contadorRepeticiones > 1) {
            let repe = estaRepetido(arrayPAnteriores, palabraAnterior);
            if (!repe) {
                arrayPAnteriores[contadorPalabra] = { palabra: palabraAnterior, cant: contadorRepeticiones };
                contadorPalabra++
            }
        }
    }
    arrayPAnteriores.sort((a, b) => {
        if (a.cant == b.cant) {
            return 0;
        }
        if (a.cant > b.cant) {
            return -1;
        }
        return 1;
    });
    for (let i = 0; i < arrayPAnteriores.length; i++) {
        console.log(arrayPAnteriores[i], "-*-*-*-*-*-");
    }
}

function estaRepetido(arrayPAnteriores, palabraAnterior) {
    let nueva = 0

    for (let i = 0; i < arrayPAnteriores.length; i++) {
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

function contarPalabras() {
    console.log("--------------inicio de ejecucion---------------------");
    /* Seguarda en texto lo que tenga el cuadro de texto */
    let texto = document.getElementById('textoIngresado').value;

    const myArray = [];
    var pala;
    texto = texto.toLowerCase();
    texto = texto.trim();

    /* se manda el texto a validar */
    texto = contadorDePalabras((texto));

    console.log(texto);
    for (let i = 0; i < texto.split(' ').length; i++) {
        myArray[i] = { pala: texto.split(' ')[i] };
    }
    /* Se imprime por consola la cantidad de palabras */
    console.log("La cantidad de palabras es:", texto.split(' ').length);

    /* se envia el texto en minusculas para extraer la cant de palabras repetidas */
    // contarOcurrencia(texto.toLowerCase());


    myArray.sort((a, b) => {
        if (a.pala == b.pala) {
            return 0;
        }
        if (a.pala < b.pala) {
            return -1;
        }
        return 1;
    });
    (contarOcurrencia(myArray));
}

function contadoresco(myArray) {
    myArray.sort((function(a, b) {
        return a.pala - b.pala;
    }));

}