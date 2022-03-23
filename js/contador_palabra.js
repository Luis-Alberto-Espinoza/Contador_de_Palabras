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
        console.log(frase.split[i], " mira aca");
        contador++;
    }
    console.log(porPalabras.length, " <=== esto es por palabra cant");
    console.log(porPalabras, " <=== esto es por palabra");
    console.log(contador, " <=== esto es por contador");
    return frase.split(' ').length;



}

function contarOcurrencia(frase, cantidadPalabras) {
    let arrayResultado;
    let element;
    let contador = 1;

    if (typeof frase != 'string') {
        throw TypeError("lo ingresado debe ser una cadena de caracteres");

    }
    let palabraAnterior = "";
    let arrayPAnteriores = [];
    let conteo;
    console.log(frase);
    console.log(frase.split(' ').length + " leng de frase");
    for (let i = 0; i < frase.split(' ').length; i++) {
        //  console.log(frase.split(' ')[i]);
        //console.log("+++++++++");



        if (i > 0) {
            for (let j = i + 1; j < frase.split(' ').length; j++) {
                // console.log("palabra anterior " + palabraAnterior);
                // console.log("palabra split " + frase.split(' ')[j]);
                //contador = 1;
                // console.log(palabraAnterior + " %anteriro%");
                //console.log((frase.split(' ')[j]) + "%%frase.split en i%%");
                //console.log("+++++++++");
                //  if (arrayPAnteriores)
                if (palabraAnterior == frase.split(' ')[j]) {
                    //arrayResultado[i] = element;

                    // console.log("hay concidencia entre anterior " + palabraAnterior + frase.split(' ')[j]);
                    contador++;
                    //frase.split(' ')[j].replace(' ');
                    // console.log(i + " " + j + " " + palabraAnterior + " se repíte => " + contador + " veces.");
                    // break;
                    //arrayResultado[i].setContador.value;
                    //colocar acciones contador, eliminar del arreglo las futuras porPalabras
                }


            }
        }
        palabraAnterior = (frase.split(' ')[i]);




    }
    console.log("se repite => " + contador + " La palabra=> " + palabraAnterior);



    // for (let i = 0; i < arrayResultado.length; i++) {
    //     console.log(arrayresultado[i]);

    // }
    console.log("terminado");


}

function limpiar() {
    document.getElementById('textoIngresado').value = " ";

}

function contarPalabras() {
    let texto = document.getElementById('textoIngresado').value;
    //let texto = 'Cuando podemos establecer con claridad cuál es la intención que nos ha llevado a un determinado texto, hemos contribuido en buena medida a que nuestra comprensión lectora sea más profunda.    El reconocimiento previo de para qué estamos leyendo, focaliza nuestras búsquedas dentro del texto, orienta el diálogo con lo que está escrito, pone en funcionamiento nuestra capacidad crítica.     La lectura que realizamos de un texto tiene distintos niveles que van desde una búsqueda exploratoria, para luego entender e interpretar y, finalmente, juzgar el contenido del texto.';
    // let texto = 'cuando cuando cuando cuando';
    //console.log(texto);
    console.log("=> " + texto.length);
    console.log();
    let resultado = contadorDePalabras(texto);
    console.log(resultado);
    console.log('----------');

    contarOcurrencia(texto, resultado);
}