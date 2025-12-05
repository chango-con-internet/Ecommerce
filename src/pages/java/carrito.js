// =========================
// Cargar Carrito desde LocalStorage
// =========================
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const carritoVacio = document.getElementById("carrito-vacio");
    const listaProductos = document.getElementById("lista-productos");

    // Si el carrito está vacío
    if (carrito.length === 0) {
        carritoVacio.classList.remove("hidden");
        listaProductos.classList.add("hidden");
        actualizarTotales();
        return;
    }

    // Mostrar lista de productos
    carritoVacio.classList.add("hidden");
    listaProductos.classList.remove("hidden");
    listaProductos.innerHTML = "";

    carrito.forEach((producto, index) => {
        listaProductos.innerHTML += `
            <div class="bg-white shadow-lg rounded-xl p-5 flex items-center justify-between">

                <!-- Imagen -->
                <div class="flex items-center gap-4">
                    <img src="${producto.imagen}" class="w-20 h-20 rounded-lg object-cover">

                    <div>
                        <h3 class="text-lg font-bold text-gray-900">${producto.nombre}</h3>
                        <p class="text-gray-600">${producto.descripcion}</p>
                        <p class="font-semibold text-blue-600">$${producto.precio.toLocaleString("es-CO")}</p>
                    </div>
                </div>

                <!-- Cantidad -->
                <div class="flex items-center space-x-3">
                    <button onclick="cambiarCantidad(${index}, -1)" 
                            class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold">-</button>

                    <span class="font-bold text-lg">${producto.cantidad}</span>

                    <button onclick="cambiarCantidad(${index}, 1)" 
                            class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold">+</button>
                </div>

                <!-- Eliminar -->
                <button onclick="eliminarProducto(${index})" 
                        class="text-red-600 hover:text-red-800 font-bold">
                    X
                </button>

            </div>
        `;
    });

    actualizarTotales();
}


// =========================
// Cambiar Cantidad
// =========================
function cambiarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}


// =========================
// Eliminar producto
// =========================
function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}


// =========================
// Calcular Totales
// =========================
function actualizarTotales() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const subtotal = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

    document.getElementById("subtotal").textContent = `$${subtotal.toLocaleString("es-CO")}`;
    document.getElementById("total").textContent = `$${subtotal.toLocaleString("es-CO")}`;

    // Botón de finalizar compra
    const btn = document.getElementById("btn-finalizar-compra");
    btn.disabled = carrito.length === 0;
}


// =========================
// Inicializar
// =========================
document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
});

// Cargar el carrito desde localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Enviar pedido al backend
async function enviarPedido() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Datos que en tu proyecto REAL vienen del formulario
    const pedido = {
        userId: localStorage.getItem("userId") || "usuarioDemo",
        productos: carrito.map(item => ({
            productId: item._id,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad
        })),
        direccion: document.getElementById("direccion").value,
        ciudad: document.getElementById("ciudad").value,
        codigoPostal: document.getElementById("codigoPostal").value,
        metodoPago: document.getElementById("metodoPago").value,
        total: carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0)
    };

    try {
        const response = await fetch("https://ecommerce-4vw8.onrender.com/api/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
        });

        const data = await response.json();
        console.log("PEDIDO GUARDADO:", data);

        alert("Pedido registrado correctamente.");

        // Vaciar carrito
        localStorage.removeItem("carrito");

        // Redirigir
        window.location.href = "confirmacion.html";

    } catch (error) {
        console.error("Error al enviar pedido:", error);
        alert("Error al registrar el pedido.");
    }
}
