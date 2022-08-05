
function ejercicio() {

    const elemento = document.getElementById('tablaXpalabra');
    const arrayItem = ["item1", "item 2 ", "Item 3"];
    const fragment = document.createDocumentFragment();

    arrayItem.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        const referenceNode = fragment.firstChild;
        console.log('primerli ', referenceNode);
        fragment.insertBefore(li, referenceNode)
    });
    elemento.appendChild(fragment);
}
function ejercicio2() {
    const lista = document.getElementById('tablaXpalabra1');
    const arrayItem = ["item 1", "item2", "item 3"];
    const fragment = document.createDocumentFragment();

    arrayItem.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('list');
        const b = document.createElement("b");
        b.textContent = "Nombre: ";
        const span = document.createElement("span");
        span.classList.add("text-danger");
        span.textContent = item;
        li.appendChild(b);
        li.appendChild(span);
        fragment.appendChild(li);
    });
    lista.appendChild(fragment);

}
function ejercicio3() {
    const elemento = document.getElementById('tablaXpalabra1');
    let hijos = elemento.childNodes;
    console.log(hijos, "  => cant ", hijos.length, " buscando el nombre",
        hijos[0].nodeName);
    console.log(elemento.firstChild);

}
///////
function nodeVacio() {
    const padre = document.getElementById('tablaXpalabra');
    const padre1 = document.getElementById('tablaXpalabra1');

    while (padre1.firstChild) {
        padre.removeChild(padre.firstChild);
        padre1.removeChild(padre1.firstChild);
    }

}
