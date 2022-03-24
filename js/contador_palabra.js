//contar todas las palabras 
function contadorDePalabras(frase) {
    /*EXPRESIONES REGULARES*/

    /*Remplaza 1 o mas espacios en blanco por uno solo */
    frase = frase.replace(/[ ]{1,}/g, ' ');

    /* Remplaza 1 o mas saltos de linea por un espacio en blanco*/
    frase = frase.replace(/\n{1,}/g, ' ');

    /* Remplaza los signos ,.! por un espacio en blanco (dia!lluvioso = dia lluvios) */
    frase = frase.replace(/[.!,]/g, ' ');

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

function contarOcurrencia(frase) {
    let arrayResultado;
    let element;
    let contadorPalabra = 0;
    let contadorRepeticiones = 0;
    let palabraAnterior = "";
    let arrayPAnteriores = [];
    let conteo;


    for (let i = 0; i < frase.split(' ').length; i++) {
        palabraAnterior = frase.split(' ')[i];
        console.log('ESTO ES PALABRA ANTERIOR', palabraAnterior);
        contadorRepeticiones = 0;

        for (let j = i + 1; j < frase.split(' ').length; j++) {

            if (palabraAnterior == frase.split(' ')[j]) {
                if (contadorRepeticiones == 0) {


                    arrayPAnteriores[contadorPalabra] = (palabraAnterior);

                    contadorRepeticiones++;
                    // console.log('length', arrayPAnteriores);
                }

                // console.log(j, "-- -- -- -- -- -- -- -- -- -", palabraAnterior);

                // console.log(palabraAnterior, ' ante');
                //console.log(frase.split(' ')[j], ' actual');
            }

        }
        console.log('repe ', contadorRepeticiones);
        // contadorRepeticiones = 0;
        // console.log('este es el contador', contadorRepeticiones);

        // palabraAnterior = (frase.split(' ')[i]);
        contadorPalabra++
    }
    console.log('length', arrayPAnteriores);

    // for (let i = 0; i < arrayPAnteriores.length; i++) {
    //     console.log('esto es la palabra repe', arrayPAnteriores[i])

    // }
}

/* Funcion para blanquear el cuadro de texto-text area */
function limpiar() {
    document.getElementById('textoIngresado').value = "";
}

function contarPalabras() {
    console.log("--------------inicio de ejecucion---------------------");
    /* Seguarda en texto lo que tenga el cuadro de texto */
    let texto = document.getElementById('textoIngresado').value;

    /* se manda el texto a validar */
    texto = contadorDePalabras((texto));

    /* Se imprime por consola la cantidad de palabras */
    console.log("La cantidad de palabras es:", texto.split(' ').length);

    /* se envia el texto en minusculas para extraer la cant de palabras repetidas */
    contarOcurrencia(texto.toLowerCase());
}