class Productos {
    constructor(nombre, precio, descuento = 0, impuesto = 0) {
        this.nombre = nombre;
        this.precio = precio;
        this.descuento = descuento;
        this.impuesto = impuesto;
    }

    calcularValorFinal() {
        const precioConDescuento = this.precio * (1 - this.descuento / 100);
        const valorFinal = precioConDescuento * (1 + this.impuesto / 100);
        return Math.round(valorFinal);
    }

    filtrarPrecio(productos, precioMin = 0, precioMax = Infinity) {
        return productos.filter(producto => {
            const valorFinal = producto.calcularValorFinal();
            return valorFinal >= precioMin && valorFinal <= precioMax;
        });
    }
}

function valorNumero(mensaje) {
    let valor;
    do {
        valor = Number(prompt(mensaje));
        if (isNaN(valor) || valor < 0) {
            alert("INCORRECTO. Por favor, ingrese un número válido.");
        }
    } while (isNaN(valor) || valor < 0);
    return valor;
}

function respuestaSiNo(mensaje) {
    let respuesta;
    do {
        respuesta = prompt(mensaje).toLowerCase();
        if (respuesta !== "si" && respuesta !== "no") {
            alert("Por favor, responda 'Si' o 'No'.");
        }
    } while (respuesta !== "si" && respuesta !== "no");
    return respuesta;
}

function valorFinalProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    const precio = valorNumero("Ingrese el precio del producto:");

    let descuento = 0;
    if (respuestaSiNo("¿Tiene algún descuento? (Si o No):") === "si") {
        descuento = valorNumero("Ingrese el descuento (%):");
    }

    let impuesto = 0;
    if (respuestaSiNo("¿Hay algún impuesto adicional? (Si o No):") === "si") {
        impuesto = valorNumero("Ingrese el impuesto (%):");
    }

    const producto = new Productos(nombre, precio, descuento, impuesto);
    const valorFinal = producto.calcularValorFinal();

    alert(`El valor final del producto ${producto.nombre} es: $${valorFinal}`);

    alert(`Nombre del producto: ${producto.nombre}\nPrecio: $${producto.precio}\nDescuento: ${producto.descuento}%\nImpuesto: ${producto.impuesto}%`)
}

valorFinalProducto();
