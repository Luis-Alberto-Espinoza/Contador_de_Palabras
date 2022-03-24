//contar todas las palabras 
function contadorDePalabras(frase) {
    frase = frase.replace(/[ ]{2,}/g, ' ');
    frase = frase.replace(/\n{2,}/g, ' ');
    frase = frase.replace(/[.!,]/g, ' ');
    frase = frase.replace(/^ /, ' ');
    frase = frase.replace(/ $/, ' ');
    frase = frase.replace(/[ ]+/g, ' ');
    frase = frase.trim();
    //console.log(frase);
    let contador = 0;
    let arrayPalabras = "";
    let porPalabras = frase.split(' ');
    for (let i = 1; i < frase.split(' ').length; i++) {
        contador++;
    }
    return frase.split(' ').length;
}

function contarOcurrencia(frase, cantidadPalabras) {
    let arrayResultado;
    let element;
    let contador = 1;
    let palabraAnterior = "";
    let arrayPAnteriores = [];
    let conteo;
    for (let i = 0; i < frase.split(' ').length; i++) {

        if (i > 0) {
            for (let j = i + 1; j < frase.split(' ').length; j++) {

                if (palabraAnterior == frase.split(' ')[j]) {
                    contador++;
                }
            }
        }
        palabraAnterior = (frase.split(' ')[i]);
    }
    console.log("se repite => " + contador + " La palabra=> " + palabraAnterior);
}

function limpiar() {
    document.getElementById('textoIngresado').value = " ";
}

function contarPalabras() {
    let texto = document.getElementById('textoIngresado').value;

    let resultado = contadorDePalabras(texto);
    console.log(resultado);

    contarOcurrencia(texto, resultado);
}