function mayus(str) {
  return str[0].toUpperCase() + str.slice(1);
}

async function tienda() {
  let productos;

    let res = await fetch("/stock");
    if (res.ok) {
        productos = await res.json()
    } else {
        Toastify({
            text: "Error al cargar stock, refresque la página",
            style: {
              background: "#ba595e",
            },
          }).showToast();
          return;
    }

  const iva = 0.21;

  let carrito = {};

  let nombre = "";
  document.getElementById("nombre").addEventListener("change", (ev) => {
    nombre = ev.target.value;
  });

  let productosOrdenados = [];
  for (const p in productos) {
    productosOrdenados.push(p);
  }
  productosOrdenados = productosOrdenados.sort();

  const listaDeProductos = document.getElementById("listaDeProductos");
  for (const p of productosOrdenados) {
    const div = document.createElement("div");
    div.id = `producto_${p}`;
    div.classList.add("productoDeLista");

    const nombreProducto = document.createElement("p");
    nombreProducto.textContent = `${mayus(p)}(\$${productos[p].precio})`;

    const valorProducto = document.createElement("p");
    valorProducto.textContent = "$0";

    const cantidadProducto = document.createElement("input");
    cantidadProducto.onchange = (ev) => {
      let cantidad = Number(ev.target.value);

      if (cantidad > 0) {
        if (cantidad > productos[p].stock) {
          cantidad = productos[p].stock;
        }
        carrito[p] = cantidad;
        valorProducto.textContent = `\$${cantidad * productos[p].precio}`;
        ev.target.value = cantidad;
      } else {
        carrito[p] = 0;
        valorProducto.textContent = "$0";
        ev.target.value = "0";
      }
    };
    cantidadProducto.value = "0";
    cantidadProducto.type = "number";

    div.append(cantidadProducto, nombreProducto, valorProducto);
    listaDeProductos.append(div);
  }

  const compra = document.getElementById("compra");
  compra.addEventListener("submit", (ev) => {
    ev.preventDefault();

    if (nombre === "") {
      Toastify({
        text: "El campo nombre es requerido",
        style: {
          background: "#ba595e",
        },
      }).showToast();
      return;
    }

    compra.classList.add("oculto");
    const recibo = document.getElementById("recibo");
    recibo.classList.remove("oculto");

    const productosComprados = document.getElementById("productosComprados");
    let total = 0;
    for (const p in carrito) {
      if (carrito[p] === 0) {
        continue;
      }
      const cantidad = document.createElement("td");
      cantidad.textContent = `${carrito[p]} u.`;

      const producto = document.createElement("td");
      producto.textContent = mayus(p);

      const precio = document.createElement("td");
      precio.textContent = `\$${carrito[p] * productos[p].precio}`;
      total = total + carrito[p] * productos[p].precio;

      const agrupar = document.createElement("tr");
      agrupar.append(cantidad, producto, precio);
      productosComprados.append(agrupar);
    }
    const filaTotal = document.createElement("tr");
    const textoTotal = document.createElement("td");
    textoTotal.textContent = "Total";
    const valorTotal = document.createElement("td");
    valorTotal.textContent = `\$${total}`;
    filaTotal.append(document.createElement("td"), textoTotal, valorTotal);
    productosComprados.append(filaTotal);

  });

  const confirmar = document.getElementById('confirmar');
  confirmar.addEventListener("click", ()=>{
    const mensajeCompra = document.getElementById("mensajeDeCompra");
    mensajeCompra.classList.remove('oculto');
    mensajeCompra.textContent = `Gracias por su compra ${nombre}`;

    const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");
    mensajeConfirmacion.classList.add('oculto');
    const cancelarConfirmar = document.getElementById("cancelarConfirmar");
    cancelarConfirmar.classList.add('oculto');

    for (const p in carrito) {
      if (carrito[p] === 0) {
        continue;
      }
      productos[p].stock = productos[p].stock - carrito[p];
    }

    
    fetch("/stock", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(productos)
    });
  });

  const cancelar = document.getElementById("cancelar");
  cancelar.addEventListener('click', ( )=>{
    compra.classList.remove("oculto");
    const recibo = document.getElementById("recibo");
    recibo.classList.add("oculto");
    const productosComprados = document.getElementById("productosComprados");
    productosComprados.innerHTML = "";
  });
}

tienda();
