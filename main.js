let nombre = prompt("ingrese su nombre")


while(nombre == null || nombre == ""){
    alert("datos incorrectos")
    nombre = prompt("ingrese su nombre")
}
alert(`bienvenido ${nombre}`)

let producto = prompt(
    `ingrese el producto deseado:
    - Anillo
    - Collar
    - Pulsera
    - Aros`);


let unidades;

function obtenerStrDeUnidades(unidades) {
    let stringDeUnidades;

    if (unidades == 1) {
        stringDeUnidades = "unidad"
    } else {
        stringDeUnidades = "unidades"
    }
    return stringDeUnidades;
}



switch(producto){
    case "anillo":
        unidades = Number(prompt(`cuantas unidades desea agregar al carrito? Stock disponible: 10`))
        if(unidades <= 10){
            alert(`agregaste ${unidades} ${obtenerStrDeUnidades(unidades)} de ${producto}`)
        }else{
            alert("no hay suficiente stock disponible")
        }
        break;
    case "collar":
        unidades = Number(prompt(`cuantas unidades desea agregar al carrito? Stock disponible: 10`))
        if(unidades <= 10){
            alert(`agregaste ${unidades} ${obtenerStrDeUnidades(unidades)} de ${producto}`)
    }else{
            alert("no hay suficiente stock disponible")
        }
        break;
    case "pulsera":
        unidades = Number(prompt(`cuantas unidades desea agregar al carrito? Stock disponible: 10`))
        if(unidades <= 10){
            alert(`agregaste ${unidades} ${obtenerStrDeUnidades(unidades)} de ${producto}`)
        }else{
            alert("no hay suficiente stock disponible")
        }
        break;
    case "aros":
        unidades = Number(prompt(`cuantas unidades desea agregar al carrito? Stock disponible: 10`))
        if(unidades <= 10){
            alert(`agregaste ${unidades} ${obtenerStrDeUnidades(unidades)} de ${producto}`)
        }else{
            alert("no hay suficiente stock disponible")
        }
        break;
    default:
        alert("no poseemos el producto elegido")
}






