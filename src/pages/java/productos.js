// ====================================================
// CARGAR PRODUCTOS
// ====================================================
async function cargarproductos() {
    try {
        const response = await fetch('http://localhost:8081/api/productos');
        const productos = await response.json();

        const grid = document.getElementById('product-grid');

        grid.innerHTML = productos.map(producto => `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 product-car"
                data-price="${producto.precio}"
                data-productId="${producto.productId}">

                <div class="bg-linear-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center overflow-hidden">
                    <img src="${producto.imagen}" alt="${producto.nombre}"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                </div>

                <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900">${producto.nombre}</h3>

                    <p class="text-sm text-gray-800 mb-4">${producto.descripcion}</p>

                    <div class="flex items-center justify-between mb-4">
                        <span class="text-2xl font-bold text-blue-600">
                            ${producto.precio.toLocaleString("es-CO")}
                        </span>
                        <div class="flex text-yellow-500">⭐⭐⭐⭐⭐</div>
                    </div>

                    <div class="flex space-x-2">
                        <button class="ver-detalles-btn bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex-1 text-sm">
                            Detalles
                        </button>

                        <button 
                            class="add-to-cart-btn bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex-1 text-sm"
                            data-product='${JSON.stringify(producto).replace(/"/g, "&quot;")}'
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Activar los botones después de renderizar
        activarBotonesCarrito();

    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

cargarproductos();
setInterval(() => cargarproductos(), 5000);

// ====================================================
// ACTIVAR BOTONES "COMPRAR"
// ====================================================
function activarBotonesCarrito() {
    const botones = document.querySelectorAll(".add-to-cart-btn");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const data = btn.getAttribute("data-product");
            const producto = JSON.parse(data);
            agregarAlCarrito(producto);
        });
    });
}

// ====================================================
// AGREGAR AL CARRITO
// ====================================================
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const existe = carrito.find(item => item._id === producto._id);

    if (existe) {
        existe.cantidad += 1;
        mostrarToast(`+1 unidad de ${producto.nombre}`, "success");
    } else {
        carrito.push({
            _id: producto._id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });

        mostrarToast(`${producto.nombre} agregado al carrito`, "success");
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarBadgeCarrito();
}

// ====================================================
// BADGE DEL CARRITO
// ====================================================
function actualizarBadgeCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const badge = document.getElementById('cart-counter') || document.getElementById('cart-badge');

    if (badge) {
        badge.textContent = carrito.length;
        badge.style.display = carrito.length > 0 ? "flex" : "none";
    }
}

// ====================================================
// TOAST
// ====================================================
function mostrarToast(mensaje, tipo) {
    const toast = document.createElement("div");
    toast.className = `fixed top-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-50
        ${tipo === "success" ? "bg-green-600" : "bg-red-600"} text-white`;

    toast.innerHTML = `<b>${mensaje}</b>`;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);
}

document.addEventListener("DOMContentLoaded", actualizarBadgeCarrito);
