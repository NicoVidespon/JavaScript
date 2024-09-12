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
        return Math.round(valorFinal * 100) / 100;
    }

    filtrarPrecio(productos, precioMin = 0, precioMax = Infinity) {
        return productos.filter(producto => {
            const valorFinal = producto.calcularValorFinal();
            return valorFinal >= precioMin && valorFinal <= precioMax;
        });
    }
}

let productosArray = [];

function valorFinalProducto() {
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);

    let descuento = 0;
    if (document.getElementById("tieneDescuento").value === "si") {
        descuento = parseFloat(document.getElementById("descuento").value) || 0;
    }

    let impuesto = 0;
    if (document.getElementById("tieneImpuesto").value === "si") {
        impuesto = parseFloat(document.getElementById("impuesto").value) || 0;
    }

    const producto = new Productos(nombre, precio, descuento, impuesto);

    const valorFinal = producto.calcularValorFinal();
    document.getElementById("resultado").innerHTML =
        `El valor final del producto <strong>${producto.nombre}</strong> es: $${valorFinal}`;

    productosArray.push(producto);

    guardarProductosEnLocalStorage();
}

function guardarProductosEnLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productosArray));
}

function cargarProductosDesdeLocalStorage() {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

    productosArray = productosGuardados.map(producto =>
        new Productos(producto.nombre, producto.precio, producto.descuento, producto.impuesto)
    );
}

function mostrarProductosGuardados() {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

    if (productosGuardados.length === 0) {
        document.getElementById("resultado").innerHTML = "No hay productos guardados.";
    } else {
        let html = "<h2>Productos guardados:</h2><ul>";
        productosGuardados.forEach((producto, index) => {
            html += `<li>${index + 1}. ${producto.nombre} - Precio: $${producto.precio}, Descuento: ${producto.descuento}%, Impuesto: ${producto.impuesto}%</li>`;
        });
        html += "</ul>";
        document.getElementById("resultado").innerHTML = html;
    }
}

function filtrarProductosPorPrecio() {
    const precioMin = parseFloat(document.getElementById("precioMin").value) || 0;
    const precioMax = parseFloat(document.getElementById("precioMax").value) || Infinity;

    const productosFiltrados = productosArray.filter(producto => {
        const valorFinal = producto.calcularValorFinal();
        return valorFinal >= precioMin && valorFinal <= precioMax;
    });

    if (productosFiltrados.length === 0) {
        document.getElementById("resultado").innerHTML = "No se encontraron productos en ese rango de precios.";
    } else {
        let html = "<h2>Productos filtrados:</h2><ul>";
        productosFiltrados.forEach((producto, index) => {
            html += `<li>${index + 1}. ${producto.nombre} - Precio Final: $${producto.calcularValorFinal()}</li>`;
        });
        html += "</ul>";
        document.getElementById("resultado").innerHTML = html;
    }
}

function manejarCamposDescuento() {
    const tieneDescuento = document.getElementById("tieneDescuento").value;
    const descuentoInput = document.getElementById("descuento");

    if (tieneDescuento === "si") {
        descuentoInput.disabled = false;
    } else {
        descuentoInput.disabled = true;
        descuentoInput.value = '';
    }
}

function manejarCamposImpuesto() {
    const tieneImpuesto = document.getElementById("tieneImpuesto").value;
    const impuestoInput = document.getElementById("impuesto");

    if (tieneImpuesto === "si") {
        impuestoInput.disabled = false;
    } else {
        impuestoInput.disabled = true;
        impuestoInput.value = '';
    }
}

document.getElementById("tieneDescuento").addEventListener("change", manejarCamposDescuento);
document.getElementById("tieneImpuesto").addEventListener("change", manejarCamposImpuesto);

document.getElementById("mostrarProductos").addEventListener("click", function () {
    cargarProductosDesdeLocalStorage();
    mostrarProductosGuardados();
});

document.getElementById("filtrarProductos").addEventListener("click", filtrarProductosPorPrecio);
