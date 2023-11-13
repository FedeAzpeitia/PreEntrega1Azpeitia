function mayus(str) {
    return str[0].toUpperCase() + str.slice(1);
}

let productos;
let productosGuardados = localStorage.getItem("productos");
if (productosGuardados != null) {
    productos = JSON.parse(productosGuardados);
} else {
    productos = {
        anillo: { 
            stock: 150,
            precio: 500
        },
        collar: { 
            stock: 60,
            precio: 1000
        },
        pulsera: { 
            stock: 70,
            precio: 700
        },
        aros: { 
            stock: 100,
            precio: 900
        }
    };
    localStorage.setItem("productos", JSON.stringify(productos))
}



const iva = 0.21;


let carrito = {};

let nombre = "";
document.getElementById("nombre").addEventListener("change", (ev) => {
    nombre = ev.target.value;
})


let productosOrdenados = [];
for (const p in productos){
    productosOrdenados.push(p);
}
productosOrdenados = productosOrdenados.sort();

const listaDeProductos = document.getElementById("listaDeProductos");
for (const p of productosOrdenados) {
    const div = document.createElement("div")
    div.id = `producto_${p}`
    div.classList.add("productoDeLista")

    const nombreProducto = document.createElement("p")
    nombreProducto.textContent = `${mayus(p)}(\$${productos[p].precio})`
    
    const valorProducto = document.createElement("p")
    valorProducto.textContent = "$0"

    const cantidadProducto = document.createElement("input");
    cantidadProducto.onchange = (ev) => {
        let cantidad = Number(ev.target.value);

        if (cantidad > 0) {
            if (cantidad > productos[p].stock) {
                cantidad = productos[p].stock;
            }
            carrito[p] = cantidad;
            valorProducto.textContent = `\$${cantidad*productos[p].precio}`
            ev.target.value = cantidad;
        } else{
            carrito[p] = 0;
            valorProducto.textContent = "$0"
            ev.target.value = "0";
        }
    }
    cantidadProducto.value = "0"
    cantidadProducto.type = "number"

    div.append(cantidadProducto,nombreProducto,valorProducto);
    listaDeProductos.append(div);
}



const compra = document.getElementById("compra")
compra.addEventListener("submit", (ev) => {
    ev.preventDefault();
    
    if (nombre === "") {
        alert("El campo nombre es requerido");
        return;
    }

    compra.classList.add("oculto")
    const recibo = document.getElementById("recibo")
    recibo.classList.remove("oculto")

    const mensajeCompra = document.getElementById("mensajeDeCompra")
    mensajeCompra.textContent = `Gracias por su compra ${nombre}`

    const productosComprados = document.getElementById("productosComprados")
    let total = 0;
    for (const p in carrito) {
        if (carrito[p] === 0) {
            continue;
        }
        const cantidad = document.createElement("td")
        cantidad.textContent = `${carrito[p]} u.`

        const producto = document.createElement("td")
        producto.textContent = mayus(p)

        const precio = document.createElement("td")
        precio.textContent = `\$${carrito[p]*productos[p].precio}`
        total = total + carrito[p]*productos[p].precio

        const agrupar = document.createElement("tr")
        agrupar.append(cantidad, producto, precio)
        productosComprados.append(agrupar)

        productos[p].stock = productos[p].stock - carrito[p];
    }
    const filaTotal = document.createElement("tr")
    const textoTotal = document.createElement("td")
    textoTotal.textContent = "Total"
    const valorTotal = document.createElement("td")
    valorTotal.textContent = `\$${total}`
    filaTotal.append(document.createElement("td"), textoTotal, valorTotal)
    productosComprados.append(filaTotal)

    localStorage.setItem("productos", JSON.stringify(productos));
})



