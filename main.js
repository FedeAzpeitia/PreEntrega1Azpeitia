
function obtenerStrDeUnidades(unidades) {
    let stringDeUnidades;

    if (unidades == 1) {
        stringDeUnidades = "unidad"
    } else {
        stringDeUnidades = "unidades"
    }
    return stringDeUnidades;
}

function mayus(str) {
    return str[0].toUpperCase() + str.slice(1);
}


const productos = {
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
}

const iva = 0.21


let carrito = {}


let nombre = prompt("ingrese su nombre")


while(nombre == null || nombre == ""){
    alert("datos incorrectos")
    nombre = prompt("ingrese su nombre")
}
alert(`bienvenido ${nombre}`)


let productosOrdenados = []


for (const p in productos){
    productosOrdenados.push(p)
}

productosOrdenados = productosOrdenados.sort()



while (true) {
    let promptprod = "ingrese el producto deseado\n"

    for (const p of productosOrdenados) {
            if (productos[p].stock > 0) {
                promptprod += `- ${mayus(p)}\n`
            }
    }

    promptprod += "Para finalizar tu compra tocá enter"

    let nombreDeProducto = prompt(promptprod).toLowerCase();


    let unidades;


    while (nombreDeProducto != "" && typeof productos[nombreDeProducto] === `undefined`) {
        alert(`no tenemos ese producto`)
        nombreDeProducto = prompt(promptprod)
    }
    if (nombreDeProducto === "") {
        break
    }

    const producto = productos[nombreDeProducto]


    unidades = Number(prompt(`cuantas unidades desea agregar al carrito? Stock disponible: ${producto.stock}`))
    if(unidades <= producto.stock){
        alert(`agregaste ${unidades} ${obtenerStrDeUnidades(unidades)} de ${mayus(nombreDeProducto)}`)
        if (typeof carrito[nombreDeProducto] === `undefined`) {
            carrito[nombreDeProducto] = unidades
        }else{
            carrito[nombreDeProducto] += unidades
        }
        productos[nombreDeProducto].stock -= unidades
    }else{
        alert("no hay suficiente stock disponible")
    }
}


let mostrarCarrito = "Realizaste la compra con éxito. Acá está tu ticket:\n"

let total = 0

for (const nombreDeProducto in carrito) {
    let precio = carrito[nombreDeProducto] * productos[nombreDeProducto].precio

    precio += precio*iva

    mostrarCarrito += `- ${carrito[nombreDeProducto]} ${mayus(nombreDeProducto)} $${precio}\n`

    total += precio
}

mostrarCarrito += `Total: $${total}\n Gracias por tu compra.`

alert(mostrarCarrito)


